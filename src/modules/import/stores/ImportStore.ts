import { ColumnApi, GridApi } from '@ag-grid-community/core';
import { GridReadyEvent } from '@ag-grid-community/core/dist/cjs/es5/events';
import { action, makeObservable, observable } from 'mobx';
import { Range, read, Sheet, utils, WorkBook, writeFile } from 'xlsx';
import { clone } from '../../../utils/clone';
import { AttributeSetType } from '../components/configuration/attributeSetCode/AttributeSet';
import { ProductTypesType } from '../components/configuration/productType/ProductTypes';
import { VendorFacetType } from '../components/configuration/vendorFacet/VendorsFacet';
import { BaseMapType } from '../types/BaseMapType';
import { generateUrlKey } from './utils/generateUrlKey';
import { normalizeImageUrl } from './utils/normalizeImageUrl';
import { parseArrayToString } from './utils/parseArrayToString';

const EXCLUDE_SHEETS = ['Drop Down Menu', 'Internal - Updates', 'Comments'];
// eslint-disable-next-line @typescript-eslint/unbound-method
const { book_new, sheet_add_aoa, sheet_to_json, json_to_sheet, decode_range, encode_cell, format_cell } = utils;

export class ImportStore {
  // region ATTRIBUTES
  sheets: string[] = [];
  workBook: WorkBook = book_new();
  optionsToMap: string[] = [];
  data: any = {};
  indexMapping = new Map<string, string>();
  // region GRID
  gridApi: GridApi = {} as GridApi;
  columnApi: ColumnApi = {} as ColumnApi;
  baseMap: BaseMapType = [];
  // endregion
  // region ADITIONAL ROWS

  productType: ProductTypesType = 'simple';
  attributeSet: AttributeSetType = 'Default';
  vendorFacet: VendorFacetType = 'Linon';

  // endregion
  // endregion

  constructor() {
    makeObservable<ImportStore>(this, {
      optionsToMap: observable,
      productType: observable,
      attributeSet: observable,
      vendorFacet: observable,

      setOptionsToMap: action,
      setProductType: action,
      setAttributeSet: action,
      setVendorFacet: action
    });
    this.init();
  }

  // region SETTERS
  setVendorFacet = (value: VendorFacetType = 'Linon') => {
    this.vendorFacet = value;
  };
  setProductType = (value: ProductTypesType = 'simple') => {
    this.productType = value;
  };
  setAttributeSet = (value: AttributeSetType = 'Default') => {
    this.attributeSet = value;
  };

  get getOptions() {
    return clone(this.optionsToMap);
  }

  setSheets = (value: string[] = []) => {
    this.sheets = value;
  };

  setWorkBook = (value: WorkBook) => {
    this.workBook = value;
  };

  setGridApi = (value: GridApi) => {
    this.gridApi = value;
  };

  setColumnApi = (value: ColumnApi) => {
    this.columnApi = value;
  };

  setOptionsToMap = (value: string[]) => {
    this.optionsToMap = value;
  };
  // endregion

  // region METHODS
  init = () => {
    void this.loadBaseMapping();
  };

  loadBaseMapping = async () => {
    const result: any = await fetch('/templates/base.json');
    this.baseMap = await result.json();
  };

  processImportedFile = (fileData: any): void => {
    let workbook: any;
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      if (reader.readAsBinaryString) {
        reader.onload = () => {
          workbook = read(reader.result, { type: 'binary' });
          const sheets = workbook.SheetNames.filter((name: string) => !EXCLUDE_SHEETS.includes(name));

          this.setSheets(sheets);
          this.setWorkBook(workbook);
          this.processHeadersAndShow();
        };

        reader.readAsBinaryString(fileData);
      }
    }
  };

  private normalizeWorkbookHeaders = (sheet: string, headers: string[]) => {
    sheet_add_aoa(this.workBook.Sheets[sheet], [headers], { origin: 'A1' });
  };

  private processHeadersAndShow = () => {
    const sheet = this.sheets[0];
    const headers = this.getSheetHeaders(sheet);
    this.normalizeWorkbookHeaders(sheet, headers);
    const base = clone<BaseMapType>(this.baseMap);
    const data = [];
    const options: string[] = base.map(([option]) => option);

    let i = 0;
    const length = headers.length;

    while (i < length) {
      const head = headers[i++];
      let map = '';

      base.some(([att, toMap]) => {
        const exist = toMap.includes(head) || att === head;
        if (exist) {
          map = att;
        }
        return exist;
      });
      data[i] = { head, map };
    }

    this.gridApi.setRowData(data);
    this.setOptionsToMap(options);
  };

  getSheetHeaders = (sheetName: string) => {
    const headers = [];
    const sheet: Sheet = this.workBook.Sheets[sheetName];
    const sheetRef = sheet['!ref'];
    if (sheetRef) {
      const range: Range = decode_range(sheetRef);
      const {
        s: { c: sc },
        e: { c: ec }
      } = range;
      for (let C = sc; C <= ec; ++C) {
        const cell = sheet[encode_cell({ c: C, r: 0 })];
        if (cell && cell.t) {
          headers.push(format_cell(cell).trim().replace(/\s+/gi, ' '));
        }
      }
    }
    return headers;
  };

  extractWorkbookData = () => {
    this.data = sheet_to_json(this.workBook.Sheets[this.sheets[0]]);
  };

  extractIndexMapping = () => {
    this.gridApi.forEachNode(({ data: { map, head } }) => {
      this.indexMapping.set(head, map);
    });
  };

  parseDataToMapping = () => {
    const newBook: any[] = [];
    const data = clone(this.data);
    const dataLength = data.length;
    let i = 0;

    const categories = new Set();

    const baseRow = {
      product_type: this.productType,
      attribute_set_code: this.attributeSet,
      vendor_facet: this.vendorFacet,
      vendor: this.vendorFacet,
      vendor_name: this.vendorFacet,
      flexshopper_leasing_enabled: 1,
      website_id: 0,
      is_in_stock: 1,
      product_websites: 'base',
      flooring_type: 'Furniture' // TODO add this to select field
    };

    while (i < dataLength) {
      const entries = Object.entries(data[i++]);
      const entriesLength = entries.length;
      if (entriesLength === 1) continue;
      let j = 0;
      const tmp: any = { ...baseRow };
      while (j < entriesLength) {
        // eslint-disable-next-line prefer-const
        let [key, value] = entries[j++];
        const mapped = this.indexMapping.get(key);
        if (mapped) {
          switch (mapped) {
            case 'video_url':
            case 'gallery_images': {
              if (value) {
                if (!tmp[mapped]) {
                  tmp[mapped] = [];
                }
                tmp[mapped].push(normalizeImageUrl(String(value)));
              }
              break;
            }
            case 'swatch': {
              value = normalizeImageUrl(String(value));
              tmp[mapped] = value;
              break;
            }
            case 'name': {
              tmp['url_key'] = generateUrlKey(String(value));
              tmp[mapped] = value;
              break;
            }
            case 'upc': {
              tmp[mapped] = JSON.stringify(Number(value));
              break;
            }
            case 'sku': {
              tmp[mapped] = String(value).trim();
              break;
            }
            case 'categories': {
              tmp[mapped] = `Default Category/${String(value)
                .trim()
                .replace(/\s*[>/]\s*/gi, '/')}`.replace(/\s+/gi, ' ');
              categories.add(tmp[mapped]);
              break;
            }
            default: {
              tmp[mapped] = value;
            }
          }
        } else console.warn(`Header "${key}" has no mapping value`);
      }

      parseArrayToString(tmp, 'gallery_images');
      parseArrayToString(tmp, 'video_url');
      if (!tmp['price']) {
        tmp['price'] = tmp['total_price'] || tmp['cost'] || 0;
      }
      newBook.push(tmp);
    }

    console.log(`CATEGORIES: ${JSON.stringify(Array.from(categories), null, 2)}`);
    const wb = book_new();
    wb.SheetNames.push(this.sheets[0]);
    wb.Sheets[this.sheets[0]] = json_to_sheet(newBook);
    writeFile(wb, 'File-to-import.csv');
  };

  // endregion

  // region EVENTS
  onGridReady = ({ api, columnApi }: GridReadyEvent) => {
    this.setGridApi(api);
    this.setColumnApi(columnApi);
    api.sizeColumnsToFit();
  };

  onExport = () => {
    this.extractWorkbookData();
    this.extractIndexMapping();
    this.parseDataToMapping();
  };
  // endregion
}

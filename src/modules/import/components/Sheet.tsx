import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css';
import { AgGridReact } from '@ag-grid-community/react';
import { AllModules, ColDef } from '@ag-grid-enterprise/all-modules';
import { Box, SxProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useContext, useMemo } from 'react';
import { ContextImportStore } from '../contexts/ContextImportStore';
import cellEditor from './SelectEditor';

const sx: SxProps = {
  width: '100%',
  height: '100%',
  '& .ag-header-cell': {
    borderRight: `1px solid var(--ag-border-color, #68686e)`
  },
  '&.ag-theme-alpine-dark': {
    '& .ag-cell': {
      borderRightColor: `var(--ag-border-color, #68686e)`
    },
    '& .ag-row, & .ag-rich-select-value, & .ag-rich-select-row, & .ag-header-cell-text': {
      color: `#b1b1b1`
    },
    '& .ag-popup-editor': { maxWidth: '400px', width: '100%', border: 'unset' }
  }
};

const Sheet = () => {
  const store = useContext(ContextImportStore);
  const { onGridReady } = store;

  const ColumnsDefs: ColDef[] = useMemo(() => {
    return [
      { field: 'head' },
      {
        field: 'map',
        editable: true,
        cellEditor,
        cellEditorParams: { options: store.getOptions }
      }
    ];
  }, [store.getOptions]);

  return (
    <Box className="ag-theme-alpine-dark" sx={sx}>
      <AgGridReact
        defaultColDef={{
          sortable: true,
          flex: 1,
          resizable: true
        }}
        rowSelection="single"
        rowData={[]}
        columnDefs={ColumnsDefs}
        modules={AllModules}
        onGridReady={onGridReady}
        suppressMovableColumns
        suppressDragLeaveHidesColumns
        frameworkComponents={[cellEditor]}
      />
    </Box>
  );
};
export default observer(Sheet);

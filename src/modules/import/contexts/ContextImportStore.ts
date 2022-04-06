import { createContext } from 'react';
import { ImportStore } from '../stores/ImportStore';

export const ContextImportStore = createContext<ImportStore>(new ImportStore());

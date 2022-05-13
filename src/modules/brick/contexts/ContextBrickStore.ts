import { createContext } from 'react';
import { BrickStore } from '../stores/BrickStore';

export const ContextBrickStore = createContext<BrickStore>(new BrickStore());

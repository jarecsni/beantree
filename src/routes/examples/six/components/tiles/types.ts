import { createEvent } from '../../BeanLink';

export const closeTileEvent = createEvent<{id:string}>('tile.close');

export const symbolChangedEvent = createEvent<{id:string, symbol:string}>('tile.symbol.changed');

export const addNewTileEvent = createEvent('tile.create');

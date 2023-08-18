import { createEvent } from '../../BeanLink';

export const closeTileEvent = createEvent<{id:string}>('tile.close');

export const symbolChangedEvent = createEvent<{id:string, symbol:string}>('tile.symbol.changed');

export const addNewTileEvent = createEvent('tile.create');

export const priceTickReceivedEvent = createEvent<{symbol:string, value:number}>('price.tick.received');

export const priceLabelSetValue = createEvent<{value:number}>('price.label.set.value');

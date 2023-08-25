import { createEvent } from '../../BeanLink';

export const closeTile = createEvent<string>('closeTile');

export const symbolChanged = createEvent<{id:string, symbol:string}>('symbolChanged');

export const addNewTile = createEvent<boolean>('addNewTile');

export const priceTickReceived = createEvent<{symbol:string, value:number}>('priceTickReceived');

export const priceLabelSetValue = createEvent<number>('priceLabelSetValue');

export const bookDeal = createEvent<{symbol:string, value:number}>('bookDeal');

export const setBookButtonEnabled = createEvent<boolean>('setBookButtonEnabled');
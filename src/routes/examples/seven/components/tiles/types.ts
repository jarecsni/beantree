import { createEvent } from '../../BeanLink';

export const closeTileEvent = (name:string) => createEvent(name, true);

export const symbolChangedEvent = (name:string, value:{id:string, symbol:string}) => 
    createEvent<{id:string, symbol:string}>(name, value);

export const addNewTileEvent = (name:string) => createEvent(name, true);

export const priceTickReceivedEvent = (name:string, value: {symbol:string, value:number}) => 
    createEvent<{symbol:string, value:number}>(name, value);

export const priceLabelSetValue = (name:string, value: number) => createEvent<number>(name, value);

export const bookDealEvent = (name:string, symbol:string, value:number) => 
    createEvent<{symbol:string, value:number}>(name, {symbol, value});

export const setBookButtonEnabled = (name:string, value:boolean) => createEvent<boolean>(name, value);
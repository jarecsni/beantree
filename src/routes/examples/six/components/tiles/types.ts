import { createEvent, createEventWithId } from "../../BeanLink";

export type TileDef = {
    id:string
    symbol:string
};

export const closeTileEvent = createEvent<{id:string}>('tile.close');

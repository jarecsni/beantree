import { createEventDefinition } from "ts-bus";
import { createEventWithId } from "../../BeanLink";

export type TileDef = {
    id:string
    symbol:string
};


// const createCloseTileEvent = (name:string) => {
//     return createEventDefinition()(name)
// }

//export const closeTileEvent = createEventDefinition<{id:string}>()('tile.close');

//export const closeTileEvent = createEventDefinition<{id: string}>()('tile.close');

export const closeTileEvent = createEventWithId('tile.close');
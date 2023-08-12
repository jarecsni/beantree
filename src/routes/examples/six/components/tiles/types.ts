import { createEvent } from "../../BeanLink";

export const closeTileEvent = createEvent<{id:string}>('tile.close');

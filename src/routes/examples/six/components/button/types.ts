import { createEventDefinition } from 'ts-bus';

export const createNewButtonEvent = (event:string) => 
    createEventDefinition()(event)

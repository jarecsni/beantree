import type { BusEvent } from "ts-bus/types";
import type { BeanLink } from "./BeanLink";

const counterpartyChangedHandler = (event:BusEvent) => {
    console.log('handling event', JSON.stringify(event));
};

export const registerAppHandlers = (beanLink:BeanLink) => {
    beanLink.subscribeToEvent('counterpartyChanged', counterpartyChangedHandler);
} 
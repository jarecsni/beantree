import type { BeanLink } from "./BeanLink";
import type { counterpartyStateChangedEvent } from "./components/counterparty/types";

const counterpartyChangedHandler = (event:ReturnType<typeof counterpartyStateChangedEvent>) => {
    console.log('counterparty changed to:', (event.payload.value && event.payload.value.label) || '<none>');
};

export const registerAppHandlers = (beanLink:BeanLink) => {
    beanLink.subscribeToEvent('state.change.counterparty', counterpartyChangedHandler);
} 
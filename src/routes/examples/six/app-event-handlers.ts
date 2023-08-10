import type { BeanLink } from "./BeanLink";
import type { counterpartyStateChangedEvent } from "./components/counterparty/types";
import type { Counterparty } from "./components/counterparty/types";

export type AppState = {
    counterparty:Counterparty | null
}

const state:AppState = {
    counterparty: null
}

const counterpartyChangedHandler = (event:ReturnType<typeof counterpartyStateChangedEvent>) => {
};

export const registerAppEventHandlers = (beanLink:BeanLink) => {
    beanLink.subscribeToEvent('state.change.counterparty', counterpartyChangedHandler);
} 
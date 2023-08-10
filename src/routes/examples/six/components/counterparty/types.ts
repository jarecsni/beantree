import { createStateChangeEvent } from "../../BeanLink";

export const counterpartyStateChangedEvent = createStateChangeEvent<Counterparty>('counterparty');

export type Counterparty = {
    id: number;
    label: string;
};
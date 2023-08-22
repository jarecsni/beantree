import { createEvent } from '../../BeanLink';

export const COUNTERPARTY = 'Counterparty';

export const counterpartyStateChangedEvent = 
    (source:string, value:Counterparty) => createEvent<Counterparty>(source, COUNTERPARTY, value);

export type Counterparty = {
    id: number;
    label: string;
};
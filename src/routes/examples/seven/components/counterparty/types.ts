import { createEvent } from '../../BeanLink';

export const counterpartyChanged = 
    (name:string, value:Counterparty) => createEvent<Counterparty>(name, value);

export type Counterparty = {
    id: number;
    label: string;
};
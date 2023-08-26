import { createEvent } from '../../beanlink/BeanLink';

export const counterpartyChanged = createEvent<Counterparty>('counterparty');

export type Counterparty = {
    id: number;
    label: string;
};
import { createStateChangeEvent } from "../../BeanLink";
import type { Counterparty } from "../../services/CounterpartyService";

export const counterpartyStateChangedEvent = createStateChangeEvent<Counterparty>('counterparty');
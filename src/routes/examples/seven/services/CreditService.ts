import type { KVType } from "$lib/beans/tree/BeanTreeNode";
import type { Counterparty } from "../components/counterparty/types";

export class CreditService {

    private static instance: CreditService;

    private counterpartyCredit:KVType = {
        0: 1000,
        1: 10000,
        2: 50000,
        3: 250000
    };

    private constructor() {
    }

    public static getInstance(): CreditService {
        if (!CreditService.instance) {
            CreditService.instance = new CreditService();
        }
        return CreditService.instance;
    }

    getCredit(counterparty: Counterparty) {
        return this.counterpartyCredit[counterparty.id] || 0;
    }
}
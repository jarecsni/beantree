import type { KVType } from "$lib/beans/tree/BeanTreeNode";

export interface StreamHandler {
    onData(symbol:string, number: number): void
}
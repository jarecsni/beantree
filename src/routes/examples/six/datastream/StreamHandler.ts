import type { KVType } from "$lib/beans/tree/BeanTreeNode";

export interface StreamHandler {
    onData(number: number): void
}
import type { BeanTreeNode } from './BeanTreeNode';

export interface BeanTreePersistence {
    saveTree(node: BeanTreeNode):void
}
import type { BeanTreeNode } from './BeanTree';

export interface BeanTreeSource {
    getRootNode(): BeanTreeNode;
    saveTree(): void;
}
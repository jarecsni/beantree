import type { BeanTreeNode } from './BeanTreeNode';

export interface BeanTreeSource {
    getRootNode(): BeanTreeNode;
    saveTree(): void;
}
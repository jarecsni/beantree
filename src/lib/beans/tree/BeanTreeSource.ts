import type { BeanTreeNode } from './BeanTreeNode';

export interface BeanTreeSource {
    getRootNode(): Promise<BeanTreeNode|undefined>;
}
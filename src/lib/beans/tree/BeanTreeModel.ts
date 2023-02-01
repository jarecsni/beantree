import type { BeanTreeNode } from './BeanTree';
import type { BeanTreeSource } from './BeanTreeSource';

export class BeanTreeModel {
    private _root:BeanTreeNode;
    private _source:BeanTreeSource;
    constructor(source: BeanTreeSource) {
        this._source = source;
        this._root = source.getRootNode();
    }
}

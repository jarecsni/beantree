import type { BeanTreeNode } from './BeanTree';
import type { BeanTreeSource } from './BeanTreeSource';

export class BeanTreeSourceJSON implements BeanTreeSource {
    private _sourceFileName:string;
    private _jsonObject:BeanTreeNode = {} as BeanTreeNode;
    constructor(sourceFileName: string) {
        this._sourceFileName = sourceFileName;
        this.importJSON();
    } 
    importJSON() {
        this._jsonObject = require(this._sourceFileName);
    }
    getRootNode(): BeanTreeNode {
        return this._jsonObject;
    }
}
import type { BeanTreeNode } from './BeanTree';
import type { BeanTreeSource } from './BeanTreeSource';

export class BeanTreeSourceJSON implements BeanTreeSource {
    private _treeName:string;
    private _sourceFileName:string;
    private _jsonObject:BeanTreeNode = {} as BeanTreeNode;
    constructor(treeName:string, sourceFileName: string) {
        this._treeName = treeName;
        this._sourceFileName = sourceFileName;
        this.loadTree();
    } 
    private loadTree() {
        const savedTree = localStorage.getItem(this._treeName);
        if (savedTree) {
            this._jsonObject = JSON.parse(savedTree);
        } else {
            this._jsonObject = require(this._sourceFileName);
        }
    }
    public saveTree(): void {
        localStorage.setItem(this._treeName, JSON.stringify(this._jsonObject));
    }
    public getRootNode(): BeanTreeNode {
        return this._jsonObject;
    }
}
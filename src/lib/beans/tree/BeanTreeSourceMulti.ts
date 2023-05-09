import { json } from '@sveltejs/kit';
import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreeSource } from './BeanTreeSource';
import type { BeanTreeSourceJSON } from './BeanTreeSourceJSON';

export class BeanTreeSourceMulti {
    private _jsonSource:BeanTreeSourceJSON;
    private _persistentSource:BeanTreeSource;
    constructor(jsonSource:BeanTreeSourceJSON, persistentSource:BeanTreeSource) {
        this._jsonSource = jsonSource;
        this._persistentSource = persistentSource;
    }
    getRootNode(): BeanTreeNode {
        let json = this._jsonSource.getRootNode();
        let override = this._persistentSource.getRootNode();
        return override ? override : json;
    }
}
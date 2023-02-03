import { describe, it, expect } from 'vitest';
import { BeanTreeSourceJSON } from './BeanTreeSourceJSON';

describe('BeanTreeSourceJSON', () => {
    it('can load a file', () => {
        const r = require('./__test__/example2.json');
        const source = new BeanTreeSourceJSON('myTree', './__test__/example2.json');
        const root = source.getRootNode();
        expect(root).not.toBe(null);
        expect(root.bean).toEqual('SlotContainer');
        expect(root.children).toHaveLength(2);
    });
    it('can save the tree to local storage', () => {
        const r = require('./__test__/example2.json');
        const source = new BeanTreeSourceJSON('myTree', './__test__/example2.json');
        const root = source.getRootNode();
        root.children!.push({
            bean: "StringBean",
            instanceId: "bean123",
            props: {
                "text": "Another, dynamic string..."
            }
        })
        source.saveTree();
        const savedSource = new BeanTreeSourceJSON('myTree', './__test__/example2.json');
        const savedRoot = source.getRootNode();
        expect(savedRoot.children).toHaveLength(3);
    });
});
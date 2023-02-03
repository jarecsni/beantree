import { describe, it, expect } from 'vitest';
import { BeanTreeSourceJSON } from './BeanTreeSourceJSON';

describe('BeanTreeSourceJSON', () => {
    it('can load a file', () => {
        const r = require('./__test__/example2.json');
        const source = new BeanTreeSourceJSON('./__test__/example2.json');
        const root = source.getRootNode();
        expect(root).not.toBe(null);
        expect(root.bean).toEqual('SlotContainer');
        expect(root.children).toHaveLength(2);
    });
});
import { describe, it, expect, beforeEach, assert } from 'vitest';
import type { PropertiesObject } from './PropertyEditorTypes';
import { createProps } from './property-utils';

describe('createProps', () => {
    let props:PropertiesObject;
    beforeEach(() => {
        props = {
            sections: [
                {
                    name: 'Section 1', properties: [
                        {name: 'propA', description: 'Property propA'},
                        {name: 'propB', description: 'Property propB'},
                        {name: 'propC', description: 'Property propC'}
                    ]
                },
                {
                    name: 'Section 2', properties: [
                        {name: 'propD', description: 'Property propD', displayName: 'propD displayName'},
                    ]
                },
            ]
        }
    });
    
    it('should return a new PropertiesObject with the values specified', () => {
        const values = {
            propA: 'propA value',
            propB: 'propB value',
            propC: 'propC value',
            propD: 'propD value',
        }
        const newProps:PropertiesObject = createProps(props, values);
    });
});
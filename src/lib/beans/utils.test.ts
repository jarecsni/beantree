
import { describe, expect, it } from "vitest";
import { checkPropertiesObject, convertToPlainObject, mergePropsWithMetaImpl } from "./utils";
import type { PropertiesObject } from "./property-editor/PropertyEditorTypes";

const meta1:PropertiesObject = {
    sections: [
        {
            name: 'First Section',
            properties: [
                {
                    name: 'test1',
                    description: 'Simple test property'
                }
            ]
        }
    ]
}

const meta2:PropertiesObject = {
    sections: [
        {
            name: 'First Section',
            properties: [
                {
                    name: 'test1',
                    description: 'Simple test property'
                }
            ]
        },
        {
            name: 'First Section',
            properties: [
                {
                    name: 'test1',
                    description: 'Simple test property'
                }
            ]
        }
    ]
}

const meta3:PropertiesObject = {
    sections: [
        {
            name: 'First Section',
            properties: [
                {
                    name: 'test1',
                    description: 'Simple test property'
                }
            ]
        },
        {
            name: 'Seconds Section',
            properties: [
                {
                    name: 'test1',
                    description: 'Simple test property'
                }
            ]
        }
    ]
}

const meta4:PropertiesObject = {
    sections: [
        {
            name: 'First Section',
            properties: [
                {
                    name: 'test1',
                    description: 'Simple test property'
                }
            ]
        },
        {
            name: 'Seconds Section',
            properties: [
                {
                    name: 'test2',
                    description: 'Simple test property',
                    value: 'test2 value'
                }
            ]
        }
    ]
}

const meta5:PropertiesObject = {
    sections: [
        {
            name: 'First Section',
            properties: [
                {
                    name: 'test1',
                    description: 'Simple test property',
                    value: 'test1 value'
                }
            ]
        },
        {
            name: 'Seconds Section',
            properties: [
                {
                    name: 'test2',
                    description: 'Simple test property',
                    value: 'test2 value'
                }
            ]
        }
    ]
}


describe('mergePropsWithMeta', () => {
    it('merges a single property with a meta information', () => {
        expect(meta1.sections[0].properties[0].value).toBeUndefined();
        const merged = mergePropsWithMetaImpl({test1: 'Some value'}, meta1, 'testbean');
        expect(merged.sections[0].properties[0].value).toBe('Some value');
    });
});

describe('checkPropertiesObject', () => {
    it('throws an exception if there are two sections with the same name', () => {
        expect(() => {checkPropertiesObject(meta2);}).toThrowError('duplicate section key: First Section');
    });
    it('throws an exception if there are two properties with the same name', () => {
        expect(() => {checkPropertiesObject(meta3);}).toThrowError('duplicate property key: test1');
    });
    it('passes without errors for correct meta info', () => {
        expect(checkPropertiesObject(meta1)).toBeUndefined();
    });
});

describe('convertToPlainObject', () => {
    it('converts an instance of the PropertiesObject to plain object', () => {
        const plain = convertToPlainObject(meta5);
        expect(plain).toEqual({
            test1: 'test1 value',
            test2: 'test2 value'
        })
    });
    it('handles the case when a property has no value', () => {
        const plain = convertToPlainObject(meta4);
        expect(plain).toEqual({
            test2: 'test2 value'
        })
    });
});
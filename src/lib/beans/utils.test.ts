
import { describe, expect, it } from "vitest";
import { mergePropsWithMetaImpl } from "./utils";
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

describe('mergePropsWithMeta', () => {
    it('merges a single property with a meta information', () => {
        expect(meta1.sections[0].properties[0].value).toBeUndefined();
        const merged = mergePropsWithMetaImpl({test1: 'Some value'}, meta1, 'testbean');
        expect(merged.sections[0].properties[0].value).toBe('Some value');
    });
});
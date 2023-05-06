import type { KVType } from '../tree/BeanTreeNode'
import type { PropertiesObject, Property, PropertySection } from './PropertyEditorTypes'

export const createProps = (properties:PropertiesObject, values: KVType):PropertiesObject => {
    const newProps:PropertiesObject = {sections: []};
    properties.sections.forEach(section => {
        const newSection:PropertySection = {
            name: section.name,
            properties: []
        };
        newProps.sections.push(newSection);
        section.properties.forEach(prop => {
            const newProp:Property = {
                name: prop.name,
                description: prop.description
            };
            if (!prop.displayName) {
                newProp.displayName = prop.name;
            } else {
                newProp.displayName = prop.displayName;
            }
            newProp.value = values[prop.name];
            newSection.properties.push(newProp);
        });
    });
    return newProps;
}
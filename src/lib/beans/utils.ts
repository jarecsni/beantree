import type { SvelteComponent } from 'svelte';
import type { BeanMetaInfo } from './BeanMetaInfo'
import type { BeanTreeNode, KVType } from './tree/BeanTreeNode';
import { BeanRegistry } from './BeanRegistry';
import type { PropertiesObject, Property } from './property-editor/PropertyEditorTypes';

// TODO this is hard coded to be desktop browser - will need to add mechanism to set the current platform
export const getPlatformSpecificRenderer = (bean:BeanTreeNode):typeof SvelteComponent | undefined => {
    const beanMetaInfo:BeanMetaInfo|undefined = BeanRegistry.getInstance().geBeanMetaInfo(bean.bean);
    return beanMetaInfo?.renderers.desktop;
}

export const mergePropsWithMeta = (bean:BeanTreeNode) => {
    const instanceProperties = bean.props || {};
    const propertyInfo = BeanRegistry.getInstance().geBeanMetaInfo(bean.bean)?.properties;
    if (!propertyInfo) {
        throw new Error('No property meta information found for bean ' + bean.bean);
    }
    return mergePropsWithMetaImpl(instanceProperties, propertyInfo, bean.bean);
}   

export const mergePropsWithMetaImpl = (instanceProperties:KVType, propertyInfo:PropertiesObject, beanName:string) => {
    if (!propertyInfo) {
        throw new Error('No property meta information found for bean ' + beanName);
    }
    const result = structuredClone(propertyInfo);
    result.sections.forEach(section => {
        section.properties.forEach(prop => {
            const propValue = instanceProperties[prop.name];
            if (propValue) {
                prop.value = propValue;
            }
        });  
    });
    return result;
}   

export const checkPropertiesObject = (obj:PropertiesObject) => {
    const sectionsMap = new Map<string, string>();
    const propertiesMap = new Map<string, string>();
    obj.sections.forEach(section => {
        if(sectionsMap.has(section.name)) {
            throw new Error('duplicate section key: ' + section.name);
        }
        sectionsMap.set(section.name, section.name);
        section.properties.forEach(prop => {
            if (propertiesMap.has(prop.name)) {
                throw new Error('duplicate property key: ' + prop.name);
            }
            propertiesMap.set(prop.name, prop.name);
        });  
    });
}

export const convertToPlainObject = (props: PropertiesObject): KVType => {
    const result:KVType = {};
    props.sections.forEach(section => {
        section.properties.forEach(prop => {
            if (prop.value) {
                result[prop.name] = prop.value;
            }
        });  
    });
    return result;
}

export const stripBeanReferences = (bean: BeanTreeNode): BeanTreeNode => {
    if (bean.children) {
        bean.children.forEach(child => {
            delete bean.props![child.instanceId];
            delete child.parent;
            stripBeanReferences(child);
        })
        if (Object.keys(bean.props!).length == 0) {
            delete bean.props;
        }
    }
    delete bean.id;
    return bean;
}

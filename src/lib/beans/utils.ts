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



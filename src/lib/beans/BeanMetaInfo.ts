import type { ComponentType } from 'svelte'
import type { PropertiesObject } from './property-editor/PropertyEditorTypes'

export type RendererInfo = {
    desktop: ComponentType 
}
export type BeanMetaInfo = {
    name: string,
    renderers: RendererInfo,
    properties?: PropertiesObject
}
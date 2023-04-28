import type { ComponentType } from 'svelte'

export type RendererInfo = {
    desktop: ComponentType 
}
export type BeanMetaInfo = {
    name: string,
    renderers: RendererInfo
}
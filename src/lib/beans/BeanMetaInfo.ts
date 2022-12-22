import type { SvelteComponent } from 'svelte'

export type RendererInfo = {
    desktop: SvelteComponent
}
export type BeanMetaInfo = {
    name: string,
    renderers: RendererInfo
}
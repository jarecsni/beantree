import type { SvelteComponent } from 'svelte'

export type RendererInfo = {
    desktop: typeof SvelteComponent
}
export type BeanMetaInfo = {
    name: string,
    renderers: RendererInfo
}
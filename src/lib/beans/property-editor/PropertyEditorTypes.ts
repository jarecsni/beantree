import type { KVType } from '../tree/BeanTreeNode'

export type Property<t> = {
    displayName?: string
    value?: t
    name: string
    description: string
}
export type PropertySection = {
    name: string
    properties: Property<unknown>[]
}
export type PropertiesObject = {
    sections: PropertySection[]
}
import type { KVType } from '../tree/BeanTreeNode'

export type Property = {
    displayName?: string
    value?: unknown
    name: string
    description: string
}
export type PropertySection = {
    name: string
    properties: Property[]
}
export type PropertiesObject = {
    sections: PropertySection[]
}
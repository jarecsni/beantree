export type Property = {
    displayName: string
    value: unknown
    description: string
}
export type PropertySection = {
    name: string
    properties: Property[]
}
export type PropertiesObject = {
    sections: PropertySection[]
}
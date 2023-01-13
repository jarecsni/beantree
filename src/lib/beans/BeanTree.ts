export type KVType = {[key: string]: unknown}

export type BeanTreeNode = {
    bean:string,
    instanceId:string,
    state:{value: unknown},
    children?:BeanTreeNode[],
    props?:KVType
}
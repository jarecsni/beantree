export type BeanTreeNode = {
    bean:string,
    instanceId:string,
    state:{value: unknown},
    children?:BeanTreeNode[]
}
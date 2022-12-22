export type BeanTreeNode = {
    bean:string,
    instanceId:string,
    state:object,
    children?:BeanTreeNode[]
}
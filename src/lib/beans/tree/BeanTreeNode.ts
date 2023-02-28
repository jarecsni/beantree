export type KVType = {[key: string]: unknown}

export type BeanTreeNode = {
    bean:string,
    instanceId:string,
    state?:{value: unknown},
    parent?:BeanTreeNode;
    children?:BeanTreeNode[],
    props?:KVType
}

export const getTreeNodePath = (node: BeanTreeNode):string => {
    let result = node.instanceId;
    while (node.parent) {
        result = node.parent.instanceId + '/' + result;
        node = node.parent;
    }
    return '/' + result;
}
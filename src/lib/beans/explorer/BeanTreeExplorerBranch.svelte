<div class="content">
    {#if (node.children && node.children.length > 0)}
        {#each node.children as childNode}
            {#if (childNode.children)}
                <TreeBranch rootContent={childNode.bean} onClick={()=>{onSelect(childNode)}} selected={getTreeNodePath(childNode)==$selectedInstanceId}>
                    <BeanExplorerTreeBranch parentId={childNode.instanceId}/>
                </TreeBranch>
            {:else}
                <TreeLeaf onClick={()=>{onSelect(childNode)}} selected={getTreeNodePath(childNode)==$selectedInstanceId}>
                    <div>
                        {childNode.bean}
                    </div>
                </TreeLeaf>
            {/if}
        {/each}
    {:else}
        <TreeLeaf onClick={()=>{onSelect(node)}} selected={getTreeNodePath(node)==$selectedInstanceId}>
            <div>
                {node.bean}
            </div>
        </TreeLeaf>
    {/if}
</div>

<script lang="ts">
	import {selectedInstanceId} from './../tree/store';
	import BeanExplorerTreeBranch from '$lib/ui/beanexplorer/BeanExplorerTreeBranch.svelte';
	import {TreeBranch, TreeLeaf} from '$lib/ui/treeview';
	import { getTreeNodePath, type BeanTreeNode } from '../tree/BeanTreeNode';
	export let node:BeanTreeNode;
    function onSelect(node:BeanTreeNode) {
        const treeNodePath = getTreeNodePath(node);
        selectedInstanceId.set($selectedInstanceId == treeNodePath ? '' : treeNodePath);
    }
</script>

<style>
    .content {
        margin-right: 5px;
    }
</style>

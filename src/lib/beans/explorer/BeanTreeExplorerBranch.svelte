<div class="content">
    {#if (node.children && node.children.length > 0)}
        {#each node.children as childNode}
            {#if (childNode.children)}
                <TreeBranch rootContent={childNode.bean} onClick={()=>{onSelect(childNode.instanceId)}} selected={childNode.instanceId==$selectedInstanceId}>
                    <BeanExplorerTreeBranch parentId={childNode.instanceId}/>
                </TreeBranch>
            {:else}
                <TreeLeaf onClick={()=>{onSelect(childNode.instanceId)}} selected={childNode.instanceId==$selectedInstanceId}>
                    <div>
                        {childNode.bean}
                    </div>
                </TreeLeaf>
            {/if}
        {/each}
    {:else}
        <TreeLeaf onClick={()=>{onSelect(node.instanceId)}} selected={node.instanceId==$selectedInstanceId}>
            <div>
                {node.bean}
            </div>
        </TreeLeaf>
    {/if}
</div>

<script lang="ts">
	import {selectedInstanceId} from '../jar/helloworld/store';
	import BeanExplorerTreeBranch from '$lib/ui/beanexplorer/BeanExplorerTreeBranch.svelte';
	import {TreeBranch, TreeLeaf} from '$lib/ui/treeview';
	import type { BeanTreeNode } from '../tree/BeanTreeNode';
	import { children } from 'svelte/internal';
	export let node:BeanTreeNode;
    function onSelect(nodeId:string) {
        selectedInstanceId.set(nodeId !== $selectedInstanceId ? nodeId : '');
    }
</script>

<style>
    .content {
        margin-right: 5px;
    }
</style>

{#if $isVisible}
    <div class="content">
        <TreeView iconBackgroundColor="grey" iconColor="lightgrey">
            <TreeBranch rootContent={node.bean} onClick={()=>{onSelect(node)}} selected={getTreeNodePath(node) == $selectedInstanceId}>
                <BeanTreeExplorerBranch {node}/>
            </TreeBranch>
        </TreeView>    
    </div>
{/if}

<script lang="ts">
	import {getTreeNodePath, type BeanTreeNode} from './../tree/BeanTreeNode';
    import BeanTreeExplorerBranch from './BeanTreeExplorerBranch.svelte';
	import TreeBranch from '$lib/ui/treeview/TreeBranch.svelte';
	import TreeView from '$lib/ui/treeview/TreeView.svelte';
	import { isVisible } from './BeanTreeExplorer.store';
	import { selectedInstanceId } from '../jar/helloworld/store';
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

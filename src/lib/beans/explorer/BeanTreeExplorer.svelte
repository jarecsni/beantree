{#if $isVisible}
    <div class="content">
        <TreeView iconBackgroundColor="grey" iconColor="lightgrey">
            <TreeBranch rootContent={node.bean} onClick={()=>{onSelect(node.instanceId)}} selected={node.instanceId==$selectedInstanceId}>
                <BeanTreeExplorerBranch {node}/>
            </TreeBranch>
        </TreeView>    
    </div>
{/if}

<script lang="ts">
	import type {BeanTreeNode} from './../tree/BeanTreeNode';
    import BeanTreeExplorerBranch from './BeanTreeExplorerBranch.svelte';
	import TreeBranch from '$lib/ui/treeview/TreeBranch.svelte';
	import TreeView from '$lib/ui/treeview/TreeView.svelte';
	import { isVisible } from './BeanTreeExplorer.store';
	import { selectedInstanceId } from '../jar/helloworld/store';
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

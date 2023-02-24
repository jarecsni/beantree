{#if $isVisible}
    <div class="content">
        <TreeView iconBackgroundColor="grey" iconColor="lightgrey">
            <TreeBranch rootContent={node.bean} selected={false}>
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
    export let node:BeanTreeNode;
</script>

<style>
    .content {
        margin-right: 5px;
    }
</style>

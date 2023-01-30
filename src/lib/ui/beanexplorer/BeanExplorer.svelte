<div class="container">
	<TreeView iconBackgroundColor="grey" iconColor="lightgrey">
		<TreeBranch rootContent="/" selected={false}>
			<BeanExplorerTreeBranch parentId="root" {nodes}/>
		</TreeBranch>
	</TreeView>
</div>

<script lang="ts">
	import BeanExplorerTreeBranch from './BeanExplorerTreeBranch.svelte';
    import { TreeBranch, TreeView } from "$lib/ui/treeview";

    let portalSnapshot, nodes;
</script>

<style>
	.container {
		width: 200px;
		overflow: scroll;
	}
</style>
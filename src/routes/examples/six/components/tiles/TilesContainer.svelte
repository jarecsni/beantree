<div>
    Tiles
</div>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { BeanLink } from '../../BeanLink';

    export let id:string;
    const beanLink:BeanLink = getContext('beanlink');

    beanLink.subscribeToEvent('addNewTile', () => {
        console.log('new tile request');
    });
</script>
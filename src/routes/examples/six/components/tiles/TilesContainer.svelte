{#each tiles as tile (tile.id)}
    <Tile id={tile.id} value=''/>
{/each}

<script lang="ts">
    import {v4 as uuidv4} from 'uuid';
	import { getContext } from 'svelte';
	import type { BeanLink } from '../../BeanLink';
    import Tile from './Tile.svelte';
	import { closeTileEvent } from './types';
    export let id:string;

    const beanLink:BeanLink = getContext('beanlink');
    let tiles:{id:string}[] = [];

    beanLink.subscribeToEvent('addNewTile', () => {
        let tileId = uuidv4();
        tiles.push({
            id: tileId
        });
        tiles = tiles; // svelte needs this
    });

    beanLink.subscribe(closeTileEvent, (event) => {
        const index = tiles.findIndex((element) => element.id === event.payload.id);
        console.log('delete index', index);    
        if (index !== -1) {
            tiles.splice(index, 1);
            tiles = tiles;
            console.log(JSON.stringify(tiles));
        }
    });

</script>
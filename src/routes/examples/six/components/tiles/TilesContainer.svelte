{#each tiles as tile}
    <Tile id={tile.id} value=''/>
{/each}


<script lang="ts">
    import {v4 as uuidv4} from 'uuid';
	import { getContext } from 'svelte';
	import type { BeanLink } from '../../BeanLink';
    import Tile from './Tile.svelte';
	import { closeTileEvent, type TileDef } from './types';
    import type { BusEvent } from 'ts-bus/types';
    export let id:string;

    const beanLink:BeanLink = getContext('beanlink');
    let tiles:TileDef[] = [];

    beanLink.subscribeToEvent('addNewTile', () => {
        let tileId = uuidv4();
        tiles.push({
            id: tileId,
            symbol: ''
        });
        tiles = tiles; // svelte needs this
    });

    beanLink.subscribe(closeTileEvent, (event) => {
        console.log(event.payload.id, ' closed');
    });

</script>
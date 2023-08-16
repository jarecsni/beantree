{#each tiles as tile (tile.id)}
    <Tile id={tile.id} value=''/>
{/each}

<script lang="ts">
    import {v4 as uuidv4} from 'uuid';
	import { BeanLink, type EventSource } from '../../BeanLink';
    import Tile from './Tile.svelte';
	import { closeTileEvent } from './types';
    export let id:string;
    export let addTileEvent:EventSource;

    const beanLink:BeanLink = BeanLink.getInstanceInContext('TilesContainer');
    const parentBeanLink:BeanLink = BeanLink.getInstanceInParentContext();

    let tiles:{id:string}[] = [];

    parentBeanLink.subscribeToEventSource(addTileEvent, () => {
        let tileId = uuidv4();
        tiles.push({
            id: tileId
        });
        tiles = tiles; // svelte needs this
    });

    beanLink.subscribe(closeTileEvent, (event) => {
        const index = tiles.findIndex((element) => element.id === event.payload.id);
        if (index !== -1) {
            tiles.splice(index, 1);
            tiles = tiles;
        }
    });

</script>
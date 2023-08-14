{#each tiles as tile (tile.id)}
    <Tile id={tile.id} value=''/>
{/each}

<script lang="ts">
    import {v4 as uuidv4} from 'uuid';
	import { BeanLink } from '../../BeanLink';
    import Tile from './Tile.svelte';
	import { addNewTileEvent, closeTileEvent } from './types';
    export let id:string;

    const parentBeanLink:BeanLink = BeanLink.getInstanceInContext();
    const beanLink:BeanLink = new BeanLink('TilesContainer');

    let tiles:{id:string}[] = [];

    parentBeanLink.subscribe(addNewTileEvent, () => {
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
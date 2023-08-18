{#each tiles as tile (tile.id)}
    <Tile id={tile.id} value=''/>
{/each}

<script lang="ts">
    import {v4 as uuidv4} from 'uuid';
	import { BeanLink, type EventSource } from '../../BeanLink';
    import Tile from './Tile.svelte';
	import { closeTileEvent, priceTickReceivedEvent, symbolChangedEvent } from './types';
	import { Streamer, type onStreamDataHandler } from '../../datastream/Streamer';
    export let id:string;
    export let addTileEventSource:EventSource;

    const beanLink:BeanLink = BeanLink.getInstanceInContext('TilesContainer');
    const parentBeanLink:BeanLink = BeanLink.getInstanceInParentContext();

    let tiles:{id:string, symbol?:string, streamHandler?:onStreamDataHandler}[] = [];

    parentBeanLink.subscribeToEventSource(addTileEventSource, {
        id, 
        handleEvent: () => {
            let tileId = uuidv4();
            tiles.push({
                id: tileId
            });
            tiles = tiles; // svelte needs this
        }
    });

    beanLink.subscribe(closeTileEvent, {
        id, 
        handleEvent: (event) => {
            const index = tiles.findIndex((element) => element.id === event.payload.id);
            if (index !== -1) {
                Streamer.getInstance().disconnect(tiles[index].symbol!, tiles[index].streamHandler!);
                tiles.splice(index, 1);
                tiles = tiles;
            }
        }
    });

    beanLink.subscribe(symbolChangedEvent, {
        id, 
        handleEvent: (event:ReturnType<typeof symbolChangedEvent>) => {
            const index = tiles.findIndex((element) => element.id === event.payload.id);
            const symbol = event.payload.symbol;
            tiles[index].symbol = symbol;
            if (tiles[index].streamHandler) {
                Streamer.getInstance().disconnect(tiles[index].symbol!, tiles[index].streamHandler!);
            }
            const streamHandler = (symbol:string, value:number) => {
                // This is not a circular reference as it will happen at a different time!
                beanLink.publishEvent(id, priceTickReceivedEvent({sourceId: id, value: value, symbol}));
            };
            tiles[index].streamHandler = streamHandler;
            Streamer.getInstance().connect(symbol, streamHandler);
        }
    });

</script>
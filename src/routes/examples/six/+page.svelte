<App/>

<script lang="ts">
	import { BeanLink } from './BeanLink';
    import App from './App.svelte';
	import { CreditService } from './services/CreditService';
	import type { BusEvent } from 'ts-bus/types';

    // import { Streamer } from "./datastream/Streamer";
    // Streamer.getInstance().initialise();
    // Streamer.getInstance().connect('ABC', (symbol:string, number:number) => {
    //     console.log(symbol, number);
    // });
    // Streamer.getInstance().connect('EFG', (symbol:string, number:number) => {
    //     console.log(symbol, number);
    // });
    // Streamer.getInstance().startStreaming();
    // setTimeout(() => {
    //     console.log('stopping stream');
    //     Streamer.getInstance().stopStreaming();
    // }, 10000);

    const counterpartyChangedHandler = (event:BusEvent) => {
        if (event.payload.counterparty) {
            const credit = CreditService.getInstance().getCredit(event.payload.counterparty);
            console.log('credit is', credit, 'for counterparty', event.payload.counterparty);
        }
    };


</script>
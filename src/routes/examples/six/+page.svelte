<App/>

<script lang="ts">
	import { BeanLink } from './BeanLink';
    import App from './App.svelte';
	import { CreditService } from './services/CreditService';

    const beanLink = BeanLink.rootInstance;

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

    const counterpartyChangedHandler = (event) => {
        const credit = CreditService.getInstance().getCredit(event.payload.counterparty);
        beanLink.publishEvent('counterpartyChangeHandler', 'creditLimitSet', {value: credit});
    };

    beanLink.subscribeToEvent('counterpartyChanged', counterpartyChangedHandler);

</script>
<div class="app">
    <div class="toolbar">
        <CounterpartyPicker {counterparties} selectedCounterparty={counterparties[0]} id="counterpartyPicker"/>
    </div>
    <div class="container">
        
    </div>
    <div class="bottom-bar">Bottom Bar</div>
</div>

<script lang="ts">
	import { setContext } from "svelte";
    import CounterpartyPicker from "./components/counterparty/CounterpartyPicker.svelte";
	import { CounterpartyService } from "./services/CounterpartyService";
	import { BeanLink } from "./BeanLink";
    const counterparties = CounterpartyService.getInstance().getCounterparties();
    setContext('beanlink', new BeanLink('App'));
</script>

<style>
    .app {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .toolbar {
        display: flex;
    }
    .container {
        display: flex;
        flex-wrap: wrap;
    }
    .bottom-bar {
        display: flex;
    }
    .ticker {
        width: 200px;
    }
</style>

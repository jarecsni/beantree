<div class="app">
    <div class="toolbar">
        <CounterpartyPicker {counterparties} selectedCounterparty={counterparties[0]}/>
    </div>
    <div class="container">
        
    </div>
    <div class="bottom-bar">Bottom Bar</div>
</div>

<script lang="ts">
    import CounterpartyPicker from "./components/counterparty/CounterpartyPicker.svelte";
	import { CounterpartyService } from "./components/counterparty/CounterpartyService";
    const counterparties = CounterpartyService.getInstance().getCounterparties();
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
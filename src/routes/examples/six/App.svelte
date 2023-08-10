<div class="app">
    <div class="toolbar">
        <CounterpartyPicker {counterparties} selectedCounterparty={counterparties[0]} id="counterpartyPicker"/>
        <div class="button-panel">
            <div class="spacer"></div>
            <div class="add-button">
                <Button on:click={() => {}} variant="raised">
                    <Label>New tile</Label>
                </Button>
            </div>
        </div>
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
	import { registerAppEventHandlers } from "./app-event-handlers";
	import Button from "@smui/button/src/Button.svelte";
	import Label from "@smui/list/src/Label.svelte";
    const counterparties = CounterpartyService.getInstance().getCounterparties();
    const beanLink = new BeanLink('App'); // top level BeanLink instance
    setContext('beanlink', beanLink);
    registerAppEventHandlers(beanLink);
</script>

<style>
    .app {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .toolbar {
        display: flex;
        padding: 10px;
        background: rgb(136, 146, 149);
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
    .button-panel {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
    }
    .spacer {
        flex-grow: 1;
    }
    .add-button {
        align-self: center;
    }
</style>


<div class="label-container">
    <div class="label">
        <Label>{price}</Label>
    </div>
    {#if arrow}
        <Icon class="material-icons">{arrow}</Icon>
    {/if}
</div>

<script lang="ts">
    import { Icon, Label } from '@smui/common';
	import { BeanLink, type EventCreator } from '../../../six/BeanLink';
	import { priceLabelSetValue } from './types';
    export let id:string;
    export let setValueEvent:EventCreator = priceLabelSetValue;

    let price = 0;
    let arrow:string;

    const beanLink:BeanLink = BeanLink.getInstanceInContext();

    beanLink.subscribeToEventSource([{
        event: setValueEvent.eventType,
        eventCreator: setValueEvent,
    }], {
        id, 
        handleEvent: (event:ReturnType<typeof priceLabelSetValue>) => {
            if (event.payload.value > price) {
                arrow = 'arrow_upward';
            } else if (event.payload.value < price) {
                arrow = 'arrow_downward';
            } else {
                arrow = '360';
            }
            price = event.payload.value;            
        }
    });

</script>

<style>
    .label-container {
        display: flex;
    }
    .label {
        font-size: 1.5em;
    }
</style>
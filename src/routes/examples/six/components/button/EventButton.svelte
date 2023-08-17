<Button on:click={onClick} variant="raised">
    <Label>{label}</Label>
</Button>

<script lang="ts">
	import Button from '@smui/button/src/Button.svelte';
	import Label from '@smui/list/src/Label.svelte';    
	import { BeanLink } from '../../BeanLink';
	import type { BusEvent, EventCreatorFn } from 'ts-bus/types';
	
    export let label:string;
    export let producesEventButtonEvent:EventCreatorFn<BusEvent>;
    export let id:string

    const beanLink:BeanLink = BeanLink.getInstanceInContext();
    const eventToFire = producesEventButtonEvent({sourceId: id});

    function onClick() {
        beanLink.publishEvent(id, eventToFire);
    }
</script>
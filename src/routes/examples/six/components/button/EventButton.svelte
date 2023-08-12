<Button on:click={onClick} variant="raised">
    <Label>{label}</Label>
</Button>

<script lang="ts">
	import Button from "@smui/button/src/Button.svelte";
	import Label from "@smui/list/src/Label.svelte";    
	import type { BeanLink } from "../../BeanLink";
	import { getContext } from "svelte";
	import { createNewButtonEvent } from "./types";
	import type { BusEvent, EventCreatorFn } from "ts-bus/types";
	
    export let label:string;
    export let eventCreator:EventCreatorFn<BusEvent>;
    export let id:string;

    const beanLink:BeanLink = getContext('beanlink');

    const event = eventCreator({sourceId: id});

    function onClick() {
        beanLink.publishEvent(id, event);
    }
</script>
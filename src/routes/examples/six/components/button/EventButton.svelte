<Button on:click={onClick} variant="raised">
    <Label>{label}</Label>
</Button>

<script lang="ts">
	import Button from "@smui/button/src/Button.svelte";
	import Label from "@smui/list/src/Label.svelte";    
	import type { BeanLink } from "../../BeanLink";
	import { getContext } from "svelte";
	import { createNewButtonEvent } from "./types";
    export let label = '';
    export let eventId = '';
    export let id = '';

    const beanLink:BeanLink = getContext('beanlink');

    const event = createNewButtonEvent(eventId)();

    function onClick() {
        beanLink.publishEvent(id, event);
    }
</script>
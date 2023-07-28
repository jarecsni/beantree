
<Switch bind:checked={value} on:SMUISwitch:change={onChange} />

<script lang="ts">
    import Switch from '@smui/switch';
	import { getContext } from 'svelte';
	import type { BeanLink } from '../BeanLink';
    const beanLink:BeanLink = getContext('beanlink');
    export let id:string;

    let value = false;
    const onChange = () => {
        beanLink.publishEvent(id, 'switch', value);
    }
</script>
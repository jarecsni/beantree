<h2>Example #5</h2>

<p>
    Example application for visualising data
</p>

<LightBulb id="bulb"/>

Use the button to switch on and off the light.

<Switch id="switch"/>

<script lang="ts">
	import Switch from './switch/Switch.svelte';
	import LightBulb from './lightbulb/LightBulb.svelte';
	
	import { setContext } from "svelte";
	import { BeanLink } from "./BeanLink";

	const beanLink = new BeanLink('example5');
    setContext('beanlink', beanLink);
	beanLink.mapState('switch', 'lightSwitch');
</script>


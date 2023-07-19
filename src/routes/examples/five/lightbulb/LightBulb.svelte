
<p>
    Light Bulb is {isOn ? 'on': 'off'}
</p>

<script lang="ts">
    import { getContext } from 'svelte';
	import type { BeanLink } from '../BeanLink';
	import type { KVType } from '$lib/beans/tree/BeanTreeNode';
    const beanLink:BeanLink = getContext('beanlink');
    
    export let id;
    let isOn = false;

    beanLink.subscribeToStateChange('lightSwitch', (payload:KVType) => {
        isOn = payload.value as boolean;
    });

</script>
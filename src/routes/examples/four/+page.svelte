<h2>Example #1</h2>
<p>
    Simple example experimenting with non-centralised state
</p>

First Name: <Input stateId="firstName"/>
Last Name: <Input stateId="lastName"/>

First Name: {firstName}



<script lang="ts">
	import { BackboneService } from "./BackboneService";
	import Input from "./Input.svelte";

    let firstName = '';
    BackboneService.bus.subscribe('state.change.firstName', (event) =>{
        firstName = event.payload.actual as string;
    });
</script>


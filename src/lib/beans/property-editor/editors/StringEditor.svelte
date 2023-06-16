<Textfield bind:value={property.value}>
    <IconButton 
        class="material-icons" 
        slot="trailingIcon" 
        size="button"
        on:click={()=>{editorOpen=true}}
    >
        more_horiz
    </IconButton>   
</Textfield>
<div class="surface-wrapper">
  <Dialog bind:open={editorOpen}>
    <Paper>
      <Title>{property.displayName}</Title>
      <Content>
        <div class="string-editor-content">
          <Textfield textarea bind:value={property.value} autofocus />
          <Button on:click={()=>(editorOpen=false)}><Label>Close</Label></Button>
        </div>
      </Content>
    </Paper>
  </Dialog>
</div> 

<script lang="ts">
	  import Textfield from '@smui/textfield';
    import IconButton from '@smui/icon-button';
    import Paper, { Title, Subtitle, Content } from '@smui/paper';
    import Button, {Label} from '@smui/button';
    import './StringEditor.global.scss';
	  import Dialog from '@smui/dialog';
    import type { Property } from './../PropertyEditorTypes';
	  
    export let property:Property<string>;
    const displayName = property.displayName;
    let editorOpen: boolean;
    
</script>

<style>
  .surface-wrapper {
    position: absolute;
    width: 400px;
  }
  .string-editor-content  {
    display: flex;
    flex-direction: column;
  }
</style>


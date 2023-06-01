<Accordion multiple>
	{#each sections as section}
		<Panel open>
			<Header>{section.name}</Header>
			<Content>
				<DataTable style="max-width: 100%;">
					<Head>
						<Row>
							<Cell>Property</Cell>
							<Cell>Value</Cell>
                            <Cell>Description</Cell>
						</Row>
					</Head>
					<Body>
						{#each Object.keys(section.properties) as property}
							<Row>
								<Cell>{section.properties[property].displayName ||
										section.properties[property].name}</Cell>
								<Cell>
									<svelte:component 
										this={editors[property]}
										value={section.properties[property].value}
										displayName={section.properties[property].displayName}
									/>
								</Cell>
                                <Cell>{section.properties[property].description}</Cell>
							</Row>
						{/each}
					</Body>
				</DataTable>
			</Content>
		</Panel>
	{/each}
</Accordion>

<script context="module" lang="ts">
	export const propertyTypes = {
		Number: 'Number',
		Date: 'Date'
	}
</script>

<script lang="ts">
	export let obj:PropertiesObject;
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import NumberEditor from './editors/NumberEditor.svelte';
	import StringEditor from './editors/StringEditor.svelte';
	import DateEditor from './editors/DateEditor.svelte';
	import BooleanEditor from './editors/BooleanEditor.svelte';
	import type { PropertiesObject } from './PropertyEditorTypes';
	const editorsByType = {
		Number: NumberEditor,
		String: StringEditor,
		Boolean: BooleanEditor,
		Date: DateEditor,
	}

	/*
        example object
        {
            sections: [
                {
                    name: "First",
                    properties: {
                        someProperty: {
                            displayName: 'Human Readable name',
                            value: 0, 
                            description: 
                            'An example numeric prop'
                        }
                    }
                },
                {
                    name: "Second",
                    properties: {

                    }
                }
            ]
        }
    */

	const {sections} = obj;
	const editors = {};
	sections.forEach(section => {
		Object.keys(section.properties).forEach(propertyName => {
			const property = section.properties[propertyName];
			const type = property.type || property.value.constructor.name;
			editors[propertyName] = editorsByType[type] || StringEditor;
			// TODO one idea might be:
			// https://www.webtips.dev/webtips/svelte/how-to-dynamically-render-components-in-svelte
			// Also (props): https://svelte.dev/repl/74593f36569a4c268d8a6ab277db34b5?version=3.12.1
		});
	});
</script>
import { writable, type Writable } from 'svelte/store';

export const name:Writable<string> = writable<string>();

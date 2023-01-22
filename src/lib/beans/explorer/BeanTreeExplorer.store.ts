import { writable, type Writable } from 'svelte/store';

export const isVisible:Writable<boolean> = writable<boolean>();
import { createEvent } from '../../BeanLink';

export const buttonClicked = (name:string) => createEvent<boolean>(name, true);

import type { BeanLink } from '../BeanLink'

export type Feature = {
    setup():void;
    init(context:string, beanLink:BeanLink):void
    get name():string
}
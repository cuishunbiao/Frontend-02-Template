import { Component, STATE, ATTRIBUTE, createElement } from './framework'
export { STATE, ATTRIBUTE } from './framework'

export class List extends Component {
    constructor() {
        super()
    }

    render(){
        this.children = this[ATTRIBUTE].data.map(this.template);
        this.root = (<div>{this.children}</div>).render();
        return this.root;
    }

    //重载
    appendChild(child){
        this.template = (child);
        //this.render();
    }
}
import { Component, createElement } from './framework'

class Carousel extends Component {
    constructor() {
        super()
        this.attributes = Object.create(null);
    }
    setAttribute(name,value){
        this.attributes[name] = value;
    }
    render() {
        this.root = document.createElement('div');
        for (let record of this.attributes.src){
            let child = document.createElement('img');
            child.src = record;
            this.root.appendChild(child);
        }
        return this.root;
    }
    mountTo(parent){
        parent.appendChild(this.render())
    }
}

let imagesLists = [
    "./images/img1.jpg",
    "./images/img2.jpg",
    "./images/img3.jpg"
]

let label = <Carousel src={imagesLists} />
//反向操作
label.mountTo(document.body);

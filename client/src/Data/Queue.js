class Queue {
    constructor(){
        this.items = [];
        this.size = 0
    }
    enqueue(element){
        this.size += 1; 
        this.items.push(element);
    }
    dequeue(){
        if(this.isEmpty()){
            return "queue empty"
        }
        this.size -= 1 
        return this.items.shift();
    }
    front(){
        if(this.isEmpty()){
            return "queue empty"
        }
        return this.items[0];
    }
    isEmpty(){
        return this.items.length === 0; 
    }
    getSize(){
        return this.size; 
    }
}

export default Queue; 
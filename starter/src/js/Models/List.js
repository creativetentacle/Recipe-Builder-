import uniquid from 'uniqid';
export default class List {
    constructor(){
        this.items = [];
    }

    addItem(count, unit, ingredient){
        // specifying data format for shopping list item
        const item = {
            id: uniquid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;    
    }
    
    deleteItem(id){

        //find position of list item with given 'id' in items[]
        const index = this.items.findIndex(Listitem => Listitem.id === id);
        console.log(index);
        
        //remove one element from list starting from position : index
        this.items.splice(index, 1);
    }
    
    updateItem(id, newCount)
    {
        this.items.find(listItem => listItem.id === id).count = newCount;
    }
}
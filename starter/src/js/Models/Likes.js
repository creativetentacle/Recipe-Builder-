export default class Likes{
    constructor(){
        this.likes  = [];
    }

    addLike(id, title, author, image){
        const like = { id, title, author, image};
        //console.log('Adding liked item to data model');
        this.likes.push(like);

        //persist the data 
        this.persistData();

        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(curr => (curr.id === id));
        this.likes.splice(index, 1);

        //save changes in local *][iu] 
        this.persistData();
    }

    isLiked(id){
       return this.likes.findIndex(curr => curr.id === id) !== -1;
       // if a given recipe is liked ,      findIndex returns +ve number not equal to -1 (true)
       // if a given recipe is not liked,   findIndex returns -1 , -1 !==1 (false)
    }

    getLikedCount(){
        return this.likes.length;
    }

    persistData() {
        //method to store local data in the browser ( make the data persistent)
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        // reads data from local storage 
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage)
            this.likes = storage;
    }
}
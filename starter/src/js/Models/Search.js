import axios from 'axios';
import {proxy, api_key} from '../config';
// API briefing
// class exports 
// async wait
export default class Search
{
    constructor(query){
        this.query = query;
    }

    async getResults()
    {
        try
        {   const res    =  await axios(`${proxy}https://www.food2fork.com/api/search?key=${api_key}&q=${this.query}`);
            if(res.data.count == 0)
            {
                alert(`No results returned for search query : ${this.query}`);
            }
            // store all the returned results under named property : 'search' of current object.(state)
            this.result   =  res.data.recipes; //state.result = ..
            
        }
        catch(error){
            console.log(error);
        }
    }
}



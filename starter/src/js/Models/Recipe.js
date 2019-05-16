import axios from 'axios';
import {proxy, api_key} from '../config';

export default class Recipe{
    constructor(id){
        this.id = id;   
    }


async getRecipe(){
        try
        {
        const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${api_key}&rId=${this.id}`);
        this.title      = res.data.recipe.title;
        this.author     = res.data.recipe.publisher;
        this.img        = res.data.recipe.image_url;
        this.url        = res.data.recipe.source_url;
        this.ingredients =res.data.recipe.ingredients;
            } catch(error){
            console.log(error);
            alert('Something went wrong :( source : Recipe.js/getRecipe()');
            }
    }

calcTime(){
    //assumption : 15 minutes - every 3 ingredients
    const total_ing     = this.ingredients.length;
    const periods       = Math.ceil(total_ing / 3);
    this.time           = periods * 15 ;
    }

calcServings(){
    this.servings       = parseInt(4);
    }

parseIngredients() {
     
    const unitsLong     = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds','grams'];
    const unitsShort    = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound','gms'];

    const newIngredients = this.ingredients.map(el => {
        // 1. Uniform units 
        let ingredient = el.toLowerCase();
        unitsLong.forEach((unit, index) => {
            ingredient = ingredient.replace(unit, unitsShort[index]); 
        });

        // 2. Remove Parenthesis 
        ingredient = ingredient.replace(/ *\([^)]*\)\s{1,}/g, ' ');
        
        // 3. Parse ingredients into count, unit and ingredient
        const arrIng = ingredient.split(' ');
        const unitIndex = arrIng.findIndex(curr => unitsShort.includes(curr)); // el2--> curr

        let objIng;
        if(unitIndex > -1){
            //There is a unit (cup, tbsp....) 
            const arrCount = arrIng.slice(0, unitIndex );   

            let count;
            if(arrCount.length === 1){
                // 3-1/2 --> eval (" 3 + 1/2") --> 3.5
                count = eval(arrCount[0].replace('-','+')); 
                
                
            }
            else if(arrCount.length > 1){
                // [4 , 1/2] --> eval(" 4 + 1/2") --> 4.5
                count = eval(arrCount.join('+'));
                //count = Math.round(count);
            }
            // corner case - 0.33 --> truncated to 3/10 not 33/100 // last fork --> toFixed(2) isntead of toFixed(1)
            let flag =(parseFloat( count.toString().slice( count.toString().indexOf('.')+1)))% 33 === 0 ? count = parseFloat(count).toFixed(1) : count = parseFloat(count) ;

            objIng = {
                count,
                unit : arrIng[unitIndex],
                ingredient: arrIng.slice(unitIndex + 1).join(' ')
            };
        }            
            else if(parseInt(arrIng[0], 10)){
            // There is NO unit but first element is a number 
                objIng = {
                    count   : parseFloat(arrIng[0],10), // Corner case : If quantity represented in decimals --> ignored/rounded-off
                    unit    : '',
                    ingredient : arrIng.slice(1).join(' ')
                };
            }
            else if( unitIndex === -1){
                // There is NO unit 
                objIng ={
                    count : 1,
                    unit  : '',
                    ingredient
                };
            }
            return objIng;
        /* 
        DATA FORMAT 
        count : float 
        unit : string
        ingredient : string 
        */
    });
        this.ingredients = newIngredients;
        // console.log('AFTER PARSING');
        // console.log(this.ingredients);
    }// end of parseIngredients method   

    updateServings(type) {
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        
        //Ingredients
        this.ingredients.forEach(ing => {
            ing.count = ing.count * (newServings / this.servings);
        });

        this.servings = newServings;
    }; 
}//end of class
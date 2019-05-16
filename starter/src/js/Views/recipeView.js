
import {elements} from './base';

const gcd = (a, b) => {
	return (b) ? gcd(b, a % b) : a;
};

const formatCount = _decimal => {
    // Remaining border case - 33/100 --> 0.3
    let precision, quotient, dec = 0, result;
    if(_decimal.toString().indexOf('.') === -1){
        return `${_decimal.toString()}`;
    }

    //remove negative sign
    _decimal = Math.abs(_decimal);  
    quotient = Math.trunc(_decimal); // 0

    dec = _decimal.toString().split('.')[1];//"45"
    if(dec){
    precision = dec.length;
            //round off correct to 2 decimal places
            if( dec.length >= 3) {
                    dec = parseFloat('.' + dec).toFixed(2); // 
                    precision = 2;
            }
            else
            {
                dec = parseFloat('.' + dec); // 0.55
            }
        }
    let top     = Math.round(dec  * Math.pow(10, precision)); // 0.55 * 100 = 55
    
    let bottom  = Math.pow(10, precision);      // 100

    //calculate GCD
    let div = Math.abs(gcd(top, bottom)); 
    
    //generate mixed fraction
    if(quotient != 0){
    result = `${quotient} ${top/div}/${bottom/div}`;}
    else {
    result = `${top/div}/${bottom/div}`;  // 11/ 20
    }
    return result;
}

const createIngredient = ingredient => 
`
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
            <div class="recipe__count">${formatCount(ingredient.count)}</div>
                <div class="recipe__ingredient">
                        <span class="recipe__unit">${ingredient.unit}</span>
                    ${ingredient.ingredient}
                </div>
    </li>`;

export const renderRecipe = (recipe, isLiked) => {
    const markup =`         
    <figure class="recipe__fig">
        <img src=${recipe.img} alt=${recipe.title} class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text recipe__quantity"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked ? '':'-outlined'}"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(el => createIngredient(el)).join('')}  
        </ul>

        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href=${recipe.url} target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div> `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

export const clearRecipe = () => {
    elements.recipe.innerHTML ='';
}

export const updateServingsIngredients = recipe => {
    //update servings 
    if(recipe.servings > 1)
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    if(recipe.servings === 1)
        {
            document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
            document.querySelector('.recipe__quantity').textContent = "SERVING";
        }
    //update ingredients 
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el,i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    }); 
};

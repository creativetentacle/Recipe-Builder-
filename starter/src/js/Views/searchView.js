import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
//clear all text from input search box 
elements.searchInput.value = '';
};

export const highlightSelected = id =>{
    // selecting all search results and removing highlight from all of them
    const resultList = Array.from(document.querySelectorAll('.results__link'));
    resultList.forEach(result => {
        result.classList.remove('results__link--active');
    });
    // highlighting current search item
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}

export const clearResults = () => {
    elements.searchResList.innerHTML    = '';
    elements.searchResPages.innerHTML   = '';
};
/* title : ' Pasta with tomato and white sauce'
1 => acc :0  / acc + cur.length : 5  / newTitle=['Pasta']
2 => acc :5  / acc + cur.length : 9  / newTitle=['Pasta', 'with']
3 => acc :9  / acc + cur.length : 15 / newTitle=['Pasta', 'with', 'tomato']
4 => acc :15 / acc + cur.length : 18 / newTitle=[Pasta', 'with', 'tomato']
5 => acc :18 / acc + cur.length : 23 / newTitle=[Pasta', 'with', 'tomato']
6 => acc :23 / acc + cur.length : 28 / newTitle=[Pasta', 'with', 'tomato']
*/
export const limitRecipeTitle = (title, limit= 17) =>{
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) 
            {
                newTitle.push(cur);
            }
            // return value gets assigned to 'acc' before initiation of next iteration 
            return acc + cur.length;
        },0);
    //RETURN THE RESULT
    return `${newTitle.join(' ')}...`;
    }
    
    return title;
};
const renderRecipe = (recipe) => {
    const markup =`
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">     
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
`;
elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${ type === 'prev' ? (page - 1) : (page + 1)}>
        <span>Page ${ type === 'prev' ? (page - 1) : (page + 1)}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${ type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        
    </button>
`;


export const renderButtons = (page, numOfResults, resPerPage) => {
    const pages = Math.ceil(numOfResults / resPerPage);
    let button;
    if( page === 1 && pages > 1){
        //button to goto next page 
        button = createButton(page, 'next');
    }
    else if( page < pages){
        //both buttons - 'prev' & 'next'
        button = ` ${createButton(page,'prev')} 
                    ${createButton(page, 'next')}            
        `;
            }
    else if(page === pages && pages > 1){
        //button to goto previous page
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};

export const renderResults = (recipes, page = 1, resPerPage = 10)=> {
    /** 
     * recipes consist of all 30 results fetched from API
     * Each recipe is selected and passed to renderRecipe to generate HTML
     * HTML code generated for each item 
     * Displayed on 'elements.searchResList'
*/     
const start     = (page -1) * resPerPage;
const end       = page * resPerPage;
recipes.slice(start, end).forEach(renderRecipe);
renderButtons(page, recipes.length , resPerPage);
};
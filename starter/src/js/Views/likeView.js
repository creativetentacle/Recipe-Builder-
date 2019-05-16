import {elements} from './base';
import {limitRecipeTitle} from './searchView';

export const toggleLikeBtn = isLiked =>{
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = numLikes =>{
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLiked = liked =>{
    const markup=` 
    <li>
        <a class="likes__link" href="#${liked.id}">
            <figure class="likes__fig">
                <img src="${liked.image}" alt="${liked.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(liked.title)}</h4>
                <p class="likes__author">${liked.author}</p>
            </div>
        </a>
    </li>
    `;
    elements.likedList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLiked = id =>{
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el)
        el.parentElement.removeChild(el);
};

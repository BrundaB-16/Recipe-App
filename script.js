const search_Box = document.querySelector('.SearchBox');
const  search_Btn = document.querySelector('.srch-btn');
const recipe_Container = document.querySelector('.r-container');
const M_img = document.querySelector('.M-img');

const R_btn = document.querySelector('.r-closeBtn');
const recipe_details = document.querySelector('.r-details');
const recipe_content = document.querySelector('.r-content');
 


const searchRecipe = async (val) => {
    recipe_Container.innerHTML="<h2>loading.....</h2>";
    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
    const response = await data.json();
   
    recipe_Container.innerHTML="";

    response.meals.forEach(meal => {
        //console.log(meal);
       const recipeDiv = document.createElement('div');
       recipeDiv.classList.add('recipe');
       recipeDiv.innerHTML = `<img  class="f-img"  src="${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
       <h5>${meal.strArea}</h5>
       <h5>${meal.strCategory}</h5>`

       // ==========  Adding Button  ===============

       const button = document.createElement('button');
       button.textContent = 'View Recipe';
       recipeDiv.appendChild(button);

       // =========  Adding EventListner to Buttons  ========

        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })
       recipe_Container.appendChild(recipeDiv);
       M_img.remove();
    });
  }
    catch(error){
        recipe_Container.innerHTML="<h2>Please Enter Valid Input.</h2>";

    }
}


const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} : ${ingredient}</li>`
        }
        else
        {
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipe_content.innerHTML = `<h3 class="I-name">${meal.strMeal}</h3>
                                <h4 class="I-list">Ingredents</h4>
                                <ul>${fetchIngredients(meal)}</ul>
                                <div>
                                <h4 class="I-list">Instruction:</h4>
                                <p>${meal.strInstructions}</P>
                                </div>
                                `;
    recipe_content.parentElement.style.display = "block";
}

R_btn.addEventListener('click',() => {
    recipe_details.style.display = 'none';
})

search_Btn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = search_Box.value.trim();
    if(!searchInput){
        recipe_Container.innerHTML=`<h2>Type The Recipe in Search Box</h2>`;
        return;
    }
    searchRecipe(searchInput);
})  

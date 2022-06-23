document.addEventListener("DOMContentLoaded", () => {
    // declaring elements
    const searchBtn = document.getElementById('search-btn')
    const mealList = document.getElementById('meal')
    const mealDetails = document.querySelector('.meal-details-content')
    const recipeCloseButton = document.getElementById('recipe-close-btn')
    const quoteBtn = document.getElementById('quote')
  
    recipeCloseButton.addEventListener('click', () => {
      mealDetails.parentElement.classList.remove('showRecipe')
    })
  
  
  
  
    // get matching list of recipes 
    function displayMealList() {
      let searchInputTxt = document.getElementById('search-input').value.trim()
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(res => res.json())
        .then(data => {
          let html = "";
          if (data.meals) {
            //console.log(data)
            data.meals.forEach(meal => {
              html += `
                  <div class = "meal-item" data-id = "${meal.idMeal}">
                  <div class ="meal-img">
                  <img src =${meal.strMealThumb} alt ="food">
                  </div>
                  <div class ="meal-name">
                  <h3>${meal.strMeal}</h3>
                  <a style = "float:left;" href = "#" class ="recipe-btn">Get Recipe</a>
                   
                  </div>
                  </div>
                  `
            })
            mealList.classList.remove('notFound')
  
          } else {
            html = " Sorry, no recipes were found!"
            mealList.classList.add('notFound')
          }
          mealList.innerHTML = html
  
        })
  
    }
    searchBtn.addEventListener('click', displayMealList)
  
    function displayMealRecipe(e) {
      e.preventDefault()
      //console.log(event.target)
      if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        // console.log(mealItem)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
          .then(res => res.json())
          .then(data => displayRecipeModal(data.meals))
        //console.log(data)
  
  
  
      }
    }
    mealList.addEventListener('click', displayMealRecipe)
  
  
  
  
    function displayRecipeModal(meal) {
      console.log(meal)
      meal = meal[0];
      let html = `
         
      <h2 class = "recipe-title">${meal.strMeal}</h2>
      <p class = "recipe-category">${meal.strCategory}</p>
      <div class = "recipe-instruct">
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>
      </div>
      <div class = "recipe-meal-img">
          <img src = "${meal.strMealThumb}" alt = "">
      </div>
      <div class = "recipe-link">
          <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
      </div>
                  `
      mealDetails.innerHTML = html
      mealDetails.parentElement.classList.add('showRecipe')
    }
  
  
  
  
  })
document.addEventListener("DOMContentLoaded", () => {
    // declaring elements
    const searchBtn = document.getElementById('search-btn')
    const mealList = document.getElementById('meal')

    // adding event listerners
    searchBtn.addEventListener('click', getMealList)
    // get matching list of recipes 
    function getMealList() {
        let searchInputTxt = document.getElementById('search-input').value.trim()
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
            .then(res => res.json())
            .then(data => {
                let html = ""
                if (data.meals) {
                    data.meals.forEach(meal => {
                        html += `
                <div class = "meal-item" data-id = "${meal.idMeal}">
                <div class ="meal-img">
                <img src =${meal.strMealThumb} alt ="food">
                </div>
                <div class ="meal-name">
                <h3>${meal.strMeal}</h3>
                <a style = "float:left" href = "#" class ="recipe-btn">Get Recipe</a>
                <button> <i  class="fa fa-heart fa-lg" style="color: rgb(233, 27, 12);font-size: medium; text-decoration: none;"></i> </button> 
                </div>
                </div>
                `
                    })

                }
                mealList.innerHTML = html
            })

    }



})

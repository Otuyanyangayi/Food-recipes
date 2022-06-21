document.addEventListener("DOMContentLoaded", () => {
    
const mealList = document.getElementById('meal')

function getMealList(){
let searchInputTxt = document.getElementById('search-input').value.trim()
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
.then(res => res.json())
.then(data => {
    let html = ""
    if(data.meals){
        data.meals.forEach(meal => {
            html += `
            <div class = "meal-item" data-id = "${meal.idMeal}">
            <div class ="meal-img">
            <img src ="${meal.strMealThub}" alt ="food"
            </div>
            <div class ="meal-name">
            <h3>${meal.strMeal}</h3>
            <a style="float:left; href = "#" class ="recipe-btn">Get Recipe</a>
            <a style="float:left; href = "#" class ="recipe-btn">Add a Review</a>
            </div>
            </div>
            `
        })
        mealList.classList.remove("notFound")
    } else {
        html = "Sorry no meal was found"
        mealList.classList.add('notFound')
    }
})

}
getMealList()



})
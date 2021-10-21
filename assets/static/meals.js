import locations from "./locations";
import fetch from 'node-fetch'

export default getMeals = async () => {
    let out = []
    for (let i = 0; i < 4; i++) {
        let resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        let re = await resp.json()
        let r = re.meals[0]
        let item = {
            id: r.idMeal,
            name: r.strMeal,
            imageUrl: r.strMealThumb,
            ingredients: Object.keys(r).filter(el => el.includes("strIngredient") && r[el] != '').map(el => r[el]),
            grubhub: r.strSource,
            nutrition: {
                calories: Math.floor(Math.random() * 1000),
                saturatedFat: Math.floor(Math.random() * 30),
                transFat: Math.floor(Math.random() * 10),
                cholesterol: Math.floor(Math.random() * 50),
                sodium: Math.floor(Math.random() * 1000),
                totalCarbs: Math.floor(Math.random() * 100),
                fiber: Math.floor(Math.random() * 20),
                protein: Math.floor(Math.random() * 50),
                sugars: Math.floor(Math.random() * 50),
                calcium: Math.floor(Math.random() * 500),
                iron: Math.floor(Math.random() * 100),
                vitaminC: Math.floor(Math.random() * 10),
            },
            location: locations[Math.floor(Math.random() * locations.length)]
        }
        out.push(item)
    }
    return out
}
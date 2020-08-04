function Menu(SerialNumber, name, Description, Price, Preference) {
    this.SerialNumber = SerialNumber,
    this.name = name,
    this.Description = Description,
    this.Price = Price,
    this.Preference = Preference
}

const Menu1 = new Menu(1, "Burger", "extra cheese with mint flavour", 50, "veg")
const Menu2 = new Menu(2, "Pizza", "pizza description", 70, "non veg")
const Menu3 = new Menu(3, "Noodles", "noodles description", 40, "veg")
const Menu4 = new Menu(4, "Mutton Kebab", "kebab description", 100, "non veg")
const Menu5 = new Menu(5, "Mutton Qorma", "qorma description", 90, "non veg")
const Menu6 = new Menu(6, "Mutton Biryani", "biryani description", 110, "non veg")

var Menus = []

Menus.push(Menu1)
Menus.push(Menu2)
Menus.push(Menu3)
Menus.push(Menu4)
Menus.push(Menu5)
Menus.push(Menu6)



const inputName = document.querySelector('.input-name')
const inputPrice = document.querySelector('.input-price')
const button = document.querySelector('.button')
const resultList = document.querySelector('.result-list')

button.addEventListener('click', searchByName)


function searchByName(event) {
    event.preventDefault();
     
    document.getElementsByClassName("input-name").required;

    var key = inputName.value

    if(typeof(key)==="string") {
        Menus.map(menu => {
            if(menu.name.toLowerCase().includes(key.toLowerCase())){
                const result = document.createElement("li")
                result.innerText = menu.name
                resultList.appendChild(result)
            }    
        }  ) 
    }

    // if(typeof(key)==="number"){
    //     Menus.map(menu => {
    //         if(key >= menu.Price){
    //             const result = document.createElement("li")
    //             result.innerText = menu.name
    //             resultList.appendChild(result)
    //         }    
    //     }  ) 
    // }
    
   inputName.value = "" 
}


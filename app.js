function Menu(SerialNumber, name, Description, Price, Preference) {
    this.SerialNumber = SerialNumber,
    this.name = name,
    this.Description = Description,
    this.Price = Price,
    this.Preference = Preference
}


var Menus = []


const resultList = document.querySelector('.Result-List')
const inputButton = document.querySelector('.Input-Submit')
const getByName = document.querySelector('.Get-By-Name')
const getByPrice = document.querySelector('.Get-By-Price')


inputButton.addEventListener('click', storeValue)
getByName.addEventListener('click', searchByName)
getByPrice.addEventListener('click', searchByPrice)



function storeValue(event) {
    event.preventDefault();
    SerialNumber = document.querySelector('.Serial-Number')
    Name = document.querySelector('.Dish-Name')
    Description = document.querySelector('.Input-Description')
    Price = document.querySelector('.Input-Price')
    Preference = document.querySelector('.Input-Preference')

    
    let i = localStorage.length/5

    localStorage.setItem("SerialNumber"+i, Date.now().toString + Math.floor((Math.random()*100)+1))
    localStorage.setItem("name"+i, Name.value)
    localStorage.setItem("Description"+i, Description.value)
    localStorage.setItem("Price"+i, Price.value)
    localStorage.setItem("Preference"+i, Preference.value)

    let Dish = new Menu(localStorage.getItem("SerialNumber"+i), localStorage.getItem("name"+i), localStorage.getItem("Description"+i), localStorage.getItem("Price"+i), localStorage.getItem("Preference"+i))
    Menus.push(Dish)
    console.log(Menus)

    // SerialNumber.value = ""
    Name.value = ""
    Description.value = ""
    Price.value = ""
    Preference.value = ""
    
}

function searchByName(event) {
    event.preventDefault();
    const inputName = document.querySelector('.Search-By-Name') 
    
    var key = inputName.value

    var node = document.getElementById("List")
    node.innerHTML = ""
   
        Menus.map(menu => {
            if(menu.name.toLowerCase().includes(key.toLowerCase())){
                const result = document.createElement("li")
                result.innerText = menu.name
                resultList.appendChild(result)
            }    
        }  ) 
    
   inputName.value = "" 
}

function searchByPrice(event) {
    event.preventDefault();
    const inputPrice = document.querySelector('.Search-By-Price')

    var key = inputPrice.value

    var node = document.getElementById("List")
    node.innerHTML = ""

    Menus.map(menu => {
        if(parseInt(key)>=parseInt(menu.Price)){
            const result = document.createElement("li")
            result.innerText = menu.name
            resultList.appendChild(result)
        }    
    }  ) 

    inputPrice.value = ""

}

function fetch() {
    for ( let i=0; i<localStorage.length/5; i++) {
        let Dish = new Menu(localStorage.getItem("SerialNumber"+i), localStorage.getItem("name"+i), localStorage.getItem("Description"+i), localStorage.getItem("Price"+i), localStorage.getItem("Preference"+i))
        Menus.push(Dish)
        
    }
}

window.onload = fetch
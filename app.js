
let Menus = []

class Dish {

    constructor() {

        this.SerialNumber = "";
        this.name = "";
        this.Description = "" ;
        this.Price = "";
        this.Preference = "" ;

    }

    setDishValue(SerialNumber, name, Description, Price, Preference) {

        this.SerialNumber = SerialNumber,
        this.name = name,
        this.Description = Description,
        this.Price = Price,
        this.Preference = Preference

    }

}

class Cart {
    constructor(viewObj) {
        this.viewObj = viewObj;
    }

    

    fetchDishByName = () => {
        
        var objectDataArr = [];

        for(let i=0; i<Menus.length; i++) {
            if(Menus[i].name.toLowerCase().includes(this.viewObj.searchByName.value.toLowerCase()))

            objectDataArr.push(Menus[i]);
            
        }
        return objectDataArr

    }

    fetchDishByPrice = () => {
        var objectDataArr = [];

        for(let i=0; i<Menus.length; i++) {
            if(parseInt(Menus[i].Price) <= parseInt (this.viewObj.searchByPrice.value))
            objectDataArr.push(Menus[i])
        }
        return objectDataArr;
    }

    storeDish = () => {
        let i = Math.floor(localStorage.length/5) ;

        localStorage.setItem("SerialNumber"+i, Date.now().toString + Math.floor((Math.random()*100)+1))
        localStorage.setItem("name"+i, this.viewObj.dishName.value)
        localStorage.setItem("Description"+i, this.viewObj.dishDescription.value)
        localStorage.setItem("Price"+i, this.viewObj.dishPrice.value)
        localStorage.setItem("Preference"+i, this.viewObj.dishPreference.value)
    }
}

class view {
    constructor() {
        this.dishName = document.querySelector('.Dish-Name')
        this.dishDescription = document.querySelector('.Input-Description')
        this.dishPrice = document.querySelector('.Input-Price')
        this.dishPreference = document.querySelector('.Input-Preference')

        this.submitButton = document.querySelector('.Input-Submit')

        this.searchByName = document.querySelector('.Search-By-Name')
        this.searchNameButton = document.querySelector('.Get-By-Name')

        this.searchByPrice = document.querySelector('.Search-By-Price')
        this.searchPriceButton = document.querySelector('.Get-By-Price')

        this.form = document.getElementById("input")
        this.form1 = document.getElementById("search-one-form")
        this.form2 = document.getElementById("search-two-form")


    }

    displayData(objectDataArr) {
        var node = document.getElementById("List")
        node.innerHTML = ""


        if(objectDataArr.length === 0) {
            const h2 = document.createElement("h2")
            h2.innerText = "NO DATA FOUND"
            node.appendChild(h2);
        }

        else{
            for(let i=0; i<objectDataArr.length; i++) {
                const result = document.createElement("li")
                result.innerText = objectDataArr[i].name
                node.appendChild(result)
            }
        }

}

validFormCheck(x) {
    if (x == ""){
        alert("all fields must be filled out");
        return false;
    }
    else 
    return true;
}

validateForm(form) {
    for( let j=0; j<form.elements.length - 1 ; j++){
        if(!this.validFormCheck(form.elements[j].value)){
            return false
        }
    }
    return true;
}


}

let viewObj = new view()
let Dobj = new Cart(viewObj)

viewObj.submitButton.addEventListener('click', () => {
    if(viewObj.validateForm(viewObj.form)) {
        Dobj.storeDish();
        location.reload();
    }
})

viewObj.searchNameButton.addEventListener('click', () => {
    if(viewObj.validateForm(viewObj.form1)) {
        viewObj.displayData(Dobj.fetchDishByName());
        
    }
})

viewObj.searchPriceButton.addEventListener('click', () => {
    if(viewObj.validateForm(viewObj.form2)) {
        viewObj.displayData(Dobj.fetchDishByPrice());
        
    }
})

function fetch() {
    for ( let i=0; i<localStorage.length/5; i++) {
        let Menu = new Dish();
        Menu.setDishValue(localStorage.getItem("SerialNumber"+i), localStorage.getItem("name"+i), localStorage.getItem("Description"+i), localStorage.getItem("Price"+i), localStorage.getItem("Preference"+i));
        Menus.push(Menu);
        
    }
    console.log(Menus)
}

window.onload = fetch;



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
        this.Menus = [] ;
    }

    

    fetchDishByName = () => {
        
        var objectDataArr = [];

        for(let i=0; i<this.Menus.length; i++) {
            if(this.Menus[i].name.toLowerCase().includes(this.viewObj.searchByName.value.toLowerCase()))

            objectDataArr.push(this.Menus[i]);
            
        }
        return objectDataArr

    }

    fetchDishByPrice = () => {
        var objectDataArr = [];

        for(let i=0; i<this.Menus.length; i++) {
            if(parseInt(this.Menus[i].Price) <= parseInt (this.viewObj.searchByPrice.value))
            objectDataArr.push(this.Menus[i])
        }
        return objectDataArr;
    }

    storeDish = () => {
        let i = Math.floor(localStorage.length) ;

        let menu = new Dish() ;
        menu.setDishValue(Date.now().toString + Math.floor((Math.random()*100)+1),
                          this.viewObj.dishName.value,
                          this.viewObj.dishDescription.value,
                          this.viewObj.dishPrice.value,
                          this.viewObj.dishPreference.value);
        
        localStorage.setItem("OBJ"+i,JSON.stringify(menu));
    }
    fetch = () => {
        for ( let i=0; i<localStorage.length; i++) {
            let menu = JSON.parse(localStorage.getItem("OBJ"+i)); 
            this.Menus.push(menu);
            
        }
        console.log(this.Menus)
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



window.onload = () => {
    Dobj.fetch();
}
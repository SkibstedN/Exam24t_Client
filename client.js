
//Create Product
function sendProductData(){
    var data = new FormData();
    data.append("name",document.getElementById("nameInput").value);
    data.append("price",document.getElementById("priceInput").value);
    data.append("weight",document.getElementById("weightInput").value);

    fetch("http://localhost:8080/createProduct", {
        method: "POST",
        body: data
    })
    
}



//Show all Products
class ShowProducts {

    constructor(data) {
        this.data = data
    }

    async showProducts() {
        let url = "http://localhost:8080/showProducts";

        let response = await fetch(url);
        this.data = await response.json()
        this.createTable()
    }

    createTable() {
        //konstant der tager fat i div med id=productList
        const content = document.getElementById('productList');
        //opretter et nyt table
        const table = document.createElement('table');
        //giver dette table en id så man kan tage fat i det senere
        table.id = "productTable";
        //tilføjer css styling
        table.classList.add("makeUp")

        //Skjuler elementet der kaldte metoden
        document.getElementById("productTableBTN").style.display = "none";

        //definerer antal rows i table + 1 ekstra til overskrift
        for (let i = 0; i < this.data.length +1; i++) {
            //en row for hver gang loopet kører
            const row = table.insertRow();

            //Overskrift
            if (i == 0) {
                const tdata = row.insertCell();
                tdata.appendChild(document.createElement('anchor'))
                tdata.innerHTML = 'Product List';
                tdata.id = 'productListBTNhide';
                tdata.style.fontWeight = "bold"
                tdata.style.fontSize = "20px"
            }

            //når i > 0 oprettes en row
            if (i > 0) {
            //indsætter en ny celle i den oprettede row
                const tdata = row.insertCell();
                tdata.appendChild(document.createTextNode('ID ' + this.data[i - 1].id + ', ' + this.data[i - 1].name + ', ' + 'Price/dkr ' +
                this.data[i - 1].price + ', ' + 'Weight/g ' + this.data[i - 1].weight));   

            }
        } 

        content.innerHTML = ''
        content.appendChild(table);

    }
}

var sProducts = new ShowProducts()



//find product by id
async function findProductData() {
    let objFound = null;
    let productByIdInput = document.getElementById("pIdInput").value;

    let urlFindProduct = new URL('http://localhost:8080/findProductById');
    var paramFindProduct = { id: productByIdInput };
    urlFindProduct.search = new URLSearchParams(paramFindProduct).toString();

await fetch(urlFindProduct).then((response) => response.json()).then((responseObj) => objFound = responseObj);
    const content = document.getElementById('productFoundDiv');

    const table = document.createElement('table');
    table.id = "productFoundTable";
    table.classList.add("makeUp");

    for(let i = 0; i < 5; i++){
        const row = table.insertRow();
        if(i == 0){
            const tdata = row.insertCell();
            tdata.appendChild(document.createElement('anchor'))
            tdata.innerHTML = 'Product found : ';
            //tdata.id = 'productFoundBtnHide';
            tdata.style.fontWeight = "bold"
            tdata.style.fontSize = "20px"
    } if(i == 1){
        const tdata = row.insertCell();
              tdata.appendChild(document.createTextNode(objFound.name));
      } if(i == 2){
          const tdata = row.insertCell();
              tdata.appendChild(document.createTextNode('Dkr: ' + objFound.price));
      } if(i == 3){
          const tdata = row.insertCell();
              tdata.appendChild(document.createTextNode('Weight/g: ' + objFound.weight));
    }

    }
    //nulstiller table
    content.innerHTML = ''
    //indlæser det nye table
    content.appendChild(table);
}


//create delivery
function sendDeliveryData(){
    var data = new FormData();
    data.append("deliveryDate",document.getElementById("deliveryDateInput").value);
    data.append("fromWarehouse",document.getElementById("fromWarehouseInput").value);
    data.append("destination",document.getElementById("destinationInput").value);

    fetch("http://localhost:8080/createDelivery", {
        method: "POST",
        body: data
    })    
}

//create Product Order
function sendOrderData(){
    var data = new FormData();
    data.append("quantity",document.getElementById("quantityInput").value);

    fetch("http://localhost:8080/createProductOrder",{
        method: "POST",
        body: data
    })

}


//add product
function addProductToOrder(){
    let productOrderIdInput = document.getElementById("productOrderIdInput").value
    let productIdInput = document.getElementById("productIdInput").value

    let url = new URL('http://localhost:8080/addProduct')

    //Key value pairs
    var productParameters = {productOrderId: productOrderIdInput, productId: productIdInput
    }
    //sætter værdierne ind i url med .search
    url.search = new URLSearchParams(productParameters).toString();

    fetch(url, {method: 'POST'})
        .then((response) => {
            if(response.status != 200){
            throw new console.error("fetch error");
        }
        })
        .catch((error) => {console.log(error);});
}

//add Delivery
function addDeliveryToOrder(){
    let prodOrderIdInput = document.getElementById("prodOrderIdInput").value
    let deliveryIdInput = document.getElementById("deliveryIdInput").value

    let url = new URL('http://localhost:8080/addDelivery')

    var pParameters = {productOrderId: prodOrderIdInput, deliveryId: deliveryIdInput}

    url.search = new URLSearchParams(pParameters).toString();

    fetch(url, {method: 'POST'})
        .then((response) => {
            if(response.status !=200){
                throw new console.error("fetch error");
            }
            })
            .catch((error) => {console.log(error);});
        }


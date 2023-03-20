const productsArray = []

const productTypes = [
    {id: "REMERA"},
    {id: "VESTIDO"}, 
    {id: "CALZADO"}
]

const productColors = [
    {id: "ROJO"}, 
    {id: "AZUL"}, 
    {id: "NEGRO"},
    {id: "BLANCO"}
]

const productSizes = [
    {id: "S"}, 
    {id: "M"}, 
    {id: "L"},
    {id: "X"},
    {id: "XL"},
    {id: "XLL"}
]

class Product {
    constructor(name, type, price, sizes, colors) {
        this.name = name
        this.type = type
        this.price = parseFloat(price)
        this.sizes = sizes
        this.colors = colors
    }
    showProduct() {
        let string = `Nombre: ${this.name}\n`
        string += `Precio: ${this.price}$\n`
        string += `Talles disp: ${this.sizes}\n`
        string += `Colores disp: ${this.colors}\n`
        alert(string)
    }
    setDiscount(percent) {
        let newPrice = this.price * (percent / 100)
        this.price = Math.round(this.price - newPrice)
    }
}

const addProduct = (name, type, price, sizes, colors) => productsArray.push(new Product(name, type, price, sizes, colors))

const filterProduct = (filter, prop) => productsArray.filter((product) => {
    productProp = product[prop].toString().toLowerCase()
    return productProp.includes(filter.toLowerCase()) 
})

const createMainMenu = (objArray) => {
    let string = "Eliga una opcion:\n\n"

    objArray.forEach((obj, i) => string += `${i+1}. [${obj.name}, Precio: ${obj.price}$]\n`)
    
    string += "\n\nIngrese /cat para filtrar por categoria"
    string += "\nIngrese /color para filtrar por color"
    string += "\nIngrese /talle para filtrar por talle"
    string += "\nIngrese /nombre para buscar por nombre"
    string += "\nIngrese /desc para setear un descuento de 90% (Prueba de concepto)"

    return string
}

const createFilterMenu = (array) => {
    let string = "Eliga una opcion:\n\n"

    array.forEach((e, i) => string += `${i+1}. ${e.id}\n`)

    return string
}

const initSimulator = () => {
    let sizes = [productSizes[0].id, productSizes[1].id, productSizes[2].id]
    let colors = [productColors[0].id, productColors[1].id]
    addProduct("Remera Lisa", productTypes[0].id, 1234.1, sizes, colors)

    sizes = [productSizes[3].id, productSizes[4].id, productSizes[5].id]
    colors = [productColors[2].id, productColors[3].id]
    addProduct("Remera Deportiva", productTypes[0].id, 1234.2, sizes, colors)

    sizes = [productSizes[2].id, productSizes[1].id, productSizes[4].id]
    colors = [productColors[0].id, productColors[1].id, productColors[2].id]
    addProduct("Remera Rayada", productTypes[0].id, 1234.3, sizes, colors)

    sizes = [productSizes[3].id, productSizes[4].id, productSizes[5].id]
    colors = [productColors[3].id]
    addProduct("Vestido Corto", productTypes[1].id, 2345.4, sizes, colors)

    sizes = [productSizes[2].id, productSizes[3].id, productSizes[4].id]
    colors = [productColors[0].id, productColors[1].id, productColors[2].id, productColors[3].id]
    addProduct("Vestido Largo", productTypes[1].id, 2345.5, sizes, colors)

    sizes = [productSizes[0].id, productSizes[1].id, productSizes[2].id]
    colors = [productColors[1].id, productColors[3].id]
    addProduct("Vestido de Lino", productTypes[1].id, 2345.6, sizes, colors)

    sizes = [productSizes[1].id, productSizes[2].id, productSizes[3].id]
    colors = [productColors[1].id]
    addProduct("Zapatillas Nike", productTypes[2].id, 3456.7, sizes, colors)

    sizes = [productSizes[0].id, productSizes[1].id, productSizes[2].id]
    colors = [productColors[1].id]
    addProduct("Crocs Classic", productTypes[2].id, 3456.8, sizes, colors)

    sizes = [productSizes[3].id, productSizes[4].id, productSizes[5].id]
    colors = [productColors[2].id]
    addProduct("Borcegos Cuero", productTypes[2].id, 3456.9, sizes, colors)
}

const startSimulator = (menu, objArray) => {
    let key = prompt(menu)
    
    switch(key) {
        case "/cat": {
            menu = createFilterMenu(productTypes)
            key = parseInt(prompt(menu)-1)

            objArray = filterProduct(productTypes[key].id, "type")

            menu = createMainMenu(objArray)
            startSimulator(menu, objArray)
            break
        }
        case "/color": {
            menu = createFilterMenu(productColors)
            key = parseInt(prompt(menu)-1)
            
            objArray = filterProduct(productColors[key].id, "colors")

            menu = createMainMenu(objArray)
            startSimulator(menu, objArray)
            break
        }
        case "/talle": {
            menu = createFilterMenu(productSizes)
            key = parseInt(prompt(menu)-1)
            
            objArray = filterProduct(productSizes[key].id, "sizes")

            menu = createMainMenu(objArray)
            startSimulator(menu, objArray)
            break
        }
        case "/nombre": {
            menu = "Buscar"
            key = prompt(menu)
            
            objArray = filterProduct(key, "name")
            
            if(objArray == ""){
                alert("Ningun resultado encontrado")
                break
            }

            menu = createMainMenu(objArray)
            startSimulator(menu, objArray)
            break
        }
        case "/desc": {
            for(product of productsArray) {
                product.setDiscount(90)
            }

            menu = createMainMenu(productsArray)
            startSimulator(menu, productsArray)
            break
        }
        default: {
            key = parseInt(key)-1

            if(!objArray[key]) {
                alert("Invalido")
                return
            }
        
            objArray[key].showProduct()
            break
        }
    }
}

initSimulator()

let menu = createMainMenu(productsArray)
startSimulator(menu, productsArray)


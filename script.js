const productsArray = []

const productTypes = [
    REMERA = "REMERA", 
    VESTIDO = "VESTIDO", 
    CALZADO = "CALZADO"
    ]

const productColors = [
    RED = "ROJO", 
    BLUE = "AZUL", 
    BLACK = "NEGRO",
    WHITE = "BLANCO"
    ]

const productSizes = [
    S = "S", 
    M = "M", 
    L = "L",
    X = "X",
    XL = "XL",
    XLL = "XLL"
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

    array.forEach((e, i) => string += `${i+1}. ${e}\n`)

    return string
}

const initSimulator = () => {
    let sizes = [L, X, XL]
    let colors = [WHITE, BLACK]
    addProduct("Remera Lisa", REMERA, 1234.1, sizes, colors)

    sizes = [X, XL]
    colors = [WHITE, BLACK]
    addProduct("Remera Deportiva", REMERA, 1234.2, sizes, colors)

    sizes = [L, X, XL, XLL]
    colors = [BLUE, BLACK, WHITE]
    addProduct("Remera Rayada", REMERA, 1234.3, sizes, colors)

    sizes = [S, M, X, XL, XLL]
    colors = [BLACK]
    addProduct("Vestido Corto", VESTIDO, 2345.4, sizes, colors)

    sizes = [S, L, XLL]
    colors = [RED, BLUE, BLACK, WHITE]
    addProduct("Vestido Largo", VESTIDO, 2345.5, sizes, colors)

    sizes = [M, L, X, XL]
    colors = [BLACK, WHITE]
    addProduct("Vestido de Lino", VESTIDO, 2345.6, sizes, colors)

    sizes = [L, X, XL]
    colors = [WHITE]
    addProduct("Zapatillas Nike", CALZADO, 3456.7, sizes, colors)

    sizes = [L, X, XL]
    colors = [BLUE]
    addProduct("Crocs Classic", CALZADO, 3456.8, sizes, colors)

    sizes = [L, X, XL]
    colors = [BLACK]
    addProduct("Borcegos Cuero", CALZADO, 3456.9, sizes, colors)
}

const startSimulator = (menu, objArray) => {
    let key = prompt(menu)
    
    switch(key) {
        case "/cat": {
            menu = createFilterMenu(productTypes)
            key = parseInt(prompt(menu)-1)

            objArray = filterProduct(productTypes[key], "type")

            menu = createMainMenu(objArray)
            startSimulator(menu, objArray)
            break
        }
        case "/color": {
            menu = createFilterMenu(productColors)
            key = parseInt(prompt(menu)-1)
            
            objArray = filterProduct(productColors[key], "colors")

            menu = createMainMenu(objArray)
            startSimulator(menu, objArray)
            break
        }
        case "/talle": {
            menu = createFilterMenu(productSizes)
            key = parseInt(prompt(menu)-1)
            
            objArray = filterProduct(productSizes[key], "sizes")

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


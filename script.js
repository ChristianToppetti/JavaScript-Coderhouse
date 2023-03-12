const productsArray = []

const ProductTypes = [
    REMERA = "REMERA", 
    VESTIDO = "VESTIDO", 
    CALZADO = "CALZADO"
    ]

const ProductColors = [
    RED = "ROJO", 
    BLUE = "AZUL", 
    BLACK = "NEGRO",
    WHITE = "BLANCO"
    ]

const ProductSizes = [
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
}

const addProduct = (name, type, price, sizes, colors) => productsArray.push(new Product(name, type, price, sizes, colors))

const showProduct = (id, objArray) => {
    obj = objArray[id]

    let string = `Nombre: ${obj.name}\n`
    string += `Precio: ${obj.price}$\n`
    string += `Talles disp: ${obj.sizes}\n`
    string += `Colores disp: ${obj.colors}\n`
    alert(string)
}

const filterProduct = (type) => {
    let objArray = []

    for(let obj of productsArray) {
        if(obj.type == type) {
            objArray.push(obj)
        }
    }

    return objArray
}


const createMainMenu = (objArray) => {
    let string = "Eliga una opcion:\n\n"
    let i = 0

    for(let obj of objArray) {
        i++
        string += `${i}. [${obj.name}, Precio: ${obj.price}$]\n`
    }
    
    string += "\n\nIngrese /filtrar para filtrar por categoria"

    return string
}

const handleMainMenu = (key, objArray) => {
    let id = key-1

    if(id >= objArray.length || id < 0 || isNaN(key)) {
        return
    }
    
    showProduct(id, objArray)
}

const createFilterMenu = () => {
    let string = "Eliga una opcion:\n\n"
    let i = 0

    for(let str of ProductTypes) {
        string += `${i+1}. Filtrar por ${str}\n`
        i++
    }

    return string
}

const handleFilterMenu = (key) => {
    let id = key-1

    if(id >= ProductTypes.length || id < 0 || isNaN(key)) {
        return
    }

    return filterProduct(ProductTypes[id])
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
    let input = prompt(menu)
    
    if(input == "/filtrar") {
        menu = createFilterMenu()
        input = prompt(menu)

        objArray = handleFilterMenu(parseInt(input))

        menu = createMainMenu(objArray)
        startSimulator(menu, objArray)
    }
    else {
        handleMainMenu(parseInt(input), objArray)
    }
}

initSimulator()

let menu = createMainMenu(productsArray)
startSimulator(menu, productsArray)


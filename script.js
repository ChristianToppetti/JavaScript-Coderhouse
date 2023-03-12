const productsArray = []

const ProductTypes = [
    REMERA = 0, 
    VESTIDO = 1, 
    CALZADO = 2
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

const createMainMenu = () => {
    let string
    let i = 1

    string = "Eliga una opcion:\n\n"

    for(let obj of productsArray) {
        string += `${i}. [${obj.name}, Precio: ${obj.price}$]\n`
        i++
    }
    string += "\n\nIngrese una opcion"

    return string
}

const handleMainMenu = (key) => {
    id = key-1
    if(id >= productsArray.length || id <= 0) {
        return
    }

    showProduct(id)
}

const showProduct = (id) => {
    obj = productsArray[id]

    string = `Nombre: ${obj.name}\n`
    string += `Precio: ${obj.price}$\n`
    string += `Talles disp: ${obj.sizes}\n`
    string += `Colores disp: ${obj.colors}\n`
    alert(string)
}

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

let menu = createMainMenu()
handleMainMenu(parseInt(prompt(menu)))
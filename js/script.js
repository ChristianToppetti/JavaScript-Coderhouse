const productsArray = []
const activeFiltersArray = []
const checkboxFilters = []

const itemsCont = document.getElementById("itemsCont")
const checkboxCont = document.getElementById("sidebarMenu")

class Product {
    constructor(name, type, price, sizes, colors, imgfolder) {
        this.id = `product${productsArray.length}`
        this.name = name
        this.type = type
        this.price = parseFloat(price)
        this.sizes = sizes
        this.colors = colors
        this.imgfolder = imgfolder
    }
    getTags() {
      let tags = "tag" + [this.type, this.sizes, this.colors].join(",") + "#"
      return tags.replaceAll(",", "#,tag")
    }
}

const addProduct = (name, type, price, sizes, colors, imgfolder) => productsArray.push(new Product(name, type, price, sizes, colors, imgfolder))

const createShopItem = (contHtml, obj) => {
  let divShopitem = document.createElement("div")
  divShopitem.className = "shopitem"
  divShopitem.innerHTML = `
    <h3 class="shopitem__nametag">${obj.name.toUpperCase().replace("tag", "")}</h3>

    <div class="shopitem__img">
        <img src="../multimedia/Items/${obj.imgfolder}/item0.webp" alt="IMG">
        <a id="${obj.id}" class="shopitem__img__btn" href="item.html">VER MAS</a>
    </div>
    
    <div class="shopitem__pricetag">
        <span class="shopitem__pricetag__value">$ ${obj.price.toFixed(2)}</span>
        <span><strong>6</strong> CUOTAS SIN INTERES DE <strong>$${(obj.price / 6).toFixed(2)}</strong></span>
    </div>`
  contHtml.append(divShopitem)

  itemClickEvent(document.getElementById(obj.id), obj)
}

const createCheckboxFilters = (title, checkboxes) => {
  let ulFilters = document.createElement("ul")

  ulFilters.innerHTML = `<p>${title.toUpperCase()}</p>`

  for(let checkbox of checkboxes) {
    ulFilters.innerHTML += `
      <li>
        <input type="checkbox" id="cb${checkbox}" value="tag${checkbox}">
        <label for="cb${checkbox}">${checkbox}</label>
      </li>`

    checkboxCont.append(ulFilters)
    checkboxFilters.push(`cb${checkbox}`)
  }
}

const showCheckboxes = () => {
  createCheckboxFilters("PRENDA", ["Remera", "Vestido", "Calzado"])
  createCheckboxFilters("TALLE", ["S", "M", "L", "X", "XL"])
  createCheckboxFilters("COLORES", ["Rojo", "Negro", "Azul", "Blanco"])
}

const showItems = () => {
  itemsCont.innerHTML = ""

  for(let product of productsArray) {

    if(activeFiltersArray.length != 0) {
      let tags = product.getTags()
    
      let validProduct = activeFiltersArray.every((activeFilter) => {
        return tags.toLowerCase().includes(`${activeFilter.toLowerCase()}#`) 
      })

      validProduct && createShopItem(itemsCont, product)
    }
    else {
      createShopItem(itemsCont, product)
    }  

  }
}

const databaseSimulator = () => {
  let types = ["REMERA", "VESTIDO", "CALZADO"]
  let colors = ["ROJO", "AZUL", "NEGRO", "BLANCO"]
  let sizes = ["S", "M", "L", "X", "XL", "XLL"]

  addProduct("Vestido Rayado", types[1], (9000.99),sizes, colors, "vestidorayado")

  for(let i=1; i <= 9; i++) {
    let name = `Producto ${i}`
    let imgFolder = `Test${i}`

    addProduct(name, 
    types[Math.floor(Math.random() * types.length)], 
    (1234.1+i), 
    [sizes[Math.floor(Math.random() * sizes.length)]], 
    [colors[Math.floor(Math.random() * colors.length)]],
    imgFolder)
  }
}

const checkboxClickEvent = (checkbox) => {
  checkbox.addEventListener("click", () => {
    
    if(checkbox.checked) {
      activeFiltersArray.push(checkbox.value)
    } else {
      let index = activeFiltersArray.indexOf(checkbox.value)
      activeFiltersArray.splice(index, 1)
    }

    showItems()
  })
}

const itemClickEvent = (item, obj) => {
  item.addEventListener("click", () => {
    sessionStorage.setItem("ITEM", JSON.stringify(obj))
  })
}

window.addEventListener("load", () => {
  showCheckboxes()
  for(let filter of checkboxFilters) {
    checkboxClickEvent(document.getElementById(filter))
  }

  databaseSimulator()
  showItems()
})


const maxThumbnails = 5

const itemThumbnailsCont = document.getElementById("itemThumbnailsCont")
const itemImgCont = document.getElementById("itemImgCont")
const itemInfoCont = document.getElementById("itemInfoCont")

const storeageItem = JSON.parse(sessionStorage.getItem("ITEM"))

const createThumbnails = () => {
  itemThumbnailsCont.innerHTML = ""
  
  for(let i=0; i < maxThumbnails; i++) {
    let img = document.createElement("img")
    img.src = `../multimedia/Items/${storeageItem.imgfolder}/item${i}.webp`
    img.alt = "IMG"

    itemThumbnailsCont.append(img)
    thumbnailClickEvent(img)
  }
}

const createMainImg = (src) => {
  itemImgCont.innerHTML = ""

  let img = document.createElement("img")
  img.src = src
  img.alt = "IMG"
  
  itemImgCont.append(img)
}

const createItemPaymentInf = () => {
  let itemPaymentInfCont = document.getElementById("itemPaymentInfCont")
  itemPaymentInfCont.innerHTML = `<span>$${storeageItem.price}</span>
  <div>
      <i class="material-icons">credit_card</i> 
      <span>HASTA <strong>6</strong> CUOTAS SIN INTERES DE <strong>$${(storeageItem.price / 6).toFixed(2)}</strong></span>
  </div>
  <a href="#"><u>Ver medios de pago</u></a><br>
  <div>
      <i class="material-icons">local_shipping</i>
      <span>Llega gratis <strong>el lunes</strong> con Mercado Envios</span>
  </div> 
  <a href="#"><u>Ver formas de entrega</u></a>`
}

const createItemChoices = (contId, choiceTitle, itemChoices, currentChoice, eventCallback, optCallback) => {
  let itemChoicesCont = document.getElementById(contId)
  let spanTitle = document.createElement("span")
  
  itemChoicesCont.innerHTML = ""

  spanTitle.innerHTML = `<strong>${choiceTitle}:</strong> <u>${currentChoice}</u>`
  itemChoicesCont.append(spanTitle)

  for(let choice of itemChoices) {
    let div = document.createElement("div")

    div.id = `index${choice}`

    optCallback && optCallback(div, choice)

    choice === currentChoice && (div.className = "selected")

    itemChoicesCont.append(div)
    eventCallback(div)
  }
}

const renderColor = (element, color) => { 
  switch(color){
    case "ROJO": {
      element.style.backgroundColor = "red"
      break
    }
    case "AZUL": {
      element.style.backgroundColor = "blue"
      break
    }
    case "NEGRO": {
      element.style.backgroundColor = "black"
      break
    }
    case "BLANCO": {
      element.style.backgroundColor = "white"
      break
    }
    default: {break}
  }
}

const renderSize = (element, size) => element.innerHTML = size

const createItemInfo = () => {
  itemInfoCont.innerHTML = `<h2>${storeageItem.name.toUpperCase()}</h2>
  <div id="itemPaymentInfCont" class="main-item__info__payment"></div>
  <div class="separator"></div>
  <div id="itemColorsCont" class="main-item__info__colors"></div>
  <div id="itemSizesCont" class="main-item__info__sizes"></div>

  <input id="addToCart" class="buttons" type="button" value="AGREGAR AL CARRITO">   

  <div class="separator"></div>`
}

const getSelectedColor = () => sessionStorage.getItem("SELECTEDCOLOR")
const getSelectedSize = () => sessionStorage.getItem("SELECTEDSIZE")

const setSelectedColor = (color) => sessionStorage.setItem("SELECTEDCOLOR", color)
const setSelectedSize = (size) => sessionStorage.setItem("SELECTEDSIZE", size)

const thumbnailClickEvent = (element) => {
  element.addEventListener("click", () => {
    createMainImg(element.src)
  })
}

const colorClickEvent = (element) => {
  element.addEventListener("click", (event) => {
    if(event.target.className.includes("selected")) { 
      return 
    }

    let newColor = event.target.id.replace("index", "")
    
    setSelectedColor(newColor)
    createItemChoices("itemColorsCont", "COLOR", storeageItem.colors, newColor, colorClickEvent, renderColor)
  })
}

const sizeClickEvent = (element) => {
  element.addEventListener("click", (event) => {
    if(event.target.className.includes("selected")) { 
      return 
    }

    let newSize = event.target.id.replace("index", "")

    setSelectedSize(newSize)
    createItemChoices("itemSizesCont", "TALLE", storeageItem.sizes, newSize, sizeClickEvent, renderSize)
  })
}

const btnAddToCartEvent = () => {
  document.getElementById("addToCart").addEventListener("click", () => {
    let product = {
      name: storeageItem.name,
      price: storeageItem.price,
      size: getSelectedSize(),
      color: getSelectedColor()
    }

    console.log(`SIMULADOR: Producto a Agregar: ${JSON.stringify(product)}`)
  })
}


window.addEventListener("load", () => {
  setSelectedColor(storeageItem.colors[0])
  setSelectedSize(storeageItem.sizes[0])

  createThumbnails()
  let path = `../multimedia/Items/${storeageItem.imgfolder}/item0.webp`
  createMainImg(path)
  createItemInfo()
  createItemPaymentInf()
  createItemChoices("itemColorsCont", "COLOR", storeageItem.colors, getSelectedColor(), colorClickEvent, renderColor)
  createItemChoices("itemSizesCont", "TALLE", storeageItem.sizes, getSelectedSize(), sizeClickEvent, renderSize)

  btnAddToCartEvent()
})


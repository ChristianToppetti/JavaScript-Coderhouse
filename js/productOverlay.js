const createThumbnails = (imgFolder) => {
  itemThumbnailsCont.innerHTML = ""
  
  for(let i=0; i < maxThumbnails; i++) {
    let img = document.createElement("img")
    img.src = `./multimedia/Items/${imgFolder}/Item${i}.webp`
    img.alt = "IMG"

    itemThumbnailsCont.append(img)
    productOverlayThumbnailEvent(img)
  }
}

const createMainImg = (src) => {
  itemImgCont.innerHTML = ""

  let img = document.createElement("img")
  img.src = src
  img.alt = "IMG"
  
  itemImgCont.append(img)
}

const createItemPaymentInf = (price) => {
  let itemPaymentInfCont = document.getElementById("itemPaymentInfCont")
  itemPaymentInfCont.innerHTML = `<span>$${price}</span>
  <div>
      <i class="material-icons">credit_card</i> 
      <span>HASTA <strong>6</strong> CUOTAS SIN INTERES DE <strong>$${(price / 6).toFixed(2)}</strong></span>
  </div>
  <a href="#"><u>Ver medios de pago</u></a><br>
  <div>
      <i class="material-icons">local_shipping</i>
      <span>Llega gratis <strong>el lunes</strong> con Mercado Envios</span>
  </div> 
  <a href="#"><u>Ver formas de entrega</u></a>`
}

const createItemChoices = (contId, choiceTitle, itemChoices, currentChoice, renderCallback, eventCallback) => {
  let itemChoicesCont = document.getElementById(contId)
  let spanTitle = document.createElement("span")
  
  itemChoicesCont.innerHTML = ""

  spanTitle.innerHTML = `<strong>${choiceTitle}:</strong> <u>${currentChoice}</u>`
  itemChoicesCont.append(spanTitle)
  for(let choice of itemChoices) {
    let div = document.createElement("div")

    div.id = `index${choice}`

    renderCallback && renderCallback(div, choice)

    choice === currentChoice && (div.className = "selected")

    itemChoicesCont.append(div)
    eventCallback && eventCallback(div, itemChoices)
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
    default: {
      element.style.backgroundColor = "grey"
      break
    }
  }
}

const renderSize = (element, size) => element.innerHTML = size

const createItemInfo = (name) => {
  itemInfoCont.innerHTML = `<h2>${name.toUpperCase()}</h2>
  <div id="itemPaymentInfCont" class="main-tienda__product__info__payment"></div>
  <div class="separator"></div>
  <div id="itemColorsCont" class="main-tienda__product__info__colors"></div>
  <div id="itemSizesCont" class="main-tienda__product__info__sizes"></div>

  <input id="addToCart" class="buttons" type="button" value="AGREGAR AL CARRITO">   

  <div class="separator"></div>`
}

const getSelectedColor = () => sessionStorage.getItem("SELECTEDCOLOR")
const getSelectedSize = () => sessionStorage.getItem("SELECTEDSIZE")

const setSelectedColor = (color) => sessionStorage.setItem("SELECTEDCOLOR", color)
const setSelectedSize = (size) => sessionStorage.setItem("SELECTEDSIZE", size)


const createProductOverlay = (product) => {
  setSelectedColor(product.colors[0])
  setSelectedSize(product.sizes[0])

  createThumbnails(product.imgFolder)
  let path = `./multimedia/Items/${product.imgFolder}/Item0.webp`
  createMainImg(path)
  createItemInfo(product.name)
  createItemPaymentInf(product.price)
  createItemChoices("itemColorsCont", "COLOR", product.colors, getSelectedColor(), renderColor, productOverlayColorEvent)
  createItemChoices("itemSizesCont", "TALLE", product.sizes, getSelectedSize(), renderSize, productOverlaySizeEvent)

  btnAddToCartEvent(product)
  
  toggleDisplayNone(productOverlay)
}
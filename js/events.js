const productOverlayThumbnailEvent = (element) => {
    element.addEventListener("click", () => {
        createMainImg(element.src)
    })
}
  
const productOverlayColorEvent = (element, colors) => {
    element.addEventListener("click", (event) => {
        if(event.target.className.includes("selected")) { 
            return 
        }

        let newColor = event.target.id.replace("index", "")

        setSelectedColor(newColor)
        createItemChoices("itemColorsCont", "COLOR", colors, newColor, renderColor, productOverlayColorEvent)
    })
}
  
const productOverlaySizeEvent = (element, sizes) => {
    element.addEventListener("click", (event) => {
        if(event.target.className.includes("selected")) { 
            return 
        }

        let newSize = event.target.id.replace("index", "")

        setSelectedSize(newSize)
        
        createItemChoices("itemSizesCont", "TALLE", sizes, newSize, renderSize, productOverlaySizeEvent)
    })
}
  
const btnAddToCartEvent = (ojbProduct) => {
    document.getElementById("addToCart").addEventListener("click", () => {
        let cartItem = {
            product: ojbProduct,
            chosenSize: getSelectedSize(),
            chosenColor: getSelectedColor()
        }

        logedUser ? logedUser.addToCart(cartItem) : alert("Inicia sesion para agregar productos al carrito")
    })
}

const listenAuthEvents = (login) => {
    let btnAuthSwitch = document.getElementById("btnAuthSwitch")
    let btnAuthSubmit = document.getElementById("btnAuthSubmit")
  
    btnAuthSwitch.addEventListener("click", () => renderAuthForm(login ? false : true))

    btnAuthSubmit.addEventListener("click", (e) => {
        e.preventDefault()

        let inputAccUser = document.getElementById("accUser").value
        let inputAccPassword = document.getElementById("accPassword").value

        if(login) {
            if(loginAccount(inputAccUser, inputAccPassword)) {
                toggleDisplayNone(authOverlay)
                alert("Logeado con exito")
                document.getElementById("btnAccountText").textContent = "LOGEADO"
            } else {
                alert("Datos no validos")
            }
        } 
        else {
            let inputAccRepeatPassword = document.getElementById("accRepeatPassword").value
            let inputAccEmail = document.getElementById("accEmail").value

            inputAccRepeatPassword === inputAccPassword ? createAccount(inputAccUser, inputAccPassword, inputAccEmail) : alert("Las contraseñas no son coinciden.")
        }
    })
}

const listenCartItemsEvents = () => {
    let cartItems = document.querySelectorAll(".itemremove")

    for(item of cartItems) {
        item.addEventListener("click", (e) => {
            logedUser.removeFromCart(e.target.id)
            renderCartItems()
        })
    }
}

authOverlay.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleDisplayNone(authOverlay)
})

productOverlay.addEventListener("click", () => toggleDisplayNone(productOverlay))
btnAccount.addEventListener("click", () => logedUser ? alert("Ya estas logeado!") : toggleDisplayNone(authOverlay, renderAuthForm(true)))
btnShowCartOverlay.addEventListener("click", () => logedUser ? toggleDisplayNone(cartOverlay, renderCartItems) : alert("Inicia sesion para ver tu carrito"))
btnHideCartOverlay.addEventListener("click", () => toggleDisplayNone(cartOverlay))

authFormCont.addEventListener("click", (e) => e.stopPropagation())
cartOverlay.addEventListener("click", (e) => e.stopPropagation())
productCont.addEventListener("click", (e) => e.stopPropagation())

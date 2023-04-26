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

        isUserLoged() ? logedUser.addToCart(cartItem) : swal("", "Inicia sesion para agregar productos al carrito", "info")
    })
}

const listenAuthEvents = (login) => {
    let btnAuthSwitch = document.getElementById("btnAuthSwitch")
    let authForm = document.getElementById("authForm")
  
    btnAuthSwitch.addEventListener("click", () => login? renderAuthRegister() : renderAuthLogin())

    authForm.addEventListener("submit", (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        let inputAccUser = document.getElementById("accUser").value.trim()
        let inputAccPassword = document.getElementById("accPassword").value
        if(!inputAccUser) {
            swal("", "Introduzca un nombre de usuario valido.", "error")
            return
        }

        if(login) {
            let rememberCheckbox = document.getElementById("cbRememberLogin").checked

            if(loginAccount(inputAccUser, inputAccPassword, rememberCheckbox)) { 
                toggleDisplayNone(authOverlay) 
                swal("Bienvenido!", "Logeado con exito!", "success");
            } 
        } 
        else {
            let inputAccRepeatPassword = document.getElementById("accRepeatPassword").value
            let inputAccEmail = document.getElementById("accEmail").value
            let itsValid = (inputAccRepeatPassword === inputAccPassword)
            itsValid ? createAccount(inputAccUser, inputAccPassword, inputAccEmail) : swal("", "Las contraseñas no son coinciden.", "error")
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

btnAccount.addEventListener("click", () => {
    if(isUserLoged()) {
        swal("", "Ya estas logeado!", "info", {button: "Cerrar sesion"})
            .then(value => value && logoffAccount())
    } else {
        toggleDisplayNone(authOverlay, renderAuthLogin)
    }
})

footerNewsletter.addEventListener("submit", (e) => {
    e.preventDefault()
    swal("", "Te subscribiste al Newsletter con exito", "success")
})

btnShowCartOverlay.addEventListener("click", () => isUserLoged() ? toggleDisplayNone(cartOverlay, renderCartItems) : swal("", "Inicia sesion para ver tu carrito", "info"))

btnHideCartOverlay.addEventListener("click", () => toggleDisplayNone(cartOverlay))

btnBuyCart.addEventListener("click", () => {
    if(logedUser.cart == "") { 
        swal("", "El carrito esta vacio", "error")
        return
    }

    swal("Gracias por tu compra!", "Fin del simulador :)", "success")
    toggleDisplayNone(cartOverlay)
})

authFormCont.addEventListener("click", (e) => e.stopPropagation())

cartOverlay.addEventListener("click", (e) => e.stopPropagation())

productCont.addEventListener("click", (e) => e.stopPropagation())

window.addEventListener("load", () => initSimulator())

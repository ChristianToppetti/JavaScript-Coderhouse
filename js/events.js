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
        let userName = logedUser.userName
        isUserLoged() ? logedUser.addToCart(cartItem) : swal("", "Inicia sesion para agregar productos al carrito", "info")
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
        let rememberCheckbox = document.getElementById("cbRememberLogin").checked

        if(login) {
            if(loginAccount(inputAccUser, inputAccPassword, rememberCheckbox)) {
                toggleDisplayNone(authOverlay)
                swal("Bienvenido!", "Logeado con exito!", "success");
            } else {
                swal("Hubo un problema!", "Datos no validos", "error");
            }
        } 
        else {
            let inputAccRepeatPassword = document.getElementById("accRepeatPassword").value
            let inputAccEmail = document.getElementById("accEmail").value

            inputAccRepeatPassword === inputAccPassword ? createAccount(inputAccUser, inputAccPassword, inputAccEmail) : swal("", "Las contraseñas no son coinciden.", "error")
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
        swal("", "Ya estas logeado!", "info", {buttons: ["Cerrar sesion", "OK"]})
            .then(value => value || logoffAccount())
    } else {
        toggleDisplayNone(authOverlay, renderAuthForm(true))
    }
})

btnShowCartOverlay.addEventListener("click", () => isUserLoged() ? toggleDisplayNone(cartOverlay, renderCartItems) : swal("", "Inicia sesion para ver tu carrito", "info"))
btnHideCartOverlay.addEventListener("click", () => toggleDisplayNone(cartOverlay))

authFormCont.addEventListener("click", (e) => e.stopPropagation())
cartOverlay.addEventListener("click", (e) => e.stopPropagation())
productCont.addEventListener("click", (e) => e.stopPropagation())

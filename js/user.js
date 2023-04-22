const createAccount = (username, password, email) => {
    let newUser = new User(username, password, email, [])
    localStorage.setItem("USER", JSON.stringify(newUser)) 
    toggleDisplayNone(authOverlay)
    alert("Registrado con exito!")
}

const loginAccount = (username, password) => {
    let savedUser = JSON.parse(localStorage.getItem("USER"))
    if(!savedUser) {
        return false
    }

    if(username === savedUser.username && password === savedUser.password) {
        loadUser(savedUser.username, savedUser.password, savedUser.email, savedUser.cart)
        return true
    }
    return false
}

const renderAuthForm = (login=false) => {
    authFormCont.innerHTML = ""
    
    let authForm = document.createElement("form")
    authForm.enctype = "text/plain"

    if(login) {
      authForm.innerHTML = `
      <fieldset class="header__account__overlaycont__form">
        <legend>Iniciar Sesion</legend>
        <input class="header__account__overlaycont__form__input" placeholder="Usuario" type="text" name="accUser" id="accUser" required>
        <input class="header__account__overlaycont__form__input" placeholder="Contraseña" type="password" name="accPassword" id="accPassword" required>
        <input id="btnAuthSubmit" class="buttons" type="submit" value="INICIAR">
        <div>Es tu primera vez en Indra? <a href="#" id="btnAuthSwitch">Registrarse</a></div>
      </fieldset>`
    } else {
      authForm.innerHTML = `
      <fieldset class="header__account__overlaycont__form">
        <legend>Registrarse</legend>
        <input class="header__account__overlaycont__form__input" placeholder="Usuario" type="text" name="accUser" id="accUser" required>
        <input class="header__account__overlaycont__form__input" placeholder="Contraseña" type="password" name="accPassword" id="accPassword" required>
        <input class="header__account__overlaycont__form__input" placeholder="Repetir contraseña" type="password" name="accRepeatPassword" id="accRepeatPassword" required>
        <input class="header__account__overlaycont__form__input" placeholder="Correo electronico" type="email" name="accEmail" id="accEmail" required>
        <input id="btnAuthSubmit" class="buttons" type="submit" value="REGISTRARSE">
        <div>Ya tienes cuenta? <a href="#" id="btnAuthSwitch">Iniciar sesión</a></div>
      </fieldset>`
    }

    authFormCont.append(authForm)
    listenAuthEvents(login)
}
  
const renderCartItems = () => {
    cartItemsCont.innerHTML = ""
    
    if(!logedUser.cart.length) {
        let cartItem = document.createElement("div")
        cartItem.style.textAlign = "center"

        cartItem.innerHTML = `<h3 style="margin-top:1rem;">Carrito vacio...</h3>`

        cartItemsCont.append(cartItem)
        return
    }

    logedUser.cart.forEach((item, i) => {
        let cartItem = document.createElement("div")
        cartItem.className = "header__cart__overlay__itemscont__item shadow"
        
        cartItem.innerHTML += `
            <div class="itemimg"><img src="../multimedia/Items/${item.product.imgFolder}/Item0.webp" alt="IMG"></div>
            <div class="itemname">${item.product.name}</div>
            <div class="itemdetails">
                <div>TALLE <br><strong>${item.chosenSize}</strong></div>
                <div>COLOR <br><strong>${item.chosenColor}</strong></div>
                <div>PRECIO<br><strong>${item.product.price}</strong></div>
            </div>
            <div id="cartIndex${i}" class="itemremove"><i class="material-icons">&#xe14c;</i></div>`

        cartItemsCont.append(cartItem)
    })
    listenCartItemsEvents()
}


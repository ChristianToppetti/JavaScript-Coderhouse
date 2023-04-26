const isUserLoged = () => {
    let userName = logedUser.username
    return userName !== "Guest"
}

const loadAutoLogin = () => {
    let autoLogin = JSON.parse(sessionStorage.getItem("AUTOLOGIN"))

    if(autoLogin) {
        loginAccount(autoLogin.username, autoLogin.password, true)
    } else {
        loadUser("Guest", "", "", "")
    }
}

const setAutologin = (user, pass) => {
    let acc = {
        username: user,
        password: pass
    }
    sessionStorage.setItem("AUTOLOGIN", JSON.stringify(acc))
}

const removeAutologin = () => sessionStorage.removeItem("AUTOLOGIN")

const logoffAccount = () => {
    removeAutologin()
    location.reload()
}

const getAccount = (username) => {
    let accName = `ACC${username.trim().toUpperCase()}`
    let acc = localStorage.getItem(accName)
    return JSON.parse(acc)
}

const createAccount = (username, password, email) => {
    let newUser = new User(username, password, email, [])
    let accName = `ACC${username.trim().toUpperCase()}`

    if(!getAccount(username)) {
        newUser.saveAcc()
        toggleDisplayNone(authOverlay)
        swal("Listo!", "Registrado con exito!", "success")
        return
    }

    swal("Hubo un problema!", "El nombre de usuario ya esta en uso", "error")
}

const loginAccount = (username, password, remember=false) => {
    let savedUser = getAccount(username)
    if(!savedUser) {
        swal("Hubo un problema!", "La cuenta no existe", "error");
        return false
    }

    if(username === savedUser.username && password === savedUser.password) {
        loadUser(savedUser.username, savedUser.password, savedUser.email, savedUser.cart)
        btnAccountText.textContent = "LOGEADO"
        remember && setAutologin(username, password)
        return true
    }

    swal("Hubo un problema!", "Datos no validos", "error");
    return false
}

const renderAuthLogin = () => renderAuthForm(true)

const renderAuthRegister = () => renderAuthForm(false)

const renderAuthForm = (login) => {
    authFormCont.innerHTML = ""
    
    let authForm = document.createElement("form")
    authForm.enctype = "text/plain"
    authForm.className = "header__account__overlaycont__form"
    authForm.id = "authForm"

    if(login) {
      authForm.innerHTML = `
        <legend>Iniciar Sesion</legend>
        <input class="header__account__overlaycont__form__input" placeholder="Usuario" type="text" name="accUser" id="accUser" required>
        <input class="header__account__overlaycont__form__input" placeholder="Contraseña" type="password" name="accPassword" id="accPassword" required>
        <div>
            <input type="checkbox" id="cbRememberLogin">
            <label for="cbRememberLogin">Recordarme</label>
        </div>
        <input class="buttons" type="submit" value="INICIAR">
        <div>Es tu primera vez en Indra? <a href="#" id="btnAuthSwitch" style="text-decoration:underline;color:#d81919">Registrarse</a></div>`
    } else {
      authForm.innerHTML = `
        <strong>Registrarse</strong>
        <input class="header__account__overlaycont__form__input" placeholder="Usuario" type="text" name="accUser" id="accUser" required>
        <input class="header__account__overlaycont__form__input" placeholder="Contraseña" type="password" name="accPassword" id="accPassword" required>
        <input class="header__account__overlaycont__form__input" placeholder="Repetir contraseña" type="password" name="accRepeatPassword" id="accRepeatPassword" required>
        <input class="header__account__overlaycont__form__input" placeholder="Correo electronico" type="email" name="accEmail" id="accEmail" required>
        <input class="buttons" type="submit" value="REGISTRARSE">
        <div>Ya tienes cuenta? <a href="#" id="btnAuthSwitch" style="text-decoration:underline;color:#d81919">Iniciar sesión</a></div>`
    }

    authFormCont.append(authForm)
    listenAuthEvents(login)
    return authFormCont
}
  
const renderCartItems = () => {
    cartItemsCont.innerHTML = ""
    
    if(!logedUser.cart.length) {
        let cartItem = document.createElement("div")
        cartItem.style.textAlign = "center"

        cartItem.innerHTML = `<h3 style="margin-top:1rem;">Carrito vacio...</h3>`

        cartItemsCont.append(cartItem)
        cartTotalPrice.textContent = "Total: 0"
        return
    }

    let totalPrice = 0
    logedUser.cart.forEach((item, i) => {
        let cartItem = document.createElement("div")
        cartItem.className = "header__cart__overlay__itemscont__item shadow"
        
        cartItem.innerHTML += `
            <div class="itemimg"><img src="../multimedia/Items/${item.product.imgFolder}/Item0.webp" alt="IMG"></div>
            <div class="itemname">${item.product.name}</div>
            <div class="itemdetails">
                <div>TALLE <br><strong>${item.chosenSize}</strong></div>
                <div>COLOR <br><strong>${item.chosenColor}</strong></div>
                <div>PRECIO<br><strong>$${item.product.price}</strong></div>
            </div>
            <div id="cartIndex${i}" class="itemremove"><i class="material-icons">&#xe14c;</i></div>`

        cartItemsCont.append(cartItem)
        totalPrice += item.product.price
    })

    cartTotalPrice.textContent = `Total: $${totalPrice.toFixed(2)}`
    listenCartItemsEvents()
}


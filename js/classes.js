class User {
    constructor(username, password, email, cart) {
        this.username = username
        this.password = password
        this.email = email
        this.cart = cart
    }
    addToCart(item) {
        this.cart.push(item)
        this.saveUser()
        this.updateUserCartBtn()

        Toastify({
            text: `${item.product.name} se agrego al carrito.`,
            duration: 3000
        }).showToast();
    }
    removeFromCart(index) {
        index = parseInt(index.replace("cartIndex", "")) 
        this.cart.splice(index, 1)
        this.saveUser()
        this.updateUserCartBtn()
    }
    updateUserCartBtn() {
        let cartLen = this.cart.length
        btnCartText.textContent = `CARRITO (${cartLen ? cartLen : 0})`
    }
    saveAcc() {
        let accName = `ACC${this.username.trim().toUpperCase()}`
        localStorage.setItem(accName, JSON.stringify(this))
    }
}

class Product {
    constructor(id, name, type, price, sizes, colors, imgFolder, extraTags="") {
        this.id = `product${id}`
        this.name = name
        this.type = type
        this.price = parseFloat(price)
        this.sizes = sizes
        this.colors = colors
        this.imgFolder = imgFolder
        this.extraTags = extraTags
    }
    getTags() {
        let tags = [(this.extraTags && this.extraTags), this.type, this.sizes, this.colors].join().toLowerCase()
        return tags.split(",")
    }
    renderProduct(contHtml) {
        let divShopItem = document.createElement("div")
        divShopItem.id = this.id
        divShopItem.className = "shopitem"
        
        divShopItem.innerHTML = `
        <h3 class="shopitem__nametag">${this.name.toUpperCase().replace("tag", "")}</h3>

        <div class="shopitem__img">
        <img src="../multimedia/Items/${this.imgFolder}/Item0.webp" alt="IMG">
        <a id="${this.id}" class="shopitem__img__btn" href="#">VER MAS</a>
        </div>

        <div class="shopitem__pricetag">
        <span class="shopitem__pricetag__value">$ ${this.price.toFixed(2)}</span>
        <span><strong>6</strong> CUOTAS SIN INTERES DE <strong>$${(this.price / 6).toFixed(2)}</strong></span>
        </div>`

        contHtml.append(divShopItem)
    }
    listenEvent() {
        let product = document.getElementById(this.id)
        product.addEventListener("click", (e) => {
            e.preventDefault()
            createProductOverlay(this)
        })
    }
}

class CheckboxTagFilter {
    constructor(name, group, contHtml, itsRadio) {
        this.name = name
        this.group = group
        this.contHtml = contHtml
        this.itsRadio = itsRadio
        this.enabled = false
        this.checkboxId = `checkbox${this.name.trim()}`
    }
    toggleFilter() {
        this.enabled = this.enabled ? false : true

        if(this.itsRadio && this.enabled) {
            let thisCheckbox = document.getElementById(this.checkboxId)
            let chcekboxGroup = document.querySelectorAll(`input.${this.group.trim()}`)

            chcekboxGroup.forEach(checkbox => {
                if(checkbox != thisCheckbox && checkbox.checked) {
                    checkbox.click()
                }
            })
        }
    }
    createGroup() {
        let newGroup = document.createElement("ul")
        newGroup.id = this.group.trim()
        newGroup.innerHTML = `<p>${this.group.toUpperCase()}</p>`

        this.contHtml.append(newGroup)
        return newGroup
    }
    getGroup() {
        let getGroup = document.getElementById(this.group.trim())
        return getGroup ? getGroup : this.createGroup()
    }
    renderFilter() {
        let cbId = this.checkboxId
        let liCheckboxCont = document.createElement("li")

        liCheckboxCont.innerHTML += `
        <input type="checkbox" id="${cbId}" class="${this.group.trim()}">
        <label for="${cbId}">${this.name}</label>`
    
        this.getGroup().append(liCheckboxCont)
    }
    listenEvent() {
        let checkbox = document.getElementById(this.checkboxId)

        checkbox.addEventListener("click", () => {
            this.toggleFilter()
            showProducts()
        })
    }
}

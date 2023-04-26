const loadUser = (username, password, email, cart) => {
  logedUser = new User(username, password, email, cart)
  logedUser.updateUserCartBtn()
}

const loadTagFilter = (filter, group, contHtml, itsRadio=false) => filtersArray.push(new CheckboxTagFilter(filter, group, contHtml, itsRadio))

const loadProduct = (id, name, type, price, sizes, colors, imgfolder, extraTags) => productsArray.push(new Product(id, name, type, price, sizes, colors, imgfolder, extraTags))

const showCheckboxFilters = () => filtersArray.forEach(filter => {
  filter.renderFilter()
  filter.listenEvent()
})

const showProducts = () => {
  shopItemsCont.innerHTML = ""

  let activeFilters = getActiveFilters()
  
  if(!activeFilters) {
    productsArray.forEach(product => product.renderProduct(shopItemsCont))
    return
  }
  
  let foundAny = false
  for(let product of productsArray) {
    let tagsArr = product.getTags()

    let hasTag = activeFilters.every(filter => tagsArr.includes(filter.toLowerCase()))

    if(hasTag) {
      product.renderProduct(shopItemsCont)
      product.listenEvent()
      foundAny = true
    }
  }

  if(!foundAny) {
    shopItemsCont.innerHTML = `
    <div style="text-align:center;width:100%;margin:auto"> 
      <h2>No se encontraron coincidencias..</h2> 
    </div>`
  }
}

const getActiveFilters = () => {
  let activeFilters = []

  filtersArray.forEach(filter => filter.enabled && activeFilters.push(`${filter.name.toLowerCase()}`))
  return activeFilters
}

const toggleDisplayNone = (element, callback) => {
  element.classList.contains("displaynone") ? element.classList.remove("displaynone") : element.classList.add("displaynone")
  
  element != cartOverlay && hideCartOverlay()

  callback && callback()
}

const hideCartOverlay = () => cartOverlay.classList.contains("displaynone") || cartOverlay.classList.add("displaynone")

async function loadDb() {
  await fetch(`../json/products.json`)
    .then(res => res.json())
    .then(objArr => objArr.forEach((obj, i) => {
      loadProduct(i, obj.name, obj.type, obj.price, obj.sizes, obj.colors, obj.imgFolder, obj.extraTags)
    }))

  await fetch(`../json/filters.json`)
    .then(res => res.json())
    .then(objArr => objArr.forEach(obj => {
        loadTagFilter(obj.tag, obj.group, filtersCont, obj.itsRadio)
    }))
}

async function initSimulator() {
  await loadDb()
  loadAutoLogin()
  showCheckboxFilters()
  showProducts()
}


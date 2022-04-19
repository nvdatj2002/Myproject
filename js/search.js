window.addEventListener('load',function(e){
    const params = new URLSearchParams(window.location.search)
    const name = params.get('name')
    const products = store.findListProductByName(name)
    let product = ''
    for (let i = 0; i < products.length; i++) {
        product += `
    <div class="grid__column">
        <a href="/html/sanpham.html?id=${products[i].id}" class="grid-column-content">
             <div class="grid-column-content-img">
                <img src="${products[i].hinhAnh}" alt="" class="grid-column-item-img">
            </div>
            <div class="grid-column-content-item">
                <a class="grid-column-content-name" href="">${products[i].ten}</a>
                <p class="grid-column-content-price">${products[i].gia}</p>
            </div>
        </a>
    </div>`
    }
    document.querySelector('.resultSearch h2').innerHTML = `Kết quả tìm kiếm : ${name}`
    document.getElementById('timkiem').innerHTML = product
})
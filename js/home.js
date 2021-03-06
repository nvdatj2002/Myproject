class Product {
    constructor(ten, gia, hinhAnh, moTa, id) {
        this.ten = ten
        this.gia = gia
        this.hinhAnh = hinhAnh
        this.moTa = moTa
        this.id = id
    }
    getId() {
        return this.id
    }
    getName() {
        return this.ten
    }
    getGia() {
        return this.gia
    }
    getMoTa() {
        return this.moTa
    }
    getImg() {
        return this.hinhAnh
    }
}

class listProduct {
    constructor() {
        this.list = []
    }
    getList() {
        return this.list
    }
    getData() {
        const data = localStorage.getItem('data')
        if (data) {
            const listData = JSON.parse(data)
            const listGetData = []
            listData.forEach(value => {
                listGetData.push(value)
            })
            this.list = listGetData
        }
    }
    findListProductByName(name) {
        let list = this.list
        let listNew = list.filter(value => value.ten.trim() == name)
        return listNew
    }
}

const store = new listProduct()
store.getData()
function renderProductHome(store) {
    let product = ''
    for (let i = 0; i < store.length; i++) {
        product += `
    <div class="grid__column">
        <a href="/html/sanpham.html?id=${store[i].id}" class="grid-column-content">
             <div class="grid-column-content-img">
                <img src="${store[i].hinhAnh}" alt="" class="grid-column-item-img">
            </div>
            <div class="grid-column-content-item">
                <a class="grid-column-content-name" href="">${store[i].ten}</a>
                <p class="grid-column-content-price">${store[i].gia}</p>
            </div>
        </a>
    </div>`
    }
    document.getElementById('home').innerHTML = product
}

renderProductHome(store.getList())


$(document).ready(function () {
    $('.product-best-sale-slider').slick({
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 1000,
        ifinite: true,
        dots: true,
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    });
});

let slideIndex = 1;
// let myIndex = 0;
let x = document.getElementsByClassName('mySlides');
showDivs(slideIndex); // show slide ?????u ti??n
function plusDivs(n) {
    // h??m c???ng index
    // n???u ???n v??? ph??a sau. c???ng th??m 1
    // n???u ???n v??? ph??a tr?????c tr??? 1 
    showDivs(slideIndex += n);
}
function showDivs(n) {
    //h??m show sildes
    let i;
    // ki???m tra n???u index ngo??i length s??? g??n l???i index = 1;
    if (n > x.length) {
        slideIndex = 1;
    }
    // ki???m tra n???u index > 1 s??? g??n l???i index = lenth;
    if (n < 1) {
        slideIndex = x.length;
    }
    // Css display = 'none' t???t c??? c??c sildes 
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    // show slide 
    x[slideIndex - 1].style.display = 'block'
}

// ki???m tra user ????ng nh???p

let dataLogin = localStorage.getItem('userLogin')
let currenUserLogin = JSON.parse(dataLogin)

if (currenUserLogin) {
    let login = `<div class="header-account">
            <a href="" class="login-item">
            ${currenUserLogin.username}
            </a>
            <div class="login">
                <a href="" class="login-item">
                Th??ng tin c?? nh??n
            </a>
            <a href="" onclick="logOut()" class="login-item">
                ????ng xu???t
            </a>
        </div>
    </div>`
    document.querySelector('.header-account').innerHTML = login
}
function logOut() {
    localStorage.removeItem('userLogin')
}

// t??m ki???m s???n ph???m 
document.querySelector('.click').addEventListener('click',function(e) {
    const x = document.querySelector('.header-search-input')
    if(x.style.display == 'flex') {
        x.style.display = 'none'
    }else {
        x.style.display = 'flex'
    }
})
function btnSearch() {
    let name = document.getElementById('inputSearch').value
    listSearch = store.findListProductByName(name)
    if(name == '') {
        return
    }
    if(listSearch) {
        window.location = `/html/timkiemsanpham.html?name=${name}`
    }
}


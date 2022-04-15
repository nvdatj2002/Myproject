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
}

const store = new listProduct()
store.getData()
console.log(store.getList())
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
    document.querySelector('.grid__row').innerHTML = product
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
showDivs(slideIndex); // show slide đầu tiên
function plusDivs(n) {
    // hàm cộng index
    // nếu ấn về phía sau. cộng thêm 1
    // nếu ấn về phía trước trừ 1 
    showDivs(slideIndex += n);
}
function showDivs(n) {
    //hàm show sildes
    let i;
    // kiểm tra nếu index ngoài length sẽ gán lại index = 1;
    if (n > x.length) {
        slideIndex = 1;
    }
    // kiểm tra nếu index > 1 sẽ gán lại index = lenth;
    if (n < 1) {
        slideIndex = x.length;
    }
    // Css display = 'none' tất cả các sildes 
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    // show slide 
    x[slideIndex - 1].style.display = 'block'
}

// kiểm tra user đăng nhập

let dataLogin = localStorage.getItem('userLogin')
let currenUserLogin = JSON.parse(dataLogin)

if (currenUserLogin) {
    let login = `<div class="header-account">
            <a href="" class="login-item">
            ${currenUserLogin.username}
            </a>
            <div class="login">
                <a href="" class="login-item">
                Thông tin cá nhân
            </a>
            <a href="" onclick="logOut()" class="login-item">
                Đăng xuất
            </a>
        </div>
    </div>`
    document.querySelector('.header-account').innerHTML = login
}
function logOut() {
    localStorage.removeItem('userLogin')
}


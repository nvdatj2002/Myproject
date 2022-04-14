// let myIndex = 0;
// // carousel();

// function carousel() {
//     let i;
//     let x = document.getElementsByClassName('slides');
//     console.log(x);
//     for(i = 0; i < x.length; ++i){
//         x[i].style.display = 'none'
//     }
//     myIndex++;
//     if(myIndex > x.length){ myIndex = 1};
//     x[myIndex - 1].style.display = 'block';
//     setTimeout(carousel, 4000);
// }


function btnSize() {
    var x = document.querySelectorAll('.btnSize');
    const $ = document.querySelector.bind(document);
    x.forEach(function (size, index) {
        size.onclick = function () {
            $('.btnSize.btn-active-size').classList.remove('btn-active-size')
            this.classList.add('btn-active-size')
        }
    })
}
btnSize();

class SanPham {
    constructor(ten, hinhanh, gia, soluong) {
        this.ten = ten
        this.hinhanh = hinhanh
        this.gia = gia
        this.soluong = soluong
    }
}
class GioHang {
    constructor() {
        this.gioHang = []
    }
    getGioHang() {
        return this.gioHang
    }
    themSanPham(sanpham) {
        this.gioHang.push(sanpham)
    }
    findProductByName(name) {
        let list = this.gioHang
        let x = list.find(value => value.ten == name)
        return x
    }
    deleteProductByName(name) {
        console.log(name)
        let list = this.gioHang
        for (let i = 0; i < list.length; i++) {
            console.log(list[i].ten)
            if(list[i].ten == name){
                console.log('s')
                this.gioHang.splice(i,1)
            }
        }
    }
}




const gioHang = new GioHang()
function addProductCart() {
    const ten1 = document.getElementById('ten').innerText
    const gia = document.getElementById('giaban').innerText
    const img = document.getElementById('hinhanh').src
    const soluong = parseInt(document.getElementById('soluong').value)
    const sanPham = new SanPham(ten1, img, gia, soluong)
    let sp = gioHang.findProductByName(ten1)
    if (sp) {
        let sl = parseInt(document.getElementById('soLuong').innerText)
        sp.soluong =  sl + soluong
    } else {
        gioHang.themSanPham(sanPham)
    }
    render()
}
function render() {
    let x
    for (let i = 0; i < gioHang.getGioHang().length; i++) {
        let item = gioHang.getGioHang()[i]
        console.log(item)
        x = `
            <li>
                <div class="cart-info-item">
                    <img id="cart-img" src="${item.hinhanh}" alt="" width="100px">
                        <div class="cart-info-item-content">
                            <a id="cart-ten" href="">${item.ten}</a>
                            <br></br>
                            <span id="soLuong">${item.soluong}</span>
                            <span>X</span>
                            <span id="cart-gia">${item.gia}</span>
                            <br></br>
                            <button onclick="deleteProductCart('${item.ten}')">Xoá</button>
                        </div>
                </div>
            </li> `
    }
    document.getElementById('ul').innerHTML = x
}
function render2() {
    let x = `<li> Bạn chưa có sản phẩm nào </li>`
    document.getElementById('ul').innerHTML = x
}
function deleteProductCart(name) {
    gioHang.deleteProductByName(name)
    if(gioHang.getGioHang().length > 0) {
        render()
    }else {
        render2()
    }
}





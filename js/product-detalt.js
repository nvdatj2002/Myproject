window.addEventListener('load',function(e){
    const params = new URLSearchParams(window.location.search)

    console.log(params)
    const id = params.get('id')
    const product = list.findProduct(id)
    if(product) {
        this.document.getElementById('ten').innerText = product.ten
        this.document.getElementById('hinhanh').src = product.hinhAnh
        this.document.getElementById('giaban').innerText = product.gia
        this.document.getElementById('ten2').innerText = product.ten
    }
})
let dataLogin = localStorage.getItem('userLogin')
let currenUserLogin = JSON.parse(dataLogin)
console.log(currenUserLogin)
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



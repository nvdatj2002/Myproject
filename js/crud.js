class Product {
    constructor(ten, gia, hinhAnh, id) {
        this.ten = ten
        this.gia = gia
        this.hinhAnh = hinhAnh
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
    addProduct(product) {
        let list = this.list
        let isCheck = true
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == product.id) {
                isCheck = false
            }
        }
        if (!isCheck) {
            return isCheck
        } else {
            this.list.push(product)
            isCheck = true
        }
        return isCheck
    }

    findProductByName(name) {
        let list = this.list
        let kt
        for (let i = 0; i < list.length; i++) {
            if (list[i].ten == name) {
                kt = true
            }
        }
        if (kt) {
            console.log(kt)
        } else {
            console.log('khong tim thay!')
        }
    }
    updateProduct(product) {
        let list = this.list
        console.log(product.id)
        // console.log('b')
        console.log(list.length)
        for (let i = 0; i < list.length; i++) {
            console.log('1')
            if (list[i].id == product.id) {
                list[i] = product
            }
        }
    }
    findProduct(id) {
        let list = this.list
        let kt
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                return list[i]
            }
        }
    }
    sortById() {
        let list = this.list
        list.sort((a,b) => a.id-b.id)
    }
    sortGia() {
        let list = this.list
        list.sort((a,b) => a.gia-b.gia)
    }
    removeProduct(id) {
        let list = this.list
        let kt = false
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                this.list.splice(i, 1)
                kt = true
            }
        }
        return kt
    }
    saveData() {
        const data = JSON.stringify(this.list)
        localStorage.setItem('data', data)
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
    delete() {
        localStorage.removeItem('data', data)
        // this.list.saveData()
    }
}

const list = new listProduct()
list.getData()
render(list.getList())
console.log(list.getList())


function render(list) {
    let table = `<tr>
             <th>ID</th>
             <th>Tên</th>
             <th>Hình Ảnh</th>
             <th>Giá</th>
         </tr>` ;
    for (let i = 0; i < list.length; i++) {
        table += `<tr>
                           <td>${list[i].id}</td>
                           <td>${list[i].ten}</td>
                           <td><img src="${list[i].hinhAnh}" alt="" height = 100px ></td>
                           <td>${list[i].gia}</td>
                           <td> 
                           <button onclick="editProduct('${list[i].id}')"> Sửa</button> 
                           <button onclick="deteleProduct('${list[i].id}')"> Xoá</button>
                           </td>
                       </tr>`
    }
    console.log(document.getElementById('render'))
    document.getElementById('render').innerHTML = table
}
function tbnAdd() {
    const x = document.querySelector('.add-product')
    if (x.style.display == 'block') {
        
    }else {
        x.style.display = 'block'
    }
}

function btnHuy () {
    const x = document.querySelector('.add-product')
    document.getElementById('id').value = ''
    document.getElementById('ten').value = ''
    document.getElementById('img').value = ''
    document.getElementById('gia').value = ''
    x.style.display = 'none'
}
function btnSortId() {
    list.sortById()
    render(list.getList())
}
function btnSortGia() {
    list.sortGia()
    render(list.getList())
}
function deteleProduct(id) {
    list.removeProduct(id)
    render(list.getList())
}
function editProduct(id) {
    tbnAdd()
    let product = list.findProduct(id)
    document.getElementById('id').value = product.id
    document.getElementById('ten').value = product.ten
    document.getElementById('img').value = product.hinhAnh
    document.getElementById('gia').value = product.gia
    // let x = document.querySelector('.add-product')
    // x.style.display = 'block'
}
function saveUpdate() {
    let id = document.getElementById('id').value
    let ten = document.getElementById('ten').value
    let img = document.getElementById('img').value
    let gia = document.getElementById('gia').value
    const product = new Product(ten, gia, img, id)
    list.updateProduct(product)
    list.saveData()
    render(list.getList())
}
function add() {
    let id = document.getElementById('id').value
    let ten = document.getElementById('ten').value
    let img = document.getElementById('img').value
    let gia = document.getElementById('gia').value
    if (id == '' || ten == '' || mota == '' || img == '' || gia == '') {
        alert('nhập đầy đủ thông tin')
    } else {
        let product = new Product(ten, gia, img, id)
        list.addProduct(product)
        list.saveData()
        render(list.getList())
        document.getElementById('id').value = ''
        document.getElementById('ten').value = ''
        document.getElementById('img').value = ''
        document.getElementById('gia').value = ''
    }
}



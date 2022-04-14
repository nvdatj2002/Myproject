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
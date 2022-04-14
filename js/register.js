class User {
    constructor(name, username, email, password, gioitinh) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.gioitinh = gioitinh;
    }
    getUsername() {
        return this.username
    }
    getPassword() {
        return this.password
    }
    xuatThongTin() {
        console.log(`Name: ${this.name}`)
        console.log(`username: ${this.username}`)
        console.log(`email: ${this.email}`)
        console.log(`password: ${this.password}`)
        console.log(`roles: ${this.roles}`)
    }
}

class StoreUser {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        const currentList = this.users
        let flag = false
        for (let i = 0; i < currentList.length; i++) {
            const currenUser = currentList[i]
            if (currenUser.getUsername() === user.getUsername()) {
                return flag
            }
        }
        if (!flag) {
            flag = true;
            this.users.push(user)
        }
        return flag

    }
    login(username, password) {
        const currentList = this.users
        let user;
        for (let i = 0; i < currentList.length; i++) {
            const currenUser = currentList[i]
            if (currenUser.getUsername() === username &&
                currenUser.getPassword() === password
            ) {
                return currenUser
            }
        }
        return user
    }
    getListUser() {
        return this.users;
    }
    save() {
        const data = JSON.stringify(this.users)
        localStorage.setItem('users', data)
    }
    getdata() {
        const data = localStorage.getItem('users')
        if (data) {
            const arrUser = JSON.parse(data)
            const listUser = []
            for (let i = 0; i < arrUser.length; i++) {
                const userTemp = new User(arrUser[i].name,
                    arrUser[i].username, arrUser[i].email,
                     arrUser[i].password, arrUser[i].roles)
                     listUser.push(userTemp)
            }
            this.users = listUser
        }
    }
    deleteData() {
        const data = JSON.stringify(this.users)
        localStorage.removeItem('users', data)
    }
}
const store = new StoreUser();
store.getdata()
// store.deleteData()

for (let i = 0; i < store.getListUser().length; i++) {
    console.log(store.getListUser()[i])
}
document.getElementById('frmDangKy').addEventListener('submit', function (e) {
    e.preventDefault()
    const name = document.getElementById('name').value
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const gioitinh = document.querySelector('.lable lable-gender').value

    console.log('name', name)

    const createUser = new User(name, username, email, password, gioitinh)
    const isCheck = store.addUser(createUser)
    if (isCheck) {
        console.log('a')
        store.save()
    }
    console.log('is check', isCheck)
}) 


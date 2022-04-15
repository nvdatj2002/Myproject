class User {
    constructor(username, password, roles) {
        this.username = username
        this.password = password
        this.roles = roles
    }
    getUsername() {
        return this.usename
    }
    getPassword() {
        return this.password
    }
    getRole() {
        return this.role
    }
}
class listUser {
    constructor() {
        this.list = []
    }
    getData() {
        const data = localStorage.getItem('users')
        if (data) {
            const arrUser = JSON.parse(data)
            const listUser = []
            arrUser.forEach(value => {
                listUser.push(value)
            });
            this.list = listUser
        }
    }
    getList() {
        return this.list
    }
}
let list = new listUser()
list.getData()

// list.getList().forEach(value => console.log(value))

let userLogin
document.getElementById('form') && document.getElementById('form').addEventListener('submit', function (e) {
    console.log('a')
    e.preventDefault()
    let usernameLogin = document.getElementById('username').value
    let passwordLogin = document.getElementById('password').value
    // value.role == 'admin'
    // list.getList().forEach(value => console.log(value.username))
    const loginAdmin = list.getList().find(value => {
        return value.username == usernameLogin && value.password == passwordLogin && value.roles == 'admin'
    })
    const loginUser = list.getList().find(value => {
        return value.username == usernameLogin && value.password == passwordLogin && value.roles == 'user'
    })
    if (usernameLogin == '' || passwordLogin == '') {
        return 
    } else {
        if (loginAdmin) {
            alert('Đăng nhập thành công, bạn là admin')
            let data = JSON.stringify(loginAdmin)
            localStorage.setItem('userLogin',data)
            window.location= '/html/admin.html'
        } else if (loginUser) {
            alert('Đăng nhập thành công, bạn là user')
            console.log(loginUser)
            let data = JSON.stringify(loginUser)
            localStorage.setItem('userLogin',data)
            window.location= `/html/index.html`
        } else {
            alert('Username hoặc password không chính xác')
        }
    }
})

  
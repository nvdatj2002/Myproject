class User {
    constructor(name, username, email, password, roles) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
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
// s??? ki???n submit form
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault()
    const name = document.getElementById('name').value
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const role = document.getElementById('role').value

    if (name == '' || username == '' || email == '' || password == '' || role == 'Select roles') {
        if (name == '') {
            document.getElementById('messageName').innerText = 'Vui l??ng nh???p h??? t??n'
            document.getElementById('messageName').parentElement.classList.add('invalid')
        }
        if (username == '') {
            document.getElementById('messageUsername').innerText = 'Vui l??ng nh???p t??n ????ng nh???p'
            document.getElementById('messageUsername').parentElement.classList.add('invalid')
        }
        if (email == '') {
            document.getElementById('messageEmail').innerText = 'Vui l??ng nh???p Email'
            document.getElementById('messageEmail').parentElement.classList.add('invalid')
        }
        if (password == '') {
            document.getElementById('messagePassword').innerText = 'Vui l??ng nh???p nh???p m???t kh???u'
            document.getElementById('messagePassword').parentElement.classList.add('invalid')
        } if (role == 'Select roles') {
            document.getElementById('messageRole').innerText = 'Vui l??ng ch???n role'
            document.getElementById('messageRole').parentElement.classList.add('invalid')
        }
    } else {
        const createUser = new User(name, username, email, password, role)
        if (store.addUser(createUser)) {
            store.save()
            alert('????ng k?? th??nh c??ng')
            document.getElementById('name').value = ''
            document.getElementById('username').value = ''
            document.getElementById('email').value = ''
            document.getElementById('password').value = ''
            document.getElementById('role').value = ''
        }else {
            // alert('T??n t??i kho???n ???? t???n t???i')
            document.getElementById('messageUsername').innerText = 'T??i Kho???n ???? t???n t???i'
            document.getElementById('messageUsername').parentElement.classList.add('invalid')
        }
    }
})

// s??? ki???n blur ra kh???i ?? input
document.getElementById('name').addEventListener('blur', function (e) {
    if (e.target.value == '') {
        document.getElementById('messageName').innerText = 'Vui l??ng nh???p h??? t??n'
        document.getElementById('messageName').parentElement.classList.add('invalid')
    } else {
        document.getElementById('messageName').innerText = ''
        document.getElementById('messageName').parentElement.classList.remove('invalid')
    }
})
document.getElementById('username').addEventListener('blur', function (e) {
    if (e.target.value == '') {
        document.getElementById('messageUsername').innerText = 'Vui l??ng nh???p t??n ????ng nh???p'
        document.getElementById('messageUsername').parentElement.classList.add('invalid')
    } else {
        document.getElementById('messageUsername').innerText = ''
        document.getElementById('messageUsername').parentElement.classList.remove('invalid')
    }
})
document.getElementById('email').addEventListener('blur', function (e) {
    if (e.target.value == '') {
        document.getElementById('messageEmail').innerText = 'Vui l??ng nh???p Email'
        document.getElementById('messageEmail').parentElement.classList.add('invalid')
    } else {
        document.getElementById('messageEmail').innerText = ''
        document.getElementById('messageEmail').parentElement.classList.remove('invalid')
    }
})
document.getElementById('password').addEventListener('blur', function (e) {
    if (e.target.value == '') {
        document.getElementById('messagePassword').innerText = 'Vui l??ng m???t kh???u'
        document.getElementById('messagePassword').parentElement.classList.add('invalid')
    } else {
        document.getElementById('messagePassword').innerText = ''
        document.getElementById('messagePassword').parentElement.classList.remove('invalid')
    }
})
document.getElementById('role').addEventListener('blur', function (e) {
    if (e.target.value == 'Select roles') {
        document.getElementById('messageRole').innerText = 'Vui l??ng ch???n role'
        document.getElementById('messageRole').parentElement.classList.add('invalid')
    } else {
        document.getElementById('messageRole').innerText = ''
        document.getElementById('messageRole').parentElement.classList.remove('invalid')
    }
})


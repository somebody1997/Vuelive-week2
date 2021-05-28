const url = "https://vue3-course-api.hexschool.io/";

const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const form = document.querySelector('#form');
const loginBtn = document.querySelector('#login');
loginBtn.addEventListener('click', login);

function login(event){
    event.preventDefault();
    const Email = inputEmail.value;
    const Password = inputPassword.value;
    const data = {
        Email,
        Password
    }
    axios.post(`${url}admin/singin`, data).then((res) =>{
        if(res.data.success){
            alert('登入成功，請稍候');
            const { token,expired } = res.data;
            document.cookie = `hexToken = ${token}; expires = ${ new Data(expired) }; path = /`;
            window.location = `productslist.html`;
            console.log(expired, new Date(expired));
        }else {
            alert('登入失敗，請確認帳密是否正確');
        }
    }).catch((error) => {
        console.log(error);
    });
}
form.addEventListener('submit',login)


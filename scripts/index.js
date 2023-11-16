function fetchMock(url, options) {

    let response = `You have successfully authenticated!`;

    return {
        then(callback) {
            return {
                url: url,
                response: response,
                success: callback,
                error: callback
            };
        },

        ok: true,

        getUrl() {
            return url;
        },
        setUrl(newUrl) {
            url = newUrl;
        },
        
        getResponse() {
            return response;
        },
        setResponse(newResponse) {
            response = newResponse;
        }
    };
}

function validateUser(username) {

if (/^\w*[a-zа-яё -]+\w*\d*$/i.test(username) && username.length > 3) {
    return true
} else {
    alert('Имя пользователя должно содержать не менее 4 символов и быть написан на латинице')
    document.getElementById("username").focus();
    return false
}
}

function validateEmail(email) {
if (email === "") {
    alert("Заполните поле email!");
    return false;
} else if (!/^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+\.)+[A-Za-z]{2,6}$/.test(email)) {

    alert("Неверный формат email!");
    document.getElementById("email").focus();
    return false;

}
return true;
}

function validatePassword(password) {

if (password.length < 8) {
  alert("Пароль должен быть длиной не менее 8 символов, а так же быть написан на латинице.");
  document.getElementById("password").focus();
  return false;
}
if (!password.match(/\d/)) {
  alert("Ваш пароль должен содержать хотя бы одну цифру, а так же быть написан на латинице.");
  document.getElementById("password").focus();
  return false;
} 
if (!password.match(/[a-z]/)) {
  alert("Ваш пароль должен содержать хотя бы одну строчную букву, а так же быть написан на латинице.");
  document.getElementById("password").focus();
  return false;
} 
if (!password.match(/[A-Z]/)) { 
  alert("Ваш пароль должен содержать хотя бы одну заглавную букву, а так же быть написан на латинице.");
  document.getElementById("password").focus();
  return false;
} 
return true;
}

document.querySelector('.auth__form-submit').addEventListener('click', async (event) => { 

    event.preventDefault();

    const form = event.target.form

    const username = form.querySelector('.auth__form-username').value.trim();
    const email = form.querySelector('.auth__form-email').value;
    const password = form.querySelector('.auth__form-password').value;

    const formData = new FormData(form);

    if (validateUser(username) && validateEmail(email) && validatePassword(password)) {
        const response = fetchMock('/api/authenticate', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert(response.getResponse());
        } else {
            throw new Error('Error authenticating');
        }    
    }
});


//-------------------------------------------------------------------------------------------------------------------------------------------------
//Код для работы с визуальной частью

let passwordVisibility = false

document.querySelector('.auth__form-container').addEventListener('click', (e) => {
document.querySelector('.auth__form-eye-hide').classList.toggle('hide')
document.querySelector('.auth__form-eye-open').classList.toggle('hide')

if(!passwordVisibility) {
    document.querySelector('.auth__form-password').setAttribute('type', 'text')
} else {
    document.querySelector('.auth__form-password').setAttribute('type', 'password')
}

passwordVisibility = !passwordVisibility
})

const buttonCreateAuth = document.querySelector('.auth__header-create')
const backlight = document.querySelector('.auth__header-backlight')

buttonCreateAuth.addEventListener('click', (e) => {
document.querySelector('.auth__form-create').classList.remove('hidden')
document.querySelector('.auth__form-login').classList.add('hidden')

backlight.style.transform = 'translate(0, 0)'
})

const buttonloginAuth = document.querySelector('.auth__header-login')

buttonloginAuth.addEventListener('click', (e) => {
document.querySelector('.auth__form-login').classList.remove('hidden')
document.querySelector('.auth__form-create').classList.add('hidden')

backlight.style.transform = 'translate(calc(100% + 5px), 0)'
})

//-------------------------------------------------------------------------------------------------------------------------------------------------
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
        getUser() {
            return {
                email: 'Ylab2023@gmail.com',
                password: 'ivnwFei135'
            }
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
if (username === '') {
    alert('fill in the fields')
    return false
}
if (/^\w*[a-zа-яё -]+\w*\d*$/i.test(username) && username.length > 3) {
    return true
} else {
    alert('The username must contain at least 4 characters')
    document.getElementById("username").focus();
    return false
}
}

function validateEmail(email) {
    email = String(email)
if (email === "") {
    alert("Fill in the email field!");
    return false;
} else if (!/^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+\.)+[A-Za-z]{2,6}$/.test(email)) {

    alert("Invalid email format!");
    return false;

}
return true;
}

function validatePassword(password) {

    password = String(password)

if (password.length < 8) {
  alert("The password must be at least 8 characters long, and also be written in Latin.");
  return false;
}
if (!password.match(/\d/)) {
  alert("Your password must contain at least one number and be written in Latin.");
  return false;
} 
if (!password.match(/[a-z]/)) {
  alert("Your password must contain at least one lowercase letter and also be written in Latin.");
  return false;
} 
if (!password.match(/[A-Z]/)) { 
  alert("Your password must contain at least one capital letter and be written in Latin.");
  return false;
} 
return true;
}

document.querySelector('.auth__form-submit-create').addEventListener('click', async (event) => { 

    event.preventDefault();

    const form = event.target.form

    const username = form.querySelector('.auth__form-username-create').value.trim();
    const email = form.querySelector('.auth__form-email-create').value;
    const password = form.querySelector('.auth__form-password-create').value;

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

document.querySelector('.auth__form-submit-login').addEventListener('click', async (event) => { 

    event.preventDefault();

    const form = event.target.form

    const emailValue = form.querySelector('.auth__form-email-login').value;
    const passwordValue = form.querySelector('.auth__form-password-login').value;

    console.log(emailValue)

    if (validateEmail(emailValue) && validatePassword(passwordValue)) {
        const response = fetchMock('/api/authenticate');
        if (response.ok) {

            const email = response.getUser().email
            const password = response.getUser().password

            if(email === emailValue && password === passwordValue) {
                alert('you have been logged in')
            } else {
                alert('password or login do not match, try again')
            }

        } else {
            throw new Error('Error authenticating');
        }    
    }
});


//-------------------------------------------------------------------------------------------------------------------------------------------------
//Код для работы с визуальной частью a large part of the visual assessment has been added, and validation functions have also been implemented.

let passwordVisibilityCreate = false
let passwordVisibilityLogin = false


document.querySelectorAll('.auth__form-container').forEach((el, index) => {
    el.addEventListener('click', () => {
        
        document.querySelectorAll('.auth__form-eye-hide')[index].classList.toggle('hide')
        document.querySelectorAll('.auth__form-eye-open')[index].classList.toggle('hide')

        if(!passwordVisibilityCreate && index === 0) {
            document.querySelector('.auth__form-password-create').type = "text"
            passwordVisibilityCreate = !passwordVisibilityCreate
        } else if(index === 0) {
            document.querySelectorAll('.auth__form-password')[index].setAttribute('type', 'password')
            passwordVisibilityCreate = !passwordVisibilityCreate
        }

        if(!passwordVisibilityLogin && index === 1) {
            document.querySelectorAll('.auth__form-password')[index].setAttribute('type', 'text')
            passwordVisibilityLogin = !passwordVisibilityLogin
        } else if(index === 1) {
            document.querySelectorAll('.auth__form-password')[index].setAttribute('type', 'password')
            passwordVisibilityLogin = !passwordVisibilityLogin
        }

    })
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
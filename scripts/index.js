document.querySelector('.auth__form-submit').addEventListener('click', (e) => {
    e.preventDefault()
})

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
    backlight.style.transform = 'translate(0, 0)'
})

const buttonloginAuth = document.querySelector('.auth__header-login')

buttonloginAuth.addEventListener('click', (e) => {
    backlight.style.transform = 'translate(calc(100% + 5px), 0)'
})
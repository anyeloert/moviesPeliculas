const loginForm = document.querySelector('.login-form')

//manejo de la accion submit
const handleSubmit = e => {
    e.preventDefault()
    const inputName = document.querySelector("input[type='text']").value
    const inputPassword = document.querySelector("input[type='password']").value
    //validacion del campo usuario que no este vacio
    if (inputName === ''){
        const notUserWarning = document.querySelector('.not_user_warning')
        notUserWarning.style.display = 'block'
        setTimeout(() => {
            notUserWarning.style.display = 'none'
        }, 2000)
        return
         //validacion del campo password que no este vacio
    }else if (inputPassword === ''){
        const notPasswordWarning = document.querySelector('.not_password_warning')
        notPasswordWarning.style.display = 'block'
        setTimeout(() => {
            notPasswordWarning.style.display = 'none'
        }, 2000)
        return
    }
    // guardar nombre y usuario en LocalStorage y redireccionar a la pagina principal
    const namePassword = `${inputName}-${inputPassword}`
    console.log(namePassword);        
    if (JSON.parse(localStorage.getItem(namePassword))){ 
        localStorage.setItem('login', JSON.stringify(namePassword))
    } else{
        localStorage.setItem('login', JSON.stringify(namePassword))
        localStorage.setItem(namePassword, null)
    }
    location.href='/movies.html'
}

loginForm.addEventListener('submit', e => handleSubmit(e))

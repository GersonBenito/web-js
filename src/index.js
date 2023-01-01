document.addEventListener('DOMContentLoaded', function(){

    const userInfo = {
        name: '',
        lastName: '',
        age: '',
        email: '',
        userName: '',
    }

    const btnFloat = document.querySelector('.button-float');
    const containerFooter = document.querySelector('.container');

    // form
    const inputName = document.querySelector('#name');
    const inputLastName = document.querySelector('#lastName');
    const inputAge = document.querySelector('#age');
    const inputEmail = document.querySelector('#email');
    const inputUserName = document.querySelector('#userName');
    const form = document.querySelector('#formulario');
    const btnSend = document.querySelector('.send');
    
    const toggleAction = () =>{
    
        // verificar si se esta mostrando el contenido del footer
        if(containerFooter.classList.contains('active')){
            // si se esta mostrando, lo removeremos al darle click al boton
            containerFooter.classList.remove('active');
            btnFloat.classList.remove('btn-active');
            btnFloat.textContent = 'More Information';
        }else{
            containerFooter.classList.add('active');
            btnFloat.classList.add('btn-active');
            btnFloat.textContent = 'X Close';
        }
    }

    btnFloat.addEventListener('click', toggleAction);

    // eventos del formulario
    inputName.addEventListener('input', validator);
    inputLastName.addEventListener('input', validator);
    inputAge.addEventListener('input', validator);
    inputEmail.addEventListener('input', validator);
    inputUserName.addEventListener('input', validator);

    // funcion validar
    function validator({ target }){
        if(target.value.trim() === ''){
            const texbox = target.id === 'lastName' ? 'last name' : target.id === 'userName' ? 'user name' : target.id;
            // using traversing javaScript
            showAlert(`El campo ${texbox} es obligatorio`, target.parentElement);
            userInfo[target.name] = '';
            checkUserInfo();
            return;
        }

        if(target.id === 'email' && !validateEmail(target.value)){
            showAlert('El email no es valido', target.parentElement);
            userInfo[target.name] = '';
            checkUserInfo();
            return;
        }

        clearAlert(target.parentElement);

        // assign values
        userInfo[target.name] = target.value.trim();
        
        // check user info
        checkUserInfo();
    }

    function showAlert(message, reference){
        // clear error message
        clearAlert(reference);

        // generate alert HTML
        const error = document.createElement('P');
        error.textContent = message;
        // add class css
        error.classList.add('error-message');
        // inject HTML in the form
        reference.appendChild(error);
    }

    function clearAlert(reference){
        // validate if exist a message error in the DOM
        const errorMessage = reference.querySelector('.error-message');
        if(errorMessage){
            // remove element
            errorMessage.remove();
        }
    }

    function validateEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const result = regex.test(email);
        return result;
    }

    function checkUserInfo(){
        if(Object.values(userInfo).includes('')){
            btnSend.disabled = true;
            return;
        }

        btnSend.disabled = false;
    }

});

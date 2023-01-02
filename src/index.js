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
            console.log(target);
            const texbox = target.id === 'lastName' ? 'last name' : target.id === 'userName' ? 'user name' : target.id;
            // using traversing javaScript
            showAlert(`The ${texbox} field is required`, target.parentElement, target.classList);
            userInfo[target.name] = '';
            checkUserInfo();
            return;
        }

        if(target.id === 'email' && !validateEmail(target.value)){
            showAlert('The email is invalid', target.parentElement, target.classList);
            userInfo[target.name] = '';
            checkUserInfo();
            return;
        }

        clearAlert(target.parentElement, target.classList);

        // assign values
        userInfo[target.name] = target.value.trim();
        
        // check user info
        checkUserInfo();
    }

    function showAlert(message, reference, classList){
        // clear error message
        clearAlert(reference,classList);

        // generate alert HTML
        const error = document.createElement('P');
        error.textContent = message;
        // add class css
        error.classList.add('error-message');
        // inject HTML in the form
        reference.appendChild(error);
        // change bordes of the input
        classList.remove('form-input-valid');
        classList.add('form-input-invalid');

    }

    function clearAlert(reference, classList){
        // validate if exist a message error in the DOM
        const errorMessage = reference.querySelector('.error-message');
        if(errorMessage){
            // remove element
            errorMessage.remove();
            // change bordes of the input
            classList.remove('form-input-invalid');
            classList.add('form-input-valid');
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

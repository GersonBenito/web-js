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
    const btnReset = document.querySelector('.reset');
    const spinner = document.querySelector('#spinner');
    const message = document.querySelector('.message');
    
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

    // reset form
    btnReset.addEventListener('click', (event) =>{
        event.preventDefault();
        resetForm();
    })

    // send user info
    form.addEventListener('submit', sendUserInfo);

    function sendUserInfo(event){
        event.preventDefault();
        spinner.classList.remove('hiddent-spinner');
        spinner.classList.add('show-spinner');
        btnSend.disabled = true;
        setTimeout(() => {
            spinner.classList.remove('show-spinner');
            spinner.classList.add('hiddent-spinner');
            resetForm();
            // show message alert success
            message.style.display = 'block';
            messageAlert('Success', 'Data send success', 3000);
        },3000)
    }

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

    function resetForm(){
        userInfo.name = '';
        userInfo.lastName = '';
        userInfo.age = '';
        userInfo.email = '';
        userInfo.userName = '';
        form.reset();
        checkUserInfo();
    }

    function messageAlert(titleAlert, subtitleAlert, durationAlert){
        const title = document.querySelector('.message .title');
        const subtitle = document.querySelector('.message .subtitle');
        
        title.textContent = titleAlert;
        subtitle.textContent = subtitleAlert;

        setTimeout(()=>{
            message.style.display = 'none';
        },durationAlert)
    }

});

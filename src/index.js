document.addEventListener('DOMContentLoaded', function(){

    const btnFloat = document.querySelector('.button-float');
    const containerFooter = document.querySelector('.container');

    // form
    const inputName = document.querySelector('#name');
    const inputLastName = document.querySelector('#lastName');
    const inputAge = document.querySelector('#age');
    const inputEmail = document.querySelector('#email');
    const inputUserName = document.querySelector('#userName');
    
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
    inputName.addEventListener('blur', validator);
    inputLastName.addEventListener('blur', validator);
    inputAge.addEventListener('blur', validator);
    inputEmail.addEventListener('blur', validator);
    inputUserName.addEventListener('blur', validator);

    // funcion validar
    function validator({ target }){
        console.log(target.value);
    }

});

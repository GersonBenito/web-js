const btnFloat = document.querySelector('.button-float');
const containerFooter = document.querySelector('.container');


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
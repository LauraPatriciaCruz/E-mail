//VARIABLES
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
// VARIABLES PARA CAMPOS

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
    //CUANDO LA APP ARRANCA
    document.addEventListener('DOMContentloaded',iniciarApp);

    //CAMPOS DEL FORMULARIO
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
   

    // ENVIAR EMAIL
    formulario.addEventListener('submit', enviarEmail);
     // REINICIA EL FORMULARIO
     btnReset.addEventListener('click',  resetearFormulario);
}

// FUNCIONES
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}

//VALIDA EL FORMULARIO
function validarFormulario(e){

    if (e.target.value.length > 0){

        //ELIMINA LOS ERRORES
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove ('border', 'border-red-500');
        e.target.classList.add ('border', 'border-blue-500');
        
    }else{
        e.target.classList.remove ('border', 'border-blue-500');
        e.target.classList.add ('border', 'border-red-500');
        
    mostrarError("All fields must be completed");
    }

    if (e.target.type==='email'){
       
        if (er.test(e.target.value)){
         //ELIMINA LOS ERRORES
         const error = document.querySelector('p.error');
         if(error){
             error.remove();
         }

        e.target.classList.remove ('border', 'border-red-500');
        e.target.classList.add ('border', 'border-blue-500');
       
       }else{
        e.target.classList.remove ('border', 'border-blue-500');
        e.target.classList.add ('border', 'border-red-500');

        mostrarError('Invalid E-mail Address');
       }
    }
if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed','opacity-50')
}
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add ('border-red-500', 'background-red-100','text-red-500','p-3', 'mt-5', 'text-center','error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0){
        formulario.insertBefore(mensajeError,spinner); 
    }

  }

  // ENVIAR EMAIL
  function enviarEmail(e){
    e.preventDefault();
  
    //MOSTRAR SPINNER
    const spinner = document.querySelector ('#spinner');
    spinner.style.display = 'flex';

    // DESPUES DE 3 SEGUNDOS OCULTAR EL SPINNER Y MOSTRAR MENSAJE 
    setTimeout(()=>{
        spinner.style.display = 'none';

        //MENSAJE ENVIADO CORRECTAMENTE
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Message succesfuly sent ';
        // INSERTA EL PARRAFO ANTES DEL SPINER 
        formulario.insertBefore(parrafo, spinner);
        parrafo.classList.add('text-center', 'my-10', 'p-3', 'bg-yellow-500','text-white','font-bold')



        setTimeout(()=>{
            parrafo.remove(); // ELIMINAR EL MENSAJE DE EXITO
            resetearFormulario();
            
        },5000);

    },3000);
    
}

// FUNCION QUE RESETEA EL FORMULARIO
function resetearFormulario(){
    formulario.reset();
    mensajeError.remove();
    // email.classList.remove('border','border-blue-500','border-red-500');
    // asunto.classList.remove('border','border-blue-500','border-red-500');
    // mensaje.classList.remove('border', 'border-green-500', 'border-red-500');
   
    iniciarApp();
}
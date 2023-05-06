"use strict";
//* Obteniendo elementos del dom
let optionsButton = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//* Array de fuentes
let fontList = [
    "Arial",
    "Book Antiqua",
    "Calibri",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

//*Esta función se utiliza para inicializar la herramienta de edición de texto.
const initializer = () => {
    //*llamamos a la función highlighter para aplicar el resaltado de los botones de alineación, espaciador y script. 
    highlighter(alignButtons,true);
    highlighter(spacingButtons,true);
    highlighter(formatButtons,false);
    highlighter(scriptButtons,true);

    //* creamos una lista desplegable de opciones de fuente utilizando el array fontList, y se agregan las opciones al elemento HTML fontName.
    fontList.map((value) =>{
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //* creamos una lista desplegable de opciones de tamaño de fuente utilizando un bucle  y se agregan las opciones al elemento HTML fontSizeRef.
    for( let i = 1; i <= 10; i++){
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    //*Establecemos el valor de fontSizeRefen 3
    fontSizeRef.value = 3;
}
//* Utilizamos document.execCommandse para aplicar el comando.
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi,value);
};

optionsButton.forEach((button) =>{
    button.addEventListener("click", () =>{
        modifyText(button.id,false,null);
    });
});

advancedOptionButton.forEach((button) =>{
    button.addEventListener("change", () =>{
        modifyText(button.id,false,button.value);
    });
});

linkButton.addEventListener("click", () =>{
    let userLink = prompt("Introduce una URL");
    if(/http/i.test(userLink)){
        modifyText(linkButton.id,false, userLink);
    }else{
        userLink = "https://" + userLink;
        modifyText(linkButton.id,false, userLink);
    }
});


/*tomamos dos argumentos: classNamey needsRemoval. classNamees un arreglo de botones que se utiliza
*para resaltar el texto, y needsRemovales un valor booleano que indica si se debe eliminar el 
resaltado existente.*/
const highlighter = (className, needsRemoval) =>{
    className.forEach((button) =>{
        button.addEventListener("click",() =>{
            if(needsRemoval){
                //*Si needsRemovales es true, entonces primero eliminamos cualquier resaltado
                //* existente llamando a highlighterRemover
                let alreadyActive = false;
                if(button.classList.contains("active")){
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if(!alreadyActive){
                    //*si el botón no está activo, lo marcamos como activo. 
                    button.classList.add("active");
                }
            }else{
                //*si es false, entonces simplemente cambiamos el estado de activación del botón. 
                button.classList.toggle("active");
            }
        });
    });
};

//*simplemente eliminamos cualquier resaltado existente al eliminar la clase "active" de los botones en el arreglo className.
const highlighterRemover = (className) =>{
    className.forEach((button) =>{
        button.classList.remove("active");
    });
};

window.onload = initializer();
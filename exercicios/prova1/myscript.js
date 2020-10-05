function teste() {

    if (document.formulario.num1.value == "" || document.formulario.num2.value == "") {
        alert("Por favor, preencha os dois valores");
    } else {
        document.getElementById("inserir").innerHTML = (document.formulario.num1.value * document.formulario.num2.value); //senao tira
    }

}
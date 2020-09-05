function limpar() {

    if (confirm("Deseja realmente limpar?") == true) {
        document.cadastro.reset();
    } else {
        // n faz nada
    }
}

function enviarDados() {
    if (valida() == true) {
        document.cadastro.submit();
        alert("Sucesso");

    }

}

function valida() {
    var nome;
    var estadoCivil;
    var elementoObjetivo;
    var valida = true;
    var cont = 0;
    var validaCheckBox = document.getElementsByName('ling');

    nome = document.cadastro.nome.value;

    if (nome.length < 4) { //se o nome for menor que 4 n deixa
        document.cadastro.nome.value = "";
        alert("Digite um nome valido"); //faz um alerta
        valida = false;

    } else {
        nome = nome.toUpperCase(); //coloca o nome para uppercase
        document.cadastro.nome.value = nome;
        estadoCivil = document.cadastro.estado_civil.value;
        if (estadoCivil == "") { //se a pessoa n selecionar o estado civil mostra um erro do lado
            document.getElementById("mensagem1").innerHTML = "Selecione um estado civil valido";
            alert(document.getElementById("mensagem1").value);
            valida = false;
        } else {
            document.getElementById("mensagem1").innerHTML = ""; //senao tira
        }
        document.cadastro.objetivo1.value = document.cadastro.objetivo1.value.toLowerCase(); // coloca objetivo em minusculo

        if ((document.cadastro.email.value == "") && (document.cadastro.telefone.value == "")) { //obrigatoriamente preencher telefone ou email
            alert("Por favor preencha telefone ou email");
            valida = false;
        }

        if ((document.cadastro.idioma_ingles.value == "") && (document.cadastro.idioma_espanhol.value == "")) { //msm coisa de cima
            alert("Por favor selecione algum idioma");
            valida = false;
        }
        for (i = 0; i < validaCheckBox.length; i++) { // verif em todas as checkboxs para obter uma confirmacao do user
            if (validaCheckBox[i].checked == false) {
                cont++;
                if (cont == 7) {
                    if (confirm("Deseja realmente enviar sem selecionar uma linguagem?") == true) {

                        break;
                    } else {
                        break;
                    }
                }

            }
        }
    }

}
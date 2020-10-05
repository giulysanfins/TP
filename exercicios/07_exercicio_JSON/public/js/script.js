var perguntaAtual = 0;
var numElemento = 0;
var jogoEscolhido;

function nextQuestion() {
    var teste;
    //Escolhendo o quiz o escolhido na pagina index
    //O if impede que ele faça o mesmo trecho mais de 1 vez sendo que nada ali ira mudar
    if (numElemento < 1) {
        let params = new URLSearchParams(location.search);
        const esc = params.get('p');
        teste = esc;
        switch (esc) {
            case "games":
                jogoEscolhido = games;
                break;
            case "filmes":
                jogoEscolhido = filmes;
                break;
            case "animes":
                jogoEscolhido = animes;
                break;
            case "musicas":
                jogoEscolhido = musicas;
                break;
        }

    }

    //---------------------------------------------

    //Numero aleatorio para setar a pergunta de forma a nao repetir
    var aleatorio;
    do {
        aleatorio = Math.floor((Math.random() * 10)); //fazer verificacao de qual ja foi
    } while (jogoEscolhido[aleatorio] === undefined);

    //atualizar a var global do qual pergunta estamos 
    perguntaAtual = aleatorio;
    numElemento++;

    //Pergunta do quiz
    document.getElementById('quesTxt').innerHTML = "Você sabe qual " + teste + " é esse ? Pergunta " + numElemento + "/10";

    //Atualizar a imagem da pergunta atual
    document.getElementById('displayText').innerHTML = "<img class=" + "borda" + " src=" + jogoEscolhido[aleatorio].link + " width=" + "400px >";

    //Atualizar as respostas de acordo com a atual
    document.getElementById('res1').innerHTML = jogoEscolhido[aleatorio].res1;
    document.getElementById('res2').innerHTML = jogoEscolhido[aleatorio].res2;
    document.getElementById('res3').innerHTML = jogoEscolhido[aleatorio].res3;
    document.getElementById('res4').innerHTML = jogoEscolhido[aleatorio].res4;

}

var pontuacao = 0;

function qualApertei(id) {

    //O json ja foi selecionado no nextQuestion
    var resposta = jogoEscolhido[perguntaAtual].resposta; //busca no json a string da resposta correta

    if (resposta == id) {
        pontuacao++;
        //adionar ponto de acerto
        document.getElementById('pontuacao').innerHTML = "Pontuacao: " + pontuacao + " / 10";
    }

    //Deletando elemento do json para nao haver repeticao
    delete jogoEscolhido[perguntaAtual];

    //Chama a proxima questão
    if (numElemento >= 10) {
        //Colar a pontuacao final
        document.getElementById('pontos').innerHTML = pontuacao + " / 10" + "<br>" + (pontuacao * 10) + "%";
        //Inseriro modal
        $("#contmod1").modal("show");
        var seconds = 10,
            $seconds = document.querySelector('#countdown');
        (function countdown() {
            $seconds.textContent = seconds + ' second' + (seconds == 1 ? '' : 's')
            if (seconds-- > 0) setTimeout(countdown, 1000)
        })();
        setTimeout(function () {
            //ir para tela de final, pontuacao total e volta para a tela inicial
            window.location.href = "index.html"
        }, 10000);

    } else {
        nextQuestion();
    }

}

//Função para verificar a escolha do jogo acessando o json
function escolheJogo(escolha) {
    //ir para proxima tela
    window.location.href = "quiz.html?p=" + escolha; //envia pela url da pagina uma variavel com um valor.
}
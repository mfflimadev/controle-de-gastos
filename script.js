const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');
const telaTotal = document.querySelector('.total');
const telaMaior = document.querySelector('.maior');
const botao = document.querySelector('.botao-adicionar');
const historico = document.querySelector('.historico') ;
const orca= document.querySelector('.orca')
const botaoRemover=document.querySelector('.botao-remover')
const lista= []

const Gasto= { 
    id: "",
    descricao: "",
    valor:0,
}

let maiorGasto={
    descricao:"",
    valor:0,
}

let menorGasto={
    descricao:"",
    valor:0,
}

let ngastos=0

    function limparTexto(){
         campoDescricao.value = '';
        campoValor.value = '';
    }

    function contarGastos(){
          ngastos= Number(ngasto.textContent);
       ngastos= ngastos+1;
       ngasto.textContent= ngastos;
       return ngastos 
    }
     function lerGasto() { 
       Gasto.descricao = campoDescricao.value.trim();
       Gasto.valor = Number(campoValor.value);
    }

   function formatarReais(valor) { 
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    function montarTextoDoGasto(Gasto) {
        console.log(`${Gasto.descricao+' — '+ formatarReais(Gasto.valor)}`)
    }
    
    function montarMensagemDoOrcamento( valorrest){
       console.log(`R$ ${valorrest} disponíveis`)
    }

    function podeAdicionar(nomeDigitado,valorDigitado) {
    return nomeDigitado.trim() !== '' && valorDigitado !== '';
    }
     function podeRemover(lista) {
    return lista.length>0 ;
    }

    function atualizarBotao() {
       botao.disabled = !podeAdicionar(campoDescricao.value, campoValor.value)};

    function atualizarBotao2() {
        if (podeRemover(lista)) { 
            botaoRemover.disabled=false;
           
        } else {
         botaoRemover.disabled=true;
    }
}

    function montarHistorico(lista){
        let itens='';
        for (let i=0; i<lista.length;i++){
            itens= itens+`<li>\n${lista[i].descricao} ` + `${" -- "+formatarReais(lista[i].valor)}</li>`
        }
         /*historico.textContent='';
        texthist += `\n${Gasto.descricao}` +  `${"--"+formatarReais(total)}`;
        historico.textContent += texthist;*/
        return itens;
    }

    function calcularTotal(lista){
        console.log(lista.length)
        let total= 0;
        for( let i=0; i<lista.length;i++){
            total= total+ lista[i].valor;
            console.log(lista[i].valor)
        }
        return total
    }
    function calcularMedia(ngasto){
        return calcularTotal(lista)/ngasto 
    }


    function calcularMaiorGasto(lista){
        let maior= lista[0];
        for(let i=1;i<lista.length;i++){
            if (lista[i].valor>maior.valor){
                maior=nota[i]; 
            }
        }
        return maior;
    }

    function calcularMenorGasto(lista){
        let menor= lista[0];
        for(let i=1;i<lista.length;i++){
            if (lista[i].valor<menor.valor){
                menor=nota[i]; 
            }
        }
        return menor;
    }
    function mostrarPagina(){

    }
    

campoDescricao.addEventListener('input', function () {
    atualizarBotao();
    
});

campoValor.addEventListener('input', function () {
    atualizarBotao();
});

formulario.addEventListener('submit', function (evento) {
evento.preventDefault();

       lerGasto()
       lista.push({"descricao":campoDescricao.value,"valor":Number(campoValor.value)});

        ngasto = document.querySelector('.quantidade');
        ngasto= contarGastos()
     
        erro.textContent = '';
 
        
             maiorGasto=calcularMaiorGasto(lista);
             menorGasto=calcularMenorGasto(lista);
        console.log(`Maior Gasto = maiorGasto`)
        // mostrar na tela
        telaTotal.textContent = formatarReais( calcularTotal(lista) );
        telaMaior.textContent = maiorGasto.descricao +" — " +formatarReais(maiorGasto.valor);

        // limpar para o próximo
       limparTexto();

        const mgasto = document.querySelector('.media')
        mgasto.textContent= formatarReais(calcularMedia(ngastos))
        
        historico.innerHTML=montarHistorico(lista);
    
        orca.textContent= `${Number(orca.textContent.replace(',', '.'))- Gasto.valor}` ;

        if (Number(orca.textContent)<=0){ 
         orca.textContent='0'
         
         const tot= document.querySelector('.total')
         const rest =document.querySelector('.restante')
          erro.textContent= 'O orçamento foi atingido.';
           tot.classList.toggle('estourado')
          rest.classList.toggle('estourado');     
        }

        montarTextoDoGasto(Gasto)
       montarMensagemDoOrcamento(orca.textContent)
      
         console.log( formatarReais(Gasto.valor));  
         console.log(calcularMedia( ngastos));

        atualizarBotao2();
        });
        
        botaoRemover.addEventListener('click', function () {
       lista.pop();
       atualizarBotao2()
        historico.innerHTML=montarHistorico(lista)
      
       });
 
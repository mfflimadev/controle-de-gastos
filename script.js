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
const mgasto = document.querySelector('.media')

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
       
        for( let i=0; i<lista.length;i++){
            ngastos= lista.length;
            console.log(`Tamanho da lista = ${lista[i].valor}`)
    }
    return ngastos
}

     function lerGasto() { 
       Gasto.descricao = campoDescricao.value.trim();
       Gasto.valor = Number(campoValor.value);
       lista.push({"descricao":campoDescricao.value,"valor":Number(campoValor.value)});
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
    function calcularMedia(lista){
        return calcularTotal(lista)/ngastos
    }

    function calcularMaiorGasto(lista){
        let maior= lista[0];
        for(let i=0;i<lista.length;i++){
            if (lista[i].valor>maior.valor){
                maior=lista[i]; 
            }
        }
        return maior;
    }

    function calcularMenorGasto(lista){
        let menor= lista[0];
        for(let i=0;i<lista.length;i++){
            if (lista[i].valor<menor.valor){
                menor=lista[i]; 
            }
        }
        return menor;
    }
    function mostrarPagina(){
        telaTotal.textContent = formatarReais( calcularTotal(lista) );
        telaMaior.textContent = maiorGasto.descricao +" — " +formatarReais(maiorGasto.valor);
        mgasto.textContent= formatarReais(calcularMedia(lista))    
    }
    

campoDescricao.addEventListener('input', function () {
    atualizarBotao();
    
});

campoValor.addEventListener('input', function () {
    atualizarBotao();
});

atualizarBotao();
atualizarBotao2();

formulario.addEventListener('submit', function (evento) {
evento.preventDefault();

       lerGasto()
       contarGastos()
      
       document.querySelector('.quantidade').textContent=Number(ngastos)
       erro.textContent = '';
 
       maiorGasto=calcularMaiorGasto(lista);
       menorGasto=calcularMenorGasto(lista);

       mostrarPagina()
        // limpar para o próximo
       limparTexto();
 
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
         console.log(`Media=${calcularMedia(lista)}`);

        atualizarBotao2();
        });
        
        botaoRemover.addEventListener('click', function () {
       lista.pop();

       lerGasto()
       contarGastos()
      
       document.querySelector('.quantidade').textContent=Number(ngastos)
       erro.textContent = '';
 
       maiorGasto=calcularMaiorGasto(lista);
       menorGasto=calcularMenorGasto(lista);

       mostrarPagina()
        // limpar para o próximo
       limparTexto();
 
        historico.innerHTML=montarHistorico(lista);
    
        orca.textContent= `${Number(orca.textContent.replace(',', '.'))- Gasto.valor}` ;

        if (Number(orca.textContent)<=0){ 
         orca.textContent='0'
         
         const tot= document.querySelector('.total')
         const rest =document.querySelector('.restante')
          erro.textContent= 'O orçamento foi atingido.';
           tot.classList.toggle('estourado')
          rest.classList.toggle('estourado');     
        }else{
            erro.textContent='';
        }
        montarMensagemDoOrcamento(orca.textContent)
      
         console.log(`Media=${calcularMedia(lista)}`);

        atualizarBotao2();
      
       });
 
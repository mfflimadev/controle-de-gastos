

const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaMaior = document.querySelector('.maior');

let total = 0;
let maiorValor = 0;
let maiorDescricao = '';
let texthist='';
let ngastos=0
const orca= document.querySelector('.orca')


   function formatarReais(valor) { 
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
    function calcularMedia(total,ngasto){
        return total/ngasto 
    };



formulario.addEventListener('submit', function (evento) {
evento.preventDefault();

    const descricao = campoDescricao.value.trim();
    const valor = Number(campoValor.value);

    if (descricao === '') {
        erro.textContent = 'Escreva uma descrição.';
    } else if (campoValor.value === '') {
        erro.textContent = 'Informe o valor.';
    } else if (valor <= 0) {
        erro.textContent = 'O valor precisa ser maior que zero.';
    } else {
      
       const ngasto = document.querySelector('.quantidade');
       ngastos= Number(ngasto.textContent);
       ngastos= ngastos+1;
       ngasto.textContent= ngastos;
       
       console.log(ngastos)
        

        erro.textContent = '';
 
        total = total + valor;

        if (valor > maiorValor) {
            maiorValor = valor;
            maiorDescricao = descricao;
        }

        // mostrar na tela
        telaTotal.textContent = formatarReais(total);
        telaMaior.textContent = maiorDescricao +" — " +formatarReais(maiorValor);

        // limpar para o próximo
        campoDescricao.value = '';
        campoValor.value = '';

        const mgasto = document.querySelector('.media')
        mgasto.textContent= formatarReais(calcularMedia(total,ngastos))
        
        const historico = document.querySelector('.historico') ;
        historico.textContent='';
        texthist += `\n${descricao}` +  `${"--"+formatarReais(total)}`;
        historico.textContent += texthist;

        

        orca.textContent= `${Number(orca.textContent.replace(',', '.'))- valor}` ;

        if (Number(orca.textContent)<=0){ 
         orca.textContent='0'
         
         const tot= document.querySelector('.total')
         const rest =document.querySelector('.restante')
          erro.textContent= 'O orçamento foi atingido.';
           tot.classList.toggle('estourado')
          rest.classList.toggle('estourado');     
        }
     }

        console.log( formatarReais(valor));  
         console.log( calcularMedia(total, ngastos));
    });
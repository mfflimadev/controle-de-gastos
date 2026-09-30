

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
    console.log( 'R$ ' + valor.toFixed(2).replace('.', ','))
    return 'R$ ' + valor.toFixed(2).replace('.', ',');}

    function calcularMedia(total,ngastos){ return total/ngastos}



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
      
      ngasto = Number(document.querySelector('.quantidade').textContent)
      ngasto= ngasto +1;
        

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
        mgasto.textContent= formatarReais(calcularMedia(total,ngasto))
        
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
    });
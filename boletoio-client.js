const socket = require('socket.io-client')('http://localhost:9092')
const fs = require('fs')

const fatura = {
  cedente : {
    razaoSocial:'BOLETOIO SISTEMINHA SA', 
    cnpj:'59.199.914/0001-76'
  }, 

  sacado : {
    razaoSocial:'PESSOA_OU_EMPRESA_QUE_PAGA SA',
    cnpj:'91.484.614/0001-41',
    endereco:{
      logradouro:'RUA DAS MANCHAS ESCURAS',
      bairro:'DISTRITO DA LIMPEZA',
      numero:'911',
      cidade:'RECIFE',
      uf:'PE',
      cep:'11111-111'
    }
  },
  
  sacador : {
    razaoSocial:'PESSOA_OU_EMPRESA_QUE_EMITE SA',
    cnpj:'81.236.275/0001-20',
    endereco:{
      logradouro:'RUA SEM MANCHAS',
      bairro:'ALVEJARES',
      numero:'001',
      cidade:'RECIFE',
      uf:'PE',
      cep:'22222-222'
    }
  },
  
  conta : {
    banco:'BANCO_ITAU',
    carteira:{
      codigo:109,
      tipoCobranca:'COM_REGISTRO'//'SEM_REGISTRO' ou 'COM_REGISTRO'
    },
    agencia:1234,
    digitoAgencia:'5',
    conta:54321,
    digitoConta:'6'
  },
  
  titulo : {
    numeroDocumento:'NNNN20180518',
    nossoNumero:'12345678',
    digitoNossoNumero:'0',
    //Apenas para caixa econômica
    parametrosBancarios:{
      codigoOperacao:10
    },
    valor:1000.12,
    dataDocumento:'18/05/2018',
    dataVencimento:'18/06/2018',
    tipoDocumento:'DM_DUPLICATA_MERCANTIL',
    aceite:'A',
    desconto:0,
    deducao:0,
    mora:0,
    acrecimo:0,
    valorCobrado:0
  },
  
  boleto:{
    localPagamento:'ATE O VENCIMENTO, PREFERENCIALMENTE ITAU. APOS VENCIMENTO SOMENTO ITAU',
    instrucaoAoSacado:'AQUI VAO INSTRUCOES PARA O SACADO',
    instrucao1:'PRIMEIRA LINHA DE INSTRUCOES',
    instrucao2:'SEGUNDA LINHA DE INSTRUCOES',
    instrucao3:'TERCEIRA LINHA DE INSTRUCOES',
    instrucao4:'QUARTA LINHA DE INSTRUCOES',
    instrucao5:'QUINTA LINHA DE INSTRUCOES',
    instrucao6:'SEXTA LINHA DE INSTRUCOES',
    instrucao7:'SETIMA LINHA DE INSTRUCOES',
    instrucao8:'OITAVA LINHA DE INSTRUCOES'
  }
}


socket.on('connect', function(){
  console.log('Connected');
  socket.emit('scktGenerateBoleto', JSON.stringify(fatura))
});
socket.on('scktGenerateBoletoResponse', function(data){
   fs.writeFile(`./boletos/boleto_${banco}.pdf`, data, 'binary', (err) => {
    if(err)
    console.log('Erro na gravação do arquivo do boleto')
  })
});
socket.on('scktGenerateBoletoError', function(error){
  console.log('ERRO NA GERAÇAO DO BOLETO', error)
});

socket.on('disconnect', function(){
  console.log('DESCONECTADO')
});
socket.on('error', (error) => {
  console.log('error', error)
});
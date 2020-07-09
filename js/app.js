class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados(){
        for(let i in this){
           if(this[i] == undefined || this[i] == '' || this[i] == null){
               return false
           }
        }
        return true
    }
} 

class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id',0)
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')  
        return(parseInt(proximoId)+1)
    }
    gravar(d){
        
        let id = this.getProximoId()
        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id',id)
    }
    recuperarTodosRegistros(){
        let despesas = Array()
        let id = localStorage.getItem('id')
        //recuperando todas as despesas cadastradas no localStorage
        for(let i = 1; i <= id; i++){
            //recuperar Despesa
            let despesa = JSON.parse(localStorage.getItem(i))
            //verificar se existe itens pulados ou removidos
            //vamos pular o indice
            if(despesa === null){
                continue
            }
            //adicionando os dados em um array
            despesas.push(despesa)

        }
        return despesas
        
    }
    pesquisar(despesa){
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesasFiltradas)
        console.log(despesa)
        
        if(despesa.ano != ''){
            console.log('filtro ano')
            despesasFiltradas = despesasFiltradas.filter(d=> d.ano == despesa.ano)
        } 
        if(despesa.mes != ''){
            console.log('filtro mes')
            despesasFiltradas = despesasFiltradas.filter(d=> d.mes == despesa.mes)
        }
        if(despesa.dia != ''){
            console.log('filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d=> d.dia == despesa.dia)
        }
        if(despesa.tipo != ''){
            console.log('filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d=> d.tipo == despesa.tipo)
        }
        if(despesa.descricao != ''){
            console.log('filtro de descricao')
            despesasFiltradas = despesasFiltradas.filter(d=> d.descricao == despesa.descricao)
        }
        if(despesa.valor != ''){
            console.log('filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d=> d.valor == despesa.valor)
        }
        console.log(despesasFiltradas)
        
    }
}
let bd = new Bd();

let cadastrarDespesa = () =>{
    //recuperando os valores do formulario html
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value

    let tipo =  document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value
    
    //Instanciando a Classe Despesa()
     let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor) 

    //console.log(despesa)
    if(despesa.validarDados()){
       bd.gravar(despesa)
       $('#modalRegistraDespesa').modal('show')

       //recuperacao valores e implementando cores e textos diferentes com dialog
       document.getElementById('modal_titulo').innerHTML ='Os dados foram gravados com sucesso!'
       document.getElementById('modal_titulo_div').className ='modal-header text-success'
       document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso'
       document.getElementById('modal_btn').innerHTML='Voltar'
       document.getElementById('modal_btn').className='btn btn-success'
       
       limparCampos()
       

    }else{

        document.getElementById('modal_titulo').innerHTML ='Erro ao gravar os dados'
        document.getElementById('modal_titulo_div').className ='modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML ='Existe campos obrigatorios que nao foram preenchidos'
        document.getElementById('modal_btn').innerHTML='Voltar e Corrigir'
        document.getElementById('modal_btn').className='btn btn-danger'
        $('#modalRegistraDespesa').modal('show')
       
    } 
    
}
let limparCampos = ()=>{

    //recuperando os valores do formulario html
    
    let ano = document.getElementById('ano').value =''
    let mes = document.getElementById('mes').value =''
    let dia = document.getElementById('dia').value =''

    let tipo =  document.getElementById('tipo').value = ''
    let descricao = document.getElementById('descricao').value = ''
    let valor = document.getElementById('valor').value = ''
}



let carregaListaDespesa = () =>{
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
      
    var Listadespesas = document.getElementById('listaDespesas') 

    
    //insertRow() permite criar as linhas
     despesas.forEach(function(d){
        
      
    //criando as linhas tr     
      let linha = Listadespesas.insertRow()

      //criando coluno
      linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
      
        //ajustar o tipo
        switch(d.tipo){
            case '1':
              d.tipo = 'Alimentação'
              break
            case '2':
                d.tipo = 'Educação'
              break
           case '3':
               d.tipo = 'Lazer'
               break
           case '4': 
              d.tipo= 'Saúde'
              break
          
          case '5':
              d.tipo = 'Transporte' 
              break
          }
      linha.insertCell(1).innerHTML = d.tipo
      linha.insertCell(2).innerHTML = d.descricao
      linha.insertCell(3).innerHTML = d.valor

     
     })
}

let pesquisarDespesa = () => {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor) 
    //console.log(despesa)
    bd.pesquisar(despesa)
}


//stringify() converte um objeto literal para JSON
//JSON.parse() converte um JSON para objeto Literal
//o que fizemos, convertemos um arquivo json para objeto de objeto para array, e armazenamos esse valor em um array Vazio
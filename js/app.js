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
//stringify() converte um objeto literal para JSON
//JSON.parse() converte um JSON para objeto Literal


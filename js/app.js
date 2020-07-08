class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}
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

    console.log(despesa) 
    gravar(despesa)
}
//stringify() converte um objeto literal para JSON
//JSON.parse() converte um JSON para objeto Literal
let gravar = (d) =>{
    localStorage.setItem('despesa',JSON.stringify(d))
}
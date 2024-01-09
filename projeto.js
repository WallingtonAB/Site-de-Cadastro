class Games {
    constructor(codigo,titulo,autor,edicao,genero) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.edicao = edicao;
        this.genero = genero;
    }
}

function montarTabela(lista) {
    let auxHtml = '';
    for (let i = 0; i < lista.length; i++){
        auxHtml +='<tr>'+
                   '<td>'+ lista[i].codigo +'</td>'+
                   '<td>'+ lista[i].titulo +'</td>'+
                   '<td>'+ lista[i].autor +'</td>'+
                   '<td>'+ lista[i].edicao +'</td>'+
                   '<td>'+ lista[i].genero +'</td>'+
                   '<td>'+
                   '<button class="btn btn-warning" rel="'+ i +'">Alterar</button>'+
                   '</td>'+
                   '<td>'+
                   '<button class="btn btn-danger" rel="'+ i +'">Excluir</button>'+
                   '</td>'+
                   '</tr>';
    }    
    return auxHtml;
}

function validar(numero) {
    if(!isNaN(numero) && numero != '') {
    return true;
 } else {
    return false;
 }
}

let auxPosicao = '';
let ListaGames = [];
let demon_souls = new Games(1,'Demon souls','Fromsoft',1,'aventura');
let solo_leveling = new Games(2,'Solo Leveling','Playstation',1,'ação');
let berseker_monsters = new Games(3,'Berseker Monsters 2','Sujirokimi',2,'aventura');
let the_sims = new Games(4,'The Sims 4','Mame',4,'sobreviver');
ListaGames.push(demon_souls);
ListaGames.push(solo_leveling);
ListaGames.push(berseker_monsters);
ListaGames.push(the_sims);

//window.onload = function() {
    $(document).ready( () => {
    //document.getElementById('tabela').innerHTML = montarTabela(ListaProdutos);
    $('#tabela').html(montarTabela(ListaGames));
    
    //document.getElementById('btnSalvar').onclick = function() {
        $('#btnSalvar').click( () => {
        //let codigo = document.getElementById('codigo').value;
        let codigo = $('#codigo').val();
        //let titulo = document.getElementById('titulo').value;
        let titulo = $('#titulo').val();
        //let autor = document.getElementById('autor').value;
        let autor = $('#autor').val();
        //let edicao = document.getElementById('edicao').value;
        let edicao = $('#edicao').val();
        //let genero = document.getElementById('genero').value;
        let genero = $('#genero').val();
        if (validar(codigo) && titulo !='' && autor !='' && validar(edicao) && genero !='') {
            let novoGames = new Games(codigo, titulo, autor, edicao, genero);
            if (auxPosicao == ''){
            ListaGames.push(novoGames);
            }else {
                ListaGames[auxPosicao] = (novoGames);
                auxPosicao = '';
            }
            //document.getElementById('tabela').innerHTML = montarTabela(ListaProdutos);
            $('#tabela').html(montarTabela(ListaGames));
            $('input').val('');
        } else {
            alert('Digite os valores corretamente!');
        }
    });

    $('#tabela').on('click','.btn-warning', (evento) => {
        auxPosicao = evento.target.getAttribute('rel');
        $('#codigo').val(ListaGames[auxPosicao].codigo);
        $('#titulo').val(ListaGames[auxPosicao].titulo);
        $('#autor').val(ListaGames[auxPosicao].autor);
        $('#edicao').val(ListaGames[auxPosicao].edicao);
        $('#genero').val(ListaGames[auxPosicao].genero);
    });


    $('#tabela').on('click', '.btn-danger', (evento) => {

        if (confirm('tem certeza que deseja excluir?')){
            ListaGames.splice(evento.target.getAttribute('rel'),1);
            $('#tabela').html(montarTabela(ListaGames));
        }

    });
    
    $('#btnJson').click(() => {
        let GamesJson = JSON.stringify(ListaGames);
        alert(GamesJson);
    });

    $('#btnAjax').click(() =>{

        $.ajax({
            url: 'http://date.jsontest.com/',
            method: 'GET',
            dataType: 'json'

          }).done(function(dados) {
           $('#data').html(dados.date);
          });
    });

    $('#btnCancelar').click(()=>{ 
        $('input').val('');
        auxPosicao ='';
    });


    $('#genero').keypress((evento)=>{
        if (evento.which == 13){
            $('#btnSalvar').click();
            $('#codigo').focus();
        }

    });


});
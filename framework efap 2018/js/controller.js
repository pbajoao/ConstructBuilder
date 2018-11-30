function downloadcursoInnerHtml(filename) {
  var elHtml = $("#recebedados").html();
  var link = document.createElement('a');
  link.setAttribute('download', filename);
  link.setAttribute('href', 'data:text/plain' + ';charset=utf-8,' + encodeURIComponent(elHtml));
  link.click(); 
}

function controllers(callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            bntAcao = JSON.parse(this.responseText);
            callback(bntAcao);
        }
    };
    xhttp.open("GET", "../controller/controllers.json", true);
    xhttp.send();
}

function preencherHtml(bntAcao) {
    let listaBtncontrollers = "";

    for (let i = 0; i < bntAcao[0].length; i++) {
        const elemento = bntAcao[0];
        listaBtncontrollers += `<a id="${elemento[i].id}" class="bt-controllers"><span>${elemento[i].icone}</span> <span>${elemento[i].nome}</span></a>`;
    }
    document.querySelector("#itens-controllers").innerHTML = listaBtncontrollers;
}

controllers(preencherHtml);

function preencherElementos(bntAcao) {
    let listaElementoscabeca = "";
    let listaElementoscorpo = "";
    let active = "active";

    for (let i = 0; i < bntAcao.length; i++) {
        const elemento = bntAcao[1];
        if(i > 0){
          active = "";
        }
        linhas = "";
        for (let j = 0; j < elemento[i].id.length; j++){
          linhas += `<li><a id="${elemento[i].id[j]}" class="retornacontrol displayflex" data-toggle="modal"><img src="img/${elemento[i].imagem[j]}"></a><span class="selected">${elemento[i].item[j]}</span></li>`;
        }

        listaElementoscabeca += `<li role="presentation" class="${active}"><a href="#${elemento[i].nome}" aria-controls="${elemento[i].nome}" role="tab" data-toggle="tab">${elemento[i].nome}</a></li>`;
        listaElementoscorpo += `
          <div role="tabpanel" class="tab-pane ${active}" id="${elemento[i].nome}">
            <ul class="itens-controllers">
              ${linhas}
            </ul>
          </div>`;
    }

    codigoCabeca = `
      <div class="container text-center">
        <ul class="nav nav-tabs embloco" role="tablist">
          ${listaElementoscabeca}
        </ul>
      </div>`;
    codigoCorpo = `
      <div class="tab-content">
          ${listaElementoscorpo}
      </div>`;

    codigoCompleto = codigoCabeca + codigoCorpo;

    document.querySelector("#elementos-controllers").innerHTML = codigoCompleto;
}

controllers(preencherElementos);

/*Controle de elementos*/
$(document).ready(()=> {
  $('.tab').on('click', (event) => {
    $(event.target).parent('.tabs').find('> a.tab.active').removeClass('active');
    $(event.target).addClass('active');
    if(!$(event.target.hash).length) return;
    $('body').stop().animate({
        scrollTop: $(event.target.hash).offset().top - $('#tabs').outerHeight()
    }, 300, 'swing');
  });

})


controlesBTN = `<span class="controllersElementos">
                  <button class="controlEdit"><i class="far fa-edit"></i></button>
                  <button class="controlRemove"><i class="fas fa-minus-circle"></i></button>
                  <button class="controlCopy"><i class="far fa-copy"></i></button>
                </span> `;



$(document).on('click', '.retornacontrol', function(){
  nomeclatura = $(this).parent().children(".selected").text();;
  esqueleto = `<li id="elemento1" class="editorElementos pendente">
                ${controlesBTN}
                <div>Elemento - ${nomeclatura}</div>
                <div class="codigofinal">t</div>
              </li>`;
  $("#recebedados").append(esqueleto);
});

$(document).on('click', '#acao-carregar', function(){
  //id = $(this).attr('id');
  $('#carregarModal').modal({
   show: 'false'
  });
});

$(document).on('click', '#pegarCodigoCarregado', function(){
  let codigoCarregado = $("#codigoCarregado").val();
  $("#recebedados").html(codigoCarregado);
});

$(document).on('click', '#acao-salvar', function(){
  downloadcursoInnerHtml('codigo.txt');
});

codigofinal = "";

$(document).on('click', '#acao-exportar', function(){
  $.each( $(".codigofinal"), function() {
      codigofinal += $(this).html();
  });
  $("#exportarCodigo").val(codigofinal);
  $('#exportarModal').modal({
   show: 'false'
  });
});

$(document).on('click', '.controlEdit', function(){
  id = $(this).parent().parent().attr('id');
  //alert(id);
  $('#controlerModal').modal({
    show: 'false'
  });
});

$(document).on('click', '.controlRemove', function(e){
  $(this).parent().parent().remove();
});

$(document).on('click', '.controlCopy', function(e){
  copiaResgate = $(this).parent().parent().html();
  copiaResgateId = $(this).parent().parent().attr('id');
  copiaID = "copia";
  esqueleto = `<li id="${copiaResgateId}${copiaID}" class="editorElementos pendente">
                ${copiaResgate}
              </li>`;
  $("#recebedados").append(esqueleto);
});

$(document).on('mouseenter mouseleave', '.controlEdit', function(e){
  $(this).parent().parent().removeClass("pendente");
});

$(document).on('mouseenter mouseleave', '.controlRemove', function(e){
  $(this).parent().parent().toggleClass("remover");
});

$(document).on('mouseenter mouseleave', '.controlCopy', function(e){
  $(this).parent().parent().toggleClass("duplicar");
});

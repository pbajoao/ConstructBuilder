function controllers() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const bntAcao = JSON.parse(this.responseText);
            preencherHtmlProdutos(bntAcao);
        }
    };
    xhttp.open("GET", "../controller/controllers.json", true);
    xhttp.send();
}

function preencherHtmlProdutos(bntAcao) {
    let listaProdutosHtml = "";
    let active = "active";
    
    for (let i = 0; i < bntAcao.length; i++) {
        const elemento = bntAcao[i];
        
        if(i > 0){
        	active = "";
        }
        listaProdutosHtml += `<a href="#${elemento.nome}" id="acao-${i}" class="tab ${active}">${elemento.nome}</a>`;
    }

    document.querySelector("#lista-itens").innerHTML = listaProdutosHtml;
}

controllers();


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

nav-justified
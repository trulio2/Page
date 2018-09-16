/* Filtra resultados de acordo com o nome inserido e culinária selecionada */
function filter() {
  var input, inputCulinary, filter, filterCulinary, table, div, h3 ,p, i;
  input = document.getElementById("requestedName");
  inputCulinary = document.getElementById("requestedCulinary");
  filterCulinary = inputCulinary.value.toUpperCase();
  filter = input.value.toUpperCase();
  table = document.getElementById("cardList");
  div = table.getElementsByTagName("div");
  for (i = 0; i < div.length; i+=3) {
    h3 = div[i].getElementsByTagName("h3")[0];
    p = div[i].getElementsByTagName("p")[0];
    if (h3) {
      if (h3.innerHTML.toUpperCase().indexOf(filter) > -1  && p.innerHTML.toUpperCase().indexOf(filterCulinary) > -1) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
    }
  }
}

/* Ordena Cards baseado na Distância */
function sortCards() {
  var table, rows, switching, x, y,i, shouldSwitch;
  table = document.getElementById("cardList");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("div");
    for (i = 0; i < (rows.length - 3); i+=3) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("p")[2];
      y = rows[i + 3].getElementsByTagName("p")[2];
      if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 3], rows[i]);
      switching = true;
    }
  }
}

/* Converte arquivo Json em Cards */
function toCard(json, id) {
  var rows = '';

  json.map(function(row) {
    rows += '<div class="col-md-6 col-lg-3">';
    rows += '<div class="card">';
    rows += '<img src="'+row["Capa"]+'" class="card-img-top img-fuild" id="imgs" />';
    rows += '<div class="card-block">';
    rows += '<h3 class="card-title" style="text-align: center">'+row["Nome"]+'</h3>';
    rows += '<p style="text-align: center">Culinária '+row["Culinaria"]+'</p>';
    rows += '<p style="text-align: center">Avaliação '+row["Avaliacao"]+'*</p>';
    rows += '<p style="text-align: center">'+row["Distancia"]+'km</p>';
    rows += '</div></div></div>';
  });
  
  return '<div class="row" id="'+id+'">'+
          rows +
         '</div>';
};
document.getElementById('cards').innerHTML = toCard(data,'cardList');

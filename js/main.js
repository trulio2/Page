/* Filtra Resultados de acordo com o nome inserido e com o tipo de culinária selecionado */
function filter() {
  var input, inputCulinary, filter, filterCulinary, table, div, h3 ,p, i;
  input = document.getElementById("requested");
  inputCulinary = document.getElementById("requestedCulinary");
  filterCulinary = inputCulinary.value.toUpperCase();
  filter = input.value.toUpperCase();
  table = document.getElementById("card1");
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

/* Ordena Cards baseado nas Distancias */
function sortCards() {
  var table, rows, switching, i,x, y, shouldSwitch;
  table = document.getElementById("card1");
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

/* Converte arquivo Json em Card */
function toCard(json,id) {
  var cols = Object.keys(json[0]);
  var bodyRows = '';

  json.map(function(row) {
    bodyRows += '<div class="col-md-6 col-lg-3" id="each">';
    bodyRows += '<div class="card">';
    bodyRows += '<img src="'+row["Capa"]+'" class="card-img-top img-fuild" id="imgs" />';
    bodyRows += '<div class="card-block">';
    bodyRows += '<h3 class="card-title" style="text-align: center">'+row["Nome"]+'</h3>';
    bodyRows += '<p style="text-align: center">Culinária '+row["Culinaria"]+'</p>';
    bodyRows += '<p style="text-align: center">Avaliação '+row["Avaliacao"]+'*</p>';
    bodyRows += '<p style="text-align: center">'+row["Distancia"]+'km</p>';
    bodyRows += '</div></div></div>';
  });
  return '<div class="row" id="'+id+'">'+
          bodyRows +
         '</div>';
};
document.getElementById('cards').innerHTML = toCard(data,'card1');

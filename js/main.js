function filter() {
  var input, inputcln, filter, filtercln, table, tr, td,td1, i;
  input = document.getElementById("minput");
  inputcln = document.getElementById("cln");
  filtercln = inputcln.value.toUpperCase();
  filter = input.value.toUpperCase();
  table = document.getElementById("card1");
  tr = table.getElementsByTagName("div");
  for (i = 0; i < tr.length; i+=3) {
    td = tr[i].getElementsByTagName("h3")[0];
    td1=tr[i].getElementsByTagName("p")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1  && td1.innerHTML.toUpperCase().indexOf(filtercln) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function sortTable() {
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

function json2card(json,id) {
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
document.getElementById('cards').innerHTML = json2card(data,'card1');

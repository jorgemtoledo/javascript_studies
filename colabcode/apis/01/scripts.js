// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// GET request on the URL endpoint
request.open('GET', 'http://192.168.0.4:8080/ctos/usage', true);

request.onload = function () {
  var data = JSON.parse(this.response);
  var json = {
    "ctos": data
  }

  // Convert to csv
  const ctos = json.ctos
  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(ctos[0])
  let csv = ctos.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')

  // Download
  var link = document.createElement("a");
  link.id="lnkDwnldCto";
  document.body.appendChild(link);
  blob = new Blob([csv], { type: 'text/csv' });
  var csvUrl = window.webkitURL.createObjectURL(blob);
  var filename = 'ctos.csv';
  jQuery("#lnkDwnldCto")
  .attr({
      'download': filename,
      'href': csvUrl
  });
  jQuery('#lnkDwnldCto')[0].click();
  document.body.removeChild(link);
}

// Send request
request.send();
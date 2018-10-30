function disableStart() {
  document.getElementById('start').disabled=true;
  document.getElementById('quit').disabled=false;
}

function enableStart() {
  document.getElementById('start').disabled=false;
  document.getElementById('quit').disabled=true;
}
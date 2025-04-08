let showPreview;// Setze diese Variable je nach Bedarf auf true oder false




//let tButtonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
  


console.log(showPreview);

setInterval(() => {
    
    const active = Object.values(tButtonStates).includes(true);

    if (active) {
        showPreview = false;
    } else {
        showPreview = true;
    }


}, 500);





// Funktion zum Ausblenden des Bildes/Videos
function hideImage() {
  document.getElementById("hoverImage").style.display = "none";
}

// Funktion zum Anzeigen des Bildes/Videos
function showImage() {
  if (showPreview) {
    document.getElementById("hoverImage").style.display = "block";
  }
}

// Wenn die Maus über dem Bild ist, soll es dauerhaft ausgeblendet bleiben
function onImageMouseEnter() {
  document.getElementById("hoverImage").style.display = "none";
}

// Auf Seitenaufruf sicherstellen, dass das Bild angezeigt wird
window.onload = function() {
  showImage();  // Beim Laden der Seite das Bild direkt anzeigen
}
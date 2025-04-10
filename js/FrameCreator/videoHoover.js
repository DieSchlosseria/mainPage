const video = document.getElementById("hoverImage");
let showVideo = true;
const delayShowVideo = 2000;




// Funktion zum Ausblenden des Videos
function hideImage() {
  console.log("hide");
  showVideo = false;
}




window.addEventListener("load", function () {
showImage();
});

// Funktion zum Anzeigen des Videos 
function showImage() {
  console.log("show");
  showVideo = true;

    // Initialer Zustand für showPreview
    const tButtonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
    const active = Object.values(tButtonStates).some(val => val === true || val === 1 || val === "1");
  

  // Verzögerung von 5 Sekunden, bevor das Video angezeigt wird
  setTimeout(() => {
    if (showVideo & !active) {
      console.log("Video wird nach 5 Sekunden angezeigt");
      video.style.display = "block";  // Video anzeigen
      video.currentTime = 0;  // Setzt das Video auf den Anfang zurück
      video.play();  // Video abspielen
    }
  }, delayShowVideo); // 5 Sekunden Verzögerung
}

// Überwacht den Status von showVideo alle 500ms
setInterval(() => {
  if (!showVideo) {
    console.log("hideVideo");
    video.style.display = "none";  // Video ausblenden
  }
}, 500);

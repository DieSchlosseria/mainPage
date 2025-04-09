let showPreview;
let testLoggingTimeout = null;

// Funktion zum Ausblenden des Videos
function hideImage() {
  console.log("hide");
  const video = document.getElementById("hoverImage");
  if (video) {
    video.pause();
    video.style.display = "none"; // Video ausblenden
  }
}

// Funktion zum Anzeigen des Videos mit 5 Sekunden Verzögerung
function showImage() {
  console.log("Verzögertes Anzeigen des Videos nach 5 Sekunden...");
  setTimeout(() => {
    if (showPreview) {
      const video = document.getElementById("hoverImage");
      if (video) {
        video.style.display = "block"; // Video anzeigen
        video.play();
      }
    }
  }, 5000); // Verzögerung von 5 Sekunden
}

// Maus betritt das Video → ausblenden
function onImageMouseEnter() {
  console.log("hover");
  hideImage();
}

// Maus verlässt das Video → TEST-Phase starten
function onImageMouseLeave() {
  // Wenn der Timer bereits läuft, wird er gestoppt und neu gestartet
  if (testLoggingTimeout) {
    clearTimeout(testLoggingTimeout);
    console.log("Timer neu gestartet");
  }
  showImage(); // Startet die Verzögerung und zeigt das Video an
}

// Seite wird geladen
window.onload = function () {
  // Initialer Zustand für showPreview
  const tButtonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
  const active = Object.values(tButtonStates).some(val => val === true || val === 1 || val === "1");
  showPreview = !active;

  // Wenn showPreview wahr ist, wird der Test direkt gestartet
  if (showPreview) {
    showImage();
  }

  // Video-Element holen und Maus-Events setzen
  const video = document.getElementById("hoverImage");
  if (video) {
    video.addEventListener("mouseenter", onImageMouseEnter);
    video.addEventListener("mouseleave", onImageMouseLeave);
  }
};

// Regelmäßiger Check auf buttonStates
setInterval(() => {
  const tButtonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
  const active = Object.values(tButtonStates).some(val => val === true || val === 1 || val === "1");
  const newShowPreview = !active;

  // Nur bei Änderung den Zustand anpassen
  if (newShowPreview !== showPreview) {
    showPreview = newShowPreview;
    console.log("showPreview:", showPreview);

    if (showPreview) {
      showImage(); // Wenn showPreview wahr ist, Video sofort anzeigen
    }
  }
}, 500);

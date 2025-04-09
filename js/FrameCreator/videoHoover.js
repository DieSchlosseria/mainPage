let showPreview;
let testLoggingInterval = null;
let testLoggingTimeout = null;

// Funktion: 5 Sekunden lang TEST ausführen und Video ausblenden
function startTestLoggingAndHideVideo() {
  if (testLoggingInterval !== null) return; // Schon aktiv

  console.log("Starte TEST-Phase...");

  // Video ausblenden
  hideImage();

  // TEST-Intervall
  testLoggingInterval = setInterval(() => {
    console.log("TEST");
  }, 500);

  // Nach 5 Sekunden stoppen
  testLoggingTimeout = setTimeout(() => {
    clearInterval(testLoggingInterval);
    testLoggingInterval = null;
    console.log("TEST-Phase beendet");

    if (showPreview) {
      showImage();
    }
  }, 5000);
}

// Funktion zum Ausblenden des Videos
function hideImage() {
  const video = document.getElementById("hoverImage");
  if (video) {
    video.pause();
    video.style.display = "none";
  }
}

// Funktion zum Anzeigen des Videos
function showImage() {
  if (showPreview && testLoggingInterval === null) {
    const video = document.getElementById("hoverImage");
    if (video) {
      video.style.display = "block";
      video.play();
    }
  }
}

// Maus betritt das Video → ausblenden
function onImageMouseEnter() {
  hideImage();
}

// Maus verlässt das Video → TEST-Phase starten
function onImageMouseLeave() {
  if (showPreview) {
    startTestLoggingAndHideVideo();
  }
}

// Regelmäßiger Check auf buttonStates
setInterval(() => {
  const tButtonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
  const active = Object.values(tButtonStates).some(val => val === true || val === 1 || val === "1");
  const newShowPreview = !active;

  if (newShowPreview && !showPreview) {
    startTestLoggingAndHideVideo();
  }

  showPreview = newShowPreview;

  console.log("showPreview:", showPreview);
}, 500);

// Seite wird geladen
window.onload = function () {
  const tButtonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
  const active = Object.values(tButtonStates).some(val => val === true || val === 1 || val === "1");
  showPreview = !active;

  // Maus-Events setzen
  const video = document.getElementById("hoverImage");
  if (video) {
    video.addEventListener("mouseenter", onImageMouseEnter);
    video.addEventListener("mouseleave", onImageMouseLeave);
  }

  if (showPreview) {
    startTestLoggingAndHideVideo();
  }
};

const audio = document.getElementById("bgAudio");

function playAudio() {
  audio.play().catch(e => console.log("Autoplay bloqueado:", e));
  document.removeEventListener("click", playAudio);
}

document.addEventListener("click", playAudio);



  
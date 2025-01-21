const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");
const notesCheck = document.querySelector(".notes-check input");

let mapedKeys = [];
let audio = new Audio("src/tunes/a.wav");

const playTune = (key) => {
  audio.src = `src/tunes/${key}.wav`;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

const handleVolume = (e) => {
  audio.volume = e.target.value;
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => {
    const keySpan = key.querySelector("span");
    if (keysCheck.checked) {
      keySpan.style.display = "inline"; // Mostra a letra da tecla
    } else {
      keySpan.style.display = "none"; // Esconde a letra da tecla
    }
  });
};

const showHideNotes = () => {
  pianoKeys.forEach((key) => {
    const keySpan = key.querySelector("span");
    if (notesCheck.checked) {
      keySpan.innerHTML = `${key.dataset.note}`; // Exibe apenas a nota correspondente
    } else if (keysCheck.checked) {
      keySpan.innerHTML = key.dataset.key; // Exibe apenas a tecla
    } else {
      keySpan.innerHTML = ''; // Limpa a exibição
    }
  });
};

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("change", () => {
  showHideKeys();
  showHideNotes(); // Atualiza as notas também ao alternar as teclas
});

notesCheck.addEventListener("change", showHideNotes);

document.addEventListener("DOMContentLoaded", function() {
  showHideKeys(); // Garante que as teclas sejam exibidas corretamente ao carregar a página
  showHideNotes(); // Garante que as notas sejam exibidas corretamente ao carregar a página
});

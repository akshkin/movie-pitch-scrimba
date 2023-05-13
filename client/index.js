import { fetchData } from "./utils.js";

const setupInputContainer = document.getElementById("setup-input-container");
const movieBossText = document.getElementById("movie-boss-text");

const url = "http://localhost:7000/api/openai";

document.getElementById("send-btn").addEventListener("click", () => {
  const setupTextarea = document.getElementById("setup-textarea");
  if (setupTextarea.value) {
    const input = setupTextarea.value;
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;
    fetchBotReply(input);
    fetchSynopsis(input);
  }
});

async function fetchBotReply(input) {
  const contentToStringify = {
    input: input,
  };
  const data = await fetchData(url, contentToStringify);
  movieBossText.innerText = data;
}

async function fetchSynopsis(outline) {
  const contentToStringify = {
    outline: outline,
  };
  const synopsis = await fetchData(`${url}/synopsis`, contentToStringify);
  document.getElementById("output-text").innerText = synopsis;
  fetchTitle(synopsis);
  fetchStars(synopsis);
}

async function fetchTitle(synopsis) {
  const contentToStringify = {
    synopsis: synopsis,
  };
  const title = await fetchData(`${url}/title`, contentToStringify);
  document.getElementById("output-title").innerText = title;
  fetchImagePrompt(title, synopsis);
}
async function fetchStars(synopsis) {
  const contentToStringify = {
    synopsis: synopsis,
  };
  const stars = await fetchData(`${url}/stars`, contentToStringify);
  document.getElementById("output-stars").innerText = stars;
}

async function fetchImagePrompt(title, synopsis) {
  const contentToStringify = {
    title,
    synopsis,
  };
  const image = await fetchData(`${url}/image`, contentToStringify);
  fetchImage(image);
}

async function fetchImage(imagePrompt) {
  const contentToStringify = {
    imagePrompt,
  };
  const image = await fetchData(`${url}/image/url`, contentToStringify);
  document.getElementById(
    "output-img-container"
  ).innerHTML = `<img src="${image}">`;
  setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`;
  document.getElementById("view-pitch-btn").addEventListener("click", () => {
    document.getElementById("setup-container").style.display = "none";
    document.getElementById("output-container").style.display = "flex";
    movieBossText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`;
  });
}

import { createSignal, For } from 'solid-js';
import './main.css';

const NASA_API_KEY = "U2gbA37HniOM2Mv22N8tP0RS4LitQ16PHZFHZJ6Y"//api key lolz
let link
let title

const [dim, setDim] = createSignal(150);

const [images, setImage] = createSignal([
  { link: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg', title: 'Mewa' },
  { link: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg', title: 'Inna Mewa' },
]);

const doShit = () => {
  if (title.value != "") {
    setImage([{ link: link.value, title: title.value }, ...images()]);
    link.value = ""
    title.value = ""
  }
}

const randomDog = () => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => linkSplitAndSet(data))
}


const randomGalaxy = () => {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=1`)
    .then(response => response.json())
    .then(data => setImage([{ link: data[0].url, title: data[0].title }, ...images()]))
}

const linkSplitAndSet = (data) => {
  let splitArr = data.message.split('/')
  let breed = splitArr[4]
  const breedName = breed.replace(/-/g, ' ')
  setImage([{ link: data.message, title: breedName }, ...images()])
}

const clearArray = () => {
  setImage([])
}

function App() {
  return <div class="main">
    <div class="title">
      <p>Galeria obrazków z kilkoma opcjami</p>

      <a href="https://github.com/Aveerator/playground3/" class="s">Source Code</a>
    </div>
    <div class="scroll">
      <p>Size: {dim()}px </p>
      <input class="slider" type="range" min="80" max="300" value="150" onInput={(e) => setDim(e.target.value)} />
    </div>

    <div class="form">
      Link:
      <input type="text" class="text-input" ref={link}>Link</input><br />
      Title:
      <input type="text" class="text-input" ref={title}>Title</input><br />
      <button onClick={doShit}>Zastosuj</button>
      <button onClick={clearArray}>Wyczyść</button><br />
      <button onClick={randomDog}>Losowy pies</button>
      <button onClick={randomGalaxy}>Losowe zdjęcie z kosmosu</button>
    </div>

    <div class="images">
      <For each={images()}>{(image, index) =>
        <div class="wrapper animate__animated animate__fadeInLeft" tyle={{ "--width-and-height": dim() }}>
          <p style={{ "--width-and-height": dim() }} class="img-title">{index() + 1}: {image.title}</p>
          <div class="image-div" style={{ "--width-and-height": dim() }}>
            <img class="image" src={image.link || "../assets/blank.jpeg"} alt={image.title || "Link"} />
          </div>
        </div>
      }</For>
    </div>
  </div>
}

export default App;

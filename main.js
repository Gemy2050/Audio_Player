let playBtn = document.querySelector("i.play");
let nextBtn = document.querySelector("i.next");
let prevBtn = document.querySelector("i.prev");
let progressContainer = document.querySelector(".progress-container");
let progress = document.querySelector(".progress");
let startTime = document.querySelector(".time .start");
let endTime = document.querySelector(".time .end");
let title = document.querySelector(".title");
let imgElement = document.querySelector(".image");
let audio = document.querySelector("audio");

let index = 0;
let start = false;
let updateTimer;


const music_list = [
  {
      img : 'images/00.jpg',
      name : "محمود على البنا",
      artist : 'The Kid LAROI, Justin Bieber',
      music : 'audios/3.mp3'
  },
  {
      img : 'images/01.jpg',
      name :  "حسن صالح: وعباد الرحمن",
      artist : '',
      music : 'audios/2.mp3'
  },
  {
      img : 'images/02.jpg',
      name :  "حسن صالح: ويوم ينفخ فى الصور ",
      artist : '',
      music : 'audios/1.mp3'
  },
  {
      img : 'images/0.jpg',
      name :  "حسن صالح: الفاتحه  ",
      artist : '',
      music : 'audios/4.mp3'
  },
  {
      img : 'images/01.jpg',
      name :  "حسن صالح: الاخلاص  ",
      artist : '',
      music : 'audios/5.mp3'
  },
  {
      img : 'images/2.jpg',
      name :  "حسن صالح: القدر  ",
      artist : '',
      music : 'audios/6.mp3'
  },
  {
      img : 'images/02.jpg',
      name :  "حسن صالح: الرحمن  ",
      artist : '',
      music : 'audios/7.mp3'
  },
];

function getAudioDuration() {
  if(!isNaN(audio.duration)) {
    let minutes = Math.floor(audio.duration / 60);
    let seconds = Math.floor(audio.duration % 60);
    endTime.innerText = `${minutes < 10 ? "0"+minutes : minutes}:${seconds < 10 ? "0"+seconds : seconds}`;
    // console.log("Hey");
  }
}
function load(obj) {
  clearInterval(updateTimer)
  imgElement.style.backgroundImage = `url('${obj.img}')`;
  audio.src = obj.music;
  audio.load();
  title.textContent = obj.name;
  window.onload=function(){
    getAudioDuration()
  }
  updateTimer = setInterval(getAudioDuration, 300);
  routes()
}
load(music_list[index]);


function handleTime() {
  let id = setInterval(function(){
    let m = Math.floor(audio.currentTime / 60);
    let s = Math.floor(audio.currentTime % 60);
    if (s >= 60) {
      console.log("Yes");
        m++;
        s = Math.floor(audio.currentTime - (60 * +m+1));
      }
      startTime.innerText = `${m < 10 ? "0"+m : m}:${s < 10 ? "0"+s : s}`;
      handleProgress(audio.currentTime);
    if(audio.ended) {
      next()
      clearInterval(id);
    }
    },500)
}
handleTime()

function handleProgress(time) {
  progress.style.width = `${(time / audio.duration) * 100}%`;
}
function setProgress(e){
  let width = this.offsetWidth;
  let target = e.offsetX;
  audio.currentTime = `${(target / width) * audio.duration}`;
  handleProgress(audio.currentTime)
}

function play() {
  handleTime();
  audio.play();
  playBtn.classList.remove("fa-circle-play");
  playBtn.classList.add("fa-circle-pause");
  start = true;
}
function pause() {
  audio.pause();
  playBtn.classList.remove("fa-circle-pause");
  playBtn.classList.add("fa-circle-play");
  start = false;
}
function check() {
  if(playBtn.classList.contains("fa-circle-play"))
    play();
  else
    pause();
}
function next() {
  if(index == music_list.length-1)
    index = 0;
  else
    index++;

  load(music_list[index]);
  routes();
}
function prev() {
  if(index == 0)
    index = music_list.length-1;
  else
    index--;

  load(music_list[index]);
  routes();
}
function routes() {
  start ? play() : pause();
  handleTime()
}

playBtn.addEventListener("click", check);
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
progressContainer.addEventListener("click", setProgress);


//song list data

var SongList = [{
    id: '0',
    img: '../images/1.jpg',
    name: 'Lehnga Jass Manak',
    duration: '05:34'
},
{
    id: '1',
    img: '../images/2.jpg',
    name: 'Chal Woh Choware ',
    duration: '02:50'
},
{
    id: '2',
    img: '../images/3.jpg',
    name: 'Changi kismat wali',
    duration: '06:34'
},
{
    id: '3',
    img: '../images/4.jpg',
    name: 'Gal Karke',
    duration: '04:45'
},
{
    id: '4',
    img: '../images/5.jpg',
    name: 'Jatti Da Crush',
    duration: '05:23'
},
{
    id: '5',
    img: '../images/6.jpg',
    name: 'Kesariya Tera',
    duration: '01:34'
},
{
    id: '6',
    img: '../images/7.jpg',
    name: 'Main Tan Vi Pyar Karda',
    duration: '02:34'
},
{
    id: '7',
    img: '../images/8.jpg',
    name: 'Malang Sajna',
    duration: '04:34'
},
{
    id: '8',
    img: '../images/8.jpg',
    name: 'Shining in the setting ',
    duration: '04:34'
}

]


// to get all song list
var allSong = document.getElementById("allSongs");
var str = '';
SongList.forEach(element => {
    str += `
    <div class="songItem">
        <img src="${element.img}" alt="1">
        <span>${element.name}</span>
        <span class="songListplay">
            <span>${element.duration}</span><i id = "${element.id}" class="fa-regular fa-circle-play songItemPlay"></i>
        </span>
    </div>  
    `;
});
allSong.innerHTML = str;


//main content

//to play a song create  a audio object and get other elements

let audioElement = new Audio('../songs/1.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songAnimation = document.getElementById('songAnimation');
let masterSongName = document.getElementById('masterSongName'); 
let songs = [
    { name: 'first', filePath: '../songs/1.mp3', coverPath: '../images/covers/1.jpg' },
    { name: 'first', filePath: '../songs/2.mp3', coverPath: '../images/covers/2.jpg' },
    { name: 'first', filePath: '../songs/3.mp3', coverPath: '../images/covers/3.jpg' },
    { name: 'first', filePath: '../songs/4.mp3', coverPath: '../images/covers/4.jpg' },
    { name: 'first', filePath: '../songs/5.mp3', coverPath: '../images/covers/5.jpg' },
    { name: 'first', filePath: '../songs/6.mp3', coverPath: '../images/covers/6.jpg' },
    { name: 'first', filePath: '../songs/7.mp3', coverPath: '../images/covers/7.jpg' },
    { name: 'first', filePath: '../songs/8.mp3', coverPath: '../images/covers/8.jpg' },
    { name: 'first', filePath: '../songs/9.mp3', coverPath: '../images/covers/9.jpg' },
    { name: 'first', filePath: '../songs/10.mp3', coverPath: '../images/covers/10.jpg' }
]



//play music and change play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        songAnimation.style.opacity = 1;
        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-play');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        songAnimation.style.opacity = 0;
        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-pause');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-play');
    }
})

// update seek bar
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})




// makeAllPlays function is to make all list buttons play
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

//to play and pause song from the list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-circle-play')) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            masterSongName.innerText = SongList[songIndex].name;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');;
            audioElement.src = `../songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            songAnimation.style.opacity = 1;
        } else {
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');;
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            songAnimation.style.opacity = 0;
        }
    })
})


//to change song from prev and next
document.getElementById('prev').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `../songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = SongList[songIndex].name;
    audioElement.currentTime = 0;
    audioElement.play();
    songAnimation.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `../songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = SongList[songIndex].name;
    audioElement.currentTime = 0;
    audioElement.play();
    songAnimation.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})


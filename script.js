const img = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container')
const durationEl = document.getElementById('duration')
const currentTimeEl = document.getElementById('current-time')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

//Songs
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electrical Music',
        artist: 'Jacinto',
    },
    {
        name: 'jacinto-2',
        displayName: 'DownTown-DownTown',
        artist: 'Jacinto',
    },
    {
        name: 'jacinto-3',
        displayName: 'Metallic Magic',
        artist: 'Jacinto',
    },
    {
        name: 'metric-1',
        displayName: 'Azuria Fiesta',
        artist: 'Jacinto',
    },

]

//Check If Playing
let isPlaying = false

//play
function musicPlay() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

//pause
function musicPause() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

playBtn.addEventListener('click', function(){
(isPlaying ? musicPause() : musicPlay())
})

//Current Song
let songIndex = 0

function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length -1
    }
    updateSong(songs[songIndex])
    musicPlay()
}

function nextSong(){
    songIndex++
    if(songIndex > 3){
        songIndex = 0
    }
    updateSong(songs[songIndex])
    musicPlay()
}

//Time and Progress Bar Update Update
function updateProgressBar(event){
    if (isPlaying){
        const {duration, currentTime} = event.srcElement
        //Progress Bar Update
        const progressPercentage = (currentTime/duration)*100
       //Converting Number to string
      let progressPercentageString = progressPercentage.toString()
        progress.style.width = `${progressPercentageString}%`
        //Updating The Duration Portion
        let durationMinute = Math.floor(duration/60)
        let durationSecond = Math.floor(duration % 60)
        if(durationSecond<10){
            durationSecond = `0${durationSecond}`
        }
        if(durationSecond)
        durationEl.textContent = `${durationMinute}:${durationSecond}`

        //Updating The Current Time Portion
        let currentTimeMinute = Math.floor(currentTime/60)
        let currentTimeSeconds = Math.floor(currentTime%60)
        if(currentTimeSeconds < 10){
            currentTimeSeconds = `0${currentTimeSeconds}`
        }
        if(currentTimeSeconds){
            currentTimeEl.textContent = `${currentTimeMinute}:${currentTimeSeconds}`
        }
    }
}

//On CLick Of The Progress Bar The Progress Shall be Updated
function setProgressBar(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration} = music
    const positionAtBar = (clickX/width)*duration
    music.currentTime = positionAtBar
}

//Updating The Hard Written Values
function updateSong(song){
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    img.src = `img/${song.name}.jpg`
}

//On Load
updateSong(songs[songIndex])

//Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)
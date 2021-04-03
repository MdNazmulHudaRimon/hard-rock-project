const searchSongs =  () =>{
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    toggleSpinner();
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        displaySongs(data.data);
    })
    .catch(error => console.log(error));
}
const displaySongs = songs => {
    const songList = document.getElementById('songs-list');
    songList.innerHTML = '';
    songs.forEach(song =>{
        const songDiv = document.createElement('div');
        songDiv.className  = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = ` <div class="col-md-9">
        <h3 class="lyrics-name"> ${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
             <source src="${song.preview}" type="audio/ogg"
        </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
        <button onclick = "getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>`
        ;
        songList.appendChild(songDiv);
        toggleSpinner();
    });
}


const getLyric =(artist,title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res =>res.json())
    .then(data =>{
        displayLryics(data.lyrics);
    })
    .catch(error => console.log(error));
}
const displayLryics = lyrics =>{
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;
}

const toggleSpinner = (show) =>{
    const spinner = document.getElementById('spinner');
    spinner.classList.toggle('d-none');
}

var srcBtn = document.getElementById('search-button');
document.getElementById('search-field').addEventListener('keypress',function(event){
    // event.preventDefault();
    if(event.key === 'Enter'){
        srcBtn.click();
    }
})
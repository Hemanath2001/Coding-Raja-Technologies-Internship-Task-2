// Initialize playlist and library
const playlist = [
    { title: 'Shape Of You', artist: 'Ed Sheeran', cover: 'trackcover1.png', file: 'Shape-Of-You.mp3' },
    { title: 'On My Way', artist: 'Alan Walker', cover: 'trackcover1.png', file: 'On-My-Way.mp3' },
    { title: 'Faded', artist: 'Alan Walker', cover: 'trackcover1.png', file: 'Faded.mp3' },
    { title: 'Baby', artist: 'Justin Bieber', cover: 'trackcover1.png', file: 'Baby.mp3' },
    { title: 'Ignite', artist: 'Alan Walker', cover: 'trackcover1.png', file: 'Ignite.mp3' },
    { title: 'Spectre', artist: 'Alan Walker', cover: 'trackcover1.png', file: 'Spectre.mp3' },
    { title: 'Alone Pt II', artist: 'Alan Walker', cover: 'trackcover1.png', file: 'Alone-Pt-II.mp3' },
    { title: 'Attention', artist: 'Charlie Puth', cover: 'trackcover1.png', file: 'Attention.mp3' },
    { title: 'Let Me Love You', artist: 'DJ Snake ft. Justin Bieber', cover: 'trackcover1.png', file: 'Let-Me-Love-You.mp3' },
];

let currentTrack = 0;
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentCover = document.getElementById('current-cover');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const libraryBtn = document.getElementById('libraryBtn');
const libraryPopup = document.getElementById('library-popup');
const shuffleBtn = document.getElementById('shuffleBtn');
const backBtn = document.getElementById('backBtn');
const library = document.getElementById('library');
const playlistElement = document.getElementById('playlist');

// Function to show the library popup
function showLibrary() {
    libraryPopup.style.display = 'flex';
}

// Function to hide the library popup
function hideLibrary() {
    libraryPopup.style.display = 'none';
}

// Library button click event
libraryBtn.addEventListener('click', showLibrary);

// Shuffle button click event
shuffleBtn.addEventListener('click', shufflePlaylist);

// Back button click event
backBtn.addEventListener('click', hideLibrary);

// Initialize playlist and library
playlist.forEach((track, index) => {
    const listItem = createListItem(track, index);
    playlistElement.appendChild(listItem);

    const libraryItem = createListItem(track, index);
    library.appendChild(libraryItem);

    libraryItem.addEventListener('click', () => {
        hideLibrary();
        playTrack(index);
    });
});

// Play button click event
playBtn.addEventListener('click', togglePlay);

// Next button click event
nextBtn.addEventListener('click', nextTrack);

// Previous button click event
prevBtn.addEventListener('click', prevTrack);

// Audio time update event
audio.addEventListener('timeupdate', updateProgress);

// Audio ended event
audio.addEventListener('ended', nextTrack);

// Progress bar click event
progressContainer.addEventListener('click', setProgress);

// Function to create a list item for a track
function createListItem(track, index) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<img src="${track.cover}" alt="${track.title}"><span>${track.title} - ${track.artist}</span>`;
    listItem.dataset.index = index;
    return listItem;
}

// Play or pause the audio
function togglePlay() {
    if (audio.paused) {
        if (audio.src === '') {
            // If no song is currently loaded, play the first song
            playTrack(0);
        } else {
            // If a song is loaded, resume playing
            audio.play();
        }
        playBtn.textContent = 'Pause';
    } else {
        // Pause the audio
        audio.pause();
        playBtn.textContent = 'Play';
    }
}


// Play a specific track
function playTrack(index) {
    currentTrack = index;
    audio.src = playlist[index].file;
    audio.play();
    playBtn.textContent = 'Pause';
    updateNowPlaying(index);
}

// Play the next track in the playlist
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    playTrack(currentTrack);
}

// Play the previous track in the playlist
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    playTrack(currentTrack);
}

// Update the progress bar
function updateProgress() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
}

// Set the audio progress based on the click position on the progress bar
function setProgress(event) {
    const totalWidth = progressContainer.clientWidth;
    const clickX = event.clientX - progressContainer.offsetLeft;
    const percent = (clickX / totalWidth);
    audio.currentTime = percent * audio.duration;
}

// Update Now Playing section
function updateNowPlaying(index) {
    currentCover.src = playlist[index].cover;
    currentTitle.textContent = playlist[index].title;
    currentArtist.textContent = playlist[index].artist;
}

// Function to shuffle the playlist
function shufflePlaylist() {
    for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }

    updatePlaylistUI();

    if (audio.paused) {
        currentTrack = playlist.findIndex((track) => track.file === audio.src);
    }
}

// Function to update the UI with the shuffled playlist
function updatePlaylistUI() {
    playlistElement.innerHTML = '';
    library.innerHTML = '';

    playlist.forEach((track, index) => {
        const listItem = createListItem(track, index);
        playlistElement.appendChild(listItem);

        const libraryItem = createListItem(track, index);
        libraryItem.addEventListener('click', () => playTrack(index));
        library.appendChild(libraryItem);
    });
}

// Update Now Playing section
function updateNowPlaying(index) {
    currentCover.src = playlist[index].cover;
    currentTitle.textContent = playlist[index].title;
    currentArtist.textContent = playlist[index].artist;
}

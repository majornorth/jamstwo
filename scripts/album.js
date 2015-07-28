// Example Album
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21'},
        { name: 'Magenta', length: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in your pocket', length: '3:21'},
        { name: 'Can you hear me now?', length: '3:14' },
        { name: 'Wrong phone number', length: '2:15'}
    ]
};

// Third Example Album
var albumThriller = {
    name: 'Thriller',
    artist: 'Michael Jackson',
    label: 'Epic',
    year: '1982',
    albumArtUrl: 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png',
    songs: [
        { name: 'Wanna Be Startin\' Something?', length: '6:03' },
        { name: 'Baby Be Mine', length: '4:20' },
        { name: 'The Girl Is Mine', length: '3:42'},
        { name: 'Thriller', length: '5:57' },
        { name: 'Beat It', length: '4:18'}
    ]
};

var albumCover = document.getElementsByClassName('column half')[0].children[0];

albumCover.onclick = function() {
    var currentAlbum = document.getElementsByClassName('album-view-title')[0].firstChild.nodeValue;

    if (currentAlbum === albumPicasso.name) {
        setCurrentAlbum(albumMarconi);
    } else if (currentAlbum === albumMarconi.name) {
        setCurrentAlbum(albumThriller);
    } else if (currentAlbum === albumThriller.name) {
        setCurrentAlbum(albumPicasso);
    }
};

var createSongRow = function(songNumber, songName, songLength) {

    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

    return template;

};


var setCurrentAlbum = function(album) {

    // #1
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    // #2
    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // #3
    albumSongList.innerHTML = '';

    // #4
    for (i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }

};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

window.onload = function() {

    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
        // Only target individual song rows during event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {
            // Change the content from the number to the play button's HTML
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        }
    });

    for (i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
        });
    }
};

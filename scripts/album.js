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

   var $row = $(template);

   var clickHandler = function() {
       var songNumber = $(this).attr('data-song-number');

       console.log(songNumber);

       if (currentlyPlayingSong !== null) {
           var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
           currentlyPlayingCell.html(currentlyPlayingSong);
       }

       if (currentlyPlayingSong !== songNumber) {
           $(this).html(pauseButtonTemplate);
           currentlyPlayingSong = songNumber;
       }

       else if (currentlyPlayingSong === songNumber) {
           $(this).html(playButtonTemplate);
           currentlyPlayingSong = null;
       }
   };


   var onHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = songNumberCell.attr('data-song-number');

       if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(playButtonTemplate);
       }
   };

   var offHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = songNumberCell.attr('data-song-number');

       if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(songNumber);
       }
   };

   $row.find('.song-item-number').click(clickHandler);
   $row.hover(onHover, offHover);
   return $row;

};


var setCurrentAlbum = function(album) {

    // #1
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    // #2
    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    // #3
    $albumSongList.empty();

    // #4
    for (i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }

};

function hasSomeParentTheClass(element, classname) {
    if (element.className.split(' ').indexOf(classname)>=0) return true;
    return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

 $(document).ready(function() {

    setCurrentAlbum(albumPicasso);

});

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
       // clickHandler logic
   };


   var onHover = function(event) {
       // Placeholder for function logic
   };

   var offHover = function(event) {
       // Placeholder for function logic
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

var findParentByClassName = function(element, targetClass) {
    // Checks to see if a parent exists. If it doesn't, then show an alert that says "No parent found"
    if (element.parentElement) {
        var currentParent = element.parentElement;
    } else {
        alert("No parent found");
    }

    // Shows a different alert when it fails to find a parent with the given class name ("No parent found with that class name")
    var checkAncestorClass = hasSomeParentTheClass(element, targetClass);

    if (checkAncestorClass) {
        while (currentParent.className != targetClass) {
            currentParent = currentParent.parentElement
        }
    } else {
        alert("No parent found with that class name");
    }

    return currentParent;
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};


var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);

    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    }  else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

 $(document).ready(function() {

    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
        // Only target individual song rows during event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {
            // Change the content from the number to the play button's HTML
            var songItem = getSongItem(event.target);

            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });

    for (i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            var leavingSongItem = getSongItem(event.target);
            var leavingSongItemNumber = leavingSongItem.getAttribute('data-song-number');

            if (leavingSongItemNumber !== currentlyPlayingSong) {
                leavingSongItem.innerHTML = leavingSongItemNumber;
            }
        });


        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        });
    }
});

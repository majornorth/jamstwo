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
    var songNumber = parseInt($(this).attr('data-song-number'));

    if (currentlyPlayingSongNumber !== null) {
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

      currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }

    if (currentlyPlayingSongNumber !== songNumber) {
      setSong(songNumber);
      currentSoundFile.play();
      $(this).html(pauseButtonTemplate);
      updatePlayerBarSong();
    }

    else if (currentlyPlayingSongNumber === songNumber) {
      if (currentSoundFile.isPaused()) {
        $(this).html(pauseButtonTemplate);
        $('.left-controls .play-pause').html(playerBarPauseButton);
        currentSoundFile.play();
      } else {
        $(this).html(playButtonTemplate);
        $('.left-controls .play-pause').html(playerBarPlayButton);
        currentSoundFile.pause();
      }
    }
  };


  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
    songNumberCell.html(playButtonTemplate);
    }
  };

  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
    songNumberCell.html(songNumber);
    }
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};


var setCurrentAlbum = function(album) {
  currentAlbum = album;

  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.name);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for (i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    $albumSongList.append($newRow);
  }
};


var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};

var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
};

var nextSong = function() {
  var getLastSongNumber = function(index) {
    return index == 0 ? currentAlbum.songs.length : index;
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex++;

  if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }

  setSong(currentSongIndex + 1);
  currentSoundFile.play();
  updatePlayerBarSong();

  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
  var getLastSongNumber = function(index) {
    return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = currentAlbum.songs.length - 1;
  }

  setSong(currentSongIndex + 1);
  currentSoundFile.play();
  updatePlayerBarSong();

  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $previousSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);

};

var updatePlayerBarSong = function() {
  $('.currently-playing .song-name').text(currentSongFromAlbum.name);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);

  $('.left-controls .play-pause').html(playerBarPauseButton);
};

var togglePlayFromPlayerBar = function() {
  if (currentSoundFile.isPaused()) {
    currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    currentlyPlayingCell.html(pauseButtonTemplate);
    $playerBarTogglePlay.html(playerBarPauseButton);
    currentSoundFile.play();
  } else if (currentSoundFile) {
    currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    currentlyPlayingCell.html(playButtonTemplate);
    $playerBarTogglePlay.html(playerBarPlayButton);
    currentSoundFile.pause();
  }
};

function hasSomeParentTheClass(element, classname) {
  if (element.className.split(' ').indexOf(classname)>=0) return true;
  return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var setSong = function(songNumber) {
  if (currentSoundFile) {
    currentSoundFile.stop();
  }

  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: [ 'mp3' ],
    preload: true
  });

  setVolume(currentVolume);
};

var setVolume = function(volume) {
  if (currentSoundFile) {
    currentSoundFile.setVolume(volume);
  }
};

// Player bar element selectors
var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');
var $playerBarTogglePlay = $('.left-controls .play-pause');

 $(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $playerBarTogglePlay.click(togglePlayFromPlayerBar);
});

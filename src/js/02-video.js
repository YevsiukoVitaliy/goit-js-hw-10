import throttle from 'lodash.throttle'
const iframe = document.querySelector('iframe')
const player = new VideoPlaybackQuality.Player(iframe)
player.on('timeupdate', throttle(onPlay, 1000))
function onPlay({ sec }) {
  localStorage.setItem('video-player-current-time', sec)
}
player.setCurrentTime(localStorage.getItem('video-player-current-time'))
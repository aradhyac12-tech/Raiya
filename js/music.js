let song1=new Audio(CONFIG.song1);
let song2=new Audio(CONFIG.song2);
song1.loop=true; song1.volume=1; song1.play();

function switchSong(){
  song1.pause();
  song2.currentTime=CONFIG.song2Start;
  song2.play();
  startLyrics(song2);
}

function playMusic(){

 if(localStorage.getItem("music")==="start"){

   let audio=document.createElement("audio");
   audio.id="song";
   audio.src="../"+CONFIG.song;
   audio.autoplay=true;

   document.body.appendChild(audio);

   audio.addEventListener("timeupdate",showLyrics);
 }
}

window.onload=playMusic;

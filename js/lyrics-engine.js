// timestamp hooks (paste your local lyrics if desired)
const cues=[
  {t:CONFIG.song2Start,txt:"♪"},
  {t:CONFIG.song2Start+15,txt:"♪ ♪"},
  {t:CONFIG.song2Start+30,txt:"♪ ♪ ♪"}
];
function startLyrics(a){
  a.ontimeupdate=()=>{
    cues.forEach(c=>{ if(a.currentTime>=c.t) lyrics.textContent=c.txt; });
  };
}

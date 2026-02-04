let bpm=72;

document.getElementById("eyes")
.addEventListener("mouseover",()=>{

 let i=setInterval(()=>{
   bpm+=3;
   bpmDiv.innerHTML=bpm+" BPM";
   heart.style.transform="scale("+(1+bpm/200)+")";

   if(bpm>125)clearInterval(i);

 },500);

});

function next(){
 window.location.href="heart.html";
}

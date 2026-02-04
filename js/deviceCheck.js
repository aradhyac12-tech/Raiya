function checkDevice(){
 let s=localStorage.getItem("session");
 if(s==="admin")return;

 if(screen.width<CONFIG.targetWidth){
   document.body.innerHTML=
   "<h2 style='color:white;margin-top:20%'>Laptop 1920x1080 only</h2>";
 }
}

window.onload=checkDevice;

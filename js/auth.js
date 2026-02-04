function closePopup(){
 document.getElementById("volumePopup").style.display="none";
}

function init(){
 if(!localStorage.getItem("valentineData")){
   localStorage.setItem("valentineData", JSON.stringify({
     openTime:new Date().toLocaleString(),
     totalAttempts:0,
     wrongAttempts:[]
   }));
 }
}

function login(){

 init();

 let pass=document.getElementById("password").value;

 if(pass===CONFIG.password){
   localStorage.setItem("session","user");
   localStorage.setItem("music","start");
   window.location.href="pages/quiz.html";
 }
 else if(pass===CONFIG.adminPassword){
   localStorage.setItem("session","admin");
   window.location.href="admin.html";
 }
 else{
   document.getElementById("error").innerHTML="Wrong Password";
 }
}

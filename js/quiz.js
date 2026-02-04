function checkQuiz(){

 let a=q1.value.toLowerCase().trim();
 let b=q2.value.toLowerCase().trim();

 if(a==="13 october 2025" && b==="20 december 2025"){
   window.location.href="eyes.html";
 }
 else{
   res.innerHTML="Wrong";
 }
}

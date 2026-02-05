function submit(){
  if(w1.dataset.value===CONFIG.meetDate && w2.dataset.value===CONFIG.proposeDate){
    location.href="heart.html";
  }else{
    logWrong("quiz",`${w1.dataset.value}|${w2.dataset.value}`);
    navigator.vibrate?.([30,50,30]);
    alert("Wrong date");
  }
}

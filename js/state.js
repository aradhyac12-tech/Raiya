function initState(){
  if(!localStorage.getItem("valentineData")){
    localStorage.setItem("valentineData", JSON.stringify({
      openTime: new Date().toLocaleString(),
      attempts: 0,
      wrong: [],
      loveResponse: ""
    }));
  }
}
function logWrong(page, val){
  const d = JSON.parse(localStorage.getItem("valentineData"));
  d.attempts++;
  d.wrong.push({page, val, time:new Date().toLocaleString()});
  localStorage.setItem("valentineData", JSON.stringify(d));
}

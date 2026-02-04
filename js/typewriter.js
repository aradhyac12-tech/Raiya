let t=`na dur na karib hai tu
par mere dil ke pass hai tu
kabhi ruthna to kabhi manana hai
kabhi pyar to kabhi gussa hai
chod ye bato ko tu
muze toh tuze chahna hai
bate band mat kara kr muzse
tere pyar mai he to fida hai hum`;

let i=0;

function type(){
 if(i<t.length){
  poem.innerHTML+=t.charAt(i);
  i++;
  setTimeout(type,60);
 }
}

window.onload=type;

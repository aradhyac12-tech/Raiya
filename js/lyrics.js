const lines=[
{t:0,l:"I never knew love until I met you"},
{t:10,l:"Every moment feels brand new"},
{t:20,l:"Her smile got me falling"},
{t:30,l:"Her eyes keep calling"},
{t:40,l:"I found my forever in you"},
{t:60,l:"You are my world"},
{t:80,l:"Only you RAIYA"}
];

function showLyrics(e){

 let time=e.target.currentTime;

 for(let i=0;i<lines.length;i++){
   if(time>lines[i].t){
     document.getElementById("lyrics").innerHTML=lines[i].l;
   }
 }
}

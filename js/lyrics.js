const lyrics = [
{time: 0, text: "I don't want to be alone tonight"},
{time: 6, text: "It's pretty clear that I'm not over you"},
{time: 12, text: "I'm still thinking 'bout the things you do"},
{time: 18, text: "So I don't want to be alone tonight"},
{time: 24, text: "Can you light the fire"},
{time: 30, text: "I need somebody who can take control"},
{time: 36, text: "I know exactly what I need to do"},
{time: 42, text: "Cause I don't want to be alone tonight"},
{time: 48, text: "Look what you made me do"},
{time: 54, text: "I'm with somebody new"},
{time: 60, text: "Ooh baby baby I'm dancing with a stranger"}
];

function startLyrics(){

    let audio = document.getElementById("bgSong");

    let box = document.getElementById("lyricsBox");

    audio.addEventListener("timeupdate", ()=>{

        let current = audio.currentTime;

        lyrics.forEach(l => {

            if(Math.floor(current) === l.time){

                box.innerHTML = l.text;

                box.classList.remove("show");
                void box.offsetWidth;
                box.classList.add("show");
            }

        });

    });

}

function buildWheel(id,vals){
  const el=document.getElementById(id);
  vals.forEach(v=>{
    const d=document.createElement("div"); d.textContent=v;
    d.onclick=()=>{navigator.vibrate?.(10);
      [...el.children].forEach(x=>x.classList.remove("active"));
      d.classList.add("active"); el.dataset.value=v;
    };
    el.appendChild(d);
  });
}
buildWheel("w1",["11 Oct 2025","12 Oct 2025","13 Oct 2025"]);
buildWheel("w2",["19 Dec 2025","20 Dec 2025","21 Dec 2025"]);

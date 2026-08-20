el("p#add").onclick = () => {
  if (secretCodeLOL == 1) {
    secretCodeLOL++;
  }
  //end
};
el("header").onclick = () => {
  if (secretCodeLOL == 0) {
    secretCodeLOL++;
  }
  //end
};
numInput.onchange = () => {
  if (numInput.value == 6769) {
    if (secretCodeLOL == 2) {
      alert("YO!");
    }
  }
};

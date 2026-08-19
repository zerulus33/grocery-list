const itemList = [
  ["Bread", 40, 0], //Regulars, 0
  ["Milk", 77, 0],
  ["Oats", 86, 0],
  ["Biscuit", 40, 0],
  ["Kwai", 10, 0],
  ["Raja", 12, 0],
  ["Rice (1kg)", 50, 0], //Ingredients, 6
  ["Potato", 20, 0],
  ["Onion", 50, 0],
  ["Dal", 90, 0],
  ["Sugar", 60, 0],
  ["Slasha", 105, 0],
  ["Salt", 30, 0],
  ["Oil (0.7L)", 145, 0],
  ["Black Pepper (20g)", 35, 0],
  ["Lemon", 20, 0],
  ["Chicken", 300, 0],
  ["Eggs (Half Tray)", 105, 0],
  ["Breadcrumbs", 0, 0],
  ["Coffee", 10, 0], //Snacks. 19
  ["Jam", 25, 0],
  ["Cupcake", 35, 0],
  ["Lamington", 90, 0],
  ["Chips", 10, 0],
  ["Ice Cream", 10, 0],
  ["Moisturizer", 0, 0], // Personal Care, 25
  ["Deodorant", 125, 0],
  ["Pads", 42, 0],
  ["Facewash", 20, 0],
  ["Pears", 50, 0],
  ["Shampoo", 0, 0],
  ["Toothpaste", 100, 0],
  ["Conditioner", 3, 0],
  ["Toilet Paper", 100, 0], //Others, 33
  ["Garbage Bag (Medium)", 0, 0],
  ["Garbage Bag (Large)", 0, 0],
  ["Green Scrubber", 0, 0],
  ["Dish Soap (4 nos.)", 110, 0],
  ["Cross (500mL)", 113, 0],
  ["Bandaid", 0, 0],
  ["Battery (Thinn)", 30, 0],
  ["Battery (Thicc)", 25, 0],
];
const resultArr = Array.from(itemList);
const totalArr = [];
let total = 0;
const el = (selector) => document.querySelector(selector);
const elA = (selector) => document.querySelectorAll(selector);
const make = (element) => document.createElement(element);

itemList.forEach((item, index) => {
  switch (index) {
    case 0: {
      const h2 = make("h2");
      document.body.appendChild(h2);
      h2.innerText = "Regulars";
      break;
    }
    case 6: {
      const h2 = make("h2");
      document.body.appendChild(h2);
      h2.innerText = "Ingredients";
      break;
    }
    case 19: {
      const h2 = make("h2");
      document.body.appendChild(h2);
      h2.innerText = "Snacks";
      break;
    }
    case 25: {
      const h2 = make("h2");
      document.body.appendChild(h2);
      h2.innerText = "Personal Care";
      break;
    }
    case 33: {
      const h2 = make("h2");
      document.body.appendChild(h2);
      h2.innerText = "Others";
      break;
    }
  }
  const div = make("div");
  const buttonMinus = make("button");
  buttonMinus.className = "minus";
  buttonMinus.innerText = "-";
  const buttonAdd = make("button");
  buttonAdd.className = "add";
  buttonAdd.innerText = "+";
  const input = make("input");
  const h3 = make("h3");
  const p = make("p");
  input.type = "number";
  input.value = "0";
  input.min = "0";
  input.dataset.index = index;
  div.className = "item";
  div.appendChild(buttonMinus);
  div.appendChild(input);
  div.appendChild(buttonAdd);
  div.appendChild(h3);
  div.appendChild(p);
  h3.innerText = item[0];
  p.innerText = "₹" + item[1];
  document.body.appendChild(div);
  totalArr.push(0);
  totalArr.push(0);

  buttonAdd.onclick = (e) => {
    const input = e.target.parentElement.children[1];
    input.value = +input.value + 1;
    input.parentElement.style.background =
      input.value == 0 ? "var(--bg)" : "seagreen";
    let amount = +input.parentElement.children[4].innerText.slice(1);
    totalArr[input.dataset.index] = input.value * amount;
    resultArr[input.dataset.index][2] = input.value;
    total = totalArr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    el("footer > p:nth-child(2)").innerText = "₹" + total;
  };
  buttonMinus.onclick = (e) => {
    const input = e.target.parentElement.children[1];
    input.value = input.value == 0 ? input.value : +input.value - 1;
    input.parentElement.style.background =
      input.value == 0 ? "var(--bg)" : "seagreen";
    let amount = +input.parentElement.children[4].innerText.slice(1);
    totalArr[input.dataset.index] = input.value * amount;
    resultArr[input.dataset.index][2] = input.value;
    total = totalArr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    el("footer > p:nth-child(2)").innerText = "₹" + total;
  };
});

elA(".item > input").forEach(
  (input) =>
    (input.onchange = (e) => {
      input.parentElement.style.background =
        e.target.value == 0 ? "var(--bg)" : "seagreen";
      let amount = +input.parentElement.children[4].innerText.slice(1);
      totalArr[input.dataset.index] = e.target.value * amount;
      resultArr[input.dataset.index][2] = e.target.value;
      total = totalArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      el("footer > p:nth-child(2)").innerText = "₹" + total;
    }),
);

async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error.message);
  }
}
el("footer").onclick = (e) => {
  let results1 = "";
  let results2 = "";
  let extraResults = "";

  let count = 0;
  resultArr.forEach((item, index) => {
    if (item[2] != 0) {
      if (count == 0) {
        count++;
        results1 = "- *" + item[0] + " x " + item[2] + "*";
        const ddMMyyyy = new Date()
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-");
        results2 =
          "k," + ddMMyyyy + "," + item[0] + "," + item[1] + "," + item[2];
      } else {
        results1 = results1 + "\n" + "- *" + item[0] + " x " + item[2] + "*";
        results2 = results2 + "\nk,," + item[0] + "," + item[1] + "," + item[2];
      }
    }
  });
  if (elA(".extra").length != 0) {
    elA(".extra").forEach((extraItem) => {
      let name = extraItem.children[0].value;
      let quantity = +extraItem.children[1].value;

      if (quantity != 0) {
        if (count == 0) {
          count++;
          results1 = "- *" + name + " x " + quantity + "*";
          const ddMMyyyy = new Date()
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-");
          results2 = "k," + ddMMyyyy + "," + name + "," + 0 + "," + quantity;
        } else {
          results1 = results1 + "\n" + "- *" + name + " x " + quantity + "*";
          results2 = results2 + "\nk,," + name + "," + 0 + "," + quantity;
        }
        extraResults = extraResults + `\n[${name},0,${quantity}]`;
      }
    });
  }
  console.log(extraResults);
  if (results1 != "") {
    let results =
      results1 +
      "\n" +
      "- *Total = " +
      total +
      "*\n" +
      "-------------------------" +
      "\n" +
      results2 +
      "\n" +
      "https://1drv.ms/x/c/2812548f34b84739/IQCdYTpFOrvGRZmNgRCfxiIaAQdUlTSoXDMMMA0GLtLjgWI?e=hkifX3";

    results = extraResults != "" ? results + extraResults : results;
    console.log(results);
    writeClipboardText(results);
    alert("Copied to clipboard!");
  }
};

let menuState = false;
el("header").onclick = () => {
  el(".menu").style.top = menuState ? "-100%" : "50px";
  menuState = !menuState;
};
elA(".menu > p").forEach((option, index) => {
  option.onclick = () => {
    option.parentElement.style.top = "-100%";
    window.scrollTo({
      top: elA("h2")[index].getBoundingClientRect().top + window.scrollY - 60,
      behavior: "smooth",
    });
  };
});

el("p#add").onclick = () => {
  if (elA(".extra").length == 0) {
    const h2 = make("h2");
    document.body.appendChild(h2);
    h2.innerText = "Extra";
  }
  const extra = make("div");
  extra.className = "item extra";
  const textInput = make("input");
  textInput.type = "text";
  textInput.placeholder = "Item name...";
  const numInput = make("input");
  numInput.type = "number";
  numInput.min = "0";
  numInput.value = "1";
  const x = make("p");
  x.innerText = "X";
  x.onclick = (e) => {
    let confirmState = confirm("Delete " + textInput.value + "?");
    if (!confirmState) {
      return;
    }
    if (elA(".extra").length == 1) {
      el("h2:nth-last-of-type(1)").remove();
    }
    extra.remove();
  };
  extra.appendChild(textInput);
  extra.appendChild(document.createTextNode("x"));
  extra.appendChild(numInput);
  extra.appendChild(x);
  document.body.appendChild(extra);

  window.scrollTo({
    top:
      document.body.lastElementChild.getBoundingClientRect().top +
      window.scrollY -
      60,
    behavior: "smooth",
  });
};

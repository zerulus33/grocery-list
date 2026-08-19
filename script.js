const version = 1;

const itemList = [
  ["Bread", 40, 0, "Regulars"],
  ["Milk", 77, 0, "Regulars"],
  ["Oats", 86, 0, "Regulars"],
  ["Biscuit", 40, 0, "Regulars"],
  ["Kwai", 10, 0, "Regulars"],
  ["Raja", 12, 0, "Regulars"],

  ["Rice (1kg)", 50, 0, "Ingredients"],
  ["Potato", 20, 0, "Ingredients"],
  ["Onion", 65, 0, "Ingredients"],
  ["Dal", 90, 0, "Ingredients"],
  ["Sugar", 65, 0, "Ingredients"],
  ["Slasha", 105, 0, "Ingredients"],
  ["Salt", 30, 0, "Ingredients"],
  ["Oil (0.7L)", 145, 0, "Ingredients"],
  ["Black Pepper (20g)", 35, 0, "Ingredients"],
  ["Lemon", 20, 0, "Ingredients"],
  ["Chicken", 300, 0, "Ingredients"],
  ["Eggs (Half Tray)", 105, 0, "Ingredients"],
  ["Breadcrumbs", 0, 0, "Ingredients"],

  ["Coffee", 10, 0, "Snacks"],
  ["Jam", 25, 0, "Snacks"],
  ["Cupcake", 35, 0, "Snacks"],
  ["Lamington", 90, 0, "Snacks"],
  ["Chips", 10, 0, "Snacks"],
  ["Ice Cream", 10, 0, "Snacks"],

  ["Moisturizer", 0, 0, "Personal Care"],
  ["Deodorant", 125, 0, "Personal Care"],
  ["Pads", 42, 0, "Personal Care"],
  ["Facewash", 20, 0, "Personal Care"],
  ["Pears", 50, 0, "Personal Care"],
  ["Shampoo", 0, 0, "Personal Care"],
  ["Toothpaste", 100, 0, "Personal Care"],
  ["Conditioner", 3, 0, "Personal Care"],

  ["Toilet Paper", 100, 0, "Others"],
  ["Garbage Bag (Medium)", 0, 0, "Others"],
  ["Garbage Bag (Large)", 0, 0, "Others"],
  ["Green Scrubber", 0, 0, "Others"],
  ["Dish Soap (4 nos.)", 110, 0, "Others"],
  ["Cross (500mL)", 113, 0, "Others"],
  ["Bandaid", 0, 0, "Others"],
  ["Battery (Thinn)", 30, 0, "Others"],
  ["Battery (Thicc)", 25, 0, "Others"],
];

const resultArr = Array.from(itemList);
const totalArr = [];
let total = 0;
const el = (selector) => document.querySelector(selector);
const elA = (selector) => document.querySelectorAll(selector);
const make = (element) => document.createElement(element);

const updateLog = [
  //
  "Added update notification",
  "Onion: 50 > 65",
  "Sugar: 60 > 65",
];
const displayUpdateLog = () => {
  const modal = make("div");
  modal.className = "modal";
  const backdrop = make("div");
  backdrop.className = "backdrop";
  const actual = make("div");
  actual.className = "actual";
  const h2 = make("h2");
  h2.innerText = "Updated!";
  const ul = make("ul");
  const ok = make("button");
  ok.innerText = "OK";

  modal.appendChild(backdrop);
  modal.appendChild(actual);
  actual.appendChild(h2);
  actual.appendChild(ul);
  actual.appendChild(ok);

  ok.onclick = (e) => {
    e.target.parentElement.style.animation = "downandout 0.3s forwards";
    setTimeout(() => {
      e.target.parentElement.parentElement.remove();
    }, 300);
  };

  updateLog.forEach((log) => {
    const li = make("li");
    li.innerText = log;
    ul.appendChild(li);
  });

  document.body.appendChild(modal);
};

if (localStorage.getItem("version") != version) {
  localStorage.setItem("version", version);
  displayUpdateLog();
}

let currentCategory = "";
itemList.forEach((item, index) => {
  if (currentCategory != item[3]) {
    const h2 = make("h2");
    document.body.appendChild(h2);
    h2.innerText = item[3];
    currentCategory = item[3];
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
        extraResults = extraResults + `\n[${name},0,${quantity},""]`;
      }
    });
  }
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

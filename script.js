const itemList = [
  ["Bread", 40, 0],
  ["Kwai", 10, 0],
  ["Raja", 12, 0],
  ["Chips", 10, 0],
  ["Ice Cream", 10, 0],
  ["Milk", 77, 0],
  ["Coffee", 10, 0],
  ["Biscuit", 40, 0],
  ["Cupcake", 35, 0],
  ["Lamington", 90, 0],
  ["Oats", 89, 0],
  ["Eggs (Half Tray)", 120, 0],
  ["Chicken", 300, 0],
  ["Breadcrumbs", 0, 0],
  ["Potato", 20, 0],
  ["Onion", 50, 0],
  ["Lemon", 20, 0],
  ["Dal", 90, 0],
  ["Sugar", 60, 0],
  ["Slasha", 105, 0],
  ["Black Pepper (20g)", 35, 0],
  ["Oil (0.7L)", 202, 0],
  ["Pads", 42, 0],
  ["Moisturizer", 0, 0],
  ["Deodorant", 125, 0],
  ["Toothpaste", 100, 0],
  ["Pears", 50, 0],
  ["Toilet Paper", 100, 0],
  ["Conditioner", 3, 0],
  ["Shampoo", 0, 0],
  ["Dish Soap (4 nos.)", 110, 0],
  ["Green Scrubber", 0, 0],
  ["Bandaid", 0, 0],
  ["Battery (Thinn)", 30, 0],
  ["Battery (Thicc)", 25, 0],
  ["Cross (500mL)", 113, 0],
];
const resultArr = Array.from(itemList);
const totalArr = [];
const el = (selector) => document.querySelector(selector);
const elA = (selector) => document.querySelectorAll(selector);

itemList.forEach((item, index) => {
  const div = document.createElement("div");
  const input = document.createElement("input");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  input.type = "number";
  input.value = "0";
  input.min = "0";
  input.dataset.index = index;
  div.className = "item";
  div.appendChild(input);
  div.appendChild(h3);
  div.appendChild(p);
  h3.innerText = item[0];
  p.innerText = "₹" + item[1];
  document.body.appendChild(div);

  totalArr.push(0);
  totalArr.push(0);
});

elA(".item > input").forEach(
  (input) =>
    (input.onchange = (e) => {
      input.parentElement.style.background =
        e.target.value == 0 ? "white" : "lightgreen";
      let amount = +input.parentElement.children[2].innerText.slice(1);
      totalArr[input.dataset.index] = e.target.value * amount;
      resultArr[input.dataset.index][2] = e.target.value;
      let total = totalArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      el("footer > p:nth-child(2)").innerText = "₹" + total;
    }),
);

el("footer").onclick = (e) => {
  let results = "";

  resultArr.forEach((item) => {
    if (item[2] !== 0) {
      results = results + "\n" + item[2] + "," + item[0] + "," + item[1];
    }
  });
  results.slice(1);
  console.log(results.slice(1));
};

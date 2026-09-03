// general helper functions

const log = (x) => console.log(x);
const el = (selector) => document.querySelector(selector);
const elA = (selector) => document.querySelectorAll(selector);

const make = (element) => {
  if (typeof element == "object") {
    const element2 = document.createElement(element.tag);
    element2.id = element.id ?? "";
    element2.className = element.class ?? "";
    element2.innerText = element.text ?? "";
    element2.type = element.type ?? "";
    element2.value = element.value ?? "";
    element2.min = element.min ?? "";

    return element2;
  } else {
    return document.createElement(element);
  }
};

const append = (parent, ...childs) => {
  if (parent == "body") {
    childs.forEach((child) => document.body.appendChild(child));
    return;
  }
  childs.forEach((child) => parent.appendChild(child));
};

// app specific helpers

const findIndex = (uuid, list = localList) =>
  list.findIndex((i) => i.uuid == uuid);

const getTotal = () => resultList.reduce((a, c) => a + c.quantity * c.price, 0);

async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error.message);
  }
}

const displayModal = (type = "loader", log) => {
  const modal = make({ tag: "div", class: "modal" });
  const backdrop = make({ tag: "div", class: "backdrop" });
  const actual = make({ tag: "div", class: "actual" });
  append(modal, backdrop, actual);
  append("body", modal);

  if (type == "loader") {
    actual.className = "actual loader";
  } else if (type == "log") {
    actual.className = "actual log";
    const h2 = make({ tag: "h2", text: "Updated!" });
    const ul = make("ul");
    const ok = make({ tag: "button", text: "OK" });
    append(actual, h2, ul, ok);

    ok.onclick = (e) => {
      actual.style.animation = "downandout 0.3s forwards";
      setTimeout(() => {
        modal.remove();
      }, 300);
    };
    if (log) {
      log.forEach((log) => {
        const li = make({ tag: "li", text: log });
        append(ul, li);
      });
    } else {
      append(ul, make({ tag: "li", text: "but no changes?" }));
    }
  }
};

const logDiff = (l1, l2) => {
  const logArr = [];
  l1.forEach((item) => {
    let itemInSecondArr = l2.find((item2) => item2.uuid == item.uuid);

    if (itemInSecondArr == null) {
      logArr.push("DELETED: " + item.name);
    } else {
      if (itemInSecondArr.price != item.price) {
        logArr.push(
          item.name + ": " + item.price + " > " + itemInSecondArr.price,
        );
      }
      if (itemInSecondArr.name != item.name) {
        logArr.push(item.name + " > " + itemInSecondArr.name);
      }
      if (itemInSecondArr.category != item.category) {
        logArr.push(
          item.name + ": " + item.category + " > " + itemInSecondArr.category,
        );
      }
    }
  });
  l2.forEach((item) => {
    let itemInSecondArr = l1.find((item2) => item2.uuid == item.uuid);

    if (itemInSecondArr == null) {
      logArr.push("ADDED: " + item.name);
    }
  });
  logArr.sort((a, b) => {
    const getPriority = (str) => {
      const category = str.slice(0, 3);

      if (category === "ADD") return 0;
      if (category === "DEL") return 1;
      return 2;
    };

    const categorySort = getPriority(a) - getPriority(b);

    if (categorySort !== 0) return categorySort;

    return a.localeCompare(b);
  });
  if (logArr.length == 0) {
    return ["but no changes?!"];
  } else {
    return logArr;
  }
};

// variable setup

let editingMode = !true;
let localList = JSON.parse(localStorage.getItem("list"));
let resultList;
const codeVersion = 168;
const codeItemList = [
  {
    name: "Milk (1L)",
    uuid: "0dcc381a-0786-4eb5-82cd-655c05afd58a",
    price: 77,
    category: "Regulars",
  },
  {
    name: "Bread",
    uuid: "60ef6a37-9cd2-45c8-90d3-1982b31050eb",
    price: 40,
    category: "Regulars",
  },
  {
    name: "Oats (400g)",
    uuid: "559dfe49-0494-40a6-9873-809a632e53dd",
    price: 86,
    category: "Regulars",
  },
  {
    name: "Raja",
    uuid: "15a1da63-ced8-45cf-9123-4534aa54e96d",
    price: 12,
    category: "Regulars",
  },
  {
    name: "Kwai",
    uuid: "7c4fc8ee-d490-413b-836c-061ccfd01f72",
    price: 10,
    category: "Regulars",
  },
  {
    name: "Rice (1kg)",
    uuid: "317385fa-6665-4e8d-8f51-8ce138e90e0d",
    price: 50,
    category: "Ingredients",
  },
  {
    name: "Rice (30kg)",
    uuid: "f2eb2d6a-bf78-41eb-8e7b-87b5a8c0640d",
    price: 1280,
    category: "Ingredients",
  },
  {
    name: "Sugar",
    uuid: "c6c3959c-ab3c-4656-bbd7-08c3c9e1ef1d",
    price: 65,
    category: "Ingredients",
  },
  {
    name: "Slasha",
    uuid: "c61e1f34-07a8-4ad2-add4-f258825d6c05",
    price: 100,
    category: "Ingredients",
  },
  {
    name: "Potato (1kg)",
    uuid: "d3503dce-beaa-4c6f-a645-9ae9949e0d75",
    price: 20,
    category: "Ingredients",
  },
  {
    name: "Salt",
    uuid: "3e87a622-90bd-4fa1-aea4-e23f5f015f70",
    price: 30,
    category: "Ingredients",
  },
  {
    name: "Onion",
    uuid: "377e787c-e8a9-44de-84a5-ec2ca50e0e80",
    price: 65,
    category: "Ingredients",
  },
  {
    name: "Dal",
    uuid: "c96e3424-15b5-4808-ab5b-c0bcc3263265",
    price: 90,
    category: "Ingredients",
  },
  {
    name: "Oil (0.7L)",
    uuid: "3dccae63-5837-4043-b137-5553768e3fa1",
    price: 145,
    category: "Ingredients",
  },
  {
    name: "Oil (15L)",
    uuid: "5ac2af9d-9b89-4592-963e-fdb9c452e0a4",
    price: 2480,
    category: "Ingredients",
  },
  {
    name: "Black Pepper (25g)",
    uuid: "29d74a03-90f7-4599-82b1-fe63cd6d22b2",
    price: 40,
    category: "Ingredients",
  },
  {
    name: "Lemon",
    uuid: "94a812a9-ca2b-4dab-b1de-b1534348f925",
    price: 20,
    category: "Ingredients",
  },
  {
    name: "Chicken (1kg)",
    uuid: "cfae9c5b-f0e0-4a5a-80f7-148a03c196b0",
    price: 300,
    category: "Ingredients",
  },
  {
    name: "Eggs (Half Tray)",
    uuid: "f0ad689d-0eb5-4592-a175-74109a4d444e",
    price: 105,
    category: "Ingredients",
  },
  {
    name: "Eggs (Full Tray)",
    uuid: "915a4151-8b3f-497f-8eb0-4b56b10acf9e",
    price: 210,
    category: "Ingredients",
  },
  {
    name: "Breadcrumbs (200g)",
    uuid: "e7d72da3-6107-4a26-aa8a-e4054f5e69f0",
    price: 90,
    category: "Ingredients",
  },
  {
    name: "Frozen Chicken Popcorn",
    uuid: "b6a94cb5-3ffb-4113-af66-65ee5c865e53",
    price: 170,
    category: "Ingredients",
  },
  {
    name: "Chaat Masala",
    uuid: "6a3e3aa3-bc4c-4fa6-9fe9-560e47bbfb86",
    price: 10,
    category: "Ingredients",
  },
  {
    name: "Cookies",
    uuid: "7068f34f-34b4-4308-91f3-e5d7fdbeb134",
    price: 60,
    category: "Snacks",
  },
  {
    name: "Coffee",
    uuid: "0490edc5-ca29-4bec-ae0c-4657b736b143",
    price: 10,
    category: "Snacks",
  },
  {
    name: "Jam",
    uuid: "926ce315-b300-4ba2-83c5-8836b7378d91",
    price: 25,
    category: "Snacks",
  },
  {
    name: "Cupcake",
    uuid: "48757424-20cc-4259-8c96-8668c9c4e255",
    price: 35,
    category: "Snacks",
  },
  {
    name: "Lamington",
    uuid: "2cf24aa3-8de3-4b27-86e8-56b287178a2f",
    price: 90,
    category: "Snacks",
  },
  {
    name: "Chips",
    uuid: "e9253b37-cb2b-47fc-9d45-0057dc3c5655",
    price: 10,
    category: "Snacks",
  },
  {
    name: "Ice Cream",
    uuid: "ff0622dc-b79a-4e2e-a79a-67705f2da40c",
    price: 10,
    category: "Snacks",
  },
  {
    name: "Biscuit (S)",
    uuid: "8e44b093-f48e-4c4d-abf2-6e44ded2e2c9",
    price: 10,
    category: "Snacks",
  },
  {
    name: "Biscuit (L)",
    uuid: "e212b2d8-32b5-4d71-a720-1c244cab788b",
    price: 40,
    category: "Snacks",
  },
  {
    name: "Popcorn",
    uuid: "b446baec-ce1a-4684-9694-ef719453a1f5",
    price: 10,
    category: "Snacks",
  },
  {
    name: "Pasta",
    uuid: "7fd34c77-76a4-431b-a1c7-816f58c4f315",
    price: 35,
    category: "Snacks",
  },
  {
    name: "Moisturizer",
    uuid: "0c81f002-837c-4753-9dfb-f185f89f2734",
    price: 0,
    category: "Personal Care",
  },
  {
    name: "Shampoo",
    uuid: "451d66aa-8880-497f-8955-947a71ba33a8",
    price: 0,
    category: "Personal Care",
  },
  {
    name: "Deodorant",
    uuid: "eef7c0bc-e547-4e80-a471-7c362cdf682b",
    price: 125,
    category: "Personal Care",
  },
  {
    name: "Pads",
    uuid: "0828a36d-c6e1-45f4-a0c9-3b4e20b9912f",
    price: 42,
    category: "Personal Care",
  },
  {
    name: "Facewash",
    uuid: "d41660bc-b32b-4ba0-a071-0a5abf2b59be",
    price: 20,
    category: "Personal Care",
  },
  {
    name: "Pears (Normal)",
    uuid: "375e22e7-846d-4d7e-b04a-292c2c9b4293",
    price: 50,
    category: "Personal Care",
  },
  {
    name: "Pears (Small)",
    uuid: "c88c193d-76ab-4eb8-86a3-3f55b5bba900",
    price: 20,
    category: "Personal Care",
  },
  {
    name: "Toothpaste",
    uuid: "df047a76-7156-4a26-9f7a-e62be6a639a8",
    price: 93,
    category: "Personal Care",
  },
  {
    name: "Conditioner",
    uuid: "0f71d3f9-0ae2-42ca-9f8f-509c0b311b1f",
    price: 3,
    category: "Personal Care",
  },
  {
    name: "Wet Wipes (Mee Mee)",
    uuid: "3ff68f40-e92e-49c6-97a0-072826dc371f",
    price: 49,
    category: "Personal Care",
  },
  {
    name: "Green Scrubber large",
    uuid: "579e1e92-a5c6-441a-89b4-157b1ff8c9cd",
    price: 30,
    category: "Others",
  },
  {
    name: "Toilet Paper",
    uuid: "197cfd0e-1153-4f9c-8372-51407ad3df57",
    price: 100,
    category: "Others",
  },
  {
    name: "Surf Excel (1kg)",
    uuid: "52a65465-8af7-40b4-8714-35481025a57c",
    price: 147,
    category: "Others",
  },
  {
    name: "Garbage Bag (Medium)",
    uuid: "558e51a3-f102-4413-894b-50914cb4b11a",
    price: 0,
    category: "Others",
  },
  {
    name: "Garbage Bag (Large)",
    uuid: "98a3dd8d-01d5-4cb4-8b80-5e09d31dee3f",
    price: 150,
    category: "Others",
  },
  {
    name: "Green Scrubber",
    uuid: "cc83aa54-5678-4b98-b303-b067f884e292",
    price: 0,
    category: "Others",
  },
  {
    name: "Dish Soap (4 nos.)",
    uuid: "046883fa-fb19-466f-85c3-121258bbcaf2",
    price: 110,
    category: "Others",
  },
  {
    name: "Cross (500mL)",
    uuid: "c71441a3-c2fc-453b-97cd-c94550932101",
    price: 113,
    category: "Others",
  },
  {
    name: "Bandaid",
    uuid: "a860ddc7-39b7-4527-9231-7eb808d6e700",
    price: 0,
    category: "Others",
  },
  {
    name: "Battery (Thinn)",
    uuid: "63935ce1-2879-46b6-92cf-524725cc80c4",
    price: 30,
    category: "Others",
  },
  {
    name: "Battery (Thicc)",
    uuid: "33a8b78c-d0db-4095-8fd8-a81c6f1338bd",
    price: 25,
    category: "Others",
  },
  {
    name: "Harpic (s)",
    uuid: "04f36fc5-8dfb-435f-95c2-2b639f3d91ab",
    price: 46,
    category: "Others",
  },
  {
    name: "Steelwool",
    uuid: "6dd591a9-e814-4580-b064-caf5d69b12ab",
    price: 25,
    category: "Others",
  },
];
const codeCategories = [
  "Regulars",
  "Ingredients",
  "Snacks",
  "Personal Care",
  "Others",
];

// database code

const supabaseUrl = "https://sjjogtlekbccvupwgxiy.supabase.co";
const supabaseKey = "sb_publishable_EOPuvPJM7Ws2VEiY8vHl_A_hMHFPL1K";
const supabase2 = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadItems() {
  // try {
  //   ({ data, error } = await Promise.race([
  //     supabase2
  //       .from("items_data")
  //       .select("items, version")
  //       .eq("id", 1)
  //       .single(),

  //     new Promise((_, reject) =>
  //       setTimeout(() => reject(new Error("TIMEOUT")), 500),
  //     ),
  //   ]));
  // } catch (e) {
  //   error = e;
  // }
  // if (error) {
  localVersion = +localStorage.getItem("version") ?? codeVersion;
  if (localVersion < codeVersion) {
    localStorage.setItem("list", JSON.stringify(codeItemList));
    localStorage.setItem("version", codeVersion);
    localVersion = codeVersion;
  }
  localList = JSON.parse(localStorage.getItem("list")) ?? codeItemList;
  generateList();
  resultList = [];
  if (localVersion != codeVersion) {
    displayModal("log", logDiff(localVersion, codeVersion));
  }
  // return;
  // }
  // localVersion = +localStorage.getItem("version") ?? codeVersion;
  // localList = JSON.parse(localStorage.getItem("list")) ?? codeItemList;
  // let oldList = [];
  // let changed = false;
  // if (localVersion < +data.version) {
  //   changed = true;
  //   oldList = localList != null ? Array.from(localList) : [];
  //   localList = data.items;
  //   localStorage.setItem("list", JSON.stringify(data.items));
  //   localStorage.setItem("version", data.version);
  //   localVersion = data.version;
  // }
  // generateList();
  // resultArr = [];
  // if (changed & (oldList.length != 0)) {
  //   // displayModal("log", logDiff(oldList, localList));
  // }
}
loadItems();

async function saveItems(items) {
  const { error } = await supabase2
    .from("items_data")
    .update({
      items: items,
      version: ++localVersion,
    })
    .eq("id", 1);

  if (error) {
    alert("ERROR!");
    return;
  }
  localStorage.setItem("list", JSON.stringify(items));
  localStorage.setItem("version", localVersion);
  resultArr = [];
  localList = items;
  generateList();
}
// generate items

function generateList(search = "") {
  const baseElements = 5;
  while (document.body.children.length > baseElements) {
    document.body.children[baseElements].remove();
  }
  let currentCategory = "";

  localList
    .filter((item) => item.name.toLowerCase().startsWith(search))
    .forEach((item) => {
      if (currentCategory != item.category) {
        const h2 = make({ tag: "h2", text: item.category });
        document.body.appendChild(h2);
        currentCategory = item.category;
      }
      if (editingMode) {
        const div = make({ tag: "div", class: "editing-item" });
        div.dataset.uuid = item.uuid;
        const name = make({ tag: "input", value: item.name });
        const price = make({ tag: "input", type: "number", value: item.price });
        const category = make({ tag: "select", value: item.category });
        codeCategories.forEach((category2) => {
          const option = make({ tag: "option", text: category2 });
          append(category, option);
        });
        const sortDiv = make("div");
        const [up, down] = [
          make({ tag: "button", text: "↑" }),
          make({ tag: "button", text: "↓" }),
        ];
        const x = make({ tag: "p", text: "X" });

        append(sortDiv, up, down);
        append(div, sortDiv, name, price, category, x);
        append("body", div);

        up.onclick = () => {
          if (div.previousElementSibling.nodeName == "DIV") {
            div.previousElementSibling.before(div);
          }
        };
        down.onclick = () => {
          if (div.nextElementSibling.nodeName == "DIV") {
            div.nextElementSibling.after(div);
          }
        };
        x.onclick = (e) => {
          let confirmState = confirm("Delete " + name.value + "?");
          if (!confirmState) {
            return;
          }
          div.remove();
        };
      } else {
        // normal mode
        const div = make({ tag: "div", class: "item" });
        const buttonMinus = make({ tag: "button", text: "-" });
        const buttonAdd = make({ tag: "button", text: "+" });
        const input = make({ tag: "input", type: "number", value: 0, min: 0 });
        const h3 = make({ tag: "h3", text: item.name });
        const p = make({ tag: "p", text: "₹" + item.price });

        append(div, buttonMinus, input, buttonAdd, h3, p);
        append("body", div);

        const updateTotal = () => {
          div.style.background = input.value == 0 ? "var(--bg)" : "seagreen";
          let index = findIndex(item.uuid, resultList);
          if (index != -1) {
            resultList[index].quantity = +input.value;
          } else {
            resultList.push({
              uuid: item.uuid,
              name: item.name,
              price: item.price,
              quantity: +input.value,
            });
          }
          el("footer > p:nth-child(2)").innerText = "₹" + getTotal();
        };

        input.onchange = () => {
          updateTotal();
        };
        buttonAdd.onclick = () => {
          input.value = +input.value + 1;
          updateTotal();
        };
        buttonMinus.onclick = () => {
          input.value = input.value == 0 ? input.value : +input.value - 1;
          updateTotal();
        };
      }
    });
}

// search items

const search = el("#search");
search.oninput = () => {
  generateList(search.value);
};

el("header >span").onclick = (e) => {
  e.stopPropagation();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// header menu

let menuState = false;
el("header").onclick = () => {
  el(".menu").style.top = menuState ? "-100%" : "50px";
  menuState = !menuState;
};

// header menu links

elA(".menu > p").forEach((option, index) => {
  option.onclick = () => {
    el("#search").value = "";
    menuState = !menuState;
    option.parentElement.style.top = "-100%";
    if (index == 5) {
      window.scrollTo({ top: 0 });
      editingMode = !editingMode;
      if (!editingMode) {
        let newArr = [];

        elA(".editing-item").forEach((item) => {
          newUUID =
            item.dataset.uuid != null ? item.dataset.uuid : crypto.randomUUID();
          newArr.push({
            name: item.children[1].value,
            price: +item.children[2].value,
            category: item.children[3].value,
            uuid: newUUID,
          });
        });

        newArr.sort((a, b) => {
          const categorySort =
            codeCategories.indexOf(a.category) -
            codeCategories.indexOf(b.category);

          return categorySort;
        });
        el("header").innerHTML = "<span>🔍︎</span><b>GROCERIES</b>";
        option.innerText = "EDIT ITEMS";
        saveItems(newArr);
        generateList();
      } else {
        // const password = prompt("Password?");
        // if (password == "lol") {
        // if (password) {
        if (true) {
          el("header").innerHTML = "<span>🔍︎</span><b>EDITING MODE</b>";
          option.innerText = "SAVE";
          generateList();
        }
      }
    } else {
      window.scrollTo({
        top: elA("h2")[index].getBoundingClientRect().top + window.scrollY - 60,
        behavior: "smooth",
      });
    }
  };
});

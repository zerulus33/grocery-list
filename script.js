const el = (selector) => document.querySelector(selector);
const elA = (selector) => document.querySelectorAll(selector);
const make = (element) => document.createElement(element);

let codeVersion = 1;
let codeLog = [""];
let codeItemList = [
  {
    name: "Bread",
    uuid: "60ef6a37-9cd2-45c8-90d3-1982b31050eb",
    price: 40,
    category: "Regulars",
    quantity: 0,
    sortOrder: 1,
  },
  {
    name: "Milk",
    uuid: "0dcc381a-0786-4eb5-82cd-655c05afd58a",
    price: 77,
    category: "Regulars",
    quantity: 0,
    sortOrder: 2,
  },
  {
    name: "Oats",
    uuid: "559dfe49-0494-40a6-9873-809a632e53dd",
    price: 86,
    category: "Regulars",
    quantity: 0,
    sortOrder: 3,
  },
  {
    name: "Biscuit",
    uuid: "7068f34f-34b4-4308-91f3-e5d7fdbeb134",
    price: 40,
    category: "Regulars",
    quantity: 0,
    sortOrder: 4,
  },
  {
    name: "Kwai",
    uuid: "7c4fc8ee-d490-413b-836c-061ccfd01f72",
    price: 10,
    category: "Regulars",
    quantity: 0,
    sortOrder: 5,
  },
  {
    name: "Raja",
    uuid: "15a1da63-ced8-45cf-9123-4534aa54e96d",
    price: 12,
    category: "Regulars",
    quantity: 0,
    sortOrder: 6,
  },
  {
    name: "Rice (1kg)",
    uuid: "317385fa-6665-4e8d-8f51-8ce138e90e0d",
    price: 50,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 1,
  },
  {
    name: "Rice (30kg)",
    uuid: "f2eb2d6a-bf78-41eb-8e7b-87b5a8c0640d",
    price: 1280,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 2,
  },
  {
    name: "Potato",
    uuid: "d3503dce-beaa-4c6f-a645-9ae9949e0d75",
    price: 20,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 3,
  },
  {
    name: "Onion",
    uuid: "377e787c-e8a9-44de-84a5-ec2ca50e0e80",
    price: 65,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 4,
  },
  {
    name: "Dal",
    uuid: "c96e3424-15b5-4808-ab5b-c0bcc3263265",
    price: 90,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 5,
  },
  {
    name: "Sugar",
    uuid: "c6c3959c-ab3c-4656-bbd7-08c3c9e1ef1d",
    price: 65,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 6,
  },
  {
    name: "Slasha",
    uuid: "c61e1f34-07a8-4ad2-add4-f258825d6c05",
    price: 105,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 7,
  },
  {
    name: "Salt",
    uuid: "3e87a622-90bd-4fa1-aea4-e23f5f015f70",
    price: 30,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 8,
  },
  {
    name: "Oil (0.7L)",
    uuid: "3dccae63-5837-4043-b137-5553768e3fa1",
    price: 145,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 9,
  },
  {
    name: "Black Pepper (20g)",
    uuid: "29d74a03-90f7-4599-82b1-fe63cd6d22b2",
    price: 35,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 10,
  },
  {
    name: "Lemon",
    uuid: "94a812a9-ca2b-4dab-b1de-b1534348f925",
    price: 20,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 11,
  },
  {
    name: "Chicken",
    uuid: "cfae9c5b-f0e0-4a5a-80f7-148a03c196b0",
    price: 300,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 12,
  },
  {
    name: "Eggs (Half Tray)",
    uuid: "f0ad689d-0eb5-4592-a175-74109a4d444e",
    price: 105,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 13,
  },
  {
    name: "Breadcrumbs",
    uuid: "e7d72da3-6107-4a26-aa8a-e4054f5e69f0",
    price: 0,
    category: "Ingredients",
    quantity: 0,
    sortOrder: 14,
  },
  {
    name: "Coffee",
    uuid: "0490edc5-ca29-4bec-ae0c-4657b736b143",
    price: 10,
    category: "Snacks",
    quantity: 0,
    sortOrder: 1,
  },
  {
    name: "Jam",
    uuid: "926ce315-b300-4ba2-83c5-8836b7378d91",
    price: 25,
    category: "Snacks",
    quantity: 0,
    sortOrder: 2,
  },
  {
    name: "Cupcake",
    uuid: "48757424-20cc-4259-8c96-8668c9c4e255",
    price: 35,
    category: "Snacks",
    quantity: 0,
    sortOrder: 3,
  },
  {
    name: "Lamington",
    uuid: "2cf24aa3-8de3-4b27-86e8-56b287178a2f",
    price: 90,
    category: "Snacks",
    quantity: 0,
    sortOrder: 4,
  },
  {
    name: "Chips",
    uuid: "e9253b37-cb2b-47fc-9d45-0057dc3c5655",
    price: 10,
    category: "Snacks",
    quantity: 0,
    sortOrder: 5,
  },
  {
    name: "Ice Cream",
    uuid: "ff0622dc-b79a-4e2e-a79a-67705f2da40c",
    price: 10,
    category: "Snacks",
    quantity: 0,
    sortOrder: 6,
  },
  {
    name: "Moisturizer",
    uuid: "0c81f002-837c-4753-9dfb-f185f89f2734",
    price: 0,
    category: "Personal Care",
    quantity: 0,
    sortOrder: 1,
  },
  {
    name: "Deodorant",
    uuid: "eef7c0bc-e547-4e80-a471-7c362cdf682b",
    price: 125,
    category: "Personal Care",
    quantity: 0,
    sortOrder: 2,
  },
  {
    name: "Pads",
    uuid: "0828a36d-c6e1-45f4-a0c9-3b4e20b9912f",
    price: 42,
    category: "Personal Care",
    quantity: 0,
    sortOrder: 3,
  },
  {
    name: "Facewash",
    uuid: "d41660bc-b32b-4ba0-a071-0a5abf2b59be",
    price: 20,
    category: "Personal Care",
    quantity: 0,
    sortOrder: 4,
  },
  {
    name: "Pears",
    uuid: "375e22e7-846d-4d7e-b04a-292c2c9b4293",
    price: 50,
    category: "Personal Care",
    quantity: 0,
    sortOrder: 5,
  },
  {
    name: "Shampoo",
    uuid: "451d66aa-8880-497f-8955-947a71ba33a8",
    price: 0,
    category: "Personal Care",
    quantity: 0,
    sortOrder: 6,
  },
  {
    name: "Toothpaste",
    uuid: "df047a76-7156-4a26-9f7a-e62be6a639a8",
    price: 100,
    category: "Personal Care",
    quantity: 0,
    sortOrder: 7,
  },
  {
    name: "Conditioner",
    uuid: "0f71d3f9-0ae2-42ca-9f8f-509c0b311b1f",
    price: 3,
    category: "Personal Care",
    quantity: 0,
    sortOrder: 8,
  },
  {
    name: "Toilet Paper",
    uuid: "197cfd0e-1153-4f9c-8372-51407ad3df57",
    price: 100,
    category: "Others",
    quantity: 0,
    sortOrder: 1,
  },
  {
    name: "Garbage Bag (Medium)",
    uuid: "558e51a3-f102-4413-894b-50914cb4b11a",
    price: 0,
    category: "Others",
    quantity: 0,
    sortOrder: 2,
  },
  {
    name: "Garbage Bag (Large)",
    uuid: "98a3dd8d-01d5-4cb4-8b80-5e09d31dee3f",
    price: 0,
    category: "Others",
    quantity: 0,
    sortOrder: 3,
  },
  {
    name: "Green Scrubber",
    uuid: "cc83aa54-5678-4b98-b303-b067f884e292",
    price: 0,
    category: "Others",
    quantity: 0,
    sortOrder: 4,
  },
  {
    name: "Dish Soap (4 nos.)",
    uuid: "046883fa-fb19-466f-85c3-121258bbcaf2",
    price: 110,
    category: "Others",
    quantity: 0,
    sortOrder: 5,
  },
  {
    name: "Cross (500mL)",
    uuid: "c71441a3-c2fc-453b-97cd-c94550932101",
    price: 113,
    category: "Others",
    quantity: 0,
    sortOrder: 6,
  },
  {
    name: "Bandaid",
    uuid: "a860ddc7-39b7-4527-9231-7eb808d6e700",
    price: 0,
    category: "Others",
    quantity: 0,
    sortOrder: 7,
  },
  {
    name: "Battery (Thinn)",
    uuid: "63935ce1-2879-46b6-92cf-524725cc80c4",
    price: 30,
    category: "Others",
    quantity: 0,
    sortOrder: 8,
  },
  {
    name: "Battery (Thicc)",
    uuid: "33a8b78c-d0db-4095-8fd8-a81c6f1338bd",
    price: 25,
    category: "Others",
    quantity: 0,
    sortOrder: 9,
  },
];
const codeCategories = [
  "Regulars",
  "Ingredients",
  "Snacks",
  "Personal Care",
  "Others",
];
let localList;
let localVersion;
let resultArr = [];
let editingMode = false;

const findIndex = (item, cat = false) => {
  if (cat) {
    return localList.findIndex((item2) => item.category == item2.category);
  } else {
    return localList.findIndex((item2) => item.uuid == item2.uuid);
  }
};
const displayModal = (type = "loader", log) => {
  const modal = make("div");
  modal.className = "modal";
  const backdrop = make("div");
  backdrop.className = "backdrop";
  const actual = make("div");
  actual.className = "actual";
  modal.appendChild(backdrop);
  modal.appendChild(actual);
  document.body.appendChild(modal);

  if (type == "loader") {
    actual.className = "actual loader";
  } else if (type == "log") {
    actual.className = "actual log";
    const h2 = make("h2");
    h2.innerText = "Updated!";
    const ul = make("ul");
    const ok = make("button");
    ok.innerText = "OK";

    actual.appendChild(h2);
    actual.appendChild(ul);
    actual.appendChild(ok);

    ok.onclick = (e) => {
      e.target.parentElement.style.animation = "downandout 0.3s forwards";
      setTimeout(() => {
        e.target.parentElement.parentElement.remove();
      }, 300);
    };

    log.forEach((log) => {
      const li = make("li");
      li.innerText = log;
      ul.appendChild(li);
    });
  }
};
displayModal();

// database code

const supabaseUrl = "https://sjjogtlekbccvupwgxiy.supabase.co";
const supabaseKey = "sb_publishable_EOPuvPJM7Ws2VEiY8vHl_A_hMHFPL1K";
const supabase2 = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadItems() {
  try {
    ({ data, error } = await Promise.race([
      supabase2
        .from("items_data")
        .select("items, version, update_log")
        .eq("id", 1)
        .single(),

      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("TIMEOUT")), 3000),
      ),
    ]));
  } catch (e) {
    error = e;
  }
  // if (true) {
  if (error) {
    localVersion = +localStorage.getItem("version");
    if (localVersion < codeVersion) {
      localStorage.setItem("list", codeItemList);
      localStorage.setItem("version", codeVersion);
      localVersion = codeVersion;
    }
    localList = JSON.parse(localStorage.getItem("list"));
    generateList();
    resultArr = Array.from(localList);
    if (localVersion != codeVersion) {
      displayModal("log", codeLog);
    }
    return;
  }
  localVersion = +localStorage.getItem("version");
  localList = JSON.parse(localStorage.getItem("list"));
  let oldList = [];
  let changed = false;
  if (localVersion < +data.version) {
    changed = true;
    oldList = Array.from(localList);
    localList = data.items;
    localStorage.setItem("list", JSON.stringify(data.items));
    localStorage.setItem("version", data.version);
    localVersion = data.version;
  }
  generateList();
  resultArr = Array.from(localList);
  if (changed) {
    displayModal("log", logDiff(oldList, localList));
  }
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
  }
  localStorage.setItem("list", JSON.stringify(localList));
  localStorage.setItem("version", localVersion);
}

const getTotal = () => {
  return resultArr.reduce((a, c) => a + +c.price * c.quantity, 0);
};
const getCategories = () => {
  let categoriesArray = [];
  localList.reduce((a, c) => {
    if (a != c.category) {
      categoriesArray.push(c.category);
    }
    return c.category;
  }, 0);
  return categoriesArray;
};
function generateList() {
  while (document.body.children.length > 4) {
    document.body.children[4].remove();
  }
  let currentCategory = "";
  if (!editingMode) {
    localList.forEach((item, index) => {
      if (currentCategory != item.category) {
        const h2 = make("h2");
        document.body.appendChild(h2);
        h2.innerText = item.category;
        currentCategory = item.category;
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
      div.className = "item";
      div.appendChild(buttonMinus);
      div.appendChild(input);
      div.appendChild(buttonAdd);
      div.appendChild(h3);
      div.appendChild(p);
      h3.innerText = item.name;
      p.innerText = "₹" + item.price;
      document.body.appendChild(div);

      const updateTotal = () => {
        div.style.background = input.value == 0 ? "var(--bg)" : "seagreen";
        resultArr[findIndex(item)].quantity = +input.value;
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
    });
  } else {
    localList.forEach((item, index) => {
      if (currentCategory != item.category) {
        const h2 = make("h2");
        document.body.appendChild(h2);
        h2.innerText = item.category;
        currentCategory = item.category;
      }
      const div = make("div");
      div.className = "editing-item";
      div.dataset.uuid = item.uuid;
      const name = make("input");
      name.value = item.name;
      const price = make("input");
      price.type = "number";
      const category = make("select");
      codeCategories.forEach((cat) => {
        const option = make("option");
        option.innerText = cat;
        category.appendChild(option);
      });
      category.value = item.category;
      let changed = false;
      const sortDiv = make("div");
      sortDiv.className = "sort-div";
      const [up, down] = [make("button"), make("button")];
      up.innerText = "↑";
      down.innerText = "↓";
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
      sortDiv.appendChild(up);
      sortDiv.appendChild(down);
      div.appendChild(sortDiv);
      div.appendChild(name);
      div.appendChild(price);
      div.appendChild(category);
      name.onchange = () => {
        localList[findIndex(item)].name = name.value;
      };
      price.value = item.price;
      price.className = "price-input";
      price.onchange = () => {
        localList[findIndex(item)].price = +price.value;
      };
      category.onchange = () => {
        localList[findIndex(item)].category = category.value;
      };
      const x = make("p");
      x.innerText = "X";
      x.onclick = (e) => {
        let confirmState = confirm("Delete " + name.value + "?");
        if (!confirmState) {
          return;
        }
        div.remove();
        localList.splice(findIndex(item), 1);
      };
      div.appendChild(x);
      document.body.appendChild(div);
    });
  }
}

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
    if (item.quantity != 0) {
      if (count == 0) {
        count++;
        results1 = "- *" + item.name + " x " + item.quantity + "*";
        const ddMMyyyy = new Date()
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-");
        results2 =
          "k," +
          ddMMyyyy +
          "," +
          item.name +
          "," +
          item.price +
          "," +
          item.quantity;
      } else {
        results1 =
          results1 + "\n" + "- *" + item.name + " x " + item.quantity + "*";
        results2 =
          results2 +
          "\nk,," +
          item.name +
          "," +
          item.price +
          "," +
          item.quantity;
      }
    }
  });
  if (elA(".extra").length != 0 && el(".extra > input").value != "") {
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
      getTotal() +
      "*\n" +
      "-------------------------" +
      "\n" +
      results2 +
      "\n-------------------------";

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
    menuState = !menuState;
    option.parentElement.style.top = "-100%";
    if (index == 5) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      editingMode = !editingMode;
      if (!editingMode) {
        elA(".price-input").forEach((input) => (input.disabled = true));
        el("header").innerHTML = "<b>GROCERIES</b>";
        option.innerText = "EDIT ITEMS";

        codeCategories.forEach((cat) => {
          let count = 1;
          elA(".editing-item").forEach((item, index) => {
            if (item.children[3].value == cat) {
              localList[findIndex({ uuid: item.dataset.uuid })].sortOrder =
                count;
              count++;
            }
          });
          count = 1;
          elA(".extra-editing-item").forEach((item, index) => {
            const category = item.children[2].value;
            if (category == cat) {
              const currentCount = localList.reduce((a, c) => {
                if (c.category == category) {
                  return a + 1;
                }
                return a;
              }, 0);
              const name = item.children[0].value;
              const price = +item.children[1].value;
              if ((name != "") & (price > 0)) {
                let array = {
                  name: name,
                  quantity: 0,
                  price: price,
                  category: category,
                  uuid: crypto.randomUUID(),
                  sortOrder: currentCount + count,
                };
                localList.push(array);
              }
            }
          });
        });
        localList.sort((a, b) => {
          const categorySort =
            codeCategories.indexOf(a.category) -
            codeCategories.indexOf(b.category);
          if (categorySort !== 0) return categorySort;
          return a.sortOrder - b.sortOrder;
        });
        saveItems(localList);
        generateList();
      } else {
        const password = prompt("Password?");
        if (password == "lol") {
          // if (password) {
          // if (true) {
          el("header").innerHTML = "<b>EDITING MODE</b>";
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

el("p#add").onclick = () => {
  if ((elA(".extra").length == 0) & (elA(".extra-editing-item").length == 0)) {
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
  const category = make("select");
  codeCategories.forEach((cat) => {
    const option = make("option");
    option.innerText = cat;
    category.appendChild(option);
  });
  const x = make("p");
  x.innerText = "X";
  x.onclick = (e) => {
    let confirmState =
      textInput.value == "" ? true : confirm("Delete " + textInput.value + "?");
    if (!confirmState) {
      return;
    }
    if (elA(".extra").length == 1 || elA(".extra-editing-item").length == 1) {
      el("h2:nth-last-of-type(1)").remove();
    }
    extra.remove();
  };
  extra.appendChild(textInput);
  if (!editingMode) {
    extra.appendChild(document.createTextNode("x"));
  }
  extra.appendChild(numInput);
  if (editingMode) {
    extra.appendChild(category);
    extra.className = "editing-item extra-editing-item";
  }
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
  console.log(logArr);
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
  return logArr;
};

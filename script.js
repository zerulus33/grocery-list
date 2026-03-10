const defaultItems = [
  { name: "Battery (Thicc AA)", unit: "nos.", price: 22 },
  { name: "Battery (Thin AAA)", unit: "nos.", price: 22 },
  { name: "Biscuit", unit: "pack", price: 30 },
  { name: "Bread", unit: "loaf", price: 35 },
  { name: "Butter", unit: "pack of 100g", price: 47 },
  { name: "Coffee", unit: "pack", price: 10 },
  { name: "Cross", unit: "bottle of 500ml", price: 65 },
  { name: "Dal", unit: "bag of 1 kg / 500g", price: 100 },
  { name: "Deodarant", unit: "pack of 125ml", price: 125 },
  { name: "Eggs", unit: "tray of 15 nos. / 30 nos.", price: 8 },
  { name: "Face Wash", unit: "pack", price: 20 },
  { name: "Ginger Bah", unit: "bag of 100 gm / 250g / 500g", price: 0 },
  { name: "Ginger Makhir", unit: "bag of 100 gm / 250g / 500g", price: 0 },
  { name: "Kwai", unit: "pack", price: 10 },
  { name: "Raja", unit: "pack", price: 15 },
  { name: "Milk", unit: "pack of 500 ml / 1 L", price: "39 / 75" },
  { name: "Moisturizer", unit: "pack of 100ml / 200 ml", price: "0 / 245" },
  { name: "Oats", unit: "pack of 400g", price: 100 },
  {
    name: "Oil",
    unit: "bottle / bottle / tin of 500 ml / 1 L / 15L",
    price: "0 / 0 / 1000",
  },
  { name: "Onion", unit: "bag of 500g / 1 kg", price: 0 },
  { name: "Potato", unit: "bag of 500g / 1 kg", price: 20 },
  { name: "Rice", unit: "bag / sack of 1 kg / 30 kg", price: 1280 },
  { name: "Salt", unit: "pack", price: 30 },
  { name: "Shampoo", unit: "pack", price: 185 },
  { name: "Slasha", unit: "pack of 250g", price: 105 },
  { name: "Soap (HD)", unit: "pack of 4 nos.", price: 110 },
  { name: "Soap (Pears)", unit: "pack", price: 57 },
  { name: "Steelwool", unit: "pack", price: 30 },
  { name: "Sugar", unit: "bag of 1 kg", price: 55 },
  { name: "Surf Excel", unit: "pack of 1 kg", price: 140 },
  { name: "Toilet Paper", unit: "pack of 6 nos. / 10 nos.", price: 100 },
  { name: "Toothpaste", unit: "pack", price: 100 },
  { name: "Turmeric", unit: "pack of 50g", price: 50 },
];

document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("grocery-list");
  const template = document.getElementById("row-template");

  // Setup initial items
  defaultItems.forEach((itemInfo) => {
    addItemToDOM(itemInfo.name, itemInfo.unit, itemInfo.price);
  });

  // Add Item Form
  const addItemForm = document.getElementById("add-item-form");
  addItemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("new-item-name");
    const itemName = input.value.trim();
    if (itemName) {
      addItemToDOM(itemName, "nos.", 0);
      input.value = "";
      // scroll to the new item
      listContainer.lastElementChild.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });

  // Generate Button
  const generateBtn = document.getElementById("generate-btn");
  generateBtn.addEventListener("click", generateOutput);

  // Copy Button
  const copyBtn = document.getElementById("copy-btn");
  copyBtn.addEventListener("click", () => {
    const outputText = document.getElementById("output-text").innerText;
    navigator.clipboard
      .writeText(outputText)
      .then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied!";
        copyBtn.style.backgroundColor = "var(--success)";
        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.style.backgroundColor = "";
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text to clipboard.");
      });
  });

  // Scroll to Bottom FAB functionality
  const scrollBtn = document.getElementById("scroll-bottom-btn");

  const toggleScrollBtn = () => {
    // Show button if we can scroll down more than 200px
    const scrollBottom =
      document.documentElement.scrollHeight -
      window.innerHeight -
      window.scrollY;
    if (scrollBottom > 200) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  };

  // Initial check
  setTimeout(toggleScrollBtn, 500);

  window.addEventListener("scroll", toggleScrollBtn, { passive: true });
  window.addEventListener("resize", toggleScrollBtn, { passive: true });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });

  function addItemToDOM(name, defaultUnitStr = "nos.", defaultPrice = 0) {
    const clone = template.content.cloneNode(true);
    const row = clone.querySelector(".list-row");

    // Element references
    const nameEl = clone.querySelector(".item-name");
    const checkbox = clone.querySelector(".item-checkbox");
    const currQtyInput = clone.querySelector(".item-curr-qty");
    const qtyInput = clone.querySelector(".item-qty");
    const unitSelect = clone.querySelector(".item-unit");
    const unitCustom = clone.querySelector(".item-unit-custom");
    const priceInput = clone.querySelector(".item-price");
    const totalEl = clone.querySelector(".item-total");

    nameEl.textContent = name;

    // Populate unit dropdown
    if (defaultUnitStr) {
      const units = defaultUnitStr.split(" / ").map((u) => u.trim());
      const prices = String(defaultPrice)
        .split(" / ")
        .map((p) => parseFloat(p.trim()) || 0);

      // clear default unit options except standard custom
      unitSelect.innerHTML = "";
      units.forEach((unit, index) => {
        const opt = document.createElement("option");
        opt.value = unit;
        opt.textContent = unit;
        // Store price in dataset
        opt.dataset.price =
          prices[index] !== undefined ? prices[index] : prices[0];
        unitSelect.appendChild(opt);
      });
      const customOpt = document.createElement("option");
      customOpt.value = "custom";
      customOpt.textContent = "custom";
      unitSelect.appendChild(customOpt);

      // preselect the first unit
      unitSelect.value = units[0];

      // preselect the first price
      priceInput.value = prices[0];
    } else {
      priceInput.value = defaultPrice;
    }

    // Add collapsed class initially on mobile
    if (window.innerWidth <= 640) {
      row.classList.add("collapsed");
    }

    // Toggle state based on checkbox
    checkbox.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      currQtyInput.disabled = !isChecked;
      qtyInput.disabled = !isChecked;
      unitSelect.disabled = !isChecked;
      if (unitSelect.value === "custom") {
        unitCustom.disabled = !isChecked;
      } else {
        unitCustom.disabled = true;
      }
      priceInput.disabled = !isChecked;

      if (isChecked) {
        row.classList.add("active");
        row.classList.remove("collapsed"); // Expand when checked
        if (!qtyInput.value) qtyInput.value = 1; // Default qty when checked
      } else {
        row.classList.remove("active");
        if (window.innerWidth <= 640) {
          row.classList.add("collapsed"); // Collapse when unchecked on mobile
        }
      }
      calculateTotal();
    });

    // Toggle custom unit input & price automatically
    unitSelect.addEventListener("change", (e) => {
      const selectedOpt = e.target.options[e.target.selectedIndex];
      if (e.target.value === "custom") {
        unitCustom.style.display = "block";
        if (!unitSelect.disabled) unitCustom.disabled = false;
        unitCustom.focus();
      } else {
        unitCustom.style.display = "none";
        unitCustom.disabled = true;

        // Update price automatically based on selected unit
        if (selectedOpt.dataset.price !== undefined) {
          priceInput.value = selectedOpt.dataset.price;
          calculateTotal();
        }
      }
    });

    // Real-time calculation
    const calculateTotal = () => {
      const qty = parseFloat(qtyInput.value) || 0;
      const price = parseFloat(priceInput.value) || 0;
      const total = qty * price;
      totalEl.textContent = total.toFixed(2);
    };

    qtyInput.addEventListener("input", calculateTotal);
    priceInput.addEventListener("input", calculateTotal);

    listContainer.appendChild(clone);
  }

  function generateOutput() {
    const rows = document.querySelectorAll(".list-row");
    let textLines = [];
    let codeItems = [];

    rows.forEach((row) => {
      const checkbox = row.querySelector(".item-checkbox");
      if (checkbox.checked) {
        const name = row.querySelector(".item-name").textContent;
        const currQty = row.querySelector(".item-curr-qty").value || "0";
        const reqQty = row.querySelector(".item-qty").value || "1"; // Default to 1 if empty

        const unitSelect = row.querySelector(".item-unit");
        let unit = unitSelect.value;
        if (unit === "custom") {
          unit = row.querySelector(".item-unit-custom").value || "units";
        }

        const price = row.querySelector(".item-price").value || "0";
        const total = row.querySelector(".item-total").textContent;

        // Format text output
        textLines.push(`${reqQty + " " + unit} ${name}\t (${currQty} left)`);

        // Format code output
        // format: item,currQty,reqQty,unit,price,total;
        codeItems.push(
          `${name},${currQty},${reqQty},${unit},${price},${total}`,
        );
      }
    });

    if (textLines.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    const formattedOutput = `\`\`\`\n${textLines.join("\n")}\n\`\`\``;

    const outputSection = document.getElementById("output-section");
    const outputText = document.getElementById("output-text");

    outputText.textContent = formattedOutput;
    outputSection.style.display = "block";
    outputSection.scrollIntoView({ behavior: "smooth" });
  }
});

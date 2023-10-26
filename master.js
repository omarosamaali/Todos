let title = document.getElementById("title");
let submit = document.getElementById("submit");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let prioritySelect = document.getElementById("priority-select");
let dataPro;
const icon = document.querySelector(".fa-solid");
icon.addEventListener("click", sortElements);

function sortElements() {
  const tbody = document.getElementById("tbody");
  const rows = Array.from(tbody.getElementsByTagName("tr"));
  rows.sort((a, b) => {
    const priorityA = getPriorityValue(a);
    const priorityB = getPriorityValue(b);
    if (priorityA < priorityB) {
      return -1;
    } else if (priorityA > priorityB) {
      return 1;
    } else {
      return 0;
    }
  });
  tbody.innerHTML = "";
  rows.forEach((row) => {
    tbody.appendChild(row);
  });
}
function getPriorityValue(row) {
  const priorityCell = row.querySelector("td:nth-child(3)");
  const priority = priorityCell.textContent.trim().toLowerCase();
  if (priority === "high") {
    return 0;
  } else if (priority === "medium") {
    return 1;
  } else if (priority === "low") {
    return 2;
  } else {
    return 3;
  }
}
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = createProduct;
function createProduct() {
  let newPro = {
    title: title.value.toLowerCase(),
    priority: prioritySelect.value, // Update the priority value
  };
  if (title.value != "") {
    dataPro.push(newPro);
    localStorage.setItem("product", JSON.stringify(dataPro));
    showData();
    hideErrorMessage();
  }
  title.value = "";
}

searchButton.onclick = function () {
  let searchTerm = searchInput.value.toLowerCase();
  let filteredData = dataPro.filter(function (item) {
    return item.title.includes(searchTerm);
  });
  showData(filteredData);
};
window.onload = function () {
  showData();
};
function showData(data = dataPro) {
  let table = "";
  let errorMessage = document.getElementById("error-message");
  if (data.length === 0) {
    // تحقق من طول data بدلاً من dataPro
    errorMessage.textContent =
      "Todo Text Must Not Be Empty, You Should Select Priority";
    errorMessage.style.display = "block";
    document.getElementById("tbody").innerHTML = "";
    return;
  }
  errorMessage.textContent = "";
  for (let i = 0; i < data.length; i++) {
    table += `<tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].priority}</td>
        <td><button class="edit-button" onclick="updateData(${i})" id="update">Edit</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Remove</button></td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
}
function hideErrorMessage() {
  let errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "none";
}
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
function updateData(i) {
  title.value = dataPro[i].title;
  prioritySelect.value = dataPro[i].priority;
  submit.innerHTML = "Edit";
  submit.onclick = function () {
    let updatedPro = {
      title: title.value.toLowerCase(),
      priority: prioritySelect.value, // Update the priority value
    };
    if (title.value != "") {
      dataPro[i] = updatedPro;
      localStorage.setItem("product", JSON.stringify(dataPro));
      showData();
    }
    title.value = "";
    submit.innerHTML = "Create";
    submit.onclick = createProduct;
  };
}

const translation = {
  en: {
    hello: "Hello",
    note: "Notes By Omar Osama",
    create: "Create",
    search: "Search",
    name: "Name",
    update: "Update",
    delete: "Delete",
    id: "ID",
    priority: "Priority",
  },
  ar: {
    hello: "مرحبا",
    note: "ملاحظات عمر أسامة",
    create: "انشاء",
    search: "ابحث",
    name: "الاٍسم",
    update: "تحديث",
    delete: "حذف",
    id: "الرقم المعرف",
    priority: "أولوية",
  },
};
const languageButtons = document.querySelectorAll(".lang-button");
languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.getAttribute("data-lang");
    setLanguage(language);
  });
});

function setLanguage(language) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const translationKey = element.getAttribute("data-i18n");
    element.textContent = translation[language][translationKey];
  });
}

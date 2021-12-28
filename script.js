var input = document.querySelector("input");
var btnAdd = document.getElementById("button-add");
var btnGenerate = document.getElementById("button-generate");
var cancel = document.getElementById("cancel");
const inputName = document.getElementById('input-name');
const inputWeight = document.getElementById('ageInputId');
const inputUrl = document.getElementById("input-url");
const change = document.getElementById("change");
var listGroup = document.querySelector(".list-group");
var slider = document.querySelector(".slider");
var generatedList = document.querySelector(".generatedList");
var elemans = JSON.parse(localStorage.getItem("todo-list"));
var modal = document.getElementById("modal");

let editMode = false;
let currentRecord = undefined;
var save = document.getElementById("save");

btnAdd.onclick = function () {
    modal.style.display = "block";
}

function initList() {
    if (!elemans) {
        elemans = [];
    }
    elemans.forEach(eleman => createListElement(eleman.name, eleman.weight, eleman.url, eleman.id));
}
initList();

save.addEventListener("click", () => {
    if (inputName.value) {
        if (!editMode) {
            const id = new Date().getTime();
            createListElement(inputName.value, inputWeight.value, inputUrl.value, id);
            elemans.push({
                name: inputName.value,
                weight: inputWeight.value,
                url: inputUrl.value,
                id
            });
        } else {
            currentRecord.children[0].innerHTML = inputName.value;
            currentRecord.children[1].innerHTML = inputWeight.value;
            currentRecord.children[2].src = inputUrl.value;

            const foundItem = elemans.find(e => e.id == currentRecord.children[2].id);
            foundItem.name = inputName.value;
            foundItem.weight = inputWeight.value;
            foundItem.url = inputUrl.value;

            currentRecord = undefined;
        }
        localStorage.setItem("todo-list", JSON.stringify(elemans));
    }
    inputName.value = '';
    inputWeight.value = 0;
    inputUrl.value = '';
    modal.style.display = "none";

});

const initAction = () => {
    listGroup.addEventListener("click", (e) => action(e));
};
initAction();



function action(e) {
    if (e.target.id == "button-delete") {
        elemans = elemans.filter((eleman) => e.target.parentElement.children[3].id != eleman.id);
        localStorage.setItem("todo-list", JSON.stringify(elemans));
        e.target.parentElement.remove();
    } else if (e.target.id == "button-edit") {
        modal.style.display = "block";
        editMode = true;
        currentRecord = e.target.parentElement;
        inputName.value = currentRecord.children[0].innerText;
        inputWeight.value = currentRecord.children[1].innerText;
        inputUrl.value = currentRecord.children[2].src;
    }
};

function createListElement(text, weightData, url, id) {
    if (!text) return;

    const newElement = document.createElement("li");
    newElement.className = "list-group-item d-flex justify-content-between";

    const span = document.createElement("span");
    span.innerText = text;

    const weight = document.createElement('span');
    weight.innerText = "Weight : " + weightData;

    const urlImage = document.createElement('input');
    urlImage.src = url;
    urlImage.type = "image"
    urlImage.style.display = "none"

    const idLabel = document.createElement('span');
    idLabel.id = id;
    idLabel.className = 'idLabel';
    idLabel.style.display = 'none';

    const btnDelete = document.createElement("button");
    const btnEdit = document.createElement("button");

    btnEdit.className = "btn btn-outline-secondary";
    btnEdit.id = "button-edit";
    btnEdit.innerText = "Düzenle";

    btnDelete.className = "btn btn-outline-danger";
    btnDelete.id = "button-delete";
    btnDelete.innerText = "Sil";

    newElement.appendChild(span);
    newElement.appendChild(weight);
    newElement.appendChild(urlImage);
    newElement.appendChild(idLabel);
    newElement.appendChild(btnDelete);
    newElement.appendChild(btnEdit);

    listGroup.appendChild(newElement);
};

cancel.onclick = function () {
    modal.style.display = "none";
    inputName.value = '';
    inputWeight.value = 0;
    inputUrl.value = '';
}


let totalWeight = 0;
for (let j = 0; j < elemans.length; j++) {
    totalWeight += Number(elemans[j].weight)
}
const newList = []
for (let i = 0; i < elemans.length; i++) {
    let weightMedias = Number(elemans[i].weight) / Number(totalWeight);
    // console.log(elemans[i])
    elemans[i].percentWeight = weightMedias;
    newList.push(elemans[i])
}
// console.log(newList)

slider.style.display = "none"

btnGenerate.addEventListener("click", () => {
    var pool = Number(prompt("Kaç havuzluk liste oluşsun?"))

    let kacDefa = 0;
    let toplam = 0;
    let arr = [];
    for (let i = 0; i < elemans.length; i++) {
        kacDefa = pool * elemans[i].percentWeight
        // console.log(kacDefa)
        // console.log(elemans[i].name, -Math.round(-kacDefa))
        toplam += -Math.round(-kacDefa);
        arr.push({
            name: elemans[i].name,
            url: elemans[i].url,
            counter: -Math.round(-kacDefa)
        })
    }
    // console.log(toplam)
    // console.log(arr)
    let arr2 = [];
    var urls;
    if (toplam !== pool) {
        document.write("ERROR : Bir liste oluşamaz.");
    } else {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].counter; j++) {
                //console.log(arr[i].name)
                arr2.push({
                    name: arr[i].name,
                    url: arr[i].url
                })
            }
        }
        //console.log(arr2)
        let arrName = []
        let arrUrl = []
        for (let i = 0; i < arr2.length; i++) {
            arrName.push(arr2[i].name)
            arrUrl.push(arr2[i].url)
        }
        // console.log(arrName)
        // console.log(arrUrl)
        function spread(input) {
            function findMaxKey() {
                var max = 0, key;
                Object.keys(length).forEach(function (k) {
                    if (length[k] > max) {
                        max = length[k];
                        key = k;
                    }
                });
                return key;
            }
            var length = input.reduce(function (r, a) {
                r[a] = (r[a] || 0) + 1;
                return r;
            }, {}),
                i = 0, k = findMaxKey(), l,
                outputLength = length[k],
                output = Array.apply(Array, { length: outputLength }).map(function () { return []; });

            if (input.length - outputLength < outputLength - 1) {
                document.write("ERROR : Bir liste oluşamaz.a");
            }
            while (k = findMaxKey()) {
                l = length[k];
                while (l--) {
                    output[i % outputLength].push(k);
                    i++;
                }
                delete length[k];
            }
            return output.reduce(function (r, a) { return r.concat(a) }, []);
        }
        var x = spread(arrName);
        for (var i = 0; i < x.length; i++) {
            var item = document.createElement('li');
            item.appendChild(document.createTextNode(x[i]));
            generatedList.appendChild(item);
        }

        urls = spread(arrUrl)
    }
    var index = 0;
    var slaytCount = urls.length;

    showSlide(index);

    document.querySelector('.fa-arrow-circle-left').addEventListener('click', function () {
        index--;
        showSlide(index);
    });

    document.querySelector('.fa-arrow-circle-right').addEventListener('click', function () {
        index++;
        showSlide(index);
    });

    function showSlide(i) {
        index = i;
        if (i < 0) {
            index = slaytCount - 1;
        }
        if (i >= slaytCount) {
            index = 0;
        }
        document.querySelector('.card-img-top').setAttribute('src', urls[index]);
    }
    const btnCarousel = document.createElement("button")
    const btnList = document.createElement("button")
    btnCarousel.innerText = "Carousel Görünümü"
    btnList.innerText = "Liste Görünümü"
    change.appendChild(btnCarousel)
    change.appendChild(btnList)
    btnList.style.display = "none"
    btnCarousel.addEventListener("click", () => {
        slider.style.display = "block"
        generatedList.style.display = "none"
        btnCarousel.style.display = "none"
        btnList.style.display = "block"
    })
    btnList.addEventListener("click", () => {
        slider.style.display = "none"
        generatedList.style.display = "block"
        btnList.style.display = "none"
        btnCarousel.style.display = "block"
    })
    listGroup.style.display = "none"
})

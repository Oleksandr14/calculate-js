// Елементи форми

const refs = {
    squareInput: document.querySelector('#square-input'),
    squareRange: document.querySelector('#square-range'),
    totalPriceElement: document.querySelector('#total-price'),
    inputs: document.querySelectorAll('input'),

    //Радіокнопки
    radioType: document.querySelectorAll('input[name="type"]'),
    radioBuilding: document.querySelectorAll('input[name="building"]'),
    radioRooms: document.querySelectorAll('input[name="rooms"]'),

    //Чекбокси
    ceilings: document.querySelector('input[name="ceiling"]'),
    walls: document.querySelector('input[name="walls"]'),
    floor: document.querySelector('input[name="floor"]'),
};

const { squareInput, squareRange, totalPriceElement, inputs, radioType, radioBuilding, radioRooms, ceilings, walls, floor } = refs;

// Базова ціна

const BASE_PRICE = 6000;

// Зв'язуємо range з текстовим полем
// Слухаєм подію інпут

squareRange.addEventListener('input', () => {
    squareInput.value = squareRange.value;
});

// Зв'язуємо текстове поле з range
// Слухаєм подію інпут

squareInput.addEventListener('input', () => {
    squareRange.value = squareInput.value;
});

// Перебираю всі інпути і додаю слухача

for (const input of inputs) {

    input.addEventListener('input', () => {
        calculate();
    })
};

// Функція перерахунку вартості ремонту в залежності від вибраних параметрів

function calculate() {
    let totalPrice = BASE_PRICE * parseFloat(squareInput.value);
    
    for (const radio of radioType) {
        if (radio.checked) totalPrice *=  parseFloat(radio.value);
    }

    for (const radio of radioBuilding) {
        if (radio.checked) totalPrice *= parseFloat(radio.value);
    }

    for (const radio of radioRooms) {
        if (radio.checked) totalPrice *= parseFloat(radio.value);
    }
    
    if (ceilings.checked) totalPrice += parseFloat(ceilings.value) * parseFloat(squareInput.value); // якщо стеля рахується за м2
    if (walls.checked) totalPrice += parseFloat(walls.value) * parseFloat(squareInput.value); // якщо стеля рахується за м2
    if (floor.checked) totalPrice += parseFloat(floor.value) * parseFloat(squareInput.value); // якщо стеля рахується за м2

    const formatter = new Intl.NumberFormat('ua');
    totalPriceElement.innerText = formatter.format(totalPrice);
};

calculate();

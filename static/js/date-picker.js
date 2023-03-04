function calendar(current = new Date()) {
    const days = []
    let day = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
    const lastDays = 32 - new Date(current.getFullYear(), current.getMonth() - 1, 32).getDate();
    const daysInMoth = 32 - new Date(current.getFullYear(), current.getMonth(), 32).getDate();
    const lastDay = new Date(current.getFullYear(), current.getMonth(), daysInMoth).getDay();
    if (day === 0) {
        day = 7;
    }
    let dayLoop = 0;
    let week = [];
    for (let i = 1; i <= day - 1; i++) {
        week.push({current: false, value: lastDays - (day - 1) + i});
        dayLoop++
        if (dayLoop === 7) {
            dayLoop = 0;
            days.push(week);
            week = [];
        }
    }

    for (let i = 1; i <= daysInMoth; i++) {
        week.push({current: true, value: i});
        dayLoop++
        if (dayLoop === 7) {
            dayLoop = 0;
            days.push(week);
            week = [];
        }
    }

    for (let i = 1; i <= 7 - lastDay; i++) {
        week.push({current: false, value: i});
        dayLoop++
        if (dayLoop === 7) {
            dayLoop = 0;
            days.push(week);
            week = [];
        }
    }
    return {calendar: days, date: current};
}

let selectedDateValue;

function createCalendar(container, cb = function(value = new Date()){}, options = {
    inputName: "date",
    min: 1,
    max: 11111111111111,
    inputClass: ["customInput"],
    placeholder: "custom date picker",
    current: new Date(),
    changed: false
}) {
    const months = [
        "янв", "фев", "мар", "апр", "май", "июн",
        "июл", "авг", "сен", "окт", "ноя", "дек"
    ]
    if (!container) {
        throw new Error("Container not found!");
    }
    container.innerHTML = "";
    container.setAttribute("tabindex", "0");
    if (!container.classList.contains("date-picker-container")) {
        container.classList.add("date-picker-container", "click");
    }
    const input = document.createElement("input");
    input.value = selectedDateValue?.getTime() || "";
    input.setAttribute("type", "hidden");
    input.setAttribute("name", options.inputName);
    container.appendChild(input);
    const span = document.createElement("span");
    options.inputClass.map(value => {
        span.classList.add(value);
    });
    span.classList.add("value-text", "click");
    span.innerHTML = selectedDateValue ? `${selectedDateValue.getDate()} ${months[selectedDateValue.getMonth()]} ${selectedDateValue.getFullYear()}` : options.placeholder;
    container.appendChild(span);
    // createCalendars------------------------------------
    const d = options.current;
    const pickerContainer = document.createElement("div");

    const datesContainer = document.createElement("div");

    const table = document.createElement("table");
    const yearContainer = document.createElement("div");
    const monthContainer = document.createElement("div");

    const prevYear = document.createElement("button");
    const nextYear = document.createElement("button");
    const yearText = document.createElement("span");

    const prevMonth = document.createElement("button");
    const nextMonth = document.createElement("button");
    const monthText = document.createElement("span");



    const head = document.createElement("thead");
    const body = document.createElement("tbody");
    const tr = document.createElement("tr");

    head.classList.add("click");
    body.classList.add("click");

    monthContainer.classList.add("month-container", "click");
    prevMonth.classList.add("picker-icon", "prev-month", "click");
    prevMonth.innerHTML = '<img src="/images/chevron-left.svg" class="picker-icon-img click">';
    monthContainer.appendChild(prevMonth);
    monthText.innerHTML = `${months[d.getMonth()]}`;
    monthText.classList.add("picker-month-txt", "click");
    nextMonth.classList.add("picker-icon", "next-month", "click");
    nextMonth.innerHTML = '<img src="/images/chevron-right.svg" class="picker-icon-img click">';
    monthContainer.appendChild(monthText);
    monthContainer.appendChild(nextMonth);


    yearContainer.classList.add("year-container", "click");
    prevYear.classList.add("picker-icon", "prev-year", "click");
    prevYear.innerHTML = '<img src="/images/chevron-left.svg" class="picker-icon-img click">';
    yearContainer.appendChild(prevYear);
    yearText.innerHTML = `${d.getFullYear()}`;
    yearText.classList.add("picker-year-txt", "click");
    nextYear.classList.add("picker-icon", "next-year", "click");
    nextYear.innerHTML = '<img src="/images/chevron-right.svg" class="picker-icon-img click">';
    yearContainer.appendChild(yearText);
    yearContainer.appendChild(nextYear);
    datesContainer.classList.add("dates-container", "click");
    datesContainer.appendChild(yearContainer);
    datesContainer.appendChild(monthContainer);
    pickerContainer.appendChild(datesContainer);
    pickerContainer.appendChild(table);
    pickerContainer.classList.add("date-picker", "click");
    if (options.changed) {
        pickerContainer.style.display = "block";
    } else {
        pickerContainer.style.display = "none";
    }
    tr.classList.add("click");

    const documentListener = (event) => {
        if (!event.target.classList.contains("click")) {
            pickerContainer.style.display = "none";
        }
    }

    span.addEventListener("click", () => {
        if (pickerContainer.style.display === "none") {
            pickerContainer.style.display = "block";
        } else {
            pickerContainer.style.display = "none";
        }
    });

    tr.innerHTML = "<td class='click'><div class='table-td click'>Пн</div></td>" +
        "<td class='click'><div class='table-td click'>Вт</div></td>" +
        "<td class='click'><div class='table-td click'>Ср</div></td>" +
        "<td class='click'><div class='table-td click'>Чт</div></td>" +
        "<td class='click'><div class='table-td click'>Пт</div></td>" +
        "<td class='click'><div class='table-td click'>Сб</div></td>" +
        "<td class='click'><div class='table-td click'>Вс</div></td>";
    head.appendChild(tr);
    table.appendChild(head);
    container.appendChild(pickerContainer);
    table.classList.add("click");
    document.addEventListener("click", documentListener);
    prevYear.addEventListener("click", (event) => {
        event.preventDefault();
        document.removeEventListener("click", documentListener);
        createCalendar(container, cb, {
            inputName: options.inputName,
            min: options.min,
            max: options.max,
            inputClass: options.inputClass,
            placeholder: options.placeholder,
            current: new Date(d.getFullYear() - 1, d.getMonth(), d.getDate()),
            changed: true
        });
    });
    nextYear.addEventListener("click", (event) => {
        event.preventDefault();
        document.removeEventListener("click", documentListener);
        createCalendar(container, cb, {
            inputName: options.inputName,
            min: options.min,
            max: options.max,
            inputClass: options.inputClass,
            placeholder: options.placeholder,
            current: new Date(d.getFullYear() + 1, d.getMonth(), d.getDate()),
            changed: true
        });
    });

    prevMonth.addEventListener("click", (event) => {
        event.preventDefault();
        document.removeEventListener("click", documentListener);
        createCalendar(container, cb, {
            inputName: options.inputName,
            min: options.min,
            max: options.max,
            inputClass: options.inputClass,
            placeholder: options.placeholder,
            current: new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()),
            changed: true
        });
    });
    nextMonth.addEventListener("click", (event) => {
        event.preventDefault();
        document.removeEventListener("click", documentListener);
        createCalendar(container, cb, {
            inputName: options.inputName,
            min: options.min,
            max: options.max,
            inputClass: options.inputClass,
            placeholder: options.placeholder,
            current: new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()),
            changed: true
        });
    });
    const arr = calendar(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
    arr.calendar.map((week) => {
        const tr = document.createElement("tr");
        tr.classList.add("click");
        week.map((day) => {
           const td = document.createElement("td");
           td.classList.add("click");
           const div = document.createElement("div");
           div.classList.add("click");
           if (new Date(arr.date.getFullYear(), arr.date.getMonth(), 1).getTime() === new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime() && day.value === new Date().getDate()) {
               div.classList.add("current", "click")
           }
           div.classList.add("table-td", "number-td");
           div.innerHTML = day.value;
           const currentTimestamp = new Date(arr.date.getFullYear(), arr.date.getMonth(), day.value).getTime()
           if (currentTimestamp > options.min && currentTimestamp < options.max && day.current) {
               div.addEventListener("click", () => {
                   const selected = new Date(arr.date.getFullYear(), arr.date.getMonth(), day.value)
                   input.value = `${selected.getTime()}`;
                   span.innerHTML = `${selected.getDate()} ${months[selected.getMonth()]} ${selected.getFullYear()}`
                   selectedDateValue = selected;
                   cb(selected);
                   pickerContainer.style.display = "none";
               });
           } else {
               div.classList.add("disabled");
           }
           if (!day.current) {
               div.classList.add("disabled");
           }
           td.appendChild(div);
           tr.appendChild(td);
        });
        body.appendChild(tr);
    });
    table.appendChild(body);
}
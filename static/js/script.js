document.addEventListener("DOMContentLoaded", () => {
    let password = "";
    const passwordInput = document.querySelector("#ps-input");
    const passwordHide = document.querySelector(".ps-hide-btn");
    const mailThumb = document.querySelector("#mail-thumb");
    const phoneThumb = document.querySelector("#phone-thumb");
    const switcher = document.querySelector(".switcher-bg");
    const authBtn = document.querySelector(".profile-btn");
    const authModal = document.querySelector(".login-modal");
    const birth = document.querySelector(".date-container");
    const orderDatePicker = document.querySelector(".order-date-picker-container");
    const issue_container = document.querySelector(".issue-date-container");
    const valid_container = document.querySelector('.valid-container')
    const trip_date = document.querySelector('.trip-date')
    const trip_time = document.querySelector('.trip-time-container')
    let modal = false;
    let mail = true;
    let hidden = true;
    if (passwordInput && passwordHide && mailThumb && phoneThumb && authBtn) {
        passwordInput.addEventListener("input", (event) => {
            switch (event.inputType) {
                case "insertText":
                    password += event.data;
                    break
                case "deleteContentBackward":
                    password = password.slice(0, password.length - 1);
                    break
            }
            if (hidden) {
                event.target.value = '*'.repeat(password.length);
            }
        });
        passwordHide.addEventListener("click", (event) => {
            event.preventDefault();
            if (hidden) {
                document.querySelector(".ps-hide-icon").setAttribute("src", "/images/visible.svg");
                passwordInput.value = password;
                hidden = false;
            } else {
                document.querySelector(".ps-hide-icon").setAttribute("src", "/images/hidden.svg");
                passwordInput.value = '*'.repeat(password.length);
                hidden = true;
            }
        });
        mailThumb.addEventListener("click", () => {
            switcher.style.left = "4px";
            mail = true;
        });
        phoneThumb.addEventListener("click", () => {
            switcher.style.left = "calc(50% + 4px)";
            mail = false;
        });
        authBtn.addEventListener("click", () => {
            modal = true;
            authModal.classList.remove("closed");
        });
        authModal.addEventListener("click", (event) => {
            if (event.target.classList.contains("login-modal")) {
                modal = false;
                authModal.classList.add("closed");
            }
        });
    }
    if (birth) {
        const now = new Date();
        createCalendar(birth, (value) => {}, {
            inputName: "birth",
            placeholder: "???????? ????????????????",
            inputClass: ["rm", "register-input"],
            max: new Date(now.getFullYear() - 18, now.getMonth(), now.getDate()).getTime(),
            min: new Date(new Date().getFullYear() - 100, new Date().getMonth(), 1).getTime(),
            current: new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())
        });
    }

    if (orderDatePicker) {
        const now = new Date();
        createCalendar(orderDatePicker, (value) => {}, {
            inputName: "order_date",
            placeholder: "???????????????? ????????",
            inputClass: ["rm", "register-input"],
            max: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()).getTime(),
            min: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).getTime(),
            current: new Date(now.getFullYear(), now.getMonth(), now.getDate())
        });
    }

    if (issue_container) {
        const now = new Date();
        createCalendar(issue_container, (value) => {}, {
            inputName: "issued_date",
            placeholder: "???????? ????????????",
            inputClass: ["rm", "register-input"],
            max: new Date(now.getFullYear() - 2, now.getMonth(), now.getDate()).getTime(),
            min: new Date(now.getFullYear() - 100, now.getMonth(), now.getDate()).getTime(),
            current: new Date(now.getFullYear() - 2, now.getMonth(), now.getDate())
        });
    }
    if (valid_container) {
        const now = new Date();
        createCalendar(valid_container, (value) => {}, {
            inputName: "valid_until",
            placeholder: "????????",
            inputClass: ["rm", "register-input"],
            max: new Date(now.getFullYear() - 2, now.getMonth(), now.getDate()).getTime(),
            min: new Date(now.getFullYear() - 100, now.getMonth(), now.getDate()).getTime(),
            current: new Date(now.getFullYear() - 2, now.getMonth(), now.getDate())
        });
    }
    if (trip_date){
        const now = new Date();
        createCalendar(trip_date, (value) => {}, {
            inputName: "trip-date",
            placeholder: "???????????????? ???????? ??????????????",
            inputClass: ["rm", "trip-select-input"],
            max: new Date(now.getFullYear() , now.getMonth(), now.getDate()).getTime(),
            min: new Date(now.getFullYear() - 100, now.getMonth(), now.getDate()).getTime(),
            current: new Date(now.getFullYear() , now.getMonth(), now.getDate())
        });
    }
    if (trip_time){
        const now = new Date();
        createCalendar(trip_time, (value) => {}, {
            inputName: "trip-time",
            placeholder: "???????????????? ?????????? ???????????? ??????????????",
            inputClass: ["tm", "trip-select-input"],
            max: new Date(now.getFullYear() , now.getMonth(), now.getDate()).getTime(),
            min: new Date(now.getFullYear() - 100, now.getMonth(), now.getDate()).getTime(),
            current: new Date(now.getFullYear() , now.getMonth(), now.getDate())
        });
    }
})
const display = document.querySelector(".display");
const btns = document.querySelector(".buttons");

display.textContent = "";

const showResult = () => {
    try {
        display.textContent = eval(display.textContent);
    } catch (err) {
        display.textContent = "Error";
    }
};

const handleButtonClick = (e) => {
    if (e.target.tagName === "BUTTON") {
        const btnText = e.target.textContent;

        switch (btnText) {
            case "=":
                showResult();
                break;
            case "AC":
                display.textContent = "";
                break;
            case "DEL":
                display.textContent = display.textContent === "Error" ? "" : display.textContent.slice(0, -1);
                break;
            default:
                // Only append the character if it's a valid key
                if (isValidKey(btnText)) {
                    display.textContent += btnText;
                }
                break;
        }
    }
};

const isValidKey = (key) => {
    const validKeys = "0123456789+-*/().";
    return validKeys.includes(key);
};

btns.addEventListener("click", handleButtonClick);

window.addEventListener("keypress", (e) => {
    const key = e.key;

    if (key === "Enter") {
        showResult();
    } else if (isValidKey(key)) {
        display.textContent += key;
    }
});


const textField = document.querySelector("#text-input");
const codeField = document.querySelector("#code-input");

const encryptButton = document.querySelector("#encrypt-button");
const decryptButton = document.querySelector("#decrypt-button");

const warningLabel = document.querySelector("#warning-label");




const copyText = document.querySelector("#copy-text");
const pasteText = document.querySelector("#paste-text");
const copyCode = document.querySelector("#copy-code");
const pasteCode = document.querySelector("#paste-code");

function copy(field1, field2 = undefined) {
    const text1 = field1.value.trim();
    const text2 = field2 ? field2.value.trim() : "";
    if (!(text1 && (text2 || !field2))) {
        warningLabel.textContent = "Invalid data to copy";
        warningLabel.style.visibility = "visible";
        return;
    }

    const text = text2 ? text1 + "\nkey: " + text2 : text1;

    const prom = navigator.clipboard.writeText(text);
    prom.then(() => {
        warningLabel.style.visibility = "hidden";
    })
    prom.catch(err => {
        warningLabel.textContent = "Unable to copy";
        warningLabel.style.visibility = "visible";
    });
}
function paste(field1, field2 = undefined) {
    const prom = navigator.clipboard.readText();
    prom.then(text => {
        if (text.includes("\nkey: ")) {
            const [codePaste, keyPaste] = text.split("\nkey: ");
            field1.value = codePaste.trim();
            field2.value = keyPaste.trim();
        } else {
            field1.value = text;
        }

        warningLabel.style.visibility = "hidden";
    });
    prom.catch(err => {
        warningLabel.textContent = "Unable to paste";
        warningLabel.style.visibility = "visible";
    });
}

copyText.onclick = function() {
    copy(textField);
}
pasteText.onclick = function() {
    paste(textField);
}
copyCode.onclick = function() {
    copy(codeField, keyField);
}

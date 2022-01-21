let chars = document.getElementsByClassName('char');
let shortcuts = {}
for (item of chars){
    shortcuts[item.getAttribute("key-shortcut")] = item
}
let copiedAlert = document.getElementById('copiedAlert');

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function copy(text) {
    let textarea = document.createElement('textarea');
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(text);
    document.body.appendChild(textarea);
    textarea.remove();

}

for (i=0; i<chars.length; i++) {
        chars[i].addEventListener('click', async (e) => {
            copy(e.target.innerText);
        });
}

document.addEventListener('keydown', async (e) => {
    if (e.key === "Shift") {
        for (i=0; i<chars.length; i++) {
            chars[i].children[0].innerText = chars[i].children[0].innerText.toUpperCase();
        }
    }
    if (e.key.toLowerCase() in shortcuts) {
        document.querySelector(`.char[key-shortcut="${e.key.toLowerCase()}"]`).firstElementChild.classList.add('active');
        copy(shortcuts[e.key.toLowerCase()].innerText);
    }
});

document.addEventListener('keyup', async (e) => {
    if (e.key === "Shift") {
        for (i=0; i<chars.length; i++) {
            chars[i].children[0].innerText = chars[i].children[0].innerText.toLowerCase();
        }
    }
    if (e.key.toLowerCase() in shortcuts) {
        document.querySelector(`.char[key-shortcut="${e.key.toLowerCase()}"]`).firstElementChild.classList.remove('active');
    }
});
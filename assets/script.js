let chars = document.getElementsByClassName('char');
let copiedAlert = document.getElementById('copiedAlert');

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

for (i=0; i<chars.length; i++) {
        chars[i].addEventListener('click', async (e) => {
            let textarea = document.createElement('textarea');
            textarea.value = e.target.innerText;
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(textarea.value);
            textarea.remove();
            /* copiedAlert.classList.remove('hidden');
            await timeout(700);
            copiedAlert.classList.add('hidden'); */
        });
}

document.addEventListener('keydown', async (e) => {
    if (e.key === "Shift") {
        for (i=0; i<chars.length; i++) {
            chars[i].children[0].innerText = chars[i].children[0].innerText.toUpperCase();
        }
    }
});

document.addEventListener('keyup', async (e) => {
    if (e.key === "Shift") {
        for (i=0; i<chars.length; i++) {
            chars[i].children[0].innerText = chars[i].children[0].innerText.toLowerCase();
        }
    }
});
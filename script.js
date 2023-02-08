let chars = document.getElementsByClassName("char");
let copiedAlert = document.getElementById("copied");

for (i = 0; i < chars.length; i++) {
    chars[i].addEventListener("click", (e) => {
        let textarea = document.createElement("textarea");
        textarea.value = e.target.innerText;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(textarea.value);
        textarea.remove();

        copiedAlert.animate(
            [
                {
                    top: "10px",
                },
            ],
            {
                duration: 300,
                fill: "forwards",
                easing: "cubic-bezier(0.68,-0.55,0.27,1.55)",
            }
        );

        setTimeout(() => {
            copiedAlert.animate(
                [
                    {
                        top: "10px",
                    },
                    {
                        top: "-40px",
                    },
                ],
                {
                    duration: 300,
                    fill: "forwards",
                    easing: "cubic-bezier(0.68,-0.55,0.27,1.55)",
                }
            );
        }, 700);
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Shift") {
        for (i = 0; i < chars.length; i++) {
            chars[i].children[0].innerText =
                chars[i].children[0].innerText.toUpperCase();
        }
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
        for (i = 0; i < chars.length; i++) {
            chars[i].children[0].innerText =
                chars[i].children[0].innerText.toLowerCase();
        }
    }
});

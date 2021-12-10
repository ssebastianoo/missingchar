const settings = require('../settings.json');
const path = require('path');
const fs = require('fs');
let color = document.getElementById('color');

function updateJson() {
    fs.writeFile(path.join(__dirname, '../settings.json'), JSON.stringify(settings), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

document.documentElement.style.setProperty('--main-color', settings.color);
color.value = settings.color;

color.addEventListener('change', (e) => {
    console.log(e.target.value);
    settings.color = e.target.value;
    color.value = settings.color;
    updateJson();
    document.documentElement.style.setProperty('--main-color', settings.color);
});
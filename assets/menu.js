const ipc = require('electron').ipcRenderer;
let options = document.getElementsByClassName('option');
let maximize = document.getElementById('maximize').children[0];

for (let i=0; i < options.length; i++) {
    options[i].addEventListener('click', (e) => {
        if (e.target.id === '') {
            arg = e.target.parentElement.id;
        } else {
            arg = e.target.id;
        }
        ipc.send('options-action', arg);
    });
}

ipc.on('edit-max-icon', function(event, arg) {
    switch (arg) {
        case 'maximize':
            maximize.classList.remove('fa-compress');
            maximize.classList.add('fa-expand');
            break;
        case 'unmaximize':
            maximize.classList.remove('fa-expand');
            maximize.classList.add('fa-compress');
            break;
    }
});
// stepListeners
// ...(@dom-id, @callback)
function stepEntered(step, callback) {
    document.addEventListener('impress:stepenter', event => {
        if (event.target.id === step) {
            callback(event);
        } 
    });
}

function stepEntering(step, callback) {
    document.addEventListener('impress:stepleave', event => {
        const domElem = document.getElementById(step);
        const hasClass = domElem.className.indexOf('active') > -1;
        if (hasClass) {
            callback(event);
        } 
    });
}

function stepLeaving(step, callback) {
    document.addEventListener('impress:stepleave', event => {
        if (event.target.id === step) {
            callback(event);
        } 
    });
}
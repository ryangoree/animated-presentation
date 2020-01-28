var hint = document.getElementById('hint');
var closeHintBtn = document.getElementById('close-hint');

function closeHint(e) {
    e.preventDefault();
    hint.style.opacity = '0';
    setTimeout(function() {
        hint.style.display = 'none';
    }, 500);
    window.removeEventListener('keydown', closeHint, false);
}
closeHintBtn.onclick = closeHint;
document.addEventListener('keydown', closeHint, false);
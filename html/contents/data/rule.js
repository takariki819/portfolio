"use strict";
function handle(event) {
    event.preventDefault();
}

window.onload = function() {
document.addEventListener('touchmove', handle, { passive: false });
document.addEventListener('mousewheel', handle, { passive: false });
}
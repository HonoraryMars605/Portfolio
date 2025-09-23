/* script.js
   Simple navigation logic for the Unity-like menu.
   - click a menu button to show its pane
   - keyboard left/right arrows navigate the menu
   - Tab/Shift+Tab still works naturally; buttons are focusable
*/

(function(){
    const buttons = Array.from(document.querySelectorAll('.menu-btn'));
    const panes   = Array.from(document.querySelectorAll('.pane'));
    const status  = document.getElementById('status-right');

    function setActive(targetId){
        // Update buttons
        buttons.forEach(btn => {
            const isActive = btn.dataset.target === targetId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        // Update panes
        panes.forEach(p => {
            const isShown = p.id === targetId;
            p.setAttribute('aria-hidden', isShown ? 'false' : 'true');
            if(isShown){
                // small status update
                status.textContent = `Showing: ${p.querySelector('h2')?.textContent || targetId}`;
            }
        });
    }

    // click handlers
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            setActive(btn.dataset.target);
        });
    });

    // keyboard navigation: left/right to move across menu
    let focusedIndex = buttons.findIndex(b => b.classList.contains('active'));
    if(focusedIndex < 0) focusedIndex = 0;

    document.addEventListener('keydown', (e) => {
        const left = ['ArrowLeft','ArrowUp'];
        const right = ['ArrowRight','ArrowDown'];

        if(left.includes(e.key)){
            e.preventDefault();
            focusedIndex = (focusedIndex - 1 + buttons.length) % buttons.length;
            buttons[focusedIndex].focus();
            buttons[focusedIndex].click();
        } else if(right.includes(e.key)){
            e.preventDefault();
            focusedIndex = (focusedIndex + 1) % buttons.length;
            buttons[focusedIndex].focus();
            buttons[focusedIndex].click();
        }
    });

    // update focus index when user manually focuses a button
    buttons.forEach((b, i) => {
        b.addEventListener('focus', () => { focusedIndex = i; });
    });

    // init
    setActive(buttons[0].dataset.target);
})();

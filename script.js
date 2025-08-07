document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.fullpage-container');
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageIndicator = document.getElementById('page-indicator');
    const totalPages = pages.length;
    let currentPageIndex = 0;
    
    let touchStartY = 0;
    let touchEndY = 0;
    let isScrolling = false; // A in-scroll lai a in-swipe nawn loh nan

    function updateUI() {
        pageIndicator.textContent = `${currentPageIndex + 1} / ${totalPages}`;
        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === totalPages - 1;
    }

    function scrollToPage(index) {
        if (index >= 0 && index < totalPages) {
            pages[index].scrollIntoView({ behavior: 'smooth' });
            currentPageIndex = index;
            updateUI();
        }
    }

    nextBtn.addEventListener('click', () => scrollToPage(currentPageIndex + 1));
    prevBtn.addEventListener('click', () => scrollToPage(currentPageIndex - 1));
    
    function handleTouchStart(event) {
        touchStartY = event.changedTouches[0].screenY;
    }

    function handleTouchEnd(event) {
        touchEndY = event.changedTouches[0].screenY;
        handleSwipe();
    }

    function handleSwipe() {
        if (isScrolling) return; // A in-scroll lai chuan engmah ti suh

        const swipeDistance = touchStartY - touchEndY;
        const swipeThreshold = 50; 

        if (swipeDistance > swipeThreshold) { // Swipe up
            if (currentPageIndex < totalPages - 1) {
                scrollToPage(currentPageIndex + 1);
            }
        } else if (swipeDistance < -swipeThreshold) { // Swipe down
            if (currentPageIndex > 0) {
                scrollToPage(currentPageIndex - 1);
            }
        }
    }

    container.addEventListener('touchstart', handleTouchStart, false);
    container.addEventListener('touchend', handleTouchEnd, false);
    
    updateUI();
});
document.addEventListener('DOMContentLoaded', () => {
    
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageIndicator = document.getElementById('page-indicator');
    const totalPages = pages.length;
    let currentPageIndex = 0;
    
    // Swipe-na atana variable
    let touchStartX = 0; // Y aiah X kan hmang
    let touchEndX = 0;   // Y aiah X kan hmang

    function updateUI() {
        if(pageIndicator) {pageIndicator.textContent = `${currentPageIndex + 1} / ${totalPages}`;}
        if(prevBtn) {prevBtn.disabled = currentPageIndex === 0;}
        if(nextBtn) {nextBtn.disabled = currentPageIndex === totalPages - 1;}
    }

    // Scroll-na function siam ṭhatna
    function goToPage(newIndex) {
      if (newIndex < 0 || newIndex >= totalPages) {
            return;
        }
        const oldPageIndex = currentPageIndex;
        const direction = newIndex > oldPageIndex ? 'next' : 'prev';
        if (direction === 'next') {
            pages[oldPageIndex].classList.remove('active');
            pages[oldPageIndex].classList.add('prev'); // A liam bo tawh tih hriatna
        } else { // 'prev' a nih chuan
            pages[oldPageIndex].classList.remove('active');}
            const newPage = pages[newIndex];
        newPage.classList.remove('prev'); // A lo let leh a nih chuan 'prev' class kan paih ang
        newPage.classList.add('active');

        currentPageIndex = newIndex;
        updateUI();
    }

            

    // Button event-te (a ngai reng)
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {goToPage(currentPageIndex +1);});}
 if (prevBtn) {
   prevBtn.addEventListener('click', () => {goToPage(currentPageIndex - 1);});}
    
    // ===== HORIZONTAL SWIPE LOGIC =====
    document.body.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.body.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();});

    function handleSwipe() {
        const swipeDistance = touchStartX - touchEndX;
        const swipeThreshold = 50; 

        // A VEI LAMA SWIPE (Swipe Left)
        if (swipeDistance > swipeThreshold) {
            goToPage(currentPageIndex + 1);}
        
        
        
        // A DINGLAMA SWIPE (Swipe Right)
        if (swipeDistance < -swipeThreshold) {
            goToPage(currentPageIndex - 1);}
        
    }
        
    
        pages[0].classList.add('active');
    updateUI();
  });
  // ===== MENU LOGIC =====
  const menuBtn = document.getElementById('menu-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const imageUploadInput = document.getElementById('image-upload-input');
  const imagePreview = document.getElementById('image-preview');

  if (menuBtn && menuOverlay && closeMenuBtn) {
    // ===== MENU BUTTON HAWNNA =====
    menuBtn.addEventListener('click', () => {
        menuOverlay.style.display = 'flex';
    })
    
    // ===== CLOSE BUTTON KHAR NA =====
    closeMenuBtn.addEventListener('click', () => {
        menuOverlay.style.display = 'none';
    });
}
       // ===== THLALAK PREVIEW LEH UPLOAD-NA =====

       if (imageUploadInput && imagePreview) {
        imageUploadInput.addEventListener('change', (event) => {

            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                imagePreview.src = '';
                imagePreview.style.display = 'none';
            }
        });
    }
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.testimonial-carousel-container');
    const cards = document.querySelectorAll('.testimonial-card-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function updateCarousel() {
        const totalCards = cards.length;
        const visibleCards = window.innerWidth >= 768 ? 3 : 1;

        // Ensure the container is positioned correctly
        const offset = -currentIndex * (cards[0].offsetWidth + 20); // 20px for g-4 gap
        carouselContainer.style.transform = `translateX(${offset}px)`;

        // Update active, visible, and center cards
        cards.forEach((card, index) => {
            // Determine visibility
            const isVisible = (index >= currentIndex && index < currentIndex + visibleCards);
            card.style.display = isVisible ? 'block' : 'none';

            // Reset classes
            card.classList.remove('active', 'center-card');
        });

        // Set the center card for desktop view
        if (visibleCards > 1) {
            const centerCardIndex = currentIndex + 1;
            if (cards[centerCardIndex]) {
                cards[centerCardIndex].classList.add('active', 'center-card');
            }
        } else {
            // For mobile, the single visible card is the active one
            if (cards[currentIndex]) {
                cards[currentIndex].classList.add('active');
            }
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - 1; // Loop back to the end
        }
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        const visibleCards = window.innerWidth >= 768 ? 3 : 1;
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the beginning
        }
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});
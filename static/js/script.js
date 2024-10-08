// Get the elements from the HTML
const movieInput = document.getElementById('movie-input');
const autocompleteResults = document.getElementById('autocomplete-results');
const movieForm = document.getElementById('movie-form');

// Function to handle the input event
movieInput.addEventListener('input', debounce(async (e) => {
    const query = e.target.value;
    if (query.length > 2) {
        try {
            const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayAutocomplete(data);
        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    } else {
        autocompleteResults.innerHTML = '';
    }
}, 300));

// Function to debounce the search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to display the autocomplete results
function displayAutocomplete(results) {
    autocompleteResults.innerHTML = '';
    results.forEach(movie => {
        const div = document.createElement('div');
        div.textContent = movie;
        div.addEventListener('click', () => {
            movieInput.value = movie;
            autocompleteResults.innerHTML = '';
        });
        autocompleteResults.appendChild(div);
    });
}

// Function to hide the autocomplete results when clicking outside of the input
document.addEventListener('click', (e) => {
    if (e.target !== movieInput && !autocompleteResults.contains(e.target)) {
        autocompleteResults.innerHTML = '';
    }
});

// Function to submit the form
movieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (movieInput.value.trim()) {
        movieForm.submit();
    }
});

// Function to create stars
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars');
    document.body.insertBefore(starsContainer, document.body.firstChild);

    const numberOfStars = 1000;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Posición aleatoria
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Tamaño aleatorio
        const size = Math.random() * 5 + 1; // Entre 1 y 4 píxeles
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Duración y retraso de la animación aleatorios
        const duration = Math.random() * 3 + 2; // Entre 2 y 5 segundos
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
}

// Call the function to create stars when the page loads
window.addEventListener('load', createStars);
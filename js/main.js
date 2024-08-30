document.addEventListener("DOMContentLoaded", function() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    const content = document.getElementById('content');

    // Function to load external HTML into the placeholder
    function loadNav() {
        fetch('component/nav.html')
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;

                // Now that nav.html is loaded, add event listeners to the links
                const links = document.querySelectorAll('nav a');
                links.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const page = this.getAttribute('data-page');
                        if (page) {
                            loadPage(page);
                        }
                    });
                });
            })
            .catch(error => {
                navPlaceholder.innerHTML = "<p>Sorry, the navigation could not be loaded.</p>";
            });
    }

    // Function to load content into the main area
    function loadPage(page) {
        fetch(`pages/${page}`)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => {
                content.innerHTML = "<p>Sorry, the page could not be loaded.</p>";
            });
    }

    // Load the navigation and the default page (home.html)
    loadNav();
    loadPage('home.html');
});
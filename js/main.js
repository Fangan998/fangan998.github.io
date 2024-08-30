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

                 // Add event listener to the navbar brand
                 const navbarBrand = document.querySelector('.navbar-brand');
                 navbarBrand.addEventListener('click', function(e) {
                     e.preventDefault();
                     loadPage('home.html');
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

     // Function to handle 404 errors
     function handle404Error() {
        content.innerHTML = `
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <p>You will be redirected to the home page in 5 seconds...</p>
        `;
        setTimeout(() => {
            loadPage('home.html');
        }, 5000);
    }

    // Load the navigation and the default page (home.html)
    loadNav();
    loadPage('home.html');
});
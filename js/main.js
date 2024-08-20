document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll('nav a');
  const content = document.getElementById('content');

  // Function to load content
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

  // Event listeners for all navigation links
  links.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const page = this.getAttribute('data-page');
          loadPage(page);
      });
  });

  // Load the default page (home.html)
  loadPage('/pages/home.html');
});
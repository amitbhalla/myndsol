/**
 * Simple component inclusion utility for HTML components
 * Used to include reusable components like headers, footers, etc.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Find all elements with data-include attribute
    const includeElements = document.querySelectorAll('[data-include]');
    
    // Process each include element
    includeElements.forEach(function(element) {
        const componentPath = element.getAttribute('data-include');
        
        // Fetch the component HTML
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${componentPath}`);
                }
                return response.text();
            })
            .then(html => {
                // Insert the component HTML into the element
                element.innerHTML = html;
                
                // Execute any scripts that might be in the included HTML
                const scripts = element.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    
                    document.body.appendChild(newScript);
                    script.remove();
                });
            })
            .catch(error => {
                console.error('Error including component:', error);
                element.innerHTML = `<p class="text-red-500">Error loading component: ${componentPath}</p>`;
            });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding category
            const category = button.getAttribute('data-category');
            faqCategories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === category) {
                    cat.classList.add('active');
                }
            });
        });
    });
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // FAQ Search Functionality
    const searchInput = document.getElementById('faqSearch');
    const searchBtn = document.getElementById('searchBtn');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            // Reset search
            resetSearch();
            return;
        }
        
        // Hide all categories
        faqCategories.forEach(category => {
            category.classList.remove('active');
        });
        
        // Remove all highlights
        document.querySelectorAll('.highlight').forEach(highlight => {
            const parent = highlight.parentNode;
            parent.innerHTML = parent.innerHTML.replace(/<span class="highlight">|<\/span>/g, '');
        });
        
        // Count found items per category
        const categoryMatchCount = {};
        
        // Search through all items
        faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
            const categoryId = item.closest('.faq-category').id;
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                // Show this item
                item.style.display = 'block';
                item.classList.add('active');  // Expand the answer
                
                // Highlight the matches
                highlightMatches(item, searchTerm);
                
                // Count for category
                categoryMatchCount[categoryId] = (categoryMatchCount[categoryId] || 0) + 1;
            } else {
                // Hide this item
                item.style.display = 'none';
                item.classList.remove('active');
            }
        });
        
        // Show categories with matches
        for (const categoryId in categoryMatchCount) {
            document.getElementById(categoryId).classList.add('active');
        }
        
        // If no results found in any category
        if (Object.keys(categoryMatchCount).length === 0) {
            // Show a message or the first category
            document.getElementById('general').classList.add('active');
            alert('Aucun résultat trouvé pour "' + searchTerm + '"');
            resetSearch();
        }
        
        // Update tab buttons
        tabButtons.forEach(btn => {
            const category = btn.getAttribute('data-category');
            if (categoryMatchCount[category]) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    function highlightMatches(item, searchTerm) {
        const questionEl = item.querySelector('.faq-question h3');
        const answerEl = item.querySelector('.faq-answer');
        
        // Helper function to highlight matches
        function addHighlights(element, term) {
            const regex = new RegExp(term, 'gi');
            const nodes = Array.from(element.childNodes);
            
            nodes.forEach(node => {
                if (node.nodeType === 3) { // Text node
                    const text = node.nodeValue;
                    const highlightedText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
                    
                    if (text !== highlightedText) {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = highlightedText;
                        
                        const fragment = document.createDocumentFragment();
                        while (tempDiv.firstChild) {
                            fragment.appendChild(tempDiv.firstChild);
                        }
                        
                        node.parentNode.replaceChild(fragment, node);
                    }
                } else if (node.nodeType === 1) { // Element node
                    // Recursively check child nodes, but skip <span class="highlight">
                    if (!node.classList || !node.classList.contains('highlight')) {
                        addHighlights(node, term);
                    }
                }
            });
        }
        
        // Highlight in question
        addHighlights(questionEl, searchTerm);
        
        // Highlight in answer
        addHighlights(answerEl, searchTerm);
    }
    
    function resetSearch() {
        // Show default category
        faqCategories.forEach(category => {
            category.classList.remove('active');
        });
        document.getElementById('general').classList.add('active');
        
        // Reset tab buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === 'general') {
                btn.classList.add('active');
            }
        });
        
        // Show all items
        faqItems.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('active');
        });
        
        // Remove highlights
        document.querySelectorAll('.highlight').forEach(highlight => {
            const parent = highlight.parentNode;
            parent.innerHTML = parent.innerHTML.replace(/<span class="highlight">|<\/span>/g, '');
        });
    }
    
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Search on enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Reset search when input is cleared
        searchInput.addEventListener('input', function() {
            if (this.value.trim() === '') {
                resetSearch();
            }
        });
    }
});
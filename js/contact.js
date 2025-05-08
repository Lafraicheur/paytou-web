document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            let isValid = true;
            let errorMessages = [];
            
            if (name === '') {
                isValid = false;
                errorMessages.push('Le nom est requis');
                document.getElementById('name').classList.add('error');
            } else {
                document.getElementById('name').classList.remove('error');
            }
            
            if (email === '') {
                isValid = false;
                errorMessages.push('L\'email est requis');
                document.getElementById('email').classList.add('error');
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessages.push('Veuillez fournir un email valide');
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('email').classList.remove('error');
            }
            
            if (subject === '') {
                isValid = false;
                errorMessages.push('Le sujet est requis');
                document.getElementById('subject').classList.add('error');
            } else {
                document.getElementById('subject').classList.remove('error');
            }
            
            if (message === '') {
                isValid = false;
                errorMessages.push('Le message est requis');
                document.getElementById('message').classList.add('error');
            } else {
                document.getElementById('message').classList.remove('error');
            }
            
            // If form is valid, submit (simulate for now)
            if (isValid) {
                // Success message (would normally send data to server)
                showFormMessage('success', 'Merci ! Votre message a été envoyé avec succès. Nous vous contacterons bientôt.');
                contactForm.reset();
            } else {
                // Show error message
                showFormMessage('error', 'Veuillez corriger les erreurs suivantes : <br>' + errorMessages.join('<br>'));
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form message
    function showFormMessage(type, message) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.innerHTML = message;
        
        // Add message to DOM
        contactForm.insertAdjacentElement('beforebegin', messageElement);
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto remove message after 5 seconds if it's a success message
        if (type === 'success') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
});
// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<div class="spinner"></div> Sending...';
    submitButton.disabled = true;

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Success handling
            contactForm.reset();
            showToast('Message sent successfully! 🎉', 'success');
        } else {
            // Error handling
            const errorData = await response.json();
            showToast(`Error: ${errorData.error || 'Please try again later'}`, 'error');
        }
    } catch (error) {
        // Network error handling
        showToast('Network error. Please check your connection.', 'error');
    } finally {
        // Restore button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

// Toast Notification Function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}



// Form submission handler
document.getElementById('submit-link').addEventListener('click', function(e) {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    const link = this;
    const originalHtml = link.innerHTML;
    
    // Show loading state
    link.innerHTML = `
        <span class="button__text">Sending...</span>
        <i class="uil uil-process button__icon"></i>
    `;
    
    // Validate and submit
    if (form.checkValidity()) {
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.reset();
                showToast('Message sent!', 'success');
            } else {
                showToast('Error sending message', 'error');
            }
        }).finally(() => {
            link.innerHTML = originalHtml;
        });
    } else {
        link.innerHTML = originalHtml;
        form.reportValidity();
    }
});

// Add touch support for mobile
document.getElementById('submit-link').addEventListener('touchend', function(e) {
    this.click();
    e.preventDefault();
});

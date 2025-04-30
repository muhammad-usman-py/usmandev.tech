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



// JavaScript
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    const originalHTML = button.innerHTML;

    // Show loading state
    button.innerHTML = `
        <span class="button__text">Sending...</span>
        <i class="uil uil-process button__icon"></i>
    `;
    button.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            showToast('Message sent successfully!', 'success');
        } else {
            showToast('Error sending message', 'error');
        }
    } catch (error) {
        showToast('Network error', 'error');
    } finally {
        button.innerHTML = originalHTML;
        button.disabled = false;
    }
});

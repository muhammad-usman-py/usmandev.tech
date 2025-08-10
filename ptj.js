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
        
// Simple modal handler — attach after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  const viewBtns = document.querySelectorAll('.services__button');
  const modals = document.querySelectorAll('.services__modal');
  const closeBtns = document.querySelectorAll('.services__modal-close');

  viewBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      // hide others
      modals.forEach(m => m.classList.remove('active'));
      // show modal corresponding to the button index
      if (modals[i]) modals[i].classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.services__modal').classList.remove('active');
    });
  });

  // close clicking outside modal content
  modals.forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });
});

    } finally {
        button.innerHTML = originalHTML;
        button.disabled = false;
    }
});

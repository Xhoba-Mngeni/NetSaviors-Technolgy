// NetSaviors Technology - Main JavaScript File

(function() {
    'use strict';

    // Utility function to run code when DOM is ready
    function domReady(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    // Main initialization
    domReady(function() {
        initializeContactForm();
        initializeSupportForm();
        initializeSmoothScrolling();
        initializePageSpecificFeatures();
        initializeFormValidation();
        initializeRealTimeValidation();
    });

    // Contact Form Handler
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const formMessage = document.getElementById('formMessage');

        function showMessage(text, isError = false) {
            if (formMessage) {
                formMessage.textContent = text;
                formMessage.style.color = isError ? '#ff4444' : '#22c55e';
                formMessage.style.display = 'block';
                
                // Auto-hide success messages after 5 seconds
                if (!isError) {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
            }
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            // Validation
            if (!name || !email || !message) {
                showMessage('Please fill in all required fields.', true);
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', true);
                return;
            }

            // Simulate form submission
            showMessage('Sending your message...', false);
            
            setTimeout(() => {
                showMessage('Thank you for your message! We will get back to you within 24 hours.');
                contactForm.reset();
            }, 1500);
        });
    }

    // Support Form Handler
    function initializeSupportForm() {
        const supportForm = document.getElementById('supportLogForm');
        if (!supportForm) return;

        const ticketMessage = document.getElementById('ticketMessage');

        function showTicketMessage(text, isError = false) {
            if (ticketMessage) {
                ticketMessage.textContent = text;
                ticketMessage.style.color = isError ? '#ef4444' : '#22c55e';
                ticketMessage.style.backgroundColor = isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)';
                ticketMessage.style.border = isError ? '1px solid #ef4444' : '1px solid #22c55e';
                ticketMessage.style.display = 'block';
                
                if (!isError) {
                    setTimeout(() => {
                        ticketMessage.style.display = 'none';
                    }, 5000);
                }
            }
        }

        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                callerName: document.getElementById('callerName')?.value.trim(),
                callerDepartment: document.getElementById('callerDepartment')?.value,
                contactEmail: document.getElementById('contactEmail')?.value.trim(),
                contactPhone: document.getElementById('contactPhone')?.value.trim(),
                incidentTitle: document.getElementById('incidentTitle')?.value.trim(),
                incidentCategory: document.getElementById('incidentCategory')?.value,
                incidentDescription: document.getElementById('incidentDescription')?.value.trim(),
                urgency: document.querySelector('input[name="urgency"]:checked')?.value,
                priority: document.getElementById('priority')?.value,
                ticketStatus: document.getElementById('ticketStatus')?.value,
                assignedAgent: document.getElementById('assignedAgent')?.value.trim(),
                troubleshootingSteps: document.getElementById('troubleshootingSteps')?.value.trim(),
                resolutionNotes: document.getElementById('resolutionNotes')?.value.trim(),
                escalatedTo: document.getElementById('escalatedTo')?.value.trim()
            };

            // Validation
            if (!formData.callerName || !formData.callerDepartment || !formData.contactEmail || 
                !formData.incidentTitle || !formData.incidentCategory || !formData.incidentDescription ||
                !formData.urgency || !formData.priority || !formData.ticketStatus) {
                showTicketMessage('Please fill in all required fields.', true);
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.contactEmail)) {
                showTicketMessage('Please enter a valid email address.', true);
                return;
            }

            // Show loading state
            const submitBtn = supportForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '🔄 Submitting...';
            submitBtn.disabled = true;

            // Simulate API call
            showTicketMessage('⏳ Submitting your support ticket...');

            setTimeout(() => {
                // Generate ticket number
                const ticketNumber = 'NS-' + Date.now().toString().slice(-6);
                
                // Success message
                showTicketMessage(`✅ Ticket #${ticketNumber} submitted successfully! Our team will contact you shortly.`);
                
                // Log to console for demonstration
                console.log('New Support Ticket Submitted:', {
                    ticketNumber,
                    ...formData,
                    timestamp: new Date().toISOString(),
                    submittedBy: 'Web Form'
                });

                // Reset form
                supportForm.reset();
                
                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Scroll to success message
                if (ticketMessage) {
                    ticketMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

            }, 2000);
        });

        // Clear form message when user starts typing
        supportForm.addEventListener('input', function() {
            if (ticketMessage && ticketMessage.style.display !== 'none') {
                ticketMessage.style.display = 'none';
            }
        });
    }

    function initializeFormValidation() {
        // Add real-time validation indicators
        const form = document.getElementById('supportLogForm');
        if (!form) return;

        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.style.borderColor = '#ef4444';
            field.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        } else if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                field.style.borderColor = '#ef4444';
                field.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            } else {
                field.style.borderColor = '#22c55e';
                field.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
            }
        } else if (field.value.trim()) {
            field.style.borderColor = '#22c55e';
            field.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
        } else {
            field.style.borderColor = '#333';
            field.style.backgroundColor = '#2a2a2a';
        }
    }

    function initializeRealTimeValidation() {
        // Phone number formatting
        const phoneInput = document.getElementById('contactPhone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    value = value.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                    e.target.value = !value[2] ? value[1] : '(' + value[1] + ') ' + value[2] + (value[3] ? '-' + value[3] : '');
                }
            });
        }

        // Character counters for textareas
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.textAlign = 'right';
            counter.style.fontSize = '0.8rem';
            counter.style.color = '#888';
            counter.style.marginTop = '0.5rem';
            textarea.parentNode.appendChild(counter);

            textarea.addEventListener('input', function() {
                const count = this.value.length;
                counter.textContent = `${count} characters`;
                
                if (count > 1000) {
                    counter.style.color = '#ef4444';
                } else if (count > 500) {
                    counter.style.color = '#f59e0b';
                } else {
                    counter.style.color = '#888';
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Page-specific feature initialization
    function initializePageSpecificFeatures() {
        // Add active class to current page in navigation
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });

        // Add loading states to buttons
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function() {
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Processing...';
                    submitBtn.disabled = true;
                    
                    // Revert after 3 seconds (simulated processing)
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
        });
    }

})();
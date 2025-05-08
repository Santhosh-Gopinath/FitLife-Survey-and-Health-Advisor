/**
 * FitNexus Dashboard - Main Scripts
 * This file contains the JavaScript functionality for the FitNexus Dashboard
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all dashboard components
    initializeSidebar();
    initializeThemeToggle();
    initializeNavigation();
    
    // Load initial page based on active nav item or default to profile
    const initialPage = document.querySelector('.nav-item.active a')?.getAttribute('data-page') || 'profile';
    loadPageContent(initialPage);
});

/**
 * Initialize sidebar functionality
 */
function initializeSidebar() {
    const collapseBtn = document.querySelector('.collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (!collapseBtn || !sidebar) return;
    
    // Toggle sidebar collapse state
    collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        
        // Save state to localStorage for persistence
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    });
    
    // Load saved state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        sidebar.classList.add('collapsed');
    }

    const logoutBtn = document.querySelector('.logout a');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('fitnexusToken');
            window.location.href = 'index.html';
        });
    }
}

/**
 * Initialize dark/light theme toggle
 */
function initializeThemeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle input');
    if (!darkModeToggle) return;
    
    // Apply theme based on saved preference
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
        darkModeToggle.checked = true;
    }
    
    // Toggle theme on change
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save preference to localStorage
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
    });
}

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item a');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Set active class
            navItems.forEach(link => {
                link.parentElement.classList.remove('active');
            });
            item.parentElement.classList.add('active');
            
            // Load the corresponding page content
            const page = item.getAttribute('data-page');
            if (page) {
                loadPageContent(page);
                
                // Update URL without page reload using History API
                const url = new URL(window.location);
                url.searchParams.set('page', page);
                window.history.pushState({}, '', url);
            }
        });
    });
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', () => {
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page') || 'profile';
        
        // Update active nav item
        navItems.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage === page) {
                navItems.forEach(l => l.parentElement.classList.remove('active'));
                link.parentElement.classList.add('active');
            }
        });
        
        loadPageContent(page);
    });
}

/**
 * Load page content based on page name
 * @param {string} page - The page name to load
 */
function loadPageContent(page) {
    const contentArea = document.querySelector('.main-content');
    if (!contentArea) return;

    // Show loading state with ARIA attributes for accessibility
    contentArea.innerHTML = `
        <h1 class="page-title">${capitalizeFirstLetter(page)}</h1>
        <div class="content-loader" role="status" aria-live="polite">
            <i class="fas fa-spinner fa-pulse" aria-hidden="true"></i>
            <p>Loading ${page}...</p>
        </div>
    `;

    // Use a small delay to show loading indicator and improve perceived performance
    setTimeout(() => {
        switch (page) {
            case 'profile':
                loadProfilePage(contentArea);
                break;
            case 'take_survey':
                fetch('take_survey.html')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load survey page (Status: ${response.status})`);
                        }
                        return response.text();
                    })
                    .then(html => {
                        contentArea.innerHTML = html;
                    })
                    .catch(error => {
                        showErrorPage(contentArea, error.message || 'Failed to load survey page');
                    });
                break;
            case 'results':
                loadComingSoonPage(contentArea, 'results', 'View your health analysis and recommendations');
                break;
            case 'history':
                loadComingSoonPage(contentArea, 'history', 'Track your progress over time');
                break;
            default:
                showErrorPage(contentArea, 'Page not found');
        }
    }, 500); // Reduced delay for better UX
}

/**
 * Load profile page content
 * @param {HTMLElement} contentArea - The container to load content into
 */
function loadProfilePage(contentArea) {
    // Set the title and create container
    contentArea.innerHTML = `
        <h1 class="page-title">Profile Information</h1>
        <div id="profile-container" aria-live="polite"></div>
    `;
    
    // Use fetch API with proper error handling
    fetch('profile.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load profile page (Status: ${response.status})`);
            }
            return response.text();
        })
        .then(html => {
            // Create a temporary element to parse the HTML
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            // Extract the form and its styles
            const profileForm = temp.querySelector('form');
            const profileStyles = temp.querySelector('style');
            
            // Get the profile container
            const profileContainer = document.getElementById('profile-container');
            if (!profileContainer) throw new Error('Profile container not found');
            
            // Add styles with optimizations
            if (profileStyles) {
                const styleElement = document.createElement('style');
                styleElement.textContent = profileStyles.textContent + `
                    /* Override any centering styles */
                    .container {
                        width: 100%;
                        max-width: 100%;
                        margin: 0;
                        padding: 0;
                    }
                    body {
                        display: block;
                        padding: 0;
                    }
                    form {
                        margin: 0;
                        max-width: 100%;
                    }
                    .form-header {
                        text-align: center;
                    }
                    /* Improved form responsiveness */
                    @media (max-width: 768px) {
                        .form-group {
                            margin-bottom: 10px;
                        }
                        input, select, textarea {
                            padding: 8px 8px 8px 36px;
                        }
                        .icon {
                            font-size: 16px;
                        }
                    }
                    /* Success message styling */
                    .success-message {
                        background-color: #d4edda;
                        color: #155724;
                        border: 1px solid #c3e6cb;
                        border-radius: 4px;
                        padding: 15px;
                        margin-bottom: 20px;
                        opacity: 1;
                        transition: opacity 0.5s ease;
                    }
                    .success-message i {
                        margin-right: 10px;
                        color: #28a745;
                    }
                    /* Error message styling */
                    .error-message {
                        background-color: #f8d7da;
                        color: #721c24;
                        border: 1px solid #f5c6cb;
                        border-radius: 4px;
                        padding: 15px;
                        margin-bottom: 20px;
                        opacity: 1;
                        transition: opacity 0.5s ease;
                    }
                    .error-message i {
                        margin-right: 10px;
                        color: #dc3545;
                    }
                    .input-error {
                        border-color: #dc3545 !important;
                    }
                `;
                profileContainer.appendChild(styleElement);
            }
            
            // Add necessary container divs
            const containerDiv = document.createElement('div');
            containerDiv.className = 'container';
            containerDiv.style.cssText = 'margin: 0; max-width: 100%;';
            
            const formHeaderDiv = document.createElement('div');
            formHeaderDiv.className = 'form-header';
            formHeaderDiv.innerHTML = `
                <i class="fas fa-user-circle form-icon" aria-hidden="true"></i>
                <h2>Profile Form</h2>
            `;
            
            containerDiv.appendChild(formHeaderDiv);
            
            if (profileForm) {
                // Ensure the form has an accessible name
                profileForm.setAttribute('aria-label', 'Personal Information Form');
                profileForm.id = 'personalForm'; // Ensure the form has the ID expected by validateForm
                
                // Add event listener for form submission
                profileForm.addEventListener('submit', validateForm);
                
                // Load existing profile data if available
                loadExistingProfileData(profileForm);
                
                containerDiv.appendChild(profileForm);
                profileContainer.appendChild(containerDiv);
                
                // Initialize form validation
                initializeFormValidation();
            } else {
                showErrorInContainer(profileContainer, 'Failed to load profile form');
            }
        })
        .catch(error => {
            showErrorInContainer(
                document.getElementById('profile-container') || contentArea,
                error.message || 'An error occurred while loading the profile'
            );
        });
}

/**
 * Load existing profile data if available
 * @param {HTMLFormElement} form - The form to populate
 */
function loadExistingProfileData(form) {
    const token = localStorage.getItem('fitnexusToken');
    if (!token) return;
    
    fetch('/api/profile', {
        method: 'GET',
        headers: {
            'x-auth-token': token
        }
    })
    .then(response => {
        if (!response.ok) {
            console.log('No existing profile found');
            return null;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            // Populate form fields with existing data
            if (data.fullName) document.getElementById('full-name').value = data.fullName;
            if (data.dateOfBirth) document.getElementById('date-of-birth').value = data.dateOfBirth;
            if (data.age) document.getElementById('age').value = data.age;
            if (data.gender) document.getElementById('gender').value = data.gender;
            if (data.bloodGroup) document.getElementById('blood-group').value = data.bloodGroup;
            if (data.height) document.getElementById('height').value = data.height;
            if (data.weight) document.getElementById('weight').value = data.weight;
            if (data.phoneNo) document.getElementById('phone-no').value = data.phoneNo;
            if (data.address) document.getElementById('address').value = data.address;
        }
    })
    .catch(error => {
        console.error('Error loading profile data:', error);
    });
}

/**
 * Set error for a specific field
 * @param {HTMLElement} field - The input field
 * @param {string} message - The error message
 */
function setFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.id = `${field.id}-error`;
    errorElement.setAttribute('role', 'alert');
    errorElement.textContent = message;
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('input-error');
}

/**
 * Clear error for a specific field
 * @param {HTMLElement} field - The input field to clear the error for
 */
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector(`#${field.id}-error`);
    if (existingError) {
        existingError.remove();
    }

    field.setAttribute('aria-invalid', 'false');
    field.classList.remove('input-error');
}

/**
 * Helper function to extract user ID from token
 * @returns {string|null} The user ID or null if not found
 */
function getUserIdFromToken() {
    const token = localStorage.getItem('fitnexusToken');
    if (!token) return null;
    
    try {
        // JWT tokens are in format: header.payload.signature
        // We need the payload part
        const payload = token.split('.')[1];
        // Decode the base64 string
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload.user?.id || decodedPayload.id || null;
    } catch (error) {
        console.error('Error extracting user ID from token:', error);
        return null;
    }
}

/**
 * Load a "coming soon" placeholder page
 * @param {HTMLElement} contentArea - The container to load content into
 * @param {string} pageName - The name of the page
 * @param {string} message - The message to display
 */
function loadComingSoonPage(contentArea, pageName, message) {
    contentArea.innerHTML = `
        <h1 class="page-title">${capitalizeFirstLetter(pageName)}</h1>
        <div class="coming-soon-container" role="status">
            <i class="fas fa-tools coming-soon-icon" aria-hidden="true"></i>
            <h2 class="coming-soon-message">Coming Soon!</h2>
            <p class="coming-soon-subtext">${message}</p>
        </div>
    `;
}

/**
 * Show an error page
 * @param {HTMLElement} contentArea - The container to show error in
 * @param {string} message - The error message
 */
function showErrorPage(contentArea, message) {
    contentArea.innerHTML = `
        <h1 class="page-title">Error</h1>
        <div class="error-message" role="alert">
            <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
            ${message}
        </div>
    `;
}

/**
 * Show an error message within a container
 * @param {HTMLElement} container - The container to show error in
 * @param {string} message - The error message
 */
function showErrorInContainer(container, message) {
    container.innerHTML = `
        <div class="error-message" role="alert">
            <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
            ${message}
        </div>
    `;
}

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    // Get the form
    const form = document.getElementById('personalForm');
    if (!form) return;
    
    // Real-time validation for better user experience
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });
    
    // Auto-calculate age based on date of birth
    const dobInput = document.getElementById('date-of-birth');
    if (dobInput) {
        dobInput.addEventListener('change', calculateAgeFromDOB);
    }
}

/**
 * Calculate age from date of birth
 */
function calculateAgeFromDOB() {
    const dobInput = document.getElementById('date-of-birth');
    const ageInput = document.getElementById('age');
    
    if (!dobInput || !ageInput || !dobInput.value) return;
    
    const dob = new Date(dobInput.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    if (age >= 0 && age <= 100) {
        ageInput.value = age;
        validateField(ageInput);
    }
}

/**
 * Validate the entire form on submission
 * @param {Event} event - The submit event
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    
    // Basic validation for required fields
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            setFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Specific validations
    const ageField = document.getElementById('age');
    if (ageField && ageField.value) {
        const age = parseInt(ageField.value);
        if (isNaN(age) || age < 0 || age > 120) {
            setFieldError(ageField, 'Please enter a valid age between 0 and 120');
            isValid = false;
        }
    }
    
    const phoneField = document.getElementById('phone-no');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
            setFieldError(phoneField, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    if (isValid) {
        // Collect form data
        const profileData = {
            fullName: document.getElementById('full-name').value,
            dateOfBirth: document.getElementById('date-of-birth').value,
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
            bloodGroup: document.getElementById('blood-group').value || '',
            height: parseFloat(document.getElementById('height').value) || 0,
            weight: parseFloat(document.getElementById('weight').value) || 0,
            phoneNo: document.getElementById('phone-no').value || '',
            address: document.getElementById('address').value || '',
            userId: getUserIdFromToken() // Add user identification
        };
        
        // Send data to server
        const token = localStorage.getItem('fitnexusToken');
        
        // Show loading indicator
        const form = document.getElementById('personalForm');
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving profile...';
        form.appendChild(loadingIndicator);
        
        fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(profileData)
        })
        .then(response => {
            // Remove loading indicator
            loadingIndicator.remove();
            
            if (!response.ok) {
                throw new Error(`Failed to save profile (Status: ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Profile saved successfully:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.setAttribute('role', 'alert');
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Profile updated successfully!';
            
            const form = document.getElementById('personalForm');
            form.parentNode.insertBefore(successMessage, form);
            
            // Scroll to the success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Remove the success message after 3 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => successMessage.remove(), 500);
            }, 3000);
        })
        .catch(error => {
            console.error('Save profile error:', error);
            
            // Show error message in UI instead of alert
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message global-error';
            errorMessage.setAttribute('role', 'alert');
            errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message || 'Failed to save profile'}`;
            
            const form = document.getElementById('personalForm');
            form.parentNode.insertBefore(errorMessage, form);
            
            // Remove the error message after 5 seconds
            setTimeout(() => {
                errorMessage.style.opacity = '0';
                setTimeout(() => errorMessage.remove(), 500);
            }, 5000);
        });
    }
    return isValid;
}

/**
 * Validate a single field
 * @param {HTMLElement} input - The input field to validate
 */
function validateField(input) {
    if (!input) return;
    
    const fieldId = input.id;
    const value = input.value;
    let isValid = true;
    let errorMessage = '';

    switch(fieldId) {
        case 'full-name':
            if (value.trim().length < 3) {
                isValid = false;
                errorMessage = 'Name must be at least 3 characters';
            }
            break;
        case 'age':
            const age = parseInt(value);
            if (isNaN(age) || age < 0 || age > 120) {
                isValid = false;
                errorMessage = 'Please enter a valid age between 0 and 120';
            }
            break;
        case 'height':
            const height = parseFloat(value);
            if (isNaN(height) || height < 50 || height > 250) {
                isValid = false;
                errorMessage = 'Please enter a valid height between 50 and 250 cm';
            }
            break;
        case 'weight':
            const weight = parseFloat(value);
            if (isNaN(weight) || weight < 1 || weight > 500) {
                isValid = false;
                errorMessage = 'Please enter a valid weight between 1 and 500 kg';
            }
            break;
        case 'phone-no':
            const phoneRegex = /^\+?[0-9]{10,15}$/;
            if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
        case 'address':
            if (value && value.trim().length < 5) {
                isValid = false;
                errorMessage = 'Address must be at least 5 characters';
            }
            break;
    }

    if (!isValid) {
        setFieldError(input, errorMessage);
    } else {
        clearFieldError(input);
    }
}

/**
 * Capitalize the first letter of a string
 * @param {string} string - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
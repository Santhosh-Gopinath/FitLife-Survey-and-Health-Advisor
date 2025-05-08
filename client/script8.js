/**
 * FitNexus Dashboard - Main Scripts
 * This file contains the JavaScript functionality for the FitNexus Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeThemeToggle();
    initializeNavigation();
    loadUserProfileForSidebar();

    const initialPage = document.querySelector('.nav-item.active a')?.getAttribute('data-page') || 'profile';
    loadPageContent(initialPage);
});

function loadUserProfileForSidebar() {
    const token = localStorage.getItem('fitnexusToken');
    if (!token) return;

    fetch('/api/profile', {
        method: 'GET',
        headers: { 'x-auth-token': token }
    })
        .then(response => {
            if (!response.ok) {
                console.log('No existing profile found');
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data && data.fullName) {
                updateSidebarUserName(data.fullName);
            }
        })
        .catch(error => {
            console.error('Error loading profile data for sidebar:', error);
        });
}

function updateSidebarUserName(name) {
    const userNameElement = document.querySelector('.user-info h3');
    if (userNameElement && name) {
        userNameElement.textContent = name;
    }
}

function initializeSidebar() {
    const collapseBtn = document.querySelector('.collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    if (!collapseBtn || !sidebar) return;

    collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });

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

function initializeThemeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle input');
    if (!darkModeToggle) return;

    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
    });
}

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item a');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(link => link.parentElement.classList.remove('active'));
            item.parentElement.classList.add('active');

            const page = item.getAttribute('data-page');
            if (page) {
                loadPageContent(page);
                const url = new URL(window.location);
                url.searchParams.set('page', page);
                window.history.pushState({}, '', url);
            }
        });
    });

    window.addEventListener('popstate', () => {
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page') || 'profile';
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

async function loadPageContent(page, retryCount = 3) {
    const contentArea = document.querySelector('.main-content');
    if (!contentArea) {
        console.error('Main content area (.main-content) not found in dashboard.html');
        return;
    }

    contentArea.innerHTML = `
        <h1 class="page-title">${capitalizeFirstLetter(page)}</h1>
        <div class="content-loader" role="status" aria-live="polite">
            <i class="fas fa-spinner fa-pulse" aria-hidden="true"></i>
            <p>Loading ${page}...</p>
        </div>
    `;

    for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
            console.log(`Fetching ${page}.html, attempt ${attempt}`);
            const response = await fetch(`${page}.html`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${page}.html (Status: ${response.status})`);
            }
            const html = await response.text();

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const content = tempDiv.querySelector('body')?.innerHTML || html;
            contentArea.innerHTML = content;

            const scripts = tempDiv.querySelectorAll('script[src]');
            let loadedScripts = 0;

            if (scripts.length === 0) {
                console.log(`No scripts found in ${page}.html, initializing page directly`);
                initializePage(page);
            } else {
                scripts.forEach(script => {
                    const scriptSrc = script.src;
                    console.log(`Loading script: ${scriptSrc}`);
                    const scriptElement = document.createElement('script');
                    scriptElement.src = scriptSrc;
                    scriptElement.async = false;
                    scriptElement.onload = () => {
                        console.log(`Script ${scriptSrc} loaded successfully`);
                        loadedScripts++;
                        if (loadedScripts === scripts.length) {
                            initializePage(page);
                        }
                    };
                    scriptElement.onerror = () => {
                        console.error(`Failed to load script: ${scriptSrc}`);
                        showErrorPage(contentArea, `Failed to load script: ${scriptSrc}`);
                    };
                    document.head.appendChild(scriptElement);
                });
            }
            return;
        } catch (error) {
            console.error(`Attempt ${attempt} failed for ${page}.html:`, error);
            if (attempt === retryCount) {
                showErrorPage(contentArea, `Unable to load ${page} page after ${retryCount} attempts: ${error.message}`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

function initializePage(page) {
    const contentArea = document.querySelector('.main-content');
    if (!contentArea) {
        console.error('Main content area not found during initialization');
        return;
    }

    switch (page) {
        case 'profile':
            loadProfilePage(contentArea);
            break;
        case 'survey':
            if (!window.initializeSurveyPage) {
                console.error('initializeSurveyPage is not defined. Ensure script2.js is loaded in take_survey.html');
                showErrorPage(contentArea, 'Survey functionality failed to load: initializeSurveyPage is not defined. Please check script2.js.');
            } else if (!document.getElementById('prediction-form')) {
                console.error('prediction-form element not found in take_survey.html');
                showErrorPage(contentArea, 'Survey functionality failed to load: #prediction-form not found. Please ensure take_survey.html is correctly configured.');
            } else {
                console.log('Initializing survey page');
                window.initializeSurveyPage();
            }
            break;
        case 'results':
            if (!window.loadPredictionResults) {
                console.error('loadPredictionResults is not defined. Ensure script3.js is loaded in result.html');
                showErrorPage(contentArea, 'Results functionality failed to load: loadPredictionResults is not defined. Please check script3.js.');
            } else if (!document.getElementById('predicted-disease')) {
                console.error('predicted-disease element not found in result.html');
                showErrorPage(contentArea, 'Results functionality failed to load: #predicted-disease not found. Please ensure result.html is correctly configured.');
            } else {
                console.log('Initializing results page');
                window.loadPredictionResults();
            }
            break;
        case 'history':
            if (!window.loadPredictionHistory) {
                console.error('loadPredictionHistory is not defined. Ensure script3.js is loaded in history.html');
                showErrorPage(contentArea, 'History functionality failed to load: loadPredictionHistory is not defined. Please check script3.js.');
            } else if (!document.getElementById('history-list')) {
                console.error('history-list element not found in history.html');
                showErrorPage(contentArea, 'History functionality failed to load: #history-list not found. Please ensure history.html is correctly configured.');
            } else {
                console.log('Initializing history page');
                window.loadPredictionHistory();
            }
            break;
        default:
            showErrorPage(contentArea, 'Page not found');
    }
}

function loadProfilePage(contentArea) {
    contentArea.innerHTML = `
        <h1 class="page-title">Profile Information</h1>
        <div id="profile-container" aria-live="polite"></div>
    `;

    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer) {
        console.error('Profile container not found');
        return;
    }

    fetch('profile.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load profile page (Status: ${response.status})`);
            }
            return response.text();
        })
        .then(html => {
            const temp = document.createElement('div');
            temp.innerHTML = html;

            const profileForm = temp.querySelector('form');
            const profileStyles = temp.querySelector('style');

            if (profileStyles) {
                const styleElement = document.createElement('style');
                styleElement.textContent = profileStyles.textContent + `
                    .container { width: 100%; max-width: 100%; margin: 0; padding: 0; }
                    body { display: block; padding: 0; }
                    form { margin: 0; max-width: 100%; }
                    .form-header { text-align: center; }
                    @media (max-width: 768px) {
                        .form-group { margin-bottom: 10px; }
                        input, select, textarea { padding: 8px 8px 8px 36px; }
                        .icon { font-size: 16px; }
                    }
                    .success-message { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 4px; padding: 15px; margin-bottom: 20px; opacity: 1; transition: opacity 0.5s ease; }
                    .success-message i { margin-right: 10px; color: #28a745; }
                    .error-message { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; padding: 15px; margin-bottom: 20px; opacity: 1; transition: opacity 0.5s ease; }
                    .error-message i { margin-right: 10px; color: #dc3545; }
                    .input-error { border-color: #dc3545 !important; }
                `;
                profileContainer.appendChild(styleElement);
            }

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
                profileForm.setAttribute('aria-label', 'Personal Information Form');
                profileForm.id = 'personalForm';
                profileForm.addEventListener('submit', validateForm);
                loadExistingProfileData(profileForm);
                containerDiv.appendChild(profileForm);
                profileContainer.appendChild(containerDiv);
                initializeFormValidation();
            } else {
                showErrorInContainer(profileContainer, 'Failed to load profile form');
            }
        })
        .catch(error => {
            showErrorInContainer(profileContainer, error.message || 'An error occurred while loading the profile');
        });
}

function loadExistingProfileData(form) {
    const token = localStorage.getItem('fitnexusToken');
    if (!token) return;

    fetch('/api/profile', {
        method: 'GET',
        headers: { 'x-auth-token': token }
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
                ['fullName', 'dateOfBirth', 'age', 'gender', 'bloodGroup', 'height', 'weight', 'phoneNo', 'address']
                    .forEach(field => {
                        const input = document.getElementById(field.replace(/([A-Z])/g, '-$1').toLowerCase());
                        if (input && data[field]) input.value = data[field];
                    });
            }
        })
        .catch(error => {
            console.error('Error loading profile data:', error);
        });
}

function setFieldError(field, message) {
    clearFieldError(field);
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.id = `${field.id}-error`;
    errorElement.setAttribute('role', 'alert');
    errorElement.textContent = message;
    errorElement.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem;';
    field.parentNode.appendChild(errorElement);
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('input-error');
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector(`#${field.id}-error`);
    if (existingError) existingError.remove();
    field.setAttribute('aria-invalid', 'false');
    field.classList.remove('input-error');
}

function getUserIdFromToken() {
    const token = localStorage.getItem('fitnexusToken');
    if (!token) return null;
    try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload.user?.id || decodedPayload.id || null;
    } catch (error) {
        console.error('Error extracting user ID from token:', error);
        return null;
    }
}

function showErrorPage(contentArea, message) {
    if (contentArea) {
        contentArea.innerHTML = `
            <h1 class="page-title">Error</h1>
            <div class="error-message" role="alert">
                <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                ${message}
            </div>
        `;
    }
}

function showErrorInContainer(container, message) {
    if (container) {
        container.innerHTML = `
            <div class="error-message" role="alert">
                <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                ${message}
            </div>
        `;
    }
}

function initializeFormValidation() {
    const form = document.getElementById('personalForm');
    if (!form) return;

    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    const dobInput = document.getElementById('date-of-birth');
    if (dobInput) {
        dobInput.addEventListener('change', calculateAgeFromDOB);
    }
}

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

function validateForm(event) {
    event.preventDefault();
    let isValid = true;

    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            setFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });

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
            userId: getUserIdFromToken()
        };

        const token = localStorage.getItem('fitnexusToken');
        const form = document.getElementById('personalForm');
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving profile...';
        form.appendChild(loadingIndicator);

        fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
            body: JSON.stringify(profileData)
        })
            .then(response => {
                loadingIndicator.remove();
                if (!response.ok) {
                    throw new Error(`Failed to save profile (Status: ${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                updateSidebarUserName(profileData.fullName);
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.setAttribute('role', 'alert');
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Profile updated successfully!';
                form.parentNode.insertBefore(successMessage, form);
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => successMessage.remove(), 500);
                }, 3000);
            })
            .catch(error => {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message global-error';
                errorMessage.setAttribute('role', 'alert');
                errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message || 'Failed to save profile'}`;
                form.parentNode.insertBefore(errorMessage, form);
                setTimeout(() => {
                    errorMessage.style.opacity = '0';
                    setTimeout(() => errorMessage.remove(), 500);
                }, 5000);
            });
    }
    return isValid;
}

function validateField(input) {
    if (!input) return;
    const fieldId = input.id;
    const value = input.value;
    let isValid = true;
    let errorMessage = '';

    switch (fieldId) {
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
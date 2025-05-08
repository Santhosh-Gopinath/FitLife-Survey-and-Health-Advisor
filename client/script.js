/**
 * FitNexus Dashboard - Modified Script
 * This file combines functionality from both script1 and script2
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('script.js loaded, initializing dashboard');
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
        .then(response => response.ok ? response.json() : null)
        .then(data => data?.fullName && updateSidebarUserName(data.fullName))
        .catch(error => console.error('Error loading profile for sidebar:', error));
}

function updateSidebarUserName(name) {
    const userNameElement = document.querySelector('.user-info h3');
    if (userNameElement && name) userNameElement.textContent = name;
}

function initializeSidebar() {
    const collapseBtn = document.querySelector('.collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    if (!collapseBtn || !sidebar) return;
    
    collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        adjustMainContent();
    });
    
    if (localStorage.getItem('sidebarCollapsed') === 'true') sidebar.classList.add('collapsed');
    adjustMainContent();
    
    const logoutBtn = document.querySelector('.logout a');
    if (logoutBtn) logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('fitnexusToken');
        window.location.href = 'index.html';
    });
}

function adjustMainContent() {
    const mainContent = document.querySelector('.main-content');
    const sidebar = document.querySelector('.sidebar');
    if (!mainContent || !sidebar) return;
    
    const isCollapsed = sidebar.classList.contains('collapsed');
    mainContent.style.marginLeft = isCollapsed ? '70px' : '260px';
    mainContent.style.width = `calc(100% - ${isCollapsed ? '70px' : '260px'})`;
    mainContent.style.boxSizing = 'border-box';
    mainContent.style.backgroundColor = document.body.classList.contains('dark-theme') ? '#1a202c' : '#ffffff';
    mainContent.style.display = 'flex';
    mainContent.style.justifyContent = 'center';
    mainContent.style.alignItems = 'center';
    mainContent.style.minHeight = '100vh';
    console.log('Adjusted main-content:', mainContent.style.marginLeft, mainContent.style.width);
}

function initializeThemeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle input');
    if (!darkModeToggle) return;
    
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
        darkModeToggle.checked = true;
    }
    
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
        adjustMainContent(); // Update main content background on toggle
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
        const page = new URLSearchParams(window.location.search).get('page') || 'profile';
        navItems.forEach(link => {
            link.parentElement.classList.toggle('active', link.getAttribute('data-page') === page);
        });
        loadPageContent(page);
    });
}

async function loadPageContent(page, retryCount = 3) {
    const contentArea = document.querySelector('.main-content');
    if (!contentArea) {
        console.error('Main content area (.main-content) not found');
        return;
    }
    
    contentArea.innerHTML = `
        <div class="content-loader">
            <i class="fas fa-spinner fa-pulse"></i>
            <p>Loading ${page}...</p>
        </div>
    `;
    
    const pageFile = page === 'survey' ? 'take_survey.html' : page === 'results' ? 'result.html' : `${page}.html`;
    
    for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
            console.log(`Fetching ${pageFile}, attempt ${attempt}`);
            const response = await fetch(pageFile);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const html = await response.text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            const content = tempDiv.querySelector('body')?.innerHTML || html;
            contentArea.innerHTML = content;
            
            const scripts = tempDiv.querySelectorAll('script[src]');
            if (scripts.length === 0) {
                console.log(`No scripts in ${pageFile}, initializing page`);
                setTimeout(() => initializePage(page), 100);
            } else {
                let loadedScripts = 0;
                scripts.forEach(script => {
                    const scriptElement = document.createElement('script');
                    scriptElement.src = script.src;
                    scriptElement.async = false;
                    scriptElement.onload = () => {
                        console.log(`Loaded ${script.src}`);
                        if (++loadedScripts === scripts.length) initializePage(page);
                    };
                    scriptElement.onerror = () => console.error(`Failed to load ${script.src}`);
                    document.head.appendChild(scriptElement);
                });
            }
            
            adjustMainContent();
            return;
        } catch (error) {
            console.error(`Attempt ${attempt} failed for ${pageFile}:`, error);
            if (attempt === retryCount) {
                showErrorPage(contentArea, `Failed to load ${page}: ${error.message}`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

function initializePage(page) {
    console.log(`Initializing page: ${page}`);
    const contentArea = document.querySelector('.main-content');
    if (!contentArea) {
        console.error('Main content area not found');
        return;
    }
    
    switch (page) {
        case 'profile':
            loadProfilePage(contentArea);
            break;
        case 'survey':
            if (!window.initializeSurveyPage) {
                showErrorPage(contentArea, 'Survey functionality failed to load: initializeSurveyPage is not defined. Please check script2.js.');
            } else if (!document.getElementById('prediction-form')) {
                showErrorPage(contentArea, 'Survey functionality failed to load: #prediction-form not found.');
            } else {
                window.initializeSurveyPage();
            }
            break;
        case 'results':
            if (!window.loadPredictionResults) {
                showErrorPage(contentArea, 'Results functionality failed to load: loadPredictionResults is not defined. Please check script3.js.');
            } else if (!document.getElementById('predicted-disease')) {
                showErrorPage(contentArea, 'Results functionality failed to load: #predicted-disease not found. Please ensure result.html is correctly configured.');
            } else {
                window.loadPredictionResults();
            }
            break;
        case 'history':
            if (!window.loadPredictionHistory) {
                showErrorPage(contentArea, 'History functionality failed to load: loadPredictionHistory is not defined.');
            } else if (!document.getElementById('history-list')) {
                showErrorPage(contentArea, 'History functionality failed to load: #history-list not found.');
            } else {
                window.loadPredictionHistory();
            }
            break;
        default:
            showErrorPage(contentArea, 'Page not found');
    }
}

function loadProfilePage(contentArea) {
    contentArea.innerHTML = `
        <div class="relative py-6 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
            <div class="relative bg-gradient-to-b from-f9fafb to-white rounded-2xl shadow-xl p-6">
                <div class="flex justify-center mb-6">
                    <div class="bg-green-500 rounded-full h-16 w-16 flex items-center justify-center text-white text-2xl">
                        👤
                    </div>
                </div>
                <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Profile Form</h2>
                <div id="profile-container" class="profile-wrapper" aria-live="polite"></div>
            </div>
        </div>
    `;

    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer) {
        console.error('Profile container not found');
        return;
    }

    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Main Content Styling */
        .main-content {
            background-color: ${document.body.classList.contains('dark-theme') ? '#1a202c' : '#ffffff'};
            padding: 1.5rem;
            overflow: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            transition: background-color 0.3s ease;
        }

        /* Profile Card Styling */
        .bg-gradient-to-b {
            background: linear-gradient(to bottom, #f9fafb, #ffffff);
        }
        .dark-theme .bg-gradient-to-b {
            background: linear-gradient(to bottom, #2d3748, #4a5568);
        }
        .rounded-2xl {
            border-radius: 1rem;
        }
        .shadow-xl {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        .p-6 {
            padding: 1.5rem;
        }

        /* Form Group Styling */
        .form-group {
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
        }
        .form-group label {
            display: inline-block;
            width: 150px;
            font-weight: 600;
            color: ${document.body.classList.contains('dark-theme') ? '#e2e8f0' : '#1a202c'};
            margin-right: 1rem;
        }
        .dark-theme .form-group label {
            color: #e2e8f0;
        }

        /* Form Control Styling */
        .form-control {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid ${document.body.classList.contains('dark-theme') ? '#4a5568' : '#e2e8f0'};
            border-radius: 0.5rem;
            font-size: 1rem;
            line-height: 1.5;
            background-color: #ffffff;
            color: #1a202c;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .form-control:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }
        .dark-theme .form-control {
            border-color: #4a5568;
            color: #1a202c;
        }

        /* Form Control with Icons */
        .form-control-icon {
            position: relative;
        }
        .form-control-icon i {
            position: absolute;
            top: 50%;
            left: 12px;
            transform: translateY(-50%);
            color: ${document.body.classList.contains('dark-theme') ? '#a0aec0' : '#718096'};
        }
        .form-control-icon input,
        .form-control-icon select {
            padding-left: 2.5rem;
            padding-right: 0.75rem;
            border-radius: 0.5rem;
        }

        /* Button Styling */
        .btn {
            display: inline-block;
            font-weight: 600;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border: 1px solid transparent;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
        }
        .btn-primary {
            color: #ffffff;
            background-color: #3b82f6;
            border-color: #2563eb;
        }
        .btn-primary:hover {
            background-color: #2563eb;
            border-color: #1d4ed8;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(59, 130, 246, 0.2);
        }
        .dark-theme .btn-primary {
            background-color: #60a5fa;
        }
        .dark-theme .btn-primary:hover {
            background-color: #3b82f6;
        }

        /* Success and Error Messages */
        .success-message {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        .success-message i {
            margin-right: 0.5rem;
            color: #28a745;
        }
        .error-message {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        .error-message i {
            margin-right: 0.5rem;
            color: #dc3545;
        }
        .input-error {
            border-color: #dc3545 !important;
        }
        .field-error {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        #date-of-birth{
        width:235px;
        }

        #gender{
        width:235px;
        }

        #blood-group{
        width:235px;
        }
    `;
    profileContainer.appendChild(styleElement);

    const form = document.createElement('form');
    form.id = 'personalForm';
    form.setAttribute('aria-label', 'Personal Information Form');
    form.className = 'space-y-6';
    form.addEventListener('submit', validateForm);

    form.innerHTML = `
        <div class="form-group">
            <label for="full-name"><i class="fas fa-user"></i>  Full Name:</label>
            <div class="form-control-icon">
                
                <input type="text" id="full-name" class="form-control" required>
            </div>
        </div>
        
        <div class="form-group">
            <label for="date-of-birth"><i class="fas fa-calendar-alt"></i>  Date of Birth:</label>
            <div class="form-control-icon">
                
                <input type="date" id="date-of-birth" class="form-control" required>
            </div>
        </div>
        
        <div class="form-group">
            <label for="age"><i class="fas fa-birthday-cake"></i>   Age:</label>
            <div class="form-control-icon">
                
                <input type="number" id="age" class="form-control" required>
            </div>
        </div>
        
        <div class="form-group">
            <label for="gender"><i class="fas fa-venus-mars"></i>   Gender:</label>
            <div class="form-control-icon">
                
                <select id="gender" class="form-control" required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="blood-group"><i class="fas fa-tint"></i>    Blood Group:</label>
            <div class="form-control-icon">
                
                <select id="blood-group" class="form-control">
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="height"><i class="fas fa-ruler-vertical"></i>   Height (cm):</label>
            <div class="form-control-icon">
                
                <input type="number" id="height" class="form-control">
            </div>
        </div>
        
        <div class="form-group">
            <label for="weight"><i class="fas fa-weight"></i>   Weight (kg):</label>
            <div class="form-control-icon">
                
                <input type="number" id="weight" class="form-control">
            </div>
        </div>
        
        <div class="form-group">
            <label for="phone-no"><i class="fas fa-phone"></i>  Phone No:</label>
            <div class="form-control-icon">
                
                <input type="tel" id="phone-no" class="form-control">
            </div>
        </div>
        
        <div class="form-group">
            <label for="email"><i class="fas fa-envelope"></i> Email:</label>
            <div class="form-control-icon">
                
                <input type="email" id="email" class="form-control">
            </div>
        </div>
        
        <div class="text-center mt-8">
            <button type="submit" class="btn btn-primary">Save Profile</button>
        </div>
    `;

    profileContainer.appendChild(form);
    loadExistingProfileData(form);
    initializeFormValidation();
}

// [Rest of the functions (loadExistingProfileData, setFieldError, etc.) remain unchanged]
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
                ['fullName', 'dateOfBirth', 'age', 'gender', 'bloodGroup', 'height', 'weight', 'phoneNo', 'email']
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
    contentArea.innerHTML = `
        <div class="relative py-6 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
            <div class="relative bg-white rounded-2xl shadow-xl p-6 text-center">
                <h1 class="text-2xl font-bold text-gray-800 mb-4">Error</h1>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    ${message}
                </div>
            </div>
        </div>
    `;
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
            email: document.getElementById('email').value || '',
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
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
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

window.addEventListener('resize', adjustMainContent);
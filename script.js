// ===== AKAN NAME GENERATOR - GHANA CULTURAL HERITAGE =====

// Akan Names Database
const akanNames = {
    male: {
        sunday: 'Kwasi',
        monday: 'Kwadwo',
        tuesday: 'Kwabena',
        wednesday: 'Kwaku',
        thursday: 'Yaw',
        friday: 'Kofi',
        saturday: 'Kwame'
    },
    female: {
        sunday: 'Akosua',
        monday: 'Adwoa',
        tuesday: 'Abenaa',
        wednesday: 'Akua',
        thursday: 'Yaa',
        friday: 'Afua',
        saturday: 'Ama'
    }
};

// ===== HELPER FUNCTIONS =====

/**
 * Get day of week from date (returns lowercase day name)
 * @param {number} year - Birth year
 * @param {number} month - Birth month (1-12)
 * @param {number} day - Birth day (1-31)
 * @returns {string|null} - Day of week or null if invalid
 */
function getDayOfWeekFromDate(year, month, day) {
    // JavaScript months are 0-indexed, so subtract 1
    const date = new Date(year, month - 1, day);
    
    // Check for invalid date
    if (isNaN(date.getTime())) {
        return null;
    }

    // Verify date components match (prevents overflow like Jan 32)
    if (date.getFullYear() !== year || 
        date.getMonth() !== month - 1 || 
        date.getDate() !== day) {
        return null;
    }

    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 
                      'thursday', 'friday', 'saturday'];
    return weekdays[date.getDay()];
}

/**
 * Get Akan name based on gender and day of week
 * @param {string} gender - 'male' or 'female'
 * @param {string} dayOfWeek - Day of week in lowercase
 * @returns {string|null} - Akan name or null if not found
 */
function getAkanName(gender, dayOfWeek) {
    if (!gender || !dayOfWeek) return null;
    const lowerGender = gender.toLowerCase();
    const lowerDay = dayOfWeek.toLowerCase();
    
    if (lowerGender === 'male') {
        return akanNames.male[lowerDay] || null;
    } else if (lowerGender === 'female') {
        return akanNames.female[lowerDay] || null;
    }
    return null;
}

/**
 * Validate user input
 * @param {string} year - Year input
 * @param {string} month - Month input
 * @param {string} day - Day input
 * @param {string} gender - Selected gender
 * @returns {string|null} - Error message or null if valid
 */
function validateInput(year, month, day, gender) {
    if (!year || !month || !day || !gender) {
        return '❌ Please fill in all fields (year, month, day, and gender).';
    }
    
    const y = Number(year);
    const m = Number(month);
    const d = Number(day);
    
    if (!Number.isInteger(y) || y < 1800 || y > 2100) {
        return '❌ Year must be between 1800 and 2100.';
    }
    if (!Number.isInteger(m) || m < 1 || m > 12) {
        return '❌ Month must be between 1 and 12.';
    }
    if (!Number.isInteger(d) || d < 1 || d > 31) {
        return '❌ Day must be between 1 and 31.';
    }
    
    return null; // No errors
}

/**
 * Display result in the result container
 * @param {string} message - Default message
 * @param {boolean} isSuccess - Whether this is a successful generation
 * @param {string} akanName - Generated Akan name
 * @param {string} dayName - Capitalized day name
 */
function displayResult(message, isSuccess = false, akanName = '', dayName = '') {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;

    let content = `
        <div class="result-content">
            <div class="ghana-flag"></div>
    `;
    
    if (isSuccess && akanName) {
        content += `
            <h3>🎉 Your Akan Name</h3>
            <div class="akan-name-display">${akanName}</div>
            <div class="birthday-info">Born on a ${dayName}</div>
        `;
    } else {
        content += `
            <h3>Your Akan Name Awaits!</h3>
            <p id="resultMessage">${message}</p>
        `;
    }
    
    content += `</div>`;
    resultDiv.innerHTML = content;
}

/**
 * Reset to default view
 */
function resetToDefault() {
    displayResult('Fill out the form to discover your Ghanaian name', false);
}

/**
 * Update copyright year automatically
 */
function updateCopyrightYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ===== EVENT LISTENERS =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set copyright year
    updateCopyrightYear();
    
    // Reset to default view
    resetToDefault();
    
    // Get form element
    const form = document.getElementById('akanForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get input values
            const yearInput = document.getElementById('year');
            const monthInput = document.getElementById('month');
            const dayInput = document.getElementById('day');
            const genderRadios = document.getElementsByName('gender');
            
            // Get selected gender
            let selectedGender = null;
            for (let radio of genderRadios) {
                if (radio.checked) {
                    selectedGender = radio.value;
                    break;
                }
            }
            
            const year = yearInput.value.trim();
            const month = monthInput.value.trim();
            const day = dayInput.value.trim();
            
            // Validate input
            const validationError = validateInput(year, month, day, selectedGender);
            if (validationError) {
                displayResult(validationError, false);
                return;
            }
            
            // Convert to numbers
            const yNum = Number(year);
            const mNum = Number(month);
            const dNum = Number(day);
            
            // Get day of week
            const dayOfWeek = getDayOfWeekFromDate(yNum, mNum, dNum);
            
            if (!dayOfWeek) {
                displayResult('❌ Invalid date! Please enter a valid date (e.g., Feb 29 only in leap years).', false);
                return;
            }
            
            // Get Akan name
            const akanName = getAkanName(selectedGender, dayOfWeek);
            
            if (!akanName) {
                displayResult('⚠️ Could not generate name. Please check your input.', false);
                return;
            }
            
            // Capitalize day name for display
            const dayCapitalized = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
            
            // Display success result
            displayResult('', true, akanName, dayCapitalized);
        });
    }
    
    // Add input validation feedback
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < parseInt(this.min)) {
                this.value = this.min;
            } else if (this.value > parseInt(this.max)) {
                this.value = this.max;
            }
        });
    });
});

// Export for testing (if needed in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        akanNames,
        getDayOfWeekFromDate,
        getAkanName,
        validateInput
    };
}
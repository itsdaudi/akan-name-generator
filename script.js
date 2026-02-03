let userName = prompt("Please enter your name:", "Guest");
if (userName !== null) {
alert("Hello, " + userName + "!");
} else {
alert("You canceled the input.");
}
// Add this test function to help validate your application
function runTestCases() {
    console.log("Running Akan Name Generator Tests...");
    
    const testCases = [
        { day: 25, month: 12, year: 1989, gender: "male", expectedName: "Kwadwo", expectedDay: "Monday" },
        { day: 4, month: 7, year: 2000, gender: "female", expectedName: "Abenaa", expectedDay: "Tuesday" },
        { day: 15, month: 3, year: 1995, gender: "male", expectedName: "Kwaku", expectedDay: "Wednesday" },
        { day: 29, month: 2, year: 2000, gender: "female", expectedName: "Ama", expectedDay: "Tuesday" }, // Leap year
    ];
    
    let passedTests = 0;
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}:`);
        console.log(`Date: ${testCase.month}/${testCase.day}/${testCase.year}, Gender: ${testCase.gender}`);
        
        // Validate the date
        const errors = validateInput(testCase.day, testCase.month, testCase.year, testCase.gender);
        
        if (errors.length > 0) {
            console.log(`❌ Failed validation: ${errors.join(", ")}`);
            return;
        }
        
        // Calculate day of week
        const dayIndex = calculateDayOfWeek(testCase.day, testCase.month, testCase.year);
        const dayName = daysOfWeek[dayIndex];
        
        // Get Akan name
        const akanName = getAkanName(dayIndex, testCase.gender);
        
        // Check if results match expected
        if (akanName === testCase.expectedName && dayName === testCase.expectedDay) {
            console.log(`✅ PASS: Got ${akanName} for ${dayName}`);
            passedTests++;
        } else {
            console.log(`❌ FAIL: Expected ${testCase.expectedName} for ${testCase.expectedDay}`);
            console.log(`   Got ${akanName} for ${dayName}`);
        }
    });
    
    console.log(`\nTest Results: ${passedTests}/${testCases.length} tests passed`);
    
    // Run edge case tests
    console.log("\n--- Edge Case Tests ---");
    
    // Test invalid month
    console.log("\nTest invalid month (13):");
    const monthError = validateInput(15, 13, 2000, "male");
    if (monthError.includes("Month must be between 1 and 12")) {
        console.log("✅ PASS: Correctly rejected invalid month");
    } else {
        console.log("❌ FAIL: Did not catch invalid month");
    }
    
    // Test invalid day
    console.log("\nTest invalid day (32):");
    const dayError = validateInput(32, 5, 2000, "female");
    if (dayError.includes("Day must be between 1 and 31")) {
        console.log("✅ PASS: Correctly rejected invalid day");
    } else {
        console.log("❌ FAIL: Did not catch invalid day");
    }
    
    // Test February 29 in non-leap year
    console.log("\nTest February 29 in non-leap year (2001):");
    const leapYearError = validateInput(29, 2, 2001, "male");
    if (leapYearError.includes("February has at most 28 days")) {
        console.log("✅ PASS: Correctly rejected Feb 29 in non-leap year");
    } else {
        console.log("❌ FAIL: Did not catch invalid Feb 29");
    }
}

// Add this function to initApp to automatically run tests in console
function initApp() {
    // Set current year as max for year input
    setCurrentYearAsMax();
    
    // Set default day and month
    setDefaultDayMonth();
    
    // Add event listener to form
    document.getElementById("akanForm").addEventListener("submit", handleFormSubmit);
    
    // Run test cases in console
    setTimeout(() => {
        console.log("=== Akan Name Generator Testing ===");
        runTestCases();
        console.log("=== End of Tests ===");
    }, 500);
    
    // Add a sample calculation for demonstration
    setTimeout(() => {
        // Pre-select a gender for demo
        document.querySelector('input[name="gender"][value="female"]').checked = true;
        
        // Calculate a sample
        const sampleDay = 4;
        const sampleMonth = 7; // July
        const sampleYear = 2000;
        const sampleGender = "female";
        
        const sampleDayIndex = calculateDayOfWeek(sampleDay, sampleMonth, sampleYear);
        const sampleAkanName = getAkanName(sampleDayIndex, sampleGender);
        
        // Update form fields
        document.getElementById("birthDay").value = sampleDay;
        document.getElementById("birthMonth").value = sampleMonth;
        document.getElementById("birthYear").value = sampleYear;
        
        // Display sample result
        displayResult(sampleDayIndex, sampleGender, sampleAkanName, {
            day: sampleDay,
            month: sampleMonth,
            year: sampleYear
        });
    }, 1000);
}


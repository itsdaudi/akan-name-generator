// script.js - Complete Akan Name Generator

// SUPER SIMPLE TEST VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script is working!");
    
    const form = document.getElementById('akanForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Button clicked!");
        alert("Button is working!");
        
        // Get values
        const year = document.getElementById('birthYear').value;
        const month = document.getElementById('birthMonth').value;
        const day = document.getElementById('birthDay').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        
        // Show in result div
        document.getElementById('result').innerHTML = `
            <div class="result-content">
                <h3>Test Successful!</h3>
                <p>Year: ${year}, Month: ${month}, Day: ${day}, Gender: ${gender}</p>
            </div>
        `;
    });
});
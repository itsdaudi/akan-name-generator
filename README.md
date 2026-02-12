Akan Name Generator
📋 Project Overview
A web application that generates traditional Ghanaian Akan names based on birth date and gender. Akan names are derived from Ghanaian culture where children are given specific names based on the day of the week they were born.

👥 Author
Daudi Kazungu
Moringa School Student
GitHub: itsdaudi

🎯 Project Description
The Akan Name Generator allows users to:

Enter their birth date (day, month, and year)

Select their gender

Calculate their corresponding Akan name using a mathematical formula

Learn about Ghanaian naming traditions

✨ Features
Day Calculation: Uses mathematical formula to determine day of the week

Akan Name Database: Complete list of male and female Akan names

Ghana-Themed Design: Beautiful UI with Ghana flag colors

Input Validation: Ensures valid dates and inputs

Responsive Design: Works on all devices

Interactive Results: Dynamic display of calculated names

🚀 Setup Instructions
Prerequisites
Modern web browser (Chrome, Firefox, Safari, Edge)
📝 Behavior-Driven Development (BDD)
Scenario	Input	Expected Output
Valid date with gender	Year: 1989, Month: 5, Day: 19, Gender: Male	Name: Kofi, Day: Friday
Invalid date (Feb 30)	Year: 2000, Month: 2, Day: 30	Error: Invalid date
No gender selected	Year: 1995, Month: 7, Day: 15	Error: Please select gender
Future year	Year: 2030, Month: 1, Day: 1	Error: Year must be 1900-2024
Invalid month	Year: 2005, Month: 13, Day: 10	Error: Month must be 1-12
🔧 Mathematical Formula
The application uses this formula to calculate day of the week:

text
d = ((CC/4 - 2*CC - 1) + (5*YY/4) + (26*(MM+1)/10) + DD) mod 7
Where:

CC = Century (first two digits of year)

YY = Year in century (last two digits)

MM = Month (adjusted for January/February)

DD = Day of month

mod = Modulus operator 
🛠️ Technologies Used
Frontend
HTML5

CSS3 (Flexbox, Grid)

JavaScript (ES6+)

Tools & Platforms
Git & GitHub

GitHub Pages

VS Code

📁 Project Structure
text
akan-name-generator/
├── index.html          # Main HTML file
├── style.css           # Styling with Ghana theme
├── script.js           # JavaScript logic
├── README.md           # This documentation
└── .gitignore          # Git ignore file
🧪 Testing
Tested with:

Multiple date ranges (1900-2024)

Edge cases (leap years, month boundaries)

Different browsers (Chrome, Firefox, Safari)

Various screen sizes

📞 Contact Information
GitHub: itsdaudi

Repository: akan-name-generator

📄 License & Copyright
© 2024 Daudi Kazungu. All rights reserved.

This project is licensed for educational purposes as part of Moringa School curriculum.

🔗 Live Demo
Live Application: 
https://github.com/itsdaudi/akan-name-generator
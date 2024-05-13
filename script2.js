const colleges = [
    { name: "KMCTCE", location: "Calicut", subject: "Computer Science", gpa: 7.5 },
    { name: "KMCTCE", location: "Calicut", subject: "Civil Engineering", gpa: 7.5 },
    { name: "KMCTCE", location: "Calicut", subject: "Mechanical Engineering", gpa: 7.5 },

    { name: "MDIT", location: "Vadakara", subject: "Computer Science", gpa: 7.5 },
    { name: "MDIT", location: "Vadakara", subject: "Civil Engineering", gpa: 7.5 },
    { name: "MDIT", location: "Vadakara", subject: "Mechanical Engineering", gpa: 7.5 },
    
    { name: "NAM", location: "Peringathoor", subject: "BCOM CA", gpa: 5.5 },
];

const courseDifficulty = {
    "Computer Science": 7.0,
    "Civil Engineering": 7.0,
    "Mechanical Engineering": 7.0,
    "BCOM CA": 5.0,
};

function recommendColleges() {
    const gpa = parseFloat(document.getElementById("gpa").value);
    const location = document.getElementById("location").value.toLowerCase();
    const subjects = document.getElementById("subject").value.toLowerCase().split(",").map(s => s.trim());

    const recommendations = colleges.filter(college => {
        const courseDifficultyLevel = courseDifficulty[college.subject];
        if (courseDifficultyLevel && gpa < courseDifficultyLevel) {
            return false; // Skip this course if GPA is lower than the difficulty level
        }
        return college.location.toLowerCase().includes(location) && subjects.some(subj => college.subject.toLowerCase().includes(subj));
    });

    displayRecommendations(recommendations);
}   
function displayRecommendations(recommendations) {
    const suggestions = recommendations.map(college => college.subject);
    const popUpContent = `
        <h2>Recommendations</h2>
        <table>
            <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Subject</th>
                <th>GPA</th>
            </tr>
            ${recommendations.map(college => `
                <tr>
                    <td>${college.name}</td>
                    <td>${college.location}</td>
                    <td>${college.subject}</td>
                    <td>${college.gpa}</td>
                </tr>
            `).join("")}
        </table>
        <h2>Suggestions</h2>
        <p>${suggestions.join(", ")}</p>
    `;

    const popUpWindow = window.open("", "Recommendations", "width=600,height=400");
    popUpWindow.document.body.innerHTML = popUpContent;
}
const recommendations = colleges.filter(college => college.gpa >= 7.0);
displayRecommendations(recommendations);
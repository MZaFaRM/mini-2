// const colleges = [
//     { name: "KMCTCE", location: "Calicut", subject: "Computer Science", gpa: 7.5 },
//     { name: "KMCTCE", location: "Calicut", subject: "Civil Engineering", gpa: 7.5 },
//     { name: "KMCTCE", location: "Calicut", subject: "Mechanical Engineering", gpa: 7.5 },

//     { name: "MDIT", location: "Vadakara", subject: "Computer Science", gpa: 7.5 },
//     { name: "MDIT", location: "Vadakara", subject: "Civil Engineering", gpa: 7.5 },
//     { name: "MDIT", location: "Vadakara", subject: "Mechanical Engineering", gpa: 7.5 },

//     { name: "NAM", location: "Peringathoor", subject: "BCOM CA", gpa: 5.5 },
// ];

import { colleges } from "./data.js";

const courseDifficulty = {
  "Computer Science": 7.0,
  "Civil Engineering": 7.0,
  "Mechanical Engineering": 7.0,
  "BCOM CA": 5.0,
};

window.recommendColleges = function () {
  const gpa = parseFloat(document.getElementById("gpa").value);
  const location = document.getElementById("location").value.toLowerCase();
  const subjects = document
    .getElementById("subject")
    .value.toLowerCase()
    .split(",")
    .map((s) => s.trim());

  const recommendations = colleges.filter((college) => {
    const courseDifficultyLevel = courseDifficulty[college.subject];
    if (
      (courseDifficultyLevel && gpa < courseDifficultyLevel) ||
      college.gpa > gpa
    ) {
      return false; // Skip this course if GPA is lower than the difficulty level
    }
    return (
      college.location.toLowerCase().includes(location) &&
      subjects.some((subj) => college.subject.toLowerCase().includes(subj))
    );
  });

  displayRecommendations(recommendations);
};

function displayRecommendations(recommendations) {
  const suggestions = recommendations.map((college) => college.subject);
  const popUpContent = `
        <table>
            <tr>
                <th>College Name</th>
                <th>Location</th>
                <th>Subject</th>
                <th>GPA</th>
            </tr>
            ${recommendations
              .map(
                (college) => `
                <tr>
                    <td>${college.name}</td>
                    <td>${college.location}</td>
                    <td>${college.subject}</td>
                    <td>${college.gpa}</td>
                </tr>
            `
              )
              .join("")}
        </table>
        <h2>Suggestions</h2>
        <p>${suggestions.join(", ")}</p>
    `;

  let recommendationsDiv = document.querySelector("h2");
  let { parentElement } = recommendationsDiv;

  const oldDiv = document.getElementById("recommendations-div");

  if (oldDiv) {
    oldDiv.remove();
  }

  let newDiv = document.createElement("div");
  newDiv.id = "recommendations-div";

  newDiv.innerHTML = popUpContent;

  parentElement.appendChild(newDiv);
}

const recommendations = colleges.filter((college) => college.gpa >= 7.0);
displayRecommendations(recommendations);

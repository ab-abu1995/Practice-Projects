// Define your projects here
const projects = [
  { name: "Calculator", path: "js/calculator.html", section: "js" },
  { name: "Student Manager", path: "js/student-manager.html", section: "js" },
  { name: "React Counter", path: "react/react-counter.html", section: "react" },
  { name: "Tailwind Demo", path: "css/tailwind-demo.html", section: "css" }
];

// Function to add projects dynamically
function addProjects() {
  projects.forEach(project => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = project.path;
    link.textContent = project.name;
    li.appendChild(link);

    if (project.section === "js") {
      document.getElementById("js-list").appendChild(li);
    } else if (project.section === "react") {
      document.getElementById("react-list").appendChild(li);
    } else if (project.section === "css") {
      document.getElementById("css-list").appendChild(li);
    }
  });
}

// Run the function
addProjects();

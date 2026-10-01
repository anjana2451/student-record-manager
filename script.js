// Student data
const students = [
    {
        name: "Anjana E S",
        course: "CSE",
        marks: 92,
        muid: "anjanaes@mulearn"
    },
    {
        name: "Aiswarya",
        course: "ECE",
        marks: 85,
        muid: "MUID002"
    },
    {
        name: "Amritha",
        course: "CSE",
        marks: 78,
        muid: "MUID003"
    },
    {
        name: "Alan",
        course: "EEE",
        marks: 88,
        muid: "MUID004"
    },
    {
        name: "Abhi",
        course: "ME",
        marks: 74,
        muid: "MUID005"
    },
    {
        name: "Rahul",
        course: "CSE",
        marks: 95,
        muid: "MUID006"
    }
];


// Get HTML elements
const searchInput = document.getElementById("search");
const courseFilter = document.getElementById("courseFilter");
const marksFilter = document.getElementById("marksFilter");
const sortSelect = document.getElementById("sort");

const studentList = document.getElementById("studentList");

const totalStudents = document.getElementById("totalStudents");
const averageMarks = document.getElementById("averageMarks");
const topper = document.getElementById("topper");


// Display students
function displayStudents(studentData) {

    studentList.innerHTML = "";

    if (studentData.length === 0) {

        studentList.innerHTML = `
            <div class="no-results">
                <p>No students found.</p>
            </div>
        `;

        updateStats([]);

        return;
    }


    studentData.forEach(student => {

        const card = document.createElement("article");

        card.className = "student-card";

        card.innerHTML = `
            <h3>${student.name}</h3>

            <p>
                <strong>Course:</strong>
                ${student.course}
            </p>

            <p class="marks">
                Marks: ${student.marks}
            </p>

            <p>
                <strong>μID:</strong>
                ${student.muid}
            </p>
        `;

        studentList.appendChild(card);
    });


    updateStats(studentData);
}


// Filter and search students
function filterStudents() {

    const searchValue = searchInput.value.toLowerCase().trim();

    const selectedCourse = courseFilter.value;

    const minimumMarks =
        Number(marksFilter.value) || 0;


    let filteredStudents = students.filter(student => {

        const matchesName =
            student.name.toLowerCase().includes(searchValue);

        const matchesCourse =
            selectedCourse === "all" ||
            student.course === selectedCourse;

        const matchesMarks =
            student.marks >= minimumMarks;


        return matchesName &&
               matchesCourse &&
               matchesMarks;
    });


    sortStudents(filteredStudents);
}


// Sort students
function sortStudents(studentData) {

    const sortValue = sortSelect.value;

    if (sortValue === "nameAsc") {

        studentData.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    } else if (sortValue === "nameDesc") {

        studentData.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    } else if (sortValue === "marksAsc") {

        studentData.sort((a, b) =>
            a.marks - b.marks
        );

    } else if (sortValue === "marksDesc") {

        studentData.sort((a, b) =>
            b.marks - a.marks
        );
    }


    displayStudents(studentData);
}


// Calculate statistics
function updateStats(studentData) {

    // Total students
    const total = studentData.length;

    totalStudents.textContent = total;


    if (total === 0) {

        averageMarks.textContent = "0";

        topper.textContent = "-";

        return;
    }


    // Calculate average using reduce()
    const totalMarks = studentData.reduce(
        (sum, student) => sum + student.marks,
        0
    );

    const average =
        totalMarks / total;

    averageMarks.textContent =
        average.toFixed(2);


    // Find topper using reduce()
    const topStudent = studentData.reduce(
        (top, student) =>
            student.marks > top.marks ? student : top
    );


    topper.textContent =
        `${topStudent.name} (${topStudent.marks})`;
}


// Event listeners
searchInput.addEventListener(
    "input",
    filterStudents
);

courseFilter.addEventListener(
    "change",
    filterStudents
);

marksFilter.addEventListener(
    "input",
    filterStudents
);

sortSelect.addEventListener(
    "change",
    filterStudents
);


// Initial display
displayStudents(students);
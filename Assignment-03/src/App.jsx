import { useState } from "react";
import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import AddStudentForm from "./components/AddStudentForm";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Aman", score: 75 },
    { id: 2, name: "Priya", score: 38 },
    { id: 3, name: "Rahul", score: 52 },
  ]);

  function addStudent(name, score) {
    const newStudent = {
      id: Date.now(),
      name: name,
      score: Number(score),
    };

    setStudents([...students, newStudent]);
  }

  function updateScore(id, newScore) {
    const changedStudents = students.map((student) => {
      if (student.id === id) {
        return { ...student, score: Number(newScore) };
      }

      return student;
    });

    setStudents(changedStudents);
  }

  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  return (
    <div className="app">
      <Header />

      <main className="container">
        <AddStudentForm addStudent={addStudent} />
        <StudentTable
          students={students}
          updateScore={updateScore}
          deleteStudent={deleteStudent}
        />
      </main>
    </div>
  );
}

export default App;

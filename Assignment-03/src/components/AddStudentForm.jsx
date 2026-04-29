import { useState } from "react";

function AddStudentForm({ addStudent }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "" || score === "") {
      alert("Please enter student name and score");
      return;
    }

    addStudent(name, score);
    setName("");
    setScore("");
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Add New Student</h2>

      <input
        type="text"
        placeholder="Student name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="number"
        placeholder="Score"
        min="0"
        max="100"
        value={score}
        onChange={(event) => setScore(event.target.value)}
      />

      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;

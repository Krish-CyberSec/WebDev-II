function StudentRow({ student, updateScore, deleteStudent }) {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.score}</td>
      <td>
        <input
          type="number"
          min="0"
          max="100"
          value={student.score}
          onChange={(event) => updateScore(student.id, event.target.value)}
        />
      </td>
      <td>
        <span className={student.score >= 40 ? "pass" : "fail"}>
          {student.score >= 40 ? "Pass" : "Fail"}
        </span>
      </td>
      <td>
        <button className="delete-btn" onClick={() => deleteStudent(student.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default StudentRow;

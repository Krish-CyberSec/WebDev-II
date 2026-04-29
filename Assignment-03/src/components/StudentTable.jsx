import StudentRow from "./StudentRow";

function StudentTable({ students, updateScore, deleteStudent }) {
  return (
    <div className="table-box">
      <h2>Student List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Update Score</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              updateScore={updateScore}
              deleteStudent={deleteStudent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;

import { useState } from "react";

const BRANCHES = ["CSE", "IT", "ECE", "EEE", "ME", "CE", "AIDS", "AIML", "Other"];

export default function AddStudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [branch, setBranch] = useState("");
  const [score, setScore] = useState("");
  const [err, setErr] = useState("");

  function submit() {
    const n = name.trim();
    const r = rollNo.trim();
    const b = branch.trim();
    const s = parseInt(score, 10);

    if (!n) return setErr("Student name is required.");
    if (!r) return setErr("Roll number is required.");
    if (!b) return setErr("Please select a branch.");
    if (score === "" || Number.isNaN(s) || s < 0 || s > 100) {
      return setErr("Score must be between 0 and 100.");
    }

    onAdd(n, r, b, s);
    setName("");
    setRollNo("");
    setBranch("");
    setScore("");
    setErr("");
  }

  const onKey = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-head-icon">+</div>
        <span className="card-title">Add New Student</span>
      </div>
      <div className="form-body">
        <div className="form-row">
          <div className="form-field">
            <label className="field-label">Full Name</label>
            <input
              className="field-input"
              type="text"
              placeholder="e.g. Priya Sharma"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErr("");
              }}
              onKeyDown={onKey}
            />
          </div>
          <div className="form-field narrow">
            <label className="field-label">Roll No.</label>
            <input
              className="field-input"
              type="text"
              placeholder="e.g. 2301CS042"
              value={rollNo}
              onChange={(e) => {
                setRollNo(e.target.value);
                setErr("");
              }}
              onKeyDown={onKey}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="field-label">Branch / Program</label>
            <select
              className="field-input field-select"
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
                setErr("");
              }}
            >
              <option value="">Select branch</option>
              {BRANCHES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field narrow">
            <label className="field-label">Score (0-100)</label>
            <input
              className="field-input"
              type="number"
              placeholder="e.g. 75"
              min="0"
              max="100"
              value={score}
              onChange={(e) => {
                setScore(e.target.value);
                setErr("");
              }}
              onKeyDown={onKey}
            />
          </div>
          <button className="btn-primary" onClick={submit}>Add Student</button>
        </div>

        {err && <div className="form-error">{err}</div>}
      </div>
    </div>
  );
}

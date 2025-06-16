import React, { useState, useEffect } from "react";
import "./RentForm.css";

function RentForm() {
  const [formData, setFormData] = useState({
    date: "",
    tenant: "",
    amount: "",
    notes: "",
  });

  const [entries, setEntries] = useState([]);

  const API_BASE = "/api";

  useEffect(() => {
    fetch(`${API_BASE}/rent-entries`)
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/rent-entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save entry");
        return res.json();
      })
      .then((newEntry) => {
        setEntries([...entries, newEntry]);
        setFormData({ date: "", tenant: "", amount: "", notes: "" });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="rent-container">
      <h2 className="heading">Welcome, Admin!</h2>

      <div className="content-row">
        <div className="form-section">
          <h3>Enter Rent Details</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="tenant"
              placeholder="Tenant Name"
              value={formData.tenant}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount Received"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
            />
            <button type="submit">Save Entry</button>
          </form>
        </div>

        <div className="table-section">
          <h4>Past Entries</h4>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Tenant</th>
                <th>Amount</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.tenant}</td>
                  <td>₹{entry.amount}</td>
                  <td>{entry.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RentForm;

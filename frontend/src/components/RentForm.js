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

  // Dummy data
  const dummyData = [
    {
      date: "2025-06-01",
      tenant: "Rohit Sharma",
      amount: "12000",
      notes: "Paid in full",
    },
    {
      date: "2025-06-05",
      tenant: "Nikhil Tayade",
      amount: "10000",
      notes: "Late payment",
    },
    {
      date: "2025-06-10",
      tenant: "Ali Shaikj",
      amount: "11000",
      notes: "Advance for July",
    },
  ];

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("rentEntries"));
    if (savedEntries && savedEntries.length > 0) {
      setEntries(savedEntries);
    } else {
      setEntries(dummyData);
      localStorage.setItem("rentEntries", JSON.stringify(dummyData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...formData };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("rentEntries", JSON.stringify(updatedEntries));
    setFormData({ date: "", tenant: "", amount: "", notes: "" });
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

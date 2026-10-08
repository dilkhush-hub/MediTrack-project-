import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

function App() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );

  const [patientName, setPatientName] = useState(
    localStorage.getItem("patientName") || ""
  );

  const [department, setDepartment] = useState(
    localStorage.getItem("department") || "General Medicine"
  );

  const [doctor, setDoctor] = useState(
    localStorage.getItem("doctor") || "Dr. Mannu"
  );

  const [cancelled, setCancelled] = useState(false);
  const [peopleAhead, setPeopleAhead] = useState(10);
  const [nowServing, setNowServing] = useState(1);
  const [medicines, setMedicines] = useState(
  JSON.parse(localStorage.getItem("medicines")) || []);
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [timing, setTiming] = useState("Morning");
  const [duration, setDuration] = useState("");

  // Save data in localStorage
  useEffect(() => {
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("patientName", patientName);
  localStorage.setItem("department", department);
  localStorage.setItem("doctor", doctor);
}, [token, patientName, department, doctor]);

useEffect(() => {
  localStorage.setItem("medicines", JSON.stringify(medicines));
}, [medicines]);

  // Join Queue
 // Join Queue
function joinQueue() {
  setCancelled(false);

  setToken((prev) => {
    const newToken = prev ? prev + 1 : 1;

    // Token number = Patients Ahead
    setPeopleAhead(newToken);

    return newToken;
  });
}

  // Cancel Queue
  function cancelQueue() {
    setToken(null);
    setCancelled(true);
  }

  // Next Patient
  function nextPatient() {
    setNowServing((prev) => prev + 1);

    setPeopleAhead((prev) => {
      if (prev <= 0) {
        return 0;
      }

      return prev - 1;
    });
  }
  function addMedicine() {
  if (!medicineName || !dosage || !duration) {
    alert("Please fill all medicine details");
    return;
  }

  const newMedicine = {
    id: Date.now(),
    name: medicineName,
    dosage: dosage,
    timing: timing,
    duration: duration,
  };

  setMedicines((prev) => [...prev, newMedicine]);

  setMedicineName("");
  setDosage("");
  setTiming("Morning");
  setDuration("");
}

function deleteMedicine(id) {
  setMedicines((prev) =>
    prev.filter((medicine) => medicine.id !== id)
  );
}

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>🏥 Smart Hospital</h1>
        <p>QR Based Live Queue Management System</p>
      </header>

      <main className="container">

        {/* Booking Card */}
        <div className="card">
          <h2>Book Your Queue</h2>

          <label>Patient Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />

          <label>Department</label>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option>General Medicine</option>
            <option>Cardiology</option>
            <option>Orthopedic</option>
            <option>Dental</option>
            <option>ENT SPECIALIST</option>
            <option>Neurologist</option>
            <option>Psychiatrist</option>
          </select>

          <label>Doctor</label>

          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option>Dr. Mannu</option>
            <option>Dr. Amit</option>
            <option>Dr. Dilkhush</option>
            <option>Dr. Shubham</option>
            <option>Dr. Riyansh</option>
            <option>Dr. Sarthak</option>
          </select>

          <button onClick={joinQueue}>
            Join Queue
          </button>

          {/* Patient Queue Details */}
          {token && (
            <div className="queue">

              <h2>Your Token</h2>

              <div className="token">
                A-{String(token).padStart(3, "0")}
              </div>

              <p>
                Patient Name: <b>{patientName}</b>
              </p>

              <p>
                Department: <b>{department}</b>
              </p>

              <p>
                Doctor: <b>{doctor}</b>
              </p>

              <p>
                Patients Ahead: <b>{peopleAhead}</b>
              </p>

              <p>
                Estimated Wait:{" "}
                <b>{peopleAhead * 5} Minutes</b>
              </p>

              <p className="live">
                🟢 Queue is Live
              </p>

              <button onClick={cancelQueue}>
                Cancel Queue
              </button>

            </div>
          )}

          {/* Cancelled Message */}
          {cancelled && (
            <div className="queue">

              <h2>❌ Queue Cancelled</h2>

              <p>
                Your queue has been cancelled successfully.
              </p>

              <button onClick={joinQueue}>
                Join Queue Again
              </button>

            </div>
          )}

        </div>

        {/* Live Queue Dashboard */}
        <div className="card dashboard">

          <h2>📊 Live Queue Dashboard</h2>

          <div className="dashboard-box">

            {/* Now Serving */}
            <div className="dashboard-item">
              <span>🩺 Now Serving</span>
              <strong>
                A-{String(nowServing).padStart(3, "0")}
              </strong>
            </div>

            {/* Your Token */}
            <div className="dashboard-item">
              <span>🎫 Your Token</span>
              <strong>
                {token
                  ? `A-${String(token).padStart(3, "0")}`
                  : "--"}
              </strong>
            </div>

            {/* Patients Ahead */}
            <div className="dashboard-item">
              <span>👥 Patients Ahead</span>
              <strong>
                {token ? peopleAhead : "--"}
              </strong>
            </div>

            {/* Estimated Wait */}
            <div className="dashboard-item">
              <span>⏱ Estimated Wait</span>
              <strong>
                {token ? `${peopleAhead * 5} Min` : "--"}
              </strong>
            </div>

          </div>

          {/* Queue Live */}
          <p className="live">
            🟢 Queue is Live
          </p>

          {/* Next Patient */}
          <button
            onClick={nextPatient}
            className="next-patient-btn"
          >
            Next Patient
          </button>

        </div>
                {/* Medicine Tracker */}
        <div className="card medicine-card">

          <h2>💊 Medicine Tracker</h2>

          <label>Medicine Name</label>

          <input
            type="text"
            placeholder="Enter medicine name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />

          <label>Dosage</label>

          <input
            type="text"
            placeholder="e.g. 1 Tablet"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />

          <label>Timing</label>

          <select
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
          >
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Night</option>
            <option>Morning & Night</option>
          </select>

          <label>Duration</label>

          <input
            type="text"
            placeholder="e.g. 5 Days"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <button onClick={addMedicine}>
            ➕ Add Medicine
          </button>

          {/* Medicine List */}
          {medicines.length > 0 && (
            <div className="medicine-list">

              <h3>📋 Prescribed Medicines</h3>

              {medicines.map((medicine) => (
                <div
                  className="medicine-item"
                  key={medicine.id}
                >

                  <h3>💊 {medicine.name}</h3>

                  <p>
                    <b>Dosage:</b> {medicine.dosage}
                  </p>

                  <p>
                    <b>Timing:</b> {medicine.timing}
                  </p>

                  <p>
                    <b>Duration:</b> {medicine.duration}
                  </p>

                  <button
                    onClick={() => deleteMedicine(medicine.id)}
                  >
                    🗑️ Delete
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* QR Card */}
        <div className="card qr-card">

          <h2>📱 Scan QR Code</h2>

          <div className="qr-box">

            <QRCodeCanvas
              value="http://10.79.125.160:5174/"
              size={200}
            />

          </div>

          <p>
            Scan this QR code to join the hospital queue.
          </p>

        </div>

      </main>

    </div>
  );
}

export default App;
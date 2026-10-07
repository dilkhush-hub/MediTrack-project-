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

  
  useEffect(() => {
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("patientName", patientName);
  localStorage.setItem("department", department);
  localStorage.setItem("doctor", doctor);
}, [token, patientName, department, doctor]);

  function joinQueue() {
    setCancelled(false);

    setToken((prev) => {
      if (prev) {
        return prev + 1;
      }
      return 1;
    });

    setPeopleAhead(10);
  }

  function cancelQueue() {
    setToken(null);
    setCancelled(true);
  }
   function nextPatient() {
  setNowServing((prev) => prev + 1);

  setPeopleAhead((prev) => {
    if (prev <= 0) {
      return 0;
    }
    return prev - 1;
  });
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

            <div className="dashboard-item">
              <span>🩺 Now Serving</span>
              <strong>
                A-{String(nowServing).padStart(3, "0")}
              </strong>
            </div>

            <div className="dashboard-item">
              <span>🎫 Your Token</span>
              <strong>
                {token
                  ? `A-${String(token).padStart(3, "0")}`
                  : "--"}
              </strong>
            </div>

            <div className="dashboard-item">
              <span>👥 Patients Ahead</span>
              <strong>{token ? peopleAhead : "--"}</strong>
            </div>
            <button onClick={nextPatient} className="next-patient-btn">
            Next Patient
            </button>

            <div className="dashboard-item">
              <span>⏱ Estimated Wait</span>
              <strong>
                {token ? `${peopleAhead * 5} Min` : "--"}
              </strong>
            </div>

          </div>

          <p className="live">
            🟢 Queue is Live
          </p>

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
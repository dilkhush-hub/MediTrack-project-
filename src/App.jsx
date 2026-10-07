import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [department, setDepartment] = useState("General Medicine");
  const [doctor, setDoctor] = useState("Dr. Mannu");
  const [cancelled, setCancelled] = useState(false);
  const [peopleAhead, setPeopleAhead] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setPeopleAhead((prev) => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  function joinQueue() {
    setCancelled(false);
    setToken((prev) => (prev ? prev + 1 : 1));
  }

  function cancelQueue() {
    setToken(null);
    setCancelled(true);
  }

  return (
    <div className="app">

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
                Estimated Wait: <b>{peopleAhead * 5} Minutes</b>
              </p>

              <p className="live">
                🟢 Queue is Live
              </p>

              <button onClick={cancelQueue}>
                Cancel Queue
              </button>
            </div>
          )}

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

        {/* QR Card */}
        <div className="card qr-card">
          <h2>📱 Scan QR Code</h2>

          <div className="qr-box">
            <QRCodeCanvas
              value="http://10.195.7.160:5174/"
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
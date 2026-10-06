import { useState,useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const[peopleAhead ,setpeopleAhead] = useState (5);
  
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
    setToken (Math.floor(Math.random() * 50) + 1);
  }

  return (
    <div className="app">

      <header className="header">
        <h1>🏥 Smart Hospital</h1>
        <p>QR Based Live Queue Management System</p>
      </header>

      <main className="container">

        <div className="card">
          <h2>Book Your Queue</h2>

          <label>Department</label>

          <select>
            <option>General Medicine</option>
            <option>Cardiology</option>
            <option>Orthopedic</option>
            <option>Dental</option>
            <option>ENT SPECIALIST</option>
            <option>Neurologist</option>
            <option>phychiatrist</option>
        
          </select>

          <label>Doctor</label>

          <select>
            <option>Dr.MANNU</option>
            <option>Dr.AMIT</option>
            <option>Dr.DILKHUSH</option>
            <option>Dr.SHUBHAM</option>
            <option>Dr.RIYANSH</option>
            <option>Dr.SARTHAK</option>
          </select>

          <button onClick={joinQueue}>
            Join Queue
          </button>

          {token && (
            <div className="queue">
              <h2>Your Token</h2>

              <div className="token">
                A-{token}
              </div>

              <p>
                Patients Ahead: <b>7</b>
              </p>

              <p>
                Estimated Wait:{peopleAhead *5} Minutes
              </p>

              <p className="live">
                🟢 Queue is Live
              </p>
            </div>
          )}
        </div>

        <div className="card qr-card">
          <h2>📱 Scan QR Code</h2>

          <div className="qr-box">
            <QRCodeCanvas
             value="http://10.79.125.160:5173/"
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
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaStickyNote } from 'react-icons/fa';
import TAttendanceGraph from './TA-graph';
import TopStudentsChart from './TSgraph';

function TDashboard() {
  

  return (
    <main className="main-dashboard">
      <div className="dashboard">
        <div className="card red">
          <div className="icon"><FaUserGraduate /></div>
          <div className="title">Add Assginments</div>
        </div>
        <div className="card blue">
          <div className="icon"><FaChalkboardTeacher /></div>
          <div className="title">Add Schedule</div>
        </div>
        <div className="card gray">
          <div className="icon"><FaBook /></div>
          <div className="title">Take Attendance</div>
        </div>
        <div className="card pink">
          <div className="icon"><FaStickyNote /></div>
          <div className="title">Attendance Details</div>
        </div>
      </div>
      <section className="charts-section">
        <div className="chart">
          <h3>Attendance Performance</h3>
          <TAttendanceGraph />
        </div>
        <div className="chart">
          <h3><h2>Assignments and Marks</h2></h3>
          <TopStudentsChart />
        </div>
      </section>
    </main>
  );
}

export default TDashboard;

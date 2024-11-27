import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import '../styles/Dashboard.css';
import logo from '../styles/img/faz-drill-logo3.png';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="brand">
          <img src={logo} alt="Brand Logo" />
        </div>
        <ul className="menu">
          <li className="active">Dashboard</li>
          <li className="report-link">
            <Link to="/daily-drilling-report" className="report-link"> {/* Wrap entire li with the Link */}
              Daily Drilling Report
            </Link>
          </li>
          <li>Message</li>
          <li>Help</li>
          <li>Settings</li>
          <li>Password</li>
          <li>Sign Out</li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <input type="text" className="search-bar" placeholder="Search here" />
          <div className="profile-pic"></div>
        </header>

        <section className="cards">
          <div className="card">1,504<br />Daily Views</div>
          <div className="card">80<br />Sales</div>
          <div className="card highlight">284<br />Comments</div>
          <div className="card">$7,842<br />Earnings</div>
        </section>

        <section className="charts">
          <div className="chart pie-chart">
            {/* Pie Chart Example */}
            <Pie data={{
              labels: ['Red', 'Blue', 'Yellow'],
              datasets: [{
                data: [300, 50, 100],
                backgroundColor: ['#FF0000', '#0000FF', '#FFFF00'],
              }],
            }} />
          </div>
          <div className="chart bar-chart">
            {/* Bar Chart Example */}
            <Bar data={{
              labels: ['January', 'February', 'March', 'April'],
              datasets: [{
                label: 'Sales',
                data: [65, 59, 80, 81],
                backgroundColor: '#4caf50',
              }],
            }} />
          </div>
        </section>

        <section className="orders">
          <div className="orders-section">
            <h3>Recent Orders</h3>
            <table>
              <thead>
                <tr><th>Name</th><th>Price</th><th>Payment</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td>Star Refrigerator</td><td>$1200</td><td>Paid</td><td>Delivered</td></tr>
              </tbody>
            </table>
          </div>
          <div className="customers-section">
            <h3>Recent Customers</h3>
            <ul>
              <li>David - Italy</li>
              <li>Muhammad</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

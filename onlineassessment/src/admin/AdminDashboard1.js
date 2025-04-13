import React from "react";

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">Admin Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Users</div>
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">150</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Orders</div>
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text">320</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Revenue</div>
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <p className="card-text">$12,500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
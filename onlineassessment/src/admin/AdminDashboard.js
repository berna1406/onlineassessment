import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";  // Bootstrap import
import './styles.css'

const AdminDashboard = () => {
  const sidebarLinks = [
    { to: "/", label: "Home" },
    { to: "/manage-users", label: "Manage Users" },
    { 
      to: "#", 
      label: "Manage Questions", 
      subLinks: [
        { to: "/add-question", label: "Add Question" },
        { to: "/edit-question", label: "Edit Question" },
        { to: "/delete-question", label: "Delete Question" },
        { to: "/view-questions", label: "View Questions" }
      ]
    },
    { to: "/manage-assessments", label: "Manage Assessments" },
    { to: "/manage-results", label: "Manage Results" },
    { to: "/logout", label: "Logout" },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-white"
        style={{ width: "200px" }}
      >
        <div className="p-4">
          <h3 className="text-lg">Admin Panel</h3>
        </div>
        <nav className="nav flex-column">
          {sidebarLinks.map((link) => (
            link.subLinks ? (
              <div key={link.to} className="position-relative">
                {/* Main Link */}
                <a
                  href={link.to}
                  className="nav-link text-white p-3"
                  activeClassName="active"
                >
                  {link.label}
                </a>
                {/* Sub Links under "Manage Questions" */}
                <div className="ms-3 sub-links">
                  {link.subLinks.map((subLink) => (
                    <a
                      key={subLink.to}
                      href={subLink.to}
                      className="nav-link text-white"
                      activeClassName="active"
                    >
                      {subLink.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.to}
                href={link.to}
                className="nav-link text-white p-3"
                activeClassName="active"
              >
                {link.label}
              </a>
            )
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 container mt-4">
        <h2 className="text-center text-primary">Admin Dashboard</h2>
        <div className="row mt-4">
          {/* Users Card */}
          <div className="col-md-4">
            <div className="card bg-success text-white mb-3">
              <div className="card-header">Users</div>
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">150</p>
              </div>
            </div>
          </div>
          {/* Orders Card */}
          <div className="col-md-4">
            <div className="card bg-info text-white mb-3">
              <div className="card-header">Orders</div>
              <div className="card-body">
                <h5 className="card-title">Total Orders</h5>
                <p className="card-text">320</p>
              </div>
            </div>
          </div>
          {/* Revenue Card */}
          <div className="col-md-4">
            <div className="card bg-danger text-white mb-3">
              <div className="card-header">Revenue</div>
              <div className="card-body">
                <h5 className="card-title">Total Revenue</h5>
                <p className="card-text">$12,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

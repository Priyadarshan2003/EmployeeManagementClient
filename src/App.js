import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    email: "",
    phoneNumber: "",
    department: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const newEmployee = await response.json();
    setEmployees([...employees, newEmployee]);
    setFormData({
      name: "",
      age: "",
      position: "",
      email: "",
      phoneNumber: "",
      department: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/api/employees");
      const employeeData = await response.json();
      console.log("Employee Data:", employeeData);
      setEmployees(employeeData);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="mt-3">Employee Management System</h1>

      <form className="my-3" onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
                <label>Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Age:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Position:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Email:</label>
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Phone Number:</label>
              </td>
              <td>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Department:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" className="btn btn-primary">
          Add Employee
        </button>
      </form>

      <h2 className="mt-5">Employee List</h2>
      <table className="mt-5 table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.position}</td>
              <td>{employee.email}</td>
              <td>{employee.phonenumber}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

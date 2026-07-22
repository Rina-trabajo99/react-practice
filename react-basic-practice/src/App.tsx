import { useState } from "react";
import "./App.css";
import checkIcon from "./assets/check.png";
import failedIcon from "./assets/failed.png";

type Employee = {
  id: number;
  name: string;
  department: string;
  overtimeHours: number;
};

type HeaderProps = {
  title: string;
};
function Header({ title }: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

type EmployeeFormProps = {
  name: string;
  department: string;
  overtimeHours: string;
  onChangeName: (inputName: string) => void;
  onChangeDepartment: (inputDepartment: string) => void;
  onChangeOvertimeHours: (inputOvertimeHours: string) => void;
  onAdd: () => void;
  errorMsg: string;
  successMsg: string;
};
function EmployeeForm(props: EmployeeFormProps) {
  return (
    <section className="input-section">
      <h2>Add New Employee</h2>
      <div className="input-area">
        <div className="input-item">
          <label htmlFor="name">Employee Name</label>
          <input
            type="text"
            id="name"
            value={props.name}
            onChange={(e) => props.onChangeName(e.target.value)}
            placeholder="Enter employee name"
          />
        </div>
        <div className="input-item">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            value={props.department}
            onChange={(e) => props.onChangeDepartment(e.target.value)}
            placeholder="Enter department"
          />
        </div>
        <div className="input-item">
          <label htmlFor="overtimeHours">Overtime Hours(0 - 80)</label>
          <input
            type="number"
            id="overtimeHours"
            value={props.overtimeHours}
            onChange={(e) => props.onChangeOvertimeHours(e.target.value)}
            placeholder="Enter overtime hours"
          />
        </div>
        <button className="add-button" onClick={props.onAdd}>
          Add Employee
        </button>
      </div>
      {props.errorMsg !== "" && (
        <p className="error-message">
          <img src={failedIcon} alt="Failed Icon" />
          <span>{props.errorMsg}</span>
        </p>
      )}
      {props.successMsg !== "" && (
        <p className="success-message">
          <img src={checkIcon} alt="Check Icon" />
          <span>{props.successMsg}</span>
        </p>
      )}
    </section>
  );
}

type EmployeeItemProps = {
  index: number;
  list: Employee;
  onDelete: (deleteId: number) => void;
};
function EmployeeItem(props: EmployeeItemProps) {
  return (
    <tr className="body-row">
      <td>{props.index + 1}</td>
      <td>{props.list.name}</td>
      <td>{props.list.department}</td>
      <td>{props.list.overtimeHours}</td>
      <td>
        <button
          className="delete-button"
          onClick={() => props.onDelete(props.list.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

type EmployeeListProps = {
  employeeList: Employee[];
  onDelete: (deleteId: number) => void;
};
function EmployeeList({ employeeList, onDelete }: EmployeeListProps) {
  if (employeeList.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div className="border-wrapper">
      <table className="list-area">
        <thead>
          <tr className="head-row">
            <th>No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Overtime</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((list, index) => (
            <EmployeeItem
              key={list.id}
              index={index}
              list={list}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [employeeList, setEmployeeList] = useState<Employee[]>([
    { id: 1, name: "John Smith", department: "Development", overtimeHours: 32 },
    { id: 2, name: "Emma Brown", department: "Sales", overtimeHours: 18 },
    { id: 3, name: "Michael Lee", department: "HR", overtimeHours: 46 },
  ]);

  const [addErrorMsg, setAddErrorMsg] = useState("");
  const [addSuccessMsg, setAddSuccessMsg] = useState("");
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState("");

  const handleChangeName = (inputName: string) => {
    setName(inputName);
  };
  const handleChangeDepartment = (inputDepartment: string) => {
    setDepartment(inputDepartment);
  };
  const handleChangeOvertimeHours = (inputOvertimeHours: string) => {
    setOvertimeHours(inputOvertimeHours);
  };

  const handleAddList = () => {
    setAddSuccessMsg("");

    if (name.trim() === "") {
      setAddErrorMsg("Name required.");
      return;
    }
    if (department.trim() === "") {
      setAddErrorMsg("Department required.");
      return;
    }
    if (overtimeHours.trim() === "") {
      setAddErrorMsg("Overtime hours required.");
      return;
    }

    const numOvertimeHours = Number(overtimeHours);
    if (Number.isNaN(numOvertimeHours)) {
      setAddErrorMsg("Overtime hours must be a number.");
      return;
    }
    if (numOvertimeHours < 0 || numOvertimeHours > 80) {
      setAddErrorMsg("Overtime hours must be between 0 and 80.");
      return;
    }

    const newEmployeeList: Employee = {
      id: Date.now(),
      name: name.trim(),
      department: department.trim(),
      overtimeHours: numOvertimeHours,
    };

    setEmployeeList([...employeeList, newEmployeeList]);

    setAddErrorMsg("");
    setDeleteSuccessMsg("");
    setName("");
    setDepartment("");
    setOvertimeHours("");
    setAddSuccessMsg("Employee added successfully.");
  };

  const handleDeleteList = (deleteId: number) => {
    setEmployeeList(employeeList.filter((list) => list.id !== deleteId));
    setAddErrorMsg("");
    setAddSuccessMsg("");
    setDeleteSuccessMsg("Employee deleted.");
  };

  return (
    <div className="app-area">
      <Header title="Employee Overtime Manager" />
      <main>
        <EmployeeForm
          name={name}
          department={department}
          overtimeHours={overtimeHours}
          onChangeName={handleChangeName}
          onChangeDepartment={handleChangeDepartment}
          onChangeOvertimeHours={handleChangeOvertimeHours}
          onAdd={handleAddList}
          errorMsg={addErrorMsg}
          successMsg={addSuccessMsg}
        />
        <section className="list-section">
          <h2>Employee List</h2>
          <p>Total Employees: {employeeList.length}</p>
          <EmployeeList
            employeeList={employeeList}
            onDelete={handleDeleteList}
          />
          {deleteSuccessMsg !== "" && (
            <p className="success-message">
              <img src={checkIcon} alt="Check Icon" />
              <span>{deleteSuccessMsg}</span>
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

export function FormComponent() {
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alamat, setAlamat] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTaks = () => {
  const emailRegex = /@gmail.com/;
  
  const validPhoneLength = phone.length >= 4 && phone.length <= 15;

  if (email === "" || name === "" || phone === "" || alamat === "") {
    alert("Inputan Tidak Boleh Kosong");
  } else if (!emailRegex.test(email)) {
    alert("Email tidak valid. Mohon masukkan email yang valid.");
  } else if (!validPhoneLength) {
    alert("Nomor HP harus terdiri dari 11 atau 12 digit.");
  } else {
    alert("Berhasil Di Submit");
      const newTask = {
        id: Date.now(),
        name,
        email,
        phone,
        alamat,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAlamat("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Form Login</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Masukan Nama Anda"
          value={name}
          onChange={(event) => setName(event.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Masukan Email Anda"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Masukan Nomor Hp Anda"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Masukan Alamat Tinggal Anda"
          value={alamat}
          onChange={(event) => setAlamat(event.target.value)}
          style={styles.input}
        />
        <button onClick={addTaks} style={styles.button}>
          Add Post
        </button>
      </div>
      {tasks.map((task) => (
        <div key={task.id} style={styles.task}>
          <h3 style={styles.taskName}>{task.name}</h3>
          <h4 style={styles.taskEmail}>{task.email}</h4>
          <h5 style={styles.taskPhone}>{task.phone}</h5>
          <p style={styles.taskAddress}>{task.alamat}</p>
          <button
            onClick={() => deleteTask(task.id)}
            style={styles.buttonDelete}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "50%",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
  },
  task: {
    backgroundColor: "#fff",
    padding: "15px",
    marginTop: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
  taskName: {
    color: "#333",
  },
  taskEmail: {
    color: "#555",
  },
  taskPhone: {
    color: "#777",
  },
  taskAddress: {
    color: "#999",
  },
  buttonDelete: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    justifyContent: "center",
  },
};

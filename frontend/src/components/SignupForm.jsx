// Remove the role selector completely
export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), // no role here
    });
    // rest same as before
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup (Doctors only)</h2>
      <label>
        Username: <input value={username} onChange={e => setUsername(e.target.value)} required />
      </label><br/>
      <label>
        Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label><br/>
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  );
}

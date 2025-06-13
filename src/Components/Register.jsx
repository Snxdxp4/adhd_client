import { useState } from "react";
import Api from "../api/axios";
import { Link } from "react-router";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registed,setregisted] = usestate(false);
  
  const register = async () => {
    setIsLoading(true);
    try {
      const response = await Api.post("/register", formData);
      if (response.status === 200) {
        console.log(response.data);
        setregisted(true)
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    register();
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">User Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          >
           {registed ? "Please Login now" : (isLoading ? "Registering..." : "Register")}
          </button>
        </form>
        <p className="text-center">
          Already Have an Account?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {

const navigate = useNavigate();

const handleLogout = async () => {

try {

const token = localStorage.getItem("token");

await axios.post(
"https://habibpa.xyz/api/logout",
{},
{
headers:{
Authorization:`Bearer ${token}`,
Accept:"application/json"
}
}
);

} catch (error) {
console.error("Logout failed:", error);
}

localStorage.removeItem("token");
localStorage.removeItem("user");

navigate("/login");

};

return (
<button 
onClick={handleLogout}
className="btn btn-danger"
>
Logout
</button>
);

};

export default Logout;
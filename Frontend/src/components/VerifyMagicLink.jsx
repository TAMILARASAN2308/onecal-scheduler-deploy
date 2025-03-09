import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const VerifyMagicLink = () => {
    const navigate = useNavigate();
    const { token } = useParams(); // Get token from path

    useEffect(() => {
        if (!token) {
            alert("No token found!");
            navigate("/login");
            return;
        }
        

        fetch(`https://onecal-scheduler-deploy.onrender.com/auth/verify-magic-link/${token}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem("userEmail", data.user.email);
                    navigate("/home");
                } else {
                    alert("Invalid or expired link");
                    navigate("/login");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while verifying the link.");
                navigate("/login");
            });
    }, [navigate, token]);

    return <p>Verifying Magic Link...</p>;
};

export default VerifyMagicLink;

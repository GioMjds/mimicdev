import axios from "axios";

const GoogleButton = () => {
    const handleGoogleLogin = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/google`);
            window.location.href = response.data;
        } catch (error) {
            console.error(`Error logging in with Google: ${error}`);
        }
    }
    return (
        <button
            className="btn btn-danger"
            onClick={handleGoogleLogin}
        >
            Login with Google
        </button>
    )
}

export default GoogleButton
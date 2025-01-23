import axios from "axios";

const GithubButton = () => {
    const handleGithubLogin = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/github`);
            window.location.href = response.data;
        } catch (error) {
            console.error(`Error logging in with Github: ${error}`);
        }
    }
    return (
        <button 
            className="btn btn-primary"
            onClick={handleGithubLogin}
        >
            Login with Github
        </button>
    )
}

export default GithubButton
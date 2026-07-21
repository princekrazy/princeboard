import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function WelcomePage() {
  const { signInGuest } = useAuth();
  const navigate = useNavigate();

  async function handleGuestLogin() {
    await signInGuest();

    navigate("/");
  }

  return (
    <div
      className="
      min-h-screen
      bg-[#0B0F19]
      flex
      items-center
      justify-center
      text-white
      "
    >
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold mb-4">PrinceBoard</h1>

        <p className="text-gray-400 mb-8">
          Manage projects, tasks, and teams in one beautiful workspace.
        </p>

        <button
          onClick={handleGuestLogin}
          className="
          bg-emerald-600
          hover:bg-emerald-700
          px-8
          py-3
          rounded-xl
          font-medium
          "
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

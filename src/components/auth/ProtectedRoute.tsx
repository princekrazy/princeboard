import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
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
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/welcome" />;
  }

  return children;
}

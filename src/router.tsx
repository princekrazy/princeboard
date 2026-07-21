import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import TeamPage from "./pages/TeamPage";
import LabelsPage from "./pages/LabelsPage";
import SettingsPage from "./pages/SettingsPage";
import AppLayout from "./components/layout/AppLayout";
import WelcomePage from "./pages/WelcomePage";

import ProtectedRoute from "./components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <WelcomePage />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      {
        path: "team",
        element: <TeamPage />,
      },

      {
        path: "labels",
        element: <LabelsPage />,
      },

      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

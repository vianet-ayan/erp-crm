
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router";
import { Home } from "@/pages/home.tsx";
import { About } from "@/pages/aboutUs.tsx";

// 1. Create a Layout component (optional, great for navbars/sidebars)
function RootLayout() {
  return (
    <div className="flex min-h-svh p-6 flex-col">
      <nav className="flex gap-4 mb-6 border-b pb-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/about" className="text-blue-600 hover:underline">About</Link>
      </nav>
      {/* Outlet renders the current matched child route */}
      <Outlet />
    </div>
  )
}

// 2. Your Home Component (Your original code)


// 3. A simple About Component to test routing


// 4. Define your router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

// 5. Export App as the RouterProvider wrapper
export function App() {
  return <RouterProvider router={router} />;
}

export default App;
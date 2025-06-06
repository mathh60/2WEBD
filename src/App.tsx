import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Menu from './Components/Menu';
import DisplayHighlight from './Page/DisplayHighlight';
import AdvancedSearch from './Page/AdvancedSearch';
import ObjectDetailsPage from './Page/ObjectDetailsPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: (
      <div>
        Page not found
        <br />
        <a href="/">Back to home</a>
      </div>
    ),
    element: (
      <div>
        <div className="menu">
          <Menu />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    ),
    children: [
      {
        path: '/',
        element: <DisplayHighlight />,
      },
      {
        path: '/advanced-search',
        element: <AdvancedSearch />,
      },
      {
        path: '/object/:objectId',
        element: <ObjectDetailsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
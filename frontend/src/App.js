// src/App.js
import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import MenuPage from './pages/menuPage.jsx';
import './App.css'; // Assuming Tailwind is configured in your app
import MainLayout from './pages/MainLayout.jsx';
const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <div className="App px-3 py-4">
         <MainLayout />
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

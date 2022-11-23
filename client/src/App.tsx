import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RouterProvider } from 'react-router';
import Header from './components/Header';
import router from './routes/router';
import GlobalStyle from './style/globalStyles';

function App() {
    const queryClient = new QueryClient();
    return (
        <div className="App">
            <Header />
            <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <GlobalStyle />
            </QueryClientProvider>
        </div>
    );
}
export default App;

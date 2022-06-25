import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import {  AppContextProvider } from './context';
import ProductPage from './pages/Product';


const App = () => {

  return (
  <AppContextProvider>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>

  </AppContextProvider>
  );
}

export default App;

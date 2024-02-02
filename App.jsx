import React from 'react';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StockRow from './components/StockRow.jsx';
import StockList from './components/StockList.jsx';

function App() {
  return (
    <div className="App">
      {/* Main container for the app */}
      <div className='container'>
        {/* Card container */}
        <div className='col-md-5 mt-5'>
          <div className='card'>
            {/* Render the StockList component */}
            <StockList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

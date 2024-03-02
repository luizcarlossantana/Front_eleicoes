import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Form_cadastro from './routes/Form_cadastro.jsx';
import Section_Info_Votar from './components/Section_Info_Votar.jsx';
import App from './App.jsx';

const router = createBrowserRouter([

 {
  path: "/",
  element: <App/>,
  children: [

    {
      path: "/cadastro",
      element: < Form_cadastro/>
     },
     {
      path: "/",
      element: < Section_Info_Votar/>
     }
]
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

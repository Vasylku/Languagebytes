import React from "react";
import "./App.css";
import "./styles/global.css";
import { Routes } from "./routes/config";
import { AuthProvider } from "./authentication/use-auth";

//This is almost the base level of your app.  You can also put global things here, but it allows you to escape them.
function App() {
 
  return (
 
   
  <AuthProvider>
      
      <Routes />

  </AuthProvider>
      
  );
}

export default App;

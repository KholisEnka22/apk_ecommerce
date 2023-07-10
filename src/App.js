import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Router from './router';
import {AuthProvider} from './context/AuthContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </NavigationContainer>
  );
};
export default App;

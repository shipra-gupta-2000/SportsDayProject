import React from 'react';
import { EventsProvider } from './context/EventsContext';
import EventList from './components/EventList';
import SelectedEventList from './components/SelectedEventList';
import Header from './components/Header';
import './App.css'; 
import Footer from './components/Footer';

function App() {
  return (
    <EventsProvider>
      <div className="App">
        <Header username="John Doe" />
        <div className="events-container">
          <EventList />
          <SelectedEventList />
        </div>
        <Footer />
      </div>
    </EventsProvider>
  );
}

export default App;

import {React,useEffect} from 'react';
import { useEvents } from '../context/EventsContext';
import { useState } from 'react';
import './EventCard.css';

function formatDate(dateString) {
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  }
  

function EventCard({ event, onSelect }) {
    const [isSelected, setIsSelected] = useState(false);
    const { selectedEvents } = useEvents();
    
    useEffect(() => {
        setIsSelected(selectedEvents.includes(event));
    }, [selectedEvents, event]);
    
    const handleSelect=()=>{
        onSelect(event);
    }
  return (
    <div className="event-card">
      <h3>{event.event_name}</h3>
      <p>Category: {event.event_category}</p>
      <p>Timing: {formatDate(event.start_time)} to {formatDate(event.end_time)}</p>
      <button onClick={handleSelect} disabled={isSelected} >
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}
export default EventCard;

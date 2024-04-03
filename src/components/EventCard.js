import {React,useEffect} from 'react';
import { useEvents } from '../context/EventsContext';
import { useState } from 'react';
import './EventCard.css';


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
      <p>Timing: {event.start_time}-{event.end_time}</p>
      <button onClick={handleSelect} disabled={isSelected} >
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}
export default EventCard;

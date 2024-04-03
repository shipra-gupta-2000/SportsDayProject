import React from 'react';
import { useEvents } from '../context/EventsContext';

function SelectedEventList() {
  const { selectedEvents, deselectEvent } = useEvents();

  return (
    <div className="selected-event-list">
      <h2>Selected Events</h2>
      {selectedEvents.map(event => (
        <div key={event.id} className="selected-event">
          <p>{event.event_name}</p>
          <button onClick={() => deselectEvent(event)}>Deselect</button>
        </div>
      ))}
    </div>
  );
}

export default SelectedEventList;

import React from 'react';
import { useEvents } from '../context/EventsContext';
import EventCard from './EventCard';
import { useState, useMemo } from 'react';
import './EventList.css';

function EventList() {
    const { events, selectEvent } = useEvents();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('all');
    const [sortBy, setSortBy] = useState('event_name');
    const categories = [...new Set(events.map(event => event.event_category))];
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleFilterChange = (e) => {
      setFilterBy(e.target.value);
    };
  
    const handleSortChange = (e) => {
      setSortBy(e.target.value);
    };
    const processedEvents = useMemo(() => {
    return events
      .filter(event => {
        if (filterBy === 'all') return true;
        return event.event_category === filterBy;
      })
      .filter(event => {
        return event.event_name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        if(sortBy === 'none') return 0;
        else if (sortBy === 'event_name') {
          return a.event_name.localeCompare(b.event_name);
        } else if (sortBy === 'start_time') {
          return new Date(a.start_time) - new Date(b.start_time);
        } else if (sortBy === 'end_time') {
          return new Date(a.end_time) - new Date(b.end_time);
        }
        return 0;
      });
  }, [events, searchTerm, filterBy, sortBy]);
  return (
    <div className='event-list'>
        <div>
            Search: <input type="text" placeholder="Search events" onChange={handleSearchChange}/>
        </div>
        <div>
            Category: <select onChange={handleFilterChange}>
                <option value="all">All</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
        <div>
            Sort by: <select onChange={handleSortChange}>
                <option value="none"></option>
                <option value="event_name">event_name</option>
                <option value="start_time">start time</option>
                <option value="end_time">end time</option>
            </select>
        </div>
        <div >
        {processedEvents.map(event => (
        <EventCard key={event.id} event={event} onSelect={() => selectEvent(event)} />
      ))}
    </div>
    </div>
  );
}

export default EventList;

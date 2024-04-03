import React from 'react';
import { useEvents } from '../context/EventsContext';
import EventCard from './EventCard';
import { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import './EventList.css';

function EventList() {
    const { events, selectEvent } = useEvents();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('all');
    const [sortBy, setSortBy] = useState('event_name');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const categories = [...new Set(events.map(event => event.event_category))];
  
    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    }
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

  const pageCount = Math.ceil(processedEvents.length / itemsPerPage);
  const currentItems = processedEvents.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);


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
        {currentItems.map(event => (
        <EventCard key={event.id} event={event} onSelect={() => selectEvent(event)} />
      ))}
    </div>
    <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />

    </div>
  );
}

export default EventList;

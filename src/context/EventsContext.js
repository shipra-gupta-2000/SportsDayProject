import React, { createContext, useContext, useState, useEffect } from 'react';
import mockEvents from '../services/EventService'
import { notification } from 'antd';


const EventsContext = createContext();

export function useEvents() {
  return useContext(EventsContext);
}

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [shouldShowNotification, setShouldShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = mockEvents;
        console.log('Events fetched successfully', eventsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    loadEvents();
  }, []);


  const openNotification = (type) => {
    notification[type]({
        message: notificationMsg,
      });
  };

  useEffect(() => {
    if (shouldShowNotification) {
      openNotification(notificationType);
      setShouldShowNotification(false);
    }
  }, [shouldShowNotification]); 

  const Notify = (type,message) => {
    setNotificationMsg(message);
    setNotificationType(type);
    setShouldShowNotification(true);
  };
  const selectEvent = (event) => {
    console.log('Selected events', event.event_name, selectedEvents);
    if (selectedEvents.length >= 3) {
      Notify('warning','You can only select 3 events');
      return ;
    }
    if (selectedEvents.some(e => e.start_time < event.start_time && e.end_time > event.start_time || e.start_time < event.end_time && e.end_time > event.end_time)) {
      Notify('warning','Conflicting event');
      return ;
    }
    setSelectedEvents(prev => [...prev, event]);
    Notify('success','Event selected');
    return true;
  };

  const deselectEvent = (event) => {
    Notify('success','Event deselected');
    setSelectedEvents(prev => prev.filter(e => e.id !== event.id));
  };

  return (
    <EventsContext.Provider value={{ events, selectedEvents, selectEvent, deselectEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

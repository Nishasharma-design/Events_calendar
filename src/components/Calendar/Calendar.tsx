import { useEffect, useState } from "react"
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import DayCell from "../DayCell/DayCell";
import Modal, { EventType } from "../Modal/Modal";

import classes from './Calendar.module.scss';
import EventDetailsModal from "../EventDetailsModal/EventDetailsModal";
import FilterBar from "../FilterBar/FilterBar";

const Calendar = () => {

   
   const [currentDate, setCurrentDate] = useState(new Date());

   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

   const [isModalOpen, setIsModalOpen] = useState(false);

   const [events, setEvents] = useState<EventType[]>([]);

   const [viewEvent, setViewEvent] = useState<EventType | null>(null);

   const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
   const [selectedLocation, setSelectedLocation] = useState<string | null>(null);


   const fetchEvents = async () => {
    try {
       const response = await fetch('http://localhost:8080/events');
       if (!response.ok) {
          throw new Error('Failed to fetch events');
       }
       const data = await response.json();
       setEvents(data); 
    } catch (error) {
       console.error('Error fetching events:', error);
    }
 };

 useEffect(() => {
    fetchEvents();
 }, []);

   const handleViewEvent = (event: EventType) => {
    setViewEvent(event);
   };


   
   const handlePrevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
   };

   const handleNextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next); 
   };

   const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const startDay = firstDayOfMonth.getDay();

    const daysArray = [];

    for (let i = 0; i < startDay; i++) {
        daysArray.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(new Date(year, month, day));
    }

    return daysArray;

   };

   const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
   };

   const handleSaveEvent = (event: EventType) => {
    setEvents((prev) => [...prev, event]);
   };

   const days = getDaysInMonth();

   const filteredEvents = events.filter((event) => {
    const labelMatch = selectedLabel ? event.label === selectedLabel : true;
    const locationMatch = selectedLocation ? event.location === selectedLocation : true;
    return labelMatch && locationMatch;
   })

   

   return (
    <div className={classes.calendarContainer}>
        <FilterBar 
            labels={[...new Set(events.map((e) => e.label))]}
            locations={[...new Set(events.map((e) => e.location))]}
            selectedLabel={selectedLabel}
            selectedLocation={selectedLocation}
            onLabelChange={setSelectedLabel}
            onLocationChange={setSelectedLocation}
            onClearFilters={() => {
                setSelectedLabel(null);
                setSelectedLocation(null);
            }}
        />
        <CalendarHeader
          currentDate={currentDate}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          />
       
       <div className={classes.weekDays}>
       {days
  .filter((day): day is Date => day !== null)
  .map((day) => (
    <DayCell
      key={day.toISOString()}
      date={day}
      onClick={handleDayClick}
      events={filteredEvents.filter(
        (event) =>
          new Date(event.startDate).toDateString() === day.toDateString()
      )}
      onEventClick={handleViewEvent}
    />
  ))}

        </div> 

        {isModalOpen && selectedDate && (
            <Modal selectedDate={selectedDate} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addEvent={handleSaveEvent}/>
        )}
        {viewEvent && (
            <EventDetailsModal
              event={viewEvent}
              onClose={() => setViewEvent(null)} />
        )}
    </div>
   );

};

export default Calendar


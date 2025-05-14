package calendar.com.backend.calendar;

import java.util.List;

public interface EventService {
    
    EventDTO createEvent(CreateEventDTO createEventDTO);

    List<EventDTO> getAllEvents();

    EventDTO getEventById(Long id);

    void deleteEvent(Long id);

    EventDTO updateEvent(Long id, UpdateEventDTO updateEventDTO);

    List<EventDTO> getEventsByLabel(String label);

    List<EventDTO> getEventsByLocation(String location);

}

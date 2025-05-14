package calendar.com.backend.calendar;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EventServiceImpl implements EventService { 

    private final EventRepository eventRepository;
    private final ModelMapper modelMapper;

    public EventServiceImpl(EventRepository eventRepository, ModelMapper modelMapper) {
        this.eventRepository = eventRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public EventDTO createEvent(CreateEventDTO createEventDTO) {
       EventEntity event = modelMapper.map(createEventDTO, EventEntity.class);
       EventEntity savedEvent = eventRepository.save(event);
       return modelMapper.map(savedEvent, EventDTO.class);
    }
    @Override
    public List<EventDTO> getAllEvents() {
        List<EventEntity> events = eventRepository.findAll();
        return events.stream()
                     .map(event -> modelMapper.map(event, EventDTO.class))
                     .collect(Collectors.toList());
    }


    @Override
    public EventDTO getEventById(Long id) {
       EventEntity event = eventRepository.findById(id) 
                      .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));
              return modelMapper.map(event, EventDTO.class);
    }


    @Override
    public void deleteEvent(Long id) {
       if (!eventRepository.existsById(id)) {
        throw new EntityNotFoundException("Event not found with id: " + id);
       }
       eventRepository.deleteById(id);
    }

    @Override
    public EventDTO updateEvent(Long id, UpdateEventDTO updateEventDTO) {
        EventEntity existingEvent = eventRepository.findById(id)
             .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));

             if (existingEvent.getFinishDate().isBefore(LocalDate.now())) {
                throw new IllegalStateException("Cannot update an event that has already finished.");
             }

             modelMapper.map(updateEventDTO, existingEvent);
             EventEntity updatedEvent = eventRepository.save(existingEvent);
             return modelMapper.map(updatedEvent, EventDTO.class); 

    }
    
    @Override
    public List<EventDTO> getEventsByLabel(String label) {
        List<EventEntity> events = eventRepository.findByLabel(label);
        return events.stream()
                     .map(event -> modelMapper.map(event, EventDTO.class))
                     .collect(Collectors.toList());
    }


    @Override
    public List<EventDTO> getEventsByLocation(String location) {
        List<EventEntity> events = eventRepository.findByLocation(location);
        return events.stream()
                     .map(event -> modelMapper.map(event, EventDTO.class))
                     .collect(Collectors.toList());
    }

}

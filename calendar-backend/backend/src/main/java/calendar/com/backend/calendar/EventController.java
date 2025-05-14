package calendar.com.backend.calendar;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/events")
public class EventController {
    
   private final EventService eventService;

   
   public EventController(EventService eventService) {
    this.eventService = eventService;
   }

   @PostMapping
   public ResponseEntity<EventDTO> createEvent(@RequestBody CreateEventDTO createEventDTO) {
    EventDTO createdEvent = eventService.createEvent(createEventDTO);
    return ResponseEntity.ok(createdEvent);
   }

   @GetMapping
   public ResponseEntity<List<EventDTO>> getAllEvents() {
       List<EventDTO> events = eventService.getAllEvents();
       return ResponseEntity.ok(events);
   }

   @GetMapping("/{id}")
   public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
    EventDTO event = eventService.getEventById(id);
    return ResponseEntity.ok(event);
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
    eventService.deleteEvent(id);
    return ResponseEntity.noContent().build();
   }

   @PutMapping("/{id}")
   public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody UpdateEventDTO updateEventDTO) {
    EventDTO updatedEvent = eventService.updateEvent(id, updateEventDTO);
    return ResponseEntity.ok(updatedEvent);
   }

   @GetMapping("/label/{label}")
   public ResponseEntity<List<EventDTO>> getEventsByLabel(@PathVariable String label) {
    return ResponseEntity.ok(eventService.getEventsByLabel(label));
   }

   @GetMapping("/location/{location}")
   public ResponseEntity<List<EventDTO>> getEventsByLocation(@PathVariable String location) {
    return ResponseEntity.ok(eventService.getEventsByLocation(location));
   }

 
}

package calendar.com.backend.calendar;

import java.time.LocalDate;

import jakarta.persistence.*;


@Entity
@Table(name = "events")
public class EventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String label;

    private LocalDate startDate;
 
 
    private LocalDate finishDate;
 
    private String location;
 private String description;
 
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getLabel() {
        return label;
    }


    public void setLabel(String label) {
        this.label = label;
    }


    public LocalDate getStartDate() {
        return startDate;
    }


    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }


    public LocalDate getFinishDate() {
        return finishDate;
    }


    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }


    public String getLocation() {
        return location;
    }


    public void setLocation(String location) {
        this.location = location;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    
    
}

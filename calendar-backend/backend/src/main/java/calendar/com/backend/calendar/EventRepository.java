package calendar.com.backend.calendar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface EventRepository extends JpaRepository<EventEntity, Long>{
    
    List<EventEntity> findByLabel(String label);

    List<EventEntity> findByLocation(String location);

}

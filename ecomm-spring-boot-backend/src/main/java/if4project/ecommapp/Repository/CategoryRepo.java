package if4project.ecommapp.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import if4project.ecommapp.model.Category;

public interface CategoryRepo  extends JpaRepository<Category, Long> {

}

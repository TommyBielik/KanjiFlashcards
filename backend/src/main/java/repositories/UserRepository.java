package repositories;

import entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}

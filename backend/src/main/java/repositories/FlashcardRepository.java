package repositories;

import entities.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
    Optional<Flashcard> findBySign(String sign);

    @Modifying
    @Query("DELETE FROM Flashcard f WHERE f.deck.id = :deckId")
    void deleteByDeckId(@Param("deckId") Long deckId);

}


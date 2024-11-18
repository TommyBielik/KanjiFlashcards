package services;

import DTO.FlashcardDTO;
import entities.Flashcard;

public interface FlashcardService {

    Flashcard addFlashcard(FlashcardDTO flashcardDTO);
}

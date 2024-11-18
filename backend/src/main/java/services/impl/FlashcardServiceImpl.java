package services.impl;

import DTO.FlashcardDTO;
import entities.Deck;
import entities.Flashcard;
import exceptions.KanjiNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.DeckRepository;
import repositories.FlashcardRepository;
import repositories.FlashcardRepository;
import repositories.KanjiRepository;
import services.FlashcardService;

@Service
public class FlashcardServiceImpl implements FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final DeckRepository deckRepository;
    private final KanjiRepository kanjiRepository;

    @Autowired
    public FlashcardServiceImpl(FlashcardRepository flashcardRepository,
                                DeckRepository deckRepository,
                                KanjiRepository kanjiRepository) {
        this.flashcardRepository = flashcardRepository;
        this.deckRepository = deckRepository;
        this.kanjiRepository = kanjiRepository;
    }

    @Override
    public Flashcard addFlashcard(FlashcardDTO flashcardDTO) {
        Long deckId = flashcardDTO.getDeckId();
        String sign = flashcardDTO.getSign();

        if(!kanjiRepository.findBySign(sign).isPresent()) {
            throw new KanjiNotFoundException("Kanji " + sign + " not found");
        }
        Deck deck = deckRepository.findById(deckId)
                .orElseThrow(() -> new RuntimeException("Deck not found"));

        Flashcard flashcard = new Flashcard();
        flashcard.setDeck(deck);
        flashcard.setSign(sign);

        return flashcardRepository.save(flashcard);
    }
}

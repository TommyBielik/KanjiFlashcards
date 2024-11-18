package services.impl;

import entities.Deck;
import entities.User;
import exceptions.DeckAlreadyExistsException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.DeckRepository;
import repositories.FlashcardRepository;
import services.DeckService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DeckServiceImpl implements DeckService {

    private DeckRepository deckRepository;
    private FlashcardRepository flashcardRepository;

    @Autowired
    public DeckServiceImpl(DeckRepository deckRepository,
                           FlashcardRepository flashcardRepository) {
        this.deckRepository = deckRepository;
        this.flashcardRepository = flashcardRepository;
    }

    @Override
    public Deck createDeck(String name, User user) {

        if(deckRepository.findByNameAndUser(name, user).isPresent()) {
            throw new DeckAlreadyExistsException(name);
        }

        Deck deck = new Deck(name, user);
        return deckRepository.save(deck);
    }

    @Override
    public List<Deck> browseDecks(User user) {
        return deckRepository.findByUser(user);
    }

    @Override
    @Transactional
    public String deletedeck(String name, User user) {
        Optional<Deck> deckOptional = deckRepository.findByNameAndUser(name, user);

        if(!deckOptional.isPresent()) {
            throw new RuntimeException("Deck does not exist");
        } else {
            Deck deck = deckOptional.get();
            Long deckId = deck.getId();

            flashcardRepository.deleteByDeckId(deckId);
            deckRepository.delete(deck);
        }
        return "Deck deleted";
    }


}

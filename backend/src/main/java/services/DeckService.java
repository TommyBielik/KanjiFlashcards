package services;

import entities.Deck;
import entities.User;

import java.util.List;

public interface DeckService {

    Deck createDeck(String name, User user);

    List<Deck> browseDecks(User user);

    String deletedeck(String name, User user);
}

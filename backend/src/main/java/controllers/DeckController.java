package controllers;

import DTO.DeckDTO;
import entities.Deck;
import entities.User;
import entities.Flashcard;
import exceptions.DeckAlreadyExistsException;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import services.DeckService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/decks")
public class DeckController {

    private final DeckService deckService;

    public DeckController(DeckService deckService) {
        this.deckService = deckService;
    }

    @PostMapping(path ="/create")
    public ResponseEntity<?> createDeck(@RequestParam String name){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if(!(authentication.getPrincipal() instanceof User)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        try {
            Deck deck = deckService.createDeck(name, currentUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(deck);
        } catch (DeckAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping(path = "/browse")
    public ResponseEntity<List<DeckDTO>> browseDecks(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if(!(authentication.getPrincipal() instanceof User)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<Deck> decks = deckService.browseDecks(currentUser);

        if(decks.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<DeckDTO> deckDTOs = decks.stream()
                .map(deck -> new DeckDTO(deck.getId(), deck.getName(),
                        deck.getFlashcards().stream().map(Flashcard::getSign).collect(Collectors.toList())))
                .collect(Collectors.toList());

        return new ResponseEntity<>(deckDTOs, HttpStatus.OK);
    }

    @PostMapping(path = "/delete")
    public ResponseEntity<String> deleteDeck(@RequestParam String name){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        try{
            deckService.deletedeck(name, currentUser);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

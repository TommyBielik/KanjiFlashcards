package controllers;

import DTO.FlashcardDTO;
import entities.Flashcard;
import entities.Kanji;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import repositories.KanjiRepository;
import services.FlashcardService;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/flashcards")
public class FlashcardsController {

    private final FlashcardService flashcardService;
    private final KanjiRepository kanjiRepository;

    @Autowired
    public FlashcardsController(FlashcardService flashcardService,
                                KanjiRepository kanjiRepository) {
        this.flashcardService = flashcardService;
        this.kanjiRepository = kanjiRepository;
    }

    @PostMapping(path = "/add")
    public ResponseEntity<String> addFlashcards(@RequestBody FlashcardDTO flashcardDTO) {
        try{
            Flashcard flashcard = flashcardService.addFlashcard(flashcardDTO);
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Successfully added flashcard");
    }

    @PostMapping(path = "/translations")
    public ResponseEntity<Kanji> getTranslations(@RequestParam String sign) {
        Optional<Kanji> kanji = kanjiRepository.findBySign(sign);

        if(kanji.isPresent()){
            return new ResponseEntity<>(kanji.get(), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

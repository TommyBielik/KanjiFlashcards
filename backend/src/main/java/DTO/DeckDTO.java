package DTO;

import java.util.List;

public class DeckDTO {

    private Long id;
    private String name;
    private List<String> flashcards;

    public DeckDTO(Long id, String name, List<String> flashcards) {
        this.name = name;
        this.flashcards = flashcards;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getFlashcards() {
        return flashcards;
    }

    public void setFlashcards(List<String> flashcards) {
        this.flashcards = flashcards;
    }
}

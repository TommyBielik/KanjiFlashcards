package DTO;

public class FlashcardDTO {

    private Long deckId;
    private String sign;

    public FlashcardDTO() {

    }

    public FlashcardDTO(String sign, Long deckId) {
        this.sign = sign;
        this.deckId = deckId;
    }


    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public Long getDeckId() {
        return deckId;
    }

    public void setDeckId(Long deckId) {
        this.deckId = deckId;
    }

}

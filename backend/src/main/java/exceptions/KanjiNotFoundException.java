package exceptions;

public class KanjiNotFoundException extends RuntimeException {
    public KanjiNotFoundException(String message) {
        super(message);
    }
}

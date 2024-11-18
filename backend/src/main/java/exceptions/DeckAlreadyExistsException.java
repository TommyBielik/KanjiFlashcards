package exceptions;

public class DeckAlreadyExistsException extends RuntimeException {
    public DeckAlreadyExistsException(String message) {
        super(message);
    }
}

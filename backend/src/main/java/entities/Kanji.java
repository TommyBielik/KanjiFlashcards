package entities;

import jakarta.persistence.*;

@Entity
@Table(name = "kanji")
public class Kanji {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sign", nullable = false)
    private String sign;

    @Column(name = "readings", nullable = false)
    private String readings;

    @Column(name = "translations", nullable = false)
    private String translations;

    public Kanji(String sign, String readings, String translations) {
        this.sign = sign;
        this.readings = readings;
        this.translations = translations;
    }

    public Kanji() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public String getReadings() {
        return readings;
    }

    public void setReadings(String readings) {
        this.readings = readings;
    }

    public String getTranslations() {
        return translations;
    }

    public void setTranslations(String translations) {
        this.translations = translations;
    }

    @Override
    public String toString() {
        return "Sign: " + sign +
                ", Readings: " + readings +
                ", Translations: " + translations;
    }
}

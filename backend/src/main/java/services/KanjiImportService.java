package services;

import entities.Kanji;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.KanjiRepository;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@Service
public class KanjiImportService {

    @Autowired
    private KanjiRepository kanjiRepository;

    @Transactional
    public void importKanji(String filePath) {
        try(FileReader fileReader = new FileReader(filePath)) {
            BufferedReader reader = new BufferedReader(fileReader);

            String line;
            while((line = reader.readLine()) != null) {
                System.out.println(line);
                String[] parts = line.split(",");

                String sign = parts[0];
                String readings = parts[1];

                String translations = parts[2];
                String translationsCleaned = parts[2].replace("\"", "").replace(";", ",");

                if(sign == null) {
                    System.out.println("Skipping line");
                    continue;
                }

                Kanji kanji = new Kanji(sign, readings, translationsCleaned);
                kanjiRepository.save(kanji);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

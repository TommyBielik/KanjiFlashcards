package org.kanji.kanjiflashcards;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EntityScan(basePackages = "entities")
@ComponentScan(basePackages = {"services", "controllers", "exceptions", "configs"})
@EnableJpaRepositories(basePackages = "repositories")
@EnableTransactionManagement
public class KanjiFlashcardsApplication{

	public static void main(String[] args) {
		SpringApplication.run(KanjiFlashcardsApplication.class, args);
	}

}

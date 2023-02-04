package com.talker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.talker")
@SpringBootApplication
public class TalkerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TalkerApplication.class, args);
	}

}
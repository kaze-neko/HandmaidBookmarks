package com.kaze_neko.HandmaidBookmarksServer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class HandmaidBookmarksServerApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(HandmaidBookmarksServerApplication.class, args);
	}

}

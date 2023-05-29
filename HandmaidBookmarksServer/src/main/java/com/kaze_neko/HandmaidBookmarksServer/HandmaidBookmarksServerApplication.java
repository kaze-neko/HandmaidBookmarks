package com.kaze_neko.HandmaidBookmarksServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class HandmaidBookmarksServerApplication {

	public static void main(String[] args) throws IOException, URISyntaxException {
		SpringApplication.run(HandmaidBookmarksServerApplication.class, args);
		Bookmark bookmark = new Bookmark();
		bookmark.setId(0);
		bookmark.setTitle("Meow! All the bookmarks will be displayed here /ᐠ｡ꞈ｡ᐟ\\");
		bookmark.setUrl("http://localhost:8080/HandmaidBookmarks/server/bookmarks/");
		bookmark.setTags(new ArrayList<>(Arrays.asList("start")));
		BookmarkService bookmarkService = new BookmarkService();
		bookmarkService.save(bookmark);
	}

}

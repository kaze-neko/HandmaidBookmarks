package com.kaze_neko.HandmaidBookmarksServer;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Service
public class BookmarkService {
    @Autowired
    ObjectMapper objectMapper;
    public Bookmark save(Bookmark bookmark) throws IOException {
        objectMapper = new ObjectMapper();
        bookmark.setId(bookmark.getUrl().hashCode());
        String jsonPath = "JSONDatabase/" + bookmark.getId() + ".json";
        objectMapper.writeValue(new File(jsonPath), bookmark);
        return bookmark;
    }
    public Bookmark getById(int id) throws IOException {
        String jsonPath = "JSONDatabase/" + id + ".json";
        Bookmark bookmark = objectMapper.readValue(new File(jsonPath), Bookmark.class);
        return bookmark;
    }
    public List<Bookmark> getAll() throws IOException {
        File databaseDirectory = new File("JSONDatabase");
        File[] allBookmarkFiles = databaseDirectory.listFiles();
        List<Bookmark> bookmarks = new ArrayList<>();
        for (File file : allBookmarkFiles) {
            bookmarks
                    .add(objectMapper.readValue(new File("JSONDatabase/" + file.getName()), Bookmark.class));
        }
        return bookmarks;
    }
    public List<String> getAllTags() throws IOException {
        List<Bookmark> bookmarks = getAll();
        List<String> tags = new ArrayList<>();
        for (Bookmark bookmark : bookmarks) {
            tags.addAll(bookmark.getTags());
        }
        Set tempTagsSet = new HashSet<>(tags);
        tags = new ArrayList<>(tempTagsSet);
        return tags;
    }
    public void deleteById(int id) {
        String jsonPath = "JSONDatabase/" + id + ".json";
        File bookmark = new File(jsonPath);
        bookmark.delete();
    }
}

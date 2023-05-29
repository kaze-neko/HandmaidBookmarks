package com.kaze_neko.HandmaidBookmarksServer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/HandmaidBookmarks/server/bookmarks/")
public class BookmarkController {
    @Autowired
    BookmarkService bookmarkService;
    @GetMapping
    public List<Bookmark> getAll(@RequestParam(required = false) Optional<String[]> tags) throws IOException, URISyntaxException {
        if (tags.isEmpty()) { return bookmarkService.getAll(); }
        List<Bookmark> bookmarks = bookmarkService.getAll();
        List<Bookmark> suitableBookmarks = new ArrayList<>();
        for (Bookmark bookmark : bookmarks) {
            if (bookmark.getTags().containsAll(Arrays.asList(tags.get()))) { suitableBookmarks.add(bookmark); }
        }
        return suitableBookmarks;
    }
    @GetMapping("tags")
    public List<String> getAllTags() throws IOException, URISyntaxException {
        return bookmarkService.getAllTags();
    }
    @PostMapping
    public Bookmark create(@RequestBody Bookmark bookmark) throws IOException, URISyntaxException {
        return bookmarkService.save(bookmark);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        bookmarkService.deleteById(id);
    }
}

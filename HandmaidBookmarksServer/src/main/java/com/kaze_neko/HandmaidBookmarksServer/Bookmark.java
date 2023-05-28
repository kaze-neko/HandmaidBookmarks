package com.kaze_neko.HandmaidBookmarksServer;

import java.util.List;

public class Bookmark {
    private int id;
    private String title;
    private String url;
    private List<String> tags;
    public Bookmark() {
    }
    public Bookmark(int id, String title, String url, List<String> tags) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.tags = tags;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public List<String> getTags() {
        return tags;
    }
    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}

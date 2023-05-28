package com.kaze_neko.HandmaidBookmarksServer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/HandmaidBookmarks/server/test")
public class TestController {
    @GetMapping
    public String test() {
        return "Test it, please!";
    }
}

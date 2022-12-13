package com.talker.service;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageService {
    public List<List<String>> messages();
}

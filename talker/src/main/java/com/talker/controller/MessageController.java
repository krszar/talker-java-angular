package com.talker.controller;

import com.talker.message.OutputMessage;
import com.talker.model.MessageModel;
import com.talker.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @CrossOrigin(origins = "http://localhost:4200")
    @MessageMapping("/chat")
    @SendTo("/message")
    public OutputMessage send(MessageModel message){
        messageService.saveMsg(message.getFrom(), message.getMessage());
        return new OutputMessage(message.getFrom(),message.getMessage(), message.getTo());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("getMessages")

    public List<List<String>> AllMessages(){

        List<List<String>> messages = new ArrayList<>();
        messages = messageService.messages();

        return messages;

    }
}

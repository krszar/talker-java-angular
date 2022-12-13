package com.talker.controller;


import com.talker.model.MessageModel;
import com.talker.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.talker.service.MessageService;

import java.util.ArrayList;
import java.util.List;


@RestController
public class MessageController {

//    @MessageMapping("/chat/{from}")
//    @SendTo("/chatroom")
//    private MessageModel receiveMessage(@Payload MessageModel message){
//        return message;
//    }

    @Autowired
    private MessageService messageService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("messages")
    public List<List<String>> messagesList(){
        List<List<String>> msg = new ArrayList<List<String>>();
        msg= messageService.messages();
        String[] arr = new String[msg.size()];
//        for (int i =0; i < msg.size(); i++){
//            arr[i] = msg.get(i);
//        }
        System.out.println(msg);
        return msg;
    }
}

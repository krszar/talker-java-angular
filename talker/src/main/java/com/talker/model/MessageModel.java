package com.talker.model;

public class MessageModel {
    public String getMessage() {
        return message;
    }
    public String getFrom() {
        return from;
    }
    public String getTo() {
        return to;
    }

    @Override
    public String toString() {
        return "MessageModel{" +
                "message='" + message + '\'' +
                ", from='" + from + '\'' +", to='" + to + '\'' +
                '}';
    }

    private String message;
    private String from;
    private String to;

}
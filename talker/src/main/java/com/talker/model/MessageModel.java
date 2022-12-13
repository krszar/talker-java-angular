package com.talker.model;

public class MessageModel {

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    @Override
    public String toString() {
        return "MessageModel{" +
                "message='" + message + '\'' +
                ", from='" + from + '\'' +
                '}';
    }

    private String message;
    private String from;
}

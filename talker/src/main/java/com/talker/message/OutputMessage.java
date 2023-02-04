package com.talker.message;

public class OutputMessage {
    private String from;
    private String msg;
    private String to;
    public OutputMessage(final String from, final String msg, final String to){
        this.from = from;
        this.msg = msg;
        this.to = to;
    }

    public String getFrom() {
        return from;
    }

    public String getMsg() {
        return msg;
    }
    public String getTo() {
        return to;
    }
}
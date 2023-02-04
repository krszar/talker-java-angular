package com.talker.service;

import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserService {

    public boolean loginValid(String login, String password);
    public boolean isLog(String login);
    public void setLog(String login);
    public void  logOut(String login);
    public boolean register(String login, String email, String password);
    public List<String> friends();

}
package com.talker.serviceImpl;

import com.talker.db.dbClass;
import org.springframework.stereotype.Service;
import com.talker.service.UserService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImp implements UserService {

    Connection connection;
    boolean valid = false;
    boolean log = false;
    boolean reg = false;
    List<String> tab = new ArrayList<String>();

    public UserServiceImp() throws SQLException {
        connection = dbClass.getConnection();
    }

    @Override
    public boolean loginValid(String login, String password) {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM users WHERE login = '" + login+"'");
            ResultSet rs =  statement.executeQuery();

            while (rs.next()){
                System.out.println("query "+rs.getString(1));
                if (rs.getString(1).equals(login) && rs.getString(2).equals(password)){
                    valid = true;
                    System.out.println("znaleziono");
                }else {
                    System.out.println("Błędny login i/lub hasło");
                    valid = false;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return valid;
    }
    @Override
    public void setLog(String login){
        try {
            PreparedStatement statement = connection.prepareStatement(
                    "UPDATE users SET isLogged = 1 WHERE login = '" + login+"'");
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    public boolean isLog(String login){

        try {
            PreparedStatement statement = statement = connection.prepareStatement(
                    "SELECT isLogged FROM talkerusers.users WHERE login='" + login+"'");
            ResultSet rs =  statement.executeQuery();

            while (rs.next()){
                if (rs.getInt(1) == 1){
                    log = true;
                }else {
                    System.out.println("Błędny login i/lub hasło");
                    log = false;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return log;
    }
    @Override
    public void logOut(String login){
        try {
            PreparedStatement statement = connection.prepareStatement(
                    "UPDATE users SET isLogged = 0 WHERE login = '" + login+"'");
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    public boolean register(String login, String email, String password){

        try {
            PreparedStatement check = connection.prepareStatement("SELECT * FROM users WHERE login = '" + login+"'");
            ResultSet ch = check.executeQuery();
            if (!ch.isBeforeFirst()){
                try {
                    PreparedStatement statement = connection.prepareStatement(
                            "INSERT INTO users VALUES ('"+login+"','"+password+"','"+email+"',1)"
                    );
                    statement.executeUpdate();
                    reg = true;
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }else reg = false;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
            return reg;
    }

    @Override
    public List<String> friends(){
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT login FROM users");
            ResultSet rs = statement.executeQuery();
            while (rs.next()){
                tab.add(rs.getString(1));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return tab;
    }
}

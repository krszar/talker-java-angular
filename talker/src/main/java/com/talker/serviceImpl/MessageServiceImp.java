package com.talker.serviceImpl;

import com.talker.db.dbClass;
import com.talker.model.MessageModel;
import com.talker.service.MessageService;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MessageServiceImp implements MessageService {

    Connection connection;
    List<List<String>> tab = new ArrayList<List<String>>();
    String[] temp = new String[2];

    public MessageServiceImp() throws SQLException {
        connection = dbClass.getConnection();
    }
    @Override
    public List<List<String>> messages(){
        try {

            tab.clear();
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM messages");
            ResultSet rs = statement.executeQuery();
            while (rs.next()){
                temp[0] = rs.getString(1);
                temp[1] = rs.getString(2);
                tab.add(List.of(temp));

            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return tab;
    }

    @Override
    public void saveMsg(String from, String msg){
        try {
            PreparedStatement statement = connection.prepareStatement
                    ("INSERT INTO messages VALUES('"+from+"','"+msg+"')");
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
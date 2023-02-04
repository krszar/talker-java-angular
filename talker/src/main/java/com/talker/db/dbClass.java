package com.talker.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class dbClass {
    private static Connection connection = null;
    public static Connection getConnection() throws SQLException {
        if (connection != null){
            return connection;
        }else {
            String driver = "com.mysql.cj.jdbc.Driver";
            String url = "jdbc:mysql://localhost:3306/talkerusers?useSSl=false";
            String user = "root";
            String password = "admin";

            try {
                Class.forName(driver);
                connection = DriverManager.getConnection(url, user, password);
            } catch (ClassNotFoundException e) {
                throw new RuntimeException(e);
            }
        }

        return connection;
    }
}
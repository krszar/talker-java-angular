package com.talker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.talker.service.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
    String user = null;



    @Autowired
    private UserService userService;
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("login/{login}/{password}")
    public boolean UserLogin(@PathVariable("login") String login1, @PathVariable("password") String password1){

        boolean valid = userService.loginValid(login1, password1);
        if(valid == true){
        userService.setLog(login1);
        user = login1;

        }
        System.out.println("Błędny login");
        return valid;

    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("logout")
    public boolean UserLogout(){
        userService.logOut(user);
        return false;

    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("check")
    public boolean UserCheck(){

        boolean check = userService.isLog(user);

        return check;

    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("register/{login}/{email}/{password}/{password2}")
    public boolean CreateUser(@PathVariable("login") String login1, @PathVariable("email") String email1
    ,@PathVariable("password") String password1,@PathVariable("password2") String passwordcheck){
        boolean add = false;
        if(password1.equals(passwordcheck)){
           add = userService.register(login1, email1, password1);
        }else {
            System.out.println("Hasła są różne "+ password1+" "+passwordcheck);
        }
        System.out.println("Dodano użytkownika " + add);
        return add;
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("friends")
    public String[] friendsList(){
        List<String> fr = new ArrayList<String>();
         fr = userService.friends();
        String[] arr = new String[fr.size()];
        for (int i =0; i < fr.size(); i++){
            arr[i] = fr.get(i);
        }
        return arr;
    }

}
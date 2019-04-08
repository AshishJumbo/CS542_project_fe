package com.amazonaws.lambda.demo;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import org.json.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

public class AddUserHandler implements RequestStreamHandler {
	JSONParser parser = new JSONParser();
    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
    	LambdaLogger logger = context.getLogger();
        logger.log("Loading Java Lambda handler of ProxyWithStream");
        
        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
        JSONObject responseJson = new JSONObject();
        String responseCode = "200";
        
        //	default value
        String user_name = "";
        String password = "";
        String email = "";
        
        try {
        	JSONObject event = (JSONObject)parser.parse(reader);
        	logger.log(event.toString());
            if ( event.get("user_name") != null) {
                user_name = (String)event.get("user_name");
            }
            if ( event.get("password") != null) {
            	password = (String)event.get("password");
            }
            if (event.get("email") != null) {
            	email = (String)event.get("email");
            }

            //	Error handle
            if (user_name == "" || password == "") {
            	throw new Exception("Invalid input to add new user");
            }
            
            addUser(user_name, password, email, context);
            
            JSONObject responseBody = new JSONObject();
            responseBody.put("input", event.toString());

            responseJson.put("isBase64Encoded", false);
            responseJson.put("statusCode", responseCode);
            responseJson.put("body", responseBody.toString());  

        } catch(Exception pex) {
            logger.log(pex.toString());
        }

        logger.log(responseJson.toString());
        OutputStreamWriter writer = new OutputStreamWriter(output, "UTF-8");
        writer.write(responseJson.toString());  
        writer.close();
    }
    
	private void addUser(String user_name, String password, String email, Context context) {
		LambdaLogger logger = context.getLogger();
		try {
    		String url = "jdbc:mysql://cardb.clnm8zsvchg3.us-east-2.rds.amazonaws.com:3306";
    	    String username = "calcAdmin";
    	    String dbpassword = "rootmasterpassword";

    	    Connection conn = DriverManager.getConnection(url, username, dbpassword);
    	    Statement stmt = conn.createStatement();
    	    
    	    //	Add new user
    	    String newUser = String.format("INSERT INTO innodb.User (user_name, password, email) VALUES ('%s', '%s', '%s')",
    	    		user_name, password, email);
    	    stmt.executeUpdate(newUser);
    	    
    	    stmt.close();
    	    conn.close();

    	} catch (Exception e) {
    	    e.printStackTrace();
    	    logger.log("Caught exception: " + e.getMessage());
    	}
	}

}

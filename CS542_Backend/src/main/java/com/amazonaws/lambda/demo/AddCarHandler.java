package com.amazonaws.lambda.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

public class AddCarHandler implements RequestStreamHandler {
	JSONParser parser = new JSONParser();
    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
    	LambdaLogger logger = context.getLogger();
        logger.log("Loading Java Lambda handler of ProxyWithStream");
        
        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
        JSONObject responseJson = new JSONObject();
        String responseCode = "200";
        
        //	default value
        String VIN = "";
        int model = -1;
        int mileage = -1;
        int price = -1;
        String color = "";
        String user_name = "";
        
        try {
        	JSONObject event = (JSONObject)parser.parse(reader);
        	logger.log(event.toString());
            if ( event.get("VIN") != null) {
            	VIN = (String)event.get("VIN");
            }
            if ( event.get("model") != null) {
                model = Integer.parseInt((String)event.get("model"));
            }
            if ( event.get("mileage") != null) {
                mileage = Integer.parseInt((String)event.get("mileage"));
            }
            if ( event.get("price") != null) {
                price = Integer.parseInt((String)event.get("price"));
            }
            if ( event.get("color") != null) {
                color = (String)event.get("color");
            }
            if ( event.get("user_name") != null) {
                user_name = (String)event.get("user_name");
            }

            //	Error handle
            if (VIN == "" || model == -1 || mileage == -1 || color == "" || user_name == "") {
            	throw new Exception("Invalid input to add new car");
            }
            
            addCar(VIN, model, mileage, price, color, user_name, context);
            
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
	private void addCar(String VIN, int model, int mileage, int price, String color, String user_name,
			Context context) {
		LambdaLogger logger = context.getLogger();
		try {
    		String url = "jdbc:mysql://cardb.clnm8zsvchg3.us-east-2.rds.amazonaws.com:3306";
    	    String username = "calcAdmin";
    	    String dbpassword = "rootmasterpassword";

    	    Connection conn = DriverManager.getConnection(url, username, dbpassword);
    	    Statement stmt = conn.createStatement();
    	    
    	    //	Add new car
    	    String newCar = String.format("INSERT INTO innodb.Car (VIN, model, mileage, price, color, user_name)"
    	    		+ " VALUES ('%s', '%s', %d, %d, '%s', '%s')",
    	    		VIN, model, mileage, price, color, user_name);
    	    stmt.executeUpdate(newCar);
    	    
    	    stmt.close();
    	    conn.close();

    	} catch (Exception e) {
    	    e.printStackTrace();
    	    logger.log("Caught exception: " + e.getMessage());
    	}
	}

}

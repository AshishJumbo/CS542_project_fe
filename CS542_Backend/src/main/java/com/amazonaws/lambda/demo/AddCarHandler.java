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
        int year = 0;
        int makeId = 0;
        int modelId = 0;
        int trimId = 0;
        String vin = "";
        int mile = 0;
        String color = "";
        int price = 0;
        String description = "";
        int userId = 0;
        
        try {
        	JSONObject event = (JSONObject)parser.parse(reader);
        	logger.log(event.toString());
        	
            if ( event.get("year") != null) {
                year = Integer.parseInt((String)event.get("year"));
            }
            if ( event.get("makeId") != null) {
            	makeId = Integer.parseInt((String)event.get("makeId"));
            }
            if ( event.get("modelId") != null) {
            	modelId = Integer.parseInt((String)event.get("modelId"));
            }
            if ( event.get("trimId") != null) {
            	trimId = Integer.parseInt((String)event.get("trimId"));
            }
            if ( event.get("vin") != null) {
            	vin = (String)event.get("vin");
            }
            if ( event.get("mile") != null) {
            	mile = Integer.parseInt((String)event.get("mile"));
            }
            if ( event.get("color") != null) {
            	color = (String)event.get("color");
            }
            if ( event.get("price") != null) {
            	price = Integer.parseInt((String)event.get("price"));
            }
            if ( event.get("description") != null) {
            	description = (String)event.get("description");
            }
            if ( event.get("userId") != null) {
            	userId = Integer.parseInt((String)event.get("userId"));
            }

//            //	Error handle
//            if (VIN == "" || model == -1 || mileage == -1 || color == "" || user_name == "") {
//            	throw new Exception("Invalid input to add new car");
//            }
            
            addCar(year, makeId, modelId, trimId, vin, mile, color, price, description, userId, context);
            
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
	private void addCar(int year, int makeId, int modelId, int trimId, String vin, int mile, String color, int price, String description, int userId,
			Context context) {
		LambdaLogger logger = context.getLogger();
		try {
    		String url = "jdbc:mysql://cardb.clnm8zsvchg3.us-east-2.rds.amazonaws.com:3306";
    	    String username = "calcAdmin";
    	    String dbpassword = "rootmasterpassword";

    	    Connection conn = DriverManager.getConnection(url, username, dbpassword);
    	    Statement stmt = conn.createStatement();
    	    
    	    //	Add new car
    	    String newCar = String.format("INSERT INTO innodb.Car (year, makeId, modelId, trimId, vin, mile, color, price, description, userId)"
    	    		+ " VALUES (%d, %d, %d, %d, '%s', %d, '%s', %d, '%s', %d)",
    	    		year, makeId, modelId, trimId, vin, mile, color, price, description, userId);
    	    logger.log(newCar);
    	    stmt.executeUpdate(newCar);
    	    
    	    stmt.close();
    	    conn.close();

    	} catch (Exception e) {
    	    e.printStackTrace();
    	    logger.log("Caught exception: " + e.getMessage());
    	}
	}

}

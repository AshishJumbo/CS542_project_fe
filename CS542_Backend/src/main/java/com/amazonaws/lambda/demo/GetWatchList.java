package com.amazonaws.lambda.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

public class GetWatchList implements RequestStreamHandler {
	JSONParser parser = new JSONParser();
    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
    	LambdaLogger logger = context.getLogger();
        logger.log("Loading Java Lambda handler of ProxyWithStream");
        
        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
        JSONObject responseJson = new JSONObject();
        String responseCode = "200";
        
        String user_name = "";
        
        try {
        	JSONObject event = (JSONObject)parser.parse(reader);
        	logger.log(event.toString());
        	if ( event.get("user_name") != null) {
            	user_name = (String)event.get("user_name");
            }
            
            JSONObject vehicleList = getWatchlist(user_name, context);
            
            JSONObject responseBody = new JSONObject();
            responseBody.put("input", event.toString());
            responseBody.put("vehicleList", vehicleList.toString());

            responseJson.put("isBase64Encoded", false);
            responseJson.put("statusCode", responseCode);
            responseJson.put("body", responseBody.toString());  

        } catch(Exception pex) {
            logger.log(pex.toString());
            logger.log("" + pex.getStackTrace()[0].getLineNumber());
        }
        
        logger.log(responseJson.toString());
        OutputStreamWriter writer = new OutputStreamWriter(output, "UTF-8");
        writer.write(responseJson.toString());  
        writer.close();
    }
	private JSONObject getWatchlist(String user_name, Context context) {
		LambdaLogger logger = context.getLogger();
		JSONObject rs = new JSONObject();
		try {
    		String url = "jdbc:mysql://cardb.clnm8zsvchg3.us-east-2.rds.amazonaws.com:3306";
    	    String username = "calcAdmin";
    	    String dbpassword = "rootmasterpassword";

//    	    Class.forName("com.mysql.jdbc.Driver");
    	    Connection conn = DriverManager.getConnection(url, username, dbpassword);
    	    Statement stmt = conn.createStatement();
    	    
    	    //	Add new car
    	    String listVehicle = String.format("SELECT c.VIN, m.year, m.make, m.model, m.trim, c.mileage, c.price, c.color, c.user_name " + 
							    	    		"FROM (SELECT VIN FROM innodb.Watchlist AS w " + 
							    	    		"WHERE w.user_name = '%s') AS v " + 
							    	    		"INNER JOIN innodb.Car as c " + 
							    	    		"ON v.VIN = c.VIN " + 
							    	    		"INNER JOIN innodb.Model as m " + 
							    	    		"ON c.model = m.id", user_name);
    	    ResultSet resultSet = stmt.executeQuery(listVehicle);
    	    
    	    JSONArray vehicleList = new JSONArray();
    	    while (resultSet.next()) {
    	    	JSONObject vehicle = new JSONObject();
    	    	vehicle.put("VIN", resultSet.getString("c.VIN"));
    	    	vehicle.put("year", resultSet.getString("m.year"));
    	    	vehicle.put("make", resultSet.getString("m.make"));
    	    	vehicle.put("model", resultSet.getString("m.model"));
    	    	vehicle.put("trim", resultSet.getString("m.trim"));
    	    	vehicle.put("mileage", resultSet.getInt("c.mileage"));
    	    	vehicle.put("price", resultSet.getInt("c.price"));
    	    	vehicle.put("color", resultSet.getString("c.color"));
    	    	vehicle.put("user_name", resultSet.getString("c.user_name"));
    	    	vehicleList.add(vehicle);
    	    }
    	    
    	    rs.put("vehicles", vehicleList);

    	    resultSet.close();
    	    
    	    stmt.close();
    	    conn.close();

    	} catch (Exception e) {
    	    e.printStackTrace();
    	    logger.log("Caught exception: " + e.getMessage());
    	    logger.log("" + e.getStackTrace()[0].getLineNumber());
    	}
		return rs;
	}

}

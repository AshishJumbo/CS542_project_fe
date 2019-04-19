package com.amazonaws.lambda.demo;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class GetSelllist implements RequestStreamHandler {
    JSONParser parser = new JSONParser();

    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
        LambdaLogger logger = context.getLogger();
        logger.log("Loading Java Lambda handler of ProxyWithStream");

        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
        JSONObject responseJson = new JSONObject();
        String responseCode = "200";

        int userId = 0;

        try {
            JSONObject event = (JSONObject) parser.parse(reader);
            logger.log(event.toString());
            if (event.get("userId") != null) {
                userId = Integer.parseInt((String) event.get("userId"));
            }

            JSONObject vehicleList = getSelllist(userId, context);

            JSONObject responseBody = new JSONObject();
//            responseBody.put("input", event.toString());
            responseBody.put("vehicleList", vehicleList.toString());

            responseJson.put("isBase64Encoded", false);
            responseJson.put("statusCode", responseCode);
            responseJson.put("body", responseBody.toString());

        } catch (Exception pex) {
            logger.log(pex.toString());
            logger.log("" + pex.getStackTrace()[0].getLineNumber());
        }

        logger.log(responseJson.toString());
        OutputStreamWriter writer = new OutputStreamWriter(output, "UTF-8");
        writer.write(responseJson.toString());
        writer.close();
    }

    private JSONObject getSelllist(int userId, Context context) {
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
            String listVehicle = String.format(
                    "select car.id, car.year, make.name, model.name, trim.name, car.vin, car.mile, car.color, car.price, car.description, car.date" +
                            " from innodb.Car as car inner join innodb.Make as make on car.makeId = make.id inner join innodb.Model as model on car.modelId = model.id inner join innodb.Trim as trim on car.trimId = trim.id " +
                            " where car.userId = '%d' and car.isSold = 0", userId);
            ResultSet resultSet = stmt.executeQuery(listVehicle);

            JSONArray vehicleList = new JSONArray();
            while (resultSet.next()) {
                JSONObject vehicle = new JSONObject();
                vehicle.put("carId", resultSet.getString("car.id"));
                vehicle.put("year", resultSet.getString("car.year"));
                vehicle.put("make", resultSet.getString("make.name"));
                vehicle.put("model", resultSet.getString("model.name"));
                vehicle.put("trim", resultSet.getString("trim.name"));
                vehicle.put("vin", resultSet.getString("car.vin"));
                vehicle.put("mile", resultSet.getInt("car.mile"));
                vehicle.put("color", resultSet.getString("car.color"));
                vehicle.put("price", resultSet.getInt("car.price"));
                vehicle.put("description", resultSet.getString("car.description"));
                vehicle.put("date", resultSet.getString("car.date"));
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

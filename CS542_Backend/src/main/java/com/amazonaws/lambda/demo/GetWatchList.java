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

        int userId = 0;

        try {
            JSONObject event = (JSONObject) parser.parse(reader);
            logger.log(event.toString());
            if (event.get("userId") != null) {
                userId = Integer.parseInt((String) event.get("userId"));
            }

            JSONObject vehicleList = getWatchlist(userId, context);

            JSONObject responseBody = new JSONObject();
            responseBody.put("input", event.toString());
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

    private JSONObject getWatchlist(int userId, Context context) {
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
            String listVehicle = String.format("select car.id, car.year, car.makeId, make.name, car.modelId, model.name, car.trimId, trim.name,\n" +
                    "car.vin, car.mile, car.color, car.price, car.description, car.date, car.img_name\n" +
                    "from (select watchlist.carId from innodb.Watchlist as watchlist where watchlist.userId = '%d') as temp1\n" +
                    "inner join innodb.Car as car on temp1.carId = car.id\n" +
                    "inner join innodb.Make as make on car.makeId = make.id\n" +
                    "inner join innodb.Model as model on car.modelId = model.id\n" +
                    "inner join innodb.Trim as trim on car.trimId = trim.id", userId);
            ResultSet resultSet = stmt.executeQuery(listVehicle);

            JSONArray vehicleList = new JSONArray();
            while (resultSet.next()) {
                JSONObject vehicle = new JSONObject();
                vehicle.put("carId", resultSet.getString("car.id"));
                vehicle.put("year", resultSet.getString("car.year"));
                vehicle.put("makeId", resultSet.getString("car.makeId"));
                vehicle.put("make", resultSet.getString("make.name"));
                vehicle.put("modelId", resultSet.getString("car.modelId"));
                vehicle.put("model", resultSet.getString("model.name"));
                vehicle.put("trimId", resultSet.getString("car.trimId"));
                vehicle.put("trim", resultSet.getString("trim.name"));
                vehicle.put("vin", resultSet.getString("car.vin"));
                vehicle.put("mile", resultSet.getInt("car.mile"));
                vehicle.put("price", resultSet.getInt("car.price"));
                vehicle.put("color", resultSet.getString("car.color"));
                vehicle.put("date", resultSet.getString("car.date"));
                vehicle.put("description", resultSet.getString("car.description"));
                vehicle.put("img_name", resultSet.getString("car.img_name"));
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

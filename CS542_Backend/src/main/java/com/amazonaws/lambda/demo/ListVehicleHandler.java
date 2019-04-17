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
public class ListVehicleHandler implements RequestStreamHandler {
    JSONParser parser = new JSONParser();

    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
        LambdaLogger logger = context.getLogger();
        logger.log("Loading Java Lambda handler of ProxyWithStream");

        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
        JSONObject responseJson = new JSONObject();
        String responseCode = "200";

        try {
            JSONObject event = (JSONObject) parser.parse(reader);
            logger.log(event.toString());

            JSONObject vehicleList = listVehicle(context);

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

    private JSONObject listVehicle(Context context) {
        LambdaLogger logger = context.getLogger();
        JSONObject rs = new JSONObject();
        try {
            String url = "jdbc:mysql://cardb.clnm8zsvchg3.us-east-2.rds.amazonaws.com:3306";
            String username = "calcAdmin";
            String dbpassword = "rootmasterpassword";

            Connection conn = DriverManager.getConnection(url, username, dbpassword);
            Statement stmt = conn.createStatement();

            //	Query about every attribute, except the "sold" cars.
            String listVehicle = "select car.id, car.year, make.name, car.makeId, model.name, car.modelId, trim.name, car.trimId, car.price, car.userId, user.user_name, car.color, car.vin, car.mile, car.description, car.date, user.email\n" +
                    "from innodb.Car as car\n" +
                    "inner join innodb.Make as make on car.makeId = make.id\n" +
                    "inner join innodb.Model as model on car.modelId = model.id\n" +
                    "inner join innodb.Trim as trim on car.trimId = trim.id\n" +
                    "inner join innodb.User as user on car.userId = user.id where car.isSold=0;";
            ResultSet resultSet = stmt.executeQuery(listVehicle);
            logger.log(resultSet.toString());

            JSONArray vehicleList = new JSONArray();
            while (resultSet.next()) {
                JSONObject vehicle = new JSONObject();
                vehicle.put("carId", resultSet.getString("car.id"));
                vehicle.put("year", resultSet.getString("car.year"));
                vehicle.put("make", resultSet.getString("make.name"));
                vehicle.put("makeId", resultSet.getString("car.makeId"));
                vehicle.put("model", resultSet.getString("model.name"));
                vehicle.put("modelId", resultSet.getString("car.modelId"));
                vehicle.put("trim", resultSet.getString("trim.name"));
                vehicle.put("trimId", resultSet.getString("car.trimId"));
                vehicle.put("vin", resultSet.getString("car.vin"));
                vehicle.put("userId", resultSet.getString("car.userId"));
                vehicle.put("userName", resultSet.getString("user.user_name"));
                vehicle.put("price", resultSet.getString("car.price"));
                vehicle.put("color", resultSet.getString("car.color"));
                vehicle.put("mile", resultSet.getInt("car.mile"));
                vehicle.put("description", resultSet.getString("car.description"));
                vehicle.put("date", resultSet.getString("car.date"));
                vehicle.put("email", resultSet.getString("user.email"));
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

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

public class ListFeatureHandler implements RequestStreamHandler {
    JSONParser parser = new JSONParser();

    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
        LambdaLogger logger = context.getLogger();
        logger.log("Loading Java Lambda handler of ProxyWithStream");

        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
        JSONObject responseJson = new JSONObject();
        String responseCode = "200";

        int trimId = -1;

        try {
            JSONObject event = (JSONObject) parser.parse(reader);
            logger.log(event.toString());
            if (event.get("trimId") != null) {
                trimId = Integer.parseInt((String) event.get("trimId"));
            }

            JSONObject featureList = listFeatures(trimId, context);

            JSONObject responseBody = new JSONObject();
            responseBody.put("input", event.toString());
            responseBody.put("featureList", featureList.toString());

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

    private JSONObject listFeatures(int trimId, Context context) {
        LambdaLogger logger = context.getLogger();
        JSONObject rs = new JSONObject();
        try {
            String url = "jdbc:mysql://cardb.clnm8zsvchg3.us-east-2.rds.amazonaws.com:3306";
            String username = "calcAdmin";
            String dbpassword = "rootmasterpassword";

            Connection conn = DriverManager.getConnection(url, username, dbpassword);
            Statement stmt = conn.createStatement();

            //	Query for features under the trim id
            String query = String.format("select feature.name, mid.trimId, feature.id from innodb.Feature as feature inner join innodb.Trim_Feature as mid on mid.featureId=feature.id where mid.trimId='%d';", trimId);
            ResultSet resultSet = stmt.executeQuery(query);
            logger.log(resultSet.toString());

            JSONArray featureList = new JSONArray();
            while (resultSet.next()) {
                JSONObject feature = new JSONObject();
                feature.put("featureId", resultSet.getString("feature.id"));
                feature.put("featureName", resultSet.getString("feature.name"));
                feature.put("trimId", resultSet.getString("trim.id"));
                featureList.add(feature);
            }

            rs.put("features", featureList);

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

package edu.gatech.cs.dogrescue.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import edu.gatech.cs.dogrescue.util.SqlLoader;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
@ApplicationScoped
public class AddDogDAO{


    //some random inject
    @Inject
    DataSource dataSource;

    //Loads SQL
    @Inject
    SqlLoader sqlLoader;

    public Integer getMaxDogID() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dog", "maxDogID");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        return resultSet.getInt(1);
                    }
                }
            }
        }
        return -1;
    }


    public Integer addDog(String email, String dogName,
                       String description, Integer age, String sex, boolean altered,
                       Date surrenderDate, String surrenderPhone, boolean byAnimalControl
                       ) throws SQLException{
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dog", "AddDog");
            Integer maxDogID = getMaxDogID();

            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1,email );
                statement.setString(2, dogName);
                statement.setString(3, description);
                statement.setInt(4, age);
                statement.setString(5, sex);
                statement.setBoolean(6, altered);
                statement.setDate(7, surrenderDate);
                statement.setString(8, surrenderPhone);
                statement.setBoolean(9, byAnimalControl);
                statement.executeUpdate();
                return getMaxDogID();
            }
        }
    }

    public void addBreed(Integer dogID, String breeds) throws SQLException{
        Integer maxDogID = getMaxDogID();
        try (Connection connection = dataSource.getConnection()) {
            List<String> dogBreeds;
            if (breeds.contains(",")) {
                dogBreeds = new ArrayList<>(Arrays.asList(breeds.split(", ")));
            } else {
                dogBreeds = Collections.singletonList(breeds);
            }
            for (String s : dogBreeds) {
                String query = sqlLoader.getSql("dog", "AddBreed");
                try (PreparedStatement statement = connection.prepareStatement(query)) {
                    statement.setInt(1, maxDogID);
                    statement.setString(2, s);
                    statement.executeUpdate();
                }
            }
        }

    }



    public void addDogMicrochip(Integer dogID, String microchipID) throws SQLException{
        Integer maxDogID = getMaxDogID();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dog", "addDogMicroChip");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setInt(1, maxDogID );
                statement.setString(2, microchipID);
                statement.executeUpdate();
            }
            
        }

    }

    public void addMicrochip(String microchipID, String microchipVendor) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("microchip", "addnew");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, microchipID );
                statement.setString(2, microchipVendor);
                statement.executeUpdate();
            }

        }
    }

    public void removeMicrochip(String microchipID, String microchipVendor) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("microchip", "delete");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, microchipID );
                statement.setString(2, microchipVendor);
                statement.executeUpdate();
            }

        }
    }
}
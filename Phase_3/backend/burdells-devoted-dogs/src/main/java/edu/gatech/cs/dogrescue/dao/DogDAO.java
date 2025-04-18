package edu.gatech.cs.dogrescue.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import edu.gatech.cs.dogrescue.dto.Dog;
import edu.gatech.cs.dogrescue.util.SqlLoader;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class DogDAO {

    @Inject
    DataSource dataSource;

    @Inject
    SqlLoader sqlLoader;

    public Integer getCurrentNumberOfDogs() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dog", "currentNumberOfDogs");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        return resultSet.getInt(1);
                    }
                }
            }
        }
        return 0;
    }

    public List<Dog> getAllDogs() throws SQLException {
        List<Dog> dogs = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dog", "getAllDogs");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        dogs.add(new Dog(resultSet.getInt("dogID") ,resultSet.getString("name"),resultSet.getString("breed"),
                                resultSet.getString("sex"), resultSet.getBoolean("altered"), resultSet.getInt("ageYears"),resultSet.getInt("ageMonths"),
                                resultSet.getString("adoptability_status")));
                    }
                }
            }
        }
        return dogs;
    }
}

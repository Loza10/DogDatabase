package edu.gatech.cs.dogrescue.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import edu.gatech.cs.dogrescue.dto.Adopter;
import edu.gatech.cs.dogrescue.dto.User;
import edu.gatech.cs.dogrescue.util.SqlLoader;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class UserDAO {

    @Inject
    DataSource dataSource;

    @Inject
    SqlLoader sqlLoader;


    public User findByEmailAndPassword(String email, String password) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("user", "findByEmail");

            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, email);
                statement.setString(2, password);

                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        return new User(
                                resultSet.getString("email"),
                                resultSet.getString("first_name"),
                                resultSet.getString("last_name"),
                                resultSet.getInt("age")
                        );
                    }
                }
            }
        }
        return null;
    }

    public void checkIfUserIsDirector(User user) throws SQLException{
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("user", "isDirectory");

            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, user.getEmailAddress());

                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        user.setDirector(true);
                    }
                }
            }
        }
    }

    public void addAdopter(Adopter adopter) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("user", "addAdopter");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, adopter.getEmailAddress());
                statement.setString(2, adopter.getFirstName());
                statement.setString(3, adopter.getLastName());
                statement.setString(4, adopter.getPhone());
                statement.setString(5, adopter.getStreet());
                statement.setString(6, adopter.getCity());
                statement.setString(7, adopter.getZip());
                statement.setString(8, adopter.getState());
                statement.setInt(9, adopter.getHouseholdSize());
                statement.executeUpdate();
            }
        }
    }
}
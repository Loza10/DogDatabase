package edu.gatech.cs.dogrescue.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import edu.gatech.cs.dogrescue.dto.AdoptionAdd;
import edu.gatech.cs.dogrescue.dto.DogFees;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ApplicationDAO extends BaseDAO {

    public void approveApplication(String email, java.util.Date applicationDate) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
                String query = sqlLoader.getSql("application", "approveApplication");
                try (PreparedStatement statement = connection.prepareStatement(query)) {
                    statement.setDate(1, new Date(new java.util.Date().getTime()));
                    statement.setString(2, email);
                    statement.setDate(3, new Date(applicationDate.getTime()));
                    statement.executeUpdate();
                }
            }
        }

    public void rejectApplication(String email, java.util.Date applicationDate) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "rejectApplication");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, email);
                statement.setDate(2, new Date(applicationDate.getTime()));
                statement.setDate(3, new Date(new java.util.Date().getTime()));
                statement.executeUpdate();
            }
            deleteApplication(email, applicationDate);
        }
    }

    private void deleteApplication(String email, java.util.Date applicationDate) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "deleteApplication");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, email);
                statement.setDate(2, new Date(applicationDate.getTime()));
                statement.executeUpdate();
            }
        }
    }
  
    public void addApp(String email, java.util.Date applicationDate) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "insertApplication");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, email);
                statement.setDate(2, new java.sql.Date(new java.util.Date().getTime()));
                statement.executeUpdate();
            }
        }
    }

    public void addAdopter(String email, String firstName, String lastName, String phoneNumber, String street, String city, String state, String zipCode, Integer householdSize) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "insertAdopter");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, email);
                statement.setString(2, firstName);
                statement.setString(3, lastName);
                statement.setString(4, phoneNumber);
                statement.setString(5, street);
                statement.setString(6, city);
                statement.setString(7, state);
                statement.setString(8, zipCode);
                statement.setInt(9, householdSize);
                statement.executeUpdate();
            }
        }
    }

    public List<AdoptionAdd> searchApplication(String lastName) throws SQLException {
        List<AdoptionAdd> apps = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "searchApplication");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, lastName);
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        //String email, Date applicationDate, String firstName, String lastName,
                        //String street, String city, String state, String zipCode , String phoneNumber, Integer householdSize
                        apps.add(new AdoptionAdd(resultSet.getString("email_address") ,resultSet.getString("first_name"),resultSet.getString("last_name"),
                                resultSet.getString("street"), resultSet.getString("city"), resultSet.getString("state"),resultSet.getString("zip_code"),
                                resultSet.getString("phone_number"), resultSet.getInt("household"), resultSet.getDate("application_date")));
                    }
                }
            }
        }
        return apps;
    }

    public List<AdoptionAdd> searchApplication() throws SQLException {
        List<AdoptionAdd> apps = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "searchApplication");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, "");
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        //String email, Date applicationDate, String firstName, String lastName,
                        //String street, String city, String state, String zipCode , String phoneNumber, Integer householdSize
                        apps.add(new AdoptionAdd(resultSet.getString("email_address") ,resultSet.getString("first_name"),resultSet.getString("last_name"),
                                resultSet.getString("street"), resultSet.getString("city"), resultSet.getString("state"),resultSet.getString("zip_code"),
                                resultSet.getString("phone_number"), resultSet.getInt("household"), resultSet.getDate("application_date")));
                    }
                }
            }
        }
        return apps;
    }

     public AdoptionAdd recentApp(String email) throws SQLException {
        AdoptionAdd apps = new AdoptionAdd();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "recentApproved");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, email);
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        //String email, Date applicationDate, String firstName, String lastName,
                        //String street, String city, String state, String zipCode , String phoneNumber, Integer householdSize
                        apps = new AdoptionAdd(resultSet.getString("email"),resultSet.getDate("date"),resultSet.getString("first_name"),resultSet.getString("last_name"),
                                resultSet.getString("street"), resultSet.getString("city"), resultSet.getString("state"),resultSet.getString("zip_code"),
                                resultSet.getString("phone_number"), resultSet.getInt("household"));
                    }
                }
            }
        }
        return apps;
     }

     public DogFees getDogFees(Integer dogID) throws SQLException {
        DogFees apps = new DogFees();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "getFees");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setInt(1, dogID);
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        apps = new DogFees(resultSet.getInt("dogID"),resultSet.getString("name"), resultSet.getDouble("adoptionFee"), resultSet.getInt("isWaived"));
                    }
                }
            }
        }
        return apps;
     }

     public void updateAdoption(Integer dogID, Double fee, Integer isWaived,String decisionDate,String email,String date) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "updateAdoption");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                    statement.setInt(1, dogID);
                    statement.setDouble(2, fee);
                    statement.setInt(3, isWaived);
                    statement.setString(4, decisionDate);
                    statement.setString(5,email);
                    statement.setString(6, date);
                    statement.executeUpdate();
                }
            }
     }

    public void deleteAdoption(String email, String date) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "deleteAdoption");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, email);
                statement.setString(2, date);
                statement.executeUpdate();
            }
        }
    }

    public void insertAdoption(String email, String date, Double fee, Integer isWaived, String decisionDate, Integer dogID) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "insertAdoption");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, email);
                statement.setString(2, date);
                statement.setDouble(3, fee);
                statement.setInt(4, isWaived);
                statement.setString(5, decisionDate);
                statement.setInt(6, dogID);
                statement.executeUpdate();
            }
        }
    }

    public void addApplication(String email) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("application", "addApplication");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, email);
                statement.setDate(2, new Date(new java.util.Date().getTime()));
                statement.executeUpdate();
            }
        }
    }
}

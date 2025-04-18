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

import edu.gatech.cs.dogrescue.dto.Category;
import edu.gatech.cs.dogrescue.dto.DogDetails;
import edu.gatech.cs.dogrescue.dto.ExpenseDetails;
import edu.gatech.cs.dogrescue.util.SqlLoader;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class DogDetailsDAO {

    @Inject
    DataSource dataSource;

    @Inject
    SqlLoader sqlLoader;

    public boolean updateDetails(Integer dogID, String breeds, String sex, Boolean altered, String microID, String microVendor) throws SQLException {
        if (!breeds.equalsIgnoreCase("Unknown") && breeds != null && !breeds.isEmpty()) {
            deleteBreeds(dogID);
            insertBreeds(dogID, breeds);
        }
        if (!sex.equalsIgnoreCase("Unknown") && !sex.isEmpty() && sex != null) {
            updateSex(dogID, sex);
        }
        if (altered != null) {
            updateStatus(dogID, altered);
        }
        if ((microID != null && !microID.isEmpty() && !microID.equalsIgnoreCase("")) && (!(microVendor.equals("Unknown")) && microVendor != null) && !microVendor.equalsIgnoreCase("")) {
            updateMicroChip(microID, microVendor);
            setMicroChip(dogID, microID);
        }
        return true;
    }
    
    public DogDetails getDetails(Integer dogID) throws SQLException {
    	DogDetails dog = new DogDetails();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dogDetails", "getDetails");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
            	statement.setInt(1, dogID);

                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        dog = new DogDetails(resultSet.getInt("dogID") ,resultSet.getString("name"),resultSet.getString("breeds"),
                                resultSet.getString("sex"), resultSet.getBoolean("altered"), resultSet.getInt("age_years"),resultSet.getInt("age_months"),
                                resultSet.getString("description"), resultSet.getString("microchipID"),resultSet.getString("microchipVendor"),
                                resultSet.getDate("surrender_date"),resultSet.getString("surrender_phone"),resultSet.getBoolean("by_animal_control"),resultSet.getString("adoptability_status"));
                    }
                }
            }
        }
        return dog;
    }

    public void deleteBreeds(Integer dogID) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dogDetails", "deleteBreeds");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setInt(1, dogID);
                statement.executeUpdate();
            }
        }
    }

    public void insertBreeds(Integer dogID, String breeds) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            List<String> dogBreeds;
            if (breeds.contains(",")) {
                dogBreeds = new ArrayList<>(Arrays.asList(breeds.split(", ")));
            } else {
                dogBreeds = Collections.singletonList(breeds);
            }
            for (String s : dogBreeds) {
                String query = sqlLoader.getSql("dogDetails", "insertBreeds");
                try (PreparedStatement statement = connection.prepareStatement(query)) {
                    statement.setInt(1, dogID);
                    statement.setString(2, s);
                    statement.executeUpdate();
                }
            }
        }
    }

    public void updateSex(Integer dogID, String sex) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dogDetails", "updateSex");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, sex);
                statement.setInt(2, dogID);
                statement.executeUpdate();
            }
        }
    }
    public void updateStatus(Integer dogID, boolean altered) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dogDetails", "updateStatus");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setBoolean(1, altered);
                statement.setInt(2, dogID);
                statement.executeUpdate();
            }
        }
    }

    public void updateMicroChip(String microID, String microVendor) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dogDetails", "updateMicroChip");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, microID);
                statement.setString(2, microVendor);
                statement.executeUpdate();
            }
        }
    }
    public void setMicroChip(Integer dogID, String microID) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dogDetails", "setMicroChip");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setInt(1, dogID);
                statement.setString(2, microID);
                statement.executeUpdate();
            }
        }
    }


//    public void addExpense(Integer dogID, String vendor, Date expenseDate, Integer amount, String category) throws SQLException {
//        try (Connection connection = dataSource.getConnection()) {
//            String query = sqlLoader.getSql("dog", "addExpense");
//            try (PreparedStatement statement = connection.prepareStatement(query)) {
//                statement.setInt(1, dogID);
//                statement.setString(2, vendor);
//                statement.setDate(3, expenseDate);
//                statement.setInt(4, amount);
//                statement.setString(5, category);
//                statement.setDate(6, expenseDate);
//                statement.setInt(7, dogID);
//                statement.setInt(8, dogID);
//                statement.executeUpdate();
//            }
//        }
//    }

    public void addExpense(Integer dogID, String vendor, java.util.Date expenseDate, Double amount, String category) throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dog", "insertExpense");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setInt(1, dogID);
                statement.setString(2, vendor);
                statement.setDate(3, new Date(expenseDate.getTime()));
                statement.setDouble(4, amount);
                statement.setString(5, category);
                statement.executeUpdate();
            }
        }
    }

    public List<Category> getCategories() throws SQLException {
        List<Category> categories = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dog", "getExpenseCategory");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        categories.add(new Category(resultSet.getString("name")));
                    }
                }
            }
        }
        return categories;
    }

    public List<ExpenseDetails> getExpenses(Integer dogID) throws SQLException {
        List<ExpenseDetails> expenses = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("dog", "getDetailExpenses");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
            	statement.setInt(1, dogID);
                statement.setInt(2, dogID);
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        expenses.add(new ExpenseDetails(resultSet.getString("category"),resultSet.getDouble("amount")));
                    }
                }
            }
        }
        return expenses;
    }


}

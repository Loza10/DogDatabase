package edu.gatech.cs.dogrescue.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import edu.gatech.cs.dogrescue.dto.ACDrillAdopt;
import edu.gatech.cs.dogrescue.dto.ACDrillExpense;
import edu.gatech.cs.dogrescue.dto.ACDrillSurrender;
import edu.gatech.cs.dogrescue.dto.ACMainReport;
import edu.gatech.cs.dogrescue.dto.AdoptionReview;
import edu.gatech.cs.dogrescue.dto.ExpenseAnalysisReport;
import edu.gatech.cs.dogrescue.dto.MonthlyAdoptionReport;
import edu.gatech.cs.dogrescue.dto.User;
import edu.gatech.cs.dogrescue.dto.Volunteer;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ReportDAO extends BaseDAO {

    public List<MonthlyAdoptionReport> getMonthlyAdoptionReport() throws SQLException {
        List<MonthlyAdoptionReport> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("report", "monthlyAdoptionReport");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        results.add(new MonthlyAdoptionReport(
                                resultSet.getString("month_year"),
                                resultSet.getString("breeds"),
                                resultSet.getInt("Surrendered_dogs"),
                                resultSet.getInt("Adopted_dogs"),
                                resultSet.getDouble("total_expense"),
                                resultSet.getDouble("total_adoptionFee"),
                                resultSet.getDouble("profit")));
                    }
                }
            }
        }
        return results;
    }

    public List<ExpenseAnalysisReport> getExpenseAnalysisReport() throws SQLException {
        List<ExpenseAnalysisReport> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("report", "expenseAnalysisReport");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        results.add(new ExpenseAnalysisReport(
                                resultSet.getString("vendorName"),
                                resultSet.getInt("totalExpenses")));
                    }
                }
            }
        }
        return results;
    }

    public List<ACMainReport> getACMainReport() throws SQLException {
        List<ACMainReport> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("report", "acMainReport");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        results.add(new ACMainReport(
                                resultSet.getString("month_year"),
                                resultSet.getInt("count_surrendered"),
                                resultSet.getInt("count_adopted"),
                                resultSet.getDouble("total_expenses")));
                    }
                }
            }
        }
        return results;
    }

    public List<ACDrillSurrender> getACDrillSurrender(String MonthYear) throws SQLException {
        List<ACDrillSurrender> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("report", "acDrillSurrender");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, MonthYear);
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        results.add(new ACDrillSurrender(
                                resultSet.getInt("Dog ID"),
                                resultSet.getString("Breed"),
                                resultSet.getString("Sex"),
                                resultSet.getBoolean("Altered"),
                                resultSet.getString("Microchip ID"),
                                resultSet.getDate("Surrender Date")
                                ));
                    }
                }
            }
        }
        return results;
    }

    public List<ACDrillAdopt> getACDrillAdopt(String MonthYear) throws SQLException {
        List<ACDrillAdopt> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("report", "acDrillAdopt");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, MonthYear);
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        results.add(new ACDrillAdopt(
                                resultSet.getInt("Dog ID"),
                                resultSet.getString("Breed"),
                                resultSet.getString("Sex"),
                                resultSet.getString("Microchip ID"),
                                resultSet.getDate("Surrender Date"),
                                resultSet.getInt("RescueDays")
                                ));
                    }
                }
            }
        }
        return results;
    }

    public List<ACDrillExpense> getACDrillExpense(String MonthYear) throws SQLException {
        List<ACDrillExpense> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("report", "acDrillExpense");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, MonthYear);
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        results.add(new ACDrillExpense(
                                resultSet.getInt("Dog ID"),
                                resultSet.getString("Breed"),
                                resultSet.getString("Sex"),
                                resultSet.getString("Microchip ID"),
                                resultSet.getDate("Surrender Date"),
                                resultSet.getBoolean("Surrendered by Animal Control"),
                                resultSet.getDouble("Total Expenses")
                                ));
                    }
                }
            }
        }
        return results;
    }

    public List<User> getVolunteerLookup(String name) throws SQLException {
        List<User> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("report", "volunteerLookup");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, name);
                statement.setString(2, name);

                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        results.add(new User(
                                resultSet.getString("email"),
                                resultSet.getString("first_name"),
                                resultSet.getString("last_name"),
                                resultSet.getString("phone")
                                ));
                    }
                }
            }
        }
        return results;
    }

    public List<User> getVolunteerLookup() throws SQLException {
        List<User> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("report", "volunteerLookup");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, "");
                statement.setString(2, "");

                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        results.add(new User(
                                resultSet.getString("email"),
                                resultSet.getString("first_name"),
                                resultSet.getString("last_name"),
                                resultSet.getString("phone")
                                ));
                    }
                }
            }
        }
        return results;
    }

    public List<Volunteer> getVolunteerBirthday(String month, String year) throws SQLException {
        List<Volunteer> volunteers = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("report", "volunteerBirthday");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, year);
                statement.setString(2, month);
                statement.setString(3, month);
                statement.setString(4, month);
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        volunteers.add(new Volunteer(
                                resultSet.getString("first_name"),
                                resultSet.getString("last_name"),
                                resultSet.getString("email"),
                                resultSet.getString("milestoneBirthday")
                                ));
                    }
                }
                return volunteers;
            }
        }
    }

    public List<AdoptionReview> getAdoptionReviewReport() throws SQLException {
        List<AdoptionReview> adoptionReviews = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            String query = sqlLoader.getSql("report", "adoptionReview");
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        adoptionReviews.add(new AdoptionReview(
                                resultSet.getString("first_name"),
                                resultSet.getString("last_name"),
                                resultSet.getString("street"),
                                resultSet.getString("city"),
                                resultSet.getString("state"),
                                resultSet.getString("zip"),
                                resultSet.getString("phone"),
                                resultSet.getString("email"),
                                resultSet.getDate("date")
                        ));
                    }
                }
                return adoptionReviews;
            }
        }
    }
}

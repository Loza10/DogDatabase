package edu.gatech.cs.dogrescue.services;

import java.sql.SQLException;
import java.util.List;

import edu.gatech.cs.dogrescue.dao.ReportDAO;
import edu.gatech.cs.dogrescue.dto.*;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class ReportService {
    @Inject
    ReportDAO reportDAO;

    public List<MonthlyAdoptionReport> getMonthlyAdoptionReport() throws SQLException {
        return reportDAO.getMonthlyAdoptionReport();
    }

    public List<ExpenseAnalysisReport> getExpenseAnalysisReport() throws SQLException {
        return reportDAO.getExpenseAnalysisReport();
    }

    public List<ACMainReport> getACMainReport() throws SQLException {
        return reportDAO.getACMainReport();
    }

    public List<ACDrillSurrender> getACDrillSurrender(String MonthYear) throws SQLException {
        return reportDAO.getACDrillSurrender(MonthYear);
    }

    public List<ACDrillAdopt> getACDrillAdopt(String MonthYear) throws SQLException {
        return reportDAO.getACDrillAdopt(MonthYear);
    }

    public List<ACDrillExpense> getACDrillExpense(String MonthYear) throws SQLException {
        return reportDAO.getACDrillExpense(MonthYear);
    }

    public List<User> getVolunteerLookup(String name) throws SQLException {
        return reportDAO.getVolunteerLookup(name);
    }

    public List<User> getVolunteerLookup() throws SQLException {
        return reportDAO.getVolunteerLookup();
    }

    public List<Volunteer> getVolunteerBirthDayReport(String month, String year) throws SQLException {
        return reportDAO.getVolunteerBirthday(month, year);
    }

    public List<AdoptionReview> getAdoptionReviewReport() throws SQLException {
        return reportDAO.getAdoptionReviewReport();
    }
}

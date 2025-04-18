package edu.gatech.cs.dogrescue.services;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Date;
import java.util.List;

import edu.gatech.cs.dogrescue.dao.DogDetailsDAO;
import edu.gatech.cs.dogrescue.dto.Category;
import edu.gatech.cs.dogrescue.dto.DogDetails;
import edu.gatech.cs.dogrescue.dto.ExpenseDetails;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;

@RequestScoped
public class DogDetailsService {

    @Inject
    DogDetailsDAO dogDetailsDAO;

    public DogDetails getDetails(Integer dogID) throws SQLException {
        return dogDetailsDAO.getDetails(dogID);
    }
    public boolean updateDetails(Integer dogID, DogDetails dogDetails) throws SQLException {
        return dogDetailsDAO.updateDetails(dogID, dogDetails.getBreeds(), dogDetails.getSex(), dogDetails.isAltered(), dogDetails.getMicrochipID(), dogDetails.getMicrochipVendor());
    }
    public void addExpense(Integer dogID, String vendor, Date expenseDate, Double amount, String category) throws SQLException{
        try{
            dogDetailsDAO.addExpense(dogID, vendor, expenseDate, amount, category);
        } catch (SQLException e) {
            if(e instanceof SQLIntegrityConstraintViolationException){
                throw new BadRequestException("Only 1 expense per vendor allowed per day");
            }
            throw new RuntimeException(e);
        }
    }

    public List<Category> getCategories() throws SQLException {
        return dogDetailsDAO.getCategories();
    }

    public List<ExpenseDetails> getExpenses(Integer dogID) throws SQLException {
        return dogDetailsDAO.getExpenses(dogID);
    }

}

package edu.gatech.cs.dogrescue.services;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import edu.gatech.cs.dogrescue.dao.ApplicationDAO;
import edu.gatech.cs.dogrescue.dto.AdoptionAdd;
import edu.gatech.cs.dogrescue.dto.AdoptionUpdate;
import edu.gatech.cs.dogrescue.dto.DogFees;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class ApplicationService {

    @Inject
    ApplicationDAO applicationDAO;

    public void addApplication(String email, Date applicationDate) throws SQLException {
        applicationDAO.approveApplication(email, applicationDate);
    }

    public void rejectApplication(String email, Date date) throws SQLException {
        applicationDAO.rejectApplication(email,date);
    }

    public void addApp(AdoptionAdd app) throws SQLException {
        try {
            applicationDAO.addAdopter(app.getEmail(), app.getFirstName(), app.getLastName(), app.getPhoneNumber(), app.getStreet(), app.getCity(), app.getState(), app.getZipCode(), app.getHouseholdSize());
        } catch (Exception e) {
        }
        applicationDAO.addApp(app.getEmail(), new Date());
    } 

    public List<AdoptionAdd> searchApplication(String lastName) throws SQLException {
        return applicationDAO.searchApplication(lastName);
    }

    public List<AdoptionAdd> searchApplication() throws SQLException {
        return applicationDAO.searchApplication();
    }
    
    public AdoptionAdd recentApp(String email) throws SQLException {
        return applicationDAO.recentApp(email);
    }

    public DogFees getDogFees(Integer dogID) throws SQLException {
        return applicationDAO.getDogFees(dogID);
    }

    public void updateAdoption(AdoptionUpdate app) throws SQLException {
        applicationDAO.updateAdoption(app.getDogID(),app.getFee(), app.getIsWaived(), app.getDecisionDate(), app.getEmail(), app.getDate());
    } 

    public void changeAdoption(AdoptionUpdate app) throws SQLException {
        applicationDAO.deleteAdoption(app.getEmail(),app.getDate());
        applicationDAO.insertAdoption(app.getEmail(), app.getDate(),app.getFee(), app.getIsWaived(), app.getDecisionDate(),app.getDogID());
    } 
}

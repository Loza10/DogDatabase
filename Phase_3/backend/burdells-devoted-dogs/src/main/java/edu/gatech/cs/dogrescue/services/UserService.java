package edu.gatech.cs.dogrescue.services;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

import edu.gatech.cs.dogrescue.dao.ApplicationDAO;
import edu.gatech.cs.dogrescue.dao.UserDAO;
import edu.gatech.cs.dogrescue.dto.Adopter;
import edu.gatech.cs.dogrescue.dto.LoginRequest;
import edu.gatech.cs.dogrescue.dto.User;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;

@RequestScoped
public class UserService {

    @Inject
    UserDAO userDAO;

    @Inject
    ApplicationDAO applicationDAO;

    public User verifyUser(LoginRequest loginRequest) {
        try {
            User user =  userDAO.findByEmailAndPassword(loginRequest.getEmailAddress(),loginRequest.getPassword());
            if(user == null){
                throw new NotFoundException("User not found");
            }
            userDAO.checkIfUserIsDirector(user);
            return user;
        } catch (SQLException e) {
            throw new NotFoundException(e);
        }
    }

    public void addAdopter(Adopter adopter) {
        try{
            userDAO.addAdopter(adopter);
            applicationDAO.addApplication(adopter.getEmailAddress());
        } catch (SQLException e) {
            if(e instanceof SQLIntegrityConstraintViolationException){
                throw new BadRequestException("User can only enter one application per day");
            }
            throw new RuntimeException(e);
        }
    }
}

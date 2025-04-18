package edu.gatech.cs.dogrescue.services;

import edu.gatech.cs.dogrescue.dao.DogDAO;
import edu.gatech.cs.dogrescue.dto.Dog;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

import java.sql.SQLException;
import java.util.List;

@RequestScoped
public class DogService {

    @Inject
    DogDAO dogDAO;

    public Integer getCurrentNumberOfDogs() throws SQLException {
        return dogDAO.getCurrentNumberOfDogs();
    }

    public List<Dog> getAllDogs() throws SQLException {
        return dogDAO.getAllDogs();
    }
}

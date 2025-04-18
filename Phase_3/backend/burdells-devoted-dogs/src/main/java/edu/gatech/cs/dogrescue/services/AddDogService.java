package edu.gatech.cs.dogrescue.services;

import java.sql.SQLException;

import edu.gatech.cs.dogrescue.dao.AddDogDAO;
import edu.gatech.cs.dogrescue.dto.AddDog;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;

@RequestScoped
public class AddDogService{


    @Inject
    AddDogDAO addDogDAO;

    public Integer addDog(AddDog addDog) throws SQLException{

        //add to microchip Table
        if(addDog.getMicrochipID()!= null){
            addDogDAO.addMicrochip(addDog.getMicrochipID(),addDog.getMicrochipVendor());
        }
        //add to dog table
        Integer dogID = addDogDAO.addDog(
                addDog.getEmail(),
                addDog.getDogName(),
                addDog.getDescription(),
                addDog.getAgeYears()*12 + addDog.getAgeMonths(),
                addDog.getSex(),
                addDog.isAltered(),
                addDog.getSurrenderDate(),
                addDog.getSurrenderPhone(),
                addDog.getByAnimalControl());

        if(dogID == null || dogID <= -1){
            if(addDog.getMicrochipID()!= null) {
                addDogDAO.removeMicrochip(addDog.getMicrochipID(),addDog.getMicrochipVendor());
            }
            throw new BadRequestException("Invalid dog ID");
        }

        //add to dogmicrochip tabke
        if(addDog.getMicrochipID()!= null){
            addDogDAO.addDogMicrochip(dogID, addDog.getMicrochipID());
        }
        //add to dogbreed table
        addDogDAO.addBreed(addDog.getDogID(), addDog.getBreeds());

        return dogID;

    }

    public void addBreed(AddDog addDog) throws SQLException{
        addDogDAO.addBreed(addDog.getDogID(), addDog.getBreeds());
    }

    public void addDogMicrochip(Integer dogID, String microchipID) throws SQLException{
        addDogDAO.addDogMicrochip(dogID, microchipID);
    }

    public Integer getMaxDogID() throws SQLException{
        return addDogDAO.getMaxDogID();
    }

};
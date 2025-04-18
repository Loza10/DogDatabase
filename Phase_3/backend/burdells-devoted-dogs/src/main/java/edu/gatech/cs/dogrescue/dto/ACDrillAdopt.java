package edu.gatech.cs.dogrescue.dto;

import java.util.Date;

public class ACDrillAdopt {
    private Integer dogID;
    private String breeds;
    private String sex;
    private String microchipID;
    private Date surrenderDate;
    private Integer daysInRescue;
    
    public ACDrillAdopt() {}
    
    public ACDrillAdopt(Integer dogID,String breeds, String sex,String microchipID, Date surrenderDate, Integer daysInRescue) {
        this.dogID = dogID;
        this.breeds = breeds;
        this.sex = sex;
        this.microchipID = microchipID;
        this.surrenderDate = surrenderDate;
        this.daysInRescue = daysInRescue;
    }

    public Integer getDogID() {
        return dogID;
    }

    public void setDogID(Integer dogID) {
        this.dogID = dogID;
    }

    public String getBreeds() {
        return breeds;
    }

    public void setBreeds(String breeds) {
        this.breeds = breeds;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
    
    public String getMicrochipID() {
        return microchipID;
    }

    public void setMicrochipID(String microchipID) {
    	this.microchipID = microchipID;
    }
    
    public Date getSurrenderDate() {
        return surrenderDate;
    }

    public void setSurrenderDate(Date surrenderDate) {
    	this.surrenderDate = surrenderDate;
    }
    
    public Integer getDaysinRescue() {
        return daysInRescue;
    }

    public void setDaysInRescue(Integer daysInRescue) {
    	this.daysInRescue = daysInRescue;
    }
}
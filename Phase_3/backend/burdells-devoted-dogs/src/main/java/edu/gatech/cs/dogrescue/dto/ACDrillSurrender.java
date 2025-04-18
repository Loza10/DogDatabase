package edu.gatech.cs.dogrescue.dto;

import java.util.Date;

public class ACDrillSurrender {
    private Integer dogID;
    private String breeds;
    private String sex;
    private boolean altered;
    private String microchipID;
    private Date surrenderDate;

    public ACDrillSurrender(Integer dogID,String breeds,String sex,boolean altered,String microchipID,Date surrenderDate) {
        this.dogID = dogID;
        this.breeds = breeds;
        this.sex = sex;
        this.altered = altered;
        this.microchipID = microchipID;
        this.surrenderDate = surrenderDate;
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

    public boolean isAltered() {
        return altered;
    }

    public void setAltered(boolean altered) {
        this.altered = altered;
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
}
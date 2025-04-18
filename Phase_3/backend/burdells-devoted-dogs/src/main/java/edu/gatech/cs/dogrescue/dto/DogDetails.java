package edu.gatech.cs.dogrescue.dto;

import java.util.Date;

public class DogDetails {
    private Integer dogID;
    private String dogName;
    private String breeds;
    private String sex;
    private boolean altered;
    private Integer ageYears;
    private Integer ageMonths;
    private String description;
    private String microchipID;
    private String microchipVendor;
    private Date surrenderDate;
    private String surrenderPhone;
    private boolean byAnimalControl;
    private String adoptability;
    
    public DogDetails() {}
    
    public DogDetails(Integer dogID, String dogName, String breeds, String sex, boolean altered, Integer ageYears, Integer ageMonths, String description, String microchipID, String microchipVendor, Date surrenderDate, String surrenderPhone, boolean byAnimalControl, String adoptability) {
        this.dogID = dogID;
        this.dogName = dogName;
        this.breeds = breeds;
        this.sex = sex;
        this.altered = altered;
        this.ageYears = ageYears;
        this.ageMonths = ageMonths;
        this.description = description;
        this.microchipID = microchipID;
        this.microchipVendor = microchipVendor;
        this.surrenderDate = surrenderDate;
        this.surrenderPhone = surrenderPhone;
        this.byAnimalControl = byAnimalControl;
        this.adoptability = adoptability;
    }

    public Integer getDogID() {
        return dogID;
    }

    public void setDogID(Integer dogID) {
        this.dogID = dogID;
    }

    public String getDogName() {
        return dogName;
    }

    public void setDogName(String dogName) {
        this.dogName = dogName;
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

    public Integer getAgeYears() {
        return ageYears;
    }

    public void setAgeYears(Integer ageYears) {
        this.ageYears = ageYears;
    }
    
    public Integer getAgeMonths() {
        return ageMonths;
    }

    public void setAgeMonths(Integer ageMonths) {
        this.ageMonths = ageMonths;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
    	this.description = description;
    }
    
    public String getMicrochipID() {
        return microchipID;
    }

    public void setMicrochipID(String microchipID) {
    	this.microchipID = microchipID;
    }
    
    public String getMicrochipVendor() {
        return microchipVendor;
    }

    public void setMicrochipVendor(String microchipVendor) {
    	this.microchipVendor = microchipVendor;
    }
    
    public Date getSurrenderDate() {
        return surrenderDate;
    }

    public void setSurrenderDate(Date surrenderDate) {
    	this.surrenderDate = surrenderDate;
    }
    
    public String getSurrenderPhone() {
        return surrenderPhone;
    }

    public void setSurrenderPhone(String surrenderPhone) {
    	this.surrenderPhone = surrenderPhone;
    }
    
    public boolean getByAnimalControl() {
        return byAnimalControl;
    }

    public void setByAnimalControl(boolean byAnimalControl) {
    	this.byAnimalControl = byAnimalControl;
    }
    public String getAdoptability() {
        return adoptability;
    }

    public void setAdoptability(String adoptability) {
    	this.adoptability = adoptability;
    }
}
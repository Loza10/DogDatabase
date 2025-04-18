package edu.gatech.cs.dogrescue.dto;

import java.util.Date;

public class ACDrillExpense {
    private Integer dogID;
    private String breeds;
    private String sex;
    private String microchipID;
    private Date surrenderDate;;
    private boolean byAnimalControl;
    private double totalExpenses;
    
    public ACDrillExpense() {}
    
    public ACDrillExpense(Integer dogID, String breeds, String sex, String microchipID, Date surrenderDate, boolean byAnimalControl, double totalExpenses) {
        this.dogID = dogID;
        this.breeds = breeds;
        this.sex = sex;
        this.microchipID = microchipID;
        this.surrenderDate = surrenderDate;
        this.byAnimalControl = byAnimalControl;
        this.totalExpenses = totalExpenses;
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
    
    public boolean getByAnimalControl() {
        return byAnimalControl;
    }

    public void setByAnimalControl(boolean byAnimalControl) {
    	this.byAnimalControl = byAnimalControl;
    }

    public double getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }
}
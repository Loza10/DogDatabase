package edu.gatech.cs.dogrescue.dto;

public class Dog {
    private Integer dogID;
    private String dogName;
    private String breeds;
    private String sex;
    private boolean altered;
    private Integer ageYears;
    private Integer ageMonths;
    private String adoptability;

    public Dog(Integer dogID, String dogName, String breeds, String sex, boolean altered, Integer ageYears, Integer ageMonths, String adoptability) {
        this.dogID = dogID;
        this.dogName = dogName;
        this.breeds = breeds;
        this.sex = sex;
        this.altered = altered;
        this.ageYears = ageYears;
        this.ageMonths = ageMonths;
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

    public String getAdoptability() {
        return adoptability;
    }

    public void setAdoptability(String adoptability) {
        this.adoptability = adoptability;
    }
}

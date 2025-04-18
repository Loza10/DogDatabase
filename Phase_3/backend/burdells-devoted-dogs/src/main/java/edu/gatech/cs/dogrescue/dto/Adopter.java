package edu.gatech.cs.dogrescue.dto;

public class Adopter extends User {

    private String street;
    private String zip;
    private String state;
    private Integer householdSize;
    private String city;

    Adopter(String emailAddress, String firstName, String lastName, String phone, String street, String zip, String state, Integer householdSize, String city) {
        super(emailAddress, firstName, lastName, phone);
        this.street = street;
        this.zip = zip;
        this.state = state;
        this.householdSize = householdSize;
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getHouseholdSize() {
        return householdSize;
    }

    public void setHouseholdSize(Integer householdSize) {
        this.householdSize = householdSize;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}

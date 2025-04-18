package edu.gatech.cs.dogrescue.dto;

import java.util.Date;

public class AdoptionReview {
    private String name;
    private String address;
    private String phoneNumber;
    private String email;
    private Date applicationDate;

    public AdoptionReview(String firstName, String lastName,
                          String street,String city, String state, String zipCode , String phoneNumber, String email, Date applicationDate) {
        this.name = firstName + " " + lastName;
        this.address = street + " " +city+", "+ state + " " + zipCode;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.applicationDate = applicationDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(Date applicationDate) {
        this.applicationDate = applicationDate;
    }
}

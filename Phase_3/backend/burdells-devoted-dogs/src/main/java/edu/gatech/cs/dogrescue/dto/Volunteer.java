package edu.gatech.cs.dogrescue.dto;

import java.util.Date;

public class Volunteer extends User{
    private Date birthday;
    private String mileStoneBirthday;
    public Volunteer() {super();}
    public Volunteer(String firstName, String lastName, String email, String mileStoneBirthday){
        super(email,firstName,lastName);
        this.mileStoneBirthday = mileStoneBirthday;
    }

    public String getMileStoneBirthday() {
        return mileStoneBirthday;
    }

    public void setMileStoneBirthday(String mileStoneBirthday) {
        this.mileStoneBirthday = mileStoneBirthday;
    }
}

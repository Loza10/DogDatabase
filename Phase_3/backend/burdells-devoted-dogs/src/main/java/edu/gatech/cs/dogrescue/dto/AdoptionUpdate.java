package edu.gatech.cs.dogrescue.dto;

public class AdoptionUpdate {
    private Integer dogID;
    private Double fee;
    private Integer isWaived;
    private String decisionDate;
    private String email;
    private String date;

    public AdoptionUpdate(Integer dogID, Double fee, Integer isWaived,String decisionDate, String email, String date) {
        this.dogID = dogID;
        this.fee = fee;
        this.isWaived = isWaived;
        this.decisionDate = decisionDate;
        this.email = email;
        this.date = date;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getDogID() {
        return dogID;
    }

    public void setDogID(Integer dogID) {
        this.dogID = dogID;
    }

    public String getDecisionDate() {
        return decisionDate;
    }

    public void setDecisionDate(String decisionDate) {
        this.decisionDate = decisionDate;
    }

    public Integer getIsWaived() {
        return isWaived;
    }

    public void setIsWaived(Integer feeWaived) {
        this.isWaived = feeWaived;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }
}

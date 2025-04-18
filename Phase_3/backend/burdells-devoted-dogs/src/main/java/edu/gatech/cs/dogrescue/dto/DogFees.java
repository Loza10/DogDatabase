package edu.gatech.cs.dogrescue.dto;

public class DogFees {
    private Integer dogID;
    private String name;
    private Double fee;
    private Integer isWaived;

    public DogFees () {}
    public DogFees(Integer dogID, String name, Double fee, Integer isWaived) {
        this.name = name;
        this.dogID = dogID;
        this.fee = fee;
        this.isWaived=isWaived;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDogID() {
        return dogID;
    }

    public void setDogID(Integer dogID) {
        this.dogID = dogID;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }

    public Integer getIsWaived() {
        return isWaived;
    }

    public void setIsWaived(Integer isWaived) {
        this.isWaived = isWaived;
    }
    
}

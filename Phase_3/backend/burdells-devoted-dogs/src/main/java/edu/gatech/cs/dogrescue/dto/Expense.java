package edu.gatech.cs.dogrescue.dto;
import java.sql.Date;

public class Expense {
    private Integer dogID;
    private String vendor;
    private Date expenseDate;
    private Double amount; 
    private String category;

    public Expense(Integer dogID, String vendor, Date expenseDate, Double amount, String category){
        this.dogID = dogID;
        this.vendor = vendor;
        this.expenseDate = expenseDate;
        this.amount = amount;
        this.category = category;

    }

    public Integer getDogID() { return dogID;}

    public void setDogID(Integer dogID) {this.dogID = dogID;}

    public String getVendor() {return vendor;}

    public void setVendor(String vendor) {this.vendor = vendor;}

    public Date getExpenseDate() {return expenseDate;}

    public void setExpenseDate(Date expenseDate) {this.expenseDate = expenseDate;}

    public Double getAmount() {return amount;}

    public void setAmount(Double amount) {this.amount = amount;}

    public String getCategory() {return category;}

    public void setCategory(String category) {this.category = category;}
}




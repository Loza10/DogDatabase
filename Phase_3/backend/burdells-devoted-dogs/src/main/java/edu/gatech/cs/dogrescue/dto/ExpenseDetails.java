package edu.gatech.cs.dogrescue.dto;

public class ExpenseDetails {
    private Double amount; 
    private String category;

    public ExpenseDetails(String category, Double amount){
        this.amount = amount;
        this.category = category;

    }

    public Double getAmount() {return amount;}

    public void setAmount(Double amount) {this.amount = amount;}

    public String getCategory() {return category;}

    public void setCategory(String category) {this.category = category;}
}




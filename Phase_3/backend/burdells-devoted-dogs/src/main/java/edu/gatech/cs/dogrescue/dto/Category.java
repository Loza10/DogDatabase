package edu.gatech.cs.dogrescue.dto;
import java.sql.Date;

public class Category {

    private String categoryName;


    public Category(String categoryName){
        this.categoryName = categoryName;

    }

    public String getCategoryName() {return this.categoryName;}

    public void setCategory(String categoryName) {this.categoryName = categoryName;}
}




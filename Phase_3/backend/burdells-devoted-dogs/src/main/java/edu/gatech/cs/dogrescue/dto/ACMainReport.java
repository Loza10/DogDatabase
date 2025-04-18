package edu.gatech.cs.dogrescue.dto;

public class ACMainReport {
    private String monthYear;
    private int countSurrendered;
    private int countAdopted;
    private double totalExpenses;

    public ACMainReport(String monthYear, int countSurrendered, int countAdopted, double totalExpenses) {
        this.monthYear = monthYear;
        this.countSurrendered = countSurrendered;
        this.countAdopted = countAdopted;
        this.totalExpenses = totalExpenses;
    }

    public String getMonthYear() {
        return monthYear;
    }

    public void setMonthYear(String monthYear) {
        this.monthYear = monthYear;
    }

    public int getCountSurrendered() {
        return countSurrendered;
    }

    public void setCountSurrendered(int countSurrendered) {
        this.countSurrendered = countSurrendered;
    }

    public int getCountAdopted() {
        return countAdopted;
    }

    public void setCountAdopted(int countAdopted) {
        this.countAdopted = countAdopted;
    }

    public double getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }
}
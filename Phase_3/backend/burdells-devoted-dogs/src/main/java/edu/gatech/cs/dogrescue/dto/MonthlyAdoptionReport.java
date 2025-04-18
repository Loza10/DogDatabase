package edu.gatech.cs.dogrescue.dto;

public class MonthlyAdoptionReport {
    private String monthYear;
    private String breeds;
    private int surrenderedDogs;
    private int adoptedDogs;
    private double totalExpense;
    private double totalAdoptionFee;
    private double profit;

    public MonthlyAdoptionReport(String monthYear, String breeds, int surrenderedDogs, int adoptedDogs, double totalExpense, double totalAdoptionFee, double profit) {
        this.monthYear = monthYear;
        this.breeds = breeds;
        this.surrenderedDogs = surrenderedDogs;
        this.adoptedDogs = adoptedDogs;
        this.totalExpense = totalExpense;
        this.totalAdoptionFee = totalAdoptionFee;
        this.profit = profit;
    }

    public String getMonthYear() {
        return monthYear;
    }

    public void setMonthYear(String monthYear) {
        this.monthYear = monthYear;
    }

    public String getBreeds() {
        return breeds;
    }

    public void setBreeds(String breeds) {
        this.breeds = breeds;
    }

    public int getSurrenderedDogs() {
        return surrenderedDogs;
    }

    public void setSurrenderedDogs(int surrenderedDogs) {
        this.surrenderedDogs = surrenderedDogs;
    }

    public int getAdoptedDogs() {
        return adoptedDogs;
    }

    public void setAdoptedDogs(int adoptedDogs) {
        this.adoptedDogs = adoptedDogs;
    }

    public double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(double totalExpense) {
        this.totalExpense = totalExpense;
    }

    public double getTotalAdoptionFee() {
        return totalAdoptionFee;
    }

    public void setTotalAdoptionFee(double totalAdoptionFee) {
        this.totalAdoptionFee = totalAdoptionFee;
    }

    public double getProfit() {
        return profit;
    }

    public void setProfit(double profit) {
        this.profit = profit;
    }
}
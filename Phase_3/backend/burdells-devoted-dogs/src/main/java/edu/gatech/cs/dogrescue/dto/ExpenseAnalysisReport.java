package edu.gatech.cs.dogrescue.dto;

public class ExpenseAnalysisReport {
    private String vendor;
    private int totalAmount;

    public ExpenseAnalysisReport(String vendor, int totalAmount) {
        this.vendor = vendor;
        this.totalAmount = totalAmount;
    }
    public String getVendor() {
        return this.vendor;
    }
    public void setVendor(String vendor) {
        this.vendor = vendor;
    }
    public int getTotalAmount() {
        return this.totalAmount;
    }
    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }
}

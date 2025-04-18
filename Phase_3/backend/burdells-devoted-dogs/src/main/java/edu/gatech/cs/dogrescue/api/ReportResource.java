package edu.gatech.cs.dogrescue.api;

import java.sql.SQLException;

import edu.gatech.cs.dogrescue.services.ReportService;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import javax.print.attribute.standard.Media;

@Path("/report")
public class ReportResource {

    @Inject
    ReportService reportService;

    @GET
    @Path("expense-analysis")
    @Produces(MediaType.APPLICATION_JSON)
    public Response expenseAnalysisReport() throws SQLException {
        return Response.ok(reportService.getExpenseAnalysisReport()).build();
    }

    @GET
    @Path("monthly-adoption")
    @Produces(MediaType.APPLICATION_JSON)
    public Response monthlyAdoptionReport() throws SQLException {
        return Response.ok(reportService.getMonthlyAdoptionReport()).build();
    }

    @GET
    @Path("ac-main-report")
    @Produces(MediaType.APPLICATION_JSON)
    public Response acMainReport() throws SQLException {
        return Response.ok(reportService.getACMainReport()).build();
    }

    @GET
    @Path("ac-drill-surrender/{MonthYear}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response acDrillSurrender(String MonthYear) throws SQLException {
        return Response.ok(reportService.getACDrillSurrender(MonthYear)).build();
    }

    @GET
    @Path("ac-drill-adopt/{MonthYear}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response acDrillAdopt(String MonthYear) throws SQLException {
        return Response.ok(reportService.getACDrillAdopt(MonthYear)).build();
    }

    @GET
    @Path("ac-drill-expense/{MonthYear}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response acDrillExpense(String MonthYear) throws SQLException {
        return Response.ok(reportService.getACDrillExpense(MonthYear)).build();
    }

    @GET
    @Path("volunteer/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response volunteerLookup(String name) throws SQLException {
        return Response.ok(reportService.getVolunteerLookup(name)).build();
    }

    @GET
    @Path("volunteer/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response volunteerLookup() throws SQLException {
        return Response.ok(reportService.getVolunteerLookup()).build();
    }

    @GET
    @Path("volunteer-birthday/{month}/{year}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response volunteerBirthdayReport(String month, String year) throws SQLException {
        return Response.ok(reportService.getVolunteerBirthDayReport(month, year)).build();
    }

    @GET
    @Path("adoption-review")
    @Produces(MediaType.APPLICATION_JSON)
    public Response adoptionReview() throws SQLException {
        return Response.ok(reportService.getAdoptionReviewReport()).build();
    }

}

package edu.gatech.cs.dogrescue.api;

import java.sql.SQLException;

import edu.gatech.cs.dogrescue.dto.DogDetails;
import edu.gatech.cs.dogrescue.dto.Expense;
import edu.gatech.cs.dogrescue.services.DogDetailsService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.Date;

@Path("/details/{dogID}")
public class DogDetailsResource {

    @Inject
    DogDetailsService dogDetailsService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDetails(Integer dogID) throws SQLException {
        return Response.ok(dogDetailsService.getDetails(dogID)).build();
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateDetails(@PathParam("dogID") Integer dogID, DogDetails dogDetails) throws SQLException {
        return Response.ok(dogDetailsService.updateDetails(dogID, dogDetails)).build();
    }

    @POST
    @Path("expense")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addExpense(@PathParam("dogID") Integer dogID, Expense expense) throws SQLException {
//        System.out.println(dogID);
//        System.out.println(expense.getExpenseDate());
//        System.out.println(expense.getVendor());
//        System.out.println(expense.getExpenseDate());
//        System.out.println(expense.getCategory());
//        dogDetailsDAO.addExpense(dogID, expense.getVendor(),sqlDate, expense.getAmount(), expense.getCategory())
//        System.out.println(expense.getExpenseDate().getClass().getName());
            dogDetailsService.addExpense(expense.getDogID(), expense.getVendor(), expense.getExpenseDate(), expense.getAmount(), expense.getCategory());
            return Response.ok().build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("category")
    public Response getCategory() throws SQLException {
        return Response.ok(dogDetailsService.getCategories()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("expense/get")
    public Response getExpense(@PathParam("dogID") Integer dogID) throws SQLException {
        return Response.ok(dogDetailsService.getExpenses(dogID)).build();
    }
}

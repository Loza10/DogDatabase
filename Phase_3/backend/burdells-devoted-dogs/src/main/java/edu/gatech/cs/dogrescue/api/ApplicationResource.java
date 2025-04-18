package edu.gatech.cs.dogrescue.api;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import edu.gatech.cs.dogrescue.dto.AdoptionAdd;
import edu.gatech.cs.dogrescue.dto.AdoptionUpdate;
import edu.gatech.cs.dogrescue.services.ApplicationService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/application")
public class ApplicationResource {

    @Inject
    ApplicationService applicationService;

    @POST
    @Path("approve/{email}/{applicationDate}")
    public Response approveApplication(@PathParam("email") String email, @PathParam("applicationDate") String applicationDateStr) throws SQLException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date applicationDate = format.parse(applicationDateStr);
            applicationService.addApplication(email, applicationDate);
            return Response.ok().build();
        } catch (ParseException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Invalid date format. Use yyyy-MM-dd").build();
        }
    }

    @DELETE
    @Path("reject/{email}/{date}")
    public Response rejectApplication(@PathParam("email") String email, @PathParam("date") String applicationDateStr) throws SQLException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date applicationDate = format.parse(applicationDateStr);
            applicationService.rejectApplication(email, applicationDate);
            return Response.ok().build();
        } catch (ParseException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Invalid date format. Use yyyy-MM-dd").build();
        }
    }

    @POST
    @Path("add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addApplication(AdoptionAdd app) throws SQLException {
        applicationService.addApp(app);
        return Response.ok().build();
    }

    @GET
    @Path("search/{lastName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchApplication(@PathParam("lastName") String lastName) throws SQLException {
        return Response.ok(applicationService.searchApplication(lastName)).build();
    }

    @GET
    @Path("search/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchApplication() throws SQLException {
        return Response.ok(applicationService.searchApplication()).build();
    }

    @GET
    @Path("recent/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response mostRecent(String email) throws SQLException {
        return Response.ok(applicationService.recentApp(email)).build();
    }

    @GET
    @Path("fees/{dogID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response mostRecent(Integer dogID) throws SQLException {
        return Response.ok(applicationService.getDogFees(dogID)).build();
    }

    @POST
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateAdoption(AdoptionUpdate au) throws SQLException {
        System.out.println(au.getEmail());
        System.out.println(au.getDate());
        applicationService.updateAdoption(au);
        return Response.ok().build();
    }

    @POST
    @Path("change")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response changeAdoption(AdoptionUpdate au) throws SQLException {
        applicationService.changeAdoption(au);
        return Response.ok().build();
    }
}

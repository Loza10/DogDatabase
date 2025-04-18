package edu.gatech.cs.dogrescue.api;

import edu.gatech.cs.dogrescue.dto.LoginRequest;
import edu.gatech.cs.dogrescue.services.DogService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.sql.SQLException;

@Path("/dog")
public class DogResource {

    @Inject
    DogService dogService;

    @GET
    @Path("currentNumberOfDogs")
    @Produces(MediaType.TEXT_PLAIN)
    public Response currentNumberOfDogs() throws SQLException {
        return Response.ok(dogService.getCurrentNumberOfDogs()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllDogs() throws SQLException {
        return Response.ok(dogService.getAllDogs()).build();
    }
}

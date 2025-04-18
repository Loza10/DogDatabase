package edu.gatech.cs.dogrescue.api;

import java.sql.SQLException;

import edu.gatech.cs.dogrescue.dto.AddDog;
import edu.gatech.cs.dogrescue.services.AddDogService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

// Specify path
@Path("/add-dog")

public class AddDogResource {

    @Inject
    AddDogService addDogService;

    @POST
    @Path("add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response addDog(
            AddDog addDog
    ) throws SQLException {

        try {
            Integer dogID = addDogService.addDog(addDog);
            return Response.ok(dogID).build();
        } catch (SQLException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }


    }


    @POST
    @Path("breed")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBreed(AddDog addDog) throws SQLException {
        try{
            addDogService.addBreed(addDog);
            return Response.ok().build();
        } catch (SQLException e){
            return Response.status(Response.Status.BAD_REQUEST).entity(
                    e.getMessage()
            ).build();
        }
    }

    @POST
    @Path("microchip")
    public Response addDogMicrochip(AddDog addDog) throws SQLException {
        if(addDog.getMicrochipID()==null){
            return Response.ok().build();
        }
        try{
            addDogService.addDogMicrochip(addDog.getDogID(), addDog.getMicrochipID());
            return Response.ok().build();
        } catch (SQLException e){
            return Response.status(Response.Status.BAD_REQUEST).entity("error").build();
        }
    }

    @GET
    @Path("maxID")
    public Response getMaxID() throws SQLException {
        try{
             return Response.ok(addDogService.getMaxDogID()).build();
        } catch (SQLException e){
            return Response.status(Response.Status.BAD_REQUEST).entity("error").build();
        }
    }


}
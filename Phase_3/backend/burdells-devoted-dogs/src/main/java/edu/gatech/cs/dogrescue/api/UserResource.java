package edu.gatech.cs.dogrescue.api;

import edu.gatech.cs.dogrescue.dto.Adopter;
import edu.gatech.cs.dogrescue.dto.LoginRequest;
import edu.gatech.cs.dogrescue.services.UserService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/user")
public class UserResource {

    @Inject
    UserService userService;

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response User(LoginRequest loginRequest) {
        return Response.ok(userService.verifyUser(loginRequest)).build();
    }

    @POST
    @Path("/adopter")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response User(Adopter adopter) {
        userService.addAdopter(adopter);
        return Response.ok().build();
    }
}

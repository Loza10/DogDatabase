package edu.gatech.cs.dogrescue.dto;

public class User {

    private Boolean director;

    private String emailAddress;

    private String firstName;

    private String lastName;

    private String phone;

    private Integer age;

    public User(String emailAddress, String firstName, String lastName, Integer age) {
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    public User(String emailAddress, String firstName, String lastName) {
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public User(){}

    public Boolean isDirector() {
        return director;
    }

    public void setDirector(Boolean director) {
        this.director = director;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public User(String emailAddress, String firstName, String lastName, String phone) {
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer phone) {
        this.age = age;
    }
}



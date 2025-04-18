package edu.gatech.cs.dogrescue.dao;

import edu.gatech.cs.dogrescue.util.SqlLoader;
import jakarta.inject.Inject;

import javax.sql.DataSource;


public abstract class BaseDAO {

    @Inject
    DataSource dataSource;

    @Inject
    SqlLoader sqlLoader;
}

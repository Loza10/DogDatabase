package edu.gatech.cs.dogrescue.util;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
public class SqlLoader {
    private final ConcurrentHashMap<String, String> sqlCache = new ConcurrentHashMap<>();
    private Properties sqlProperties;

    @PostConstruct
    public void init() {
        sqlProperties = new Properties();
        try (InputStream is = getClass().getClassLoader().getResourceAsStream("sql.properties")) {
            if (is == null) {
                throw new RuntimeException("sql.properties file not found");
            }
            sqlProperties.load(is);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load sql.properties", e);
        }
    }

    public String getSql(String entity, String queryName) {
        String key = entity + "." + queryName;
        return sqlCache.computeIfAbsent(key, k -> {
            if (!sqlProperties.containsKey(k)) {
                throw new RuntimeException("SQL query not found: " + k);
            }
            return sqlProperties.getProperty(k);
        });
    }
}
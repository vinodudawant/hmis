package com.hms.configuration;

import java.util.Collections;
import java.util.Properties;

import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.ApiInfo;
//import springfox.documentation.service.Contact;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableTransactionManagement
@ComponentScan({ "com.hms.configuration" })
@PropertySource(value = { "classpath:hibernate.properties" })

public class HibernateConfiguration {

    @Autowired
    private Environment environment; 
    
    @Bean
    public LocalSessionFactoryBean sessionFactory() {
        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        sessionFactory.setPackagesToScan(new String[] { "com.hms" });
        sessionFactory.setHibernateProperties(hibernateProperties());
        return sessionFactory;
     }
	
    @Bean
    public DataSource dataSource() {
    	   
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(environment.getProperty("jdbc.driverClassName"));
        dataSource.setUrl(environment.getProperty("jdbc.url"));
        dataSource.setUsername(environment.getProperty("jdbc.username"));
        dataSource.setPassword(environment.getProperty("jdbc.password"));
        
    	/*ComboPooledDataSource dataSource = new ComboPooledDataSource();
        try {
			dataSource.setDriverClass(environment.getProperty("jdbc.driverClassName"));
		} catch (PropertyVetoException e) {
			e.printStackTrace();
		}
        dataSource.setJdbcUrl(environment.getProperty("jdbc.url"));
        dataSource.setUser(environment.getProperty("jdbc.username"));
        dataSource.setPassword(environment.getProperty("jdbc.password"));
        dataSource.setInitialPoolSize(5);
        dataSource.setAcquireIncrement(5);
        dataSource.setMaxPoolSize(50);
        dataSource.setProperties(connectionPoolProperties());*/
        
        return dataSource;
    }
    
    private Properties hibernateProperties() {
    	
        Properties properties = new Properties();
        properties.put("hibernate.dialect", environment.getProperty("hibernate.dialect"));        
        properties.put("hibernate.show_sql", environment.getProperty("hibernate.show_sql"));
        properties.put("hibernate.format_sql", environment.getProperty("hibernate.format_sql"));
       properties.put("hibernate.hbm2ddl.auto", environment.getProperty("hibernate.hbm2ddl"));
       
       //added by Akshata
       properties.put("hibernate.enable_lazy_load_no_trans", environment.getProperty("hibernate.enable_lazy_load_no_trans"));
        
        properties.put("connection.provider_class", environment.getProperty("connection.provider_class"));
        properties.put("hibernate.c3p0.min_size", environment.getProperty("hibernate.c3p0.min_size"));
        properties.put("hibernate.c3p0.max_size", environment.getProperty("hibernate.c3p0.max_size"));
        properties.put("hibernate.c3p0.acquire_increment", environment.getProperty("hibernate.c3p0.acquire_increment"));
        properties.put("hibernate.c3p0.idle_test_period", environment.getProperty("hibernate.c3p0.idle_test_period"));
        properties.put("hibernate.c3p0.max_statements", environment.getProperty("hibernate.c3p0.max_statements"));
        properties.put("hibernate.c3p0.timeout", environment.getProperty("hibernate.c3p0.timeout"));
        properties.put("hibernate.c3p0.validate", environment.getProperty("hibernate.c3p0.validate"));
        properties.put("hibernate.c3p0.unreturnedConnectionTimeout", environment.getProperty("hibernate.c3p0.unreturnedConnectionTimeout"));
        properties.put("hibernate.c3p0.debugUnreturnedConnectionStackTraces", environment.getProperty("hibernate.c3p0.debugUnreturnedConnectionStackTraces"));
       
        return properties;        
    }
    
    /*private Properties connectionPoolProperties() {
    	
    	Properties properties = new Properties();
        properties.put("pool.initialSize",environment.getProperty("pool.initialSize"));
        return properties;
    }*/
    
	@Bean
    @Autowired
    public HibernateTransactionManager transactionManager(SessionFactory s) {
		HibernateTransactionManager transactionManager = new HibernateTransactionManager();
        transactionManager.setSessionFactory(sessionFactory().getObject());
        return transactionManager;
    }
	
	
}

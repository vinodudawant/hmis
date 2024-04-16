package com.hms.configuration;

import org.apache.log4j.Logger;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import com.hms.utility.ApplicationContextUtils;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = { "com.hms"})
public class ApplicationConfiguration {

	/* @Autowired Environment environment;
	 
	@Bean(name = "viewResolver")
	public InternalResourceViewResolver getViewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setPrefix("/WEB-INF/");
		viewResolver.setSuffix(".jsp");
		return viewResolver;
	} 
	
	@Bean
	public BasicDataSource getDataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(environment.getProperty("db.driverClassName"));
		dataSource.setUrl(environment.getProperty("db.databaseUrl"));
		dataSource.setUsername(environment.getProperty("db.username"));
		dataSource.setPassword(environment.getProperty("db.password"));
		return dataSource;
	}

	@Bean
	public LocalSessionFactoryBean getSessionFactory() {
		LocalSessionFactoryBean factoryBean = new LocalSessionFactoryBean();
		factoryBean.setDataSource(getDataSource());

		Properties props = new Properties();
		props.put("hbm.dialect", environment.getProperty("hbm.dialect"));
		props.put("hibernate.show_sql", environment.getProperty("hbm.show_sql"));
		props.put("hibernate.hbm2ddl.auto", environment.getProperty("hbm.hbm2ddl.auto"));
		props.put("spring.jpa.database", environment.getProperty("spring.jpa.database"));
		
		factoryBean.setHibernateProperties(props);
		factoryBean.setPackagesToScan("com.hms.*");
		return factoryBean;
	}

	@Bean
	public HibernateTransactionManager getTransactionManager() {
		HibernateTransactionManager transactionManager = new HibernateTransactionManager();
		transactionManager.setSessionFactory(getSessionFactory().getObject());
		return transactionManager;
	} */
	
	@Bean
	public ViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/pages/");
		viewResolver.setSuffix(".jsp");

		return viewResolver;
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver getMultipartResolver() {
		CommonsMultipartResolver resolver = new CommonsMultipartResolver();
		//resolver.setMaxUploadSize(1048576);
		resolver.setMaxUploadSize(5242880);
		return resolver;
	}

	@Bean
	public Logger getLogger(){
		return Logger.getLogger(getClass());
	}
	
	@Bean
	public MessageSource messageSource() {
	    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
	    messageSource.setBasename("messages");
	    return messageSource;
	}

	@Bean
	public ApplicationContextUtils getApplicationContextAware(){
		return new ApplicationContextUtils();
	}	
	
	@Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
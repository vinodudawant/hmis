package com.hms.configuration;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class AppInitializer implements WebApplicationInitializer{

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {

		AnnotationConfigWebApplicationContext webContext = new AnnotationConfigWebApplicationContext();
		webContext.register(ApplicationConfiguration.class);
		webContext.setServletContext(servletContext);

		//ServletRegistration.Dynamic servlet = servletContext.addServlet("springDispatcher", new DispatcherServlet(webContext));
		//servlet.addMapping(new String[] {"/ehat/*"});
		ServletRegistration.Dynamic servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(webContext));
		servlet.setLoadOnStartup(1);
		//servlet.addMapping("/ehat/*");
		servlet.addMapping(new String[] {"/ehat/*","/pharmacy/*","/useraccess/*"});
	}
}
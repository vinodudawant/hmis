package com.hms.configuration;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//import io.swagger.annotations.SwaggerDefinition;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.ApiInfo;
//import springfox.documentation.service.Contact;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;

//@Configuration
//@EnableWebMvc
//@EnableSwagger2
//@ComponentScan(basePackages = "com.*")
public abstract class WebConfig implements WebMvcConfigurer{

	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/**")
                    .addResourceLocations("/public", "classpath:/static/")
                    .setCachePeriod(31556926);
            
         //   registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
          //  registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
            
    }
	
	/*
	@Bean
	  Docket getDocket() {
		 // return new Docket(DocumentationType.SWAGGER_2).apiInfo(getAppInfo()).select().apis(RequestHandlerSelectors.any()).paths(PathSelectors.ant("/api/**")).build();// for specific Path 
		 return new Docket(DocumentationType.SWAGGER_2).apiInfo(getAppInfo()).select().apis(RequestHandlerSelectors.any()).paths(PathSelectors.any()).build();// any Path
	  }

	private ApiInfo getAppInfo() {
		
		return new ApiInfo(
        "User Rest API", //title
        "Description For API.", //description
        "Version 1.0", //version
        "Terms of service", //terms of service URL
        new Contact("Dayanand Khandekar", "https://techubleaders.com/", "khandekardayanand123@gmail.com"),
        "License of API", "API license URL", Collections.emptyList()); 
	}
	*/
	
}

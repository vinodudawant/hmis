package com.hms.pathology.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.pharmacy.upload.FilePath;

@RestController
@RequestMapping(value = "/sendpathoreport")
public class PathologySendReportController {

	/*
	@RequestMapping(value = "/sendPathologyReport/{masterIds}/{patientName}", method = RequestMethod.GET)
	public void sendPathologyReport(@PathVariable("masterIds") String masterIds,@PathVariable("patientName") String patientName  ) {
		System.out.println("masterIds====="+masterIds);
		System.out.println("patientName====="+patientName);
	}
	*/
	//@RequestMapping(value = "/api", method = RequestMethod.GET)
	//@ResponseBody
	@RequestMapping(value = "/sendPathologyReport/{masterIds}/{patientName}", method = RequestMethod.GET)
	@ResponseBody
	public HttpServletResponse  api(@PathVariable ("masterIds") String masterIds,@PathVariable("patientName") String patientName,HttpServletRequest request,HttpServletResponse response) {		
		System.out.println("masterIds====="+masterIds);
		
		System.out.println("patientName====="+patientName);
		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String ReportUrlSmsLink = (String) resource.getObject("ReportUrlSmsLink").toString();
		//String opdReportPath = callform;
	//	opdReportPath =opdReportPath + File.separator + patientName + File.separator+ id+".pdf";
		
		String opdReportPath= FilePath.getLabReportPath() + File.separator +masterIds + File.separator + patientName + File.separator +patientName+".pdf";
		String filePath = opdReportPath.replace("\\", "/");
		  	response.setContentType("application/pdf");
	         response.addHeader("content-disposition", "inline; filename="+patientName+".pdf");
	         try{
	        	File f = new File(filePath);
	            @SuppressWarnings("resource")
	            InputStream is = new FileInputStream(f);
	            byte[] buffer = new byte[1024];
	            int length;
	            while ((length = is.read(buffer)) > 0) {
	                response.getOutputStream().write(buffer, 0, length);
	                response.getOutputStream().flush();
	            }
	           
	        }catch(Exception e){
	           
	            e.printStackTrace();
	        }
	       
			return response;
	    		
	}
}

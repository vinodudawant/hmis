package com.hms.pathology.dto;

public enum FilePathPathology {
	// If Windows
	 BASEPATH(System.getProperty("catalina.home")+"\\patImages\\") //change
	// this path whenever need (at installation time)
	,BASEPATH1(System.getProperty("catalina.home")+"\\pharmaUpload\\")
	 ,UPLOADDOC(System.getProperty("catalina.home")+"\\documents\\");

	 String path;
	 static String filePath;

	private FilePathPathology(String path) {
		// TODO Auto-generated constructor stub
		this.path = path;
	}

	//Added by Ajay 13-sep-2020 for upload documents outsource record
	public static String getOutsourceFilesPath() {
		
		if (validationOSMachine.isWindows()) {
			filePath = System.getProperty("catalina.home") + "\\outsource\\";
		} else if (validationOSMachine.isMac()) {
		} else if (validationOSMachine.isUnix()) {
			filePath = System.getProperty("catalina.home") + "/outsource/";
		} else if (validationOSMachine.isSolaris()) {
		} else {
			filePath = System.getProperty("catalina.home") + "/outsource/";
		}
		return filePath;
	}
	
	public static String getHistoDocPath() {
		
		if (validationOSMachine.isWindows()) {
			filePath = System.getProperty("catalina.home") + "\\histopathology\\";
		} else if (validationOSMachine.isMac()) {
		} else if (validationOSMachine.isUnix()) {
			filePath = System.getProperty("catalina.home") + "/histopathology/";
		} else if (validationOSMachine.isSolaris()) {
		} else {
			filePath = System.getProperty("catalina.home") + "/histopathology/";
		}
		return filePath;
	}
	
	public static String getDeptSignPath() {
		
		if (validationOSMachine.isWindows()) {
			filePath = System.getProperty("catalina.home") + "\\depSignature\\";
		} else if (validationOSMachine.isMac()) {
		} else if (validationOSMachine.isUnix()) {
			filePath = System.getProperty("catalina.home") + "/depSignature/";
		} else if (validationOSMachine.isSolaris()) {
		} else {
			filePath = System.getProperty("catalina.home") + "/depSignature/";
		}
		return filePath;
	}
    	 	
}

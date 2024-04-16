package com.hms.pharmacy.upload;

import java.util.ResourceBundle;

import com.hms.patient.util.OSValidator;

public enum FilePath {
	// If Windows
	
	
	
	 BASEPATH(System.getProperty("jboss.server.data.dir")+"\\patImages\\") //change
	// this path whenever need (at installation time)
	,BASEPATH1(System.getProperty("jboss.server.data.dir")+"\\pharmaUpload\\")
	 ,UPLOADDOC(System.getProperty("jboss.server.data.dir")+"\\documents\\");

	// If Linux
	//BASEPATH(System.getProperty("catalina.home") + "/patImages/"), BASEPATH1(
	//		System.getProperty("catalina.home") + "/pharmaUpload/"), UPLOADDOC(
	//		System.getProperty("catalina.home") + "/documents/"), PHARMACYBARCODE(
	//		System.getProperty("catalina.home") + "/barcode/");
	 String path;
	 static String filePath;

	private FilePath(String path) {
		// TODO Auto-generated constructor stub
		this.path = path;
	}

	public static String getServer()
	{
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String serverName =resourceBundle.getObject("serverName").toString();
		return serverName;
				
	}
	public static String getBasePath() {
		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\patImages\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/patImages/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
			
		}else if(serverName.equalsIgnoreCase("tomcat"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\patImages\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/patImages/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}	
		return filePath;
		// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		/* return FilePath.BASEPATH.path; */
	}

	public static String getBasePath1() {
		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\pharmaUpload\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/pharmaUpload/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}else if(serverName.equalsIgnoreCase("tomcat"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\pharmaUpload\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/pharmaUpload/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}	
		
		
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}

	//Added By Annapurna code For uploadLogoUnitwise
public static String getUPLOADLOGO() {
		
		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\Hospital\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/Hospital/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}else if(serverName.equalsIgnoreCase("tomcat"))	
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\Hospital\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/Hospital/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}	
		
		
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}
	public static String getUPLOADDOC() {
		
		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\documents\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/documents/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}else if(serverName.equalsIgnoreCase("tomcat"))	
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\documents\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/documents/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}	
		
		
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}

	public static String getPHARMACYBARCODE() {

		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{
			if (OSValidator.isWindows()) {
			filePath = System.getProperty("jboss.server.data.dir") + "\\barcode\\";		
			} else if (OSValidator.isMac()) {		
			} else if (OSValidator.isUnix()) {
		   	filePath = System.getProperty("jboss.server.data.dir") + "/barcode/";	
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
		}
		}else if(serverName.equalsIgnoreCase("tomcat")){
			
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\barcode\\";		
				} else if (OSValidator.isMac()) {		
				} else if (OSValidator.isUnix()) {
			   	filePath = System.getProperty("catalina.home") + "/barcode/";	
				} else if (OSValidator.isSolaris()) {
					System.out.println("This is Solaris");
				} else {
					System.out.println("Your OS is not support!!");
			}
		}
			 		
		return filePath;
	}
	
	//Added by sanjay.
	public static String getUPLOADRISDOC() {
		
		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\RIS\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/RIS/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}else if(serverName.equalsIgnoreCase("tomcat"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\RIS\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/RIS/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}	
		
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}
	
	//Added by vinod.
	public static String getAadharPath() {
		
		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{

			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\AadharPhoto\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/AadharPhoto/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}else if(serverName.equalsIgnoreCase("tomcat"))
		{

			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\AadharPhoto\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/AadharPhoto/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}	
		
		
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}
	
	public static String getFolderPath(String folderName) {

		
		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{
			if(OSValidator.isWindows()) {
				//filePath = System.getProperty("catalina.home") + "\\"+folderName+"\\";
				filePath = "C:\\DMS" + "\\"+folderName+"\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				//filePath = System.getProperty("catalina.home") + "/"+folderName+"/";
				String ubuntuPath = folderName.replace("\\","/");
				filePath = System.getProperty("user.home") + "/DMS"+ "/"+ubuntuPath+"/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}else if(serverName.equalsIgnoreCase("tomcat"))
		{

			if(OSValidator.isWindows()) {
				//filePath = System.getProperty("catalina.home") + "\\"+folderName+"\\";
				filePath = "C:\\DMS" + "\\"+folderName+"\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				//filePath = System.getProperty("catalina.home") + "/"+folderName+"/";
				String ubuntuPath = folderName.replace("\\","/");
				filePath = System.getProperty("user.home") + "/DMS"+ "/"+ubuntuPath+"/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}	
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		/* return FilePath.BASEPATH.path; */
	}
	
	/* Added by Akshay Mache */
	public static String getMortuaryPath() {
		
		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\Mortuary\\" + "\\Death Certificate\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/Mortuary/" + "/Death Certificate/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}else if(serverName.equalsIgnoreCase("tomcat"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\Mortuary\\" + "\\Death Certificate\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/Mortuary/" + "/Death Certificate/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}	
				
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}
	
	public static String getMortuaryImagesPath() {
		
		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\Mortuary\\" + "\\Uploads\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/Mortuary/" + "/Uploads/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}else if(serverName.equalsIgnoreCase("tomcat"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\Mortuary\\" + "\\Uploads\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/Mortuary/" + "/Uploads/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}	
		
		
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}
	
       public static String getDialysispath() {	
    	   
    	   String serverName=getServer();
   		if(serverName.equalsIgnoreCase("jboss"))
   		{
   			if (OSValidator.isWindows()) {
   				filePath = System.getProperty("jboss.server.data.dir") + "\\Dialysis\\" + "\\Uploads\\";
   			} else if (OSValidator.isMac()) {
   			} else if (OSValidator.isUnix()) {
   				filePath = System.getProperty("jboss.server.data.dir") + "/Dialysis/" + "/Uploads/";
   			} else if (OSValidator.isSolaris()) {
   				System.out.println("This is Solaris");
   			} else {
   				System.out.println("Your OS is not support!!");
   			}
   		}else if(serverName.equalsIgnoreCase("tomcat"))
   		{
   			if (OSValidator.isWindows()) {
   				filePath = System.getProperty("catalina.home") + "\\Dialysis\\" + "\\Uploads\\";
   			} else if (OSValidator.isMac()) {
   			} else if (OSValidator.isUnix()) {
   				filePath = System.getProperty("catalina.home") + "/Dialysis/" + "/Uploads/";
   			} else if (OSValidator.isSolaris()) {
   				System.out.println("This is Solaris");
   			} else {
   				System.out.println("Your OS is not support!!");
   			}
   		}	
    	   
		
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}

   	//Added by Ganesh
   	public static String getOutsourceFilesPath() {
   		
   	   String serverName=getServer();
  		if(serverName.equalsIgnoreCase("jboss"))
  		{
  			if (OSValidator.isWindows()) {
  	   			filePath = System.getProperty("jboss.server.data.dir") + "\\outsource\\";
  	   		} else if (OSValidator.isMac()) {
  	   		} else if (OSValidator.isUnix()) {
  	   			filePath = System.getProperty("jboss.server.data.dir") + "/outsource/";
  	   		} else if (OSValidator.isSolaris()) {
  	   		      System.out.println("This is Solaris");
  	   		} else {
  	   		     System.out.println("Your OS is not support!!"); 
  	   		}
  		} else if(serverName.equalsIgnoreCase("tomcat"))
  		{
  			if (OSValidator.isWindows()) {
  	   			filePath = System.getProperty("catalina.home") + "\\outsource\\";
  	   		} else if (OSValidator.isMac()) {
  	   		} else if (OSValidator.isUnix()) {
  	   			filePath = System.getProperty("catalina.home") + "/outsource/";
  	   		} else if (OSValidator.isSolaris()) {
  	   		      System.out.println("This is Solaris");
  	   		} else {
  	   		      System.out.println("Your OS is not support!!");
  	   		 }
  		}
   		
   		
   		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
   	}
   	

	 public static String getLabReportPath() {
		
		    String serverName=getServer();
	  		if(serverName.equalsIgnoreCase("jboss"))
	  		{
	  			 if (OSValidator.isWindows()) {		
	  				filePath = System.getProperty("jboss.server.data.dir") + "\\labTestPDF\\"+ "\\Documents\\";
	  				//filePath = "\\labTestPDF\\"+ "\\Documents\\";
	  			} else if (OSValidator.isMac()) {
	  			
	  			} else if (OSValidator.isUnix()) {		
	  				filePath = System.getProperty("jboss.server.data.dir") + "/labTestPDF/"+ "/Documents/";
	  				//filePath = "/labTestPDF/"+ "/Documents/";
	  			
	  			} else if (OSValidator.isSolaris()) {
	  				System.out.println("This is Solaris");
	  			} else {
	  				System.out.println("Your OS is not support!!");
	  			}
	  		}else if(serverName.equalsIgnoreCase("tomcat"))
	  		{
	  			 if (OSValidator.isWindows()) {		
	  				filePath = System.getProperty("catalina.home") + "\\labTestPDF\\"+ "\\Documents\\";		
	  			} else if (OSValidator.isMac()) {
	  			
	  			} else if (OSValidator.isUnix()) {		
	  				filePath = System.getProperty("catalina.home") + "/labTestPDF/"+ "/Documents/";
	  			
	  			} else if (OSValidator.isSolaris()) {
	  				System.out.println("This is Solaris");
	  			} else {
	  				System.out.println("Your OS is not support!!");
	  			}
	  		}	
		
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}
	 
	 /**
 	 * @author Vishnu Throat
 	 * @since 13-08-2020
 	 * @comment added to upload the documents related to good reciept note
 	 * @return
 	 */
 	public static String getGrnFilesPath() {
 			
		if (OSValidator.isWindows()) {
			filePath = System.getProperty("catalina.home") + "\\goodReceiptNote\\" + "\\Documents\\";
		} else if (OSValidator.isMac()) {
		} else if (OSValidator.isUnix()) {
			filePath = System.getProperty("catalina.home") + "/goodReceiptNote/" + "/Documents/";
		} else if (OSValidator.isSolaris()) {

		} else {
			filePath = System.getProperty("catalina.home") + "/goodReceiptNote/" + "/Documents/";
		}
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}
 	
 	/**
	 * @author rohit sandbhor
	 * @comment Added by Rohit to upload the documents related item master contract slave
	 * @return
	 */
		public static String getContractDetailsFilesPath() {
			
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\contract details documents\\" + "\\Documents\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/contract details documents/" + "/Documents/";
			} else if (OSValidator.isSolaris()) {

			} else {
				filePath = System.getProperty("catalina.home") + "/contract details documents/" + "/Documents/";
			}
			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
		
		/**
		 * @author rohit sandbhor
		 * @since 21-07-2020
		 * @comment added to upload the documents related to asset maintenance flow
		 * @return
		 */
		public static String getAssetMaintenenceDetailsFilesPath() {
				
				if (OSValidator.isWindows()) {
					filePath = System.getProperty("catalina.home") + "\\asset maintenance documents\\" + "\\Documents\\";
				} else if (OSValidator.isMac()) {
				} else if (OSValidator.isUnix()) {
					filePath = System.getProperty("catalina.home") + "/asset maintenance documents/" + "/Documents/";
				} else if (OSValidator.isSolaris()) {

				} else {
					filePath = System.getProperty("catalina.home") + "/asset maintenance documents/" + "/Documents/";
				}
				return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
		
		/**
	 	 * @author Vishnu Throat
	 	 * @since 31-08-2020
	 	 * @comment added to upload the documents related to good reciept note
	 	 * @return
	 	 */
	 	public static String getPoFilesPath() {
	 			
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\purchaseorder\\" + "\\Documents\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/purchaseorder/" + "/Documents/";
			} else if (OSValidator.isSolaris()) {

			} else {
				filePath = System.getProperty("catalina.home") + "/purchaseorder/" + "/Documents/";
			}
			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
	 	
	 	/**
	 	 * @author Vishnu Throat
	 	 * @since 31-08-2020
	 	 * @comment added to upload the documents related to Purchase Re-Order
	 	 * @return
	 	 */
	 	public static String getPROFilesPath() {
	 			
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\purchasereorder\\" + "\\Documents\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/purchasereorder/" + "/Documents/";
			} else if (OSValidator.isSolaris()) {

			} else {
				filePath = System.getProperty("jboss.server.data.dir") + "/purchasereorder/" + "/Documents/";
			}
			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
	 	
	 	/**
	 	 * @author Vishnu Throat
	 	 * @since 1-09-2020
	 	 * @comment added to upload the documents related to purchase quotation
	 	 * @return
	 	 */
	 	public static String getPqFilesPath() {
	 			
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\purchasequotation\\" + "\\Documents\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/purchasequotation/" + "/Documents/";
			} else if (OSValidator.isSolaris()) {

			} else {
				filePath = System.getProperty("jboss.server.data.dir") + "/purchasequotation/" + "/Documents/";
			}
			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
	 	
	 	/**
	 	 * @author Vishnu Throat
	 	 * @since 25-11-2020
	 	 * @comment added to upload the documents related to Hospital License
	 	 * @return
	 	 */
	 	public static String getHospitalLicenseIdFilesPath() {
	 			
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\HospitalLicense\\" + "\\Documents\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/HospitalLicense/" + "/Documents/";
			} else if (OSValidator.isSolaris()) {

			} else {
				filePath = System.getProperty("jboss.server.data.dir") + "/HospitalLicense/" + "/Documents/";
			}
			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}

		public static String getDoctorDeskUploadFilesPath() {
			// TODO Auto-generated method stub
			/*
			 * if (OSValidator.isWindows()) { filePath =
			 * System.getProperty("jboss.server.data.dir") +
			 * "\\DoctorDesk\\" + "\\DocumentTab\\"; } else if (OSValidator.isMac()) { }
			 * else if (OSValidator.isUnix()) { filePath =
			 * System.getProperty("jboss.server.data.dir") + "/DoctorDesk/" +
			 * "/DocumentTab/"; } else if (OSValidator.isSolaris()) {
			 * 
			 * } else { filePath = System.getProperty("jboss.server.data.dir") +
			 * "/DoctorDesk/" + "/DocumentTab/"; }
			 */
			
			if(OSValidator.isWindows()) {
				//filePath = System.getProperty("catalina.home") + "\\"+folderName+"\\";
				filePath = "C:\\DoctorDesk" + "\\DocumentTab\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				//filePath = System.getProperty("catalina.home") + "/"+folderName+"/";
				filePath = System.getProperty("user.home") + "/DoctorDesk"+ "/DocumentTab/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
		
		
		
		public static String getIVFUploadFilesPath() {
			// TODO Auto-generated method stub
			/*
			 * if (OSValidator.isWindows()) { filePath =
			 * System.getProperty("jboss.server.data.dir") +
			 * "\\DoctorDesk\\" + "\\DocumentTab\\"; } else if (OSValidator.isMac()) { }
			 * else if (OSValidator.isUnix()) { filePath =
			 * System.getProperty("jboss.server.data.dir") + "/DoctorDesk/" +
			 * "/DocumentTab/"; } else if (OSValidator.isSolaris()) {
			 * 
			 * } else { filePath = System.getProperty("jboss.server.data.dir") +
			 * "/DoctorDesk/" + "/DocumentTab/"; }
			 */
			
			if(OSValidator.isWindows()) {
				//filePath = System.getProperty("catalina.home") + "\\"+folderName+"\\";
				filePath = "C:\\IVF Document" + "\\DocumentTab\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				//filePath = System.getProperty("catalina.home") + "/"+folderName+"/";
				filePath = System.getProperty("user.home") + "/IVF Document"+ "/DocumentTab/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}

		
		
		
		
		public static String getXrayFilesPath() {
			
			if(OSValidator.isWindows()) {
				filePath = "C:\\DoctorDesk" + "\\Xray\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("user.home") + "/DoctorDesk"+ "/Xray/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
			return filePath;
		}

		//this is added by Vishnu for consent form 
 	
 	public static String getConsentFormFilesPath() {
			
 		
 		if(OSValidator.isWindows()) {
			filePath = "C:\\ConsentForm"+ "/Documents/";
		} else if (OSValidator.isMac()) {
			System.out.println("This is Mac");
		} else if (OSValidator.isUnix()) {
			filePath = System.getProperty("user.home") + "/ConsentForm"+ "/Documents/";
		} else if (OSValidator.isSolaris()) {
			System.out.println("This is Solaris");
		} else {
			System.out.println("Your OS is not support!!");
		}
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}
 	
 	//this is added by aniket for consent form 
 	
 	 	public static String getOrganCollectionFilesPath() {
 	 		
 	 		if(OSValidator.isWindows()) {
				filePath = "C:\\OrganCollectionFiles"+ "/Documents/";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("user.home") + "/OrganCollectionFiles"+ "/Documents/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
 	 		
 			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
 		}
 	 	
 	 	//this is added by Vishnu for cross match 
		public static String getOrganCrossMatchFilesPath() {
			// TODO Auto-generated method stub
			if(OSValidator.isWindows()) {
				filePath = "C:\\OrganCrossMatchFiles"+ "/Documents/";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("user.home") + "/OrganCrossMatchFiles"+ "/Documents/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
			
 			return filePath;
		}

		//Added by Ganesh
		public static String getChildGuidanceFilesPath() {
			
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.base") + "\\child Guidance Patient\\" + "\\Documents\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.base") + "/child Guidance Patient/" + "/Documents/";
			} else if (OSValidator.isSolaris()) {

			} else {
				filePath = System.getProperty("catalina.base") + "/child Guidance Patient/" + "/Documents/";
			}
			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
				
		public static String getPaymentFolderPath() {
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.base") + "\\paymentPhoto\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.base") + "/paymentPhoto/";
			} else if (OSValidator.isSolaris()) {
			} else {
				System.out.println("Your OS is not support!!");
			}
			return filePath;
		}
		
		public static String getMergedLabReportPath() {
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.base") + "\\webapps\\" + "\\MergedLabReports\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.base") + "/webapps/" + "/MergedLabReports/";
			} else if (OSValidator.isSolaris()) {

			} else {
				filePath = System.getProperty("catalina.base") + "/webapps/" + "/MergedLabReports/";
			}
			return filePath;//"/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
	 
		public static String getBillReceiptPath() {
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.base") + "\\webapps\\" + "\\BillReceipt\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.base") + "/webapps/" + "/BillReceipt/";
			} else if (OSValidator.isSolaris()) {

			} else {
				filePath = System.getProperty("catalina.base") + "/webapps/" + "/BillReceipt/";
			}
			return filePath;//"/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
		
		/**
	 	 * @author aniket kanse
	 	 * @since 11/11/2020
	 	 * @return filepath
	 	 */
	 	public static String getRisReportPDF() {
	 		if (OSValidator.isWindows()) {		
	 			filePath = System.getProperty("catalina.home") + "\\webapps\\"+ "\\risReportPDF\\";		
	 		} else if (OSValidator.isMac()) {
	 		
	 		} else if (OSValidator.isUnix()) {		
	 			filePath = System.getProperty("catalina.home") + "/webapps/"+ "/risReportPDF/";
	 		
	 		} else if (OSValidator.isSolaris()) {
	 		} else {
	 			filePath = System.getProperty("catalina.home") + "/webapps/"+ "/risReportPDF/";
	 		}
	 		return filePath;
	 	}
	 	
	 	public static String getRisUploadFilesPath() {
			
			
			if(OSValidator.isWindows()) {
				//filePath = System.getProperty("catalina.home") + "\\"+folderName+"\\";
				filePath = "C:\\RISDocuments" + "\\ris\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				//filePath = System.getProperty("catalina.home") + "/"+folderName+"/";
				filePath = System.getProperty("user.home") + "/RISDocuments"+ "/ris/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
	 	
	 	 public static String getDoctorDeskUploadFilesPath1() {
	            // TODO Auto-generated method stub
	            /*
	             * if (OSValidator.isWindows()) { filePath =
	             * System.getProperty("jboss.server.data.dir") +
	             * "\\DoctorDesk\\" + "\\DocumentTab\\"; } else if (OSValidator.isMac()) { }
	             * else if (OSValidator.isUnix()) { filePath =
	             * System.getProperty("jboss.server.data.dir") + "/DoctorDesk/" +
	             * "/DocumentTab/"; } else if (OSValidator.isSolaris()) {
	             *
	             * } else { filePath = System.getProperty("jboss.server.data.dir") +
	             * "/DoctorDesk/" + "/DocumentTab/"; }
	             */
	           
	            if(OSValidator.isWindows()) {
	                //filePath = System.getProperty("catalina.home") + "\\"+folderName+"\\";
	                filePath = "C:\\NursingDoc" + "\\DocumentTab\\";
	            } else if (OSValidator.isMac()) {
	                System.out.println("This is Mac");
	            } else if (OSValidator.isUnix()) {
	                //filePath = System.getProperty("catalina.home") + "/"+folderName+"/";
	                filePath = System.getProperty("user.home") + "/NursingDoc"+ "/DocumentTab/";
	            } else if (OSValidator.isSolaris()) {
	                System.out.println("This is Solaris");
	            } else {
	                System.out.println("Your OS is not support!!");
	            }
	            return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	        }
	 	 
	 	public static String getLineChartFilesPath() {
 			
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\LineCharts\\";
			} else if (OSValidator.isMac()) {
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/LineCharts/";
			} else if (OSValidator.isSolaris()) {

			} else {
				filePath = System.getProperty("jboss.server.data.dir") + "/LineCharts/";
			}
			return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		}
	 	
	 	
	 	public static String getLabReportPathForMeesha() {
			
		    String serverName=getServer();
	  		if(serverName.equalsIgnoreCase("jboss"))
	  		{
	  			 if (OSValidator.isWindows()) {		
	  				//filePath = System.getProperty("jboss.server.data.dir") + "\\labTestPDF\\"+ "\\Documents\\";
	  				filePath = "\\labTestPDF\\"+ "\\Documents\\";
	  			} else if (OSValidator.isMac()) {
	  			
	  			} else if (OSValidator.isUnix()) {		
	  				//filePath = System.getProperty("jboss.server.data.dir") + "/labTestPDF/"+ "/Documents/";
	  				filePath = "/labTestPDF/"+ "/Documents/";
	  			
	  			} else if (OSValidator.isSolaris()) {
	  				System.out.println("This is Solaris");
	  			} else {
	  				System.out.println("Your OS is not support!!");
	  			}
	  		}else if(serverName.equalsIgnoreCase("tomcat"))
	  		{
	  			 if (OSValidator.isWindows()) {		
	  				filePath = System.getProperty("catalina.home") + "\\labTestPDF\\"+ "\\Documents\\";		
	  			} else if (OSValidator.isMac()) {
	  			
	  			} else if (OSValidator.isUnix()) {		
	  				filePath = System.getProperty("catalina.home") + "/labTestPDF/"+ "/Documents/";
	  			
	  			} else if (OSValidator.isSolaris()) {
	  				System.out.println("This is Solaris");
	  			} else {
	  				System.out.println("Your OS is not support!!");
	  			}
	  		}	
		
		return filePath;// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
	}
	 	public static String getPriscriptionPhoto() {
			String serverName=getServer();
			if(serverName.equalsIgnoreCase("jboss"))
			{
				if (OSValidator.isWindows()) {
					filePath = System.getProperty("jboss.server.data.dir") + "\\prescriptionPhotos\\";
				} else if (OSValidator.isMac()) {
					System.out.println("This is Mac");
				} else if (OSValidator.isUnix()) {
					filePath = System.getProperty("jboss.server.data.dir") + "/prescriptionPhotos/";
				} else if (OSValidator.isSolaris()) {
					System.out.println("This is Solaris");
				} else {
					System.out.println("Your OS is not support!!");
				}
				
			}else if(serverName.equalsIgnoreCase("tomcat"))
			{
				if (OSValidator.isWindows()) {
					filePath = System.getProperty("catalina.home") + "\\prescriptionPhotos\\";
				} else if (OSValidator.isMac()) {
					System.out.println("This is Mac");
				} else if (OSValidator.isUnix()) {
					filePath = System.getProperty("catalina.home") + "/prescriptionPhotos/";
				} else if (OSValidator.isSolaris()) {
					System.out.println("This is Solaris");
				} else {
					System.out.println("Your OS is not support!!");
				}
			}	
			return filePath;
			// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
			/* return FilePath.BASEPATH.path; */
		}

}

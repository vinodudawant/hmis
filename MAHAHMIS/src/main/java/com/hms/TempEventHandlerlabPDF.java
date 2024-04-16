package com.hms;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.ResourceBundle;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.hms.administrator.dto.HospitalDetails;
import com.hms.administrator.service.HospitalDetailAdminService;
import com.hms.configuration.PageEventHandlerBean;
import com.hms.ehat.controller.LabController;
import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dto.LabRequestDTO;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.service.LabService;
import com.hms.pharmacy.upload.FilePath;
import com.hms.utility.ApplicationContextUtils;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfPageEvent;
import com.lowagie.text.pdf.PdfPageEventHelper;
import com.lowagie.text.pdf.PdfWriter;

public class TempEventHandlerlabPDF extends PdfPageEventHelper implements PdfPageEvent {

	
	/*static HttpServletRequest request = null;
	
	public static String getStaticRequestObject(HttpServletRequest request1)
	{
		request = request1;
	} */
	
		//ServletOutputStream outStream = response.getOutputStream();
        	//response.reset();
        	//response.setContentType("application/pdf")arg0;
           	// Document document = new Document(new Rectangle(0, 0, 595, 842));
           	// document.setMargins(10, 10, 40, 52);

          //  PdfWriter.getInstance(document, outStream);
            
          //  document.open();
	
	
	
	@Override
	public void onStartPage(PdfWriter writer, Document document)
	{

		
		 Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
         Font subheader = new Font(Font.HELVETICA, 9, Font.BOLD);
         Font footer = new Font(Font.HELVETICA, 8, Font.NORMAL);
         header.setColor(10, 4, 2);

         Font tableheader = new Font(Font.HELVETICA, 10, Font.BOLD);
         Font tabletext = new Font(Font.HELVETICA, 9, Font.NORMAL);
         Font small = new Font(Font.HELVETICA, 8, Font.NORMAL); 
		
		try {
			
			PageEventHandlerBean eventObj = new PageEventHandlerBean();
			
			HttpServletRequest request = eventObj.getRequest();
			
			HttpSession session = request.getSession();
			 session = request.getSession();
				String TechnicianName = (String) session.getAttribute("userName");
	           	int treatMasId=0;//Integer.parseInt(request.getParameter("testmasterId"));//LabReqMstId
	           	String allVals = request.getParameter("allVals");
	            int treatmentId=Integer.parseInt(request.getParameter("treatmentId"));
	            int IdPathologist=0;//Integer.parseInt(request.getParameter("IdPathologist"));
	            //String[] patientObj = request.getParameterValues("myObj");
	            
	            
	            treatMasId = Integer.parseInt(allVals.split(",")[0]);
	            System.out.println("GGGGGGGGGGGGGG"+treatMasId);
	            
				RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
				RegTreBillDto regTrDto = new RegTreBillDto();			
				List<RegTreBillDto> ltPatientRecord = new ArrayList<RegTreBillDto>();
				regTrDto=regCon.fetchPatientsRecordByTreatmentId(treatmentId);
				
				ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				String lntUnit = (String) resourceBundle.getObject("lntUnit").toString();


				LabController labCon=(ApplicationContextUtils.getApplicationContext()).getBean(LabController.class);
				LabRequestDTO labReq=new LabRequestDTO();	
				List<LabRequestDTO> labReqDtolist = new ArrayList<LabRequestDTO>();
				labReq=labCon.fetchonloadTestResult(treatMasId, request);
				//labReq=labReq.getListLabRequest().get(0);
				
				
	            int countOverAll = 0 ;
				int countPkg = 0 ;
				int countPro = 0 ;
				int countPkgPro = 0 ;
	            // parameter value
	            int countTest = 0 ;

	            int totalTestCat = 0;
	            //Patient Object
	            String ptid = "";
	            String pttit = "";
	            String ptname = "";
	            String ptadd = "";
	            String ptage = "";
	            String ehatPi = "";
	            String sponsorName = "";
	            String ptsex = "";
	            String ptdate = "";
	            String PathologistName = "";
	            String pathoQualification = "";
	            String signature = "";

	            String refdoc = "";
	            String coldate = "";
	            String coltime = "";
	            String repduedate = "";
	            String repduetime = "";
	            String recdate = "";
	            String rectime = "";

	            String pagty = "";
	            String pag = "";

	            String valTypeNR = "";
	            String a1 = "";
	            String a2 = "";
	            String Town = "";
	            String Taluka = "";
	            String District = "";
	            String addressPatient = "";
	            String actualpath="";
	            int treatId = 0;
	            String refdocList="";
	            String advice="";
	            String ProComments  ="";
	            String ProInterpretion = "";
	            
	            String deptName = "";
	            Integer deptId = 0;
	            String drDept = "";

	            for (int i = 0; i < labReq.getListLabRequest().size(); i++) {
	            	LabRequestDTO labReq1=new LabRequestDTO();	
	            	labReq1=labReq.getListLabRequest().get(i);
	                 
	                 refdoc=labReq.getLabResultMstViewDto().get(0).getRefDocName();
	                 Set<String> mySet = new HashSet<String>(Arrays.asList(refdoc.split(",")));
	                 refdocList = (mySet.toString().replace("[","").replace("]", ""));
	                
	                 
	                 //Added by harshit.
	                 IdPathologist=labReq.getListLabRequest().get(0).getPathologistId();
	                 PathologistName=labReq.getPathologistDtoList().get(0).getDocName();
	                 treatId=treatmentId;
	                 Date dateCol=labReq.getListLabRequest().get(0).getSmplColletDatetime().getTime();
	                 Date dateAcpt=labReq.getListLabRequest().get(0).getSmplAccptDatetime().getTime();
	                 Date dateReprt=labReq.getListLabRequest().get(0).getReportDueDatetime();
	                 advice = labReq.getListLabRequest().get(0).getAdvice();
	                 //System.err.println("--->>>>"+ new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(dateCol));
	                 
	                 coldate = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(dateCol).split(" ")[0];
	                 coltime = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(dateCol).split(" ")[1];

	                 recdate = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(dateAcpt).split(" ")[0];
	                 rectime = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(dateAcpt).split(" ")[1];

	                 repduedate = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(dateReprt).split(" ")[0];
	                 repduetime = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(dateReprt).split(" ")[1];
	            }
	            
	          //for get patient details.
	            for (int i = 0; i < regTrDto.getListRegTreBillDto().size(); i++) {
	            	RegTreBillDto regTrDto1 = new RegTreBillDto();
	            	regTrDto1=regTrDto.getListRegTreBillDto().get(i);
	               addressPatient=regTrDto1.getAddress();
	               String age=regTrDto1.getAge();
	               /* if((regTrDto1.getAge().split("Y")[0]).equalsIgnoreCase("0")){
	            	   
	            	  if((regTrDto1.getAge().split("M")[0]).equalsIgnoreCase("0Y/0")){
	                	   ptage=(regTrDto1.getAge().split("/")[2]);
	                   }else{
	                	   ptage=(regTrDto1.getAge().split("/")[1])+"/"+(regTrDto1.getAge().split("/")[2]);
	                   }
	            	   
	               }else{
	            	   ptage=regTrDto1.getAge();
	               } */
	               
	               if((age.split("/")[0]).equalsIgnoreCase("0Y")){
	                   if((age.split("/")[1]).equalsIgnoreCase("0M")){
	                       ptage=(age.split("/")[2]);                  
	                       }else{
	                           if((age.split("/")[2]).equalsIgnoreCase("0D")){
	                               ptage=(age.split("/")[1]);
	                           }else{
	                               ptage=(age.split("/")[1])+"/"+(age.split("/")[2]);
	                           }
	                           }                                
	                   }else{
	                       
	                       if((age.split("/")[1]).equalsIgnoreCase("0M")){
	                           if((age.split("/")[2]).equalsIgnoreCase("0D")){
	                               ptage=age.split("/")[0];
	                           }else{
	                               ptage=age.split("/")[0]+"/"+age.split("/")[2];
	                           }
	                       }else{
	                           if((age.split("/")[2]).equalsIgnoreCase("0D")){
	                               ptage=age.split("/")[0]+"/"+age.split("/")[1];
	                           }else{
	                               ptage=age;
	                           }
	                       }
	                             
	                   }               

	               pag=regTrDto1.getAge().split("Y")[0];
	               //regTrDto1.getDepartmentId();
	               //System.err.println("--->>>>"+regTrDto1.getPatientName());
	               ptsex=regTrDto1.getGender();
	               deptId = regTrDto1.getDepartmentId();
	               deptName = regTrDto1.getDepartmentNameDoc();
	               ptid= regTrDto1.getPatientId().toString();
	               ehatPi=regTrDto1.getPatientId().toString();
	               sponsorName=regTrDto1.getCategoryName().toString();
	               pttit=regTrDto1.getPatientName().split(" ")[0];
	               ptname=regTrDto1.getPatientName().split(" ")[1]+" "+regTrDto1.getPatientName().split(" ")[2]+" "+regTrDto1.getPatientName().split(" ")[3];
	               pagty="Yrs";
	               regTrDto1.getOpdipdno();
	               //System.err.println("--->>>>"+ptage);

	            }//End of for loop.
				
	            int pag1 = Integer.parseInt(pag);

	            if (pagty.equals("Yrs")) {

	                if (pag1 > 15) {

	                    if (ptsex.equalsIgnoreCase("Male")) {
	                        valTypeNR = "m";
	                    } else if (ptsex.equalsIgnoreCase("Female")) {
	                        valTypeNR = "f";
	                    }
	                }
	                else if (15 >= pag1 && pag1 >= 3) {
	                    valTypeNR = "c";
	                } else if (pag1 < 3) {
	                    valTypeNR = "n";
	                } else {
	                    valTypeNR = "n";
	                }

	            }  else if (15 >= pag1 && pag1 >= 3) {
	                valTypeNR = "c";
	            } else if (pag1 < 3) {
	                valTypeNR = "n";
	            } else {
	                valTypeNR = "n";
	            }
	            
	          //Start table for 
				//fetch patient record
				 RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
				RegTreBillDto rtd = new RegTreBillDto();			
				String PType = "";
				String patient_address = "";
				if(uss != null)
				{
					rtd=uss.fetchPatientsRecordByTreatmentId(treatmentId);
					rtd=rtd.getListRegTreBillDto().get(0);
					rtd.getPatientName();
					
					
					
					 int stateId = rtd.getStateId();
					 int townId   =rtd.getTownId();
					 int districtId =rtd.getDistrictId();
					 int talukaId   =rtd.getTalukaId();
					
					 
					 String BillCategoryName ="";
					 String state  ="";
					 String district  ="";
					 String cityObj  ="";
					 String taluka  ="";
					 
					LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
					
					if(stateId > 0 ){
						state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
					}else{
						state   = "";
					}
					if(districtId > 0){
						district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
					}else{
						district   = "";
					}
					
					if(townId > 0){
						cityObj = fetchlist.getStringValOfObject("city","city_name",townId,"idcity");
					}else{
						cityObj   = "";
					}
					
					if(talukaId > 0){
						taluka  = fetchlist.getStringValOfObject("taluka","taluka_name",talukaId,"idtaluka"); 
					}else{
						taluka   = "";
					}				
					
					if(cityObj != "0" && !cityObj.equals("undefined") && !cityObj.equals("")){
						patient_address += cityObj;
					}
					
					if (taluka != "0" && !taluka.equals("undefined") && !taluka.equals("")) 
					{
						patient_address +=  (" "+taluka);
					}						
					if (district != "0" && !district.equals("undefined") && !district.equals("")) 
					{
						patient_address += (" " + district);
					}
					if (state != "0" && !state.equals("undefined") && !state.equals("")) 
					{
						patient_address += ("," + state);
					}
				}
				
	           /* Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
	            Font subheader = new Font(Font.HELVETICA, 9, Font.BOLD);
	            Font footer = new Font(Font.HELVETICA, 8, Font.NORMAL);
	            header.setColor(10, 4, 2);

	            Font tableheader = new Font(Font.HELVETICA, 10, Font.BOLD);
	            Font tabletext = new Font(Font.HELVETICA, 9, Font.NORMAL);
	            Font italic = new Font(Font.HELVETICA, 8, Font.ITALIC);
	            Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);*/
	            
	            java.util.Calendar currentDate = Calendar.getInstance();
	            SimpleDateFormat dateformatter = new SimpleDateFormat(
	                    "dd-MM-yyyy");
	            String curr_date = dateformatter.format(currentDate
	                    .getTime());
	            
	            PdfPTable HeaderTable1 = new PdfPTable(3);
	            int[] headerwidth1 = { 30,70,35 };
	            HeaderTable1.setWidths(headerwidth1);
	            HeaderTable1.setWidthPercentage(95f);
	            HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
	            HeaderTable1.getDefaultCell().setBorder( Rectangle.NO_BORDER);

	           //aniket_k_01_08_019_to_fetch_hospital_details_and_logo_on_print
	            HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
	    		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
	    		HospitalDetails hospObj = arrHospitalDetails.get(0);
				
				String path = hospObj.getFilePath();
	            String hospitalName = hospObj.getHospitalName();
	            hospitalName = hospitalName.toUpperCase();
	            String address = hospObj.getHospitalAddress();
	            String city = hospObj.getHospitalCity();
	            String contact = hospObj.getHospitalContact();
	            
	            String hospitalZip = hospObj.getHospitalZip(); 			
	    		String PhoneNo   =  hospObj.getHospitalContact();
	    		String secPhoneNo   =  hospObj.getSecPNo();
	    		String webste     =   hospObj.getWebsite();
	    		String email      =   hospObj.getHospitalEmail();
	    		String cinNo	  =   hospObj.getTxtCinNo();
	    		String serviceTaxNo	  =   hospObj.getTxtSerTaxNo();
	    		String panNo	  =   hospObj.getPanNo();
	    		String hPhoneNo   = PhoneNo+"/"+secPhoneNo;
	    		
	    		String path1 = "";
				if(lntUnit.equalsIgnoreCase("1"))
				{
				String pathToWeb1 = FilePath.getBasePath();
				 path1 = pathToWeb1 + "U1_L&T_community_HMI_screen_ahmednagar.jpg";
				}
				else if(lntUnit.equalsIgnoreCase("2"))
				{
					String pathToWeb1 = FilePath.getBasePath();
					 path1 = pathToWeb1 + "U2_L&T_community_HMI_screen_andheri.jpg";
				}
				else if(lntUnit.equalsIgnoreCase("3"))
				{
					String pathToWeb1 = FilePath.getBasePath();
					 path1 = pathToWeb1 + "U3_L&T_community_HMI_screen_chennai.jpg";
				}
				else if(lntUnit.equalsIgnoreCase("4"))
				{
					String pathToWeb1 = FilePath.getBasePath();
					 path1 = pathToWeb1 + "U4_L&T_community_HMI_screen_coimbatore.jpg";
				}
				else if(lntUnit.equalsIgnoreCase("5"))
				{
					String pathToWeb1 = FilePath.getBasePath();
					 path1 = pathToWeb1 + "U5_L&T_community_HMI_screen_lonavala.jpg";
				}
				else if(lntUnit.equalsIgnoreCase("6"))
				{
					String pathToWeb1 = FilePath.getBasePath();
					 path1 = pathToWeb1 + "U6_L&T_community_HMI_screen_surat.jpg";
				}
				else if(lntUnit.equalsIgnoreCase("7"))
				{
					String pathToWeb1 = FilePath.getBasePath();
					 path1 = pathToWeb1 + "U7_L&T_community_HMI_screen_Thane.jpg";
				}
				else if(lntUnit.equalsIgnoreCase("8"))
				{
					String pathToWeb1 = FilePath.getBasePath();
					 path1 = pathToWeb1 + "U8_L&T_community_HMI_screen_vadodara.jpg";
				}

					Image img124 = null;
					PdfPCell cell13 = null;
					
					try {
					   // String path1 = application.getRealPath(path);
					    img124 = Image.getInstance(path1);
					    //img124.scaleAbsolute(150, 60);
					    
					    if(lntUnit.equalsIgnoreCase("1")){
					    	img124.scaleAbsolute(230, 60);
						} else if(lntUnit.equalsIgnoreCase("2")){
							img124.scaleAbsolute(230, 60);
						} else if(lntUnit.equalsIgnoreCase("3")){
							img124.scaleAbsolute(310, 60);
						} else if(lntUnit.equalsIgnoreCase("4")){
							img124.scaleAbsolute(230, 60);
						} else if(lntUnit.equalsIgnoreCase("5")){
							img124.scaleAbsolute(230, 60);
						} else if(lntUnit.equalsIgnoreCase("6")){
							img124.scaleAbsolute(310, 60);
						} else if(lntUnit.equalsIgnoreCase("7")){
							img124.scaleAbsolute(310, 60);
						} else if(lntUnit.equalsIgnoreCase("8")){
							img124.scaleAbsolute(310, 60);
						}
					    
					    
					    cell13 = new PdfPCell();
					    cell13.addElement(new Chunk(img124, 1, -45));
					    cell13.setBorder(Rectangle.NO_BORDER);
					} catch (Exception e) {
					    e.printStackTrace();
					}
					
					if (img124 == null) {
	                    HeaderTable1.addCell(new Phrase("", header));
	                } else {
	                    HeaderTable1.addCell(cell13);
	                }
					
					Font regular = new Font(Font.TIMES_ROMAN, 10, Font.NORMAL);
					Font bold = new Font(Font.TIMES_ROMAN, 8, Font.BOLD);
	        		Phrase p = new Phrase();
					p.add(new Chunk(""+hospitalName, bold));			
					p.add(new Chunk("\n\n"+"\t\t"+address, tabletext));			
					p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
					p.add(new Chunk("Phone No. "+hPhoneNo, tabletext));	
					p.add(new Chunk("\n"+webste+"\n"+"email: "+email, tabletext));
					
					PdfPCell hospitalNameCell = new PdfPCell(p);
	                hospitalNameCell.setHorizontalAlignment(Element.ALIGN_LEFT);
	                hospitalNameCell.setBorder(Rectangle.NO_BORDER);
	                HeaderTable1.addCell("");
	                HeaderTable1.addCell(hospitalNameCell);
	            
	                
	                HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
	                HeaderTable1.addCell(new Phrase("", header));
	                HeaderTable1.addCell(new Phrase("", header));
	                HeaderTable1.addCell(new Phrase("", header));
	                document.add(HeaderTable1);
	                HeaderTable1.flushContent();
	/*             // spacing
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	          
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	        
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	             */
	            
				    document.add(HeaderTable1);
	            HeaderTable1.flushContent();

	            HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            document.add(HeaderTable1);
	            HeaderTable1.flushContent();
	            
	            
	            
	         			PdfPTable HeaderTable2 = new PdfPTable(4);
	                    int[] headerwidth2 = { 40, 40, 10, 10 };
	                    HeaderTable2.setWidths(headerwidth2);
	                    HeaderTable2.setWidthPercentage(95f);
	                    HeaderTable2
	                            .setHorizontalAlignment(Element.ALIGN_CENTER);
	                    HeaderTable2.getDefaultCell().setBorder(
	                            Rectangle.BOTTOM);

	                  
	                    HeaderTable2.addCell(new Phrase("", header));
	                     HeaderTable2.addCell(new Phrase("",
	                    		header)); 
	                   /* HeaderTable2.addCell(new Phrase("Lab Test Result",
	                            		header));*/
	                    HeaderTable2.addCell(new Phrase("Date: ", subheader));
	                    HeaderTable2.addCell(new Phrase(curr_date, subheader));
	                    document.add(HeaderTable2);
	                    HeaderTable2.flushContent();

	                    /* -------------------------------------Table4----------------------------- */
	                    PdfPTable HeaderTable4 = new PdfPTable(4);
	                    //int[] headerwidth4 = { 12, 12, 2,15, 28, 2, 15, 24 };
	                    int[] headerwidth4 = { 15,35,15,35 };
	                    HeaderTable4.setWidths(headerwidth4);
	                    HeaderTable4.setWidthPercentage(95f);
	                    HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	                    //Spacing
	                    /* HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header)); */
									
	                    HeaderTable4.addCell(new Phrase("Patient ID        :",subheader));
	                    HeaderTable4.addCell(new Phrase(ehatPi, tabletext));
	                    
	                    HeaderTable4.addCell(new Phrase("Treatment ID  :",subheader));
	                    HeaderTable4.addCell(new Phrase("" + treatId, tabletext));
	                    
	                   // HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("Patient Name  :",subheader));
	                    HeaderTable4.addCell(new Phrase(pttit + " " + ptname,tabletext));
	                    
	                    HeaderTable4.addCell(new Phrase("Consultant     :", subheader));
	                    HeaderTable4.addCell(new Phrase(refdoc, tabletext));
	                    
	                  //  HeaderTable4.addCell(new Phrase("", header));
	                  
	                    

	                    /* HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header)); */

	                    HeaderTable4.addCell(new Phrase("Age / Gender  :", subheader));
	                    HeaderTable4.addCell(new Phrase(ptage + " / " +ptsex, tabletext));
	                    
	                    HeaderTable4.addCell(new Phrase("Department    :", subheader));
	                    HeaderTable4.addCell(new Phrase(deptName, tabletext));
	                    /*  if(deptId == 1){
	                    	 HeaderTable4.addCell(new Phrase("OPD", tabletext));
	                    }else {
	                    	HeaderTable4.addCell(new Phrase("IPD", tabletext));
	                    }  */
	                  
	                   
	                    
	                    HeaderTable4.addCell(new Phrase("Sponsor          :",subheader));
	                    HeaderTable4.addCell(new Phrase(sponsorName, tabletext));
	                    
	                    HeaderTable4.addCell(new Phrase("Collected        :",subheader));
	                    HeaderTable4.addCell(new Phrase(coldate + "  " + coltime, tabletext));
	                    //HeaderTable4.addCell(new Phrase("", header));
	                    //HeaderTable4.addCell(new Phrase("Received:", subheader));
	                    //HeaderTable4.addCell(new Phrase(recdate + "   " + rectime, tabletext));
	                    //HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", subheader));
	                    HeaderTable4.addCell(new Phrase("", tabletext)); 
	                    
	                    HeaderTable4.addCell(new Phrase("Reported        :", subheader));
	                    HeaderTable4.addCell(new Phrase(repduedate + "  "+ repduetime, tabletext));
	                    
	                    //HeaderTable4.addCell(new Phrase("", header));
	                    
	                    /* HeaderTable4.addCell(new Phrase("Address :", subheader));
	                    if(!addressPatient.equalsIgnoreCase("") || !patient_address.equalsIgnoreCase("")){
	                   	 HeaderTable4.addCell(new Phrase(addressPatient+","+patient_address,tabletext));
	                   }else{
	                   	HeaderTable4.addCell(new Phrase("",tabletext));
	                   } */
	                    //HeaderTable4.addCell(new Phrase("", header));
	                    

	                    /* HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", header)); */

	                    
	                    
	                    HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", subheader));
	                    HeaderTable4.addCell(new Phrase("", tabletext));
	                    HeaderTable4.addCell(new Phrase("", header));
	                    HeaderTable4.addCell(new Phrase("", subheader));
	                    HeaderTable4.addCell(new Phrase("", tabletext));
	                  
	                    document.add(HeaderTable4);
	                    HeaderTable4.flushContent();
            
            //to add extra space after underline of header
	                    PdfPTable HeaderTable5 = new PdfPTable(4);
	                    int[] headerwidth5 = { 40, 40, 10, 10 };
	                    HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            HeaderTable5.addCell(new Phrase("", header));
            HeaderTable5.addCell(new Phrase("", header));
            HeaderTable5.addCell(new Phrase("", header));
            HeaderTable5.addCell(new Phrase("", header));
            
            HeaderTable5.addCell(new Phrase("", header));
            HeaderTable5.addCell(new Phrase("", header));
            HeaderTable5.addCell(new Phrase("", header));
            HeaderTable5.addCell(new Phrase("", header));
            
            HeaderTable5.addCell(new Phrase("", header));
            HeaderTable5.addCell(new Phrase("", header));
            HeaderTable5.addCell(new Phrase("", header));
            HeaderTable5.addCell(new Phrase("", header));
            
            document.add(HeaderTable5);
            HeaderTable5.flushContent();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void onChapter(PdfWriter arg0, Document arg1, float arg2,
			Paragraph arg3) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onChapterEnd(PdfWriter arg0, Document arg1, float arg2) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onCloseDocument(PdfWriter arg0, Document arg1) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onEndPage(PdfWriter arg0, Document arg1) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onGenericTag(PdfWriter arg0, Document arg1, Rectangle arg2,
			String arg3) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onOpenDocument(PdfWriter arg0, Document arg1) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onParagraph(PdfWriter arg0, Document arg1, float arg2) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onParagraphEnd(PdfWriter arg0, Document arg1, float arg2) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onSection(PdfWriter arg0, Document arg1, float arg2, int arg3,
			Paragraph arg4) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onSectionEnd(PdfWriter arg0, Document arg1, float arg2) {
		// TODO Auto-generated method stub
		
	}

	

	


}

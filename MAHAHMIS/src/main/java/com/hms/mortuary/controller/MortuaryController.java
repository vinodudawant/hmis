package com.hms.mortuary.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.mortuary.dto.ColdRoomBedStatus;
import com.hms.mortuary.dto.ColdRoomMasterDto;
import com.hms.mortuary.dto.MortuaryBodyTrackingDto;
import com.hms.mortuary.dto.MortuaryDeathCertificateDto;
import com.hms.mortuary.dto.MortuaryDocUploadDto;
import com.hms.mortuary.dto.MortuaryFindingsDto;
import com.hms.mortuary.dto.MortuaryMasterDto;
import com.hms.mortuary.dto.MortuaryPmReport;
import com.hms.mortuary.service.MortuaryServiceInterface;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value="/mortuary")
public class MortuaryController {
	@Autowired
	MortuaryServiceInterface  mortuaryserviceinterface;
	
	/**@author     :Navnath Erande
	 * @Date       :15-10-2019
	 * @Code       :Morturay cold room master save**/
	@RequestMapping(value="savecoldroommaster",method = RequestMethod.POST)
	@ResponseBody public String saveColdRoomMaster(ColdRoomMasterDto crm)
	{
		
		int id=mortuaryserviceinterface.saveColdRoomMaster(crm);
		String msg="";
		if(id==1)
		{
			msg="Saved Successfully";
		}
		else if(id==2)
		{
			msg="Updated Successfully";
		}
		return msg;
	}
	/** @Code       :fetch Morturay cold room master **/
	@RequestMapping(value="/fechcoldroommaster", method = RequestMethod.POST)
	@ResponseBody public ColdRoomMasterDto fechColdRoomMaster()
	{
		List<ColdRoomMasterDto> ltcoldDto = new ArrayList<ColdRoomMasterDto>();
		ltcoldDto = mortuaryserviceinterface.fechColdRoomMasterService();	
		ColdRoomMasterDto objNarr=new ColdRoomMasterDto();
		objNarr.setListColdRoomMaster(ltcoldDto);
		return objNarr;
		
	}
	/** @Code       :Delete Morturay cold room **/
	@RequestMapping(value="/deletecoldroommaster", method = RequestMethod.POST)
	@ResponseBody public String deleteColdRoomMaster(@RequestParam("delete_id") Integer id,HttpServletRequest request)
	{
		String msg="";
		boolean response=mortuaryserviceinterface.deleteColdRoomMaster(id,request);
		alert("response");// Sample Added .
		if(response==true)
		{
			msg="Delete Successfull...";
		}
		else
		{
			msg="Already Allocated Bed in this room  Not Deleted...";
		}
		return msg;
	}
	private void alert(String string) {
		// TODO Auto-generated method stub
		
	}
	/** @Code       :Morturay cold room master update**/
	@RequestMapping(value="/updatecoldroommaster", method = RequestMethod.POST)
	@ResponseBody public ColdRoomMasterDto updateColdRoomMaster(@RequestParam("update_id") Integer id)
	{
	
	ColdRoomMasterDto cold= mortuaryserviceinterface.upadteColdRoomMaster(id);
	return cold;
		
	}
	/**  @Code       :Get the BedAvaColdRoom**/
	@RequestMapping(value="/getbedavacoldroom", method = RequestMethod.POST)
	@ResponseBody public ColdRoomMasterDto getBedAvaColdRoom(@RequestParam("coldroomId") Integer id)
	{
		ColdRoomMasterDto cold=mortuaryserviceinterface.getBedAvaColdRoomService(id);
		
		return cold;
		
	}
	/**@Code       : fetch Morturay Master Information**/
	@RequestMapping(value="/getmortuarymasterDto", method = RequestMethod.POST)
	@ResponseBody public MortuaryMasterDto getMortuaryMasterDto(@RequestParam("mid") Integer id)
	{
		MortuaryMasterDto mmd= mortuaryserviceinterface.fechMortuaryMasterService(id);
	
	
		return mmd ;	
		
	}
	/**@Code       : Morturay Bed save Information**/
	@RequestMapping(value="/savebedmortuary", method = RequestMethod.POST)
	@ResponseBody public int saveMortuaryBedInformation(@RequestParam("mor_id") int mor_id, @RequestParam("cold_room_id") int cold_room_id, @RequestParam("bed_number") int bed_no, HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return mortuaryserviceinterface.saveColdroommortuaryslave(mor_id, cold_room_id, bed_no, userId);
	}
	/**@Code       : List of Morturay Master**/
	@RequestMapping(value="/listofmortuary",method=RequestMethod.POST)
	@ResponseBody public ColdRoomBedStatus listOfMortuary(@RequestParam("cold_room_id") Integer cold_room_id)
	{

		ColdRoomBedStatus beds = new ColdRoomBedStatus();
						  beds.setList(mortuaryserviceinterface.listOfmMasterDtos(cold_room_id));
		
		return beds;
		
	}
	/**@Code       : Get the morturay Id**/
	@RequestMapping(value = "/getmortuarybyid", method=RequestMethod.GET)
	@ResponseBody
	public MortuaryMasterDto getMortuaryById(@RequestParam("mor_id") int id)
	{
		return mortuaryserviceinterface.getMortuaryById(id);
	}
	
	/**@Code       : Bedde Allocation Method **/
	@RequestMapping(value="/beddeallocation",method=RequestMethod.POST)
	@ResponseBody public int beddeAllocation(@RequestParam("cold_room_slave_id") int cold_room_slave_id, HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return mortuaryserviceinterface.beddeAllocation(cold_room_slave_id, userId);
		
	}
	/**@Code       : Mortuary name autosuggestion Mothod**/
	@RequestMapping(value="/mortuarynameautosuggestion",method=RequestMethod.POST)
	@ResponseBody public MortuaryMasterDto Mortuarynameautosuggestion(@RequestParam("findingName") String name)
	{
		MortuaryMasterDto mortuary=new MortuaryMasterDto();
		List<MortuaryMasterDto> list=mortuaryserviceinterface.mortuaryAutosuggestion(name);
		mortuary.setMordto(list);
		return mortuary;
		
	}
	
	@RequestMapping(value ="/savebodytrackinginfo", method=RequestMethod.POST)
	@ResponseBody
	public int saveBodyTrackingInfo(MortuaryBodyTrackingDto dto, @RequestParam("mor_id") int mor_id, HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return mortuaryserviceinterface.saveBodyTrackingInfo(dto, mor_id, userId);
	}
	
	@RequestMapping(value="/mortuarytemplategetData",method=RequestMethod.POST)
	@ResponseBody public CustomizeTemplate MortuarytemplategetData(@RequestParam("Tempid") Integer id)
	{
		
		return mortuaryserviceinterface.mortuartyTempInformation(id);
		
	}
	
	/**@Code       : Mortuary Pm report save Mothod**/
	@RequestMapping(value="/postreportdata",method=RequestMethod.POST)
	@ResponseBody
	public String pmreportSaveMethod(MortuaryPmReport pmreport, @RequestParam("mor_id") int mor_id, HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		pmreport.setCreatedBy(userId);
		return mortuaryserviceinterface.pmreportSaveMethod(pmreport, mor_id);
	}
	
	/**@Code       : Previous Mortuary name autosuggestion Mothod**/
	@RequestMapping(value="/autoSuggestionPreviousMortury",method=RequestMethod.POST)
	@ResponseBody
	public MortuaryMasterDto autosuggestionpreviousMortury(@RequestParam ("findingName") String str)
	{
		MortuaryMasterDto mortuary =new MortuaryMasterDto();
		List<MortuaryMasterDto> list=null;
		list=mortuaryserviceinterface.autosuggestionpreviousMorturySrevices(str);
		mortuary.setMordto(list);
		return mortuary;
		
	}
	/**@Code       : Previous Mortuary search Mothod**/
	@RequestMapping(value="/PreviousMorturysearch",method=RequestMethod.POST)
	@ResponseBody
	public MortuaryMasterDto PreviousMorturysearchcontroller()
	{
		String str=null;
	
		MortuaryMasterDto mortuary =new MortuaryMasterDto();
		List<MortuaryMasterDto> list=null;
		list=mortuaryserviceinterface.autosuggestionpreviousMorturySrevices(str);
		mortuary.setMordto(list);
		return mortuary;
	}
	/**@Code       : Pm Report update method Mothod**/
/*	@RequestMapping(value="pmreportupdate",method=RequestMethod.POST)
	@ResponseBody
	public List<MortuaryPmReport> updatePmReport(@RequestParam ("pmreportupdate_id") Integer pmreport_id)
	{
			
		return mortuaryserviceinterface.updatePmReportService(pmreport_id);
		
	}*/

	
	@RequestMapping(value="pmreportupdate",method=RequestMethod.POST)
	@ResponseBody
	public MortuaryPmReport updatePmReport(@RequestParam ("pmreportupdate_id") Integer pmreport_id)
	{
			
		return mortuaryserviceinterface.updatePmReportService(pmreport_id);
		
	}
	//Added by Annapurna

	@RequestMapping(value="getPmReportforPrint",method=RequestMethod.POST)
	@ResponseBody
	public List<MortuaryPmReport> getPmReportforPrint(@RequestParam ("morid") Integer morid)
	{

		List<MortuaryPmReport> list = new ArrayList<MortuaryPmReport>();
		
		list = mortuaryserviceinterface.getPmReportforPrint(morid);
		
		MortuaryPmReport obj = new MortuaryPmReport();
		
		obj.setListmortuarypmreport(list);
			
		return list;
		
	}
	
	/**@Code       : fetch Single previous mortuary Mothod**/
	@RequestMapping(value="singlepreviousmorturay",method=RequestMethod.POST)
	@ResponseBody
	public MortuaryMasterDto singlePreviousMorturay(@RequestParam ("morId") Integer morId)
	{
		return mortuaryserviceinterface.singlePreviousMorturayServices(morId);
	}
	/**@Code       : fetch Body Tracking Mothod**/
	@RequestMapping(value="fetchbodytrackinginfo",method=RequestMethod.GET)
	@ResponseBody
	public MortuaryBodyTrackingDto fetchBodyTrackingInfo(@RequestParam ("mor_id") Integer morId)
	{
		List<MortuaryBodyTrackingDto> list = mortuaryserviceinterface.fetchBodyTrackingInfo(morId);
		
		MortuaryBodyTrackingDto dto = new MortuaryBodyTrackingDto();
								dto.setList(list);
		return dto;
	}
	
	@RequestMapping(value="uploaddeathcertificates",method=RequestMethod.POST)
	@ResponseBody
	public int uploadDeathCertificates(@RequestParam("dcFile") MultipartFile[] uploadfiles,
														   @RequestParam("mortuaryId") Integer morId, 
														   @RequestParam("deceasedName") String deceasedName,
														   @RequestParam("note") String note,
														   HttpServletRequest request) throws IOException
	{
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		List<MortuaryDeathCertificateDto> certiList = new ArrayList<MortuaryDeathCertificateDto>();
		
		 for (MultipartFile file : uploadfiles) {

	            if (file.isEmpty()) {
	                continue; 
	            }
	            
	            java.io.File uploadPath = new java.io.File(FilePath.getMortuaryPath() + deceasedName+"_"+morId);
	            if(!uploadPath.exists())
	            	uploadPath.mkdirs();
	            
	            String fileName = file.getOriginalFilename();
	            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
	            
	            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
	                stream.write(file.getBytes());
	                stream.close();
	                
	              MortuaryDeathCertificateDto dto = new MortuaryDeathCertificateDto();
	              							  dto.setCreatedBy(userId);
	              							  dto.setCertificateName(file.getOriginalFilename());
	              							  dto.setCertificatePath(filepath);
	              							  dto.setCreatedDate(new Date());
	              							  dto.setCertificateNote(note);
	              							  
	              certiList.add(dto);
		 }
		return mortuaryserviceinterface.uploadDeathCertificates(certiList, morId);
	}
	
	@RequestMapping(value="fetchcertificates",method=RequestMethod.GET)
	@ResponseBody
	public MortuaryDeathCertificateDto fetchcertificates(@RequestParam ("mortuaryId") int morId)
	{
		List<MortuaryDeathCertificateDto> dtoList = mortuaryserviceinterface.fetchcertificates(morId);
		MortuaryDeathCertificateDto dto = new MortuaryDeathCertificateDto();
									dto.setCertificateList(dtoList);
		return dto;
	}
	
	@RequestMapping(value="deletecertificates",method=RequestMethod.POST)
	@ResponseBody
	public boolean deleteDeathCertificate(@RequestParam("certiId") Integer certiId)
	{
		return mortuaryserviceinterface.deleteDeathCertificate(certiId);
	}
	
	@RequestMapping(value="/readcertificates",method=RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName, @RequestParam("name") String name,
								   @RequestParam("id") int id, HttpServletResponse response)
	{
		String filePath = FilePath.getMortuaryPath();

		/*if(fileName.endsWith(".txt"))
		{
    		try
    		{
    			 String reportDestination = filePath + java.io.File.separator+ name+"_"+id + java.io.File.separator +fileName;
    			 FileInputStream fis = new FileInputStream(new java.io.File(reportDestination));
    			 org.apache.commons.io.IOUtils.copy(fis, response.getOutputStream());
    		}
    		catch(Exception e)
    		{
    			e.printStackTrace();
    		}
    	}
    	else*/
    	if(fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".gif"))
    	{
    		try
    		{
    			java.io.File f = new java.io.File(filePath + java.io.File.separator+ name+"_"+id + java.io.File.separator +fileName);
    			ImageInputStream iis = ImageIO.createImageInputStream(f);

    			java.util.Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(iis);

    			BufferedImage bi = ImageIO.read(f);
    			java.io.OutputStream out = response.getOutputStream();

    			while (imageReaders.hasNext()) {
    			    ImageReader reader = (ImageReader) imageReaders.next();
    			    ImageIO.write(bi,  reader.getFormatName(), out);
    			}
    			out.close();
    		}
    		catch(Exception e)
    		{
    			e.printStackTrace();
    		}
    	}
    	else if(fileName.endsWith(".pdf")){
    		
    		try
    		{
    			 String reportDestination = filePath + java.io.File.separator+ name+"_"+id + java.io.File.separator +fileName;
    			 FileInputStream fis = new FileInputStream(new java.io.File(reportDestination));
    			 org.apache.commons.io.IOUtils.copy(fis, response.getOutputStream());
    			 response.setContentType("application/pdf");
    			 response.setHeader("Content-Disposition", "attachment; filename=" + reportDestination);
    			 response.flushBuffer();
    		}
    		catch(Exception e)
    		{
    			e.printStackTrace();
    		}
    	}
    	else
    	{
    		try
    		{
    			 String reportDestination = filePath + java.io.File.separator+ name+"_"+id + java.io.File.separator +fileName;
    			 FileInputStream fis = new FileInputStream(new java.io.File(reportDestination));
    			 org.apache.commons.io.IOUtils.copy(fis, response.getOutputStream());
    		}
    		catch(Exception e)
    		{
    			e.printStackTrace();
    		}
    	}
	}
	/**@Code       : fech previous Body Tracking Mothod**/
	@RequestMapping(value="previousbodytracking",method=RequestMethod.POST)
	@ResponseBody public MortuaryBodyTrackingDto previousBodyTracking(@RequestParam ("mortuary") String str,@RequestParam ("morid") Integer morid)
	{
	
		return  mortuaryserviceinterface.previousBodyTracking(str, morid);
		
	}
	/**@Code       : Previous Mortuary body finding Mothod**/
	@RequestMapping(value="prebodyfinding",method=RequestMethod.POST)
	@ResponseBody public MortuaryFindingsDto preBodyFinding(@RequestParam ("morid") Integer morid)
	{
		MortuaryFindingsDto mortuaryfindingsdto=new MortuaryFindingsDto();
		List<MortuaryFindingsDto> list=mortuaryserviceinterface.preBodyFinding(morid);
		mortuaryfindingsdto.setListmortuaryFindings(list);
		return mortuaryfindingsdto;
		
	}
	/**@Code       : Previous Mortuary Images Display Mothod**/
	@RequestMapping(value="preimages",method=RequestMethod.POST)
	@ResponseBody public MortuaryDocUploadDto preImagesDisplay(@RequestParam ("morid") Integer morid)
	{
		MortuaryDocUploadDto mortuarydocuploaddto=new MortuaryDocUploadDto();
		List<MortuaryDocUploadDto> list=mortuaryserviceinterface.preImagesDisplay(morid);
		mortuarydocuploaddto.setLstDocUpload(list);
		return mortuarydocuploaddto;
	
	}
	
	@RequestMapping(value="editbodytrackinginfo",method=RequestMethod.GET)
	@ResponseBody public MortuaryBodyTrackingDto editBodyTrackingInfo(@RequestParam ("bodyTrackingId") int bodyTrackingId)
	{
		return mortuaryserviceinterface.editBodyTrackingInfo(bodyTrackingId);
	}
	//Added by Annapurna
	@RequestMapping(value = "/gettemplatelistbytemplateid", method = RequestMethod.GET)
	public @ResponseBody
	CustomizeTemplate getTemplateListByTemplId(@RequestParam("id") Integer id) {
		// log.info("getTemplateListByTemplateId..");
		CustomizeTemplate obj = new CustomizeTemplate();
		obj = mortuaryserviceinterface.getTemplateListByTemplId(id);
		//  log.debug("getTemplateListByTemplateId....."+obj);
		return obj;
	}



@RequestMapping(value="updatedPmreoprtbyid",method=RequestMethod.POST)
@ResponseBody 
public  MortuaryPmReport updatedPmreoprtbyid (@RequestParam ("morId") Integer morId)
{	
	MortuaryPmReport obj = new MortuaryPmReport();
	obj = mortuaryserviceinterface.updatedPmreoprtbyid(morId);
	  return obj;
}
}

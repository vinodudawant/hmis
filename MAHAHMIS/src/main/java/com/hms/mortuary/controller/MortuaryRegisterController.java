package com.hms.mortuary.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.ArrayList;
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

import com.hms.mortuary.dto.MortuaryDocUploadDto;
import com.hms.mortuary.dto.MortuaryFindingsDto;
import com.hms.mortuary.dto.MortuaryMasterDto;
import com.hms.mortuary.service.MortuaryRegisterservice;
import com.hms.pharmacy.upload.FilePath;


@Controller  
@RequestMapping(value ="/mortuaryReg")
public class MortuaryRegisterController {
	
	/*
	 * @author : Abhishek Kumbhar
	 * @Date   : 27-Sept-19
	 * @Codefor: save Mortuary register Details.
	*/
	@Autowired
	MortuaryRegisterservice register;
	
	
	@RequestMapping(value = "/savemortuaryReg", method=RequestMethod.POST)
	@ResponseBody
	public int saveMortuaryRegisterData(MortuaryMasterDto mortuaryMasterDto ){
		
		int response =register.saveMortuaryRegisterData(mortuaryMasterDto );
		return response;
	}

	
	@RequestMapping(value = "/getInternalPatientData", method=RequestMethod.POST)
	@ResponseBody
	public MortuaryMasterDto getInternalPatientData(@RequestParam("patientid")Integer patientid ){

		MortuaryMasterDto obj=	register.getInternalPatientData(patientid);
		
		return obj;
	}

	
	@RequestMapping(value = "/getAllMortuaryRegisterPatient", method=RequestMethod.GET)
	@ResponseBody
	public MortuaryMasterDto getAllMortuaryRegisterPatient(@RequestParam("callform")String callform){
        
		MortuaryMasterDto morobj = new MortuaryMasterDto();
		List<MortuaryMasterDto> listobj=	register.getAllMortuaryRegisterPatient(callform);
		
		morobj.setMordto(listobj);
		return morobj;
	}                                                               

	
	@RequestMapping(value = "/editmortuarydetails", method=RequestMethod.POST)
	@ResponseBody
	public MortuaryMasterDto editmortuarydetails(@RequestParam("morId")Integer morId){

	
		MortuaryMasterDto obj=	register.editmortuarydetails(morId);
		
		
		return obj;
	} 
	
	
	@RequestMapping(value = "/autosuggesationMortuaryPatient", method=RequestMethod.POST)
	@ResponseBody
	public MortuaryMasterDto autosuggesationMortuaryPatient(@RequestParam("findingName")String findingName, @RequestParam("type") String type){

		MortuaryMasterDto  obj = new MortuaryMasterDto();
		List<MortuaryMasterDto> listobj=	register.autosuggesationMortuaryPatient(findingName,type);
		
		obj.setMordto(listobj);
		return obj;
	} 
	@RequestMapping(value = "/deletemortuarydetails", method=RequestMethod.POST)
	@ResponseBody
	public String deletemortuarydetails(@RequestParam("morId")Integer morId,HttpServletRequest request){

		MortuaryMasterDto mortuary =new MortuaryMasterDto();
		mortuary.setMor_id(morId);
		mortuary.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		mortuary.setDeletedBy(userId);
		boolean response =	register.deletemortuarydetails(mortuary);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	} 
	
	
	@RequestMapping(value = "/getDatewiseData", method=RequestMethod.POST)
	@ResponseBody
	public MortuaryMasterDto getDatewiseData(@RequestParam("from_date")String from_date,@RequestParam("to_date")String to_date, @RequestParam("type") String type){

		MortuaryMasterDto  obj = new MortuaryMasterDto();
		List<MortuaryMasterDto> listobj=	register.getDatewiseData(from_date,to_date,type);
		System.out.println("list:"+listobj);
		obj.setMordto(listobj);
		return obj;
	} 
	
	
	@RequestMapping(value = "/saveFindings", method=RequestMethod.POST)
	@ResponseBody
	public String saveFindings(@RequestParam("listmortuaryFindings") String listmortuaryFindings,@RequestParam("mor_id") int morId,String listfindingsmortuary,  HttpServletRequest request)
	{
		System.err.println("listmortuaryFindings :"+listmortuaryFindings);
		
		int response =register.saveFindings(listmortuaryFindings,morId,request);
		System.out.println("response"+response);
		String msg = "";
		if(response == 1)
			msg = "Records Saved Sucessfully";
	    
		return msg;
	}
	
	@RequestMapping(value = "/fetchfindings", method=RequestMethod.POST)
	@ResponseBody
	public MortuaryFindingsDto fetchfindings(@RequestParam("mortuaryId")int mortuaryId){

	
		List<MortuaryFindingsDto> listfindings = new ArrayList<MortuaryFindingsDto>();
		listfindings = register.fetchfindings(mortuaryId);
		MortuaryFindingsDto obj = new MortuaryFindingsDto();
		obj.setListmortuaryFindings(listfindings);

		return obj;
	}
	
	@RequestMapping(value = "/UploadMortuaryimages", method=RequestMethod.POST)
	@ResponseBody
	public int UploadMortuaryimages(@RequestParam("file") MultipartFile[] uploadfiles,
			   @RequestParam("mortuaryId") Integer morId, 
			   @RequestParam("deceasedName") String deceasedName,
			   @RequestParam("note") String note,
			   HttpServletRequest request) throws IOException
{
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		List<MortuaryDocUploadDto> docList = new ArrayList<MortuaryDocUploadDto>();
		
		for (MultipartFile file : uploadfiles) {

            if (file.isEmpty()) {
                continue; 
            }
            
            java.io.File uploadPath = new java.io.File(FilePath.getMortuaryImagesPath() + deceasedName+"_"+morId);
            if(!uploadPath.exists())
            	uploadPath.mkdirs();
            
            String fileName = file.getOriginalFilename();
            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
            
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
                stream.write(file.getBytes());
                stream.close();
                
                MortuaryDocUploadDto dto = new MortuaryDocUploadDto();
              							  dto.setCreatedBy(userId);
              							  dto.setImageName(file.getOriginalFilename());
              							  dto.setImagePath(filepath);
              							  dto.setCreatedDateTime(new java.util.Date());
              							  dto.setNote(note);
              							  dto.setMorId(morId);
              							  
              	docList.add(dto);
	 }
		return register.UploadMortuaryimages(docList, morId);
	}
	
	@RequestMapping(value = "/fetchDoc", method=RequestMethod.POST)
	@ResponseBody
	public MortuaryDocUploadDto fetchDoc(@RequestParam("mortuaryId") int mortuaryId){
		MortuaryDocUploadDto obj=new MortuaryDocUploadDto();
          List<MortuaryDocUploadDto> tlist=new ArrayList<MortuaryDocUploadDto>();
          tlist=register.fetchDoc(mortuaryId);
          obj.setLstDocUpload(tlist);
		return obj;
	}
	
	
	
	@RequestMapping(value = "/deletedocmortuary", method=RequestMethod.POST)
	@ResponseBody
	public String deletedocmortuary(@RequestParam("imgid") int imgid, HttpServletRequest request){
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return register.deletedocmortuary(imgid, userId);
	}
	
	
	@RequestMapping(value = "/deleteFindings", method=RequestMethod.POST)
	@ResponseBody
	public String deleteFindings(@RequestParam("findingsId")String findingsId,HttpServletRequest request){

		boolean response =	register.deleteFindings(findingsId,request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	} 
	
	@RequestMapping(value="/readmortuaryimage",method=RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName, @RequestParam("name") String name,
								   @RequestParam("id") int id, HttpServletResponse response)
	{
		String filePath = FilePath.getMortuaryImagesPath();

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
}

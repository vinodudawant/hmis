package com.hms.inventory.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseQuotationDocUploadDto;
import com.hms.inventory.dto.PurchaseQuotationMasterDto;
import com.hms.inventory.dto.PurchaseQuotationTermAndConditionDto;
import com.hms.inventory.service.PurchaseQutationMasterService;
import com.hms.pharmacy.upload.FilePath;
//import com.hms.ehat.dto.PurchaseQuotationTermAndConditionDto;

@Controller
@RequestMapping(value = "/purchasequotation")
public class PurchaseQuotationController {
	
	static Logger log=Logger.getLogger(PurchaseQuotationController.class.getName());
	@Autowired
	private PurchaseQutationMasterService purchaseservice;
	@Autowired
	private PurchaseQuotationDocUploadDto purchaseQuotationDocUploadDto;
	@RequestMapping(value = "/savePurchaseQuotationMaster", method = RequestMethod.POST)
	@ResponseBody
	public int[] savePurchaseQuotationMaster(	PurchaseQuotationMasterDto purchaseObj,@RequestParam("itemInfoDtoDetails") String itemInfoDtoDetails,
			@RequestParam("purchasequotationContactInfoDtoDetails") String purchasequotationContactInfoDtoDetails,
			@RequestParam("purchaeQuotationAddressInfoDtoDetails") String purchaeQuotationAddressInfoDtoDetails,
			@RequestParam("purchaeQuotationTermAndConditionInfoDtoDetails") String purchaeQuotationTermAndConditionInfoDtoDetails,
			
			HttpServletRequest request,@RequestParam("partyMasterId") Integer partyMasterId){
		log.info("savePurchaseQuotationMaster..");
		int reponse[] = purchaseservice.savePurchaseQuotationMaster(purchaseObj, 
				itemInfoDtoDetails, purchasequotationContactInfoDtoDetails, 
				purchaeQuotationAddressInfoDtoDetails,purchaeQuotationTermAndConditionInfoDtoDetails,request,partyMasterId);
      log.debug("reponse savePurchaseQuotationMaster....."+reponse);
		
		return reponse;
	}
	
	@RequestMapping(value = "/getAllPurchaseQuotationMaster", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseQuotationMasterDto getAllPurchaseQuotationMaster(HttpServletRequest request,@RequestParam("unitId") Integer unitId,@RequestParam("call") String call) {
		List<PurchaseQuotationMasterDto> lstpurchasequotation = new ArrayList<PurchaseQuotationMasterDto>();
		log.info("getAllPurchaseQuotationMaster.....");
		lstpurchasequotation =purchaseservice.getAllPurchaseQuotationMaster(request,unitId,call) ;
		
		log.debug("reponse  getAllPurchaseQuotationMaster....."+lstpurchasequotation);		
		PurchaseQuotationMasterDto pobj = new PurchaseQuotationMasterDto();
		pobj.setLstpurchasequotationmasterDto(lstpurchasequotation);
		return pobj;
	}
	@RequestMapping(value = "/editPurchaseQuotationMaster", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseQuotationMasterDto editPurchaseQuotationMaster(@RequestParam("pQId") Integer pQId,@RequestParam("unitId") Integer unitId) {
		PurchaseQuotationMasterDto pobj = new PurchaseQuotationMasterDto();
		log.info("editPurchaseQuotationMaster.....");
		pobj = purchaseservice.editPurchaseQuotationMaster(pQId);
		log.debug("reponse editPurchaseQuotationMaster....."+pobj);

		return pobj;
	}
	
	@RequestMapping(value = "/updatePuContactQuotationMaster", method = RequestMethod.POST)
	@ResponseBody
	public int updatePuContactQuotationMaster(PartyMasterContactInfoDto cobj,HttpServletRequest request){
			
		log.info("updatePuContactQuotationMaster.....");
		int reponse = purchaseservice.updatePuContactQuotationMaster(cobj, request);
		log.debug("reponse updatePuContactQuotationMaster....."+reponse);
		
		return reponse;
	}
	
	@RequestMapping(value = "/getAllPQuationContactInfo", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterContactInfoDto getAllPQuationContactInfo(HttpServletRequest request,@RequestParam("unitId") Integer unitId,@RequestParam("purchaseQtMasterId") Integer purchaseQtMasterId) {
		List<PartyMasterContactInfoDto> lstpurchaseContactInfoDto = new ArrayList<PartyMasterContactInfoDto>();
		log.info("getAllPQuationContactInfo.....");
		lstpurchaseContactInfoDto =purchaseservice.getAllPQuationContactInfo(request, unitId,purchaseQtMasterId) ;
		log.debug("reponse  getAllPQuationContactInfo....."+lstpurchaseContactInfoDto);
		PartyMasterContactInfoDto pobj = new PartyMasterContactInfoDto();
		pobj.setPartyMasterContactInfoDto(lstpurchaseContactInfoDto);
		return pobj;
	}
	
	@RequestMapping(value = "/updatePurchaseAddressInfo", method = RequestMethod.POST)
	@ResponseBody
	public int updatePurchaseAddressInfo(PartyMasterAddressInfoDto aobj,HttpServletRequest request){
		log.info("updatePurchaseAddressInfo.....");
		int reponse = purchaseservice.updatePurchaseAddressInfo(aobj, request); 
		log.debug("reponse  updatePurchaseAddressInfo....."+reponse);

		return reponse;
	}
	
	@RequestMapping(value = "/getAllPQuationAddressInfo", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterAddressInfoDto getAllPQuationAddressInfo(HttpServletRequest request,@RequestParam("unitId") Integer unitId,@RequestParam("purchaseQtMasterId") Integer purchaseQtMasterId) {
		List<PartyMasterAddressInfoDto> lstpurcaseAddressInfoDto = new ArrayList<PartyMasterAddressInfoDto>();
		log.info("getAllPQuationAddressInfo.....");
		lstpurcaseAddressInfoDto =purchaseservice.getAllPQuationAddressInfo(request, unitId, purchaseQtMasterId);
		log.debug("reponse.  getAllPQuationAddressInfo...."+lstpurcaseAddressInfoDto);

		PartyMasterAddressInfoDto pobj = new PartyMasterAddressInfoDto();
		pobj.setPartyMasterAddressInfoDto(lstpurcaseAddressInfoDto);
		return pobj;
	}
	
	@RequestMapping(value = "/updatePurchaseTermInfo", method = RequestMethod.POST)
	@ResponseBody
	public int updatePurchaseTermInfo(PurchaseQuotationTermAndConditionDto tobj,HttpServletRequest request){
		log.info("updatePurchaseTermInfo.....");
		int reponse = purchaseservice.updatePurchaseTermInfo(tobj, request);
		log.debug("reponse  updatePurchaseTermInfo....."+reponse);

		return reponse;
	}
	@RequestMapping(value = "/getAllPQuationTermAndConditionInfo", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseQuotationTermAndConditionDto getAllPQuationTermAndConditionInfo(HttpServletRequest request,@RequestParam("unitId") Integer unitId,@RequestParam("purchaseQtMasterId") Integer purchaseQtMasterId) {
		List<PurchaseQuotationTermAndConditionDto> lstpurcaseTermConditionInfoDto = new ArrayList<PurchaseQuotationTermAndConditionDto>();
		log.info("updatePurchaseTermInfo.....");
		lstpurcaseTermConditionInfoDto =purchaseservice.getAllPQuationTermAndConditionInfo(request, unitId, purchaseQtMasterId);
		log.debug("reponse getAllPQuationTermAndConditionInfo....."+lstpurcaseTermConditionInfoDto);

		PurchaseQuotationTermAndConditionDto pobj = new PurchaseQuotationTermAndConditionDto();
		pobj.setLstpurcaseTermConditionInfoDto(lstpurcaseTermConditionInfoDto);
		return pobj;
	}
	
	@RequestMapping(value = "/deletePurchaseQuotationSlaveInfo", method = RequestMethod.POST)
	@ResponseBody
	public String deletePurchaseQuotationSlaveInfo(	@RequestParam("id") Integer purchaseSlaveId,@RequestParam("pQId")Integer pQId,@RequestParam("callFrom")String callFrom,HttpServletRequest request) {
		log.info("deletePurchaseQuotationSlaveInfo.....");
		boolean status = purchaseservice.deletePurchaseQuotationSlaveInfo(purchaseSlaveId, pQId, callFrom, request);
		log.debug("reponse  deletePurchaseQuotationSlaveInfo....."+status);

		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}

	@RequestMapping(value = "/deletePurchaseQuotationMaster", method = RequestMethod.POST)
	@ResponseBody
	public String deletePurchaseQuotationMaster(	@RequestParam("pQId") Integer pQId,HttpServletRequest request) {
		log.info("deletePurchaseQuotationMaster.....");
		boolean status = purchaseservice.deletePurchaseQuotationMaster(pQId, request);
		log.debug("reponse deletePurchaseQuotationMaster....."+status);

		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}
	
	@RequestMapping(value = "/inventoryPartyMasterAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public PartyMasterDto inventoryPartyMasterAutoSuggestion(@RequestParam("partyName") String partyName) {
		List<PartyMasterDto> lstparty = new ArrayList<PartyMasterDto>();
		log.info("inventoryPartyMasterAutoSuggestion.....");
		lstparty =purchaseservice.inventoryPartyMasterAutoSuggestion(partyName) ;
		log.debug("reponse  inventoryPartyMasterAutoSuggestion....."+lstparty);

		PartyMasterDto pobj = new PartyMasterDto();
		pobj.setPartyMasterDto(lstparty);
		return pobj;
	}
	
	@RequestMapping(value = "/getQuatationMaster", method = RequestMethod.POST)
	@ResponseBody
	public PurchaseQuotationMasterDto getQuatationMaster(@RequestParam("vendorName") String vendorName,@RequestParam("call") String call) {
		List<PurchaseQuotationMasterDto> lstpurchaseobj = new ArrayList<PurchaseQuotationMasterDto>();
		log.info("getQuatationMaster.....");
		lstpurchaseobj =purchaseservice.getQuatationMaster(vendorName,call) ;
		log.debug("reponse  getQuatationMaster....."+lstpurchaseobj);

		PurchaseQuotationMasterDto pobj = new PurchaseQuotationMasterDto();
		pobj.setLstpurchasequotationmasterDto(lstpurchaseobj);
		return pobj;
	}
	@RequestMapping(value = "/getPurchaseQuotationMasterDetailsById", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseQuotationMasterDto getPurchaseQuotationMasterDetailsById(@RequestParam("pQId") Integer pQId,@RequestParam("unitId") Integer unitId,@RequestParam("call") String call) {
		PurchaseQuotationMasterDto pobj = new PurchaseQuotationMasterDto();
		log.info("getPurchaseQuotationMasterDetailsById.....");
		pobj = purchaseservice.getPurchaseQuotationMasterDetailsById(pQId, unitId,call);
		log.debug("reponse  getPurchaseQuotationMasterDetailsById....."+pobj);

		return pobj;
	}
	
	
	@RequestMapping(value = "/deletePurchaseQuotationItemInfoSlave", method = RequestMethod.POST)
	@ResponseBody
	public String deletePurchaseQuotationItemInfoSlave(	@RequestParam("itemId") String itemId,HttpServletRequest request) {
		log.info("deletePurchaseQuotationItemInfoSlave.....");
		boolean status = purchaseservice.deletePurchaseQuotationItemInfoSlave(itemId, request);
		log.debug("deletePurchaseQuotationItemInfoSlave reponse....."+status);

		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}
	
	@RequestMapping(value = "/uploadPurchaseQuotationDocument", method = RequestMethod.POST)
	public @ResponseBody String uploadPurchaseQuotationDocument(@RequestParam("documentUpload") String document,
			@RequestParam("uploadPqDocs") MultipartFile[] uploadPqDocs,
			@RequestParam("pqMasterId") Integer pqMasterId,
			HttpServletRequest request) throws IOException {
		for (MultipartFile file : uploadPqDocs) {
            if (file.isEmpty()) { continue; }
            java.io.File uploadPath = new java.io.File(FilePath.getPqFilesPath() + pqMasterId);
            if(!uploadPath.exists())
            	uploadPath.mkdirs();
            String fileName = file.getOriginalFilename();
            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
                stream.write(file.getBytes());
                stream.close();
	 }
		
	int response = purchaseservice.uploadPurchaseQuotationDocument(document, request);
	log.debug("reponse uploadPurchaseQuotationDocument....."+response);
	String msg="";
	return msg = (response==1) ? "1" : (response==2) ? "2" : "0";
	}
	
	@RequestMapping(value = "/getUploadedDocuments", method = RequestMethod.POST)
	@ResponseBody
	public PurchaseQuotationDocUploadDto getUploadedDocuments(@RequestParam("pqMasterId") Integer pqMasterId,HttpServletRequest request) {
		purchaseQuotationDocUploadDto = purchaseservice.getUploadedDocuments(pqMasterId,request);
		log.debug("reponse getUploadedDocuments....."+purchaseQuotationDocUploadDto);
		return purchaseQuotationDocUploadDto;	
	}
	
	@RequestMapping(value="/readDocuments",method=RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName, @RequestParam("pqMasterId") Integer pqMasterId, HttpServletResponse response)
	{
		String filePath = FilePath.getPqFilesPath();
		try {

			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".gif")) {
					java.io.File file = new java.io.File(filePath+ java.io.File.separator + pqMasterId +  java.io.File.separator + fileName);
					ImageInputStream inputStream = ImageIO.createImageInputStream(file);
					java.util.Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(inputStream);
					BufferedImage bufferedImage = ImageIO.read(file);
					java.io.OutputStream out = response.getOutputStream();
					while (imageReaders.hasNext()) {
						ImageReader reader = (ImageReader) imageReaders.next();
						ImageIO.write(bufferedImage, reader.getFormatName(),out);
					}
					out.close();
			} else if (fileName.endsWith(".pdf")) {
					String reportDestination = filePath+ java.io.File.separator + pqMasterId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(
							new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,
							response.getOutputStream());
					response.setContentType("application/pdf");
					response.setHeader("Content-Disposition",
							"attachment; filename=" + reportDestination);
					response.flushBuffer();
					log.debug("reponse readCertificate....."+reportDestination);
				
			} else {
				
					String reportDestination = filePath+ java.io.File.separator + pqMasterId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,response.getOutputStream());
					log.debug("reponse readCertificate....."+reportDestination);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	/**
	 * @since 10-01-2021
	 * @author Vishnu Thorat
	 * @comment this method is created for to check user name and password
	 * @param userName
	 * @param userPassword
	 * @return
	 */
	@RequestMapping(value = "/checkUserNameandPassword")
	@ResponseBody
	public PurchaseQuotationMasterDto checkUserNameandPassword(@RequestParam("userName") String userName,
			@RequestParam("userPassword") String userPassword,HttpServletRequest request) {
		List<PurchaseQuotationMasterDto> list=new ArrayList<PurchaseQuotationMasterDto>();
		PurchaseQuotationMasterDto obj=new PurchaseQuotationMasterDto();
		list = purchaseservice.checkUserNameandPassword(userName, userPassword,request);
		log.debug("inside checkUserNameandPassword :"+list);
		obj.setLstpurchasequotationmasterDto(list);
		return obj;
	}
	
	
	/**
	 * @since 10-01-2021
	 * @author Vishnu Thorat
	 * @comment this method is created for to check user name and password
	 * @param userName
	 * @param userPassword
	 * @return
	 */
	@RequestMapping(value = "/approvePurchaseQuotation")
	@ResponseBody
	public int approvePurchaseQuotation(@RequestParam("approvedByName") String userName,
			@RequestParam("approvedById") Integer approvedById,@RequestParam("isApproved") String isApproved,@RequestParam("purchaseQutationId") Integer purchaseQutationId,HttpServletRequest request) {
		int status = purchaseservice.approvePurchaseQuotation(userName, approvedById,isApproved,purchaseQutationId,request);
		log.debug("inside approvePurchaseQuotation :"+status);
		return status;
	}
	
}

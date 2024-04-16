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

import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseOrderDocUploadDto;
import com.hms.inventory.dto.PurchaseOrderDto;
import com.hms.inventory.dto.PurchaseOrderItemSlaveDto;
import com.hms.inventory.service.ItemMasterService;
import com.hms.inventory.service.PurchaseOrderServiceM;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value="/inventoryPurchaseOrder")
public class PurchaseOrderContollerM {

	static Logger log=Logger.getLogger(PurchaseOrderContollerM.class.getName());
	
	@Autowired
	private ItemMasterService itemMasterService;
	@Autowired
	private PartyMasterDto partyMasterDto;
	@Autowired
	private ItemMasterDto itemMasterDto;
	@Autowired
	private PurchaseOrderServiceM purchaseOrderServiceM;
	@Autowired
	private PurchaseOrderDto purchaseOrderDto;
	@Autowired
	private PartyMasterContactInfoDto partyMasterContactInfoDto;
	@Autowired
	private PartyMasterAddressInfoDto partyMasterAddressInfoDto;
	@Autowired
	private PurchaseOrderItemSlaveDto purchaseOrderItemSlaveDto;
	@Autowired
	private PurchaseOrderDocUploadDto purchaseOrderDocUploadDto;
	
	
	/**
	 * 
	 * @param supplierName
	 * @return
	 */
	@RequestMapping(value = "/autoFillSearchOnPartyMaster", method = RequestMethod.POST)
	 @ResponseBody
	public PartyMasterDto autoFillSearchOnPartyMaster(@RequestParam("supplierName") String supplierName,HttpServletRequest request) {
		log.info("inside autoFillSearchOnPartyMaster method");
		partyMasterDto = itemMasterService.autoFillSearchOnPartyMaster(supplierName,request);
		log.debug("inside autoFillSearchOnPartyMaster partyMasterDto::"+partyMasterDto);
		return partyMasterDto;
	}
	
	
	@RequestMapping(value="/searchByPartyMasterId",method = RequestMethod.POST)
	@ResponseBody
	public PartyMasterDto getSubInventoryDetails(@RequestParam("id") Integer id,HttpServletRequest request){
		partyMasterDto = itemMasterService.searchByPartyMasterId(id, request);
		return partyMasterDto;
	}
	
	@RequestMapping(value="/getItemMasterSlaveDetails",method = RequestMethod.POST)
	@ResponseBody
	public ItemMasterDto getItemMasterSlaveDetails(@RequestParam("id") Integer id,HttpServletRequest request){
		itemMasterDto = purchaseOrderServiceM.searchByItemMasterId(id, request);
		ItemMaintenanceSlaveDto obj = new ItemMaintenanceSlaveDto();
		obj = purchaseOrderServiceM.getMaintenanceDetailsByItemMasterId(id, request);
		itemMasterDto.setItemMaintenanceSlaveDto(obj);
		return itemMasterDto;
	}
	
	@RequestMapping(value="/savePurchaseOrderModule")
	@ResponseBody	
	public int[]  savePurchaseOrder(@RequestParam("purchaseOrderItemSlaveDetails") String purchaseOrderItemSlaveDetails,
								  @RequestParam("purchaseOrderPartyContactDetails") String purchaseOrderPartyContactDetails,
								  @RequestParam("purchaseOrderPartyAddressDetails") String purchaseOrderPartyAddressDetails,
								  @RequestParam("partyMasterTermsAndConditionInfoDtoDetails") String partyMasterTermsAndConditionInfoDtoDetails, @RequestParam("partyMasterId") Integer partyMasterId,
							   PurchaseOrderDto purchaseOrderDto,HttpServletRequest request){
		System.out.println("inside savePurchaseOrderModule::");
	    int response[]= purchaseOrderServiceM.savePurchaseOrder(purchaseOrderDto,purchaseOrderItemSlaveDetails,
	    		purchaseOrderPartyContactDetails,partyMasterId,purchaseOrderPartyAddressDetails,partyMasterTermsAndConditionInfoDtoDetails,request);
		return response;
   }
	
	/**
	 * @since 25-11-2019
	 * @comment This method is created for to edit the party contact slave w.r.t id and on purchase order 
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editPartyContactPOSlave", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterContactInfoDto editPartyContactPOSlave(@RequestParam("id") Integer id) {
		partyMasterContactInfoDto = purchaseOrderServiceM.editPartyContactPOSlave(id);
		return partyMasterContactInfoDto;	
	}
	
	/**
	 * @since 25-11-2019
	 * @comment This method is created for to edit the party address slave w.r.t id and on purchase order 
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editPartyAddressPOSlave", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterAddressInfoDto editPartyAddressPOSlave(@RequestParam("id") Integer id) {
		partyMasterAddressInfoDto = purchaseOrderServiceM.editPartyAddressPOSlave(id);
		return partyMasterAddressInfoDto;	
	}
	
	/**
	 * @since 26-11-2019
	 * @comment This method is created for to update party contact slave on PO 
	 * @author Rohit Sandbhor
	 * @param partyMasterContactInfoDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/updatePartyContactPODetails",method = RequestMethod.POST)
	@ResponseBody
	public int updatePartyContactPODetails(PartyMasterContactInfoDto partyMasterContactInfoDto,HttpServletRequest request)
	{
		int response = purchaseOrderServiceM.updatePartyContactPODetails(partyMasterContactInfoDto, request);
		return response;
	}
	
	/**
	 * @since 26-11-2019
	 * @comment This method is created for to update party address slave on PO 
	 * @author Rohit Sandbhor
	 * @param partyMasterAddressInfoDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/updatePartyAddressPODetails",method = RequestMethod.POST)
	@ResponseBody
	public int updatePartyAddressPODetails(PartyMasterAddressInfoDto partyMasterAddressInfoDto,HttpServletRequest request)
	{
		int response = purchaseOrderServiceM.updatePartyAddressPODetails(partyMasterAddressInfoDto, request);
		return response;
	}
	/**
	 * @author Rohit Sandbhor
	 * @since 26-11-2019
	 * @comment This method is created to get all purchase order records
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllPurchaseOrderRecordsDetails", method = RequestMethod.GET)
	public @ResponseBody
	PurchaseOrderDto getAllPurchaseOrderRecordsDetails(HttpServletRequest request) {
		List<PurchaseOrderDto> purchaseOrderDtos = new ArrayList<PurchaseOrderDto>();
		purchaseOrderDtos = purchaseOrderServiceM.getAllPurchaseOrderRecords(request);
		purchaseOrderDto.setPurchaseOrderDtos(purchaseOrderDtos);
		return purchaseOrderDto;
	}
	/**
	 * @since 26-11-2019
	 * @comment This method is created for to edit purchase order details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editPurchaseOrder", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseOrderDto editPurchaseOrder(@RequestParam("id") Integer id) {
		purchaseOrderDto = purchaseOrderServiceM.editPurchaseOrder(id);
		return purchaseOrderDto;	
	}
	
	
	/**
	 * @author Rohit Sandbhor
	 * @since 02-12-2019
	 * @comment This method is created for to get auto suggestion on purchase order by using supplier or party name
	 * @param supplierName
	 * @return
	 */
	@RequestMapping(value = "/autoFillSearchPurchaseOrder", method = RequestMethod.POST)
	 @ResponseBody
	public PurchaseOrderDto autoFillSearchPurchaseOrder(@RequestParam("supplierName") String supplierName) {
		purchaseOrderDto = purchaseOrderServiceM.autoFillSearchPurchaseOrder(supplierName);	
		return purchaseOrderDto;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment created this function to delete purchase order and his all related slaves
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deletePurchaseOrder", method = RequestMethod.POST)
	public @ResponseBody
	String deletePurchaseOrder(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = purchaseOrderServiceM.deletePurchaseOrder(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		return msg;
	}
	
	/**
	 * 
	 * @param itemId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deletePurchaseOrderItemInfoSlave", method = RequestMethod.POST)
	@ResponseBody
	public String deletePurchaseOrderItemInfoSlave(@RequestParam("itemSlaveId") String itemSlaveId,HttpServletRequest request) {
		log.info("deletePurchaseOrderItemInfoSlave.....");
		boolean status = purchaseOrderServiceM.deletePurchaseOrderItemInfoSlave(itemSlaveId, request);
		log.debug("deletePurchaseOrderItemInfoSlave reponse....."+status);

		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}
	
	
	@RequestMapping(value = "/uploadPurchaseOrderDocument", method = RequestMethod.POST)
	public @ResponseBody String uploadGoodReceiptNoteDocument(@RequestParam("documentUpload") String document,
			@RequestParam("uploadPoDocs") MultipartFile[] uploadPoDocs,
			@RequestParam("poMasterId") Integer poMasterId,
			HttpServletRequest request) throws IOException {
		for (MultipartFile file : uploadPoDocs) {
            if (file.isEmpty()) { continue; }
            java.io.File uploadPath = new java.io.File(FilePath.getPoFilesPath() + poMasterId);
            if(!uploadPath.exists())
            	uploadPath.mkdirs();
            String fileName = file.getOriginalFilename();
            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
                stream.write(file.getBytes());
                stream.close();
	 }
		
	int response = purchaseOrderServiceM.uploadPurchaseOrderDocument(document, request);
	log.debug("reponse uploadPurchaseOrderDocument....."+response);
	String msg="";
	return msg = (response==1) ? "1" : (response==2) ? "2" : "0";
	}
	
	@RequestMapping(value = "/getUploadedDocuments", method = RequestMethod.POST)
	@ResponseBody
	public PurchaseOrderDocUploadDto getUploadedDocuments(@RequestParam("poMasterId") Integer poMasterId,HttpServletRequest request) {
		purchaseOrderDocUploadDto = purchaseOrderServiceM.getUploadedDocuments(poMasterId,request);
		log.debug("reponse getUploadedDocuments....."+purchaseOrderDocUploadDto);
		return purchaseOrderDocUploadDto;	
	}
	
	@RequestMapping(value="/readDocuments",method=RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName, @RequestParam("poMasterId") Integer poMasterId, HttpServletResponse response)
	{
		String filePath = FilePath.getPoFilesPath();
		try {

			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".gif")) {
					java.io.File file = new java.io.File(filePath+ java.io.File.separator + poMasterId +  java.io.File.separator + fileName);
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
					String reportDestination = filePath+ java.io.File.separator + poMasterId +  java.io.File.separator + fileName;
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
				
					String reportDestination = filePath+ java.io.File.separator + poMasterId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,response.getOutputStream());
					log.debug("reponse readCertificate....."+reportDestination);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
}

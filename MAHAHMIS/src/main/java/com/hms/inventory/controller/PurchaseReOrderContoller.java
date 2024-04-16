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
import com.hms.inventory.dto.PurchaseReOrderDocUploadDto;
import com.hms.inventory.dto.PurchaseReOrderDto;
import com.hms.inventory.dto.PurchaseReOrderItemSlaveDto;
import com.hms.inventory.service.ItemMasterService;
import com.hms.inventory.service.PurchaseReOrderService;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value="/inventoryPurchaseReOrder")
public class PurchaseReOrderContoller {

	static Logger log=Logger.getLogger(PurchaseReOrderContoller.class.getName());
	
	@Autowired
	private ItemMasterService itemMasterService;
	@Autowired
	private PartyMasterDto partyMasterDto;
	@Autowired
	private ItemMasterDto itemMasterDto;
	@Autowired
	private PurchaseReOrderService purchaseReOrderService;
	@Autowired
	private PurchaseReOrderDto purchaseReOrderDto;
	@Autowired
	private PartyMasterContactInfoDto partyMasterContactInfoDto;
	@Autowired
	private PartyMasterAddressInfoDto partyMasterAddressInfoDto;
	@Autowired
	private PurchaseReOrderItemSlaveDto purchaseReOrderItemSlaveDto;
	@Autowired
	private PurchaseReOrderDocUploadDto purchaseReOrderDocUploadDto;
	
	
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
		itemMasterDto = purchaseReOrderService.searchByItemMasterId(id, request);
		ItemMaintenanceSlaveDto obj = new ItemMaintenanceSlaveDto();
		obj = purchaseReOrderService.getMaintenanceDetailsByItemMasterId(id, request);
		itemMasterDto.setItemMaintenanceSlaveDto(obj);
		return itemMasterDto;
	}
	
	@RequestMapping(value="/savePurchaseReOrderModule",method = RequestMethod.POST)
	@ResponseBody	
	public int[]  savePurchaseOrder(@RequestParam("purchaseReOrderItemSlaveDetails") String purchaseReOrderItemSlaveDetails,
								  @RequestParam("purchaseReOrderPartyContactDetails") String purchaseReOrderPartyContactDetails,
								  @RequestParam("purchaseReOrderPartyAddressDetails") String purchaseReOrderPartyAddressDetails,
								  @RequestParam("partyMasterTermsAndConditionInfoDtoDetails") String partyMasterTermsAndConditionInfoDtoDetails, @RequestParam("partyMasterId") Integer partyMasterId,
							   PurchaseReOrderDto purchaseReOrderDto,HttpServletRequest request){
	    int response[]= purchaseReOrderService.savePurchaseReOrder(purchaseReOrderDto,purchaseReOrderItemSlaveDetails,
	    		purchaseReOrderPartyContactDetails,partyMasterId,purchaseReOrderPartyAddressDetails,partyMasterTermsAndConditionInfoDtoDetails,request);
		return response;
   }
	
	/**
	 * @since 25-11-2019
	 * @comment This method is created for to edit the party contact slave w.r.t id and on purchase order 
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editPartyContactPROSlave", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterContactInfoDto editPartyContactPROSlave(@RequestParam("id") Integer id) {
		partyMasterContactInfoDto = purchaseReOrderService.editPartyContactPROSlave(id);
		return partyMasterContactInfoDto;	
	}
	
	/**
	 * @since 25-11-2019
	 * @comment This method is created for to edit the party address slave w.r.t id and on purchase order 
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editPartyAddressPROSlave", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterAddressInfoDto editPartyAddressPROSlave(@RequestParam("id") Integer id) {
		partyMasterAddressInfoDto = purchaseReOrderService.editPartyAddressPROSlave(id);
		return partyMasterAddressInfoDto;	
	}
	
	/**
	 * @since 26-11-2019
	 * @comment This method is created for to update party contact slave on PO 
	 * @author Vishnu Thorat
	 * @param partyMasterContactInfoDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/updatePartyContactPORDetails",method = RequestMethod.POST)
	@ResponseBody
	public int updatePartyContactPRODetails(PartyMasterContactInfoDto partyMasterContactInfoDto,HttpServletRequest request)
	{
		int response = purchaseReOrderService.updatePartyContactPRODetails(partyMasterContactInfoDto, request);
		return response;
	}
	
	/**
	 * @since 26-11-2019
	 * @comment This method is created for to update party address slave on PO 
	 * @author Vishnu Thorat
	 * @param partyMasterAddressInfoDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/updatePartyAddressPRODetails",method = RequestMethod.POST)
	@ResponseBody
	public int updatePartyAddressPRODetails(PartyMasterAddressInfoDto partyMasterAddressInfoDto,HttpServletRequest request)
	{
		int response = purchaseReOrderService.updatePartyAddressPRODetails(partyMasterAddressInfoDto, request);
		return response;
	}
	/**
	 * @author Vishnu Thorat
	 * @since 26-11-2019
	 * @comment This method is created to get all purchase order records
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllPurchaseReOrderRecordsDetails", method = RequestMethod.GET)
	public @ResponseBody
	PurchaseReOrderDto getAllPurchaseReOrderRecordsDetails(HttpServletRequest request) {
		List<PurchaseReOrderDto> purchaseReOrderDtos = new ArrayList<PurchaseReOrderDto>();
		purchaseReOrderDtos = purchaseReOrderService.getAllPurchaseReOrderRecords(request);
		purchaseReOrderDto.setPurchaseReOrderDtos(purchaseReOrderDtos);
		return purchaseReOrderDto;
	}
	/**
	 * @since 26-11-2019
	 * @comment This method is created for to edit purchase order details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editPurchaseReOrder", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseReOrderDto editPurchaseReOrder(@RequestParam("id") Integer id) {
		purchaseReOrderDto = purchaseReOrderService.editPurchaseReOrder(id);
		return purchaseReOrderDto;	
	}
	
	
	/**
	 * @author Vishnu Thorat
	 * @since 02-12-2019
	 * @comment This method is created for to get auto suggestion on purchase order by using supplier or party name
	 * @param supplierName
	 * @return
	 */
	@RequestMapping(value = "/autoFillSearchPurchaseReOrder", method = RequestMethod.POST)
	 @ResponseBody
	public PurchaseReOrderDto autoFillSearchPurchaseReOrder(@RequestParam("supplierName") String supplierName) {
		purchaseReOrderDto = purchaseReOrderService.autoFillSearchPurchaseReOrder(supplierName);	
		return purchaseReOrderDto;
	}
	
	/**
	 * @author Vishnu Thorat
	 * @since 13112019
	 * @comment created this function to delete purchase order and his all related slaves
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deletePurchaseReOrder", method = RequestMethod.POST)
	public @ResponseBody
	String deletePurchaseReOrder(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = purchaseReOrderService.deletePurchaseReOrder(id, request);
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
	@RequestMapping(value = "/deletePurchaseReOrderItemInfoSlave", method = RequestMethod.POST)
	@ResponseBody
	public String deletePurchaseReOrderItemInfoSlave(@RequestParam("itemSlaveId") Integer itemSlaveId,HttpServletRequest request) {
		log.info("deletePurchaseReOrderItemInfoSlave.....");
		boolean status = purchaseReOrderService.deletePurchaseReOrderItemInfoSlave(itemSlaveId, request);
		log.debug("deletePurchaseReOrderItemInfoSlave reponse....."+status);

		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}
	
	
	@RequestMapping(value = "/uploadPurchaseReOrderDocument", method = RequestMethod.POST)
	public @ResponseBody String uploadPurchaseReOrderDocument(@RequestParam("documentUpload") String document,
			@RequestParam("uploadPoDocs") MultipartFile[] uploadPoDocs,
			@RequestParam("proMasterId") Integer proMasterId,
			HttpServletRequest request) throws IOException {
		for (MultipartFile file : uploadPoDocs) {
            if (file.isEmpty()) { continue; }
            java.io.File uploadPath = new java.io.File(FilePath.getPROFilesPath() + proMasterId);
            if(!uploadPath.exists())
            	uploadPath.mkdirs();
            String fileName = file.getOriginalFilename();
            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
                stream.write(file.getBytes());
                stream.close();
	 }
		
	int response = purchaseReOrderService.uploadPurchaseReOrderDocument(document, request);
	log.debug("reponse uploadPurchaseOrderDocument....."+response);
	String msg="";
	return msg = (response==1) ? "1" : (response==2) ? "2" : "0";
	}
	
	@RequestMapping(value = "/getUploadedDocuments", method = RequestMethod.POST)
	@ResponseBody
	public PurchaseReOrderDocUploadDto getUploadedDocuments(@RequestParam("proMasterId") Integer proMasterId,HttpServletRequest request) {
		purchaseReOrderDocUploadDto = purchaseReOrderService.getUploadedDocuments(proMasterId,request);
		log.debug("reponse getUploadedDocuments....."+purchaseReOrderDocUploadDto);
		return purchaseReOrderDocUploadDto;	
	}
	
	@RequestMapping(value="/readDocuments",method=RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName, @RequestParam("proMasterId") Integer proMasterId, HttpServletResponse response)
	{
		String filePath = FilePath.getPROFilesPath();
		try {

			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".gif")) {
					java.io.File file = new java.io.File(filePath+ java.io.File.separator + proMasterId +  java.io.File.separator + fileName);
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
					String reportDestination = filePath+ java.io.File.separator + proMasterId +  java.io.File.separator + fileName;
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
				
					String reportDestination = filePath+ java.io.File.separator + proMasterId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,response.getOutputStream());
					log.debug("reponse readCertificate....."+reportDestination);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	/**
	 * @since 18-01-2021
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all Item Stock Below Minimum Level Report details
	 */
	@RequestMapping(value = "/getAllItemStockBelowMinimunLevel", method = RequestMethod.GET)
	@ResponseBody
	public List<ItemMasterDto>  getAllItemStockBelowMinimunLevelReport(HttpServletRequest request) {
		List <ItemMasterDto> lst = new  ArrayList<ItemMasterDto>();
		log.info("in class InvReportController this is method getAllItemStockBelowMinimunLevelReport....");
		lst = purchaseReOrderService.getAllItemStockBelowMinimunLevel(request);
		return lst;
	}
	
}

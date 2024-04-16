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

import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.DocMasterDocNumFinancialYearDto;
import com.hms.inventory.dto.GoodReceiptNoteDocUploadDto;
import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.PurchaseOrderDto;
import com.hms.inventory.dto.PurchaseReOrderDto;
import com.hms.inventory.service.GoodReceiptNoteService;
import com.hms.inventory.service.InventoryServiceM;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value = "/invGoodReceiptNote")
public class InvGoodReceiptNoteController {

	static Logger log=Logger.getLogger(InvGoodReceiptNoteController.class.getName());
	@Autowired
	private GoodReceiptNoteService goodReceiptNoteService;
	
	@Autowired
	private GoodReceiptNoteDto goodReceiptNoteDto;
	
	@Autowired
	private InventoryServiceM inventoryServiceM;
	
	@Autowired
	private PurchaseOrderDto purchaseOrderDto;
	
	@Autowired
	private PurchaseReOrderDto purchaseReOrderDto;
	
	@Autowired
	private GoodReceiptNoteDocUploadDto goodReceiptNoteDocUploadDto;

	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for save Goods Receipt Note details
	 */
	@RequestMapping(value = "/saveGoodReceiptNote", method = RequestMethod.POST)
	@ResponseBody
	public int[] saveGoodReceiptNote(GoodReceiptNoteDto goodsReceiptNoteDto,@RequestParam("goodReceiptNoteItemDtoList") String lstGoodReceiptNoteItemDto,
			@RequestParam("partyMasterContactInfoDtoList") String grnContactInfoDtoList,
			@RequestParam("partyMasterAddressInfoDtoList") String grnAddressInfoDtoList,
			@RequestParam("partyMasterId") Integer partyMasterId,
			@RequestParam("itemAssetMaintenanceDtoList") String itemAssetMaintenanceDtoList,
			@RequestParam("itemAssetMaintenanceMasterDtoList") String itemAssetMaintenanceMasterDtoList, @RequestParam("callFrom") String callFrom,
			HttpServletRequest request) {
		log.info("in class InvGoodReceiptNoteController this is method saveGoodReceiptNote....");
		int status[] = goodReceiptNoteService.saveGoodReceiptNote(goodsReceiptNoteDto, lstGoodReceiptNoteItemDto, grnContactInfoDtoList, grnAddressInfoDtoList,itemAssetMaintenanceDtoList, itemAssetMaintenanceMasterDtoList,/*uploadfiles,*/ partyMasterId,callFrom, request);
		log.debug("this is status...."+status);
		return status;
	}

	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all Goods Receipt Note details
	 */
	@RequestMapping(value = "/getAllGoodReceiptNote", method = RequestMethod.GET)
	@ResponseBody
	public GoodReceiptNoteDto getAllGoodReceiptNote(HttpServletRequest request,@RequestParam("call") String call) {
		
		log.info("in class InvGoodReceiptNoteController this is method getAllGoodReceiptNote....");
		List<GoodReceiptNoteDto> goodReceiptNoteDtoList = new ArrayList<GoodReceiptNoteDto>();
		Integer count = goodReceiptNoteService.getPageCountAllGRNMaster(request);
		goodReceiptNoteDtoList = goodReceiptNoteService.getAllGoodReceiptNote(request,call);
		goodReceiptNoteDto.setLstGoodReceiptNoteDto(goodReceiptNoteDtoList);
		goodReceiptNoteDto.setNoOfPages(count);
		log.debug("this is list goodReceiptNoteDtoList...."+goodReceiptNoteDtoList);
		return goodReceiptNoteDto;
	}

	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for Goods Receipt Note 
	 */
	@RequestMapping(value = "/editGoodReceiptNote", method = RequestMethod.GET)
	@ResponseBody
	public GoodReceiptNoteDto editGoodReceiptNote(
			@RequestParam("id") Integer goodReceiptNoteId,@RequestParam("call") String call,HttpServletRequest request) {
		log.info("in class InvGoodReceiptNoteController this is method editGoodReceiptNote....");
		 return goodReceiptNoteService.editGoodReceiptNote(goodReceiptNoteId,call,request);
	}

	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for delete Goods Receipt Note
	 */
	@RequestMapping(value = "/deleteGoodReceiptNote", method = RequestMethod.POST)
	@ResponseBody
	public String deleteGoodReceiptNote(
			@RequestParam("id") Integer goodReceiptNoteId,
			HttpServletRequest request) {
		log.info("in class InvGoodReceiptNoteController this is method deleteGoodReceiptNote....");
		boolean status = goodReceiptNoteService.deleteGoodReceiptNote(goodReceiptNoteId,
				request);
		String message = "";
		if (status == true) {
			log.debug("this is response status Records Deleted Sucessfully...."+status);
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
			log.debug("this is response status Something went wrong..."+status);
		}
		return message;
	}

	/**
	 * @since 29-12-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for delete Goods Receipt Note
	 */
	@RequestMapping(value = "/deleteGoodReceiptNoteItem", method = RequestMethod.POST)
	@ResponseBody
	public boolean deleteGoodReceiptNoteItem(
			@RequestParam("id") Integer itemSlaveId,
			HttpServletRequest request) {
		log.info("in class InvGoodReceiptNoteController this is method deleteGoodReceiptNoteItem....");
		boolean status = goodReceiptNoteService.deleteGoodReceiptNoteItem(itemSlaveId,
				request);
		return status;
	}
	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for auto suggest while Goods Receipt Note
	 */
	@RequestMapping(value = "/goodReceiptNoteAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public GoodReceiptNoteDto goodReceiptNoteAutoSuggestion(
			@RequestParam("grnSupplierName") String goodReceiptNote,@RequestParam("call") String call,HttpServletRequest request) {
		return goodReceiptNoteService.goodReceiptNoteAutoSuggestion(goodReceiptNote,call,request);
	}
	
	
	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for getGoodPreceiptNoteById Goods Receipt Note
	 */
	@RequestMapping(value = "/getGoodReceiptNoteById", method = RequestMethod.GET)
	@ResponseBody
	public GoodReceiptNoteDto getGoodReceiptNoteById(
			@RequestParam("id") Integer goodReceiptNoteId, @RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		return goodReceiptNoteService.getGoodReceiptNoteById(goodReceiptNoteId,callFrom, request);
	}
	
	/**
	 * @since 05-01-2021
	 * @author Vishnu Thorat
	 * @codeFor below method is created for getGoodPreceiptNoteByVendorName Goods Receipt Note
	 */
	@RequestMapping(value = "/getGoodReceiptNoteByVendorName", method = RequestMethod.GET)
	@ResponseBody
	public GoodReceiptNoteDto getGoodReceiptNoteByVendorName(
			@RequestParam("grnSupplierName") String vendorName, @RequestParam("callFrom") String callFrom, HttpServletRequest request) {
		return goodReceiptNoteService.getGoodReceiptNoteByVendorName(vendorName,callFrom,request);
	}
	
	
	/*@RequestMapping(value = "/deletePartyMasterSlave", method = RequestMethod.POST)
	@ResponseBody
	public String deletePartyMasterSlave(
			@RequestParam("id") Integer partyMasterSlaveId,@RequestParam("partyMasterId")Integer partyMasterId,@RequestParam("callFrom")String callFrom,
			HttpServletRequest request) {
		boolean status = partyMasterService.deletePartyMasterSlave(partyMasterSlaveId,partyMasterId, callFrom,
				request);
		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}*/
	
	@RequestMapping(value = "/getGoodReceiptNoteSeries", method = RequestMethod.GET)
	@ResponseBody
	public DocMasterDocNumFinancialYearDto getGoodReceiptNoteSeries(
			@RequestParam("isEdit") String isEdit,HttpServletRequest request) {
		return goodReceiptNoteService.getGoodReceiptNoteSeries(isEdit,request);
	}
	
	@RequestMapping(value = "/getGoodReceiptNoteSeriesNextId", method = RequestMethod.POST)
	@ResponseBody
	public Integer getGoodReceiptNoteSeriesNextId(@RequestParam("tableName") String tableName,HttpServletRequest request) {
		
		log.info("getGoodReceiptNoteSeriesNextId..");
		int response = goodReceiptNoteService.getNextIdNew(tableName,request);
		 log.debug("reponse getGoodReceiptNoteSeriesNextId....."+response);

		return response;
	}
	
	@RequestMapping(value = "/getChallanAndPurchaseInvoiceId", method = RequestMethod.POST)
	public @ResponseBody
	String getChallanAndPurchaseInvoiceId( @RequestParam("grnid")   String grnid, HttpServletRequest request) {
		
		log.info("getChallanAndPurchaseInvoiceId..");
		String response = goodReceiptNoteService.getChallanAndPurchaseInvoiceId(grnid,request);
		 log.debug("reponse getChallanAndPurchaseInvoiceId....."+response);

		return response;
	}
	
	@RequestMapping(value = "/getPendingPurchaseOrder", method = RequestMethod.GET)
	public @ResponseBody
	PurchaseOrderDto getPendingPurchaseOrder(HttpServletRequest request) {
		List<PurchaseOrderDto> purchaseOrderDtos = new ArrayList<PurchaseOrderDto>();
		log.info("getPendingPurchaseOrder..");
		purchaseOrderDtos = goodReceiptNoteService.getPendingPurchaseOrder(request);
		 log.debug("reponse getPendingPurchaseOrder....."+purchaseOrderDtos);

		purchaseOrderDto.setPurchaseOrderDtos(purchaseOrderDtos);
		return purchaseOrderDto;
	}
	
	@RequestMapping(value = "/getPendingPurchaseReOrder", method = RequestMethod.GET)
	public @ResponseBody
	PurchaseReOrderDto getPendingPurchaseReOrder(HttpServletRequest request) {
		List<PurchaseReOrderDto> purchaseReOrderDtos = new ArrayList<PurchaseReOrderDto>();
		log.info("getPendingPurchaseReOrder..");
		purchaseReOrderDtos = goodReceiptNoteService.getPendingPurchaseReOrder(request);
		 log.debug("reponse getPendingPurchaseReOrder....."+purchaseReOrderDtos);

		purchaseReOrderDto.setPurchaseReOrderDtos(purchaseReOrderDtos);
		return purchaseReOrderDto;
	}
	
	@RequestMapping(value = "/inventoryTaxAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	InventoryTaxSetUpMDTO inventoryTaxAutoSuggestion(@RequestParam("taxName")String taxName,HttpServletRequest request) {
		List<InventoryTaxSetUpMDTO> lsttaxmaster = new ArrayList<InventoryTaxSetUpMDTO>();
		log.info("inventoryTaxAutoSuggestion..");
		lsttaxmaster = goodReceiptNoteService.getAllInvTaxMasterAutosuggestion(taxName,request);
		 log.debug("reponse inventoryTaxAutoSuggestion....."+lsttaxmaster);

		InventoryTaxSetUpMDTO obj = new InventoryTaxSetUpMDTO();
		obj.setLstinventoryTaxSetUps(lsttaxmaster);
		return obj;
	}
	
	@RequestMapping(value = "/checkBatchAvailability", method = RequestMethod.GET)
	public @ResponseBody
	List<BatchMasterDto> checkBatchAvailability(
			@RequestParam("id") String batchCode,@RequestParam("itemMasterId") Integer itemMasterId,HttpServletRequest request) {
		List<BatchMasterDto> batchMasters = new ArrayList<BatchMasterDto>();
		log.info("checkBatchAvailability..");
		batchMasters = goodReceiptNoteService.checkBatchAvailability(batchCode,itemMasterId,request);
		 log.debug("reponse checkBatchAvailability....."+batchMasters);

		return batchMasters;
	}
	
	@RequestMapping(value = "/getBatchDetails", method = RequestMethod.GET)
	public @ResponseBody
	List<BatchStockDto> getBatchDetails(
			@RequestParam("itemMasterId") Integer itemId,HttpServletRequest request) {
		List<BatchStockDto> batchStock = new ArrayList<BatchStockDto>();
		log.info("getBatchDetails..");
		batchStock = goodReceiptNoteService.getBatchDetails(itemId,request);
		 log.debug("reponse getBatchDetails....."+batchStock);

		return batchStock;
	}
	
	@RequestMapping(value = "/getGrnMasterPagination", method = RequestMethod.POST)
	public @ResponseBody GoodReceiptNoteDto getGrnMasterPagination(@RequestParam("startIndex") Integer startIndex,@RequestParam("call") String callFrom,HttpServletRequest request) {
		log.debug("reponse getGrnMasterPagination.....");
		return goodReceiptNoteService.getGrnMasterPagination(startIndex,callFrom,request);
	}
	
	
	@RequestMapping(value = "/uploadGoodReceiptNoteDocument", method = RequestMethod.POST)
	public @ResponseBody String uploadGoodReceiptNoteDocument(@RequestParam("documentUpload") String document,
			@RequestParam("uploadGrnDocs") MultipartFile[] uploadGrnDocs,
			@RequestParam("grnMasterId") Integer grnMasterId,
			HttpServletRequest request) throws IOException {
		for (MultipartFile file : uploadGrnDocs) {
            if (file.isEmpty()) { continue; }
            java.io.File uploadPath = new java.io.File(FilePath.getGrnFilesPath() + grnMasterId);
            if(!uploadPath.exists())
            	uploadPath.mkdirs();
            String fileName = file.getOriginalFilename();
            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
                stream.write(file.getBytes());
                stream.close();
	 }
		
	int response = goodReceiptNoteService.uploadGoodReceiptNoteDocument(document, request);
	log.debug("reponse uploadGoodReceiptNoteDocument....."+response);
	String msg="";
	return msg = (response==1) ? "1" : (response==2) ? "2" : "0";
	}
	
	@RequestMapping(value = "/getUploadedDocuments", method = RequestMethod.POST)
	@ResponseBody
	public GoodReceiptNoteDocUploadDto getUploadedDocuments(@RequestParam("grnMasterId") Integer grnMasterId,HttpServletRequest request) {
		goodReceiptNoteDocUploadDto = goodReceiptNoteService.getUploadedDocuments(grnMasterId,request);
		log.debug("reponse getUploadedDocuments....."+goodReceiptNoteDocUploadDto);
		return goodReceiptNoteDocUploadDto;	
	}
	
	@RequestMapping(value="/readDocuments",method=RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName, @RequestParam("grnMasterId") Integer grnMasterId, HttpServletResponse response)
	{
		String filePath = FilePath.getGrnFilesPath();
		try {

			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".gif")) {
					java.io.File file = new java.io.File(filePath+ java.io.File.separator + grnMasterId +  java.io.File.separator + fileName);
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
					String reportDestination = filePath+ java.io.File.separator + grnMasterId +  java.io.File.separator + fileName;
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
				
					String reportDestination = filePath+ java.io.File.separator + grnMasterId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,response.getOutputStream());
					log.debug("reponse readCertificate....."+reportDestination);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/getGoodReceiptNoteItemBatchDetails", method = RequestMethod.POST)
	@ResponseBody
	public BatchStockDto getGoodReceiptNoteItemBatchDetails(@RequestParam("itemMasterId") Integer itemMasterId, HttpServletRequest request) {
		List<BatchStockDto> list = new ArrayList<BatchStockDto>();
		BatchStockDto batchStockDto = new BatchStockDto();
		
		list = goodReceiptNoteService.getGoodReceiptNoteItemBatchDetails(itemMasterId,request);
		batchStockDto.setLstBatchStockDto(list);
		log.debug("reponse getGoodReceiptNoteItemBatchDetails....."+list);
		
		return batchStockDto;
	}
	
	@RequestMapping(value = "/deleteUploadedDocument", method = RequestMethod.POST)
	public @ResponseBody
	boolean deleteUploadedDocument(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = goodReceiptNoteService.deleteUploadedDocument(id,request);
		return response;
	}
	
}

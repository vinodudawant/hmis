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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.ItemContractSlaveDto;
import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.ItemPartySlaveDto;
import com.hms.inventory.dto.ItemPurchaseSlaveDto;
import com.hms.inventory.dto.ItemSalesSlaveDto;
import com.hms.inventory.dto.ItemWarehouseSlaveDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.service.ItemMasterService;
import com.hms.pharmacy.upload.FilePath;


@Controller
@RequestMapping(value="/inventoryItemMaster")
public class ItemMasterController {

	static Logger log=Logger.getLogger(ItemMasterController.class.getName());
	
	public static final String SAVE_RECORD = "Records Saved Sucessfully";
	public static final String UPDATE_RECORD = "Records Updated Sucessfully";
	public static final String UNKNOWN = "Oops Some Problem Ocured";
	
	@Autowired
	private ItemMasterService itemMasterService;
	@Autowired
	private ItemPurchaseSlaveDto itemPurchaseSlaveDto;
	@Autowired
	private ItemSalesSlaveDto itemSalesSlaveDto;
	@Autowired
	private ItemMasterDto itemMasterDto;
	@Autowired
	private PartyMasterDto partyMasterDto;
	@Autowired
	private ItemWarehouseSlaveDto itemWarehouseSlaveDto;
	@Autowired
	private ItemPartySlaveDto itemPartySlaveDto;
	@Autowired
	private InventoryTaxSetUpMDTO inventoryTaxSetUpMDTO;
	@Autowired
	private ItemContractSlaveDto itemContractSlaveDto;
	@Autowired
	private ItemMaintenanceSlaveDto itemMaintenanceSlaveDto;
	
	/**
	 * @author Rohit
	 * @since 13112019
	 * @comment This method is created for to save item master and slaves related to item master which are item purchase slave,
	 * item sales slave,item warehouse slave,item party slave
	 * @param itemPurchaseDetails
	 * @param itemSalesDetails
	 * @param itemMasterDto
	 * @param itemWarehouseMasterDto
	 * @param itemPurchaseMasterDto
	 * @param itemPartySlaveDto
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/saveItemMaster")
	@ResponseBody	
	public int  saveItemMaster(@RequestParam("itemPurchaseDetails") String itemPurchaseDetails,
							   @RequestParam("itemSalesDetails") String itemSalesDetails,@RequestParam("itemPartyDetails") String itemPartyDetails,ItemMasterDto itemMasterDto,
							   ItemWarehouseSlaveDto itemWarehouseSlaveDto,ItemMaintenanceSlaveDto itemMaintenanceSlaveDto,@RequestParam("itemContractDetails") String itemContractDetails,
							   Model model,HttpServletRequest request){
		log.info("saveItemWarehouse..");
	    int response= itemMasterService.saveItemWarehouse(itemMasterDto,itemWarehouseSlaveDto,
	    			  itemPurchaseDetails,itemSalesDetails,itemPartyDetails,itemMaintenanceSlaveDto,itemContractDetails,model,request);	    
	      log.debug("reponse saveItemWarehouse....."+response);

		return response;
   }

	
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for edit the Item master w.r.t id
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/editItemMaster", method = RequestMethod.GET)
	public @ResponseBody
	ItemMasterDto editItemMaster(@RequestParam("id") Integer id,HttpServletRequest request) {
		
		log.info("editItemMaster..");
		itemMasterDto = itemMasterService.editItemMaster(id,request);
	      log.debug("reponse editItemMaster....."+itemMasterDto);

		return itemMasterDto;
	}
	
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get all item master records
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllItemMasterRecords", method = RequestMethod.GET)
	public @ResponseBody
	ItemMasterDto getAllItemMasterRecords(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<ItemMasterDto> lstItemMaster = new ArrayList<ItemMasterDto>();
		Integer count=itemMasterService.getPageCountAllItemMaster(request);
		log.info("getAllItemMasterRecords..");
		lstItemMaster = itemMasterService.getAllItemMasterRecords(request,unitId);
	      log.debug("reponse getAllItemMasterRecords....."+lstItemMaster);

		itemMasterDto.setLstItemMaster(lstItemMaster);
		itemMasterDto.setNoOfPages(count);
		return itemMasterDto;
	}
	
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get item master details by passing itemName as parameter
	 * @param itemName
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getItemMasterDetails",method = RequestMethod.POST)
	@ResponseBody
	public List<ItemMasterDto> searchByYear(@RequestParam("itemName") String itemName,HttpServletRequest request){
		List<ItemMasterDto> lstItemMaster = new ArrayList<ItemMasterDto>();		
		log.info("getItemMasterDetails..");
		lstItemMaster = itemMasterService.searchByItemName(itemName, request);
	      log.debug("reponse getItemMasterDetails....."+lstItemMaster);

		return lstItemMaster;
	}
	
	/**
	 * @since 13112019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the all item purchase records w.r.t to master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getItemPurchaseSlaveRecords", method = RequestMethod.GET)
	public @ResponseBody
	ItemPurchaseSlaveDto getAllItemPurchaseMasterRecords(@RequestParam("masterId") Integer masterId,HttpServletRequest request) {
		List<ItemPurchaseSlaveDto> lstItemPurchaseSlave = new ArrayList<ItemPurchaseSlaveDto>();
			log.info("getItemPurchaseSlaveRecords..");
		lstItemPurchaseSlave = itemMasterService.getItemPurchaseMasterRecords(masterId,request);
	      log.debug("reponse getItemPurchaseSlaveRecords....."+lstItemPurchaseSlave);

		itemPurchaseSlaveDto.setLstItemPurchaseSlave(lstItemPurchaseSlave);
		return itemPurchaseSlaveDto;
	}
	
	/**
	 * @since 13112019
	 * @comment This method is created for to edit the item purchase slave w.r.t id 
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editItemPurchaseSlave", method = RequestMethod.GET)
	@ResponseBody
	public ItemPurchaseSlaveDto editItemPurchaseSlave(@RequestParam("id") Integer id,HttpServletRequest request) {
			log.info("editItemPurchaseSlave..");
		itemPurchaseSlaveDto = itemMasterService.editItemPurchaseSlave(id,request);
	      log.debug("reponse editItemPurchaseSlave....."+itemPurchaseSlaveDto);

		return itemPurchaseSlaveDto;	
	}	
	
	/**
	 * @since 13112019
	 * @comment This method is created for to update item purchase slave 
	 * @author Rohit Sandbhor
	 * @param itemPurchaseSlaveDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/updateItemPurchaseSlave",method = RequestMethod.POST)
	@ResponseBody
	public int updateItemPurchaseSlave(ItemPurchaseSlaveDto itemPurchaseSlaveDto,HttpServletRequest request)
	{			
		log.info("updateItemPurchaseSlave..");
		int response = itemMasterService.updateItemPurchaseSlave(itemPurchaseSlaveDto, request);
	      log.debug("reponse updateItemPurchaseSlave....."+response);

		return response;
	}
	
	/**
	 * @since 13112019
	 * @comment This method is created to get item sales slaves w.r.t master id
	 * @author Rohit Sandbhor
	 * @param masterId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getItemSalesSlaveRecords", method = RequestMethod.GET)
	public @ResponseBody
	ItemSalesSlaveDto getItemSalesSlaveRecords(@RequestParam("masterId") Integer masterId,HttpServletRequest request) {
		List<ItemSalesSlaveDto> lstItemSalesSlave = new ArrayList<ItemSalesSlaveDto>();
		
		log.info("getItemSalesSlaveRecords..");
		lstItemSalesSlave = itemMasterService.getItemSalesSlaveRecords(masterId,request);
	      log.debug("reponse getItemSalesSlaveRecords....."+lstItemSalesSlave);

		itemSalesSlaveDto.setLstItemSalesSlave(lstItemSalesSlave);
		return itemSalesSlaveDto;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for edit the item sales slave records w.r.t id
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/editItemSalesSlave", method = RequestMethod.GET)
	@ResponseBody
	public ItemSalesSlaveDto editItemSalesSlave(@RequestParam("id") Integer id,HttpServletRequest request) {
		
		log.info("editItemSalesSlave..");
		itemSalesSlaveDto = itemMasterService.editItemSalesSlave(id,request);
	      log.debug("reponse editItemSalesSlave....."+itemSalesSlaveDto);

		return itemSalesSlaveDto;	
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to update the item sales slave details
	 * @param itemSalesSlaveDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/updateItemSalesSlave",method = RequestMethod.POST)
	@ResponseBody
	public int updateItemSalesSlave(ItemSalesSlaveDto itemSalesSlaveDto,HttpServletRequest request)
	{
		log.info("updateItemSalesSlave..");
		int response = itemMasterService.updateItemSalesSlave(itemSalesSlaveDto, request);
	      log.debug("reponse updateItemSalesSlave....."+response);

		return response;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get auto suggestion on party slave by party name
	 * @param partyName
	 * @return
	 */
	@RequestMapping(value = "/autoFillSearchOnPartySlave", method = RequestMethod.POST)
	 @ResponseBody
	public PartyMasterDto autoFillSearchOnPartySlave(@RequestParam("name") String partyName,HttpServletRequest request) {
		log.info("autoFillSearchOnPartySlave..");
		partyMasterDto = itemMasterService.autoSuggestionsOnPartyMasterName(partyName,request);	
	      log.debug("reponse autoFillSearchOnPartySlave....."+partyMasterDto);

		return partyMasterDto;
	}
	
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get the next item master id
	 * @param tableName
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getNextItemMasterIdNew",method = RequestMethod.POST)
	@ResponseBody
	public int getNextItemMasterIdNew(@RequestParam("tableName") String tableName,HttpServletRequest request)
	{
		log.info("getNextItemMasterIdNew..");
		int response = itemMasterService.getNextIdNew(tableName, request);
	      log.debug("reponse getNextItemMasterIdNew....."+response);

		return response;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get auto fill search on item master by passing item name as parameter
	 * @param itemName
	 * @return
	 */
	@RequestMapping(value = "/autoFillSearchItemMaster", method = RequestMethod.POST)
	 @ResponseBody
	public ItemMasterDto autoFillSearchItemMaster(@RequestParam("itemName") String itemName,@RequestParam("searchAssetOrServiceItem") String searchAssetOrServiceItem,HttpServletRequest request) {
		log.info("autoFillSearchItemMaster..");
		itemMasterDto = itemMasterService.autoFillSearchItemMaster(itemName,searchAssetOrServiceItem,request);
	      log.debug("reponse autoFillSearchItemMaster....."+itemMasterDto);

		return itemMasterDto;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get the item master details w.r.t id
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getItemMasterDetailsById",method = RequestMethod.POST)
	@ResponseBody
	public ItemMasterDto getItemMasterDetailsById(@RequestParam("id") Integer id,HttpServletRequest request){
		List<ItemMasterDto> lstItemMaster = new ArrayList<ItemMasterDto>();
		log.info("getItemMasterDetailsById..");
		lstItemMaster = itemMasterService.searchByItemMasterId(id, request);
	      log.debug("reponse getItemMasterDetailsById....."+lstItemMaster);

		itemMasterDto.setLstItemMaster(lstItemMaster);
		return itemMasterDto;
	}
	
	/**
	 * @since 13112019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the all item warehouse records w.r.t to master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getItemWarehouseSlaveRecord", method = RequestMethod.GET)
	public @ResponseBody
	ItemWarehouseSlaveDto getItemWarehouseSlaveRecord(@RequestParam("masterId") Integer masterId,HttpServletRequest request) {
		log.info("getItemWarehouseSlaveRecord..");
		itemWarehouseSlaveDto = itemMasterService.getItemWarehouseSlaveRecord(masterId,request);
	      log.debug("reponse getItemWarehouseSlaveRecord....."+itemWarehouseSlaveDto);

		return itemWarehouseSlaveDto;
	}
	
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment created this function to delete item master and his all related slaves
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deleteItemMasterNew", method = RequestMethod.POST)
	public @ResponseBody
	String deleteItemMasterNew(@RequestParam("id") Integer id,HttpServletRequest request) {
		log.info("deleteItemMasterNew..");
		boolean response = itemMasterService.deleteItemMasterNew(id, request);
	      log.debug("reponse deleteItemMasterNew....."+response);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		return msg;
	}
	
	/**
	 * @since 13112019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the all item party records w.r.t to master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getItemPartyDetailsByItemMasterId", method = RequestMethod.GET)
	public @ResponseBody
	ItemPartySlaveDto getItemPartyDetailsByItemMasterId(@RequestParam("masterId") Integer masterId,HttpServletRequest request) {
		List<ItemPartySlaveDto> lstItemPartySlave = new ArrayList<ItemPartySlaveDto>();
		log.info("getItemPartyDetailsByItemMasterId..");
		lstItemPartySlave = itemMasterService.getItemPartyDetailsByItemMasterId(masterId,request);
	      log.debug("reponse getItemPartyDetailsByItemMasterId....."+lstItemPartySlave);

		itemPartySlaveDto.setLstItemPartySlave(lstItemPartySlave);
		return itemPartySlaveDto;
	}
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = "/loadHSNList", method = RequestMethod.GET)
	public @ResponseBody
	List<InventoryTaxSetUpMDTO> getAllCompaniesList(HttpServletRequest request) {
		List<InventoryTaxSetUpMDTO> list = new ArrayList<InventoryTaxSetUpMDTO>();
		list = itemMasterService.getAllHSNList(request);
		return list;
	}
	
	@RequestMapping(value = "/getHSNDetails", method = RequestMethod.GET)
	@ResponseBody
	public InventoryTaxSetUpMDTO getHSNDetails(@RequestParam("hsnId") Integer hsnId,@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		
		log.info("getHSNDetails.....");
		inventoryTaxSetUpMDTO = itemMasterService.getHSNDetails(hsnId,unitId,request);
		log.debug("reponse getHSNDetails....."+inventoryTaxSetUpMDTO);

		return inventoryTaxSetUpMDTO;
	}
	
	/**
	 * @since 29-01-2020
	 * @comment This method is created for to edit the item purchase party w.r.t id 
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editItemPartySlave", method = RequestMethod.GET)
	@ResponseBody
	public ItemPartySlaveDto editItemPartySlave(@RequestParam("id") Integer id,HttpServletRequest request) {
		log.info("editItemPartySlave..");
		itemPartySlaveDto = itemMasterService.editItemPartySlave(id,request);
		log.debug("reponse editItemPartySlave....."+itemPartySlaveDto);

		return itemPartySlaveDto;	
	}
	
	/**
	 * @since 29-01-2020
	 * @comment This method is created for to update item party slave 
	 * @author Rohit Sandbhor
	 * @param itemPartySlaveDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/updateItemPartySlave",method = RequestMethod.POST)
	@ResponseBody
	public int updateItemPartySlave(ItemPartySlaveDto itemPartySlaveDto,HttpServletRequest request)
	{
		log.info("updateItemPartySlave..");

		int response = itemMasterService.updateItemPartySlave(itemPartySlaveDto, request);
		log.debug("reponse updateItemPartySlave....."+response);

		return response;
	}
	
	/**
	 * @since 21-04-2020
	 * @comment This function is created for to getItemMasterPagination
	 * @author Dayanand Khandekar
	 * @param startIndex
	 * @return
	 */
	@RequestMapping(value = "/getItemMasterPagination", method = RequestMethod.POST)
	public @ResponseBody ItemMasterDto getItemMasterPagination(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		return itemMasterService.getItemMasterPagination(startIndex,request);
	}
	
	/**
	 * @since 13112019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the all item contract records w.r.t to master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getItemContractSlaveRecord", method = RequestMethod.GET)
	public @ResponseBody
	ItemContractSlaveDto getItemContractSlaveRecord(@RequestParam("masterId") Integer masterId,HttpServletRequest request) {
		List<ItemContractSlaveDto> itemContractSlaveDtos = new ArrayList<ItemContractSlaveDto>();
		log.info("getItemContractSlaveRecord..");
		itemContractSlaveDtos = itemMasterService.getItemContractSlaveRecord(masterId,request);
	    log.debug("reponse getItemContractSlaveRecord....."+itemContractSlaveDtos.size());
	    itemContractSlaveDto.setLstItemContractSlave(itemContractSlaveDtos);
		return itemContractSlaveDto;
	}
	/**
	 * @since 19-06-2020
	 * @author Rohit Sandbhor
	 * @comment here we are getting the maintenance details w.r.t item master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getMaintenanceDetailsByItemMasterId", method = RequestMethod.GET)
	public @ResponseBody
	ItemMaintenanceSlaveDto getMaintenanceDetailsByItemMasterId(@RequestParam("masterId") Integer masterId,HttpServletRequest request) {
		log.info("getMaintenanceDetailsByItemMasterId..");
		itemMaintenanceSlaveDto = itemMasterService.getMaintenanceDetailsByItemMasterId(masterId,request);
	    log.debug("reponse getMaintenanceDetailsByItemMasterId....."+itemMaintenanceSlaveDto);
		return itemMaintenanceSlaveDto;
	}

	/**
	 * @since 19-06-2020
	 * @author Rohit Sandbhor
	 * @comment added this method to upload the contract tab related documents on tomcat server folder also saving file name on slave table
	 * @param contractSlaveId
	 * @param uploadContractDocument
	 * @param browseContractDocument
	 * @param request
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/uploadDocumentContractDetails", method=RequestMethod.POST)
	public @ResponseBody String uploadDocumentContractDetails(@RequestParam("contractSlaveId") Integer contractSlaveId,@RequestParam("uploadContractDocument") String uploadContractDocument,
			@RequestParam("browseContractDocument") MultipartFile[] browseContractDocument,HttpServletRequest request)throws IOException{
		for (MultipartFile file : browseContractDocument) {
            if (file.isEmpty()) { continue; }
            java.io.File uploadPath = new java.io.File(FilePath.getContractDetailsFilesPath() + contractSlaveId);
            if(!uploadPath.exists())
            	uploadPath.mkdirs();
            String fileName = file.getOriginalFilename();
            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
            BufferedOutputStream stream;
				stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
				stream.write(file.getBytes());
	            stream.close();
	 }
		int response = itemMasterService.updateContractDetailsSlave(contractSlaveId, uploadContractDocument);
		String msg="";
		return msg = (response==1) ? SAVE_RECORD : (response==2) ? UPDATE_RECORD : UNKNOWN;
		
	}
	
	/**
	 * @since 19-06-2020
	 * @author Rohit Sandbhor
	 * @comment created this method to view the document under contract tab
	 * @param fileName
	 * @param contractSlaveId
	 * @param response
	 */
	@RequestMapping(value="/readDocuments",method=RequestMethod.GET)
	@ResponseBody
	public void readDocuments(@RequestParam("fileName") String fileName, @RequestParam("contractSlaveId") String contractSlaveId, HttpServletResponse response)
	{
		String filePath = FilePath.getContractDetailsFilesPath();
		System.out.println("fileName  "+fileName);
		try {
			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".gif")) {
					java.io.File file = new java.io.File(filePath+ java.io.File.separator + contractSlaveId +  java.io.File.separator + fileName);
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
					String reportDestination = filePath+ java.io.File.separator + contractSlaveId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(
							new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,
							response.getOutputStream());
					response.setContentType("application/pdf");
					response.setHeader("Content-Disposition",
							"attachment; filename=" + reportDestination);
					response.flushBuffer();
				
			} else {
				
					String reportDestination = filePath+ java.io.File.separator + contractSlaveId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,response.getOutputStream());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
/**
 * @author Rohit Sandbhor
 * @since 14-12-2020
 * @comment created this function to delete item purchase slave and his all related slaves
 * @param id
 * @param request
 * @return
 */
@RequestMapping(value = "/deleteItemPurchaseSlaveNew", method = RequestMethod.POST)
public @ResponseBody
String deleteItemPurchaseSlaveNew(@RequestParam("id") Integer id,@RequestParam("itemMasterId") Integer itemMasterId,HttpServletRequest request) {
	System.out.println("inside deleteItemPurchaseSlaveNew::");
	log.info("deleteItemPurchaseSlaveNew..");
	boolean response = itemMasterService.deleteItemPurchaseSlaveNew(id,itemMasterId,request);
    log.debug("reponse deleteItemMasterNew....."+response);
	String msg = "";
	if (response == true) {
		msg = "Records Deleted Successfully";
	} else {
		msg = "Records Deleted Un-successfully";
	}
	return msg;
}
}



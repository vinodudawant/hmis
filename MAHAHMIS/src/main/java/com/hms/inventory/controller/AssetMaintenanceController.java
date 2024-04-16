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

import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.dto.Users;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.inventory.dto.DetailsAssetMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemAssetMaintenanceDocUploadDto;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.LocationAssetMaintenanceSlaveDto;
import com.hms.inventory.dto.MaintenanceContractMasterDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.service.AssetMaintenanceService;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value="/inventoryAssetMaintenance")
public class AssetMaintenanceController {
	
	public static final String SAVE_RECORD = "Records Saved Sucessfully";
	public static final String UPDATE_RECORD = "Records Updated Sucessfully";
	public static final String DELETE_RECORD="Records Delete Successfully";
	public static final String UNKNOWN = "Oops Some Problem Ocured";
	public static final String UPLOAD_DOCUMENT="Upload Document Successfully";
	public static final String DELETE_DOCUMENT="Delete Document Successfully";

	static Logger log=Logger.getLogger(AssetMaintenanceController.class.getName());
	
	@Autowired
	private AssetMaintenanceService assetMaintenanceService;
	@Autowired
	private ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto;
	@Autowired
	private MaintenanceContractMasterDto maintenanceContractMasterDto;
	@Autowired
	private LocationAssetMaintenanceSlaveDto locationAssetMaintenanceSlaveDto;
	@Autowired
	private ItemAssetMaintenanceDocUploadDto itemAssetMaintenanceDocUploadDto;
	@Autowired
	private ItemMasterDto itemMasterDto;
	@Autowired
	private DetailsAssetMaintenanceSlaveDto detailsAssetMaintenanceSlaveDto;
	
	@Autowired
	PartyMasterDto partyMasterDto;
	
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get all item master records
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllItemAssetMaintenance", method = RequestMethod.GET)
	public @ResponseBody
	ItemAssetMaintenanceMasterDto getAllItemMasterRecords(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMaster = new ArrayList<ItemAssetMaintenanceMasterDto>();
		log.info("getAllItemAssetMaintenance..");
		Integer count =  assetMaintenanceService.getPageCountAllAssetMaintenance(request);
		lstItemAssetMaintenanceMaster = assetMaintenanceService.getAllItemAssetMaintenance(request,unitId);
	    log.debug("reponse getAllItemMasterRecords....."+lstItemAssetMaintenanceMaster);
	    assetMaintenanceMasterDto.setLstItemAssetMaintenanceMasterDto(lstItemAssetMaintenanceMaster);
	    assetMaintenanceMasterDto.setNoOfPages(count);
		return assetMaintenanceMasterDto;
	}
	
	/**
	 * @since 26-11-2019
	 * @comment This method is created for to edit purchase order details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editItemAssetMaintenanceMaster", method = RequestMethod.GET)
	@ResponseBody
	public ItemAssetMaintenanceMasterDto editItemAssetMaintenanceMaster(@RequestParam("id") Integer id) {
		assetMaintenanceMasterDto = assetMaintenanceService.editItemAssetMaintenanceMaster(id);
		return assetMaintenanceMasterDto;	
	}
	
	/**
	 * 
	 * @param request
	 * @param unitId
	 * @return
	 */
	@RequestMapping(value = "/getMaintenanceContractType", method = RequestMethod.POST)
	public @ResponseBody
	MaintenanceContractMasterDto getMaintenanceContractType(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<MaintenanceContractMasterDto> lstMaintenanceContractMaster = new ArrayList<MaintenanceContractMasterDto>();
		lstMaintenanceContractMaster = assetMaintenanceService.getMaintenanceContractType(unitId);
		maintenanceContractMasterDto.setLstMaintenanceContractMasterDto(lstMaintenanceContractMaster);
		return maintenanceContractMasterDto;
	}
	
	
	@RequestMapping(value="/saveItemAssetMaintenance",method = RequestMethod.POST)
	@ResponseBody	
	public int  saveItemAssetMaintenance(@RequestParam("itemAssetMaintenanceSlaveDetails") String itemAssetMaintenanceSlaveDetails,
			ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto,LocationAssetMaintenanceSlaveDto locationAssetMaintenanceSlaveDto,
			DetailsAssetMaintenanceSlaveDto detailsAssetMaintenanceSlaveDto, HttpServletRequest request){
	    int response= assetMaintenanceService.saveItemAssetMaintenance(assetMaintenanceMasterDto,itemAssetMaintenanceSlaveDetails,
	    		locationAssetMaintenanceSlaveDto,detailsAssetMaintenanceSlaveDto,request);
		return response;
   }
	
	/**
	 * @since 20-07-2020
	 * @author Rohit Sandbhor
	 * @comment here we are getting the location asset maintenance details w.r.t master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getLocationAssetMaintenanceDetailsByMasterId", method = RequestMethod.GET)
	public @ResponseBody
	LocationAssetMaintenanceSlaveDto getLocationAssetMaintenanceDetailsByMasterId(@RequestParam("masterId") Integer masterId,HttpServletRequest request) {
		log.info("getLocationAssetMaintenanceDetailsByMasterId..");
		locationAssetMaintenanceSlaveDto = assetMaintenanceService.getLocationAssetMaintenanceDetailsByMasterId(masterId,request);
	    log.debug("reponse getLocationAssetMaintenanceDetailsByMasterId....."+locationAssetMaintenanceSlaveDto);
		return locationAssetMaintenanceSlaveDto;
	}
	
	/**
	 * @since 21-07-2020
	 * @author Rohit Sandbhor
	 * @comment added this method to upload the asset related documents on tomcat server folder also saving file name on table
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/uploadAssetMaintenanceDocument", method = RequestMethod.POST)
	public @ResponseBody String uploadAssetMaintenanceDocument(@RequestParam("documentUpload") String document,
			@RequestParam("uploadAssetMaintenanceDocs") MultipartFile[] uploadAssetMaintenanceDocs,
			@RequestParam("assetMaintenenceMasterId") String assetMaintenenceMasterId,
			HttpServletRequest request) throws IOException {
		System.out.println("String document Json  "+document);	
		System.out.println("String document  "+uploadAssetMaintenanceDocs.length);
		for (MultipartFile file : uploadAssetMaintenanceDocs) {
            if (file.isEmpty()) { continue; }
            java.io.File uploadPath = new java.io.File(FilePath.getAssetMaintenenceDetailsFilesPath() + assetMaintenenceMasterId);
            if(!uploadPath.exists())
            	uploadPath.mkdirs();
            String fileName = file.getOriginalFilename();
            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
                stream.write(file.getBytes());
                stream.close();
	 }
		
		int response = assetMaintenanceService.uploadAssetMaintenanceDocument(document, request);
		String msg="";
		return msg = (response==1) ? SAVE_RECORD : (response==2) ? UPDATE_RECORD : UNKNOWN;
	}
	
	/**
	 * @since 22-07-2020
	 * @comment This method is created for to edit purchase order details w.r.t id
	 * @param id
	 * @author rohit
	 * @return
	 */
	@RequestMapping(value = "/getUploadedDocuments", method = RequestMethod.POST)
	@ResponseBody
	public ItemAssetMaintenanceDocUploadDto getUploadedDocuments(@RequestParam("assetMaintenanceMasterId") Integer assetMaintenanceMasterId) {
		itemAssetMaintenanceDocUploadDto = assetMaintenanceService.getUploadedDocuments(assetMaintenanceMasterId);
		return itemAssetMaintenanceDocUploadDto;	
	}
	
	/**
	 * @since 22-07-2020
	 * @author Rohit
	 * @param fileName
	 * @param assetMaintenanceMasterId
	 * @param response
	 */
	@RequestMapping(value="/readDocuments",method=RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName, @RequestParam("assetMaintenanceMasterId") String assetMaintenanceMasterId, HttpServletResponse response)
	{
		String filePath = FilePath.getAssetMaintenenceDetailsFilesPath();
		try {

			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".gif")) {
					java.io.File file = new java.io.File(filePath+ java.io.File.separator + assetMaintenanceMasterId +  java.io.File.separator + fileName);
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
					String reportDestination = filePath+ java.io.File.separator + assetMaintenanceMasterId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(
							new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,
							response.getOutputStream());
					response.setContentType("application/pdf");
					response.setHeader("Content-Disposition",
							"attachment; filename=" + reportDestination);
					response.flushBuffer();
				
			} else {
				
					String reportDestination = filePath+ java.io.File.separator + assetMaintenanceMasterId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,response.getOutputStream());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	
	@RequestMapping(value = "/getPathologyDepartments", method = RequestMethod.GET)
	public @ResponseBody
	SubServiceDto getPathologyDepartments(HttpServletRequest request) {
		List<SubServiceDto> lstSubServiceDto = new ArrayList<SubServiceDto>();
		lstSubServiceDto = assetMaintenanceService.getPathologyDepartments(request);
		SubServiceDto subServiceDto = new SubServiceDto();
		subServiceDto.setLstSubService(lstSubServiceDto);
		return subServiceDto;
	}
	
	@RequestMapping(value = "/getAllReagentNames", method = RequestMethod.GET)
	public @ResponseBody
	ItemMasterDto getAllReagentNames(@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		List<ItemMasterDto> lstItemMasterDto = new ArrayList<ItemMasterDto>();
		lstItemMasterDto = assetMaintenanceService.getAllReagentNames(unitId,request);
		itemMasterDto.setLstItemMaster(lstItemMasterDto);
		return itemMasterDto;
	}
	
	/**
	 * @since 06-08-2020
	 * @author Rohit Sandbhor
	 * @comment here we are getting the asset maintenance details tab w.r.t master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAssetMaintenanceDetailsTabInfo", method = RequestMethod.GET)
	public @ResponseBody
	DetailsAssetMaintenanceSlaveDto getAssetMaintenanceDetailsTabInfo(@RequestParam("masterId") Integer masterId,
			@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		log.info("getAssetMaintenanceDetailsTabInfo..");
		detailsAssetMaintenanceSlaveDto = assetMaintenanceService.getAssetMaintenanceDetailsTabInfo(masterId,unitId,request);
	    log.debug("reponse getAssetMaintenanceDetailsTabInfo....."+detailsAssetMaintenanceSlaveDto);
		return detailsAssetMaintenanceSlaveDto;
	}
	
	
	@RequestMapping(value = "/getLabEquipmentOrAssetItems", method = RequestMethod.GET)
	public @ResponseBody ItemAssetMaintenanceMasterDto getLabEquipmentOrAssetItems(@RequestParam("value") String value, 
			@RequestParam("type") Integer type, @RequestParam("productCategoryId") Integer productCategoryId,
			@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		List<ItemAssetMaintenanceMasterDto>  itemAssetMaintenanceMasterDtos =new ArrayList<ItemAssetMaintenanceMasterDto>();
		log.info("getLabEquipmentOrAssetItems()...start");
		itemAssetMaintenanceMasterDtos = assetMaintenanceService.getLabEquipmentOrAssetItems(value, type, productCategoryId,unitId, request);
		log.info("getLabEquipmentOrAssetItems()...end");
		assetMaintenanceMasterDto.setLstItemAssetMaintenanceMasterDto(itemAssetMaintenanceMasterDtos);
		return assetMaintenanceMasterDto;
	}
	
	@RequestMapping(value = "/universalSearchAssetMaintenance", method = RequestMethod.GET)
	public @ResponseBody ItemAssetMaintenanceMasterDto universalSearchAssetMaintenance(
			@RequestParam("productCategoryMaintenanceSearch") String productCategoryMaintenanceSearch, 
			@RequestParam("assetNameMaintenanceSearch") String assetNameMaintenanceSearch,  
		@RequestParam("fromDateMaintenanceSearch") String fromDateMaintenanceSearch, @RequestParam("toDateMaintenanceSearch") String toDateMaintenanceSearch, 
		@RequestParam("serialNoMaintenanceSearch") String serialNoMaintenanceSearch,
		@RequestParam("locationDeptId") Integer locationDeptId, 
		@RequestParam("locationHospitalDeptId") Integer locationHospitalDeptId,
		@RequestParam("searchBy") String searchBy,HttpServletRequest request) {
		List<ItemAssetMaintenanceMasterDto>  assetMaintenanceMasterDtos =new ArrayList<ItemAssetMaintenanceMasterDto>();
		log.info("universalSearchAssetMaintenance()...start");
		assetMaintenanceMasterDtos = assetMaintenanceService.universalSearchAssetMaintenance(productCategoryMaintenanceSearch, assetNameMaintenanceSearch, 
				fromDateMaintenanceSearch, toDateMaintenanceSearch, serialNoMaintenanceSearch,locationDeptId,locationHospitalDeptId,searchBy, request);
		log.info("universalSearchAssetMaintenance()...end");
		assetMaintenanceMasterDto.setLstItemAssetMaintenanceMasterDto(assetMaintenanceMasterDtos);
		return assetMaintenanceMasterDto;
	}
	
	@RequestMapping(value = "/deleteAssetMaintenanceDetails", method = RequestMethod.POST)
	public @ResponseBody
	String deleteAssetMaintenanceDetails(@RequestParam("id") Integer id,@RequestParam("assetDeletionReason") String assetDeletionReason,HttpServletRequest request) {
		boolean response = assetMaintenanceService.deleteAssetMaintenanceDetails(id,assetDeletionReason, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		return msg;
	}
	@RequestMapping(value = "/getAssetMaintenancePagination", method = RequestMethod.POST)
	public @ResponseBody ItemAssetMaintenanceMasterDto getAssetMaintenancePagination(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		return assetMaintenanceService.getAssetMaintenancePagination(startIndex,request);
	}	
	
	@RequestMapping(value = "/deleteUploadedDocument", method = RequestMethod.POST)
	public @ResponseBody
	boolean deleteUploadedDocument(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = assetMaintenanceService.deleteUploadedDocument(id,request);
		return response;
	}
	
	@RequestMapping(value = "/getAllServiceProvider", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterDto getAllServiceProvider(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<PartyMasterDto> partyMasterDtoDtoList = new ArrayList<PartyMasterDto>();
		log.info("getAllServiceProvider..");
		partyMasterDtoDtoList = assetMaintenanceService.getAllServiceProvider(unitId,request);
		 log.debug("reponse  getAllServiceProvider....."+partyMasterDtoDtoList);
		partyMasterDto.setPartyMasterDto(partyMasterDtoDtoList);
		return partyMasterDto;
	}
	
	@RequestMapping(value = "/getUserName", method = RequestMethod.GET)
	@ResponseBody
	public Users getUserName(HttpServletRequest request,@RequestParam("User_ID") Integer userId) {
		log.info("getUserName..");
		Users userDTO = (Users) assetMaintenanceService.getUserName(request,userId);
		 log.debug("reponse  getUserName....."+userDTO);
		return userDTO;
	}
	
	@RequestMapping(value = "/getAssetDetailsByItemIdAndSerialNo", method = RequestMethod.GET)
	@ResponseBody
	public ItemAssetMaintenanceMasterDto getAssetDetailsByItemIdAndSerialNo(@RequestParam("itemId") Integer itemId,@RequestParam("serialNo") String serialNo) {
		assetMaintenanceMasterDto = assetMaintenanceService.getAssetDetailsByItemIdAndSerialNo(itemId,serialNo);
		return assetMaintenanceMasterDto;	
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get all item master records
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllItemAssetMaintenanceReports", method = RequestMethod.GET)
	public @ResponseBody
	ItemAssetMaintenanceMasterDto getAllItemAssetMaintenanceReports(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMaster = new ArrayList<ItemAssetMaintenanceMasterDto>();
		log.info("getAllItemAssetMaintenanceReports..");
		lstItemAssetMaintenanceMaster = assetMaintenanceService.getAllItemAssetMaintenanceReports(request,unitId);
	    log.debug("reponse getAllItemAssetMaintenanceReports....."+lstItemAssetMaintenanceMaster);
	    assetMaintenanceMasterDto.setLstItemAssetMaintenanceMasterDto(lstItemAssetMaintenanceMaster);
		return assetMaintenanceMasterDto;
	}
	
	@RequestMapping(value = "/universalSearchAssetMaintenanceReports", method = RequestMethod.GET)
	public @ResponseBody ItemAssetMaintenanceMasterDto universalSearchAssetMaintenanceReports(
			@RequestParam("productCategoryMaintenanceSearch") String productCategoryMaintenanceSearch, 
			@RequestParam("assetNameMaintenanceSearch") String assetNameMaintenanceSearch,  
		@RequestParam("fromDateMaintenanceSearch") String fromDateMaintenanceSearch, @RequestParam("toDateMaintenanceSearch") String toDateMaintenanceSearch, 
		@RequestParam("serialNoMaintenanceSearch") String serialNoMaintenanceSearch,
		@RequestParam("locationDeptId") Integer locationDeptId, 
		@RequestParam("locationHospitalDeptId") Integer locationHospitalDeptId,
		@RequestParam("searchBy") String searchBy,HttpServletRequest request) {
		List<ItemAssetMaintenanceMasterDto>  assetMaintenanceMasterDtos =new ArrayList<ItemAssetMaintenanceMasterDto>();
		log.info("universalSearchAssetMaintenance()...start");
		assetMaintenanceMasterDtos = assetMaintenanceService.universalSearchAssetMaintenanceReports(productCategoryMaintenanceSearch, assetNameMaintenanceSearch, 
				fromDateMaintenanceSearch, toDateMaintenanceSearch, serialNoMaintenanceSearch,locationDeptId,locationHospitalDeptId,searchBy, request);
		log.info("universalSearchAssetMaintenance()...end");
		assetMaintenanceMasterDto.setLstItemAssetMaintenanceMasterDto(assetMaintenanceMasterDtos);
		return assetMaintenanceMasterDto;
	}
	
	@RequestMapping(value = "/getAllDeletedAssetMaintenanceReports", method = RequestMethod.GET)
	public @ResponseBody
	ItemAssetMaintenanceMasterDto getAllDeletedAssetMaintenanceReports(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMaster = new ArrayList<ItemAssetMaintenanceMasterDto>();
		log.info("getAllItemAssetMaintenanceReports..");
		lstItemAssetMaintenanceMaster = assetMaintenanceService.getAllDeletedAssetMaintenanceReports(request,unitId);
	    log.debug("reponse getAllItemAssetMaintenanceReports....."+lstItemAssetMaintenanceMaster);
	    assetMaintenanceMasterDto.setLstItemAssetMaintenanceMasterDto(lstItemAssetMaintenanceMaster);
		return assetMaintenanceMasterDto;
	}
	
	
	@RequestMapping(value = "/fetchHospitalDepartments", method = RequestMethod.GET)
	public @ResponseBody
	HospitalDepartmentDto fetchHospitalDepartments(HttpServletRequest request) {
		List<HospitalDepartmentDto> lstHospitalDepartmentDto = new ArrayList<HospitalDepartmentDto>();
		log.info("getAllItemAssetMaintenanceReports..");
		lstHospitalDepartmentDto = assetMaintenanceService.fetchHospitalDepartments(request);
		HospitalDepartmentDto objNew=new HospitalDepartmentDto();
		objNew.setListDepartments(lstHospitalDepartmentDto);
		return objNew;
	}
	
}

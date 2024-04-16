package com.hms.inventory.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.district_taluka_city;
import com.hms.dto.FetchConsumptionSalevsDetailsDTO;
import com.hms.dto.SubInventoryDTO;
//import com.hms.ehat.dto.AdminCityDTO;
import com.hms.inventory.dto.AbcAnalysisMasterDto;
import com.hms.inventory.dto.CategoryDTOM;
import com.hms.inventory.dto.ChargeMasterDTO;
import com.hms.inventory.dto.CompanyMasterDTO;
import com.hms.inventory.dto.DocumentMasterDto;
import com.hms.inventory.dto.FinancialYearDto;
import com.hms.inventory.dto.FormDTOM;
import com.hms.inventory.dto.HospitalDetailsDto;
import com.hms.inventory.dto.InventoryDocumentNumberMDTO;
import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.MaintenanceContractMasterDto;
import com.hms.inventory.dto.ManufacturerMDTO;
import com.hms.inventory.dto.PackingMasterDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.SactionFormDTO;
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.inventory.dto.TermsAndCondtionDTO;
import com.hms.inventory.dto.UnitMasterDTONew;
import com.hms.inventory.dto.WarehouseMasterDto;
import com.hms.inventory.service.InventoryServiceM;

@Controller
@RequestMapping(value="/inventoryM")
public class InventoryControllerM {
	
	static Logger log=Logger.getLogger(InventoryControllerM.class.getName());
	
	@Autowired
	private InventoryServiceM inventoryServiceM;
	@Autowired
	private WarehouseMasterDto warehouseMasterDto;
	@Autowired
	private FinancialYearDto financialYearDto;
	@Autowired
	private PackingMasterDto packingMasterDto;
	@Autowired
	private SubInventoryMasterDto subInventoryMasterDto;
	@Autowired
	private AbcAnalysisMasterDto analysysMasterDto;
	@Autowired
	private MaintenanceContractMasterDto maintenanceContractMasterDto;
	
	/**
	 * @author:- Rohit
	 * @since:- 23-10-2019
	 * @codeFor:- Below method is written for to save the financial master record to respective table
	 * @param financialYearDAO
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/saveFinancialYearDetails",method = RequestMethod.POST)
	@ResponseBody
	public int saveFinancialYearDetails(FinancialYearDto financialYearDAO,HttpServletRequest request)
	{
		int response = inventoryServiceM.saveorUpdateFinancialMaster(financialYearDAO, request);
		
		log.debug("this is for saveFinancialYearDetails "+response);
		return response;
	}
	/**
	 * @author:- Rohit
	 * @since:- 23-10-2019
	 * @codeFor:- Below method is written for to get the all the records from financial master table
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllFinancialMasterRecords", method = RequestMethod.GET)
	public @ResponseBody
	FinancialYearDto getAllFinancialMasterRecords(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<FinancialYearDto> lstFinancialMaster = new ArrayList<FinancialYearDto>();
		lstFinancialMaster = inventoryServiceM.getAllFinancialMaster(request,unitId);
		financialYearDto.setLstFinancialMaster(lstFinancialMaster);
		log.debug("this is for getAllFinancialMasterRecords "+financialYearDto);
		return financialYearDto;
	}	
	/**
	 * @since : 23-10-2019
	 * @author: Rohit Sandbhor
	 * @codeFor: This code is created for editng the financial master details w.r.t to id
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/editFinancialMaster", method = RequestMethod.GET)
	public @ResponseBody
	FinancialYearDto editFinancialMaster(@RequestParam("id") Integer id) {
		financialYearDto = inventoryServiceM.editFinancialMaster(id);	
		log.debug("this is for editFinancialMaster "+financialYearDto);
		return financialYearDto;
	}
	
	/**
	 * 
	 * @param id
	 * @param request
	 * @since 24-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor This method is created for disable the records from financial master table w.r.t id
	 * @return
	 */
	
	@RequestMapping(value = "/deleteFinancialMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteFinancialMaster(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteFinancialMaster(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		log.debug("this is for deleteFinancialMaster "+response);
		return msg;
	}	
	/**
	 * @since 24-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for getting the financial year details by passing year as paramater
	 * @param year
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getFinancialYearDetails",method = RequestMethod.POST)
	@ResponseBody
	public FinancialYearDto searchByYear(@RequestParam("year") String year,HttpServletRequest request){
		List<FinancialYearDto> lstFinancialMaster = new ArrayList<FinancialYearDto>();
		lstFinancialMaster = inventoryServiceM.searchByYear(year, request);
		financialYearDto.setLstFinancialMaster(lstFinancialMaster);
		log.debug("this is for getFinancialYearDetails "+financialYearDto);
		return financialYearDto;
	}
	
	/**
	 * @author:- Rohit
	 * @since:- 23-10-2019
	 * @codeFor:- Below method is written for to save the warehouse master record to respective table
	 * @param warehouseMasterDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/saveWarehouseMasterDetails",method = RequestMethod.POST)
	@ResponseBody
	public int saveWarehouseMasterDetails(WarehouseMasterDto warehouseMasterDto,HttpServletRequest request)
	{
		int response = inventoryServiceM.saveorUpdateWarehouseMaster(warehouseMasterDto, request);
		log.debug("this is for saveWarehouseMasterDetails "+response);
		return response;
	}
	/**
	 * @author:- Rohit
	 * @since:- 25-10-2019
	 * @codeFor:- Below method is written for to get the all the records from financial master table
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllWarehouseMasterRecords", method = RequestMethod.GET)
	public @ResponseBody
	WarehouseMasterDto getAllWarehouseMasterRecords(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<WarehouseMasterDto> lstWarehouseMaster = new ArrayList<WarehouseMasterDto>();
		lstWarehouseMaster = inventoryServiceM.getAllWarehouseMaster(request,unitId);
		warehouseMasterDto.setLstWarehouseMaster(lstWarehouseMaster);
		log.debug("this is for getAllWarehouseMasterRecords "+warehouseMasterDto);
		return warehouseMasterDto;
	}
	
	/**
	 * @since : 25-10-2019
	 * @author: Rohit Sandbhor
	 * @codeFor: This code is created for editing the warehouse master details w.r.t to id
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/editWarehouseMaster", method = RequestMethod.GET)
	public @ResponseBody
	WarehouseMasterDto editWarehouseMaster(@RequestParam("id") Integer id) {
	    warehouseMasterDto = inventoryServiceM.editWarehouseMaster(id);	
	    log.debug("this is for editWarehouseMaster "+warehouseMasterDto);
		return warehouseMasterDto;
	}
	
	/**
	 * 
	 * @param id
	 * @param request
	 * @since 25-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor This method is created for disable the records from warehouse master table w.r.t id
	 * @return
	 */
	
	@RequestMapping(value = "/deleteWarehouseMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteWarehouseMaster(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteWarehouseMaster(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		log.debug("this is for deleteWarehouseMaster "+response);
		return msg;
	}
	
	/**
	 * @since 25-10-2019
	 * @author Rohit Sanndbhor
	 * @param warehouseName
	 * @return
	 */
	@RequestMapping(value = "/autoFillSearchOnWarehouse", method = RequestMethod.POST)
	 @ResponseBody
	public WarehouseMasterDto autoFillSearchOnWarehouse(@RequestParam("warehouseName") String warehouseName) {
		warehouseMasterDto = inventoryServiceM.autoSuggestionsOnWarehouseName(warehouseName);
		log.debug("this is for autoFillSearchOnWarehouse "+warehouseMasterDto);
		return warehouseMasterDto;
	}
	
	/**
	 * @since 25-10-2019
	 * @author Rohit Sanndbhor
	 * @codeFor below method is created for getting the warehouse details by passing id as parameter
	 * @param year
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getWarehouseDetails",method = RequestMethod.POST)
	@ResponseBody
	public WarehouseMasterDto getWarehouseDetails(@RequestParam("id") Integer id,HttpServletRequest request){
		List<WarehouseMasterDto> lstWarehouseMaster = new ArrayList<WarehouseMasterDto>();
		lstWarehouseMaster = inventoryServiceM.searchByWarehouseId(id, request);
		warehouseMasterDto.setLstWarehouseMaster(lstWarehouseMaster);
		
		log.debug("this is for getWarehouseDetails "+warehouseMasterDto);
		
		return warehouseMasterDto;
	}
	
	/**
	 * @author:- Rohit
	 * @since:- 30-10-2019
	 * @codeFor:- Below method is written for to save the packing master record to respective table
	 * @param packingMasterDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/savePackingMasterDetails",method = RequestMethod.POST)
	@ResponseBody
	public int savePackingMasterDetails(PackingMasterDto packingMasterDto,HttpServletRequest request)
	{
		int response = inventoryServiceM.saveorUpdatePackingMaster(packingMasterDto, request);
		log.debug("this is for savePackingMasterDetails "+response);
		return response;
	}
	/**
	 * @author:- Rohit
	 * @since:- 30-10-2019
	 * @codeFor:- Below method is written for to get the all the records from packing master table
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllPackingMasterRecords", method = RequestMethod.GET)
	public @ResponseBody
	PackingMasterDto getAllPackingMasterRecords(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<PackingMasterDto> lstPackingMaster = new ArrayList<PackingMasterDto>();
		lstPackingMaster = inventoryServiceM.getAllPackingMaster(request,unitId);
		packingMasterDto.setLstPackingMaster(lstPackingMaster);
		
		log.debug("this is for getAllPackingMasterRecords "+packingMasterDto);
		
		return packingMasterDto;
	}
	
	/**
	 * @since : 30-10-2019
	 * @author: Rohit Sandbhor
	 * @codeFor: This code is created for editing the packing master details w.r.t to id
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/editPackingMaster", method = RequestMethod.GET)
	public @ResponseBody
	PackingMasterDto editPackingMaster(@RequestParam("id") Integer id) {
		packingMasterDto = inventoryServiceM.editPackingMaster(id);	
		
		log.debug("this is for editPackingMaster "+packingMasterDto);
		
		return packingMasterDto;
	}
	
	/**
	 * 
	 * @param id
	 * @param request
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor This method is created for disable the records from packing master table w.r.t id
	 * @return
	 */
	
	@RequestMapping(value = "/deletePackingMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deletePackingMaster(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = inventoryServiceM.deletePackingMaster(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		
		log.debug("this is for deletePackingMaster "+response);
		
		return msg;
	}
	
	/**
	 * @since 30-10-2019
	 * @author Rohit Sanndbhor
	 * @param packingName
	 * @return
	 */
	@RequestMapping(value = "/autoFillSearchOnPacking", method = RequestMethod.POST)
	 @ResponseBody
	public PackingMasterDto autoFillSearchOnPacking(@RequestParam("packingName") String packingName) {
		packingMasterDto = inventoryServiceM.autoSuggestionsOnPackingName(packingName);	
		
		log.debug("this is for autoFillSearchOnPacking "+packingMasterDto);
		
		return packingMasterDto;
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sanndbhor
	 * @codeFor below method is created for getting the packing details by passing id as parameter
	 * @param year
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getPackingDetails",method = RequestMethod.POST)
	@ResponseBody
	public PackingMasterDto getPackingDetails(@RequestParam("id") Integer id,HttpServletRequest request){
		List<PackingMasterDto> lstPackingMaster = new ArrayList<PackingMasterDto>();
		lstPackingMaster = inventoryServiceM.searchByPackingId(id, request);
		packingMasterDto.setLstPackingMaster(lstPackingMaster);
		
		log.debug("this is for getPackingDetails "+packingMasterDto);
		
		return packingMasterDto;
	}
	/**
	 * @author:- Rohit
	 * @since:- 30-10-2019
	 * @codeFor:- Below method is written for to save the sub-inventory master record to respective table
	 * @param subInventoryMasterDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/saveSubInventoryMasterDetails",method = RequestMethod.POST)
	@ResponseBody
	public int savePackingMasterDetails(SubInventoryMasterDto subInventoryMasterDto,HttpServletRequest request)
	{
		int response = inventoryServiceM.saveorUpdateSubInventoryMaster(subInventoryMasterDto, request);
		
		log.debug("this is for saveSubInventoryMasterDetails "+response);
		
		return response;
	}
	/**
	 * @author:- Rohit
	 * @since:- 30-10-2019
	 * @codeFor:- Below method is written for to get the all the records from sub-inventory master table
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllSubInventoryMasterRecords", method = RequestMethod.GET)
	public @ResponseBody
	SubInventoryMasterDto getAllSubInventoryMasterRecords(HttpServletRequest request) {
		Integer count = inventoryServiceM.getPageCountAllSubinventoryMaster();
		List<SubInventoryMasterDto> lstSubInventoryMaster = new ArrayList<SubInventoryMasterDto>();
		lstSubInventoryMaster = inventoryServiceM.getAllSubInventoryMaster(request);
		subInventoryMasterDto.setLstSubInventoryMaster(lstSubInventoryMaster);
		subInventoryMasterDto.setNoOfPages(count);
		
		log.debug("this is for getAllSubInventoryMasterRecords "+subInventoryMasterDto);
		
		return subInventoryMasterDto;
	}
	/**
	 * @since : 30-10-2019
	 * @author: Rohit Sandbhor
	 * @codeFor: This code is created for editing the sub-inventory master details w.r.t to id
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/editSubInventoryMaster", method = RequestMethod.GET)
	public @ResponseBody
	SubInventoryMasterDto editSubInventoryMaster(@RequestParam("id") Integer id) {
		subInventoryMasterDto = inventoryServiceM.editSubInventoryMaster(id);	

		log.debug("this is for editSubInventoryMaster "+subInventoryMasterDto);
		
		return subInventoryMasterDto;
	}
	/**
	 * 
	 * @param id
	 * @param request
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor This method is created for disable the records from sub-inventory master table w.r.t id
	 * @return
	 */
	
	@RequestMapping(value = "/deleteSubInventoryMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteSubInventoryMaster(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteSubInventoryMaster(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		
		log.debug("this is for deleteSubInventoryMaster "+response);
		
		return msg;
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sanndbhor
	 * @param packingName
	 * @return
	 */
	@RequestMapping(value = "/autoFillSearchOnSubInventory", method = RequestMethod.POST)
	 @ResponseBody
	public SubInventoryMasterDto autoFillSearchOnSubInventory(@RequestParam("subInventoryName") String subInventoryName) {
		subInventoryMasterDto = inventoryServiceM.autoSuggestionsOnSubInventoryName(subInventoryName);	
		
		log.debug("this is for autoFillSearchOnSubInventory "+subInventoryMasterDto);
		
		return subInventoryMasterDto;
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sanndbhor
	 * @codeFor below method is created for getting the sub-inventory details by passing id as parameter
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getSubInventoryDetails",method = RequestMethod.POST)
	@ResponseBody
	public SubInventoryMasterDto getSubInventoryDetails(@RequestParam("id") Integer id,HttpServletRequest request){
		List<SubInventoryMasterDto> lstSubInventoryMaster = new ArrayList<SubInventoryMasterDto>();
		lstSubInventoryMaster = inventoryServiceM.searchBySubInventoryId(id, request);
		subInventoryMasterDto.setLstSubInventoryMaster(lstSubInventoryMaster);
		
		log.debug("this is for getSubInventoryDetails "+subInventoryMasterDto);
		
		return subInventoryMasterDto;
	}
	/**
	 * @author:- Rohit
	 * @since:- 31-10-2019
	 * @codeFor:- Below method is written for to save the abc range analysis master record to respective table
	 * @param analysysMasterDto
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/saveAbcRangeAnalysisMasterDetails",method = RequestMethod.POST)
	@ResponseBody
	public int saveAbcRangeAnalysisMasterDetails(AbcAnalysisMasterDto analysysMasterDto,HttpServletRequest request)
	{
		int response = inventoryServiceM.saveorUpdateAbcRangeAnalysisMaster(analysysMasterDto, request);
		
		log.debug("this is for saveAbcRangeAnalysisMasterDetails "+response);
		
		return response;
	}
	/**
	 * @author:- Rohit
	 * @since:- 31-10-2019
	 * @codeFor:- Below method is written for to get the all the records from abc range analysis master table
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllAbcAnalysisMasterRecords", method = RequestMethod.GET)
	public @ResponseBody
	AbcAnalysisMasterDto getAllAbcAnalysisMasterRecords(HttpServletRequest request) {
		List<AbcAnalysisMasterDto> lstAbcAnalysisMaster = new ArrayList<AbcAnalysisMasterDto>();
		lstAbcAnalysisMaster = inventoryServiceM.getAllAbcRangeAnalysisMaster(request);
		analysysMasterDto.setLstAbcAnalysysMaster(lstAbcAnalysisMaster);
		
		log.debug("this is for saveAbcRangeAnalysisMasterDetails "+analysysMasterDto);
		
		return analysysMasterDto;
	}
	/**
	 * @since : 31-10-2019
	 * @author: Rohit Sandbhor
	 * @codeFor: This code is created for editing the abc range analysis master details w.r.t to id
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/editAbcAnalysisMaster", method = RequestMethod.GET)
	public @ResponseBody
	AbcAnalysisMasterDto editAbcAnalysisMaster(@RequestParam("id") Integer id) {
		analysysMasterDto = inventoryServiceM.editAbcRangeAnalysisMaster(id);
		
		log.debug("this is for editAbcAnalysisMaster "+analysysMasterDto);
		
		return analysysMasterDto;
	}
	/**
	 * @param id
	 * @param request
	 * @since 31-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor This method is created for disable the records from abc range analysis master table w.r.t id
	 * @return
	 */
	@RequestMapping(value = "/deleteAbcAnalysisMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteAbcAnalysisMaster(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteAbcRangeAnalysisMaster(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		log.debug("this is for deleteAbcAnalysisMaster "+response);
		return msg;
	}
	/**
	 * @since 31-10-2019
	 * @author Rohit Sanndbhor
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/autoFillSearchOnAbcAnalysis", method = RequestMethod.POST)
	 @ResponseBody
	public AbcAnalysisMasterDto autoFillSearchOnAbcAnalysis(@RequestParam("id") Integer id) {
		analysysMasterDto = inventoryServiceM.autoSuggestionsOnAbcRangeAnalysisId(id);	
		
		log.debug("this is for autoFillSearchOnAbcAnalysis "+analysysMasterDto);
		
		return analysysMasterDto;
	}
	/**
	 * @since 31-10-2019
	 * @author Rohit Sanndbhor
	 * @codeFor below method is created for getting the sub-inventory details by passing id as parameter
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getAbcAnalysisDetails",method = RequestMethod.POST)
	@ResponseBody
	public AbcAnalysisMasterDto getAbcAnalysisDetails(@RequestParam("id") Integer id,HttpServletRequest request){
		List<AbcAnalysisMasterDto> lstAbcAnalysisMaster = new ArrayList<AbcAnalysisMasterDto>();
		lstAbcAnalysisMaster = inventoryServiceM.searchByAbcRangeAnalysisId(id, request);
		analysysMasterDto.setLstAbcAnalysysMaster(lstAbcAnalysisMaster);
		
		log.debug("this is for getAbcAnalysisDetails "+analysysMasterDto);
		
		return analysysMasterDto;
	}
	@RequestMapping(value = "/saveDocumentMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveDocumentMaster(DocumentMasterDto documentMasterDto,
			HttpServletRequest request) {
		int status = inventoryServiceM.saveDocumentMaster(documentMasterDto,request);
		
		log.debug("this is for saveDocumentMaster "+status);
		
		return status;	
	}	
	
	@RequestMapping(value = "/getAllDocumentMaster", method = RequestMethod.GET)
	@ResponseBody
	public DocumentMasterDto getAllDocumentMaster(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<DocumentMasterDto> documentMasterDtoList = new ArrayList<DocumentMasterDto>();
		documentMasterDtoList = inventoryServiceM.getAllDocumentMaster(request,unitId);
		DocumentMasterDto documentMasterDto =new DocumentMasterDto();
		documentMasterDto.setDocumentMasterDto(documentMasterDtoList);

		log.debug("this is for getAllDocumentMaster "+documentMasterDto);
		
		return documentMasterDto;	
	}	
	
	
	@RequestMapping(value = "/editDocumentMaster", method = RequestMethod.GET)
	@ResponseBody
	public DocumentMasterDto editDocumentMaster(@RequestParam("doc_id") Integer doc_id) {
		DocumentMasterDto documentMasterDto =new DocumentMasterDto();
		 documentMasterDto = inventoryServiceM.editDocumentMaster(doc_id);
		 
		 log.debug("this is for editDocumentMaster "+documentMasterDto);
		 
		return documentMasterDto;	
	}	
	
	@RequestMapping(value = "/deleteDocumentMaster", method = RequestMethod.POST)
	@ResponseBody
	public String deleteDocumentMaster(@RequestParam("doc_id") Integer doc_id,
			HttpServletRequest request) {
		boolean status = inventoryServiceM.deleteDocumentMaster(doc_id,request);
		String message = "";
		if(status == true){
			message ="Records Deleted Sucessfully";
		}else{
			message ="Something went wrong...";
		}
		
		log.debug("this is for deleteDocumentMaster "+status);
		
		return message;	
	}	
	
	
	@RequestMapping(value = "/searchDocumentMaster", method = RequestMethod.GET)
	@ResponseBody
	public DocumentMasterDto searchDocumentMaster(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<DocumentMasterDto> documentMasterDtoList = new ArrayList<DocumentMasterDto>();
		documentMasterDtoList = inventoryServiceM.getAllDocumentMaster(request,unitId);
		DocumentMasterDto documentMasterDto =new DocumentMasterDto();
		documentMasterDto.setDocumentMasterDto(documentMasterDtoList);
		
		log.debug("this is for searchDocumentMaster "+documentMasterDto);
		
		return documentMasterDto;	
	}
	
	@RequestMapping(value = "/inventoryDocumentAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public DocumentMasterDto inventoryDocumentAutoSuggestion(@RequestParam("docName") String docName, @RequestParam("callFrom") String callFrom) {
		 
		DocumentMasterDto documentMasterDto = new  DocumentMasterDto();
		documentMasterDto = inventoryServiceM.inventoryDocumentAutoSuggestion(docName, callFrom);	
		
		log.debug("this is for inventoryDocumentAutoSuggestion "+documentMasterDto);
		
		return documentMasterDto;
	}
	
	@RequestMapping(value = "/getAllDocumentById", method = RequestMethod.GET)
	@ResponseBody
	public DocumentMasterDto getAllDocumentById(@RequestParam("doc_id") Integer doc_id) {
		DocumentMasterDto documentMasterDto =new DocumentMasterDto();
		 documentMasterDto = inventoryServiceM.getAllDocumentById(doc_id);
		 
		 log.debug("this is for getAllDocumentById "+documentMasterDto);
		 
		return documentMasterDto;	
	}
	
	@RequestMapping(value = "/saveDocNumberMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveDocNumberMaster(InventoryDocumentNumberMDTO invnumObj,HttpServletRequest request) {
		int response = inventoryServiceM.saveDocNumberMaster(invnumObj, request);
		
		 log.debug("this is for saveDocNumberMaster "+response);
		
		return response;	
	}
	
	@RequestMapping(value = "/getAllInventoryNUmberDoc", method = RequestMethod.POST)
	public @ResponseBody
	InventoryDocumentNumberMDTO getAllInventoryNUmberDoc(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<InventoryDocumentNumberMDTO> ltdocnumMasters = new ArrayList<InventoryDocumentNumberMDTO>();
		ltdocnumMasters = inventoryServiceM.getAllInventoryNUmberDoc(request,unitId);
		InventoryDocumentNumberMDTO obj = new InventoryDocumentNumberMDTO();
		obj.setLstDocumentNumberDTO(ltdocnumMasters);
		
		 log.debug("this is for getAllInventoryNUmberDoc "+obj);
		 
		return obj;
	}	
	
	@RequestMapping(value = "/editNumberDoc", method = RequestMethod.GET)
	public @ResponseBody
	InventoryDocumentNumberMDTO editNumberDoc(@RequestParam("docId") Integer docId) {
		InventoryDocumentNumberMDTO obj = new InventoryDocumentNumberMDTO();
		obj = inventoryServiceM.editInventoryDocNumber(docId);	
		
		 log.debug("this is for editNumberDoc "+obj);
		 
		return obj;
	}
	@RequestMapping(value = "/deleteNumberDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteNumberDoc(@RequestParam("docId") Integer docId,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteInventoryNumberDoc(docId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		
		 log.debug("this is for deleteNumberDoc "+response);
		 
		return msg;
	}
	@RequestMapping(value = "/saveTaxMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveTaxMaster(InventoryTaxSetUpMDTO invtaxObj,HttpServletRequest request) {
		int response = inventoryServiceM.saveTaxMaster(invtaxObj, request);
		
		 log.debug("this is for saveTaxMaster "+response);
		 
		return response;	
	}
	
	@RequestMapping(value = "/getAllInventoryTaxDoc", method = RequestMethod.POST)
	public @ResponseBody
	InventoryTaxSetUpMDTO getAllInventoryTaxDoc(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<InventoryTaxSetUpMDTO> ltdocnumMasters = new ArrayList<InventoryTaxSetUpMDTO>();
		ltdocnumMasters = inventoryServiceM.getAllInventoryTaxDoc(request,unitId);
		InventoryTaxSetUpMDTO obj = new InventoryTaxSetUpMDTO();
		obj.setLstinventoryTaxSetUps(ltdocnumMasters);
		
		 log.debug("this is for getAllInventoryTaxDoc "+obj);
		 
		return obj;
	}
	
	@RequestMapping(value = "/editTaxDoc", method = RequestMethod.GET)
	public @ResponseBody
	InventoryTaxSetUpMDTO editTaxDoc(@RequestParam("taxId") Integer taxId) {
		InventoryTaxSetUpMDTO obj = new InventoryTaxSetUpMDTO();
		obj = inventoryServiceM.editInventoryTaxDoc(taxId);	
		
		 log.debug("this is for editTaxDoc "+obj);
		 
		return obj;
	}
	@RequestMapping(value = "/deleteTaxDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteTaxDoc(@RequestParam("taxId") Integer taxId,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteInventoryTaxDoc(taxId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		
		log.debug("this is for deleteTaxDoc "+response);
		
		return msg;
	}
	
	@RequestMapping(value = "/saveCategoryMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveCategoryMaster(CategoryDTOM catObj,HttpServletRequest request) {
		int response = inventoryServiceM.saveCategoryMaster(catObj, request);
		
		log.debug("this is for saveCategoryMaster "+response);
		
		return response;	
	}
	
	@RequestMapping(value = "/getAllInventoryCategoryDoc", method = RequestMethod.POST)
	public @ResponseBody
	CategoryDTOM getAllInventoryCategoryDoc(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<CategoryDTOM> lstcatMasters = new ArrayList<CategoryDTOM>();
		lstcatMasters = inventoryServiceM.getAllInventoryCategoryDoc(request,unitId);
		CategoryDTOM obj = new CategoryDTOM();
		obj.setLstcategoaryDoc(lstcatMasters);
		
		log.debug("this is for getAllInventoryCategoryDoc "+obj);
		
		return obj;
	}
	@RequestMapping(value = "/editCategoryDoc", method = RequestMethod.GET)
	public @ResponseBody
	CategoryDTOM editCategoryDoc(@RequestParam("catId") Integer catId) {
		CategoryDTOM obj = new CategoryDTOM();
		obj = inventoryServiceM.editInventoryCategoryDoc(catId);	
		
		log.debug("this is for editCategoryDoc "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/deleteCategoryDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteCategoryDoc(@RequestParam("catId") Integer catId,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteInventoryCategoryDoc(catId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		
		log.debug("this is for deleteCategoryDoc "+response);
		
		return msg;
	}
	@RequestMapping(value = "/saveFormMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveFormMaster( FormDTOM formObj,HttpServletRequest request) {		
		int response = inventoryServiceM.saveFormMaster(formObj, request);	
		
		log.debug("this is for saveFormMaster "+response);
		
		return response;	
	}
	@RequestMapping(value = "/getAllInventoryFormDoc", method = RequestMethod.POST)
	public @ResponseBody
	FormDTOM getAllInventoryFormDoc(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<FormDTOM> lstformMasters = new ArrayList<FormDTOM>();
		lstformMasters = inventoryServiceM.getAllInventoryFormDoc(request,unitId);
		FormDTOM obj = new FormDTOM();
		obj.setLstformDoc(lstformMasters);
		
		log.debug("this is for getAllInventoryFormDoc "+obj);

		return obj;
	}
	@RequestMapping(value = "/editFormDoc", method = RequestMethod.GET)
	public @ResponseBody
	FormDTOM editFormDoc(@RequestParam("formId") Integer formId) {
		FormDTOM obj = new FormDTOM();
		obj = inventoryServiceM.editInventoryFormDoc(formId);
		
		log.debug("this is for editFormDoc "+obj);
		
		return obj;
	}
	@RequestMapping(value = "/deleteFormDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteFormDoc(@RequestParam("formId") Integer formId,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteInventoryFormDoc(formId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		
		log.debug("this is for deleteFormDoc "+response);
		
		return msg;
	}
	@RequestMapping(value = "/saveManufacturerMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveManufacturerMaster(ManufacturerMDTO mObj,HttpServletRequest request) {
		int response = inventoryServiceM.saveManufacturerMaster(mObj, request);
		
		return response;	
	}
	@RequestMapping(value = "/getAllInventoryManufactureDoc", method = RequestMethod.POST)
	public @ResponseBody
	ManufacturerMDTO getAllInventoryManufactureDoc(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<ManufacturerMDTO> lstmMasters = new ArrayList<ManufacturerMDTO>();
		lstmMasters = inventoryServiceM.getAllInventoryManufactureDoc(request,unitId);
		ManufacturerMDTO obj = new ManufacturerMDTO();
		obj.setLtManufacturerDTO(lstmMasters);
		
		log.debug("this is for getAllInventoryManufactureDoc "+obj);
		
		return obj;
	}
	@RequestMapping(value = "/editManufactureDoc", method = RequestMethod.GET)
	public @ResponseBody
	ManufacturerMDTO editManufactureDoc(@RequestParam("mID") Integer mId) {
		ManufacturerMDTO obj = new ManufacturerMDTO();
		obj = inventoryServiceM.editInventoryManufactureDoc(mId);
		
		log.debug("this is for editManufactureDoc "+obj);
		
		return obj;
	}
	@RequestMapping(value = "/deleteManufactureDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteManufactureDoc(@RequestParam("mId") Integer mId,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteInventoryManufactureDoc(mId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		
		log.debug("this is for deleteManufactureDoc "+response);
		
		return msg;
	}
	
	@RequestMapping(value = "/saveChargeMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveChargeMaster(ChargeMasterDTO cObj,HttpServletRequest request) {
		int response = inventoryServiceM.saveChargeMaster(cObj, request);
		
		log.debug("this is for saveChargeMaster "+response);
		
		return response;	
	}
	
	@RequestMapping(value = "/getAllChargeMaster", method = RequestMethod.POST)
	public @ResponseBody
	ChargeMasterDTO getAllChargeMaster(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<ChargeMasterDTO> lstcMasters = new ArrayList<ChargeMasterDTO>();
		lstcMasters = inventoryServiceM.getAllInventoryChargeMaster(unitId);
		ChargeMasterDTO obj = new ChargeMasterDTO();
		obj.setLstchargemaster(lstcMasters);
		
		log.debug("this is for getAllChargeMaster "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/editChargeMasterDoc", method = RequestMethod.GET)
	public @ResponseBody
	ChargeMasterDTO editChargeMasterDoc(@RequestParam("chargeId") Integer chargeId) {
		ChargeMasterDTO obj = new ChargeMasterDTO();
		obj = inventoryServiceM.editInventoryChargeMaster(chargeId);
		
		log.debug("this is for editChargeMasterDoc "+obj);

		return obj;
	}
	
	@RequestMapping(value = "/deleteChargeMasterDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteChargeMasterDoc(@RequestParam("chargeId") Integer chargeId,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteInventoryChargeMaster(chargeId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		
		log.debug("this is for deleteChargeMasterDoc "+response);

		return msg;
	}
	
	@RequestMapping(value = "/inventoryChargeAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	ChargeMasterDTO inventoryChargeAutoSuggestion(@RequestParam("chargeName")String chargeName,@RequestParam("unitId") Integer unitId) {
		List<ChargeMasterDTO> lstcMasters = new ArrayList<ChargeMasterDTO>();
		lstcMasters = inventoryServiceM.getAllInventoryChargeMasterAutosuggestion(chargeName,unitId);
		ChargeMasterDTO obj = new ChargeMasterDTO();
		obj.setLstchargemaster(lstcMasters);
		
		log.debug("this is for inventoryChargeAutoSuggestion "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/saveUnitMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveUnitMaster(UnitMasterDTONew uObj,HttpServletRequest request) {
		int response = inventoryServiceM.saveUnitMaster(uObj, request);
		
		log.debug("this is for saveUnitMaster "+response);
		
		return response;	
	}
	
	@RequestMapping(value = "/getAllUnitMaster", method = RequestMethod.POST)
	public @ResponseBody
	UnitMasterDTONew getAllUnitMaster(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<UnitMasterDTONew> lstuMasters = new ArrayList<UnitMasterDTONew>();
		lstuMasters = inventoryServiceM.getAllInventoryUnitMaster(unitId);
		UnitMasterDTONew obj = new UnitMasterDTONew();
		obj.setLstunitmaster(lstuMasters);
		
		log.debug("this is for getAllUnitMaster "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/editUnitMasterDoc", method = RequestMethod.GET)
	public @ResponseBody
	UnitMasterDTONew editUnitMasterDoc(@RequestParam("uniId") Integer uniId) {
		UnitMasterDTONew obj = new UnitMasterDTONew();
		obj = inventoryServiceM.editInventoryUnitMaster(uniId);
		
		log.debug("this is for editUnitMasterDoc "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/deleteUnitMasterDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteUnitMasterDoc(@RequestParam("uniId") Integer uniId,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteInventoryUnitMaster(uniId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		
		log.debug("this is for deleteUnitMasterDoc "+response);
		
		return msg;
	}
	
	@RequestMapping(value = "/inventoryUnitAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	UnitMasterDTONew inventoryUnitAutoSuggestion(@RequestParam("unitName")String unitName) {
		List<UnitMasterDTONew> lstunitmaster = new ArrayList<UnitMasterDTONew>();
		lstunitmaster = inventoryServiceM.getAllInventoryUnitMasterAutosuggestion(unitName);
		UnitMasterDTONew obj = new UnitMasterDTONew();
		obj.setLstunitmaster(lstunitmaster);
		
		log.debug("this is for inventoryUnitAutoSuggestion "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/inventoryTaxAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	InventoryTaxSetUpMDTO inventoryTaxAutoSuggestion(@RequestParam("hsnName")String hsnName) {
		List<InventoryTaxSetUpMDTO> lsttaxmaster = new ArrayList<InventoryTaxSetUpMDTO>();
		lsttaxmaster = inventoryServiceM.getAllInventoryTaxMasterAutosuggestion(hsnName);
		InventoryTaxSetUpMDTO obj = new InventoryTaxSetUpMDTO();
		obj.setLstinventoryTaxSetUps(lsttaxmaster);
		
		log.debug("this is for inventoryTaxAutoSuggestion "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/inventoryCategoryAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	CategoryDTOM inventoryCategoryAutoSuggestion(@RequestParam("categoryName")String categoryName) {
		List<CategoryDTOM> lstcategorymaster = new ArrayList<CategoryDTOM>();
		lstcategorymaster = inventoryServiceM.getAllInventoryCategoryMasterAutosuggestion(categoryName);
		CategoryDTOM obj = new CategoryDTOM();
		obj.setLstcategoaryDoc(lstcategorymaster);
		
		log.debug("this is for inventoryCategoryAutoSuggestion "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/inventoryFormAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	FormDTOM inventoryFormAutoSuggestion(@RequestParam("formType")String formType) {
		List<FormDTOM> lstformmaster = new ArrayList<FormDTOM>();
		lstformmaster = inventoryServiceM.getAllInventoryformMasterAutosuggestion(formType);
		FormDTOM obj = new FormDTOM();
		obj.setLstformDoc(lstformmaster);
		
		log.debug("this is for inventoryCategoryAutoSuggestion "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/inventoryManufactureAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	ManufacturerMDTO inventoryManufactureAutoSuggestion(@RequestParam("manufName")String manufName) {
		List<ManufacturerMDTO> lstmanumaster = new ArrayList<ManufacturerMDTO>();
		lstmanumaster = inventoryServiceM.getAllInventoryManufactureMasterAutosuggestion(manufName);
		ManufacturerMDTO obj = new ManufacturerMDTO();
		obj.setLtManufacturerDTO(lstmanumaster);
		
		log.debug("this is for inventoryManufactureAutoSuggestion "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/saveTermAndconditionMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveTermAndconditionMaster(TermsAndCondtionDTO tObj,HttpServletRequest request) {
		int response = inventoryServiceM.saveTermAndConditionMaster(tObj, request);

		log.debug("this is for saveTermAndconditionMaster "+response);
		
		return response;	
	}
	
	@RequestMapping(value = "/getAllInventoryTermAndCondition", method = RequestMethod.POST)
	public @ResponseBody
	TermsAndCondtionDTO getAllInventoryTermAndCondition(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<TermsAndCondtionDTO> lsttMasters = new ArrayList<TermsAndCondtionDTO>();
		lsttMasters = inventoryServiceM.getAllInventoryTermAndConditionMaster(unitId);
		TermsAndCondtionDTO obj = new TermsAndCondtionDTO();
		obj.setLsttermcondition(lsttMasters);
		
		log.debug("this is for getAllInventoryTermAndCondition "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/editTermAndConditionMasterDoc", method = RequestMethod.GET)
	public @ResponseBody
	TermsAndCondtionDTO editTermAndConditionMasterDoc(@RequestParam("termconditionId") Integer termconditionId) {
		TermsAndCondtionDTO obj = new TermsAndCondtionDTO();
		obj = inventoryServiceM.editInventoryTermAndConditionMaster(termconditionId);
		
		log.debug("this is for editTermAndConditionMasterDoc "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/deleteTermAndConditionMasterDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteTermAndConditionMasterDoc(@RequestParam("termConditionId") Integer termConditionId,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteInventoryTermAndConditionMaster(termConditionId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		
		log.debug("this is for deleteTermAndConditionMasterDoc "+response);
		
		return msg;
	}
	
	@RequestMapping(value = "/inventoryTermConditionAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	TermsAndCondtionDTO inventoryTermConditionAutoSuggestion(@RequestParam("headingName")String headingName) {
		List<TermsAndCondtionDTO> lsttermmaster = new ArrayList<TermsAndCondtionDTO>();
		lsttermmaster = inventoryServiceM.getAllInventoryTermAndConditionMasterAutosuggestion(headingName);
		TermsAndCondtionDTO obj = new TermsAndCondtionDTO();
		obj.setLsttermcondition(lsttermmaster);
		
		log.debug("this is for inventoryTermConditionAutoSuggestion "+obj);
		
		return obj;
	}
	@RequestMapping(value = "/inventoryDocumentNumberAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public InventoryDocumentNumberMDTO inventoryDocumentNumberAutoSuggestion(@RequestParam("docName") String docName) {

		InventoryDocumentNumberMDTO documentNumberDto = new  InventoryDocumentNumberMDTO();
		documentNumberDto = inventoryServiceM.inventoryDocumentNumberAutoSuggestion(docName);	
		
		log.debug("this is for inventoryDocumentNumberAutoSuggestion "+documentNumberDto);
		
		return documentNumberDto;
	}	
	
	/**
	 * @since 24-10-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for save document master details 
	 */	
	@RequestMapping(value = "/saveHospitalDetails", method = RequestMethod.POST)
	@ResponseBody
	public int saveHospitalDetails(HospitalDetailsDto hospitalDetailsDto,
			HttpServletRequest request) {
		int status = inventoryServiceM.saveHospitalDetails(hospitalDetailsDto,request);
		
		log.debug("this is for saveHospitalDetails "+status);
		
		return status;	
	}	
	
	/**
	 * @since 24-10-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all document master details 
	 */	
	@RequestMapping(value = "/getAllHospitalDetails", method = RequestMethod.GET)
	@ResponseBody
	public HospitalDetailsDto getAllHospitalDetails(HttpServletRequest request) {
		List<HospitalDetailsDto> hospitalDetailsDtoList = new ArrayList<HospitalDetailsDto>();
		hospitalDetailsDtoList = inventoryServiceM.getAllHospitalDetails(request);
		HospitalDetailsDto hospitalDetailsDto =new HospitalDetailsDto();
		hospitalDetailsDto.setHospitalDetailsDto(hospitalDetailsDtoList);
		
		log.debug("this is for getAllHospitalDetails "+hospitalDetailsDto);
		
		return hospitalDetailsDto;	
	}	
	
	/**
	 * @since 24-10-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for edit hospital Details 
	 */
	@RequestMapping(value = "/editHospitalDetails", method = RequestMethod.GET)
	@ResponseBody
	public HospitalDetailsDto editHospitalDetails(@RequestParam("hospital_id") Integer hospital_id) {
		HospitalDetailsDto hospitalDetailsDto =new HospitalDetailsDto();
		hospitalDetailsDto = inventoryServiceM.editHospitalDetails(hospital_id);
		
		log.debug("this is for editHospitalDetails "+hospitalDetailsDto);
		
		return hospitalDetailsDto;	
	}	
	/**
	 * @since 24-10-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for delete hospital Details 
	 */
	@RequestMapping(value = "/deleteHospitalDetails", method = RequestMethod.POST)
	@ResponseBody
	public String deleteHospitalDetails(@RequestParam("hospital_id") Integer hospital_id,
			HttpServletRequest request) {
		boolean status = inventoryServiceM.deleteHospitalDetails(hospital_id,request);
		String message = "";
		if(status == true){
			message ="Records Deleted Sucessfully";
		}else{
			message ="Something went wrong...";
		}
		
		log.debug("this is for deleteHospitalDetails "+status);
		
		return message;	
	}	
	
	/**
	 * @since 24-10-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for auto suggest while document master search details 
	 */	
	@RequestMapping(value = "/hospitalDetailsAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public HospitalDetailsDto hospitalDetailsAutoSuggestion(@RequestParam("hospitalName") String hospitalName, @RequestParam("callFrom") String callFrom) {
		 
		HospitalDetailsDto hospitalDetailsDto =new HospitalDetailsDto();
		hospitalDetailsDto = inventoryServiceM.hospitalDetailsAutoSuggestion(hospitalName, callFrom);	
		
		log.debug("this is for hospitalDetailsAutoSuggestion "+hospitalDetailsDto);
		
		return hospitalDetailsDto;
	}
	
	@RequestMapping(value = "/getAllHospitalDetailsById", method = RequestMethod.GET)
	@ResponseBody
	public HospitalDetailsDto getAllHospitalDetailsById(@RequestParam("hospital_id") Integer hospital_id) {
		HospitalDetailsDto hospitalDetailsDto =new HospitalDetailsDto();
		hospitalDetailsDto = inventoryServiceM.getAllHospitalDetailsById(hospital_id);
		
		log.debug("this is for getAllHospitalDetailsById "+hospitalDetailsDto);
		
		return hospitalDetailsDto;	
	}
	
	@RequestMapping(value = "/saveCompanyMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveCompanyMaster(CompanyMasterDTO cObj,HttpServletRequest request) {
		int response = inventoryServiceM.saveCompanyMaster(cObj, request);
		
		log.debug("this is for saveCompanyMaster "+response);
		
		return response;	
	}
	
	@RequestMapping(value = "/getAllInventoryCompanyDoc", method = RequestMethod.POST)
	public @ResponseBody
	CompanyMasterDTO getAllInventoryCompanyDoc(HttpServletRequest request) {
		List<CompanyMasterDTO> lstcMasters = new ArrayList<CompanyMasterDTO>();
		lstcMasters = inventoryServiceM.getAllInventoryCompanyMaster();
		CompanyMasterDTO obj = new CompanyMasterDTO();
		obj.setLstcompanydoc(lstcMasters);
		
		log.debug("this is for getAllInventoryCompanyDoc "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/editCompanyMasterDoc", method = RequestMethod.GET)
	public @ResponseBody
	CompanyMasterDTO editCompanyMasterDoc(@RequestParam("companyId") Integer companyId) {
		CompanyMasterDTO obj = new CompanyMasterDTO();
		obj = inventoryServiceM.editInventoryCompanyMaster(companyId);
		
		log.debug("this is for editCompanyMasterDoc "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/deleteComanyMasterDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteComanyMasterDoc(@RequestParam("companyId") Integer companyId,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteInventoryCompanyMaster(companyId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		
		log.debug("this is for deleteComanyMasterDoc "+response);
		
		return msg;
	}
	
	@RequestMapping(value = "/inventoryCompanyAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	CompanyMasterDTO inventoryCompanyAutoSuggestion(@RequestParam("companyName")String companyName) {
		List<CompanyMasterDTO> lstcmaster = new ArrayList<CompanyMasterDTO>();
		lstcmaster = inventoryServiceM.getAllInventoryComapnyMasterAutosuggestion(companyName);
		CompanyMasterDTO obj = new CompanyMasterDTO();
		obj.setLstcompanydoc(lstcmaster);
		
		log.debug("this is for inventoryCompanyAutoSuggestion "+obj);
		
		return obj;
	}	
	/**
	 * @since 04-11-2019
	 * @author Rohit Sanndbhor
	 * @codeFor below method is created for getting the warehouse details by passing name as parameter
	 * @param year
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getWarehouseDetailsByName",method = RequestMethod.POST)
	@ResponseBody
	public WarehouseMasterDto getWarehouseDetailsByName(@RequestParam("warehouseName") String warehouseName,HttpServletRequest request){
		List<WarehouseMasterDto> lstWarehouseMaster = new ArrayList<WarehouseMasterDto>();
		lstWarehouseMaster = inventoryServiceM.searchByWarehouseName(warehouseName, request);
		warehouseMasterDto.setLstWarehouseMaster(lstWarehouseMaster);
		
		log.debug("this is for getWarehouseDetailsByName "+warehouseMasterDto);
		
		return warehouseMasterDto;
	}	
	
	
	
	@RequestMapping(value = "/getAllStateMaster", method = RequestMethod.GET)
	public @ResponseBody
	district_taluka_city getAllStateMaster(HttpServletRequest request) {
		List<district_taluka_city> lststate = new ArrayList<district_taluka_city>();
		lststate = inventoryServiceM.getAllStateMaster(request);
		district_taluka_city obj=new district_taluka_city();
		obj.setstateList(lststate);
		
		log.debug("this is for getAllStateMaster "+obj);
		
		return obj;
	}
	

	@RequestMapping(value = "/getAllDistrictByStateId", method = RequestMethod.GET)
	public @ResponseBody
	district_taluka_city getAllDistrictByStateId(@RequestParam("stateId") Integer stateId,HttpServletRequest request) {
		List<district_taluka_city> districtList = new ArrayList<district_taluka_city>();
		districtList = inventoryServiceM.getAllDistrictByStateId(stateId);
		district_taluka_city obj=new district_taluka_city();
		obj.setdistrictList(districtList);
		
		log.debug("this is for getAllDistrictByStateId "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/getAllTalukaBydDistictId", method = RequestMethod.GET)
	public @ResponseBody
	district_taluka_city getAllTalukaBydDistictId(@RequestParam("districtId") Integer districtId,HttpServletRequest request) {
		List<district_taluka_city> talukaList = new ArrayList<district_taluka_city>();
		talukaList = inventoryServiceM.getAllTalukaBydDistictId(districtId);
		district_taluka_city obj=new district_taluka_city();
		obj.settalukaList(talukaList);
		
		log.debug("this is for getAllTalukaBydDistictId "+obj);
		
		return obj;
	}
	
	
	@RequestMapping(value = "/getAllCityByTalukaId", method = RequestMethod.GET)
	public @ResponseBody
	district_taluka_city getAllCityByTalukaId(@RequestParam("talukaId") Integer talukaId,HttpServletRequest request) {
		List<district_taluka_city> cityList = new ArrayList<district_taluka_city>();
		cityList = inventoryServiceM.getAllCityByTalukaId(talukaId);
		district_taluka_city obj=new district_taluka_city();
		obj.setcityList(cityList);
		
		log.debug("this is for getAllCityByTalukaId "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/inventoryFinancialYearAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	FinancialYearDto inventoryFinancialYearAutoSuggestion(@RequestParam("year")String year) {
		List<FinancialYearDto> lstFinancialMaster = new ArrayList<FinancialYearDto>();
		lstFinancialMaster = inventoryServiceM.inventoryFinancialYearAutoSuggestion(year);
				FinancialYearDto obj = new FinancialYearDto();
		obj.setLstFinancialMaster(lstFinancialMaster);
		
		log.debug("this is for inventoryFinancialYearAutoSuggestion "+obj);
		
		return obj;
	}	
	
	@RequestMapping(value="/saveSanctionMaster",method = RequestMethod.POST)
	@ResponseBody
	public int saveSanctionMaster(SactionFormDTO sactionobj,HttpServletRequest request)
	{
		System.err.println("inside controller");
		int response = inventoryServiceM.saveSanctionMaster(sactionobj, request);
		
		log.debug("this is for saveSanctionMaster "+response);
		
		return response;
	}
	
	@RequestMapping(value = "/getAllSanctionMaster", method = RequestMethod.POST)
	public @ResponseBody
	SactionFormDTO getAllSanctionMaster(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<SactionFormDTO> lstsactionform = new ArrayList<SactionFormDTO>();
		lstsactionform = inventoryServiceM.getAllSanctionMaster(request,unitId);
		SactionFormDTO obj = new SactionFormDTO();
		obj.setLstsactionform(lstsactionform);
		
		log.debug("this is for getAllSanctionMaster "+obj);

		return obj;
	}
	
	@RequestMapping(value = "/editSactionMaster", method = RequestMethod.GET)
	public @ResponseBody
	SactionFormDTO editSactionMaster(@RequestParam("sanctionId") Integer sanctionId) {
		
		SactionFormDTO obj=new SactionFormDTO();
		obj = inventoryServiceM.editSactionMaster(sanctionId);	
		
		log.debug("this is for editSactionMaster "+obj);
		
		return obj;
	}
	
	@RequestMapping(value = "/deleteSactionMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteSactionMaster(@RequestParam("sanctionId") Integer sanctionId,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteSactionMaster(sanctionId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		
		log.debug("this is for deleteSactionMaster "+response);
		
		return msg;
	}
	
	/**
	 * @since 21-03-2020
	 * @comment This function is created for to fetchHospitalState
	 * @author Rohit Sandbhor 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/fetchHospitalState", method = RequestMethod.POST)
	public @ResponseBody
	Integer fetchhospitalstate(HttpServletRequest request) {
		int response = inventoryServiceM.fetchHospitalState(request);
		
		log.debug("this is for fetchHospitalState "+response);
		
		return response;
	}
	
	/**
	 * @since 21-03-2020
	 * @comment This function is created for to getSubInventoryMasterPagination
	 * @author Rohit Sandbhor
	 * @param startIndex
	 * @return
	 */
	@RequestMapping(value = "/getSubInventoryMasterPagination", method = RequestMethod.POST)
	public @ResponseBody SubInventoryMasterDto getSubInventoryMasterPagination(@RequestParam("startIndex") Integer startIndex) {
		
		log.debug("this is for getSubInventoryMasterPagination ");
		
		return inventoryServiceM.getSubInventoryMasterPagination(startIndex);
	}
	
	
	/**
	 * @since 21-04-2020
	 * @comment This function is created for to getPartyMasterPagination
	 * @author Dayanand Khandekar
	 * @param startIndex
	 * @return
	 */
	@RequestMapping(value = "/getPartyMasterPagination", method = RequestMethod.POST)
	public @ResponseBody PartyMasterDto getPartyMasterPagination(@RequestParam("startIndex") Integer startIndex) {
		
		log.debug("this is for getPartyMasterPagination ");
		
		return inventoryServiceM.getPartyMasterPagination(startIndex);
	}
	
	/**
	 * @author:- Rohit Sandbhor
	 * @since:- 14-07-2020
	 * @codeFor:- Below method is written for to save the maintenance contract master record to respective table
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/saveMaintenanceContractMaster",method = RequestMethod.POST)
	@ResponseBody
	public int saveMaintenanceContractMaster(MaintenanceContractMasterDto maintenanceContractMasterDto,HttpServletRequest request)
	{
		int response = inventoryServiceM.saveorUpdateMaintenanceContractMaster(maintenanceContractMasterDto, request);
		return response;
	}
	
	/**
	 * @author:- Rohit Sandbhor
	 * @since:- 14-07-2020
	 * @codeFor:- Below method is written for to get the all the records from maintenance contract master table
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllMaintenanceContractMasterRecords", method = RequestMethod.GET)
	public @ResponseBody
	MaintenanceContractMasterDto getAllMaintenanceContractMasterRecords(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<MaintenanceContractMasterDto> lstMaintenanceContractMaster = new ArrayList<MaintenanceContractMasterDto>();
		lstMaintenanceContractMaster = inventoryServiceM.getAllMaintenanceContractMasterRecords(request,unitId);
		maintenanceContractMasterDto.setLstMaintenanceContractMasterDto(lstMaintenanceContractMaster);
		return maintenanceContractMasterDto;
	}
	
	/**
	 * @since : 14-07-2020
	 * @author: Rohit Sandbhor
	 * @codeFor: This code is created for editing the maintenance contract master details w.r.t to id
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/editMaintenanceContractMaster", method = RequestMethod.GET)
	public @ResponseBody
	MaintenanceContractMasterDto editMaintenanceContractMaster(@RequestParam("id") Integer id) {
		maintenanceContractMasterDto = inventoryServiceM.editMaintenanceContractMaster(id);	
		return maintenanceContractMasterDto;
	}
	
	/**
	 * 
	 * @param taxId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deleteMaintenanceContractMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteMaintenanceContractMaster(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = inventoryServiceM.deleteMaintenanceContractMaster(id, request);
		String msg = "";
		if (response == true) {
			msg = "Record Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	/**
	 * @since : 24-08-2022
	 * @author: Vishant Pawar
	 * @codeFor: This code is created for fetch the all sub inventory name
	 * @param id
	 * @return
	 */
	
	@RequestMapping(value = "/fetchSubInventoryNew", method = RequestMethod.GET)
	public @ResponseBody
	List<SubInventoryMasterDto> fetchSubInventoryNew(@RequestParam("action") String actionType,@RequestParam("isEdit") String isEdit) {
		List<SubInventoryMasterDto> inventoryDTOs = inventoryServiceM.fetchSubInventoryNew(actionType,isEdit);	
		log.debug("this is for editFinancialMaster "+inventoryDTOs);
		return inventoryDTOs;
	}
	
	
	@RequestMapping(value = "/getSubInventoryStockRecord", method = RequestMethod.POST)
	@ResponseBody public Integer getSubInventoryStockRecord(@RequestParam("id") Integer id)
	{
		Integer result = inventoryServiceM.getSubInventoryStockRecord(id);
		
		return result;
	}
}

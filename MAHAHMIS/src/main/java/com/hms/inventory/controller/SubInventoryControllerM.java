package com.hms.inventory.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.Users;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.ConsumptionDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.GoodsIssueMrnMasterDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.MrnMasterItemInfoDTO;
import com.hms.inventory.dto.StockReturnDto;
import com.hms.inventory.service.SubInventoryServiceM;

@Controller
@RequestMapping(value = "/subInventory")
public class SubInventoryControllerM {

	@Autowired
	private ItemMasterDto itemMasterDto;
	@Autowired
	private MrnMasterDTO mrnMasterDTO;
	@Autowired
	private SubInventoryServiceM subInventoryServiceM;
	@Autowired
	private MrnMasterItemInfoDTO itemInfoDTO;
	@Autowired
	private BatchStockDto batchStockDto;
	@Autowired
	private GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto;
	@Autowired
	private ConsumptionDto consumptionDto;
	@Autowired
	private StockReturnDto stockReturnDto;
	@Autowired
	private GoodsIssueMrnMasterDto goodsIssueMrnMasterDto;
	

	static Logger log=Logger.getLogger(SubInventoryControllerM.class.getName());
	
	/**
	 * @since 05-05-2019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the item master slave details and current sub inv stock values
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getItemMasterSlaveDetailsAndCurrentSubInvStock", method = RequestMethod.POST)
	@ResponseBody
	public ItemMasterDto getItemMasterSlaveDetailsAndCurrentSubInvStock(
			@RequestParam("id") Integer id,
			@RequestParam("subInvId") Integer subInvId,
			HttpServletRequest request) {
		itemMasterDto = subInventoryServiceM.getItemMasterSlaveDetailsAndCurrentSubInvStock(id, subInvId,request);
		log.debug("this is getItemMasterSlaveDetailsAndCurrentSubInvStock...."+itemMasterDto);
		return itemMasterDto;
	}

	/**
	 * @since 05-05-2019
	 * @author Rohit Sandbhor
	 * @comment this method is created for to save generate MRN request
	 * @param generateMRNItemSlaveDetails
	 * @param mrnMasterDTO
	 * @return
	 */
	@RequestMapping(value = "/saveGenerateMRNRequest")
	@ResponseBody
	public int saveGenerateMRNRequest(
			@RequestParam("generateMRNItemSlaveDetails") String generateMRNItemSlaveDetails,
			MrnMasterDTO mrnMasterDTO,HttpServletRequest request) {
		int response = subInventoryServiceM.saveGenerateMRNRequest(mrnMasterDTO, generateMRNItemSlaveDetails,request);
		log.debug("this is saveGenerateMRNRequest...."+response);
		return response;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get in process status mrn records on the basis of subinventory name
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getInProcessStatusGeneratedMRNRequest", method = RequestMethod.POST)
	public @ResponseBody
	MrnMasterDTO getInProcessStatusGeneratedMRNRequest(
			@RequestParam("mrnSubinventoryName") String subInventoryName,
			HttpServletRequest request) {
		List<MrnMasterDTO> lstGeneratedMrn = new ArrayList<MrnMasterDTO>();
		Integer count = subInventoryServiceM.getPageCountAllMRN(subInventoryName,request);
		lstGeneratedMrn = subInventoryServiceM.getInProcessStatusGeneratedMRNRequest(subInventoryName,request);
		mrnMasterDTO.setNoOfPages(count);
		mrnMasterDTO.setLstmrnmaster(lstGeneratedMrn);
		log.debug("this is getInProcessStatusGeneratedMRNRequest...."+mrnMasterDTO);

		return mrnMasterDTO;
	}

	/**
	 * @since 27-12-2019
	 * @comment This method is created for to edit generated MRN details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editGeneratedMRNData", method = RequestMethod.GET)
	@ResponseBody
	public MrnMasterDTO editGeneratedMRNData(@RequestParam("id") Integer id,HttpServletRequest request) {
		mrnMasterDTO = subInventoryServiceM.editGeneratedMRNData(id,request);
		log.debug("this is editGeneratedMRNData...."+mrnMasterDTO);
		return mrnMasterDTO;
	}

	/**
	 * @since 05-05-2019
	 * @comment this is method is created for to update the batch stock table values after doing goods issue process
	 * @author Rohit Sandbhor
	 */
	@RequestMapping(value = "/updateBatchStock")
	@ResponseBody
	public int updateBatchStock(
			@RequestParam("batchStockDetails") String batchStockDetails,HttpServletRequest request) {
		int response = subInventoryServiceM.updateBatchStock(batchStockDetails,request);
		log.debug("this is updateBatchStock...."+response);
		return response;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 08-01-2020
	 * @comment This method is created to get all mrn records on the basis of subinventory name
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllGeneratedMRNRequest", method = RequestMethod.POST)
	public @ResponseBody
	MrnMasterDTO getAllGeneratedMRNRequest(
			@RequestParam("mrnSubinventoryName") String subInventoryName,
			HttpServletRequest request) {
		List<MrnMasterDTO> lstGeneratedMrn = new ArrayList<MrnMasterDTO>();
		lstGeneratedMrn = subInventoryServiceM.getAllGeneratedMRNRequest(subInventoryName, request);
		mrnMasterDTO.setLstmrnmaster(lstGeneratedMrn);
		log.debug("this is getAllGeneratedMRNRequest...."+mrnMasterDTO);
		return mrnMasterDTO;
	}

	/**
	 * @since 05-05-2019
	 * @comment this is method is created for to update sub inventory item stock quantity
	 * @author Rohit Sandbhor
	 */
	@RequestMapping(value = "/updateSubInventoryItemStockQuantity", method = RequestMethod.POST)
	@ResponseBody
	public int updateSubInventoryItemStockQuantity(
			@RequestParam("itemSlaveId") Integer itemSlaveId,
			@RequestParam("mrnId") Integer mrnId,
			@RequestParam("requiredQuantityBatchWise") Integer requiredQuantityBatchWise,
			@RequestParam("itemMasterId") Integer itemMasterId,
			@RequestParam("itemBatchCode") String itemBatchCode,
			@RequestParam("goodsIssueMrnId") Integer goodsIssueMrnId,
			@RequestParam("mrnStatus") String mrnStatus,HttpServletRequest request,
			@RequestParam("goodsIssueSlaveId") Integer goodsIssueSlaveId,
			@RequestParam("itemBatchExpDate") String itemBatchExpDate,
			@RequestParam("subInventoryIdInsideModalOnApproval") Integer subInventoryIdInsideModalOnApproval) {
		int response = subInventoryServiceM.updateSubInventoryItemStockQuantity(itemSlaveId, 
					   mrnId,requiredQuantityBatchWise,itemMasterId,itemBatchCode,goodsIssueMrnId,mrnStatus,request,goodsIssueSlaveId,itemBatchExpDate,subInventoryIdInsideModalOnApproval);
		log.debug("this is updateSubInventoryItemStockQuantity...."+response);
		return response;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 08-01-2020
	 * @comment This method is created to get generated MRN data for indent tab with current sub inv stock
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllGeneratedMRNRequestDataForIndentTab", method = RequestMethod.POST)
	public @ResponseBody
	GoodsIssueMrnItemSlaveDto getAllGeneratedMRNRequestDataForIndentTab(@RequestParam("subInventoryId") Integer subInventoryId,HttpServletRequest request) {
		List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = new ArrayList<GoodsIssueMrnItemSlaveDto>();
		goodsIssueMrnItemSlaveDtos = subInventoryServiceM.getAllGeneratedMRNRequestDataForIndentTab(subInventoryId,request);
		goodsIssueMrnItemSlaveDto.setGoodsIssueMrnItemSlaveDtos(goodsIssueMrnItemSlaveDtos);
		log.debug("this is getAllGeneratedMRNRequestDataForIndentTab...."+batchStockDto);
		return goodsIssueMrnItemSlaveDto;
	}

	/**
	 * @since 22-01-2020
	 * @comment This js function is created for to update the MRN status after receiving full quantity of product
	 * @author Rohit Sandbhor
	 */
	@RequestMapping(value = "/updateFullyReceivedMrnStatus", method = RequestMethod.POST)
	@ResponseBody
	public int updateFullyReceivedMrnStatus(@RequestParam("mrnId") Integer mrnId,HttpServletRequest request) {
		int response = subInventoryServiceM.updateFullyReceivedMrnStatus(mrnId,request);
		log.debug("this is updateFullyReceivedMrnStatus...."+response);
		return response;
	}
	
	/**
	 * @since 03-02-2020
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the current sub inventory stock batch wise on consumption module tab
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getCurrentSubStockBatchWise", method = RequestMethod.POST)
	@ResponseBody
	public GoodsIssueMrnItemSlaveDto getCurrentSubStockBatchWise(@RequestParam("itemMasterId") Integer itemMasterId,
			@RequestParam("subInvIdConsumption") Integer subInvIdConsumption,HttpServletRequest request) {
		List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = new ArrayList<GoodsIssueMrnItemSlaveDto>();
		goodsIssueMrnItemSlaveDtos = subInventoryServiceM.getCurrentSubStockBatchWise(itemMasterId, subInvIdConsumption,request);
		goodsIssueMrnItemSlaveDto.setGoodsIssueMrnItemSlaveDtos(goodsIssueMrnItemSlaveDtos);
		log.debug("this is getCurrentSubStockBatchWise...."+goodsIssueMrnItemSlaveDtos);
		return goodsIssueMrnItemSlaveDto;
	}
	
	/**
	 * 
	 * @param userName
	 * @return
	 */
	@RequestMapping(value = "/getAutoSuggestionListDispenser", method = RequestMethod.POST)
	 @ResponseBody
	public Users getAutoSuggestionListDispenser(@RequestParam("userName") String userName,HttpServletRequest request) {
		log.info("inside autoFillSearchOnPartyMaster method");
		Users users = new Users();
		users = subInventoryServiceM.getAutoSuggestionListDispenser(userName);
		log.debug("inside getAutoSuggestionListDispenser partyMasterDto::"+users);
		return users;
	}
	
	
	@RequestMapping(value = "/saveConsumptionDetails",method = RequestMethod.POST)
	@ResponseBody
	public int saveConsumptionDetails(@RequestParam("consumptionItemSlaveDetails") String consumptionItemSlaveDetails,
			ConsumptionDto consumptionDto,HttpServletRequest request) {
		int response = subInventoryServiceM.saveConsumptionDetails(consumptionDto, consumptionItemSlaveDetails,request);
		log.debug("inside saveConsumptionDetails partyMasterDto::"+response);
		return response;
	}
	
	/**
	 * @since 05-05-2019
	 * @comment this is method is created for to update the batch stock table values after doing goods issue process
	 * @author Rohit Sandbhor
	 */
	@RequestMapping(value = "/updateBatchStockAfterConsumptionRequest")
	@ResponseBody
	public int updateBatchStockAfterConsumotionRequest(
			@RequestParam("batchStockDetails") String batchStockDetails,
			@RequestParam("goodsIssueMrnItemSlaveDetails") String goodsIssueMrnItemSlaveDetails,HttpServletRequest request) {
		int response = subInventoryServiceM.updateBatchStockAfterConsumotionRequest(batchStockDetails,goodsIssueMrnItemSlaveDetails,request);
		log.debug("inside updateBatchStockAfterConsumotionRequest :"+response);
		return response;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 07-02-2020
	 * @comment This method is created to get consumption list subinventory wise
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getConsumptionList", method = RequestMethod.POST)
	public @ResponseBody
	ConsumptionDto getConsumptionList(
			@RequestParam("mrnSubinventoryName") String subInventoryName,@RequestParam("subInventoryId") Integer subInventoryId,
			HttpServletRequest request) {
		Integer noOfPages = subInventoryServiceM.getPageCountAllConsumption(subInventoryName,request);
		List<ConsumptionDto> consumptionDtos = new ArrayList<ConsumptionDto>();
		consumptionDtos = subInventoryServiceM.getConsumptionList(subInventoryName,subInventoryId,request);
		consumptionDto.setNoOfPages(noOfPages);
		consumptionDto.setLstConsumptionDto(consumptionDtos);
		log.debug("inside getConsumptionList :"+consumptionDto);
		return consumptionDto;
	}
	
	/**
	 * @since 08-02-2020
	 * @comment This method is created for to edit generated Consumption details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editGeneratedConsumptionDetails", method = RequestMethod.GET)
	@ResponseBody
	public ConsumptionDto editGeneratedConsumptionDetails(@RequestParam("id") Integer id,HttpServletRequest request) {
		consumptionDto = subInventoryServiceM.editGeneratedConsumptionDetails(id,request);
		log.debug("inside editGeneratedConsumptionDetails :"+consumptionDto);
		return consumptionDto;
	}
	
	/**
	 * @author Dayanand Khandekar
	 * @since 17-02-2020
	 * @comment This method is created to get consumption list By Id wise
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getConsumptionListById", method = RequestMethod.POST)
	public @ResponseBody
	ConsumptionDto getConsumptionListById(
			@RequestParam("subInvId") Integer subInvId,
			HttpServletRequest request) {
		List<ConsumptionDto> consumptionDtos = new ArrayList<ConsumptionDto>();
		consumptionDtos = subInventoryServiceM.getConsumptionListById(subInvId, request);
		consumptionDto.setLstConsumptionDto(consumptionDtos);
		log.debug("inside getConsumptionListById :"+consumptionDto);
		return consumptionDto;
	}
	
	
	@RequestMapping(value = "/getConsumptionTypeListForConsumtionReport", method = RequestMethod.POST)
	public @ResponseBody
	ConsumptionDto getConsumptionTypeListForConsumtionReport(
			@RequestParam("subInvId") Integer subInvId,@RequestParam("consumptionType") String consumptionType,
			HttpServletRequest request) {
		List<ConsumptionDto> consumptionDtos = new ArrayList<ConsumptionDto>();
		consumptionDtos = subInventoryServiceM.getConsumptionTypeListForConsumtionReport(subInvId, consumptionType, request);
		consumptionDto.setLstConsumptionDto(consumptionDtos);
		log.debug("inside getConsumptionListById :"+consumptionDto);
		return consumptionDto;
	}

	
	@RequestMapping(value = "/saveStockReturnDetails",method = RequestMethod.POST)
	@ResponseBody
	public int saveStockReturnDetails(@RequestParam("stockReturnItemSlaveDetails") String stockReturnItemSlaveDetails,
			StockReturnDto stockReturnDto,HttpServletRequest request) {
		int response = subInventoryServiceM.saveStockReturnDetails(stockReturnDto, stockReturnItemSlaveDetails,request);
		log.debug("inside saveStockReturnDetails :"+response);
		return response;
	}
	
	
	@RequestMapping(value = "/updateBatchStockAfterStockReturnRequest")
	@ResponseBody
	public int updateBatchStockAfterStockReturnRequest(StockReturnDto sobj,
			@RequestParam("stockReturnItemSlaveDetails") String stockReturnItemSlaveDetails,
			@RequestParam("goodsIssueMrnItemSlaveDetails") String goodsIssueMrnItemSlaveDetails,
			@RequestParam("batchStockDetails") String batchStockDetails,HttpServletRequest request) {
		int response = subInventoryServiceM.updateBatchStockAfterStockReturnRequest(sobj,stockReturnItemSlaveDetails,goodsIssueMrnItemSlaveDetails,batchStockDetails,request);
		log.debug("inside updateBatchStockAfterStockReturnRequest :"+response);
		return response;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @comment created this function to get received goods issue leads in mrn received tab
	 * @since 11-11-2020
	 * @param subInventoryId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getReceivedMrnData", method = RequestMethod.POST)
	public @ResponseBody
	GoodsIssueMrnMasterDto getReceivedMrnData(@RequestParam("subInventoryId") Integer subInventoryId,HttpServletRequest request) {
		List<GoodsIssueMrnMasterDto> issueMrnMasterDtos = new ArrayList<GoodsIssueMrnMasterDto>();
		// this is for get all count hear
		Integer count = subInventoryServiceM.getPageCountAllReceivedMRN(subInventoryId,request);
		log.info("getAllGoodsIssueMRNDataForAppoval..");
		issueMrnMasterDtos = subInventoryServiceM.getReceivedMrnData(subInventoryId, request);
		 log.debug("reponse getReceivedMrnData....."+issueMrnMasterDtos);
		 goodsIssueMrnMasterDto.setNoOfPages(count);
		 goodsIssueMrnMasterDto.setLstGoodsIssueMrnMaster(issueMrnMasterDtos);
		return goodsIssueMrnMasterDto;
	}
	
	@RequestMapping(value = "/getAllStockRetrun", method = RequestMethod.POST)
	@ResponseBody
	public List getAllStockRetrun(@RequestParam("subinvId") Integer subInventoryId, HttpServletRequest request) {
		log.debug("inside getAllStockRetrun :"+subInventoryId);
		return subInventoryServiceM.getAllStockRetrun(subInventoryId,request);
	}
	
	/**
	 * @since 16-03-2020
	 * @author Dayanand khandekar
	 * @comment this method is created for to check user name and password
	 * @param userName
	 * @param userPassword
	 * @return
	 */
	@RequestMapping(value = "/checkUserNameandPassword")
	@ResponseBody
	public MrnMasterDTO checkUserNameandPassword(@RequestParam("userName") String userName,
			@RequestParam("userPassword") String userPassword,HttpServletRequest request) {
		int response =0;
		List<MrnMasterDTO> list=new ArrayList<MrnMasterDTO>();
		MrnMasterDTO obj=new MrnMasterDTO();
		list = subInventoryServiceM.checkUserNameandPassword(userName, userPassword,request);
		log.debug("inside checkUserNameandPassword :"+list);
		obj.setLstmrnmaster(list);
		return obj;
	}
	
	@RequestMapping(value="/getAllStockReturnRecordsDetails")
	@ResponseBody
	public StockReturnDto  getAllStockReturnRecordsDetails( HttpServletRequest request,@RequestParam("unitId") Integer unitId, 
			@RequestParam("mrnSubinventoryName") String subinventoryName,@RequestParam("subInventoryId") Integer subInventoryId){
		List<StockReturnDto> lstslave=new ArrayList<StockReturnDto>();
		
		Integer count = subInventoryServiceM.getPageCountAllStockReturn(subinventoryName,request);
		 lstslave= subInventoryServiceM.getAllStockReturnRecordsDetails(request, unitId,subinventoryName,subInventoryId);
		// StockReturnDto obj=new  StockReturnDto();
		 stockReturnDto.setNoOfPages(count);
		 stockReturnDto.setLstStockReturnDto(lstslave);
		 log.debug("inside getAllStockReturnRecordsDetails :"+stockReturnDto);
		 return stockReturnDto;
	}
	
	@RequestMapping(value = "/editStockReturn", method = RequestMethod.GET)
	@ResponseBody
	public StockReturnDto editStockReturn(@RequestParam("stockId") Integer stockId,@RequestParam("unitId") Integer unitId,
			HttpServletRequest request) {
		StockReturnDto pobj = new StockReturnDto();
		log.info("editStockReturn.....");
		pobj = subInventoryServiceM.editStockReturn(stockId,request);
		log.debug("reponse editStockReturn....."+pobj);

		return pobj;
	}
	
	@RequestMapping(value = "/deleteStockReturn", method = RequestMethod.POST)
	@ResponseBody
	public String deleteStockReturn(@RequestParam("stockId") Integer stockId,HttpServletRequest request) {
		log.info("deleteStockReturn.....");
		boolean status = subInventoryServiceM.deleteStockReturn(stockId, request);
		log.debug("reponse deleteStockReturn....."+status);

		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}
	
	@RequestMapping(value="/getStockReturnDetailsBySubInventory")
	@ResponseBody
	public StockReturnDto  getStockReturnDetailsBySubInventory( HttpServletRequest request,
			@RequestParam("subInvId") Integer subInvId,@RequestParam("unitId") Integer unitId){
		List<StockReturnDto> lstslave=new ArrayList<StockReturnDto>();
		 lstslave= subInventoryServiceM.getStockReturnDetailsBySubInventory(subInvId,request);
		 StockReturnDto obj=new  StockReturnDto();
		 obj.setLstStockReturnDto(lstslave);
		 log.debug("inside getStockReturnDetailsBySubInventory :"+obj);
			return obj;
	}
	
	@RequestMapping(value = "/getMRNPagination", method = RequestMethod.POST)
	public @ResponseBody MrnMasterDTO getMRNPagination(@RequestParam("startIndex") Integer startIndex,
			@RequestParam("mrnSubinventoryName") String subInventoryName,HttpServletRequest request) {
		return subInventoryServiceM.getMRNPagination(startIndex,subInventoryName,request);
	}
	
	@RequestMapping(value = "/paginationReceivedMRN", method = RequestMethod.POST)
	public @ResponseBody GoodsIssueMrnMasterDto paginationReceivedMRN(@RequestParam("startIndex") Integer startIndex,
			@RequestParam("mrnSubinventoryId") Integer mrnSubinventoryId,HttpServletRequest request) {
		List<GoodsIssueMrnMasterDto> issueMrnMasterDtos = new ArrayList<GoodsIssueMrnMasterDto>();
		issueMrnMasterDtos = subInventoryServiceM.getReceivedMRNPagination(startIndex,mrnSubinventoryId, request);
		goodsIssueMrnMasterDto.setLstGoodsIssueMrnMaster(issueMrnMasterDtos);
		return goodsIssueMrnMasterDto;
		//return subInventoryServiceM.getReceivedMRNPagination(startIndex,mrnSubinventoryId,request);
	}
	
	@RequestMapping(value = "/getPaginationConsumption", method = RequestMethod.POST)
	public @ResponseBody ConsumptionDto getPaginationConsumption(@RequestParam("startIndex") Integer startIndex,
			@RequestParam("mrnSubinventoryName") String subInventoryName,HttpServletRequest request) {
		return subInventoryServiceM.getConsumptionPagination(startIndex,subInventoryName,request);
	}
	
	@RequestMapping(value = "/getPaginationStockReturn", method = RequestMethod.POST)
	public @ResponseBody StockReturnDto getPaginationStockReturn(@RequestParam("startIndex") Integer startIndex,
			@RequestParam("mrnSubinventoryName") String subInventoryName,HttpServletRequest request) {
		return subInventoryServiceM.getPaginationStockReturn(startIndex,subInventoryName,request);
	}
	
	/**
	 * @author Vishnu Thorat
	 * @since 17-02-2020
	 * @comment This method is created to get consumption list By Id wise
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllConsumptionList", method = RequestMethod.GET)
	public @ResponseBody
	ConsumptionDto getAllConsumptionList(HttpServletRequest request) {
		List<ConsumptionDto> consumptionDtos = new ArrayList<ConsumptionDto>();
		consumptionDtos = subInventoryServiceM.getAllConsumptionList(request);
		consumptionDto.setLstConsumptionDto(consumptionDtos);
		log.debug("inside getConsumptionListById :"+consumptionDto);
		return consumptionDto;
	}
	
	/**
	 * @since 10-11-2020
	 * @comment This method is created for to get received tab MRN details after accepting the qty batch wise
	 * @author Rohit Sandbhor
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/viewReceivedGeneratedMRNData", method = RequestMethod.POST)
	@ResponseBody
	public GoodsIssueMrnMasterDto viewReceivedGeneratedMRNData(@RequestParam("goodsIssueMasterId") Integer goodsIssueMasterId) {
		goodsIssueMrnMasterDto = subInventoryServiceM.viewReceivedGeneratedMRNData(goodsIssueMasterId);
		log.debug("this is viewReceivedGeneratedMRNData...."+goodsIssueMrnMasterDto);
		return goodsIssueMrnMasterDto;
	}
	
	/**
	 * @since 12-11-2020
	 * @comment This method is created for to view generated MRN details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/viewGeneratedMRNData", method = RequestMethod.GET)
	@ResponseBody
	public MrnMasterDTO viewGeneratedMRNData(@RequestParam("id") Integer id,HttpServletRequest request) {
		mrnMasterDTO = subInventoryServiceM.viewGeneratedMRNData(id,request);
		log.debug("this is viewGeneratedMRNData...."+mrnMasterDTO);
		return mrnMasterDTO;
	}
	
	/**
	 * @since 11-02-2021
	 * @author Rohit Sandbhor
	 * @comment added this function to get current inventory stock w.r.t item id
	 * @param itemMasterId
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getCurrentInventoryStock",method = RequestMethod.POST)
	@ResponseBody
	public Integer getCurrentInventoryStock(@RequestParam("itemMasterId") int itemMasterId,HttpServletRequest request)
	{
		log.info("getCurrentInventoryStock..");
		int response = subInventoryServiceM.getCurrentInventoryStock(itemMasterId,request);
		log.debug("reponse getCurrentInventoryStock....."+response);
		return response;
	}
	
	@RequestMapping(value="/searchReceivedMRN",method = RequestMethod.POST)
	@ResponseBody
	public GoodsIssueMrnMasterDto searchReceivedMRN(@RequestParam("mrnMasterId") int mrnMasterId,@RequestParam("mrnSubinventoryName") String subInventoryName,HttpServletRequest request){
		log.info("searchReceivedMRN..");
		List<GoodsIssueMrnMasterDto> lstGoodsIssueMrn = new ArrayList<GoodsIssueMrnMasterDto>();
		lstGoodsIssueMrn = subInventoryServiceM.searchReceivedMRN(mrnMasterId,subInventoryName,request);
		goodsIssueMrnMasterDto.setLstGoodsIssueMrnMaster(lstGoodsIssueMrn);
		log.debug("reponse searchReceivedMRN....."+mrnMasterDTO);
		return goodsIssueMrnMasterDto;
	}
	
	@RequestMapping(value="/searchMRN",method = RequestMethod.POST)
	@ResponseBody
	public MrnMasterDTO searchMRN(@RequestParam("mrnMasterId") int mrnMasterId,@RequestParam("mrnSubinventoryName") String subInventoryName,HttpServletRequest request){
		log.info("searchMRN..");
		List<MrnMasterDTO> lstGeneratedMrn = new ArrayList<MrnMasterDTO>();
		lstGeneratedMrn = subInventoryServiceM.searchMRN(mrnMasterId,subInventoryName,request);
		mrnMasterDTO.setLstmrnmaster(lstGeneratedMrn);
		log.debug("reponse searchMRN....."+mrnMasterDTO);
		return mrnMasterDTO;
	}
	
	@RequestMapping(value = "/getAutoItemNameOnConsumption", method = RequestMethod.POST)
	public @ResponseBody
	ConsumptionDto getAutoItemNameOnConsumption(
			@RequestParam("subInventoryName") String subInventoryName,@RequestParam("itemId") String itemName,
			HttpServletRequest request) {
		List<ConsumptionDto> consumptionDtos = new ArrayList<ConsumptionDto>();
		consumptionDtos = subInventoryServiceM.getAutoItemNameOnConsumption(subInventoryName,itemName,request);
		consumptionDto.setLstConsumptionDto(consumptionDtos);
		log.debug("inside getAutoItemNameOnConsumption :"+consumptionDto);
		return consumptionDto;
	}
	
	@RequestMapping(value = "/getConsumptionListByDate", method = RequestMethod.POST)
	public @ResponseBody
	ConsumptionDto getConsumptionListByDate(
			@RequestParam("mrnSubinventoryName") String subInventoryName,@RequestParam("searchFromDate") String fromDate,@RequestParam("searchToDate") String toDate,
			HttpServletRequest request) {
		System.out.println("fromDate"+fromDate);
		System.out.println("toDate"+toDate);
		List<ConsumptionDto> consumptionDtos = new ArrayList<ConsumptionDto>();
		consumptionDtos = subInventoryServiceM.getConsumptionListByDate(subInventoryName,fromDate,toDate,request);
		consumptionDto.setLstConsumptionDto(consumptionDtos);
		log.debug("inside getConsumptionListByDate :"+consumptionDto);
		return consumptionDto;
	}
	
	@RequestMapping(value = "/searchItemConsumptionResult", method = RequestMethod.POST)
	public @ResponseBody
	ConsumptionDto searchItemConsumptionResult(
			@RequestParam("subInventoryName") String subInventoryName,@RequestParam("itemName") String itemName,@RequestParam("itemId") Integer itemId,
			HttpServletRequest request) {
		List<ConsumptionDto> consumptionDtos = new ArrayList<ConsumptionDto>();
		consumptionDtos = subInventoryServiceM.searchItemNameOnConsumption(subInventoryName,itemName,itemId,request);
		consumptionDto.setLstConsumptionDto(consumptionDtos);
		log.debug("inside searchItemConsumptionResult :"+consumptionDto);
		return consumptionDto;
	}
}


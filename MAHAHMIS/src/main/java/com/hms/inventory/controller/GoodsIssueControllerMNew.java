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

import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnMasterDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.service.GoodsIssueServiceMNew;

@Controller
@RequestMapping(value="/inventoryGoodsIssueNew")
public class GoodsIssueControllerMNew {

static Logger log=Logger.getLogger(GoodsIssueControllerM.class.getName());

@Autowired
private GoodsIssueServiceMNew goodsIssueServiceMNew;

@Autowired
private MrnMasterDTO mrnMasterDTO;

@Autowired
private GoodsIssueMrnMasterDto goodsIssueMrnMasterDto;

@Autowired
private BatchStockDto batchStockDto;

/**
 * @since 15-05-2020
 * @comment created this method to get generated MRN ID
 * @author Rohit Sandbhor
 * @return
 */
@RequestMapping(value = "/getGeneratedMRNID", method = RequestMethod.GET)
public @ResponseBody
MrnMasterDTO getGeneratedMRNID(HttpServletRequest request) {
	Integer count = goodsIssueServiceMNew.getPageCountAllGoodsIssue(request);
	List<MrnMasterDTO> list = new ArrayList<MrnMasterDTO>();
	log.info("getGeneratedMRNID..");
	list = goodsIssueServiceMNew.getGeneratedMRNID(request);
	mrnMasterDTO.setLstmrnmaster(list);
	mrnMasterDTO.setNoOfPages(count);
	log.debug("reponse getGeneratedMRNID....."+list);
	return mrnMasterDTO;
}

/**
 * @since 26-05-2020
 * @author Rohit Sandbhor 
 * @param mrnId
 * @return
 */
@RequestMapping(value="getMRNDetailsByMrnId",method = RequestMethod.POST)
public @ResponseBody
MrnMasterDTO getMRNDetailsByMrnId(@RequestParam("mrnId") Integer mrnId,HttpServletRequest request){
	mrnMasterDTO = goodsIssueServiceMNew.getMRNDetailsByMrnId(mrnId,request);
	log.debug("reponse getMRNDetailsByMrnId....."+mrnMasterDTO);
	return mrnMasterDTO; 
}

/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @comment This method is created for to get item wise batch details on goods issue
 * @param id
 * @param request
 * @return
 */
@RequestMapping(value = "/getGoodsIssueItemBatchDetails", method = RequestMethod.POST)
@ResponseBody
public BatchStockDto getGoodsIssueItemBatchDetails(@RequestParam("itemMasterId") Integer itemMasterId,
		@RequestParam("mrnMasterId") Integer mrnMasterId,@RequestParam("subInventoryId") Integer subInventoryId,HttpServletRequest request) {
	List<BatchStockDto> list = new ArrayList<BatchStockDto>();
	list = goodsIssueServiceMNew.getGoodsIssueItemBatchDetails(itemMasterId, mrnMasterId,subInventoryId,request);
	batchStockDto.setLstBatchStockDto(list);
	log.debug("reponse getGoodsIssueItemBatchDetails....."+list);
	
	return batchStockDto;
}

/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @comment this method is created for to save goods issue request
 * @param generateMRNItemSlaveDetails
 * @param mrnMasterDTO
 * @return
 */
@RequestMapping(value = "/saveGoodsIssueMRNRequest")
@ResponseBody
public int saveGoodsIssueMRNRequest(
		@RequestParam("goodsIssueMrnItemSlaveDetails") String goodsIssueMrnItemSlaveDetails,GoodsIssueMrnMasterDto goodsIssueMrnMasterDto,HttpServletRequest request) {
	log.info("saveGoodsIssueMRNRequest..");
	int response = goodsIssueServiceMNew.saveGoodsIssueMRNRequest(goodsIssueMrnMasterDto, goodsIssueMrnItemSlaveDetails,request);
	 log.debug("reponse saveGoodsIssueMRNRequest....."+response);

	return response;
}

/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @comment
 * @param startIndex
 * @return
 */
@RequestMapping(value = "/getGoodsIssueModalPagination", method = RequestMethod.POST)
public @ResponseBody MrnMasterDTO getGoodsIssueModalPagination(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
	log.debug("reponse getGoodsIssueModalPagination.....");
	return goodsIssueServiceMNew.getGoodsIssueModalPagination(startIndex,request);
}

/**
 * @since 28-05-2020
 * @comment created this method to get good issue Details
 * @author Rohit Sandbhor
 * @return
 */
@RequestMapping(value = "/getAllGoodIssue", method = RequestMethod.GET)
public @ResponseBody
GoodsIssueMrnMasterDto getAllGoodIssue(@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
	Integer count = goodsIssueServiceMNew.getPageCountAllGoodsIssueLeads(request);
	GoodsIssueMrnMasterDto obj=new GoodsIssueMrnMasterDto();
	List<GoodsIssueMrnMasterDto> list = new ArrayList<GoodsIssueMrnMasterDto>();
	log.info("getAllGoodIssue..");
	list = goodsIssueServiceMNew.getAllGoodIssue(unitId, request);
	log.debug("reponse getAllGoodIssue....."+list);
	obj.setLstGoodsIssueMrnMaster(list);
	obj.setNoOfPages(count);
	return obj;
}

/**
 * @since 28-05-2020
 * @author Rohit Sandbhor
 * @comment
 * @param startIndex
 * @return
 */
@RequestMapping(value = "/paginationGoodsIssueList", method = RequestMethod.POST)
public @ResponseBody GoodsIssueMrnMasterDto paginationGoodsIssueList(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
	log.debug("reponse paginationGoodsIssueList.....");
	return goodsIssueServiceMNew.paginationGoodsIssueList(startIndex,request);
}

/**
 * @author Rohit Sandbhor
 * @since 01-06-2020
 * @comment This method is created to get generated MRN data using store id as input on goods issue modal
 * @param request
 * @return
 */
@RequestMapping(value = "/searchAllGeneratedMRNRequestData", method = RequestMethod.POST)
public @ResponseBody
MrnMasterDTO searchAllGeneratedMRNRequestData(@RequestParam("subInventoryId") Integer subInventoryId,HttpServletRequest request) {
	List<MrnMasterDTO> mrnMasterDTOs = new ArrayList<MrnMasterDTO>();
	mrnMasterDTOs = goodsIssueServiceMNew.searchAllGeneratedMRNRequestData(subInventoryId,request);
	log.debug("reponse searchAllGeneratedMRNRequestData....."+mrnMasterDTOs);
	mrnMasterDTO.setLstmrnmaster(mrnMasterDTOs);
	return mrnMasterDTO;
}

/**
 * 
 * @param startIndex
 * @param subInventoryName
 * @return
 */
@RequestMapping(value = "/getGoodIssueMRNPagination", method = RequestMethod.POST)
public @ResponseBody GoodsIssueMrnMasterDto getGoodIssueMRNPagination(@RequestParam("startIndex") Integer startIndex,
		@RequestParam("mrnSubinventoryName") String subInventoryName,HttpServletRequest request) {
	log.debug("reponse getGoodIssueMRNPagination.....");
	return goodsIssueServiceMNew.getGoodIssueMRNPagination(startIndex,subInventoryName,request);
}

/**
 * 
 * @param subInvId
 * @return
 */
@RequestMapping(value = "/getGoodIssueById", method = RequestMethod.GET)
@ResponseBody
public GoodsIssueMrnMasterDto getGoodIssueById(@RequestParam("subInvId") Integer subInvId,HttpServletRequest request){
	log.info("getGoodIssueById..");
	List<GoodsIssueMrnMasterDto> lstGoodsIssueMrnMasterDto = new ArrayList<GoodsIssueMrnMasterDto>();
	lstGoodsIssueMrnMasterDto = goodsIssueServiceMNew.getGoodIssueById(subInvId,request);
	goodsIssueMrnMasterDto.setLstGoodsIssueMrnMaster(lstGoodsIssueMrnMasterDto);
	log.debug("reponse getGoodIssueById....."+goodsIssueMrnMasterDto);
	return goodsIssueMrnMasterDto;
}
/**
 * @since 27-12-2019
 * @comment This method is created for to edit generated MRN details w.r.t id
 * @param id
 * @author Rohit Sandbhor
 * @return
 */
@RequestMapping(value = "/editGeneratedMRNDataForAppoval", method = RequestMethod.GET)
@ResponseBody
public GoodsIssueMrnMasterDto editGeneratedMRNDataForAppoval(@RequestParam("id") Integer id,HttpServletRequest request) {
	try {
		log.info("editGeneratedMRNDataForAppoval..");
		goodsIssueMrnMasterDto = goodsIssueServiceMNew.editGeneratedMRNDataForAppoval(id,request);
		 log.debug("reponse editGeneratedMRNDataForAppoval....."+goodsIssueMrnMasterDto);

	} catch (Exception e) {
		e.printStackTrace();
		log.error("error for editGeneratedMRNDataForAppoval"+e);
	}
	return goodsIssueMrnMasterDto;
}
/**
 * @author Rohit Sandbhor
 * @since 08-01-2020
 * @comment This method is created to get all goods issue mrn data for approval
 * @param request
 * @return
 */
@RequestMapping(value = "/getAllGoodsIssueMRNDataForAppoval", method = RequestMethod.POST)
public @ResponseBody
GoodsIssueMrnMasterDto getAllGeneratedMRNRequest(
		@RequestParam("mrnSubinventoryName") String subInventoryName,
		HttpServletRequest request) {
	List<GoodsIssueMrnMasterDto> lstGoodsIssueMrn = new ArrayList<GoodsIssueMrnMasterDto>();
	Integer count = goodsIssueServiceMNew.getPageCountAllGoodIssueMRN(subInventoryName,request);
	log.info("getAllGoodsIssueMRNDataForAppoval..");
	System.out.println("this is my count "+count);
	lstGoodsIssueMrn = goodsIssueServiceMNew.getAllGoodsIssueMRNDataForAppoval(subInventoryName, request);
	 log.debug("reponse getAllGoodsIssueMRNDataForAppoval....."+lstGoodsIssueMrn);
	 goodsIssueMrnMasterDto.setNoOfPages(count);
	 goodsIssueMrnMasterDto.setLstGoodsIssueMrnMaster(lstGoodsIssueMrn);
	return goodsIssueMrnMasterDto;
}

/**
 * @since 06-11-2020
 * @author Rohit Sandbhor
 * @comment This method is created for to get item wise batch details on goods issue
 * @param id
 * @param request
 * @return
 */
@RequestMapping(value = "/getGoodsIssueItemBatchDetailsWithoutSubinventoryId", method = RequestMethod.POST)
@ResponseBody
public BatchStockDto getGoodsIssueItemBatchDetailsWithoutSubinventoryId(@RequestParam("itemMasterIdUpdated") Integer itemMasterId,
		@RequestParam("mrnMasterIdUpdated") Integer mrnMasterId,HttpServletRequest request) {
	System.out.println("getGoodsIssueItemBatchDetailsWithoutSubinventoryId:::"+itemMasterId);
	List<BatchStockDto> list = new ArrayList<BatchStockDto>();
	list = goodsIssueServiceMNew.getGoodsIssueItemBatchDetailsWithoutSubinventoryId(itemMasterId, mrnMasterId,request);
	batchStockDto.setLstBatchStockDto(list);
	log.debug("reponse getGoodsIssueItemBatchDetailsWithoutSubinventoryId....."+list);
	
	return batchStockDto;
}

/**
 * @since 21-11-2020
 * @author Rohit Sandbhor
 * @param itemMasterId
 * @param subInventoryId
 * @return
 */
@RequestMapping(value="/getCurrentSubInventoryStockWithoutBatch",method = RequestMethod.POST)
@ResponseBody
public int getCurrentSubInventoryStockWithoutBatch(@RequestParam("itemMasterId") Integer itemMasterId,@RequestParam("subInventoryId") Integer subInventoryId)
{
	log.info("getCurrentInventoryStock..");
	int currentSubInventoryStock = goodsIssueServiceMNew.getCurrentSubInventoryStockWithoutBatch(itemMasterId, subInventoryId);
	log.debug("reponse getCurrentInventoryStockWithoutBatch....."+currentSubInventoryStock);
	return currentSubInventoryStock;
}
	
}

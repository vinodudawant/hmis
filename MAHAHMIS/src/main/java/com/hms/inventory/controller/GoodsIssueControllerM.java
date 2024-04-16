package com.hms.inventory.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hms.inventory.dto.GoodsIssueMrnMasterDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.service.GoodsIssueServiceM;

@Controller
@RequestMapping(value="/inventoryGoodsIssue")
public class GoodsIssueControllerM {

	static Logger log=Logger.getLogger(GoodsIssueControllerM.class.getName());
	@Autowired
	private GoodsIssueServiceM goodsIssueServiceM;
	
	@Autowired
	private GoodsIssueMrnMasterDto goodsIssueMrnMasterDto;
	
	@Autowired
	private MrnMasterDTO mrnMasterDTO;
	
	/**
	 * @since 29-01-2020
	 * @comment created this method to get generated MRN ID
	 * @author Rohit Sandbhor
	 * @return
	 */
//	@RequestMapping(value = "/getGeneratedMRNID", method = RequestMethod.GET)
//	public @ResponseBody
//	List<MrnMasterDTO> getGeneratedMRNID() {
//		List<MrnMasterDTO> list = new ArrayList<MrnMasterDTO>();
//		log.info("getGeneratedMRNID..");
//		list = goodsIssueServiceM.getGeneratedMRNID();
//		 log.debug("reponse getGeneratedMRNID....."+list);
//
//		return list;
//	}
	
	/**
	 * @since 29-01-2020
	 * @author Rohit Sandbhor
	 * @comment created this method to get current inventory stock
	 * @param itemMasterId
	 * @param request
	 * @return
	 */
//	@RequestMapping(value="/getCurrentInventoryStock",method = RequestMethod.POST)
//	@ResponseBody
//	public int getCurrentInventoryStock(@RequestParam("itemMasterId") int itemMasterId,@RequestParam("itemBatchCode") String itemBatchCode,@RequestParam("expDate") String expDate,HttpServletRequest request)
//	{
//		log.info("getCurrentInventoryStock..");
//		int response = goodsIssueServiceM.getCurrentInventoryStock(itemMasterId, itemBatchCode,expDate,request);
//		 log.debug("reponse getCurrentInventoryStock....."+response);
//
//		return response;
//	}
	
	/**
	 * @since 05-05-2019
	 * @author Rohit Sandbhor
	 * @comment this method is created for to save goods issue request
	 * @param generateMRNItemSlaveDetails
	 * @param mrnMasterDTO
	 * @return
	 */
//	@RequestMapping(value = "/saveGoodsIssueMRNRequest")
//	@ResponseBody
//	public int saveGoodsIssueMRNRequest(
//			@RequestParam("goodsIssueMrnItemSlaveDetails") String goodsIssueMrnItemSlaveDetails,GoodsIssueMrnMasterDto goodsIssueMrnMasterDto) {
//		log.info("saveGoodsIssueMRNRequest..");
//		int response = goodsIssueServiceM.saveGoodsIssueMRNRequest(goodsIssueMrnMasterDto, goodsIssueMrnItemSlaveDetails);
//		 log.debug("reponse saveGoodsIssueMRNRequest....."+response);
//
//		return response;
//	}
	
	
	/**
	 * @author Rohit Sandbhor
	 * @since 08-01-2020
	 * @comment This method is created to get all goods issue mrn data for approval
	 * @param request
	 * @return
	 */
//	@RequestMapping(value = "/getAllGoodsIssueMRNDataForAppoval", method = RequestMethod.POST)
//	public @ResponseBody
//	GoodsIssueMrnMasterDto getAllGeneratedMRNRequest(
//			@RequestParam("mrnSubinventoryName") String subInventoryName,
//			HttpServletRequest request) {
//		List<GoodsIssueMrnMasterDto> lstGoodsIssueMrn = new ArrayList<GoodsIssueMrnMasterDto>();
//		Integer count = goodsIssueServiceM.getPageCountAllGoodIssueMRN(subInventoryName);
//		log.info("getAllGoodsIssueMRNDataForAppoval..");
//		System.out.println("this is my count "+count);
//		lstGoodsIssueMrn = goodsIssueServiceM.getAllGoodsIssueMRNDataForAppoval(subInventoryName, request);
//		 log.debug("reponse getAllGoodsIssueMRNDataForAppoval....."+lstGoodsIssueMrn);
//		 goodsIssueMrnMasterDto.setNoOfPages(count);
//		 goodsIssueMrnMasterDto.setLstGoodsIssueMrnMaster(lstGoodsIssueMrn);
//		return goodsIssueMrnMasterDto;
//	}
	
	
	
	/**
	 * @since 27-12-2019
	 * @comment This method is created for to edit generated MRN details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
//	@RequestMapping(value = "/editGeneratedMRNDataForAppoval", method = RequestMethod.GET)
//	@ResponseBody
//	public GoodsIssueMrnMasterDto editGeneratedMRNDataForAppoval(@RequestParam("id") Integer id) {
//		try {
//			log.info("editGeneratedMRNDataForAppoval..");
//			goodsIssueMrnMasterDto = goodsIssueServiceM.editGeneratedMRNDataForAppoval(id);
//			 log.debug("reponse editGeneratedMRNDataForAppoval....."+goodsIssueMrnMasterDto);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			log.error("error for editGeneratedMRNDataForAppoval"+e);
//		}
//		return goodsIssueMrnMasterDto;
//	}
	
	/**
	 * @since 27-12-2019
	 * @comment This method is created for to edit generated MRN details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
//	@RequestMapping(value = "/editGeneratedMRNDataGoodsIssue", method = RequestMethod.GET)
//	@ResponseBody
//	public MrnMasterDTO editGeneratedMRNDataGoodsIssue(@RequestParam("id") Integer id) {
//		log.info("editGeneratedMRNDataGoodsIssue..");
//		mrnMasterDTO = goodsIssueServiceM.editGeneratedMRNDataGoodsIssue(id);
//		 log.debug("reponse editGeneratedMRNDataGoodsIssue....."+mrnMasterDTO);
//
//		return mrnMasterDTO;
//	}
	
	/**
	 * @since 19-02-2020
	 * @comment created this method to get good issue Details
	 * @author Dayanand Khandekar
	 * @return
	 */
//	@RequestMapping(value = "/getAllGoodIssue", method = RequestMethod.GET)
//	public @ResponseBody
//	GoodsIssueMrnMasterDto getAllGoodIssue(@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
//		GoodsIssueMrnMasterDto obj=new GoodsIssueMrnMasterDto();
//		List<GoodsIssueMrnMasterDto> list = new ArrayList<GoodsIssueMrnMasterDto>();
//		log.info("getAllGoodIssue..");
//		list = goodsIssueServiceM.getAllGoodIssue(unitId, request);
//		 log.debug("reponse getAllGoodIssue....."+list);
//
//		obj.setLstGoodsIssueMrnMaster(list);
//		return obj;
//	}
	
	/**
	 * @since 20-02-2020
	 * @author Dayanand Khandekar
	 * @comment this method is created for to get  Good Issue Details By subInv ID
	 * 
	 */
//	@RequestMapping(value = "/getGoodIssueById", method = RequestMethod.GET)
//	 @ResponseBody
//	public GoodsIssueMrnMasterDto getGoodIssueById(@RequestParam("subInvId") Integer subInvId){
//		log.info("getGoodIssueById..");
//		GoodsIssueMrnMasterDto obj=goodsIssueServiceM.getGoodIssueById(subInvId);
//		 log.debug("reponse getGoodIssueById....."+obj);
//
//		return obj;
//	}
	
//	@RequestMapping(value = "/getGoodIssueMRNPagination", method = RequestMethod.POST)
//	public @ResponseBody GoodsIssueMrnMasterDto getGoodIssueMRNPagination(@RequestParam("startIndex") Integer startIndex,@RequestParam("mrnSubinventoryName") String subInventoryName) {
//		return goodsIssueServiceM.getGoodIssueMRNPagination(startIndex,subInventoryName);
//	}
}

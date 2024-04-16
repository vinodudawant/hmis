package com.hms.inventory.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Users;
import com.hms.inventory.dao.SubInventoryDaoM;
import com.hms.inventory.dto.ConsumptionDto;
import com.hms.inventory.dto.ConsumptionItemSlaveDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.GoodsIssueMrnMasterDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.StockReturnDto;
import com.hms.inventory.service.SubInventoryServiceM;

@Service
@Transactional
public class SubInventoryServiceImplM implements SubInventoryServiceM{

	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	SubInventoryDaoM subInventoryDaoM;
	
	/**
	 * @since 05-05-2019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the item master slave details and current sub inv stock values
	 * @param id
	 * @param request
	 * @return
	 */
	@Override
	public ItemMasterDto getItemMasterSlaveDetailsAndCurrentSubInvStock(
			Integer itemMasterId,Integer subInvId,HttpServletRequest request) {
		return subInventoryDaoM.getItemMasterSlaveDetailsAndCurrentSubInvStock(itemMasterId,subInvId,request);
	}
	/**
	 * @since 05-05-2019
	 * @author Rohit Sandbhor
	 * @comment this method is created for to save generate MRN request
	 * @param generateMRNItemSlaveDetails
	 * @param mrnMasterDTO
	 * @return
	 */
	@Override
	public int saveGenerateMRNRequest(MrnMasterDTO mrnMasterDTO,
			String generateMRNItemSlaveDetails,HttpServletRequest request) {
		return subInventoryDaoM.saveGenerateMRNRequest(mrnMasterDTO, generateMRNItemSlaveDetails,request);
	}
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get all mrn records on the basis of subinventory name
	 * @param request
	 * @return
	 */
	@Override
	public List<MrnMasterDTO> getInProcessStatusGeneratedMRNRequest(
			String subInventoryName, HttpServletRequest request) {
		return subInventoryDaoM.getInProcessStatusGeneratedMRNRequest(subInventoryName, request);
	}
	/**
	 * @since 27-12-2019
	 * @comment This method is created for to edit generated MRN details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
	@Override
	public MrnMasterDTO editGeneratedMRNData(Integer id,HttpServletRequest request) {
		return subInventoryDaoM.editGeneratedMRNData(id,request);
	}
	/**
	 * @since 05-05-2019
	 * @comment this is method is created for to update the batch stock table values after doing goods issue process
	 * @author Rohit Sandbhor
	 */
	@Override
	public int updateBatchStock(String batchStockDetails,HttpServletRequest request) {
		return subInventoryDaoM.updateBatchStock(batchStockDetails,request);
	}
	/**
	 * @since 29-01-2020
	 * @comment this is method is created for to get all geneated mrn request data on the basis of sub inv name
	 * @author Rohit Sandbhor
	 */
	@Override
	public List<MrnMasterDTO> getAllGeneratedMRNRequest(
			String subInventoryName, HttpServletRequest request) {
		return subInventoryDaoM.getAllGeneratedMRNRequest(subInventoryName, request);
	}
	/**
	 * @since 29-01-2020
	 * @comment this is method is created for to update sub inv item stock quantity on the basis of item slave id
	 * @author Rohit Sandbhor 
	 */
	@Override
	public int updateSubInventoryItemStockQuantity(Integer itemSlaveId,
			Integer mrnId,Integer requiredQuantityBatchWise,Integer itemMasterId,String itemBatchCode,
			Integer goodsIssueMrnId,String mrnStatus,HttpServletRequest request,Integer goodsIssueSlaveId,String itemBatchExpDate,Integer subInventoryIdInsideModalOnApproval) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.updateSubInventoryItemStockQuantity(itemSlaveId, mrnId,
				requiredQuantityBatchWise,itemMasterId,itemBatchCode,goodsIssueMrnId,mrnStatus,request,goodsIssueSlaveId,itemBatchExpDate,subInventoryIdInsideModalOnApproval);
	}
	/**
	 * @since 29-01-2020
	 * @comment this is method is created for to get all generated MRN request data for indent tab
	 * @author Rohit Sandbhor 
	 */
	@Override
	public List<GoodsIssueMrnItemSlaveDto> getAllGeneratedMRNRequestDataForIndentTab(
			Integer subInventoryId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getAllGeneratedMRNRequestDataForIndentTab(subInventoryId, request);
	}
	
	
	/**
	 * @since 29-01-2020
	 * @comment this is method is created for to update fully received mrn status on the basis of MRN ID
	 * @author Rohit Sandbhor 
	 */
	@Override
	public int updateFullyReceivedMrnStatus(Integer mrnId,HttpServletRequest request) {
		return subInventoryDaoM.updateFullyReceivedMrnStatus(mrnId,request);
	}
	/**
	 * @since 03-02-2020
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the current sub inventory stock batch wise on consumption module tab
	 * @param id
	 * @param request
	 * @return
	 */
	@Override
	public List<GoodsIssueMrnItemSlaveDto> getCurrentSubStockBatchWise(
			Integer itemMasteId, Integer subInvId,HttpServletRequest request) {
		return subInventoryDaoM.getCurrentSubStockBatchWise(itemMasteId, subInvId,request);
	}
	@Override
	public Users getAutoSuggestionListDispenser(String userName) {
		return subInventoryDaoM.getAutoSuggestionListDispenser(userName);
	}
	@Override
	public int saveConsumptionDetails(ConsumptionDto consumptionDto,String consumptionItemSlaveDetails,HttpServletRequest request) {
		return subInventoryDaoM.saveConsumptionDetails(consumptionDto, consumptionItemSlaveDetails,request);
	}
	@Override
	public int updateBatchStockAfterConsumotionRequest(String batchStockDetails,String goodsIssueMrnItemSlaveDetails,HttpServletRequest request) {
		return subInventoryDaoM.updateBatchStockAfterConsumotionRequest(batchStockDetails,goodsIssueMrnItemSlaveDetails,request);
	}
	@Override
	public List<ConsumptionDto> getConsumptionList(String subInventoryName,Integer subInventoryId,
			HttpServletRequest request) {
		return subInventoryDaoM.getConsumptionList(subInventoryName, subInventoryId, request);
	}
	@Override
	public ConsumptionDto editGeneratedConsumptionDetails(Integer id,HttpServletRequest request) {
		return subInventoryDaoM.editGeneratedConsumptionDetails(id,request);
	}
	@Override
	public List<ConsumptionDto> getConsumptionListById(Integer subInvId,HttpServletRequest request) {
		return subInventoryDaoM.getConsumptionListById(subInvId, request);
	}
	@Override
	public int saveStockReturnDetails(StockReturnDto stockReturnDto,
			String stockReturnItemSlaveDetails,HttpServletRequest request) {
		return subInventoryDaoM.saveStockReturnDetails(stockReturnDto, stockReturnItemSlaveDetails,request);
	}
	@Override
	public int updateBatchStockAfterStockReturnRequest(StockReturnDto sobj,  String stockReturnItemSlaveDetails,String goodsIssueMrnItemSlaveDetails,String batchStockDetails,HttpServletRequest request) {
		return subInventoryDaoM.updateBatchStockAfterStockReturnRequest(sobj,stockReturnItemSlaveDetails,goodsIssueMrnItemSlaveDetails,batchStockDetails,request);
	}
	@Override
	public List<GoodsIssueMrnMasterDto> getReceivedMrnData(Integer subInventoryId,
			HttpServletRequest request) {
		return subInventoryDaoM.getReceivedMrnData(subInventoryId,request);
	}
	@Override
	public List getAllStockRetrun(Integer subInventoryId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getAllStockRetrun(subInventoryId, request);
	}
	@Override
	public List<MrnMasterDTO> checkUserNameandPassword(String userName, String userPassword,HttpServletRequest request) {
		String sql="";
		List<MrnMasterDTO> lstbatch = new ArrayList<MrnMasterDTO>();
		try{
		sql="SELECT count(*) as countu ,f.User_ID from users f where f.status='Y' and f.User_Name='"+userName+"'and f.password='"+userPassword+"' group by f.User_ID";

		 SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				
				MrnMasterDTO pm = new MrnMasterDTO();
				pm.setCount(((Number) row.get("countu")).intValue());
				pm.setApprovedById((Integer) row.get("User_ID"));
				
				lstbatch.add(pm);
				pm=null;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstbatch;
	}
	@Override
	public List<StockReturnDto> getAllStockReturnRecordsDetails(HttpServletRequest request, Integer unitId,String subinventoryName,Integer subInventoryId) {
		
		return subInventoryDaoM.getAllStockReturnRecordsDetails(request, unitId, subinventoryName,subInventoryId);
	}
	@Override
	public StockReturnDto editStockReturn(Integer stockId,HttpServletRequest request) {
	
		return subInventoryDaoM.editStockReturn(stockId,request);
	}
	@Override
	public boolean deleteStockReturn(Integer stockId, HttpServletRequest request) {
		boolean reponse=false;
		try{
			StockReturnDto pobj=(StockReturnDto) sessionFactory.getCurrentSession().get(StockReturnDto.class, stockId);
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		pobj.setDeleted("Y");
		pobj.setDeletedDate(new Date(new java.util.Date().getTime()));
		pobj.setDeleted_by(userId);
		
			
			reponse=subInventoryDaoM.deleteStockReturn(pobj,request);
			    
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return reponse;
	}
	@Override
	public List<StockReturnDto> getStockReturnDetailsBySubInventory(Integer subInvId,HttpServletRequest request) {
		return subInventoryDaoM.getStockReturnDetailsBySubInventory(subInvId,request);
	}
	@Override
	public MrnMasterDTO getMRNPagination(Integer startIndex,String subInventoryName,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getMRNPagination(startIndex,subInventoryName,request);
	}
	@Override
	public Integer getPageCountAllMRN(String subInventoryName,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getPageCountAllMRN(subInventoryName,request);
	}
	@Override
	public List<GoodsIssueMrnMasterDto> getReceivedMRNPagination(Integer startIndex,
			Integer subInventoryId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getReceivedMRNPagination(startIndex, subInventoryId,request);
	}
	@Override
	public Integer getPageCountAllReceivedMRN(Integer subInventoryId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getPageCountAllReceivedMRN(subInventoryId,request);
	}
	@Override
	public ConsumptionDto getConsumptionPagination(Integer startIndex,
			String subInventoryName,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getConsumptionPagination(startIndex, subInventoryName,request);
	}
	@Override
	public Integer getPageCountAllConsumption(String subInventoryName,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getPageCountAllConsumption(subInventoryName,request);
	}
	@Override
	public StockReturnDto getPaginationStockReturn(Integer startIndex,
			String subInventoryName,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getPaginationStockReturn(startIndex, subInventoryName,request);
	}
	@Override
	public Integer getPageCountAllStockReturn(String subInventoryName,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getPageCountAllStockReturn(subInventoryName,request);
	}
	@Override
	public List<ConsumptionDto> getAllConsumptionList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getAllConsumptionList(request);
	}
	@Override
	public GoodsIssueMrnMasterDto viewReceivedGeneratedMRNData(
			Integer goodsIssueMasterId) {
		return subInventoryDaoM.viewReceivedGeneratedMRNData(goodsIssueMasterId);
	}
	@Override
	public MrnMasterDTO viewGeneratedMRNData(Integer id,
			HttpServletRequest request) {
		return subInventoryDaoM.viewGeneratedMRNData(id, request);
	}
	@Override
	public Integer getCurrentInventoryStock(int itemMasterId,
			HttpServletRequest httpRequest) {
		return subInventoryDaoM.getCurrentInventoryStock(itemMasterId, httpRequest);
	}
	@Override
	public List<GoodsIssueMrnMasterDto>  searchReceivedMRN(int mrnMasterId,String subInventoryName,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.searchReceivedMRN(mrnMasterId, subInventoryName, request);
	}
	@Override
	public  List<MrnMasterDTO> searchMRN(int mrnMasterId, String subInventoryName, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.searchMRN(mrnMasterId,subInventoryName, request);
	}
	@Override
	public List<ConsumptionDto> getAutoItemNameOnConsumption(
			String subInventoryName, String itemName, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getAutoItemNameOnConsumption(subInventoryName, itemName, request);
	}
	@Override
	public List<ConsumptionDto> getConsumptionListByDate(
			String subInventoryName, String fromDate, String toDate,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getConsumptionListByDate(subInventoryName, fromDate, toDate, request);
	}
	
	@Override
	public List<ConsumptionItemSlaveDto> getConsumptionItemSlaveDtoList(
			Integer consumptionSlaveId, HttpServletRequest request){
		return subInventoryDaoM.getConsumptionItemSlaveDtoList(consumptionSlaveId, request);
	}
	@Override
	public List<ConsumptionDto> searchItemNameOnConsumption(
			String subInventoryName, String itemName, Integer itemId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.searchItemNameOnConsumption(subInventoryName, itemName, itemId, request);
	}
	@Override
	public List<ConsumptionDto> getConsumptionTypeListForConsumtionReport(
			Integer subInvId, String consumptionType, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subInventoryDaoM.getConsumptionTypeListForConsumtionReport(subInvId, consumptionType, request);
	}
	
}

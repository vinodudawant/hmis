package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.GoodsIssueDaoMNew;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnMasterDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.service.GoodsIssueServiceMNew;

@Service
@Transactional
public class GoodsIssueServiceImplMNew implements GoodsIssueServiceMNew{

@Autowired
SessionFactory sessionFactory;

@Autowired
private GoodsIssueDaoMNew goodsIssueDaoMNew;


/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @Comment to get generated mrn details on goods issue
 */
@Override
public List<MrnMasterDTO> getGeneratedMRNID(HttpServletRequest request) {
    return goodsIssueDaoMNew.getGeneratedMRNID(request);
}


/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @Comment to get mrn details by using id
 */
@Override
public MrnMasterDTO getMRNDetailsByMrnId(Integer mrnId,HttpServletRequest request) {
	return  goodsIssueDaoMNew.getMRNDetailsByMrnId(mrnId,request);
}


/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @Comment to get goods issue item batch details
 */
@Override
public List<BatchStockDto> getGoodsIssueItemBatchDetails(
		Integer itemMasteId, Integer mrnMasterId,Integer subInventoryId,HttpServletRequest request) {
	return goodsIssueDaoMNew.getGoodsIssueItemBatchDetails(itemMasteId, mrnMasterId,subInventoryId,request);
}

/**
 * @since 21-05-2020
 * @author Rohit Sandbhor
 * @comment this method is created for to save generate MRN request
 * @param generateMRNItemSlaveDetails
 * @param mrnMasterDTO
 * @return
 */
@Override
public int saveGoodsIssueMRNRequest(GoodsIssueMrnMasterDto goodsIssueMrnMasterDto,String goodsIssueMrnItemSlaveDetails,HttpServletRequest request) {
	return goodsIssueDaoMNew.saveGoodsIssueMRNRequest(goodsIssueMrnMasterDto, goodsIssueMrnItemSlaveDetails,request);
}


/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @Comment get page count all goods issue for pagination
 */
@Override
public Integer getPageCountAllGoodsIssue(HttpServletRequest request) {
	return goodsIssueDaoMNew.getPageCountAllGoodsIssue(request);
}


/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @Comment to get goods issue modal pagination
 */
@Override
public MrnMasterDTO getGoodsIssueModalPagination(Integer startIndex,HttpServletRequest request) {
	return goodsIssueDaoMNew.getGoodsIssueModalPagination(startIndex,request);
}

/**
 * @since 28-05-2020
 * @author Rohit Sandbhor
 * @comment this method is created for to get All Good Issue Details 
 * 
 */
@Override
public List<GoodsIssueMrnMasterDto> getAllGoodIssue(Integer unitId,	HttpServletRequest request) {
	return goodsIssueDaoMNew.getAllGoodIssue(unitId, request);
}

/**
 * @since 28-05-2020
 * @author Rohit Sandbhor 
 * @comment to get the page count of all goods issue leads
 */
@Override
public Integer getPageCountAllGoodsIssueLeads(HttpServletRequest request) {
	return goodsIssueDaoMNew.getPageCountAllGoodsIssueLeads(request);
}


/**
 * @since 28-05-2020
 * @author Rohit Sandbhor
 * @Comment to get goods issue list pagination
 */
@Override
public GoodsIssueMrnMasterDto paginationGoodsIssueList(Integer startIndex,HttpServletRequest request) {
	return goodsIssueDaoMNew.paginationGoodsIssueList(startIndex,request);
}

/**
 * @since 28-05-2020
 * @author Rohit Sandbhor
 * @comment added this method to search all generated mrn request data using subinventory id
 */
@Override
public List<MrnMasterDTO> searchAllGeneratedMRNRequestData(
		Integer subInventoryId, HttpServletRequest request) {
	return goodsIssueDaoMNew.searchAllGeneratedMRNRequestData(subInventoryId,request);
}
/**
 * 
 */
@Override
public GoodsIssueMrnMasterDto getGoodIssueMRNPagination(Integer startIndex,String subInventoryName,HttpServletRequest request) {
	return goodsIssueDaoMNew.getGoodIssueMRNPagination(startIndex,subInventoryName,request);
}
/**
 * 
 */
@Override
public List<GoodsIssueMrnMasterDto> getGoodIssueById(Integer subInvId,HttpServletRequest request) {
	return goodsIssueDaoMNew.getGoodIssueById(subInvId,request);
}
/**
 * 
 */
@Override
public GoodsIssueMrnMasterDto editGeneratedMRNDataForAppoval(Integer id,HttpServletRequest request) {
	return goodsIssueDaoMNew.editGeneratedMRNDataForAppoval(id,request);
}
/**
 * 
 */
@Override
public Integer getPageCountAllGoodIssueMRN(String subInventoryName,HttpServletRequest request) {
	// TODO Auto-generated method stub
	return goodsIssueDaoMNew.getPageCountAllGoodIssueMRN(subInventoryName,request);
}
@Override
public List<GoodsIssueMrnMasterDto> getAllGoodsIssueMRNDataForAppoval(
		String subInventoryName, HttpServletRequest request) {
	return goodsIssueDaoMNew.getAllGoodsIssueMRNDataForAppoval(subInventoryName, request);
}


@Override
public List<BatchStockDto> getGoodsIssueItemBatchDetailsWithoutSubinventoryId(
		Integer itemMasteId, Integer mrnMasterId, HttpServletRequest request) {
	return goodsIssueDaoMNew.getGoodsIssueItemBatchDetailsWithoutSubinventoryId(itemMasteId, mrnMasterId,request);
}


@Override
public Integer getCurrentSubInventoryStockWithoutBatch(Integer itemMasterId,
		Integer subInventoryId) {
	return goodsIssueDaoMNew.getCurrentSubInventoryStockWithoutBatch(itemMasterId, subInventoryId);
}

}

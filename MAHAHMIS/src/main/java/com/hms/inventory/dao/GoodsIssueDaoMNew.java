package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnMasterDto;
import com.hms.inventory.dto.MrnMasterDTO;

public interface GoodsIssueDaoMNew {

//to get MRN ID on goods issue
public List<MrnMasterDTO> getGeneratedMRNID(HttpServletRequest request);
public MrnMasterDTO getMRNDetailsByMrnId(Integer mrnId,HttpServletRequest request);
//This method is created for to get item wise batch details on goods issue
public List<BatchStockDto> getGoodsIssueItemBatchDetails(Integer itemMasteId,Integer mrnMasterId,Integer subInventoryId,HttpServletRequest request);
//save goods issue mrn master dto
public int saveGoodsIssueMRNRequest(GoodsIssueMrnMasterDto goodsIssueMrnMasterDto,String goodsIssueMrnItemSlaveDetails,HttpServletRequest request);
//to get total count of records
public Integer getPageCountAllGoodsIssue(HttpServletRequest request);
//to get goods issue modal pagination
public MrnMasterDTO getGoodsIssueModalPagination(Integer startIndex,HttpServletRequest request);
//to get All  goods issue
public List<GoodsIssueMrnMasterDto> getAllGoodIssue(Integer unitId,HttpServletRequest request);
//to get the count of all goods issue leads
public Integer getPageCountAllGoodsIssueLeads(HttpServletRequest request);
//to get the goods issue leads for pagination
public GoodsIssueMrnMasterDto paginationGoodsIssueList(Integer startIndex,HttpServletRequest request);
//This method is created to get generated MRN data using store id as input on goods issue modal
public List<MrnMasterDTO> searchAllGeneratedMRNRequestData(Integer subInventoryId,HttpServletRequest request);
// to get goods issue mrn pagination using start index
public GoodsIssueMrnMasterDto getGoodIssueMRNPagination(Integer startIndex,String subInventoryName,HttpServletRequest request);
//to get All  goods issue by using sub inv id
public List<GoodsIssueMrnMasterDto> getGoodIssueById(Integer subInvId,HttpServletRequest request);
//edit generated mrn data
public GoodsIssueMrnMasterDto editGeneratedMRNDataForAppoval(Integer id,HttpServletRequest request);
//
public Integer getPageCountAllGoodIssueMRN(String subInventoryName,HttpServletRequest request);
//generated mrn all data
public List<GoodsIssueMrnMasterDto> getAllGoodsIssueMRNDataForAppoval(String subInventoryName,HttpServletRequest request);
//This method is created for to get item wise batch details on goods issue
public List<BatchStockDto> getGoodsIssueItemBatchDetailsWithoutSubinventoryId(Integer itemMasteId,Integer mrnMasterId,HttpServletRequest request);
public Integer getCurrentSubInventoryStockWithoutBatch(Integer itemMasterId,Integer subInventoryId);

}

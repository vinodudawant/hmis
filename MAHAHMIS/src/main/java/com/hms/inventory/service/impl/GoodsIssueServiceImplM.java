package com.hms.inventory.service.impl;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.GoodsIssueDaoM;
import com.hms.inventory.service.GoodsIssueServiceM;

@Service
@Transactional
public class GoodsIssueServiceImplM implements GoodsIssueServiceM{
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	private GoodsIssueDaoM goodsIssueDaoM;
	
//	@Override
//	public List<MrnMasterDTO> getGeneratedMRNID() {
//		// TODO Auto-generated method stub
//	    return goodsIssueDaoM.getGeneratedMRNID();
//	}
//	
//	@Override
//	public int getCurrentInventoryStock(int itemMasterId, String itemBatchCode,String expDate,HttpServletRequest httpRequest) {
//		return goodsIssueDaoM.getCurrentInventoryStock(itemMasterId, itemBatchCode,expDate,httpRequest);
//	}

	/**
	 * @since 05-05-2019
	 * @author Rohit Sandbhor
	 * @comment this method is created for to save generate MRN request
	 * @param generateMRNItemSlaveDetails
	 * @param mrnMasterDTO
	 * @return
	 */
//	@Override
//	public int saveGoodsIssueMRNRequest(GoodsIssueMrnMasterDto goodsIssueMrnMasterDto,String goodsIssueMrnItemSlaveDetails) {
//		return goodsIssueDaoM.saveGoodsIssueMRNRequest(goodsIssueMrnMasterDto, goodsIssueMrnItemSlaveDetails);
//	}

//	@Override
//	public GoodsIssueMrnMasterDto editGeneratedMRNDataForAppoval(Integer id) {
//		return goodsIssueDaoM.editGeneratedMRNDataForAppoval(id);
//	}

//	@Override
//	public List<GoodsIssueMrnMasterDto> getAllGoodsIssueMRNDataForAppoval(
//			String subInventoryName, HttpServletRequest request) {
//		return goodsIssueDaoM.getAllGoodsIssueMRNDataForAppoval(subInventoryName, request);
//	}
	
	/**
	 * @since 27-12-2019
	 * @comment This method is created for to edit generated MRN details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
//	@Override
//	public MrnMasterDTO editGeneratedMRNDataGoodsIssue(Integer id) {
//		return goodsIssueDaoM.editGeneratedMRNDataGoodsIssue(id);
//	}

	/**
	 * @since 20-02-2020
	 * @author Dayanand Khandekar
	 * @comment this method is created for to get All Good Issue Details 
	 * 
	 */
//	@Override
//	public List<GoodsIssueMrnMasterDto> getAllGoodIssue(Integer unitId,	HttpServletRequest request) {
//		return goodsIssueDaoM.getAllGoodIssue(unitId, request);
//	}

	
	/**
	 * @since 20-02-2020
	 * @author Dayanand Khandekar
	 * @comment this method is created for to get  Good Issue Details By subInv ID
	 * 
	 */
//	@Override
//	public GoodsIssueMrnMasterDto getGoodIssueById(Integer subInvId) {
//		// TODO Auto-generated method stub
//		return (GoodsIssueMrnMasterDto) sessionFactory.getCurrentSession().get(GoodsIssueMrnMasterDto.class, subInvId);
//	}

//	@Override
//	public GoodsIssueMrnMasterDto getGoodIssueMRNPagination(Integer startIndex,
//			String subInventoryName) {
//		// TODO Auto-generated method stub
//		return goodsIssueDaoM.getGoodIssueMRNPagination(startIndex,subInventoryName);
//	}

//	@Override
//	public Integer getPageCountAllGoodIssueMRN(String subInventoryName) {
//		// TODO Auto-generated method stub
//		return goodsIssueDaoM.getPageCountAllGoodIssueMRN(subInventoryName);
//	}

}

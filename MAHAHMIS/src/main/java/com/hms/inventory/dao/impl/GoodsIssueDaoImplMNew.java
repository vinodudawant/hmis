package com.hms.inventory.dao.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.GoodsIssueDaoMNew;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.GoodsIssueMrnMasterDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class GoodsIssueDaoImplMNew implements GoodsIssueDaoMNew {


static Logger log=Logger.getLogger(GoodsIssueDaoImplMNew.class.getName());

@Autowired
SessionFactory sessionFactory;

@Autowired
GoodsIssueMrnMasterDto goodsIssueMrnMasterDto;

/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @comment to get generated mrn id and details
 */
@Override
public List<MrnMasterDTO> getGeneratedMRNID(HttpServletRequest request) {
	Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
			MrnMasterDTO.class);
	Criterion cr1 = Restrictions.eq("mrnStatus", "IN-PROCESS");
	Criterion cr2 = Restrictions.eq("mrnStatus", "PartiallyReceived");
	Criterion cr3 = Restrictions.eq("mrnStatus", "PartiallyReceivedQty");
	criteria.add(Restrictions.or(cr1, cr2 , cr3));
	criteria.add(Restrictions.eq("deleted", "N"));
	criteria.addOrder(Order.desc("mrnId"));
	criteria.setMaxResults(10);
	log.debug("reponse getGeneratedMRNID....."+criteria.list());
	return criteria.list();
}

/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @comment to get mrn details by mrn id
 */
@Override
public MrnMasterDTO getMRNDetailsByMrnId(Integer mrnId,HttpServletRequest request) {
	MrnMasterDTO mrnMasterDTO = new MrnMasterDTO();
	System.out.println("mrnId::"+mrnId);
	try {
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(MrnMasterDTO.class);
		criteria.add(Restrictions.eq("mrnId", mrnId));
		mrnMasterDTO = (MrnMasterDTO) criteria.uniqueResult();
		log.debug("reponse getMRNDetailsByMrnId....."+mrnMasterDTO);
	} catch (Exception e) {
		log.error("error for getMRNDetailsByMrnId...." + e.getMessage());
		e.printStackTrace();
	}
	return mrnMasterDTO;
}

/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @comment to get goods issue item batch details using item master id and
 *          mrn master id
 */
@Override
public List<BatchStockDto> getGoodsIssueItemBatchDetails(
		Integer itemMasteId, Integer mrnMasterId,Integer subInventoryId,HttpServletRequest request) {
	List<BatchStockDto> batchStockDtos = new ArrayList<BatchStockDto>();
	String sql = "";
	try {
		/*sql = "select bs.current_sub_inventory_stock as current_sub_inventory_stock,bs.item_name,bs.item_batch_code,bs.item_batch_exp_date,bs.item_quantity as current_inv_stock from inv_batch_stock_new as bs where bs.item_master_id="
				+ itemMasteId
				+ " and bs.item_quantity > 0";*/
		/*if(currentSubInvStockFromMrnSlave > 0){
		sql = "select IF(SUM(goodsIssueSlave.current_subinventory_stock) > 0,SUM(goodsIssueSlave.current_subinventory_stock),0) AS current_sub_inventory_stock,bs.item_name,bs.item_batch_code,bs.item_batch_exp_date,bs.item_quantity as current_inv_stock from inv_batch_stock_new as bs LEFT JOIN inv_goods_issue_mrn_item_slave_new goodsIssueSlave on bs.item_batch_code = goodsIssueSlave.item_batch_code where bs.item_master_id="
				+ itemMasteId
				+ " and bs.item_quantity > 0 AND goodsIssueSlave.sub_inventory_id ="+subInventoryId+" GROUP BY bs.id UNION ALL SELECT bs.current_sub_inventory_stock AS current_sub_inventory_stock,bs.item_name,bs.item_batch_code,bs.item_batch_exp_date,bs.item_quantity AS current_inv_stock FROM inv_batch_stock_new AS bs WHERE bs.item_master_id = "+itemMasteId+" AND bs.item_quantity > 0 AND bs.updated_by = 0 GROUP BY bs.id";
		Query masterJoinQuery = sessionFactory.getCurrentSession()
				.createSQLQuery(sql);
		System.out.println("sql::"+sql);
		masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listSubInvStockBatchWise = masterJoinQuery
				.list();
		for (Map<String, Object> row : listSubInvStockBatchWise) {
			BatchStockDto stockDto = new BatchStockDto();
			stockDto.setCurrentSubInventoryStockBatchStock((BigDecimal) row
					.get("current_sub_inventory_stock"));
			stockDto.setItemName((String) row.get("item_name"));
			stockDto.setItemBatchCode((String) row.get("item_batch_code"));
			stockDto.setItemBatchExpDate((Date) row
					.get("item_batch_exp_date"));
			stockDto.setItemQuantity((Integer) row.get("current_inv_stock"));
			batchStockDtos.add(stockDto);
		}
		}*/
			//sql = "SELECT bs.current_sub_inventory_stock AS current_sub_inventory_stock,bs.item_name,bs.item_batch_code,bs.item_batch_exp_date,bs.item_quantity AS current_inv_stock FROM inv_batch_stock_new AS bs WHERE bs.item_master_id = "+itemMasteId+" AND bs.item_quantity > 0  GROUP BY bs.id";
			sql = "SELECT bs.batch_master_id,bs.item_name,bs.item_batch_code,bs.item_batch_exp_date,bs.item_quantity AS current_inv_stock FROM inv_batch_stock_new AS bs WHERE bs.item_master_id = "+itemMasteId+" AND bs.item_quantity > 0  GROUP BY bs.id";
			Query masterJoinQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			System.out.println("sql::"+sql);
			masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listSubInvStockBatchWise = masterJoinQuery
					.list();
			for (Map<String, Object> row : listSubInvStockBatchWise) {
				BatchStockDto stockDto = new BatchStockDto();
				stockDto.setItemName((String) row.get("item_name"));
				stockDto.setItemBatchCode((String) row.get("item_batch_code"));
				stockDto.setItemBatchExpDate((Date) row
						.get("item_batch_exp_date"));
				stockDto.setItemQuantity((Integer) row.get("current_inv_stock"));
				//added by Rohit on 04-01-2021 to get appropriate MRN issue report
				stockDto.setBatchMasterId((Integer) row.get("batch_master_id"));
				batchStockDtos.add(stockDto);
			}
		
		
		log.debug("reponse getGoodsIssueItemBatchDetails....."+batchStockDtos);
	} catch (Exception e) {
		log.error("error for getGoodsIssueItemBatchDetails...." + e.getMessage());
		e.printStackTrace();
	}
	return batchStockDtos;
}

/**
 * @author Rohit Sandbhor
 * @since 21-05-2020
 * @comment to save goods issue mrn request module
 */
@Override
public int saveGoodsIssueMRNRequest(
		GoodsIssueMrnMasterDto goodsIssueMrnMasterDto,
		String goodsIssueMrnItemSlaveDetails,HttpServletRequest request) {
	try {
		int itemMasterId = 0;
		int mrnItemSlaveId = 0;
		int mrnId = 0;
		int totalItemIssueQuantity = 0;
		int curreentItemQuantity = 0;
		int pendingRequestQuantityGoodsIssueSlave;
		int totalPendingItemQuantity = 0;
		if (goodsIssueMrnMasterDto.getId() == 0) {
			GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto = (GoodsIssueMrnItemSlaveDto) ConfigUIJSONUtility.getObjectFromJSON(goodsIssueMrnItemSlaveDetails,GoodsIssueMrnItemSlaveDto.class);
			System.out.println("goodsIssueMrnItemSlaveDto::::"+goodsIssueMrnItemSlaveDto.toString());
			List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = goodsIssueMrnItemSlaveDto.getGoodsIssueMrnItemSlaveDtos();

			goodsIssueMrnMasterDto
					.setGoodsIssueMrnItemSlaveDtos(goodsIssueMrnItemSlaveDtos);
			for (GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto2 : goodsIssueMrnItemSlaveDtos) {
				itemMasterId = goodsIssueMrnItemSlaveDto2.getItemMasterId();
				mrnItemSlaveId = goodsIssueMrnItemSlaveDto2.getMrnItemSlaveId();
				curreentItemQuantity = goodsIssueMrnItemSlaveDto2.getItemIssueQty().intValue();
				totalItemIssueQuantity = totalItemIssueQuantity + curreentItemQuantity;
				// below query to update pending request item quantity and
				// item issue quantity w.r.t item slave id of goods issue
				// item slave
				Query sql = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"Update inv_mrn_item_info_slave_new set "
										+ "pending_request_item_quantity="
										+ goodsIssueMrnItemSlaveDto2
												.getPendingRequestItemQuantity()
										+ "," + "item_issue_qty="
										+ totalItemIssueQuantity
										+ "," + "item_canceled_qty="
										+ goodsIssueMrnItemSlaveDto2.getItemCanceledQty()
										+ " where item_info_id="
										+ mrnItemSlaveId + "");
				sql.executeUpdate();
				pendingRequestQuantityGoodsIssueSlave = goodsIssueMrnItemSlaveDto2.getPendingRequestItemQuantity();
				totalPendingItemQuantity = totalPendingItemQuantity + pendingRequestQuantityGoodsIssueSlave;
				System.out.println("totalPendingItemQuantity::"+totalPendingItemQuantity);
				mrnId = goodsIssueMrnMasterDto.getMrnId();
				//added on 09-11-2020
				if(pendingRequestQuantityGoodsIssueSlave == 0){
					Query sqlUpdate = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"Update inv_mrn_item_info_slave_new set "
											+ "updated_by = 1 "
											+ " where item_info_id="
											+ mrnItemSlaveId + "");
					System.out.println("pendingRequestQuantityGoodsIssueSlave::"+pendingRequestQuantityGoodsIssueSlave);
					System.out.println("sqlUpdate::"+sqlUpdate);
					sqlUpdate.executeUpdate();
				}
				
			}
			if (totalPendingItemQuantity == 0) {
				Query updateMrnStatus = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"Update inv_mrn_master_new set "
										+ "mrn_status='Dispatched' where mrn_id="
										+ mrnId + "");
				updateMrnStatus.executeUpdate();
			}else{
				Query updateMrnStatus = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"Update inv_mrn_master_new set "
										+ "mrn_status='PartiallyReceived' where mrn_id="
										+ mrnId + "");
				updateMrnStatus.executeUpdate();
			}
			GoodsIssueMrnMasterDto dto = (GoodsIssueMrnMasterDto) sessionFactory.getCurrentSession().merge(goodsIssueMrnMasterDto);
			log.debug("reponse saveGoodsIssueMRNRequest....."+dto);
			return 1;
		} else {
			GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto = (GoodsIssueMrnItemSlaveDto) ConfigUIJSONUtility
					.getObjectFromJSON(goodsIssueMrnItemSlaveDetails,
							GoodsIssueMrnItemSlaveDto.class);
			List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = goodsIssueMrnItemSlaveDto
					.getGoodsIssueMrnItemSlaveDtos();

			for (GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto2 : goodsIssueMrnItemSlaveDtos) {
				itemMasterId = goodsIssueMrnItemSlaveDto2.getItemMasterId();
				mrnItemSlaveId = goodsIssueMrnItemSlaveDto2
						.getMrnItemSlaveId();
				// below query to update pending request item quantity w.r.t
				// item slave id of goods issue item slave
				Query sql = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"Update inv_mrn_item_info_slave_new set pending_request_item_quantity="
										+ goodsIssueMrnItemSlaveDto2
												.getPendingRequestItemQuantity()
										+ "," + "item_canceled_qty="
										+ goodsIssueMrnItemSlaveDto2.getItemCanceledQty()
										+ " where item_info_id="
										+ mrnItemSlaveId + "");
				sql.executeUpdate();
			}
			goodsIssueMrnMasterDto.setGoodsIssueMrnItemSlaveDtos(goodsIssueMrnItemSlaveDtos);
			GoodsIssueMrnMasterDto dto = (GoodsIssueMrnMasterDto)sessionFactory.getCurrentSession().merge(goodsIssueMrnItemSlaveDto);
			log.debug("reponse saveGoodsIssueMRNRequest....."+dto);
			return 2;

		}
	} catch (Exception e) {
		log.error("error for saveGoodsIssueMRNRequest...." + e.getMessage());
		e.printStackTrace();
	}
	return 0;
}

/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @comment to get page count of all mrn leads
 */
@Override
public Integer getPageCountAllGoodsIssue(HttpServletRequest request) {
	Integer countNew = 0;
	try {
		String sql = "";
		sql = "SELECT count(*) FROM inv_mrn_master_new as mrn";
		Query countQuery = sessionFactory.getCurrentSession()
				.createSQLQuery(sql);
		countNew = ((Number) countQuery.uniqueResult()).intValue();
		log.debug("reponse getPageCountAllGoodsIssue....."+countNew);
	} catch (Exception e) {
		log.error("error for getPageCountAllGoodsIssue...." + e.getMessage());
		e.printStackTrace();
	}
	return countNew;
}

/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @comment to get goods issue modal pagination
 */
@Override
public MrnMasterDTO getGoodsIssueModalPagination(Integer startIndex,HttpServletRequest request) {
	MrnMasterDTO mrnMasterDTO = new MrnMasterDTO();
	List<MrnMasterDTO> masterDTOs = new ArrayList<MrnMasterDTO>();
	String sql = "";
	try {
		sql = "SELECT * from inv_mrn_master_new where deleted != 'Y' order by mrn_id desc";
		if (sql != null) {
			SQLQuery query = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			List<Map<String, Object>> list = query.list();
			for (Map<String, Object> row : list) {
				MrnMasterDTO obj = new MrnMasterDTO();
				obj.setMrnId((Integer) row.get("mrn_id"));
				obj.setCreatedDate((Date) row.get("created_date_time"));
				obj.setMrnSubinventoryName((String) row
						.get("mrn_subinventory_name"));
				obj.setMrnStatus((String) row.get("mrn_status"));
				masterDTOs.add(obj);
			}

		}
	} catch (Exception e) {
		log.error("error for getGoodsIssueModalPagination...." + e.getMessage());
		e.printStackTrace();
	}
	mrnMasterDTO.setLstmrnmaster(masterDTOs);
	log.debug("reponse getGoodsIssueModalPagination....."+mrnMasterDTO);
	return mrnMasterDTO;
}

/**
 * @author Rohit Sanbhor
 * @since 28-05-2020
 * @comment this function is to get all goods issue leads
 */
@Override
public List<GoodsIssueMrnMasterDto> getAllGoodIssue(Integer unitId,
		HttpServletRequest request) {
	List<GoodsIssueMrnMasterDto> lstGoodsIssueMrn = new ArrayList<GoodsIssueMrnMasterDto>();
	try {
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(GoodsIssueMrnMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.setMaxResults(10);
		criteria.addOrder(Order.desc("id"));
		lstGoodsIssueMrn = criteria.list();
		log.debug("reponse getAllGoodIssue....."+lstGoodsIssueMrn);
	} catch (Exception e) {
		log.error("error for getAllGoodIssue...." + e.getMessage());
		e.printStackTrace();
	}
	return lstGoodsIssueMrn;
}

/**
 * @author Rohit Sanbhor
 * @since 28-05-2020
 * @comment added this method for get page count of all goods issue leads for outer table
 */
@Override
public Integer getPageCountAllGoodsIssueLeads(HttpServletRequest request) {
	Integer countNew = 0;
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		String sql = "";
		sql = "SELECT count(*) FROM inv_goods_issue_mrn_master_new WHERE deleted != 'Y' and unit_id="+unitId;
		Query countQuery = sessionFactory.getCurrentSession()
				.createSQLQuery(sql);
		countNew = ((Number) countQuery.uniqueResult()).intValue();
		log.debug("reponse getPageCountAllGoodsIssueLeads....."+countNew);
	} catch (Exception e) {
		log.error("error for getPageCountAllGoodsIssueLeads...." + e.getMessage());
		e.printStackTrace();
	}
	return countNew;
}

@Override
public GoodsIssueMrnMasterDto paginationGoodsIssueList(Integer startIndex,HttpServletRequest request) {
	GoodsIssueMrnMasterDto goodsIssueMrnMasterDto = new GoodsIssueMrnMasterDto();
	List<GoodsIssueMrnMasterDto> masterDTOs = new ArrayList<GoodsIssueMrnMasterDto>();
	String sql = "";
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		sql = "SELECT * from inv_goods_issue_mrn_master_new where deleted != 'Y' and unit_id="+unitId+" order by id desc";
		if (sql != null) {
			SQLQuery query = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			List<Map<String, Object>> list = query.list();
			for (Map<String, Object> row : list) {
				GoodsIssueMrnMasterDto obj = new GoodsIssueMrnMasterDto();
				obj.setMrnId((Integer) row.get("mrn_id"));
				obj.setCreatedDate((Date) row.get("created_date_time"));
				obj.setMrnSubinventoryName((String) row
						.get("mrn_subinventory_name"));
				obj.setMrnStatus((String) row.get("mrn_status"));
				obj.setMrnDate((String) row.get("mrn_date"));
				masterDTOs.add(obj);
			}

		}
		
	} catch (Exception e) {
		log.error("error for paginationGoodsIssueList...." + e.getMessage());
		e.printStackTrace();
	}
	goodsIssueMrnMasterDto.setLstGoodsIssueMrnMaster(masterDTOs);
	log.debug("reponse paginationGoodsIssueList....."+goodsIssueMrnMasterDto);
	return goodsIssueMrnMasterDto;
}

/**
 * @author Rohit sandbhor
 * @since 02-06-2020
 * @comment this method is created for to do search operation on goods issue
 *          modal for getting the exact result
 */
@Override
public List<MrnMasterDTO> searchAllGeneratedMRNRequestData(
		Integer subInventoryId,HttpServletRequest request) {
	List<MrnMasterDTO> list = new ArrayList<MrnMasterDTO>();
	String sql = "";
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
		Criterion cr1 = Restrictions.eq("mrnStatus", "IN-PROCESS");
		Criterion cr2 = Restrictions.eq("mrnStatus", "PartiallyReceived");
		Criterion cr3 = Restrictions.eq("mrnStatus", "PartiallyReceivedQty");
		criteria.add(Restrictions.or(cr1, cr2 , cr3));
		criteria.add(Restrictions.eq("mrnSubinventoryId", subInventoryId));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.addOrder(Order.desc("mrnId"));
		
		list = criteria.list();
		log.debug("reponse searchAllGeneratedMRNRequestData....."+list);
	} catch (Exception e) {
		log.error("error for searchAllGeneratedMRNRequestData...." + e.getMessage());
		e.printStackTrace();
	}
	return list;
}

/**
 * 
 */
@Override
public GoodsIssueMrnMasterDto getGoodIssueMRNPagination(Integer startIndex,
		String subInventoryName,HttpServletRequest request) {
		List<GoodsIssueMrnMasterDto> lstGoodsIssueMrn =new ArrayList<GoodsIssueMrnMasterDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnSubinventoryName", subInventoryName));
			criteria.addOrder(Order.desc("id"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			lstGoodsIssueMrn=criteria.list();
			goodsIssueMrnMasterDto.setLstGoodsIssueMrnMaster(lstGoodsIssueMrn);
			log.debug("reponse getGoodIssueMRNPagination....."+goodsIssueMrnMasterDto);
		}catch(Exception e){
			log.error("error for getGoodIssueMRNPagination...." + e.getMessage());
			e.printStackTrace();
		}
		return goodsIssueMrnMasterDto;
}

@Override
public List<GoodsIssueMrnMasterDto> getGoodIssueById(Integer subInvId,HttpServletRequest request) {
	List<GoodsIssueMrnMasterDto> lstGoodsIssueMrnMaster =new ArrayList<GoodsIssueMrnMasterDto>();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("mrnSubinventoryId", subInvId));
		criteria.addOrder(Order.desc("id"));
		criteria.add(Restrictions.eq("unitId", unitId));
		lstGoodsIssueMrnMaster=criteria.list();
		log.debug("reponse getGoodIssueById....."+lstGoodsIssueMrnMaster);
	}catch(Exception e){
		log.error("error for getGoodIssueById...." + e.getMessage());
		e.printStackTrace();
	}
	return lstGoodsIssueMrnMaster;
}

/**
 * @author Rohit Sandbhor
 * @since 29-01-2020
 * @comment to edit generate MRN data for approval w.r.t goods issue mrn master id
 */
@Override
public GoodsIssueMrnMasterDto editGeneratedMRNDataForAppoval(Integer id,HttpServletRequest request) {
	GoodsIssueMrnMasterDto goodsIssueMrnMasterDto = new GoodsIssueMrnMasterDto();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		Integer subInventoryId = 0;
		Integer itemMasterId = 0;
		String sql = "";
		String sqlForSubInventoryStock = "";
		List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = new ArrayList<GoodsIssueMrnItemSlaveDto>();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
		criteria.add(Restrictions.eq("id",id));
		criteria.add(Restrictions.eq("unitId", unitId));
		goodsIssueMrnMasterDto = (GoodsIssueMrnMasterDto) criteria.uniqueResult();
		for (GoodsIssueMrnItemSlaveDto m1 : goodsIssueMrnMasterDto.getGoodsIssueMrnItemSlaveDtos()) {
			if(goodsIssueMrnItemSlaveDtos.size() <= 1){
			subInventoryId =  goodsIssueMrnMasterDto.getMrnSubinventoryId();
			itemMasterId =  m1.getItemMasterId();
		//sql = "SELECT IF(SUM(goodsIssueSlave.current_subinventory_stock) > 0,SUM(goodsIssueSlave.current_subinventory_stock),0) AS current_sub_inventory_stock,goodsIssueSlave.item_batch_code,goodsIssueSlave.item_batch_exp_date,goodsIssueSlave.item_master_id,goodsIssueSlave.item_name,goodsIssueSlave.requested_item_quantity,goodsIssueSlave.item_issue_qty,batchStock.item_uom_name,goodsIssueSlave.mrn_status,goodsIssueSlave.id,goodsIssueSlave.mrn_item_slave_id,goodsIssueSlave.pending_request_item_quantity,goodsIssueSlave.updated_by FROM inv_goods_issue_mrn_item_slave_new as goodsIssueSlave LEFT JOIN inv_batch_stock_new batchStock ON batchStock.item_batch_code = goodsIssueSlave.item_batch_code WHERE goods_issue_id="+id+" AND (goodsIssueSlave.mrn_status = 'FullyReceived' OR goodsIssueSlave.mrn_status = 'PartiallyReceivedQty' OR goodsIssueSlave.mrn_status = 'Dispatched' OR goodsIssueSlave.mrn_status = 'In-Process' OR goodsIssueSlave.mrn_status = 'PartiallyReceived') AND goodsIssueSlave.deleted != 'Y'  GROUP BY goodsIssueSlave.id";
			sql = "SELECT mrnSlave.current_subinventory_stock AS current_sub_inventory_stock,goodsIssueSlave.item_batch_code,goodsIssueSlave.item_batch_exp_date,goodsIssueSlave.item_master_id,goodsIssueSlave.item_name,goodsIssueSlave.requested_item_quantity,goodsIssueSlave.item_issue_qty,batchStock.item_uom_name,goodsIssueSlave.mrn_status,goodsIssueSlave.id,goodsIssueSlave.mrn_item_slave_id,goodsIssueSlave.pending_request_item_quantity,goodsIssueSlave.updated_by,goodsIssueSlave.item_canceled_qty FROM inv_goods_issue_mrn_item_slave_new as goodsIssueSlave LEFT JOIN inv_batch_stock_new batchStock ON batchStock.item_batch_code = goodsIssueSlave.item_batch_code LEFT JOIN inv_mrn_item_info_slave_new as mrnSlave ON mrnSlave.item_master_id = goodsIssueSlave.item_master_id WHERE goods_issue_id="+id+" AND (goodsIssueSlave.mrn_status = 'FullyReceived' OR goodsIssueSlave.mrn_status = 'PartiallyReceivedQty' OR goodsIssueSlave.mrn_status = 'Dispatched' OR goodsIssueSlave.mrn_status = 'In-Process' OR goodsIssueSlave.mrn_status = 'PartiallyReceived') AND goodsIssueSlave.deleted != 'Y' Group BY goodsIssueSlave.id";
			//sql = "SELECT IF(SUM(goodsIssueSlave.current_subinventory_stock) > 0,SUM(goodsIssueSlave.current_subinventory_stock),0) AS current_sub_inventory_stock,goodsIssueSlave.item_batch_code,goodsIssueSlave.item_batch_exp_date,goodsIssueSlave.item_master_id,goodsIssueSlave.item_name,goodsIssueSlave.requested_item_quantity,goodsIssueSlave.item_issue_qty,batchStock.item_uom_name,goodsIssueSlave.mrn_status,goodsIssueSlave.id,goodsIssueSlave.mrn_item_slave_id,goodsIssueSlave.pending_request_item_quantity,goodsIssueSlave.updated_by FROM inv_goods_issue_mrn_item_slave_new as goodsIssueSlave LEFT JOIN inv_batch_stock_new batchStock ON batchStock.item_batch_code = goodsIssueSlave.item_batch_code LEFT JOIN inv_mrn_item_info_slave_new as mrnSlave ON mrnSlave.item_master_id = goodsIssueSlave.item_master_id WHERE goods_issue_id="+id+" AND (goodsIssueSlave.mrn_status = 'FullyReceived' OR goodsIssueSlave.mrn_status = 'PartiallyReceivedQty' OR goodsIssueSlave.mrn_status = 'Dispatched' OR goodsIssueSlave.mrn_status = 'In-Process' OR goodsIssueSlave.mrn_status = 'PartiallyReceived') AND goodsIssueSlave.deleted != 'Y' AND goodsIssueSlave.updated_by= 1  GROUP BY goodsIssueSlave.id";
			
		System.out.println("editGeneratedMRNDataForAppoval sql************************"+sql);
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listMap = getMaster.list();
		for(Map<String, Object> row : listMap){
			GoodsIssueMrnItemSlaveDto obj = new GoodsIssueMrnItemSlaveDto();
			obj.setItemBatchCode(((String)row.get("item_batch_code")));
			obj.setItemBatchExpDate(((String)row.get("item_batch_exp_date")));
			obj.setItemMasterId(((Integer)row.get("item_master_id")));
			obj.setCurrentSubInventoryStock(((Integer)row.get("current_sub_inventory_stock")));
			obj.setRequestedItemQuantity((Integer)row.get("requested_item_quantity"));
			obj.setItemIssueQty((Integer)row.get("item_issue_qty"));
			obj.setItemName((String) row.get("item_name"));
			obj.setUomUnitName((String)row.get("item_uom_name"));
			obj.setMrnStatus((String) row.get("mrn_status"));
			obj.setId((Integer) row.get("id"));
			obj.setMrnItemSlaveId((Integer) row.get("mrn_item_slave_id"));
			obj.setPendingRequestItemQuantity((Integer) row.get("pending_request_item_quantity"));
			obj.setUpdatedBy((Integer) row.get("updated_by"));
			obj.setItemCanceledQty((Integer) row.get("item_canceled_qty"));
			goodsIssueMrnItemSlaveDtos.add(obj);
			goodsIssueMrnMasterDto.setGoodsIssueMrnItemSlaveDtos2(goodsIssueMrnItemSlaveDtos);
		}
			}
		}
		log.debug("reponse editGeneratedMRNDataForAppoval....."+goodsIssueMrnMasterDto);
	} catch (Exception e) {
		log.error("error for editGeneratedMRNDataForAppoval...." + e.getMessage());
		e.printStackTrace();
	}
	return goodsIssueMrnMasterDto;
}

@Override
public Integer getPageCountAllGoodIssueMRN(String subInventoryName,HttpServletRequest request) {
	// TODO Auto-generated method stub
	Integer countNew = 0;
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		String sql="";
		sql = " SELECT count(*) FROM inv_goods_issue_mrn_master_new as mrn where mrn_subinventory_name='"+subInventoryName+"' and unit_id="+unitId;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
		countNew = ((Number)countQuery.uniqueResult()).intValue();
		log.debug("reponse getPageCountAllGoodIssueMRN....."+countNew);
	} catch (Exception e) {
		log.error("error for getPageCountAllGoodIssueMRN...." + e.getMessage());
		e.printStackTrace();
	}
	return countNew;
}
/**
 * @author Rohit Sandbhor
 * @since 29-01-2020
 * @comment to get all issue mrn data for approval w.r.t sub inv name
 */
@Override
public List<GoodsIssueMrnMasterDto> getAllGoodsIssueMRNDataForAppoval(
		String subInventoryName, HttpServletRequest request) {
	List<GoodsIssueMrnMasterDto> lstGoodsIssueMrn =new ArrayList<GoodsIssueMrnMasterDto>();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.ilike("mrnSubinventoryName", subInventoryName,MatchMode.ANYWHERE));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.setMaxResults(10);
		criteria.addOrder(Order.desc("id"));
		lstGoodsIssueMrn=criteria.list();
		log.debug("reponse getAllGoodsIssueMRNDataForAppoval....."+lstGoodsIssueMrn);
	}catch(Exception e){
		log.error("error for getAllGoodsIssueMRNDataForAppoval...." + e.getMessage());
		e.printStackTrace();
	}
	return lstGoodsIssueMrn;
}

@Override
public List<BatchStockDto> getGoodsIssueItemBatchDetailsWithoutSubinventoryId(
		Integer itemMasteId, Integer mrnMasterId, HttpServletRequest request) {
	System.out.println("inside getGoodsIssueItemBatchDetailsWithoutSubinventoryId::");
	List<BatchStockDto> batchStockDtos = new ArrayList<BatchStockDto>();
	String sql = "";
	try {
		sql = "select bs.current_sub_inventory_stock as current_sub_inventory_stock,bs.item_name,bs.item_batch_code,bs.item_batch_exp_date,bs.item_quantity as current_inv_stock from inv_batch_stock_new as bs where bs.item_master_id="
				+ itemMasteId
				+ " and bs.item_quantity > 0";
		/*sql = "select IF(SUM(goodsIssueSlave.current_subinventory_stock) > 0,SUM(goodsIssueSlave.current_subinventory_stock),0) AS current_sub_inventory_stock,bs.item_name,bs.item_batch_code,bs.item_batch_exp_date,bs.item_quantity as current_inv_stock from inv_batch_stock_new as bs LEFT JOIN inv_goods_issue_mrn_item_slave_new goodsIssueSlave on bs.item_batch_code = goodsIssueSlave.item_batch_code where bs.item_master_id="
				+ itemMasteId
				+ " and bs.item_quantity > 0  GROUP BY bs.id ";*/
		Query masterJoinQuery = sessionFactory.getCurrentSession()
				.createSQLQuery(sql);
		System.out.println("sql::"+sql);
		masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listSubInvStockBatchWise = masterJoinQuery
				.list();
		for (Map<String, Object> row : listSubInvStockBatchWise) {
			BatchStockDto stockDto = new BatchStockDto();
			stockDto.setCurrentSubInventoryStock(0);
			stockDto.setItemName((String) row.get("item_name"));
			stockDto.setItemBatchCode((String) row.get("item_batch_code"));
			stockDto.setItemBatchExpDate((Date) row
					.get("item_batch_exp_date"));
			stockDto.setItemQuantity((Integer) row.get("current_inv_stock"));
			batchStockDtos.add(stockDto);
		}
		log.debug("reponse getGoodsIssueItemBatchDetails....."+batchStockDtos);
	} catch (Exception e) {
		log.error("error for getGoodsIssueItemBatchDetails...." + e.getMessage());
		e.printStackTrace();
	}
	return batchStockDtos;
}

@Override
public Integer getCurrentSubInventoryStockWithoutBatch(Integer itemMasterId,
		Integer subInventoryId) {
	Integer currentSubInventoryStock = 0;
	String sql = null;
	sql = "SELECT  IF(SUM(goodsIssueSlave.current_subinventory_stock) > 0,SUM(goodsIssueSlave.current_subinventory_stock),0) AS current_sub_inventory_stock FROM inv_goods_issue_mrn_item_slave_new AS goodsIssueSlave WHERE goodsIssueSlave.sub_inventory_id = "+subInventoryId+" AND goodsIssueSlave.item_master_id = "+itemMasterId+" AND goodsIssueSlave.updated_by=1 ";
	//System.out.println("sql:::::::::::::::::::::::"+sql);
	try {
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, BigDecimal>> masterRow = getMaster.list();
		for(Map<String, BigDecimal> row : masterRow){
			currentSubInventoryStock = ((BigDecimal) row.get("current_sub_inventory_stock")).intValue();
			}
	} catch (Exception e) {
		e.printStackTrace();
	}
	return currentSubInventoryStock;
}
}

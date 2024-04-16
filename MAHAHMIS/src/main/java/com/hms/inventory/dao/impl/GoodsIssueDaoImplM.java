package com.hms.inventory.dao.impl;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.GoodsIssueDaoM;
import com.hms.inventory.dto.GoodsIssueMrnMasterDto;

@Repository
public class GoodsIssueDaoImplM implements GoodsIssueDaoM{

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	GoodsIssueMrnMasterDto goodsIssueMrnMasterDto;
	
	/**
	 * @author Rohit Sandbhor
	 * @since 29-01-2020
	 * @comment to get generated MRN ID
	 */
//	@Override
//	public List<MrnMasterDTO> getGeneratedMRNID() {
//		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
//				MrnMasterDTO.class);
//		Criterion cr1 = Restrictions.eq("mrnStatus", "IN-PROCESS");
//		Criterion cr2 = Restrictions.eq("mrnStatus", "PartiallyReceived");
//		criteria.add(Restrictions.or(cr1, cr2));
//		criteria.addOrder(Order.desc("mrnId"));
//		return criteria.list();
//	}
	/**
	 * @author Rohit Sandbhor
	 * @since 29-01-2020
	 * @comment to get current inventory stock w.r.t item master id and item batch code
	 */
//	@Override
//	public int getCurrentInventoryStock(int itemMasterId, String itemBatchCode,String expDate,HttpServletRequest httpRequest) {
//		Integer id = 0;
//		String sql = null;
//		sql = "select sum(item_quantity) as item_quantity from inv_batch_stock_new where item_master_id="+itemMasterId+" And item_batch_code='"+itemBatchCode+"' AND item_batch_exp_date like('%"+expDate+"%')";
//		System.out.println("sql:::::::::::::::::::::::"+sql);
//		try {
//			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
//			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
//			List<Map<String, BigDecimal>> masterRow = getMaster.list();
//			for(Map<String, BigDecimal> row : masterRow){
//				id = ((BigDecimal) row.get("item_quantity")).intValue();
//				}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return id;
//	}

	/**
	 * @author Rohit Sandbhor
	 * @since 29-01-2020
	 * @comment to save goods issue mrn request module 
	 */
//	@Override
//	public int saveGoodsIssueMRNRequest(GoodsIssueMrnMasterDto goodsIssueMrnMasterDto,String goodsIssueMrnItemSlaveDetails) {
//		try {
//			int itemMasterId = 0;
//			int mrnItemSlaveId = 0;
//			int mrnId = 0;
//			int totalItemIssueQuantity = 0;
//			int curreentItemQuantity = 0;
//			int pendingRequestQuantityGoodsIssueSlave;
//			int totalPendingItemQuantity = 0;
//			if(goodsIssueMrnMasterDto.getId() == 0){
//				GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto = (GoodsIssueMrnItemSlaveDto) ConfigUIJSONUtility.getObjectFromJSON(goodsIssueMrnItemSlaveDetails, GoodsIssueMrnItemSlaveDto.class);
//				List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = goodsIssueMrnItemSlaveDto.getGoodsIssueMrnItemSlaveDtos();
//				
//				goodsIssueMrnMasterDto.setGoodsIssueMrnItemSlaveDtos(goodsIssueMrnItemSlaveDtos);
//				for (GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto2 : goodsIssueMrnItemSlaveDtos) {
//					itemMasterId = goodsIssueMrnItemSlaveDto2.getItemMasterId();
//					mrnItemSlaveId = goodsIssueMrnItemSlaveDto2.getMrnItemSlaveId();
//						curreentItemQuantity = goodsIssueMrnItemSlaveDto2.getItemIssueQty().intValue();
//						totalItemIssueQuantity = totalItemIssueQuantity+curreentItemQuantity;
//						//below query to update pending request item quantity and item issue quantity w.r.t item slave id of  goods issue item slave
//					Query sql = sessionFactory.getCurrentSession().createSQLQuery("Update inv_mrn_item_info_slave_new set " +
//												"pending_request_item_quantity="+goodsIssueMrnItemSlaveDto2.getPendingRequestItemQuantity()+"," +
//												"item_issue_qty="+totalItemIssueQuantity+" where item_info_id="+mrnItemSlaveId+"");
//					sql.executeUpdate();
//					pendingRequestQuantityGoodsIssueSlave = goodsIssueMrnItemSlaveDto2.getPendingRequestItemQuantity();
//					totalPendingItemQuantity = totalPendingItemQuantity + pendingRequestQuantityGoodsIssueSlave;
//					System.out.println("pendingRequestQuantityGoodsIssueSlave:::"+pendingRequestQuantityGoodsIssueSlave);
//					
//					mrnId = goodsIssueMrnMasterDto.getMrnId();
//					System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"+mrnId);
//				}
//				System.out.println("totalPendingItemQuantity:::"+totalPendingItemQuantity);
//				if(totalPendingItemQuantity == 0){
//					Query updateMrnStatus = sessionFactory.getCurrentSession().createSQLQuery("Update inv_mrn_master_new set " +
//							"mrn_status='Dispatched' where mrn_id="+mrnId+"");
//					System.out.println("updateMrnStatus::::::::::::::"+updateMrnStatus);
//					updateMrnStatus.executeUpdate();
//					}
//				sessionFactory.getCurrentSession().merge(goodsIssueMrnMasterDto);
//				return 1;
//			}
//			else{
//				GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto = (GoodsIssueMrnItemSlaveDto) ConfigUIJSONUtility
//						.getObjectFromJSON(goodsIssueMrnItemSlaveDetails, GoodsIssueMrnItemSlaveDto.class);
//				List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = goodsIssueMrnItemSlaveDto.getGoodsIssueMrnItemSlaveDtos();
//				
//				for (GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto2 : goodsIssueMrnItemSlaveDtos) {
//					itemMasterId = goodsIssueMrnItemSlaveDto2.getItemMasterId();
//					mrnItemSlaveId = goodsIssueMrnItemSlaveDto2.getMrnItemSlaveId();
//					//below query to update pending request item quantity w.r.t item slave id of  goods issue item slave
//					Query sql = sessionFactory.getCurrentSession().createSQLQuery("Update inv_mrn_item_info_slave_new set pending_request_item_quantity="+goodsIssueMrnItemSlaveDto2.getPendingRequestItemQuantity()+" where item_info_id="+mrnItemSlaveId+"");
//					sql.executeUpdate();
//				}
//				goodsIssueMrnMasterDto.setGoodsIssueMrnItemSlaveDtos(goodsIssueMrnItemSlaveDtos);
//				sessionFactory.getCurrentSession().merge(goodsIssueMrnItemSlaveDto);
//				return 2;
//				
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return 0;
//	}

//	/**
//	 * @author Rohit Sandbhor
//	 * @since 29-01-2020
//	 * @comment to edit generate MRN data for approval w.r.t goods issue mrn master id
//	 */
//	@Override
//	public GoodsIssueMrnMasterDto editGeneratedMRNDataForAppoval(Integer id) {
//		GoodsIssueMrnMasterDto goodsIssueMrnMasterDto = new GoodsIssueMrnMasterDto();
//		try {
//			Integer itemMasterId = 0;
//			String sql = "";
//			List<BatchStockDto> batchStockDtos = new ArrayList<BatchStockDto>();
//			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
//			criteria.add(Restrictions.eq("id",id));
//			goodsIssueMrnMasterDto = (GoodsIssueMrnMasterDto) criteria.uniqueResult();
//			for (GoodsIssueMrnItemSlaveDto m1 : goodsIssueMrnMasterDto.getGoodsIssueMrnItemSlaveDtos()) {
//				if(batchStockDtos.size() <= 1){
//				itemMasterId =  m1.getItemMasterId();
//			sql = "select item_batch_code,item_batch_exp_date,item_master_id,current_sub_inventory_stock from inv_batch_stock_new where item_master_id="+itemMasterId+"";
//			System.out.println("editGeneratedMRNDataForAppoval sql************************"+sql);
//			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
//			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
//			List<Map<String, Object>> listMap = getMaster.list();
//			for(Map<String, Object> row : listMap){
//				BatchStockDto obj = new BatchStockDto();
//				obj.setItemBatchCode(((String)row.get("item_batch_code")));
//				obj.setItemBatchExpDate(((Date)row.get("item_batch_exp_date")));
//				obj.setItemMasterId(((Integer)row.get("item_master_id")));
//				obj.setCurrentSubInventoryStock(((Integer)row.get("current_sub_inventory_stock")));
//				batchStockDtos.add(obj);
//				goodsIssueMrnMasterDto.setBatchStockDtos(batchStockDtos);
//			}
//				}
//			}
//			return goodsIssueMrnMasterDto;
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return goodsIssueMrnMasterDto;
//	}
	/**
	 * @author Rohit Sandbhor
	 * @since 29-01-2020
	 * @comment to get all issue mrn data for approval w.r.t sub inv name
	 */
//	@Override
//	public List<GoodsIssueMrnMasterDto> getAllGoodsIssueMRNDataForAppoval(
//			String subInventoryName, HttpServletRequest request) {
//		List<GoodsIssueMrnMasterDto> lstGoodsIssueMrn =new ArrayList<GoodsIssueMrnMasterDto>();
//		try{
//			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
//			criteria.add(Restrictions.eq("deleted", "N"));
//			criteria.add(Restrictions.eq("mrnSubinventoryName", subInventoryName));
//			criteria.setMaxResults(10);
//			criteria.addOrder(Order.desc("id"));
//			lstGoodsIssueMrn=criteria.list();
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//		return lstGoodsIssueMrn;
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
//		MrnMasterDTO mrnMasterDTO = new MrnMasterDTO();
//		try {
//			Integer itemMasterId = 0;
//			
//			String sql = "";
//			List<BatchStockDto> batchStockDtos = new ArrayList<BatchStockDto>();
//			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
//			criteria.add(Restrictions.eq("id",id));
//			mrnMasterDTO = (MrnMasterDTO) criteria.uniqueResult();
//			for (MrnMasterItemInfoDTO m1 : mrnMasterDTO.getLstMrniteminfo()) {
//				itemMasterId =  m1.getItemMasterId();
//			sql = "select current_sub_inventory_stock as current_sub_inventory_stock,item_batch_code,item_batch_exp_date,item_master_id from inv_batch_stock_new where item_master_id="+itemMasterId+"";
//			System.out.println("sql editGeneratedMRNData************************"+sql);
//			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
//			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
//			List<Map<String, Object>> listMap = getMaster.list();
//			for(Map<String, Object> row : listMap){
//				BatchStockDto obj = new BatchStockDto();
//				obj.setItemBatchCode(((String)row.get("item_batch_code")));
//				obj.setItemBatchExpDate(((Date)row.get("item_batch_exp_date")));
//				obj.setItemMasterId(((Integer)row.get("item_master_id")));
//				obj.setCurrentSubInventoryStock(((Integer)row.get("current_sub_inventory_stock")));
//				batchStockDtos.add(obj);
//				mrnMasterDTO.setBatchStockDtos(batchStockDtos);
//			}
//			}
//			return mrnMasterDTO;
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return mrnMasterDTO;
//	}
	
//	@Override
//	public List<GoodsIssueMrnMasterDto> getAllGoodIssue(Integer unitId,	HttpServletRequest request) {
//		List<GoodsIssueMrnMasterDto> lstGoodsIssueMrn =new ArrayList<GoodsIssueMrnMasterDto>();
//		try{
//			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
//			criteria.add(Restrictions.eq("deleted", "N"));
//			criteria.add(Restrictions.eq("unitId", unitId));
//			criteria.addOrder(Order.desc("id"));
//			lstGoodsIssueMrn=criteria.list();
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//		return lstGoodsIssueMrn;
//	}
	
//	@Override
//	public GoodsIssueMrnMasterDto getGoodIssueMRNPagination(Integer startIndex,
//			String subInventoryName) {
//		// TODO Auto-generated method stub
//			List<GoodsIssueMrnMasterDto> lstGoodsIssueMrn =new ArrayList<GoodsIssueMrnMasterDto>();
//			try{
//				Criteria criteria=sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
//				criteria.add(Restrictions.eq("deleted", "N"));
//				criteria.add(Restrictions.eq("mrnSubinventoryName", subInventoryName));
//				criteria.addOrder(Order.desc("id"));
//				criteria.setFirstResult(startIndex);
//				criteria.setMaxResults(10);
//				lstGoodsIssueMrn=criteria.list();
//				goodsIssueMrnMasterDto.setLstGoodsIssueMrnMaster(lstGoodsIssueMrn);
//			}catch(Exception e){
//				e.printStackTrace();
//			}
//			return goodsIssueMrnMasterDto;
//	}
//	@Override
//	public Integer getPageCountAllGoodIssueMRN(String subInventoryName) {
//		// TODO Auto-generated method stub
//		Integer countNew = 0;
//		try {
//			String sql="";
//			sql = " SELECT count(*) FROM inv_goods_issue_mrn_master_new as mrn where mrn_subinventory_name='"+subInventoryName+"'";
//			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
//			countNew = ((Number)countQuery.uniqueResult()).intValue();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return countNew;
//	}
}

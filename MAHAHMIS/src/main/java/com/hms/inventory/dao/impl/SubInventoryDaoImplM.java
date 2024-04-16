package com.hms.inventory.dao.impl;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.IntegerType;
import org.hibernate.type.StringType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.constants.HMSConstants;
import com.hms.dto.Users;
import com.hms.inventory.dao.SubInventoryDaoM;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.ConsumptionDto;
import com.hms.inventory.dto.ConsumptionItemSlaveDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.GoodsIssueMrnMasterDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.ItemPurchaseSlaveDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.MrnMasterItemInfoDTO;
import com.hms.inventory.dto.StockReturnDto;
import com.hms.inventory.dto.StockReturnItemSlaveDto;
import com.hms.patient.util.ConfigUIJSONUtility;
@Repository
public class SubInventoryDaoImplM  implements SubInventoryDaoM{

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	private MrnMasterDTO mrnMasterDTO;
	
	@Autowired
	private GoodsIssueMrnMasterDto goodsIssueMrnMasterDto;
	
	@Autowired
	StockReturnDto stockReturnDto;
	
	@Autowired
	private ConsumptionDto consumptionDto;
	
	static Logger log=Logger.getLogger(SubInventoryDaoImplM.class.getName());
	
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
		ItemMasterDto obj = new ItemMasterDto();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		List<ItemMasterDto> itemMasterDtos = new ArrayList<ItemMasterDto>();
		List<ItemPurchaseSlaveDto> itemPurchaseSlaveDtos = new ArrayList<ItemPurchaseSlaveDto>();
		String sql = "";
		try {
	    //below query written for to get the current sub inventory stock quantity
		//here we apply left join between item master and inv_goods_issue_mrn_item_slave_new
		//sql = "select r.*,if(sum(si.item_issue_qty) > 0,sum(si.item_issue_qty),0) as item_issue_qty FROM inv_item_master_new as r left join inv_goods_issue_mrn_item_slave_new as si on(r.id = si.item_master_id) where si.sub_inventory_id ="+subInvId+" AND  si.deleted = 'N' AND si.mrn_status='QuantityReceived' and r.id="+itemMasterId+"";
		//sql = "select r.*,if(sum(ib.current_sub_inventory_stock) > 0,sum(ib.current_sub_inventory_stock),0) as current_sub_inventory_stock FROM inv_item_master_new as r left join inv_batch_stock_new as ib on(r.id = ib.item_master_id) where ib.sub_inv_id ="+subInvId+" AND  ib.deleted = 'N' AND r.id="+itemMasterId+" AND ib.unit_id="+unitId+" AND r.unit_id="+unitId;
		//sql = "SELECT r.*,IF(SUM(gi.current_subinventory_stock) > 0,SUM(gi.current_subinventory_stock),0) AS current_sub_inventory_stock FROM inv_item_master_new AS r LEFT JOIN inv_goods_issue_mrn_item_slave_new AS gi ON (r.id = gi.item_master_id) WHERE gi.sub_inventory_id = "+subInvId+" AND gi.deleted = 'N' AND r.id = "+itemMasterId+" AND r.unit_id = "+unitId+" AND (gi.mrn_status='FullyReceived' OR gi.mrn_status='PartiallyReceivedQty')";
		//sql = "SELECT r.*,IF(SUM(gi.current_subinventory_stock) > 0,SUM(gi.current_subinventory_stock),0) AS current_sub_inventory_stock FROM inv_item_master_new AS r LEFT JOIN inv_goods_issue_mrn_item_slave_new AS gi ON (r.id = gi.item_master_id) WHERE gi.sub_inventory_id = "+subInvId+" AND gi.deleted = 'N' AND r.id = "+itemMasterId+" AND r.unit_id = "+unitId+" AND (gi.mrn_status='FullyReceived' OR gi.mrn_status='PartiallyReceivedQty')";
		  sql = "SELECT r.*,(SELECT IF(SUM(gi.current_subinventory_stock) > 0, SUM(gi.current_subinventory_stock), 0) FROM inv_goods_issue_mrn_item_slave_new gi WHERE gi.item_master_id = r.id AND gi.deleted = 'N' AND ((gi.mrn_status = 'FullyReceived') OR (gi.mrn_status = 'PartiallyReceivedQty')) AND gi.sub_inventory_id = "+subInvId+") AS current_sub_inventory_stock FROM inv_item_master_new r WHERE r.id = "+itemMasterId+" AND r.unit_id ="+unitId+"";
		System.out.println("sql getItemMasterSlaveDetailsAndCurrentSubInvStock::"+sql);
		Query masterJoinQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listItemBatch = masterJoinQuery.list();
		for(Map<String, Object> row : listItemBatch){
			
			obj.setId((Integer)row.get("id"));
			obj.setCreatedDateTime((Date) row.get("created_date_time"));
			obj.setUpdatedDateTime((Date) row.get("updated_date_time"));
			obj.setUserId((int)row.get("user_id"));
			obj.setCreatedBy((int)row.get("created_by"));
			obj.setUpdatedBy((int)row.get("updated_by"));
			obj.setDeleted_by((int)row.get("deleted_by"));
			obj.setDeleted((String)row.get("deleted"));
			obj.setDeletedDate((Date)row.get("delete_date_time"));
			obj.setUnitId((Integer)row.get("unit_id"));
			obj.setCategoryType((String)row.get("category_type"));
			obj.setMaxStock((Integer)row.get("max_stock"));
			obj.setOrderStock((Integer)row.get("order_stock"));
			obj.setReorderStock((Integer)row.get("reorder_stock"));
			obj.setLeadTime((String)row.get("lead_time"));
			obj.setPriority((String)row.get("priority"));
			obj.setPurchaseStrategy((String)row.get("purchase_strategy"));
			obj.setCriticality((String)row.get("criticality"));
			obj.setFormType((String)row.get("form_type"));
			obj.setItemName((String)row.get("item_name"));
			obj.setStatus((String)row.get("status"));
			obj.setInvItemStatus((Integer)row.get("inv_item_status"));
			obj.setPurchaseItemStatus((Integer)row.get("purchase_item_status"));
			obj.setAssetItemStatus((Integer)row.get("asset_item_status"));
			obj.setIssueItemStatus((Integer)row.get("issue_item_status"));
			obj.setLaundryItemStatus((Integer)row.get("laundry_item_status"));
			obj.setCssItemStatus((Integer)row.get("css_item_status"));
			obj.setBatchWise((String)row.get("batch_wise"));
			obj.setGstCode((String)row.get("gst_code"));
			obj.setCompanyName((String)row.get("company_name"));
			obj.setAliceName((String)row.get("alice_name"));
			obj.setHsnName((String)row.get("hsn_name"));
			obj.setCgst((Float)row.get("cgst"));
			obj.setSgst((Float)row.get("sgst"));
			obj.setTaxName((String)row.get("tax_name"));
			obj.setTaxRate((Float)row.get("tax_rate"));
			obj.setLeadTimeUnit((String)row.get("lead_time_unit"));
			obj.setHsnNameValue((String)row.get("hsn_name_value"));
			
			//here we call get factor list method to get multiple purchase records related to one item
			itemPurchaseSlaveDtos = getFactorList(itemMasterId);
			
			obj.setCurrentSubInventoryStock((BigDecimal)row.get("current_sub_inventory_stock"));
			obj.setItemPurchaseSlaveDto(itemPurchaseSlaveDtos);
			itemMasterDtos.add(obj);
			
		}
		log.debug("inside getItemMasterSlaveDetailsAndCurrentSubInvStock : "+obj);
		} catch (Exception e) {
			log.error("error for  getItemMasterSlaveDetailsAndCurrentSubInvStock...."+e.getMessage());
			e.printStackTrace();
		}
		return obj;
		
		
	}
	
	/**
	 * @since 05-05-2019
	 * @comment this method is created for to get factor list w.r.t item master id
	 * @author Rohit Sandbhor
	 * @param itemMasterId
	 * @return
	 */
	public List<ItemPurchaseSlaveDto> getFactorList(Integer itemMasterId){
		List<ItemPurchaseSlaveDto> itemPurchaseSlaveDtos = new ArrayList<ItemPurchaseSlaveDto>();
		String sql = "";
		try {
			sql = "select * from inv_item_purchase_slave where item_master_id='"+itemMasterId+"'order by id desc";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listPurchase = getMaster.list();
			for(Map<String, Object> row : listPurchase){

				ItemPurchaseSlaveDto obj = new ItemPurchaseSlaveDto();	
				obj.setId((Integer)row.get("id"));
				obj.setCreatedBy((int)row.get("created_by"));
				obj.setUpdatedBy((int)row.get("updated_by"));
				obj.setDeleted_by((int)row.get("deleted_by"));
				obj.setDeleted((String)row.get("deleted"));
				
				obj.setCreatedDateTime((Date) row.get("created_date_time"));
				obj.setUpdatedDateTime((Date) row.get("updated_date_time"));
				obj.setDeletedDate((Date)row.get("delete_date_time"));
				obj.setUnitId((Integer)row.get("unit_id"));
				
				obj.setPurchaseUomFactor1((Integer)row.get("purchase_uom_factor_1"));
				obj.setPurchaseUomFactor2((Integer)row.get("purchase_uom_factor_2"));
				obj.setPurchaseUomFactor3((Integer)row.get("purchase_uom_factor_3"));
				obj.setPurchaseUomFactor4((Integer)row.get("purchase_uom_factor_4"));
				
				obj.setPurchaseUnitPrice1((Double)row.get("purchase_unit_price_1"));
				obj.setPurchaseUnitPrice2((Double)row.get("purchase_unit_price_2"));
				obj.setPurchaseUnitPrice3((Double)row.get("purchase_unit_price_3"));
				obj.setPurchaseUnitPrice4((Double)row.get("purchase_unit_price_4"));
				
				obj.setPurchaseFactorUom1((Integer)row.get("purchase_factor_uom_1"));
				obj.setPurchaseFactorUom2((Integer)row.get("purchase_factor_uom_2"));
				obj.setPurchaseFactorUom3((Integer)row.get("purchase_factor_uom_3"));
				obj.setPurchaseFactorUom4((Integer)row.get("purchase_factor_uom_4"));

				itemPurchaseSlaveDtos.add(obj);
			}
			log.debug("inside getFactorList :"+itemPurchaseSlaveDtos);
		} catch (Exception e) {
			log.error("error for  getFactorList...."+e.getMessage());
			e.printStackTrace();
		}
		
		return itemPurchaseSlaveDtos;
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
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			if(mrnMasterDTO.getMrnId() == 0){
				mrnMasterDTO.setUnitId(unitId);
				MrnMasterItemInfoDTO mrnMasterItemInfoDTO = (MrnMasterItemInfoDTO) ConfigUIJSONUtility
						.getObjectFromJSON(generateMRNItemSlaveDetails, MrnMasterItemInfoDTO.class);
				List<MrnMasterItemInfoDTO> mrnMasterItemInfoDTOs = mrnMasterItemInfoDTO.getLstMrniteminfo();
				
				mrnMasterDTO.setLstMrniteminfo(mrnMasterItemInfoDTOs);
				sessionFactory.getCurrentSession().merge(mrnMasterDTO);
				log.debug("inside saveGenerateMRNRequest ::"+mrnMasterDTO);
				return 1;
			}
			else{
				MrnMasterItemInfoDTO mrnMasterItemInfoDTO = (MrnMasterItemInfoDTO) ConfigUIJSONUtility.getObjectFromJSON(generateMRNItemSlaveDetails, MrnMasterItemInfoDTO.class);
				List<MrnMasterItemInfoDTO> mrnMasterItemInfoDTOs = mrnMasterItemInfoDTO.getLstMrniteminfo();
				mrnMasterDTO.setUnitId(unitId);
				mrnMasterDTO.setLstMrniteminfo(mrnMasterItemInfoDTOs);
				sessionFactory.getCurrentSession().merge(mrnMasterDTO);
				log.debug("inside saveGenerateMRNRequest ::"+mrnMasterDTO);
				return 2;
				
			}
		} catch (Exception e) {
			log.error("error for  saveGenerateMRNRequest...."+e.getMessage());
			e.printStackTrace();
		}
		return 0;
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
		List<MrnMasterDTO> lstGeneratedMrn =new ArrayList<MrnMasterDTO>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnSubinventoryName", subInventoryName));
			or.add(Restrictions.eq("mrnStatus", "OPEN"));
			or.add(Restrictions.eq("mrnStatus", "In-Process"));
			or.add(Restrictions.eq("unitId", unitId));
			criteria.add(or);
			criteria.addOrder(Order.desc("mrnId"));
			lstGeneratedMrn=criteria.list();
			log.debug("inside getInProcessStatusGeneratedMRNRequest:"+lstGeneratedMrn);
		}catch(Exception e){
			log.error("error for  getInProcessStatusGeneratedMRNRequest...."+e.getMessage());
			e.printStackTrace();
		}
		return lstGeneratedMrn;
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
		MrnMasterDTO mrnMasterDTO = new MrnMasterDTO();
		try {
			Integer subInventoryId = 0;
			Integer itemMasterId = 0;
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql = "";
			List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = new ArrayList<GoodsIssueMrnItemSlaveDto>();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
			criteria.add(Restrictions.eq("id",id));
			criteria.add(Restrictions.eq("unitId", unitId));
			mrnMasterDTO = (MrnMasterDTO) criteria.uniqueResult();
			for (MrnMasterItemInfoDTO m1 : mrnMasterDTO.getLstMrniteminfo()) {
				subInventoryId =  m1.getSunInventoryId();
				itemMasterId = m1.getItemMasterId();
			//sql = "select if(sum(current_sub_inventory_stock) > 0,sum(current_sub_inventory_stock),0) as current_sub_inventory_stock,item_batch_code,item_batch_exp_date,item_master_id from inv_batch_stock_new where item_master_id="+itemMasterId+"";
			sql = "SELECT sum(current_subinventory_stock) AS current_sub_inventory_stock,item_batch_code,item_batch_exp_date,item_master_id FROM inv_goods_issue_mrn_item_slave_new WHERE sub_inventory_id = "+subInventoryId+" and item_master_id = "+itemMasterId+" and (mrn_status = 'FullyReceived' OR mrn_status='PartiallyReceivedQty' OR mrn_status='Dispatched') group by item_master_id";
			System.out.println("sql editGeneratedMRNData::"+sql);
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listMap = getMaster.list();
			for(Map<String, Object> row : listMap){
				GoodsIssueMrnItemSlaveDto obj = new GoodsIssueMrnItemSlaveDto();
				obj.setItemBatchCode(((String)row.get("item_batch_code")));
				obj.setItemBatchExpDate(((String)row.get("item_batch_exp_date")));
				obj.setItemMasterId(((Integer)row.get("item_master_id")));
				obj.setCurrentSubInventoryStockUpdated(((BigDecimal)row.get("current_sub_inventory_stock")));
				goodsIssueMrnItemSlaveDtos.add(obj);
				mrnMasterDTO.setGoodsIssueMrnItemSlaveDtos(goodsIssueMrnItemSlaveDtos);
			}
			}
			log.debug("inside editGeneratedMRNData :"+mrnMasterDTO);
			return mrnMasterDTO;
		} catch (Exception e) {
			log.error("error for  editGeneratedMRNData...."+e.getMessage());
			e.printStackTrace();
		}
		return mrnMasterDTO;
	}

	/**
	 * @since 05-05-2019
	 * @comment this is method is created for to update the batch stock table values after doing goods issue process
	 * @author Rohit Sandbhor
	 */
	@Override
	public int updateBatchStock(String batchStockDetails,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql = "";
			List<Map<String, Object>> ltInventoryBatchDTOs = null;
			BatchStockDto batchStockDto = (BatchStockDto) ConfigUIJSONUtility.getObjectFromJSON(batchStockDetails, BatchStockDto.class);
			List<BatchStockDto> listBatchStock = batchStockDto.getLstBatchStockDto();
			for (BatchStockDto stockDto : listBatchStock) {
//				if(stockDto.getItemBatchExpDate() == null){
//					stockDto.setItemBatchExpDate(new Date("1970-01-01 05:30:00"));
//				}
				System.out.println("stockDto.getItemBatchExpDate()::"+stockDto.getItemBatchExpDate());
				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");  
				String strDate = dateFormat.format(stockDto.getItemBatchExpDate());
				
				sql = "SELECT * FROM inv_batch_stock_new as ibs where  ibs.item_master_id="
						+ stockDto.getItemMasterId()
						+ " and  ibs.item_batch_code='"+stockDto.getItemBatchCode()+"' and ibs.item_batch_exp_date='"+strDate+"' and ibs.deleted='N' and ibs.unit_id="+unitId+" order by  ibs.id desc";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				ltInventoryBatchDTOs = getMaster.list();
				Integer remainingQuantity = 0;
				for (int i = 0; i < ltInventoryBatchDTOs.size(); i++) {
					Map map = new HashMap();
					map = ltInventoryBatchDTOs.get(i);
					int newInvItemQuantity = 0;
					int newIssueQuantity = 0;
					Integer invItemQuantity = (Integer) map.get("item_quantity");
					if(invItemQuantity == null)
					{
						invItemQuantity =0;
					}
					Integer issueQuantity = (Integer) map.get("issue_quantity");
					if(issueQuantity == null || issueQuantity == 0)
					{
						issueQuantity =0;
					}
					if (i == 0) {
						remainingQuantity = stockDto.getIssueQuantity();
					}
					if (invItemQuantity >= remainingQuantity) {
						newInvItemQuantity = invItemQuantity - remainingQuantity;
						newIssueQuantity = issueQuantity + remainingQuantity;
						Query sqlIf = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_batch_stock_new SET item_quantity='" + newInvItemQuantity + "',sub_inv_id ='" + stockDto.getSubInventoryId() + "', issue_quantity=" + newIssueQuantity + " " + " WHERE item_batch_code='"+map.get("item_batch_code") + "' AND item_batch_exp_date='"+map.get("item_batch_exp_date") + "' AND item_master_id=" + stockDto.getItemMasterId());
						sqlIf.executeUpdate();
						break;
					}
					else {
						remainingQuantity = remainingQuantity - invItemQuantity;
						newIssueQuantity = issueQuantity + invItemQuantity;
						Query sqlElse = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_batch_stock_new SET item_quantity='0',issue_quantity=" + newIssueQuantity + " " + " WHERE item_batch_code='"+map.get("item_batch_code") + "' AND item_batch_exp_date='"+map.get("item_batch_exp_date") + "' AND item_master_id=" + stockDto.getItemMasterId());
						System.out.println("sqlIf::"+sqlElse);
						sqlElse.executeUpdate();
					}
				}
			}
			log.debug("inside updateBatchStock :");
		} catch (Exception e) {
			log.error("error for  updateBatchStock...."+e.getMessage());
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @since 29-01-2020
	 * @comment this is method is created for to get all generated MRN request data on the basis of sub inv name
	 * @author Rohit Sandbhor 
	 */
	@Override
	public List<MrnMasterDTO> getAllGeneratedMRNRequest(String subInventoryName,HttpServletRequest request) {
		List<MrnMasterDTO> lstGeneratedMrn =new ArrayList<MrnMasterDTO>();
		try{
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnSubinventoryName", subInventoryName));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.addOrder(Order.desc("id"));
			criteria.setMaxResults(10);
			lstGeneratedMrn=criteria.list();
			log.debug("inside getAllGeneratedMRNRequest :"+lstGeneratedMrn);
		}catch(Exception e){
			log.error("error for  getAllGeneratedMRNRequest...."+e.getMessage());
			e.printStackTrace();
		}
		return lstGeneratedMrn;
	}
	
	/**
	 * @since 29-01-2020
	 * @comment this is method is created for to update sub inventory item stock quantity
	 * @author Rohit Sandbhor 
	 */
	@Override
	public int updateSubInventoryItemStockQuantity(Integer itemSlaveId,Integer mrnId,
			Integer requiredQuantityBatchWise,Integer itemMasterId,String itemBatchCode,Integer goodsIssueMrnId,String mrnStatus,HttpServletRequest request,Integer goodsIssueSlaveId,String itemBatchExpDate,Integer subInventoryIdInsideModalOnApproval) {
		try {
			
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Query sqlToUpdateCurrSubInvStock = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_batch_stock_new SET current_sub_inventory_stock=current_sub_inventory_stock + "+requiredQuantityBatchWise+",sub_inv_id="+subInventoryIdInsideModalOnApproval+",updated_by=1 WHERE item_master_id=" + itemMasterId +" AND item_batch_code= '"+itemBatchCode+"' AND item_batch_exp_date like('%"+itemBatchExpDate+"%') ");
			System.out.println("sqlToUpdateCurrSubInvStock::"+sqlToUpdateCurrSubInvStock);
			Query sqlToUpdateCurrSubInvStockInGoodsIssue = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_goods_issue_mrn_item_slave_new SET current_subinventory_stock="+requiredQuantityBatchWise+",mrn_status='"+mrnStatus+"',updated_by='1' WHERE item_master_id=" + itemMasterId +" AND item_batch_code= '"+itemBatchCode+"' AND id='"+goodsIssueSlaveId+"' ");
			System.out.println("sqlToUpdateCurrSubInvStockInGoodsIssue::"+sqlToUpdateCurrSubInvStockInGoodsIssue);
			Query sqlToUpdateMrnStatus = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_mrn_master_new SET mrn_status='"+mrnStatus+"' WHERE mrn_id=" + mrnId +" ");
			System.out.println("sqlToUpdateMrnStatus::"+sqlToUpdateMrnStatus);
			Query sqlToUpdateMrnSlaveSubInventoryStock = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_mrn_item_info_slave_new SET current_subinventory_stock=current_subinventory_stock + "+requiredQuantityBatchWise+" WHERE mrn_id=" + mrnId +" AND item_master_id="+itemMasterId+" ");
			System.out.println("sqlToUpdateMrnSlaveSubInventoryStock::"+sqlToUpdateMrnSlaveSubInventoryStock);
			//Query sqlToUpdateCurrentSubInventoryInMrnSlave = sessionFactory.getCurrentSession().createSQLQuery("UPDATE " + HMSConstants.DATABASENAME + ".inv_mrn_item_info_slave_new SET current_subinventory_stock="+requiredQuantityBatchWise+" WHERE item_info_id=" + itemSlaveId +" ");
			//System.out.println("sqlToUpdateCurrentSubInventoryInMrnSlave::"+sqlToUpdateCurrentSubInventoryInMrnSlave);
			sqlToUpdateCurrSubInvStock.executeUpdate();
			sqlToUpdateMrnSlaveSubInventoryStock.executeUpdate();
			sqlToUpdateCurrSubInvStockInGoodsIssue.executeUpdate();
			sqlToUpdateMrnStatus.executeUpdate();
			log.debug("inside updateSubInventoryItemStockQuantity :");
			return 0;
		} catch (Exception e) {
			log.error("error for  updateSubInventoryItemStockQuantity...."+e.getMessage());
			e.printStackTrace();
			return 1;
		}
	}

	@Override
	public List<GoodsIssueMrnItemSlaveDto> getAllGeneratedMRNRequestDataForIndentTab(
			Integer subInventoryId, HttpServletRequest request) {
		List<GoodsIssueMrnItemSlaveDto> list = new ArrayList<GoodsIssueMrnItemSlaveDto>();
		String sql = "";
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			//added item_master_id in group by clause for 0 batch
			//added by Rohit on 19-05-2021
			//added AND condition as AND current_subinventory_stock != 0
			//added group by item_batch_exp_date
			// AND current_subinventory_stock != 0
			sql = "select sum(current_subinventory_stock) as current_sub_inventory_qty,item_batch_code,item_batch_exp_date,item_master_id,item_name from inv_goods_issue_mrn_item_slave_new where sub_inventory_id="+subInventoryId+" and (mrn_status='FullyReceived' OR mrn_status='PartiallyReceivedQty' OR mrn_status='Dispatched') AND deleted !='Y' AND updated_by=1 GROUP BY item_batch_code,item_batch_exp_date,item_master_id,item_name";
			System.out.println("sql getAllGeneratedMRNRequestDataForIndentTab:::"+sql);
			Query masterJoinQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listSubInvStockBatchWise = masterJoinQuery.list();
			for(Map<String, Object> row : listSubInvStockBatchWise){
				GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto = new GoodsIssueMrnItemSlaveDto();
				goodsIssueMrnItemSlaveDto.setCurrentSubInventoryStockUpdated((BigDecimal)row.get("current_sub_inventory_qty"));
				goodsIssueMrnItemSlaveDto.setItemName((String)row.get("item_name"));
				goodsIssueMrnItemSlaveDto.setItemBatchCode((String)row.get("item_batch_code"));
				goodsIssueMrnItemSlaveDto.setItemBatchExpDate((String)row.get("item_batch_exp_date"));
				goodsIssueMrnItemSlaveDto.setItemMasterId((Integer) row.get("item_master_id"));
				list.add(goodsIssueMrnItemSlaveDto);
			}
		}
		 catch (Exception e) {
			 log.error("error for  getAllGeneratedMRNRequestDataForIndentTab...."+e.getMessage());
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * @since 29-01-2020
	 * @comment this is method is created for to update fully received mrn status data w.r.t mrn id
	 * @author Rohit Sandbhor  
	 */
	@Override
	public int updateFullyReceivedMrnStatus(Integer mrnId,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Query sql = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_mrn_master_new SET mrn_status='Complete' WHERE mrn_id=" + mrnId);
			sql.executeUpdate();
			log.debug("inside updateFullyReceivedMrnStatus :"+sql);
			return 0;
		} catch (Exception e) {
			log.error("error for  updateFullyReceivedMrnStatus...."+e.getMessage());
			e.printStackTrace();
			return 1;
		}
	}
	
	@Override
	public List<GoodsIssueMrnItemSlaveDto> getCurrentSubStockBatchWise(Integer itemMasteId, Integer subInvId,HttpServletRequest request) {
		List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = new ArrayList<GoodsIssueMrnItemSlaveDto>();
		String sql = "";
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			sql = "SELECT SUM(goodsIssueSlave.current_subinventory_stock) AS current_sub_inventory_qty,goodsIssueSlave.item_batch_code,goodsIssueSlave.item_batch_exp_date,goodsIssueSlave.item_master_id,goodsIssueSlave.item_name,ehat_unit.unit_name FROM inv_goods_issue_mrn_item_slave_new goodsIssueSlave LEFT JOIN ehat_unit_doc ehat_unit ON ehat_unit.uni_id = goodsIssueSlave.item_uom WHERE goodsIssueSlave.sub_inventory_id = "+subInvId+" AND goodsIssueSlave.item_master_id = "+itemMasteId+" AND (goodsIssueSlave.mrn_status = 'FullyReceived' OR goodsIssueSlave.mrn_status = 'PartiallyReceivedQty' OR goodsIssueSlave.mrn_status = 'Dispatched') AND goodsIssueSlave.deleted != 'Y' AND goodsIssueSlave.current_subinventory_stock != 0 GROUP BY goodsIssueSlave.item_batch_code,\n" + 
					"    goodsIssueSlave.item_master_id,\n" + 
					"    goodsIssueSlave.item_name";
			System.out.println("sql:::"+sql);
			Query masterJoinQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listSubInvStockBatchWise = masterJoinQuery.list();
			for(Map<String, Object> row : listSubInvStockBatchWise){
				GoodsIssueMrnItemSlaveDto issueMrnItemSlaveDto = new GoodsIssueMrnItemSlaveDto();
				issueMrnItemSlaveDto.setCurrentSubInventoryStockUpdated((BigDecimal)row.get("current_sub_inventory_qty"));
				issueMrnItemSlaveDto.setItemName((String)row.get("item_name"));
				issueMrnItemSlaveDto.setItemBatchCode((String)row.get("item_batch_code"));
				issueMrnItemSlaveDto.setItemBatchExpDate((String)row.get("item_batch_exp_date"));
				issueMrnItemSlaveDto.setUomUnitName((String)row.get("unit_name"));
				issueMrnItemSlaveDto.setItemQuantity((Integer) row.get("item_quantity"));
				goodsIssueMrnItemSlaveDtos.add(issueMrnItemSlaveDto);
			}
			log.debug("inside batchStockDtos :"+goodsIssueMrnItemSlaveDtos);
		} catch (Exception e) {
			log.error("error for  batchStockDtos...."+e.getMessage());
			e.printStackTrace();
		}
		return goodsIssueMrnItemSlaveDtos;
	}

	@Override
	public int saveConsumptionDetails(ConsumptionDto consumptionDto,
			String consumptionItemSlaveDetails,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			if(consumptionDto.getId() == 0){
				ConsumptionItemSlaveDto consumptionItemSlaveDto = (ConsumptionItemSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(consumptionItemSlaveDetails, ConsumptionItemSlaveDto.class);
				List<ConsumptionItemSlaveDto> consumptionItemSlaveDtos = consumptionItemSlaveDto.getLstConsumptionItemSlaveDto();
				consumptionDto.setUnitId(unitId);
				consumptionDto.setConsumptionItemSlaveDto(consumptionItemSlaveDtos);
				sessionFactory.getCurrentSession().merge(consumptionDto);
				log.debug("inside saveConsumptionDetails : 1");
				return 1;
			}
			else{
				ConsumptionItemSlaveDto consumptionItemSlaveDto = (ConsumptionItemSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(consumptionItemSlaveDetails, ConsumptionItemSlaveDto.class);
				List<ConsumptionItemSlaveDto> consumptionItemSlaveDtos = consumptionItemSlaveDto.getLstConsumptionItemSlaveDto();
				consumptionDto.setUnitId(unitId);
				consumptionDto.setConsumptionItemSlaveDto(consumptionItemSlaveDtos);
				sessionFactory.getCurrentSession().merge(consumptionDto);
				log.debug("inside saveConsumptionDetails : 2");
				return 2;
				
			}
			
		} catch (Exception e) {
			log.error("error for  saveConsumptionDetails...."+e.getMessage());
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int updateBatchStockAfterConsumotionRequest(String batchStockDetails,String goodsIssueMrnItemSlaveDetails,HttpServletRequest request) {
		try {
			String sqlGoodsIssue = "";
			Integer subInventoryQuantityGoodsIssue = 0;
			List<Map<String,Object>> lstGoodsIssue = null;
			GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto = (GoodsIssueMrnItemSlaveDto) ConfigUIJSONUtility.getObjectFromJSON(goodsIssueMrnItemSlaveDetails, GoodsIssueMrnItemSlaveDto.class);
			List<GoodsIssueMrnItemSlaveDto> lstGoodsIssueMrnItemSlaveDtos = goodsIssueMrnItemSlaveDto.getGoodsIssueMrnItemSlaveDtos();
			
			//below for loop is generated for to adding the the current sub inventory stock from goods issue table where we stores the subinventory stock subinventory wise
			for(int j=0; j< lstGoodsIssueMrnItemSlaveDtos.size();j++){
				sqlGoodsIssue = "SELECT * FROM inv_goods_issue_mrn_item_slave_new as gdi where  gdi.item_master_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemMasterId()
						+ " and  gdi.item_batch_code='"+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemBatchCode()+"' and gdi.sub_inventory_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getSubInventoryId()+" and  gdi.deleted='N' order by  gdi.id desc";
				SQLQuery getMasterGoodsIssue = sessionFactory.getCurrentSession().createSQLQuery(sqlGoodsIssue);
				getMasterGoodsIssue.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				lstGoodsIssue = getMasterGoodsIssue.list();
				Integer returnQuantityFromStockReturnGoodsIssue = 0;
				Integer newSubInventoryQuantityGoodsIssue = 0;
				
			for (int i = 0; i < lstGoodsIssue.size(); i++) {
				Map mapGoodsIssue = new HashMap();
				mapGoodsIssue = lstGoodsIssue.get(i);
				Integer goodsIssueSlaveId = (Integer) mapGoodsIssue.get("id");
				if(i == 0){
				subInventoryQuantityGoodsIssue = (Integer) mapGoodsIssue.get("current_subinventory_stock");
				Integer returnQuantity = lstGoodsIssueMrnItemSlaveDtos.get(j).getReturnQuantity();
				returnQuantityFromStockReturnGoodsIssue = returnQuantity;
				}
				else{
					subInventoryQuantityGoodsIssue = (Integer) mapGoodsIssue.get("current_subinventory_stock");
				}
				if (subInventoryQuantityGoodsIssue > 0 && returnQuantityFromStockReturnGoodsIssue < subInventoryQuantityGoodsIssue) {
					newSubInventoryQuantityGoodsIssue = subInventoryQuantityGoodsIssue - returnQuantityFromStockReturnGoodsIssue;
					//removed AND item_batch_exp_date like('%"+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemBatchExpDate()+"%') 
					Query sqlQuery3 = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_goods_issue_mrn_item_slave_new SET current_subinventory_stock=" + newSubInventoryQuantityGoodsIssue + " " + " WHERE item_batch_code='"+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemBatchCode()+"' AND item_master_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemMasterId()+" AND sub_inventory_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getSubInventoryId()+" AND id="+goodsIssueSlaveId+"");
					sqlQuery3.executeUpdate();
					break;
				}
				else {
				}
				if(returnQuantityFromStockReturnGoodsIssue >= subInventoryQuantityGoodsIssue && subInventoryQuantityGoodsIssue >= 0){
				newSubInventoryQuantityGoodsIssue = subInventoryQuantityGoodsIssue - returnQuantityFromStockReturnGoodsIssue;
				Integer newSubInventoryQuantityGoodsIssueUpdated = Math.abs(newSubInventoryQuantityGoodsIssue);
				returnQuantityFromStockReturnGoodsIssue = newSubInventoryQuantityGoodsIssueUpdated;
				if(newSubInventoryQuantityGoodsIssue < 0){
					newSubInventoryQuantityGoodsIssue = 0;
				}
				//removed AND item_batch_exp_date like('%"+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemBatchExpDate()+"%') 
				Query sqlQuery4 = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_goods_issue_mrn_item_slave_new SET current_subinventory_stock=" + newSubInventoryQuantityGoodsIssue + " " + " WHERE item_batch_code='"+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemBatchCode()+"' AND item_master_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemMasterId()+" AND sub_inventory_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getSubInventoryId()+" AND id="+goodsIssueSlaveId+"");
				sqlQuery4.executeUpdate();
				if(newSubInventoryQuantityGoodsIssue == 0 && newSubInventoryQuantityGoodsIssueUpdated == 0){
					break;
				}
				}
				
			}
		}
			
		} catch (Exception e) {
			log.error("error for  updateBatchStockAfterConsumotionRequest...."+e.getMessage());
			e.printStackTrace();
		}
		return 0;
	
}

	@Override
	public List<ConsumptionDto> getConsumptionList(String subInventoryName,Integer subInventoryId,
			HttpServletRequest request) {
		List<ConsumptionDto> consumptionDtos =new ArrayList<ConsumptionDto>();
		try{
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ConsumptionDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("subinvId", subInventoryId));
			//criteria.add(Restrictions.ilike("subinvName", subInventoryName,MatchMode.ANYWHERE));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.setMaxResults(10);
			criteria.add(or);
			criteria.addOrder(Order.desc("id"));
			consumptionDtos=criteria.list();
			log.debug("inside getConsumptionList :"+consumptionDtos);
		}catch(Exception e){
			log.error("error for  getConsumptionList...."+e.getMessage());
			e.printStackTrace();
		}
		return consumptionDtos;
	}

	@Override
	public ConsumptionDto editGeneratedConsumptionDetails(Integer id,HttpServletRequest request) {
		ConsumptionDto consumptionDto = new ConsumptionDto();
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ConsumptionDto.class);
			criteria.add(Restrictions.eq("id",id));
			criteria.add(Restrictions.eq("unitId", unitId));
			consumptionDto = (ConsumptionDto) criteria.uniqueResult();
			log.debug("inside editGeneratedConsumptionDetails :"+consumptionDto);
			return consumptionDto;
		} catch (Exception e) {
			log.error("error for  editGeneratedConsumptionDetails...."+e.getMessage());
			e.printStackTrace();
		}
		return consumptionDto;
	}

	@Override
	public List<ConsumptionDto> getConsumptionListById(Integer subInvId,
			HttpServletRequest request) {
		List<ConsumptionDto> lstconsumptionDto = new ArrayList<ConsumptionDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ConsumptionDto.class);
			criteria.add(Restrictions.eq("subinvId",subInvId));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstconsumptionDto =  criteria.list();
			log.debug("inside getConsumptionListById:"+lstconsumptionDto);
			return lstconsumptionDto;
		} catch (Exception e) {
			log.error("error for  getConsumptionListById...."+e.getMessage());
			e.printStackTrace();
		}
		return lstconsumptionDto;
	}

	@Override
	public int saveStockReturnDetails(StockReturnDto stockReturnDto,
			String stockReturnItemSlaveDetails,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			if(stockReturnDto.getId() == 0){
				StockReturnItemSlaveDto stockReturnItemSlaveDto = (StockReturnItemSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(stockReturnItemSlaveDetails, StockReturnItemSlaveDto.class);
				List<StockReturnItemSlaveDto> stockReturnItemSlaveDtos = stockReturnItemSlaveDto.getLstStockReturnItemSlaveDto();
				stockReturnDto.setUnitId(unitId);
				stockReturnDto.setStockReturnItemSlaveDto(stockReturnItemSlaveDtos);
				sessionFactory.getCurrentSession().merge(stockReturnDto);
				log.debug("inside saveStockReturnDetails : 1");
				return 1;
			}
			else{
				StockReturnItemSlaveDto stockReturnItemSlaveDto = (StockReturnItemSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(stockReturnItemSlaveDetails, StockReturnItemSlaveDto.class);
				List<StockReturnItemSlaveDto> stockReturnItemSlaveDtos = stockReturnItemSlaveDto.getLstStockReturnItemSlaveDto();
				stockReturnDto.setUnitId(unitId);
				stockReturnDto.setStockReturnItemSlaveDto(stockReturnItemSlaveDtos);
				sessionFactory.getCurrentSession().merge(stockReturnDto);
				log.debug("inside saveStockReturnDetails : 2");
				return 2;
				
			}
			
		} catch (Exception e) {
			log.error("error for  saveStockReturnDetails...."+e.getMessage());
			e.printStackTrace();
		}
		return 0;
	}
	
	@Override
	public int updateBatchStockAfterStockReturnRequest(StockReturnDto sobj,  String stockReturnItemSlaveDetails,String goodsIssueMrnItemSlaveDetails,String batchStockDetails,HttpServletRequest request) 
	{
		try {
	String sql = "";
	String sqlGoodsIssue = "";
	Integer subInventoryQuantityGoodsIssue = 0;
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	List<Map<String, Object>> ltInventoryBatchDTOs = null;
	List<Map<String,Object>> lstGoodsIssue = null;
	BatchStockDto batchStockDto = (BatchStockDto) ConfigUIJSONUtility.getObjectFromJSON(batchStockDetails, BatchStockDto.class);
	StockReturnItemSlaveDto stockSlave = (StockReturnItemSlaveDto) ConfigUIJSONUtility.getObjectFromJSON(stockReturnItemSlaveDetails, StockReturnItemSlaveDto.class);
	GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto = (GoodsIssueMrnItemSlaveDto) ConfigUIJSONUtility.getObjectFromJSON(goodsIssueMrnItemSlaveDetails, GoodsIssueMrnItemSlaveDto.class);
	List<GoodsIssueMrnItemSlaveDto> lstGoodsIssueMrnItemSlaveDtos = goodsIssueMrnItemSlaveDto.getGoodsIssueMrnItemSlaveDtos();
	List<BatchStockDto> listBatchStock = batchStockDto.getLstBatchStockDto();
	List<StockReturnItemSlaveDto> listStockSlave = stockSlave.getLstStockReturnItemSlaveDto();
	sobj.setStatus("Return");
	sobj.setStockReturnItemSlaveDto(listStockSlave);
	System.out.println("listStockSlave::"+listStockSlave.size());
	System.out.println("sobj::"+sobj.getSubinvId());
	
	for (BatchStockDto stockDto : listBatchStock) {
		
		sql = "SELECT * FROM inv_batch_stock_new as ibs where  ibs.item_master_id="
				+ stockDto.getItemMasterId()
				+ " and  ibs.item_batch_code='"+stockDto.getItemBatchCode()+"' and  ibs.deleted='N' AND ibs.unit_id="+unitId+" order by  ibs.id desc";
		System.out.println("sql::"+sql);
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		ltInventoryBatchDTOs = getMaster.list();
		Integer returnQuantityFromStockReturn = 0;
		for (int i = 0; i < ltInventoryBatchDTOs.size(); i++) {
			Map map = new HashMap();
			map = ltInventoryBatchDTOs.get(i);
			int newInventoryQuantity = 0;
			Integer currentMainInventoryStockQuantity = (Integer) map.get("item_quantity");
			Integer subInventoryQuantity = (Integer) map.get("current_sub_inventory_stock");
			if(subInventoryQuantity == null || subInventoryQuantity == 0)
			{
				subInventoryQuantity =0;
			}
			if (i == 0) {
				returnQuantityFromStockReturn = stockDto.getIssueQuantity();
			}
			if (subInventoryQuantity >= returnQuantityFromStockReturn) {
				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");  
				String strDate = dateFormat.format(stockDto.getItemBatchExpDate());
				
				System.out.println("strDate::"+strDate);
				Query sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_batch_stock_new SET stock_return_qty = stock_return_qty + "+returnQuantityFromStockReturn+" " + " WHERE item_batch_code='"+stockDto.getItemBatchCode()+"' AND item_batch_exp_date='"+strDate+"' AND item_master_id="+stockDto.getItemMasterId()+" AND sub_inv_id="+stockDto.getSubInventoryId()+"");
				newInventoryQuantity = currentMainInventoryStockQuantity + returnQuantityFromStockReturn;
				Query sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_batch_stock_new SET item_quantity=" + newInventoryQuantity + " " + " WHERE item_batch_code='"+stockDto.getItemBatchCode()+"' AND item_batch_exp_date='"+strDate+"' AND item_master_id="+stockDto.getItemMasterId()+"");
				System.out.println("sqlQuery4::"+sqlQuery1);
				System.out.println("sqlQuery2::"+sqlQuery2);
				sqlQuery2.executeUpdate();
				sqlQuery1.executeUpdate();
				 sobj.setStockReturnItemSlaveDto(listStockSlave);
				 sessionFactory.getCurrentSession().merge(sobj);
			}
			else {
			}
		}
	}
	//below for loop is generated for to reduces the current sub inventory stock from goods issue table where we stores the subinventory stock subinventory wise
	for(int j=0; j< lstGoodsIssueMrnItemSlaveDtos.size();j++){
		sqlGoodsIssue = "SELECT * FROM inv_goods_issue_mrn_item_slave_new as gdi where  gdi.item_master_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemMasterId()
				+ " and  gdi.item_batch_code='"+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemBatchCode()+"' and gdi.sub_inventory_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getSubInventoryId()+" and  gdi.deleted='N' order by  gdi.id desc";
		SQLQuery getMasterGoodsIssue = sessionFactory.getCurrentSession().createSQLQuery(sqlGoodsIssue);
		getMasterGoodsIssue.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		lstGoodsIssue = getMasterGoodsIssue.list();
		Integer returnQuantityFromStockReturnGoodsIssue = 0;
		Integer newSubInventoryQuantityGoodsIssue = 0;
		
	for (int i = 0; i < lstGoodsIssue.size(); i++) {
		Map mapGoodsIssue = new HashMap();
		mapGoodsIssue = lstGoodsIssue.get(i);
		Integer goodsIssueSlaveId = (Integer) mapGoodsIssue.get("id");
		if(i == 0){
		subInventoryQuantityGoodsIssue = (Integer) mapGoodsIssue.get("current_subinventory_stock");
		Integer returnQuantity = lstGoodsIssueMrnItemSlaveDtos.get(j).getReturnQuantity();
		returnQuantityFromStockReturnGoodsIssue = returnQuantity;
		}
		else{
			subInventoryQuantityGoodsIssue = (Integer) mapGoodsIssue.get("current_subinventory_stock");
		}
		if (subInventoryQuantityGoodsIssue > 0 && returnQuantityFromStockReturnGoodsIssue < subInventoryQuantityGoodsIssue) {
			newSubInventoryQuantityGoodsIssue = subInventoryQuantityGoodsIssue - returnQuantityFromStockReturnGoodsIssue;
			//removed AND item_batch_exp_date like('%"+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemBatchExpDate()+"%') 
			Query sqlToUpdateSubInvStock = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_goods_issue_mrn_item_slave_new SET current_subinventory_stock=" + newSubInventoryQuantityGoodsIssue + " " + " WHERE item_batch_code='"+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemBatchCode()+"' AND item_master_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemMasterId()+" AND sub_inventory_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getSubInventoryId()+" AND id="+goodsIssueSlaveId+"");
			//Query sqlToUpdateReturnSlave = sessionFactory.getCurrentSession().createSQLQuery("UPDATE " + HMSConstants.DATABASENAME + ".inv_stock_return_item_slave SET updated_by=1 WHERE id="+stockSlave.getId()+"");
			System.out.println("sqlToUpdateSubInvStock::"+sqlToUpdateSubInvStock);
			//System.out.println("sqlToUpdateReturnSlave::"+sqlToUpdateReturnSlave);
			sqlToUpdateSubInvStock.executeUpdate();
			//sqlToUpdateReturnSlave.executeUpdate();
			sobj.setStockReturnItemSlaveDto(listStockSlave);
			sessionFactory.getCurrentSession().merge(sobj);
			break;
		}
		else {
		}
		if(returnQuantityFromStockReturnGoodsIssue >= subInventoryQuantityGoodsIssue && subInventoryQuantityGoodsIssue >= 0){
		newSubInventoryQuantityGoodsIssue = subInventoryQuantityGoodsIssue - returnQuantityFromStockReturnGoodsIssue;
		Integer newSubInventoryQuantityGoodsIssueUpdated = Math.abs(newSubInventoryQuantityGoodsIssue);
		returnQuantityFromStockReturnGoodsIssue = newSubInventoryQuantityGoodsIssueUpdated;
		if(newSubInventoryQuantityGoodsIssue < 0){
			newSubInventoryQuantityGoodsIssue = 0;
		}
		//removed AND item_batch_exp_date like('%"+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemBatchExpDate()+"%') 
		Query sqlToUpdateSubInvStock1 = sessionFactory.getCurrentSession().createSQLQuery("UPDATE inv_goods_issue_mrn_item_slave_new SET current_subinventory_stock=" + newSubInventoryQuantityGoodsIssue + " " + " WHERE item_batch_code='"+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemBatchCode()+"' AND item_master_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getItemMasterId()+" AND sub_inventory_id="+lstGoodsIssueMrnItemSlaveDtos.get(j).getSubInventoryId()+" AND id="+goodsIssueSlaveId+"");
		//Query sqlToUpdateReturnSlave1 = sessionFactory.getCurrentSession().createSQLQuery("UPDATE " + HMSConstants.DATABASENAME + ".inv_stock_return_item_slave SET updated_by=1 WHERE id="+stockSlave.getId()+"");
		System.out.println("sqlToUpdateSubInvStock1::"+sqlToUpdateSubInvStock1);
		//System.out.println("sqlToUpdateReturnSlave1::"+sqlToUpdateReturnSlave1);
		sqlToUpdateSubInvStock1.executeUpdate();
		//sqlToUpdateReturnSlave1.executeUpdate();
		sobj.setStockReturnItemSlaveDto(listStockSlave);
		sessionFactory.getCurrentSession().merge(sobj);
		if(newSubInventoryQuantityGoodsIssue == 0 && newSubInventoryQuantityGoodsIssueUpdated == 0){
			break;
		}
		}
		
	}
}
	
	log.debug("inside updateBatchStockAfterStockReturnRequest: 1");
	return 1;
} catch (Exception e) {
	log.error("error for  updateBatchStockAfterStockReturnRequest...."+e.getMessage());
	e.printStackTrace();
}
return 0;
	}
	
	
/**
 * 
 */
@Override
public List<GoodsIssueMrnMasterDto> getReceivedMrnData(Integer subInventoryId,
		HttpServletRequest request) {
	List<GoodsIssueMrnMasterDto> issueMrnMasterDtos =new ArrayList<GoodsIssueMrnMasterDto>();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("mrnSubinventoryId", subInventoryId));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.addOrder(Order.desc("id"));
		Criterion cr1 = Restrictions.eq("mrnStatus", "PartiallyReceived");
		Criterion cr2 = Restrictions.eq("mrnStatus", "FullyReceived");
		Criterion cr3 = Restrictions.eq("mrnStatus", "Dispatched");
		criteria.setMaxResults(10);
		//criteria.add(Restrictions.or(c1, c2));
		criteria.add(Restrictions.or(cr1, cr2, cr3));
		issueMrnMasterDtos=criteria.list();
		log.debug("inside getReceivedMrnData  : "+issueMrnMasterDtos);
	}catch(Exception e){
		log.error("error for  getReceivedMrnData...."+e.getMessage());
		e.printStackTrace();
	}
	return issueMrnMasterDtos;
}

@Override
public List getAllStockRetrun(Integer subInventoryId, HttpServletRequest request) {
	// TODO Auto-generated method stub
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	String sql ="";
	try {
		sql = " select 	" +
				"stockReturnSlave.item_name," +
				"stockReturnSlave.item_batch_code," +
				"stockReturnSlave.item_batch_exp_date," +
				"stockReturnSlave.return_quantity," +
				"stockReturn.created_date_time," +
				"stockReturn.subinv_name " +
				"FROM inv_stock_return_item_slave stockReturnSlave   " +
				"LEFT JOIN inv_stock_return_new stockReturn ON stockReturnSlave.stock_return_id = stockReturn.id " +
				" WHERE stockReturnSlave.deleted = 'N' AND stockReturn.deleted = 'N' AND  stockReturn.subinv_id = "+subInventoryId+" AND stockReturn.unit_id="+unitId;
		
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		log.debug("inside getAllStockRetrun :"+getMaster.list());
		return  getMaster.list();
		
	} catch (Exception e) {
		log.error("error for  getAllStockRetrun...."+e.getMessage());
		// TODO: handle exception
		e.printStackTrace();
	}
	return null;
}

@Override
public List<StockReturnDto> getAllStockReturnRecordsDetails(HttpServletRequest request, Integer unitId, String subinventoryName,Integer subInventoryId) {
	List<StockReturnDto> lstslave=new ArrayList<StockReturnDto>();
	HttpSession session = request.getSession();
	//Integer unitId = (Integer) session.getAttribute("uId");
	try
	{
	Criteria criteria=sessionFactory.getCurrentSession().createCriteria(StockReturnDto.class);
	criteria.add(Restrictions.eq("deleted", "N"));
	criteria.add(Restrictions.eq("subinvId", subInventoryId));
	//criteria.add(Restrictions.ilike("subinvName", subinventoryName,MatchMode.ANYWHERE));
	criteria.add(Restrictions.eq("unitId", unitId));
	criteria.addOrder(Order.desc("id"));
	criteria.setMaxResults(10);
	//criteria.add(Restrictions.eq("unitId",unitId));
	lstslave=	criteria.list();
	log.debug("inside getAllStockReturnRecordsDetails :"+lstslave);
	}catch(Exception e){
		log.error("error for  getAllStockReturnRecordsDetails...."+e.getMessage());
		e.printStackTrace();
	}
	
	return lstslave;
}

@Override
public StockReturnDto editStockReturn(Integer stockId,HttpServletRequest request) {
	StockReturnDto obj=new StockReturnDto();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(StockReturnDto.class);
		criteria.add(Restrictions.eq("id",stockId));
		criteria.add(Restrictions.eq("unitId", unitId));
		obj = (StockReturnDto) criteria.uniqueResult();
		log.debug("inside editStockReturn partyMasterDto::"+obj);
		return obj;
	} catch (Exception e) {
		log.error("error for  editStockReturn...."+e.getMessage());
		 e.printStackTrace();
	}
	return obj;
}

@Override
public boolean deleteStockReturn(StockReturnDto sobj,HttpServletRequest request) {
	try
	{
		StockReturnDto obj = (StockReturnDto) sessionFactory.getCurrentSession().merge(sobj);
		log.debug("inside deleteStockReturn partyMasterDto::"+obj);
		return true;
	}catch(Exception e){
		log.error("error for  deleteStockReturn...."+e.getMessage());
		e.printStackTrace();
	}
	return false;
}

@Override
public List<StockReturnDto> getStockReturnDetailsBySubInventory(Integer subInvId,HttpServletRequest request) {
	List<StockReturnDto> lstslave=new ArrayList<StockReturnDto>();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try
	{
	Criteria criteria=sessionFactory.getCurrentSession().createCriteria(StockReturnDto.class);
	criteria.add(Restrictions.eq("deleted", "N"));
	criteria.add(Restrictions.eq("subinvId",subInvId));
	criteria.add(Restrictions.eq("unitId", unitId));
	criteria.addOrder(Order.desc("id"));
	lstslave=	criteria.list();
	log.debug("inside getStockReturnDetailsBySubInventory :"+lstslave);
	}catch(Exception e){
		log.error("error for  getStockReturnDetailsBySubInventory...."+e.getMessage());
		e.printStackTrace();
	}
	
	return lstslave;
}

@Override
public MrnMasterDTO getMRNPagination(Integer startIndex,String subInventoryName,HttpServletRequest request) {
	// TODO Auto-generated method stub
	List<MrnMasterDTO> mrnMasterDTOList = new ArrayList<MrnMasterDTO>();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(MrnMasterDTO.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.addOrder(Order.desc("id"));
		criteria.setFirstResult(startIndex);
		criteria.add(Restrictions.eq("mrnSubinventoryName", subInventoryName));
		//criteria.add(Restrictions.eq("mrnStatus", "OPEN"));
		//criteria.add(Restrictions.eq("mrnStatus", "In-Process"));
		criteria.setMaxResults(10);
		mrnMasterDTOList = criteria.list();
		mrnMasterDTO.setLstmrnmaster(mrnMasterDTOList);
		log.debug("inside getMRNPagination :"+mrnMasterDTO);
		
	} catch (Exception e) {
		log.error("error for  getMRNPagination...."+e.getMessage());
		e.printStackTrace();
	}
	return mrnMasterDTO;
}

@Override
public Integer getPageCountAllMRN(String subInventoryName,HttpServletRequest request) {
	// TODO Auto-generated method stub
	Integer countNew = 0;
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		String sql="";
		sql = "SELECT count(*) FROM inv_mrn_master_new where deleted != 'Y' AND mrn_subinventory_name='"+subInventoryName+"' AND unit_id="+unitId ;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
		countNew = ((Number)countQuery.uniqueResult()).intValue();
		log.debug("inside getPageCountAllMRN :"+countNew);
	} catch (Exception e) {
		log.error("error for  getPageCountAllMRN...."+e.getMessage());
		e.printStackTrace();
	}
	return countNew;
}

@Override
public List<GoodsIssueMrnMasterDto> getReceivedMRNPagination(Integer startIndex,
		Integer subInventoryId,HttpServletRequest request) {
	List<GoodsIssueMrnMasterDto> issueMrnMasterDtos =new ArrayList<GoodsIssueMrnMasterDto>();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("mrnSubinventoryId", subInventoryId));
		criteria.addOrder(Order.desc("id"));
		criteria.add(Restrictions.eq("unitId", unitId));
		Criterion cr1 = Restrictions.eq("mrnStatus", "PartiallyReceived");
		Criterion cr2 = Restrictions.eq("mrnStatus", "FullyReceived");
		Criterion cr3 = Restrictions.eq("mrnStatus", "Dispatched");
		criteria.add(Restrictions.or(cr1,cr2,cr3));
		criteria.setFirstResult(startIndex);
		criteria.setMaxResults(10);
		issueMrnMasterDtos=criteria.list();
		//goodsIssueMrnMasterDto.setLstGoodsIssueMrnMaster(issueMrnMasterDtos);
		log.debug("inside getReceivedMRNPagination :"+mrnMasterDTO);
	}catch(Exception e){
		log.error("error for  getReceivedMRNPagination...."+e.getMessage());
		e.printStackTrace();
	}
	return issueMrnMasterDtos;
}

@Override
public Integer getPageCountAllReceivedMRN(Integer subInventoryId,HttpServletRequest request) {
	// TODO Auto-generated method stub
	Integer countNew = 0;
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		String sql="";
		sql = "SELECT count(*) FROM inv_goods_issue_mrn_master_new where deleted != 'Y' AND mrn_subinventory_id="+subInventoryId+" AND unit_id="+unitId+" and mrn_status='PartiallyReceived' or mrn_status='Dispatched'" ;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
		countNew = ((Number)countQuery.uniqueResult()).intValue();
		log.debug("inside getPageCountAllReceivedMRN :"+countNew);
	} catch (Exception e) {
		log.error("error for  getPageCountAllReceivedMRN...."+e.getMessage());
		e.printStackTrace();
	}
	return countNew;
}

@Override
public ConsumptionDto getConsumptionPagination(Integer startIndex,
		String subInventoryName,HttpServletRequest request) {
	// TODO Auto-generated method stub
	List<ConsumptionDto> consumptionDtos =new ArrayList<ConsumptionDto>();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try{
		Disjunction or = Restrictions.disjunction();
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ConsumptionDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("subinvName", subInventoryName));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.setFirstResult(startIndex);
		criteria.setMaxResults(10);
		criteria.add(or);
		criteria.addOrder(Order.desc("id"));
		consumptionDtos=criteria.list();
		consumptionDto.setLstConsumptionDto(consumptionDtos);
		log.debug("inside getConsumptionPagination :"+consumptionDto);
	}catch(Exception e){
		log.error("error for  getConsumptionPagination...."+e.getMessage());
		e.printStackTrace();
	}
	return consumptionDto;
}

@Override
public Integer getPageCountAllConsumption(String subInventoryName,HttpServletRequest request) {
	// TODO Auto-generated method stub
	Integer countNew = 0;
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		String sql="";
		sql = "SELECT count(*) FROM inv_consumption_master_new where subinv_name='"+subInventoryName+"' and unit_id="+unitId ;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
		countNew = ((Number)countQuery.uniqueResult()).intValue();
		log.debug("inside getPageCountAllConsumption :"+countNew);
	} catch (Exception e) {
		log.error("error for  getPageCountAllConsumption...."+e.getMessage());
		e.printStackTrace();
	}
	return countNew;
}

@Override
public StockReturnDto getPaginationStockReturn(Integer startIndex,
		String subInventoryName,HttpServletRequest request) {
	// TODO Auto-generated method stub
	List<StockReturnDto> lstslave=new ArrayList<StockReturnDto>();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try
	{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(StockReturnDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("subinvName", subInventoryName));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.addOrder(Order.desc("id"));
		criteria.setFirstResult(startIndex);
		criteria.setMaxResults(10);
		//criteria.add(Restrictions.eq("unitId",unitId));
		lstslave=	criteria.list();
		stockReturnDto.setLstStockReturnDto(lstslave);
		log.debug("inside getPaginationStockReturn partyMasterDto::"+stockReturnDto);
	}catch(Exception e){
		log.error("error for  getPaginationStockReturn...."+e.getMessage());
		e.printStackTrace();
	}
	
	return stockReturnDto;
}

@Override
public Integer getPageCountAllStockReturn(String subInventoryName,HttpServletRequest request) {
	// TODO Auto-generated method stub
	Integer countNew = 0;
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		String sql="";
		sql = "SELECT count(*) FROM inv_stock_return_new where subinv_name='"+subInventoryName+"' and unit_id="+unitId ;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
		countNew = ((Number)countQuery.uniqueResult()).intValue();
		log.debug("inside getPageCountAllStockReturn partyMasterDto::"+countNew);
	} catch (Exception e) {
		log.error("error for  getPageCountAllStockReturn...."+e.getMessage());
		e.printStackTrace();
	}
	return countNew;
}

@Override
public Users getAutoSuggestionListDispenser(String userName) {
	Users users = new Users();
	List<Users> userList = new ArrayList<Users> ();
	try {
		String sql = "SELECT u.user_id AS id,concat(u.title,' ',u.f_name,' ',u.m_name,' ',u.l_name) AS user_name " +
				",u.user_type as user_type FROM users u where (u.f_name like '"+userName+"%' "
						+" OR u.l_name like '"+userName+"%' "
						+" OR concat(u.f_name,' ',u.l_name) like '"+userName+"%' "
						+" OR concat(u.f_name,' ',u.m_name,' ',u.l_name) like '"+userName+"%' "
						+" OR concat(u.f_name,' ',u.m_name) like '"+userName+"%' "
						+" OR concat(u.m_name,' ',u.l_name) like '"+userName+"%') and u.status='Y'";
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
		List<Map<String, Object>> masterRow = getMaster.list();		          
		for(Map<String, Object> row : masterRow){
			Users obj = new Users();
			obj.setUser_Name((String)row.get("user_name"));
			obj.setUser_ID((Integer)row.get("id"));
			obj.setUser_Type((String)row.get("user_type"));
			userList.add(obj);		    	
		}
		users.setUsersList(userList);
	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return users;
}

@Override
public List<ConsumptionDto> getAllConsumptionList(HttpServletRequest request) {
	List<ConsumptionDto> lstconsumptionDto = new ArrayList<ConsumptionDto>();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ConsumptionDto.class);
		criteria.add(Restrictions.eq("deleted","N"));
		criteria.add(Restrictions.eq("unitId", unitId));
		lstconsumptionDto =  criteria.list();
		log.debug("inside getAllConsumptionList:"+lstconsumptionDto);
		return lstconsumptionDto;
	} catch (Exception e) {
		log.error("error for  getAllConsumptionList...."+e.getMessage());
		e.printStackTrace();
	}
	return lstconsumptionDto;
}

@Override
public GoodsIssueMrnMasterDto viewReceivedGeneratedMRNData(
		Integer goodsIssueMasterId) {
	GoodsIssueMrnMasterDto goodsIssueMrnMasterDto = new GoodsIssueMrnMasterDto();
	try {
	List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = new ArrayList<GoodsIssueMrnItemSlaveDto>();
	Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
	criteria.add(Restrictions.eq("id",goodsIssueMasterId));
	System.out.println("mrnMasterId::"+goodsIssueMasterId);
	goodsIssueMrnMasterDto = (GoodsIssueMrnMasterDto) criteria.uniqueResult();
	String sql = "";
	
		sql = "SELECT SUM(goodsIssueSlave.current_subinventory_stock) AS current_sub_inventory_qty,goodsIssueSlave.item_batch_code,goodsIssueSlave.item_batch_exp_date,goodsIssueSlave.item_master_id,goodsIssueSlave.item_name,ehat_unit.unit_name,goodsIssueSlave.requested_item_quantity,goodsIssueSlave.updated_date_time FROM inv_goods_issue_mrn_item_slave_new goodsIssueSlave LEFT JOIN ehat_unit_doc ehat_unit ON ehat_unit.uni_id = goodsIssueSlave.item_uom WHERE goodsIssueSlave.goods_issue_id = "+goodsIssueMasterId+" AND (goodsIssueSlave.mrn_status = 'FullyReceived' OR goodsIssueSlave.mrn_status = 'PartiallyReceivedQty' OR goodsIssueSlave.mrn_status = 'Dispatched') AND goodsIssueSlave.deleted != 'Y' GROUP BY goodsIssueSlave.item_batch_code,item_master_id";
		System.out.println("sql viewReceivedGeneratedMRNData:::"+sql);
		Query masterJoinQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listSubInvStockBatchWise = masterJoinQuery.list();
		for(Map<String, Object> row : listSubInvStockBatchWise){
			GoodsIssueMrnItemSlaveDto issueMrnItemSlaveDto = new GoodsIssueMrnItemSlaveDto();
			issueMrnItemSlaveDto.setCurrentSubInventoryStockUpdated((BigDecimal)row.get("current_sub_inventory_qty"));
			issueMrnItemSlaveDto.setItemName((String)row.get("item_name"));
			issueMrnItemSlaveDto.setItemBatchCode((String)row.get("item_batch_code"));
			issueMrnItemSlaveDto.setItemBatchExpDate((String)row.get("item_batch_exp_date"));
			issueMrnItemSlaveDto.setUomUnitName((String)row.get("unit_name"));
			issueMrnItemSlaveDto.setItemQuantity((Integer) row.get("item_quantity"));
			issueMrnItemSlaveDto.setRequestedItemQuantity((Integer)row.get("requested_item_quantity"));
			issueMrnItemSlaveDto.setUpdatedDate((Date)row.get("updated_date_time"));
			issueMrnItemSlaveDto.setItemMasterId((Integer) row.get("item_master_id"));
			goodsIssueMrnItemSlaveDtos.add(issueMrnItemSlaveDto);
			goodsIssueMrnMasterDto.setGoodsIssueMrnItemSlaveDtos(goodsIssueMrnItemSlaveDtos);
		}
		log.debug("inside viewReceivedGeneratedMRNData :"+goodsIssueMrnItemSlaveDtos);
	} catch (Exception e) {
		log.error("error for  viewReceivedGeneratedMRNData...."+e.getMessage());
		e.printStackTrace();
	}
	return goodsIssueMrnMasterDto;
}

@Override
public MrnMasterDTO viewGeneratedMRNData(Integer id, HttpServletRequest request) {
	MrnMasterDTO mrnMasterDTO = new MrnMasterDTO();
	try {
		Integer subInventoryId = 0;
		Integer itemMasterId = 0;
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String sql = "";
		List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = new ArrayList<GoodsIssueMrnItemSlaveDto>();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
		criteria.add(Restrictions.eq("id",id));
		criteria.add(Restrictions.eq("unitId", unitId));
		mrnMasterDTO = (MrnMasterDTO) criteria.uniqueResult();
		for (MrnMasterItemInfoDTO m1 : mrnMasterDTO.getLstMrniteminfo()) {
			subInventoryId =  m1.getSunInventoryId();
			itemMasterId = m1.getItemMasterId();
		//sql = "select if(sum(current_sub_inventory_stock) > 0,sum(current_sub_inventory_stock),0) as current_sub_inventory_stock,item_batch_code,item_batch_exp_date,item_master_id from inv_batch_stock_new where item_master_id="+itemMasterId+"";
		sql = "SELECT sum(current_subinventory_stock) AS current_sub_inventory_stock,item_batch_code,item_batch_exp_date,item_master_id FROM inv_goods_issue_mrn_item_slave_new WHERE sub_inventory_id = "+subInventoryId+" and item_master_id = "+itemMasterId+" and (mrn_status = 'FullyReceived' OR mrn_status='PartiallyReceivedQty' OR mrn_status='Dispatched' OR mrn_status = 'In-Process') group by item_master_id";
		System.out.println("sql editGeneratedMRNData::"+sql);
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listMap = getMaster.list();
		for(Map<String, Object> row : listMap){
			GoodsIssueMrnItemSlaveDto obj = new GoodsIssueMrnItemSlaveDto();
			obj.setItemBatchCode(((String)row.get("item_batch_code")));
			obj.setItemBatchExpDate(((String)row.get("item_batch_exp_date")));
			obj.setItemMasterId(((Integer)row.get("item_master_id")));
			obj.setCurrentSubInventoryStockUpdated(((BigDecimal)row.get("current_sub_inventory_stock")));
			goodsIssueMrnItemSlaveDtos.add(obj);
			mrnMasterDTO.setGoodsIssueMrnItemSlaveDtos(goodsIssueMrnItemSlaveDtos);
		}
		}
		log.debug("inside viewGeneratedMRNData :"+mrnMasterDTO);
		return mrnMasterDTO;
	} catch (Exception e) {
		log.error("error for  viewGeneratedMRNData...."+e.getMessage());
		e.printStackTrace();
	}
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
	@Override
	public Integer getCurrentInventoryStock(int itemMasterId,
			HttpServletRequest httpRequest) {
		Integer currentInventoryStock = 0;
		String sql = null;
		sql = "select sum(item_quantity) as item_quantity from inv_batch_stock_new where item_master_id="+itemMasterId+" ";
		//System.out.println("sql:::::::::::::::::::::::"+sql);
		try {
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, BigDecimal>> masterRow = getMaster.list();
			for(Map<String, BigDecimal> row : masterRow){
				currentInventoryStock = ((BigDecimal) row.get("item_quantity")).intValue();
				}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return currentInventoryStock;
	}

	@Override
	public List<GoodsIssueMrnMasterDto> searchReceivedMRN(int mrnMasterId,String subInventoryName,
			HttpServletRequest request) {
		List<GoodsIssueMrnMasterDto> lstGoodsIssueMrn =new ArrayList<GoodsIssueMrnMasterDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(GoodsIssueMrnMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnSubinventoryName", subInventoryName));
			criteria.add(Restrictions.eq("mrnId", mrnMasterId));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.setMaxResults(10);
			criteria.addOrder(Order.desc("id"));
			lstGoodsIssueMrn=criteria.list();
			log.debug("reponse searchReceivedMRN....."+lstGoodsIssueMrn);
		}catch(Exception e){
			log.error("error for searchReceivedMRN...." + e.getMessage());
			e.printStackTrace();
		}
		return lstGoodsIssueMrn;
}

	@Override
	public List<MrnMasterDTO> searchMRN(int mrnMasterId, String subInventoryName, HttpServletRequest request) {
		List<MrnMasterDTO> lstGeneratedMrn =new ArrayList<MrnMasterDTO>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnId", mrnMasterId));
			criteria.add(Restrictions.eq("mrnSubinventoryName", subInventoryName));
			or.add(Restrictions.eq("mrnStatus", "OPEN"));
			or.add(Restrictions.eq("mrnStatus", "In-Process"));
			or.add(Restrictions.eq("unitId", unitId));
			criteria.add(or);
			criteria.addOrder(Order.desc("mrnId"));
			lstGeneratedMrn=criteria.list();
			log.debug("inside getInProcessStatusGeneratedMRNRequest:"+lstGeneratedMrn);
		}catch(Exception e){
			log.error("error for  getInProcessStatusGeneratedMRNRequest...."+e.getMessage());
			e.printStackTrace();
		}
		return lstGeneratedMrn;
	}

	@Override
	public List<ConsumptionDto> getAutoItemNameOnConsumption(
			String subInventoryName, String itemName, HttpServletRequest request) {
		List<ConsumptionDto> consumptionDtos =new ArrayList<ConsumptionDto>();
		List<ConsumptionDto> consumptionDtosNew =new ArrayList<ConsumptionDto>();
		List<ConsumptionItemSlaveDto> list =new ArrayList<ConsumptionItemSlaveDto>();
		try{
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ConsumptionDto.class);
			//criteria.setFetchMode("consumptionItemSlaveDto", FetchMode.JOIN);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.ilike("subinvName", subInventoryName,MatchMode.ANYWHERE));
			//criteria.add(Restrictions.sqlRestriction("item_name like ? ", "%" + itemName + "%", StringType.INSTANCE));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.setMaxResults(10);
			criteria.add(or);
			criteria.addOrder(Order.desc("id"));
			consumptionDtos=criteria.list();
			
			for (ConsumptionDto consumptionDto : consumptionDtos) {
				list = getConsumptionItemSlaveDtoList(consumptionDto.getId(),itemName,request);
				consumptionDto.setConsumptionItemSlaveDto(list);
				consumptionDtosNew.add(consumptionDto);
			}
			
			log.debug("inside getAutoItemNameOnConsumption :"+consumptionDtosNew);
		}catch(Exception e){
			log.error("error for  getAutoItemNameOnConsumption...."+e.getMessage());
			e.printStackTrace();
		}
		return consumptionDtosNew;
	}
	
	@Override
	public List<ConsumptionItemSlaveDto> getConsumptionItemSlaveDtoList(
			Integer consumptionSlaveId,String itemName, HttpServletRequest request) {
		List<ConsumptionItemSlaveDto> consumptionItemSlaveDtoList =new ArrayList<ConsumptionItemSlaveDto>();
		try{
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ConsumptionItemSlaveDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.ilike("itemName", itemName,MatchMode.ANYWHERE));
			criteria.add(Restrictions.sqlRestriction("consumption_id=?",consumptionSlaveId,IntegerType.INSTANCE));
			consumptionItemSlaveDtoList=criteria.list();
			
			log.debug("inside getConsumptionItemSlaveDtoList :"+consumptionItemSlaveDtoList);
			System.out.println("consumptionItemSlaveDtoList"+consumptionItemSlaveDtoList);
		}catch(Exception e){
			log.error("error for  getConsumptionItemSlaveDtoList...."+e.getMessage());
			e.printStackTrace();
		}
		return consumptionItemSlaveDtoList;
	}
	
	
	

	@SuppressWarnings("unchecked")
	@Override
	public List<ConsumptionDto> getConsumptionListByDate(
			String subInventoryName, String fromDate, String toDate,
			HttpServletRequest request) {
		List<ConsumptionDto> lstconsumptionDto = new ArrayList<ConsumptionDto>();
		List<ConsumptionItemSlaveDto> lstConsumptionItemSlaveDto = new ArrayList<ConsumptionItemSlaveDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			
			String sql = "select *from inv_consumption_master_new  where deleted='N' and unit_id="+unitId+" and subinv_name='"+subInventoryName.trim()+"' and Date_Format(created_date_time,'%Y-%m-%d') between '"+fromDate+"' and '"+toDate+"'";
			
			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				ConsumptionDto obj = new ConsumptionDto();
				obj.setId((Integer) row.get("id"));
				obj.setCreatedDateTime((Date) row.get("created_date_time"));
				obj.setDispensedTo((String) row.get("dispensed_to"));
				obj.setDispensedToId((Integer) row.get("dispensed_to_id"));
				obj.setDispensedToOther((String) row.get("dispensed_to_other"));
				obj.setConsumedBy((String) row.get("consumed_by"));
				obj.setDispensedDate((String) row.get("dispensed_date"));
				obj.setSubinvId((Integer) row.get("subinv_id"));
				obj.setSubinvName((String) row.get("subinv_name"));
				obj.setUserId((Integer) row.get("user_id"));
				obj.setPatientName((String) row.get("patient_name"));
				obj.setPatientId((Integer) row.get("patient_id"));
				obj.setDepartMent((String) row.get("department_name"));
				obj.setUnitId((Integer) row.get("unit_id"));
				obj.setCreatedBy((Integer) row.get("created_by"));
				obj.setRemark((String) row.get("remark"));
				Integer  consumptionSlaveId = (Integer) row.get("id");
				lstConsumptionItemSlaveDto = getConsumptionItemSlaveDtoList(consumptionSlaveId,request);
				obj.setConsumptionItemSlaveDto(lstConsumptionItemSlaveDto);
				lstconsumptionDto.add(obj);
			}
			
			
			log.debug("inside getAllConsumptionList:"+lstconsumptionDto);
			return lstconsumptionDto;
		} catch (Exception e) {
			log.error("error for  getAllConsumptionList...."+e.getMessage());
			e.printStackTrace();
		}
		return lstconsumptionDto;
	}
	
	
	@Override
	public List<ConsumptionItemSlaveDto> getConsumptionItemSlaveDtoList(
			Integer consumptionSlaveId, HttpServletRequest request) {
		List<ConsumptionItemSlaveDto> consumptionItemSlaveDtoList =new ArrayList<ConsumptionItemSlaveDto>();
		try{
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ConsumptionItemSlaveDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.sqlRestriction("consumption_id=?",consumptionSlaveId,IntegerType.INSTANCE));
			consumptionItemSlaveDtoList=criteria.list();
			
			log.debug("inside getConsumptionItemSlaveDtoList :"+consumptionItemSlaveDtoList);
			System.out.println("consumptionItemSlaveDtoList"+consumptionItemSlaveDtoList);
		}catch(Exception e){
			log.error("error for  getConsumptionItemSlaveDtoList...."+e.getMessage());
			e.printStackTrace();
		}
		return consumptionItemSlaveDtoList;
	}
	
	@Override
	public List<ConsumptionDto> searchItemNameOnConsumption(
			String subInventoryName, String itemName, Integer itemId , HttpServletRequest request) {
		List<ConsumptionDto> consumptionDtos =new ArrayList<ConsumptionDto>();
		try{
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ConsumptionDto.class);
			criteria.setFetchMode("consumptionItemSlaveDto", FetchMode.JOIN);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("subinvName", subInventoryName));
			criteria.add(Restrictions.sqlRestriction("item_name like ? ", "%" + itemName + "%", StringType.INSTANCE));
			criteria.add(Restrictions.sqlRestriction("item_master_id = ? ",itemId, IntegerType.INSTANCE));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.setMaxResults(10);
			criteria.add(or);
			criteria.addOrder(Order.desc("id"));
			consumptionDtos=criteria.list();
			 Set<ConsumptionDto> s= new HashSet<ConsumptionDto>();
			    s.addAll(consumptionDtos);         
			    consumptionDtos = new ArrayList<ConsumptionDto>();
			    consumptionDtos.addAll(s);      
			
			log.debug("inside searchItemNameOnConsumption :"+consumptionDtos);
		}catch(Exception e){
			log.error("error for  searchItemNameOnConsumption...."+e.getMessage());
			e.printStackTrace();
		}
		return consumptionDtos;
	}

	@Override
	public List<ConsumptionDto> getConsumptionTypeListForConsumtionReport(
			Integer subInvId, String consumptionType, HttpServletRequest request) {
		List<ConsumptionDto> lstconsumptionDto = new ArrayList<ConsumptionDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ConsumptionDto.class);
			criteria.add(Restrictions.eq("subinvId",subInvId));
			criteria.add(Restrictions.eq("unitId", unitId));
			/*if(consumptionType.equalsIgnoreCase("In-Use")){
				criteria.setFetchMode("consumptionItemSlaveDto", FetchMode.JOIN);
				criteria.add(Restrictions.sqlRestriction("consumption_type like ? ","' %"+consumptionType.trim()+"% '", StringType.INSTANCE));
			}else if(consumptionType.equalsIgnoreCase("Consumed")){
				criteria.setFetchMode("consumptionItemSlaveDto", FetchMode.JOIN);
				criteria.add(Restrictions.sqlRestriction("consumption_type like ? ","' %"+consumptionType.trim()+"% '", StringType.INSTANCE));	
			}*/
			lstconsumptionDto =  criteria.list();
			log.debug("inside getConsumptionListById:"+lstconsumptionDto);
			return lstconsumptionDto;
		} catch (Exception e) {
			log.error("error for  getConsumptionListById...."+e.getMessage());
			e.printStackTrace();
		}
		return lstconsumptionDto;
	}

}

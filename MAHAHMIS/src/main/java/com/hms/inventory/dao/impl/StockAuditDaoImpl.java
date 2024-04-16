package com.hms.inventory.dao.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.StockAuditDao;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.SubInventoryMasterDto;

@Repository
@Transactional
public class StockAuditDaoImpl implements StockAuditDao {

	static Logger log=Logger.getLogger(StockAuditDaoImpl.class.getName());

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<BatchStockDto> getStockAuditData(HttpServletRequest request) {
		List<BatchStockDto> list = new ArrayList<>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql = "SELECT a.item_name,a.item_master_id,a.issue_quantity, a.item_quantity,a.item_batch_code,a.item_batch_exp_date,b.reorder_stock FROM inv_batch_stock_new a inner join  inv_item_master_new  b ON a.item_master_id = b.id where b.deleted='N' and a.deleted='N' and a.unit_id="+unitId+" and b.unit_id="+unitId;
			System.out.println("sql getStockAuditData::"+sql);
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query.setMaxResults(10);
			List<Map<String, Object>> listStockDetails = query.list();
			for (Map<String, Object> row : listStockDetails) {
				BatchStockDto obj = new BatchStockDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
			    obj.setItemBatchCode((String)row.get("item_batch_code"));
				obj.setReorderStock((Integer) row.get("reorder_stock"));
				obj.setIssueQuantity((Integer)row.get("issue_quantity"));
				obj.setItemQuantity((Integer)row.get("item_quantity"));
				obj.setItemBatchExpDate((Date)row.get("item_batch_exp_date"));
				list.add(obj);
			}
			log.debug("this is getStockAuditData...."+list);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error for getStockAuditData...." + e.getMessage());
			e.printStackTrace();
			return null;
		}
		
		return list;
	}

	@Override
	public BatchStockDto stockAuditAutoSuggestion(String itemName,
			String callFrom,HttpServletRequest request) {
		BatchStockDto batchStockDto = new BatchStockDto();
		List<BatchStockDto> backStockDtoList = new ArrayList<BatchStockDto>();
		try {

			String sql = "";

			if (callFrom.equals("stockAudit")) {
				sql = stockAuditAutoSuggestion(itemName,request);
			}
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> itemRow = query.list();

			for (Map<String, Object> row : itemRow) {
				BatchStockDto obj = new BatchStockDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
	            backStockDtoList.add(obj);
			}

			batchStockDto.setLstBatchStockDto(backStockDtoList);
			log.debug("this is stockAuditAutoSuggestion...."+batchStockDto);
		} catch (Exception e) {
			log.error("error for stockAuditAutoSuggestion...." + e.getMessage());
			e.printStackTrace();
			return null;
		}
		return batchStockDto;
	}

	String stockAuditAutoSuggestion(String itemName,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		// TODO Auto-generated method stub
		String sql = "";
		sql = "SELECT distinct a.item_name,a.item_master_id FROM inv_batch_stock_new a where a.item_name like '"
				+ itemName + "%' and a.unit_id="+unitId+" and a.deleted='N' limit 20 ";
		return sql;
	}

	String subInvAutoSuggestion(String subInvName,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		// TODO Auto-generated method stub
		String sql = "";
		sql = "SELECT a.id, a.subinventory_name FROM inv_subinventory_master_new a where  a.subinventory_name like '"
				+ subInvName + "%' and a.deleted='N' and a.unit_id="+unitId+" limit 20 ";
		return sql;
	}

	@Override
	public List<BatchStockDto> itemSearchResultById(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<BatchStockDto> batchlist = new ArrayList<>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql ="select * from inv_batch_stock_new where item_master_id="+id+" and deleted='N' and unit_id="+unitId;
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>>list = query.list();
			for (Map<String, Object> row : list) {
				BatchStockDto obj = new BatchStockDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
			    obj.setItemBatchCode((String)row.get("item_batch_code"));
				obj.setReorderStock((Integer) row.get("reorder_stock"));
				obj.setItemQuantity((Integer)row.get("item_quantity"));
				obj.setItemBatchExpDate((Date)row.get("item_batch_exp_date"));
				batchlist.add(obj);
			}
			log.debug("this is itemSearchResultById...."+batchlist);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error for itemSearchResultById...." + e.getMessage());
			e.printStackTrace();
			
			return null;
		}
		
		return batchlist;
	}

	@Override
	public SubInventoryMasterDto subinventorySearchResult(
			String subInventoryName, String callFrom,HttpServletRequest request) {
		// TODO Auto-generated method stub
		SubInventoryMasterDto subInventoryMasterDto = new SubInventoryMasterDto();
		List<SubInventoryMasterDto> subInventoryMasterDtoDtoList = new ArrayList<SubInventoryMasterDto>();
		try {

			String sql = "";

			if (callFrom.equals("subInvName")) {
				sql = subInvAutoSuggestion(subInventoryName,request);
			}
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> itemRow = query.list();

			for (Map<String, Object> row : itemRow) {
				SubInventoryMasterDto obj = new SubInventoryMasterDto();
				obj.setSubInventoryName((String) row.get("subinventory_name"));
				obj.setId((Integer) row.get("id"));
				subInventoryMasterDtoDtoList.add(obj);
			}
			subInventoryMasterDto
					.setLstSubInventoryMaster(subInventoryMasterDtoDtoList);
			log.debug("this is subinventorySearchResult...."+subInventoryMasterDto);
		} catch (Exception e) {
			log.error("error for subinventorySearchResult...." + e.getMessage());
			e.printStackTrace();
			return null;
		}
		return subInventoryMasterDto;
	}

	@Override
	public SubInventoryMasterDto getSubInventoryData(HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		SubInventoryMasterDto subInventoryMasterDto = new SubInventoryMasterDto();
		@SuppressWarnings("unchecked")
		List<SubInventoryMasterDto> list = sessionFactory.getCurrentSession()
				.createCriteria(SubInventoryMasterDto.class).add(Restrictions.eq("deleted","N")).add(Restrictions.eq("unitId",unitId)).list();
		subInventoryMasterDto.setLstSubInventoryMaster(list);
		log.debug("this is getSubInventoryData...."+subInventoryMasterDto);
		return subInventoryMasterDto;
	}
	
	@Override
	public List<GoodsIssueMrnItemSlaveDto> getSubInDataById(int id,HttpServletRequest request) {
		List<GoodsIssueMrnItemSlaveDto> list = new ArrayList<>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql = "select sum(current_subinventory_stock) as current_sub_inventory_qty,item_batch_code,item_batch_exp_date,item_master_id,item_name from inv_goods_issue_mrn_item_slave_new where sub_inventory_id="+id+" and (mrn_status='FullyReceived' OR mrn_status='PartiallyReceivedQty' OR mrn_status='Dispatched') AND deleted !='Y' AND updated_by=1 GROUP BY item_batch_code,item_batch_exp_date,item_name,sub_inventory_name,item_master_id";
			System.out.println("sql getSubInDataById::"+sql);
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			//query.setMaxResults(10);
			List<Map<String, Object>> listStockDetails = query.list();
			for (Map<String, Object> row : listStockDetails) {
				GoodsIssueMrnItemSlaveDto obj = new GoodsIssueMrnItemSlaveDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
			    obj.setItemBatchCode((String)row.get("item_batch_code"));
				//obj.setIssueQuantity((Integer)row.get("issue_quantity"));
				obj.setItemBatchExpDate((String)row.get("item_batch_exp_date"));
				obj.setCurrentSubInventoryStockUpdated((BigDecimal)row.get("current_sub_inventory_qty"));
				list.add(obj);
			}
			log.debug("this is getSubInDataById...."+list);
		} catch (Exception e) {
			log.error("error for getSubInDataById...." + e.getMessage());
			e.printStackTrace();
			return null;
			// TODO: handle exception
		}
		return list;
	}

	@Override
	public Integer getPageCountAllStockAudit(HttpServletRequest request) {
		Integer countNew = 0;
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql="";
			sql = "SELECT  count(*) FROM inv_batch_stock_new a inner join  inv_item_master_new  b ON a.item_master_id = b.id WHERE a.deleted != 'Y' AND b.deleted != 'Y' AND a.unit_id="+unitId+" AND b.unit_id="+unitId;
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			countNew = ((Number)countQuery.uniqueResult()).intValue();
			log.debug("this is getPageCountAllStockAudit...."+countNew);
		} catch (Exception e) {
			log.error("error for getPageCountAllStockAudit...." + e.getMessage());
			e.printStackTrace();
		}
		return countNew;
	}

	@Override
	public List<BatchStockDto> getStockAuditPagination(Integer startIndex,HttpServletRequest request) {
		List<BatchStockDto> list = new ArrayList<>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			
			//String sql = "SELECT a.item_name,a.item_master_id,a.issue_quantity, sum(a.item_quantity) as item_quantity,a.item_batch_code,a.item_batch_exp_date,b.reorder_stock FROM inv_batch_stock_new a inner join  inv_item_master_new  b ON a.item_master_id = b.id where b.deleted='N' and a.deleted='N' and a.unit_id="+unitId+" and b.unit_id="+unitId+" GROUP BY item_batch_code,item_master_id DESC" ;
			String sql = "SELECT a.item_name,a.item_master_id,a.issue_quantity, a.item_quantity,a.item_batch_code,a.item_batch_exp_date,b.reorder_stock FROM inv_batch_stock_new a inner join  inv_item_master_new  b ON a.item_master_id = b.id where b.deleted='N' and a.deleted='N' and a.unit_id="+unitId+" and b.unit_id="+unitId;
			System.out.println("sql getStockAuditPagination::"+sql);
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			List<Map<String, Object>> listStockDetails = query.list();
			for (Map<String, Object> row : listStockDetails) {
				BatchStockDto obj = new BatchStockDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
			    obj.setItemBatchCode((String)row.get("item_batch_code"));
				obj.setReorderStock((Integer) row.get("reorder_stock"));
				obj.setIssueQuantity((Integer)row.get("issue_quantity"));
				obj.setItemQuantity((Integer)row.get("item_quantity"));
				obj.setItemBatchExpDate((Date)row.get("item_batch_exp_date"));
				list.add(obj);
			}
			log.debug("this is getStockAuditPagination...."+list);
		} catch (Exception e) {
			log.error("error for getStockAuditPagination...." + e.getMessage());
			e.printStackTrace();
			// TODO: handle exception
			return null;
		}
		// TODO Auto-generated method stub
		
		return list;
	}

	@Override
	public Integer getPageCountAllStockAuditItem(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		Integer countNew = 0;
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql="";
			sql = "SELECT count(*) FROM inv_batch_stock_new a where a.current_sub_inventory_stock !='0' AND a.deleted != 'Y' AND a.sub_inv_id="+ id+" AND a.unit_id="+unitId;
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			countNew = ((Number)countQuery.uniqueResult()).intValue();
			log.debug("this is getPageCountAllStockAuditItem...."+countNew);
		} catch (Exception e) {
			log.error("error for getPageCountAllStockAuditItem...." + e.getMessage());
			e.printStackTrace();
		}
		return countNew;
	}

	@Override
	public List<BatchStockDto> getStockAuditItemPagination(Integer startIndex,Integer id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<BatchStockDto> list = new ArrayList<>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql = "SELECT a.item_name,a.item_master_id,a.issue_quantity,a.item_batch_code,a.item_batch_exp_date,a.current_sub_inventory_stock FROM inv_batch_stock_new a where a.current_sub_inventory_stock !='0' AND a.sub_inv_id="+ id + " and a.deleted='N' and b.deleted='N' and a.unit_id="+unitId+" and b.unit_id="+unitId;
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			List<Map<String, Object>> listStockDetails = query.list();
			for (Map<String, Object> row : listStockDetails) {
				BatchStockDto obj = new BatchStockDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
			    obj.setItemBatchCode((String)row.get("item_batch_code"));
				obj.setIssueQuantity((Integer)row.get("issue_quantity"));
				obj.setItemBatchExpDate((Date)row.get("item_batch_exp_date"));
				obj.setCurrentSubInventoryStock((Integer)row.get("current_sub_inventory_stock"));
				list.add(obj);
			}
			log.debug("this is getStockAuditItemPagination...."+list);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error for getStockAuditItemPagination...." + e.getMessage());
			e.printStackTrace();
			return null;
		}
		
		return list;
	}
	
}

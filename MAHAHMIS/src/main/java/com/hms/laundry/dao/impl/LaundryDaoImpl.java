package com.hms.laundry.dao.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dto.ItemMasterDto;
import com.hms.laundry.dao.LaundryDao;
import com.hms.laundry.dto.LaundryLinenMasterDTO;
import com.hms.laundry.dto.LaundryLinenSlaveDTO;


@Repository
public class LaundryDaoImpl implements LaundryDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<LaundryLinenMasterDTO> getlist(String subDept) {
		List<LaundryLinenMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinenMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("deptName", subDept));
			
			criteria.addOrder(Order.desc("mrnId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
	}

	@Override
	public Integer getNextMaterialRequestNoteIdInLIstLaundry() {
		Integer id = 0;
		try {
			
			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createQuery(
							"SELECT MAX(mrnId) FROM LaundryLinenMasterDTO");
			Object id1 = query.uniqueResult();

			if (id1 == null) {
				id1 = 0;
			}
			id = Integer.parseInt(id1.toString()) + 1;

		} catch (Exception e) {
			e.printStackTrace();
			return id;
		}
		return id;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ItemMasterDto> fetchItemNamesOnlyAutoSuggestForLaundryItems(String letter) {

		List<ItemMasterDto> ltmaster = new ArrayList<ItemMasterDto>();
		String sql;
		try {
			Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_search_laundry_item(:unit_id,:p_letter)");
			query.setParameter("unit_id",1);
			query.setParameter("p_letter", letter);
			query.setResultTransformer(Transformers.aliasToBean(ItemMasterDto.class));
			ltmaster = query.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	
	}

	@Override
	public Integer getAvalQuantity(String itemName, String deptName, int itemCode) {
		Integer qty = 0;
		try {	
			Query query= sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_total_item_stock_inventory(:p_unit_id,:p_item_name,:p_sub_inventory_name)");
			query.setParameter("p_unit_id", 1);
			query.setParameter("p_item_name", itemName);
			query.setParameter("p_sub_inventory_name", deptName);
			BigDecimal qty1 = (BigDecimal) query.uniqueResult();
			Object qty2 = qty1;
			 qty =  ((BigDecimal)qty2).intValue();
			System.out.println("qty " + qty);
			return qty;
		} catch (Exception e) {

			e.printStackTrace();
		}
		return qty;
	}

	@Override
	public int save(LaundryLinenMasterDTO laundryLinenMasterDTO,HttpServletRequest request) {

		int records = 0;
		int masterid = 0;
		try {
			masterid = laundryLinenMasterDTO.getMrnId();

			laundryLinenMasterDTO.setUnitId(1);
			laundryLinenMasterDTO.setDeleted("N");

			if(laundryLinenMasterDTO.getMrnId()==0)
			{
			laundryLinenMasterDTO.setCreatedBy(1);
			laundryLinenMasterDTO.setCreatedDate(new Date(new java.util.Date()
					.getTime()));
			}else{
				laundryLinenMasterDTO.setUpdatedBy(1);
				laundryLinenMasterDTO.setUpdatedDate(new Date(new java.util.Date()
						.getTime()));
				
			}

			sessionFactory.getCurrentSession().merge(laundryLinenMasterDTO);
			if (masterid > 0) {
				records = 2;
			} else {
				records = 1;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return records = 0;
		}
		return records;
	
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<LaundryLinenMasterDTO> getlistForLnlDept() {
		List<LaundryLinenMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinenMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			
			criteria.addOrder(Order.desc("mrnId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<LaundryLinenMasterDTO> getlistbyId(int mrnId) {
		List<LaundryLinenMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinenMasterDTO.class);
			criteria.add(Restrictions.eq("mrnId", mrnId));
			criteria.add(Restrictions.eq("deleted", "N"));

			criteria.addOrder(Order.desc("mrnId"));
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
	}

	@Override
	public int approveReuest(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request) {
		int records = 0;
		int masterid = 0;
		try {
			masterid = laundryLinenMasterDTO.getMrnId();

			laundryLinenMasterDTO.setUnitId(1);
			laundryLinenMasterDTO.setDeleted("N");

			laundryLinenMasterDTO.setCreatedBy(1);
			laundryLinenMasterDTO.setCreatedDate(new Date(new java.util.Date()
					.getTime()));

			sessionFactory.getCurrentSession().merge(laundryLinenMasterDTO);
			if (masterid > 0) {
				records = 2;
			} else {
				records = 1;
			}
			
			boolean r=deductitemsFromSub2(laundryLinenMasterDTO);
		} catch (Exception e) {
			e.printStackTrace();
			return records = 0;
		}
		return records;
	}
	
	@SuppressWarnings("unchecked")
	public boolean deductitemsFromSub2(LaundryLinenMasterDTO laundryLinenMasterDTO) {
		String sql="";
		List<Map<String, Object>> ltLaundryBatchDTOs = null;
		List<Map<String, Object>> ltInventoryBatchDTOs = null;
		try {

			List<LaundryLinenSlaveDTO> ltBatchStockDTOs = laundryLinenMasterDTO
					.getLtlandlSlave();
			
			for (LaundryLinenSlaveDTO inventoryBatchStockDTO : ltBatchStockDTOs) {
				/*
				 * sql = "SELECT * FROM " +
				 * "inv_mrn_item_info_slave_new slave join inv_mrn_master_new master on slave.mrn_id = master.mrn_id"
				 * + " where  slave.item_name = '" + inventoryBatchStockDTO.getItemName() + "' "
				 * + " AND slave.deleted = 'N' " +
				 * " AND slave.sub_inventory_name='"+inventoryBatchStockDTO.getDeptName()+"' " +
				 * " AND master.mrn_status = 'FullyReceived' order by slave.item_info_id";
				 */
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_item_details_inventory(:p_unit_id,:p_item_name,:p_sub_inventory_name,:p_mrn_status,:p_batch_id)");
				query.setParameter("p_unit_id",'1');	
				query.setParameter("p_item_name", inventoryBatchStockDTO.getItemName());
				query.setParameter("p_sub_inventory_name",inventoryBatchStockDTO.getDeptName());		
				query.setParameter("p_batch_id", inventoryBatchStockDTO.getBatchId());
				query.setParameter("p_mrn_status","FullyReceived");
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				ltInventoryBatchDTOs = query.list();
		
				Integer remainingQTY = 0;
				for (int i = 0; i < ltInventoryBatchDTOs.size(); i++) {
					Map map = new HashMap();
					map = ltInventoryBatchDTOs.get(i);
					int newTableQty = 0;
					Integer tablQTY = (Integer) map
							.get("current_subinventory_stock");
					
					
					if (i == 0) {
						remainingQTY = inventoryBatchStockDTO
								.getRecievedQty()+inventoryBatchStockDTO.getDiscardQty();
					}
					if (tablQTY >= remainingQTY)									
							 {
						newTableQty = tablQTY- remainingQTY;   
						sql = "UPDATE "
								+ " inv_goods_issue_mrn_item_slave_new SET current_subinventory_stock="
								+ newTableQty + ""
								+ " where id= "
								+ map.get("id") + " ";

						System.err.println(sql);
						
						SQLQuery query21 = sessionFactory.getCurrentSession().createSQLQuery(sql);
						query21.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
			            query21.executeUpdate();
						break;
					}
					else{
						remainingQTY = remainingQTY - tablQTY;
						sql = "update "
								+ ".inv_goods_issue_mrn_item_slave_new SET current_subinventory_stock=0 "
								+ " where id= "
								+ map.get("id") + " ";
					}

				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;

	}

	@Override
	public int deletebyId(int id, HttpServletRequest request) {
		int record=0;
		try {	
			LaundryLinenMasterDTO obj = (LaundryLinenMasterDTO) sessionFactory
						.getCurrentSession().get(LaundryLinenMasterDTO.class, id);
			obj.setDeleted("Y");
			obj.setDeletedBy(1);
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			record=1;
		} catch (Exception e) {
			record=0;
			e.printStackTrace();
		}
		return record;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<LaundryLinenMasterDTO> getlistForApprovedItems(String subDept) {
		List<LaundryLinenMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinenMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus",2));
			criteria.add(Restrictions.eq("deptName",subDept));
			criteria.addOrder(Order.desc("mrnId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<LaundryLinenMasterDTO> getlistForRequestedDashboard() {
		List<LaundryLinenMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinenMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus", 1));  
			criteria.addOrder(Order.desc("mrnId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<LaundryLinenMasterDTO> getlistForProcessDashboard() {
		List<LaundryLinenMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinenMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus", 2));  
			criteria.addOrder(Order.desc("mrnId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<LaundryLinenMasterDTO> getlistForDispachedDashboard() {
		List<LaundryLinenMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinenMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus", 3));  
			criteria.addOrder(Order.desc("mrnId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<LaundryLinenMasterDTO> getlistForCompletedDashboard() {
		List<LaundryLinenMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinenMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus", 4));  
			criteria.addOrder(Order.desc("mrnId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<LaundryLinenMasterDTO> getLnlReport(String startDate, String endDate) {
		List<LaundryLinenMasterDTO> ltmaster = new ArrayList<LaundryLinenMasterDTO>();;
		try {
	
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			java.util.Date date = sdf.parse(startDate);
			java.util.Date date2 = sdf.parse(endDate);
			java.sql.Date sqlsDate = (java.sql.Date) new Date(date.getTime());
			java.sql.Date sqleDate = (java.sql.Date) new Date(date2.getTime());
			
			
			
			
			Session session = sessionFactory.getCurrentSession();
			String hql = ("from LaundryLinenMasterDTO WHERE DATE_FORMAT(createdDate, '%Y-%m-%d') BETWEEN :stDate AND :edDate order by mrnId desc");
			Query query = session.createQuery(hql);
			query.setDate("stDate", sqlsDate);
			query.setDate("edDate", sqleDate);
		
			 
			ltmaster=query.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	
	}

	@Override
	public Integer getBatchDetails(String itemName, String deptName, int itemCode) {
		Integer BatchId =0;
		try {	
			Query query= sessionFactory.getCurrentSession().createQuery("SELECT batchMasterId FROM GoodsIssueMrnItemSlaveDto WHERE itemName='"+itemName+"' AND subinventoryName='"+deptName+"'");
			BatchId= (Integer) query.uniqueResult();
			System.out.println("BatchId---: " + BatchId);
		} catch (Exception e) {

			e.printStackTrace();
		}
		return BatchId;
	}

	@Override
	public int saveReturnRequest(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request) {
		int records = 0;
		int masterid = 0;
		try {

			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			Integer unitId = (Integer) sessionss.getAttribute("uId");

			masterid = laundryLinenMasterDTO.getMrnId();

			laundryLinenMasterDTO.setUnitId(unitId);
			laundryLinenMasterDTO.setDeleted("N");
			
			if(laundryLinenMasterDTO.getMrnId()==0)
			{
			laundryLinenMasterDTO.setCreatedBy(userId);
			laundryLinenMasterDTO.setCreatedDate(new Date(new java.util.Date()
					.getTime()));
			}else{
				laundryLinenMasterDTO.setUpdatedBy(userId);
				laundryLinenMasterDTO.setUpdatedDate(new Date(new java.util.Date()
						.getTime()));
				
			}
			sessionFactory.getCurrentSession().merge(laundryLinenMasterDTO);
			if (masterid > 0) {
				records = 2;
			} else {
				records = 1;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return records = 0;
		}
		return records;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<LaundryLinenMasterDTO> getlistbyDepName(String deptName) {
		List<LaundryLinenMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinenMasterDTO.class);
			criteria.add(Restrictions.eq("deptName", deptName));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.in("mrnStatus", new Integer[]{2,3,4,5}));		
			criteria.addOrder(Order.desc("mrnId"));
		
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}

	@Override
	public int acceptItems(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request) {
		int records = 0;
		int masterid = 0;
		try {

			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			Integer unitId = (Integer) sessionss.getAttribute("uId");

			masterid = laundryLinenMasterDTO.getMrnId();

			laundryLinenMasterDTO.setUnitId(unitId);
			laundryLinenMasterDTO.setDeleted("N");

			laundryLinenMasterDTO.setCreatedBy(userId);
			laundryLinenMasterDTO.setCreatedDate(new Date(new java.util.Date()
					.getTime()));
			sessionFactory.getCurrentSession().merge(laundryLinenMasterDTO);
			if (masterid > 0) {
				records = 2;
			} else {
				records = 1;
			}
			boolean r=returnItemsToSubDept(laundryLinenMasterDTO);

		} catch (Exception e) {
			e.printStackTrace();
			return records = 0;
		}
		return records;
	}
	
	private boolean returnItemsToSubDept(
			LaundryLinenMasterDTO laundryLinenMasterDTO) {
		String sql="";
		List<Map<String, Object>> ltLaundryBatchDTOs = null;
		List<Map<String, Object>> ltInventoryBatchDTOs = null;
		try {

			List<LaundryLinenSlaveDTO> ltBatchStockDTOs = laundryLinenMasterDTO
					.getLtlandlSlave();
			
			for (LaundryLinenSlaveDTO inventoryBatchStockDTO : ltBatchStockDTOs) {
		
				sql = "select id FROM inv_goods_issue_mrn_item_slave_new where sub_inventory_name='"+inventoryBatchStockDTO.getDeptName()+"' and item_name='"+inventoryBatchStockDTO.getItemName()+"' and deleted = 'N' and batch_master_id='"+inventoryBatchStockDTO.getBatchId()+"' and mrn_status='FullyReceived' ";
								
				Query bet = sessionFactory.getCurrentSession().createSQLQuery(sql);
				Integer mrnItemInfoSlaveId = (Integer) bet.uniqueResult();
				
				sql = "SELECT current_subinventory_stock FROM "
						+ " inv_goods_issue_mrn_item_slave_new where id="
						+ mrnItemInfoSlaveId
						+ " and deleted='N'";
				
				Query bet2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				Integer issQty = (Integer) bet2.uniqueResult();
				
				issQty = issQty + inventoryBatchStockDTO.getRecievedQty();
				
				
				
				sql = "UPDATE " 
						+ "inv_goods_issue_mrn_item_slave_new set current_subinventory_stock="
						+ issQty + " where id="
						+ mrnItemInfoSlaveId + "";
				
						System.err.println(sql);
						
						SQLQuery query21 = sessionFactory.getCurrentSession().createSQLQuery(sql);
						query21.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
			            query21.executeUpdate();
					

				}

			}catch (Exception e) {
				e.printStackTrace();
				return false;
			}

			return true;

		}
}

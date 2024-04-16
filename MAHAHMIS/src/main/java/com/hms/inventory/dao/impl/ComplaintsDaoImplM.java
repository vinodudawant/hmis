package com.hms.inventory.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

//import com.hms.inventory.service.AutoEmailSendService;
import com.hms.inventory.dao.ComplaintsDaoM;
import com.hms.inventory.dto.AssetComplaintMasterDto;
import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.dto.ItemMasterDto;

@Repository
public class ComplaintsDaoImplM implements ComplaintsDaoM{

	@Autowired
	SessionFactory sessionFactory;
	
	//@Autowired
	//AutoEmailSendService autoEmailSendService;
	
	@Override
	public List<ItemMasterDto> getAllAssetCategory(HttpServletRequest request) {
		String sql = "";
		 List<ItemMasterDto> lstAssetCategory = new ArrayList<ItemMasterDto>();
		 try{
				//sql = "select distinct(category_type),category_id from inv_item_master_new where asset_item_status='1' ";
			 	  sql = "select distinct(categoary_name),categoary_id from ehat_categoary_doc";
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					ItemMasterDto obj = new ItemMasterDto();
					obj.setCategoryType((String) row.get("categoary_name"));
					obj.setCategoryId((Integer) row.get("categoary_id"));
					lstAssetCategory.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
		return lstAssetCategory;
	}

	@Override
	public List<ItemMasterDto> getCategoryWiseAssetName(Integer categoryId) {
		 String sql = "";
		 List<ItemMasterDto> lstAssetNames=new ArrayList<ItemMasterDto>();
		 try{
		sql="select item_name,id from inv_item_master_new where category_id="+categoryId;
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		for (Map<String, Object> row : masterRow) {
			ItemMasterDto obj = new ItemMasterDto();
			obj.setItemName((String) row.get("item_name"));
			obj.setId((Integer) row.get("id"));
			lstAssetNames.add(obj);
			obj=null;
		}		
		 
		 }catch(Exception e){
			 e.printStackTrace();
		 }
		return lstAssetNames;
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> getAssetWiseSerialNumber(
			Integer assetId) {
		String sql = "";
		 List<ItemAssetMaintenanceMasterDto> lstSerialNumbers = new ArrayList<ItemAssetMaintenanceMasterDto>();
		 try{
		sql="select distinct(serial_no) from inv_item_asset_maintenance_master where asset_item_id="+assetId+" AND deleted='N'";
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		for (Map<String, Object> row : masterRow) {
			ItemAssetMaintenanceMasterDto obj = new ItemAssetMaintenanceMasterDto();
			obj.setSerialNo((String) row.get("serial_no"));
			lstSerialNumbers.add(obj);
			obj=null;
		}		
		 }catch(Exception e){
			 e.printStackTrace();
		 }
		return lstSerialNumbers;
	}

	@Override
	public Integer saveAssetComplaint(
			AssetComplaintMasterDto assetComplaintMasterDto,
			HttpServletRequest request) {
		try {
			if(assetComplaintMasterDto.getId() == 0){
				AssetComplaintMasterDto obj = (AssetComplaintMasterDto) sessionFactory.getCurrentSession().merge(assetComplaintMasterDto);
				//String mailStatus = autoEmailSendService.sendComplaintAndTicketRaisedEmail(obj);
				//System.out.println("this is object"+obj+" "+mailStatus);
				return 1;
			}
			else{
				AssetComplaintMasterDto obj = (AssetComplaintMasterDto) sessionFactory.getCurrentSession().merge(assetComplaintMasterDto);
				//String mailStatus = autoEmailSendService.sendComplaintAndTicketRaisedEmail(obj);
				//System.out.println("this is object"+obj+" "+mailStatus);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<AssetComplaintMasterDto> getAllAssetComplaintsData(
			HttpServletRequest request) {
		List<AssetComplaintMasterDto> lstGetAllAssetComplaintsData =new ArrayList<AssetComplaintMasterDto>();
		try{
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(AssetComplaintMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			or.add(Restrictions.eq("ticketStatus", "OPEN"));
			or.add(Restrictions.eq("ticketStatus", "INPROCESS"));
			or.add(Restrictions.eq("ticketStatus", "PENDING"));
			criteria.add(or);
			criteria.addOrder(Order.desc("id"));
			criteria.setMaxResults(10);
			lstGetAllAssetComplaintsData=criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstGetAllAssetComplaintsData;
	}

	@Override
	public AssetComplaintMasterDto editAssetComplaintsData(Integer id) {
		AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
		try {
			assetComplaintMasterDto = (AssetComplaintMasterDto) sessionFactory.getCurrentSession().get(AssetComplaintMasterDto.class,id);
			return assetComplaintMasterDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return assetComplaintMasterDto;
	}

	@Override
	public List<AssetComplaintMasterDto> getClosedComplaintsRecords(
			HttpServletRequest request) {
		List<AssetComplaintMasterDto> lstGetAllAssetComplaintsData =new ArrayList<AssetComplaintMasterDto>();
		try{
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(AssetComplaintMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			or.add(Restrictions.eq("ticketStatus", "CLOSED"));
			criteria.add(or);
			criteria.addOrder(Order.desc("id"));
			criteria.setMaxResults(10);
			lstGetAllAssetComplaintsData=criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstGetAllAssetComplaintsData;
	}

	@Override
	public ItemAssetMaintenanceMasterDto getProductWarrantyComplaint(String productCategoryName,
			Integer assetNameId, String serialNo) {
		ItemAssetMaintenanceMasterDto obj = new ItemAssetMaintenanceMasterDto();
		String sql = "";
		try {
			sql = "select am.warranty_status as warranty_status from inv_item_asset_maintenance_master as am where am.product_category='"+productCategoryName+"' and am.asset_item_id="+assetNameId+" and am.serial_no='"+serialNo+"' ";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				obj.setWarrantyStatus((String) row.get("warranty_status"));
			}				
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public Integer getPageCountAllAssetClosedComplaints(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		Integer countNew = 0;
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql = "";
			sql = "SELECT count(*) FROM inv_asset_complaint_master_new as ac WHERE ac.ticket_status='CLOSED' and ac.deleted != 'Y' and ac.unit_id="
					+ unitId;
			Query countQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			countNew = ((Number) countQuery.uniqueResult()).intValue();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return countNew;
	}

	@Override
	public AssetComplaintMasterDto getAssetClosedComplaintPagination(
			Integer startIndex, HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<AssetComplaintMasterDto> assetComplaintMasterDtoList = new ArrayList<AssetComplaintMasterDto>();
		AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(AssetComplaintMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			or.add(Restrictions.eq("ticketStatus", "CLOSED"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(or);
			criteria.addOrder(Order.desc("id"));
			
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			assetComplaintMasterDtoList = criteria.list();
			assetComplaintMasterDto.setLstAssetComplaintMasterDto(assetComplaintMasterDtoList);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return assetComplaintMasterDto;
	}

	@Override
	public Integer getPageCountAllAssetComplaints(HttpServletRequest request) {
		// TODO Auto-generated method stub
		Integer countNew = 0;
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql = "";
			sql = "SELECT count(*) FROM inv_asset_complaint_master_new as ac WHERE ac.ticket_status='OPEN' or ac.ticket_status='INPROCESS' or ac.ticket_status='PENDING' and ac.deleted != 'Y' and ac.unit_id="
					+ unitId;
			Query countQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			countNew = ((Number) countQuery.uniqueResult()).intValue();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return countNew;
	}

	@Override
	public AssetComplaintMasterDto getAssetComplaintPagination(
			Integer startIndex, HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<AssetComplaintMasterDto> assetComplaintMasterDtoList = new ArrayList<AssetComplaintMasterDto>();
		AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(AssetComplaintMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			or.add(Restrictions.eq("ticketStatus", "OPEN"));
			or.add(Restrictions.eq("ticketStatus", "INPROCESS"));
			or.add(Restrictions.eq("ticketStatus", "PENDING"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(or);
			criteria.addOrder(Order.desc("id"));
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			assetComplaintMasterDtoList = criteria.list();
			assetComplaintMasterDto.setLstAssetComplaintMasterDto(assetComplaintMasterDtoList);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return assetComplaintMasterDto;
	}

	@Override
	public List<ItemMasterDto> getAllItemInvAndSubInv(HttpServletRequest request) {
		

		 String sql = "";
		 HttpSession session = request.getSession();
		 Integer unitId = (Integer) session.getAttribute("uId");
		 List<ItemMasterDto> lstAssetNames=new ArrayList<ItemMasterDto>();
		 try{
			 /*sql = " SELECT distinct a.item_master_id as id,a.item_name" +
						" FROM inv_batch_stock_new a " +
						" LEFT JOIN inv_subinventory_master_new i on a.sub_inv_id=i.id " +
						" WHERE a.deleted = 'N' AND a.unit_id ="+unitId;*/
			 sql = " SELECT distinct i.id as id,i.item_name,i.asset_item_status,i.batch_wise " +
						" FROM inv_batch_stock_new b " +
						" LEFT JOIN inv_item_master_new i on b.item_master_id=i.id " +
						" WHERE b.deleted = 'N' AND i.deleted = 'N' AND b.unit_id ="+unitId+" order by i.item_name";
			 
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			System.out.println("this is all inv and sub inv "+sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				ItemMasterDto obj = new ItemMasterDto();
				obj.setItemName((String) row.get("item_name"));
				obj.setId((Integer) row.get("id"));
				obj.setBatchWise((String) row.get("batch_wise"));
				obj.setAssetItemStatus((Integer) row.get("asset_item_status"));
				lstAssetNames.add(obj);
				obj=null;
			}		
		 
		 }catch(Exception e){
			 e.printStackTrace();
		 }
		return lstAssetNames;
	}

	@Override
	public List<BatchStockDto> getAllBatchesInvAndSubInv(Integer itemId,
			HttpServletRequest request) {
		 String sql = "";
		 HttpSession session = request.getSession();
		 Integer unitId = (Integer) session.getAttribute("uId");
		 List<BatchStockDto> lstAssetNames=new ArrayList<BatchStockDto>();
		 try{
			 sql = " SELECT distinct a.item_batch_code,a.batch_master_id " +
						" FROM inv_batch_stock_new a " +
						" LEFT JOIN inv_item_master_new i on a.item_master_id=i.id " +
						" WHERE a.deleted = 'N' AND a.unit_id ="+unitId+" AND a.item_master_id = "+itemId;
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			System.out.println("this is all getAllBatchesInvAndSubInv "+sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				BatchStockDto obj = new BatchStockDto();
				obj.setItemBatchCode((String) row.get("item_batch_code"));
				obj.setBatchMasterId((Integer) row.get("batch_master_id"));
				lstAssetNames.add(obj);
				obj=null;
			}		
		 
		 }catch(Exception e){
			 e.printStackTrace();
		 }
		return lstAssetNames;
	}

	@Override
	public List<ItemMasterDto> getItemWiseCategory(Integer itemId) {
		 String sql = "";
		 List<ItemMasterDto> lstAssetNames=new ArrayList<ItemMasterDto>();
		 try{
			sql="select category_type,category_id from inv_item_master_new where id="+itemId;
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				ItemMasterDto obj = new ItemMasterDto();
				obj.setCategoryType((String) row.get("category_type"));
				obj.setCategoryId((Integer) row.get("category_id"));
				lstAssetNames.add(obj);
				obj=null;
			}		
	 }catch(Exception e){
		 e.printStackTrace();
	 }
	return lstAssetNames;
	}

	@Override
	public List<BatchMasterDto> getAllBatchNo(HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<BatchMasterDto> batchMasterDtoList = new ArrayList<BatchMasterDto>();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BatchMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.addOrder(Order.desc("id"));
			batchMasterDtoList = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return batchMasterDtoList;
	}

	@Override
	public List<ItemMasterDto> checkAssetItemOrNot(Integer itemId) {
		 String sql = "";
		 List<ItemMasterDto> lstAssetNames=new ArrayList<ItemMasterDto>();
		 try{
		sql="select asset_item_status from inv_item_master_new where id="+itemId;
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		for (Map<String, Object> row : masterRow) {
			ItemMasterDto obj = new ItemMasterDto();
			obj.setAssetItemStatus((Integer) row.get("asset_item_status"));
			lstAssetNames.add(obj);
			obj=null;
		}		
		 
		 }catch(Exception e){
			 e.printStackTrace();
		 }
		return lstAssetNames;
	}
	
	@Override
	public List<AssetComplaintMasterDto> getAllProcessedComplaintsDataReport(
			HttpServletRequest request) {
		List<AssetComplaintMasterDto> lstGetAllAssetComplaintsData =new ArrayList<AssetComplaintMasterDto>();
		try{
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(AssetComplaintMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			or.add(Restrictions.eq("ticketStatus", "OPEN"));
			or.add(Restrictions.eq("ticketStatus", "INPROCESS"));
			or.add(Restrictions.eq("ticketStatus", "PENDING"));
			criteria.add(or);
			criteria.addOrder(Order.desc("id"));
			lstGetAllAssetComplaintsData=criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstGetAllAssetComplaintsData;
	}
	

	@Override
	public List<AssetComplaintMasterDto> getClosedComplaintsReports(
			HttpServletRequest request) {
		List<AssetComplaintMasterDto> lstGetAllAssetComplaintsData =new ArrayList<AssetComplaintMasterDto>();
		try{
			Disjunction or = Restrictions.disjunction();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(AssetComplaintMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			or.add(Restrictions.eq("ticketStatus", "CLOSED"));
			criteria.add(or);
			criteria.addOrder(Order.desc("id"));
			lstGetAllAssetComplaintsData=criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstGetAllAssetComplaintsData;
	}

}

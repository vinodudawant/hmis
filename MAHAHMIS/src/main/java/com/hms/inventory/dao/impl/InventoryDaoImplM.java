package com.hms.inventory.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.district_taluka_city;
import com.hms.inventory.dao.InventoryDaoM;
import com.hms.inventory.dto.AbcAnalysisMasterDto;
import com.hms.inventory.dto.CategoryDTOM;
import com.hms.inventory.dto.ChargeMasterDTO;
import com.hms.inventory.dto.CompanyMasterDTO;
import com.hms.inventory.dto.DocumentMasterDto;
import com.hms.inventory.dto.FinancialYearDto;
import com.hms.inventory.dto.FormDTOM;
import com.hms.inventory.dto.HospitalDetailsDto;
import com.hms.inventory.dto.InventoryDocumentNumberMDTO;
import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.MaintenanceContractMasterDto;
import com.hms.inventory.dto.ManufacturerMDTO;
import com.hms.inventory.dto.PackingMasterDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.SactionFormDTO;
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.inventory.dto.TermsAndCondtionDTO;
import com.hms.inventory.dto.UnitMasterDTONew;
import com.hms.inventory.dto.WarehouseMasterDto;

@Repository
public class InventoryDaoImplM  implements InventoryDaoM{

	static Logger log=Logger.getLogger(InventoryDaoImplM.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;

	/**
	 * @author Rohit Sandbhor
	 * @date 23-10-2019
	 * @codeFor below dao impl method created for to save and update the records into FinancialYearDAO POJO
	 */
	@Override
	public int saveorUpdateFinancialMaster(FinancialYearDto financialYearDAO) {
		String saveSqlQuery = "";
		try {
			if(financialYearDAO.getId()==0){
				//query check and avoid save duplicate financial year in table
				saveSqlQuery="SELECT count(*) from inv_financial_year_new fy where fy.deleted='N' and fy.year='"+financialYearDAO.getYear()+"' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
				FinancialYearDto dto = (FinancialYearDto) sessionFactory.getCurrentSession().merge(financialYearDAO);
				log.debug("this is for saveorUpdateFinancialMaster "+dto);
				return 1;
				}
			}else{
				//query check and avoid save duplicate financial year in table
				saveSqlQuery="SELECT count(*) from inv_financial_year_new fy where fy.deleted='N' and fy.year='"+financialYearDAO.getYear()+"'and fy.id not in("+financialYearDAO.getId()+") ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
					FinancialYearDto dto = (FinancialYearDto)sessionFactory.getCurrentSession().merge(financialYearDAO);
				log.debug("this is for saveorUpdateFinancialMaster "+dto);
				return 2;
				}
			}
		} catch (Exception e) {
			log.error("this is for saveorUpdateFinancialMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}
	}

	/**
	 * @author Rohit Sandbhor
	 * @date 23-10-2019
	 * @codeFor below dao impl method created for to get all the records from FinancialYearDAO POJO
	 */
	@Override
	public List<FinancialYearDto> getAllFinancialMaster(Integer unitId) {
		List<FinancialYearDto> lstFinancialMaster=new ArrayList<FinancialYearDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(FinancialYearDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstFinancialMaster=	criteria.list();
			log.debug("this is for getAllFinancialMaster "+lstFinancialMaster);
		}catch(Exception e){
			log.error("this is for getAllFinancialMaster "+e.getMessage());
			e.printStackTrace();
		}
		return lstFinancialMaster;
	}

	/**
	 * @since 24-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to perform edit operation on financial master data
	 */
	@Override
	public FinancialYearDto editFinancialMaster(Integer id) {
		
		FinancialYearDto financialYearDto = new FinancialYearDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(FinancialYearDto.class);
			criteria.add(Restrictions.eq("id",id));
			financialYearDto = (FinancialYearDto) criteria.uniqueResult();
			log.debug("this is for editFinancialMaster "+financialYearDto);
			return financialYearDto;
		} catch (Exception e) {
			log.error("this is for editFinancialMaster "+e.getMessage());
			  e.printStackTrace();
		}
		return financialYearDto;
	}
	
	/**
	 * @since 24-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform delete or set flag on financial master table
	 */
	
	@Override
	public boolean deleteFinancialMaster(FinancialYearDto financialYearDAO) {
		try{
			FinancialYearDto dto = (FinancialYearDto) sessionFactory.getCurrentSession().merge(financialYearDAO);
			log.debug("this is for deleteFinancialMaster "+dto);
			return true;
		}catch(Exception e){
			log.error("this is for deleteFinancialMaster "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * @since 24-10-2019
	 * @codeFor below method created to perform search functionality on financial master
	 * @author Rohit Sandbhor
	 */
	@Override
	public List<FinancialYearDto> searchByYear(String year,HttpServletRequest request) {
		List<FinancialYearDto> lstFinancialMaster=new ArrayList<FinancialYearDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(FinancialYearDto.class);
			criteria.add(Restrictions.like("year", year,MatchMode.ANYWHERE));
			lstFinancialMaster=	criteria.list();
			log.debug("this is for searchByYear "+lstFinancialMaster);
		}catch(Exception e){
			log.error("this is for searchByYear "+e.getMessage());
			e.printStackTrace();
		}
		return lstFinancialMaster;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @date 25-10-2019
	 * @codeFor below dao impl method created for to save and update the records into FinancialYearDAO POJO
	 */
	@Override
	public int saveorUpdateWarehouseMaster(WarehouseMasterDto warehouseMasterDto) {
		try {
			if(warehouseMasterDto.getId()==0){
				String saveSqlQuery="";
				//query check and avoid save duplicate warehouse name in table
				saveSqlQuery="SELECT count(*) from inv_warehouse_master_new wh where wh.deleted='N' and wh.warehouse_name='"+warehouseMasterDto.getWarehouseName()+"' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int count = ((Number)countQuery.uniqueResult()).intValue();
				if(count > 0){
					return 3;
				}
				else{
				WarehouseMasterDto dto = (WarehouseMasterDto) sessionFactory.getCurrentSession().merge(warehouseMasterDto);
				log.debug("this is for saveorUpdateWarehouseMaster "+dto);
				return 1;
				}
			}else{
				String editSqlQuery="";
				//query check and avoid save duplicate warehouse name in table
				editSqlQuery="SELECT count(*) from inv_warehouse_master_new wh where wh.deleted='N' and wh.warehouse_name='"+warehouseMasterDto.getWarehouseName()+"'and  wh.id not in("+warehouseMasterDto.getId()+")";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(editSqlQuery);	
				int count = ((Number)countQuery.uniqueResult()).intValue();
				if(count > 0){
					return 3;
				}else{
					WarehouseMasterDto dto = (WarehouseMasterDto) sessionFactory.getCurrentSession().merge(warehouseMasterDto);
					log.debug("this is for saveorUpdateWarehouseMaster "+dto);
					return 2;				
				}
				
			}
		} catch (Exception e) {
			log.error("this is for saveorUpdateWarehouseMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}
	}

	/**
	 * @author Rohit Sandbhor
	 * @date 23-10-2019
	 * @codeFor below dao impl method created for to get all the records from WarehouseMasterDto POJO
	 */
	@Override
	public List<WarehouseMasterDto> getAllWarehouseMaster(Integer unitId) {
		List<WarehouseMasterDto> lstWarehouseMaster=new ArrayList<WarehouseMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(WarehouseMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstWarehouseMaster=	criteria.list();
			 log.debug("this is for getAllWarehouseMaster "+lstWarehouseMaster);
		}catch(Exception e){
			log.error("this is for getAllWarehouseMaster "+e.getMessage());
			e.printStackTrace();
		}
		return lstWarehouseMaster;
	}
	
	/**
	 * @since 25-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to perform edit operation on warehouse master data
	 */
	@Override
	public WarehouseMasterDto editWarehouseMaster(Integer id) {
		WarehouseMasterDto warehouseMasterDto = new WarehouseMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(WarehouseMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			warehouseMasterDto = (WarehouseMasterDto) criteria.uniqueResult();
			 log.debug("this is for editWarehouseMaster "+warehouseMasterDto);
			return warehouseMasterDto;
		} catch (Exception e) {
			log.error("this is for editWarehouseMaster "+e.getMessage());
			  e.printStackTrace();
		}
		return warehouseMasterDto;
	}

	/**
	 * @since 25-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform delete or set flag on warehouse master table
	 */
	@Override
	public boolean deleteWarehouseMaster(WarehouseMasterDto warehouseMasterDto) {
		try{
			WarehouseMasterDto dto = (WarehouseMasterDto) sessionFactory.getCurrentSession().merge(warehouseMasterDto);
			 log.debug("this is for deleteWarehouseMaster "+dto);
			return true;
		}catch(Exception e){
			log.error("this is for deleteWarehouseMaster "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * @since 25-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform search operation on warehouse master table
	 */
	@Override
	public List<WarehouseMasterDto> searchByWarehouseId(Integer id,
			HttpServletRequest request) {
		List<WarehouseMasterDto> lstWarehouseMaster=new ArrayList<WarehouseMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(WarehouseMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			lstWarehouseMaster=	criteria.list();
			 log.debug("this is for searchByWarehouseId "+lstWarehouseMaster);
		}catch(Exception e){
			log.error("this is for searchByWarehouseId "+e.getMessage());
			e.printStackTrace();
		}
		return lstWarehouseMaster;
	}
	
	/**
	 * @since 25-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform auto suggestions on warehouse master table
	 */
	@Override
	public WarehouseMasterDto autoSuggestionsOnWarehouseName(String warehouseName) {
		WarehouseMasterDto warehouseMasterDto = new WarehouseMasterDto();
		List<WarehouseMasterDto> warehouseList = new ArrayList<WarehouseMasterDto> ();
		try {
			String sql = "SELECT w.id AS id,w.warehouse_name " +
					     "AS warehouse_name,w.warehouse_location AS warehouse_location FROM inv_warehouse_master_new w where w.warehouse_name like '%"+warehouseName+"%' " +
					     "and w.deleted='N'";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
		    	WarehouseMasterDto obj = new WarehouseMasterDto();
		    	obj.setWarehouseName((String)row.get("warehouse_name"));
		    	obj.setId((Integer)row.get("id"));
		    	obj.setWarehouseLocation((String)row.get("warehouse_location"));
		    	warehouseList.add(obj);		    	
	    	}
		    warehouseMasterDto.setLstWarehouseMaster(warehouseList);
		    log.debug("this is for autoSuggestionsOnWarehouseName "+warehouseMasterDto);
			
		} catch (Exception e) {
			log.error("this is for autoSuggestionsOnWarehouseName "+e.getMessage());
			e.printStackTrace();
			return null;
		}
		return warehouseMasterDto;
	}

	/**
	 * @author Rohit Sandbhor
	 * @date 30-10-2019
	 * @codeFor below dao impl method created for to save and update the records into PackingMasterDto POJO
	 */
	@Override
	public int saveorUpdatePackingMaster(PackingMasterDto packingMasterDto) {
		String saveSqlQuery = "";
		try {
			if(packingMasterDto.getId()==0){
				//query check and avoid save duplicate packing name in table
				saveSqlQuery="SELECT count(*) from inv_packing_master_new pm where pm.deleted='N' and pm.packing_name='"+packingMasterDto.getPackingName()+"' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
				PackingMasterDto dto = (PackingMasterDto) sessionFactory.getCurrentSession().merge(packingMasterDto);
				log.debug("this is for saveorUpdatePackingMaster "+dto);
				return 1;
				}
			}else{
				//query check and avoid save duplicate packing name in table
				saveSqlQuery="SELECT count(*) from inv_packing_master_new pm where pm.deleted='N' and pm.packing_name='"+packingMasterDto.getPackingName()+"'and pm.id not in("+packingMasterDto.getId()+")";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
				PackingMasterDto dto = (PackingMasterDto)sessionFactory.getCurrentSession().merge(packingMasterDto);
				log.debug("this is for saveorUpdatePackingMaster "+dto);
				return 2;
				}
			}
		} catch (Exception e) {
			log.error("this is for saveorUpdatePackingMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}
	}

	/**
	 * @author Rohit Sandbhor
	 * @date 30-10-2019
	 * @codeFor below dao impl method created for to get all the records from PackingMasterDto POJO
	 */
	@Override
	public List<PackingMasterDto> getAllPackingMaster(Integer unitId) {
		List<PackingMasterDto> lstPackingMaster=new ArrayList<PackingMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PackingMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstPackingMaster=	criteria.list();
			log.debug("this is for getAllPackingMaster "+lstPackingMaster);
		}catch(Exception e){
			log.error("this is for getAllPackingMaster "+e.getMessage());
			e.printStackTrace();
		}
		return lstPackingMaster;
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to perform edit operation on packing master data
	 */
	@Override
	public PackingMasterDto editPackingMaster(Integer id) {
		PackingMasterDto packingMasterDto = new PackingMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PackingMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			packingMasterDto = (PackingMasterDto) criteria.uniqueResult();
			log.debug("this is for editPackingMaster "+packingMasterDto);
			return packingMasterDto;
		} catch (Exception e) {
			log.error("this is for editPackingMaster "+e.getMessage());
			  e.printStackTrace();
		}
		return packingMasterDto;
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform delete or set flag on packing master table
	 */
	@Override
	public boolean deletePackingMaster(PackingMasterDto packingMasterDto) {
		try{
			PackingMasterDto dto = (PackingMasterDto) sessionFactory.getCurrentSession().merge(packingMasterDto);
			log.debug("this is for deletePackingMaster "+dto);
			return true;
		}catch(Exception e){
			log.error("this is for deletePackingMaster "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform search operation on packing master table
	 */
	@Override
	public List<PackingMasterDto> searchByPackingId(Integer id,
			HttpServletRequest request) {
		List<PackingMasterDto> lstPackingMaster=new ArrayList<PackingMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PackingMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			lstPackingMaster=criteria.list();
			 log.debug("this is for searchByPackingId "+lstPackingMaster);
		}catch(Exception e){
			log.error("this is for searchByPackingId "+e.getMessage());
			e.printStackTrace();
		}
		return lstPackingMaster;
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform auto suggestions on packing master table
	 */
	@Override
	public PackingMasterDto autoSuggestionsOnPackingName(String packingName) {
		PackingMasterDto packingMasterDto = new PackingMasterDto();
		List<PackingMasterDto> packingList = new ArrayList<PackingMasterDto> ();
		try {
			String sql = "SELECT p.id AS id,p.packing_name " +
					     "AS packing_name FROM inv_packing_master_new p where p.packing_name like '%"+packingName+"%' " +
					     "and p.deleted='N' limit 20";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
		    	PackingMasterDto obj = new PackingMasterDto();
		    	obj.setPackingName((String)row.get("packing_name"));
		    	obj.setId((Integer)row.get("id"));
		    	packingList.add(obj);		    	
	    	}
		    packingMasterDto.setLstPackingMaster(packingList);
		    log.debug("this is for autoSuggestionsOnPackingName "+packingMasterDto);
			
		} catch (Exception e) {
			log.error("this is for autoSuggestionsOnPackingName "+e.getMessage());
			e.printStackTrace();
			return null;
		}
		return packingMasterDto;
	}

	/**
	 * @author Rohit Sandbhor
	 * @date 30-10-2019
	 * @codeFor below dao impl method created for to save and update the records into SubInventoryMasterDto POJO
	 */
	@Override
	public int saveorUpdateSubInventoryMaster(
			SubInventoryMasterDto subInventoryMasterDto) {
		try {
			if(subInventoryMasterDto.getId()==0){
				String saveSqlQuery="";
				//query check and avoid save duplicate warehouse name in table
				saveSqlQuery="SELECT count(*) from inv_subinventory_master_new sb where sb.deleted='N' and sb.subinventory_name='"+subInventoryMasterDto.getSubInventoryName()+"' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int count = ((Number)countQuery.uniqueResult()).intValue();
				if(count > 0){
					return 3;
				}
				SubInventoryMasterDto dto = (SubInventoryMasterDto) sessionFactory.getCurrentSession().merge(subInventoryMasterDto);
				log.debug("this is for saveorUpdateSubInventoryMaster "+dto);
				return 1;
			}else{
				String editSqlQuery="";
				//query check and avoid save duplicate warehouse name in table
				editSqlQuery="SELECT count(*) from inv_subinventory_master_new sb where sb.deleted='N' and sb.subinventory_name='"+subInventoryMasterDto.getSubInventoryName()+"'and  sb.id not in("+subInventoryMasterDto.getId()+")";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(editSqlQuery);	
				int count = ((Number)countQuery.uniqueResult()).intValue();
				if(count > 0){
					return 3;
				}
				SubInventoryMasterDto dto = (SubInventoryMasterDto) sessionFactory.getCurrentSession().merge(subInventoryMasterDto);
				log.debug("this is for saveorUpdateSubInventoryMaster "+dto);
				return 2;				
			}
		} catch (Exception e) {
			log.error("this is for saveorUpdateSubInventoryMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}
	}
	/**
	 * @author Rohit Sandbhor
	 * @date 30-10-2019
	 * @codeFor below dao impl method created for to get all the records from SubInventoryMasterDto POJO
	 */
	@Override
	public List<SubInventoryMasterDto> getAllSubInventoryMaster() {
		List<SubInventoryMasterDto> lstSubInventoryMaster=new ArrayList<SubInventoryMasterDto>();
		String sql = "";
		try {
			sql = "SELECT * from inv_subinventory_master_new where deleted != 'Y'";
			if(sql != null) {
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		 		 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 		 query.setMaxResults(10);
		 		List<Map<String, Object>> list=query.list();
		 		for(Map<String, Object> row : list){
		 			SubInventoryMasterDto obj=new SubInventoryMasterDto();
		 			obj.setId((Integer)row.get("id"));
					obj.setCreatedDateTime((Date)row.get("created_date_time"));
					obj.setSubInventoryName((String)row.get("subinventory_name"));
					obj.setContactNumber((String)row.get("contact_number"));
					lstSubInventoryMaster.add(obj);
				}
		 		
			}
			log.debug("this is for getAllSubInventoryMaster "+lstSubInventoryMaster);
		} catch (Exception e) {
			log.error("this is for getAllSubInventoryMaster "+e.getMessage());
			e.printStackTrace();
		}
		return lstSubInventoryMaster;
		
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to perform edit operation on sub-inventory master data
	 */
	@Override
	public SubInventoryMasterDto editSubInventoryMaster(Integer id) {
		SubInventoryMasterDto subInventoryMasterDto = new SubInventoryMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SubInventoryMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			subInventoryMasterDto = (SubInventoryMasterDto) criteria.uniqueResult();
			 log.debug("this is for editSubInventoryMaster "+subInventoryMasterDto);
			return subInventoryMasterDto;
		} catch (Exception e) {
			log.error("this is for editSubInventoryMaster "+e.getMessage());
			  e.printStackTrace();
		}
		return subInventoryMasterDto;
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform delete or set flag on sub_inventory master table
	 */
	@Override
	public boolean deleteSubInventoryMaster(
			SubInventoryMasterDto subInventoryMasterDto) {
		try{
			SubInventoryMasterDto dto =  (SubInventoryMasterDto) sessionFactory.getCurrentSession().merge(subInventoryMasterDto);
			 log.debug("this is for deleteSubInventoryMaster "+dto);
			return true;
		}catch(Exception e){
			log.error("this is for deleteSubInventoryMaster "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform search operation on sub-inventory master table
	 */
	@Override
	public List<SubInventoryMasterDto> searchBySubInventoryId(Integer id,
			HttpServletRequest request) {
		List<SubInventoryMasterDto> listSubInventory=new ArrayList<SubInventoryMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(SubInventoryMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			listSubInventory=criteria.list();
			 log.debug("this is for searchBySubInventoryId "+listSubInventory);
		}catch(Exception e){
			log.error("this is for searchBySubInventoryId "+e.getMessage());
			e.printStackTrace();
		}
		return listSubInventory;
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform auto suggestions on sub-inventory master table
	 */
	@Override
	public SubInventoryMasterDto autoSuggestionsOnSubInventoryName(
			String subInventoryName) {
		SubInventoryMasterDto subInventoryMasterDto = new SubInventoryMasterDto();
		List<SubInventoryMasterDto> subInventoryList = new ArrayList<SubInventoryMasterDto> ();
		try {
			String sql = "SELECT si.id AS id,si.subinventory_name " +
					     "AS subinventory_name,si.contact_number AS contact_number FROM inv_subinventory_master_new si where si.subinventory_name like '%"+subInventoryName+"%' " +
					     "and si.deleted='N' limit 20";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
		    	SubInventoryMasterDto obj = new SubInventoryMasterDto();
		    	obj.setSubInventoryName((String)row.get("subinventory_name"));
		    	obj.setContactNumber((String)row.get("contact_number"));
		    	obj.setId((Integer)row.get("id"));
		    	subInventoryList.add(obj);		    	
	    	}
		    subInventoryMasterDto.setLstSubInventoryMaster(subInventoryList);
		    
		    log.debug("this is for autoSuggestionsOnSubInventoryName "+subInventoryMasterDto);
			
		} catch (Exception e) {
			log.error("this is for autoSuggestionsOnSubInventoryName "+e.getMessage());
			e.printStackTrace();
			return null;
		}
		return subInventoryMasterDto;
	}

	/**
	 * @author Rohit Sandbhor
	 * @date 31-10-2019
	 * @codeFor below dao impl method created for to save and update the records into AbcAnalysisMasterDto POJO
	 */
	@Override
	public int saveorUpdateAbcRangeAnalysisMaster(
			AbcAnalysisMasterDto abcAnalysysMasterDto) {
		try {
			if(abcAnalysysMasterDto.getId()==0){	
				AbcAnalysisMasterDto dto = (AbcAnalysisMasterDto) sessionFactory.getCurrentSession().merge(abcAnalysysMasterDto);
				log.debug("this is for saveorUpdateAbcRangeAnalysisMaster "+dto);
				return 1;
			}else{
				AbcAnalysisMasterDto dto = (AbcAnalysisMasterDto) sessionFactory.getCurrentSession().merge(abcAnalysysMasterDto);
				log.debug("this is for saveorUpdateAbcRangeAnalysisMaster "+dto);
				return 2;				
			}
		} catch (Exception e) {
			log.error("this is for saveorUpdateAbcRangeAnalysisMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}
	}

	/**
	 * @author Rohit Sandbhor
	 * @date 30-10-2019
	 * @codeFor below dao impl method created for to get all the records from AbcAnalysisMasterDto POJO
	 */
	@Override
	public List<AbcAnalysisMasterDto> getAllAbcRangeAnalysisMaster() {
		List<AbcAnalysisMasterDto> lstAbcAnalysisMaster=new ArrayList<AbcAnalysisMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(AbcAnalysisMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstAbcAnalysisMaster=	criteria.list();
			log.debug("this is for getAllAbcRangeAnalysisMaster "+lstAbcAnalysisMaster);
		}catch(Exception e){
			log.error("this is for getAllAbcRangeAnalysisMaster "+e.getMessage());
			e.printStackTrace();
		}
		return lstAbcAnalysisMaster;
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to perform edit operation on AbcAnalysisMasterDto master data
	 */
	@Override
	public AbcAnalysisMasterDto editAbcRangeAnalysisMaster(Integer id) {
		AbcAnalysisMasterDto abcAnalysisMasterDto = new AbcAnalysisMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AbcAnalysisMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			abcAnalysisMasterDto = (AbcAnalysisMasterDto) criteria.uniqueResult();
			log.debug("this is for editAbcRangeAnalysisMaster "+abcAnalysisMasterDto);
			return abcAnalysisMasterDto;
		} catch (Exception e) {
			log.error("this is for editAbcRangeAnalysisMaster "+e.getMessage());
			  e.printStackTrace();
		}
		return abcAnalysisMasterDto;
	}
	
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform delete or set flag on AbcAnalysisMasterDto master table
	 */
	@Override
	public boolean deleteAbcRangeAnalysisMaster(
			AbcAnalysisMasterDto abcAnalysysMasterDto) {
		try{
			AbcAnalysisMasterDto dto = (AbcAnalysisMasterDto) sessionFactory.getCurrentSession().merge(abcAnalysysMasterDto);
			log.debug("this is for deleteAbcRangeAnalysisMaster "+dto);
			return true;
		}catch(Exception e){
			log.error("this is for deleteAbcRangeAnalysisMaster "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform search operation on AbcAnalysisMasterDto master table
	 */
	@Override
	public List<AbcAnalysisMasterDto> searchByAbcRangeAnalysisId(Integer id,
			HttpServletRequest request) {
		List<AbcAnalysisMasterDto> listAbcAnalysis=new ArrayList<AbcAnalysisMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(AbcAnalysisMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			listAbcAnalysis=criteria.list();
			log.debug("this is for searchByAbcRangeAnalysisId "+listAbcAnalysis);
		}catch(Exception e){
			log.error("this is for searchByAbcRangeAnalysisId "+e.getMessage());
			e.printStackTrace();
		}
		return listAbcAnalysis;
	}

	
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform auto suggestions on AbcAnalysisMasterDto master table
	 */
	
	@Override
	public AbcAnalysisMasterDto autoSuggestionsOnAbcRangeAnalysisId(Integer id) {
		AbcAnalysisMasterDto abcAnalysisMasterDto = new AbcAnalysisMasterDto();
		List<AbcAnalysisMasterDto> abcAnalysisList = new ArrayList<AbcAnalysisMasterDto> ();
		try {
			String sql = "SELECT ra.id AS id,ra.item_a_min_range " +
					     "AS item_a_min_range,ra.item_a_max_range AS item_a_max_range,ra.item_b_min_range AS item_b_min_range," +
					     "ra.item_b_max_range AS item_b_max_range," +
					     "ra.item_c_min_range AS item_c_min_range,ra.item_c_max_range AS item_c_max_range " +
					     "FROM inv_abcanalysis_master_new ra where ra.id like '%"+id+"%' " +
					     "and ra.deleted='N' limit 20";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
		    	AbcAnalysisMasterDto obj = new AbcAnalysisMasterDto();
		    	obj.setItemAMinRange((Integer)row.get("item_a_min_range"));
		    	obj.setItemAMaxRange((Integer)row.get("item_a_max_range"));
		    	obj.setItemBMinRange((Integer)row.get("item_b_min_range"));
		    	obj.setItemBMaxRange((Integer)row.get("item_b_max_range"));
		    	obj.setItemCMinRange((Integer)row.get("item_c_min_range"));
		    	obj.setItemCMaxRange((Integer)row.get("item_c_max_range"));
		    	obj.setId((Integer)row.get("id"));
		    	abcAnalysisList.add(obj);		    	
	    	}
		    abcAnalysisMasterDto.setLstAbcAnalysysMaster(abcAnalysisList);
		    log.debug("this is for autoSuggestionsOnAbcRangeAnalysisId "+abcAnalysisMasterDto);
		} catch (Exception e) {
			log.error("this is for autoSuggestionsOnAbcRangeAnalysisId "+e.getMessage());
			e.printStackTrace();
			return null;
		}
		return abcAnalysisMasterDto;
	}
	
	@Override
	public int saveDocumentMaster(DocumentMasterDto documentMasterDto) {
		// TODO Auto-generated method stub
		try {
			if (documentMasterDto.getDoc_id() == 0) {
				DocumentMasterDto dto = (DocumentMasterDto) sessionFactory.getCurrentSession().merge(documentMasterDto);
				log.debug("this is for saveDocumentMaster "+dto);
				return 1;
			} else {
				DocumentMasterDto dto = (DocumentMasterDto) sessionFactory.getCurrentSession().merge(documentMasterDto);
				log.debug("this is for saveDocumentMaster "+dto);
				return 2;
			}

		} catch (Exception e) {
			log.error("this is for saveDocumentMaster "+e.getMessage());
			// TODO: handle exception
			e.printStackTrace();
			return 0;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DocumentMasterDto> getAllDocumentMaster(Integer unitId) {
		// TODO Auto-generated method stub
		List<DocumentMasterDto> documentMasterDtoList = new ArrayList<DocumentMasterDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DocumentMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			documentMasterDtoList = criteria.list();
			log.debug("this is for getAllDocumentMaster "+documentMasterDtoList);
			return documentMasterDtoList;
		} catch (Exception e) {
			log.error("this is for getAllDocumentMaster "+e.getMessage());
			e.printStackTrace();
			return null;
		}

	}

	@Override
	public DocumentMasterDto editDocumentMaster(Integer documentId) {
		// TODO Auto-generated method stub
		DocumentMasterDto documentMasterDto = new DocumentMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DocumentMasterDto.class);
			criteria.add(Restrictions.eq("doc_id", documentId));
			documentMasterDto = (DocumentMasterDto) criteria.uniqueResult();
			log.debug("this is for editDocumentMaster "+documentMasterDto);
			return documentMasterDto;
		} catch (Exception e) {
			log.error("this is for editDocumentMaster "+e.getMessage());
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean deleteDocumentMaster(DocumentMasterDto documentMasterDto) {
		// TODO Auto-generated method stub
		try {
			DocumentMasterDto dto  = (DocumentMasterDto)sessionFactory.getCurrentSession().merge(documentMasterDto);
			log.debug("this is for deleteDocumentMaster "+dto);
			return true;
		} catch (Exception e) {
			log.error("this is for deleteDocumentMaster "+e.getMessage());
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public DocumentMasterDto inventoryDocumentAutoSuggestion(
			String documentName, String callFrom) {

		DocumentMasterDto dM = new DocumentMasterDto();
		List<DocumentMasterDto> documentMasterDtoList = new ArrayList<DocumentMasterDto>();
		try {

			String sql = "";

			if (callFrom.equals("doumentMaster")) {
				sql = inventoryDocumentAutoSuggestion(documentName);
			}

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {

				DocumentMasterDto documentMasterDto = new DocumentMasterDto();
				documentMasterDto.setDocName((String) row.get("doc_name"));
				documentMasterDto.setDoc_id((Integer) row.get("doc_id"));
				documentMasterDtoList.add(documentMasterDto);
			}
			dM.setDocumentMasterDto(documentMasterDtoList);
			log.debug("this is for inventoryDocumentAutoSuggestion "+dM);

		} catch (Exception e) {
			log.error("this is for inventoryDocumentAutoSuggestion "+e.getMessage());
			e.printStackTrace();
			return null;
		}
		return dM;
	}

	String inventoryDocumentAutoSuggestion(String documentName) {
		String sql = "";
		sql = "SELECT d.doc_id, d.doc_name FROM ehat_inv_document_master d where d.doc_name like '%"
				+ documentName + "%' and d.deleted='N' limit 20 ";
		return sql;
	}

	@Override
	public DocumentMasterDto getAllDocumentById(Integer documentId) {
		// TODO Auto-generated method stub
		DocumentMasterDto documentMasterDto = new DocumentMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DocumentMasterDto.class);
			criteria.add(Restrictions.eq("doc_id", documentId));
			documentMasterDto = (DocumentMasterDto) criteria.uniqueResult();
			log.debug("this is for getAllDocumentById "+documentMasterDto);
			return documentMasterDto;
		} catch (Exception e) {
			log.error("this is for getAllDocumentById "+e.getMessage());
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public int saveDocNumberMaster(InventoryDocumentNumberMDTO invnumObj) {
		try {
			if(invnumObj.getDocument_numbering_id()==0){
				InventoryDocumentNumberMDTO Obj = (InventoryDocumentNumberMDTO) sessionFactory.getCurrentSession().merge(invnumObj);
				log.debug("this is for saveDocNumberMaster "+Obj);
				return 1;
			}else{
				InventoryDocumentNumberMDTO Obj = (InventoryDocumentNumberMDTO) sessionFactory.getCurrentSession().merge(invnumObj);
				log.debug("this is for saveDocNumberMaster "+Obj);
				return 2;				
			}
		} catch (Exception e) {
			log.error("this is for saveDocNumberMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<InventoryDocumentNumberMDTO> getAllInventoryNUmberDoc(Integer unitId) {
		List<InventoryDocumentNumberMDTO> lstDocNum=new ArrayList<InventoryDocumentNumberMDTO>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(InventoryDocumentNumberMDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstDocNum = criteria.list();
			log.debug("this is for getAllInventoryNUmberDoc "+lstDocNum);
		}catch(Exception e){
			log.error("this is for getAllInventoryNUmberDoc "+e.getMessage());
			e.printStackTrace();
		}		
		return lstDocNum;
	}

	@Override
	public InventoryDocumentNumberMDTO editInventoryDocNumber(Integer docId) {
		InventoryDocumentNumberMDTO obj=new InventoryDocumentNumberMDTO();
		try{
			obj=(InventoryDocumentNumberMDTO) sessionFactory.getCurrentSession().get(InventoryDocumentNumberMDTO.class, docId);
			log.debug("this is for editInventoryDocNumber "+obj);
			return obj;
		}
		catch(Exception e){
			log.error("this is for editInventoryDocNumber "+e.getMessage());
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteInventoryNumberDoc(InventoryDocumentNumberMDTO numdocObj) {
		try{
			InventoryDocumentNumberMDTO Obj = (InventoryDocumentNumberMDTO) sessionFactory.getCurrentSession().merge(numdocObj);
			log.debug("this is for deleteInventoryNumberDoc "+Obj);
			return true;
		}catch(Exception e){
			log.error("this is for deleteInventoryNumberDoc "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public int saveTaxMaster(InventoryTaxSetUpMDTO invnumObj) {
		try {
			if(invnumObj.getTax_id()==0){
				InventoryTaxSetUpMDTO dto = (InventoryTaxSetUpMDTO)sessionFactory.getCurrentSession().merge(invnumObj);
				log.debug("this is for saveTaxMaster "+dto);
				return 1;
			}else{
				InventoryTaxSetUpMDTO dto = (InventoryTaxSetUpMDTO)sessionFactory.getCurrentSession().merge(invnumObj);
				log.debug("this is for saveTaxMaster "+dto);
				return 2;				
			}
		} catch (Exception e) {
			log.error("this is for saveTaxMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<InventoryTaxSetUpMDTO> getAllInventoryTaxDoc(Integer unitId) {
		List<InventoryTaxSetUpMDTO> lsttaxDoc=new ArrayList<InventoryTaxSetUpMDTO>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(InventoryTaxSetUpMDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lsttaxDoc = criteria.list();
			log.debug("this is for getAllInventoryTaxDoc "+lsttaxDoc);
		}catch(Exception e){
			log.error("this is for getAllInventoryTaxDoc "+e.getMessage());
			e.printStackTrace();
		}		
		return lsttaxDoc;
	}

	@Override
	public InventoryTaxSetUpMDTO editInventoryTaxDoc(Integer taxId) {
		InventoryTaxSetUpMDTO obj=new InventoryTaxSetUpMDTO();
		try{
			obj=(InventoryTaxSetUpMDTO) sessionFactory.getCurrentSession().get(InventoryTaxSetUpMDTO.class, taxId);
			log.debug("this is for editInventoryTaxDoc "+obj);
			return obj;
		}
		catch(Exception e) {
			log.error("this is for editInventoryTaxDoc "+e.getMessage());
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteInventoryTaxDoc(InventoryTaxSetUpMDTO invtaxobj) {
		try{
			sessionFactory.getCurrentSession().merge(invtaxobj);
			log.debug("this is for deleteInventoryTaxDoc "+invtaxobj);
			return true;
		}catch(Exception e){
			log.error("this is for deleteInventoryTaxDoc "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public int saveCategoryMaster(CategoryDTOM catObj) {
		String saveSqlQuery ="";
		try {
			if(catObj.getCategoryId()==0){
				//query check and avoid save duplicate item name in table
				saveSqlQuery="SELECT count(*) from ehat_categoary_doc cg where cg.deleted='N' and cg.categoary_name='"+catObj.getCategoryName()+"' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
				sessionFactory.getCurrentSession().merge(catObj);
				log.debug("this is for saveCategoryMaster "+catObj);
				return 1;
				}
			}else{
				//query check and avoid save duplicate item name in table
				saveSqlQuery="SELECT count(*) from ehat_categoary_doc cg where cg.deleted='N' and cg.categoary_name='"+catObj.getCategoryName()+"'and cg.categoary_id not in("+catObj.getCategoryId()+")";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
				sessionFactory.getCurrentSession().merge(catObj);
				log.debug("this is for saveCategoryMaster "+catObj);
				return 2;
				}
			}
		} catch (Exception e) {
			log.error("this is for getAllInventoryCategoryDoc "+e.getMessage());
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<CategoryDTOM> getAllInventoryCategoryDoc(Integer unitId) {
		List<CategoryDTOM> lstCategoryDoc=new ArrayList<CategoryDTOM>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CategoryDTOM.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstCategoryDoc = criteria.list();
			log.debug("this is for getAllInventoryCategoryDoc "+lstCategoryDoc);
		}catch(Exception e){
			log.error("this is for getAllInventoryCategoryDoc "+e.getMessage());
			e.printStackTrace();
		}		
		return lstCategoryDoc;
	}

	@Override
	public CategoryDTOM editInventoryCategoryDoc(Integer catId) {
		CategoryDTOM obj=new CategoryDTOM();
		try{
			obj=(CategoryDTOM) sessionFactory.getCurrentSession().get(CategoryDTOM.class, catId);
			log.debug("this is for editInventoryCategoryDoc "+obj);
			return obj;
		}
		catch(Exception e){
			log.error("this is for editInventoryCategoryDoc "+e.getMessage());
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteInventoryCategoryDoc(CategoryDTOM catObj) {
		try{
			sessionFactory.getCurrentSession().merge(catObj);
			log.debug("this is for deleteInventoryCategoryDoc "+catObj);
			return true;
		}catch(Exception e){
			log.error("this is for deleteInventoryCategoryDoc "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public int saveFormMaster(FormDTOM formObj) {
		try {
			if(formObj.getFormId()==0){
				sessionFactory.getCurrentSession().merge(formObj);
				log.debug("this is for saveFormMaster "+formObj);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(formObj);
				log.debug("this is for saveFormMaster "+formObj);
				return 2;				
			}
		} catch (Exception e) {
			log.error("this is for saveFormMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<FormDTOM> getAllInventoryFormDoc(Integer unitId) {
		List<FormDTOM> lstformDoc=new ArrayList<FormDTOM>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(FormDTOM.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstformDoc = criteria.list();
			log.debug("this is for getAllInventoryFormDoc "+lstformDoc);

		}catch(Exception e){
			log.error("this is for getAllInventoryFormDoc "+e.getMessage());
			e.printStackTrace();
		}		
		return lstformDoc;
	}

	@Override
	public FormDTOM editInventoryFormDoc(Integer formId) {
		FormDTOM obj=new FormDTOM();
		try{
			obj=(FormDTOM) sessionFactory.getCurrentSession().get(FormDTOM.class, formId);
			log.debug("this is for editInventoryFormDoc "+obj);
			return obj;
		} catch(Exception e){
			log.error("this is for editInventoryFormDoc "+e.getMessage());
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteInventoryFormDoc(FormDTOM formObj) {
		try{
			sessionFactory.getCurrentSession().merge(formObj);
			log.debug("this is for deleteInventoryFormDoc "+formObj);
			return true;
		}catch(Exception e){
			log.error("this is for deleteInventoryFormDoc "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public int saveManufacturerMaster(ManufacturerMDTO mObj) {
		String saveSqlQuery = "";
		try {
			if(mObj.getManufacturerId()==0){
				//query check and avoid save duplicate item name in table
				saveSqlQuery="SELECT count(*) from ehat_manufacture_doc mf where mf.deleted='N' and mf.manufacture_name='"+mObj.getManufacturerName()+"' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
				sessionFactory.getCurrentSession().merge(mObj);
				log.debug("this is for saveManufacturerMaster "+mObj);
				return 1;
				}
			}else{
				//query check and avoid save duplicate item name in table
				saveSqlQuery="SELECT count(*) from ehat_manufacture_doc mf where mf.deleted='N' and mf.manufacture_name='"+mObj.getManufacturerName()+"'and mf.manufacture_id not in("+mObj.getManufacturerId()+")";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
				sessionFactory.getCurrentSession().merge(mObj);
				log.debug("this is for saveManufacturerMaster "+mObj);
				return 2;
				}
			}
		} catch (Exception e) {
			log.error("this is for saveManufacturerMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<ManufacturerMDTO> getAllInventoryManufactureDoc(Integer unitId) {
		List<ManufacturerMDTO> lstmanuDoc=new ArrayList<ManufacturerMDTO>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ManufacturerMDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId ));
			lstmanuDoc = criteria.list();
			log.debug("this is for getAllInventoryManufactureDoc "+lstmanuDoc);
		}catch(Exception e){
			log.error("this is for getAllInventoryManufactureDoc "+e.getMessage());
			e.printStackTrace();
		}		
		return lstmanuDoc;
	}

	@Override
	public ManufacturerMDTO editInventoryManufactureDoc(Integer mId) {
		ManufacturerMDTO obj=new ManufacturerMDTO();
		try{
			obj=(ManufacturerMDTO) sessionFactory.getCurrentSession().get(ManufacturerMDTO.class, mId);
			log.debug("this is for editInventoryManufactureDoc "+obj);
			return obj;
		}catch(Exception e){
			log.error("this is for editInventoryManufactureDoc "+e.getMessage());
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteInventoryManufactureDoc(ManufacturerMDTO mObj) {
		try{
			sessionFactory.getCurrentSession().merge(mObj);
			log.debug("this is for deleteInventoryManufactureDoc "+mObj);
			return true;
		}catch(Exception e){
			log.error("this is for deleteInventoryManufactureDoc "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public int saveChargeMaster(ChargeMasterDTO cObj) {
		try {
			
			String saveSqlQuery="SELECT count(*) from ehat_charge_master im where im.deleted='N' and im.charge_name='"+cObj.getChargeName()+"'";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
			int countNew = ((Number)countQuery.uniqueResult()).intValue();
			if(countNew > 0){
				return 3;
			}else if(cObj.getChargeId()==0){
				sessionFactory.getCurrentSession().merge(cObj);
				log.debug("this is for saveChargeMaster "+cObj);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(cObj);
				log.debug("this is for updateChargeMaster "+cObj);
				return 2;				
			}
		} catch (Exception e) {
			log.error("this is for saveChargeMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}	
	}
	

	@Override
	public ChargeMasterDTO editInventoryChargeMaster(Integer chargeId) {
		ChargeMasterDTO obj=new ChargeMasterDTO();
		try{
			obj=(ChargeMasterDTO) sessionFactory.getCurrentSession().get(ChargeMasterDTO.class, chargeId);
			log.debug("this is for editInventoryChargeMaster "+obj);
			return obj;
		}catch(Exception e){
			log.error("this is for editInventoryChargeMaster "+e.getMessage());
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteInventoryChargeMaster(ChargeMasterDTO cObj) {
		try{
			sessionFactory.getCurrentSession().merge(cObj);
			log.debug("this is for deleteInventoryChargeMaster "+cObj);
			return true;
		}catch(Exception e){
			log.error("this is for deleteInventoryChargeMaster "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<ChargeMasterDTO> getAllInventoryChargeMaster(Integer unitId) {
		 String sql = "";
		 List<ChargeMasterDTO> lstChargeMaster=new ArrayList<ChargeMasterDTO>();
		 try{				
					 Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ChargeMasterDTO.class);
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("unitId", unitId));
						lstChargeMaster = criteria.list();	
						log.debug("this is for getAllInventoryChargeMaster "+lstChargeMaster);
		 }catch (Exception e) {
			 log.error("this is for getAllInventoryChargeMaster "+e.getMessage());
			 e.printStackTrace();
		 }
				 
		return lstChargeMaster;
	}

	@Override
	public List<ChargeMasterDTO> getAllInventoryChargeMasterAutosuggestion(String chargeName,Integer unitId) {
		 String sql = "";
		 List<ChargeMasterDTO> lstChargeMaster=new ArrayList<ChargeMasterDTO>();
		 try{				 
			
				sql = "SELECT c.charge_id, c.charge_name FROM ehat_charge_master c  where c.charge_name like '%"	+ chargeName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					ChargeMasterDTO obj = new ChargeMasterDTO();
					obj.setChargeName((String) row.get("charge_name"));
					obj.setChargeId((Integer) row.get("charge_id"));
					lstChargeMaster.add(obj);
					obj=null;
				}
				log.debug("this is for getAllInventoryChargeMasterAutosuggestion "+lstChargeMaster);
		 
		 }catch (Exception e) {
			 log.error("this is for getAllInventoryChargeMasterAutosuggestion "+e.getMessage());
			 e.printStackTrace();
		 }
				 
		return lstChargeMaster;
	}

	@Override
	public int saveUnitMaster(UnitMasterDTONew uObj) {
		try {
			if(uObj.getUniId()==0){
				sessionFactory.getCurrentSession().merge(uObj);
				log.debug("this is for saveUnitMaster "+uObj);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(uObj);
				log.debug("this is for saveUnitMaster "+uObj);
				return 2;				
			}
		} catch (Exception e) {
			log.error("this is for saveUnitMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<UnitMasterDTONew> getAllInventoryUnitMaster(Integer unitId) {
		List<UnitMasterDTONew> lstuniDoc=new ArrayList<UnitMasterDTONew>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(UnitMasterDTONew.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstuniDoc = criteria.list();
			log.debug("this is for getAllInventoryUnitMaster "+lstuniDoc);
		}catch(Exception e){
			log.error("this is for getAllInventoryUnitMaster "+e.getMessage());
			e.printStackTrace();
		}		
		return lstuniDoc;
	}

	@Override
	public UnitMasterDTONew editInventoryUnitMaster(Integer uniId) {
		UnitMasterDTONew obj=new UnitMasterDTONew();
		try{
			obj=(UnitMasterDTONew) sessionFactory.getCurrentSession().get(UnitMasterDTONew.class, uniId);
			log.debug("this is for editInventoryUnitMaster "+obj);	
			return obj;
		}
		catch(Exception e) {
			log.error("this is for editInventoryUnitMaster "+e.getMessage());
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteInventoryUnitMaster(UnitMasterDTONew uObj) {
		try{
			sessionFactory.getCurrentSession().merge(uObj);
			log.debug("this is for deleteInventoryUnitMaster "+uObj);	
			return true;
		}catch(Exception e){
			log.error("this is for deleteInventoryUnitMaster "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<UnitMasterDTONew> getAllInventoryUnitMasterAutosuggestion(String unitName) {
		 String sql = "";
		 List<UnitMasterDTONew> lstUnitMaster=new ArrayList<UnitMasterDTONew>();
		 try{				 
			
				sql = "SELECT c.uni_id, c.unit_name FROM ehat_unit_doc  c  where c.unit_name like '%"	+ unitName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					UnitMasterDTONew obj = new UnitMasterDTONew();
					obj.setUnitName((String) row.get("unit_name"));
					obj.setUniId((Integer) row.get("uni_id"));
					lstUnitMaster.add(obj);
					obj=null;
				}
				log.debug("this is for getAllInventoryUnitMasterAutosuggestion "+lstUnitMaster);	
		 
		 }catch (Exception e) {
			 log.error("this is for getAllInventoryUnitMasterAutosuggestion "+e.getMessage());
			 e.printStackTrace();
		 }
				 
		return lstUnitMaster;
	}

	@Override
	public List<InventoryTaxSetUpMDTO> getAllInventoryTaxMasterAutosuggestion(String hsnName) {
		 String sql = "";
		 List<InventoryTaxSetUpMDTO> lsttaxMaster=new ArrayList<InventoryTaxSetUpMDTO>();
		 try{			 
			 	sql = "SELECT c.tax_id, c.tax_code , c.tax_rate,c.hsn_name FROM ehat_inventory_tax_setup  c  where c.hsn_name like '%"	+ hsnName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					InventoryTaxSetUpMDTO obj = new InventoryTaxSetUpMDTO();
					obj.setTax_code((String) row.get("tax_code"));
					obj.setTax_id((Integer) row.get("tax_id"));
					obj.setTax_rate((Double) row.get("tax_rate"));
					obj.setHsnName((String) row.get("hsn_name"));
					lsttaxMaster.add(obj);
					obj=null;
				}
				log.debug("this is for getAllInventoryTaxMasterAutosuggestion "+lsttaxMaster);	
		 
		 }catch (Exception e) {
			log.error("this is for getAllInventoryTaxMasterAutosuggestion "+e.getMessage());
			e.printStackTrace();
		 }
				 
		return lsttaxMaster;
	}

	@Override
	public List<CategoryDTOM> getAllInventoryCategoryMasterAutosuggestion(String categoryName) {
		 String sql = "";
		 List<CategoryDTOM> lstcatMaster=new ArrayList<CategoryDTOM>();
		 try{				 
			sql = "SELECT c.categoary_id, c.categoary_name FROM ehat_categoary_doc  c  where c.categoary_name like '%"	+ categoryName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					CategoryDTOM obj = new CategoryDTOM();
					obj.setCategoryName((String) row.get("categoary_name"));
					obj.setCategoryId((Integer) row.get("categoary_id"));
					lstcatMaster.add(obj);
					obj=null;
				}
				
				log.debug("this is for getAllInventoryCategoryMasterAutosuggestion "+lstcatMaster);
		 }catch (Exception e) {
			 log.error("this is for getAllInventoryCategoryMasterAutosuggestion "+e.getMessage());
			 e.printStackTrace();
		 }
				 
		return lstcatMaster;
	}

	@Override
	public List<FormDTOM> getAllInventoryformMasterAutosuggestion(String formType) {
		 String sql = "";
		 List<FormDTOM> lstformMaster=new ArrayList<FormDTOM>();
		 try{
				sql = "SELECT c.form_id, c.form_type FROM ehat_form_doc  c  where c.form_type like '%"	+ formType + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					FormDTOM obj = new FormDTOM();
					obj.setFormType((String) row.get("form_type"));
					obj.setFormId((Integer) row.get("form_id"));
					lstformMaster.add(obj);
					obj=null;
				}				
				log.debug("this is for getAllInventoryformMasterAutosuggestion "+lstformMaster);
		 }catch (Exception e) {
			 log.error("this is for getAllInventoryformMasterAutosuggestion "+e.getMessage());
			 e.printStackTrace();
		 }
				 
		return lstformMaster;
	}

	@Override
	public List<ManufacturerMDTO> getAllInventoryManufactureMasterAutosuggestion(String manufName) {
		 String sql = "";
		 List<ManufacturerMDTO> lstmanufMaster=new ArrayList<ManufacturerMDTO>();
		 try{
				sql = "SELECT c.manufacture_id, c.manufacture_name FROM ehat_manufacture_doc  c  where c.manufacture_name like '%"	+ manufName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					ManufacturerMDTO obj = new ManufacturerMDTO();
					obj.setManufacturerName((String) row.get("manufacture_name"));
					obj.setManufacturerId((Integer) row.get("manufacture_id"));
					lstmanufMaster.add(obj);
					obj=null;
				}				
			 log.debug("this is for getAllInventoryManufactureMasterAutosuggestion "+lstmanufMaster);
		 }catch (Exception e) {
			 log.error("this is for getAllInventoryManufactureMasterAutosuggestion "+e.getMessage());
			 e.printStackTrace();
		}
				 
		return lstmanufMaster;
	}

	@Override
	public int saveTermAndConditionMaster(TermsAndCondtionDTO tObj) {
		try {
			if(tObj.getTermConditionId()==0){
				sessionFactory.getCurrentSession().merge(tObj);
				log.debug("this is for saveTermAndConditionMaster "+tObj);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(tObj);
				log.debug("this is for saveTermAndConditionMaster "+tObj);
				return 2;				
			}
		} catch (Exception e) {
			log.error("this is for saveTermAndConditionMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<TermsAndCondtionDTO> getAllInventoryTermAndConditionMaster(Integer unitId) {
		
		List<TermsAndCondtionDTO> lsttermDoc=new ArrayList<TermsAndCondtionDTO>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(TermsAndCondtionDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lsttermDoc = criteria.list();
			log.debug("this is for getAllInventoryTermAndConditionMaster "+lsttermDoc);
		}catch(Exception e){
			log.error("this is for getAllInventoryTermAndConditionMaster "+e.getMessage());
			e.printStackTrace();
		}		
		return lsttermDoc;
	}

	@Override
	public TermsAndCondtionDTO editInventoryTermAndConditionMaster(Integer termconditionId) {
		TermsAndCondtionDTO obj=new TermsAndCondtionDTO();
		try{
			obj=(TermsAndCondtionDTO) sessionFactory.getCurrentSession().get(TermsAndCondtionDTO.class, termconditionId);
		
			log.debug("this is for editInventoryTermAndConditionMaster "+obj);
			
			return obj;
		}
		catch(Exception e){
			
			log.error("this is for editInventoryTermAndConditionMaster "+e.getMessage());
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteInventoryTermAndConditionMaster(TermsAndCondtionDTO tObj) {
		try{
			sessionFactory.getCurrentSession().merge(tObj);
			log.debug("this is for deleteInventoryTermAndConditionMaster "+tObj);
			return true;
		}catch(Exception e){
			log.error("this is for deleteInventoryTermAndConditionMaster "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public InventoryDocumentNumberMDTO inventoryDocumentNumberAutoSuggestion(String docName) {

		InventoryDocumentNumberMDTO dM = new InventoryDocumentNumberMDTO();
		List<InventoryDocumentNumberMDTO> documentMasterDtoList = new ArrayList<InventoryDocumentNumberMDTO>();
		try {
			String sql = "SELECT d.document_numbering_id, d.document_name FROM ehat_inventory_number_doc d where d.document_name like '%"+docName+"%' and d.deleted='N' limit 20 ";

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				
				InventoryDocumentNumberMDTO documentNumberMasterDto = new InventoryDocumentNumberMDTO();
				documentNumberMasterDto.setDocumentName((String) row.get("document_name"));
				documentNumberMasterDto.setDocument_numbering_id((Integer) row.get("document_numbering_id"));
				documentMasterDtoList.add(documentNumberMasterDto);
				documentNumberMasterDto=null;
			}
			dM.setLstDocumentNumberDTO(documentMasterDtoList);
			log.debug("this is for inventoryDocumentNumberAutoSuggestion "+dM);

		} catch (Exception e) {
			log.error("this is for inventoryDocumentNumberAutoSuggestion "+e.getMessage());
			e.printStackTrace();
			return null;
		}
		return dM;
	}
	
	@Override
	public List<TermsAndCondtionDTO> getAllInventoryTermAndConditionMasterAutosuggestion(String headingName) {
		 String sql = "";
		 List<TermsAndCondtionDTO> lsttermMaster=new ArrayList<TermsAndCondtionDTO>();
		 try{
				sql = "SELECT c.termcondition_id, c.terms_condition_name,c.heading_name FROM ehat_termsandcondition_doc  c  where c.heading_name like '%"	+ headingName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					TermsAndCondtionDTO obj = new TermsAndCondtionDTO();
					obj.setTermconditionName((String) row.get("terms_condition_name"));
					obj.setTermConditionId((Integer) row.get("termcondition_id"));
					obj.setHeadingName((String) row.get("heading_name"));
					lsttermMaster.add(obj);
					obj=null;
				}	
				log.debug("this is for getAllInventoryTermAndConditionMasterAutosuggestion "+lsttermMaster);
		 
		 }catch (Exception e) {
			 log.error("this is for getAllInventoryTermAndConditionMasterAutosuggestion "+e.getMessage());
			e.printStackTrace();
		}
				 
		return lsttermMaster;
	}
	
	@Override
	public int saveHospitalDetails(HospitalDetailsDto hospitalDetailsDto) {
		// TODO Auto-generated method stub
		try {
			if (hospitalDetailsDto.getHospitalId() == 0) {
				sessionFactory.getCurrentSession().merge(hospitalDetailsDto);
				log.debug("this is for saveHospitalDetails "+hospitalDetailsDto);
				return 1;
			} else {
				sessionFactory.getCurrentSession().merge(hospitalDetailsDto);
				log.debug("this is for saveHospitalDetails "+hospitalDetailsDto);
				return 2;
			}

		} catch (Exception e) {
			// TODO: handle exception
			log.error("this is for getAllHospitalDetails "+e.getMessage());
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<HospitalDetailsDto> getAllHospitalDetails() {
		// TODO Auto-generated method stub
		List<HospitalDetailsDto> hospitalDetailsDtoList = new ArrayList<HospitalDetailsDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(HospitalDetailsDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			hospitalDetailsDtoList = criteria.list();
			log.debug("this is for getAllHospitalDetails "+hospitalDetailsDtoList);
			return hospitalDetailsDtoList;
		} catch (Exception e) {
			log.error("this is for getAllHospitalDetails "+e.getMessage());
			e.printStackTrace();
			return null;
		}

	}

	@Override
	public HospitalDetailsDto editHospitalDetails(Integer hospitalId) {
		// TODO Auto-generated method stub
		HospitalDetailsDto hospitalDetailsDto = new HospitalDetailsDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetailsDto.class);
			criteria.add(Restrictions.eq("hospitalId", hospitalId));
			hospitalDetailsDto = (HospitalDetailsDto) criteria.uniqueResult();
			log.debug("this is for editHospitalDetails "+hospitalDetailsDto);
			return hospitalDetailsDto;
		} catch (Exception e) {
			log.error("this is for editHospitalDetails "+e.getMessage());
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean deleteHospitalDetails(HospitalDetailsDto hospitalDetailsDto
			) {
		// TODO Auto-generated method stub
		try {
			sessionFactory.getCurrentSession().merge(hospitalDetailsDto);
			log.debug("this is for deleteHospitalDetails "+hospitalDetailsDto);
			return true;
		} catch (Exception e) {
			log.error("this is for deleteHospitalDetails "+e.getMessage());
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public HospitalDetailsDto hospitalDetailsAutoSuggestion(
			String hospitalName, String callFrom) {
		// TODO Auto-generated method stub
		HospitalDetailsDto hospitalDetails = new HospitalDetailsDto();
		List<HospitalDetailsDto> hospitalDetailsDtoList = new ArrayList<HospitalDetailsDto>();
		try {

			String sql = "";

			if (callFrom.equals("hospitalDetails")) {
				sql = hospitalDetailsAutoSuggestion(hospitalName);
			}

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {

				HospitalDetailsDto hospitalDetailsDto = new HospitalDetailsDto();
				hospitalDetailsDto.setHospitalName((String) row.get("hospitalName"));
				hospitalDetailsDto.setHospitalId((Integer) row.get("hospitalId"));
				hospitalDetailsDtoList.add(hospitalDetailsDto);
			}
			hospitalDetails.setHospitalDetailsDto(hospitalDetailsDtoList);
			log.debug("this is for hospitalDetailsAutoSuggestion "+hospitalDetails);

		} catch (Exception e) {
			log.error("this is for hospitalDetailsAutoSuggestion "+e.getMessage());
			e.printStackTrace();
			return null;
		}
		return hospitalDetails;
	}
	
	String hospitalDetailsAutoSuggestion(String hospitalName) {
		String sql = "";
		sql = "SELECT h.hospital_id as hospitalId, h.hospital_name as hospitalName FROM ehat_inv_hospital_details h where h.hospital_name like '%"
				+ hospitalName + "%' and h.deleted='N' limit 20 ";
		return sql;
	}
	
	

	@Override
	public HospitalDetailsDto getAllHospitalDetailsById(Integer hospitalId) {
		// TODO Auto-generated method stub
		HospitalDetailsDto hospitalDetailsDto = new HospitalDetailsDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetailsDto.class);
			criteria.add(Restrictions.eq("hospitalId", hospitalId));
			hospitalDetailsDto = (HospitalDetailsDto) criteria.uniqueResult();
			log.debug("this is for getAllHospitalDetailsById "+hospitalDetailsDto);
			return hospitalDetailsDto;
		} catch (Exception e) {
			log.error("this is for getAllHospitalDetailsById "+e.getMessage());
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public int saveCompanyMaster(CompanyMasterDTO cObj) {
		try {
			if(cObj.getCompanyId()==0){
				sessionFactory.getCurrentSession().merge(cObj);
				log.debug("this is for saveCompanyMaster "+cObj);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(cObj);
				log.debug("this is for updateCompanyMaster "+cObj);
				return 2;				
			}
		} catch (Exception e) {
			log.error("this is for saveCompanyMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<CompanyMasterDTO> getAllInventoryCompanyMaster() {
		List<CompanyMasterDTO> lstcompDoc=new ArrayList<CompanyMasterDTO>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CompanyMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstcompDoc = criteria.list();
			log.debug("this is for getAllInventoryCompanyMaster "+lstcompDoc);
		}catch(Exception e){
			log.error("this is for getAllInventoryCompanyMaster "+e.getMessage());
			e.printStackTrace();
		}		
		return lstcompDoc;
	}

	@Override
	public CompanyMasterDTO editInventoryCompanyMaster(Integer companyId) {
		CompanyMasterDTO obj=new CompanyMasterDTO();
		try{
			obj=(CompanyMasterDTO) sessionFactory.getCurrentSession().get(CompanyMasterDTO.class, companyId);
			log.debug("this is for editInventoryCompanyMaster "+obj);
			return obj;
		}catch(Exception e) {
			log.error("this is for editInventoryCompanyMaster "+e.getMessage());
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteInventoryCompanyMaster(CompanyMasterDTO cObj) {
		try{
			sessionFactory.getCurrentSession().merge(cObj);
			log.debug("this is for deleteInventoryCompanyMaster "+cObj);
			return true;
		}catch(Exception e){
			log.error("this is for deleteInventoryCompanyMaster "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<CompanyMasterDTO> getAllInventoryComapnyMasterAutosuggestion(String companyName) {
		 String sql = "";
		 List<CompanyMasterDTO> lstcMaster=new ArrayList<CompanyMasterDTO>();
		 try{
				sql = "SELECT c.company_id, c.company_name FROM ehat_company_doc  c  where c.company_name like '%"	+ companyName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					CompanyMasterDTO obj = new CompanyMasterDTO();
					obj.setCompanyName((String) row.get("company_name"));
					obj.setCompanyId((Integer) row.get("company_id"));
					lstcMaster.add(obj);
					obj=null;
				}		
				log.debug("this is for getAllInventoryComapnyMasterAutosuggestion "+lstcMaster);
		 
		 }catch (Exception e) {
			 	log.error("this is for getAllInventoryComapnyMasterAutosuggestion "+e.getMessage());
				e.printStackTrace();
			}
				 
		return lstcMaster;
	}

	@Override
	public List<WarehouseMasterDto> searchByWarehouseName(String warehouseName,
			HttpServletRequest request) {
		List<WarehouseMasterDto> lstWarehouseMaster=new ArrayList<WarehouseMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(WarehouseMasterDto.class);
			criteria.add(Restrictions.eq("warehouseName",warehouseName));
			lstWarehouseMaster=	criteria.list();
			log.debug("this is for searchByWarehouseName "+lstWarehouseMaster);
		}catch(Exception e){
			log.error("this is for searchByWarehouseName "+e.getMessage());
			e.printStackTrace();
		}
		return lstWarehouseMaster;

	}

	@Override
	public List<district_taluka_city> getAllStateMaster(HttpServletRequest request) {
		String sql = "";
		 List<district_taluka_city> lstcMaster=new ArrayList<district_taluka_city>();
		 try{
				sql = "SELECT c.idstate, c.state_name FROM state  c  where  c.status='Y' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					district_taluka_city obj = new district_taluka_city();
					obj.setstateName((String) row.get("state_name"));
					obj.setstate_ID((Integer) row.get("idstate"));
					lstcMaster.add(obj);
					obj=null;
				}				
				log.debug("this is for getAllStateMaster "+lstcMaster);
		 }catch (Exception e) {
		 	log.error("this is for getAllStateMaster "+e.getMessage());
			e.printStackTrace();
		}
				 
		return lstcMaster;
	
	}

	@Override
	public List<district_taluka_city> getAllDistrictByStateId(Integer stateId) {
		System.err.println("stateId.."+stateId);
		String sql = "";
		 List<district_taluka_city> lstcMaster=new ArrayList<district_taluka_city>();
		 try{
		sql="SELECT  d.iddistrict,d.dis_name from district d where d.status='Y' and d.state_id="+stateId;
		 
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		for (Map<String, Object> row : masterRow) {
			district_taluka_city obj = new district_taluka_city();
			obj.setdistrictName((String) row.get("dis_name"));
			obj.setdistrict_ID((Integer) row.get("iddistrict"));
			lstcMaster.add(obj);
			obj=null;
		}		
		log.debug("this is for getAllDistrictByStateId "+lstcMaster);
		 }catch(Exception e){
			 e.printStackTrace();
			 log.error("this is for getAllDistrictByStateId "+e.getMessage());
		 }
		return lstcMaster;
	}

	@Override
	public List<district_taluka_city> getAllTalukaBydDistictId(	Integer districtId) {
		System.err.println("districtId.."+districtId);
		String sql = "";
		 List<district_taluka_city> lstcMaster=new ArrayList<district_taluka_city>();
		 try{
		sql="SELECT  t.idtaluka,t.taluka_name from taluka t where t.status='Y' and t.district_id="+districtId;
		 
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		for (Map<String, Object> row : masterRow) {
			district_taluka_city obj = new district_taluka_city();
			obj.settalukaName((String) row.get("taluka_name"));
			obj.settaluka_ID((Integer) row.get("idtaluka"));
			lstcMaster.add(obj);
			obj=null;
		}		
		log.debug("this is for getAllTalukaBydDistictId "+lstcMaster);
		 }catch(Exception e){
			 e.printStackTrace();
			 log.error("this is for getAllTalukaBydDistictId "+e.getMessage());
		 }
		return lstcMaster;
	}

	@Override
	public List<district_taluka_city> getAllCityByTalukaId(Integer talukaId) {
		String sql = "";
		 List<district_taluka_city> lstcMaster=new ArrayList<district_taluka_city>();
		 try{
		sql="SELECT  c.idcity,c.city_name from city c where c.status='Y' and c.taluka_id="+talukaId;
		 
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		for (Map<String, Object> row : masterRow) {
			district_taluka_city obj = new district_taluka_city();
			obj.setcityName((String) row.get("city_name"));
			obj.setcity_ID((Integer) row.get("idcity"));
			lstcMaster.add(obj);
			obj=null;
		}		
		log.debug("this is for getAllCityByTalukaId "+lstcMaster);
		 }catch(Exception e){
			 e.printStackTrace();
			 log.error("this is for getAllCityByTalukaId "+e.getMessage());
		 }
		return lstcMaster;
	}

	@Override
	public int fetchHospitalState(HttpServletRequest request) {
		String id2 = "";
		int id = 0;
		try {	
			  SQLQuery query13 =sessionFactory.getCurrentSession().createSQLQuery("SELECT hospitalState FROM hospital");
         id2 = (String) query13.uniqueResult();
	     id = Integer.parseInt(id2) ;
	     log.debug("this is for fetchHospitalState "+id);
		} catch (Exception e) {
			log.error("this is for fetchHospitalState "+e.getMessage());
			e.printStackTrace();
			return  0;
		}
		return id;
	}

	@Override
	public List<FinancialYearDto> inventoryFinancialYearAutoSuggestion(String year) {
		 String sql = "";
		 List<FinancialYearDto> lstcMaster=new ArrayList<FinancialYearDto>();
		 try{
				sql = "SELECT f.id, f.year FROM inv_financial_year_new  f where f.year like '%"	+ year + "%' and f.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					FinancialYearDto obj = new FinancialYearDto();
					obj.setYear((String) row.get("year"));
					obj.setId((Integer) row.get("id"));
					lstcMaster.add(obj);
					obj=null;
				}
				log.debug("this is for inventoryFinancialYearAutoSuggestion "+lstcMaster);
		 
		 }catch (Exception e) {
			 	log.error("this is for inventoryFinancialYearAutoSuggestion "+e.getMessage());
				e.printStackTrace();
			}
				 
		return lstcMaster;
	}

	@Override
	public int saveSanctionMaster(SactionFormDTO sanctionobj) {
		try {
			if(sanctionobj.getSanctionId()==0){
				sessionFactory.getCurrentSession().merge(sanctionobj);
				log.debug("this is for saveSanctionMaster "+sanctionobj);
				return 1;
			}else{
				log.debug("this is for updateSanctionMaster "+sanctionobj);
				sessionFactory.getCurrentSession().merge(sanctionobj);
				return 2;				
			}
		} catch (Exception e) {
			log.error("this is for saveSanctionMaster "+e.getMessage());
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<SactionFormDTO> getAllSanctionMaster(Integer unitId) {
		List<SactionFormDTO> lstsactionform=new ArrayList<SactionFormDTO>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(SactionFormDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstsactionform = criteria.list();
			log.debug("this is for getAllSanctionMaster "+lstsactionform);
		}catch(Exception e){
			log.error("this is for getAllSanctionMaster "+e.getMessage());
			e.printStackTrace();
		}		
		return lstsactionform;
	}

	@Override
	public SactionFormDTO editSactionMaster(Integer sanctionId) {
		System.err.println("sanctionId....."+sanctionId);
		SactionFormDTO obj=new SactionFormDTO();
		try{
			obj=(SactionFormDTO) sessionFactory.getCurrentSession().get(SactionFormDTO.class, sanctionId);
			
			return obj;
		}catch(Exception e) {
			log.error("this is for editSactionMaster "+e.getMessage());
			e.printStackTrace();
		}
		log.debug("this is for editSactionMaster "+obj);
		return obj;
	}

	@Override
	public boolean deleteSactionMaster(SactionFormDTO sacobj) {
		try{
			sessionFactory.getCurrentSession().merge(sacobj);
			log.debug("this is for deleteSactionMaster "+sacobj);
			return true;
		}catch(Exception e){
			log.error("this is for deleteSactionMaster "+e.getMessage());
			e.printStackTrace();
		}
		return false;
	}
	/**
	 * 
	 */
	@Override
	public Integer getPageCountAllSubinventoryMaster() {
		Integer countNew = 0;
		try {
			String sql="";
			sql = "SELECT count(*) FROM inv_subinventory_master_new as sub WHERE deleted != 'Y'";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			countNew = ((Number)countQuery.uniqueResult()).intValue();
			log.debug("this is for getPageCountAllSubinventoryMaster "+countNew);
		} catch (Exception e) {
			log.error("this is for getPageCountAllSubinventoryMaster "+e.getMessage());
			e.printStackTrace();
		}
		return countNew;
		
	}
	/**
	 * 
	 */
	@Override
	public SubInventoryMasterDto getSubInventoryMasterPagination(
			Integer startIndex) {
		SubInventoryMasterDto subInventoryMasterDto = new SubInventoryMasterDto();
	List<SubInventoryMasterDto> lstSubInventoryMaster=new ArrayList<SubInventoryMasterDto>();
	String sql = "";
	try {
		sql = "SELECT * from inv_subinventory_master_new where deleted != 'Y'";
		if(sql != null) {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	 		 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	 		 query.setFirstResult(startIndex);
	 		 query.setMaxResults(10);
	 		List<Map<String, Object>> list=query.list();
	 		for(Map<String, Object> row : list){
	 			SubInventoryMasterDto obj=new SubInventoryMasterDto();
	 			obj.setId((Integer)row.get("id"));
				obj.setCreatedDateTime((Date)row.get("created_date_time"));
				obj.setSubInventoryName((String)row.get("subinventory_name"));
				obj.setContactNumber((String)row.get("contact_number"));
				lstSubInventoryMaster.add(obj);
			}
	 		
		}
		log.debug("this is for getSubInventoryMasterPagination "+subInventoryMasterDto);
	} catch (Exception e) {
		log.error("this is for getSubInventoryMasterPagination "+e.getMessage());
		e.printStackTrace();
	}
	subInventoryMasterDto.setLstSubInventoryMaster(lstSubInventoryMaster);
	return subInventoryMasterDto;
	}

	@Override
	public PartyMasterDto getPartyMasterPagination(Integer startIndex) {
		PartyMasterDto partyMasterDto = new PartyMasterDto();
		List<PartyMasterDto> lstpartyMaster=new ArrayList<PartyMasterDto>();
		String sql = "";
		try {
			sql = "SELECT * from inv_party_master_new where deleted != 'Y'";
			if(sql != null) {
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		 		 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 		 query.setFirstResult(startIndex);
		 		 query.setMaxResults(10);
		 		List<Map<String, Object>> list=query.list();
		 		for(Map<String, Object> row : list){
		 			PartyMasterDto obj=new PartyMasterDto();
		 			obj.setId((Integer)row.get("id"));
					obj.setName((String)row.get("party_master_name"));
					obj.setGroup((String)row.get("party_master_group"));
					obj.setType((String)row.get("party_master_type"));
					lstpartyMaster.add(obj);
				}
		 		
			}
			log.debug("this is for getPartyMasterPagination "+partyMasterDto);
		} catch (Exception e) {
			log.error("this is for getPartyMasterPagination "+e.getMessage());
			e.printStackTrace();
		}
		partyMasterDto.setPartyMasterDto(lstpartyMaster);
		return partyMasterDto;
	}
	
	@Override
	public int saveorUpdateMaintenanceContractMaster(MaintenanceContractMasterDto maintenanceContractMasterDto) {
		String saveSqlQuery = "";
		try {
			if(maintenanceContractMasterDto.getId()==0){
				//query check and avoid save duplicate financial year in table
				saveSqlQuery="SELECT count(*) from inv_maintenance_contract_master_new mc where mc.deleted='N' and mc.maintenance_type='"+maintenanceContractMasterDto.getMaintenanceType()+"' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
				sessionFactory.getCurrentSession().merge(maintenanceContractMasterDto);
				return 1;
				}
			}else{
				//query check and avoid save duplicate financial year in table
				saveSqlQuery="SELECT count(*) from inv_maintenance_contract_master_new mc where mc.deleted='N' and mc.maintenance_type='"+maintenanceContractMasterDto.getMaintenanceType()+"'and mc.id not in("+maintenanceContractMasterDto.getId()+") ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
				sessionFactory.getCurrentSession().merge(maintenanceContractMasterDto);
				return 2;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<MaintenanceContractMasterDto> getAllMaintenanceContractMasterRecords(Integer unitId) {
		List<MaintenanceContractMasterDto> lstMaintenanceContractMaster=new ArrayList<MaintenanceContractMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(MaintenanceContractMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstMaintenanceContractMaster= criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstMaintenanceContractMaster;
	}

	@Override
	public MaintenanceContractMasterDto editMaintenanceContractMaster(Integer id) {
		MaintenanceContractMasterDto maintenanceContractMasterDto = new MaintenanceContractMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MaintenanceContractMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			maintenanceContractMasterDto = (MaintenanceContractMasterDto) criteria.uniqueResult();
			return maintenanceContractMasterDto;
		} catch (Exception e) {
			  e.printStackTrace();
		}
		return maintenanceContractMasterDto;
	}

	@Override
	public boolean deleteMaintenanceContractMaster(MaintenanceContractMasterDto maintenanceContractMasterDto) {
		try{
			sessionFactory.getCurrentSession().merge(maintenanceContractMasterDto);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SubInventoryMasterDto> getAllSubInventory(String actionType, String isEdit) {
		List<SubInventoryMasterDto> subInventoryMasterDto = new ArrayList<>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SubInventoryMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			subInventoryMasterDto = criteria.list();
			return subInventoryMasterDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return subInventoryMasterDto;
	}

	@Override
	public Integer getSubInventoryStockRecord(Integer id) {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		
		try {
			
			String sql = "SELECT COUNT(*) FROM inv_subinventory_stock_master WHERE subinventory_id = "+id;
			SQLQuery sqlresult = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlresult.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
}

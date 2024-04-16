package com.hms.inventory.dao.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;

import com.hms.constants.HMSConstants;
import com.hms.inventory.dao.ItemMasterDao;
import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.ItemContractSlaveDto;
import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.ItemPartySlaveDto;
import com.hms.inventory.dto.ItemPurchaseSlaveDto;
import com.hms.inventory.dto.ItemSalesSlaveDto;
import com.hms.inventory.dto.ItemWarehouseSlaveDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class ItemMasterDaoImpl implements ItemMasterDao{
	static Logger log=Logger.getLogger(ItemMasterDaoImpl.class.getName());

	@Autowired
	SessionFactory sessionFactory;
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to save item master and slaves related to item master which are item purchase slave,
	 * item sales slave,item warehouse slave,item party slave
	 */
	@Override
	public int saveItemWarehouseMaster(ItemMasterDto itemMasterDto,ItemWarehouseSlaveDto itemWarehouseSlaveDto,
			String itemPurchaseDetails,String itemSalesDetails,String itemPartyDetails,ItemMaintenanceSlaveDto itemMaintenanceSlaveDto,String itemContractDetails,Model model,HttpServletRequest request) {
		String sqlPurchaseUnit = "";
		String sqlCountQuery = "";
		String sqlPurchaseQuery = "";
		String sqlSalesQuery = "";
		String saveSqlQuery = "";
		String editSqlQuery="";
		float value = 0.0F;
		System.out.println(itemMaintenanceSlaveDto.toString());
		long rowCount = 0L;
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");	
		Integer userId = (Integer) session.getAttribute("userId1");
		try{  
			if(itemMasterDto.getId()==0){
				//query check and avoid save duplicate item name in table
				saveSqlQuery="SELECT count(*) from inv_item_master_new im where im.deleted='N' and im.item_name='"+itemMasterDto.getItemName()+"' and im.unit_id="+unitId;
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					return 3;
				}
				else{
				itemMasterDto.setUnitId(unitId);
				Integer id = (Integer) sessionFactory.getCurrentSession().save(itemMasterDto);
				ItemMasterDto master = (ItemMasterDto) sessionFactory.getCurrentSession().get(ItemMasterDto.class, id);
				itemWarehouseSlaveDto.setObj(master);
				itemMaintenanceSlaveDto.setObj(master);
				sessionFactory.getCurrentSession().merge(itemWarehouseSlaveDto);
				sessionFactory.getCurrentSession().merge(itemMaintenanceSlaveDto);
				
				
				ItemPurchaseSlaveDto itemPurchaseSlaveDto = (ItemPurchaseSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemPurchaseDetails, ItemPurchaseSlaveDto.class);
				List<ItemPurchaseSlaveDto> itemPurchaseSlaveDtos = itemPurchaseSlaveDto.getLstItemPurchaseSlave();
				ItemPartySlaveDto itemPartySlaveDto = (ItemPartySlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemPartyDetails, ItemPartySlaveDto.class);
				List<ItemPartySlaveDto> partySlaveDtos = itemPartySlaveDto.getLstItemPartySlave();
				ItemContractSlaveDto itemContractSlaveDto = (ItemContractSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemContractDetails, ItemContractSlaveDto.class);
				List<ItemContractSlaveDto> itemContractSlaveDtos = itemContractSlaveDto.getLstItemContractSlave();
				itemMasterDto.setItemPurchaseSlaveDto(itemPurchaseSlaveDtos);
				itemMasterDto.setItemPartySlaveDto(partySlaveDtos);
				itemMasterDto.setItemContractSlaveDto(itemContractSlaveDtos);
				itemMasterDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(itemMasterDto);
				return 1;
				}
			}
			else{
				//query check and avoid save duplicate warehouse name in table
				ItemMasterDto master = (ItemMasterDto) sessionFactory.getCurrentSession().get(ItemMasterDto.class, itemMasterDto.getId());
				editSqlQuery="SELECT count(*) from inv_item_master_new im where im.deleted='N' and im.item_name='"+itemMasterDto.getItemName()+"'and im.unit_id="+unitId+" and im.id not in("+itemMasterDto.getId()+")";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(editSqlQuery);	
				int count = ((Number)countQuery.uniqueResult()).intValue();
				if(count > 0){
					return 3;
				}
				if(itemMaintenanceSlaveDto.getMaintenanceId() == 0 || itemMaintenanceSlaveDto.getMaintenanceId() != 0){
					//item maintenance slave update
					itemMaintenanceSlaveDto.setObj(master);
					sessionFactory.getCurrentSession().merge(itemMaintenanceSlaveDto);
					}
				
				ItemSalesSlaveDto itemSalesSlaveDto = (ItemSalesSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemSalesDetails, ItemSalesSlaveDto.class);
				List<ItemSalesSlaveDto> itemSalesSlaveDtos = itemSalesSlaveDto.getLstItemSalesSlave();
				
				
				ItemPurchaseSlaveDto itemPurchaseSlaveDto = (ItemPurchaseSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemPurchaseDetails, ItemPurchaseSlaveDto.class);
				
				List<ItemPurchaseSlaveDto> itemPurchaseSlaveDtos = itemPurchaseSlaveDto.getLstItemPurchaseSlave();
				
				
				ItemPartySlaveDto itemPartySlaveDto = (ItemPartySlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemPartyDetails, ItemPartySlaveDto.class);
				List<ItemPartySlaveDto> partySlaveDtos = itemPartySlaveDto.getLstItemPartySlave();
				
				
				ItemContractSlaveDto itemContractSlaveDto = (ItemContractSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemContractDetails, ItemContractSlaveDto.class);
				List<ItemContractSlaveDto> itemContractSlaveDtos = itemContractSlaveDto.getLstItemContractSlave();
				
				
				List<ItemPurchaseSlaveDto> lstItemPurchaseMaster=new ArrayList<ItemPurchaseSlaveDto>();
				List<ItemContractSlaveDto> lstItemContractMaster = new ArrayList<ItemContractSlaveDto>();
				List<ItemPartySlaveDto> lstItemPartyMaster=new ArrayList<ItemPartySlaveDto>();
				List<ItemSalesSlaveDto> lstItemSalesMaster=new ArrayList<ItemSalesSlaveDto>();
				sqlCountQuery = "select count(*) as id from ItemPurchaseSlaveDto where item_master_id='"+itemMasterDto.getId()+"' and unit_id="+unitId;
				Query getMaster1 = sessionFactory.getCurrentSession().createQuery(sqlCountQuery);
				for(Iterator it=getMaster1.iterate();it.hasNext();)
				{
					rowCount = (Long) it.next();
				}
				if(rowCount > 0 && itemSalesSlaveDtos.size() > 0){
					//purchase slave list against master id
					sqlPurchaseQuery = "select * from inv_item_purchase_slave where item_master_id='"+itemMasterDto.getId()+"' and unit_id="+unitId;
					SQLQuery getPurchaseSlave = sessionFactory.getCurrentSession().createSQLQuery(sqlPurchaseQuery);
					getPurchaseSlave.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listPurchaseItemSales = getPurchaseSlave.list();	
					for(Map<String, Object> row : listPurchaseItemSales){

						ItemPurchaseSlaveDto obj = new ItemPurchaseSlaveDto();	
						obj.setId((Integer)row.get("id"));
						obj.setPurchaseUnitPrice1((Double)row.get("purchase_unit_price_1"));
						obj.setPurchaseUnitPrice2((Double)row.get("purchase_unit_price_2"));
						obj.setPurchaseUnitPrice3((Double)row.get("purchase_unit_price_3"));
						obj.setPurchaseUnitPrice4((Double)row.get("purchase_unit_price_4"));
						obj.setPurchaseUomFactor1((Integer)row.get("purchase_uom_factor_1"));
						obj.setPurchaseUomFactor2((Integer)row.get("purchase_uom_factor_2"));
						obj.setPurchaseUomFactor3((Integer)row.get("purchase_uom_factor_3"));
						obj.setPurchaseUomFactor4((Integer)row.get("purchase_uom_factor_4"));
						obj.setPurchaseFactorUom1((Integer)row.get("purchase_factor_uom_1"));
						obj.setPurchaseFactorUom2((Integer)row.get("purchase_factor_uom_2"));
						obj.setPurchaseFactorUom3((Integer)row.get("purchase_factor_uom_3"));
						obj.setPurchaseFactorUom4((Integer)row.get("purchase_factor_uom_4"));
						obj.setUnitId(unitId);
						obj.setUpdatedBy(userId);
						//obj.setDeleted("Y");
						lstItemPurchaseMaster.add(obj);
					}
					//sales slave list against master id
					sqlSalesQuery = "select * from inv_item_sales_slave where item_master_id='"+itemMasterDto.getId()+"' and unit_id="+unitId;
					SQLQuery getSalesSlave = sessionFactory.getCurrentSession().createSQLQuery(sqlSalesQuery);
					getSalesSlave.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listSales = getSalesSlave.list();	
					for(Map<String, Object> row : listSales){

						ItemSalesSlaveDto obj = new ItemSalesSlaveDto();	
						obj.setId((Integer)row.get("id"));
						obj.setUnitPrice((Integer)row.get("unit_price"));
						obj.setSalesFactorUom((String)row.get("sales_factor_uom"));
						obj.setSalesUomFactor((Integer)row.get("sales_uom_factor"));
						obj.setUnitId(unitId);
						obj.setUpdatedBy(userId);
						lstItemSalesMaster.add(obj);
					}
					lstItemSalesMaster.addAll(itemSalesSlaveDtos);
					sqlPurchaseUnit = "select purchase_unit_price_3 from inv_item_purchase_slave where purchase_factor_uom_1='"+itemSalesSlaveDtos.get(0).getSalesFactorUom()+"' AND item_master_id='"+itemMasterDto.getId()+"' AND unit_id="+unitId+" order BY id DESC LIMIT 1";
					SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sqlPurchaseUnit);
					getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> masterRow = getMaster.list();
					for (Map<String, Object> row : masterRow) {
						value = (float) row.get("purchase_unit_price_3");
					}
					float value1 = itemSalesSlaveDtos.get(0).getUnitPrice();
					float finalValue = value1 - value;
					itemMasterDto.setItemSalesSlaveDto(lstItemSalesMaster);
					itemMasterDto.setItemPurchaseSlaveDto(lstItemPurchaseMaster);
					itemMasterDto.setUnitId(unitId);
					sessionFactory.getCurrentSession().merge(itemMasterDto);
				}
				else{
					//item warehouse slave update
					master = (ItemMasterDto) sessionFactory.getCurrentSession().get(ItemMasterDto.class, itemMasterDto.getId());
					if(itemWarehouseSlaveDto.getWareHouseId() != 0){
					itemWarehouseSlaveDto.setObj(master);
					//sessionFactory.getCurrentSession().merge(itemWarehouseSlaveDto);
					sessionFactory.getCurrentSession().update(itemWarehouseSlaveDto);
					}
					else{
						itemWarehouseSlaveDto.setObj(master);
						sessionFactory.getCurrentSession().merge(itemWarehouseSlaveDto);
					}
//					if(itemMaintenanceSlaveDto.getMaintenanceId() != 0){
//					//item maintenance slave update
//					System.out.println("itemMaintenanceSlaveDto.getMaintenanceId()::"+itemMaintenanceSlaveDto.getMaintenanceId());
//					itemMaintenanceSlaveDto.setObj(master);
//					//sessionFactory.getCurrentSession().merge(itemMaintenanceSlaveDto);
//					sessionFactory.getCurrentSession().update(itemMaintenanceSlaveDto);
//					}
					//sales slave list against master id
					sqlSalesQuery = "select * from inv_item_sales_slave where item_master_id='"+itemMasterDto.getId()+"' and unit_id="+unitId;
					SQLQuery getSalesSlave = sessionFactory.getCurrentSession().createSQLQuery(sqlSalesQuery);
					getSalesSlave.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listSales = getSalesSlave.list();	
					for(Map<String, Object> row : listSales){

						ItemSalesSlaveDto obj = new ItemSalesSlaveDto();	
						obj.setId((Integer)row.get("id"));
						obj.setUnitPrice((Integer)row.get("unit_price"));
						obj.setSalesFactorUom((String)row.get("sales_factor_uom"));
						obj.setSalesUomFactor((Integer)row.get("sales_uom_factor"));
						obj.setDeleted("N");
						obj.setUnitId(unitId);
						obj.setUpdatedBy(userId);
						
						lstItemSalesMaster.add(obj);
					}	
					itemMasterDto.setItemPurchaseSlaveDto(itemPurchaseSlaveDtos);
					itemMasterDto.setItemSalesSlaveDto(lstItemSalesMaster);
					itemMasterDto.setItemPartySlaveDto(lstItemPartyMaster);
					itemMasterDto.setItemContractSlaveDto(lstItemContractMaster);
					itemMasterDto.setItemPartySlaveDto(partySlaveDtos);
					itemMasterDto.setUnitId(unitId);
					itemMasterDto.setItemContractSlaveDto(itemContractSlaveDtos);
					
					sessionFactory.getCurrentSession().merge(itemMasterDto);
					
				}

				return 2;
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for saving saveItemMaster....",e);

			return 0;
		}

	}

	/**
	 * @since 13112019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the all item purchase records w.r.t to master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemPurchaseSlaveDto> getItemPurchaseMasterRecords(Integer masterId,HttpServletRequest request) {
		List<ItemPurchaseSlaveDto> lstItemPurchaseSlave=new ArrayList<ItemPurchaseSlaveDto>();
		String sql = "";
		try{
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");	
			//sql = "select * from inv_item_purchase_slave where item_master_id='"+masterId+"' and unit_id="+unitId+" AND deleted='N' order by id desc";
			sql = "select * from inv_item_purchase_slave where item_master_id='"+masterId+"' AND deleted='N' order by id desc";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listPurchase = getMaster.list();	
			for(Map<String, Object> row : listPurchase){

				ItemPurchaseSlaveDto obj = new ItemPurchaseSlaveDto();	
				obj.setId((Integer)row.get("id"));
				obj.setPurchaseUnitPrice1((Double)row.get("purchase_unit_price_1"));
				obj.setPurchaseUnitPrice2((Double)row.get("purchase_unit_price_2"));
				obj.setPurchaseUnitPrice3((Double)row.get("purchase_unit_price_3"));
				obj.setPurchaseUnitPrice4((Double)row.get("purchase_unit_price_4"));
				obj.setPurchaseUomFactor1((Integer)row.get("purchase_uom_factor_1"));
				obj.setPurchaseUomFactor2((Integer)row.get("purchase_uom_factor_2"));
				obj.setPurchaseUomFactor3((Integer)row.get("purchase_uom_factor_3"));
				obj.setPurchaseUomFactor4((Integer)row.get("purchase_uom_factor_4"));
				obj.setUomUnitOneName((String)row.get("uom_unit_one_name"));
				obj.setUomUnitTwoName((String)row.get("uom_unit_two_name"));
				obj.setUomUnitThreeName((String)row.get("uom_unit_three_name"));
				obj.setUomUnitFourName((String)row.get("uom_unit_four_name"));
				obj.setPurchaseFactorUom1((Integer)row.get("purchase_factor_uom_1"));
				obj.setPurchaseFactorUom2((Integer)row.get("purchase_factor_uom_2"));
				obj.setPurchaseFactorUom3((Integer)row.get("purchase_factor_uom_3"));
				obj.setPurchaseFactorUom4((Integer)row.get("purchase_factor_uom_4"));
				
				
				
				lstItemPurchaseSlave.add(obj);
			}


		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getItemPurchaseMasterRecords....",e);
		}
		return lstItemPurchaseSlave;
	}

	/**
	 * @since 13112019
	 * @comment This method is created for to edit the item purchase slave w.r.t id 
	 * @param id
	 * @author
	 * @return
	 */
	@Override
	public ItemPurchaseSlaveDto editItemPurchaseSlave(Integer id,HttpServletRequest request) {
		ItemPurchaseSlaveDto itemPurchaseSlaveDto = new ItemPurchaseSlaveDto();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ItemPurchaseSlaveDto.class);
			criteria.add(Restrictions.eq("id",id));
			// this is commented by Vishnu 01-04-2021 without unitId filter
			//criteria.add(Restrictions.eq("unitId",unitId));
			itemPurchaseSlaveDto = (ItemPurchaseSlaveDto) criteria.uniqueResult();
			return itemPurchaseSlaveDto;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  editItemPurchaseSlave....",e);
		}
		return itemPurchaseSlaveDto;
	}
	/**
	 * @since 13112019
	 * @comment This method is created for to update item purchase slave 
	 * @author Rohit Sandbhor
	 * @param itemPurchaseSlaveDto
	 * @param request
	 * @return
	 */
	@Override
	public int updateItemPurchaseSlave(ItemPurchaseSlaveDto itemPurchaseSlaveDto,HttpServletRequest request) {
		sessionFactory.getCurrentSession().merge(itemPurchaseSlaveDto);
		return 1;				
	}

	/**
	 * @since 13112019
	 * @comment This method is created to get item sales slaves w.r.t master id
	 * @author Rohit Sandbhor
	 * @param masterId
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemSalesSlaveDto> getItemSalesSlaveRecords(Integer masterId,HttpServletRequest request) {
		List<ItemSalesSlaveDto> lstItemSalesSlave=new ArrayList<ItemSalesSlaveDto>();
		String sql = "";
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			sql = "select * from inv_item_sales_slave where item_master_id='"+masterId+"' and unit_id="+unitId+" order by id desc";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listPurchase = getMaster.list();	
			for(Map<String, Object> row : listPurchase){

				ItemSalesSlaveDto obj = new ItemSalesSlaveDto();	
				obj.setId((Integer)row.get("id"));
				obj.setUnitPrice((Integer)row.get("unit_price"));
				obj.setSalesFactorUom((String)row.get("sales_factor_uom"));
				obj.setSalesUomFactor((Integer)row.get("sales_uom_factor"));

				lstItemSalesSlave.add(obj);
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getItemSalesSlaveRecords....",e);
		}
		return lstItemSalesSlave;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get all item master records
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemMasterDto> getAllItemMasterRecords(Integer unitId,HttpServletRequest request) {
		List<ItemMasterDto> lstItemMaster=new ArrayList<ItemMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ItemMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId ));
			criteria.setMaxResults(10);
			criteria.addOrder(Order.desc("id"));
			lstItemMaster=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getAllItemMasterRecords....",e);
		}
		return lstItemMaster;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get item master details by passing itemName as parameter
	 * @param itemName
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemMasterDto> searchByItemName(String itemName,
			HttpServletRequest request) {
		List<ItemMasterDto> lstItemMaster=new ArrayList<ItemMasterDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ItemMasterDto.class);
			criteria.add(Restrictions.like("itemName", itemName,MatchMode.ANYWHERE));
			criteria.add(Restrictions.eq("unitId",unitId ));
			lstItemMaster=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  searchByItemName....",e);
		}
		return lstItemMaster;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for edit the Item master w.r.t id
	 * @param id
	 * @return
	 */
	@Override
	public ItemMasterDto editItemMaster(Integer id,HttpServletRequest request) {
		ItemMasterDto itemMasterDto = new ItemMasterDto();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ItemMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			criteria.add(Restrictions.eq("unitId",unitId ));
			itemMasterDto = (ItemMasterDto) criteria.uniqueResult();
			return itemMasterDto;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  editItemMaster....",e);
		}
		return itemMasterDto;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for edit the item sales slave records w.r.t id
	 * @param id
	 * @return
	 */
	@Override
	public ItemSalesSlaveDto editItemSalesSlave(Integer id,HttpServletRequest request) {
		ItemSalesSlaveDto itemSalesSlaveDto = new ItemSalesSlaveDto();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ItemSalesSlaveDto.class);
			criteria.add(Restrictions.eq("id",id));
			criteria.add(Restrictions.eq("unitId",unitId ));
			itemSalesSlaveDto = (ItemSalesSlaveDto) criteria.uniqueResult();
			return itemSalesSlaveDto;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  editItemSalesSlave....",e);
		}
		return itemSalesSlaveDto;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to update the item sales slave details
	 * @param itemSalesSlaveDto
	 * @param request
	 * @return
	 */
	@Override
	public int updateItemSalesSlave(ItemSalesSlaveDto itemSalesSlaveDto,HttpServletRequest request) {
		sessionFactory.getCurrentSession().merge(itemSalesSlaveDto);
		return 1;				
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get auto suggestion on party slave by party name
	 * @param partyName
	 * @return
	 */
	@Override
	public PartyMasterDto autoSuggestionsOnPartyMasterName(String partyName,HttpServletRequest request) {
		PartyMasterDto partyMasterDto = new PartyMasterDto();
		List<PartyMasterDto> partyList = new ArrayList<PartyMasterDto> ();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql = "SELECT p.id AS id,p.party_master_name " +
					"AS party_master_name FROM inv_party_master_new p where p.party_master_name like '%"+partyName+"%' " +
					"and p.deleted='N' and p.party_master_status='Continue' and unit_id="+unitId; 
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
			for(Map<String, Object> row : masterRow){
				PartyMasterDto obj = new PartyMasterDto();
				obj.setName((String)row.get("party_master_name"));
				obj.setId((Integer)row.get("id"));
				partyList.add(obj);		    	
			}
			partyMasterDto.setPartyMasterDto(partyList);

		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  autoSuggestionsOnPartyMasterName....",e);
			return null;
		}
		return partyMasterDto;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get the next item master id
	 * @param tableName
	 * @param request
	 * @return
	 */
	@Override
	public int getNextIdNew(String tableName,
			HttpServletRequest request) {
		Integer id = 0;
		String sql = null;
		sql = "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = '"
				+ tableName.toString()
				+ "' AND table_schema = '"
				+ HMSConstants.DATABASENAME + "' ";
		System.err.println(sql);
		try {
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, BigInteger>> masterRow = getMaster.list();		          
			for(Map<String, BigInteger> row : masterRow){
			id = ((BigInteger) row.get("AUTO_INCREMENT")).intValue();
			}
			return id;
		} catch (Exception e) {

			e.printStackTrace();
			log.error("error for  getNextIdNew....",e);
		}
		return id;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get auto fill search on item master by passing item name as parameter
	 * @param itemName
	 * @return
	 */
	@Override
	public ItemMasterDto autoFillSearchItemMaster(String itemName, String searchAssetOrServiceItem, HttpServletRequest request) {
		ItemMasterDto itemMasterDto = new ItemMasterDto();
		List<ItemMasterDto> lstItemMaster = new ArrayList<ItemMasterDto> ();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		
		try {
			String sql = "";
			if(searchAssetOrServiceItem.equalsIgnoreCase("Service")){
				
				sql = "SELECT i.id AS id,i.item_name " +
						"AS item_name FROM inv_item_master_new i where i.item_name like '%"+itemName+"%' " +
						"and i.deleted='N' and unit_id="+unitId+" and i.service_item_status=1";
				
			}else if(searchAssetOrServiceItem.equalsIgnoreCase("Asset")){
				
				sql = "SELECT i.id AS id,i.item_name " +
						"AS item_name FROM inv_item_master_new i where i.item_name like '%"+itemName+"%' " +
						"and i.deleted='N' and unit_id="+unitId+" and i.asset_item_status=1";
				
			}else if(searchAssetOrServiceItem.equalsIgnoreCase("All")){
				
				sql = "SELECT i.id AS id,i.item_name " +
						"AS item_name FROM inv_item_master_new i where i.item_name like '%"+itemName+"%' " +
						"and i.deleted='N' and unit_id="+unitId;
			}
			
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
			for(Map<String, Object> row : masterRow){
				ItemMasterDto obj = new ItemMasterDto();
				obj.setItemName((String)row.get("item_name"));
				obj.setId((Integer)row.get("id"));
				lstItemMaster.add(obj);		    	
			}
			itemMasterDto.setLstItemMaster(lstItemMaster);

		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  autoFillSearchItemMaster....",e);
			return null;
		}
		return itemMasterDto;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get the item master details w.r.t id
	 * @param id
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemMasterDto> searchByItemMasterId(Integer id,
			HttpServletRequest request) {
		List<ItemMasterDto> lstItemMaster=new ArrayList<ItemMasterDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ItemMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstItemMaster=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  searchByItemMasterId....",e);
		}
		return lstItemMaster;
	}
	
	/**
	 * @since 13112019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the all item warehouse records w.r.t to master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@Override
	public ItemWarehouseSlaveDto getItemWarehouseSlaveRecord(Integer masterId,HttpServletRequest request) {
		ItemWarehouseSlaveDto obj = new ItemWarehouseSlaveDto();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
	try {
		String sql = "SELECT iw.id AS id,iw.warehouse_name " +
				"AS warehouse_name,iw.warehouse_location AS warehouse_location FROM inv_item_warehouse_slave iw where iw.item_master_id = '"+masterId+"%' " +
				"and iw.deleted='N' and unit_id="+unitId;
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
		List<Map<String, Object>> masterRow = getMaster.list();		          
		for(Map<String, Object> row : masterRow){
			obj.setWarehouseName((String)row.get("warehouse_name"));
			obj.setWarehouseLocation((String)row.get("warehouse_location"));
			obj.setWareHouseId((Integer)row.get("id"));
		}
	} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  getItemWarehouseSlaveRecord....",e);
	}
	return obj;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment created this function to delete item master and his all related slaves
	 * @param id
	 * @param request
	 * @return
	 */
	@Override
	public boolean deleteItemMasterNew(Integer id, HttpServletRequest request) {
		try {
			
			ItemMasterDto itemMasterDto = (ItemMasterDto) sessionFactory
					.getCurrentSession().get(ItemMasterDto.class, id);
			itemMasterDto.setDeleted("Y");
			itemMasterDto.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			itemMasterDto.setDeleted_by(userId);
			Query queryPurchase = sessionFactory.getCurrentSession().createSQLQuery("update inv_item_purchase_slave set deleted='Y',deleted_by="+userId+",delete_date_time=now() where item_master_id="+id);
			queryPurchase.executeUpdate();
			
			Query querySales = sessionFactory.getCurrentSession().createSQLQuery("update inv_item_sales_slave set deleted='Y',deleted_by="+userId+",delete_date_time=now() where item_master_id="+id);
			querySales.executeUpdate();
			
			Query queryWarehouse = sessionFactory.getCurrentSession().createSQLQuery("update inv_item_warehouse_slave set deleted='Y',deleted_by="+userId+",delete_date_time=now() where item_master_id="+id);
			queryWarehouse.executeUpdate();
			
			Query queryParty = sessionFactory.getCurrentSession().createSQLQuery("update inv_item_party_slave set deleted='Y',deleted_by="+userId+",delete_date_time=now() where item_master_id="+id);
			queryParty.executeUpdate();
			sessionFactory.getCurrentSession().merge(itemMasterDto);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  deleteItemMasterNew....",e);
			return false;
		}
	}
	
	/**
	 * @since 13112019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the all item party records w.r.t to master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemPartySlaveDto> getItemPartySlaveRecord(Integer masterId,HttpServletRequest request) {
		List<ItemPartySlaveDto> lstItemPartySlave=new ArrayList<ItemPartySlaveDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
	try {
		// this is commented by Vishnu 01-04-2021 without unitId filter
		/*String sql = "SELECT ip.id AS id,ip.party_name " +
				"AS party_name,party_master_id as party_master_id,item_master_name as item_master_name,delete_date_time as delete_date_time,unit_id as unit_id,created_date_time as created_date_time,updated_date_time as updated_date_time FROM inv_item_party_slave ip where ip.item_master_id = '"+masterId+"%' " +
				"and ip.deleted='N' and unit_id="+unitId;*/
		
		String sql = "SELECT ip.id AS id,ip.party_name " +
				"AS party_name,party_master_id as party_master_id,item_master_name as item_master_name,delete_date_time as delete_date_time,unit_id as unit_id,created_date_time as created_date_time,updated_date_time as updated_date_time FROM inv_item_party_slave ip where ip.item_master_id = '"+masterId+"%' " +
				" and ip.deleted='N'";
		
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
		List<Map<String, Object>> masterRow = getMaster.list();		          
		for(Map<String, Object> row : masterRow){
			ItemPartySlaveDto obj = new ItemPartySlaveDto();
			
			obj.setId((Integer)row.get("id"));
			
			
			obj.setPartyMasterId((Integer)row.get("party_master_id"));
			obj.setPartyName((String)row.get("party_name"));
			obj.setItemMasterName((String)row.get("item_master_name"));
			//obj.setCreatedBy((Integer)row.get("created_by"));
			//obj.setUpdatedBy((Integer)row.get("updated_by"));
			//obj.setDeleted_by((Integer)row.get("deleted_by"));
			obj.setDeletedDate((Date)row.get("delete_date_time"));
			obj.setUnitId((Integer)row.get("unit_id"));
			obj.setCreatedDateTime((Date)row.get("created_date_time"));
			obj.setUpdatedDateTime((Date)row.get("updated_date_time"));
			obj.setDeleted("N");
			
			
			lstItemPartySlave.add(obj);
		}
	} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  getItemPartySlaveRecord....",e);
	}
	return lstItemPartySlave;
	}
	
	/**
	 * 
	 */
	@Override
	public PartyMasterDto autoFillSearchOnPartyMaster(String supplierName,HttpServletRequest request) {
		PartyMasterDto partyMasterDto = new PartyMasterDto();
		List<PartyMasterDto> partyList = new ArrayList<PartyMasterDto> ();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql = "SELECT pm.id AS id,pm.party_master_name " +
					"AS party_master_name FROM inv_party_master_new pm where pm.party_master_name like '"+supplierName+"%' " +
					"and pm.deleted='N' and pm.party_master_status='Continue' and unit_id="+unitId+" limit 20";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
			for(Map<String, Object> row : masterRow){
				PartyMasterDto obj = new PartyMasterDto();
				obj.setName((String)row.get("party_master_name"));
				obj.setId((Integer)row.get("id"));
				partyList.add(obj);		    	
			}
			
			partyMasterDto.setPartyMasterDto(partyList);

		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  autoFillSearchOnPartyMaster....",e);
			return null;
		}
		return partyMasterDto;
	}

	@Override
	public PartyMasterDto searchByPartyMasterId(Integer id,
			HttpServletRequest request) {
		PartyMasterDto lstPartyMaster=new PartyMasterDto();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PartyMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.eq("status","Continue"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			
			lstPartyMaster=	(PartyMasterDto) criteria.uniqueResult();
			}
		 catch (Exception e) {
				e.printStackTrace();
				log.error("error for  searchByPartyMasterId....",e);
		}
		return lstPartyMaster;
	}

	@Override
	public List<InventoryTaxSetUpMDTO> getAllHSNList(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				InventoryTaxSetUpMDTO.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId",unitId));
		return criteria.list();
	}

	@Override
	public InventoryTaxSetUpMDTO getHSNDetails(Integer hsnId, Integer unitId,HttpServletRequest request) {
		InventoryTaxSetUpMDTO taxSetUpMDTO = new InventoryTaxSetUpMDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(InventoryTaxSetUpMDTO.class);
			criteria.add(Restrictions.eq("tax_id", hsnId));
			criteria.add(Restrictions.eq("unitId", unitId));
			taxSetUpMDTO = (InventoryTaxSetUpMDTO) criteria.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  getHSNDetails....",e);
		}
		return taxSetUpMDTO;
	}

	/**
	 * 
	 */
	@Override
	public ItemPartySlaveDto editItemPartySlave(Integer id,HttpServletRequest request) {
		ItemPartySlaveDto itemPartySlaveDto = new ItemPartySlaveDto();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ItemPartySlaveDto.class);
			criteria.add(Restrictions.eq("id",id));
			// this is commented by Vishnu 01-04-2021
			//criteria.add(Restrictions.eq("unitId", unitId));
			itemPartySlaveDto = (ItemPartySlaveDto) criteria.uniqueResult();
			return itemPartySlaveDto;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  editItemPartySlave....",e);
		}
		return itemPartySlaveDto;
	}
	
	/**
	 * 
	 */
	@Override
	public int updateItemPartySlave(ItemPartySlaveDto itemPartySlaveDto,HttpServletRequest request) {
		sessionFactory.getCurrentSession().merge(itemPartySlaveDto);
		return 1;
	}

	@Override
	public Integer getPageCountAllItemMaster(HttpServletRequest request) {
		Integer countNew = 0;
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql="";
			sql = "SELECT count(*) FROM inv_item_master_new as sub WHERE deleted != 'Y' and unit_id="+unitId;
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			countNew = ((Number)countQuery.uniqueResult()).intValue();
		} catch (Exception e) {
			log.error("error for  getPageCountAllItemMaster...."+e.getMessage());
			e.printStackTrace();
		}
		return countNew;
	}

	@Override
	public ItemMasterDto getItemMasterPagination(Integer startIndex,HttpServletRequest request) {
		ItemMasterDto itemMasterDto = new ItemMasterDto();
		List<ItemMasterDto> lstItemMaster=new ArrayList<ItemMasterDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String sql = "";
		try {
			sql = "SELECT * from inv_item_master_new where deleted != 'Y'and unit_id="+unitId+" order by id desc";
			if(sql != null) {
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		 		 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 		 query.setFirstResult(startIndex);
		 		 query.setMaxResults(10);
		 		List<Map<String, Object>> list=query.list();
		 		for(Map<String, Object> row : list){
		 			ItemMasterDto obj=new ItemMasterDto();
		 			obj.setId((Integer)row.get("id"));
					obj.setItemName((String)row.get("item_name"));
					obj.setCategoryType((String)row.get("category_type"));
					obj.setLeadTime((String)row.get("lead_time"));
					obj.setPriority((String)row.get("priority"));
					obj.setCreatedDateTime((Date)row.get("created_date_time"));
					lstItemMaster.add(obj);
				}
		 		
			}
		} catch (Exception e) {
			log.error("error for  getPageCountAllItemMaster....",e);
			e.printStackTrace();
		}
		itemMasterDto.setLstItemMaster(lstItemMaster);
		return itemMasterDto;

	}
	
	/**
	 * 
	 */
	@Override
	public List<ItemContractSlaveDto> getItemContractSlaveRecord(Integer masterId) {
		List<ItemContractSlaveDto> list = new ArrayList<ItemContractSlaveDto>();
		try {
			String sql = "SELECT ic.id AS id,ic.party_name_contract " +
					"AS party_name_contract,ic.rate_value AS rate_value,ic.priority as priority,ic.mrp_value as mrp_value,ic.reference_no as reference_no,ic.profit_value as profit_value,ic.from_date as from_date,ic.to_date as to_date,ic.with_contract as with_contract,ic.party_master_id as party_master_id,upload_document_name as upload_document_name FROM inv_item_contract_slave ic where ic.item_master_id = '"+masterId+"%' " +
					"and ic.deleted='N'";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
			for(Map<String, Object> row : masterRow){
				ItemContractSlaveDto obj = new ItemContractSlaveDto();
				obj.setId((Integer)row.get("id"));
				obj.setCreatedDateTime((Date)row.get("created_date_time"));
				obj.setUpdatedDateTime((Date)row.get("updated_date_time"));
				obj.setPartyNameContract((String)row.get("party_name_contract"));
				obj.setRateValue((Double)row.get("rate_value"));
				obj.setPriorityContract((String)row.get("priority"));
				obj.setMrpValue((Double)row.get("mrp_value"));
				obj.setReferenceNo((String)row.get("reference_no"));
				obj.setProfitValue((Double)row.get("profit_value"));
				obj.setFromDate((String)row.get("from_date"));
				obj.setToDate((String)row.get("to_date"));
				obj.setWithContract((String)row.get("with_contract"));
				obj.setPartyMasterIdContact((Integer)row.get("party_master_id"));
				obj.setUploadDocumentName((String)row.get("upload_document_name"));
				list.add(obj);
				
			}
		} catch (Exception e) {
				e.printStackTrace();
				log.error("error for  getItemContractSlaveRecord....",e);
		}
		return list;
	}
	
	/**
	 * 
	 */
	@Override
	public ItemMaintenanceSlaveDto getMaintenanceDetailsByItemMasterId(
			Integer masterId) {
		ItemMaintenanceSlaveDto obj = new ItemMaintenanceSlaveDto();
		try {
			String sql = "SELECT im.id AS id,im.warranty_with_product " +
					"AS warranty_with_product,im.warranty_with_product_duration,im.amccmc_free_text_duration AS amccmc_free_text_duration,im.amc_cmc_duration as amc_cmc_duration,im.preventive_maintenance_free_text_duration as preventive_maintenance_free_text_duration,im.preventive_maintenance_duration as preventive_maintenance_duration FROM inv_item_maintenance_slave im where im.item_master_id = '"+masterId+"%' " +
					"and im.deleted='N'";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
			for(Map<String, Object> row : masterRow){
				obj.setWarrantyWithProduct((String)row.get("warranty_with_product"));
				obj.setWarrantyWithProductDuration((Integer)row.get("warranty_with_product_duration"));
				obj.setAmccmcFreeTextDuration((Integer)row.get("amccmc_free_text_duration"));
				obj.setAmccmcDuration((String)row.get("amc_cmc_duration"));
				obj.setPreventiveMaintenanceFreeTextDuration((Integer)row.get("preventive_maintenance_free_text_duration"));
				obj.setPreventiveMaintenanceDuration((String)row.get("preventive_maintenance_duration"));
				obj.setMaintenanceId((Integer)row.get("id"));
			}
		} catch (Exception e) {
				e.printStackTrace();
				log.error("error for  getMaintenanceDetailsByItemMasterId....",e);
		}
		return obj;
	}

	@Override
	public Integer updateContractDetailsSlave(Integer contractSlaveId,
			String uploadContractDocument) {
		try {
			Query queryPurchase = sessionFactory.getCurrentSession().createSQLQuery("update inv_item_contract_slave set upload_document_name='"+uploadContractDocument+"',updated_date_time=now() where id="+contractSlaveId);
			queryPurchase.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 1;
	}

	@Override
	public boolean deleteItemPurchaseSlaveNew(Integer id,Integer itemMasterId,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			ItemPurchaseSlaveDto itemPurchaseSlaveDto = (ItemPurchaseSlaveDto) sessionFactory.getCurrentSession().get(ItemPurchaseSlaveDto.class, id);
			Query queryPurchase = sessionFactory.getCurrentSession().createSQLQuery("update inv_item_purchase_slave set deleted='Y',deleted_by="+userId+",delete_date_time=now() where id="+id);
			queryPurchase.executeUpdate();
			sessionFactory.getCurrentSession().merge(itemPurchaseSlaveDto);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  deleteItemMasterNew....",e);
			return false;
		}
		
	}
	
}

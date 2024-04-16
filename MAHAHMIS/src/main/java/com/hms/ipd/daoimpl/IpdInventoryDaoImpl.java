package com.hms.ipd.daoimpl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dto.ItemMasterDto;
import com.hms.ipd.dao.IpdInventoryDao;

@Repository
public class IpdInventoryDaoImpl implements IpdInventoryDao{
	
	private static final Logger LOGGER=Logger.getLogger(IPDManagementDAOImpl.class.getName());
	
	private @Autowired SessionFactory sessionFactory;
	
	
	@Override
	public Integer getMaterailRequestNoteNextId() {
		LOGGER.info("Inside IpdInventoryDaoImpl method getMaterailRequestNoteNextId called with table name ");
		BigInteger nextId ;
		Integer id=0;
		try {
			nextId = (BigInteger) sessionFactory
					.getCurrentSession().createSQLQuery("SELECT IFNULL(max(process_id),0) as process_id FROM inv_cssd_master").uniqueResult();
			id = nextId.intValue() + 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("Next mrn_id:"+ id);
		return id;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ItemMasterDto> fetchItemNamesOnlyAutoSuggestForCssdItems(String letter) {

		List<ItemMasterDto> ltmaster = new ArrayList<ItemMasterDto>();
		String sql;
		try {
			Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_search_cssd_item(:unit_id,:p_letter)");
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
	public Integer getAvalQuantityCsd(String itemName, String deptName, int itemCode) {
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
	
	
}

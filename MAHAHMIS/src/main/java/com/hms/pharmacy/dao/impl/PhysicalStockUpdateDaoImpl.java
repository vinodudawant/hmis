package com.hms.pharmacy.dao.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.transform.Transformers;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.hms.pharmacy.dao.PhysicalStockUpdateDao;
import com.hms.pharmacy.pojo.StockOutEntry;
import com.hms.pharmacy.pojo.VoucherNumberPhysicalStock;

@Repository
public class PhysicalStockUpdateDaoImpl implements PhysicalStockUpdateDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	HttpSession httpSession;
	
	Map<String, String> result = new HashMap<String, String>();
	
	@Override
	public Map<String, String> saveOrUpdatePhyStock(StockOutEntry stockOutEntry) {
        try {
        	//stockOutEntry.setStockOutId(25);
        	
        	Query query=sessionFactory.getCurrentSession().createQuery("from StockOutEntry where stockBatchId=? and productId=? and stockEntryType=?").setCacheable(true);
        	query.setParameter(0, stockOutEntry.getStockBatchId());
        	query.setParameter(1, stockOutEntry.getProductId());
        	query.setParameter(2, 2);
        	
        	if(query.list().size()>0){
        		Query query1=sessionFactory.getCurrentSession().createQuery("update StockOutEntry set physicalStock=?,voucher_no=? where stockBatchId=? and productId=? and stockEntryType=?").setCacheable(true);
            	query1.setParameter(0, stockOutEntry.getPhysicalStock());
            	query1.setParameter(1, stockOutEntry.getVoucher_no());
            	query1.setParameter(2, stockOutEntry.getStockBatchId());
            	query1.setParameter(3, stockOutEntry.getProductId());
            	query1.setParameter(4, 2);
            	
            	query1.executeUpdate();
            	result.put("result", "Record Save Succesfully");
        	}
        	
        	else{
				sessionFactory.getCurrentSession().saveOrUpdate(stockOutEntry);
				result.put("result", "Record Save Succesfully");
        	}
	     	} 
        catch (Exception e) {
		e.printStackTrace();
	  }
		return result;
	}
	
	@Override
	public void saveVoucherNumber(Integer voucherno) {
		Query query=sessionFactory.getCurrentSession().createSQLQuery("insert into pharma_voucher(voucher_no,created_by,created_date,created_user_name) values(?,?,?,?)");
		query.setParameter(0, voucherno);
		query.setParameter(1, httpSession.getAttribute("userId1"));
		query.setParameter(2, new Date());
		query.setParameter(3, httpSession.getAttribute("userName"));
		
		query.executeUpdate();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getVoucherNumbers() {
		Query query=sessionFactory.getCurrentSession().createQuery("from VoucherNumberPhysicalStock").setCacheable(true);
		return query.list();
	}
	/*****
	 * @author   :BILAL
	 * @Date     :11-12-2017
	 * @Code     :For voucher number list
	 * *****/
	@SuppressWarnings("unchecked")
	@Override
	public List<VoucherNumberPhysicalStock> getVoucherNumbersList() {
		
		List<VoucherNumberPhysicalStock> ltsvoucher = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VoucherNumberPhysicalStock.class);
			
			criteria.addOrder(Order.desc("voucherNo"));	
			ltsvoucher = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltsvoucher;
		}
		return ltsvoucher;
	}

	@Override
	public List<StockOutEntry> getPhyStockUpdateDetails() {
		try {
			Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_physical_stock_update_details()");
			query.setResultTransformer(Transformers.aliasToBean(StockOutEntry.class));
			@SuppressWarnings("unchecked")
			List<StockOutEntry> lst = query.list();
			return lst;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	
	}
	
	}

	

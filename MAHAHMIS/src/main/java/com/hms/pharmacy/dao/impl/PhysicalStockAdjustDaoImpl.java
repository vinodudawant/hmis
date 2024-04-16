package com.hms.pharmacy.dao.impl;

import java.math.BigInteger;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.json.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.*;
import com.hms.pharmacy.pojo.*;

@Repository
public class PhysicalStockAdjustDaoImpl implements PhysicalStockAdjustDao {
	@Autowired
	SessionFactory sessionFactory;

	Map<String, String> result = new HashMap<String, String>();

	@Override
	public void savePhysicalStockOutEntry(String jsonString) {

		/*
		 * String arr[] = jsonString.split(",");
		 * 
		 * for (int i = 0; i < arr.length; i++) { StockOutEntry stockOutEntry = new
		 * StockOutEntry(); stockOutEntry.setProductId(Integer.parseInt(arr[i++]));
		 * stockOutEntry.setStockBatchId(Integer.parseInt(arr[i++])); //
		 * stockOutEntry.setStockId(Integer.parseInt(arr[i++])); // Integer
		 * clsStock=Integer.parseInt(arr[i]);
		 * stockOutEntry.setStockOutClosingStock(Integer.parseInt(arr[i++]));
		 * stockOutEntry.setPhysicalStock(Integer.parseInt(arr[i]));
		 * //stockOutEntry.setStockOutCurrentStock(Double.parseDouble(arr[i++]));
		 * stockOutEntry.setStockOutCurrentStock(Integer.parseInt(arr[i++]));
		 * stockOutEntry.setQty(Integer.parseInt(arr[i]));
		 * 
		 * 
		 * 
		 * Query query = sessionFactory.getCurrentSession().createQuery(
		 * "update StockMaster set stockQtyInHand=? where stockProductMaster.productId=? and batchMaster.batchId=?"
		 * );
		 * 
		 * Query query=sessionFactory.getCurrentSession().
		 * createSQLQuery("update pharma_stock_master set stock_qty_in_hand=? where stock_product_id=? and stock_batch_id=?"
		 * ); double qty= stockOutEntry.getPhysicalStock(); query.setParameter(0, qty);
		 * query.setParameter(1, stockOutEntry.getProductId()); query.setParameter(2,
		 * stockOutEntry.getStockBatchId()); // query.setParameter(3,
		 * stockOutEntry.getStockId());
		 * 
		 * query.executeUpdate();
		 * 
		 * Query query1 = sessionFactory.getCurrentSession().createQuery(
		 * "update StockOutEntry set stockOutClosingStock=?,stockOutCurrentStock=?,physicalStock=?,qty=?,stockOutDate=? where productId=? and stockBatchId=? and stockEntryType=?"
		 * ); query1.setParameter(0, stockOutEntry.getStockOutClosingStock());
		 * query1.setParameter(1, stockOutEntry.getPhysicalStock());
		 * query1.setParameter(2, stockOutEntry.getPhysicalStock());
		 * query1.setParameter(3, stockOutEntry.getQty()); query1.setParameter(4, new
		 * Date()); query1.setParameter(5, stockOutEntry.getProductId());
		 * query1.setParameter(6, stockOutEntry.getStockBatchId());
		 * query1.setParameter(7, 2);
		 * 
		 * query1.executeUpdate();
		 * 
		 * 
		 * }
		 */
		

		
		String arr[]=jsonString.split(",");
	
		for(int i=0;i<arr.length;i++){
			StockOutEntry stockOutEntry=new StockOutEntry();
			stockOutEntry.setProductId(Integer.parseInt(arr[i++]));
			stockOutEntry.setStockBatchId(Integer.parseInt(arr[i++]));
			BigInteger stock = new BigInteger(arr[i++]);
			stockOutEntry.setStockOutClosingStock(stock);
			BigInteger phystock = new BigInteger(arr[i++]);
			stockOutEntry.setPhysicalStock(phystock);
			BigInteger currentStock = new BigInteger(arr[i++]);
			stockOutEntry.setStockOutCurrentStock(currentStock);
			//stockOutEntry.setQty(Integer.parseInt(arr[i]));
		
			Query query=sessionFactory.getCurrentSession().createSQLQuery("update pharma_stock_master set stock_qty_in_hand=? where stock_product_id=? and stock_batch_id=?");
			query.setParameter(0, stockOutEntry.getPhysicalStock());
			query.setParameter(1, stockOutEntry.getProductId());
			query.setParameter(2, stockOutEntry.getStockBatchId());
			//query.setParameter(3, stockOutEntry.getStockId());
			
			query.executeUpdate();
			
			Query query1=sessionFactory.getCurrentSession().createSQLQuery("update pharma_stock_out_entry set stock_out_closing_stock=?,stock_out_current_stock=?,physical_stock=?,stock_out_qty=?,stock_out_date=? where stock_out_productid=? and stock_out_batchId=? and stock_entry_type=?");
			query1.setParameter(0, stockOutEntry.getStockOutClosingStock());
			query1.setParameter(1, stockOutEntry.getPhysicalStock());
			query1.setParameter(2, stockOutEntry.getPhysicalStock());
			query1.setParameter(3, stockOutEntry.getQty());
			query1.setParameter(4, new Date());
			query1.setParameter(5, stockOutEntry.getProductId());
			query1.setParameter(6, stockOutEntry.getStockBatchId());
			query1.setParameter(7, 2);
			
			query1.executeUpdate();
			
			//sessionFactory.getCurrentSession().save(stockOutEntry);
		}
	
	}

	// added by Akshata
	@Override
	public List<StockOutEntry> getStockEntryDetailsForAdj() {
		try {
			Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_stock_entry_adjust_details()");
			query.setResultTransformer(Transformers.aliasToBean(StockOutEntry.class));
			@SuppressWarnings("unchecked")
			List<StockOutEntry> lst = query.list();
			return lst;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// added By akshata
	@Override
	public List<StockOutEntry> getStockEntryDetailByBatchId(Integer BatchId) {
		try {
			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery("CALL sp_get_stock_entry_details_by_batch_id(:p_batch_id) ");
			query.setParameter("p_batch_id", BatchId);
			query.setResultTransformer(Transformers.aliasToBean(StockOutEntry.class));
			@SuppressWarnings("unchecked")
			List<StockOutEntry> lst = query.list();
			return lst;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// added by akshata
	@Override
	public List<StockOutEntry> getStockEntryDetailByVoucherNo(String voucher_no) {
		try {
			Integer id= Integer.parseInt(voucher_no);
			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery("CALL sp_get_stock_entry_details_by_voucher_no(:p_vou_no)");
			query.setParameter("p_vou_no", id);
			query.setResultTransformer(Transformers.aliasToBean(StockOutEntry.class));
			@SuppressWarnings("unchecked")
			List<StockOutEntry> lst = query.list();
			return lst;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<StockOutEntry> getStockEntryDetailByProductId(Integer productId) {
		// TODO Auto-generated method stub
		try {
			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery(" CALL sp_get_stock_entry_details_by_product_id(:p_product_id)");
			query.setParameter("p_product_id", productId);
			query.setResultTransformer(Transformers.aliasToBean(StockOutEntry.class));
			@SuppressWarnings("unchecked")
			List<StockOutEntry> lst = query.list();
			return lst;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}

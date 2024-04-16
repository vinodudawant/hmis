package com.hms.pharmacy.dao.impl;

import java.math.BigDecimal;
import java.math.BigInteger;
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
import org.json.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.*;
import com.hms.pharmacy.pojo.*;

@Repository
public class StockOutEntryDaoImpl  implements StockOutEntryDao
{
	@Autowired
	SessionFactory sessionFactory;

	Map<String, String> result = new HashMap<String, String>();
	
	@Override
	public Map<String, String> saveOrUpdateStockOutEntry(StockOutEntry stockOutEntry) {
		// TODO Auto-generated method stub
		try {
			
			Double totalStock=0.0;
			BigInteger stock = null;
			if(stockOutEntry.getStockEntryType()==0)				
				{
				totalStock=decreaseStock(stockOutEntry.getStockBatchId(),
						stockOutEntry.getQty());
				stock=BigDecimal.valueOf(totalStock).toBigInteger();
				stockOutEntry.setStockOutCurrentStock(stock);
				}
			else
				{
				totalStock=increaseStock(stockOutEntry.getStockBatchId(),
						stockOutEntry.getQty());
				stock=BigDecimal.valueOf(totalStock).toBigInteger();
				stockOutEntry.setStockOutCurrentStock(stock);
				}
			
			
			
			int id=(Integer) sessionFactory.getCurrentSession().save(stockOutEntry);
			
				result.put("result", id+"");
				
		} 
    catch (Exception e) {
		e.printStackTrace();
	}
		return result;
	}
	
	public Double increaseStock(Integer batchId, Integer total) {
		
		Double totalStock = 0.0;
		try {
			Query query = sessionFactory.getCurrentSession().createQuery(
					/*"SELECT stock_qty_in_hand FROM pharma_stock_master where stock_batch_id='"
							+ batchId + "'");*/
					"select stockQtyInHand FROM StockMaster where batchMaster.batchId='"+batchId+"'");
			Double availableStock = null;
			
			Object rows = query.uniqueResult();
			
			if (rows != null) {
				availableStock = Double.parseDouble(rows.toString());
			}
			totalStock = availableStock + total;

			try {
				Query query1 = sessionFactory.getCurrentSession().createQuery(
						"update StockMaster set stockQtyInHand='"
								+ totalStock
								+ "' where batchMaster.batchId=:batchId");
				query1.setInteger("batchId", batchId);
				int rowsDeleted = query1.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
			
		}
			return totalStock;
	}
	
	public Double decreaseStock(Integer batchId, Integer Qty) {
		
		Double totalStock = null;
		try {
			Query query = sessionFactory.getCurrentSession().createQuery(
					"SELECT stockQtyInHand FROM StockMaster where batchMaster.batchId='"
							+ batchId + "'");
			Double availableStock = null;
			
			Object rows = query.uniqueResult();

			if (rows != null) {
				availableStock = Double.parseDouble(rows.toString());
			}
			totalStock = availableStock - Qty;

			try {
				Query query1 = sessionFactory.getCurrentSession().createQuery(
						"update StockMaster set stockQtyInHand='"
								+ totalStock
								+ "' where batchMaster.batchId=:batchId");
				query1.setInteger("batchId", batchId);
				int rowsDeleted = query1.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return totalStock;
	}

	@Override
	public Map<String, org.json.simple.JSONArray> getStockEntryDetails(Integer stockOutEntry)
	{
		org.json.simple.JSONArray list = new org.json.simple.JSONArray();
		Map<String,org.json.simple.JSONArray> batchData = new HashMap<String,org.json.simple.JSONArray>();

			String fetchTDSQuery = "SELECT stock.pur_stock_out_id,product.product_name, batch.batch_code, stock.stock_out_qty,stock.stock_entry_type,stock.stock_out_current_stock,stock.stock_out_closing_stock FROM pharma_stock_out_entry stock INNER JOIN pharma_product_master product ON product.product_id=stock.stock_out_productid INNER JOIN pharma_batch_master batch ON batch.batch_id = stock.stock_out_batchId  inner join pharma_stock_master stock1 on stock1.stock_batch_id=batch.batch_id  where stock_entry_type="+stockOutEntry+" order by pur_stock_out_id desc ";

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				fetchTDSQuery);
		List<Object[]> rows = query.list();
		for (Object[] row : rows) {
			try {
				org.json.simple.JSONObject obj1 = new org.json.simple.JSONObject();

				if (row[0] != null)
					obj1.put("stock_out_id", row[0].toString());
				else
					obj1.put("stock_out_id", "");

				if (row[1] != null)
					obj1.put("product_name", row[1].toString());
				else
					obj1.put("product_name", "");

				if (row[2] != null)
					obj1.put("batch_code", row[2].toString());
				else
					obj1.put("batch_code", "");

				if (row[3] != null)
					obj1.put("stock_qty", row[3].toString());
				else
					obj1.put("stock_qty", "");

				if (row[4] != null)
					obj1.put("stock_entry_type", row[4].toString());
				else
					obj1.put("stock_entry_type", "");
				
				if (row[5] != null)
					obj1.put("current_Stock", row[5].toString());
				else
					obj1.put("current_Stock", "");
				
				if (row[6] != null)
					obj1.put("closing_Stock", row[6].toString());
				else
					obj1.put("closing_Stock", "");
				
				list.add(obj1);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		batchData.put("result", list);
		return batchData;
	}

}

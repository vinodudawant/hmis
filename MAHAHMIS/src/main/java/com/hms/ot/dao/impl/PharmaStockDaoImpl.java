package com.hms.ot.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ot.dao.PharmaStockDao;
import com.hms.pharmacy.pojo.PharmaStockDTO;

@Repository
public class PharmaStockDaoImpl  implements PharmaStockDao{
	@Autowired
	SessionFactory sessionFactory;
	

	@Override
	public List<PharmaStockDTO> getPharmaStockDetails(int productId, String subStoreName) {
		List<PharmaStockDTO> list=new  ArrayList<>();
		      String storeName="pharma_stock_master stock";
		      if(!subStoreName.equalsIgnoreCase("Main")) {
		    	  storeName="pharma_"+""+subStoreName+""+"_"+"stock_master stock";
		      }
		   try {
			   String sql="SELECT batch.batch_id as batch_id,batch.batch_code as batch_code,batch.batch_exp_date as batch_exp_date,product.product_id as product_id,product.product_name as product_name,stock.stock_qty_in_hand as stock_qty_in_hand FROM pharma_batch_master batch   INNER JOIN "
			   		+ ""+storeName+"  ON stock.stock_batch_id = batch.batch_id"
		            + "   INNER JOIN pharma_product_master product ON product.product_id = batch.batch_product_id   WHERE "
					+ "  product.product_id ="+productId+" AND batch.batch_delete_flag = '0'";
			   
			   Query pharmaQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			   pharmaQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        @SuppressWarnings("unchecked")
		        List<Map<String, Object>> listStock = pharmaQuery.list();
		        for(Map<String, Object> row : listStock){
		                PharmaStockDTO obj=new  PharmaStockDTO();      	        	
		                obj.setBatchId(((Number)row.get("batch_id")).intValue());
		                obj.setBatchCode((String)row.get("batch_code"));
		                obj.setBatchExpirayDate((String)row.get("batch_exp_date"));
		                obj.setProductID(((Number)row.get("product_id")).intValue());
		                obj.setProductName((String)row.get("product_name"));
		                obj.setStockQtyInHand((Double)row.get("stock_qty_in_hand"));
		                list.add(obj);
		        }
			   
		   }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	

}

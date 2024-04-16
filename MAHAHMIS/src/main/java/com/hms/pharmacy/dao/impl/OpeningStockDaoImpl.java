package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.pharmacy.dao.*;
import com.hms.pharmacy.pojo.*;

@Repository
public class OpeningStockDaoImpl implements OpeningStockDao {
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdateOpeningStock(OpeningStock OpeningStock) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(OpeningStock);

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public BatchMaster getStockDetails(Integer batchId) {
		BatchMaster batchMaster = null;
		try {
			batchMaster = (BatchMaster) sessionFactory.getCurrentSession().get(
					BatchMaster.class, batchId);

		} catch (Exception e) {
			e.printStackTrace();

		}
		return batchMaster;
	}

	@Override
	public List<BatchMaster> getBatchByBatchCode(String batchCode) {
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		/*try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BatchMaster.class);
			criteria.add(Restrictions.eq("batchDeleteFlag", 0));
			if (batchCode != null) {
				criteria.add(Restrictions.eq("batchCode", batchCode));
			}
			batchMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return batchMasters;
		}*/
		
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(BatchMaster.class);
		criteria.add(Restrictions.eq("batchDeleteFlag", 0));
		if (batchCode != null) {
			criteria.add(Restrictions.eq("batchCode", batchCode));
		}
		criteria.setMaxResults(1);
		
		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("batchId"));
		proList.add(Projections.property("batchCode"));
		proList.add(Projections.property("batchExpDate"));
		criteria.setProjection(proList);
		
		List<Object[]> result = criteria.list();

		for (Object[] master : result) {
			
			BatchMaster  batchMaster = new BatchMaster();

			if (master[0] != null)
				batchMaster.setBatchId(Integer.parseInt(master[0]
						.toString()));
			
			
			if (master[1] != null)
				batchMaster.setBatchCode(master[1].toString());
			else
				batchMaster.setBatchCode("");
			
			if (master[2] != null)
				batchMaster.setBatchExpDate(master[2].toString());
			else
				batchMaster.setBatchCode("");
			
			batchMasters.add(batchMaster);
		}
		
		
		
		return batchMasters;
	}

	@Override
	public void saveBatchDetails(BatchMaster batchMaster) {
		try {
			sessionFactory.getCurrentSession().save(batchMaster);

			/*
			 * Query query = sessionFactory .getCurrentSession() .createQuery(
			 * "update BatchMaster set batchDeleteFlag='1' where batchId=:batchId"
			 * ); query.setInteger("batchId",
			 * purchaseCorrection.getPurCorBatchId()); int rowsDeleted =
			 * query.executeUpdate();
			 * 
			 * Query query1 = sessionFactory .getCurrentSession() .createQuery(
			 * "update StockMaster set stockQtyInHand='0' where batchMaster.batchId=:batchId"
			 * ); query1.setInteger("batchId",
			 * purchaseCorrection.getPurCorBatchId()); int rowsDeleted1 =
			 * query1.executeUpdate();
			 */
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<OpeningStockResult> getOpeningStockList() {
		List<OpeningStockResult> stockResults = new ArrayList<OpeningStockResult>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select stock.opening_stock_id,shelf.shelf_name,product.product_name,stock.opening_stock_add_date,stock.batch_id,stock.opening_qty,stock.opening_batch_code from pharma_opening_stock stock inner join pharma_shelf_master shelf ON shelf.shelf_id = stock.shelf_no inner join pharma_product_master product ON product.product_id = stock.product_id and opening_stock_delete_flag='0' order by opening_Stock_id desc limit 10;");
			try {
				List<Object[]> result = query.list();

				for (Object[] master : result) {
					OpeningStockResult openingStockResult = new OpeningStockResult();
					openingStockResult.setOpeningStockId(master[0].toString());

					openingStockResult.setShelfName(master[1].toString());

					openingStockResult.setProductName(master[2].toString());
					
					openingStockResult.setAddDate(master[3].toString());
					
					openingStockResult.setBatchId(master[4].toString());
					
					openingStockResult.setQty(master[5].toString());
					
					openingStockResult.setBatchCode(master[6].toString());
					
					/*
					 * if(master[3]!=null)
					 * debitNoteMaster.setDebitNoteDocNo(master[3].toString());
					 * else debitNoteMaster.setDebitNoteDocNo("");
					 * 
					 * SimpleDateFormat dateFormat=new
					 * SimpleDateFormat("yyyy-MM-dd"); java.util.Date
					 * date=dateFormat.parse(master[4].toString());
					 * debitNoteMaster.setDebitNoteDate(date);
					 */

					stockResults.add(openingStockResult);

				}

			} catch (Exception e) {
				e.printStackTrace();
				return stockResults;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return stockResults;

	}

	@Override
	public List<OpeningStockResult> getOpeningStockByShlef(Integer shelfId) {
		List<OpeningStockResult> stockResults = new ArrayList<OpeningStockResult>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select stock.opening_stock_id,shelf.shelf_name,product.product_name,stock.opening_stock_add_date,stock.opening_qty,stock.batch_id,stock.opening_batch_code from pharma_opening_stock stock inner join pharma_shelf_master shelf on shelf.shelf_id=stock.shelf_no inner join pharma_product_master product on product.product_id=stock.product_id where shelf.shelf_id='"+shelfId+"' and stock.opening_stock_delete_flag=0 order by stock.opening_stock_id desc");
			try {
				List<Object[]> result = query.list();

				for (Object[] master : result) {
					OpeningStockResult openingStockResult = new OpeningStockResult();
					openingStockResult.setOpeningStockId(master[0].toString());

					openingStockResult.setShelfName(master[1].toString());

					openingStockResult.setProductName(master[2].toString());
					
					openingStockResult.setAddDate(master[3].toString());
					
					openingStockResult.setQty(master[4].toString());
					
					
					openingStockResult.setBatchId(master[5].toString());
					
					openingStockResult.setBatchCode(master[6].toString());
					
					
					

					/*
					 * if(master[3]!=null)
					 * debitNoteMaster.setDebitNoteDocNo(master[3].toString());
					 * else debitNoteMaster.setDebitNoteDocNo("");
					 * 
					 * SimpleDateFormat dateFormat=new
					 * SimpleDateFormat("yyyy-MM-dd"); java.util.Date
					 * date=dateFormat.parse(master[4].toString());
					 * debitNoteMaster.setDebitNoteDate(date);
					 */

					stockResults.add(openingStockResult);

				}

			} catch (Exception e) {
				e.printStackTrace();
				return stockResults;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return stockResults;
	}

	@Override
	public Boolean deleteOpeningStock(Integer openingStockId) {
		// TODO Auto-generated method stub
		try {
			OpeningStock openingStock = (OpeningStock) sessionFactory
					.getCurrentSession().get(OpeningStock.class, openingStockId);
			openingStock.setOpeningStockDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	@Override
	public OpeningStock getOpeningStockById(Integer openingStockId) 
	{
		/*OpeningStock ltOpeningStockMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(OpeningStock.class);
			criteria.add(Restrictions.eq("openingStockDeleteFlag", 0));
			if (openingStockId != 0) {
				criteria.add(Restrictions.eq("openingStockId", openingStockId));
			}
			ltOpeningStockMasters = (OpeningStock) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return ltOpeningStockMasters;
		}
		return ltOpeningStockMasters;*/
		
		OpeningStock openingStock=new OpeningStock();
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(OpeningStock.class);
		criteria.add(Restrictions.eq("openingStockDeleteFlag", 0));
		if (openingStockId != 0) {
			criteria.add(Restrictions.eq("openingStockId", openingStockId));
		}
		
		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("openingStockId"));
		proList.add(Projections.property("openingStockAddDate"));
		proList.add(Projections.property("quantity"));
		proList.add(Projections.property("mrp"));
		proList.add(Projections.property("purRate"));
		proList.add(Projections.property("amt"));
		proList.add(Projections.property("batchCode"));
		proList.add(Projections.property("batchExpiry"));
		proList.add(Projections.property("productId"));
		
		proList.add(Projections.property("batchId"));
		proList.add(Projections.property("vat"));
		proList.add(Projections.property("igst"));
		proList.add(Projections.property("cess"));
		
		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try
		{
			for (Object[] row : result) {
						
				if(row[0]!=null)
					openingStock.setOpeningStockId(Integer.parseInt(row[0].toString()));
				
				if(row[1]!=null)
				{	
					SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd");
					String str[]=row[1].toString().split(" ");
					
					String date[]=str[0].split("-");
					StringBuffer stringBuffer=new StringBuffer();
					stringBuffer.append(date[2]+"/"+date[1]+"/"+date[0]);
					
					/*java.util.Date date=dateFormat.parse(str[0]);*/
					openingStock.setNaration(stringBuffer.toString());
				}
				else
					openingStock.setNaration("");		
				
				openingStock.setQuantity(Integer.parseInt(row[2].toString()));
				
				if(row[3]!=null)
					openingStock.setMrp(Double.parseDouble(row[3].toString()));
				else
					openingStock.setMrp(0.0);
				
				if(row[4]!=null)
					openingStock.setPurRate(Double.parseDouble(row[4].toString()));
				else
					openingStock.setPurRate(0.0);
				
				if(row[5]!=null)
					openingStock.setAmt(Double.parseDouble(row[5].toString()));
				else
					openingStock.setAmt(0.0);
				
				if(row[6]!=null)
					openingStock.setBatchCode(row[6].toString());
				else
					openingStock.setBatchCode("");
				
				if(row[7]!=null)
					openingStock.setBatchExpiry(row[7].toString());
				
				if(row[8]!=null)
					openingStock.setProductId(Integer.parseInt(row[8].toString()));
				
				if(row[9]!=null)
					openingStock.setBatchId(Integer.parseInt(row[9].toString()));
				else
					openingStock.setBatchId(0);
				
				if(row[10]!=null)
					openingStock.setVat(Double.parseDouble(row[10].toString()));
				
				if(row[11]!=null)
					openingStock.setIgst(Double.parseDouble(row[11].toString()));
				
				if(row[12]!=null)
					openingStock.setCess(Double.parseDouble(row[12].toString()));
				
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
					
		return openingStock;
	
}

	@Override
	public ProductMaster getProductMasterDetails(Integer productId) {
		ProductMaster ltProductMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class);
			criteria.add(Restrictions.eq("productId",productId));
			
			ltProductMasters = (ProductMaster) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return ltProductMasters;
		}
		return ltProductMasters;
	
}
	
	
	@Override
	public List<OpeningStockResult> getOpeningStockByProduct(Integer productId) 
	{
		List<OpeningStockResult> stockResults = new ArrayList<OpeningStockResult>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select stock.opening_stock_id,shelf.shelf_name,product.product_name,stock.opening_stock_add_date,stock.opening_qty,stock.batch_id,stock.opening_batch_code from pharma_opening_stock stock inner join pharma_shelf_master shelf on shelf.shelf_id=stock.shelf_no inner join pharma_product_master product on product.product_id=stock.product_id where  stock.product_id='"+productId+"' and stock.opening_stock_delete_flag=0 order by stock.opening_stock_id desc");
			try {
				List<Object[]> result = query.list();

				for (Object[] master : result) {
					OpeningStockResult openingStockResult = new OpeningStockResult();
					openingStockResult.setOpeningStockId(master[0].toString());

					openingStockResult.setShelfName(master[1].toString());

					openingStockResult.setProductName(master[2].toString());
					
					openingStockResult.setAddDate(master[3].toString());
					
					openingStockResult.setQty(master[4].toString());
					
					
					openingStockResult.setBatchId(master[5].toString());
					
					openingStockResult.setBatchCode(master[6].toString());
					
					
					stockResults.add(openingStockResult);

				}

			} catch (Exception e) {
				e.printStackTrace();
				return stockResults;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return stockResults;
	}

	@Override
	public double getGSTamount(int taxtId) {
		
		Double amount=0.0;
		try {	
			Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT tax_rate FROM pharma_tax_master where tax_id="
							+ taxtId);

			amount =(Double) query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
			return  amount;
		}
		return  amount;
	}
}

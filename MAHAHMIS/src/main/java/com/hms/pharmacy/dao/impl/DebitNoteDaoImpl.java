package com.hms.pharmacy.dao.impl;

import java.math.BigInteger;
import java.text.ParseException;
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
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.DebitNoteDao;
import com.hms.pharmacy.pojo.BatchMaster;

import com.hms.pharmacy.pojo.DebitNoteMaster;
import com.hms.pharmacy.pojo.DebitNoteSlave;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.CommonService;

@Repository
public class DebitNoteDaoImpl implements DebitNoteDao {
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	CommonService commonService;
	
	List<StockMaster> stockMasters = new ArrayList<StockMaster>();
	int count = 0;
	
	@Override
	public boolean saveOrUpdateDebitNote(DebitNoteMaster debitNoteMaster) {
		try {
			int id= (Integer)sessionFactory.getCurrentSession().save(debitNoteMaster);
			debitNoteMaster.setDebitNoteId(id);
			saveBatchStockDetails(debitNoteMaster);
			
		
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;

	}

	public void saveBatchStockDetails(DebitNoteMaster debitNoteMaster) {
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		for (DebitNoteSlave slave : debitNoteMaster.getDebitNoteSlaves()) {
			BatchMaster batchMaster = new BatchMaster();
			batchMaster.setBatchId(slave.getProductMaster().getBatchMaster()
					.get(0).getBatchId());

			StockMaster stockMaster = new StockMaster();
			stockMaster.setStockId(slave.getProductMaster().getBatchMaster()
					.get(0).getStockMaster().getStockId());
			
			Double Qty=null;
			Double Scheme=null;
			        Qty = Double.parseDouble(slave.getDebitNoteSlaveQty().toString());
			        Scheme = Double.parseDouble(slave.getDebitSlaveScheme().toString());

			Double finalQty = (Qty + Scheme);
			
			stockMaster.setStockQtyInHand(finalQty);
			batchMaster.setStockMaster(stockMaster);
			batchMasters.add(batchMaster);
			
			commonService.setstockMasterSlave(debitNoteMaster.getDebitNoteId(), "DebitNote", 0, 0, slave.getProductMaster().getProductId(), batchMaster.getBatchId(), slave.getDebitNoteSlaveBatchCode(), 0, 0, slave.getDebitNoteSlaveQty(), slave.getDebitNoteSlaveGST(), 0.0, 0.0, 0.0, 0, debitNoteMaster.getVendorMaster().getVendorId(), slave.getDebitNoteSlaveMrp(), slave.getDebitNoteSlaveRate());
		}
		try {
			for (BatchMaster batchMaster : batchMasters) {
				BatchMaster batchMaster2 = getBatchDetails(batchMaster.getBatchId());
				StockMaster stockMaster =batchMaster2.getStockMaster();
				
				Double qty=null;
				
				if(stockMaster.getStockQtyInHand() >= batchMaster.getStockMaster().getStockQtyInHand())
					qty = (stockMaster.getStockQtyInHand() - batchMaster.getStockMaster().getStockQtyInHand());
				
				stockMaster.setStockQtyInHand(qty);
				batchMaster2.setStockMaster(stockMaster);
				sessionFactory.getCurrentSession().saveOrUpdate(batchMaster2);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
	}

	@Override
	public List<DebitNoteMaster> getDebitNoteList(Integer unitId) {
		
		List<DebitNoteMaster> debitNoteMasters = new ArrayList<DebitNoteMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DebitNoteMaster.class).createAlias("vendorMaster", "vendorMaster");
			criteria.add(Restrictions.eq("debitNoteDeleteFlag", 0));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.addOrder(Order.desc("debitNoteId"));
			criteria.setMaxResults(10);
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("debitNoteId"));
		    proList.add(Projections.property("vendorMaster.vendorId"));
		    proList.add(Projections.property("vendorMaster.vendorName"));
		    proList.add(Projections.property("debitNoteDocNo"));
		    proList.add(Projections.property("debitNoteDate"));
		   
		    criteria.setProjection(proList);
			List<Object[]> result = criteria.list();
			
			for(Object[] master:result)
			{
					DebitNoteMaster debitNoteMaster=new DebitNoteMaster();
					debitNoteMaster.setDebitNoteId(Integer.parseInt(master[0].toString()));
					
					VendorMaster vendorMaster=new VendorMaster();
					vendorMaster.setVendorId(Integer.parseInt(master[1].toString()));
					
					if(master[2]!=null)
						vendorMaster.setVendorName(master[2].toString());
					else
						vendorMaster.setVendorName("");
					
					if(master[3]!=null)
						debitNoteMaster.setDebitNoteDocNo(master[3].toString());
					else
						debitNoteMaster.setDebitNoteDocNo("");
					
					SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
					java.util.Date date=dateFormat.parse(master[4].toString());
					debitNoteMaster.setDebitNoteDate(date);
					debitNoteMaster.setVendorMaster(vendorMaster);
					
					debitNoteMasters.add(debitNoteMaster);
				
			}
				

		} catch (Exception e) {
			e.printStackTrace();
			return debitNoteMasters;
		}
		return debitNoteMasters;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DebitNoteMaster> getDebitNotebyVendorId(Integer vendorId,Integer unitId) {
	
		List<DebitNoteMaster> debitNoteMasters = new ArrayList<DebitNoteMaster>();
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DebitNoteMaster.class).createAlias("vendorMaster", "vendorMaster");
			criteria.add(Restrictions.eq("debitNoteDeleteFlag", 0));
			criteria.add(Restrictions.eq("unitId", unitId));

			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("debitNoteId"));
			proList.add(Projections.property("debitNoteDocNo"));
			proList.add(Projections.property("vendorMaster.vendorName"));
			proList.add(Projections.property("debitNoteDate"));
			proList.add(Projections.property("vendorMaster.vendorId"));
			

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				DebitNoteMaster saleMaster = new DebitNoteMaster();
				VendorMaster vendorMaster=new VendorMaster();
				if (master[0] != null) {
					saleMaster.setDebitNoteId(Integer.parseInt(master[0]
							.toString()));
				}
				if (master[1] != null) {
					saleMaster.setDebitNoteDocNo(master[1].toString());
				} else {
					saleMaster.setDebitNoteDocNo("");
				}
				if (master[2] != null) {
					
					vendorMaster.setVendorName(master[2].toString());
				} 
				if (master[3] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[3].toString());

					saleMaster.setDebitNoteDate(date);
				}
				if (master[4] != null) {
					vendorMaster.setVendorId(Integer.parseInt(master[4].toString()));
					saleMaster.setVendorMaster(vendorMaster);
				}
				debitNoteMasters.add(saleMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return debitNoteMasters;
		}
		return debitNoteMasters;
	}

	@Override
	public DebitNoteMaster getDebitNotebyDebitId(Integer debitNoteId,Integer unitId) {

		DebitNoteMaster debitNoteMaster=new DebitNoteMaster();
		try
		{
		
			/*
			 * Criteria
			 * criteria=sessionFactory.getCurrentSession().createCriteria(DebitNoteMaster.
			 * class).createAlias("vendorMaster", "vendorMaster")
			 * .createAlias("vendorAddress", "vendorAddress");
			 * criteria.add(Restrictions.eq("debitNoteDeleteFlag",0));
			 * criteria.add(Restrictions.eq("debitNoteId",debitNoteId));
			 * 
			 * ProjectionList proList=Projections.projectionList();
			 * proList.add(Projections.property("debitNoteId"));
			 * proList.add(Projections.property("debitNoteDocNo"));
			 * proList.add(Projections.property("debitNoteDate"));
			 * proList.add(Projections.property("vendorMaster.vendorName"));
			 * proList.add(Projections.property("vendorAddress.vendorMobileNumber"));
			 * proList.add(Projections.property("debitNoteLess"));
			 * proList.add(Projections.property("debitNoteGrossAmt"));
			 * proList.add(Projections.property("debitNoteSurcharges"));
			 * proList.add(Projections.property("debitNoteNetAmt"));
			 * proList.add(Projections.property("vendorMaster.vendorId"));
			 * proList.add(Projections.property("debitNoteNarration"));
			 * proList.add(Projections.property("purchaseEntryId"));
			 * 
			 * criteria.setProjection(proList);
			 */
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery("Select * from pharma_debit_note_master where debit_note_delete_flag='0' and debit_note_id='"+debitNoteId+"' and unit_id ='"+unitId+"'");
		@SuppressWarnings("unchecked")
		List<Object[]> object=query.list();
		
		for(Object[] result:object)
		{
			if(result[0]!=null)
				debitNoteMaster.setDebitNoteId(Integer.parseInt(result[0].toString()));
			else
				debitNoteMaster.setDebitNoteId(0);
				
			if(result[8]!=null)
				debitNoteMaster.setDebitNoteDocNo(result[8].toString());
			else
				debitNoteMaster.setDebitNoteDocNo("");
		
			if(result[2]!=null)
				{
			  
			   // String str[]=result[6].toString().split(" ");
			    debitNoteMaster.setDebitNotEnteredBy(result[6].toString());
				}
				
			else
				debitNoteMaster.setDebitNotEnteredBy("");
			
			VendorMaster vendorMaster=new VendorMaster();
			Integer  vendorid=Integer.parseInt(result[20].toString());
			System.out.println("vendorid---"+vendorid);
			Query query1 =sessionFactory.getCurrentSession().createQuery("select vendorName from VendorMaster where vendorId='"+vendorid+"'");
			String vendorName=(String)query1.uniqueResult();
			
			Query query2 =sessionFactory.getCurrentSession().createQuery("select vendorContactPerson from VendorMaster where vendorId='"+vendorid+"'");
			String vendorMobile=(String)query2.uniqueResult();
			
			if(!vendorName.equals(null))
				//vendorMaster.setVendorName(vendorName);
				debitNoteMaster.setVendorName(vendorName);
			else
				debitNoteMaster.setVendorName("");
			
			if(!vendorMobile.equals(null))
				//vendorMaster.setVendorMobileNumber(vendorMobile);
				debitNoteMaster.setVendorMobileNumber(vendorMobile);
			else
				debitNoteMaster.setVendorMobileNumber("");
				
			
			
			if(result[12]!=null || result[12]!="")
				debitNoteMaster.setDebitNoteLess(result[12].toString());
			else
				debitNoteMaster.setDebitNoteLess("0.0");
				
			
			if(result[10]!=null)
				debitNoteMaster.setDebitNoteGrossAmt(Double.parseDouble(result[10].toString()));
			else
				debitNoteMaster.setDebitNoteGrossAmt(0.0);
			
			if(result[15]!=null)
				debitNoteMaster.setDebitNoteSurcharges(result[15].toString());
			else
				debitNoteMaster.setDebitNoteSurcharges("");
			
			if(result[14]!=null)
				debitNoteMaster.setDebitNoteNetAmt(Double.parseDouble(result[14].toString()));
			else
				debitNoteMaster.setDebitNoteNetAmt(0.0);
			
			if(result[25]!=null)
				vendorMaster.setVendorId(Integer.parseInt(result[25].toString()));
			debitNoteMaster.setVendorMaster(vendorMaster);
			
			if(result[13]!=null)
				debitNoteMaster.setDebitNoteNarration(result[13].toString());
			
			if(result[17]!=null)
				debitNoteMaster.setPurchaseEntryId(Integer.parseInt(result[17].toString()));
			
		}
	}
		catch(Exception e){
			
		}
		
		List<DebitNoteSlave> debitNoteSlaves=new ArrayList<DebitNoteSlave>();
		
		SQLQuery query=sessionFactory.getCurrentSession().createSQLQuery("SELECT debit_note_slave_mrp,debit_note_slave_rate,debit_note_slave_amt,debit_note_slave_batch_code,debit_note_slave_batch_expiry,product.product_name,debit_note_slave_qty,debit_note_slave_BatchId,debit_slave_scheme,debit_slave_scheme_amt FROM pharma_debit_note_master master inner join pharma_debit_note_slave slave on master.debit_note_id=slave.debit_note_slave_master_id inner join pharma_product_master product on product.product_Id=slave.debit_note_slave_product_id  where master.debit_note_id="+debitNoteId+" and master.unit_id='"+unitId+"';");
		try
		{
		List<Object[]> result=query.list();
		for(Object[] row:result)
		{
			
			DebitNoteSlave debitNoteSlave=new DebitNoteSlave();
			if(row[0]!=null)
				debitNoteSlave.setDebitNoteSlaveMrp(Double.parseDouble(row[0].toString()));
			else
				debitNoteSlave.setDebitNoteSlaveMrp(0.0);
			
			if(row[1]!=null)
				debitNoteSlave.setDebitNoteSlaveRate(Double.parseDouble(row[1].toString()));
			else
				debitNoteSlave.setDebitNoteSlaveRate(0.0);
				
			if(row[2]!=null)
				debitNoteSlave.setDebitNoteSlaveAmt(Double.parseDouble(row[2].toString()));
			else
				debitNoteSlave.setDebitNoteSlaveAmt(0.0);
		
			if(row[3]!=null)
				debitNoteSlave.setDebitNoteSlaveBatchCode(row[3].toString());
			else
				debitNoteSlave.setDebitNoteSlaveBatchCode("");
			
			if(row[4]!=null)
				debitNoteSlave.setDebitNoteSlaveBatchExpiry(row[4].toString());
			else
				debitNoteSlave.setDebitNoteSlaveBatchExpiry("");
		
			ProductMaster productMaster=new ProductMaster();
             if(row[5]!=null)
            	 productMaster.setProductName(row[5].toString());
             else
            	 productMaster.setProductName(row[5].toString());
             debitNoteSlave.setProductMaster(productMaster);
			
             if(row[6]!=null)
 				debitNoteSlave.setDebitNoteSlaveQty(Integer.parseInt(row[6].toString()));
 			else
 				debitNoteSlave.setDebitNoteSlaveQty(0);
             
             if(row[7]!=null)
  				debitNoteSlave.setDebitNoteSlaveBatchId(Integer.parseInt(row[7].toString()));
  			else
  				debitNoteSlave.setDebitNoteSlaveBatchId(0);
             
             if(row[8]!=null)
   				debitNoteSlave.setDebitSlaveScheme(Integer.parseInt(row[8].toString()));
   			else
   				debitNoteSlave.setDebitSlaveScheme(0);
             
             if(row[9]!=null)
   				debitNoteSlave.setDebitSlaveSchemeAmt(Double.parseDouble(row[9].toString()));
   			else
   				debitNoteSlave.setDebitSlaveSchemeAmt(0.0);
 		
			
			debitNoteSlaves.add(debitNoteSlave);
		}
		
		}
		catch(Exception e)
		{
			
		}
			
		debitNoteMaster.setDebitNoteSlaves(debitNoteSlaves);
		
		return debitNoteMaster;
		
	}

	public BatchMaster getBatchDetails(Integer batchId) throws ParseException {
		/*BatchMaster batchMaster = null;
		try {
			batchMaster = (BatchMaster) sessionFactory.getCurrentSession().get(
					BatchMaster.class, batchId);

		} catch (Exception e) {
			e.printStackTrace();

		}
		return batchMaster;*/
		
		BatchMaster batchMaster=new BatchMaster();
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(BatchMaster.class);
		criteria.add(Restrictions.eq("batchId", batchId)).createAlias("productMaster", "productMaster").createAlias("stockMaster", "stockMaster");
		
		ProjectionList proList = Projections.projectionList();
	    proList.add(Projections.property("batchId"));
	    proList.add(Projections.property("batchCode"));
	    proList.add(Projections.property("batchExpDate"));
	    proList.add(Projections.property("batchDeleteFlag"));
	    proList.add(Projections.property("batchUpdateDate"));
	    proList.add(Projections.property("productMaster.productId"));
	    proList.add(Projections.property("stockMaster.stockId"));
	    /*proList.add(Projections.property("stockMaster.stockId"));*/
	    proList.add(Projections.property("stockMaster.stockQtyInHand"));
	    proList.add(Projections.property("stockMaster.stockQtyOnOrder"));
	    proList.add(Projections.property("stockMaster.stockYearId"));
	    proList.add(Projections.property("stockMaster.stockDeleteFlag"));
	    proList.add(Projections.property("stockMaster.stockUpdateDate"));
	    
	    criteria.setProjection(proList);
	    
	    
		List<Object[]> result = criteria.list();
		for(Object[] master:result)
		{
			
			ProductMaster productMaster=new ProductMaster();
			StockMaster stockMaster=new StockMaster();
			if(master[0]!=null)
			{
				batchMaster.setBatchId(Integer.parseInt(master[0].toString()));
			}
			if(master[1]!=null)
			{
				batchMaster.setBatchCode(master[1].toString());
			}
			if(master[2]!=null)
			{
				batchMaster.setBatchExpDate(master[2].toString());
			}
			if(master[3]!=null)
			{
				batchMaster.setBatchDeleteFlag(Integer.parseInt(master[3].toString()));
			}
			if(master[4]!=null)
			{
				SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date=dateFormat.parse(master[4].toString());
				batchMaster.setBatchUpdateDate(date);
			}
			if(master[5]!=null)
			{
				productMaster.setProductId(Integer.parseInt(master[5].toString()));
			}
			if(master[6]!=null)
			{
				stockMaster.setStockId(Integer.parseInt(master[6].toString()));
			}
			if(master[7]!=null)
			{
				stockMaster.setStockQtyInHand(Double.parseDouble(master[7].toString()));
			}
			if(master[8]!=null)
			{
				stockMaster.setStockQtyOnOrder(Integer.parseInt(master[8].toString()));
			}
			if(master[9]!=null)
			{
				stockMaster.setStockYearId(Integer.parseInt(master[9].toString()));
			}
			if(master[10]!=null)
			{
				stockMaster.setStockDeleteFlag(Integer.parseInt(master[10].toString()));
			}
			if(master[11]!=null)
			{
				SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date=dateFormat.parse(master[11].toString());
				/*java.sql.Date date=master[11].toString()*/
				java.sql.Date sqlDate = new java.sql.Date(date.getTime());
				stockMaster.setStockUpdateDate(sqlDate);
			}
			stockMaster.setStockProductMaster(productMaster);
			stockMaster.setBatchMaster(batchMaster);
			
			batchMaster.setProductMaster(productMaster);
			batchMaster.setStockMaster(stockMaster);
			
		}
		return batchMaster;
	}


	
	//After delete increase stock
	@Override
	public boolean deleteDebitNote(Integer debitNoteId,Integer unitId) 
	{
		try {
			org.hibernate.Query query = sessionFactory
					.getCurrentSession()
					.createQuery(
							"update DebitNoteMaster set debitNoteDeleteFlag =1 where debitNoteId='"
									+ debitNoteId+"' and unitId ='"+unitId+"'");

		DebitNoteMaster debitNoteMaster = getDebitNotebyDebitId(debitNoteId,unitId);

		for (DebitNoteSlave slave : debitNoteMaster.getDebitNoteSlaves()) {
			checkAvailibilityForDelete(slave.getDebitNoteSlaveBatchId(),Double.parseDouble(slave.getDebitNoteSlaveQty().toString()));
		}
		
		try {
			increaseStock();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		int rowDeleted = query.executeUpdate();

	} catch (Exception e) {
		e.printStackTrace();
		return false;
	}
	return true;
	}
	

	public boolean checkAvailibilityForDelete(Integer batchId, Double Qty) 
	{
		StockMaster stockMaster = new StockMaster();
		boolean result = false;
		String strQuery = "";
		Object storeName = new Object();

		strQuery = "SELECT stockQtyInHand FROM StockMaster where batchMaster.batchId='"
					+ batchId + "'";
	
		try {
			Query query = sessionFactory.getCurrentSession().createQuery(
					strQuery);
			Double availableStock = null;
			Double totalStock = 0.0;
			Object rows = query.uniqueResult();

			if (rows != null) {
				availableStock = Double.parseDouble(rows.toString());
			}
			
			totalStock = availableStock + Qty;
			result = true;

	    	stockMaster.setStockQtyInHand(totalStock);
			BatchMaster batchMaster = new BatchMaster();
			batchMaster.setBatchId(batchId);
			stockMaster.setBatchMaster(batchMaster);
			stockMasters.add(stockMaster);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;

	}
	
	public boolean increaseStock() 
	{

		try {
			if (count == 0) {
						SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					String date = dateFormat.format(new java.util.Date());

					for (StockMaster master : stockMasters) {
						try {
							Query query1 = sessionFactory
									.getCurrentSession()
									.createQuery(
											"update StockMaster set stockQtyInHand='"
													+ master.getStockQtyInHand()
													+ "',stockUpdateDate='"
													+ date
													+ "' where batchMaster.batchId=:batchId");
							query1.setInteger("batchId", master.getBatchMaster().getBatchId());
							int rowsDeleted = query1.executeUpdate();
						} 
						catch (Exception e) 
						{
							e.printStackTrace();
						}
					}
				} 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;

	}

	//When we r doing DEBIT Note we have to update purchase issue quantity in purchase slave  
	public void changePurchaseEntryIssueQty(Integer purchaseSlaveId, Integer Qty) 
	{
		Integer rows1 = 0;
		try {
			Query query1 = sessionFactory
					.getCurrentSession()
					.createQuery(
							"SELECT purchaseEntrySlaveIssueQty FROM PurchaseSlave where  purSlaveId="
									+ purchaseSlaveId);
			rows1 = (Integer) query1.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();

		}
		Integer result = (int) (rows1 - Qty);
		try {
			Query query1 = sessionFactory.getCurrentSession().createQuery(
					"update PurchaseSlave set purchaseEntrySlaveIssueQty='"
							+ result
							+ "' where purSlaveId=:purchaseSlaveId ");

			query1.setInteger("purchaseSlaveId", purchaseSlaveId);

			int rowsDeleted= query1.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void changePurchaseEntryStatus(Integer purId) {
		
			try {	
			Query query = sessionFactory
				.openSession()
				.createQuery(
						"update PurchaseMaster set purentryStatus='received' where purId=:purId");
		query.setInteger("purId", purId);
		
		int rowsDeleted = query.executeUpdate();
			
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}
	
	@Override
	public JSONArray getDebitNoteDetailsBySaleId(Integer saleId) 
	{
		JSONArray jsonArray = new JSONArray();
			try {

				SQLQuery query = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								" select c_m.debit_note_id,c_m.debit_note_discount_info,c_m.debit_note_net_amt,c_m.debit_note_date,c_m.debit_note_surcharges "
                                +" from pharma_debit_note_master c_m inner join pharma_debit_note_slave c_s ON c_s.debit_note_slave_id = c_m.debit_note_id where "
                                +" c_m.debit_note_purEntry_id= "+saleId+" group by debit_note_id;");
				List<Object[]> rows = query.list();
				for (Object[] row : rows) {

					JSONObject obj1 = new JSONObject();

					if (row[0] != null)
						obj1.put("billId", row[0].toString());
					else
						obj1.put("billId", "");

					if (row[1] != null)
						obj1.put("disc", row[1].toString());
					else
						obj1.put("disc", "");

					if (row[2] != null)
						obj1.put("netAmt", row[2].toString());
					else
						obj1.put("netAmt", "");

					if (row[3] != null)
						obj1.put("date", row[3].toString());
					else
						obj1.put("date", "");

					if (row[4] != null)
						obj1.put("surcharge", row[4].toString());
					else
						obj1.put("surcharge", "");

					jsonArray.put(obj1);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		

		return jsonArray;
	}
}
	

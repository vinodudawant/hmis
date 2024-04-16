package com.hms.pharmacy.dao.impl;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.pharmacy.dao.CounterSaleDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.CounterSaleMaster;
import com.hms.pharmacy.pojo.CounterSaleSlave;
import com.hms.pharmacy.pojo.CreditNoteCounterSale;
import com.hms.pharmacy.pojo.FifthCounterSaleMaster;
import com.hms.pharmacy.pojo.FifthCounterSaleSlave;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.pojo.StockOutEntry;
import com.hms.pharmacy.service.CommonService;

@Repository
public class CounterSaleDaoImpl implements CounterSaleDao {
	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	CommonService commonService;

	List<StockMaster> stockMasters = new ArrayList<StockMaster>();
	int count = 0;

	@Override
	public Boolean saveOrUpdateCounterSale(CounterSaleMaster counterSaleMaster, String storeId) {

		try {
			stockMasters = new ArrayList<StockMaster>();
			count = 0;
			int unitid=0;
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CounterSaleMaster.class);
		    criteria.setProjection(Projections.count("counterSaleId"));
	        criteria.add(Restrictions.eq("unitId",counterSaleMaster.getUnitId()));
	        List ltUnitMasters1=criteria.list();
	
	        if(ltUnitMasters1.get(0)!=null){
	            long u1 = (Long) ltUnitMasters1.get(0);
	             unitid=(int) u1;
	        }
	        
	        
			double netamt = counterSaleMaster.getCounterSaleNetAmt();
			String transactiontype = counterSaleMaster.getCounterSaleTransType();
			for (CounterSaleSlave slave : counterSaleMaster.getLtCounterSlave()) {
				int id = getidTaxmaster(slave.getCounterSlaveVat());
				slave.setCounterSlaveVatid(id);
				double slaveamt = slave.getCounterSlaveAmt();
				double gstper = slave.getCounterSlaveVat();

			}
			if (saveBatchStockDetails(counterSaleMaster, storeId)) {
			        unitid++;
			        counterSaleMaster.setUnitCount(unitid);
				int id = (Integer) sessionFactory.getCurrentSession().save(counterSaleMaster);
				for (CounterSaleSlave slave : counterSaleMaster.getLtCounterSlave()) {
					slave.setCounterSlaveRate((Double) sessionFactory.getCurrentSession().createQuery(
							"select purRate from PurchaseRateHistory where batchId=" + slave.getCounterSlaveBatchId())
							.setMaxResults(1).uniqueResult());
					commonService.setstockMasterSlave(id, "CounterSale", 0, 0, slave.getProductMaster().getProductId(),
							slave.getCounterSlaveBatchId(), slave.getCounterSaleBatchCode(),
							counterSaleMaster.getCounterSaleStoreId(), 0,
							slave.getCounterSaleSlaveIssueQty().intValue(), slave.getCounterSlaveVat(), 0.0, 0.0,
							slave.getCounterSlaveDisc(), counterSaleMaster.getUnitId(), 0, slave.getCounterSlaveMrp(),
							slave.getCounterSlaveRate());
				}
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	// Added By BILAL For GST id
	public int getidTaxmaster(double gstper) {
		int a = 0;
		try {
			Query taxid = sessionFactory.getCurrentSession()
					.createQuery("select distinct taxId from TaxMaster where taxDeleteFlag =0 and taxRate=" + gstper);

			a = (Integer) taxid.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
			return a;
		}
		return a;
	}

	public boolean saveBatchStockDetails(CounterSaleMaster counterSaleMaster, String storeId) {
		boolean result = true;
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		for (CounterSaleSlave slave : counterSaleMaster.getLtCounterSlave()) {
			BatchMaster batchMaster = new BatchMaster();
			batchMaster.setBatchId(slave.getProductMaster().getBatchMaster().get(0).getBatchId());

			StockMaster stockMaster = new StockMaster();
			stockMaster.setStockQtyInHand(Double.parseDouble(slave.getCounterSlaveQty().toString()));
			batchMaster.setStockMaster(stockMaster);
			if (batchMasters.size() == 0) {
				batchMasters.add(batchMaster);
			} else {
				if ((batchMasters.contains(batchMaster) == true)) {
					count = 1;
				} else {
					batchMasters.add(batchMaster);
				}

			}

		}
		try {
			for (BatchMaster batchMaster : batchMasters) {
				checkAvailibility(batchMaster.getBatchId(), batchMaster.getStockMaster().getStockQtyInHand(), storeId);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (count == 0) {
			decreaseStock(storeId);
		} else {
			return false;
		}
		return result;
	}

	public boolean checkAvailibility(Integer batchId, Double Qty, String storeId) {
		StockMaster stockMaster = new StockMaster();
		boolean result = false;
		String strQuery = "";
		Object storeName = new Object();

		if (storeId != null) {
			try {
				Query query = sessionFactory.getCurrentSession()
						.createQuery("SELECT storeName FROM SubStoreMaster where storeId='" + storeId + "'");
				storeName = query.uniqueResult();
			} catch (Exception e) {
				e.printStackTrace();
			}
			strQuery = "SELECT stock_qty_in_hand FROM pharma_" + storeName.toString()
					+ "_stock_master where stock_batch_id='" + batchId + "'";
		} else {
			strQuery = "SELECT stock_qty_in_hand FROM pharma_stock_master where stock_batch_id='" + batchId + "'";
		}

		try {

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(strQuery);
			Double availableStock = null;
			Double totalStock = 0.0;
			Object rows = query.uniqueResult();

			if (rows != null) {
				availableStock = Double.parseDouble(rows.toString());
			}

			if (availableStock >= Qty) {
				totalStock = availableStock - Qty;
				result = true;
			} else {
				result = false;
				count = 1;
				return result;

			}

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

	public boolean decreaseStock(String storeId) {

		try {
			if (count == 0) {
				if (storeId == null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
					String date = dateFormat.format(new java.util.Date());

					for (StockMaster master : stockMasters) {
						try {
							Query query1 = sessionFactory.getCurrentSession()
									.createQuery("update StockMaster set stockQtyInHand='" + master.getStockQtyInHand()
											+ "',stockUpdateDate='" + date + "' where batchMaster.batchId=:batchId");
							query1.setInteger("batchId", master.getBatchMaster().getBatchId());
							int rowsDeleted = query1.executeUpdate();
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				} else {
					Object storeName = "";
					try {
						Query query = sessionFactory.getCurrentSession()
								.createQuery("SELECT storeName FROM SubStoreMaster where storeId='" + storeId + "'");
						storeName = query.uniqueResult();
					} catch (Exception e) {
						e.printStackTrace();
					}
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
					String date = dateFormat.format(new java.util.Date());

					for (StockMaster master : stockMasters) {
						try {
							Query query1 = sessionFactory.getCurrentSession()
									.createSQLQuery("update pharma_" + storeName
											+ "_stock_master set stock_qty_in_hand='" + master.getStockQtyInHand()
											+ "',stock_update_date='" + date + "' where stock_batch_id=:batchId");
							query1.setInteger("batchId", master.getBatchMaster().getBatchId());
							int rowsDeleted = query1.executeUpdate();
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;

	}

	public BatchMaster getBatchDetails(Integer batchId) throws ParseException {

		BatchMaster batchMaster = new BatchMaster();
		Criteria criteria = sessionFactory.openSession().createCriteria(BatchMaster.class);
		criteria.add(Restrictions.eq("batchId", batchId)).createAlias("productMaster", "productMaster")
				.createAlias("stockMaster", "stockMaster");

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("batchId"));
		proList.add(Projections.property("batchCode"));
		proList.add(Projections.property("batchExpDate"));
		proList.add(Projections.property("batchDeleteFlag"));
		proList.add(Projections.property("batchUpdateDate"));
		proList.add(Projections.property("productMaster.productId"));
		proList.add(Projections.property("stockMaster.stockId"));
		/* proList.add(Projections.property("stockMaster.stockId")); */
		proList.add(Projections.property("stockMaster.stockQtyInHand"));
		proList.add(Projections.property("stockMaster.stockQtyOnOrder"));
		proList.add(Projections.property("stockMaster.stockYearId"));
		proList.add(Projections.property("stockMaster.stockDeleteFlag"));
		proList.add(Projections.property("stockMaster.stockUpdateDate"));

		criteria.setProjection(proList);

		List<Object[]> result = criteria.list();
		for (Object[] master : result) {

			ProductMaster productMaster = new ProductMaster();
			StockMaster stockMaster = new StockMaster();
			if (master[0] != null) {
				batchMaster.setBatchId(Integer.parseInt(master[0].toString()));
			}
			if (master[1] != null) {
				batchMaster.setBatchCode(master[1].toString());
			}
			if (master[2] != null) {
				batchMaster.setBatchExpDate(master[2].toString());
			}
			if (master[3] != null) {
				batchMaster.setBatchDeleteFlag(Integer.parseInt(master[3].toString()));
			}
			if (master[4] != null) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[4].toString());
				batchMaster.setBatchUpdateDate(date);
			}
			if (master[5] != null) {
				productMaster.setProductId(Integer.parseInt(master[5].toString()));
			}
			if (master[6] != null) {
				stockMaster.setStockId(Integer.parseInt(master[6].toString()));
			}
			if (master[7] != null) {
				stockMaster.setStockQtyInHand(Double.parseDouble(master[7].toString()));
			}
			if (master[8] != null) {
				stockMaster.setStockQtyOnOrder(Integer.parseInt(master[8].toString()));
			}
			if (master[9] != null) {
				stockMaster.setStockYearId(Integer.parseInt(master[9].toString()));
			}
			if (master[10] != null) {
				stockMaster.setStockDeleteFlag(Integer.parseInt(master[10].toString()));
			}
			if (master[11] != null) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[11].toString());
				/* java.sql.Date date=master[11].toString() */
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

	@Override
	public PurchaseSlave getBatchwisePurchaseRate(String BatchCode) {

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PurchaseSlave.class);
		criteria.add(Restrictions.eq("batchCode", BatchCode));

		List<PurchaseSlave> ltPurchaseSlaves = criteria.list();
		if (ltPurchaseSlaves != null) {
			return ltPurchaseSlaves.get(0);
		}
		return null;

	}

	@Override
	public CounterSaleMaster getCounterSlave(Integer counterId,Integer unitId) {

		CounterSaleMaster counterSaleMaster=new CounterSaleMaster();
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(CounterSaleMaster.class);
		criteria.add(Restrictions.eq("counterSaleDeleteFlag", 0));
		criteria.add(Restrictions.eq("unitId", unitId));
		if (counterId != 0) {
			criteria.add(Restrictions.eq("counterSaleId", counterId));
			
		}
		
		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("counterSaleId"));
		proList.add(Projections.property("counterSaleForDate"));
		proList.add(Projections.property("counterSaleForTime"));
		proList.add(Projections.property("counterSaleNetAmt"));
		proList.add(Projections.property("counterSalePatientName"));
		proList.add(Projections.property("counterSaleMobile"));
		proList.add(Projections.property("counterSaleDoctor"));
		proList.add(Projections.property("counterSaleAddress"));
		proList.add(Projections.property("counterSaleGrossAmt"));
		proList.add(Projections.property("counterTaxVat5"));
		proList.add(Projections.property("counterTaxVat12"));
		proList.add(Projections.property("counterTaxVat0"));
		proList.add(Projections.property("counterTotalVat"));
		proList.add(Projections.property("counterSaleTransType"));
		proList.add(Projections.property("counterTaxVat55"));
		proList.add(Projections.property("counterTaxVat6"));
		proList.add(Projections.property("counterTaxVat135"));
		proList.add(Projections.property("counterTaxBankName"));
		proList.add(Projections.property("counterTaxChequeNo"));
		
		proList.add(Projections.property("coutersalecd"));
		proList.add(Projections.property("coutersalecdamt"));
		proList.add(Projections.property("counterTaxCardNo"));
		proList.add(Projections.property("unitCount"));
		
		
		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try
		{
			for (Object[] row : result) {
						
				if(row[0]!=null)
					counterSaleMaster.setCounterSaleId(Integer.parseInt(row[0].toString()));
				
				if(row[1]!=null)
				{	
					SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd");
					String str[]=row[1].toString().split(" ");
					
					String date[]=str[0].split("-");
					StringBuffer stringBuffer=new StringBuffer();
					stringBuffer.append(date[2]+"/"+date[1]+"/"+date[0]);
					
					/*java.util.Date date=dateFormat.parse(str[0]);*/
					counterSaleMaster.setCounterSaleTransType(stringBuffer.toString());
				}	
				
				counterSaleMaster.setCounterSaleForTime(row[2].toString());
				
				counterSaleMaster.setCounterSaleNetAmt(Double.parseDouble(row[3].toString()));
				
				if(row[4]!=null)
					counterSaleMaster.setCounterSalePatientName(row[4].toString());
				else
					counterSaleMaster.setCounterSalePatientName("");
				
				if(row[5]!=null)
					counterSaleMaster.setCounterSaleMobile(row[5].toString());
				else
					counterSaleMaster.setCounterSaleMobile("");
				
				if(row[6]!=null)
					counterSaleMaster.setCounterSaleDoctor(row[6].toString());
				else
					counterSaleMaster.setCounterSaleDoctor("");
				
				if(row[7]!=null)
					counterSaleMaster.setCounterSaleAddress(row[7].toString());
				else
					counterSaleMaster.setCounterSaleAddress("");
				
				if(row[8]!=null)
					counterSaleMaster.setCounterSaleGrossAmt(Double.parseDouble(row[8].toString()));
				
				if(row[9]!=null)
					counterSaleMaster.setCounterTaxVat5(Double.parseDouble(row[9].toString()));
				else
					counterSaleMaster.setCounterTaxVat5(0.0);
				
				if(row[10]!=null)
					counterSaleMaster.setCounterTaxVat12(Double.parseDouble(row[10].toString()));
				else
					counterSaleMaster.setCounterTaxVat12(0.0);
				
				if(row[11]!=null)
					counterSaleMaster.setCounterTaxVat0(Double.parseDouble(row[11].toString()));
				else
					counterSaleMaster.setCounterTaxVat0(0.0);
				
				if(row[12]!=null)
					counterSaleMaster.setCounterTotalVat(Double.parseDouble(row[12].toString()));
				else
					counterSaleMaster.setCounterTotalVat(0.0);
				
				if(row[13]!=null)
					{	
					if (row[13].toString().equals("0"))
					counterSaleMaster.setCounterSaleEnteredBy("cash");
				   else if (row[13].toString().equals("1"))
					counterSaleMaster.setCounterSaleEnteredBy("Credit");
				   else if (row[13].toString().equals("2"))
					   counterSaleMaster.setCounterSaleEnteredBy("Credit Card");
				   else 
					   counterSaleMaster.setCounterSaleEnteredBy("Cheque");
					
					}
				 else
					 counterSaleMaster.setCounterSaleEnteredBy("");
				
				if(row[14]!=null)
					counterSaleMaster.setCounterTaxVat55(Double.parseDouble(row[14].toString()));
				else
					counterSaleMaster.setCounterTaxVat55(0.0);
				
				if(row[15]!=null)
					counterSaleMaster.setCounterTaxVat6(Double.parseDouble(row[15].toString()));
				else
					counterSaleMaster.setCounterTaxVat6(0.0);
				
				if(row[16]!=null)
					counterSaleMaster.setCounterTaxVat135(Double.parseDouble(row[16].toString()));
				else
					counterSaleMaster.setCounterTaxVat135(0.0);
				
				if(row[17]!=null)
					counterSaleMaster.setCounterTaxBankName((row[17].toString()));
				else
					counterSaleMaster.setCounterTaxBankName("");
				
				if(row[18]!=null)
					counterSaleMaster.setCounterTaxChequeNo((row[18].toString()));
				else
					counterSaleMaster.setCounterTaxChequeNo("");
				
				if(row[19]!=null)
					counterSaleMaster.setCoutersalecd(Double.parseDouble(row[19].toString()));
				else
					counterSaleMaster.setCoutersalecd(0.0);
				
				if(row[20]!=null)
					counterSaleMaster.setCoutersalecdamt(Double.parseDouble(row[20].toString()));
				else
					counterSaleMaster.setCoutersalecdamt(0.0);
				
				if(row[21]!=null)
					counterSaleMaster.setCounterTaxCardNo((row[21].toString()));
				else
					counterSaleMaster.setCounterTaxCardNo("");
				
				if(row[22]!=null)
					counterSaleMaster.setUnitCount(Integer.parseInt(row[22].toString()));
				else
					counterSaleMaster.setUnitCount(0);
				
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		//changes by Akshata
		List<CounterSaleSlave> counterSaleSlaves = new ArrayList<CounterSaleSlave>();
		try {
			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"CALL sp_get_print_data_from_counter_slave(:p_counter_id)");
			query.setParameter("p_counter_id", counterId);
			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				CounterSaleSlave counterSaleSlave = new CounterSaleSlave();
				
				if(row[0]!=null)
				{	
					Double a=Double.parseDouble(row[0].toString());
					String result1[]=row[0].toString().split("\\.");
					
					counterSaleSlave.setCounterSlaveQty(Integer.parseInt(result1[0]));
				}	

				if(row[1]!=null)
					counterSaleSlave.setCounterSlaveMrp(Double.parseDouble(row[1].toString()));
				
				if(row[2]!=null)
					counterSaleSlave.setCounterSlaveRate(Double.parseDouble(row[2].toString()));
				
				if(row[3]!=null)
					counterSaleSlave.setCounterSlaveAmt(Double.parseDouble(row[3].toString()));

				if(row[4]!=null)
					counterSaleSlave.setCounterSaleBatchCode(row[4].toString());
				else
					counterSaleSlave.setCounterSaleBatchCode("");
				
				if(row[5]!=null)
					counterSaleSlave.setCounterSaleBatchExpiry(row[5].toString());
				else
					counterSaleSlave.setCounterSaleBatchExpiry("");
				
				ProductMaster productMaster=new ProductMaster();
				if(row[6]!=null)
				{	
					productMaster.setProductName(row[6].toString());
				}	
				else
				{	
					productMaster.setProductName("");
				}
				
				counterSaleSlave.setProductMaster(productMaster);
				
				if(row[11]!=null)
				{	
					productMaster.setProductDesc(row[11].toString());
				}	
				else
				{	
					productMaster.setProductDesc("");
				}
				
				if(row[7]!=null)
					counterSaleSlave.setCounterSlaveVat(Double.parseDouble(row[7].toString()));
				else
					counterSaleSlave.setCounterSlaveVat(0.0);
				
				if(row[8]!=null)
					counterSaleSlave.setCounterSlaveVatAmt(Double.parseDouble(row[8].toString()));
				else
					counterSaleSlave.setCounterSlaveVatAmt(0.0);
				
				if(row[9]!=null)
					counterSaleSlave.setCounterSlaveRateForPrint(Double.parseDouble(row[9].toString()));
				else
					counterSaleSlave.setCounterSlaveRateForPrint(0.0);
				
				if(row[10]!=null)
					counterSaleSlave.setCounterSlaveDisc(Double.parseDouble(row[10].toString()));
				else
					counterSaleSlave.setCounterSlaveDisc(0.0);
				
				if(row[12]!=null)
					counterSaleSlave.setCounterslaveunit(Integer.parseInt(row[12].toString()));
				else
					counterSaleSlave.setCounterslaveunit(0);
				
				counterSaleSlaves.add(counterSaleSlave);
			}

		}
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		counterSaleMaster.setLtCounterSlave(counterSaleSlaves);
			
		return counterSaleMaster;
	}
//print method counterSlaveQty counterSlaveMrp counterSlaveRate counterSlaveAmt counterSaleBatchCode counterSaleBatchExpiry productMaster.productName
	
	
	public List<CounterSaleMaster> getCounterSales(Integer unitId) {

		List<CounterSaleMaster> saleMasters = new ArrayList<CounterSaleMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CounterSaleMaster.class);
			criteria.add(Restrictions.eq("counterSaleDeleteFlag", 0));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.addOrder(Order.desc("counterSaleId"));
			criteria.setMaxResults(10);

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("counterSalePatientName"));
			proList.add(Projections.property("counterSaleEnteredBy"));
			proList.add(Projections.property("counterSaleNetAmt"));
			proList.add(Projections.property("counterSaleId"));
		
			proList.add(Projections.property("counterSaleForDate"));
			proList.add(Projections.property("unitCount"));

			criteria.setProjection(proList);
			@SuppressWarnings("unchecked")
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {

				CounterSaleMaster counterSaleMaster = new CounterSaleMaster();
				counterSaleMaster.setCounterSalePatientName(master[0].toString());

				counterSaleMaster.setCounterSaleEnteredBy(master[1].toString());
				
				counterSaleMaster.setUnitCount(Integer.parseInt(master[5].toString()));

				counterSaleMaster.setCounterSaleNetAmt(Double.parseDouble(master[2].toString()));

				counterSaleMaster.setCounterSaleId(Integer.parseInt(master[3].toString()));

				if (master[4] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
					String str[] = master[4].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);
					counterSaleMaster.setCounterSaleAddress(stringBuffer.toString());
				}

				saleMasters.add(counterSaleMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;

	}

	@Override
	public Double getLastCounterAmount() {
		Double results = 0.0;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CounterSaleMaster.class);

			criteria.add(Restrictions.eq("counterSaleDeleteFlag", 0));
			criteria.addOrder(Order.desc("counterSaleId"));
			ProjectionList projList = Projections.projectionList();

			projList.add(Projections.property("counterSaleNetAmt"));
			criteria.setMaxResults(1);
			criteria.setProjection(projList);
			results = (Double) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return results;

	}

	@Override
	public Integer getLastBillNumber() {
		Integer r = 0;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CounterSaleMaster.class);

			criteria.add(Restrictions.eq("counterSaleDeleteFlag", 0));
			criteria.addOrder(Order.desc("counterSaleId"));
			ProjectionList projList = Projections.projectionList();

			projList.add(Projections.property("counterSaleId"));
			criteria.setMaxResults(1);
			criteria.setProjection(projList);
			r = (Integer) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return r;

	}

	@Override
	public Boolean deleteCounterSale(Integer counterSaleId) {
		// TODO Auto-generated method stub
		try {
			CounterSaleMaster counterSaleMaster = (CounterSaleMaster) sessionFactory.getCurrentSession()
					.get(CounterSaleMaster.class, counterSaleId);
			counterSaleMaster.setCounterSaleDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<CounterSaleMaster> getAutoSuggestionPatientNames(String letter,Integer unitId) {

		List<CounterSaleMaster> saleMasters = new ArrayList<CounterSaleMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CounterSaleMaster.class);
			criteria.add(Restrictions.eq("counterSaleDeleteFlag", 0));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.like("counterSalePatientName", letter, MatchMode.ANYWHERE));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("counterSalePatientName"));
			proList.add(Projections.property("counterSaleEnteredBy"));
			proList.add(Projections.property("counterSaleNetAmt"));
			proList.add(Projections.property("counterSaleId"));
			proList.add(Projections.property("unitCount"));
			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {

				CounterSaleMaster counterSaleMaster = new CounterSaleMaster();
				if (master[0].toString() != null)
					counterSaleMaster.setCounterSalePatientName(master[0].toString());
				else
					counterSaleMaster.setCounterSalePatientName("");

				if (master[1].toString() != null)
					counterSaleMaster.setCounterSaleEnteredBy(master[1].toString());
				else
					counterSaleMaster.setCounterSaleEnteredBy("");

				if (master[2].toString() != null)
					counterSaleMaster.setCounterSaleNetAmt(Double.parseDouble(master[2].toString()));
				else
					counterSaleMaster.setCounterSaleNetAmt(0.0);

				if (master[3].toString() != null)
					counterSaleMaster.setCounterSaleId(Integer.parseInt(master[3].toString()));
				else
					counterSaleMaster.setCounterSaleId(0);
				
				if (master[4].toString() != null)
					counterSaleMaster.setUnitCount(Integer.parseInt(master[4].toString()));
				else
					counterSaleMaster.setUnitCount(0);

				saleMasters.add(counterSaleMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;

	}

	@Override
	public List<CounterSaleMaster> getAutoSuggestionRegNo(Integer letter,Integer unitId) {

		List<CounterSaleMaster> saleMasters = new ArrayList<CounterSaleMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CounterSaleMaster.class);
			criteria.add(Restrictions.eq("counterSaleDeleteFlag", 0));
			criteria.add(Restrictions.eq("unitId", unitId));
			//criteria.add(Restrictions.like("counterSaleId", letter));
			criteria.add(Restrictions.like("unitCount", letter));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("counterSalePatientName"));
			proList.add(Projections.property("counterSaleEnteredBy"));
			proList.add(Projections.property("counterSaleNetAmt"));
			proList.add(Projections.property("counterSaleId"));
			proList.add(Projections.property("unitCount"));
			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {

				CounterSaleMaster counterSaleMaster = new CounterSaleMaster();
				counterSaleMaster.setCounterSalePatientName(master[0].toString());

				counterSaleMaster.setCounterSaleEnteredBy(master[1].toString());

				counterSaleMaster.setCounterSaleNetAmt(Double.parseDouble(master[2].toString()));

				counterSaleMaster.setCounterSaleId(Integer.parseInt(master[3].toString()));
				
				counterSaleMaster.setUnitCount(Integer.parseInt(master[4].toString()));

				saleMasters.add(counterSaleMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;
	}

	@Override
	public List<CounterSaleMaster> getCounterBillId(Integer CounterSaleId,Integer unitId) {

		List<CounterSaleMaster> saleMasters = new ArrayList<CounterSaleMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CounterSaleMaster.class);
			criteria.add(Restrictions.eq("counterSaleDeleteFlag", 0));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.like("unitCount", CounterSaleId));
			//criteria.add(Restrictions.eq("counterSaleId", CounterSaleId));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("counterSalePatientName"));
			proList.add(Projections.property("counterSaleEnteredBy"));
			proList.add(Projections.property("counterSaleNetAmt"));
			proList.add(Projections.property("counterSaleId"));
			proList.add(Projections.property("counterSaleForDate"));
			proList.add(Projections.property("unitCount"));
			
			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					CounterSaleMaster counterSaleMaster = new CounterSaleMaster();
					counterSaleMaster.setCounterSalePatientName(master[0].toString());

					counterSaleMaster.setCounterSaleEnteredBy(master[1].toString());

					counterSaleMaster.setCounterSaleNetAmt(Double.parseDouble(master[2].toString()));

					counterSaleMaster.setCounterSaleId(Integer.parseInt(master[3].toString()));
					
					counterSaleMaster.setUnitCount(Integer.parseInt(master[5].toString()));

					counterSaleMaster.setCounterSaleForTime("CS" + master[5].toString());

					if (master[4] != null) {
						SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
						String str[] = master[4].toString().split(" ");

						String date[] = str[0].split("-");
						StringBuffer stringBuffer = new StringBuffer();
						stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);
						counterSaleMaster.setCounterSaleAddress(stringBuffer.toString());
					}

					saleMasters.add(counterSaleMaster);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;
	}	
	//changed by Akshata
	@Override
	public List<CounterSaleMaster> getAllCounterReceiptDataByPatientName(String ptientName) {
		List<CounterSaleMaster> counterSaleMasters = new ArrayList<CounterSaleMaster>();
		try {
			Query query = sessionFactory.getCurrentSession()
					.createQuery(" select counterSaleId from CounterSaleMaster  where "
							+ " counterSaleStatus = 'pending' and counterSalePatientName ='" + ptientName + "'");

			List<Object> rows = query.list();

			for (Object master : rows) {
				CounterSaleMaster counterSaleMaster = new CounterSaleMaster();
				/* IndentMaster indentSale = new IndentMaster(); */

				if (master != null)
					counterSaleMaster.setCounterSaleId(Integer.parseInt(master.toString()));

				counterSaleMasters.add(counterSaleMaster);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return counterSaleMasters;
	}
	//Added by Akshata
	@Override
	public List<CreditNoteCounterSale> getAllCounterSaleBillData(Integer patientId) {
	
		try {
			Query query = sessionFactory.getCurrentSession().createSQLQuery(
							"Call sp_get_all_counter_sale_bill_data(:p_patient_id)");
			query.setParameter("p_patient_id", patientId);
			query.setResultTransformer(Transformers.aliasToBean(CreditNoteCounterSale.class));
			@SuppressWarnings("unchecked")
			List<CreditNoteCounterSale> creditNoteCounters = query.list();
			return creditNoteCounters;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
}

package com.hms.pharmacy.dao.impl;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.xmlbeans.impl.xb.xsdschema.RestrictionDocument.Restriction;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.pharmacy.dao.CreditNoteDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.CreditNoteMaster;
import com.hms.pharmacy.pojo.CreditNoteSlave;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.ProductByBatch;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.StockMaster;

@Repository
public class CreditNoteDaoImpl implements CreditNoteDao {
	@Autowired
	SessionFactory sessionFactory;
	
	Map<String, String> result = new HashMap<String, String>();
	List<StockMaster> stockMasters = new ArrayList<StockMaster>();
	int count = 0;

	@Override
	public Map<String, String> saveOrUpdateCreditNote(CreditNoteMaster creditNoteMaster,
			String storeId) {
		result = new HashMap<String, String>();
		try {
			stockMasters = new ArrayList<StockMaster>();
			count = 0;

			if (saveBatchStockDetails(creditNoteMaster, storeId)) 
			{
				int id=(Integer) sessionFactory.getCurrentSession().save(creditNoteMaster);
				result.put("result", ""+id);
			} else {
				result.put("result", "Error");
			}
			/* saveBatchStockDetails(patientSaleBillMaster); */

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
}

	public boolean saveBatchStockDetails(CreditNoteMaster creditNoteMaster,
			String storeId) 
	{
		boolean result = true;
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		for (CreditNoteSlave slave : creditNoteMaster.getCreditNoteSlaves()) {
			if (slave.getCreditNoteSlaveCode().equalsIgnoreCase("Stock")) {
				BatchMaster batchMaster = new BatchMaster();
				batchMaster.setBatchId(slave.getProductMaster()
						.getBatchMaster().get(0).getBatchId());

				StockMaster stockMaster = new StockMaster();
				stockMaster.setStockId(slave.getProductMaster()
						.getBatchMaster().get(0).getStockMaster().getStockId());

				

				stockMaster.setStockQtyInHand(Double.parseDouble(slave
						.getCreditSlaveQty().toString()));
				batchMaster.setStockMaster(stockMaster);
				batchMasters.add(batchMaster);
			}
		}

		if (storeId == null) {
			try {
				for (BatchMaster batchMaster : batchMasters) {
					BatchMaster batchMaster2 = getBatchDetails(batchMaster
							.getBatchId());
					if (batchMaster2.getBatchDeleteFlag() == 1) {
						batchMaster2.setBatchDeleteFlag(0);
					}
					StockMaster stockMaster = batchMaster2.getStockMaster();
					Double qty = null;

					
					qty = (stockMaster.getStockQtyInHand() + batchMaster
							.getStockMaster().getStockQtyInHand());

					stockMaster.setStockQtyInHand(qty);
					batchMaster2.setStockMaster(stockMaster);
					sessionFactory.getCurrentSession().saveOrUpdate(
							batchMaster2);
				}
			} catch (Exception e) {
				e.printStackTrace();

			}
		} else {
			try {
				for (BatchMaster batchMaster : batchMasters) {
					checkAvailibility(batchMaster.getBatchId(), batchMaster
							.getStockMaster().getStockQtyInHand(), storeId);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

			if (count == 0) {
				increaseStock(storeId);
			}else
			{
				return false;
			}
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
				SQLQuery query = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"SELECT store_name FROM pharma_sub_store_master where store_id='"
										+ storeId + "'");
				storeName = query.uniqueResult();
			} catch (Exception e) {
				e.printStackTrace();
			}
			strQuery = "SELECT stock_qty_in_hand FROM pharma_"
					+ storeName.toString()
					+ "_stock_master where stock_batch_id='" + batchId + "'";
		} else {
			strQuery = "SELECT stock_qty_in_hand FROM pharma_stock_master where stock_batch_id='"
					+ batchId + "'";
		}

		try {

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
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

	public boolean checkAvailibilityForDelete(Integer batchId, Double Qty,
			String storeId) {
		StockMaster stockMaster = new StockMaster();
		boolean result = false;
		String strQuery = "";
		Object storeName = new Object();

		if (storeId != null) {
			try {
				SQLQuery query = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"SELECT store_name FROM pharma_sub_store_master where store_id='"
										+ storeId + "'");
				storeName = query.uniqueResult();
			} catch (Exception e) {
				e.printStackTrace();
			}
			strQuery = "SELECT stock_qty_in_hand FROM pharma_"
					+ storeName.toString()
					+ "_stock_master where stock_batch_id='" + batchId + "'";
		} else {
			strQuery = "SELECT stock_qty_in_hand FROM pharma_stock_master where stock_batch_id='"
					+ batchId + "'";
		}

		try {

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					strQuery);
			Double availableStock = null;
			Double totalStock = 0.0;
			Object rows = query.uniqueResult();

			if (rows != null) {
				availableStock = Double.parseDouble(rows.toString());
			}

			totalStock = availableStock - Qty;
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

	public boolean increaseStock(String storeId) {

		try {
			if (count == 0) {
				if (storeId == null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					String date = dateFormat.format(new java.util.Date());

					for (StockMaster master : stockMasters) {
						try {
							Query query1 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"update pharma_stock_master set stock_qty_in_hand='"
													+ master.getStockQtyInHand()
													+ "',stock_update_date='"
													+ date
													+ "' where stock_batch_id=:batchId");
							query1.setInteger("batchId", master
									.getBatchMaster().getBatchId());
							int rowsDeleted = query1.executeUpdate();
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				} else {
					Object storeName = "";
					try {
						SQLQuery query = sessionFactory.getCurrentSession()
								.createSQLQuery(
										"SELECT store_name FROM pharma_sub_store_master where store_id='"
												+ storeId + "'");
						storeName = query.uniqueResult();
					} catch (Exception e) {
						e.printStackTrace();
					}
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					String date = dateFormat.format(new java.util.Date());

					for (StockMaster master : stockMasters) {
						try {
							Query query1 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"update pharma_"
													+ storeName
													+ "_stock_master set stock_qty_in_hand='"
													+ master.getStockQtyInHand()
													+ "',stock_update_date='"
													+ date
													+ "' where stock_batch_id=:batchId");
							query1.setInteger("batchId", master
									.getBatchMaster().getBatchId());
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
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				BatchMaster.class);
		criteria.add(Restrictions.eq("batchId", batchId))
				.createAlias("productMaster", "productMaster")
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
				batchMaster.setBatchDeleteFlag(Integer.parseInt(master[3]
						.toString()));
			}
			if (master[4] != null) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[4].toString());
				batchMaster.setBatchUpdateDate(date);
			}
			if (master[5] != null) {
				productMaster.setProductId(Integer.parseInt(master[5]
						.toString()));
			}
			if (master[6] != null) {
				stockMaster.setStockId(Integer.parseInt(master[6].toString()));
			}
			if (master[7] != null) {
				stockMaster.setStockQtyInHand(Double.parseDouble(master[7]
						.toString()));
			}
			if (master[8] != null) {
				stockMaster.setStockQtyOnOrder(Integer.parseInt(master[8]
						.toString()));
			}
			if (master[9] != null) {
				stockMaster.setStockYearId(Integer.parseInt(master[9]
						.toString()));
			}
			if (master[10] != null) {
				stockMaster.setStockDeleteFlag(Integer.parseInt(master[10]
						.toString()));
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
	public List<CreditNoteMaster> getCreditNoteList() {
		

		List<CreditNoteMaster> creditNoteMasters = new ArrayList<CreditNoteMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CreditNoteMaster.class);
			criteria.add(Restrictions.eq("creditNoteDeleteFlag", 0));
			criteria.addOrder(Order.desc("creditNoteId"));
			criteria.setMaxResults(10);
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("creditNoteId"));
			proList.add(Projections.property("creditNoteDocNo"));
			proList.add(Projections.property("creditNotDate"));
			proList.add(Projections.property("patientName"));
			proList.add(Projections.property("creditNoteBillNo"));
			proList.add(Projections.property("creditPatientId"));
			proList.add(Projections.property("patientName"));
			proList.add(Projections.property("patientPhone"));
			/* proList.add(Projections.property("creditNoteTreatmentId")); */

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				CreditNoteMaster creditNoteMaster = new CreditNoteMaster();
				creditNoteMaster.setCreditNoteId(Integer.parseInt(master[0]
						.toString()));

				if (master[1] != null)
					creditNoteMaster.setCreditNoteDocNo(master[1].toString());
				else
					creditNoteMaster.setCreditNoteDocNo("");

				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[2].toString());
				creditNoteMaster.setCreditNotDate(date);

				if (master[3] != null)
					creditNoteMaster.setPatientName(master[3].toString());
				else
					creditNoteMaster.setPatientName("");

				if (master[4] != null)
					creditNoteMaster.setCreditNoteBillNo(master[4].toString());
				else
					creditNoteMaster.setCreditNoteBillNo("");

				if (master[5] != null)
					creditNoteMaster.setCreditPatientId(Integer
							.parseInt(master[5].toString()));
				else
					creditNoteMaster.setCreditPatientId(0);

				if (master[6] != null)
					creditNoteMaster.setPatientName((master[6].toString()));
				else
					creditNoteMaster.setPatientName((""));

				if (master[7] != null)
					creditNoteMaster.setPatientPhone((master[7].toString()));
				else
					creditNoteMaster.setPatientPhone((""));

				

				creditNoteMasters.add(creditNoteMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return creditNoteMasters;
		}
		return creditNoteMasters;
	}

	@Override
	public List<CreditNoteMaster> getCreditNotebyPatientId(Integer patId) {
		List<CreditNoteMaster> creditNoteMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CreditNoteMaster.class);
			criteria.add(Restrictions.eq("creditNoteDeleteFlag", 0));
			if (patId != 0) {
				criteria.add(Restrictions.eq("patientMaster.patId", patId));
			}
			creditNoteMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return creditNoteMasters;
		}
		return creditNoteMasters;
	}

	@Override
	public CreditNoteMaster getCreditNotebyCreditId(Integer creditNoteId) {
		

		CreditNoteMaster saleMaster = new CreditNoteMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CreditNoteMaster.class);
			criteria.add(Restrictions.eq("creditNoteDeleteFlag", 0));

			if (creditNoteId != 0) {
				criteria.add(Restrictions.eq("creditNoteId", creditNoteId));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("creditNoteId"));
			proList.add(Projections.property("patientName"));
			proList.add(Projections.property("creditNoteDocNo"));
			proList.add(Projections.property("creditNotDate"));
			proList.add(Projections.property("creditNoteBillNo"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					saleMaster.setCreditNoteId(Integer.parseInt(master[0]
							.toString()));
				}
				if (master[1] != null && master[1] != "null" && master[1] != "") {
					saleMaster.setPatientName(master[1].toString());
				} else {
					saleMaster.setPatientName("");
				}
				if (master[2] != null && master[2] != "null" && master[2] != "") {
					saleMaster.setCreditNoteDocNo(master[2].toString());
				} else {
					saleMaster.setCreditNoteDocNo("");
				}
				if (master[3] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[3].toString());

					saleMaster.setCreditNotDate(date);
				}
				if (master[4] != null && master[4] != "null" && master[4] != "") {
					saleMaster.setCreditNoteBillNo(master[4].toString());
				} else {
					saleMaster.setCreditNoteBillNo("");
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMaster;
		}
		return saleMaster;
	}

	@Override
	public boolean deleteCreditNote(Integer creditNoteId) {

		try {
			org.hibernate.Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_credit_note_master set credit_note_delete_flag=1 where credit_note_id="
									+ creditNoteId);

			stockMasters = new ArrayList<StockMaster>();
			count = 0;

			CreditNoteMaster creditNoteMaster = getCreditNotebyCreditIdForPrint(creditNoteId);

			String storeId = null;
			if (creditNoteMaster.getCreditNoteStoreId() != 0) {
				storeId = creditNoteMaster.getCreditNoteStoreId().toString();
			}

			for (CreditNoteSlave slave : creditNoteMaster.getCreditNoteSlaves()) {

				checkAvailibilityForDelete(
						slave.getCreditNoteSlaveBatchId(),
						Double.parseDouble(slave.getCreditSlaveQty().toString()),
						storeId);
			}

			try {
				increaseStock(storeId);
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

	@Override
	public ProductMaster getProductDetails(Integer productId) {

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				ProductMaster.class);
		criteria.add(Restrictions.eq("productId", productId));

		return (ProductMaster) criteria.uniqueResult();

	}

	

	@Override
	public List<PatientSaleBillMaster> getAutoSuggestionProduct(String letter,
			String BillNum) {
		// TODO Auto-generated method stub
		List<PatientSaleBillMaster> patientSaleBillMasters = null;
		try {
			Criteria criteria = sessionFactory
					.getCurrentSession()
					.createCriteria(PatientSaleBillMaster.class)
					.createAlias("ltPatientSaleBill", "patientSlave",
							CriteriaSpecification.LEFT_JOIN)
					.createAlias("patientSlave.productMaster", "product");
			criteria.add(Restrictions.eq("patientSalesBillDocNo", BillNum));
			/* criteria.add(Restrictions.eq("productDeleteFlag", 0)); */
			criteria.add(Restrictions.like("product.productName", letter,
					MatchMode.ANYWHERE));

			patientSaleBillMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return patientSaleBillMasters;
		}
		return patientSaleBillMasters;
	}

	@Override
	public List<CreditNoteMaster> autoSuggestionPatient(String letter) {
	

		List<CreditNoteMaster> saleMasters = new ArrayList<CreditNoteMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CreditNoteMaster.class);
			criteria.add(Restrictions.eq("creditNoteDeleteFlag", 0));
			criteria.add(Restrictions.like("patientName", letter,
					MatchMode.ANYWHERE));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("patientName"));
			proList.add(Projections.property("creditNoteId"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				CreditNoteMaster creditNoteMaster = new CreditNoteMaster();
				creditNoteMaster.setPatientName(master[0].toString());
				creditNoteMaster.setCreditNoteId(Integer.parseInt(master[1]
						.toString()));
				saleMasters.add(creditNoteMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;
	}

	@Override
	public List<ProductByBatch> autoSuggestionProductByBatch(Integer productId) {
		List<ProductByBatch> productByBatchs = new ArrayList<ProductByBatch>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							"select batch.batch_code,batch.batch_exp_date,pur_cor.pur_cor_mrp,pur_cor.pur_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id,pur_cor.pur_purchase_rate,tax.tax_rate  from pharma_purchase_correction pur_cor inner join pharma_batch_master batch ON pur_cor.pur_cor_BatchId = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_product_tax_relation product_tax ON product.product_id = product_tax.product_id inner join pharma_tax_master tax ON tax.tax_id = product_tax.tax_id where "
									+ " batch.batch_product_id="
									+ productId
									+ " and  batch.batch_delete_flag=1 and tax.tax_name='vat' order by batch_exp_date desc ");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				ProductByBatch productByBatch = new ProductByBatch();

				if (row[0] != null)
					productByBatch.setBatchCode(row[0].toString());

				if (row[1] != null)
					productByBatch.setBatchExpDate(row[1].toString());

				if (row[2] != null)
					productByBatch.setMRP(row[2].toString());

				if (row[3] != null)
					productByBatch.setPurchaseRate(row[3].toString());

				if (row[4] != null)
					productByBatch.setClearStock(row[4].toString());

				if (row[5] != null)
					productByBatch.setBatchId(row[5].toString());

				if (row[6] != null)
					productByBatch.setStockId(row[6].toString());

				if (row[7] != null)
					productByBatch.setRate(row[7].toString());

				if (row[8] != null)
					productByBatch.setVat(row[8].toString());

				productByBatch.setPurchaseSlaveId("0");

				productByBatchs.add(productByBatch);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return productByBatchs;
		}
		return productByBatchs;
	}

	@Override
	public CreditNoteMaster getCreditNotebyCreditIdForPrint(Integer creditNoteId) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				CreditNoteMaster.class,"CreditNoteMaster");
		System.out.println("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{");
		criteria.setFetchMode("CreditNoteMaster.creditNoteSlaves", FetchMode.JOIN);
		criteria.createAlias("CreditNoteMaster.creditNoteSlaves", "creditNoteSlaves");
		
		criteria.add(Restrictions.eq("creditNoteDeleteFlag", 0));

		if (creditNoteId != 0) {
			criteria.add(Restrictions.eq("creditNoteId", creditNoteId));
		}

		CreditNoteMaster creditNoteMaster = new CreditNoteMaster();

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("creditNoteId"));
		proList.add(Projections.property("creditNoteDocNo"));
		proList.add(Projections.property("creditNotDate"));
		proList.add(Projections.property("patientName"));
		proList.add(Projections.property("patientPhone"));
		proList.add(Projections.property("creditNoteLess"));
		proList.add(Projections.property("creditNoteGrossAmt"));
		proList.add(Projections.property("creditNoteAdd"));
		proList.add(Projections.property("creditNoteNetAmt"));
		proList.add(Projections.property("patientAddress"));
		proList.add(Projections.property("creditTaxVat5"));
		proList.add(Projections.property("creditTaxVat12"));
		proList.add(Projections.property("creditTaxVat0"));
		proList.add(Projections.property("creditTaxVat55"));
		proList.add(Projections.property("creditNoteStoreId"));

		proList.add(Projections.property("creditNotePayable"));
		proList.add(Projections.property("creditNotePrevBal"));
		proList.add(Projections.property("creditTaxVat6"));
		proList.add(Projections.property("creditTaxVat135"));

		proList.add(Projections.property("creditNotePatientSaleId"));
		proList.add(Projections.property("creditNoteCounterSaleId"));
		proList.add(Projections.property("creditNoteSlaves.creditNoteSlaveIndentId"));
		

		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					creditNoteMaster.setCreditNoteId(Integer.parseInt(row[0]
							.toString()));

				if (row[1] != null) {
					creditNoteMaster.setCreditNoteDocNo(row[1].toString());
				} else
					creditNoteMaster.setCreditNoteDocNo("");

				if (row[2] != null) {
					

					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy/MM/dd");
					String str[] = row[2].toString().split(" ");
					creditNoteMaster.setPatientAddress(str[0]);
				}

				if (row[3] != null) {
					creditNoteMaster.setPatientName(row[3].toString());
				} else {
					creditNoteMaster.setPatientName("");
				}

				if (row[4] != null) {
					creditNoteMaster.setPatientPhone(row[4].toString());
				} else {
					creditNoteMaster.setPatientPhone("");
				}
				if (row[5] != null) {
					creditNoteMaster.setCreditNoteLess(row[5].toString());
				} else {
					creditNoteMaster.setCreditNoteLess("");
				}
				if (row[6] != null) {
					creditNoteMaster.setCreditNoteGrossAmt(Double
							.parseDouble(row[6].toString()));
				}
				if (row[7] != null) {
					creditNoteMaster.setCreditNoteAdd(row[7].toString());
				} else {
					creditNoteMaster.setCreditNoteAdd("");
				}
				if (row[8] != null) {
					creditNoteMaster.setCreditNoteNetAmt(Double
							.parseDouble(row[8].toString()));
				}

				if (row[9] != null) {
					creditNoteMaster.setCreditNoteDiscount(row[9].toString());
				} else {
					creditNoteMaster.setCreditNoteDiscount("");
				}

				if (row[10] != null) {
					creditNoteMaster.setCreditTaxVat5(Double
							.parseDouble(row[10].toString()));
				} else {
					creditNoteMaster.setCreditTaxVat5(0.0);
				}

				if (row[11] != null) {
					creditNoteMaster.setCreditTaxVat12(Double
							.parseDouble(row[11].toString()));
				} else {
					creditNoteMaster.setCreditTaxVat12(0.0);
				}

				if (row[12] != null) {
					creditNoteMaster.setCreditTaxVat0(Double
							.parseDouble(row[12].toString()));
				} else {
					creditNoteMaster.setCreditTaxVat0(0.0);
				}

				if (row[13] != null) {
					creditNoteMaster.setCreditTaxVat55(Double
							.parseDouble(row[13].toString()));
				} else {
					creditNoteMaster.setCreditTaxVat55(0.0);
				}

				if (row[14] != null) {
					creditNoteMaster.setCreditNoteStoreId(Integer
							.parseInt(row[14].toString()));
				} else {
					creditNoteMaster.setCreditNoteStoreId(0);
				}

				if (row[15] != null) {
					creditNoteMaster.setCreditNotePayable(Double
							.parseDouble(row[15].toString()));
				} else {
					creditNoteMaster.setCreditNotePayable(0.0);
				}

				if (row[16] != null) {
					creditNoteMaster.setCreditNotePrevBal(Double
							.parseDouble(row[16].toString()));
				} else {
					creditNoteMaster.setCreditNotePrevBal(0.0);
				}
				
				if (row[17] != null) {
					creditNoteMaster.setCreditTaxVat6(Double
							.parseDouble(row[17].toString()));
				} else {
					creditNoteMaster.setCreditTaxVat6(0.0);
				}
				
				if (row[18] != null) {
					creditNoteMaster.setCreditTaxVat135(Double
							.parseDouble(row[18].toString()));
				} else {
					creditNoteMaster.setCreditTaxVat135(0.0);
				}
				
				if (row[19] != null && Integer.parseInt(row[19].toString())>0) {
					creditNoteMaster.setCreditNotePatientSaleId(Integer.parseInt(row[19].toString()));
					creditNoteMaster.setCreditNoteCounterSaleId(1);
				} 
				
				if (row[20] != null && Integer.parseInt(row[20].toString())>0) {
					creditNoteMaster.setCreditNotePatientSaleId(Integer.parseInt(row[20].toString()));
					creditNoteMaster.setCreditNoteCounterSaleId(2);
				} 
				
				if (row[21] != null && Integer.parseInt(row[21].toString())>0) {
					creditNoteMaster.setCreditNotePatientSaleId(Integer.parseInt(row[21].toString()));
					creditNoteMaster.setCreditNoteCounterSaleId(3);
				} 
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<CreditNoteSlave> purchaseSlaves = new ArrayList<CreditNoteSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							//added by Akshata
							"CALL sp_get_credit_note_print_data(:p_credit_note_id)");
							query.setParameter("p_credit_note_id", creditNoteId);
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				CreditNoteSlave purchaseSlave = new CreditNoteSlave();

				if (row[0] != null) {
					String result1[] = row[0].toString().split("\\.");
					purchaseSlave.setCreditSlaveQty(Integer
							.parseInt(result1[0]));
				}

				if (row[1] != null)
					purchaseSlave.setCreditNoteSlaveMrp(Double
							.parseDouble(row[1].toString()));

				if (row[2] != null)
					purchaseSlave.setCreditNoteSlaveRate(Double
							.parseDouble(row[2].toString()));

				if (row[3] != null)
					purchaseSlave.setCreditNoteSlaveAmt(Double
							.parseDouble(row[3].toString()));

				if (row[4] != null)
					purchaseSlave
							.setCreditNoteSlaveBatchCode(row[4].toString());
				else
					purchaseSlave.setCreditNoteSlaveBatchCode("");

				if (row[5] != null)
					purchaseSlave.setCreditNoteSlaveBatchExpiry(row[5]
							.toString());
				else
					purchaseSlave.setCreditNoteSlaveBatchExpiry("");

				ProductMaster productMaster = new ProductMaster();
				if (row[6] != null) {
					productMaster.setProductName(row[6].toString());
					purchaseSlave.setProductMaster(productMaster);
				} else {
					productMaster.setProductName("");
				}

				if (row[7] != null)
					purchaseSlave.setCreditSlaveVat(Double.parseDouble(row[7]
							.toString()));
				else
					purchaseSlave.setCreditSlaveVat(0.0);

				if (row[8] != null)
					purchaseSlave.setCreditSlaveVatAmt(Double
							.parseDouble(row[8].toString()));
				else
					purchaseSlave.setCreditSlaveVatAmt(0.0);

				if (row[9] != null)
					purchaseSlave.setCreditNoteSlaveBatchId(Integer
							.parseInt(row[9].toString()));

				purchaseSlaves.add(purchaseSlave);
				
				if (row[10] != null)
					purchaseSlave.setCreditNoteSlaveDiscAmt(Double
							.parseDouble(row[10].toString()));
				else
					purchaseSlave.setCreditNoteSlaveDiscAmt(0.0);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		creditNoteMaster.setCreditNoteSlaves(purchaseSlaves);

		return creditNoteMaster;
	}
	//Added By BILAL For reflection in IPD billing
	@Override
	public void updateIndentBillDetails(CreditNoteMaster creditNoteMaster) {

		int productId = 0;
		int batchId = 0;
		int indentId = 0;
		int qty = 0;
		Integer dbQty = 0;
		Double rate = 0.0;
		Double amount = 0.0;
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		String date = simpleDateFormat.format(new Date());
		for (int i = 0; i < creditNoteMaster.getCreditNoteSlaves().size(); i++) {
			productId = creditNoteMaster.getCreditNoteSlaves().get(i)
					.getProductMaster().getProductId();
			batchId = creditNoteMaster.getCreditNoteSlaves().get(i)
					.getProductMaster().getBatchMaster().get(0).getBatchId();
			indentId = creditNoteMaster.getCreditNoteSlaves().get(i)
					.getCreditNoteSlaveIndentId();
			qty = creditNoteMaster.getCreditNoteSlaves().get(i)
					.getCreditSlaveQty();

			amount = creditNoteMaster.getCreditNoteSlaves().get(i)
					.getCreditNoteSlaveAmt();
			int treatmentId =creditNoteMaster.getCreditNoteTreatmentId();
			SQLQuery query01 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT bill_id FROM ehat_bill_master where treatment_id='"
							+ treatmentId + "' ");
			int billId = (Integer) query01.uniqueResult();
			
			
			SQLQuery query03 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT patient_id FROM ehat_bill_master where treatment_id='"
							+ treatmentId + "' ");
			int patientId = (Integer) query03.uniqueResult();
			SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT count(*) FROM ehat_bill_details_ipd where bill_id='"
							+ billId + "'");
			SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT source_type_id FROM ehat_bill_master where treatment_id='"
							+ treatmentId + "' ");
			int sponserID = (Integer) query4.uniqueResult();
			
			try {
				SQLQuery editQuery = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"select quantity,net_amount from ipdbill_pharmacy_indent_slave where indent_id="
										+ indentId
										+ " and product_id="
										+ productId
										+ " and batch_id="
										+ batchId + "");

				Object[] editQuery1 = (Object[]) editQuery.uniqueResult();

				dbQty = Integer.parseInt(editQuery1[0].toString());

				Double dbAmount = Double.parseDouble(editQuery1[1].toString());

				qty = dbQty - qty;

				if (qty != 0)
					amount = dbAmount - amount;
				else
					amount = 0.0;

				DecimalFormat df = new DecimalFormat("###.##");

				amount = Double.parseDouble(df.format(amount));
			} catch (Exception e) {
				e.printStackTrace();
			}

			try {
				Double pay=0.0;
				Double coPay=0.0;
				Double otherpay=0.0;
				Double othercoPay=0.0;
				/********************for sponsor patient****************/
				/*String discountsql = " select sp_dic_master_id from treatment where Treatment_ID='"+creditNoteMaster.getCreditNoteTreatmentId()+"'";
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(discountsql);
				Integer sponsorid = (Integer) query1.uniqueResult();*/
				
				if(sponserID > 0)
				{
					pay = amount;
					otherpay = amount;
					coPay = amount;
				}else{
					pay = amount;
					othercoPay=amount;
					coPay = amount;
				}
				
				org.hibernate.Query slave = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"update ipdbill_pharmacy_indent_slave set quantity="
										+ qty + ",net_amount=" + amount
										+ ",pay=" + pay+",co_pay=" + coPay+" where indent_id=" + indentId
										+ " and product_id=" + productId
										+ " and batch_id=" + batchId + " ");

				int slave1 = slave.executeUpdate();
				
				org.hibernate.Query ipdbilldetails = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"update ehat_bill_details_ipd set quantity="
										+ qty + ",amount=" + amount
										+ ",pay=" + pay+",co_pay=" + coPay+",other_amount=" + amount+",other_pay=" + pay+",other_co_pay=" + coPay+" where service_id=16 and drdesk_flag='P' and treatment_id=" + treatmentId
										+ " and sub_service_id=" + productId
										+ " and bill_id=" + billId
										+ " and patient_id=" + patientId + " ");

				int ipdbilldetailsquery = ipdbilldetails.executeUpdate();

			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	@Override
	public void savePendingIndentAmount(CreditNoteMaster creditNoteMaster,
			String type) {
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select amount_balance from pharma_indent_amount_details where treatment_id='"
						+ creditNoteMaster.getCreditNoteTreatmentId() + "' ");
		Object rows = (Object) query1.uniqueResult();

		if (type.equals("credit")) {
			Double total = (Double.parseDouble(rows.toString()) - creditNoteMaster
					.getCreditNoteNetAmt());

			DecimalFormat df = new DecimalFormat("###.###");

			total = Double.parseDouble(df.format(total));

			if (rows != null) {
				try {

					Calendar currentDate = Calendar.getInstance();
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"dd-MM-yyyy");
					String date = dateFormat.format(currentDate.getTime());

					org.hibernate.Query query = sessionFactory
							.getCurrentSession().createSQLQuery(
									"update pharma_indent_amount_details set amount_balance = "
											+ total
											+ " where treatment_id = "
											+ creditNoteMaster
													.getCreditNoteTreatmentId()
											+ "");
					int rowDeleted = query.executeUpdate();
					
					//Added By BILAL 
					org.hibernate.Query queryamounthistory = sessionFactory
							.getCurrentSession().createSQLQuery(
									"update pharma_patient_amount_history set amount_balance = "
											+ total
											+ " where treatment_id = "
											+ creditNoteMaster
													.getCreditNoteTreatmentId()
											+ "");
					int queryamounthistory1 = queryamounthistory.executeUpdate();

				} catch (Exception e) {
					e.printStackTrace();
				}

			}
		} else {
			DecimalFormat df = new DecimalFormat("###.###");

			

			Double pendingAmount = getPendingAmounttByTreatId(creditNoteMaster
					.getCreditNoteTreatmentId());
			Double finalAmount = 0.0;
			if (pendingAmount > 0) {
				finalAmount = pendingAmount
						- creditNoteMaster.getCreditNoteNetAmt();
				finalAmount = Double.parseDouble(df.format(finalAmount));

				if (finalAmount > 0) {

				} else {

					finalAmount = 0.0;

				}
			} else {
				finalAmount = pendingAmount;
			}

			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createSQLQuery(
							"update pharma_indent_amount_details set amount_balance = "
									+ finalAmount
									+ " where treatment_id = "
									+ creditNoteMaster
											.getCreditNoteTreatmentId() + "");
			
			//Added By BILAL 
			org.hibernate.Query queryamounthistory = sessionFactory
					.getCurrentSession().createSQLQuery(
							"update pharma_patient_amount_history set amount_balance = "
									+ finalAmount
									+ " where treatment_id = "
									+ creditNoteMaster
											.getCreditNoteTreatmentId()
									+ "");
			int queryamounthistory1 = queryamounthistory.executeUpdate();

			try {
				int rowDeleted = query.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public void savePendingPatientAmount(CreditNoteMaster creditNoteMaster,
			String type) {
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select amount_balance from pharma_patient_amount_details where treatment_id='"
						+ creditNoteMaster.getCreditNoteTreatmentId() + "' ");
		Object rows = (Object) query1.uniqueResult();

		// suraj code for cash and credit
		if (type.equals("credit")) {
			Double total = (Double.parseDouble(rows.toString()) - creditNoteMaster
					.getCreditNoteNetAmt());

			

			DecimalFormat df = new DecimalFormat("###.###");

			total = Double.parseDouble(df.format(total));

			if (rows != null) {
				try {

					Calendar currentDate = Calendar.getInstance();
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"dd-MM-yyyy");
					String date = dateFormat.format(currentDate.getTime());

					org.hibernate.Query query = sessionFactory
							.getCurrentSession().createSQLQuery(
									"update pharma_patient_amount_details set amount_balance = "
											+ total
											+ " where treatment_id = "
											+ creditNoteMaster
													.getCreditNoteTreatmentId()
											+ "");
					int rowDeleted = query.executeUpdate();
					//Added By BILAL 
					org.hibernate.Query queryamounthistory = sessionFactory
							.getCurrentSession().createSQLQuery(
									"update pharma_patient_amount_history set amount_balance = "
											+ total
											+ " where treatment_id = "
											+ creditNoteMaster
													.getCreditNoteTreatmentId()
											+ "");
					int queryamounthistory1 = queryamounthistory.executeUpdate();

				} catch (Exception e) {
					e.printStackTrace();
				}

			}
		} else {
			DecimalFormat df = new DecimalFormat("###.###");

			Double pendingAmount = /*
									 * getPatientPendingAmounttByTreatId(
									 * creditNoteMaster
									 * .getCreditNoteTreatmentId());
									 */Double.parseDouble(rows.toString());
			Double finalAmount = 0.0;
			if (pendingAmount > 0) {
				finalAmount = pendingAmount
						- creditNoteMaster.getCreditNoteNetAmt();
				finalAmount = Double.parseDouble(df.format(finalAmount));

				if (finalAmount > 0) {

				} else {

					finalAmount = 0.0;

				}
			} else {
				finalAmount = pendingAmount;
			}

			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createSQLQuery(
							"update pharma_patient_amount_details set amount_balance = "
									+ finalAmount
									+ " where treatment_id = "
									+ creditNoteMaster
											.getCreditNoteTreatmentId() + "");
			//Added By BILAL 
			org.hibernate.Query queryamounthistory = sessionFactory
					.getCurrentSession().createSQLQuery(
							"update pharma_patient_amount_history set amount_balance = "
									+ finalAmount
									+ " where treatment_id = "
									+ creditNoteMaster
											.getCreditNoteTreatmentId()
									+ "");
			int queryamounthistory1 = queryamounthistory.executeUpdate();

			try {
				int rowDeleted = query.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public void changePatientSaletatus(Integer patientSaleId) {
		try {
			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_patient_sales_bill_master set patient_Sale_status='received' where patient_sales_bill_id=:patientSaleId");
			query.setInteger("patientSaleId", patientSaleId);

			int rowsDeleted = query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void changeCounterSaletatus(Integer counterSaleId) {
		try {
			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" update pharma_counter_sale_master  set counter_sale_status = 'received' where counter_sale_id =:counterSaleId");
			query.setInteger("counterSaleId", counterSaleId);

			int rowsDeleted = query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void changeIndentSaleIssueQty(Integer indentSlaveId, Integer Qty,
			Integer BatchId) {
		Double rows1 = 0.0;
		try {
			SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT indent_sale_slave_issue_qty FROM pharma_indent_sale_slave where indent_sale_slave_master_id= "
									+ indentSlaveId
									+ " and indent_sale_slave_BatchId="
									+ BatchId);
			rows1 = (Double) query1.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();

		}
		Integer result = (int) (rows1 - Qty);
		try {
			Query query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_indent_sale_slave set indent_sale_slave_issue_qty='"
									+ result
									+ "' where indent_sale_slave_master_id=:indentSlaveId and indent_sale_slave_BatchId=:batchId");

			query1.setInteger("indentSlaveId", indentSlaveId);
			query1.setInteger("batchId", BatchId);

			int rowsDeleted = query1.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void changePatientSaleIssueQty(Integer patientSlaveId, Integer Qty) {

		Double rows1 = 0.0;
		try {
			SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT patient_sale_slave_issue_qty FROM pharma_patient_sales_bill_slave where  patient_slave_id= "
									+ patientSlaveId);
			rows1 = (Double) query1.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();

		}
		Integer result = (int) (rows1 - Qty);
		System.out.println(rows1);
		System.out.println(Qty);
		System.out.println(result);
		try {
			Query query1 = sessionFactory.getCurrentSession().createSQLQuery(
					"update pharma_patient_sales_bill_slave set patient_sale_slave_issue_qty='"
							+ result
							+ "' where patient_slave_id=:patientSlaveId ");

			query1.setInteger("patientSlaveId", patientSlaveId);

			int rowsDeleted = query1.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void changeCounterSaleIssueQty(Integer counterSlaveId, Integer Qty) {

		Double rows1 = 0.0;
		try {
			SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT counter_sale_slave_issue_qty FROM pharma_counter_sale_slave where  counter_slave_id= "
									+ counterSlaveId);
			rows1 = (Double) query1.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();

		}
		Integer result = (int) (rows1 - Qty);
		System.out.println(rows1);
		System.out.println(Qty);
		System.out.println(result);
		try {
			Query query1 = sessionFactory.getCurrentSession().createSQLQuery(
					"update pharma_counter_sale_slave set counter_sale_slave_issue_qty='"
							+ result
							+ "' where counter_slave_id=:counterSlaveId ");

			query1.setInteger("counterSlaveId", counterSlaveId);

			int rowsDeleted = query1.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public Double getPendingAmounttByTreatId(Integer treatmentId) {
		Double amount = 0.0;
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select amount_balance from pharma_indent_amount_details where treatment_id='"
						+ treatmentId + "' ");
		Object rows = (Object) query1.uniqueResult();
		if (rows != null)
			amount = Double.parseDouble(rows.toString());
		else
			amount = 0.0;

		return amount;
	}

	public Double getPatientPendingAmounttByTreatId(Integer treatmentId) {
		Double amount = 0.0;
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select amount_balance from pharma_patient_amount_details where treatment_id='"
						+ treatmentId + "' ");
		Object rows = (Object) query1.uniqueResult();
		if (rows != null)
			amount = Double.parseDouble(rows.toString());
		else
			amount = 0.0;

		return amount;
	}

	@Override
	public Double getTotalPaybleByTreatId(Integer treatmentId) {
		Double amount = 0.0;
		try {
			SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select sum(cm.credit_note_payable) from pharma_credit_note_master cm where cm.credit_note_treatmentId="
									+ treatmentId
									+ " and cm.credit_note_type='indentSale'");
			Object rows = (Object) query1.uniqueResult();
			if (rows != null)
				amount = Double.parseDouble(rows.toString());
			else
				amount = 0.0;

			return amount;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return amount;
	}

	@Override
	public JSONArray getCreditNoteDetailsBySaleId(Integer saleId,
			String saleType) {

		JSONArray jsonArray = new JSONArray();
		if (saleType.equals("indentSale")) {
			try {

				SQLQuery query = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"select c_m.credit_note_id,c_m.credit_note_dicscount,c_m.credit_note_net_amt,c_m.credit_note_date,c_m.credit_note_surcharge from pharma_credit_note_master c_m inner join pharma_credit_note_slave c_s ON c_s.credit_note_slave_master_id = c_m.credit_note_id inner join pharma_indent_sale_master s_m ON s_m.indent_sale_id = c_s.credit_note_slave_indent_id where s_m.indent_sale_id = "
										+ saleId + " group by credit_note_id;");
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
		} else {
			try {

				SQLQuery query = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"SELECT  c_m.credit_note_id,c_m.credit_note_less,c_m.credit_note_net_amt,c_m.credit_note_date,c_m.credit_note_add FROM pharma_credit_note_master c_m inner join pharma_patient_sales_bill_master p_m on p_m.patient_sales_bill_id=c_m.credit_note_patientSaleId where c_m.credit_note_patientSaleId="
										+ saleId + "");
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
		}

		return jsonArray;
	}

	@Override
	public List<CreditNoteMaster> searchCreditNoteByPatientId(Integer patientId) {
		// TODO Auto-generated method stub
		List<CreditNoteMaster> ltCreditNoteMaster = new ArrayList<CreditNoteMaster>();

		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT p.f_name,p.m_name,p.l_name, master.credit_note_id, master.credit_note_doc_no, master.credit_note_date, "
								+ " master.credit_note_patientId, master.credit_note_treatmentId FROM pharma_credit_note_master master "
								+ "  inner join ehat_patient p ON master.credit_note_patientId = p.patient_id where master.credit_note_delete_flag = '0' "
								+ " and master.credit_note_patientId ="
								+ patientId);

		@SuppressWarnings("unchecked")
		List<Object[]> result = query.list();

		try {
			for (Object[] row : result) {
				CreditNoteMaster creditnotemaster = new CreditNoteMaster();

				if (row[0] != null)
					creditnotemaster.setPatientName((row[0]
							.toString())
							+ " "
							+ (row[1].toString())
							+ " "
							+ (row[2].toString()));

				if (row[3] != null)
					creditnotemaster
							.setCreditNoteId(Integer.parseInt(row[3].toString()));
				else
					creditnotemaster.setCreditNoteId(0);

				if (row[4] != null)
					creditnotemaster.setCreditNoteDocNo(row[4]
							.toString());
				else
					creditnotemaster.setCreditNoteDocNo("");

				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

				if (row[5] != null) {
					
					
					java.util.Date date = dateFormat
							.parse(row[5].toString());
					creditnotemaster.setCreditNotDate(date);
				}
				
				if (row[6] != null)
					creditnotemaster.setCreditPatientId(Integer.parseInt(row[6]
							.toString()));

				if (row[7] != null)
					creditnotemaster.setCreditNoteTreatmentId(Integer.parseInt(row[7]
							.toString()));

				ltCreditNoteMaster.add(creditnotemaster);
			}

		} catch (Exception e) {

		}
		return ltCreditNoteMaster;

	}

	//added by vishant
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public void updatePharmcyAmountInBilling(CreditNoteMaster creditNoteMaster, String string) {
		// TODO Auto-generated method stub
		Integer creditNoteTreatmentId = creditNoteMaster.getCreditNoteTreatmentId();
	try {	
		if(creditNoteTreatmentId>0) {
			
			List<BillDetailsIpdDto> list = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class)
			.add(Restrictions.eq("treatmentId", creditNoteTreatmentId))
			.add(Restrictions.eq("serviceId", 16))
			.add(Restrictions.eq("deleted", "N"))
			.list();
			
			if(list.size()>0) {
				BillDetailsIpdDto billDetailsIpdDto = list.get(0);
				double newAmount = billDetailsIpdDto.getAmount()-creditNoteMaster.getCreditNoteNetAmt();
				billDetailsIpdDto.setAmount(newAmount);
				billDetailsIpdDto.setCoPay(newAmount);
				sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
			}
			
		}
	}catch (Exception e) {
		e.printStackTrace();
	}
		
		
	}
}
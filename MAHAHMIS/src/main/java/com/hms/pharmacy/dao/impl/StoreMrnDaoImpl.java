package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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


import com.hms.pharmacy.dao.StoreMrnDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.MrnIssueMaster;
import com.hms.pharmacy.pojo.MrnIssueSlave;
import com.hms.pharmacy.pojo.MrnMaster;
import com.hms.pharmacy.pojo.MrnSlave;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.pojo.VendorMaster;

@Repository
public class StoreMrnDaoImpl implements StoreMrnDao {

	@Autowired
	SessionFactory sessionFactory;

	List<StockMaster> stockMasters = new ArrayList<StockMaster>();
	int count = 0;

	Object storeName = new Object();

	@Override
	public Integer getNextAutoIncrement() {
		Integer id = 0;
		try {
			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createQuery(
							"SELECT MAX(mrnId) FROM  MrnMaster");

			Object id1 = query.uniqueResult();
			

			if (id1 == null) {
				id1 = 0;
			}
			id = Integer.parseInt(id1.toString()) + 1;

		} catch (Exception e) {
			e.printStackTrace();
			return id;
		}
		return id;
	}

	@Override
	public Boolean saveOrUpdateMRN(MrnMaster mrnMaster) {
		try {
			sessionFactory.getCurrentSession().merge(mrnMaster);
			/* saveBatchStockDetails(poMaster); */
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


	@Override
	public List<MrnMaster> getMrnList(String type) {
		List<MrnMaster> mrnMasters = new ArrayList<MrnMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MrnMaster.class);
			criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
			criteria.addOrder(Order.desc("mrnId"));
			criteria.setMaxResults(10);

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("mrnId"));
			proList.add(Projections.property("mrnDocId"));
			proList.add(Projections.property("mrnDate"));
			proList.add(Projections.property("mrnStatus"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				MrnMaster mrnMaster = new MrnMaster();

				if (master[0] != null)
					mrnMaster.setMrnId(Integer.parseInt(master[0].toString()));

				if (master[1] != null)
					mrnMaster.setMrnDocId(master[1].toString());
				else
					mrnMaster.setMrnDocId("");

				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[2].toString());

				mrnMaster.setMrnDate(date);

				if (master[3] != null)
					mrnMaster.setMrnStatus(master[3].toString());
				else
					mrnMaster.setMrnStatus("");

				mrnMasters.add(mrnMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return mrnMasters;
		}
		return mrnMasters;
	}

	@Override
	public List<MrnMaster> getPendingMRN() {
		List<MrnMaster> mrnMasters = new ArrayList<MrnMaster>();
		try {

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MrnMaster.class);
			criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
			criteria.add(Restrictions.eq("mrnStatus", "pending"));
			criteria.addOrder(Order.desc("mrnId"));
			criteria.add(Restrictions.eq("MrnApproved", 1));

			/* criteria.setMaxResults(10); */

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("mrnId"));
			proList.add(Projections.property("mrnDocId"));
			proList.add(Projections.property("mrnDate"));
			proList.add(Projections.property("mrnProductCount"));
			proList.add(Projections.property("mrnStoreName"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {

				MrnMaster mrnMaster = new MrnMaster();
				mrnMaster.setMrnId(Integer.parseInt(master[0].toString()));

				mrnMaster.setMrnDocId(master[1].toString());

				if (master[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[2].toString());
					mrnMaster.setMrnDate(date);
				} else {
					SimpleDateFormat dateFormat1 = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date1 = dateFormat1.parse(master[4]
							.toString());
					mrnMaster.setMrnDate(date1);
				}

				if (master[3] != null)
					mrnMaster.setMrnProductCount(Integer.parseInt(master[3]
							.toString()));
				else
					mrnMaster.setMrnProductCount(0);

				if (master[4] != null)
					mrnMaster.setMrnStoreName(master[4].toString());
				else
					mrnMaster.setMrnStoreName("");

				mrnMasters.add(mrnMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return mrnMasters;
		}
		return mrnMasters;
	}

	@Override
	public MrnMaster getMRNDetailsByMrnId(Integer mrnId) {
		/*
		 * MrnMaster mrnMaster = null; try { Criteria criteria =
		 * sessionFactory.getCurrentSession() .createCriteria(MrnMaster.class);
		 * 
		 * criteria.add(Restrictions.eq("mrnId", mrnId));
		 * criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
		 * 
		 * mrnMaster = (MrnMaster) criteria.uniqueResult();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return mrnMaster; }
		 * return mrnMaster;
		 */
		MrnMaster mrnMaster = new MrnMaster();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				MrnMaster.class);
		criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
		if (mrnId != 0) {
			criteria.add(Restrictions.eq("mrnId", mrnId));
		}

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("mrnId"));
		proList.add(Projections.property("mrnStoreName"));
		proList.add(Projections.property("mrnStoreId"));
		proList.add(Projections.property("mrnDate"));
		proList.add(Projections.property("mrnMainStoreId"));
		criteria.setProjection(proList);

		@SuppressWarnings("unchecked")
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					mrnMaster.setMrnId(Integer.parseInt(row[0].toString()));
				else
					mrnMaster.setMrnId(0);

				if (row[1] != null) {
					mrnMaster.setMrnStoreName(row[1].toString());
				} else
					mrnMaster.setMrnStoreName("");

				if (row[2] != null) {
					mrnMaster
							.setMrnStoreId(Integer.parseInt(row[2].toString()));
				}

				if (row[3] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat.parse(row[3].toString());
					mrnMaster.setMrnDate(date);

				}

				if (row[4] != null) {
					mrnMaster.setMrnMainStoreId(Integer.parseInt(row[4]
							.toString()));
				}

				else
					mrnMaster.setMrnMainStoreId(0);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<MrnSlave> mrnSlaves = new ArrayList<MrnSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select slave.mrn_slave_id,product.product_Id,product.product_name,product.product_uom_unit,pack.pack_type,comp.comp_name,slave.mrn_slave_qty from pharma_store_mrn_master master inner join pharma_store_mrn_slave slave ON slave.mrn_slave_master_id = master.mrn_id inner join pharma_product_master product ON product.product_id = slave.mrn_slave_product_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id where master.mrn_id = '"
									+ mrnId + "'");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				MrnSlave mrnSlave = new MrnSlave();

				if (row[0] != null)
					mrnSlave.setMrnSlaveId(Integer.parseInt(row[0].toString()));
				else
					mrnSlave.setMrnSlaveId(0);

				ProductMaster productMaster = new ProductMaster();
				if (row[1] != null)
					productMaster.setProductId(Integer.parseInt(row[1]
							.toString()));

				if (row[2] != null) {
					productMaster.setProductName(row[2].toString());
				}

				if (row[3] != null) {
					productMaster.setProductUnit(Double.parseDouble(row[3]
							.toString()));
				}

				if (row[4] != null) {
					PackingMaster packingMaster = new PackingMaster();
					packingMaster.setPackType(row[4].toString());
					productMaster.setPackingMaster(packingMaster);
				}

				if (row[5] != null) {
					CompanyMaster companyMaster = new CompanyMaster();
					companyMaster.setCompName(row[5].toString());
					productMaster.setCompanyMaster(companyMaster);
				}

				mrnSlave.setProductMaster(productMaster);

				if (row[6] != null) {
					mrnSlave.setMrnSlaveQty(Integer.parseInt(row[6].toString()));
				}

				mrnSlaves.add(mrnSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		mrnMaster.setMrnSlaves(mrnSlaves);

		return mrnMaster;
	}

	@Override
	public Integer getPendingMRNCount() {

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				MrnMaster.class);
		criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
		criteria.add(Restrictions.eq("mrnStatus", "pending"));
		criteria.add(Restrictions.eq("MrnApproved", 1));

		criteria.addOrder(Order.desc("mrnId"));

		Long result = (Long) criteria.setProjection(Projections.rowCount())
				.uniqueResult();
		Integer count = (Integer.parseInt(result.toString()));

		return count;
	}

	@Override
	public Map<String, String> saveMRNIssue(MrnIssueMaster mrnIssueMaster,
			String receiveFlag) {
		Map<String, String> result = new HashMap<String, String>();
		try {

			stockMasters = new ArrayList<StockMaster>();
			count = 0;
			if (saveBatchStockDetails(mrnIssueMaster, receiveFlag)) {
				sessionFactory.getCurrentSession().merge(mrnIssueMaster);
				result.put("result", "Record Save Succesfully");
			} else {
				result.put("result", "Error");
			}
			/* saveBatchStockDetails(poMaster); */
			;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	public boolean saveBatchStockDetails(MrnIssueMaster mrnIssueMaster,
			String receiveFlag) {
		if (Integer.parseInt(mrnIssueMaster.getMainStoreId()) > 0) {
			try {

				SQLQuery query = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"SELECT store_name FROM pharma_sub_store_master where store_id='"
										+ mrnIssueMaster.getMainStoreId() + "'");
				storeName = query.uniqueResult();
				if(storeName==null)
					storeName="";
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		else
			storeName="";
		
		boolean result = true;
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		for (MrnIssueSlave slave : mrnIssueMaster.getMrnIssueSlaves()) {

			BatchMaster batchMaster = new BatchMaster();
			batchMaster.setBatchId(slave.getProductMaster().getBatchMaster()
					.get(0).getBatchId());

			StockMaster stockMaster = new StockMaster();
			stockMaster.setStockQtyInHand(Double.parseDouble(slave
					.getMrnIssueSlaveTotalIssueQty().toString()));
			ProductMaster productMaster = new ProductMaster();
			productMaster.setProductId(slave.getProductMaster().getProductId());
			stockMaster.setStockProductMaster(productMaster);
			if (slave.getMrnIssueSlaveId() != null) {
				batchMaster.setBatchDeleteFlag(1);
			} else {
				batchMaster.setBatchDeleteFlag(0);
			}

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

				if (batchMaster.getBatchDeleteFlag() == 0) {
					checkAvailibility(batchMaster.getBatchId(), batchMaster
							.getStockMaster().getStockQtyInHand(), batchMaster
							.getStockMaster().getStockProductMaster()
							.getProductId());
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (count == 0) {
			if (receiveFlag.equals("off")) {
				decreaseStock();
				fillStock(Integer.parseInt(mrnIssueMaster.getStoreId()));
			}

			if (mrnIssueMaster.getMrnMaster().getMrnId() != 0)
				changeMRNStatus(mrnIssueMaster, receiveFlag);

		} else {
			return false;
		}
		return result;
	}

	public boolean saveBatchStockDetailsForMrnReceive(MrnMaster mrnMaster) {
		
		if (mrnMaster.getMrnMainStoreId() > 0) {
			try {

				SQLQuery query = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"SELECT store_name FROM pharma_sub_store_master where store_id='"
										+ mrnMaster.getMrnMainStoreId() + "'");
				storeName = query.uniqueResult();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		else
			storeName="";
		
		stockMasters = new ArrayList<StockMaster>();
		boolean result = true;
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		for (MrnSlave slave : mrnMaster.getMrnSlaves()) {
			BatchMaster batchMaster = new BatchMaster();
			batchMaster.setBatchId(slave.getMrnSlavePendingQty());

			StockMaster stockMaster = new StockMaster();
			stockMaster.setStockQtyInHand(Double.parseDouble(slave
					.getMrnSlaveQty().toString()));
			ProductMaster productMaster = new ProductMaster();
			productMaster.setProductId(slave.getProductMaster().getProductId());
			stockMaster.setStockProductMaster(productMaster);

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

				checkAvailibility(batchMaster.getBatchId(), batchMaster
						.getStockMaster().getStockQtyInHand(), batchMaster
						.getStockMaster().getStockProductMaster()
						.getProductId());

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (count == 0) {

			decreaseStock();
			fillStock((mrnMaster.getMrnStoreId()));
			changeMRNQty(mrnMaster);
		} else {

			return false;
		}

		return result;
	}

	public boolean checkAvailibility(Integer batchId, Double Qty,
			Integer productId) {
		StockMaster stockMaster = new StockMaster();
		boolean result = false;
		if (storeName == null || storeName.equals("") || storeName.toString().isEmpty())
			storeName = "";
		else
			storeName = storeName + "_";

		try {

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT stock_qty_in_hand FROM pharma_" + storeName
							+ "stock_master where stock_batch_id='" + batchId
							+ "'");
			Double availableStock = null;
			Double totalStock = null;
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
			stockMaster.setStockQtyOnOrder(Qty.intValue());
			BatchMaster batchMaster = new BatchMaster();
			batchMaster.setBatchId(batchId);

			ProductMaster productMaster = new ProductMaster();
			productMaster.setProductId(productId);

			stockMaster.setStockProductMaster(productMaster);
			stockMaster.setBatchMaster(batchMaster);

			stockMasters.add(stockMaster);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;

	}

	public boolean decreaseStock() {
		try {
			if (count == 0) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				String date = dateFormat.format(new java.util.Date());
				
				for (StockMaster master : stockMasters) {
					try {
						Query query1 = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"update pharma_"
												+ storeName
												+ "stock_master set stock_qty_in_hand='"
												+ master.getStockQtyInHand()
												+ "',stock_update_date='"
												+ date
												+ "' where stock_batch_id=:batchId");
						query1.setInteger("batchId", master.getBatchMaster()
								.getBatchId());
						int rowsDeleted = query1.executeUpdate();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	public boolean fillStock(int storeId) {
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT store_name FROM pharma_sub_store_master where store_id='"
							+ storeId + "'");
			Object storeName = query.uniqueResult();

			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String todayDate = dateFormat.format(new Date());

			for (StockMaster master : stockMasters) {

				Object rows = null;
				// code for checking if batchId already exist in stock table
				try {

					SQLQuery fetchStock = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"SELECT stock_qty_in_hand FROM pharma_"
											+ storeName.toString()
											+ "_stock_master where stock_batch_id='"
											+ master.getBatchMaster()
													.getBatchId() + "'");
					Double availableStock = null;
					Double totalStock = null;
					rows = fetchStock.uniqueResult();

					if (rows != null) {
						availableStock = Double.parseDouble(rows.toString());
						totalStock = availableStock
								+ master.getStockQtyOnOrder();
						try {
							Query updateStock = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"update pharma_"
													+ storeName.toString()
													+ "_stock_master set stock_qty_in_hand='"
													+ totalStock
													+ "',stock_update_date='"
													+ todayDate
													+ "' where stock_batch_id=:batchId");
							updateStock.setInteger("batchId", master
									.getBatchMaster().getBatchId());
							int rowsDeleted = updateStock.executeUpdate();
						} catch (Exception e) {
							e.printStackTrace();
						}

					} else {
						try {
							Query query1 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"insert into pharma_"
													+ storeName.toString()
													+ "_stock_master(stock_product_id,stock_qty_in_hand,stock_delete_flag,stock_update_date,stock_batch_id) values ("
													+ master.getStockProductMaster()
															.getProductId()
													+ ","
													+ master.getStockQtyOnOrder()
													+ ",0,'"
													+ todayDate
													+ "',"
													+ master.getBatchMaster()
															.getBatchId()
													+ ");");
							int rowsDeleted = query1.executeUpdate();
						} catch (Exception e) {
							e.printStackTrace();
						}
					}

				} catch (Exception e) {
					e.printStackTrace();
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<MrnMaster> getStoreWisePendingMRN(Integer storeId) {
		List<MrnMaster> mrnMasters = new ArrayList<MrnMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MrnMaster.class);
			criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
			criteria.add(Restrictions.eq("mrnStatus", "pending"));
			criteria.addOrder(Order.desc("mrnId"));
			criteria.add(Restrictions.eq("mrnStoreId", storeId));
			criteria.add(Restrictions.eq("MrnApproved", 1));

			/* criteria.setMaxResults(10); */

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("mrnId"));
			proList.add(Projections.property("mrnDocId"));
			proList.add(Projections.property("mrnDate"));
			proList.add(Projections.property("mrnProductCount"));
			proList.add(Projections.property("mrnStoreName"));
			proList.add(Projections.property("MrnApproved"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {

				MrnMaster mrnMaster = new MrnMaster();
				mrnMaster.setMrnId(Integer.parseInt(master[0].toString()));

				mrnMaster.setMrnDocId(master[1].toString());

				if (master[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[2].toString());
					mrnMaster.setMrnDate(date);
				} else {
					SimpleDateFormat dateFormat1 = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date1 = dateFormat1.parse(master[4]
							.toString());
					mrnMaster.setMrnDate(date1);
				}

				if (master[3] != null)
					mrnMaster.setMrnProductCount(Integer.parseInt(master[3]
							.toString()));
				else
					mrnMaster.setMrnProductCount(0);

				if (master[4] != null)
					mrnMaster.setMrnStoreName(master[4].toString());
				else
					mrnMaster.setMrnStoreName("");

				if (master[5] != null)
					mrnMaster.setMrnApproved(Integer.parseInt(master[5]
							.toString()));
				else
					mrnMaster.setMrnApproved(0);

				mrnMasters.add(mrnMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return mrnMasters;
		}
		return mrnMasters;
	}

	@Override
	public List<MrnIssueMaster> getMRNList(String type, String type2) {
		List<MrnIssueMaster> mrnIssueMasters = new ArrayList<MrnIssueMaster>();
		if (type2 != null) {
			try {
				/*
				 * Criteria criteria = sessionFactory.getCurrentSession()
				 * .createCriteria(MrnIssueMaster.class);
				 * criteria.add(Restrictions.eq("mrnIssueDeleteFlag", 0));
				 * criteria.addOrder(Order.desc("mrnIssueId"));
				 * 
				 * if (type.equals("limit")) criteria.setMaxResults(10);
				 * 
				 * ProjectionList proList = Projections.projectionList();
				 * proList.add(Projections.property("mrnIssueId"));
				 * 
				 * criteria.setProjection(proList);
				 */
				SQLQuery query = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"select mrn_issue_id,mrn_issue_store_name from pharma_mrn_issue_master where mrn_issue_mrn_id='0';");
				List<Object[]> result = query.list();

				for (Object[] master : result) {
					MrnIssueMaster mrnIssueMaster = new MrnIssueMaster();
					if (master[0] != null)
						mrnIssueMaster.setMrnIssueId(Integer.parseInt(master[0]
								.toString()));

					if (master[1] != null) {
						mrnIssueMaster.setStoreName(master[1].toString());
					} else {
						mrnIssueMaster.setStoreName("");
					}

					mrnIssueMasters.add(mrnIssueMaster);

				}

			} catch (Exception e) {
				e.printStackTrace();
				return mrnIssueMasters;
			}
		} else {
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(MrnIssueMaster.class)
						.createAlias("mrnMaster", "mrnMaster");
				criteria.add(Restrictions.eq("mrnIssueDeleteFlag", 0));
				criteria.addOrder(Order.desc("mrnIssueId"));

				if (type.equals("limit"))
					criteria.setMaxResults(10);

				ProjectionList proList = Projections.projectionList();
				proList.add(Projections.property("mrnIssueId"));
				proList.add(Projections.property("mrnMaster.mrnId"));
				proList.add(Projections.property("mrnMaster.mrnStatus"));
				proList.add(Projections.property("storeName"));

				criteria.setProjection(proList);
				List<Object[]> result = criteria.list();

				for (Object[] master : result) {
					MrnIssueMaster mrnIssueMaster = new MrnIssueMaster();
					if (master[0] != null)
						mrnIssueMaster.setMrnIssueId(Integer.parseInt(master[0]
								.toString()));

					MrnMaster mrnMaster = new MrnMaster();

					if (master[1] != null)
						mrnMaster.setMrnId(Integer.parseInt(master[1]
								.toString()));
					else
						mrnMaster.setMrnId(0);

					if (master[2] != null)
						mrnMaster.setMrnStatus(master[2].toString());
					else
						mrnMaster.setMrnStatus("");

					if (master[3] != null)
						mrnIssueMaster.setStoreName(master[3].toString());
					else
						mrnIssueMaster.setStoreName("");

					mrnIssueMaster.setMrnMaster(mrnMaster);

					mrnIssueMasters.add(mrnIssueMaster);

				}

			} catch (Exception e) {
				e.printStackTrace();
				return mrnIssueMasters;
			}
		}

		return mrnIssueMasters;
	}

	@Override
	public List<MrnIssueMaster> getMRNListForReceive(String StoreId) {
		List<MrnIssueMaster> mrnIssueMasters = new ArrayList<MrnIssueMaster>();

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MrnIssueMaster.class)
					.createAlias("mrnMaster", "mrnMaster");
			criteria.add(Restrictions.eq("mrnIssueDeleteFlag", 0));
			criteria.add(Restrictions.eq("storeId", StoreId));
			criteria.addOrder(Order.desc("mrnIssueId"));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("mrnIssueId"));
			proList.add(Projections.property("mrnMaster.mrnId"));
			proList.add(Projections.property("mrnReceivedDate"));
			proList.add(Projections.property("mrnMaster.mrnStatus"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				MrnIssueMaster mrnIssueMaster = new MrnIssueMaster();
				if (master[0] != null)
					mrnIssueMaster.setMrnIssueId(Integer.parseInt(master[0]
							.toString()));

				if (master[1] != null)
					mrnIssueMaster.setMrnIssueDocNo((master[1].toString()));
				else
					mrnIssueMaster.setMrnIssueDocNo("0");

				if (master[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[2].toString());
					mrnIssueMaster.setMrnReceivedDate(date);
				} else {
					mrnIssueMaster.setStoreName("");
				}

				if (master[3] != null)
					mrnIssueMaster.setMrnIssueNarration(master[3].toString());
				else
					mrnIssueMaster.setMrnIssueNarration("");

				mrnIssueMasters.add(mrnIssueMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return mrnIssueMasters;
		}

		return mrnIssueMasters;
	}

	@Override
	public List<MrnIssueMaster> getStoreWiseMrnIssue(Integer storeId) {
		List<MrnIssueMaster> mrnIssueMasters = new ArrayList<MrnIssueMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MrnIssueMaster.class)
					.createAlias("mrnMaster", "mrnMaster");
			criteria.add(Restrictions.eq("mrnIssueDeleteFlag", 0));
			criteria.add(Restrictions.eq("storeId", storeId.toString()));
			criteria.addOrder(Order.desc("mrnIssueId"));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("mrnIssueId"));
			proList.add(Projections.property("mrnMaster.mrnId"));
			proList.add(Projections.property("mrnMaster.mrnStatus"));
			proList.add(Projections.property("storeName"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				MrnIssueMaster mrnIssueMaster = new MrnIssueMaster();
				mrnIssueMaster.setMrnIssueId(Integer.parseInt(master[0]
						.toString()));

				MrnMaster mrnMaster = new MrnMaster();
				mrnMaster.setMrnId(Integer.parseInt(master[1].toString()));
				mrnIssueMaster.setMrnMaster(mrnMaster);

				if (master[2] != null) {
					mrnMaster.setMrnStatus(master[2].toString());
				} else {
					mrnMaster.setMrnStatus("");
				}

				if (master[3] != null) {
					mrnIssueMaster.setStoreName(master[3].toString());
				} else {
					mrnIssueMaster.setStoreName("");
				}

				mrnIssueMasters.add(mrnIssueMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return mrnIssueMasters;
		}

		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select mrn_issue_id,mrn_issue_store_name from pharma_mrn_issue_master where mrn_issue_mrn_id='0' and mrn_issue_store_id='"
									+ storeId + "' ");
			List<Object[]> result = query.list();

			for (Object[] master : result) {
				MrnIssueMaster mrnIssueMaster = new MrnIssueMaster();
				if (master[0] != null)
					mrnIssueMaster.setMrnIssueId(Integer.parseInt(master[0]
							.toString()));

				if (master[1] != null) {
					mrnIssueMaster.setStoreName(master[1].toString());
				} else {
					mrnIssueMaster.setStoreName("");
				}

				mrnIssueMasters.add(mrnIssueMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return mrnIssueMasters;
		}
		return mrnIssueMasters;
	}

	@Override
	public List<MrnIssueMaster> getAutoSuggestionMRNIssueNumber(String letter) {
		List<MrnIssueMaster> saleMasters = new ArrayList<MrnIssueMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MrnIssueMaster.class);
			criteria.add(Restrictions.eq("mrnIssueDeleteFlag", 0));
			criteria.add(Restrictions.eq("mrnIssueId", Integer.parseInt(letter)));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("mrnIssueId"));

			criteria.setProjection(proList);
			List<Object> result = criteria.list();

			for (Object master : result) {
				MrnIssueMaster mrnIssueMaster = new MrnIssueMaster();
				mrnIssueMaster
						.setMrnIssueId(Integer.parseInt(master.toString()));
				saleMasters.add(mrnIssueMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;
	}

	@Override
	public List<MrnIssueMaster> getMrnNoWiseMrnIssue(Integer mrnIssueId) {
		List<MrnIssueMaster> mrnIssueMasters = new ArrayList<MrnIssueMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MrnIssueMaster.class)
					.createAlias("mrnMaster", "mrnMaster");
			criteria.add(Restrictions.eq("mrnIssueDeleteFlag", 0));
			criteria.add(Restrictions.eq("mrnIssueId", mrnIssueId));
			criteria.addOrder(Order.desc("mrnIssueId"));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("mrnIssueId"));
			proList.add(Projections.property("mrnMaster.mrnId"));
			proList.add(Projections.property("mrnMaster.mrnStatus"));
			proList.add(Projections.property("storeName"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				MrnIssueMaster mrnIssueMaster = new MrnIssueMaster();
				mrnIssueMaster.setMrnIssueId(Integer.parseInt(master[0]
						.toString()));

				MrnMaster mrnMaster = new MrnMaster();
				mrnMaster.setMrnId(Integer.parseInt(master[1].toString()));
				mrnIssueMaster.setMrnMaster(mrnMaster);

				if (master[2] != null) {
					mrnMaster.setMrnStatus(master[2].toString());
				} else {
					mrnMaster.setMrnStatus("");
				}

				if (master[3] != null) {
					mrnIssueMaster.setStoreName(master[3].toString());
				} else {
					mrnIssueMaster.setStoreName("");
				}

				mrnIssueMasters.add(mrnIssueMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return mrnIssueMasters;
		}

		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select mrn_issue_id,mrn_issue_store_name from pharma_mrn_issue_master where mrn_issue_mrn_id='0' and mrn_issue_id='"
									+ mrnIssueId + "' ");
			List<Object[]> result = query.list();

			for (Object[] master : result) {
				MrnIssueMaster mrnIssueMaster = new MrnIssueMaster();
				if (master[0] != null)
					mrnIssueMaster.setMrnIssueId(Integer.parseInt(master[0]
							.toString()));

				if (master[1] != null) {
					mrnIssueMaster.setStoreName(master[1].toString());
				} else {
					mrnIssueMaster.setStoreName("");
				}

				mrnIssueMasters.add(mrnIssueMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return mrnIssueMasters;
		}

		return mrnIssueMasters;
	}

	@Override
	public List<MrnMaster> getStoreWiseMrnList(Integer storeId) {
		List<MrnMaster> mrnMasters = new ArrayList<MrnMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MrnMaster.class);
			criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
			criteria.add(Restrictions.eq("mrnStoreId", storeId));
			criteria.addOrder(Order.desc("mrnId"));

			/* criteria.setMaxResults(10); */

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("mrnId"));
			proList.add(Projections.property("mrnDocId"));
			proList.add(Projections.property("mrnDate"));
			proList.add(Projections.property("mrnStatus"));
			proList.add(Projections.property("mrnStoreName"));
			proList.add(Projections.property("mrnModBy"));
			proList.add(Projections.property("MrnApproved"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				MrnMaster mrnMaster = new MrnMaster();

				if (master[0] != null)
					mrnMaster.setMrnId(Integer.parseInt(master[0].toString()));

				if (master[1] != null)
					mrnMaster.setMrnDocId(master[1].toString());
				else
					mrnMaster.setMrnDocId("");

				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[2].toString());

				mrnMaster.setMrnDate(date);

				if (master[3] != null)
					mrnMaster.setMrnStatus(master[3].toString());
				else
					mrnMaster.setMrnStatus("");

				if (master[4] != null)
					mrnMaster.setMrnStoreName(master[4].toString());
				else
					mrnMaster.setMrnStoreName("");

				if (master[5] != null)
					mrnMaster.setMrnModBy(master[5].toString());
				else
					mrnMaster.setMrnModBy("");

				if (master[6] != null)
					mrnMaster.setMrnApproved(Integer.parseInt(master[6]
							.toString()));
				else
					mrnMaster.setMrnApproved(0);

				mrnMasters.add(mrnMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return mrnMasters;
		}
		return mrnMasters;
	}

	@Override
	public List<MrnMaster> getAutoSuggestionMRNNumber(String letter) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MrnMaster editMrn(Integer mrnId) {
		MrnMaster mrnMaster = new MrnMaster();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				MrnMaster.class);
		criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
		if (mrnId != 0) {
			criteria.add(Restrictions.eq("mrnId", mrnId));
		}

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("mrnId"));
		proList.add(Projections.property("mrnDocId"));
		proList.add(Projections.property("mrnDate"));
		proList.add(Projections.property("mrnRemark"));
		proList.add(Projections.property("mrnProductCount"));
		proList.add(Projections.property("mrnStatus"));
		proList.add(Projections.property("mrnStoreName"));
		proList.add(Projections.property("mrnStoreId"));
		proList.add(Projections.property("mrnAddedBy"));
		proList.add(Projections.property("mrnTime"));

		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					mrnMaster.setMrnId(Integer.parseInt(row[0].toString()));
				else
					mrnMaster.setMrnId(0);

				if (row[1] != null) {
					mrnMaster.setMrnDocId(row[1].toString());
				} else
					mrnMaster.setMrnDocId("");

				if (row[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat.parse(row[2].toString());
					mrnMaster.setMrnDate(date);

				}

				if (row[3] != null) {
					mrnMaster.setMrnRemark(row[3].toString());
				} else {
					mrnMaster.setMrnRemark("");
				}

				if (row[4] != null) {
					mrnMaster.setMrnProductCount(Integer.parseInt(row[4]
							.toString()));
				}

				if (row[5] != null)
					mrnMaster.setMrnStatus(row[5].toString());
				else
					mrnMaster.setMrnStatus("");

				if (row[6] != null)
					mrnMaster.setMrnStoreName(row[6].toString());
				else
					mrnMaster.setMrnStoreName("");

				if (row[7] != null)
					mrnMaster
							.setMrnStoreId(Integer.parseInt(row[7].toString()));

				if (row[8] != null)
					mrnMaster.setMrnAddedBy(row[8].toString());

				if (row[9] != null)
					mrnMaster.setMrnTime(row[9].toString());
				else
					mrnMaster.setMrnTime("");

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<MrnSlave> mrnSlaves = new ArrayList<MrnSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							"select mrn_slave_id,mrn_slave_sr,mrn_slave_qty,product.product_Id,product.product_name,product.product_uom_unit,packing.pack_type,comp.comp_name,mrn_slave_pending_qty,mrn_slave_status from pharma_store_mrn_master master inner join pharma_store_mrn_slave mrn_slave ON mrn_slave.mrn_slave_master_id = master.mrn_id inner join pharma_product_master product ON product.product_id = mrn_slave.mrn_slave_product_id inner join pharma_packing_master packing ON packing.pack_id = product.product_pack_id inner join pharma_company_master comp on comp.comp_id=product.product_comp_id where master.mrn_id = '"
									+ mrnId + "'");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				MrnSlave mrnSlave = new MrnSlave();

				if (row[0] != null)
					mrnSlave.setMrnSlaveId(Integer.parseInt(row[0].toString()));
				else
					mrnSlave.setMrnSlaveId(0);

				if (row[1] != null)
					mrnSlave.setMrnSlaveSr(Integer.parseInt(row[1].toString()));

				if (row[2] != null)
					mrnSlave.setMrnSlaveQty(Integer.parseInt(row[2].toString()));

				ProductMaster productMaster = new ProductMaster();
				if (row[3] != null) {
					productMaster.setProductId(Integer.parseInt(row[3]
							.toString()));
				}

				if (row[4] != null)
					productMaster.setProductName(row[4].toString());
				else
					productMaster.setProductName("");

				if (row[5] != null)
					productMaster.setProductUnit(Double.parseDouble(row[5]
							.toString()));

				if (row[6] != null) {
					PackingMaster packingMaster = new PackingMaster();
					packingMaster.setPackType(row[6].toString());
					productMaster.setPackingMaster(packingMaster);
				}

				if (row[7] != null) {
					CompanyMaster companyMaster = new CompanyMaster();
					companyMaster.setCompName(row[7].toString());
					productMaster.setCompanyMaster(companyMaster);
				}

				if (row[8] != null)
					mrnSlave.setMrnSlavePendingQty(Integer.parseInt(row[8]
							.toString()));

				if (row[9] != null)
					mrnSlave.setMrnSlaveStatus(row[9].toString());

				mrnSlave.setProductMaster(productMaster);
				mrnSlaves.add(mrnSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		mrnMaster.setMrnSlaves(mrnSlaves);

		return mrnMaster;
	}

	@Override
	public MrnMaster mrnPrint(Integer mrnId) {
		MrnMaster mrnMaster = new MrnMaster();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				MrnMaster.class);
		criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
		if (mrnId != 0) {
			criteria.add(Restrictions.eq("mrnId", mrnId));
		}
		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("mrnId"));
		proList.add(Projections.property("mrnDocId"));
		proList.add(Projections.property("mrnDate"));
		proList.add(Projections.property("mrnRemark"));
		proList.add(Projections.property("mrnStoreName"));
		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					mrnMaster.setMrnId(Integer.parseInt(row[0].toString()));
				else
					mrnMaster.setMrnId(0);

				if (row[1] != null) {
					mrnMaster.setMrnDocId(row[1].toString());
				} else
					mrnMaster.setMrnDocId("");

				if (row[2] != null) {

					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy/MM/dd" + "");
					String str[] = row[2].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[2] + "/" + date[1] + "/" + date[0]);

					mrnMaster.setMrnTime(stringBuffer.toString());

				}
				VendorMaster vendorMaster = new VendorMaster();

				if (row[3] != null) {
					mrnMaster.setMrnRemark(row[3].toString());
				} else {
					mrnMaster.setMrnRemark("");
				}

				if (row[4] != null) {
					mrnMaster.setMrnStoreName(row[4].toString());
				} else {
					mrnMaster.setMrnStoreName("");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<MrnSlave> mrnSlaves = new ArrayList<MrnSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							"select mrn_slave_qty,product.product_name,product.product_uom_unit,company.comp_name,pack.pack_type,product.product_id,mrn_slave_pending_qty from pharma_store_mrn_master master inner join pharma_store_mrn_slave mrn_slave ON mrn_slave.mrn_slave_master_id = master.mrn_id inner join pharma_product_master product ON product.product_id = mrn_slave.mrn_slave_product_id inner join pharma_company_master company ON company.comp_id = product.product_comp_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id where master.mrn_id = '"
									+ mrnId + "'");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				MrnSlave mrnSlave = new MrnSlave();

				if (row[0] != null)
					mrnSlave.setMrnSlaveQty(Integer.parseInt(row[0].toString()));

				ProductMaster productMaster = new ProductMaster();
				if (row[1] != null) {
					productMaster.setProductName(row[1].toString());
					mrnSlave.setProductMaster(productMaster);
				} else {
					productMaster.setProductName("");
				}

				if (row[2] != null)
					productMaster.setProductUnit(Double.parseDouble(row[2]
							.toString()));

				CompanyMaster companyMaster = new CompanyMaster();

				if (row[3] != null)
					companyMaster.setCompName(row[3].toString());
				else
					companyMaster.setCompName("");

				PackingMaster packingMaster = new PackingMaster();

				if (row[4] != null)
					packingMaster.setPackType(row[4].toString());
				else
					packingMaster.setPackType("");

				if (row[5] != null)
					productMaster.setProductId(Integer.parseInt(row[5]
							.toString()));

				if (row[6] != null)
					mrnSlave.setMrnSlavePendingQty(Integer.parseInt(row[6]
							.toString()));
				else
					mrnSlave.setMrnSlavePendingQty(0);

				productMaster.setCompanyMaster(companyMaster);
				productMaster.setPackingMaster(packingMaster);
				mrnSlave.setProductMaster(productMaster);
				mrnSlaves.add(mrnSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		mrnMaster.setMrnSlaves(mrnSlaves);

		return mrnMaster;
	}

	@Override
	public String setApprovalStatus(Integer[] mrnIdArray, String userId) {
		for (int i = 0; i < mrnIdArray.length; i++) {
			try {
				Query query = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"update pharma_store_mrn_master set mrn_approved='1',mrn_approved_by='"
										+ userId + "' where mrn_id=:mrnId");
				query.setInteger("mrnId", mrnIdArray[i]);
				int rowsDeleted = query.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return "Verified Succesfully";
	}

	@Override
	public JSONArray fetchStock(Integer storeId) {

		JSONArray jsonArrays = new JSONArray();
		List<StockMaster> stockMasters = new ArrayList<StockMaster>();
		Object storeName = "";
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT store_name FROM pharma_sub_store_master where store_id='"
							+ storeId + "'");
			storeName = query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							/*
							 * "select product.product_name,batch.batch_code,batch.batch_exp_date,stock.stock_qty_in_hand from pharma_"
							 * +storeName.toString()+
							 * "_stock_master stock inner join pharma_product_master product on product.product_id=stock.stock_product_id inner join pharma_batch_master batch on batch.batch_id=stock.stock_batch_id "
							 * );
							 */
							" select  product.product_name,batch.batch_code,batch.batch_exp_date,stock.stock_qty_in_hand,rate.pur_rate, "
									+ " rate.mrp from pharma_"
									+ storeName.toString()
									+ "_stock_master stock inner join pharma_product_master product ON product.product_id = stock.stock_product_id inner join pharma_batch_master batch ON batch.batch_id = stock.stock_batch_id "
									+ " inner join pharma_purchase_rate rate on rate.batch_id=stock.stock_batch_id");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				JSONObject obj1 = new JSONObject();
				if (row[0] != null) {
					obj1.put("productName", row[0].toString());
				} else {

				}

				if (row[1] != null) {
					obj1.put("batchCode", row[1].toString());
				} else {

				}

				if (row[2] != null) {
					obj1.put("batchExpDate", row[2].toString());
				} else {

				}

				if (row[3] != null) {
					obj1.put("currentStock", row[3].toString());
				} else {

				}
				if (row[4] != null) {
					obj1.put("purRate", row[4].toString());
				} else {

				}
				if (row[5] != null) {
					obj1.put("mrp", row[5].toString());
				} else {

				}

				jsonArrays.put(obj1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonArrays;
	}

	@Override
	public MrnIssueMaster mrnIssuePrint(Integer mrnIssueId) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				MrnIssueMaster.class);
		criteria.add(Restrictions.eq("mrnIssueDeleteFlag", 0));

		if (mrnIssueId != 0) {
			criteria.add(Restrictions.eq("mrnIssueId", mrnIssueId));
		}

		MrnIssueMaster issueMaster = new MrnIssueMaster();

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("mrnIssueId"));
		proList.add(Projections.property("mrnIssueDocNo"));
		proList.add(Projections.property("mrnReceivedDate"));
		proList.add(Projections.property("mrnIssueLess"));
		proList.add(Projections.property("mrnIssueNetAmt"));
		proList.add(Projections.property("mrnIssueSurcharges"));
		proList.add(Projections.property("mrnIssueGrossAmt"));
		proList.add(Projections.property("storeName"));

		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					issueMaster.setMrnIssueId(Integer.parseInt(row[0]
							.toString()));

				if (row[1] != null) {
					issueMaster.setMrnIssueDocNo(row[1].toString());
				} else
					issueMaster.setMrnIssueDocNo("");

				if (row[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy/MM/dd");
					String str[] = row[2].toString().split(" ");
					issueMaster.setMrnAddedBy(str[0]);
				}

				if (row[3] != null) {
					issueMaster.setMrnIssueLess(Double.parseDouble(row[3]
							.toString()));
				}

				if (row[4] != null) {
					issueMaster.setMrnIssueNetAmt(Double.parseDouble(row[4]
							.toString()));
				}

				if (row[5] != null) {
					issueMaster.setMrnIssueSurcharges(Double.parseDouble(row[5]
							.toString()));
				}

				if (row[6] != null) {
					issueMaster.setMrnIssueGrossAmt(Double.parseDouble(row[6]
							.toString()));
				}

				if (row[7] != null) {
					issueMaster.setStoreName(row[7].toString());
				} else {
					issueMaster.setStoreName("");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<MrnIssueSlave> mrnIssueSlaves = new ArrayList<MrnIssueSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select mrn_issue_slave.mrn_issue_slave_total_issue_qty,mrn_issue_slave.mrn_issue_slave_mrp,mrn_issue_slave.mrn_issue_slave_rate,mrn_issue_slave.mrn_issue_slave_amt,mrn_issue_slave.mrn_issue_slave_batch_code,mrn_issue_slave.mrn_issue_slave_batch_expiry,product.product_name,mrn_issue_slave.mrn_issue_slave_vat from pharma_mrn_issue_master master inner join pharma_mrn_issue_slave mrn_issue_slave ON mrn_issue_slave.mrn_issue_slave_master_id = master.mrn_issue_id inner join pharma_product_master product ON product.product_id = mrn_issue_slave.mrn_issue_slave_product_id where master.mrn_issue_id = '"
									+ mrnIssueId + "'");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				MrnIssueSlave mrnIssueSlave = new MrnIssueSlave();

				if (row[0] != null) {
					String result1[] = row[0].toString().split("\\.");
					mrnIssueSlave.setMrnIssueSlaveTotalIssueQty(Integer
							.parseInt(result1[0]));
				}

				if (row[1] != null)
					mrnIssueSlave.setMrnIssueSlaveMrp(Double.parseDouble(row[1]
							.toString()));

				if (row[2] != null)
					mrnIssueSlave.setMrnIssueSlaveRate(Double
							.parseDouble(row[2].toString()));

				if (row[3] != null)
					mrnIssueSlave.setMrnIssueSlaveAmt(Double.parseDouble(row[3]
							.toString()));

				if (row[4] != null)
					mrnIssueSlave.setMrnIssueSlaveBatchCode(row[4].toString());
				else
					mrnIssueSlave.setMrnIssueSlaveBatchCode("");

				if (row[5] != null)
					mrnIssueSlave
							.setMrnIssueSlaveBatchExpiry(row[5].toString());
				else
					mrnIssueSlave.setMrnIssueSlaveBatchExpiry("");

				ProductMaster productMaster = new ProductMaster();
				if (row[6] != null) {
					productMaster.setProductName(row[6].toString());
					mrnIssueSlave.setProductMaster(productMaster);
				} else {
					productMaster.setProductName("");
				}

				if (row[7] != null)
					mrnIssueSlave.setMrnIssueSlaveVat(Double.parseDouble(row[7]
							.toString()));
				else
					mrnIssueSlave.setMrnIssueSlaveVat(0.0);

				mrnIssueSlaves.add(mrnIssueSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		issueMaster.setMrnIssueSlaves(mrnIssueSlaves);

		return issueMaster;
	}

	@Override
	public JSONArray getStoreDetailsByStoreName(String storeName) {
		JSONArray jsonArrays = new JSONArray();

		/*
		 * Criteria criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(MrnIssueMaster.class);
		 * criteria.add(Restrictions.eq("mrnIssueDeleteFlag", 0));
		 * 
		 * if (mrnIssueId != 0) { criteria.add(Restrictions.eq("mrnIssueId",
		 * mrnIssueId)); }
		 * 
		 * MrnIssueMaster issueMaster=new MrnIssueMaster();
		 * 
		 * ProjectionList proList = Projections.projectionList();
		 * proList.add(Projections.property("mrnIssueId"));
		 * proList.add(Projections.property("mrnIssueDocNo"));
		 * proList.add(Projections.property("mrnReceivedDate"));
		 * proList.add(Projections.property("mrnIssueLess"));
		 * proList.add(Projections.property("mrnIssueNetAmt"));
		 * proList.add(Projections.property("mrnIssueSurcharges"));
		 * proList.add(Projections.property("mrnIssueGrossAmt"));
		 * proList.add(Projections.property("storeName"));
		 * 
		 * criteria.setProjection(proList); List<Object[]> result =
		 * criteria.list();
		 */

		List<StockMaster> stockMasters = new ArrayList<StockMaster>();
		try {
			/*
			 * Criteria criteria = sessionFactory.getCurrentSession()
			 * .createCriteria(SubStoreMaster.class);
			 * criteria.add(Restrictions.eq("storeDeleteFlag", 0));
			 * 
			 * if (storeName !=null) { criteria.add(Restrictions.eq("storeName",
			 * storeName)); criteria.add(Restrictions.like("storeName",
			 * storeName) ); }
			 * 
			 * ProjectionList proList = Projections.projectionList();
			 * proList.add(Projections.property("storeId"));
			 * proList.add(Projections.property("storeName"));
			 * 
			 * criteria.setProjection(proList);
			 */

			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select store_id,store_name from pharma_sub_store_master master where store_name like '"
									+ storeName
									+ "%' and master.store_delete_flag=0");

			List<Object[]> results = query.list();

			/* List<Object[]> result = criteria.list(); */

			for (Object[] row : results) {
				JSONObject obj1 = new JSONObject();
				if (row[0] != null) {
					obj1.put("storeId", row[0].toString());
				} else {

				}

				if (row[1] != null) {
					obj1.put("storeName", row[1].toString());
				} else {

				}

				jsonArrays.put(obj1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonArrays;
	}

	@Override
	public Integer getMRNSlaveStatus(Integer mrnId) {
		Object rows = new ArrayList<Object>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select count(mrn_slave_id) from pharma_mrn_issue_master master inner join pharma_store_mrn_master s_master on s_master.mrn_id=master.mrn_issue_mrn_id inner join pharma_store_mrn_slave s_slave on s_slave.mrn_slave_master_id=s_master.mrn_id where s_slave.mrn_slave_status='pending' and s_master.mrn_id='"
									+ mrnId + "';");
			rows = query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Integer.parseInt(rows.toString());
	}

	@Override
	public boolean changeMRNMasterStatus(String status, Integer mrnId) {
		try {
			Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"update pharma_store_mrn_master set mrn_status='" + status
							+ "' where mrn_id=:mrnId");
			query.setInteger("mrnId", mrnId);
			int rowsDeleted = query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	@Override
	public void deleteMRN(Integer mrnId) {
		try {
			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_store_mrn_master set mrn_delete_flag='1' where mrn_id=:mrnId");
			query.setInteger("mrnId", mrnId);
			int rowsDeleted = query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public MrnIssueMaster editMrnIssue(Integer mrnIssueId) {
		MrnIssueMaster mrnMaster = new MrnIssueMaster();
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(MrnIssueMaster.class)
				.createAlias("mrnMaster", "mrnMaster");
		criteria.add(Restrictions.eq("mrnIssueDeleteFlag", 0));
		if (mrnIssueId != 0) {
			criteria.add(Restrictions.eq("mrnIssueId", mrnIssueId));
		}

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("mrnIssueId"));
		proList.add(Projections.property("mrnIssueDocNo"));
		proList.add(Projections.property("mrnReceivedDate"));
		proList.add(Projections.property("mrnIssueReceiveTime"));
		proList.add(Projections.property("mrnIssueNarration"));
		proList.add(Projections.property("mrnIssueGrossAmt"));
		proList.add(Projections.property("mrnIssueAdd"));
		proList.add(Projections.property("mrnIssueLess"));
		proList.add(Projections.property("mrnIssueNetAmt"));
		proList.add(Projections.property("mrnIssueSpecialDisc"));
		proList.add(Projections.property("mrnIssueSurcharges"));
		proList.add(Projections.property("mrnIssueRound"));
		proList.add(Projections.property("mrnIssueCN"));

		proList.add(Projections.property("mrnIssueCD"));
		proList.add(Projections.property("mrnIssueCnAmt"));
		proList.add(Projections.property("mrnIssueAmountReceive"));
		proList.add(Projections.property("mrnIssueAmountBalance"));
		proList.add(Projections.property("mrnIssuePreviousBalance"));
		proList.add(Projections.property("mrnIssueCdAmt"));

		proList.add(Projections.property("mrnIssueDeleteFlag"));
		proList.add(Projections.property("mrnIssueUpdateDate"));
		proList.add(Projections.property("mrnIssueBillMode"));
		proList.add(Projections.property("mrnAddedBy"));

		proList.add(Projections.property("mrnModBy"));
		proList.add(Projections.property("storeId"));
		proList.add(Projections.property("storeName"));

		proList.add(Projections.property("mrnMaster.mrnId"));
		proList.add(Projections.property("mrnMaster.mrnDate"));

		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					mrnMaster
							.setMrnIssueId(Integer.parseInt(row[0].toString()));
				else
					mrnMaster.setMrnIssueId(0);

				if (row[1] != null) {
					mrnMaster.setMrnIssueDocNo(row[1].toString());
				} else
					mrnMaster.setMrnIssueDocNo("");

				if (row[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat.parse(row[2].toString());
					mrnMaster.setMrnReceivedDate(date);

				}

				if (row[3] != null) {
					mrnMaster.setMrnIssueReceiveTime(row[3].toString());
				} else {
					mrnMaster.setMrnIssueReceiveTime("");
				}

				if (row[4] != null) {
					mrnMaster.setMrnIssueNarration(row[4].toString());
				}

				if (row[5] != null)
					mrnMaster.setMrnIssueGrossAmt(Double.parseDouble(row[5]
							.toString()));
				else
					mrnMaster.setMrnIssueGrossAmt(0.0);

				if (row[6] != null)
					mrnMaster.setMrnIssueAdd(Double.parseDouble(row[6]
							.toString()));
				else
					mrnMaster.setMrnIssueAdd(0.0);

				if (row[7] != null)
					mrnMaster.setMrnIssueLess(Double.parseDouble(row[7]
							.toString()));

				if (row[8] != null)
					mrnMaster.setMrnIssueNetAmt(Double.parseDouble(row[8]
							.toString()));

				if (row[9] != null)
					mrnMaster.setMrnIssueSpecialDisc(Double.parseDouble(row[9]
							.toString()));
				else
					mrnMaster.setMrnIssueSpecialDisc(0.0);

				if (row[10] != null)
					mrnMaster.setMrnIssueSurcharges(Double.parseDouble(row[10]
							.toString()));
				else
					mrnMaster.setMrnIssueSurcharges(0.0);

				if (row[11] != null)
					mrnMaster.setMrnIssueRound(Double.parseDouble(row[11]
							.toString()));
				else
					mrnMaster.setMrnIssueRound(0.0);

				if (row[12] != null)
					mrnMaster.setMrnIssueCN(Double.parseDouble(row[12]
							.toString()));
				else
					mrnMaster.setMrnIssueCN(0.0);

				if (row[13] != null)
					mrnMaster.setMrnIssueCD(Double.parseDouble(row[13]
							.toString()));
				else
					mrnMaster.setMrnIssueCD(0.0);

				if (row[14] != null)
					mrnMaster.setMrnIssueCnAmt(Double.parseDouble(row[14]
							.toString()));
				else
					mrnMaster.setMrnIssueCnAmt(0.0);

				if (row[15] != null)
					mrnMaster.setMrnIssueAmountReceive(Double
							.parseDouble(row[15].toString()));
				else
					mrnMaster.setMrnIssueAmountReceive(0.0);

				if (row[16] != null)
					mrnMaster.setMrnIssueAmountBalance(Double
							.parseDouble(row[16].toString()));
				else
					mrnMaster.setMrnIssueAmountBalance(0.0);

				if (row[17] != null)
					mrnMaster.setMrnIssuePreviousBalance(Double
							.parseDouble(row[17].toString()));
				else
					mrnMaster.setMrnIssuePreviousBalance(0.0);

				if (row[18] != null)
					mrnMaster.setMrnIssueCdAmt(Double.parseDouble(row[18]
							.toString()));
				else
					mrnMaster.setMrnIssueCdAmt(0.0);

				if (row[19] != null)
					mrnMaster.setMrnIssueDeleteFlag(Integer.parseInt(row[19]
							.toString()));
				else
					mrnMaster.setMrnIssueDeleteFlag(0);

				if (row[20] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat.parse(row[20].toString());
					mrnMaster.setMrnIssueUpdateDate(date);
				}

				if (row[21] != null)
					mrnMaster.setMrnIssueBillMode(Integer.parseInt(row[21]
							.toString()));
				else
					mrnMaster.setMrnIssueBillMode(0);

				if (row[22] != null)
					mrnMaster.setMrnAddedBy(row[22].toString());
				else
					mrnMaster.setMrnAddedBy("");

				if (row[23] != null)
					mrnMaster.setMrnModBy(row[23].toString());
				else
					mrnMaster.setMrnModBy("");

				if (row[24] != null)
					mrnMaster.setStoreId(row[24].toString());

				if (row[25] != null)
					mrnMaster.setStoreName(row[25].toString());
				MrnMaster mrnMaster2 = new MrnMaster();
				if (row[26] != null) {

					mrnMaster2.setMrnId(Integer.parseInt(row[26].toString()));

				}

				if (row[27] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat.parse(row[27].toString());
					mrnMaster2.setMrnDate(date);
					mrnMaster.setMrnMaster(mrnMaster2);

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<MrnIssueSlave> mrnSlaves = new ArrayList<MrnIssueSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							"select mrn_issue_slave_id,mrn_issue_slave_product_id,mrn_issue_slave_qty,mrn_issue_slave_rate,mrn_issue_slave_batch_code,mrn_issue_slave_amt,mrn_issue_slave_batch_expiry,mrn_issue_slave_mrp,mrn_issue_slave_batchId,mrn_issue_slave_mrn_slave_id,mrn_issue_slave_total_issue_qty,mrn_issue_slave_pending_qty,mrn_issue_slave_vat,product.product_name,product.product_uom_unit,packing.pack_type,comp.comp_name,mrn_issue_receive_status from pharma_mrn_issue_master master inner join pharma_mrn_issue_slave mrn_slave ON mrn_slave.mrn_issue_slave_master_id = master.mrn_issue_id inner join pharma_product_master product ON product.product_id = mrn_slave.mrn_issue_slave_product_id inner join pharma_packing_master packing ON packing.pack_id = product.product_pack_id inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id where master.mrn_issue_id = '"
									+ mrnIssueId + "'");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				MrnIssueSlave mrnSlave = new MrnIssueSlave();

				if (row[0] != null)
					mrnSlave.setMrnIssueSlaveId(Integer.parseInt(row[0]
							.toString()));
				else
					mrnSlave.setMrnIssueSlaveId(0);

				ProductMaster productMaster = new ProductMaster();
				if (row[1] != null)
					productMaster.setProductId(Integer.parseInt(row[1]
							.toString()));

				if (row[2] != null)
					mrnSlave.setMrnIssueSlaveQty(Integer.parseInt(row[2]
							.toString()));

				if (row[3] != null) {
					mrnSlave.setMrnIssueSlaveRate(Double.parseDouble(row[3]
							.toString()));
				}

				if (row[4] != null)
					mrnSlave.setMrnIssueSlaveBatchCode(row[4].toString());
				else
					mrnSlave.setMrnIssueSlaveBatchCode("");

				if (row[5] != null)
					mrnSlave.setMrnIssueSlaveAmt(Double.parseDouble(row[5]
							.toString()));

				if (row[6] != null)
					mrnSlave.setMrnIssueSlaveBatchExpiry(row[6].toString());
				else
					mrnSlave.setMrnIssueSlaveBatchExpiry("");

				if (row[7] != null)
					mrnSlave.setMrnIssueSlaveMrp(Double.parseDouble(row[7]
							.toString()));

				if (row[8] != null)
					mrnSlave.setMrnIssueSlaveBatchId(Integer.parseInt(row[8]
							.toString()));

				if (row[9] != null)
					mrnSlave.setMrnIssueSlaveMrnSlaveId(Integer.parseInt(row[9]
							.toString()));

				if (row[10] != null)
					mrnSlave.setMrnIssueSlaveTotalIssueQty(Integer
							.parseInt(row[10].toString()));

				if (row[11] != null)
					mrnSlave.setMrnIssueSlavePendingQty(Integer
							.parseInt(row[11].toString()));

				if (row[12] != null)
					mrnSlave.setMrnIssueSlaveVat(Double.parseDouble(row[12]
							.toString()));

				if (row[13] != null) {
					productMaster.setProductName(row[13].toString());
				}

				if (row[14] != null) {
					productMaster.setProductUnit(Double.parseDouble(row[14]
							.toString()));
				}

				if (row[15] != null) {
					PackingMaster packingMaster = new PackingMaster();
					packingMaster.setPackType(row[15].toString());
					productMaster.setPackingMaster(packingMaster);
				}

				if (row[16] != null) {
					CompanyMaster companyMaster = new CompanyMaster();
					companyMaster.setCompName(row[16].toString());
					productMaster.setCompanyMaster(companyMaster);
				}

				if (row[17] != null) {
					mrnSlave.setStoreMrnReceiveStatus(Integer.parseInt(row[17]
							.toString()));
				}

				mrnSlave.setProductMaster(productMaster);
				mrnSlaves.add(mrnSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		mrnMaster.setMrnIssueSlaves(mrnSlaves);

		return mrnMaster;
	}

	@Override
	public JSONArray getPendingMRNDetailsByMrnId(Integer mrnId) {

		JSONArray jsonArray = new JSONArray();
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"select product.product_Id,product.product_name,product.product_uom_unit,pack.pack_type,comp.comp_name,slave.mrn_slave_qty,slave.store_receive_qty,slave.mrn_slave_id from pharma_store_mrn_master master inner join pharma_store_mrn_slave slave on slave.mrn_slave_master_id=master.mrn_id inner join pharma_product_master product on product.product_id=slave.mrn_slave_product_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id inner join pharma_company_master comp on comp.comp_id=product.product_comp_id where master.mrn_id='"
								+ mrnId
								+ "' and slave.mrn_slave_status='pending'");
		List<Object[]> result = query.list();

		for (Object[] master : result) {
			JSONObject jsonObject = new JSONObject();

			try {
				if (master[0] != null) {
					jsonObject.put("productId", master[0].toString());
				}

				if (master[1] != null) {
					jsonObject.put("productName", master[1].toString());
				}

				if (master[2] != null) {
					jsonObject.put("productUnit", master[2].toString());
				}

				if (master[3] != null) {
					jsonObject.put("productPack", master[3].toString());
				}

				if (master[4] != null) {
					jsonObject.put("productCompany", master[4].toString());
				}

				if (master[5] != null) {
					jsonObject.put("productIssueQty", master[5].toString());
				}

				if (master[6] != null) {
					jsonObject
							.put("productPendingQty",
									(Double.parseDouble(master[5].toString()))
											- (Double.parseDouble(master[6]
													.toString())));
				}

				if (master[7] != null) {
					jsonObject.put("mrnSlaveId", master[7].toString());
				}
				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public List<MrnMaster> getStoreWiseMrnByStoreId(Integer storeId) {
		List<MrnMaster> mrnIssueMasters = new ArrayList<MrnMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MrnMaster.class);
			criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
			criteria.add(Restrictions.eq("mrnStoreId", storeId));
			criteria.addOrder(Order.desc("mrnStoreId"));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("mrnId"));
			proList.add(Projections.property("mrnDocId"));
			proList.add(Projections.property("mrnDate"));
			proList.add(Projections.property("mrnStatus"));
			proList.add(Projections.property("MrnApproved"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {

				MrnMaster MrnMaster = new MrnMaster();
				if (master[0] != null) {
					MrnMaster.setMrnId(Integer.parseInt(master[0].toString()));
				}
				if (master[1] != null) {
					MrnMaster.setMrnDocId(master[1].toString());
				} else
					MrnMaster.setMrnDocId("");

				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[2].toString());

				MrnMaster.setMrnDate(date);

				if (master[3] != null) {
					MrnMaster.setMrnStatus(master[3].toString());
				} else
					MrnMaster.setMrnStatus("");

				if (master[4] != null) {
					if (Integer.parseInt(master[4].toString()) == 0) {
						MrnMaster.setMrnApprovedBy("Not Approved");
					} else
						MrnMaster.setMrnApprovedBy("Approved");
				}
				mrnIssueMasters.add(MrnMaster);

			}
		} catch (Exception e) {
			e.printStackTrace();
			return mrnIssueMasters;
		}
		return mrnIssueMasters;
	}

	public boolean changeQtyForIssueMRN(Integer batchId, Integer newQty,
			Integer slaveId) {
		Double qty = 0.0;
		Double pendingQty = 0.0;
		Double pendingStock = 0.0;
		Double totalStock = 0.0;
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT mrn_issue_slave_total_issue_qty, mrn_issue_slave_pending_qty FROM pharma_mrn_issue_slave where mrn_issue_slave_id ='"
									+ slaveId + "'");

			List<Object[]> rows = query.list();
			for (Object[] master : rows) {
				if (master[0] != null) {
					qty = Double.parseDouble(master[0].toString());
				}

				if (master[1] != null) {
					pendingQty = Double.parseDouble(master[1].toString());
				}

			}
		} catch (Exception e) {
			System.out.println(e);
		}

		totalStock = qty + pendingQty;
		pendingStock = totalStock - newQty;
		try {
			Query updateStock = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_mrn_issue_slave set mrn_issue_slave_total_issue_qty ='"
									+ newQty
									+ "',mrn_issue_slave_pending_qty ='"
									+ pendingStock
									+ "',mrn_issue_receive_status ='1'  where  mrn_issue_slave_id='"
									+ slaveId + "' ");
			int rowsDeleted = updateStock.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return true;
	}

	@Override
	public Boolean saveReceiveMrn(MrnMaster mrnMaster) {

		try {
               Query query=sessionFactory.getCurrentSession().createSQLQuery("select mrn_main_store_name from pharma_store_mrn_master where mrn_id="+mrnMaster.getMrnId()).setCacheable(true);
               Object object=query.uniqueResult();
               mrnMaster.setMrnMainStoreId(Integer.parseInt(object+""));
			if (saveBatchStockDetailsForMrnReceive(mrnMaster)) {
				return true;
			} else
				return false;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	public void changeMRNStatus(MrnIssueMaster mrnIssueMaster,
			String receiveFlag) {
		List<MrnSlave> mrnSlaves = new ArrayList<MrnSlave>();

		List<MrnIssueSlave> mrnSlave2 = mrnIssueMaster.getMrnIssueSlaves();
		for (MrnIssueSlave mrnIssueSlave : mrnSlave2) {
			if ((mrnIssueSlave.getStoreMrnReceiveStatus().toString())
					.contains("1")) {
				MrnSlave mrnSlave = new MrnSlave();
				mrnSlave.setMrnSlaveId(mrnIssueSlave
						.getMrnIssueSlaveMrnSlaveId());
				mrnSlave.setMrnSlaveSr(mrnIssueSlave.getStoreMrnReceiveStatus());
				mrnSlave.setMrnSlavePendingQty(mrnIssueSlave
						.getMrnIssueSlaveTotalIssueQty());

				if (mrnSlaves.size() == 0) {
					mrnSlaves.add(mrnSlave);
				} else {
					if (mrnSlaves.contains(mrnSlave)) {
						for (int i = 0; i < mrnSlaves.size(); i++) {

							MrnSlave searchMrnSlave = new MrnSlave();
							if (mrnSlaves.get(i).getMrnSlaveId()
									.equals(mrnSlave.getMrnSlaveId())) {
								searchMrnSlave = mrnSlaves.get(i);
								searchMrnSlave.setMrnSlavePendingQty(mrnSlave
										.getMrnSlavePendingQty()
										+ searchMrnSlave
												.getMrnSlavePendingQty());
								mrnSlaves.set(i, searchMrnSlave);
								break;
							}

						}
					} else {
						mrnSlaves.add(mrnSlave);
					}
				}

			}

			for (MrnSlave mrnSlave : mrnSlaves) {
				try {
					SQLQuery fetchStock = sessionFactory.getCurrentSession()
							.createSQLQuery(
									"SELECT mrn_slave_qty from pharma_store_mrn_slave where mrn_slave_id='"
											+ mrnSlave.getMrnSlaveId() + "'");
					Integer requireQty = 0;
					Object rows = null;
					rows = fetchStock.uniqueResult();
					mrnSlave.setMrnSlaveQty(Integer.parseInt(rows.toString()));

				} catch (Exception e) {
					e.printStackTrace();
				}
			}

			for (MrnSlave mrnSlave : mrnSlaves) {
				try {
					String status = "pending";
					if (mrnSlave.getMrnSlavePendingQty().equals(
							mrnSlave.getMrnSlaveQty())) {
						status = "received";
					}

					Query queryForUpdatePendingQty = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"update pharma_store_mrn_slave set mrn_slave_pending_qty='"
											+ mrnSlave.getMrnSlavePendingQty()
											+ "'  where mrn_slave_id=:mrnSlaveId");
					queryForUpdatePendingQty.setInteger("mrnSlaveId",
							mrnSlave.getMrnSlaveId());
					int resultPendingQty = queryForUpdatePendingQty
							.executeUpdate();

					if (receiveFlag.equals("off")) {

						Query query = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"update pharma_store_mrn_slave set mrn_slave_status='"
												+ status
												+ "',store_receive_qty='"
												+ mrnSlave
														.getMrnSlavePendingQty()
												+ "' where mrn_slave_id=:mrnSlaveId");
						query.setInteger("mrnSlaveId", mrnSlave.getMrnSlaveId());
						int rowsDeleted = query.executeUpdate();

					}

				} catch (Exception e) {
					e.printStackTrace();
				}
			}

		}
	}

	public void changeMRNQty(MrnMaster mrnMaster) {
		List<MrnSlave> mrnSlaves = new ArrayList<MrnSlave>();
		List<MrnSlave> mrnSlave2 = mrnMaster.getMrnSlaves();
		for (MrnSlave mrnIssueSlave : mrnSlave2) {
			MrnSlave mrnSlave = new MrnSlave();
			mrnSlave.setMrnSlaveId(mrnIssueSlave.getMrnSlaveSr());
			mrnSlave.setMrnSlaveQty(mrnIssueSlave.getMrnSlaveQty());

			if (mrnSlaves.size() == 0) {
				mrnSlaves.add(mrnSlave);
			} else {
				if (mrnSlaves.contains(mrnSlave)) {
					for (int i = 0; i < mrnSlaves.size(); i++) {
						MrnSlave searchMrnSlave = new MrnSlave();
						if (mrnSlaves.get(i).getMrnSlaveId()
								.equals(mrnSlave.getMrnSlaveId())) {
							searchMrnSlave = mrnSlaves.get(i);
							searchMrnSlave.setMrnSlaveQty(mrnSlave
									.getMrnSlaveQty()
									+ searchMrnSlave.getMrnSlaveQty());

							mrnSlaves.set(i, searchMrnSlave);
							break;
						}
					}
				} else {
					mrnSlaves.add(mrnSlave);
				}
			}
		}

		for (MrnSlave mrnSlave : mrnSlaves) {
			try {
				SQLQuery fetchStock = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"SELECT mrn_slave_qty,store_receive_qty from pharma_store_mrn_slave where mrn_slave_id='"
										+ mrnSlave.getMrnSlaveId() + "'");
				Integer requireQty = 0;
				Object[] rows = null;
				rows = (Object[]) fetchStock.uniqueResult();
				Integer totalReceiveQty = (mrnSlave.getMrnSlaveQty())
						+ Integer.parseInt(rows[1].toString());
				Integer totalRequireQty = Integer.parseInt(rows[0].toString());

				mrnSlave.setMrnSlavePendingQty(totalReceiveQty);

				mrnSlave.setMrnSlaveQty(totalRequireQty);
				Query updateStock = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"update pharma_store_mrn_slave set store_receive_qty ='"
										+ totalReceiveQty
										+ "',mrn_slave_pending_qty ='"
										+ totalReceiveQty
										+ "'  where  mrn_slave_id='"
										+ mrnSlave.getMrnSlaveId() + "' ");
				int rowsDeleted = updateStock.executeUpdate();

			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		for (MrnSlave mrnSlave : mrnSlaves) {
			try {
				String status = "pending";
				if (mrnSlave.getMrnSlavePendingQty().equals(
						mrnSlave.getMrnSlaveQty())) {
					status = "received";
				}
				Query query = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"update pharma_store_mrn_slave set mrn_slave_status='"
										+ status
										+ "'  where mrn_slave_id=:mrnSlaveId");
				query.setInteger("mrnSlaveId", mrnSlave.getMrnSlaveId());
				int rowsDeleted = query.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	@Override
	public MrnMaster editStoreMrnForReceive(Integer mrnId) {
		MrnMaster mrnMaster = new MrnMaster();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				MrnMaster.class);
		criteria.add(Restrictions.eq("mrnDeleteFlag", 0));
		criteria.add(Restrictions.eq("mrnId", mrnId));

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("mrnId"));
		proList.add(Projections.property("mrnDocId"));
		proList.add(Projections.property("mrnDate"));
		proList.add(Projections.property("mrnTime"));
		proList.add(Projections.property("mrnStoreName"));
		proList.add(Projections.property("mrnRemark"));
		proList.add(Projections.property("mrnProductCount"));

		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					mrnMaster.setMrnId(Integer.parseInt(row[0].toString()));
				else
					mrnMaster.setMrnId(0);

				if (row[1] != null) {
					mrnMaster.setMrnDocId(row[1].toString());
				} else
					mrnMaster.setMrnDocId("");

				if (row[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat.parse(row[2].toString());
					mrnMaster.setMrnDate(date);
				}

				if (row[3] != null) {
					mrnMaster.setMrnTime(row[3].toString());
				} else {
					mrnMaster.setMrnTime("");
				}

				if (row[4] != null) {
					mrnMaster.setMrnStoreName(row[4].toString());
				}

				if (row[5] != null)
					mrnMaster.setMrnRemark((row[5].toString()));
				else
					mrnMaster.setMrnRemark("0");

				if (row[6] != null)
					mrnMaster.setMrnProductCount(Integer.parseInt(row[6]
							.toString()));
				else
					mrnMaster.setMrnProductCount(Integer.parseInt("0"));

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<MrnSlave> mrnSlaves = new ArrayList<MrnSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" SELECT mrn_issue_slave_id,mrn_issue_slave_product_id,product.product_name,packing.pack_type,comp.comp_name,product.product_uom_unit,mrn_issue_slave_total_issue_qty,mrn_issue_slave_batchId,mrn_issue_slave_batch_code,mrn_issue_slave_mrn_slave_id,mrn_issue_receive_status "
									+ " FROM pharma_mrn_issue_master master inner join pharma_mrn_issue_slave slave ON master.mrn_issue_id = slave.mrn_issue_slave_master_id inner join pharma_product_master product on product.product_id=slave.mrn_issue_slave_product_id inner join "
									+ " pharma_packing_master packing ON packing.pack_id = product.product_pack_id inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id where master.mrn_issue_mrn_id = '"
									+ mrnId + "'");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				MrnSlave mrnSlave = new MrnSlave();
				if (row[0] != null)
					mrnSlave.setMrnSlaveId(Integer.parseInt(row[0].toString()));
				else
					mrnSlave.setMrnSlaveId(0);

				ProductMaster productMaster = new ProductMaster();

				if (row[1] != null)
					productMaster.setProductId(Integer.parseInt(row[1]
							.toString()));

				if (row[2] != null)
					productMaster.setProductName((row[2].toString()));

				PackingMaster packingMaster = new PackingMaster();
				if (row[3] != null)
					packingMaster.setPackType((row[3].toString()));

				CompanyMaster companyMaster = new CompanyMaster();
				if (row[4] != null) {
					companyMaster.setCompName((row[4].toString()));
				}

				if (row[5] != null) {
					productMaster.setProductUnit(Double.parseDouble(row[5]
							.toString()));
				}

				if (row[6] != null)
					mrnSlave.setMrnSlaveQty(Integer.parseInt(row[6].toString()));
				else
					mrnSlave.setMrnSlaveQty(0);

				if (row[7] != null)
					mrnSlave.setMrnSlavePendingQty(Integer.parseInt(row[7]
							.toString()));

				if (row[8] != null)
					mrnSlave.setMrnSlaveStatus((row[8].toString()));

				if (row[9] != null)
					mrnSlave.setMrnSlaveSr(Integer.parseInt(row[9].toString()));

				if (row[10] != null)
					companyMaster
							.setCompId(Integer.parseInt(row[10].toString()));

				productMaster.setPackingMaster(packingMaster);
				productMaster.setCompanyMaster(companyMaster);
				mrnSlave.setProductMaster(productMaster);

				mrnSlaves.add(mrnSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		mrnMaster.setMrnSlaves(mrnSlaves);

		return mrnMaster;
	}
	
	/*****
	 * @author    :BILAL
	 * @Date      :06-12-2017
	 * @Code      :For delete MRN issue by id 
	 * *******/
	@Override
	public boolean deleteMRNIssueById(int mrnIssueId, HttpServletRequest request) {
		
		try {
			MrnIssueMaster mrnissue = (MrnIssueMaster) sessionFactory
					.getCurrentSession().get(MrnIssueMaster.class, mrnIssueId);

			mrnissue.setMrnIssueDeleteFlag(1);
			

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}

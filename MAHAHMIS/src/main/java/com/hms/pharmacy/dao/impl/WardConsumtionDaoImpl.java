package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.hms.pharmacy.dao.WardConsumtionDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.IndentMaster;
import com.hms.pharmacy.pojo.IndentSaleMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.pojo.WardConsumptionMaster;
import com.hms.pharmacy.pojo.WardConsumptionSlave;

@Repository
public class WardConsumtionDaoImpl implements WardConsumtionDao {

	@Autowired
	SessionFactory sessionFactory;

	List<StockMaster> stockMasters = new ArrayList<StockMaster>();
	Map<String, String> result = new HashMap<String, String>();
	int count = 0;

	@Override
	public JSONArray getWards() {
		JSONArray jsonArray = new JSONArray();
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"select idhall_type,hall_type_name from hall_type where status='Y';");
		List<Object[]> result = query.list();

		for (Object[] master : result) {
			JSONObject jsonObject = new JSONObject();

			try {
				if (master[0] != null) {
					jsonObject.put("wardId", master[0].toString());
				}

				if (master[1] != null) {
					jsonObject.put("wardName", master[1].toString());
				}
				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public Map<String, String> saveWardConsumption(
			WardConsumptionMaster consumptionMaster) {
		result = new HashMap<String, String>();
		try {

			stockMasters = new ArrayList<StockMaster>();
			count = 0;

			if (saveBatchStockDetails(consumptionMaster, consumptionMaster
					.getWardSaleStoreId().toString())) {
				sessionFactory.getCurrentSession().saveOrUpdate(
						consumptionMaster);
				result.put("result", "Record Save Succesfully");
			} else {
				result.put("result", "Error");
			}
			/* saveBatchStockDetails(patientSaleBillMaster); */

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public boolean saveBatchStockDetails(
			WardConsumptionMaster wardConsumptionMaster, String storeId) {
		boolean result = true;
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		for (WardConsumptionSlave slave : wardConsumptionMaster
				.getWardConsumptionSlaves()) {
			BatchMaster batchMaster = new BatchMaster();
			batchMaster.setBatchId(slave.getProductMaster().getBatchMaster()
					.get(0).getBatchId());

			batchMaster.setBatchCode(slave.getWardSaleBatchCode());
			StockMaster stockMaster = new StockMaster();
			stockMaster.setStockQtyInHand(Double.parseDouble(slave
					.getWardSlaveQty().toString()));
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
						.getStockMaster().getStockQtyInHand(), storeId,
						batchMaster.getBatchCode());
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

	public boolean checkAvailibility(Integer batchId, Double Qty,
			String storeId, String batchCode) {
		StockMaster stockMaster = new StockMaster();
		boolean results = false;
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

			if (availableStock >= Qty) {
				totalStock = availableStock - Qty;
				results = true;
			} else {
				result.put("batchCode", batchCode);
				results = false;
				count = 1;
				return results;

			}

			stockMaster.setStockQtyInHand(totalStock);
			BatchMaster batchMaster = new BatchMaster();
			batchMaster.setBatchId(batchId);

			stockMaster.setBatchMaster(batchMaster);

			stockMasters.add(stockMaster);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return results;

	}

	public boolean decreaseStock(String storeId) {
		/*
		 * try {
		 * 
		 * SQLQuery query = sessionFactory .getCurrentSession() .createSQLQuery(
		 * "SELECT stock_qty_in_hand FROM pharma_stock_master where stock_batch_id='"
		 * +batchId+"'"); Double availableStock=null; Double totalStock=null;
		 * Object rows = query.uniqueResult();
		 * 
		 * if(rows!=null) { availableStock=Double.parseDouble(rows.toString());
		 * }
		 * 
		 * if(availableStock >= Qty) totalStock=availableStock-Qty;
		 * 
		 * SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		 * String date=dateFormat.format(new java.util.Date());
		 * 
		 * try { Query query1 = sessionFactory .getCurrentSession()
		 * .createSQLQuery(
		 * "update pharma_stock_master set stock_qty_in_hand='"+
		 * totalStock+"',stock_update_date='"
		 * +date+"' where stock_batch_id=:batchId");
		 * query1.setInteger("batchId", batchId); int rowsDeleted =
		 * query1.executeUpdate(); } catch(Exception e) { e.printStackTrace(); }
		 * 
		 * } catch (Exception e) { e.printStackTrace(); }
		 */
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

	@Override
	public JSONArray getWardConsumptionDetails(Integer treatmentId) {
		JSONArray jsonArray = new JSONArray();

		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT ward_sale_id,ward_sale_date,ward_sale_consume_type,ward_sale_dispenceTo,h_typ.hall_type_name,store.store_name FROM pharma_ward_consumption_master master inner join hall_type h_typ on h_typ.idhall_type=master.ward_sale_ward_id inner join pharma_sub_store_master store on store.store_id=master.ward_sale_store_id where Treatment_Id='"+treatmentId+"' and ward_sale_delete_flag=0 order by ward_sale_id desc;");

		List<Object[]> results = query.list();

		for (Object[] master : results) {
			JsonArray jsonArray2 = new JsonArray();
			try {
				JSONObject jsonObject = new JSONObject();

				if (master[0] != null)
					jsonObject.put("wardSaleId", master[0].toString());

				if (master[1] != null)
					jsonObject.put("date", master[1].toString());

				if (master[2] != null)
					jsonObject.put("consType", master[2].toString());

				if (master[3] != null)
					jsonObject.put("dispTo", master[3].toString());

				if (master[4] != null)
					jsonObject.put("ward", master[4].toString());

				if (master[5] != null)
					jsonObject.put("store", master[5].toString());

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public JSONArray getPrevWardConsumptionDetails(Integer treatmentId) 
	{
		
		JSONArray jsonArray = new JSONArray();
		SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT Patient_ID FROM treatment where Treatment_ID='"
						+ treatmentId + "'");
		Object rows1 = (Object) query2.uniqueResult();
		int pId = Integer.parseInt(rows1.toString());
		
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT ward_sale_id,ward_sale_date,ward_sale_consume_type,ward_sale_dispenceTo,h_typ.hall_type_name,store.store_name "
                        +" FROM pharma_ward_consumption_master master inner join hall_type h_typ ON h_typ.idhall_type = master.ward_sale_ward_id "
                        +" inner join pharma_sub_store_master store ON store.store_id = master.ward_sale_store_id inner join treatment t on t.Treatment_ID=master.Treatment_Id "
                        +" inner join patient p on p.Patient_ID=t.Patient_ID where p.Patient_ID = '"+pId+"' and t.TFlag='INACTIVE' and ward_sale_delete_flag = 0 "
                        +" order by ward_sale_id desc;");

		List<Object[]> results = query.list();

		for (Object[] master : results) {
			JsonArray jsonArray2 = new JsonArray();
			try {
				JSONObject jsonObject = new JSONObject();

				if (master[0] != null)
					jsonObject.put("wardSaleId", master[0].toString());

				if (master[1] != null)
					jsonObject.put("date", master[1].toString());

				if (master[2] != null)
					jsonObject.put("consType", master[2].toString());

				if (master[3] != null)
					jsonObject.put("dispTo", master[3].toString());

				if (master[4] != null)
					jsonObject.put("ward", master[4].toString());

				if (master[5] != null)
					jsonObject.put("store", master[5].toString());

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	
	@Override
	public List<WardConsumptionMaster> getWardConsumptionDetailsById(
			Integer wardId) {
		
		List<WardConsumptionMaster> consumptionMasters = new ArrayList<WardConsumptionMaster>();

		/*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				WardConsumptionMaster.class);
		criteria.add(Restrictions.eq("wardSaleDeleteFlag", 0));

		if (wardId != 0) {
			criteria.add(Restrictions.eq("wardSaleId", wardId));
		}

		WardConsumptionMaster wardConsumptionMaster = new WardConsumptionMaster();

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("wardSaleId"));
		proList.add(Projections.property("wardSaleDate"));
		proList.add(Projections.property("wardSaleConsumpType"));
		proList.add(Projections.property("wardSaleDispenceTo"));
		
		proList.add(Projections.property("wardSaleWardId"));
		proList.add(Projections.property("wardSaleStoreId"));

		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();*/
		
		WardConsumptionMaster wardConsumptionMaster = new WardConsumptionMaster();
		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery("SELECT ward_sale_id,ward_sale_date,ward_sale_consume_type,ward_sale_dispenceTo,ward_sale_ward_id,ward_sale_store_id,p.fName,p.mName,p.lName "
                                +" FROM pharma_ward_consumption_master master inner join treatment t ON t.Treatment_ID = master.Treatment_Id "
                                +" inner join patient p ON p.Patient_ID = t.Patient_ID where ward_sale_delete_flag = 0 "
                                +" and master.ward_sale_id = '"
								+ wardId + "';");
		List<Object[]> result = query1.list();
		
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					wardConsumptionMaster.setWardSaleId(Integer.parseInt(row[0]
							.toString()));

				if (row[1] != null) {

					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy/MM/dd");
					String str[] = row[1].toString().split(" ");
					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[2] + "/" + date[1] + "/" + date[0]);
					wardConsumptionMaster.setWardSaleNarration(stringBuffer
							.toString());
				}

				if (row[2] != null) {
					wardConsumptionMaster.setWardSaleConsumpType(row[2]
							.toString());
				}

				if (row[3] != null) {
					wardConsumptionMaster.setWardSaleDispenceTo(row[3]
							.toString());
				}
				else
				{
					wardConsumptionMaster.setWardSaleDispenceTo("No User Selected");
				}
				
				if (row[4] != null) {
					wardConsumptionMaster.setWardSaleWardId(Integer.parseInt(row[4]
							.toString()));
				}
				
				if (row[5] != null) 
				{
					wardConsumptionMaster.setWardSaleStoreId(Integer.parseInt(row[5]
							.toString()));
				}
				
				if (row[6] != null) 
				{
					wardConsumptionMaster.setTreatmentId(row[6].toString()+" "+row[7].toString()+" "+row[8].toString());
				}
				
			/*	if (row[9] != null) {
					wardConsumptionMaster.setWardSaleConsumpType((row[9]
							.toString()));
				}*/

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<WardConsumptionSlave> consumptionSlaves = new ArrayList<WardConsumptionSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" select slave.ward_slave_qty,slave.ward_slave_batch_code,slave.ward_slave_batch_expiry,product.product_name,slave.ward_slave_rate_per_unit,slave.ward_slave_amt,slave.Biling_Type "
                            +" from pharma_ward_consumption_master master inner join pharma_ward_consumption_slave slave ON slave.ward_slave_master_id=master.ward_sale_id inner join pharma_product_master product ON product.product_id = slave.ward_slave_product_id where master.ward_sale_id = '"
							+ wardId + "';");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				WardConsumptionSlave wardConsumptionSlave = new WardConsumptionSlave();

				if (row[0] != null) {
					String result1[] = row[0].toString().split("\\.");
					wardConsumptionSlave.setWardSlaveQty(Integer
							.parseInt(result1[0]));
				}

				if (row[1] != null)
					wardConsumptionSlave
							.setWardSaleBatchCode(row[1].toString());
				else
					wardConsumptionSlave.setWardSaleBatchCode("");

				if (row[2] != null)
					wardConsumptionSlave.setWardBatchExpiry(row[2].toString());
				else
					wardConsumptionSlave.setWardBatchExpiry("");

				ProductMaster productMaster = new ProductMaster();
				if (row[3] != null) {
					productMaster.setProductName(row[3].toString());
					wardConsumptionSlave.setProductMaster(productMaster);
				} else {
					productMaster.setProductName("");
				}
				
				if (row[4] != null)
					wardConsumptionSlave.setWardSlaveRate(Double.parseDouble(row[4].toString()));
				else
					wardConsumptionSlave.setWardSlaveRate(0.0);
				
				if (row[5] != null)
					wardConsumptionSlave.setWardSlaveAmt(Double.parseDouble(row[5].toString()));
				else
					wardConsumptionSlave.setWardSlaveAmt(0.0);
				
				if (row[6] != null)
				{	if(row[6].toString().equals("B"))
						   wardConsumptionSlave.setBillingType("Billable");
						else
							wardConsumptionSlave.setBillingType("Replaceable");
				}

				consumptionSlaves.add(wardConsumptionSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		wardConsumptionMaster.setWardConsumptionSlaves(consumptionSlaves);

		consumptionMasters.add(wardConsumptionMaster);

		return consumptionMasters;
	}

	@Override
	public JSONObject getStoreName(Integer wardSaleStoreId) {

		JSONObject jsonObject = new JSONObject();
		try {

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select store_name from pharma_sub_store_master where store_id='"
							+ wardSaleStoreId + "'");

			Object results = query.uniqueResult();

			jsonObject.put("storeName", results);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;

	}

	@Override
	public JSONObject getWardName(Integer wardSaleWardId) {
		JSONObject jsonObject = new JSONObject();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select hall_type_name from hall_type where idhall_type='"+wardSaleWardId+"';");

			Object results = query.uniqueResult();

			jsonObject.put("wardName", results);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}

	@Override
	public int getTreatmentId(int wardId) {
		int treatmentId = 0;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(WardConsumptionMaster.class);
			/*criteria.add(Restrictions.eq("indentDeleteFlag", 0));*/
			criteria.add(Restrictions.like("wardSaleId", wardId));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("treatmentId"));

			criteria.setProjection(proList);
			Object result = criteria.uniqueResult();

			if (result != null) {
				treatmentId = Integer.parseInt(result.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return treatmentId;
	}
	
	@Override
	public void saveWardConsumptionDetails(WardConsumptionMaster wardConsumptionMaster) 
	{

		int treatmentId = getTreatmentId(wardConsumptionMaster.getWardSaleId());
		/*SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT count(*) FROM pharma_ward_consumption_master where  ward_sale_consume_type='Patient'  and ward_sale_id='"
						+ wardConsumptionMaster.getWardSaleId() + "'");
		Object rows2 = (Object) query3.uniqueResult();
		int count1 = Integer.parseInt(rows2.toString());*/
		if(wardConsumptionMaster.getWardSaleConsumpType().equals("Patient"))
		{
		SQLQuery billMasterQuery = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT bill_id FROM bill_master where treatment_id='"
						+ treatmentId + "' ");
		Object rows = (Object) billMasterQuery.uniqueResult();

		SQLQuery billMasterCountQuery = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT count(*) FROM ipdbill_pharmacy_indent_master where bill_id='"
						+ rows.toString() + "'");
		Object rows1 = (Object) billMasterCountQuery.uniqueResult();
		int count = Integer.parseInt(rows1.toString());

		if (count == 0) {
			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createSQLQuery(
							"insert into ipdbill_pharmacy_indent_master(bill_id,status) values("
									+ rows + ",'y')");
			int rowDeleted = query.executeUpdate();

			org.hibernate.Query masterId = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT idipdbill_pharmacy_indent_master FROM ipdbill_pharmacy_indent_master order by idipdbill_pharmacy_indent_master desc limit 1");
			Object masterId11 = (Object) masterId.uniqueResult();
			int masterId1 = Integer.parseInt(masterId11.toString());
			int productId = 0;
			int batchId = 0;
			int indentId = 0;
			int qty = 0;
			Double rate =0.0;
			Double amount = 0.0;
			Double discount = 0.0;
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
					"dd/MM/yyyy");
			String date = simpleDateFormat.format(new Date());

			for (int i = 0; i < wardConsumptionMaster.getWardConsumptionSlaves().size(); i++) {
				
				System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"+wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getBillingType());
				if(wardConsumptionMaster.getWardConsumptionSlaves().get(i).getBillingType().equals("B"))
				{
				productId = wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getProductMaster().getProductId();
				batchId = wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getProductMaster().getBatchMaster().get(0)
						.getBatchId();
				indentId = wardConsumptionMaster.getWardSaleId();
				qty = wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getWardSlaveQty();
				rate = wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getWardSlaveRatePerUnit();
				amount = wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getWardSlaveAmt();
				
				try {
					Double pay=0.0;
					String type="patient";
					Double coPay=0.0;
					/********************for sponsor patient****************/
					String discountsql = " select sp_dic_master_id from treatment where Treatment_ID='"+treatmentId+"'";
					SQLQuery sponsorQuery = sessionFactory.getCurrentSession().createSQLQuery(discountsql);
					Integer sponsorId = (Integer) sponsorQuery.uniqueResult();
					
					if(sponsorId > 0)
					{
						pay = amount;
						coPay = 0.0;
					}else{
						pay = 0.0;
						coPay = amount;
					}
					org.hibernate.Query slave = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"insert into ipdbill_pharmacy_indent_slave(idipdbill_pharmacy_indent_master,product_id,batch_id," +
									"rate,quantity,date,net_amount,indent_id,pay,co_pay,discount,type) values("
											+ masterId1
											+ ","
											+ productId
											+ ","
											+ batchId
											+ ","
											+ rate
											+ ","
											+ qty
											+ ",'"
											+ date
											+ "',"
											+ amount
											+ ","
											+ indentId + "," + pay + "," + coPay + ","+discount+",'"+type+"');");
					int slave1 = slave.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
				}
				}
			}

		} else {
			SQLQuery editQuery = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select idipdbill_pharmacy_indent_master from ipdbill_pharmacy_indent_master where bill_id="
									+ rows.toString() + "");
			Object editQuery1 = (Object) editQuery.uniqueResult();
			int countBillId = Integer.parseInt(editQuery1.toString());

			int productId = 0;
			int batchId = 0;
			int indentId = 0;
			int qty = 0;
			Double rate =0.0;
			Double amount = 0.0;
			Double disc = 0.0;
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
					"dd/MM/yyyy");
			String date = simpleDateFormat.format(new Date());

			for (int i = 0; i < wardConsumptionMaster.getWardConsumptionSlaves().size(); i++) {
										
				if(wardConsumptionMaster.getWardConsumptionSlaves().get(i).getBillingType().equals("B"))
				{
				
				productId = wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getProductMaster().getProductId();
				batchId = wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getProductMaster().getBatchMaster().get(0)
						.getBatchId();
				indentId = wardConsumptionMaster.getWardSaleId();
				qty = wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getWardSlaveQty();
				rate = wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getWardSlaveRatePerUnit();
				amount = wardConsumptionMaster.getWardConsumptionSlaves().get(i)
						.getWardSlaveAmt();

				try {
					Double pay=0.0;
					String type="patient";
					Double coPay=0.0;
					/********************for sponsor patient****************/
					String discountsql = " select sp_dic_master_id from treatment where Treatment_ID='"+treatmentId+"'";
					SQLQuery sponsorQuery = sessionFactory.getCurrentSession().createSQLQuery(discountsql);
					Integer sponsorid = (Integer) sponsorQuery.uniqueResult();
					
					if(sponsorid > 0)
					{
						pay = amount;
						coPay = 0.0;
					}else{
						pay = 0.0;
						coPay = amount;
					}
					
					org.hibernate.Query slave = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"insert into ipdbill_pharmacy_indent_slave(idipdbill_pharmacy_indent_master,product_id,batch_id,rate,quantity,date,net_amount,indent_id,pay,co_pay,discount,type) values("
											+ countBillId
											+ ","
											+ productId
											+ ","
											+ batchId
											+ ","
											+ rate
											+ ","
											+ qty
											+ ",'"
											+ date
											+ "',"
											+ amount
											+ ","
											+ indentId
											+ ","+ pay+ ","+ coPay+ ","+disc+",'"+type+"');");
					int slave1 = slave.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
				
			}
		}
			
		}
		
	}
	
}

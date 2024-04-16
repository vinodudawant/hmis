package com.hms.ehat.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.OTPharamaDao;
import com.hms.ehat.dto.PharmaConsumtionSlaveDTO;
import com.hms.ehat.dto.pharmaConsumtionDTO;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.pojo.StockMaster;
@Repository
public class OTPharamaDaoImpl implements OTPharamaDao{
	@Autowired
	SessionFactory sessionFactory;
	

	List<StockMaster> stockMasters = new ArrayList<StockMaster>();
	Map<String, String> result = new HashMap<String, String>();
	int count = 0;
	@Override
	public Map<String, String> saveOrUpdatePatientSaleBill(
			pharmaConsumtionDTO patientSaleBillMaster, String storeId) {
		result = new HashMap<String, String>();
		try {

			stockMasters = new ArrayList<StockMaster>();
			count = 0;

			if (saveBatchStockDetails(patientSaleBillMaster, storeId)) {
        		patientSaleBillMaster.setPatientSalesBillId(0);
        		patientSaleBillMaster.getLtPatientSaleBill().get(0).setPatientSlaveId(0);
				patientSaleBillMaster.setPatientSaleBillCatId(1);
				
				System.err.println("patientSaleBillMaster====="+ patientSaleBillMaster.getPatientSalesBillId());
				sessionFactory.getCurrentSession().merge(
						patientSaleBillMaster);
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
			pharmaConsumtionDTO patientSaleBillMaster, String storeId) {
		
		boolean result = true;
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		Double tmp=0.0;
		
		for (Iterator<PharmaConsumtionSlaveDTO> itr=patientSaleBillMaster.getLtPatientSaleBill().iterator();itr.hasNext();) {
			PharmaConsumtionSlaveDTO slave=itr.next();
			tmp=slave.getPatientSlaveAmt()-((slave.getPatientSlaveAmt()*(Double.parseDouble(patientSaleBillMaster.getPatientSalesBillCD())/100)));
			tmp=tmp*(patientSaleBillMaster.getPatientSalesBillAmountReceived()/patientSaleBillMaster.getPatientSalesBillNetAmt());
			slave.setPatientSaleSlaveRecAmt(tmp);
			tmp=slave.getPatientSlaveAmt()-slave.getPatientSaleSlaveRecAmt()-((slave.getPatientSlaveAmt()*(Double.parseDouble(patientSaleBillMaster.getPatientSalesBillCD())/100)));
			slave.setPatientSaleSlaveRemAmt(tmp);
			
			if (slave.getPatientSlaveId() == null) {
				BatchMaster batchMaster = new BatchMaster();
				batchMaster.setBatchId(slave.getProductMaster()
						.getBatchMaster().get(0).getBatchId());

				batchMaster.setBatchCode(slave.getPatientSlaveBatchCode());
				StockMaster stockMaster = new StockMaster();
				stockMaster.setStockQtyInHand(Double.parseDouble(slave
						.getPatientSlaveQty().toString()));
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
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("OT_Service");
			String storeNameOT = (String) resourceBundleEhat.getObject("OtpharmaSubinv");
			
			strQuery = "SELECT stock_qty_in_hand FROM pharma_"
					+ storeNameOT
					+ "_stock_master where stock_batch_id='" + batchId + "'";
			/*
			strQuery = "SELECT stock_qty_in_hand FROM pharma_stock_master where stock_batch_id='"
					+ batchId + "'";
		*/}

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
	 
		try {
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("OT_Service");
			String storeNameOT = (String) resourceBundleEhat.getObject("OtpharmaSubinv");
			if (count == 0) {
			
					Object storeName = "";
					try {
						/*SQLQuery query = sessionFactory.getCurrentSession()
								.createSQLQuery(
										"SELECT store_name FROM pharma_sub_store_master where store_id='"
												+ storeId + "'");
						storeName = query.uniqueResult();*/
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
													+ storeNameOT
													+ "_stock_master set stock_qty_in_hand='"
													+ master.getStockQtyInHand()
													+ "',stock_update_date='"
													+ date
													+ "' where stock_batch_id=:batchId");
							query1.setInteger("batchId", master
									.getBatchMaster().getBatchId());
							query1.executeUpdate();
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
}

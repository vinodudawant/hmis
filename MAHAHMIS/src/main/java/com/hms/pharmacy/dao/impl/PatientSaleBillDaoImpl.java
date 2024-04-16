package com.hms.pharmacy.dao.impl;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.InventoryFetchPateintNameDTO;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.pathology.dto.PathologySampleWiseSlave;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.dao.PatientSaleBillDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.CompanyMaster;

import com.hms.pharmacy.pojo.CreditNotePatient;
import com.hms.pharmacy.pojo.DoctorDetails;
import com.hms.pharmacy.pojo.FinalIndent;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PatientDetails;
import com.hms.pharmacy.pojo.PatientSale;
import com.hms.pharmacy.pojo.PatientSaleBill;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.PharmaPatientAmountHistoryDto;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.PrescriptionMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.pojo.settalBillIndent;
import com.hms.pharmacy.service.CommonService;

@Repository
public class PatientSaleBillDaoImpl implements PatientSaleBillDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	CommonService commonService;

	List<StockMaster> stockMasters = new ArrayList<StockMaster>();
	Map<String, String> result = new HashMap<String, String>();
	int count = 0;

	//Added By BILAL For GST id 
	public int getidTaxmaster(double gstper) {
		int a=0;
		System.err.println("taxRate=-=-=-=-==-=  "+gstper);
		try {	
			Query taxid = sessionFactory.getCurrentSession().createSQLQuery(
					"select distinct tax_id from pharma_tax_master where tax_delete_flag=0 and tax_rate="
							+ gstper);

			a =(Integer) taxid.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
			return  a;
		}
		return  a;
	}
	public boolean saveBatchStockDetails(
			PatientSaleBillMaster patientSaleBillMaster, String storeId) {
		
		boolean result = true;
		Double tmp=0.0;
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		for (Iterator<PatientSaleBillSlave> itr=patientSaleBillMaster.getLtPatientSaleBill().iterator();itr.hasNext();) {
			PatientSaleBillSlave slave=itr.next();
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

		if (storeId != null && !storeId.equals("")) {
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
		try {
			if (count == 0) {
				if (storeId == null ) {//&& !storeId.equals("") && !storeId.equals("null")
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
							 query1.executeUpdate();
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
						try {String s="";
							if(storeName!=null){
								s=storeName.toString()+"_";
							}
							Query query1 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"update pharma_"
													+ s
													+ "stock_master set stock_qty_in_hand='"
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

		@SuppressWarnings("unchecked")
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

	public List<PatientSaleBillMaster> getPatientSales() {
		
		List<PatientSaleBillMaster> patientSaleMasters = new ArrayList<PatientSaleBillMaster>();
		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"  SELECT p.f_name,    p.m_name,    p.l_name,master.patient_doctor_name,master.patient_bill_date,master.patient_sales_bill_net_amt,master.patient_sales_bill_id, "
								+ " master.patient_bill_patient_id,master.patient_sale_previous_balance,master.patient_bill_mode,master.patient_sale_treatmentId FROM pharma_patient_sales_bill_master master inner join ehat_patient p ON p.patient_id = master.patient_bill_patient_id where "
								+ " master.patient_sales_bill_delete_flag = '0' order by master.patient_sales_bill_id DESC limit 10; ");

		@SuppressWarnings("unchecked")
		List<Object[]> result = query1.list();

		try {
			for (Object[] row : result) {
				PatientSaleBillMaster patientSaleMaster = new PatientSaleBillMaster();

				if (row[0] != null)
					patientSaleMaster.setPatientSalesBillPrescription((row[0]
							.toString())
							+ " "
							+ (row[1].toString())
							+ " "
							+ (row[2].toString()));

				if (row[3] != null)
					patientSaleMaster
							.setPatientSalesBillAdd((row[3].toString()));
				else
					patientSaleMaster.setPatientSalesBillAdd(" ");

				
				if (row[4] != null) {
					String str[] = row[4].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[2] + "/" + date[1] + "/" + date[0]);
					patientSaleMaster.setPatientBillMode(stringBuffer
							.toString());
				}
			
				if (row[5] != null)
					patientSaleMaster.setPatientSalesBillNarration(row[5]
							.toString());
				else
					patientSaleMaster.setPatientSalesBillNarration("");

				if (row[6] != null) {
					patientSaleMaster.setPatientSalesBillCD("PS"
							+ row[6].toString());
					patientSaleMaster.setPatientSalesBillId(Integer
							.parseInt(row[6].toString()));
				}

				if (row[7] != null)
					patientSaleMaster.setPatientId(Integer.parseInt(row[7]
							.toString()));

				if (row[8] != null)
					patientSaleMaster.setPatientSalePreviousBalance(Double
							.parseDouble(row[8].toString()));

				if (row[9] != null)
					patientSaleMaster.setPatientSalesBillDocNo(row[9]
							.toString());

				if (row[10] != null)
					patientSaleMaster.setPatientSaleTreatmentId(Integer
							.parseInt(row[10].toString()));

				patientSaleMasters.add(patientSaleMaster);
			}

		} catch (Exception e) {

		}
		return patientSaleMasters;
	}
	
//Modfied By Akshata
	public List<PrescriptionMaster> getPrescription(Integer patientId) {

		List<PrescriptionMaster> PrescriptionMasters = new ArrayList<PrescriptionMaster>();
		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT     preM.preparation_name, oc.medicine_name,    strength.strength_name, oc.dose,   oc.qty,    oc.frequency,    oc.days,    oc.medicine_id,    t.treatment_id,    product.product_uom_unit,    comp.comp_name,    packing.pack_type,    shelf.shelf_name,    oc.prescription_id,    preM.preparation_id,    product.product_cat_id FROM    ehat_patient p        inner join    ehat_treatment t ON t.patient_id = p.patient_id       inner join    opd_prescription oc ON oc.treatment_id = t.treatment_id        inner join    pharma_product_master product ON product.product_id = oc.medicine_id        inner join    pharma_company_master comp ON comp.comp_id = product.product_comp_id        inner join    pharma_packing_master packing ON packing.pack_id = product.product_pack_id        inner join    pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id        inner join    pharma_preparation_master preM ON preM.preparation_id = oc.prep        inner join    pharma_strength_master strength ON strength.strength_id = product.product_strength_id where    oc.deleted = 'Y' and p.patient_id ="								
				+ patientId
								+ " and t.treatment_id = (select            max(t2.treatment_id)        from            ehat_treatment t2        where            t2.patient_id = p.patient_id) order by oc.prescription_id DESC");

		@SuppressWarnings("unchecked")
		List<Object[]> result = query1.list();

		try {
			for (Object[] row : result) {
				PrescriptionMaster prescriptionMaster = new PrescriptionMaster();

				if (row[0] != null)
					prescriptionMaster.setPreparationName(row[0].toString());
				else
					prescriptionMaster.setPreparationName(" ");

				if (row[1] != null)
					prescriptionMaster.setMedicinName((row[1].toString()));
				else
					prescriptionMaster.setMedicinName(" ");

				if (row[2] != null)
					prescriptionMaster.setStrengthName((row[2].toString()));
				else
					prescriptionMaster.setStrengthName(" ");

				if (row[3] != null)
					prescriptionMaster.setDoseType(row[3].toString());
				else
					prescriptionMaster.setDoseType(" ");

				if (row[4] != null) {
					//Integer recQty = Integer.parseInt(row[14].toString());
					Integer qty = Integer.parseInt(row[4].toString());
					//Integer pendingQty = qty - recQty;
					if (qty > 0)
						prescriptionMaster.setUnit(qty.toString());
					else
						prescriptionMaster.setUnit("0");
				} else

					prescriptionMaster.setUnit("");

				if (row[5] != null)
					prescriptionMaster.setFrequency(row[5].toString());
				else
					prescriptionMaster.setFrequency("");

				if (row[6] != null)
					prescriptionMaster.setDays(row[6].toString());
				else
					prescriptionMaster.setDays("");

				if (row[7] != null)
					prescriptionMaster.setProductId(row[7].toString());
				else
					prescriptionMaster.setProductId("");

				if (row[8] != null)
					prescriptionMaster.setTreatmentId(row[8].toString());
				else
					prescriptionMaster.setTreatmentId("");

				if (row[9] != null)
					prescriptionMaster.setProductUnit(row[9].toString());
				else
					prescriptionMaster.setProductUnit("");

				if (row[10] != null)
					prescriptionMaster.setCompName(row[10].toString());
				else
					prescriptionMaster.setCompName("");

				if (row[11] != null)
					prescriptionMaster.setPackName(row[11].toString());
				else
					prescriptionMaster.setPackName("");

				if (row[12] != null)
					prescriptionMaster.setShelfName(row[12].toString());
				else
					prescriptionMaster.setShelfName("");

				if (row[13] != null)
					prescriptionMaster.setPatientSlaveipdopdId(row[13]
							.toString());
				else
					prescriptionMaster.setPatientSlaveipdopdId("");

				if (row[15] != null)
					prescriptionMaster.setPrescriptionId(row[15].toString());
				else
					prescriptionMaster.setPrescriptionId("");

				if (row[16] != null)
					prescriptionMaster.setCatId(row[16].toString());
				else
					prescriptionMaster.setCatId("");

				PrescriptionMasters.add(prescriptionMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return PrescriptionMasters;
	}

	public List<PrescriptionMaster> getPrescriptionOpd(Integer patientId) {

		List<PrescriptionMaster> PrescriptionMasters = new ArrayList<PrescriptionMaster>();
		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery("SELECT preM.preparation_name,ps.medicine_name,strength.strength_name,ps.dose,ps.qty,ps.frequency,ps.days,ps.medicine_id,ps.treatment_id,product.product_uom_unit,comp.comp_name,packing.pack_type,shelf.shelf_name,ps.prescription_id,product.product_cat_id,preM.preparation_id\n" + 
						"FROM  ehat_patient p    inner join    ehat_treatment t ON t.patient_id = p.patient_id inner join    opd_prescription ps on  t.treatment_id = ps.treatment_id INNER JOIN pharma_product_master product ON product.product_id = ps.medicine_id INNER JOIN pharma_company_master comp ON comp.comp_id = product.product_comp_id INNER JOIN pharma_packing_master packing ON packing.pack_id = product.product_pack_id INNER JOIN pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id\n" + 
						"INNER JOIN pharma_preparation_master preM ON preM.preparation_id = ps.prep INNER JOIN pharma_strength_master strength ON strength.strength_id = product.product_strength_id\n" + 
						" WHERE ps.deleted = 'N' AND ps.patient_id = '"+patientId+"' AND t.treatment_id = (SELECT MAX(t2.treatment_id) FROM ehat_treatment t2 WHERE t2.patient_id = p.patient_id) ORDER BY ps.prescription_id DESC");
					
				/*		" SELECT     preM.preparation_name,    ps.name,    strength.strength_name,    ps.dose,    ps.qty,    ps.frequency,    ps.days,    ps.medicineID,    t.treatment_id,    product.product_uom_unit,    comp.comp_name,    packing.pack_type,    shelf.shelf_name,    ps.prescription_id,    ps.patient_sale_rec_qty,    product.product_cat_id,    preM.preparation_id FROM    ehat_patient p        inner join    ehat_treatment t ON t.patient_id = p.patient_id        inner join    treatment_doctors td ON td.Treatment_ID = t.treatment_id        inner join    prescription ps ON td.ID = ps.treatment_doctor_Id        inner join    pharma_product_master product ON product.product_id = ps.medicineID        inner join    pharma_company_master comp ON comp.comp_id = product.product_comp_id        inner join    pharma_packing_master packing ON packing.pack_id = product.product_pack_id        inner join    pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id        inner join    pharma_preparation_master preM ON preM.preparation_id = ps.prep        inner join    pharma_strength_master strength ON strength.strength_id = product.product_strength_id where    ps.status = 'Y' and p.patient_id ="
			+ patientId
			+ " and t.treatment_id = (select  max(t2.treatment_id)        from            ehat_treatment t2        where            t2.patient_id = p.patient_id) order by ps.prescription_id desc ");
*/
		
		@SuppressWarnings("unchecked")
		List<Object[]> result = query1.list();

		try {
			for (Object[] row : result) {
				PrescriptionMaster prescriptionMaster = new PrescriptionMaster();

				if (row[0] != null)
					prescriptionMaster.setPreparationName(row[0].toString());
				else
					prescriptionMaster.setPreparationName(" ");

				if (row[1] != null)
					prescriptionMaster.setMedicinName((row[1].toString()));
				else
					prescriptionMaster.setMedicinName(" ");

				if (row[2] != null)
					prescriptionMaster.setStrengthName((row[2].toString()));
				else
					prescriptionMaster.setStrengthName(" ");

				if (row[3] != null)
					prescriptionMaster.setDoseType(row[3].toString());
				else
					prescriptionMaster.setDoseType(" ");

				if (row[4] != null) {
					//Double recQty = Double.parseDouble(row[14].toString());
					Double qty = Double.parseDouble(row[4].toString());
					//Double pendingQty = qty - recQty;
					if (qty > 0)
						prescriptionMaster.setUnit(qty.toString());
					else
						prescriptionMaster.setUnit("0");
				} else
					prescriptionMaster.setUnit("");

				if (row[5] != null)
					prescriptionMaster.setFrequency(row[5].toString());
				else
					prescriptionMaster.setFrequency("");

				if (row[6] != null)
					prescriptionMaster.setDays(row[6].toString());
				else
					prescriptionMaster.setDays("");

				if (row[7] != null)
					prescriptionMaster.setProductId(row[7].toString());
				else
					prescriptionMaster.setProductId("");

				if (row[8] != null)
					prescriptionMaster.setTreatmentId(row[8].toString());
				else
					prescriptionMaster.setTreatmentId("");

				if (row[9] != null)
					prescriptionMaster.setProductUnit(row[9].toString());
				else
					prescriptionMaster.setProductUnit("");

				if (row[10] != null)
					prescriptionMaster.setCompName(row[10].toString());
				else
					prescriptionMaster.setCompName("");

				if (row[11] != null)
					prescriptionMaster.setPackName(row[11].toString());
				else
					prescriptionMaster.setPackName("");

				if (row[12] != null)
					prescriptionMaster.setShelfName(row[12].toString());
				else
					prescriptionMaster.setShelfName("");

				if (row[13] != null)
					prescriptionMaster.setPatientSlaveipdopdId(row[13]
							.toString());
				else
					prescriptionMaster.setPatientSlaveipdopdId("");

				if (row[15] != null)
					prescriptionMaster.setCatId(row[15].toString());
				else
					prescriptionMaster.setCatId("");

				/*
				 * if (row[16] != null)
				 * prescriptionMaster.setPrescriptionId(row[16].toString()); else
				 * prescriptionMaster.setPrescriptionId("");
				 */

				PrescriptionMasters.add(prescriptionMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return PrescriptionMasters;
	}

	public List<PrescriptionMaster> getPrescriptionByEntireDB(Integer patientId) {
		List<PrescriptionMaster> PrescriptionMasters = new ArrayList<PrescriptionMaster>();
		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT     preM.preparation_name,    ps.name,    strength.strength_name,    ps.dose,    ps.qty,    ps.frequency,    ps.days,    ps.medicineID, t.treatment_id,    product.product_uom_unit,    comp.comp_name,    packing.pack_type,    shelf.shelf_name,    ps.prescription_id,    ps.patient_sale_rec_qty,    product.product_cat_id,    preM.preparation_id FROM    ehat_patient p        inner join    ehat_treatment t ON t.patient_id = p.patient_id        inner join    treatment_doctors td ON td.Treatment_ID = t.treatment_id        inner join    prescription ps ON td.ID = ps.treatment_doctor_Id        inner join    pharma_product_master product ON product.product_id = ps.medicineID        inner join    pharma_company_master comp ON comp.comp_id = product.product_comp_id        inner join    pharma_packing_master packing ON packing.pack_id = product.product_pack_id        inner join    pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id        inner join    pharma_preparation_master preM ON preM.preparation_id = ps.prep        inner join    pharma_strength_master strength ON strength.strength_id = product.product_strength_id where    ps.status = 'Y' and p.patient_id ="
				+ patientId
								+ " and t.treatment_id = (select            max(t2.treatment_id)        from            ehat_treatment t2        where            t2.patient_id = p.patient_id) order by ps.prescription_id desc");

		@SuppressWarnings("unchecked")
		List<Object[]> result = query1.list();

		try {
			for (Object[] row : result) {
				PrescriptionMaster prescriptionMaster = new PrescriptionMaster();

				if (row[0] != null)
					prescriptionMaster.setPreparationName(row[0].toString());
				else
					prescriptionMaster.setPreparationName(" ");

				if (row[1] != null)
					prescriptionMaster.setMedicinName((row[1].toString()));
				else
					prescriptionMaster.setMedicinName(" ");

				if (row[2] != null)
					prescriptionMaster.setStrengthName((row[2].toString()));
				else
					prescriptionMaster.setStrengthName(" ");

				if (row[3] != null)
					prescriptionMaster.setDoseType(row[3].toString());
				else
					prescriptionMaster.setDoseType(" ");

				if (row[4] != null) {
					Double recQty = Double.parseDouble(row[14].toString());
					Double qty = Double.parseDouble(row[4].toString());
					Double pendingQty = qty - recQty;
					if (pendingQty > 0)
						prescriptionMaster.setUnit(pendingQty.toString());
					else
						prescriptionMaster.setUnit("0");
				} else
					prescriptionMaster.setUnit("");

				if (row[5] != null)
					prescriptionMaster.setFrequency(row[5].toString());
				else
					prescriptionMaster.setFrequency("");

				if (row[6] != null)
					prescriptionMaster.setDays(row[6].toString());
				else
					prescriptionMaster.setDays("");

				if (row[7] != null)
					prescriptionMaster.setProductId(row[7].toString());
				else
					prescriptionMaster.setProductId("");

				if (row[8] != null)
					prescriptionMaster.setTreatmentId(row[8].toString());
				else
					prescriptionMaster.setTreatmentId("");

				if (row[9] != null)
					prescriptionMaster.setProductUnit(row[9].toString());
				else
					prescriptionMaster.setProductUnit("");

				if (row[10] != null)
					prescriptionMaster.setCompName(row[10].toString());
				else
					prescriptionMaster.setCompName("");

				if (row[11] != null)
					prescriptionMaster.setPackName(row[11].toString());
				else
					prescriptionMaster.setPackName("");

				if (row[12] != null)
					prescriptionMaster.setShelfName(row[12].toString());
				else
					prescriptionMaster.setShelfName("");

				if (row[13] != null)
					prescriptionMaster.setPatientSlaveipdopdId(row[13]
							.toString());
				else
					prescriptionMaster.setPatientSlaveipdopdId("");

				if (row[15] != null)
					prescriptionMaster.setCatId(row[15].toString());
				else
					prescriptionMaster.setCatId("");

				if (row[16] != null)
					prescriptionMaster.setPrescriptionId(row[16].toString());
				else
					prescriptionMaster.setPrescriptionId("");

				PrescriptionMasters.add(prescriptionMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		SQLQuery query2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT preM.preparation_name,oc.druges_doses,strength.strength_name,oc.doseType,oc.quantity,oc.frequency,oc.days,oc.invProdID,t.Treatment_ID,product.product_uom_unit,comp.comp_name,packing.pack_type, "
								+ " shelf.shelf_name,oc.idorder_comp_druges,oc.patient_sale_rec_qty,preM.preparation_id,product.product_cat_id FROM patient p inner join treatment t ON t.Patient_ID = p.Patient_ID inner join order_master o ON o.Treatment_ID = t.Treatment_ID inner join order_comp_druges oc ON oc.idorder_master = o.idorder_master inner join pharma_product_master product ON product.product_id = oc.invProdID "
								+ " inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id inner join pharma_packing_master packing ON packing.pack_id = product.product_pack_id inner join  pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_preparation_master preM ON preM.preparation_id = oc.prep  inner join pharma_strength_master strength on strength.strength_id=product.product_strength_id where "
								+ " oc.status = 'Y'  and p.Patient_ID ='"
								+ patientId
								+ "' and t.Treatment_ID = (select max(Treatment_ID) from treatment where Patient_ID = p.Patient_ID) order by oc.idorder_comp_druges DESC");

		@SuppressWarnings("unchecked")
		List<Object[]> result1 = query2.list();

		try {
			for (Object[] row : result1) {
				PrescriptionMaster prescriptionMaster = new PrescriptionMaster();

				if (row[0] != null)
					prescriptionMaster.setPreparationName(row[0].toString());
				else
					prescriptionMaster.setPreparationName(" ");

				if (row[1] != null)
					prescriptionMaster.setMedicinName((row[1].toString()));
				else
					prescriptionMaster.setMedicinName(" ");

				if (row[2] != null)
					prescriptionMaster.setStrengthName((row[2].toString()));
				else
					prescriptionMaster.setStrengthName(" ");

				if (row[3] != null)
					prescriptionMaster.setDoseType(row[3].toString());
				else
					prescriptionMaster.setDoseType(" ");

				if (row[4] != null) {
					Integer recQty = Integer.parseInt(row[14].toString());
					Integer qty = Integer.parseInt(row[4].toString());
					Integer pendingQty = qty - recQty;
					if (pendingQty > 0)
						prescriptionMaster.setUnit(pendingQty.toString());
					else
						prescriptionMaster.setUnit("0");
				} else
					prescriptionMaster.setUnit("");

				if (row[5] != null)
					prescriptionMaster.setFrequency(row[5].toString());
				else
					prescriptionMaster.setFrequency("");

				if (row[6] != null)
					prescriptionMaster.setDays(row[6].toString());
				else
					prescriptionMaster.setDays("");

				if (row[7] != null)
					prescriptionMaster.setProductId(row[7].toString());
				else
					prescriptionMaster.setProductId("");

				if (row[8] != null)
					prescriptionMaster.setTreatmentId(row[8].toString());
				else
					prescriptionMaster.setTreatmentId("");

				if (row[9] != null)
					prescriptionMaster.setProductUnit(row[9].toString());
				else
					prescriptionMaster.setProductUnit("");

				if (row[10] != null)
					prescriptionMaster.setCompName(row[10].toString());
				else
					prescriptionMaster.setCompName("");

				if (row[11] != null)
					prescriptionMaster.setPackName(row[11].toString());
				else
					prescriptionMaster.setPackName("");

				if (row[12] != null)
					prescriptionMaster.setShelfName(row[12].toString());
				else
					prescriptionMaster.setShelfName("");

				if (row[13] != null)
					prescriptionMaster.setPatientSlaveipdopdId(row[13]
							.toString());
				else
					prescriptionMaster.setPatientSlaveipdopdId("");

				/*
				 * if (row[14] != null)
				 * prescriptionMaster.setPatientSaleRecQty(row[14].toString());
				 * else prescriptionMaster.setPatientSaleRecQty("");
				 */

				if (row[15] != null)
					prescriptionMaster.setPrescriptionId(row[15].toString());
				else
					prescriptionMaster.setPrescriptionId("");

				if (row[16] != null)
					prescriptionMaster.setCatId(row[16].toString());
				else
					prescriptionMaster.setCatId("");

				PrescriptionMasters.add(prescriptionMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return PrescriptionMasters;
	}

	@Override
	public PatientSaleBillMaster getPatientSaleBillIdForView(Integer patientId) {

		Double total = 0.0;

		PatientSaleBillMaster patientSaleMaster = new PatientSaleBillMaster();

		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT     master.patient_sales_bill_id,    master.patient_sales_bill_doc_no,    master.patient_bill_date,  " +
						"  master.patient_bill_patient_id,    master.patient_doctor_name,    master.patient_sales_bill_less,    master.patient_sales_bill_gross_amt,   " +
						" master.patient_sales_bill_surcharge,    master.patient_sales_bill_net_amt,    p.f_name,    p.m_name,    p.l_name,    IFNULL(p.address, ''),    concat(IFNULL(c.city_name, ''),            ' ',     " +
						"       IFNULL(t1.taluka_name, ''),            ' ',            IFNULL(d.dis_name, ''),            ' ',            IFNULL(s.state_name, '')) as addr,    master.patient_sales_bill_narration, " +
						"   master.patient_sales_bill_amount_received,    master.patient_sales_bill_amount_balance,    master.patient_sale_previous_balance,    IFNULL(doc.address, ''),    master.patient_sale_type,    master.patient_bill_mode, " +
						"   master.patient_sales_bill_add,    master.patient_sales_bill_special_disc,    master.patient_sales_bill_cd,    master.patient_sales_bill_cd_amt,    master.patient_type,    master.patient_sales_bill_round,    master.patient_sale_bank_name,  " +
						"  master.patient_sale_cheque_num,    ifnull(cat.category_name, 'Self'),    master.patient_bill_doctor_id,    master.patient_sale_treatmentId,    master.bill_Category_id FROM    pharma_patient_sales_bill_master master        inner join  " +
						"  ehat_patient p ON p.patient_id = master.patient_bill_patient_id        inner join    doctor doc ON master.patient_bill_doctor_id = doc.Doctor_ID        left join    ehat_charges_master_slave cat ON cat.id = master.bill_Category_id        LEFT JOIN  " +
						"  city c ON p.town_id = c.idcity        LEFT JOIN    taluka t1 ON p.taluka_id = t1.idtaluka        LEFT JOIN    district d ON d.iddistrict = p.district_id        LEFT JOIN    state s ON s.idstate = p.state_id where    master.patient_sales_bill_id = "
						+ patientId
						);

		@SuppressWarnings("unchecked")
		List<Object[]> result = query1.list();
		if(query1.list().size()>0)
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					patientSaleMaster.setPatientSalesBillId(Integer
							.parseInt(row[0].toString()));

				patientSaleMaster.setPatientSalesBillDocNo(row[1].toString());

				if (row[2] != null) {
					String str[] = row[2].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[2] + "/" + date[1] + "/" + date[0]);

					patientSaleMaster.setPatientBillMode(stringBuffer
							.toString());
				}
				if (row[3] != null)
					patientSaleMaster.setPatientId(Integer.parseInt(row[3]
							.toString()));
				else
					patientSaleMaster.setPatientId(0);

				if (row[4] != null)
					patientSaleMaster.setDoctorName(row[4].toString());
				else
					patientSaleMaster.setDoctorName("");

				if (row[5] != null)
					patientSaleMaster
							.setPatientSalesBillLess(row[5].toString());
				else
					patientSaleMaster.setPatientSalesBillLess("");

				if (row[6] != null)
					patientSaleMaster.setPatientSalesBillGrossAmt(Double
							.parseDouble(row[6].toString()));
				else
					patientSaleMaster.setPatientSalesBillGrossAmt(0.0);

				if (row[7] != null)
					patientSaleMaster.setPatientSalesBillSurcharge(row[7]
							.toString());
				else
					patientSaleMaster.setPatientSalesBillSurcharge("");

				if (row[8] != null)
					patientSaleMaster.setPatientSalesBillNetAmt(Double
							.parseDouble(row[8].toString()));
				else
					patientSaleMaster.setPatientSalesBillNetAmt(0.0);

				if (row[9] != null)
					patientSaleMaster.setPatientSalesBillPrescription(row[9]
							.toString()
							+ " "
							+ row[10].toString()
							+ " "
							+ (row[11].toString()));
				else
					patientSaleMaster.setPatientSalesBillPrescription((""));

				if (row[12] != null) {
					patientSaleMaster.setPatientSalesBillEntryBy(row[12]
							.toString() + " " + row[13].toString());
				} else
					patientSaleMaster.setPatientSalesBillEntryBy((""));

				if (row[14] != null) {
					patientSaleMaster.setPatientSalesBillNarration(row[14]
							.toString());

				} else
					patientSaleMaster.setPatientSalesBillNarration("");

				if (row[15] != null)
					patientSaleMaster.setPatientSalesBillAmountReceived(Double
							.parseDouble(row[15].toString()));
				else
					patientSaleMaster.setPatientSalesBillAmountReceived(0.0);

				if (row[16] != null)
					patientSaleMaster.setPatientSalesBillAmountBalance(Double
							.parseDouble(row[16].toString()));
				else
					patientSaleMaster.setPatientSalesBillAmountBalance(0.0);

				if (row[17] != null)
					patientSaleMaster.setPatientSalePreviousBalance(Double
							.parseDouble(row[17].toString()));
				else
					patientSaleMaster.setPatientSalePreviousBalance(0.0);

				if (row[18] != null)
					patientSaleMaster.setPatientSalesBillRound(row[18]
							.toString());
				else
					patientSaleMaster.setPatientSalesBillRound((""));

				if (row[19] != null)
					patientSaleMaster.setPatientSaleType(row[19].toString());
				else
					patientSaleMaster.setPatientSaleType((""));

				if (row[20] != null) {
					patientSaleMaster.setPatientSaleForTime(row[20].toString());
				} else
					patientSaleMaster.setPatientSaleForTime((""));

				if (row[21] != null)
					patientSaleMaster
							.setPatientSalesBillAdd(row[21].toString());
				else
					patientSaleMaster.setPatientSalesBillAdd((""));

				if (row[22] != null)
					patientSaleMaster.setPatientSalesBillSpecialDisc(row[22]
							.toString());
				else
					patientSaleMaster.setPatientSalesBillSpecialDisc((""));

				if (row[23] != null)
					patientSaleMaster.setPatientSalesBillCN(Double
							.parseDouble(row[23].toString()));
				else
					patientSaleMaster.setPatientSalesBillCN(0.0);

				if (row[24] != null)
					patientSaleMaster.setPatientSalesBillCdAmt(Double
							.parseDouble(row[24].toString()));
				else
					patientSaleMaster.setPatientSalesBillCdAmt(0.0);

				if (row[25] != null) {
					patientSaleMaster
							.setPatientSalesBillCD((row[25].toString()));
				}

				if (row[26] != null) {
					patientSaleMaster
							.setPatientSaleStatus((row[26].toString()));
				}

				if (row[27] != null) {
					patientSaleMaster.setPatientSaleBankName((row[27]
							.toString()));
				}

				if (row[28] != null) {
					patientSaleMaster.setPatientSaleChequeNum((row[28]
							.toString()));
				}

				if (row[29] != null) {
					patientSaleMaster.setPatientSaleCategoryName((row[29]
							.toString()));
				}

				if (row[30] != null) {
					patientSaleMaster.setDoctorId(Integer.parseInt(row[30]
							.toString()));
				}

				if (row[31] != null) {
					patientSaleMaster.setPatientSaleTreatmentId(Integer
							.parseInt(row[31].toString()));
				}

				if (row[32] != null) {
					patientSaleMaster.setPatientSaleBillCatId(Integer
							.parseInt(row[32].toString()));
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		{/*
			SQLQuery query2 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" SELECT c.city_name,p.postalCode,t1.taluka_name, d.dis_name, s.state_name FROM pharma_patient_sales_bill_master master inner join patient p ON p.Patient_ID = master.patient_bill_patient_id "
									+ " inner join city c ON p.addressLine3 = c.idcity inner join taluka t1 ON p.addressLine7 = t1.idtaluka inner join district d ON d.iddistrict = p.addressLine4 inner join state s ON s.idstate = p.addressLine5 "
									+ " where master.patient_sales_bill_id="
									+ patientId);
			Object[] rows = (Object[]) query2.uniqueResult();
			
			if(query2.list().size()>0)
			try {
			if (rows[0] != null) {
				patientSaleMaster.setPatientSalesBillEntryBy(address + " "
						+ rows[0].toString());
			} else {
				patientSaleMaster.setPatientSalesBillEntryBy("");
			}

			if (rows[1] != null) {
				patientSaleMaster.setPatientSalesBillEntryBy(address + " "
						+ rows[0].toString() + " " + rows[1].toString());
			} else {
				patientSaleMaster.setPatientSalesBillEntryBy("");
			}

			if (rows[2] != null) {
				patientSaleMaster.setPatientSalesBillEntryBy(address + " "
						+ rows[0].toString() + " " + rows[1].toString() + " "
						+ rows[2].toString());
			} else {
				patientSaleMaster.setPatientSalesBillEntryBy("");
			}
			if (rows[3] != null) {
				patientSaleMaster.setPatientSalesBillEntryBy(address + " "
						+ rows[0].toString() + " " + rows[1].toString() + " "
						+ rows[2].toString() + " " + rows[3].toString());
			} else {
				patientSaleMaster.setPatientSalesBillEntryBy("");
			}

			if (rows[4] != null) {
				patientSaleMaster.setPatientSalesBillEntryBy(address + " "
						+ rows[0].toString() + " " + rows[1].toString() + " "
						+ rows[2].toString() + " " + rows[3].toString() + " "
						+ rows[4].toString());
			} else {
				patientSaleMaster.setPatientSalesBillEntryBy("");
			}

		} catch (Exception e) {
			e.printStackTrace();

		}
	*/}
		List<PatientSaleBillSlave> patientSaleSlaves = new ArrayList<PatientSaleBillSlave>();
		{
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							" select patient_slave_qty,patient_slave_mrp,patient_slave_Rate,patient_slave_amt,patient_slave_batch_code,patient_slave_batch_expiry, "
									+ " product.product_name,p_slave.patient_slave_vat,p_slave.patient_slave_vatAmt,product.product_uom_unit,packing.pack_type,company.comp_name,patient_slave_disc, "
									+ " rate.pur_rate,stock.stock_qty_in_hand,p_slave.patient_slave_BatchId,product.product_id,p_slave.patient_slave_prescription_id,stock.stock_id,p_slave.patient_sale_slave_issue_qty,p_slave.patient_slave_purchase_rate,p_slave.patient_sale_slave_disc_amt,p_slave.patient_slave_id,p_slave.patient_slave_ratePerUnit, pre.preparation_name  from pharma_patient_sales_bill_master master inner join pharma_patient_sales_bill_slave p_slave ON p_slave.patient_slave_bill_master_id = master.patient_sales_bill_id "
									+ " inner join pharma_product_master product ON product.product_id = p_slave.patient_slave_product_id inner join  pharma_packing_master packing ON product.product_pack_id = packing.pack_id "
									+ " inner join pharma_company_master company ON product.product_comp_id = company.comp_id inner join  pharma_preparation_master pre ON pre.preparation_id = product.product_preparation_id inner join pharma_purchase_rate rate on p_slave.patient_slave_BatchId=rate.batch_id  inner join pharma_stock_master stock on stock.stock_batch_id=p_slave.patient_slave_BatchId "
									+ " where master.patient_sales_bill_id="
									+ patientId
									+ " order by p_slave.patient_slave_id asc ");
			
			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			if(query.list().size()>0)
			try {
			for (Object[] row : rows) {
				PatientSaleBillSlave patientSaleBillSlave = new PatientSaleBillSlave();

				if (row[0] != null) {
					String result1[] = row[0].toString().split("\\.");

					patientSaleBillSlave.setPatientSlaveQty(Integer
							.parseInt(result1[0]));
				}

				if (row[1] != null)
					patientSaleBillSlave.setPatientSlaveMrp(Double
							.parseDouble(row[1].toString()));
				else
					patientSaleBillSlave.setPatientSlaveMrp(0.0);

				if (row[2] != null)
					patientSaleBillSlave.setPatientSlaveRate(Double
							.parseDouble(row[2].toString()));
				else
					patientSaleBillSlave.setPatientSlaveRate(0.0);

				if (row[3] != null)
					patientSaleBillSlave.setPatientSlaveAmt(Double
							.parseDouble(row[3].toString()));
				else
					patientSaleBillSlave.setPatientSlaveAmt(0.0);

				if (row[4] != null)
					patientSaleBillSlave.setPatientSlaveBatchCode(row[4]
							.toString());
				else
					patientSaleBillSlave.setPatientSlaveBatchCode("");

				if (row[5] != null)
					patientSaleBillSlave.setPatientSaleBatchExpiry(row[5]
							.toString());
				else
					patientSaleBillSlave.setPatientSaleBatchExpiry("");

				ProductMaster productMaster = new ProductMaster();
				List<BatchMaster> ltbatchMaster = new ArrayList<BatchMaster>();

				if (row[6] != null) {
					productMaster.setProductName(row[6].toString());
				} else {
					productMaster.setProductName("");
				}

				if (row[7] != null)
					patientSaleBillSlave.setPatientSlaveVat(Double
							.parseDouble(row[7].toString()));
				else
					patientSaleBillSlave.setPatientSlaveVat(0.0);

				if (row[8] != null)
					patientSaleBillSlave.setPatientSlaveVatAmt(Double
							.parseDouble(row[8].toString()));
				else
					patientSaleBillSlave.setPatientSlaveVat(0.0);

				if (row[9] != null)
					productMaster.setProductUnit(Double.parseDouble(row[9]
							.toString()));
				else
					productMaster.setProductUnit(0.0);

				PackingMaster packingMaster = new PackingMaster();
				if (row[10] != null) {
					packingMaster.setPackType(row[10].toString());
					productMaster.setPackingMaster(packingMaster);
				} else
					packingMaster.setPackType(row[10].toString());

				CompanyMaster companyMaster = new CompanyMaster();
				if (row[11] != null) {
					companyMaster.setCompName(row[11].toString());
					productMaster.setCompanyMaster(companyMaster);
				} else
					companyMaster.setCompName(row[11].toString());

				if (row[12] != null)
					patientSaleBillSlave.setPatientSlaveDisc(Double
							.parseDouble(row[12].toString()));
				else
					patientSaleBillSlave.setPatientSlaveDisc(0.0);

				if (row[13] != null) {
					Double purRate = ((Double.parseDouble(row[13].toString()))
							/ (Double.parseDouble(row[9].toString())) * (Double
							.parseDouble(row[0].toString())));
					total = total + purRate;
				}
				StockMaster stockMaster = new StockMaster();
				if (row[14] != null)
					stockMaster.setStockQtyInHand(Double.parseDouble(row[14]
							.toString()));
				else
					stockMaster.setStockQtyInHand(Double.parseDouble(row[14]
							.toString()));

				BatchMaster batchMaster = new BatchMaster();
				if (row[15] != null) {
					batchMaster
							.setBatchId(Integer.parseInt(row[15].toString()));
				} else {
					batchMaster.setBatchId(0);
				}

				if (row[16] != null) {
					productMaster.setProductId(Integer.parseInt(row[16]
							.toString()));
				} else {
					productMaster.setProductId(0);
				}

				if (row[17] != null) {
					patientSaleBillSlave.setPatientSlavePrescriptionId(Integer
							.parseInt(row[17].toString()));
				} else {
					patientSaleBillSlave.setPatientSlavePrescriptionId(Integer
							.parseInt(""));
				}

				if (row[18] != null) {
					stockMaster
							.setStockId(Integer.parseInt(row[18].toString()));
				} else {
					stockMaster.setStockId(0);
				}

				if (row[19] != null) {
					patientSaleBillSlave.setPatientSaleSlaveIssueQty(Double
							.parseDouble(row[19].toString()));
				} else {
					patientSaleBillSlave.setPatientSaleSlaveIssueQty(0.0);
				}

				if (row[20] != null) {
					patientSaleBillSlave.setPatientSlavePurchaseRate(Double
							.parseDouble(row[20].toString()));
				} else
					patientSaleBillSlave.setPatientSlavePurchaseRate(Double
							.parseDouble(row[20].toString()));

				if (row[21] != null) {
					Double discAmt = Double.parseDouble(row[21].toString());
					Double Qty = Double.parseDouble(row[0].toString());
					Double total1 = discAmt * Qty;
					patientSaleBillSlave.setPatientSaleSlaveDiscAmt(total1);
				} else
					patientSaleBillSlave.setPatientSaleSlaveDiscAmt(0.0);

				if (row[22] != null) {
					patientSaleBillSlave.setPatientSlaveId(Integer
							.parseInt(row[22].toString()));
				} else
					patientSaleBillSlave
							.setPatientSlaveId(0);

				if (row[23] != null) {
					patientSaleBillSlave.setPatientSlaveRatePerUnit(Double
							.parseDouble(row[23].toString()));
				} else
					patientSaleBillSlave.setPatientSlaveRatePerUnit(0.0);
				
				PreparationMaster preparationMaster=new PreparationMaster();
				if (row[24] != null) {
					preparationMaster.setPreparationName(row[24].toString());
				} else
					preparationMaster.setPreparationName("");
				
				productMaster.setPreparationMaster(preparationMaster);

				batchMaster.setStockMaster(stockMaster);
				ltbatchMaster.add(batchMaster);
				productMaster.setBatchMaster(ltbatchMaster);
				patientSaleBillSlave.setProductMaster(productMaster);

				patientSaleSlaves.add(patientSaleBillSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		DecimalFormat df = new DecimalFormat("###.###");
		patientSaleMaster.setPatientSalesBillCnAmt(Double.parseDouble(df
				.format(total)));
		}
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT s.sp_dic_master_id, s.name FROM pharma_patient_sales_bill_master master inner join "
								+ " sp_dic_master s ON s.sp_dic_master_id = master.patient_bill_sponser_id where master.patient_bill_sponser_id!= 0 "
								+ " and master.patient_sales_bill_id ="
								+ patientId);

		Object[] result1 = (Object[]) query.uniqueResult();
		try {
			if (result1 != null) {
				/*if (result1[0] != null)
					patientSaleMaster.setPatientId(Integer.parseInt(result1[0]
							.toString()));
				else
					patientSaleMaster.setPatientId(Integer.parseInt(" "));*/

				if (result1[1] != null)
					patientSaleMaster.setPatientType(result1[1].toString());
				else
					patientSaleMaster.setPatientType(" ");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		patientSaleMaster.setLtPatientSaleBill(patientSaleSlaves);

		return patientSaleMaster;

	}

	@Override
	public List<PatientSaleBillMaster> getPatientBillId(Integer patientId) {
		

		List<PatientSaleBillMaster> ltPatientSaleBillMasters = new ArrayList<PatientSaleBillMaster>();

		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT p.f_name,    p.m_name,    p.l_name,master.patient_doctor_name,master.patient_bill_date,master.patient_sales_bill_net_amt, "
								+ " master.patient_sales_bill_id,master.patient_bill_patient_id,master.patient_sale_previous_balance,master.patient_bill_mode,master.patient_sale_treatmentId FROM pharma_patient_sales_bill_master master inner join "
								+ "  ehat_patient p ON master.patient_bill_patient_id = p.patient_id where master.patient_sales_bill_delete_flag = '0' "
								+ " and master.patient_bill_patient_id ="
								+ patientId);

		@SuppressWarnings("unchecked")
		List<Object[]> result = query.list();

		try {
			for (Object[] row : result) {
				PatientSaleBillMaster patientSaleMaster = new PatientSaleBillMaster();

				if (row[0] != null)
					patientSaleMaster.setPatientSalesBillPrescription((row[0]
							.toString())
							+ " "
							+ (row[1].toString())
							+ " "
							+ (row[2].toString()));

				if (row[3] != null)
					patientSaleMaster
							.setPatientSalesBillAdd((row[3].toString()));
				else
					patientSaleMaster.setPatientSalesBillAdd(" ");

				if (row[4] != null) {
					String str[] = row[4].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[2] + "/" + date[1] + "/" + date[0]);
					patientSaleMaster.setPatientBillMode(stringBuffer
							.toString());
				}

				if (row[5] != null)
					patientSaleMaster.setPatientSalesBillNarration(row[5]
							.toString());
				else
					patientSaleMaster.setPatientSalesBillNarration("");

				if (row[6] != null) {
					patientSaleMaster.setPatientSalesBillCD("PS"
							+ row[6].toString());
					patientSaleMaster.setPatientSalesBillId(Integer
							.parseInt(row[6].toString()));
				}

				if (row[7] != null)
					patientSaleMaster.setPatientId(Integer.parseInt(row[7]
							.toString()));

				if (row[8] != null)
					patientSaleMaster.setPatientSalePreviousBalance(Double
							.parseDouble(row[8].toString()));

				if (row[9] != null)
					patientSaleMaster.setPatientSalesBillDocNo(row[9]
							.toString());

				if (row[10] != null)
					patientSaleMaster.setPatientSaleTreatmentId(Integer
							.parseInt(row[10].toString()));
				
				ltPatientSaleBillMasters.add(patientSaleMaster);
			}

		} catch (Exception e) {

		}
		return ltPatientSaleBillMasters;

	}

	@Override
	public List<PatientSaleBillMaster> searchPatientSaleByInvoiceId(
			Integer invoiceId) {

		List<PatientSaleBillMaster> ltPatientSaleBillMasters = new ArrayList<PatientSaleBillMaster>();

		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT p.f_name,    p.m_name,    p.l_name,master.patient_doctor_name,master.patient_bill_date,master.patient_sales_bill_net_amt, "
								+ " master.patient_sales_bill_id,master.patient_bill_patient_id,master.patient_sale_previous_balance,master.patient_bill_mode,master.patient_sale_treatmentId FROM pharma_patient_sales_bill_master master inner join "
								+ "  ehat_patient p ON master.patient_bill_patient_id = p.patient_id where master.patient_sales_bill_delete_flag = '0' "
								+ " and master.patient_sales_bill_id ="
								+ invoiceId);

		@SuppressWarnings("unchecked")
		List<Object[]> result = query.list();

		try {
			for (Object[] row : result) {
				PatientSaleBillMaster patientSaleMaster = new PatientSaleBillMaster();

				if (row[0] != null)
					patientSaleMaster.setPatientSalesBillPrescription((row[0]
							.toString())
							+ " "
							+ (row[1].toString())
							+ " "
							+ (row[2].toString()));

				if (row[3] != null)
					patientSaleMaster
							.setPatientSalesBillAdd((row[3].toString()));
				else
					patientSaleMaster.setPatientSalesBillAdd(" ");

				if (row[4] != null) {
					String str[] = row[4].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[2] + "/" + date[1] + "/" + date[0]);
					patientSaleMaster.setPatientBillMode(stringBuffer
							.toString());
				}
			
				if (row[5] != null)
					patientSaleMaster.setPatientSalesBillNarration(row[5]
							.toString());
				else
					patientSaleMaster.setPatientSalesBillNarration("");

				if (row[6] != null) {
					patientSaleMaster.setPatientSalesBillCD("PS"
							+ row[6].toString());
					patientSaleMaster.setPatientSalesBillId(Integer
							.parseInt(row[6].toString()));
				}

				if (row[7] != null)
					patientSaleMaster.setPatientId(Integer.parseInt(row[7]
							.toString()));

				if (row[8] != null)
					patientSaleMaster.setPatientSalePreviousBalance(Double
							.parseDouble(row[8].toString()));
				
				if (row[9] != null)
					patientSaleMaster.setPatientSalesBillDocNo(row[9]
							.toString());

				if (row[10] != null)
					patientSaleMaster.setPatientSaleTreatmentId(Integer
							.parseInt(row[10].toString()));

				ltPatientSaleBillMasters.add(patientSaleMaster);
			}

		} catch (Exception e) {

		}
		return ltPatientSaleBillMasters;

	}

	@Override
	public Boolean deletePatientSaleBill(Integer patientId) {

		try {
			org.hibernate.Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_patient_sales_bill_master set  patient_sales_bill_delete_flag=1 where patient_sales_bill_id="
									+ patientId);
			query.executeUpdate();
			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public ProductMaster getProductDetails(Integer productId) {

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				ProductMaster.class);
		criteria.add(Restrictions.eq("productId", productId));

		return (ProductMaster) criteria.uniqueResult();

	}

	@Override
	public DoctorDetails getDoctorDetailsByPatientId(Integer patientId,
			String type) {

		if (type.equals("ipd")) {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT     p.f_name,    p.m_name,    p.l_name,    IFNULL(p.address, ''), IFNULL(c.city_name, ''), IFNULL(t1.taluka_name, ''),       IFNULL(d.dis_name, ''),    IFNULL(s.state_name, ''),    doc.Doctor_ID,    doc.doc_name,    doc.address FROM    ehat_treatment t        inner join    ehat_patient p ON p.patient_id = t.patient_id        inner join    doctor doc ON doc.doctor_id = t.doctor_id   inner join    dept_master dept ON dept.dept_id = t.department_id     LEFT JOIN    city c ON p.town_id = c.idcity        LEFT JOIN    taluka t1 ON p.taluka_id = t1.idtaluka        LEFT JOIN    district d ON d.iddistrict = p.district_id        LEFT JOIN    state s ON s.idstate = p.state_id where    t.t_flag = 'Y' and p.patient_id = '"
									+ patientId + "' and and dept.dept_name ='ipd' limit 1");

			DoctorDetails doctordetails = new DoctorDetails();
			Object[] result = (Object[]) query.uniqueResult();
			if(result.length>0)
			try {

				if (result[0] != null)
					doctordetails.setPatientName(result[0].toString() + ""
							+ result[1].toString() + "" + result[2].toString());

				if (result[3] != null)
					doctordetails.setPatientAddress(result[3].toString() + " "
							+ result[4].toString() + " " + result[5].toString()
							+ " " + result[6].toString() + " "
							+ result[7].toString());

				if (result[8] != null)
					doctordetails.setDoctorId(result[8].toString());

				if (result[9] != null)
					doctordetails.setDoctorName(result[9].toString());

				if (result[10] != null)
					doctordetails.setDoctorAddress(result[10].toString());

			} catch (Exception e) {
				e.printStackTrace();
			}

			return doctordetails;
		} else if (type.equals("opd")) {

			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" SELECT     p.f_name,    p.m_name,    p.l_name,    IFNULL(p.address, ''), IFNULL(c.city_name, ''), IFNULL(t1.taluka_name, ''),       IFNULL(d.dis_name, ''),    IFNULL(s.state_name, ''),    doc.Doctor_ID,    doc.doc_name,    doc.address FROM    ehat_treatment t        inner join    ehat_patient p ON p.patient_id = t.patient_id        inner join    doctor doc ON doc.doctor_id = t.doctor_id   inner join    dept_master dept ON dept.dept_id = t.department_id     LEFT JOIN    city c ON p.town_id = c.idcity        LEFT JOIN    taluka t1 ON p.taluka_id = t1.idtaluka        LEFT JOIN    district d ON d.iddistrict = p.district_id        LEFT JOIN    state s ON s.idstate = p.state_id where    t.t_flag = 'Y' and p.patient_id = '"
									+ patientId + "' and dept.dept_name ='opd' limit 1");

			DoctorDetails doctordetails = new DoctorDetails();
			Object[] result = (Object[]) query.uniqueResult();
			if(result!=null)
			try {
				if (result[0] != null)
					doctordetails.setPatientName(result[0].toString() + ""
							+ result[1].toString() + "" + result[2].toString());

				if (result[3] != null)
					doctordetails.setPatientAddress(result[3].toString() + " "
							+ result[4].toString() + " " + result[5].toString()
							+ " " + result[6].toString() + " "
							+ result[7].toString());

				if (result[8] != null)
					doctordetails.setDoctorId(result[8].toString());

				if (result[9] != null)
					doctordetails.setDoctorName(result[9].toString());

				if (result[10] != null)
					doctordetails.setDoctorAddress(result[10].toString());

			} catch (Exception e) {
				e.printStackTrace();
			}

			return doctordetails;

		} else {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT     p.f_name,    p.m_name,    p.l_name,    IFNULL(p.address, ''), IFNULL(c.city_name, ''), IFNULL(t1.taluka_name, ''),       IFNULL(d.dis_name, ''),    IFNULL(s.state_name, ''),    doc.Doctor_ID,    doc.doc_name,    doc.address FROM    ehat_treatment t        inner join    ehat_patient p ON p.patient_id = t.patient_id        inner join    doctor doc ON doc.doctor_id = t.doctor_id        LEFT JOIN    city c ON p.town_id = c.idcity        LEFT JOIN    taluka t1 ON p.taluka_id = t1.idtaluka        LEFT JOIN    district d ON d.iddistrict = p.district_id        LEFT JOIN    state s ON s.idstate = p.state_id where    t.t_flag = 'Y' and p.patient_id = '"
									+ patientId + "' limit 1");

			DoctorDetails doctordetails = new DoctorDetails();
			Object[] result = (Object[]) query.uniqueResult();
			if(query.list().size()>0)
			try {
				if (result[0] != null)
					doctordetails.setPatientName(result[0].toString() + ""
							+ result[1].toString() + "" + result[2].toString());

				if (result[3] != null)
					doctordetails.setPatientAddress(result[3].toString() + " "
							+ result[4].toString() + " " + result[5].toString()
							+ " " + result[6].toString() + " "
							+ result[7].toString());

				if (result[8] != null)
					doctordetails.setDoctorId(result[8].toString());

				if (result[9] != null)
					doctordetails.setDoctorName(result[9].toString());

				if (result[10] != null)
					doctordetails.setDoctorAddress(result[10].toString());

			} catch (Exception e) {
				e.printStackTrace();
			}

			/*SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" select p.fName,p.mName,p.lName,p.addressLine1,p.addressLine2,p.addressLine3,p.addressLine4,p.addressLine5,d.Doctor_ID,d.doc_name,d.address "
									+ " from patient p,treatment t,patient_opd po,doctor d where p.Patient_ID = t.Patient_ID and d.Doctor_ID=po.doctor_id and t.Treatment_ID = (select "
									+ " max(Treatment_ID) from treatment where Patient_ID = p.Patient_ID) and t.Treatment_ID = po.Treatment_ID "
									+ " and t.referedTo = 'opd' and p.status = 'Y' and t.TFlag = 'ACTIVE' and p.Patient_ID ="
									+ patientId);
		if(query1.list().size()>0){
			Object[] result1 = (Object[]) query1.uniqueResult();
			try {

				if (result1[0] != null)
					doctordetails.setPatientName(result1[0].toString() + ""
							+ result1[1].toString() + ""
							+ result1[2].toString());

				if (result1[3] != null)
					doctordetails.setPatientAddress(result1[3].toString() + " "
							+ result1[4].toString() + " "
							+ result1[5].toString() + " "
							+ result1[6].toString() + " "
							+ result1[7].toString());

				if (result1[8] != null)
					doctordetails.setDoctorId(result1[8].toString());

				if (result1[9] != null)
					doctordetails.setDoctorName(result1[9].toString());

				if (result1[10] != null)
					doctordetails.setDoctorAddress(result1[10].toString());

			} catch (Exception e) {
				e.printStackTrace();
			}
		}*/
			
			return doctordetails;
		}

	}

	@Override
	public PatientDetails getPatientDetailsDetails(Integer patientId,
			String type) {

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT     p.patient_id,    CONCAT(IFNULL(p.address, ''),            ' ',            IFNULL(c.city_name, ''),            ' ',            IFNULL(t1.taluka_name, ''),            ' ',            IFNULL(d.dis_name, ''),            ' ',            IFNULL(s.state_name, '')) AS addr,    CONCAT(p.f_name, ' ', p.m_name, ' ', p.l_name) AS pName FROM    ehat_patient p        LEFT JOIN    city c ON p.town_id = c.idcity        LEFT JOIN    taluka t1 ON p.taluka_id = t1.idtaluka        LEFT JOIN    district d ON d.iddistrict = p.district_id        LEFT JOIN    state s ON s.idstate = p.state_id WHERE    p.patient_id =" + patientId);

		PatientDetails doctordetails = new PatientDetails();
		Object[] result = (Object[]) query.uniqueResult();
		try {
		
				doctordetails.setPatientId(result[0].toString());
				doctordetails.setPatientAdd(result[1]+"");
				doctordetails.setPatientName(result[2]+"");

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return doctordetails;
	}

	@Override
	public PatientDetails getPatientTreatmentDetails(Integer patientId,
			String type) {

		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" select patient_id,max(treatment_id) from ehat_treatment where patient_id ="+patientId);

		PatientDetails tretmentDetails = new PatientDetails();
		Object[] result1 = (Object[]) query1.uniqueResult();
		try {
			if (result1[0] != null)
				tretmentDetails.setPatientId(patientId+"");

			if (result1[1] != null) {
				tretmentDetails.setTreatmentId(result1[1].toString());

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return tretmentDetails;
	}

	@Override
	public DoctorDetails getSponserDetailsDetails(Integer patientId) {

		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT     s.charges_master_slave_id, ifnull(c.category_name, 'Self'),c.discount FROM    ehat_patient p        inner join    ehat_bill_master s ON s.patient_id = p.patient_id        left join    ehat_charges_master_slave c ON c.id = s.charges_master_slave_id where    p.patient_id = "
								+ patientId+" order by s.bill_id desc limit 1");

		DoctorDetails doctordetails = new DoctorDetails();
		Object[] result = (Object[]) query.uniqueResult();
		try {

			if (result != null) {
				if (result[0] != null)
					doctordetails.setSponsorId(result[0].toString());
				else
					doctordetails.setSponsorId("");

				if (result[1] != null)
					doctordetails.setSponsorName(result[1].toString());
				else
					doctordetails.setSponsorName("");
				
				if (result[2] != null)
					doctordetails.setDoctorId(result[2].toString());
				else
					doctordetails.setDoctorId("");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return doctordetails;

	}


	@Override
	public PatientSaleBillMaster getPatientSalesBillById(Integer patientSaleId) {
		
		PatientSaleBillMaster patientSaleMaster = new PatientSaleBillMaster();
		
		Double totalDisc = 0.0;

		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT  master.patient_sales_bill_id,master.patient_sales_bill_doc_no,master.patient_bill_date,master.patient_bill_patient_id, "
								+ " master.patient_doctor_name,master.patient_sales_bill_less,master.patient_sales_bill_gross_amt,master.patient_sales_bill_surcharge,master.patient_sales_bill_net_amt, "
								+ "  p.f_name,    p.m_name,    p.l_name,p.address,p.address as a,master.patient_bill_mode,master.patient_tax_vat0,master.patient_tax_vat5,master.patient_tax_vat12,master.patient_sales_bill_amount_received,master.patient_tax_vat55,master.patient_sale_previous_balance,master.patient_sale_bank_name,master.patient_sale_cheque_num,master.patient_tax_vat6,master.patient_tax_vat135,ifnull(c.category_name, 'Self'),p.mobile, master.patient_sale_for_time ,p.prefix "
								+ " FROM pharma_patient_sales_bill_master master inner join "
								+ "  ehat_patient p ON p.patient_id = master.patient_bill_patient_id Inner join   ehat_bill_master s ON s.patient_id = p.patient_id        left join    ehat_charges_master_slave c ON c.id = s.charges_master_slave_id  where master.patient_sales_bill_id="
								+ patientSaleId);

		String address = "";
		@SuppressWarnings("unchecked")
		List<Object[]> result = query1.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					patientSaleMaster.setPatientSalesBillId(Integer
							.parseInt(row[0].toString()));

				patientSaleMaster.setPatientSalesBillDocNo(row[1].toString());

				if (row[2] != null) {
					String str[] = row[2].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[2] + "/" + date[1] + "/" + date[0]);

					patientSaleMaster.setPatientBillMode(stringBuffer
							.toString());
				}

				if (row[3] != null)
					patientSaleMaster.setPatientId(Integer.parseInt(row[3]
							.toString()));
				else
					patientSaleMaster.setPatientId(0);

				if (row[4] != null)
					patientSaleMaster.setDoctorName(row[4].toString());
				else
					patientSaleMaster.setDoctorName("");

				if (row[5] != null)
					patientSaleMaster
							.setPatientSalesBillLess(row[5].toString());
				else
					patientSaleMaster.setPatientSalesBillLess("");

				if (row[6] != null)
					patientSaleMaster.setPatientSalesBillGrossAmt(Double
							.parseDouble(row[6].toString()));
				else
					patientSaleMaster.setPatientSalesBillGrossAmt(0.0);

				if (row[7] != null)
					patientSaleMaster.setPatientSalesBillSurcharge(row[7]
							.toString());
				else
					patientSaleMaster.setPatientSalesBillSurcharge("");

				if (row[8] != null)
					patientSaleMaster.setPatientSalesBillNetAmt(Double
							.parseDouble(row[8].toString()));
				else
					patientSaleMaster.setPatientSalesBillNetAmt(0.0);

				if (row[9] != null)
					patientSaleMaster.setPatientSalesBillPrescription(row[28].toString() +". " +
							row[9]
							.toString()
							+ " "
							+ row[10].toString()
							+ " "
							+ (row[11].toString()));
				else
					patientSaleMaster.setPatientSalesBillPrescription((""));

				if (row[12] != null) {
					patientSaleMaster.setPatientSalesBillEntryBy(row[12]
							.toString() + " " + row[13].toString());
					address = row[12].toString() + " " + row[13].toString();
				} else
					patientSaleMaster.setPatientSalesBillEntryBy((""));

				if (row[14] != null) {
					if (row[14].toString().equals("0"))
						patientSaleMaster.setPatientSalesBillNarration("cash");
					else if (row[14].toString().equals("1"))
						patientSaleMaster
								.setPatientSalesBillNarration("Credit");

					else if (row[14].toString().equals("2"))
						patientSaleMaster
								.setPatientSalesBillNarration("Cheque");
					else if (row[14].toString().equals("3"))
						patientSaleMaster.setPatientSalesBillNarration("Card");
					else
						patientSaleMaster.setPatientSalesBillNarration("Paytm");

				} else
					patientSaleMaster.setPatientSalesBillNarration("");

				if (row[16] != null)
					patientSaleMaster.setPatientTaxVat5(Double
							.parseDouble(row[16].toString()));

				else
					patientSaleMaster.setPatientTaxVat5(0.0);

				if (row[17] != null)
					patientSaleMaster.setPatientTaxVat12(Double
							.parseDouble(row[17].toString()));
				else
					patientSaleMaster
							.setPatientTaxVat12(0.0);

				if (row[18] != null)
					patientSaleMaster.setPatientSalesBillAmountReceived(Double
							.parseDouble(row[18].toString()));
				else
					patientSaleMaster.setPatientSalesBillAmountReceived(0.0);

				if (row[19] != null)
					patientSaleMaster.setPatientTaxVat55(Double
							.parseDouble(row[19].toString()));

				else
					patientSaleMaster
							.setPatientTaxVat55(0.0);

				if (row[20] != null)
					patientSaleMaster.setPatientSalePreviousBalance(Double
							.parseDouble(row[20].toString()));
				else
					patientSaleMaster.setPatientSalePreviousBalance(0.0);

				if (row[21] != null)
					patientSaleMaster.setPatientSaleBankName((row[21]
							.toString()));
				else
					patientSaleMaster.setPatientSaleBankName(("-"));

				if (row[22] != null)
					patientSaleMaster.setPatientSaleChequeNum((row[22]
							.toString()));
				else
					patientSaleMaster.setPatientSaleChequeNum(("-"));

				if (row[23] != null)
					patientSaleMaster.setPatientTaxVat6(Double
							.parseDouble(row[23].toString()));
				else
					patientSaleMaster.setPatientTaxVat6(0.0);

				if (row[24] != null)
					patientSaleMaster.setPatientTaxVat135(Double
							.parseDouble(row[24].toString()));
				else
					patientSaleMaster.setPatientTaxVat135(0.0);

				if (row[25] != null)
					patientSaleMaster.setPatientType(row[25].toString());
				else
					patientSaleMaster.setPatientType("");
				
				//Manisha
				
				if (row[26] != null)
					patientSaleMaster
							.setPatientSaleCategoryName(row[26].toString());
				else
					patientSaleMaster.setPatientSaleCategoryName((""));

				/*if (row[26] != null)
					patientSaleMaster
							.setPatientSaleForTime(row[26].toString());
				else
					patientSaleMaster.setPatientSaleForTime((""));*/
				
				if (row[27] != null)
					patientSaleMaster
							.setPatientSaleForTime(row[27].toString());
				else
					patientSaleMaster.setPatientSaleForTime((""));
				
				
				if (row[25] != null)
					patientSaleMaster
							.setPatientSaleStatus(row[25].toString());
				else
					patientSaleMaster.setPatientSaleStatus((""));

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			SQLQuery query2 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" SELECT     c.city_name,    p.area_code,    t1.taluka_name,    d.dis_name,    s.state_name FROM    pharma_patient_sales_bill_master master        inner join    ehat_patient p ON p.patient_id = master.patient_bill_patient_id        left join    city c ON p.town_id = c.idcity        left join    taluka t1 ON p.taluka_id = t1.idtaluka        left join    district d ON d.iddistrict = p.district_id        left join    state s ON s.idstate = p.state_id where    master.patient_sales_bill_id ="
					+ patientSaleId);
			Object[] rows = (Object[]) query2.uniqueResult();

			if (rows != null) {
				if (rows[0] != null) {
					/*patientSaleMaster.setPatientSalesBillEntryBy(address + " "
							+ rows[0].toString());*/
					address = address+" "+ rows[0].toString();
				}/* else {
					patientSaleMaster.setPatientSalesBillEntryBy("");
				}*/

				if (rows[1] != null) {
					/*patientSaleMaster.setPatientSalesBillEntryBy(address + " "
							+ rows[0].toString() + " " + rows[1].toString());*/
					address = address + " " + rows[1].toString();
				} /*else {
					patientSaleMaster.setPatientSalesBillEntryBy("");
				}*/

				if (rows[2] != null) {
					/*patientSaleMaster.setPatientSalesBillEntryBy(address + " "
							+ rows[0].toString() + " " + rows[1].toString()
							+ " " + rows[2].toString());*/
					address = address + " " + rows[2].toString();
				} /*else {
					patientSaleMaster.setPatientSalesBillEntryBy("");
				}*/
				if (rows[3] != null) {
					/*patientSaleMaster.setPatientSalesBillEntryBy(address + " "
							+ rows[0].toString() + " " + rows[1].toString()
							+ " " + rows[2].toString() + " "
							+ rows[3].toString());*/
					address = address + " " + rows[3].toString();
				} /*else {
					patientSaleMaster.setPatientSalesBillEntryBy("");
				}*/

				if (rows[4] != null) {
					/*patientSaleMaster.setPatientSalesBillEntryBy(address + " "
							+ rows[0].toString() + " " + rows[1].toString()
							+ " " + rows[2].toString() + " "
							+ rows[3].toString() + " " + rows[4].toString());*/
					address = address + " " + rows[4].toString();
				} /*else {
					patientSaleMaster.setPatientSalesBillEntryBy("");
				}*/
				patientSaleMaster.setPatientSalesBillEntryBy(address);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}

		List<PatientSaleBillSlave> patientSaleSlaves = new ArrayList<PatientSaleBillSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							"select patient_slave_qty,patient_slave_mrp,patient_slave_ratePerUnit,patient_slave_amt,patient_slave_batch_code,patient_slave_batch_expiry,product.product_name,p_slave.patient_slave_vat,p_slave.patient_slave_vatAmt,patient_slave_disc,patient_sale_slave_disc_amt,pre.preparation_name from pharma_patient_sales_bill_master master inner join pharma_patient_sales_bill_slave p_slave ON p_slave.patient_slave_bill_master_id= master.patient_sales_bill_id inner join pharma_product_master product ON product.product_id = p_slave.patient_slave_product_id inner join    pharma_preparation_master pre ON pre.preparation_id = product.product_preparation_id where master.patient_sales_bill_id="
									+ patientSaleId);
			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				PatientSaleBillSlave patientSaleBillSlave = new PatientSaleBillSlave();

				if (row[0] != null) {
					String result1[] = row[0].toString().split("\\.");

					patientSaleBillSlave.setPatientSlaveQty(Integer
							.parseInt(result1[0]));
				}

				if (row[1] != null) {
					patientSaleBillSlave.setPatientSlaveMrp(Double
							.parseDouble(row[1].toString()));

				} else
					patientSaleBillSlave.setPatientSlaveMrp(0.0);

				if (row[2] != null)
					patientSaleBillSlave.setPatientSlaveRate(Double
							.parseDouble(row[2].toString()));
				else
					patientSaleBillSlave.setPatientSlaveRate(0.0);

				if (row[3] != null)
					patientSaleBillSlave.setPatientSlaveAmt(Double
							.parseDouble(row[3].toString()));
				else
					patientSaleBillSlave.setPatientSlaveAmt(0.0);

				if (row[4] != null)
					patientSaleBillSlave.setPatientSlaveBatchCode(row[4]
							.toString());
				else
					patientSaleBillSlave.setPatientSlaveBatchCode("");

				if (row[5] != null)
					patientSaleBillSlave.setPatientSaleBatchExpiry(row[5]
							.toString());
				else
					patientSaleBillSlave.setPatientSaleBatchExpiry("");

				ProductMaster productMaster = new ProductMaster();
				if (row[6] != null) {
					productMaster.setProductName(row[6].toString());
				} else {
					productMaster.setProductName("");
				}
				
				if (row[11] != null) {
					productMaster.setProductDesc(row[11].toString());
				} else {
					productMaster.setProductDesc("");
				}


				if (row[7] != null)
					patientSaleBillSlave.setPatientSlaveVat(Double
							.parseDouble(row[7].toString()));

				else
					patientSaleBillSlave.setPatientSlaveVat(0.0);

				if (row[9] != null)
					patientSaleBillSlave.setPatientSlaveDisc(Double
							.parseDouble(row[9].toString()));

				else
					patientSaleBillSlave.setPatientSlaveDisc(0.0);

				if (row[10] != null && row[0] != null) {
					Double discAmt = ((Double.parseDouble(row[10].toString())) * (Double
							.parseDouble(row[0].toString())));
					patientSaleBillSlave.setPatientSaleSlaveDiscAmt(discAmt);
					totalDisc = totalDisc + discAmt;

				} else
					patientSaleBillSlave.setPatientSaleSlaveDiscAmt(0.0);

				if (row[8] != null) {
					/*Double grossAmt = ((Double.parseDouble(row[0].toString())) * (Double
							.parseDouble(row[2].toString())));*/
					patientSaleBillSlave.setPatientSlaveVatAmt(Double.parseDouble(row[8].toString()));

				} else
					patientSaleBillSlave.setPatientSlaveVatAmt(0.0);
				
				patientSaleBillSlave.setProductMaster(productMaster);
				patientSaleSlaves.add(patientSaleBillSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		patientSaleMaster.setPatientTaxVat0(totalDisc);

		patientSaleMaster.setLtPatientSaleBill(patientSaleSlaves);

		return patientSaleMaster;
	}

	@Override
	public List<PendingBill> getCreditBills(Integer patientId) {

		List<PendingBill> pendingBills = new ArrayList<PendingBill>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select credit.credit_note_id,credit.credit_note_date,credit.credit_note_doc_no,credit.credit_note_transaction_type,credit.credit_note_net_amt from "
									+ " pharma_credit_note_master credit inner join treatment t on t.Treatment_ID=credit.credit_note_treatmentId inner join patient p on p.Patient_ID=t.Patient_ID "
									+ "   where  credit.credit_note_delete_flag='0' and p.Patient_ID="
									+ patientId);
			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				PendingBill pendingBill = new PendingBill();
				if (row[0] != null)
					pendingBill.setBillNo(row[0].toString());

				if (row[1] != null)
					pendingBill.setBillDate(row[1].toString());

				if (row[2] != null)
					pendingBill.setVouNo(row[2].toString());

				if (row[3] != null)
					pendingBill.setType(row[3].toString());

				if (row[4] != null)
					pendingBill.setNetAmount(row[4].toString());

				pendingBills.add(pendingBill);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pendingBills;
	}

	@Override
	public PatientSale getSponserByPatientId(Integer hospitalId) {
		PatientSale indentSale = new PatientSale();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select s.sp_dic_master_id,s.name from pharma_patient_sales_bill_master patient "
									+ " inner join sp_dic_master s ON s.sp_dic_master_id = patient.patient_bill_sponser_id "
									+ " where patient.patient_sales_bill_id= '"
									+ hospitalId + "'");

			Object[] rows = (Object[]) query.uniqueResult();
			if (rows != null) {
				if (rows[1] != null) {
					indentSale.setSponserName(rows[1].toString());
				} else {
					indentSale.setSponserName("");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}

		return indentSale;

	}

	@Override
	public PatientSale getPatientSaleTransType(Integer hospitalId) {
		PatientSale indentSale = new PatientSale();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select patient_bill_mode from pharma_patient_sales_bill_master  "
							+ " where patient_sales_bill_id= '" + hospitalId
							+ "'");

			Object rows = (Object) query.uniqueResult();

			if (rows != null) {
				if (rows.toString().equals("0"))
					indentSale.setPatientType("CASH");
				else if (rows.toString().equals("1"))
					indentSale.setPatientType("CREDIT");
				else if (rows.toString().equals("2"))
					indentSale.setPatientType("CHEQUE");

			} else {
				indentSale.setPatientType("");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}
		return indentSale;
	}

	@Override
	public List<CreditNotePatient> getAllPatientSaleBillData(Integer patientId) {

		List<CreditNotePatient> creditNotePatients = new ArrayList<CreditNotePatient>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" select patient_bill_date,patient_sales_bill_net_amt,p.f_name,    p.m_name,    p.l_name,    p.address,    p.mobile,product.product_name, "
									+ " slave.patient_sale_slave_issue_qty,slave.patient_slave_rate,slave.patient_slave_BatchId,slave.patient_slave_batch_code,slave.patient_slave_batch_expiry,product.product_uom_unit,pack.pack_type, "
									+ " pur_rate.rate,pur_rate.mrp,slave.patient_slave_id,slave.patient_slave_product_id,patient_sales_bill_id,slave.patient_slave_vat,slave.patient_slave_disc,p_master.patient_bill_patient_id,p_master.patient_sale_treatmentId,slave.patient_slave_mrp,patient_sale_type,pur_rate.pur_rate,patient_bill_mode from pharma_patient_sales_bill_master p_master "
									+ " inner join ehat_patient p ON p.patient_id = p_master.patient_bill_patient_id inner join pharma_patient_sales_bill_slave slave on slave.patient_slave_bill_master_id=p_master.patient_sales_bill_id inner join "
									+ " pharma_product_master product on slave.patient_slave_product_id=product.product_id inner join pharma_batch_master batch ON batch.batch_id = slave.patient_slave_BatchId "
									+ " inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_purchase_rate pur_rate ON pur_rate.batch_id = batch.batch_id where  "
									+ " p_master.patient_sales_bill_id = '"
									+ patientId
									+ "'  and slave.patient_sale_slave_issue_qty != 0 order by patient_slave_id  ");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();

			for (Object[] master : rows) {
				CreditNotePatient CreditNotePatient = new CreditNotePatient();
				if (master[0] != null) {
					CreditNotePatient.setPatientBillDate(master[0].toString());
				}

				if (master[1] != null) {
					CreditNotePatient.setPatientSalesBillNetAmt(master[1]
							.toString());
				}

				if (master[2] != null)
					CreditNotePatient.setPatientName(master[2].toString());

				if (master[3] != null)
					CreditNotePatient.setPatientName(master[2].toString() + " "
							+ master[3].toString());

				if (master[4] != null)
					CreditNotePatient.setPatientName(master[2].toString() + " "
							+ master[4].toString());

				if (master[3] != null && master[4] != null)
					CreditNotePatient
							.setPatientName(master[2].toString() + " "
									+ master[3].toString() + " "
									+ master[4].toString());

				if (master[5] != null)
					CreditNotePatient.setPaddress(master[5].toString());

				if (master[6] != null)
					CreditNotePatient.setPhoneNumber(master[6].toString());

				if (master[7] != null)
					CreditNotePatient.setProductName(master[7].toString());

				if (master[8] != null)
					CreditNotePatient.setQty(master[8].toString());

				if (master[9] != null)
					CreditNotePatient.setRate(master[9].toString());

				if (master[10] != null)
					CreditNotePatient.setBatchId(master[10].toString());

				if (master[11] != null)
					CreditNotePatient.setBatchCode(master[11].toString());

				if (master[12] != null)
					CreditNotePatient.setBatchExpiry(master[12].toString());

				if (master[13] != null)
					CreditNotePatient.setUnit(master[13].toString());

				if (master[14] != null)
					CreditNotePatient.setPack(master[14].toString());

				if (master[15] != null)
					CreditNotePatient.setBatchRate(master[15].toString());

				/*
				 * if (master[16] != null)
				 * CreditNotePatient.setMrp(master[16].toString());
				 */

				if (master[17] != null)
					CreditNotePatient.setPatientSlaveId(master[17].toString());

				if (master[18] != null)
					CreditNotePatient.setProductId(master[18].toString());

				if (master[19] != null)
					CreditNotePatient.setPatientSalesBillId(master[19]
							.toString());

				if (master[20] != null)
					CreditNotePatient.setVat(master[20].toString());

				if (master[21] != null)
					CreditNotePatient.setDisc(master[21].toString());

				if (master[22] != null)
					CreditNotePatient.setPatientId(master[22].toString());

				if (master[23] != null)
					CreditNotePatient.setTreatmentId(master[23].toString());

				if (master[24] != null)
					CreditNotePatient.setMrp(master[24].toString());

				if (master[25] != null)
					CreditNotePatient.setSaleType(master[25].toString());

				if (master[26] != null)
					CreditNotePatient.setPurRate(master[26].toString());
				
				if (master[27] != null)
					CreditNotePatient.setPatientBillMode(master[27].toString());

				creditNotePatients.add(CreditNotePatient);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return creditNotePatients;
	}

	@Override
	public PatientSaleBillMaster getPatientSlaveByPatientId(
			Integer patientSaleId) {
		PatientSaleBillMaster patientSaleBillMaster = new PatientSaleBillMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientSaleBillMaster.class);

			criteria.add(Restrictions.eq("patientSalesBillId", patientSaleId));
			criteria.add(Restrictions.eq("patientSalesBillDeleteFlag", 0));

			patientSaleBillMaster = (PatientSaleBillMaster) criteria
					.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return patientSaleBillMaster;
		}
		return patientSaleBillMaster;
	}

	@Override
	public List<CreditNotePatient> getAllPatientReceiptDataByTreatmentId(
			Integer treatmentId) {
		List<CreditNotePatient> creditNotePatients = new ArrayList<CreditNotePatient>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" select patient.patient_sales_bill_id from pharma_patient_sales_bill_master patient where "
									+ " patient.patient_bill_patient_id ="
									+ treatmentId + " ");

			@SuppressWarnings("unchecked")
			List<Object> rows = query.list();

			for (Object master : rows) {
				CreditNotePatient creditNotePatient = new CreditNotePatient();
				/* IndentMaster indentSale = new IndentMaster(); */

				if (master != null)
					creditNotePatient.setPatientSalesBillId(master.toString());

				creditNotePatients.add(creditNotePatient);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return creditNotePatients;
	}

	@Override
	public Double getPendingAmount(Integer treatment) {

		Double amount = 0.0;
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select amount_balance from pharma_patient_amount_details where treatment_id='"
						+ treatment + "' ");
		Object rows = (Object) query1.uniqueResult();
		if (rows != null && rows.toString()!="null"){
			try{
			amount = Double.parseDouble(rows.toString());
			}catch(Exception e){
				amount=0.0;
			}
		}
		else
			amount = 0.0;

		return amount;
	}

	@Override
	public void setPendingBalancePatientSale(int treatmentId,
			Double patientSaleAmountBalance) {
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select treatment_id from pharma_patient_amount_details where treatment_id='"
						+ treatmentId + "' ");
		Object rows = (Object) query1.uniqueResult();
		if (rows == null) {
			try {
				org.hibernate.Query query = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"insert into pharma_patient_amount_details(treatment_id,amount_balance) values("
										+ treatmentId
										+ ","
										+ patientSaleAmountBalance + ")");
				query.executeUpdate();

			} catch (Exception e) {
				e.printStackTrace();
			}

		} else {

			try {
				org.hibernate.Query query = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"update pharma_patient_amount_details set  amount_balance='"
										+ patientSaleAmountBalance
										+ "' where treatment_id=" + treatmentId);
				query.executeUpdate();

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	
	@Override
	public void setEditablePendingBalancePatientSale(int treatmentId,
			int patientSaleId, Double balance)
	{
		int count = 0;
		int patientSaleID = 0;
		Double netAmt = 0.0;
		Double amtRec = 0.0;
/*		Double prevBal = 0.0;
		Double amtBal = 0.0;
*/		Double newAmtBal = 0.0;
		Double oldBalValue = balance;
										

		SQLQuery queryPatientSale = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT patient_sales_bill_id,patient_sales_bill_net_amt,patient_sale_previous_balance,patient_sales_bill_amount_received,patient_sales_bill_amount_balance FROM pharma_patient_sales_bill_master "
								+ " where patient_sale_treatmentId ='"
								+ treatmentId
								+ "' and patient_sales_bill_id>'"
								+ patientSaleId + "' ");

		@SuppressWarnings("unchecked")
		List<Object[]> rows = (List<Object[]>) queryPatientSale.list();

		for (Object[] master : rows) {
			try {
				count++;
				if (master[0] != null)
					patientSaleID = Integer.parseInt(master[0].toString());

				if (master[1] != null)
					netAmt = Double.parseDouble(master[1].toString());

				/*if (master[2] != null)
					prevBal = Double.parseDouble(master[2].toString());
*/
				if (master[3] != null)
					amtRec = Double.parseDouble(master[3].toString());

				/*if (master[4] != null)
					amtBal = Double.parseDouble(master[4].toString());*/

				if (count == 1) {
					newAmtBal = balance + netAmt - amtRec;
					SQLQuery updatePatientBal = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"update pharma_patient_sales_bill_master set patient_sales_bill_amount_balance='"
											+ newAmtBal
											+ "',patient_sale_previous_balance='"
											+ balance
											+ "' where patient_sales_bill_id='"
											+ patientSaleID + "'  ; ");
					updatePatientBal.executeUpdate();
				} else {
					newAmtBal = oldBalValue + netAmt - amtRec;

					SQLQuery updatePatientBal1 = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"update pharma_patient_sales_bill_master set patient_sales_bill_amount_balance='"
											+ newAmtBal
											+ "',patient_sale_previous_balance='"
											+ oldBalValue
											+ "' where patient_sales_bill_id='"
											+ patientSaleID + "' ; ");
					updatePatientBal1.executeUpdate();
				}

			
					oldBalValue = newAmtBal;
				
				

			} catch (Exception e) {
				System.out.println(e);
			}
		}
				
		updateAmountDetails(treatmentId, oldBalValue);
		
	}

	
	public boolean updateBalFlag(int saleId,Double bal)	
	{

		SQLQuery queryFetchBalPatientSale = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT patient_sales_bill_amount_balance FROM pharma_patient_sales_bill_master "
								+ " where patient_sales_bill_id='"
								+ saleId + "' ");
		
Object rows = (Object) queryFetchBalPatientSale.uniqueResult();
		
	Double	balance=Double.parseDouble(rows.toString());
	if(bal.equals(balance))
		return true;
	else
		return false;
	
	}
	
	public void updateAmountDetails(int tratmentId, Double oldValue) 
	{
		try
		{
			Double balace=0.0;
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT sum(amount_receive) FROM pharma_patient_amount_history where treatment_id = '"
							+ tratmentId + "' ");
			Object rows = (Object) query1.uniqueResult();

			if(rows!=null)
				{
				balace=Double.parseDouble(rows.toString());
				oldValue=oldValue-balace;
				}
						
			
			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createSQLQuery(
							"update pharma_patient_amount_details set  amount_balance='"
									+ oldValue + "' where treatment_id="
									+ tratmentId);
			query.executeUpdate();
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public List<PatientSaleBillMaster> getAllPatientDataByTreatmentId(
			Integer treatmentId) {
		List<PatientSaleBillMaster> patientSaleMasters = new ArrayList<PatientSaleBillMaster>();
		try {
			SQLQuery query = sessionFactory
                    .getCurrentSession() .createSQLQuery(" SELECT patient.patient_bill_date,patient.patient_sales_bill_net_amt,patient.patient_sales_bill_amount_received,(SELECT IFNULL(SUM(credit_note_net_amt), 0) credit_note_net_amt FROM pharma_credit_note_master WHERE credit_note_patientSaleId = patient.patient_sales_bill_id AND credit_note_type = 'patientSale') AS ReturnAmt,IFNULL(his.discount, 0) Disc,  IFNULL(his.amount_receive,  0) amountReceive ,IFNULL(his.amount_balance,  0) amountBal , patient.patient_sales_bill_id AS patientSalesBillId , IFNULL(his.idpharma_patient_amount_history_id, 0) historyId ,  patient.patient_sales_bill_amount_balance FROM pharma_patient_sales_bill_master patient LEFT JOIN    pharma_patient_amount_history his on his.patient_sale_bill_master_id = patient.patient_sales_bill_id WHERE patient.patient_sale_treatmentId ='"+ treatmentId + "' AND patient.patient_sale_billing = 'N' AND patient.paid_flag = 'N' ");  
                    		/*                            "select  patient.patient_bill_date,patient.patient_sales_bill_net_amt,patient.patient_sales_bill_amount_received,patient.patient_sales_bill_amount_balance,"
                                    + " (SELECT  IFNULL(SUM(credit_note_net_amt), 0) credit_note_net_amt FROM pharma_credit_note_master where credit_note_patientSaleId = patient.patient_sales_bill_id AND credit_note_type = 'patientSale') As ReturnAmt,"
                                    + " (SELECT IFNULL(SUM(discount),0) discount FROM pharma_patient_amount_history his where his.treatment_id = '"+ treatmentId + "') As Disc,patient.patient_sales_bill_id as patientSalesBillId "
                                    + " from pharma_patient_sales_bill_master patient where patient.patient_sale_treatmentId = '"
                                    + treatmentId + "' and patient.patient_sale_billing ='N'"); 
     */	
			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();

			for (Object[] master : rows) {
				
				PatientSaleBillMaster patientSaleMaster = new PatientSaleBillMaster();

				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

				if (master[0] != null) {
					java.util.Date date = dateFormat
							.parse(master[0].toString());
					patientSaleMaster.setPatientBillDate(date);
				}

				if (master[1] != null)
					patientSaleMaster.setPatientSalesBillNetAmt(Double
							.parseDouble(master[1].toString()));

				
				 if (master[2] != null)
				 patientSaleMaster.setPatientSalesBillAmountReceived(Double.parseDouble(master[2].toString()));

				
				if (master[3] != null)
					patientSaleMaster.setPatientSalePreviousBalance(Double
							.parseDouble(master[3].toString()));
				else
					patientSaleMaster.setPatientSalePreviousBalance(0.0);
				
				if (master[4] != null)
					patientSaleMaster.setPatientSalesBillCN(Double 
							.parseDouble(master[4].toString()));
				else
					patientSaleMaster.setPatientSalesBillCN(0.0);
				
				
				if (master[5] != null)
					patientSaleMaster.setAmountReceive(master[5].toString());
				else
					patientSaleMaster.setAmountReceive("");		
				
				if (master[6] != null)
					patientSaleMaster.setAmountBal(master[6].toString());
				else
					patientSaleMaster.setAmountBal("");		

				if (master[7] != null)
					patientSaleMaster.setPatientSalesBillId(Integer.parseInt
							(master[7].toString()));
				else
					patientSaleMaster.setPatientSalesBillId(0);
				
				if (master[8] != null)
					patientSaleMaster.setHistoryId(Integer.parseInt
							(master[8].toString()));
				else
					patientSaleMaster.setHistoryId(0);
				if (master[9] != null)
					patientSaleMaster.setPatientSalesBillAmountBalance(Double.parseDouble
							(master[9].toString()));
				else
					patientSaleMaster.setPatientSalesBillAmountBalance(0.0); 


				patientSaleMasters.add(patientSaleMaster);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return patientSaleMasters;
	}

	@Override
	public Double getPendingAmountByTreatmentId(Integer treatmentId,
			Integer spId) {
		Double amount = 0.0;

		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT   if(count(amount_balance) > 0, min(amount_balance),(select sum(p.patient_sales_bill_net_amt - p.patient_sales_bill_amount_received)    from     pharma_patient_sales_bill_master p    where p.patient_sale_treatmentId = '"
								+ treatmentId
								+ "'        and p.patient_bill_sponser_id = '"
								+ spId
								+ "')) as rem   FROM      pharma_patient_amount_history   where      Treatment_id ='"
								+ treatmentId
								+ "' order by idpharma_patient_amount_history_id desc limit 1");
		Object rows = (Object) query1.uniqueResult();
		if (rows != null)
			amount = Double.parseDouble(rows.toString());

		return amount;
	}

	@Override
	public boolean savePatientPendingAmount(Integer treatmentId,
			Double amountReceive, Double discount, String narration,
			Double amountBalance,String listStr) {
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select treatment_id from pharma_patient_amount_details where treatment_id='"
						+ treatmentId + "' ");
		Object rows = (Object) query1.uniqueResult();
		
		if (rows != null) {
			try {
				
				PharmaPatientAmountHistoryDto obj = (PharmaPatientAmountHistoryDto) ConfigUIJSONUtility.getObjectFromJSON(listStr,PharmaPatientAmountHistoryDto.class);
				List<PharmaPatientAmountHistoryDto> slaveList = obj.getListPharmaPatientAmountHistoryDto();

				Calendar currentDate = Calendar.getInstance();
				SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
				String date = dateFormat.format(currentDate.getTime());

				java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat(
						"HH:mm:ss");
				java.util.Calendar cal = java.util.Calendar.getInstance();
				String time = dateFormat1.format(cal.getTime());
				
				Double amountBalanceNew = slaveList.get(0).getAmountBalance();
				
				if(amountBalanceNew==0) {
					String squery="update pharma_patient_sales_bill_master set paid_flag='Y' where patient_sales_bill_id='"+slaveList.get(0).getPatientSaleBillMasterId()+"' ";
					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
					query.executeUpdate();
				}

				org.hibernate.Query query = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"update pharma_patient_amount_details set amount_balance = "
										+ amountBalance + " , amount_receive="
										+ amountReceive + " , discount="
										+ discount + " , narration='"
										+ narration + "',final_date='" + date
										+ "' where treatment_id = "
										+ treatmentId);
				query.executeUpdate();
				
				for(PharmaPatientAmountHistoryDto rs : slaveList)
				{
					rs.setFinalDate(date);
					rs.setPatientTime(time);
					sessionFactory.getCurrentSession().merge(rs);
				}
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return true;
	}

	@Override
	public FinalIndent getFinalBillDetailsForPatientSave(Integer treatmentId) {

		List<FinalIndent> finalIndents = new ArrayList<FinalIndent>();
		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT amount_balance,amount_receive,discount,narration,final_date,treatment_id,idpharma_patient_amount_history_id FROM pharma_patient_amount_history "
								+ " where treatment_id='"
								+ treatmentId
								+ "' order by idpharma_patient_amount_history_id DESC limit 1 ");

		@SuppressWarnings("unchecked")
		List<Object[]> rows = query1.list();
		for (Object[] master : rows) {

			FinalIndent finalIndent = new FinalIndent();

			if (master[0] != null) {
				finalIndent.setBalance(master[0].toString());
			}

			if (master[1] != null) {
				finalIndent.setAmountReceive(master[1].toString());
			}

			if (master[2] != null) {
				finalIndent.setDiscount(master[2].toString());
			}

			if (master[3] != null)
				finalIndent.setNarration(master[3].toString());

			if (master[4] != null)
				finalIndent.setDate(master[4].toString());

			if (master[5] != null)
				finalIndent.setTreatmentId(master[5].toString());

			if (master[6] != null)
				finalIndent.setHistoryId(master[6].toString());

			finalIndents.add(finalIndent);
		}
		return finalIndents.get(0);
	}

	@Override
	public PatientSaleBill getPatientDataByTreatmentId(Integer treatmentId) {
		PatientSaleBill patientSaleBill = new PatientSaleBill();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery("select p.f_name,p.m_name,p.l_name,p.address,p.mobile from ehat_treatment t inner join ehat_patient p ON p.patient_id = t.patient_id where t.treatment_id = "+treatmentId);
			Object[] rows = (Object[]) query.uniqueResult();

			if (rows[0] != null)
				patientSaleBill.setPatientName(rows[0].toString());

			if (rows[1] != null)
				patientSaleBill.setPatientName(rows[0].toString() + " "
						+ rows[1].toString() + " " + rows[2].toString());

			if (rows[3] != null)
				patientSaleBill.setPatientAddress(rows[3].toString());

			/*if (rows[3] != null)
				patientSaleBill.setPatientAddress(rows[3].toString() + " "
						+ rows[4].toString());*/

			if (rows[4] != null)
				patientSaleBill.setPatientMobileNumber(rows[4].toString());

		} catch (Exception e) {
			e.printStackTrace();
			return patientSaleBill;
		}
		return patientSaleBill;
	}

	@Override
	public List<settalBillIndent> getAllSettalBillByTreatmentId(
			Integer treatmentId) {
		List<settalBillIndent> settalBillIndents = new ArrayList<settalBillIndent>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT amount_balance,amount_receive,discount,narration,final_date,treatment_id,idpharma_patient_amount_history_id FROM pharma_patient_amount_history where "
									+ "Treatment_id = " + treatmentId + " ");
			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();

			for (Object[] master : rows) {
				settalBillIndent settalBillIndent = new settalBillIndent();
				/* IndentMaster indentSale = new IndentMaster(); */

				if (master[0] != null)
					settalBillIndent.setAmountBal(master[0].toString());
				else
					settalBillIndent.setAmountBal("");

				if (master[1] != null)
					settalBillIndent.setAmountReceive(master[1].toString());
				else
					settalBillIndent.setAmountReceive("");

				if (master[2] != null)
					settalBillIndent.setDiscount(master[2].toString());
				else
					settalBillIndent.setDiscount("");

				if (master[3] != null)
					settalBillIndent.setNarration(master[3].toString());
				else
					settalBillIndent.setNarration("");

				if (master[4] != null)
					settalBillIndent.setFinalAmt(master[4].toString());
				else
					settalBillIndent.setFinalAmt("");

				if (master[5] != null)
					settalBillIndent.setTreatmentId(master[5].toString());
				else
					settalBillIndent.setTreatmentId("");

				if (master[6] != null)
					settalBillIndent.setHistoryId(master[6].toString());
				else
					settalBillIndent.setHistoryId("");

				settalBillIndents.add(settalBillIndent);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return settalBillIndents;
	}

	@Override
	public List<settalBillIndent> getAllSettalBillHistoryByTreatmentId(
			Integer patientId) {
		List<settalBillIndent> settalBillIndents = new ArrayList<settalBillIndent>();
		Double total = 0.0;
		Double bal = 0.0;
		Double result = 0.0;
	
		try {
			SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" SELECT  master.patient_sales_bill_amount_received,details.amount_receive,master.patient_bill_date, "
									+ "  master.patient_sale_treatmentId,master.patient_sales_bill_amount_balance,details.amount_balance,master.patient_sales_bill_id,master.patient_sales_bill_net_amt "
									+ " FROM pharma_patient_sales_bill_master master  inner join treatment t on t.Treatment_ID=master.patient_sale_treatmentId inner join pharma_patient_amount_details details on  details.treatment_id=master.patient_sale_treatmentId "
									+ " where patient_bill_patient_id = "
									+ patientId + "  ");

			@SuppressWarnings("unchecked")
			List<Object[]> rows1 = query1.list();

			for (Object[] master : rows1) {
				settalBillIndent settalBillIndent = new settalBillIndent();

				if (master[0] != null)
					settalBillIndent.setTotalAmountReceive(Double
							.parseDouble(master[0].toString()));
				else
					settalBillIndent.setTotalAmountReceive(0.0);

				if (master[1] != null)
					settalBillIndent.setSettleAmountReceive(Double
							.parseDouble(master[1].toString()));
				else
					settalBillIndent.setSettleAmountReceive(0.0);

				if (master[2] != null)
					settalBillIndent.setDate(master[2].toString());
				else
					settalBillIndent.setDate("");

				if (master[3] != null)
					settalBillIndent.setTreatmentId(master[3].toString());
				else
					settalBillIndent.setTreatmentId("");

				if (master[4] != null)
					total = Double.parseDouble(master[4].toString());

				if (master[5] != null) {
					bal = Double.parseDouble(master[5].toString());
					settalBillIndent.setAmountBal(master[5].toString());
				} else
					settalBillIndent.setAmountBal("");

				if (master[6] != null)
					settalBillIndent.setBillId("PS" + master[6].toString());
				else
					settalBillIndent.setBillId("");

				if (master[7] != null)
					settalBillIndent.setTotalBill(master[7].toString());
				else
					settalBillIndent.setTotalBill("");

				result = total - bal;

				settalBillIndent.setSettleAmountReceive(result);

				settalBillIndents.add(settalBillIndent);
			}

		} catch (Exception e) {
			e.printStackTrace();

		}

		return settalBillIndents;
	}

	@Override
	public FinalIndent getFinalBillDetails(Integer treatmentId) {

		List<FinalIndent> finalIndents = new ArrayList<FinalIndent>();
		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT amount_balance,amount_receive,discount,narration,final_date,treatment_id,idpharma_patient_amount_history_id FROM "
								+ "  pharma_patient_amount_history where idpharma_patient_amount_history_id = '"
								+ treatmentId + "' ");
		@SuppressWarnings("unchecked")
		List<Object[]> rows = query1.list();
		for (Object[] master : rows) {

			FinalIndent finalIndent = new FinalIndent();

			if (master[0] != null) {
				finalIndent.setBalance(master[0].toString());
			}

			if (master[1] != null) {
				finalIndent.setAmountReceive(master[1].toString());
			}

			if (master[2] != null) {
				finalIndent.setDiscount(master[2].toString());
			}

			if (master[3] != null)
				finalIndent.setNarration(master[3].toString());

			if (master[4] != null)
				finalIndent.setDate(master[4].toString());

			if (master[5] != null)
				finalIndent.setTreatmentId(master[5].toString());

			if (master[6] != null)
				finalIndent.setHistoryId(master[6].toString());

			finalIndents.add(finalIndent);
		}
		return finalIndents.get(0);
	}

	@Override
	public PatientSaleBillMaster getPatientSaleBillId(Integer patientId) {
		PatientSaleBillMaster patientSaleBillMaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientSaleBillMaster.class);
			criteria.add(Restrictions.eq("patientSalesBillDeleteFlag", 0));
			if (patientId != 0) {
				criteria.add(Restrictions.eq("patientSalesBillId", patientId));
			}

			patientSaleBillMaster = (PatientSaleBillMaster) criteria
					.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return patientSaleBillMaster;
		}
		return patientSaleBillMaster;
	}

	@Override
	public Double getPreBalance(String treatmentId) {
		Double amtBalance = 0.0;
		try {
			SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT amount_balance FROM pharma_patient_amount_details where treatment_id= '"
									+ treatmentId + "'");

			Object result = (Object) query1.uniqueResult();

			if (result.toString() != null) {
				amtBalance = Double.parseDouble(result.toString());
			} else {
				amtBalance = 0.0;
			}
		} catch (Exception e) {
			System.out.println(e);
		}

		return amtBalance;
	}

	@Override
	public void setAmountReceiveInOrderForm(int orderId, Integer recQty) {
		Integer quantity = 0;
		try {
			SQLQuery queryForSelectRecQty = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT patient_sale_rec_qty FROM order_comp_druges where idorder_comp_druges='"
									+ orderId + "' ");

			Object resultForRecQty = (Object) queryForSelectRecQty
					.uniqueResult();
			if (resultForRecQty != null) {
				if (resultForRecQty.toString() != null) {
					quantity = Integer.parseInt(resultForRecQty.toString());
				} else {
					quantity = 0;
				}
			}
			quantity = quantity + recQty;

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"update order_comp_druges set  patient_sale_rec_qty='"
							+ quantity + "' where idorder_comp_druges="
							+ orderId);
			query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void setAmountReceiveInPrescription(int prescriptionId, Integer qty) {
		Double quantity = 0.0;
		try {
			SQLQuery query1 = sessionFactory.getCurrentSession()
					.createSQLQuery(
							"SELECT patient_sale_rec_qty FROM prescription where prescription_id='"
									+ prescriptionId + "' ");

			Object rows = (Object) query1.uniqueResult();

			if (query1.list().size() >0) {
				quantity = Double.parseDouble(rows.toString());
			} else {
				quantity = 0.0;
			}
			quantity = quantity + Double.parseDouble(qty.toString());
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"update prescription set  patient_sale_rec_qty='"
							+ quantity + "' where prescription_id="
							+ prescriptionId);
			query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public String getPatientTypeByTreatmentId(Integer treatmentId) {
		String patientType = "";
		try {
			SQLQuery queryForPatientType = sessionFactory.getCurrentSession()
					.createSQLQuery(
							"SELECT department_id FROM ehat_treatment where treatment_id ='"
									+ treatmentId + "'");

			Object resultForPatientType = (Object) queryForPatientType
					.uniqueResult();

			if (resultForPatientType.toString() != null) {
				patientType = (resultForPatientType.toString());
			}

		} catch (Exception e) {
			System.out.println(e);
		}

		return patientType;
	}

	@Override
	public JSONObject getSponserStatus(Integer treatmentId) {
		String flag = "";

		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT     s.charges_master_slave_id,    t_flag,    ifnull(c.category_name, 'Self') as catName FROM    ehat_treatment t          join ehat_bill_master s ON s.treatment_id = t.treatment_id  left  join ehat_charges_master_slave c ON c.id = s.charges_master_slave_id where    t.treatment_id ='"
				+ treatmentId + "' ; ");
		@SuppressWarnings("unchecked")
		List<Object[]> rows = query1.list();

		JSONObject obj1 = new JSONObject();

		for (Object[] master : rows) {

			if (((master[0].toString()).equals("1"))
					|| ((master[0].toString()).equals("2")))
				flag = "INACTIVE";
			else
				flag = "ACTIVE";

			try {
				obj1.put("status", flag);

				if (master[0] != null)
					obj1.put("catId", master[0].toString());
				else
					obj1.put("catId", 1);

				if (master[1] != null)
					obj1.put("tFlag", master[1].toString());

				if (master[2] != null)
					obj1.put("catgoryName", master[2].toString());
			} catch (Exception e) {
				e.printStackTrace();
			}

		}

		return obj1;
	}

	@Override
	public String getMRPType(Integer treatmentId) {
		String flag = "";
		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT price_type FROM treatment t inner join ehat_bill_discount_category_master master ON t.bill_category = master.id_category_master "
								+ " where t.Treatment_ID = '"
								+ treatmentId
								+ "' and t.bill_category!=1 and t.bill_category!=2 ; ");
		Object rows = (Object) query1.uniqueResult();

		flag = rows.toString();

		return flag;
	}

	
	
	
//Manisha
//New Save For Patient Sale Bill 
	
	@Override
	public Map<String, String> saveOrUpdatePatientSaleBill(
			PatientSaleBillMaster patientSaleBillMaster, String storeId) {
		result = new HashMap<String, String>();
		try {

			stockMasters = new ArrayList<StockMaster>();
			count = 0;

			if (saveBatchStockDetails(patientSaleBillMaster, storeId)) {
				sessionFactory.getCurrentSession().saveOrUpdate(
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
	@Override
	public List<RegTreBillDto> fetchPharmaPatientNameAutoSuggest(String patientName,String typeOfpatient,String isEdit) {


		List<RegTreBillDto> ltUsersDTOs = new ArrayList<>();
		String sql="";
		if (typeOfpatient.equalsIgnoreCase("ipd")) {
			typeOfpatient = "2";
		} else if (typeOfpatient.equalsIgnoreCase("opd")) {
			typeOfpatient = "1";
		} else {
			typeOfpatient = "1,2";
		}

		try {
			if (!isEdit.equals("yes")) {
					sql = "select p.f_name as patient_name,p.m_name as mn,p.l_name as lm ,p.patient_id,t.treatment_id,t.department_id,p.mobile,p.address from "
							+ "ehat_patient p, ehat_treatment t where p.patient_id = t.patient_id and t.deleted = 'N' and "
							+ "t.department_id in ("
							+ typeOfpatient
							+ ") and "
							+ " CONCAT(  p.f_name,' ',p.m_name,' ',p.l_name) LIKE '%"
							+ patientName
							+ "%' "
							+ "group by p.patient_id limit 100";

			
				SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> masterRow = sqlQuery.list();		          
			    for(Map<String, Object> row : masterRow){
			    	RegTreBillDto obj = new RegTreBillDto();
			    	obj.setPatientId((Integer)row.get("patient_id"));
			    	obj.setF_name((String)row.get("patient_name"));
			    	obj.setM_name((String)row.get("mn"));
			    	obj.setL_name((String)row.get("lm"));
			    	obj.setTreatmentId((Integer)row.get("treatment_id"));
			    	obj.setDepartmentId((Integer)row.get("department_id"));
			    	obj.setMobile((String)row.get("mobile"));
			    	obj.setAddress((String)row.get("address"));
			    	ltUsersDTOs.add(obj);
				 
			    }
			} 
			else if (isEdit.equals("yes")) {
					sql = " select  p.f_name as patient_name,p.m_name as mn,p.l_name as lm,p.patient_id,t.treatment_id,t.department_id,p.mobile,p.address from "
							+ "ehat_patient p,ehat_treatment t, ehat_bill_master b "
							+ " where p.patient_id = t.patient_id and p.patient_id = b.patient_id and CONCAT(  p.f_name,' ',p.m_name,' ',p.l_name) LIKE '%"
							+ patientName
							+ "%' and t.treatment_id = (select "
							+ " max(t2.treatment_id) from ehat_treatment t2 where t2.patient_id = p.patient_id) group by p.patient_id limit 100";

				

				SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				sqlQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> master = sqlQuery1.list();		          
			    for(Map<String, Object> row : master){
			    	RegTreBillDto obj = new RegTreBillDto();
			    	obj.setPatientId((Integer)row.get("patient_id"));
			    	obj.setF_name((String)row.get("patient_name"));
			    	obj.setM_name((String)row.get("mn"));
			    	obj.setL_name((String)row.get("lm"));
			    	obj.setTreatmentId((Integer)row.get("treatment_id"));
			    	obj.setDepartmentId((Integer)row.get("department_id"));
			    	obj.setMobile((String)row.get("mobile"));
			    	obj.setAddress((String)row.get("address"));
			    	ltUsersDTOs.add(obj);
			    }
			    	
			    	//return ltUsersDTOs;

				System.err.println(sql);
			   }
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return ltUsersDTOs;
		
	
	
	}

	@Override
	public List<RegTreBillDto> fetchPharmaPatientNameAutoSuggestNew(String patientName,String typeOfpatient,String isEdit, String callFrom) {

		List<RegTreBillDto> ltUsersDTOs = new ArrayList<>();
		String sql="";
		if (typeOfpatient.equalsIgnoreCase("ipd")) {
			typeOfpatient = "2";
		} else if (typeOfpatient.equalsIgnoreCase("opd")) {
			typeOfpatient = "1";
		} else {
			typeOfpatient = "1,2";
		}

		try {
			if (!isEdit.equals("yes")) {
				if(callFrom.equalsIgnoreCase("1")){
					sql = " select  p.f_name as patient_name,p.m_name as mn,p.l_name as lm,p.patient_id,t.treatment_id,t.department_id,p.mobile,p.address from "
							+ "ehat_patient p,ehat_treatment t, ehat_bill_master b "
							+ " where p.patient_id = t.patient_id and p.patient_id = b.patient_id 	and t.treatment_id = (select "
							+ " max(t2.treatment_id) from ehat_treatment t2 where t2.patient_id = p.patient_id) p.patient_id="+patientName+" and  group by p.patient_id limit 100";

				}
				else if(callFrom.equalsIgnoreCase("2")) {
					sql = "select p.f_name as patient_name,p.m_name as mn,p.l_name as lm ,p.patient_id,t.treatment_id,t.department_id,p.mobile,p.address from "
							+ "ehat_patient p, ehat_treatment t where p.patient_id = t.patient_id and t.deleted = 'N' and "
							+ "t.department_id in ("
							+ typeOfpatient
							+ ") and "
							+ " CONCAT(  p.f_name,' ',p.m_name,' ',p.l_name) LIKE '%"
							+ patientName
							+ "%' "
							+ "group by p.patient_id limit 100";

				}
				else if (callFrom.equalsIgnoreCase("3")){
					sql = "select p.patient_id, p.f_name AS patient_name ,p.m_name AS mn, p.l_name AS lm ,t.treatment_id, t.department_id,p.mobile,p.address from pharma_patient_sales_bill_master pm left join ehat_treatment t on  t.treatment_id= pm.patient_sale_treatmentId left join  ehat_patient p on  p.patient_id = t.patient_id   where t.deleted = 'N' and pm.patient_sales_bill_id="+patientName+" ";

				}
				else if (callFrom.equalsIgnoreCase(null)) {
					sql = "select p.f_name as patient_name,p.m_name as mn,p.l_name as lm ,p.patient_id,t.treatment_id,t.department_id,p.mobile,p.address from "
							+ "ehat_patient p, ehat_treatment t where p.patient_id = t.patient_id and t.deleted = 'N' and "
							+ "t.department_id in ("
							+ typeOfpatient
							+ ") and "
							+ " CONCAT(  p.f_name,' ',p.m_name,' ',p.l_name) LIKE '%"
							+ patientName
							+ "%' "
							+ "group by p.patient_id limit 100";
				}
				SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> masterRow = sqlQuery.list();		          
			    for(Map<String, Object> row : masterRow){
			    	RegTreBillDto obj = new RegTreBillDto();
			    	obj.setPatientId((Integer)row.get("patient_id"));
			    	obj.setF_name((String)row.get("patient_name"));
			    	obj.setM_name((String)row.get("mn"));
			    	obj.setL_name((String)row.get("lm"));
			    	obj.setTreatmentId((Integer)row.get("treatment_id"));
			    	obj.setDepartmentId((Integer)row.get("department_id"));
			    	obj.setMobile((String)row.get("mobile"));
			    	obj.setAddress((String)row.get("address"));
			    	ltUsersDTOs.add(obj);
				 
			} 
			} 
			else if (isEdit.equals("yes")) {
				if(callFrom.equalsIgnoreCase("1")){
					sql = " select  p.f_name as patient_name,p.m_name as mn,p.l_name as lm,p.patient_id,t.treatment_id,t.department_id,p.mobile,p.address from "
							+ "ehat_patient p,ehat_treatment t, ehat_bill_master b "
							+ " where p.patient_id = t.patient_id and p.patient_id = b.patient_id 	and t.treatment_id = (select "
							+ " max(t2.treatment_id) from ehat_treatment t2 where t2.patient_id = p.patient_id) and p.patient_id="+patientName+"   group by p.patient_id limit 100";

				}
				else if(callFrom.equalsIgnoreCase("2")) {
					sql = " select  p.f_name as patient_name,p.m_name as mn,p.l_name as lm,p.patient_id,t.treatment_id,t.department_id,p.mobile,p.address from "
							+ "ehat_patient p,ehat_treatment t, ehat_bill_master b "
							+ " where p.patient_id = t.patient_id and p.patient_id = b.patient_id and CONCAT(  p.f_name,' ',p.m_name,' ',p.l_name) LIKE '%"
							+ patientName
							+ "%' and t.treatment_id = (select "
							+ " max(t2.treatment_id) from ehat_treatment t2 where t2.patient_id = p.patient_id) group by p.patient_id limit 100";

				}
				else if (callFrom.equalsIgnoreCase("3")){
					sql = "select p.patient_id, p.f_name AS patient_name ,p.m_name AS mn, p.l_name AS lm ,t.treatment_id, t.department_id,p.mobile,p.address from pharma_patient_sales_bill_master pm left join ehat_treatment t on  t.treatment_id= pm.patient_sale_treatmentId left join  ehat_patient p on  p.patient_id = t.patient_id   where t.deleted = 'N' and pm.patient_sales_bill_id="+patientName+" ";

				}
				else if (callFrom.equalsIgnoreCase("null")){
					sql = " select  p.f_name as patient_name,p.m_name as mn,p.l_name as lm,p.patient_id,t.treatment_id,t.department_id,p.mobile,p.address from "
							+ "ehat_patient p,ehat_treatment t, ehat_bill_master b "
							+ " where p.patient_id = t.patient_id and p.patient_id = b.patient_id and CONCAT(  p.f_name,' ',p.m_name,' ',p.l_name) LIKE '%"
							+ patientName
							+ "%' and t.treatment_id = (select "
							+ " max(t2.treatment_id) from ehat_treatment t2 where t2.patient_id = p.patient_id) group by p.patient_id limit 100";

				}

				SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				sqlQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> master = sqlQuery1.list();		          
			    for(Map<String, Object> row : master){
			    	RegTreBillDto obj = new RegTreBillDto();
			    	obj.setPatientId((Integer)row.get("patient_id"));
			    	obj.setF_name((String)row.get("patient_name"));
			    	obj.setM_name((String)row.get("mn"));
			    	obj.setL_name((String)row.get("lm"));
			    	obj.setTreatmentId((Integer)row.get("treatment_id"));
			    	obj.setDepartmentId((Integer)row.get("department_id"));
			    	obj.setMobile((String)row.get("mobile"));
			    	obj.setAddress((String)row.get("address"));
			    	ltUsersDTOs.add(obj);
			    }
			    	
			    	//return ltUsersDTOs;

				System.err.println(sql);
			   }
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return ltUsersDTOs;
		
	
	}
	@Override
	public List<DoctorDto> fetchDoctorList(String doctorType) {
		List<DoctorDto> list = new ArrayList<DoctorDto>();
		try {
			Query query = null;
			query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_doctor_list_by_type(:doctorType)");
			query.setParameter("doctorType", doctorType);
			query.setResultTransformer(Transformers.aliasToBean(DoctorDto.class));
			list = query.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@Override
	@Transactional
	public String getPendingAmountByTreatmentIdPatientSale(Integer treatmentId, Integer spId) {

		String amount = "";

		double patientPaid = 0.0;
		double pharmaPaid = 0.0;
		double pharmaReturn = 0.0;
		String sql3 = "SELECT ifnull(amount_receive,0) as amount_receive,ifnull(return_flag,'-') as hsp_return_flag FROM pharma_patient_amount_history where treatment_id="
				+ treatmentId;
		Query query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
		query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> list = query3.list();
		if (list.size() > 0) {

			for (Map<String, Object> row : list) {

				String hsp_flag = (String) row.get("hsp_return_flag");
				if (hsp_flag.equals("Y")) {

					pharmaPaid = pharmaPaid + (Double) row.get("amount_receive");
				} else {

					patientPaid = patientPaid + (Double) row.get("amount_receive");
				}
			}
		}

		String sqlRef = "select ifnull(sum(credit_note_net_amt), 0) from pharma_credit_note_master where credit_note_transaction_type=1 and credit_note_type='patientSale' and credit_note_treatmentId="
				+ treatmentId;
		Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
		pharmaReturn = (Double) refQuery.uniqueResult();

		/*
		 * String str =
		 * "select ifnull(sum(s.indent_sale_net_amt - s.indent_sale_amt_receive),0), ifnull(sum(s.indent_sale_net_amt),0) from    pharma_indent_sale_master s        inner join    pharma_indent_master m ON m.indent_id = s.indent_sale_indent_no        left join    pharma_credit_note_slave c ON c.credit_note_slave_indent_id = s.indent_sale_id where    m.indent_treatement_id ='"
		 * + treatmentId + "' and s.bill_Category_id='" + (spId == null ? 0 : spId) +
		 * "'";
		 */
		
		String str = "select ifnull(sum(s.patient_sales_bill_net_amt - s.patient_sales_bill_amount_received),0), ifnull(sum(s.patient_sales_bill_net_amt),0) from    pharma_patient_sales_bill_master s left join    pharma_credit_note_slave c ON c.credit_note_slave_patient_id = s.patient_sales_bill_id  where "
				+ " patient_sale_billing='N' and  s.patient_sale_treatmentId ='"
				+ treatmentId + "' and s.bill_Category_id='" + (spId == null ? 0 : spId) + "'";

		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(str);
		List<Object[]> rows = query1.list();
		for (Object[] o : rows) {

			double res = (((Double) o[0]) - patientPaid) + pharmaPaid;
			res = res - pharmaReturn;

			amount = ((o[0] == null) ? "0#" : "" + res + "#") + ((o[1] == null) ? "0" : "" + o[1]);
		}

		return amount;
	}
	
}

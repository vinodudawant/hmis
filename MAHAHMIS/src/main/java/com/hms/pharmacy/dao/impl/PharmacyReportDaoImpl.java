package com.hms.pharmacy.dao.impl;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ipdbill.dto.IpdGenFinalBillDTO;
import com.hms.pharmacy.dao.PharmacyReportDao;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.ReportCreditNoteDetails;
import com.hms.pharmacy.pojo.ReportData;
import com.hms.pharmacy.pojo.ReportIndentSaleDetails;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.pojo.VendorMaster;

@Repository
public class PharmacyReportDaoImpl implements PharmacyReportDao {
	
	@Autowired
	SessionFactory sessionFactory;
	
	static Logger log = Logger.getLogger(PharmacyReportDaoImpl.class.getName());
	
	@Override
	public List<VendorMaster> getSupplierListReport(String fromDate, String toDate) {
		log.info("In Pharmacy getSupplierListReport()");
		List<VendorMaster> listview = null;

		try {
			
			Query bet = sessionFactory.getCurrentSession().createQuery(
					"FROM VendorMaster AS c WHERE c.vendorDeleteFlag='0'  AND DATE_FORMAT(c.vendorAddDate, '%Y-%m-%d') BETWEEN :stDate AND :edDate");

			bet.setParameter("stDate", fromDate);
			bet.setParameter("edDate", toDate);
			listview = bet.list();

		} catch (Exception e) {
			e.printStackTrace();
			return listview;
		}
		return listview;
	}

	@Override
	public List<ProductMaster> getproductData(String fromDate, String toDate, int categoryId, int companyId,
			int productId) {
		log.info("In Pharmacy getproductData()");
		List<ProductMaster> listview = null;

		try {

			String hql = "FROM ProductMaster AS c WHERE c.productDeleteFlag='0'  ";
			if (productId > 0) {
				hql = hql + " AND productId= :productId";
			}
			if (companyId > 0) {
				hql = hql + " AND companyMaster.compId= :compId";
			}
			if (categoryId > 0) {
				hql = hql + " AND categoryMaster.catId= :catId";
			}
			if (!fromDate.equals("0") && !toDate.equals("0")) {
				hql = hql + " AND DATE_FORMAT(c.productAddDate, '%Y-%m-%d') BETWEEN :stDate AND :edDate ";
			}

			Query bet = sessionFactory.getCurrentSession().createQuery(hql);
			if (!fromDate.equals("0") && !toDate.equals("0")) {
				bet.setParameter("stDate", fromDate);
				bet.setParameter("edDate", toDate);
			}
			if (productId > 0) {
				bet.setParameter("productId", productId);

			}
			if (companyId > 0) {
				bet.setParameter("compId", companyId);

			}
			if (categoryId > 0) {
				bet.setParameter("catId", categoryId);

			}
			listview = bet.list();

		} catch (Exception e) {
			e.printStackTrace();
			return listview;
		}
		return listview;
	}

	@Override
	public List<ReportData> getpurchaseData(HttpServletRequest request, String fromDate, String toDate,
			int categoryId, int companyId, int productId, int vendortId, int unitId, String purtranstype) {
		SQLQuery query = null;

		try {

			String str = "select master.pur_id as pur_id,master.pur_trans_type as pur_trans_type,master.pur_bill_no as pur_bill_no,master.pur_bill_date  as pur_bill_date,batch.batch_code as batch_code,vendor.vendor_name as vendor_name,slave.pur_slave_qty as pur_slave_qty,slave.pur_slave_rate as pur_slave_rate,slave.pur_slave_amt as pur_slave_amt,master.pur_vat as pur_vat, produ.product_name  as product_name, batch.batch_exp_date as batch_exp_date,master.pur_less as pur_less,slave.pur_slave_bill_rate as pur_slave_bill_rate,slave.pur_slave_disc as pur_slave_disc,slave.pur_slave_vat as pur_slave_vat,master.pur_tax_vat12 AS igstAmtmaster,master.pur_tax_vat5 AS gstAmountmaster, master.pur_gross_amt AS billamt,master.pur_net_amt AS netbillamtwithgst,slave.pur_hsn as pur_hsn,slave.pur_slave_purchase_rate as pur_slave_purchase_rate,vendoradd.vendor_state as vendor_state,vendoradd.vendor_gstn as vendor_gstn  from pharma_purchase_slave slave  inner join pharma_purchase_master master on slave.pur_slave_master_id=master.pur_id inner join pharma_vendor_master vendor on vendor.vendor_id=master.pur_vendor_id inner join pharma_batch_master batch on batch.batch_id=slave.pur_slave_batch_id  "
					+ " inner join pharma_product_master produ ON  produ.product_id = slave.pur_slave_product_id inner join pharma_category_master cat ON cat.cat_id = produ.product_cat_id "
					+ " inner join pharma_company_master comp ON comp.comp_id = produ.product_comp_id INNER JOIN pharma_vendor_address vendoradd ON vendoradd.vAddrId = master.pur_vendor_add_id "
					+ " where  master.pur_delete_Flag='0' ";

			if (!fromDate.equals("0") && !toDate.equals("0")) {
				str = str + " and pur_bill_date between '" + fromDate + "' and '" + toDate + "' ";
			}

			if (productId > 0) {
				str = str + " and slave.pur_slave_product_id= " + productId;
			}
			if (vendortId > 0) {
				str = str + " and master.pur_vendor_id= " + vendortId;
			}

			if (unitId > 0) {
				str = str + " and master.unit_id= " + unitId;
			}

			if (categoryId > 0) {
				str = str + " and cat.cat_id= " + categoryId;
			}

			if (companyId > 0) {
				str = str + " and comp.comp_id= " + companyId;
			}

			if (!purtranstype.equals("3")) {
				str = str + " and  master.pur_trans_type= " + purtranstype;
			}

			str += " order by master.pur_id";

			query = sessionFactory.getCurrentSession().createSQLQuery(str);
			
			query.setResultTransformer(new AliasToBeanResultTransformer(ReportPurchase.class));
			@SuppressWarnings("unchecked")
			List<ReportData> lst = query.list();
			
			return lst;
			
		
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ReportData> getTotalPatientData(String from, String to) {
		List<ReportData> reportPurchases = new ArrayList<ReportData>();
		SQLQuery query = null;

		// patient sale
		try {
		/*	query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT patient_sales_bill_id as id,fName,mName,lName,netAmt,amtRec,vat55,vat12,vat0,billMode,amtBal,amtTime,patientDate, "
							+ " ifnull(sum(Taxable55),0) as Taxable55,ifnull(sum(Taxable12),0) as Taxable12,ifnull(sum(Taxable0),0) as Taxable0 FROM (SELECT p.f_Name as fName,p.m_Name as mName,p.l_Name as lName, "
							+ " master.patient_sales_bill_id as patient_sales_bill_id,master.patient_sales_bill_net_amt as netAmt,master.patient_sales_bill_amount_received as amtRec, "
							+ " master.patient_tax_vat6 as vat55,master.patient_tax_vat135 as vat12,master.patient_tax_vat0 as vat0,master.patient_bill_mode as billMode, "
							+ " master.patient_sales_bill_amount_balance as amtBal,master.patient_sale_for_time as amtTime,master.patient_bill_date as patientDate, "
							+ " IF(slave.patient_slave_vat = '6', (slave.patient_slave_amt-patient_slave_vatAmt), 0) as Taxable55,IF(slave.patient_slave_vat = '13.5', (slave.patient_slave_amt-patient_slave_vatAmt), 0) as Taxable12, "
							+ " IF(slave.patient_slave_vat = '0', (slave.patient_slave_amt-patient_slave_vatAmt), 0) as Taxable0 from pharma_patient_sales_bill_master master inner join ehat_patient p ON master.patient_bill_patient_id = p.patient_id "
							+ " inner join pharma_patient_sales_bill_slave slave ON master.patient_sales_bill_id = slave.patient_slave_bill_master_id where master.patient_bill_date between '"
							+ from + "' and '" + to
							+ "') pharma_patient_sales_bill_master group by patient_sales_bill_id");*/
			query = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_total_sale_patient_data_for_patient_sale(:unitId,:pfrom ,:pto);");
			query.setParameter("unitId", 1);
			query.setParameter("pfrom", from);
			query.setParameter("pto", to);
			System.out.println("patient--------" + query);

		
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> masterRow = query.list();		          
		    for(Map<String, Object> row : masterRow){
		    	
		    	ReportData obj = new ReportData();
		    	String id = "PS"+Integer.toString((Integer) row.get("id"));
		    	obj.setId(id);
		    	String PatientName = ((String) row.get("fName"))+ " "+ ((String) row.get("mName")) +" "+ ((String) row.get("lName"));
		    	obj.setPatientName(PatientName);
		    	obj.setNetAmt((Double) row.get("netAmt"));
		    	obj.setAmtRec((Double)row.get("amtRec"));
		    	obj.setTotalVat5((Double)row.get("vat55"));
		    	obj.setTotalVat12((Double)row.get("vat12"));
		    	obj.setTotalVat0((Double)row.get("vat0"));
		    	//obj.setBillMode((Integer)row.get("billMode"));
		    	obj.setAmtBal((Double)row.get("amtBal"));
		    	obj.setDate1((Timestamp)row.get("patientDate"));
		    	obj.setTaxable55((Double)row.get("Taxable55"));
		    	obj.setTaxable12((Double)row.get("Taxable12"));
		    	obj.setTaxable0((Double)row.get("Taxable0"));
				

					reportPurchases.add(obj);
				}
			

		} catch (Exception e) {
			e.printStackTrace();
		}

		// counter sale
		try {
			/*query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT counter_sale_id as id,pName,net,vat55,vat12,vat0,patientBillMode,patientTime,patientDate,ifnull(sum(Taxable55),0) as Taxable55,ifnull(sum(Taxable12),0) as Taxable12,ifnull(sum(Taxable0),0) as Taxable0"
							+ " FROM (SELECT master.counter_sale_id as counter_sale_id,master.counter_sale_patient_name as pName,master.counter_sale_net_amt as net,master.counter_tax_vat6 as vat55, "
							+ " master.counter_tax_vat135 as vat12,master.counter_tax_vat0 as vat0,master.counter_sale_trans_type as patientBillMode,master.counter_sale_for_time as patientTime,master.counter_sale_for_date as patientDate, "
							+ " IF(slave.counter_slave_vat = '6',(slave.counter_slave_amt-counter_slave_vatAmt),0) as Taxable55,IF(slave.counter_slave_vat = '13.5',(slave.counter_slave_amt-counter_slave_vatAmt),0) as Taxable12,IF(slave.counter_slave_vat = '0',(slave.counter_slave_amt-counter_slave_vatAmt),0) as Taxable0 "
							+ " from pharma_counter_sale_master master inner join pharma_counter_sale_slave slave ON master.counter_sale_id = slave.counter_slave_master_id  where "
							+ " master.counter_sale_for_date between '" + from + "' and '" + to
							+ "') pharma_counter_sale_master group by counter_sale_id");*/
			
			query = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_total_sale_patient_data_for_counter_sale(:unitId,:pfrom ,:pto);");
			query.setParameter("unitId", 1);
			query.setParameter("pfrom", from);
			query.setParameter("pto", to);
			
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> masterRow = query.list();		          
		    for(Map<String, Object> row : masterRow){
		    	
		    	ReportData obj = new ReportData();
		    	String id = "CS"+Integer.toString((Integer) row.get("id"));
		    	obj.setId(id);
		    	//String PatientName = ((String) row.get("fName"))+ " "+ ((String) row.get("mName")) +" "+ ((String) row.get("lName"));
		    	obj.setPatientName((String) row.get("pName"));
		    	obj.setNetAmt((Double) row.get("netAmt"));
		    	//obj.setAmtRec((Double)row.get("amtRec"));
		    	obj.setTotalVat5((Double)row.get("vat55"));
		    	obj.setTotalVat12((Double)row.get("vat12"));
		    	obj.setTotalVat0((Double)row.get("vat0"));
		    	obj.setBillMode((Integer)row.get("billMode"));
		    //	obj.setAmtBal((Double)row.get("amtBal"));
		    	obj.setDate1((Timestamp)row.get("patientDate"));
		    	obj.setTaxable55((Double)row.get("Taxable55"));
		    	obj.setTaxable12((Double)row.get("Taxable12"));
		    	obj.setTaxable0((Double)row.get("Taxable0"));
				

					reportPurchases.add(obj);
				
			}
		}

		catch (Exception e) {
			e.printStackTrace();
		}

		// indent sale
		try {
		/*	query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT indent_sale_id as id,fName,mName,lName,netAmt,amtRec,vat55,vat12,vat0,billMode,amtBal,patientTime,patientDate,ifnull(sum(Taxable55),0) as Taxable55,ifnull(sum(Taxable12),0) as Taxable12, "
							+ " ifnull(sum(Taxable0),0) as Taxable0  FROM (SELECT master.indent_sale_id as indent_sale_id,p.f_Name as fName,p.m_Name as mName,p.l_Name as lName,master.indent_sale_net_amt as netAmt,master.indent_sale_amt_receive as amtRec, "
							+ " master.indent_tax_vat6 as vat55,master.indent_tax_vat135 as vat12,master.indent_tax_vat0 as vat0,master.indent_bill_mode as billMode,master.indent_sale_amt_balance as amtBal, "
							+ " master.indent_sale_time as patientTime,master.indent_sale_received_date as patientDate,IF(slave.indent_slave_vat = '6',(slave.indent_sale_slave_amt-indent_slave_vatAmt),0) as Taxable55, "
							+ " IF(slave.indent_slave_vat = '13.5',(slave.indent_sale_slave_amt-indent_slave_vatAmt),0) as Taxable12,IF(slave.indent_slave_vat = '0',(slave.indent_sale_slave_amt-indent_slave_vatAmt),0) as Taxable0 "
							+ " from pharma_indent_sale_master master inner join pharma_indent_master indent ON master.indent_sale_indent_no = indent.indent_id inner join "
							+ " ehat_treatment t ON t.treatment_id = indent.indent_treatement_id inner join ehat_patient p ON p.patient_id = t.patient_id inner join pharma_indent_sale_slave slave ON slave.indent_sale_slave_master_id = master.indent_sale_id "
							+ " where master.indent_sale_received_date between '" + from + "' and '" + to
							+ "') pharma_indent_sale_master group by indent_sale_id");*/
			
			query = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_total_sale_patient_data_for_indent_sale(:unitId,:pfrom ,:pto);");
			query.setParameter("unitId", 1);
			query.setParameter("pfrom", from);
			query.setParameter("pto", to);

			System.out.println("indent----" + query);
			
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> masterRow = query.list();		          
		    for(Map<String, Object> row : masterRow){
		    	
		    	ReportData obj = new ReportData();
		    	String id = "IS"+Integer.toString((Integer) row.get("id"));
		    	obj.setId(id);
		    	String PatientName = ((String) row.get("fName"))+ " "+ ((String) row.get("mName")) +" "+ ((String) row.get("lName"));
		    	obj.setPatientName(PatientName);
		    	obj.setNetAmt((Double) row.get("netAmt"));
		    	obj.setAmtRec((Double)row.get("amtRec"));
		    	obj.setTotalVat5((Double)row.get("vat55"));
		    	obj.setTotalVat12((Double)row.get("vat12"));
		    	obj.setTotalVat0((Double)row.get("vat0"));
		    	obj.setBillMode((Integer)row.get("billMode"));
		    	obj.setAmtBal((Double)row.get("amtBal"));
		    	obj.setDate1((Timestamp)row.get("patientDate"));
		    	obj.setTaxable55((Double)row.get("Taxable55"));
		    	obj.setTaxable12((Double)row.get("Taxable12"));
		    	obj.setTaxable0((Double)row.get("Taxable0"));
				

					reportPurchases.add(obj);
			
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportData> getCancelIndentDetails(String from, String to) {

		SQLQuery query = null;

		String debitNote = " SELECT indent_store_name,indent_time,indent_add_date,indent_comment,user_name,indent_sale_deleted_time,indent_delete_date FROM pharma_indent_master indent  inner join users user on user.User_ID=indent.indent_deleted_by "
				+ " where indent_delete_flag = 1 and indent_generate_date between '" + from + "' and '" + to + "';";

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		try {
			
			query.setResultTransformer(new AliasToBeanResultTransformer(ReportData.class));
			@SuppressWarnings("unchecked")
			List<ReportData> lst = query.list();
			return lst;
		  
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public List<IpdGenFinalBillDTO> autoSuggestationGeneralBillPatients(String letter) {

		log.info("In IpdGenAndFinalBillDaoImpl autoSuggestationGeneralBillPatients()");
		Session s = sessionFactory.getCurrentSession();
		try {

			Query prefixSp = s.createSQLQuery(
					"call sp_view_ipd_bill_patients_auto_suggesstion(:unit_id,:patient_id,:patient_name,:mobile,:wardType,:wardName)");
	
				prefixSp.setParameter("wardType", null);
				prefixSp.setParameter("wardName", null);
				prefixSp.setParameter("unit_id", 1);
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", letter);
				prefixSp.setParameter("mobile", null);
			

			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(IpdGenFinalBillDTO.class));
			@SuppressWarnings("unchecked")
			List<IpdGenFinalBillDTO> ltIpdBillPatientsDTO = prefixSp.list();
			log.debug("Response--------> " + ltIpdBillPatientsDTO);
			return ltIpdBillPatientsDTO;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<ReportCreditNoteDetails> getPatientSaleDetailsByPatientId(Integer patientId, String from, String to) {
		Double total = 0.0;
		List<ReportCreditNoteDetails> creditNoteDetails = new ArrayList<ReportCreditNoteDetails>();
		SQLQuery query = null;

		String debitNote = " SELECT     patient_sales_bill_id,   DATE_FORMAT( patient_bill_date,  '%d/%m/%Y') patient_bill_date,    patient_bill_mode,    patient_sales_bill_net_amt,    patient_sales_bill_amount_received, "
				+ "   patient_type,    concat(p.f_name, ' ', p.m_name, ' ', p.l_name) as patient_name , p.address,p.mobile,if(bill_Category_id=0,'Self', 'Sponser') category_name  FROM"
				+ "  pharma_patient_sales_bill_master        inner join    ehat_patient p ON patient_bill_patient_id = p.patient_id  "
				+ " where    patient_sales_bill_delete_flag = 0  and patient_bill_patient_id=" + patientId
				+ " and patient_bill_date between '" + from + "' and '" + to + "'";

		System.err.println("debitNote---------" + debitNote);

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		try {

			List<Object[]> rows = query.list();

			for (Object[] row : rows) {

				ReportCreditNoteDetails productByBatch = new ReportCreditNoteDetails();

				if (row[0] != null)
					productByBatch.setCredtiNoteId(row[0].toString());
				else
					productByBatch.setCredtiNoteId("");

				if (row[0] != null)
					productByBatch.setCredtiNoteInvoiceNo("PS" + row[0].toString());
				else
					productByBatch.setCredtiNoteInvoiceNo("");

				if (row[1] != null)
					productByBatch.setDate(row[1].toString());
				else
					productByBatch.setDate("");

				if (row[2] != null) {
					if ((row[2].toString()).equals("0"))
						productByBatch.setBillMode("Cash");
					else
						productByBatch.setBillMode("Credit");
				} else
					productByBatch.setBillMode("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (row[4] != null) {
					total = total + Double.parseDouble(row[4].toString());
					productByBatch.setAmountReceive(row[4].toString());

				} else
					productByBatch.setAmountReceive("");

				if (row[5] != null)
					productByBatch.setPatientType(row[5].toString());
				else
					productByBatch.setPatientType("");

				if (row[6] != null)
					productByBatch.setPatientName(row[6].toString());
				else
					productByBatch.setPatientName("");
				
				if (row[7] != null)
					productByBatch.setAddress(row[7].toString());
				else
					productByBatch.setAddress("");
				
				if (row[8] != null)
					productByBatch.setMobile(row[8].toString());
				else
					productByBatch.setMobile("");
				
				if (row[9] != null)
					productByBatch.setCategory_name(row[9].toString());
				else
					productByBatch.setCategory_name("");


				DecimalFormat df = new DecimalFormat("###.##");

				productByBatch.setTotal(Double.parseDouble(total.toString()));

				creditNoteDetails.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return creditNoteDetails;
	}

	@Override
	public List<ReportCreditNoteDetails> getSettleBillDetailsByPatientId(Integer patientId, String from, String to) {
		System.out.println("from>>>>" + from + " " + "To>>>>" + to);
		List<ReportCreditNoteDetails> creditNoteDetails = new ArrayList<ReportCreditNoteDetails>();
		SQLQuery query = null;
		ReportCreditNoteDetails productByBatch = new ReportCreditNoteDetails();
		String debitNote = "SELECT idpharma_patient_amount_history_id,amount_balance,amount_receive,discount,final_date, t.treatment_id , master.patient_sales_bill_net_amt FROM pharma_patient_amount_history amount "
				+ " inner join ehat_treatment t on t.treatment_id=amount.treatment_id inner join ehat_patient p on p.patient_id=t.patient_id     Left Join  pharma_patient_sales_bill_master master ON master.patient_sales_bill_id = amount.patient_sale_bill_master_id   where p.patient_id="
				+ patientId + "  and " + " final_date between  '" + from + "' and '" + to + "'";

		System.err.println("settle bill---------" + debitNote);
		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		List<PurchaseSlave> purchaseSlaves = new ArrayList<PurchaseSlave>();
		try {

			List<Object[]> slaveResults = query.list();
			for (Object[] slaveResult : slaveResults) {
				PurchaseSlave purchaseSlave = new PurchaseSlave();

				if (slaveResult[0] != null) {
					String result1[] = slaveResult[0].toString().split("\\.");
					purchaseSlave.setPurSlaveQty(Integer.parseInt(result1[0]));
				}

				if (slaveResult[1] != null)
					purchaseSlave.setAmtBal((slaveResult[1].toString()));

				if (slaveResult[2] != null) {
					purchaseSlave.setAmtReceive((slaveResult[2].toString()));
				}

				if (slaveResult[3] != null)
					purchaseSlave.setDiscount((slaveResult[3].toString()));

				if (slaveResult[4] != null) {
					purchaseSlave.setFinalDate(slaveResult[4].toString());
				} 
				if (slaveResult[5] != null) {
					purchaseSlave.setTreatmentId((slaveResult[5].toString()));
				}
					if (slaveResult[6] != null) {
						purchaseSlave.setPatient_sales_bill_net_amt((slaveResult[6].toString()));
					}
				purchaseSlaves.add(purchaseSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		productByBatch.setPurchaseSlaves(purchaseSlaves);

		creditNoteDetails.add(productByBatch);

		return creditNoteDetails;
	}

	@Override
	public List<ReportIndentSaleDetails> getIndentSaleDetailsByPatientId(Integer patientId, String from, String to) {
		Double total = 0.0;
		List<ReportIndentSaleDetails> indentSaleDetails = new ArrayList<ReportIndentSaleDetails>();
		SQLQuery query = null;

		String debitNote = " SELECT master.indent_sale_id,date_format(master.indent_sale_received_date, '%d/%m/%Y') indent_sale_received_date,master.indent_bill_mode,master.indent_sale_net_amt,master.indent_sale_amt_receive ,  ifnull(credit.credit_note_net_amt,'0'), ifnull(credit.credit_note_payable,'0') "
				+ " FROM pharma_indent_sale_master master LEFT JOIN pharma_credit_note_master credit ON credit.credit_note_IndentSaleId = master.indent_sale_id inner join pharma_indent_master sale ON sale.indent_id = master.indent_sale_indent_no inner join "
				+ " ehat_treatment t ON t.treatment_id = sale.indent_treatement_id inner join ehat_patient p ON t.patient_id = p.patient_id where master.indent_sale_delete_flag = 0 "
				+ " and p.patient_id =" + patientId + " and master.indent_sale_received_date between '" + from
				+ "' and '" + to + "'";

		System.err.println(" indentSale bill---------" + debitNote);
		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		try {

			List<Object[]> rows = query.list();

			for (Object[] row : rows) {

				ReportIndentSaleDetails productByBatch = new ReportIndentSaleDetails();

				if (row[0] != null)
					productByBatch.setIndentSaleId(row[0].toString());
				else
					productByBatch.setIndentSaleId("");

				if (row[0] != null)
					productByBatch.setIndentSaleInvoiceNo("IS" + row[0].toString());
				else
					productByBatch.setIndentSaleInvoiceNo("");

				if (row[1] != null)
					productByBatch.setIndentDate(row[1].toString());
				else
					productByBatch.setIndentDate("");

				if (row[2] != null) {
					if ((row[2].toString()).equals("0"))
						productByBatch.setBillMode("Cash");
					else
						productByBatch.setBillMode("Credit");
				} else
					productByBatch.setBillMode("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (row[4] != null) {
					productByBatch.setAmountReceive(row[4].toString());
					total = total + Double.parseDouble(row[4].toString());
				}

				else
					productByBatch.setAmountReceive("");
				
				if (row[5] != null)
					productByBatch.setCreditNoteNetAmt(row[5].toString());
				else
					productByBatch.setCreditNoteNetAmt("");

				if (row[6] != null)
					productByBatch.setCreditNotePayable(row[6].toString());
				else
					productByBatch.setCreditNotePayable("");

				DecimalFormat df = new DecimalFormat("###.##");
				productByBatch.setTotal(Double.parseDouble(total.toString()));

				indentSaleDetails.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return indentSaleDetails;
	}

	@Override
	public List<ReportData> getProductWiseBatchList(Integer productId, String from, String to,
			String type) {

		List<ReportData> productWiseBatchSales = new ArrayList<ReportData>();
		SQLQuery query = null;
		String counterSaleAll = "SELECT distinct c_master.counter_sale_for_date, pm.product_name,c_master.counter_sale_patient_name,'0' as PatientId,c_master.counter_sale_id,c_slave.counter_slave_qty,batch.batch_code, rate.mrp,pm.product_uom_unit,cat.cat_name FROM pharma_counter_sale_slave c_slave inner join pharma_counter_sale_master c_master ON c_master.counter_sale_id = c_slave.counter_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.counter_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id INNER JOIN pharma_category_master cat ON cat.cat_id = pm.product_cat_id  where c_master.counter_sale_for_date between '"
				+ from
				+ "' and '"
				+ to
				+ "'" ;
		if(productId > 0) {
			counterSaleAll = counterSaleAll + "and pm.product_id = "+ productId;
					
		}
		String counterSale4Counter = "SELECT distinct(batch.batch_id), batch.batch_code, rate.mrp, rate.rate FROM pharma_counter_sale_slave c_slave inner join pharma_counter_sale_master c_master ON c_master.counter_sale_id = c_slave.counter_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.counter_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id where c_master.counter_sale_for_date between '"
				+ from
				+ "' and '"
				+ to
				+ "'";
		if(productId > 0) {
			counterSale4Counter = counterSale4Counter + " and pm.product_id = "+ productId;
					
		}
		String indentSale = "SELECT distinct c_master.indent_sale_received_date,pm.product_name,CONCAT(pa.f_name,' ',pa.m_name,' ',pa.l_name) AS pname,pa.patient_id,c_master.indent_sale_id,c_slave.indent_sale_slave_qty,batch.batch_code, rate.mrp,pm.product_uom_unit,cat.cat_name FROM pharma_indent_sale_slave c_slave inner join pharma_indent_sale_master c_master ON c_master.indent_sale_id = c_slave.indent_sale_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.indent_sale_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id "
				+ "INNER JOIN pharma_category_master cat ON cat.cat_id = pm.product_cat_id INNER JOIN pharma_indent_master im ON im.indent_id = c_master.indent_sale_indent_no INNER JOIN ehat_patient pa ON pa.patient_id = im.indent_patient_id where c_master.indent_sale_received_date between '"
				+ from
				+ "' and '"
				+ to
				+ "'";
		if(productId > 0) {
			indentSale = indentSale + " and pm.product_id = "+ productId;
					
		}
		String hospitalSale = "SELECT distinct(batch.batch_id), batch.batch_code, rate.mrp, rate.rate FROM pharma_hospital_bill_slave c_slave inner join pharma_hospital_bill_master c_master ON c_master.hospital_bill_id = c_slave.hospital_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.hospital_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id where c_master.hospital_bill_date between '"
				+ from
				+ "' and '"
				+ to
				+ "'";
	
		if(productId > 0) {
			hospitalSale = hospitalSale + " and pm.product_id = "+ productId;
					
		}
		String patientSale = "select     p.patient_bill_date,    pr.product_name,    concat(pa.f_name,            ' ',            pa.m_name,            ' ',            pa.l_name) as pname,    pa.patient_id,    p.patient_sales_bill_id,    s.patient_slave_qty,    s.patient_slave_batch_code,    s.patient_slave_mrp, pr.product_uom_unit,cat.cat_name from    pharma_patient_sales_bill_master p        inner join    pharma_patient_sales_bill_slave s ON p.patient_sales_bill_id = s.patient_slave_bill_master_id        inner join    pharma_product_master pr ON pr.product_id = s.patient_slave_product_id  INNER JOIN pharma_category_master cat ON cat.cat_id = pr.product_cat_id      inner join    ehat_patient pa ON pa.patient_id = p.patient_bill_patient_id where    p.patient_sales_bill_delete_flag = '0'        and p.patient_bill_date between '"
				+ from
				+ "' and '"
				+ to
				+ "'";
		if(productId > 0) {
			patientSale = patientSale + "and pr.product_id = "+ productId;
					
		}
		String allSale = "select     p.patient_bill_date,    pm.product_name,    concat(pa.f_name,            ' ',            pa.m_name,            ' ',            pa.l_name) as pname,    pa.patient_id,    CONCAT('PS-',p.patient_sales_bill_id) as BillId,    s.patient_slave_qty,    s.patient_slave_batch_code,    s.patient_slave_mrp,pm.product_uom_unit, cat.cat_name from    pharma_patient_sales_bill_master p        inner join    pharma_patient_sales_bill_slave s ON p.patient_sales_bill_id = s.patient_slave_bill_master_id        inner join    pharma_product_master pm ON pm.product_id = s.patient_slave_product_id INNER JOIN pharma_category_master cat ON cat.cat_id = pm.product_cat_id        inner join    ehat_patient pa ON pa.patient_id = p.patient_bill_patient_id where    p.patient_sales_bill_delete_flag = '0'        and p.patient_bill_date between '"
				+ from
				+ "' and '"
				+ to
				//+ "' and pr.product_id='"
				//+ productId
				+ "' Union " 
				+ " SELECT distinct c_master.indent_sale_received_date,pm.product_name,CONCAT(pa.f_name,' ',pa.m_name,' ',pa.l_name) AS pname,pa.patient_id,CONCAT('IS-',c_master.indent_sale_id) as BillId,c_slave.indent_sale_slave_qty,batch.batch_code, rate.mrp,pm.product_uom_unit, cat.cat_name FROM pharma_indent_sale_slave c_slave inner join pharma_indent_sale_master c_master ON c_master.indent_sale_id = c_slave.indent_sale_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.indent_sale_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id  INNER JOIN pharma_category_master cat ON cat.cat_id = pm.product_cat_id"
				+ " INNER JOIN pharma_indent_master im ON im.indent_id = c_master.indent_sale_indent_no INNER JOIN ehat_patient pa ON pa.patient_id = im.indent_patient_id where c_master.indent_sale_received_date between '"
				+ from
				+ "' and '"
				+ to
				//+ "' and pm.product_id = '"
				//+ productId
				+ "' Union "
				+ " SELECT distinct c_master.counter_sale_for_date, pm.product_name,c_master.counter_sale_patient_name,'0' as PatientId,CONCAT('CS-',c_master.counter_sale_id) as BillId,c_slave.counter_slave_qty,batch.batch_code, rate.mrp, pm.product_uom_unit, cat.cat_name FROM pharma_counter_sale_slave c_slave inner join pharma_counter_sale_master c_master ON c_master.counter_sale_id = c_slave.counter_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.counter_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id INNER JOIN pharma_category_master cat ON cat.cat_id = pm.product_cat_id where c_master.counter_sale_for_date between '"
				+ from
				+ "' and '"
				+ to
				+ "'";
		
		if(productId > 0) {
			allSale = allSale + "and pm.product_id = "+ productId ;
					
		}
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						counterSaleAll);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						hospitalSale);
			} else if (type.equals("counterSale4Counter")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						counterSale4Counter);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						patientSale);
			}else if (type.equals("all")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						allSale);
			}
			
			System.err.println("query-----------"+query);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportData productByBatch = new ReportData();

				if (row[0] != null)
					productByBatch.setDate(row[0].toString());
				else
					productByBatch.setDate("");

				if (row[1] != null)
					productByBatch.setProductName(row[1].toString());
				else
					productByBatch.setProductName("");

				if (row[2] != null)
					productByBatch.setPatientName(row[2].toString());
				else
					productByBatch.setPatientName("");

				if (row[3] != null)
					productByBatch.setPatientId(row[3].toString());
				else
					productByBatch.setPatientId("");
				
				if (row[4] != null)
					if (type.equals("counterSale")) {
					   productByBatch.setBatchId("CS-"+row[4].toString());
					}else if (type.equals("indentSale")) {
					   productByBatch.setBatchId("IS-"+row[4].toString());
					}else if (type.equals("patientSale")) {
						productByBatch.setBatchId("PS-"+row[4].toString());
					}else if (type.equals("all")) {
						productByBatch.setBatchId(row[4].toString());
					}
				else
					productByBatch.setBatchId("");

				if (row[5] != null)
					productByBatch.setQty(row[5].toString());
				else
					productByBatch.setQty("");
				
				if (row[6] != null)
					productByBatch.setBatchCode(row[6].toString());
				else
					productByBatch.setBatchCode("");

				if (row[7] != null)
					productByBatch.setMrp(row[7].toString());
				else
					productByBatch.setMrp("");
				if (row[8] != null)
					productByBatch.setUnit(row[8].toString());
				else
					productByBatch.setUnit("");
				if (row[9] != null)
					productByBatch.setCategoryName(row[9].toString());
				else
					productByBatch.setCategoryName("");
				
				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

}


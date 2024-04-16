package com.hms.pharmacy.dao.impl;

import java.io.IOException;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.DistrictwisePatientCountDTO;
import com.hms.dto.DoctorList;
import com.hms.dto.Users;
import com.hms.ehat.dto.WardWiseDetaisDto;
import com.hms.pharmacy.dao.ReportDao;
import com.hms.pharmacy.pojo.CashReceiptReport;
import com.hms.pharmacy.pojo.ChequePaidReceiptReport;
import com.hms.pharmacy.pojo.ChequeReceiptReport;
import com.hms.pharmacy.pojo.CreditNoteDetailsReportDTO;
import com.hms.pharmacy.pojo.CreditNoteSlave;
import com.hms.pharmacy.pojo.DebitNoteData;
import com.hms.pharmacy.pojo.DebitNoteSlave;
import com.hms.pharmacy.pojo.GstDto;
import com.hms.pharmacy.pojo.MrnReportDetail;
import com.hms.pharmacy.pojo.PaidReceiptReport;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.ReportCreditNoteDetails;
import com.hms.pharmacy.pojo.ReportDebitNote;
import com.hms.pharmacy.pojo.ReportExpiry;
import com.hms.pharmacy.pojo.ReportIndentSaleDetails;
import com.hms.pharmacy.pojo.ReportList;
import com.hms.pharmacy.pojo.ReportMIS;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.pojo.ReportStock;
import com.hms.pharmacy.pojo.ReportStock2;
import com.hms.pharmacy.pojo.ReportVat;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.TaxService;
//import com.mysql.jdbc.PreparedStatement.ParseInfo;

import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;

@Repository
public class ReportDaoImpl implements ReportDao {

	@Autowired
	SessionFactory sessionFactory;
	static Logger log = Logger.getLogger(ReportDaoImpl.class.getName());
	private List<ReportStock> reportExpiriesData;
	 XSSFWorkbook workbook;
	 XSSFSheet sheet;
	 
	 String pdfPath = null;

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_hh.mm.ss");
		java.util.Calendar currentDate = null;
		String todays_date = null;

		private void initializeDate() {
			currentDate = java.util.Calendar.getInstance();
			todays_date = dateFormat.format(currentDate.getTime());
		} 
	 
	@Override
	public List<ReportProductWiseBatchSale> getPartyWiseProductSaleList(String from, String to, String type) {

		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();
		// SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt, c_master.counter_sale_for_time from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave c_slave on  c_slave.counter_slave_master_id=c_master.counter_sale_id where c_master.counter_sale_for_date='"
					+ from
					+ "' and counter_slave_No between '1' and '4' order by c_master.counter_sale_for_date desc, c_master.counter_sale_for_time desc";
		} else {
			counterSale = "select c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,c_master.counter_sale_for_date,c_master.counter_sale_trans_type, c_master.counter_sale_for_time from pharma_counter_sale_master c_master where c_master.counter_sale_for_date='"
					+ from
					+ "' and counter_sale_delete_flag=0 order by c_master.counter_sale_for_date desc, c_master.counter_sale_for_time desc";
		}

		String indentSale = "select     c_master.indent_sale_id,    pat.f_name,    pat.address,    c_master.indent_sale_net_amt,    pat.m_name,    pat.l_name,    c_master.indent_sale_received_date,    c_master.indent_bill_mode,    c_master.indent_sale_amt_receive,    c_master.indent_sale_amt_balance, pat.patient_id, c_master.indent_sale_time , IF(bill_Category_id = 0,'Self','Sponser') AS category_name  from    pharma_indent_sale_master c_master        inner join    pharma_indent_master indent_m ON indent_m.indent_id = c_master.indent_sale_indent_no        inner join    ehat_treatment t ON t.treatment_id = indent_m.indent_treatement_id        inner join    ehat_patient pat ON pat.patient_id = t.patient_id where c_master.indent_sale_received_date ='"
				+ from
				+ "'  and indent_sale_delete_flag=0 order by c_master.indent_sale_received_date desc, c_master.indent_sale_time desc";
		String hospitalSale = "select c_master.hospital_bill_id,c_master.hospital_bill_patient_name,p.addressLine1,c_master.hospital_bill_net_amt,c_master.hospital_bill_date from  pharma_hospital_bill_master c_master inner join patient p on p.Patient_ID=c_master.hospital_bill_patient_id where c_master.hospital_bill_date = '"
				+ from + "'";

		/*
		 * String patientSale =
		 * "select     p_master.patient_sales_bill_id,    p1.f_name,    p1.address,    p_master.patient_sales_bill_net_amt,    p1.m_name,    p1.l_name,    p_master.patient_bill_date,    p_master.patient_bill_mode,    p_master.patient_sales_bill_amount_received,    p_master.patient_sales_bill_amount_balance,    cat.category_name,    p1.patient_id,    cat.id_category_master, p_master.patient_sale_for_time from    pharma_patient_sales_bill_master p_master        inner join    ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id        left join    ehat_bill_discount_category_master cat ON cat.id_category_master = p_master.bill_Category_id where  p_master.patient_bill_date between '"
		 * + from + "' and '" + to +
		 * "' and p_master.patient_sales_bill_delete_flag=0 order by p_master.patient_bill_date desc , p_master.patient_sale_for_time desc"
		 * ;
		 */
		
//		remove bill_category_master table
		String patientSale = "select     p_master.patient_sales_bill_id,    p1.f_name,    p1.address,    p_master.patient_sales_bill_net_amt,    p1.m_name,    p1.l_name,    p_master.patient_bill_date,    p_master.patient_bill_mode,    p_master.patient_sales_bill_amount_received,    p_master.patient_sales_bill_amount_balance,   IF(bill_Category_id=0, 'Self', 'Sponser') as category_name,    p1.patient_id,    p_master.bill_Category_id, p_master.patient_sale_for_time from    pharma_patient_sales_bill_master p_master        inner join    ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id    where  p_master.patient_bill_date between '"
				+ from + "' and '" + to
				+ "' and p_master.patient_sales_bill_delete_flag=0 order by p_master.patient_bill_date desc , p_master.patient_sale_for_time desc";

		
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);
			} else /* if (type.equals("patientSale")) */ {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
			}

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				/*
				 * if (row[0] != null) productByBatch.setVouNo(row[0].toString()); else
				 * productByBatch.setVouNo("");
				 */
				
				if (row[1] != null)
					productByBatch.setPatientName(row[1].toString());
				else
					productByBatch.setPatientName("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (type.equals("counterSale")) {

					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());

					if (row[4] != null) {
						String str[] = row[4].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer = new StringBuffer();
						stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer.toString());
					}

					if (row[5] != null) {
						if (row[5].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[5].toString().equals("1"))
							productByBatch.setTransType("Cash/Credit");
						else if (row[5].toString().equals("2"))
							productByBatch.setTransType("Card");
						else
							productByBatch.setTransType("Cheque");
					}
                       
					if (row[6] != null)
						productByBatch.setPatientSaleTime(row[6].toString());
					else
						productByBatch.setPatientSaleTime("");
					
					productByBatch.setAmtReceive(row[3].toString());

					productByBatch.setAmtBalance("0");

					productByBatch.setCurrentAmtBal("0");

				} else if (type.equals("indentSale")) {

					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(row[1].toString() + " " + row[4].toString() + " " + row[5].toString());
					productByBatch.setPatientName(stringBuffer.toString());

					productByBatch.setType("indentSale");
					productByBatch.setVouNo("IS" + row[0].toString());

					if (row[6] != null) {
						String str[] = row[6].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					if (row[7] != null) {
						if (row[7].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[7].toString().equals("1"))
							productByBatch.setTransType("Credit");
						else
							productByBatch.setTransType("Cheque");
					}

					if (row[8] != null)
						productByBatch.setAmtReceive(row[8].toString());
					else
						productByBatch.setAmtReceive("");

					if (row[9] != null)
						productByBatch.setAmtBalance(row[9].toString());
					else
						productByBatch.setAmtBalance("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));

					productByBatch.setCurrentAmtBal(currentAmtBal.toString());

					if (row[10] != null)
						productByBatch.setPatientId(row[10].toString());
					else
						productByBatch.setPatientId("");
					
					if (row[11] != null)
						productByBatch.setPatientSaleTime(row[11].toString());
					else
						productByBatch.setPatientSaleTime("");
					if (row[12] != null)
						productByBatch.setRate(row[12].toString());
					else
						productByBatch.setRate("");

				} else if (type.equals("hospitalSale")) {

					productByBatch.setType("hospitalSale");
					productByBatch.setVouNo("HS" + row[0].toString());

					if (row[4] != null) {
						String str[] = row[4].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}
					
					if (row[5] != null)
						productByBatch.setPatientSaleTime(row[5].toString());
					else
						productByBatch.setPatientSaleTime("");

					productByBatch.setTransType("");

					productByBatch.setAmtReceive(row[3].toString());

					productByBatch.setAmtBalance("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));

					productByBatch.setCurrentAmtBal(currentAmtBal.toString());
				}

				else if (type.equals("patientSale")) {

					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(row[1].toString() + " " + row[4].toString() + " " + row[5].toString());
					productByBatch.setPatientName(stringBuffer.toString());

					productByBatch.setType("patientSale");
					productByBatch.setVouNo("PS" + row[0].toString());

					if (row[6] != null) {
						String str[] = row[6].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					if (row[7] != null) {
						if (row[7].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[7].toString().equals("1"))
							productByBatch.setTransType("Credit");
						else
							productByBatch.setTransType("Cheque");
					}

					if (row[8] != null)
						productByBatch.setAmtReceive(row[8].toString());
					else
						productByBatch.setAmtReceive("");

					if (row[9] != null)
						productByBatch.setAmtBalance(row[9].toString());
					else
						productByBatch.setAmtBalance("");

					if (row[10] != null)
						productByBatch.setRate(row[10].toString());
					else
						productByBatch.setRate("");

					if (row[11] != null)
						productByBatch.setPatientId(row[11].toString());
					else
						productByBatch.setPatientId("");

					if (row[12] != null)
						productByBatch.setVendorId(row[12].toString());
					else
						productByBatch.setVendorId("");

					if (row[13] != null)
						productByBatch.setPatientSaleTime(row[13].toString());
					else
						productByBatch.setPatientSaleTime("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));

					productByBatch.setCurrentAmtBal(currentAmtBal.toString());
				}

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getPartyWiseProductSaleListStorewise(String from, String type,
			String StoreName) {

		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave c_slave on  c_slave.counter_slave_master_id=c_master.counter_sale_id where c_master.counter_sale_for_date='"
					+ from + "' and counter_slave_No between '1' and '4'";
		} else {
			counterSale = "select c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,c_master.counter_sale_for_date,c_master.counter_sale_trans_type from pharma_counter_sale_master c_master  inner join pharma_sub_store_master subStore on c_master.counter_sale_store_id=subStore.store_id "
					+ " where c_master.counter_sale_for_date = '" + from + "' and subStore.store_name='" + StoreName
					+ "' and counter_sale_delete_flag=0";
		}

		String indentSale = "select c_master.indent_sale_id,pat.f_name,pat.address,c_master.indent_sale_net_amt,pat.m_name,pat.l_name,c_master.indent_sale_received_date,c_master.indent_bill_mode,c_master.indent_sale_amt_receive,c_master.indent_sale_amt_balance "
				+ " from pharma_indent_sale_master c_master inner join pharma_indent_master indent_m ON indent_m.indent_id = c_master.indent_sale_indent_no "
				+ " inner join ehat_treatment t ON t.Treatment_ID = indent_m.indent_treatement_id inner join ehat_patient pat ON pat.Patient_ID = t.Patient_ID inner join "
				+ " pharma_sub_store_master subStore on c_master.indent_sale_store_id=subStore.store_id where c_master.indent_sale_received_date ='"
				+ from + "' and subStore.store_name='" + StoreName + "' and indent_sale_delete_flag = 0 ";

		String hospitalSale = "select c_master.hospital_bill_id,c_master.hospital_bill_patient_name,p.addressLine1,c_master.hospital_bill_net_amt,c_master.hospital_bill_date from  pharma_hospital_bill_master c_master inner join patient p on p.Patient_ID=c_master.hospital_bill_patient_id where c_master.hospital_bill_date = '"
				+ from + "'";

		String patientSale = "select p_master.patient_sales_bill_id,p1.f_name,p1.address,p_master.patient_sales_bill_net_amt,p1.m_name,p1.l_name,p_master.patient_bill_date,p_master.patient_bill_mode,p_master.patient_sales_bill_amount_received, "
				+ " p_master.patient_sales_bill_amount_balance from pharma_patient_sales_bill_master p_master inner join ehat_patient p1 ON p1.Patient_ID = p_master.patient_bill_patient_id inner join pharma_sub_store_master subStore on p_master.patient_sale_store_id=subStore.store_id "
				+ " where p_master.patient_bill_date = '" + from + "' and subStore.store_name='" + StoreName
				+ "' and p_master.patient_sales_bill_delete_flag = 0";

		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				/*
				 * if (row[0] != null) productByBatch.setVouNo(row[0].toString()); else
				 * productByBatch.setVouNo("");
				 */

				if (row[1] != null)
					productByBatch.setPatientName(row[1].toString());
				else
					productByBatch.setPatientName("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (type.equals("counterSale")) {

					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());

					if (row[4] != null) {
						String str[] = row[4].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer = new StringBuffer();
						stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer.toString());
					}

					if (row[5] != null) {
						if (row[5].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[5].toString().equals("1"))
							productByBatch.setTransType("Cash/Credit");
						else if (row[5].toString().equals("2"))
							productByBatch.setTransType("Card");
						else
							productByBatch.setTransType("Cheque");
					}

					productByBatch.setAmtReceive(row[3].toString());

					productByBatch.setAmtBalance("0");

					productByBatch.setCurrentAmtBal("0");

				} else if (type.equals("indentSale")) {

					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(row[1].toString() + " " + row[4].toString() + " " + row[5].toString());
					productByBatch.setPatientName(stringBuffer.toString());

					productByBatch.setType("indentSale");
					productByBatch.setVouNo("IS" + row[0].toString());

					if (row[6] != null) {
						String str[] = row[6].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					if (row[7] != null) {
						if (row[7].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[7].toString().equals("1"))
							productByBatch.setTransType("Credit");
						else
							productByBatch.setTransType("Cheque");
					}

					if (row[8] != null)
						productByBatch.setAmtReceive(row[8].toString());
					else
						productByBatch.setAmtReceive("");

					if (row[9] != null)
						productByBatch.setAmtBalance(row[9].toString());
					else
						productByBatch.setAmtBalance("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));

					productByBatch.setCurrentAmtBal(currentAmtBal.toString());

				} else if (type.equals("hospitalSale")) {

					productByBatch.setType("hospitalSale");
					productByBatch.setVouNo("HS" + row[0].toString());

					if (row[4] != null) {
						String str[] = row[4].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					productByBatch.setTransType("");

					productByBatch.setAmtReceive(row[3].toString());

					productByBatch.setAmtBalance("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));

					productByBatch.setCurrentAmtBal(currentAmtBal.toString());
				}

				else if (type.equals("patientSale")) {

					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(row[1].toString() + " " + row[4].toString() + " " + row[5].toString());
					productByBatch.setPatientName(stringBuffer.toString());

					productByBatch.setType("patientSale");
					productByBatch.setVouNo("PS" + row[0].toString());

					if (row[6] != null) {
						String str[] = row[6].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					if (row[7] != null) {
						if (row[7].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[7].toString().equals("1"))
							productByBatch.setTransType("Credit");
						else
							productByBatch.setTransType("Cheque");
					}

					if (row[8] != null)
						productByBatch.setAmtReceive(row[8].toString());
					else
						productByBatch.setAmtReceive("");

					if (row[9] != null)
						productByBatch.setAmtBalance(row[9].toString());
					else
						productByBatch.setAmtBalance("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));

					productByBatch.setCurrentAmtBal(currentAmtBal.toString());
				}

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getTotalSaleData(String from, String to, String type) {

		float BillAmt = 0.0f;
		float total_Cash = 0.0f;
		float pharmacy_paid_amount = 0.0f;

		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave c_slave on  c_slave.counter_slave_master_id=c_master.counter_sale_id where c_master.counter_sale_for_date between '"
					+ from + "' and '" + to + "' and counter_slave_No between '1' and '4'";
		} else {
			counterSale = "select c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,c_master.counter_sale_for_date,c_master.counter_sale_trans_type,c_master.counter_sale_for_time from pharma_counter_sale_master c_master where c_master.counter_sale_for_date between '"
					+ from + "' and '" + to
					+ "' and counter_sale_delete_flag=0 order by c_master.counter_sale_for_date desc,c_master.counter_sale_for_time desc";
		}

		// Indent sale Query
		// Modified By BILAL
		String indentSale = "select c_master.indent_sale_id,pat.f_name,pat.address,c_master.indent_sale_net_amt,pat.m_name,pat.l_name,c_master.indent_sale_received_date,c_master.indent_bill_mode,c_master.indent_sale_amt_receive,c_master.indent_sale_amt_balance,c_master.indent_sale_time  from pharma_indent_sale_master c_master inner join pharma_indent_master indent_m on indent_m.indent_id=c_master.indent_sale_indent_no inner join ehat_treatment t on t.treatment_id=indent_m.indent_treatement_id inner join ehat_patient pat on pat.patient_id=t.patient_id where c_master.indent_sale_received_date between '"
				+ from + "' and '" + to
				+ "' and indent_sale_delete_flag=0 order by c_master.indent_sale_received_date desc,c_master.indent_sale_time desc";

		// hospital Sale Query
		// Modified By BILAL
		String hospitalSale = "select c_master.hospital_bill_id,c_master.hospital_bill_patient_name,p.address,c_master.hospital_bill_net_amt,c_master.hospital_bill_date from  pharma_hospital_bill_master c_master inner join ehat_patient p on p.patient_id=c_master.hospital_bill_patient_id where c_master.hospital_bill_date between '"
				+ from + "' and '" + to + "' order by c_master.hospital_bill_date desc";

		// patient Sale Query
		// Modified By BILAL
		/*
		 * String patientSale =
		 * "select p_master.patient_Sales_bill_id,p1.f_name,p1.address,p_master.patient_sales_bill_net_amt,p1.m_name,p1.l_name,p_master.patient_bill_date,p_master.patient_bill_mode,p_master.patient_sales_bill_amount_received,p_master.patient_sales_bill_amount_balance*1 patient_sales_bill_amount_balance,cat.category_name,p_master.patient_bill_patient_id from pharma_patient_sales_bill_master p_master inner join ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id left join ehat_bill_discount_category_master cat ON cat.id_category_master = p_master.bill_Category_id where p_master.patient_bill_date between '"
		 * + from + "' and '" + to + "' and p_master.patient_sales_bill_delete_flag=0 ";
		 */

		
		/*
		 * String patientSale =
		 * "select p_master.patient_Sales_bill_id,p1.f_name,p1.address,p_master.patient_sales_bill_net_amt,p1.m_name,p1.l_name,p_master.patient_bill_date,p_master.patient_bill_mode,p_master.patient_sales_bill_amount_received,p_master.patient_sales_bill_amount_balance*1 patient_sales_bill_amount_balance,cat.category_name,p_master.patient_bill_patient_id, (select sum((((((p_slave.patient_slave_amt - p_slave.patient_slave_vatAmt) - (((p_slave.patient_slave_amt - p_slave.patient_slave_vatAmt) * ifnull(p_master.patient_sales_bill_cd, 0)) / 100)) * p_slave.patient_slave_vat) / 100)) + (((p_slave.patient_slave_amt - p_slave.patient_slave_vatAmt) - (((p_slave.patient_slave_amt - p_slave.patient_slave_vatAmt) * p_master.patient_sales_bill_cd) / 100)))) from pharma_patient_sales_bill_slave p_slave where p_slave.patient_slave_bill_master_id = p_master.patient_sales_bill_id group by p_master.patient_Sales_bill_id) as finalBill, p_master.patient_sale_for_time from pharma_patient_sales_bill_master p_master inner join ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id left join ehat_bill_discount_category_master cat ON cat.id_category_master = p_master.bill_Category_id where p_master.patient_bill_date between '"
		 * + from + "' and '" + to +
		 * "' and p_master.patient_sales_bill_delete_flag=0 order by p_master.patient_bill_date desc,p_master.patient_sale_for_time desc "
		 * ;
		 */
		 
		//add condition category name in below query table doesnt exists
		  String patientSale =
				  "select p_master.patient_Sales_bill_id,p1.f_name,p1.address,p_master.patient_sales_bill_net_amt,p1.m_name,p1.l_name,p_master.patient_bill_date,p_master.patient_bill_mode,p_master.patient_sales_bill_amount_received,p_master.patient_sales_bill_amount_balance*1 patient_sales_bill_amount_balance,IF(p_master.bill_Category_id=0, 'Self', 'Sponser') as category_name,p_master.patient_bill_patient_id, (select sum((((((p_slave.patient_slave_amt - p_slave.patient_slave_vatAmt) - (((p_slave.patient_slave_amt - p_slave.patient_slave_vatAmt) * ifnull(p_master.patient_sales_bill_cd, 0)) / 100)) * p_slave.patient_slave_vat) / 100)) + (((p_slave.patient_slave_amt - p_slave.patient_slave_vatAmt) - (((p_slave.patient_slave_amt - p_slave.patient_slave_vatAmt) * p_master.patient_sales_bill_cd) / 100)))) from pharma_patient_sales_bill_slave p_slave where p_slave.patient_slave_bill_master_id = p_master.patient_sales_bill_id group by p_master.patient_Sales_bill_id) as finalBill, p_master.patient_sale_for_time from pharma_patient_sales_bill_master p_master inner join ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id  where p_master.patient_bill_date between '"
				  + from + "' and '" + to +
				  "' and p_master.patient_sales_bill_delete_flag=0 order by p_master.patient_bill_date desc,p_master.patient_sale_for_time desc "
				  ;
			
		System.err.println("patientSale========" + patientSale);
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				/*
				 * if (row[0] != null) productByBatch.setVouNo(row[0].toString()); else
				 * productByBatch.setVouNo("");
				 */

				if (row[1] != null)
					productByBatch.setPatientName(row[1].toString());
				else
					productByBatch.setPatientName("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());

					if (row[4] != null) {
						String str[] = row[4].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer = new StringBuffer();
						stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer.toString());
					}

					if (row[5] != null) {
						if (row[5].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[5].toString().equals("1"))
							productByBatch.setTransType("Cash/Credit");
						else if (row[5].toString().equals("2"))
							productByBatch.setTransType("Card");
						else
							productByBatch.setTransType("Cheque");
					}

					productByBatch.setAmtReceive(row[3].toString());
					productByBatch.setAmtBalance("0");

					productByBatch.setCurrentAmtBal("0");

					if (row[6] != null)
						productByBatch.setPatientSaleTime(row[6].toString());
					else
						productByBatch.setPatientSaleTime("");

				}

				else if (type.equals("indentSale")) {
					productByBatch.setType("indentSale");
					productByBatch.setVouNo("IS" + row[0].toString());

					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(row[1].toString() + " " + row[4].toString() + " " + row[5].toString());
					productByBatch.setPatientName(stringBuffer.toString());

					if (row[6] != null) {
						String str[] = row[6].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					if (row[7] != null) {
						if (row[7].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[7].toString().equals("1"))
							productByBatch.setTransType("Credit");
						else
							productByBatch.setTransType("Cheque");
					}

					if (row[8] != null)
						productByBatch.setAmtReceive(row[8].toString());
					else
						productByBatch.setAmtReceive("");

					if (row[9] != null)
						productByBatch.setAmtBalance(row[9].toString());
					else
						productByBatch.setAmtBalance("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));
					productByBatch.setCurrentAmtBal(currentAmtBal.toString());

					if (row[10] != null)
						productByBatch.setPatientSaleTime(row[10].toString());
					else
						productByBatch.setPatientSaleTime("");

				} else if (type.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
					productByBatch.setVouNo("HS" + row[0].toString());

					if (row[4] != null) {
						String str[] = row[4].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					productByBatch.setTransType("");

					productByBatch.setAmtReceive(row[3].toString());

					productByBatch.setAmtBalance("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));
					productByBatch.setCurrentAmtBal(currentAmtBal.toString());

				}

				else if (type.equals("patientSale")) {

					DecimalFormat decf = new DecimalFormat("#.00");

					productByBatch.setType("patientSale");
					productByBatch.setVouNo("PS" + row[0].toString());

					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(row[1].toString() + " " + row[4].toString() + " " + row[5].toString());
					productByBatch.setPatientName(stringBuffer.toString());

					if (row[6] != null) {
						String str[] = row[6].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					if (row[7] != null) {
						if (row[7].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[7].toString().equals("1"))
							productByBatch.setTransType("Credit");
						else
							productByBatch.setTransType("Cheque");
					}

					if (row[8] != null)
						productByBatch.setAmtReceive(row[8].toString());
					else
						productByBatch.setAmtReceive("");

					if (row[9] != null)
						productByBatch.setAmtBalance(row[9].toString());
					else
						productByBatch.setAmtBalance("");

					if (row[10] != null)
						productByBatch.setRate(row[10].toString());
					else
						productByBatch.setRate("");

					if (row[11] != null)
						productByBatch.setPatientId(row[11].toString());
					else
						productByBatch.setPatientId("0");

					if (row[12] != null)
						productByBatch.setfinalBillAmt(row[12].toString());
					else
						productByBatch.setfinalBillAmt("");

					if (row[13] != null)
						productByBatch.setPatientSaleTime(row[13].toString());
					else
						productByBatch.setPatientSaleTime("");

					System.err.println("total_Cash======" + productByBatch.getPatientSaleTime());

					String FinalBill = productByBatch.getfinalBillAmt();

					BillAmt = Float.parseFloat(FinalBill);

					total_Cash = total_Cash + BillAmt;

					String FinalCashAmt = decf.format(BillAmt);

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));
					productByBatch.setCurrentAmtBal(currentAmtBal.toString());

				}

				productWiseBatchSales.add(productByBatch);
			}

			pharmacy_paid_amount = pharmacy_paid_amount + total_Cash;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getTotalCounterSaleDataWithPurchaseRate(String from, String to,
			String type) {

		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave c_slave on  c_slave.counter_slave_master_id=c_master.counter_sale_id where c_master.counter_sale_for_date between '"
					+ from + "' and '" + to + "' and counter_slave_No between '1' and '4'";
		} else {
			counterSale = " select c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,c_master.counter_sale_for_date,c_master.counter_sale_trans_type,sum((rate.pur_rate / p_master.product_uom_unit) * slave.counter_slave_qty) "
					+ " from pharma_counter_sale_slave slave inner join pharma_counter_sale_master c_master ON c_master.counter_sale_id = slave.counter_slave_master_id inner join "
					+ " pharma_product_master p_master ON p_master.product_id = slave.counter_slave_product_id inner join pharma_purchase_rate rate ON rate.batch_id = slave.counter_slave_BatchId where c_master.counter_sale_for_date between '"
					+ from + "' and '" + to + "' and counter_sale_delete_flag=0 group by c_master.counter_sale_id";
		}

		String indentSale = " SELECT c_master.indent_sale_id,pat.fName,pat.addressLine1,c_master.indent_sale_net_amt,pat.mName,pat.lName,c_master.indent_sale_received_date,c_master.indent_bill_mode,c_master.indent_sale_amt_receive,c_master.indent_sale_amt_balance,sum((rate.pur_rate / p_master.product_uom_unit) * slave.indent_sale_slave_qty) "
				+ " FROM pharma_indent_sale_slave slave inner join pharma_indent_sale_master c_master ON c_master.indent_sale_id = slave.indent_sale_slave_master_id inner join pharma_indent_master indent_m ON indent_m.indent_id = c_master.indent_sale_indent_no inner join treatment t ON t.Treatment_ID = indent_m.indent_treatement_id "
				+ " inner join patient pat ON pat.Patient_ID = t.Patient_ID inner join pharma_product_master p_master ON p_master.product_id = slave.indent_sale_slave_product_id inner join pharma_purchase_rate rate ON rate.batch_id = slave.indent_sale_slave_BatchId "
				+ " where c_master.indent_sale_received_date between '" + from + "' and '" + to
				+ "' and indent_sale_delete_flag=0 group by c_master.indent_sale_id";

		String hospitalSale = "select c_master.hospital_bill_id,c_master.hospital_bill_patient_name,p.addressLine1,c_master.hospital_bill_net_amt,c_master.hospital_bill_date from  pharma_hospital_bill_master c_master inner join patient p on p.Patient_ID=c_master.hospital_bill_patient_id where c_master.hospital_bill_date between '"
				+ from + "' and '" + to + "'";

		String patientSale = "SELECT p_master.patient_Sales_bill_id,p1.fName,p1.addressLine1,p_master.patient_sales_bill_net_amt,p1.mName,p1.lName,p_master.patient_bill_date,p_master.patient_bill_mode,p_master.patient_sales_bill_amount_received,p_master.patient_sales_bill_amount_balance,sum((rate.pur_rate / pro_master.product_uom_unit) * slave.patient_slave_qty) "
				+ " FROM pharma_patient_sales_bill_slave slave inner join pharma_patient_sales_bill_master p_master ON p_master.patient_sales_bill_id = slave.patient_slave_bill_master_id inner join patient p1 ON p1.Patient_ID = p_master.patient_bill_patient_id "
				+ " inner join pharma_product_master pro_master ON pro_master.product_id = slave.patient_slave_product_id inner join pharma_purchase_rate rate ON rate.batch_id = slave.patient_slave_BatchId  where p_master.patient_bill_date between '"
				+ from + "' and '" + to
				+ "' and p_master.patient_sales_bill_delete_flag=0 group by p_master.patient_Sales_bill_id";
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				/*
				 * if (row[0] != null) productByBatch.setVouNo(row[0].toString()); else
				 * productByBatch.setVouNo("");
				 */

				if (row[1] != null)
					productByBatch.setPatientName(row[1].toString());
				else
					productByBatch.setPatientName("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());

					if (row[4] != null) {
						String str[] = row[4].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer = new StringBuffer();
						stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer.toString());
					}

					if (row[5] != null) {
						if (row[5].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[5].toString().equals("1"))
							productByBatch.setTransType("Cash/Credit");
						else if (row[5].toString().equals("2"))
							productByBatch.setTransType("Card");
						else
							productByBatch.setTransType("Cheque");
					}

					productByBatch.setAmtReceive(row[3].toString());
					productByBatch.setAmtBalance("0");

					productByBatch.setCurrentAmtBal("0");

					if (row[6] != null)
						productByBatch.setTotalPurchaseRate(row[6].toString());
					else
						productByBatch.setTotalPurchaseRate("");

				}

				else if (type.equals("indentSale")) {
					productByBatch.setType("indentSale");
					productByBatch.setVouNo("IS" + row[0].toString());

					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(row[1].toString() + " " + row[4].toString() + " " + row[5].toString());
					productByBatch.setPatientName(stringBuffer.toString());

					if (row[6] != null) {
						String str[] = row[6].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					if (row[7] != null) {
						if (row[7].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[7].toString().equals("1"))
							productByBatch.setTransType("Credit");
						else
							productByBatch.setTransType("Cheque");
					}

					if (row[8] != null)
						productByBatch.setAmtReceive(row[8].toString());
					else
						productByBatch.setAmtReceive("");

					if (row[9] != null)
						productByBatch.setAmtBalance(row[9].toString());
					else
						productByBatch.setAmtBalance("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));
					productByBatch.setCurrentAmtBal(currentAmtBal.toString());

					if (row[10] != null)
						productByBatch.setTotalPurchaseRate(row[10].toString());
					else
						productByBatch.setTotalPurchaseRate("");

				} else if (type.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
					productByBatch.setVouNo("HS" + row[0].toString());

					if (row[4] != null) {
						String str[] = row[4].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					productByBatch.setTransType("");

					productByBatch.setAmtReceive(row[3].toString());

					productByBatch.setAmtBalance("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));
					productByBatch.setCurrentAmtBal(currentAmtBal.toString());

				}

				else if (type.equals("patientSale")) {
					productByBatch.setType("patientSale");
					productByBatch.setVouNo("PS" + row[0].toString());

					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(row[1].toString() + " " + row[4].toString() + " " + row[5].toString());
					productByBatch.setPatientName(stringBuffer.toString());

					if (row[6] != null) {
						String str[] = row[6].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer1 = new StringBuffer();
						stringBuffer1.append(date[2] + "/" + date[1] + "/" + date[0]);
						productByBatch.setDate(stringBuffer1.toString());
					}

					if (row[7] != null) {
						if (row[7].toString().equals("0"))
							productByBatch.setTransType("cash");
						else if (row[7].toString().equals("1"))
							productByBatch.setTransType("Credit");
						else
							productByBatch.setTransType("Cheque");
					}

					if (row[8] != null)
						productByBatch.setAmtReceive(row[8].toString());
					else
						productByBatch.setAmtReceive("");

					if (row[9] != null)
						productByBatch.setAmtBalance(row[9].toString());
					else
						productByBatch.setAmtBalance("");

					Float currentAmtBal = (Float.parseFloat(row[3].toString()) - Float.parseFloat(row[8].toString()));
					productByBatch.setCurrentAmtBal(currentAmtBal.toString());

					if (row[10] != null)
						productByBatch.setTotalPurchaseRate(row[10].toString());
					else
						productByBatch.setTotalPurchaseRate("");
				}

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportStock> getProductWiseStock(String type, String type1) {
		DecimalFormat df = new DecimalFormat("0.00");

		List<ReportStock> reportStocks = new ArrayList<ReportStock>();
		SQLQuery query = null;
		String queryString = "";
		if (type1.equals("purchase")) {
			queryString = "select product.product_name,shelf.shelf_name,product.product_uom_unit,pack.pack_type,comp.comp_name,batch.batch_code,batch.batch_exp_date,pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,pur_rate.pur_rate,cat.cat_name from pharma_purchase_slave pur_slave inner join pharma_purchase_master master on master.pur_id=pur_slave.pur_slave_master_id "
					+ " inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id "
					+ " inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id "
					+ " inner join pharma_shelf_master shelf on shelf.shelf_id=product.product_shelf_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id inner join pharma_company_master comp on comp.comp_id=product.product_comp_id "
					+ "INNER JOIN pharma_category_master cat on cat.cat_id= product.product_cat_id"
					+ " where batch.batch_delete_flag = 0 and master.pur_delete_flag='0' and stock.stock_qty_in_hand!='0' order by product.product_name asc ";
		} else {
			queryString = "select product.product_name,shelf.shelf_name,product.product_uom_unit,pack.pack_type,comp.comp_name,batch.batch_code,batch.batch_exp_date,pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,pur_rate.pur_rate,cat.cat_name from pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id INNER JOIN pharma_category_master cat on cat.cat_id= product.product_cat_id where batch.batch_delete_flag = 0 and pur_rate.pur_slave_id = 0 and stock.stock_qty_in_hand!='0' order by product.product_name asc ";
		}

		try {

			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setProductName(row[0].toString());
				else
					reportStock.setProductName("");

				if (row[1] != null)
					reportStock.setProductShelf(row[1].toString());
				else
					reportStock.setProductShelf("");

				if (row[2] != null)
					reportStock.setProductUnit(row[2].toString());
				else
					reportStock.setProductUnit("");

				if (row[3] != null)
					reportStock.setProductPacking(row[3].toString());
				else
					reportStock.setProductPacking("");

				if (row[4] != null)
					reportStock.setProductCompany(row[4].toString());
				else
					reportStock.setProductCompany("");

				if (row[5] != null)
					reportStock.setBatchCode(row[5].toString());
				else
					reportStock.setBatchCode("");

				if (row[6] != null)
					reportStock.setBatchExpDate(row[6].toString());
				else
					reportStock.setBatchExpDate("");

				if (row[7] != null)
					reportStock.setMrp(df.format(row[7]).toString());
				else
					reportStock.setMrp("0.00");

				if (row[8] != null)
					reportStock.setRate(df.format(row[8]).toString());
				else
					reportStock.setRate("0.00");

				if (row[9] != null)
					reportStock.setStockInHand(df.format(row[9]).toString());
				else
					reportStock.setStockInHand("0");

				if (row[10] != null)
					reportStock.setPurRate(df.format(row[10]).toString());
				else
					reportStock.setPurRate("0");

				if (type.equals("purRate")) {
					Float purRate = 0f;
					if (row[10] != null) {
						purRate = Float.parseFloat(row[10].toString());
					}
					Float unit = Float.parseFloat(row[2].toString());
					Float amount = (purRate / unit) * Float.parseFloat(row[9].toString());
					reportStock.setAmount(df.format(amount).toString());
				} else {
					if (row[7] != null) {
						Float purRate = Float.parseFloat(row[7].toString());
						Float unit = Float.parseFloat(row[2].toString());
						Float amount = (purRate / unit) * Float.parseFloat(row[9].toString());
						reportStock.setAmount(df.format(amount).toString());
					} else {
						reportStock.setAmount("");
					}
				}

				if (row[10] != null) {
					Float purRate = Float.parseFloat(row[10].toString());
					Float unit = Float.parseFloat(row[2].toString());
					Float amount = (purRate / unit);

					String amount1 = df.format(amount);

					reportStock.setPurchaseRatePerUnit(amount1.toString());

				} else
					reportStock.setPurchaseRatePerUnit("0");

				/*
				 * if(row[11] !=null) reportStock.setCategoryName(df.format(row[8]).toString());
				 * else reportStock.setCategoryName("");
				 */

				if (row[11] != null)
					reportStock.setCategoryName(row[11].toString());
				else
					reportStock.setCategoryName("");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;

	}

	@Override
	public List<ReportStock> getCompanyWiseStock() {
		List<ReportStock> reportStocks = new ArrayList<ReportStock>();
		SQLQuery query = null;
		String queryString = "select product.product_name,product.product_id,comp.comp_id,comp.comp_name,pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,pur_rate.pur_rate from pharma_purchase_slave pur_slave inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id where batch.batch_delete_flag = 0  and stock.stock_qty_in_hand!='0' order by batch_exp_date desc";

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setProductName(row[0].toString());
				else
					reportStock.setProductName("");

				if (row[1] != null)
					reportStock.setProductId(row[1].toString());
				else
					reportStock.setProductId("");

				if (row[2] != null)
					reportStock.setCompanyId(row[2].toString());
				else
					reportStock.setCompanyId("");

				if (row[3] != null)
					reportStock.setProductCompany(row[3].toString());
				else
					reportStock.setProductCompany("");

				if (row[4] != null)
					reportStock.setMrp(row[4].toString());
				else
					reportStock.setMrp("");

				if (row[5] != null)
					reportStock.setRate(row[5].toString());
				else
					reportStock.setRate("");

				if (row[6] != null)
					reportStock.setStockInHand(row[6].toString());
				else
					reportStock.setStockInHand("");

				if (row[7] != null)
					reportStock.setPurRate(row[7].toString());
				else
					reportStock.setPurRate("");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;
	}

	@Override
	public List<ReportStock> getCompanyWiseStockByCompanyId(Integer companyId, String type) {
		List<ReportStock> reportStocks = new ArrayList<ReportStock>();
		SQLQuery query = null;
		String queryString = "";
		if (type.equals("purchase")) {
			queryString = "select product.product_name,product.product_uom_unit,pack.pack_type,stock.stock_qty_in_hand,pur_rate.pur_rate from pharma_purchase_slave pur_slave  inner join pharma_purchase_master master on master.pur_id=pur_slave.pur_slave_master_id"
					+ " inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id  inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id"
					+ " inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id"
					+ " inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id"
					+ " where batch.batch_delete_flag = 0 and comp.comp_id='" + companyId
					+ "' and master.pur_delete_flag='0'  and stock.stock_qty_in_hand!='0'  order by product.product_name asc ";
		} else {
			queryString = "select product.product_name,product.product_uom_unit,pack.pack_type,stock.stock_qty_in_hand,pur_rate.pur_rate from pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id where batch.batch_delete_flag = 0 and pur_rate.pur_slave_id = 0  and stock.stock_qty_in_hand!='0' and comp.comp_id = '"
					+ companyId + "' order by product.product_name asc ";
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setProductName(row[0].toString());
				else
					reportStock.setProductName("");

				if (row[1] != null)
					reportStock.setProductUnit(row[1].toString());
				else
					reportStock.setProductUnit("");

				if (row[2] != null)
					reportStock.setProductPacking(row[2].toString());
				else
					reportStock.setProductPacking("");

				if (row[3] != null)
					reportStock.setStockInHand(row[3].toString());
				else
					reportStock.setStockInHand("");

				if (row[4] != null)
					reportStock.setPurRate(row[4].toString());
				else
					reportStock.setPurRate("");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;
	}

	@Override
	public List<ReportStock> getShelfWiseStock() {
		List<ReportStock> reportStocks = new ArrayList<ReportStock>();
		SQLQuery query = null;
		String queryString = "SELECT shelf_id,shelf_name FROM pharma_shelf_master";

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				/*
				 * if (row[0] != null) reportStock.setProductName(row[0].toString()); else
				 * reportStock.setProductName("");
				 * 
				 * if (row[1] != null) reportStock.setProductId(row[1].toString()); else
				 * reportStock.setProductId("");
				 */

				if (row[0] != null)
					reportStock.setShelfId(row[0].toString());
				else
					reportStock.setShelfId("");

				if (row[1] != null)
					reportStock.setProductShelf(row[1].toString());
				else
					reportStock.setProductShelf("");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;
	}

	@Override
	public List<ReportStock> getShelfWiseStockByShelfId(Integer shelfId, String type) {
		List<ReportStock> reportStocks = new ArrayList<ReportStock>();
		SQLQuery query = null;
		String queryString = "";
		if (type.equals("purchase")) {
			queryString = "select product.product_name,product.product_uom_unit,pack.pack_type,stock.stock_qty_in_hand,pur_rate.pur_rate from pharma_purchase_slave pur_slave  inner join pharma_purchase_master master on master.pur_id=pur_slave.pur_slave_master_id "
					+ " inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id "
					+ " inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id "
					+ " inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id "
					+ " where batch.batch_delete_flag = 0 and shelf.shelf_id='" + shelfId
					+ "' and master.pur_delete_flag='0' and stock.stock_qty_in_hand!='0' order by batch_exp_date desc ";
		} else {
			queryString = "select product.product_name,product.product_uom_unit,pack.pack_type,stock.stock_qty_in_hand,pur_rate.pur_rate from pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id where batch.batch_delete_flag = 0 and "
					+ "shelf.shelf_id = '" + shelfId
					+ "' and pur_rate.pur_slave_id = 0   and stock.stock_qty_in_hand!='0' order by batch_exp_date desc";
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setProductName(row[0].toString());
				else
					reportStock.setProductName("");

				if (row[1] != null)
					reportStock.setProductUnit(row[1].toString());
				else
					reportStock.setProductUnit("");

				if (row[2] != null)
					reportStock.setProductPacking(row[2].toString());
				else
					reportStock.setProductPacking("");

				if (row[3] != null)
					reportStock.setStockInHand(row[3].toString());
				else
					reportStock.setStockInHand("");

				if (row[4] != null)
					reportStock.setPurRate(row[4].toString());
				else
					reportStock.setPurRate("");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;
	}

	@Override
	public List<ReportStock> getCategoryWiseStock() {
		List<ReportStock> reportStocks = new ArrayList<ReportStock>();
		SQLQuery query = null;
		String queryString = "SELECT category.cat_id, category.cat_name FROM pharma_category_master category WHERE cat_delete_flag=0";

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setCategoryId(row[0].toString());
				else
					reportStock.setCategoryId("");

				if (row[1] != null)
					reportStock.setCategoryName(row[1].toString());
				else
					reportStock.setCategoryName("");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;
	}

	@Override
	public List<ReportStock> getCategoryWiseStockByCategoryId(Integer categoryId, String type) {

		List<ReportStock> reportStocks = new ArrayList<ReportStock>();

		SQLQuery query = null;
		String queryString = "";
		if (type.equals("purchase")) {
			queryString = " select product.product_name,product.product_uom_unit,pack.pack_type,stock.stock_qty_in_hand,pur_rate.pur_rate from pharma_purchase_slave pur_slave inner join pharma_purchase_master master on master.pur_id=pur_slave.pur_slave_master_id"
					+ " inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id"
					+ " inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join  pharma_category_master category ON category.cat_id = product.product_cat_id"
					+ " inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id  where batch.batch_delete_flag = 0 and category.cat_id='"
					+ categoryId
					+ "' and master.pur_delete_flag='0' and stock.stock_qty_in_hand!='0' order by batch_exp_date desc";
		} else {
			queryString = "select product.product_name,product.product_uom_unit,pack.pack_type,stock.stock_qty_in_hand,pur_rate.pur_rate from pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_category_master category ON category.cat_id = product.product_cat_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id where batch.batch_delete_flag = 0 and category.cat_id = '"
					+ categoryId
					+ "' and pur_rate.pur_slave_id=0 and stock.stock_qty_in_hand!='0' order by batch_exp_date desc";
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setProductName(row[0].toString());
				else
					reportStock.setProductName("");

				if (row[1] != null)
					reportStock.setProductUnit(row[1].toString());
				else
					reportStock.setProductUnit("");

				if (row[2] != null)
					reportStock.setProductPacking(row[2].toString());
				else
					reportStock.setProductPacking("");

				if (row[3] != null)
					reportStock.setStockInHand(row[3].toString());
				else
					reportStock.setStockInHand("");

				if (row[4] != null)
					reportStock.setPurRate(row[4].toString());
				else
					reportStock.setPurRate("");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;
	}

	@Override
	public List<ReportPurchase> getProductWisePurchase(String from, String to, String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select master.pur_id,master.pur_trans_type,master.pur_bill_no,master.pur_bill_date,batch.batch_code,vendor.vendor_name,slave.pur_slave_qty,slave.pur_slave_rate,slave.pur_slave_amt from pharma_purchase_master master inner join pharma_purchase_slave slave on slave.pur_slave_master_id=master.pur_id inner join pharma_vendor_master vendor on vendor.vendor_id=master.pur_vendor_id inner join pharma_batch_master batch on batch.batch_id=slave.pur_slave_batch_id where slave.pur_slave_product_id='"
							+ productId + "' and master.pur_delete_Flag='0' and pur_bill_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("cash/Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setPurBillNo(row[2].toString());
				else
					reportPurchase.setPurBillNo("");

				if (row[3] != null)
					reportPurchase.setBillDate(row[3].toString());
				else
					reportPurchase.setBillDate("");

				if (row[4] != null)
					reportPurchase.setBatchCode(row[4].toString());
				else
					reportPurchase.setBatchCode("");

				if (row[5] != null)
					reportPurchase.setVendorName(row[5].toString());
				else
					reportPurchase.setVendorName("");

				if (row[6] != null)
					reportPurchase.setQty(row[6].toString());
				else
					reportPurchase.setQty("");

				if (row[7] != null)
					reportPurchase.setRate(row[7].toString());
				else
					reportPurchase.setRate("");

				if (row[8] != null)
					reportPurchase.setAmount(row[8].toString());
				else
					reportPurchase.setAmount("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getBatchWisePurchase(String from, String to, String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select batch.batch_id,batch.batch_code,slave.pur_slave_mrp from pharma_purchase_master master inner join pharma_purchase_slave slave on slave.pur_slave_master_id=master.pur_id inner join pharma_vendor_master vendor on vendor.vendor_id=master.pur_vendor_id inner join pharma_batch_master batch on batch.batch_id=slave.pur_slave_batch_id where slave.pur_slave_product_id='"
							+ productId + "' and pur_bill_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setBatchId(row[0].toString());
				else
					reportPurchase.setBatchId("");

				if (row[1] != null)
					reportPurchase.setBatchCode(row[1].toString());
				else
					reportPurchase.setBatchCode("");

				if (row[2] != null)
					reportPurchase.setMrp(row[2].toString());
				else
					reportPurchase.setMrp("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getBatchWisePurchaseByBatchId(String from, String to, String batchId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select master.pur_id,master.pur_trans_type,master.pur_bill_date,vendor.vendor_name,slave.pur_slave_qty,slave.pur_slave_scheme,slave.pur_slave_disc,slave.pur_slave_rate,slave.pur_slave_amt from pharma_purchase_master master inner join pharma_purchase_slave slave on slave.pur_slave_master_id=master.pur_id inner join pharma_vendor_master vendor on vendor.vendor_id=master.pur_vendor_id inner join pharma_batch_master batch on batch.batch_id=slave.pur_slave_batch_id where batch.batch_id='"
							+ batchId + "' and master.pur_delete_flag='0' and pur_bill_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("cash/Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setBillDate(row[2].toString());
				else
					reportPurchase.setBillDate("");

				if (row[3] != null)
					reportPurchase.setVendorName(row[3].toString());
				else
					reportPurchase.setVendorName("");

				if (row[4] != null)
					reportPurchase.setQty(row[4].toString());
				else
					reportPurchase.setQty("");

				if (row[5] != null)
					reportPurchase.setScheme(row[5].toString());
				else
					reportPurchase.setScheme("");

				if (row[6] != null)
					reportPurchase.setDisc(row[6].toString());
				else
					reportPurchase.setDisc("");

				if (row[7] != null)
					reportPurchase.setRate(row[7].toString());
				else
					reportPurchase.setRate("");

				if (row[8] != null)
					reportPurchase.setAmount(row[8].toString());
				else
					reportPurchase.setAmount("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getNewProductWisePurchase(String from, String to) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select product.product_name,product.product_uom_unit,pack.pack_type,comp.comp_name,product.product_id from pharma_purchase_master master inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id inner join pharma_product_master product ON product.product_id = slave.pur_slave_product_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id inner join pharma_company_master comp on comp.comp_id=product.product_comp_id where master.pur_delete_flag='0' and pur_bill_date between '"
							+ from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setProductName(row[0].toString());
				else
					reportPurchase.setProductName("");

				if (row[1] != null)
					reportPurchase.setProductUnit(row[2].toString());
				else
					reportPurchase.setProductUnit(row[2].toString());

				if (row[2] != null)
					reportPurchase.setProductPack(row[2].toString());
				else
					reportPurchase.setProductPack("");

				if (row[3] != null)
					reportPurchase.setProductCompany(row[3].toString());
				else
					reportPurchase.setProductCompany("");

				if (row[4] != null)
					reportPurchase.setProductId(row[4].toString());
				else
					reportPurchase.setProductId("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getNewProductByIdWisePurchase(String from, String to, String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select  master.pur_id, master.pur_trans_type,master.pur_bill_date,slave.pur_slave_mrp,slave.pur_slave_rate,slave.pur_slave_qty,slave.pur_slave_scheme,slave.pur_slave_amt from pharma_purchase_master master inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id where slave.pur_slave_product_id = '"
							+ productId + "' and master.pur_delete_flag='0' and pur_bill_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("cash/Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setBillDate(row[2].toString());
				else
					reportPurchase.setBillDate("");

				if (row[3] != null)
					reportPurchase.setMrp(row[3].toString());
				else
					reportPurchase.setMrp("");

				if (row[4] != null)
					reportPurchase.setRate(row[4].toString());
				else
					reportPurchase.setRate("");

				if (row[5] != null)
					reportPurchase.setQty(row[5].toString());
				else
					reportPurchase.setQty("");

				if (row[6] != null)
					reportPurchase.setScheme(row[6].toString());
				else
					reportPurchase.setScheme("");

				if (row[7] != null)
					reportPurchase.setAmount(row[7].toString());
				else
					reportPurchase.setAmount("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getPartyWisePurchase(String from, String to, String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select vendor.vendor_Id, vendor.vendor_name,vendor.vendor_address from pharma_purchase_master master inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id inner join pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id where slave.pur_slave_product_id = '"
							+ productId + "' and pur_bill_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVendorId(row[0].toString());
				else
					reportPurchase.setVendorId("");

				if (row[1] != null)
					reportPurchase.setVendorName(row[1].toString());
				else
					reportPurchase.setVendorName("");

				if (row[2] != null)
					reportPurchase.setVendorAddress(row[2].toString());
				else
					reportPurchase.setVendorAddress("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getPartyWisePurchaseTotalBill(String from, String to) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select vendor.vendor_Id, vendor.vendor_name, vendor.vendor_address from pharma_purchase_master master "
							+ " inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id inner join "
							+ " pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id where "
							+ " pur_bill_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVendorId(row[0].toString());
				else
					reportPurchase.setVendorId("");

				if (row[1] != null)
					reportPurchase.setVendorName(row[1].toString());
				else
					reportPurchase.setVendorName("");

				if (row[2] != null)
					reportPurchase.setVendorAddress(row[2].toString());
				else
					reportPurchase.setVendorAddress("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getPartyWisePurchaseByPartyId(String from, String to, String vendorId,
			String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select master.pur_id,master.pur_trans_type,master.pur_bill_date,vendor.vendor_name,slave.pur_slave_qty,slave.pur_slave_scheme,slave.pur_slave_disc,slave.pur_slave_rate,slave.pur_slave_amt from pharma_purchase_master master inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id inner join pharma_product_master product on product.product_id=slave.pur_slave_product_id inner join pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id where vendor.vendor_id = '"
							+ vendorId + "'  and slave.pur_slave_product_id='" + productId
							+ "' and master.pur_delete_flag='0' and pur_bill_date between '" + from + "' and '" + to
							+ "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("cash/Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setBillDate(row[2].toString());
				else
					reportPurchase.setBillDate("");

				if (row[3] != null)
					reportPurchase.setVendorName(row[3].toString());
				else
					reportPurchase.setVendorName("");

				if (row[4] != null)
					reportPurchase.setQty(row[4].toString());
				else
					reportPurchase.setQty("");

				if (row[5] != null)
					reportPurchase.setScheme(row[5].toString());
				else
					reportPurchase.setScheme("");

				if (row[6] != null)
					reportPurchase.setDisc(row[6].toString());
				else
					reportPurchase.setDisc("");

				if (row[7] != null)
					reportPurchase.setRate(row[7].toString());
				else
					reportPurchase.setRate("");

				if (row[8] != null)
					reportPurchase.setAmount(row[8].toString());
				else
					reportPurchase.setAmount("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getPartyWisePurchaseTotalBillAmt(String from, String to) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;
		float gross = 0;

		float Totalasseble = 0;
		float vat = 0;
		float add = 0;
		float net = 0;

		float less1 = 0;
		float payable = 0;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select vendor.vendor_name,sum(master.pur_gross_amt),sum(master.pur_less),sum(master.pur_vat),sum(master.pur_add),sum(master.pur_net_amt),vendor.vendor_VAT_TIN "
							+ " from pharma_purchase_master master inner join pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id "
							+ " where pur_bill_date between '" + from + "' and '" + to
							+ "'  and master.pur_delete_flag = '0' group by  vendor.vendor_name");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVendorName(row[0].toString());

				if (row[1] != null) {
					float less = 0;
					float asseble = 0;
					float gross1 = 0;
					gross1 = Float.parseFloat(row[1].toString());
					less = Float.parseFloat(row[2].toString());
					asseble = gross1 - less;
					reportPurchase.setTotalGross(asseble);
					gross = gross + Float.parseFloat(row[1].toString());

				}

				if (row[2] != null)
					reportPurchase.setTotalLess(Float.parseFloat(row[2].toString()));
				less1 = less1 + Float.parseFloat(row[2].toString());

				if (row[3] != null) {
					reportPurchase.setTotalVat(Float.parseFloat(row[3].toString()));
					vat = vat + Float.parseFloat(row[3].toString());
				}

				if (row[4] != null)
					reportPurchase.setTotalAdd(Float.parseFloat(row[4].toString()));
				add = add + Float.parseFloat(row[4].toString());

				if (row[5] != null) {
					reportPurchase.setTotalNet(Float.parseFloat(row[5].toString()));
					net = net + Float.parseFloat(row[5].toString());
				}

				if (row[6] != null)
					reportPurchase.setVatTinNumber((row[6].toString()));

				payable = Float.parseFloat(row[5].toString()) - Float.parseFloat(row[2].toString())
						+ Float.parseFloat(row[4].toString());

				reportPurchase.setTotalPayable(payable);

				reportPurchase.setFinalGross(gross);
				reportPurchase.setFinalVat(vat);
				reportPurchase.setFinalNet(net);

				reportPurchase.setFinalAdd(add);
				reportPurchase.setFinalLess(less1);
				reportPurchase.setFinalPayable(net - less1 + add);

				reportPurchases.add(reportPurchase);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getCategoryWisePurchase(String from, String to, String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select category.cat_id, category.cat_name from pharma_purchase_master master inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id inner join pharma_product_master product on product.product_id=slave.pur_slave_product_id inner join pharma_category_master category ON category.cat_id = product.product_cat_id where slave.pur_slave_product_id = '"
							+ productId + "' and pur_bill_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setCategoryId(row[0].toString());
				else
					reportPurchase.setCategoryId("");

				if (row[1] != null)
					reportPurchase.setProductCategory(row[1].toString());
				else
					reportPurchase.setProductCategory("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getCategoryWisePurchaseByCatId(String from, String to, String productId,
			String categoryId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select master.pur_id,master.pur_trans_type,master.pur_bill_date,vendor.vendor_name,slave.pur_slave_qty,slave.pur_slave_scheme,slave.pur_slave_disc,slave.pur_slave_rate,slave.pur_slave_amt from pharma_purchase_master master inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id inner join pharma_product_master product on product.product_id=slave.pur_slave_product_id inner join pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id inner join pharma_category_master category ON category.cat_id = product.product_cat_id where category.cat_id = '"
							+ categoryId + "' and master.pur_delete_flag='0' and product.product_id='" + productId
							+ "' and pur_bill_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("cash/Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setBillDate(row[2].toString());
				else
					reportPurchase.setBillDate("");

				if (row[3] != null)
					reportPurchase.setVendorName(row[3].toString());
				else
					reportPurchase.setVendorName("");

				if (row[4] != null)
					reportPurchase.setQty(row[4].toString());
				else
					reportPurchase.setQty("");

				if (row[5] != null)
					reportPurchase.setScheme(row[5].toString());
				else
					reportPurchase.setScheme("");

				if (row[6] != null)
					reportPurchase.setDisc(row[6].toString());
				else
					reportPurchase.setDisc("");

				if (row[7] != null)
					reportPurchase.setRate(row[7].toString());
				else
					reportPurchase.setRate("");

				if (row[8] != null)
					reportPurchase.setAmount(row[8].toString());
				else
					reportPurchase.setAmount("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	// Modified By BILAL For Patient sale Report
	@Override
	public List<ReportProductWiseBatchSale> patientwiseProductList(Integer patientId, String from, String to,
			String type) {
		List<ReportProductWiseBatchSale> reportProductWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String str = "", str0 = "", str1 = "", str2 = "", sale = "";

		if (type.equalsIgnoreCase("patient") || type.equalsIgnoreCase("all")) {
			str0 = " SELECT DATE_FORMAT(p_master.patient_bill_date, '%m-%b-%Y') as dates,p_master.patient_sales_bill_id,product.product_name,p_slave.patient_slave_qty,p_slave.patient_slave_rate, "
					+ " p_slave.patient_slave_amt ,concat(ifnull(p1.f_name,''), ' ', ifnull(p1.m_name,''), ' ', ifnull(p1.l_name,'')),    p_master.patient_sales_bill_net_amt,    product.product_hsn,    p_slave.patient_slave_vat,    p_slave.patient_slave_ratePerUnit,    p_slave.patient_slave_vatAmt,if(p_master.patient_bill_mode = 0,'Cash','Credit') as pmode FROM    pharma_patient_sales_bill_master p_master        inner JOIN    pharma_patient_sales_bill_slave p_slave ON p_slave.patient_slave_bill_master_id = p_master.patient_sales_bill_id        inner join    pharma_product_master product ON product.product_id = p_slave.patient_slave_product_id        inner join    ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id where  p_master.patient_bill_date between '"
					+ from + "' and '" + to + "'";
			if (patientId > 0) {
				str0 = str0 + " and p1.patient_id = " + patientId;
			}
		}

		if (type.equalsIgnoreCase("counter") || type.equalsIgnoreCase("all")) {
			str1 = "SELECT     DATE_FORMAT(p_master.counter_sale_for_date,            '%m-%b-%Y') as dates,    p_master.counter_sale_id,    product.product_name,    p_slave.counter_slave_qty,    p_slave.counter_slave_rate,    p_slave.counter_slave_amt,    counter_sale_patient_name,    p_master.counter_sale_net_amt,    product.product_hsn,    p_slave.counter_slave_vat,    p_slave.counter_slave_rateForPrint,    p_slave.counter_slave_vatAmt,    if(p_master.counter_sale_trans_type = 0,        'Cash',        'Credit') as pmode FROM    pharma_counter_sale_master p_master        inner JOIN    pharma_counter_sale_slave p_slave ON p_slave.counter_slave_master_id = p_master.counter_sale_id        inner join    pharma_product_master product ON product.product_id = p_slave.counter_slave_product_id where    p_master.counter_sale_for_date between '"
					+ from + "' and '" + to + "'";
		}

		if (type.equalsIgnoreCase("indent") || type.equalsIgnoreCase("all")) {
			str2 = "SELECT     DATE_FORMAT(indent_sale_received_date, '%m-%b-%Y') as dates,    p_master.indent_sale_id,    product.product_name,    p_slave.indent_sale_slave_qty,    p_slave.indent_sale_slave_rate,    p_slave.indent_sale_slave_amt,    concat(ifnull(p1.f_name,''), ' ', ifnull(p1.m_name,''), ' ', ifnull(p1.l_name,'')),    p_master.indent_sale_net_amt,    product.product_hsn,    p_slave.indent_slave_vat,    p_slave.indent_slave_ratePerUnit,    p_slave.indent_slave_vatAmt,    if(p_master.indent_sale_type = 0,        'Cash',        'Credit') as pmode FROM    pharma_indent_sale_master p_master        inner JOIN    pharma_indent_sale_slave p_slave ON p_slave.indent_sale_slave_master_id = p_master.indent_sale_id        inner join    pharma_product_master product ON product.product_id = p_slave.indent_sale_slave_product_id        inner join    pharma_indent_master i ON i.indent_id = p_master.indent_sale_indent_no        inner join    ehat_treatment t ON t.treatment_id = i.indent_treatement_id        inner join    ehat_patient p1 ON p1.patient_id = t.patient_id where    p_master.indent_sale_received_date between '"
					+ from + "' and '" + to + "'";

			if (patientId > 0) {
				str2 = str2 + " and p1.patient_id = " + patientId;
			}
		}

		int i = 0;
		if (type.equalsIgnoreCase("patient")) {
			str = str0;
			sale = "PS-";
		}
		if (type.equalsIgnoreCase("counter")) {
			str = str1;
			sale = "CS-";
		}
		if (type.equalsIgnoreCase("indent")) {
			str = str2;
			sale = "IS-";
		}
		if (type.equalsIgnoreCase("all"))
			for (i = 0; i < 3; i++)
				try {
					if (i == 0) {
						str = str0;
						sale = "PS-";
					} else if (i == 1) {
						str = str1;
						sale = "CS-";
					} else if (i == 2) {
						str = str2;
						sale = "IS-";
					}
					query = sessionFactory.getCurrentSession().createSQLQuery(str);

					@SuppressWarnings("unchecked")
					List<Object[]> rows = query.list();
					for (Object[] row : rows) {

						ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

						if (row[0] != null)
							reportProductWiseBatchSale.setDate(row[0].toString());
						else
							reportProductWiseBatchSale.setDate("");

						if (row[1] != null)
							reportProductWiseBatchSale.setReceiptNo(sale + row[1].toString());
						else
							reportProductWiseBatchSale.setReceiptNo("");

						if (row[2] != null)
							reportProductWiseBatchSale.setProductName(row[2].toString());
						else
							reportProductWiseBatchSale.setProductName("");

						if (row[3] != null)
							reportProductWiseBatchSale.setQty(row[3].toString());
						else
							reportProductWiseBatchSale.setQty("");

						if (row[4] != null)
							reportProductWiseBatchSale.setRate(row[4].toString());
						else
							reportProductWiseBatchSale.setRate("");

						if (row[5] != null)
							reportProductWiseBatchSale.setAmount(row[5].toString());
						else
							reportProductWiseBatchSale.setAmount("");

						if (row[6] != null)
							reportProductWiseBatchSale.setPatientName(row[6].toString());
						else
							reportProductWiseBatchSale.setPatientName("");

						if (row[7] != null)
							reportProductWiseBatchSale.setNetAmt(Double.parseDouble(row[7].toString()));
						else
							reportProductWiseBatchSale.setNetAmt(0.0);

						if (row[8] != null)
							reportProductWiseBatchSale.setTaxable55(row[8].toString());
						else
							reportProductWiseBatchSale.setTaxable55("");

						if (row[9] != null)
							reportProductWiseBatchSale.setTaxable0(row[9].toString());
						else
							reportProductWiseBatchSale.setTaxable0("");

						if (row[10] != null)
							reportProductWiseBatchSale.setPurRate(row[10].toString());
						else
							reportProductWiseBatchSale.setPurRate("");

						if (row[11] != null)
							reportProductWiseBatchSale.setTaxable12(row[11].toString());
						else
							reportProductWiseBatchSale.setTaxable12("");

						if (row[12] != null)
							reportProductWiseBatchSale.setType(row[12].toString());
						else
							reportProductWiseBatchSale.setType("");

						reportProductWiseBatchSales.add(reportProductWiseBatchSale);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
		else
			try {

				query = sessionFactory.getCurrentSession().createSQLQuery(str);

				@SuppressWarnings("unchecked")
				List<Object[]> rows = query.list();
				for (Object[] row : rows) {

					ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

					if (row[0] != null)
						reportProductWiseBatchSale.setDate(row[0].toString());
					else
						reportProductWiseBatchSale.setDate("");

					if (row[1] != null)
						reportProductWiseBatchSale.setReceiptNo(sale + row[1].toString());
					else
						reportProductWiseBatchSale.setReceiptNo("");

					if (row[2] != null)
						reportProductWiseBatchSale.setProductName(row[2].toString());
					else
						reportProductWiseBatchSale.setProductName("");

					if (row[3] != null)
						reportProductWiseBatchSale.setQty(row[3].toString());
					else
						reportProductWiseBatchSale.setQty("");

					if (row[4] != null)
						reportProductWiseBatchSale.setRate(row[4].toString());
					else
						reportProductWiseBatchSale.setRate("");

					if (row[5] != null)
						reportProductWiseBatchSale.setAmount(row[5].toString());
					else
						reportProductWiseBatchSale.setAmount("");

					if (row[6] != null)
						reportProductWiseBatchSale.setPatientName(row[6].toString());
					else
						reportProductWiseBatchSale.setPatientName("");

					if (row[7] != null)
						reportProductWiseBatchSale.setNetAmt(Double.parseDouble(row[7].toString()));
					else
						reportProductWiseBatchSale.setNetAmt(0.0);

					if (row[8] != null)
						reportProductWiseBatchSale.setTaxable55(row[8].toString());
					else
						reportProductWiseBatchSale.setTaxable55("");

					if (row[9] != null)
						reportProductWiseBatchSale.setTaxable0(row[9].toString());
					else
						reportProductWiseBatchSale.setTaxable0("");

					if (row[10] != null)
						reportProductWiseBatchSale.setPurRate(row[10].toString());
					else
						reportProductWiseBatchSale.setPurRate("");

					if (row[11] != null)
						reportProductWiseBatchSale.setTaxable12(row[11].toString());
					else
						reportProductWiseBatchSale.setTaxable12("");

					if (row[12] != null)
						reportProductWiseBatchSale.setType(row[12].toString());
					else
						reportProductWiseBatchSale.setType("");

					reportProductWiseBatchSales.add(reportProductWiseBatchSale);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		return reportProductWiseBatchSales;
	}

	@Override
	public List<ReportPurchase> getCompanyWisePurchase(String from, String to) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select company.comp_id, company.comp_name from pharma_purchase_master master inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id inner join pharma_product_master product ON product.product_id = slave.pur_slave_product_id inner join pharma_company_master company ON company.comp_id = product.product_comp_id where  pur_bill_date between '"
							+ from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setCompanyId(row[0].toString());
				else
					reportPurchase.setCompanyId("");

				if (row[1] != null)
					reportPurchase.setProductCompany(row[1].toString());
				else
					reportPurchase.setProductCompany("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getCompanyWisePurchaseByCompanyId(String from, String to, String companyId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select master.pur_id,master.pur_trans_type,master.pur_bill_date,vendor.vendor_name,slave.pur_slave_qty,slave.pur_slave_scheme,slave.pur_slave_disc,slave.pur_slave_rate,slave.pur_slave_amt from pharma_purchase_master master inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id inner join pharma_product_master product ON product.product_id = slave.pur_slave_product_id inner join pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id inner join pharma_company_master company ON company.comp_id = product.product_comp_id where company.comp_id = '"
							+ companyId + "' and  master.pur_delete_flag='0' and pur_bill_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("cash/Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setBillDate(row[2].toString());
				else
					reportPurchase.setBillDate("");

				if (row[3] != null)
					reportPurchase.setVendorName(row[3].toString());
				else
					reportPurchase.setVendorName("");

				if (row[4] != null)
					reportPurchase.setQty(row[4].toString());
				else
					reportPurchase.setQty("");

				if (row[5] != null)
					reportPurchase.setScheme(row[5].toString());
				else
					reportPurchase.setScheme("");

				if (row[6] != null)
					reportPurchase.setDisc(row[6].toString());
				else
					reportPurchase.setDisc("");

				if (row[7] != null)
					reportPurchase.setRate(row[7].toString());
				else
					reportPurchase.setRate("");

				if (row[8] != null)
					reportPurchase.setAmount(row[8].toString());
				else
					reportPurchase.setAmount("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<PendingBill> getPendingBills(String from, String to) {
		List<PendingBill> pendingBills = new ArrayList<PendingBill>();
		try {

			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String date = dateFormat.format(new java.util.Date());
			// System.out.println("Date is" + date);
			Date d2 = dateFormat.parse(date);

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select purchase.pur_bill_no,purchase.pur_bill_date,purchase.pur_id,purchase.pur_entry_date,purchase.pur_trans_type,purchase.pur_net_amt,vendor.vendor_name from  pharma_purchase_master purchase inner join pharma_vendor_master vendor on vendor.vendor_id=purchase.pur_vendor_id where "
							+ "pur_status='y' and pur_delete_flag=0 and pur_bill_date between '" + from + "' and '" + to
							+ "' ");
			List<Object[]> rows = query.list();

			for (Object[] row : rows) {
				PendingBill pendingBill = new PendingBill();
				if (row[0] != null)
					pendingBill.setBillNo(row[0].toString());

				if (row[1] != null) {
					pendingBill.setBillDate(row[1].toString());
					System.out.println("Bill Date" + row[1].toString());
					Date billDate = dateFormat.parse(row[1].toString());

				}
				if (row[2] != null)
					pendingBill.setVouNo(row[2].toString());

				if (row[3] != null)
					pendingBill.setVouDate(row[3].toString());

				if (row[4] != null) {
					if ((row[4].toString()).equals("0"))
						pendingBill.setType("Cash/Credit");
					else
						pendingBill.setType("Cash");
				}

				if (row[5] != null)
					pendingBill.setNetAmount(row[5].toString());

				if (row[6] != null)
					pendingBill.setVendorName(row[6].toString());

				try {
					SimpleDateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd");
					String todaysDate = myFormat.format(new java.util.Date());
					Date todaysdate = myFormat.parse(todaysDate);
					Date date2 = myFormat.parse(row[1].toString());
					long diff = todaysdate.getTime() - date2.getTime();
					// System.out.println ("<<<<<<<<<<<<<<<<<<<<<<<<<<Days: " +
					// TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));
					pendingBill.setDiff(TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS) + "");

				} catch (Exception e) {
					e.printStackTrace();
				}
				pendingBills.add(pendingBill);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pendingBills;
	}

	//added by Akshata
	@Override
	public List<ReportPurchase> getPurchaseDiscount(String from, String to) {
		
		SQLQuery query = null;
		/*
		 * "select  master.pur_id as pur_id,master.pur_trans_type as type,master.pur_entry_date as pur_entry_date,master.pur_bill_no aspurBillNo,master.pur_bill_date as date,vendor.vendor_name as vendorName,master.pur_net_amt as pur_net_amt,master.pur_item_disc as discount,master.pur_schm_disc as pur_schm_disc,master.pur_spl_disc as pur_spl_disc,master.pur_cd as pur_cd,product.product_name as productName from pharma_purchase_master master inner join pharma_purchase_slave slave on slave.pur_slave_master_id=master.pur_id inner join pharma_product_master product on product.product_id=slave.pur_slave_product_id inner join pharma_vendor_master vendor on vendor.vendor_id=master.pur_vendor_id where master.pur_delete_flag='0' and pur_bill_date between '"
		 * + from + "' and '" + to + "'"
		 */
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_purchase_discount_data(:p_bill_date_form,:p_bill_date_to)");
			query.setParameter("p_bill_date_form", from);
			query.setParameter("p_bill_date_to", to);			
			query.setResultTransformer(new AliasToBeanResultTransformer(ReportPurchase.class));
			@SuppressWarnings("unchecked")
			List<ReportPurchase> lst = query.list();

			return lst;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public List<ReportMIS> getDailyBusinessReport(String from, String to) {
		List<ReportMIS> reportPurchases = new ArrayList<ReportMIS>();

		ReportMIS reportMIS = new ReportMIS();
		SQLQuery query = null;

		// cash receipt amt
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT sum(cash_receipt_amt) FROM pharma_cash_receipt_master where cash_receipt_date between '"
							+ from + "' and '" + to + "' ");

			Object rows = query.uniqueResult();
			if (rows != null) {
				reportMIS.setCashReceipt(rows.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// cheque receipt amt
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT sum(cheque_receipt_amt) FROM pharma_cheque_receipt_master where cheque_receipt_update_date between '"
							+ from + "' and '" + to + "';");

			Object rows = query.uniqueResult();
			if (rows != null) {
				reportMIS.setChequeReceipt(rows.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// cash paid amt
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT sum(cash_paid_amt) FROM pharma_cash_paid_master where cash_paid_date between '" + from
							+ "' and '" + to + "';");

			Object rows = query.uniqueResult();
			if (rows != null) {
				reportMIS.setCashPaid(rows.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// cheque paid amt
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT sum(cheque_paid_amt) FROM pharma_cheque_paid_master where cheque_paid_date between '" + from
							+ "' and '" + to + "';");

			Object rows = query.uniqueResult();
			if (rows != null) {
				reportMIS.setChequePaid(rows.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// purchase with cash purchase
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT sum(pur_net_amt) FROM pharma_purchase_master where pur_trans_type='0' and pur_delete_flag='0' and pur_entry_date between '"
							+ from + "' and '" + to + "'");

			Object rows = query.uniqueResult();
			if (rows != null) {
				reportMIS.setCashPurchase(rows.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// purchase with cash\credit purchase
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT sum(pur_net_amt) FROM pharma_purchase_master where pur_trans_type='1' and pur_delete_flag='0' and pur_entry_date between '"
							+ from + "' and '" + to + "'");

			Object rows = query.uniqueResult();
			if (rows != null) {
				reportMIS.setCashCreditPurchase(rows.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// Credit Note
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT sum(credit_note_net_amt) FROM pharma_credit_note_master where credit_note_date between '"
							+ from + "' and '" + to + "';");

			Object rows = query.uniqueResult();
			if (rows != null) {
				reportMIS.setCreditNote(rows.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// Debit Note
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT sum(debit_note_net_amt) FROM pharma_debit_note_master where debit_note_date between '"
							+ from + "' and '" + to + "';");

			Object rows = query.uniqueResult();
			if (rows != null) {
				reportMIS.setDebitNote(rows.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// Counter Sale

		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		if (hospitalName.equals("apple")) {
			try {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT distinct (m.counter_sale_id),m.counter_sale_net_amt FROM pharma_counter_sale_master m inner join pharma_counter_sale_slave c_slave on m.counter_sale_id=c_slave.counter_slave_master_id where m.counter_sale_for_date between '"
								+ from + "' and '" + to + "' and c_slave.counter_slave_No between '1' and'4';");

				List<Object[]> rows = query.list();

				Double total = 0.0;
				for (Object[] row : rows) {
					if (row[1] != null) {
						total = total + (Double.parseDouble(row[1].toString()));
					}

				}
				if (rows != null) {
					reportMIS.setCounterSale(total.toString());
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			try {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT sum(counter_sale_net_amt) FROM pharma_counter_sale_master where counter_sale_for_date between '"
								+ from + "' and '" + to + "';");

				Object rows = query.uniqueResult();
				if (rows != null) {
					reportMIS.setCounterSale(rows.toString());
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		reportPurchases.add(reportMIS);

		return reportPurchases;
	}

	/*
	 * @Override public List<ReportExpiry> getNearExpiryReport(String from, String
	 * to) { List<ReportExpiry> reportExpiries = new ArrayList<ReportExpiry>();
	 * //SQLQuery query = null;
	 * 
	 * try {
	 * 
	 * query = sessionFactory .getCurrentSession() .createSQLQuery(
	 * "SELECT batch_id,batch_code,batch_exp_date,product.product_name,stock.stock_qty_in_hand FROM pharma_batch_master batch "
	 * +
	 * " inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id "
	 * +
	 * " inner join pharma_purchase_slave slave on slave.pur_slave_batch_id=batch.batch_id inner join pharma_purchase_master master on master.pur_id=slave.pur_slave_master_id "
	 * + " where (batch.batch_exp_date = '" + from + "' or batch.batch_exp_date = '"
	 * + to +
	 * "')  and stock.stock_qty_in_hand!='0' and master.pur_delete_flag=0 order by batch_exp_date"
	 * );
	 * 
	 * StoredProcedureQuery query = (StoredProcedureQuery)
	 * sessionFactory.getCurrentSession().
	 * createStoredProcedureCall("sp_get_product_expiry_by_expdate_and_batch_id(:batch_exp_date_timestamp, :p_batch_id)"
	 * ,ReportExpiry.class); //Query query = sessionFactory.getCurrentSession().
	 * createSQLQuery("CALL sp_get_product_expiry_by_expdate_and_batch_id(:batch_exp_date_timestamp, :p_batch_id )"
	 * ); query.registerStoredProcedureParameter("batch_exp_date_timestamp",
	 * String.class, ParameterMode.IN);
	 * query.registerStoredProcedureParameter("p_batch_id", String.class,
	 * ParameterMode.IN); query.setParameter("batch_exp_date_timestamp", from);
	 * query.setParameter("p_batch_id",34);
	 * //query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	 * List<ReportExpiry> list = Arrays.asList(query); list.forEach((u) ->
	 * u.setBatch_exp_date_timestamp() ); List<Map<String, Object>> rows =
	 * query.getResultList(); //for (Map<String, Object> row : rows) { for
	 * (Map<String, Object> row : rows) {
	 * 
	 * ReportExpiry reportExpiry = new ReportExpiry();
	 * 
	 * if (row[0] != null) reportExpiry.setBatchId((String)row.get("batchId")); else
	 * reportExpiry.setBatchId("");
	 * 
	 * //if (row[1] != null)
	 * reportExpiry.setBatchCode((String)row.get("batchCode"));
	 * 
	 * else reportExpiry.setBatchCode("");
	 * 
	 * 
	 * //if (row[2] != null)
	 * reportExpiry.setBatchExpiry((String)row.get("batchExpiry"));
	 * 
	 * else reportExpiry.setBatchExpiry("");
	 * 
	 * 
	 * if (row[3] != null)
	 * reportExpiry.setProductName((String)row.get("productName"));
	 * 
	 * else reportExpiry.setProductName("");
	 * 
	 * 
	 * if (row[4] != null) reportExpiry.setStock((String)row.get("stock"));
	 * 
	 * else reportExpiry.setStock("");
	 * 
	 * 
	 * reportExpiries.add(reportExpiry); } } catch (Exception e) {
	 * e.printStackTrace(); } return reportExpiries; }
	 */

	@Override
	public List<ReportProductWiseBatchSale> getFifthCounterDailySaleData(String from, String type) {
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,counter_sale_for_date,counter_slave_No from pharma_fifth_counter_sale_master c_master inner join pharma_fifth_counter_sale_slave c_slave ON c_slave.counter_slave_master_id = c_master.counter_sale_id where c_master.counter_sale_for_date = '"
				+ from + "'";

		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setVouNo(row[0].toString());
				else
					productByBatch.setVouNo("");

				if (row[1] != null)
					productByBatch.setPatientName(row[1].toString());
				else
					productByBatch.setPatientName("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
				}

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getTotalSaleDataForFifthCounter(String from, String to, String type) {
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt from pharma_fifth_counter_sale_master c_master inner join pharma_fifth_counter_sale_slave c_slave ON c_slave.counter_slave_master_id = c_master.counter_sale_id where counter_slave_No = '5' and (c_master.counter_sale_for_date between '"
					+ from + "' and '" + to + "')";
		} else {
			counterSale = "select c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt from pharma_counter_sale_master c_master where c_master.counter_sale_for_date between '"
					+ from + "' and '" + to + "'";
		}

		String indentSale = "select c_master.indent_sale_doc_no,pat.fName,pat.addressLine1,c_master.indent_sale_net_amt from     pharma_indent_sale_master c_master inner join pharma_indent_master indent_m on indent_m.indent_id=c_master.indent_sale_indent_no inner join treatment t on t.Treatment_ID=indent_m.indent_treatement_id inner join patient pat on pat.Patient_ID=t.Patient_ID where c_master.indent_sale_received_date between '"
				+ from + "' and '" + to + "' ";
		String hospitalSale = "select c_master.hospital_bill_doc_no,c_master.hospital_bill_patient_name,p.addressLine1,c_master.hospital_bill_net_amt from  pharma_hospital_bill_master c_master inner join patient p on p.Patient_ID=c_master.hospital_bill_patient_id where c_master.hospital_bill_date between '"
				+ from + "' and '" + to + "'";
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setVouNo(row[0].toString());
				else
					productByBatch.setVouNo("");

				if (row[1] != null)
					productByBatch.setPatientName(row[1].toString());
				else
					productByBatch.setPatientName("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
				} else if (type.equals("indentSale")) {
					productByBatch.setType("indentSale");
				} else if (type.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
				}
				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportPurchase> getDayWisePurchase(String from, String to, String callform) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			if (callform.equals("pending")) {
				query = sessionFactory.getCurrentSession()
						.createSQLQuery("CALL sp_get_due_purchase_bill_data(:p_bill_date_form,:p_bill_date_to)");
				query.setParameter("p_bill_date_form", from);
				query.setParameter("p_bill_date_to", to);
			} else {
				/*
				 * query = sessionFactory.getCurrentSession().createSQLQuery(
				 * "select     master.pur_id as pur_id,    vendor.vendor_name as vendorName,    master.pur_bill_no as purBillNo,    master.pur_bill_date as date,    master.pur_gross_amt as amnt,    master.pur_item_disc as discount,    master.pur_vat as vat,    master.pur_add as pur_add,    master.pur_less as pur_less,    master.pur_trans_type as type,    master.pur_net_amt as pur_net_amt  from    pharma_purchase_master master        inner join    pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id where    master.pur_delete_flag = '0'        and pur_bill_date between '"
				 * + "''" + "' and '" + to + "'");
				 */
				query = sessionFactory.getCurrentSession()
						.createSQLQuery("CALL sp_get_purchase_day_book(:p_bill_date)");
				query.setParameter("p_bill_date", to);
			}
			query.setResultTransformer(new AliasToBeanResultTransformer(ReportPurchase.class));
			@SuppressWarnings("unchecked")
			List<ReportPurchase> lst = query.list();

			return lst;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}

		/*
		 * @SuppressWarnings("unchecked") List<Object[]> rows = query.list(); for
		 * (Object[] row : rows) {
		 * 
		 * ReportPurchase reportPurchase = new ReportPurchase();
		 * 
		 * if (row[0] != null) reportPurchase.setProductId(row[0].toString()); else
		 * reportPurchase.setProductId("");
		 * 
		 * if (row[1] != null) reportPurchase.setVendorName(row[1].toString()); else
		 * reportPurchase.setVendorName("");
		 * 
		 * if (row[2] != null) reportPurchase.setProductPack(row[2].toString()); else
		 * reportPurchase.setProductPack("");
		 * 
		 * if (row[3] != null) reportPurchase.setProductCompany(row[3].toString()); else
		 * reportPurchase.setProductCompany("");
		 * 
		 * if (row[4] != null) reportPurchase.setProductName(row[4].toString()); else
		 * reportPurchase.setProductName("");
		 * 
		 * if (row[5] != null) reportPurchase.setQty(row[5].toString()); else
		 * reportPurchase.setQty("");
		 * 
		 * if (row[6] != null) reportPurchase.setMrp(row[6].toString()); else
		 * reportPurchase.setMrp("");
		 * 
		 * if (row[7] != null) reportPurchase.setAmount(row[7].toString()); else
		 * reportPurchase.setAmount("");
		 * 
		 * if (row[8] != null) reportPurchase.setBillDate(row[8].toString()); else
		 * reportPurchase.setBillDate("");
		 * 
		 * if (row[10] != null) reportPurchase.setVouNo(row[10].toString()); else
		 * reportPurchase.setVouNo("");
		 * 
		 * if (row[9] != null) { if (row[9].toString().equals("0"))
		 * reportPurchase.setType("Credit"); else if (row[9].toString().equals("1"))
		 * reportPurchase.setType("Cash"); else reportPurchase.setType("Card"); } else
		 * reportPurchase.setType("");
		 * 
		 * reportPurchases.add(reportPurchase); } } catch (Exception e) {
		 * e.printStackTrace(); } return reportPurchases;
		 */
	}

	@Override
	public List<ReportProductWiseBatchSale> getTotalSchH1CounterSaleData(String from, String to, String type) {
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,product.product_name,sl.counter_slave_qty,sl.counter_slave_rate,sl.counter_slave_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave sl on sl.counter_slave_master_id=c_master.counter_sale_id inner join pharma_product_master product on product.product_id=sl.counter_slave_product_id where product.product_h1=1 and c_master.counter_sale_for_date between '"
					+ from + "' and '" + to + "' and counter_slave_No between '1' and '4'";
		} else {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt, "
					+ " product.product_name,sl.counter_slave_qty,sl.counter_slave_rate,sl.counter_slave_amt,sl.counter_slave_batch_code,sl.counter_slave_batch_expiry, "
					+ " drug.drug_name,c_master.counter_sale_doctor,c_master.counter_sale_for_date from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave sl ON sl.counter_slave_master_id = c_master.counter_sale_id "
					+ " inner join pharma_product_master product ON product.product_id = sl.counter_slave_product_id inner join pharma_drug_master drug on product.product_drug_id=drug.drug_id "
					+ " where product.product_h1 = 1 and c_master.counter_sale_for_date between '" + from + "' and '"
					+ to + "'";
		}

		String patientSale = " select     d.doc_name,    d.regNo,    concat(d.address,            ' ',            d.city,            ' ',            d.state,            '-',            d.zip) as doc_addr,    concat(p1.f_name,            ' ',            p1.m_name,            ' ',            p1.l_name) as pname,    concat(IFNULL(p1.address, ''),            ' ',            IFNULL(c.city_name, ''),            ' ',            IFNULL(t1.taluka_name, ''),            ' ',            IFNULL(dist.dis_name, ''),            ' ',            IFNULL(st.state_name, '')) as p_addr,    p.product_name,    s.patient_slave_qty,   concat('PS-', p_master.patient_sales_bill_id),    p_master.patient_bill_date from    pharma_patient_sales_bill_master p_master        inner join    pharma_patient_sales_bill_slave s ON p_master.patient_sales_bill_id = s.patient_slave_bill_master_id        inner join    pharma_product_master p ON p.product_id = s.patient_slave_product_id        inner join    ehat_patient p1 ON p1.Patient_ID = p_master.patient_bill_patient_id        inner join    doctor d ON d.Doctor_ID = p_master.patient_bill_doctor_id        LEFT JOIN    city c ON p1.town_id = c.idcity        LEFT JOIN    taluka t1 ON p1.taluka_id = t1.idtaluka        LEFT JOIN    district dist ON dist.iddistrict = p1.district_id        LEFT JOIN    state st ON st.idstate = p1.state_id where    p_master.patient_sales_bill_delete_flag = 0        and p.product_h1 = 1        and p_master.patient_bill_date between '"
				+ from + "' and '" + to + "' ";
		/*
		 * String indentSale=
		 * "	select     d.doc_name,    d.regNo,    concat(d.address,            ' ',            d.city,            ' ',            d.state,            '-',            d.zip) as doc_addr,    concat(p1.f_name,            ' ',            p1.m_name,            ' ',            p1.l_name) as pname,    concat(IFNULL(p1.address, ''),            ' ',            IFNULL(c.city_name, ''),            ' ',            IFNULL(t1.taluka_name, ''),            ' ',            IFNULL(dist.dis_name, ''),            ' ',            IFNULL(st.state_name, '')) as p_addr,    p.product_name,    s.indent_sale_slave_issue_qty,    concat('IS-',p_master.indent_sale_id),    p_master.disc_given_date from    pharma_indent_master i        inner join    pharma_indent_sale_master p_master ON i.indent_id = p_master.indent_sale_indent_no        inner join    pharma_indent_sale_slave s ON p_master.indent_sale_id = s.indent_sale_slave_master_id        inner join    pharma_product_master p ON p.product_id = s.indent_sale_slave_product_id        inner join    ehat_treatment tre ON tre.treatment_id = i.indent_treatement_id        inner join    ehat_patient p1 ON p1.Patient_ID = tre.patient_id        inner join    doctor d ON d.Doctor_ID = i.indent_created_by        LEFT JOIN    city c ON p1.town_id = c.idcity        LEFT JOIN    taluka t1 ON p1.taluka_id = t1.idtaluka        LEFT JOIN    district dist ON dist.iddistrict = p1.district_id        LEFT JOIN    state st ON st.idstate = p1.state_id where  p_master.indent_sale_delete_flag = 0        and p.product_h1 = 1 and    p_master.disc_given_date between '"
		 * '" + from + "' and '" + to + "'";
		 */

		String indentSale = " select     d.doc_name,    d.regNo,    concat(d.address,            ' ',            d.city,            ' ',            d.state,            '-',            d.zip) as doc_addr,    concat(p1.f_name,            ' ',            p1.m_name,            ' ',            p1.l_name) as pname,    concat(IFNULL(p1.address, ''),            ' ',            IFNULL(c.city_name, ''),            ' ',            IFNULL(t1.taluka_name, ''),            ' ',            IFNULL(dist.dis_name, ''),            ' ',            IFNULL(st.state_name, '')) as p_addr,    p.product_name,    s.indent_sale_slave_issue_qty,    concat('IS-',p_master.indent_sale_id),    p_master.disc_given_date from    pharma_indent_master i        inner join    pharma_indent_sale_master p_master ON i.indent_id = p_master.indent_sale_indent_no        inner join    pharma_indent_sale_slave s ON p_master.indent_sale_id = s.indent_sale_slave_master_id        inner join    pharma_product_master p ON p.product_id = s.indent_sale_slave_product_id        inner join    ehat_treatment tre ON tre.treatment_id = i.indent_treatement_id        inner join    ehat_patient p1 ON p1.Patient_ID = tre.patient_id        inner join    doctor d ON d.Doctor_ID = i.indent_created_by        LEFT JOIN    city c ON p1.town_id = c.idcity        LEFT JOIN    taluka t1 ON p1.taluka_id = t1.idtaluka        LEFT JOIN    district dist ON dist.iddistrict = p1.district_id        LEFT JOIN    state st ON st.idstate = p1.state_id where  p_master.indent_sale_delete_flag = 0        and p.product_h1 = 1 and    p_master.disc_given_date between '"
				+ from + "' and '" + to + "'";
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} /*
				 * else if (type.equals("hospitalSale")) { query =
				 * sessionFactory.getCurrentSession().createSQLQuery( hospitalSale); }
				 */ else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
			}

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setDoctorName(row[0].toString());
				else
					productByBatch.setDoctorName("");

				if (row[1] != null)
					productByBatch.setVouNo(row[1].toString());
				else
					productByBatch.setVouNo("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[3] != null)
					productByBatch.setPatientName(row[3].toString());
				else
					productByBatch.setPatientName("");

				if (row[4] != null)
					productByBatch.setPatientAddress(row[4].toString());
				else
					productByBatch.setPatientAddress("");

				if (row[5] != null)
					productByBatch.setProductName(row[5].toString());
				else
					productByBatch.setProductName("");

				if (row[6] != null)
					productByBatch.setQty(row[6].toString());
				else
					productByBatch.setQty("");

				if (row[7] != null)
					productByBatch.setPatientId(row[7].toString());// sale id
				else
					productByBatch.setPatientId("");

				if (row[8] != null)
					productByBatch.setDate(row[8].toString());
				else
					productByBatch.setDate("");

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getTotalSchXCounterSaleData(String from, String to, String type) {
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,product.product_name,sl.counter_slave_qty,sl.counter_slave_rate,sl.counter_slave_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave sl on sl.counter_slave_master_id=c_master.counter_sale_id inner join pharma_product_master product on product.product_id=sl.counter_slave_product_id where product.product_h1=1 and c_master.counter_sale_for_date between '"
					+ from + "' and '" + to + "' and counter_slave_No between '1' and '4'";
		} else {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt, "
					+ " product.product_name,sl.counter_slave_qty,sl.counter_slave_rate,sl.counter_slave_amt,sl.counter_slave_batch_code,sl.counter_slave_batch_expiry, "
					+ " drug.drug_name,c_master.counter_sale_doctor,c_master.counter_sale_for_date from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave sl ON sl.counter_slave_master_id = c_master.counter_sale_id "
					+ " inner join pharma_product_master product ON product.product_id = sl.counter_slave_product_id inner join pharma_drug_master drug on product.product_drug_id=drug.drug_id "
					+ " where product.product_x = 1 and c_master.counter_sale_for_date between '" + from + "' and '"
					+ to + "'";
		}

		String indentSale = " select c_master.indent_sale_id,pat.fName,pat.addressLine1,c_master.indent_sale_net_amt,product.product_name,sl.indent_sale_slave_qty,sl.indent_sale_slave_rate, "
				+ " sl.indent_sale_slave_amt,sl.indent_sale_slave_batch_code,sl.indent_sale_slave_batch_expiry,drug.drug_name,d.doc_name,c_master.indent_sale_received_date,pat.mName,pat.lName,d.address from "
				+ " pharma_indent_sale_master c_master inner join pharma_indent_sale_slave sl ON sl.indent_sale_slave_master_id = c_master.indent_sale_id "
				+ " inner join pharma_product_master product ON product.product_id = sl.indent_sale_slave_product_id inner join pharma_indent_master indent_m ON indent_m.indent_id = c_master.indent_sale_indent_no "
				+ " inner join treatment t ON t.Treatment_ID = indent_m.indent_treatement_id inner join patient pat ON pat.Patient_ID = t.Patient_ID "
				+ " inner join pharma_drug_master drug on product.product_drug_id=drug.drug_id inner join doctor d on d.Doctor_ID=t.doctor_id "
				+ " where product.product_x = 1 and c_master.indent_sale_received_date between '" + from + "' and '"
				+ to + "' ";

		String hospitalSale = " select c_master.hospital_bill_id,c_master.hospital_bill_patient_name,p.addressLine1,c_master.hospital_bill_net_amt, "
				+ " product.product_name,sl.hospital_slave_qty,sl.hospital_slave_rate,sl.hospital_slave_amt,sl.hospital_slave_batch_code, "
				+ " sl.hospital_slave_batch_expiry,drug.drug_name,d.doc_name,c_master.hospital_bill_date,p.mName,p.lName,d.address from pharma_hospital_bill_master c_master inner join "
				+ " pharma_hospital_bill_slave sl ON sl.hospital_slave_master_id = c_master.hospital_bill_id inner join pharma_product_master product ON product.product_id = sl.hospital_slave_product_id "
				+ " inner join patient p ON p.Patient_ID = c_master.hospital_bill_patient_id inner join pharma_drug_master drug on product.product_drug_id=drug.drug_id "
				+ " inner join doctor d on d.Doctor_ID=c_master.hospital_bill_doctor_id where product.product_x = 1 "
				+ " and c_master.hospital_bill_date between '" + from + "' and '" + to + "'";

		String patientSale = " select p_master.patient_sales_bill_id,p.fName,p.addressLine1,p_master.patient_sales_bill_net_amt,product.product_name,sl.patient_slave_qty,sl.patient_slave_rate,sl.patient_slave_amt, "
				+ " sl.patient_slave_batch_code,sl.patient_slave_batch_expiry,drug.drug_name,p_master.patient_doctor_name,p_master.patient_bill_date,p.mName,p.lName,d.address "
				+ " from pharma_patient_sales_bill_master p_master inner join pharma_patient_sales_bill_slave sl ON sl.patient_slave_bill_master_id = p_master.patient_sales_bill_id "
				+ " inner join pharma_product_master product ON product.product_id = sl.patient_slave_product_id inner join patient p ON p.Patient_ID = p_master.patient_bill_patient_id "
				+ " inner join pharma_drug_master drug ON product.product_drug_id = drug.drug_id inner join doctor d on d.Doctor_ID=p_master.patient_bill_doctor_id "
				+ "  where product.product_x = 1 and p_master.patient_bill_date between '" + from + "' and '" + to
				+ "'";
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				/*
				 * if (row[0] != null) productByBatch.setVouNo(row[0].toString()); else
				 * productByBatch.setVouNo("");
				 */

				if (row[2] != null)
					productByBatch.setPatientAddress(row[2].toString());
				else
					productByBatch.setPatientAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (row[4] != null)
					productByBatch.setProductName(row[4].toString());
				else
					productByBatch.setProductName("");

				if (row[5] != null)
					productByBatch.setQty(row[5].toString());
				else
					productByBatch.setQty("");

				if (row[6] != null)
					productByBatch.setRate(row[6].toString());
				else
					productByBatch.setRate("");

				if (row[7] != null)
					productByBatch.setAmount(row[7].toString());
				else
					productByBatch.setAmount("");

				if (row[8] != null)
					productByBatch.setBatchCode(row[8].toString());
				else
					productByBatch.setBatchCode("");

				if (row[9] != null)
					productByBatch.setBatchExp(row[9].toString());
				else
					productByBatch.setBatchExp("");

				if (row[10] != null)
					productByBatch.setDrugName(row[10].toString());
				else
					productByBatch.setDrugName("");

				if (row[11] != null)
					productByBatch.setDoctorName(row[11].toString());
				else
					productByBatch.setDoctorName("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(row[1].toString());
					else
						productByBatch.setPatientName("");

					productByBatch.setVendorAddress("");

				} else if (type.equals("indentSale")) {
					productByBatch.setType("indentSale");
					productByBatch.setVouNo("IS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(
								row[1].toString() + " " + row[13].toString() + " " + row[14].toString());
					else
						productByBatch.setPatientName("");

					if (row[15] != null)
						productByBatch.setVendorAddress(row[15].toString());
					else
						productByBatch.setVendorAddress("");

				} else if (type.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
					productByBatch.setVouNo("HS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(
								row[1].toString() + " " + row[13].toString() + " " + row[14].toString());
					else
						productByBatch.setPatientName("");

					if (row[15] != null)
						productByBatch.setVendorAddress(row[15].toString());
					else
						productByBatch.setVendorAddress("");

				} else if (type.equals("patientSale")) {
					productByBatch.setType("patientSale");
					productByBatch.setVouNo("PS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(
								row[1].toString() + " " + row[13].toString() + " " + row[14].toString());
					else
						productByBatch.setPatientName("");

					if (row[15] != null)
						productByBatch.setVendorAddress(row[15].toString());
					else
						productByBatch.setVendorAddress("");

				}

				if (row[12] != null)
					productByBatch.setDate(row[12].toString());
				else
					productByBatch.setDate("");

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getTotalSchNDPSCounterSaleData(String from, String to, String type) {
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,product.product_name,sl.counter_slave_qty,sl.counter_slave_rate,sl.counter_slave_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave sl on sl.counter_slave_master_id=c_master.counter_sale_id inner join pharma_product_master product on product.product_id=sl.counter_slave_product_id where product.product_h1=1 and c_master.counter_sale_for_date between '"
					+ from + "' and '" + to + "' and counter_slave_No between '1' and '4'";
		} else {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt, "
					+ " product.product_name,sl.counter_slave_qty,sl.counter_slave_rate,sl.counter_slave_amt,sl.counter_slave_batch_code,sl.counter_slave_batch_expiry, "
					+ " drug.drug_name,c_master.counter_sale_doctor,c_master.counter_sale_for_date from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave sl ON sl.counter_slave_master_id = c_master.counter_sale_id "
					+ " inner join pharma_product_master product ON product.product_id = sl.counter_slave_product_id inner join pharma_drug_master drug on product.product_drug_id=drug.drug_id "
					+ " where product.product_ndps = 1 and c_master.counter_sale_for_date between '" + from + "' and '"
					+ to + "'";
		}

		String indentSale = " select c_master.indent_sale_id,pat.fName,pat.addressLine1,c_master.indent_sale_net_amt,product.product_name,sl.indent_sale_slave_qty,sl.indent_sale_slave_rate, "
				+ " sl.indent_sale_slave_amt,sl.indent_sale_slave_batch_code,sl.indent_sale_slave_batch_expiry,drug.drug_name,d.doc_name,c_master.indent_sale_received_date,pat.mName,pat.lName,d.address from "
				+ " pharma_indent_sale_master c_master inner join pharma_indent_sale_slave sl ON sl.indent_sale_slave_master_id = c_master.indent_sale_id "
				+ " inner join pharma_product_master product ON product.product_id = sl.indent_sale_slave_product_id inner join pharma_indent_master indent_m ON indent_m.indent_id = c_master.indent_sale_indent_no "
				+ " inner join treatment t ON t.Treatment_ID = indent_m.indent_treatement_id inner join patient pat ON pat.Patient_ID = t.Patient_ID "
				+ " inner join pharma_drug_master drug on product.product_drug_id=drug.drug_id inner join doctor d on d.Doctor_ID=t.doctor_id "
				+ " where product.product_ndps = 1 and c_master.indent_sale_received_date between '" + from + "' and '"
				+ to + "' ";

		String hospitalSale = " select c_master.hospital_bill_id,c_master.hospital_bill_patient_name,p.addressLine1,c_master.hospital_bill_net_amt, "
				+ " product.product_name,sl.hospital_slave_qty,sl.hospital_slave_rate,sl.hospital_slave_amt,sl.hospital_slave_batch_code, "
				+ " sl.hospital_slave_batch_expiry,drug.drug_name,d.doc_name,c_master.hospital_bill_date,p.mName,p.lName,d.address from pharma_hospital_bill_master c_master inner join "
				+ " pharma_hospital_bill_slave sl ON sl.hospital_slave_master_id = c_master.hospital_bill_id inner join pharma_product_master product ON product.product_id = sl.hospital_slave_product_id "
				+ " inner join patient p ON p.Patient_ID = c_master.hospital_bill_patient_id inner join pharma_drug_master drug on product.product_drug_id=drug.drug_id "
				+ " inner join doctor d on d.Doctor_ID=c_master.hospital_bill_doctor_id where product.product_ndps = 1 "
				+ " and c_master.hospital_bill_date between '" + from + "' and '" + to + "'";

		String patientSale = "  select p_master.patient_sales_bill_id,p.fName,p.addressLine1,p_master.patient_sales_bill_net_amt,product.product_name,sl.patient_slave_qty,sl.patient_slave_rate,sl.patient_slave_amt, "
				+ " sl.patient_slave_batch_code,sl.patient_slave_batch_expiry,drug.drug_name,p_master.patient_doctor_name,p_master.patient_bill_date,p.mName,p.lName,d.address "
				+ " from pharma_patient_sales_bill_master p_master inner join pharma_patient_sales_bill_slave sl ON sl.patient_slave_bill_master_id = p_master.patient_sales_bill_id "
				+ " inner join pharma_product_master product ON product.product_id = sl.patient_slave_product_id inner join patient p ON p.Patient_ID = p_master.patient_bill_patient_id "
				+ " inner join pharma_drug_master drug ON product.product_drug_id = drug.drug_id inner join doctor d on d.Doctor_ID=p_master.patient_bill_doctor_id "
				+ "  where product.product_ndps = 1 and p_master.patient_bill_date between '" + from + "' and '" + to
				+ "'";
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);

			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);

			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);

			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);

			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				/*
				 * if (row[0] != null) productByBatch.setVouNo(row[0].toString()); else
				 * productByBatch.setVouNo("");
				 */

				if (row[2] != null)
					productByBatch.setPatientAddress(row[2].toString());
				else
					productByBatch.setPatientAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (row[4] != null)
					productByBatch.setProductName(row[4].toString());
				else
					productByBatch.setProductName("");

				if (row[5] != null)
					productByBatch.setQty(row[5].toString());
				else
					productByBatch.setQty("");

				if (row[6] != null)
					productByBatch.setRate(row[6].toString());
				else
					productByBatch.setRate("");

				if (row[7] != null)
					productByBatch.setAmount(row[7].toString());
				else
					productByBatch.setAmount("");

				if (row[8] != null)
					productByBatch.setBatchCode(row[8].toString());
				else
					productByBatch.setBatchCode("");

				if (row[9] != null)
					productByBatch.setBatchExp(row[9].toString());
				else
					productByBatch.setBatchExp("");

				if (row[10] != null)
					productByBatch.setDrugName(row[10].toString());
				else
					productByBatch.setDrugName("");

				if (row[11] != null)
					productByBatch.setDoctorName(row[11].toString());
				else
					productByBatch.setDoctorName("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(row[1].toString());
					else
						productByBatch.setPatientName("");

					productByBatch.setVendorAddress("");

				} else if (type.equals("indentSale")) {
					productByBatch.setType("indentSale");
					productByBatch.setVouNo("IS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(
								row[1].toString() + " " + row[13].toString() + " " + row[14].toString());
					else
						productByBatch.setPatientName("");

					if (row[15] != null)
						productByBatch.setVendorAddress(row[15].toString());
					else
						productByBatch.setVendorAddress("");

				} else if (type.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
					productByBatch.setVouNo("HS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(
								row[1].toString() + " " + row[13].toString() + " " + row[14].toString());
					else
						productByBatch.setPatientName("");

					if (row[15] != null)
						productByBatch.setVendorAddress(row[15].toString());
					else
						productByBatch.setVendorAddress("");

				} else if (type.equals("patientSale")) {
					productByBatch.setType("patientSale");
					productByBatch.setVouNo("PS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(
								row[1].toString() + " " + row[13].toString() + " " + row[14].toString());
					else
						productByBatch.setPatientName("");

					if (row[15] != null)
						productByBatch.setVendorAddress(row[15].toString());
					else
						productByBatch.setVendorAddress("");

				}

				if (row[12] != null)
					productByBatch.setDate(row[12].toString());
				else
					productByBatch.setDate("");

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getTotalSchNRXCounterSaleData(String from, String to, String type) {
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,product.product_name,sl.counter_slave_qty,sl.counter_slave_rate,sl.counter_slave_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave sl on sl.counter_slave_master_id=c_master.counter_sale_id inner join pharma_product_master product on product.product_id=sl.counter_slave_product_id where product.product_h1=1 and c_master.counter_sale_for_date between '"
					+ from + "' and '" + to + "' and counter_slave_No between '1' and '4'";
		} else {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt, "
					+ " product.product_name,sl.counter_slave_qty,sl.counter_slave_rate,sl.counter_slave_amt,sl.counter_slave_batch_code,sl.counter_slave_batch_expiry, "
					+ " drug.drug_name,c_master.counter_sale_doctor,c_master.counter_sale_for_date from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave sl ON sl.counter_slave_master_id = c_master.counter_sale_id "
					+ " inner join pharma_product_master product ON product.product_id = sl.counter_slave_product_id inner join pharma_drug_master drug on product.product_drug_id=drug.drug_id "
					+ " where product.product_nrx = 1 and c_master.counter_sale_for_date between '" + from + "' and '"
					+ to + "'";
		}

		String indentSale = " select c_master.indent_sale_id,pat.fName,pat.addressLine1,c_master.indent_sale_net_amt,product.product_name,sl.indent_sale_slave_qty,sl.indent_sale_slave_rate, "
				+ " sl.indent_sale_slave_amt,sl.indent_sale_slave_batch_code,sl.indent_sale_slave_batch_expiry,drug.drug_name,d.doc_name,c_master.indent_sale_received_date,pat.mName,pat.lName,d.address from "
				+ " pharma_indent_sale_master c_master inner join pharma_indent_sale_slave sl ON sl.indent_sale_slave_master_id = c_master.indent_sale_id "
				+ " inner join pharma_product_master product ON product.product_id = sl.indent_sale_slave_product_id inner join pharma_indent_master indent_m ON indent_m.indent_id = c_master.indent_sale_indent_no "
				+ " inner join treatment t ON t.Treatment_ID = indent_m.indent_treatement_id inner join patient pat ON pat.Patient_ID = t.Patient_ID "
				+ " inner join pharma_drug_master drug on product.product_drug_id=drug.drug_id inner join doctor d on d.Doctor_ID=t.doctor_id "
				+ " where product.product_nrx = 1 and c_master.indent_sale_received_date between '" + from + "' and '"
				+ to + "' ";

		String hospitalSale = " select c_master.hospital_bill_id,c_master.hospital_bill_patient_name,p.addressLine1,c_master.hospital_bill_net_amt, "
				+ " product.product_name,sl.hospital_slave_qty,sl.hospital_slave_rate,sl.hospital_slave_amt,sl.hospital_slave_batch_code, "
				+ " sl.hospital_slave_batch_expiry,drug.drug_name,d.doc_name,c_master.hospital_bill_date,p.mName,p.lName,d.address from pharma_hospital_bill_master c_master inner join "
				+ " pharma_hospital_bill_slave sl ON sl.hospital_slave_master_id = c_master.hospital_bill_id inner join pharma_product_master product ON product.product_id = sl.hospital_slave_product_id "
				+ " inner join patient p ON p.Patient_ID = c_master.hospital_bill_patient_id inner join pharma_drug_master drug on product.product_drug_id=drug.drug_id "
				+ " inner join doctor d on d.Doctor_ID=c_master.hospital_bill_doctor_id where product.product_nrx = 1 "
				+ " and c_master.hospital_bill_date between '" + from + "' and '" + to + "'";

		String patientSale = " select p_master.patient_sales_bill_id,p.fName,p.addressLine1,p_master.patient_sales_bill_net_amt,product.product_name,sl.patient_slave_qty,sl.patient_slave_rate,sl.patient_slave_amt, "
				+ " sl.patient_slave_batch_code,sl.patient_slave_batch_expiry,drug.drug_name,p_master.patient_doctor_name,p_master.patient_bill_date,p.mName,p.lName,d.address "
				+ " from pharma_patient_sales_bill_master p_master inner join pharma_patient_sales_bill_slave sl ON sl.patient_slave_bill_master_id = p_master.patient_sales_bill_id "
				+ " inner join pharma_product_master product ON product.product_id = sl.patient_slave_product_id inner join patient p ON p.Patient_ID = p_master.patient_bill_patient_id "
				+ " inner join pharma_drug_master drug ON product.product_drug_id = drug.drug_id inner join doctor d on d.Doctor_ID=p_master.patient_bill_doctor_id "
				+ "  where product.product_nrx = 1 and p_master.patient_bill_date between '" + from + "' and '" + to
				+ "'";
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				/*
				 * if (row[0] != null) productByBatch.setVouNo(row[0].toString()); else
				 * productByBatch.setVouNo("");
				 */

				if (row[2] != null)
					productByBatch.setPatientAddress(row[2].toString());
				else
					productByBatch.setPatientAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (row[4] != null)
					productByBatch.setProductName(row[4].toString());
				else
					productByBatch.setProductName("");

				if (row[5] != null)
					productByBatch.setQty(row[5].toString());
				else
					productByBatch.setQty("");

				if (row[6] != null)
					productByBatch.setRate(row[6].toString());
				else
					productByBatch.setRate("");

				if (row[7] != null)
					productByBatch.setAmount(row[7].toString());
				else
					productByBatch.setAmount("");

				if (row[8] != null)
					productByBatch.setBatchCode(row[8].toString());
				else
					productByBatch.setBatchCode("");

				if (row[9] != null)
					productByBatch.setBatchExp(row[9].toString());
				else
					productByBatch.setBatchExp("");

				if (row[10] != null)
					productByBatch.setDrugName(row[10].toString());
				else
					productByBatch.setDrugName("");

				if (row[11] != null)
					productByBatch.setDoctorName(row[11].toString());
				else
					productByBatch.setDoctorName("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(row[1].toString());
					else
						productByBatch.setPatientName("");

					productByBatch.setVendorAddress("");

				} else if (type.equals("indentSale")) {
					productByBatch.setType("indentSale");
					productByBatch.setVouNo("IS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(
								row[1].toString() + " " + row[13].toString() + " " + row[14].toString());
					else
						productByBatch.setPatientName("");

					if (row[15] != null)
						productByBatch.setVendorAddress(row[15].toString());
					else
						productByBatch.setVendorAddress("");

				} else if (type.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
					productByBatch.setVouNo("HS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(
								row[1].toString() + " " + row[13].toString() + " " + row[14].toString());
					else
						productByBatch.setPatientName("");

					if (row[15] != null)
						productByBatch.setVendorAddress(row[15].toString());
					else
						productByBatch.setVendorAddress("");

				} else if (type.equals("patientSale")) {
					productByBatch.setType("patientSale");
					productByBatch.setVouNo("PS" + row[0].toString());

					if (row[1] != null)
						productByBatch.setPatientName(
								row[1].toString() + " " + row[13].toString() + " " + row[14].toString());
					else
						productByBatch.setPatientName("");

					if (row[15] != null)
						productByBatch.setVendorAddress(row[15].toString());
					else
						productByBatch.setVendorAddress("");
				}

				if (row[12] != null)
					productByBatch.setDate(row[12].toString());
				else
					productByBatch.setDate("");

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getCategoryWiseSaleData(String from, String to, String type, String catId) {
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,product.product_name,sl.counter_slave_qty,sl.counter_slave_rate,sl.counter_slave_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave sl on sl.counter_slave_master_id=c_master.counter_sale_id inner join pharma_product_master product on product.product_id=sl.counter_slave_product_id inner join pharma_category_master cat ON product.product_cat_id = cat.cat_id where cat.cat_id="
					+ catId + " and c_master.counter_sale_for_date between '" + from + "' and '" + to
					+ "' and counter_slave_No between '1' and '4'";
		} else {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt,product.product_name,sl.counter_slave_qty,sl.counter_slave_rate,sl.counter_slave_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave sl on sl.counter_slave_master_id=c_master.counter_sale_id inner join pharma_product_master product on product.product_id=sl.counter_slave_product_id inner join pharma_category_master cat ON product.product_cat_id = cat.cat_id where cat.cat_id="
					+ catId + " c_master.counter_sale_for_date between '" + from + "' and '" + to + "'";
		}

		String indentSale = "select c_master.indent_sale_doc_no,pat.fName,pat.addressLine1,c_master.indent_sale_net_amt,product.product_name,sl.indent_sale_slave_qty,sl.indent_sale_slave_rate,sl.indent_sale_slave_amt from     pharma_indent_sale_master c_master inner join pharma_indent_sale_slave sl on sl.indent_sale_slave_master_id=c_master.indent_sale_id inner join pharma_product_master product ON product.product_id = sl.indent_sale_slave_product_id inner join pharma_category_master cat ON product.product_cat_id = cat.cat_id inner join pharma_indent_master indent_m on indent_m.indent_id=c_master.indent_sale_indent_no inner join treatment t on t.Treatment_ID=indent_m.indent_treatement_id inner join patient pat on pat.Patient_ID=t.Patient_ID where cat.cat_id="
				+ catId + " and c_master.indent_sale_received_date between '" + from + "' and '" + to + "' ";
		String hospitalSale = "select c_master.hospital_bill_doc_no,c_master.hospital_bill_patient_name,p.addressLine1,c_master.hospital_bill_net_amt,product.product_name,sl.hospital_slave_qty,sl.hospital_slave_rate,sl.hospital_slave_amt from  pharma_hospital_bill_master c_master inner join pharma_hospital_bill_slave sl on sl.hospital_slave_master_id=c_master.hospital_bill_id inner join  pharma_product_master product ON product.product_id = sl.hospital_slave_product_id inner join pharma_category_master cat ON product.product_cat_id = cat.cat_id inner join patient p on p.Patient_ID=c_master.hospital_bill_patient_id where  cat.cat_id="
				+ catId + " and c_master.hospital_bill_date between '" + from + "' and '" + to + "'";

		String patientSale = " select p_master.patient_sales_bill_doc_no,p.fName,p.addressLine1,p_master.patient_sales_bill_net_amt,product.product_name,sl.patient_slave_qty,sl.patient_slave_rate,sl.patient_slave_amt "
				+ " from pharma_patient_sales_bill_master p_master inner join pharma_patient_sales_bill_slave sl ON sl.patient_slave_bill_master_id = p_master.patient_sales_bill_id inner join pharma_product_master product ON product.product_id = sl.patient_slave_product_id "
				+ " inner join pharma_category_master cat ON product.product_cat_id = cat.cat_id inner join patient p ON p.Patient_ID = p_master.patient_bill_patient_id where cat.cat_id = '1' "
				+ "  and p_master.patient_bill_date between '" + from + "' and '" + to + "'";
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setVouNo(row[0].toString());
				else
					productByBatch.setVouNo("");

				if (row[1] != null)
					productByBatch.setPatientName(row[1].toString());
				else
					productByBatch.setPatientName("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (row[4] != null)
					productByBatch.setProductName(row[4].toString());
				else
					productByBatch.setProductName("");

				if (row[5] != null)
					productByBatch.setQty(row[5].toString());
				else
					productByBatch.setQty("");

				if (row[6] != null)
					productByBatch.setRate(row[6].toString());
				else
					productByBatch.setRate("");

				if (row[7] != null)
					productByBatch.setAmount(row[7].toString());
				else
					productByBatch.setAmount("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
				} else if (type.equals("indentSale")) {
					productByBatch.setType("indentSale");
				} else if (type.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
				} else if (type.equals("patientSale")) {
					productByBatch.setType("patientSale");
				}
				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportStock> getProductWiseStockByProductId(Integer productId, String type) {
		List<ReportStock> reportStocks = new ArrayList<ReportStock>();
		SQLQuery query = null;
		String queryString = "";
		if (type.equals("purchase")) {
			queryString = " select product.product_name,product.product_uom_unit,pack.pack_type,stock.stock_qty_in_hand,pur_rate.pur_rate,batch.batch_code,pur_rate.pur_rate*stock.stock_qty_in_hand as amount from pharma_purchase_slave pur_slave"
					+ "  inner join pharma_purchase_master master on master.pur_id=pur_slave.pur_slave_master_id inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id"
					+ " inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id  inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id"
					+ " inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id"
					+ " where batch.batch_delete_flag = 0 and product.product_id = '" + productId
					+ "'  and stock.stock_qty_in_hand!='0' and master.pur_delete_flag='0' order by batch_exp_date desc";
		} else {
			queryString = "select product.product_name,product.product_uom_unit,pack.pack_type,stock.stock_qty_in_hand,pur_rate.pur_rate,batch.batch_code,pur_rate.pur_rate*stock.stock_qty_in_hand as amount from  pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id where batch.batch_delete_flag = 0 and pur_rate.pur_slave_id = 0 and product.product_id = '"
					+ productId + "' and stock.stock_qty_in_hand!='0' order by batch_exp_date desc";
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			DecimalFormat df2 = new DecimalFormat("0.00");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setProductName(row[0].toString());
				else
					reportStock.setProductName("");

				if (row[1] != null)
					reportStock.setProductUnit(row[1].toString());
				else
					reportStock.setProductUnit("");

				if (row[2] != null)
					reportStock.setProductPacking(row[2].toString());
				else
					reportStock.setProductPacking("");

				if (row[3] != null)
					reportStock.setStockInHand(row[3].toString());
				else
					reportStock.setStockInHand("");

				if (row[4] != null)
					reportStock.setPurRate(df2.format(row[4]).toString());
				else
					reportStock.setPurRate("");

				if (row[5] != null)
					reportStock.setBatchCode(row[5].toString());
				else
					reportStock.setBatchCode("");
				
				if (row[6] != null)
					reportStock.setAmount(df2.format(row[6]).toString());
				else
					reportStock.setAmount("");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;
	}

	@Override
	public List<ReportStock> getProductWiseStockByDrugId(Integer drugId, String type) {
		List<ReportStock> reportStocks = new ArrayList<ReportStock>();
		SQLQuery query = null;
		String queryString = "";
		if (type.equals("purchase")) {
			queryString = "select product.product_name,product.product_uom_unit,pack.pack_type,stock.stock_qty_in_hand,pur_rate.pur_rate,batch.batch_code from pharma_purchase_slave pur_slave inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_drug_master drug on drug.drug_id=product.product_drug_id where batch.batch_delete_flag = 0 and drug.drug_id = '"
					+ drugId + "' and stock.stock_qty_in_hand!='0' order by batch_exp_date desc";
		} else {
			queryString = "select product.product_name,product.product_uom_unit,pack.pack_type,stock.stock_qty_in_hand,pur_rate.pur_rate,batch.batch_code from  pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_drug_master drug on drug.drug_id=product.product_drug_id where batch.batch_delete_flag = 0 and pur_rate.pur_slave_id = 0 and drug.drug_id = '"
					+ drugId + "' and stock.stock_qty_in_hand!='0'  order by batch_exp_date desc";
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setProductName(row[0].toString());
				else
					reportStock.setProductName("");

				if (row[1] != null)
					reportStock.setProductUnit(row[1].toString());
				else
					reportStock.setProductUnit("");

				if (row[2] != null)
					reportStock.setProductPacking(row[2].toString());
				else
					reportStock.setProductPacking("");

				if (row[3] != null)
					reportStock.setStockInHand(row[3].toString());
				else
					reportStock.setStockInHand("");

				if (row[4] != null)
					reportStock.setPurRate(row[4].toString());
				else
					reportStock.setPurRate("");

				if (row[5] != null)
					reportStock.setBatchCode(row[5].toString());
				else
					reportStock.setBatchCode("");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;
	}

	@Override
	public List<ReportStock> getStockOutData(String from, String to, String type) {
		List<ReportStock> reportPurchases = new ArrayList<ReportStock>();
		SQLQuery query = null;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					/*
					 * "select sum(stock_out_qty),batch.batch_code,product.product_name,st_out.stock_out_date,st_out.stock_out_closing_stock,st_out.stock_out_current_stock from pharma_stock_out_entry st_out inner join pharma_batch_master batch on batch.batch_id=st_out.stock_out_batchId inner join pharma_product_master product on product.product_id=st_out.stock_out_productid where stock_out_date between '"
					 * + from + "' and '" + to + "' and stock_entry_type='" + type +
					 * "' group by batch.batch_code order by st_out.pur_stock_out_id desc ; ");
					 */
					"select sum(stock_out_qty), batch.batch_code, product.product_name, st_out.stock_out_date,st_out.stock_out_closing_stock,st_out.stock_out_current_stock,pur_rate.pur_rate,pur_rate.mrp,cat.cat_name from pharma_stock_out_entry st_out inner join pharma_batch_master batch ON batch.batch_id = st_out.stock_out_batchId inner join pharma_product_master product ON product.product_id = st_out.stock_out_productid inner join pharma_purchase_rate pur_rate on pur_rate.batch_id=st_out.stock_out_batchId "
							+ "inner join pharma_category_master cat on cat.cat_id=product.product_cat_id where stock_out_date between '"
							+ from + "' and '" + to + "' and stock_entry_type = '" + type
							+ "' group by batch.batch_code order by st_out.pur_stock_out_id desc;");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setStockInHand(row[0].toString());
				else
					reportStock.setStockInHand("");

				if (row[1] != null)
					reportStock.setBatchCode(row[1].toString());
				else
					reportStock.setBatchCode("");

				if (row[2] != null)
					reportStock.setProductName(row[2].toString());
				else
					reportStock.setProductName("");

				if (row[3] != null)
					reportStock.setAddDate(row[3].toString());
				else
					reportStock.setAddDate("");

				if (row[4] != null)
					reportStock.setClosingStock(row[4].toString());
				else
					reportStock.setClosingStock("");

				if (row[5] != null)
					reportStock.setCurrentStock(row[5].toString());
				else
					reportStock.setCurrentStock("");

				if (row[6] != null)
					reportStock.setPurRate(row[6].toString());
				else
					reportStock.setPurRate("");

				if (row[7] != null)
					reportStock.setMrp(row[7].toString());
				else
					reportStock.setMrp("");

				if (row[8] != null)
					reportStock.setCategoryName(row[8].toString());

				reportPurchases.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getDeletedPurchase() {

		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;
		Float total = (float) 0.0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select pur_doc_id, pur_net_amt,pur_gross_amt,pur_status,pur_trans_type,pur_id from pharma_purchase_master purchase where purchase.pur_delete_flag = 1; ");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					reportPurchase.setAmount(row[1].toString());
					total = total + Float.parseFloat(row[1].toString());
				} else
					reportPurchase.setAmount("");

				if (row[2] != null)
					reportPurchase.setRate(row[2].toString());
				else
					reportPurchase.setRate("");

				if (row[3] != null)
					reportPurchase.setStatus(row[3].toString());
				else
					reportPurchase.setStatus("");

				if (row[4] != null) {
					/*
					 * System.out.println(
					 * "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
					 * +row[4].toString()); if(row[4].toString()=="0")
					 * reportPurchase.setType("Cash/Credit"); else reportPurchase.setType("Cash");
					 */

					reportPurchase.setType(row[4].toString());
				} else
					reportPurchase.setType("");

				if (row[5] != null)
					reportPurchase.setPurBillNo(row[5].toString());
				else
					reportPurchase.setPurBillNo("");

				reportPurchase.setTotalAmount(total);

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;

	}

	/*
	 * SELECT batch_id,batch_code,batch_exp_date,product.product_name,stock.
	 * stock_qty_in_hand FROM pharma_batch_master batch inner join
	 * pharma_product_master product ON product.product_id = batch.batch_product_id
	 * inner join pharma_company_master company on
	 * company.comp_id=product.product_comp_id inner join pharma_stock_master stock
	 * ON stock.stock_batch_id = batch.batch_id where company.comp_id='" + companyId
	 * + "' and (batch.batch_exp_date='" + from + "' or batch.batch_exp_date='" + to
	 * + "')
	 */
	@Override
	public List<ReportExpiry> getNearCompanyWiseExpiryReport(String from, String to, int companyId) {
		List<ReportExpiry> reportExpiries = new ArrayList<ReportExpiry>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT batch_id,batch_code,batch_exp_date,product.product_name,stock.stock_qty_in_hand FROM pharma_batch_master batch "
							+ " inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_company_master company on company.comp_id=product.product_comp_id "
							+ " inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_purchase_slave slave on slave.pur_slave_batch_id=batch.batch_id "
							+ " inner join pharma_purchase_master master on master.pur_id=slave.pur_slave_master_id where company.comp_id='"
							+ companyId
							+ "'  and master.pur_delete_flag=0 and stock.stock_qty_in_hand!='0' and (batch.batch_exp_date='"
							+ from + " " + "' or batch.batch_exp_date='" + to + "')");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportExpiry reportExpiry = new ReportExpiry();

				if (row[0] != null)
					reportExpiry.setBatchId(row[0].toString());
				else
					reportExpiry.setBatchId("");

				if (row[1] != null)
					reportExpiry.setBatchCode(row[1].toString());
				else
					reportExpiry.setBatchCode("");

				if (row[2] != null)
					reportExpiry.setBatchExpiry(row[2].toString());
				else
					reportExpiry.setBatchExpiry("");

				if (row[3] != null)
					reportExpiry.setProductName(row[3].toString());
				else
					reportExpiry.setProductName("");

				if (row[4] != null)
					reportExpiry.setStock(row[4].toString());
				else
					reportExpiry.setStock("");

				reportExpiries.add(reportExpiry);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportExpiries;
	}

	@Override
	public List<ReportExpiry> getShelfWiseBatchExpData(String from, String to, int shelfId) {
		List<ReportExpiry> reportExpiries = new ArrayList<ReportExpiry>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT batch_id,batch_code,batch_exp_date,product.product_name,stock.stock_qty_in_hand FROM "
							+ " pharma_batch_master batch inner join pharma_product_master product ON product.product_id = batch.batch_product_id "
							+ " inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join "
							+ " pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_purchase_slave slave on slave.pur_slave_batch_id=batch.batch_id "
							+ " inner join pharma_purchase_master master on master.pur_id=slave.pur_slave_master_id where shelf.shelf_id = '"
							+ shelfId + "' and  stock.stock_qty_in_hand!='0'  and master.pur_delete_flag=0 and "
							+ "(batch.batch_exp_date = '" + from + "'" + "or batch.batch_exp_date = '" + to + "')");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportExpiry reportExpiry = new ReportExpiry();

				if (row[0] != null)
					reportExpiry.setBatchId(row[0].toString());
				else
					reportExpiry.setBatchId("");

				if (row[1] != null)
					reportExpiry.setBatchCode(row[1].toString());
				else
					reportExpiry.setBatchCode("");

				if (row[2] != null)
					reportExpiry.setBatchExpiry(row[2].toString());
				else
					reportExpiry.setBatchExpiry("");

				if (row[3] != null)
					reportExpiry.setProductName(row[3].toString());
				else
					reportExpiry.setProductName("");

				if (row[4] != null)
					reportExpiry.setStock(row[4].toString());
				else
					reportExpiry.setStock("");

				reportExpiries.add(reportExpiry);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportExpiries;
	}

	@Override
	public List<ReportVat> getMonthWiseVatPurchase(String from, String to) {
		List<ReportVat> reportVats = new ArrayList<ReportVat>();
		// SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		SQLQuery query = null;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT     sum(ifnull(pur_slave_bill_rate, 0) * ifnull(pur_slave_vat, 0) * 0.01) as GST,    sum(ifnull(pur_igst, 0) * ifnull(pur_slave_bill_rate, 0) * 0.01) as IGST,    sum(ifnull(pur_cess, 0) * ifnull(pur_slave_bill_rate, 0) * 0.01) as CESS,concat(MONTHNAME(pur_bill_date),' ',YEAR(pur_bill_date)),sum(pur_slave_amt) FROM    pharma_purchase_master        inner join    pharma_purchase_slave ON pur_slave_master_id = pur_id where    pur_bill_date between '"
							+ from + "' and '" + to + "' group by MONTH(pur_bill_date)");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportVat reportVat = new ReportVat();

				if (row[0] != null)
					reportVat.setVouNo(row[0].toString());
				else
					reportVat.setVouNo("");

				if (row[1] != null)
					reportVat.setVat5(row[1].toString());
				else
					reportVat.setVat5("");

				if (row[2] != null)
					reportVat.setVat12(row[2].toString());
				else
					reportVat.setVat12("");

				if (row[3] != null)
					reportVat.setBillDate(row[3].toString());
				else
					reportVat.setBillDate("");

				if (row[4] != null)
					reportVat.setNetAmount(row[4].toString());
				else
					reportVat.setNetAmount("");

				// reportVat.setType("monthwise");

				reportVats.add(reportVat);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportVats;
	}

	@Override
	public List<ReportVat> getDateWiseVatPurchase(String from, String to) {
		List<ReportVat> reportVats = new ArrayList<ReportVat>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT     sum(ifnull(pur_slave_bill_rate, 0) * ifnull(pur_slave_vat, 0) * 0.01) as GST,    sum(ifnull(pur_igst, 0) * ifnull(pur_slave_bill_rate, 0) * 0.01) as IGST,    sum(ifnull(pur_cess, 0) * ifnull(pur_slave_bill_rate, 0) * 0.01) as CESS,pur_bill_date,sum(pur_slave_amt) FROM    pharma_purchase_master        inner join    pharma_purchase_slave ON pur_slave_master_id = pur_id where    pur_bill_date between '"
							+ from + "' and '" + to + "' group by day(pur_bill_date)");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportVat reportVat = new ReportVat();

				if (row[0] != null)
					reportVat.setVouNo(row[0].toString());
				else
					reportVat.setVouNo("");

				if (row[1] != null)
					reportVat.setVat5(row[1].toString());
				else
					reportVat.setVat5("");

				if (row[2] != null)
					reportVat.setVat12(row[2].toString());
				else
					reportVat.setVat12("");

				if (row[3] != null)
					reportVat.setBillDate(row[3].toString());
				else
					reportVat.setBillDate("");

				if (row[4] != null)
					reportVat.setNetAmount(row[4].toString());
				else
					reportVat.setNetAmount("");

				reportVats.add(reportVat);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportVats;
	}

	@Override
	public List<ReportVat> getPartyWiseVatPurchase(String from, String to) {
		List<ReportVat> reportVats = new ArrayList<ReportVat>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT     sum(ifnull(pur_slave_bill_rate, 0) * ifnull(pur_slave_vat, 0) * 0.01) as GST,    sum(ifnull(pur_igst, 0) * ifnull(pur_slave_bill_rate, 0) * 0.01) as IGST,    sum(ifnull(pur_cess, 0) * ifnull(pur_slave_bill_rate, 0) * 0.01) as CESS,vendor_name,sum(pur_slave_amt) FROM    pharma_purchase_master        inner join    pharma_purchase_slave ON pur_slave_master_id = pur_id inner join pharma_vendor_master ON vendor_id = pur_vendor_id where    pur_bill_date between '"
							+ from + "' and '" + to + "' group by pur_vendor_id");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportVat reportVat = new ReportVat();

				if (row[0] != null)
					reportVat.setVouNo(row[0].toString());
				else
					reportVat.setVouNo("");

				if (row[1] != null)
					reportVat.setVat5(row[1].toString());
				else
					reportVat.setVat5("");

				if (row[2] != null)
					reportVat.setVat12(row[2].toString());
				else
					reportVat.setVat12("");

				if (row[3] != null)
					reportVat.setBillDate(row[3].toString());
				else
					reportVat.setBillDate("");

				if (row[4] != null)
					reportVat.setNetAmount(row[4].toString());
				else
					reportVat.setNetAmount("");

				reportVats.add(reportVat);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportVats;
	}

	@Override
	public List<ReportVat> getVouWiseVatPurchase(String from, String to) {
		List<ReportVat> reportVats = new ArrayList<ReportVat>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT     sum(ifnull(pur_slave_bill_rate, 0) * ifnull(pur_slave_vat, 0) * 0.01) as GST,    sum(ifnull(pur_igst, 0) * ifnull(pur_slave_bill_rate, 0) * 0.01) as IGST,    sum(ifnull(pur_cess, 0) * ifnull(pur_slave_bill_rate, 0) * 0.01) as CESS,pur_doc_id,sum(pur_slave_amt) FROM    pharma_purchase_master        inner join    pharma_purchase_slave ON pur_slave_master_id = pur_id where    pur_bill_date between '"
							+ from + "' and '" + to + "' group by pur_doc_id");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportVat reportVat = new ReportVat();

				if (row[0] != null)
					reportVat.setVouNo(row[0].toString());
				else
					reportVat.setVouNo("");

				if (row[1] != null)
					reportVat.setVat5(row[1].toString());
				else
					reportVat.setVat5("");

				if (row[2] != null)
					reportVat.setVat12(row[2].toString());
				else
					reportVat.setVat12("");

				if (row[3] != null)
					reportVat.setBillDate(row[3].toString());
				else
					reportVat.setBillDate("");

				if (row[4] != null)
					reportVat.setNetAmount(row[4].toString());
				else
					reportVat.setNetAmount("");

				reportVats.add(reportVat);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportVats;
	}
//By Badrinath 
	// Cash Receipt Report
	@Override
	public List<CashReceiptReport> getCashReceiptReport(int unitId,String from, String to) {
		/*
		float total = 0;
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select master.cash_receipt_doc_id,vendor.vendor_name,master.cash_receipt_amt,master.cash_receipt_made_by from pharma_cash_receipt_master master inner join pharma_vendor_master vendor ON vendor.vendor_id = master.cash_receipt_vendor_id where"
							+ " cash_receipt_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null)
					reportPurchase.setVendorName(row[1].toString());
				else
					reportPurchase.setVendorName("");

				if (row[2] != null) {
					reportPurchase.setAmount(row[2].toString());
					total = total + Float.parseFloat(row[2].toString());

				} else
					reportPurchase.setAmount("");

				if (row[3] != null)
					reportPurchase.setMadeBy(row[3].toString());
				else
					reportPurchase.setMadeBy("");

				reportPurchase.setTotalAmount(total);
				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
		*/
		Session s = sessionFactory.getCurrentSession();

		try {
			Query query = s.createSQLQuery("call sp_get_cash_receipt_report(:unitId,:from,:to)");
			query.setParameter("unitId", 1);
			query.setParameter("from", from);
			query.setParameter("to", to);

			//PharmaDebitNoteSP.setResultTransformer(new AliasToBeanResultTransformer(ReportProductWiseBatchSale.class));
			//List<ReportProductWiseBatchSale> ltPharmaDebitNoteSP = PharmaDebitNoteSP.list();
			
			query.setResultTransformer(new AliasToBeanResultTransformer(CashReceiptReport.class));
            @SuppressWarnings("unchecked")
			List<CashReceiptReport> lst = query.list();
			// s.flush();
			 //s.close();
			return lst;

		} catch (Exception e) {
			e.printStackTrace();
			return null;

		}
	}

	@Override
	public List<ReportPurchase> getDeletedCashReceiptReport() {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;
		Float total = (float) 0.0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select master.cash_receipt_doc_id,vendor.vendor_name,master.cash_receipt_amt,master.cash_receipt_made_by from pharma_cash_receipt_master master inner join pharma_vendor_master vendor ON vendor.vendor_id = master.cash_receipt_vendor_id where cash_receipt_delete_flag='1'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null)
					reportPurchase.setVendorName(row[1].toString());
				else
					reportPurchase.setVendorName("");

				if (row[2] != null) {
					reportPurchase.setAmount(row[2].toString());
					total = total + Float.parseFloat(row[2].toString());
				} else
					reportPurchase.setAmount("");

				if (row[3] != null)
					reportPurchase.setMadeBy(row[3].toString());
				else
					reportPurchase.setMadeBy("");

				reportPurchase.setTotalAmount(total);
				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	// Cash Paid Report
	@Override
	public List<PaidReceiptReport> getCashPaidReport(int unitId,String from, String to) {
		/*
		Float total = (float) 0.0;
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select purchase.pur_doc_id,purchase.pur_bill_date,vendor.vendor_name,purslave.pur_slave_amt,master.cash_paid_made_by from pharma_purchase_master purchase inner join "
							+ " pharma_cash_paid_slave slave on purchase.pur_id=slave.cash_paid_pur_id inner join  pharma_cash_paid_master master on master.cash_paid_id=slave.cash_paid_master_id inner join"
							+ " pharma_purchase_slave purslave on purslave.pur_slave_master_id=purchase.pur_id inner join pharma_vendor_master vendor on vendor.vendor_id=master.cash_paid_vendor_id"
							+ " where  cash_paid_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null)
					reportPurchase.setBillDate(row[1].toString());
				else
					reportPurchase.setBillDate("");

				if (row[2] != null)
					reportPurchase.setVendorName(row[2].toString());
				else
					reportPurchase.setVendorName("");

				if (row[3] != null) {
					reportPurchase.setAmount(row[3].toString());
					total = total + Float.parseFloat(row[3].toString());
				} else
					reportPurchase.setAmount("");

				if (row[4] != null)
					reportPurchase.setMadeBy(row[4].toString());
				else
					reportPurchase.setMadeBy("");

				reportPurchase.setTotalAmount(total);
				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
		*/
		Session s = sessionFactory.getCurrentSession();

		try {
			Query query = s.createSQLQuery("call sp_get_cash_paid_report(:unitId,:from,:to)");
			query.setParameter("unitId", 1);
			query.setParameter("from", from);
			query.setParameter("to", to);

			//PharmaDebitNoteSP.setResultTransformer(new AliasToBeanResultTransformer(ReportProductWiseBatchSale.class));
			//List<ReportProductWiseBatchSale> ltPharmaDebitNoteSP = PharmaDebitNoteSP.list();
			
			query.setResultTransformer(new AliasToBeanResultTransformer(PaidReceiptReport.class));
            @SuppressWarnings("unchecked")
			List<PaidReceiptReport> lst = query.list();
			// s.flush();
			 //s.close();
			return lst;

		} catch (Exception e) {
			e.printStackTrace();
			return null;

		}
	}

	@Override
	public List<ReportPurchase> getDeletedCashPaidReport() {
		Float total = (float) 0.0;
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select purchase.pur_doc_id,purchase.pur_bill_date,vendor.vendor_name,purslave.pur_slave_amt,master.cash_paid_made_by from pharma_purchase_master purchase inner join "
							+ " pharma_cash_paid_slave slave on purchase.pur_id=slave.cash_paid_pur_id inner join  pharma_cash_paid_master master on master.cash_paid_id=slave.cash_paid_master_id inner join"
							+ " pharma_purchase_slave purslave on purslave.pur_slave_master_id=purchase.pur_id inner join pharma_vendor_master vendor on vendor.vendor_id=master.cash_paid_vendor_id"
							+ " where master.cash_paid_delete_flag='1' ");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null)
					reportPurchase.setBillDate(row[1].toString());
				else
					reportPurchase.setBillDate("");

				if (row[2] != null)
					reportPurchase.setVendorName(row[2].toString());
				else
					reportPurchase.setVendorName("");

				if (row[3] != null) {
					reportPurchase.setAmount(row[3].toString());
					total = total + Float.parseFloat(row[3].toString());
				} else
					reportPurchase.setAmount("");

				if (row[4] != null)
					reportPurchase.setMadeBy(row[4].toString());
				else
					reportPurchase.setMadeBy("");

				reportPurchase.setTotalAmount(total);
				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}
    //By Badrinath Wagh
	//For cheque paid list Report
	@Override
	public List<ChequePaidReceiptReport> getChequePaidReport(int unitId,String from, String to) {
		/*
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;
		Float total = (float) 0.0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select cheque_paid_id,cheque_paid_date,vendor.vendor_name,master.cheque_paid_amt,master.cheque_paid_made_by,master.cheque_trans_type,master.cheque_paid_cheque_num,bank.bank_name from pharma_cheque_paid_master master inner join pharma_vendor_master vendor ON vendor.vendor_id = master.cheque_paid_vendor_id left join pharma_bank_master bank on bank.bank_id=master.cheque_paid_bank_id where  cheque_paid_date between '"
							+ from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null)
					reportPurchase.setBillDate(row[1].toString());
				else
					reportPurchase.setBillDate("");

				if (row[2] != null)
					reportPurchase.setVendorName(row[2].toString());
				else
					reportPurchase.setVendorName("");

				if (row[3] != null) {
					reportPurchase.setAmount(row[3].toString());
					total = total + Float.parseFloat(row[3].toString());
				} else
					reportPurchase.setAmount("");

				if (row[4] != null)
					reportPurchase.setMadeBy(row[4].toString());
				else
					reportPurchase.setMadeBy("");

				if (row[5] != null) {
					if (row[5].toString().equals("0"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Cheque");
				} else
					reportPurchase.setType("-");

				if (row[6] != null)
					reportPurchase.setChequeNum(row[6].toString());
				else
					reportPurchase.setChequeNum("-");

				if (row[7] != null)
					reportPurchase.setVendorBankName(row[7].toString());
				else
					reportPurchase.setVendorBankName("-");

				reportPurchase.setTotalAmount(total);
				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
		*/
		Session s = sessionFactory.getCurrentSession();

		try {
			Query query = s.createSQLQuery("call sp_get_cheque_paid_report(:unitId,:from,:to)");
			query.setParameter("unitId", 1);
			query.setParameter("from", from);
			query.setParameter("to", to);

			//PharmaDebitNoteSP.setResultTransformer(new AliasToBeanResultTransformer(ReportProductWiseBatchSale.class));
			//List<ReportProductWiseBatchSale> ltPharmaDebitNoteSP = PharmaDebitNoteSP.list();
			
			query.setResultTransformer(new AliasToBeanResultTransformer(ChequePaidReceiptReport.class));
            @SuppressWarnings("unchecked")
			List<ChequePaidReceiptReport> lst = query.list();
			// s.flush();
			 //s.close();
			return lst;

		} catch (Exception e) {
			e.printStackTrace();
			return null;

		}
	}

	@Override
	public List<ReportPurchase> getDeletedChequePaidReport() {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;
		Float total = (float) 0.0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select purchase.pur_doc_id,purchase.pur_bill_date,vendor.vendor_name,purslave.pur_slave_amt,master.cheque_paid_made_by from  pharma_purchase_master purchase inner join pharma_cheque_paid_slave slave on purchase.pur_id=slave.cheque_paid_pur_id inner join pharma_cheque_paid_master master on master.cheque_paid_id=slave.cheque_paid_master_id inner join pharma_purchase_slave purslave on purslave.pur_slave_master_id=purchase.pur_id inner join pharma_vendor_master vendor on vendor.vendor_id=master.cheque_paid_vendor_id"
							+ " where cheque_paid_delete_flag='1' ");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null)
					reportPurchase.setBillDate(row[1].toString());
				else
					reportPurchase.setBillDate("");

				if (row[2] != null)
					reportPurchase.setVendorName(row[2].toString());
				else
					reportPurchase.setVendorName("");

				if (row[3] != null) {
					reportPurchase.setAmount(row[3].toString());
					total = total + Float.parseFloat(row[3].toString());
				} else
					reportPurchase.setAmount("");

				if (row[4] != null)
					reportPurchase.setMadeBy(row[4].toString());
				else
					reportPurchase.setMadeBy("");

				reportPurchase.setTotalAmount(total);
				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	// Debit Note
	@Override
	public List<ReportProductWiseBatchSale> getDebitNoteData(Integer vendorId, String from, String to, String type,
			String totalAmt) {
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String debitNote = "SELECT debit.debit_note_id,debit.debit_note_date,vendor.vendor_name,vendor.vendor_gstn,debit_note_narration,debit_note_net_amt "
				+ " FROM pharma_vendor_master vendor inner join pharma_debit_note_master debit on vendor.vendor_id=debit.debit_note_vendor_id "
				+ " where debit_note_delete_flag=0 and debit_note_date between '" + from + "' and '" + to + "'";
		if (vendorId != null && vendorId + "" != "") {
			debitNote += " and " + "vendor.vendor_id='" + vendorId + "'";
		}

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);

		try {

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setVouNo(row[0].toString());
				else
					productByBatch.setVouNo("");

				if (row[1] != null)
					productByBatch.setDate(row[1].toString());
				else
					productByBatch.setDate("");

				if (row[2] != null)
					productByBatch.setVendorName(row[2].toString());
				else
					productByBatch.setVendorName("");

				if (row[3] != null)
					productByBatch.setVendorAddress(row[3].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[4] != null)
					productByBatch.setProductName(row[4].toString());
				else
					productByBatch.setProductName("");

				if (row[5] != null)
					productByBatch.setAmount(row[5].toString());
				else
					productByBatch.setAmount("");

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	// Credit Note
	//Added by Akshata
	@SuppressWarnings("unchecked")
	@Override
	public List<ReportProductWiseBatchSale> getCreditNoteData(String from, String to) {
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String debitNote = "SELECT     p_master.credit_note_date as Createddate,    p_master.credit_note_id as id,    product.product_name as productName,    p_slave.credit_note_slave_qty as quantity,    p_slave.credit_note_slave_rate as billrate,    p_slave.credit_note_slave_amt as patientSaleSlaveRecAmt,    concat(ifnull(p1.f_name, ''),            ' ',            ifnull(p1.m_name, ''),            ' ',            ifnull(p1.l_name, '')) as patientName,    p_master.credit_note_net_amt as netAmt,    hsn.hsn_no as hsnCode,    p_slave.credit_slave_vat as totalVat0,    p_slave.credit_slave_ratePerUnit as ratePerUnit,    p_slave.credit_slave_vatAmt as totalVat5,    if(p_master.credit_note_transaction_type = 0,        'Cash',        'Credit') as pmode,    ifnull(p_slave.credit_slave_discAmt, 0) as discountAmt ,   ifnull(p_master.credit_note_dicscount, 0) as discount,  ifnull(p_master.credit_note_disc_percent, 0) as discountPer,    hsn.hsn_no as hsnNo FROM    pharma_credit_note_master p_master        inner JOIN    pharma_credit_note_slave p_slave ON p_slave.credit_note_slave_master_id = p_master.credit_note_id        inner join    pharma_product_master product ON product.product_id = p_slave.credit_note_slave_product_id        inner join    pharma_hsn_master hsn ON hsn.idpharma_hsn_master = product.product_hsn        left join    ehat_patient p1 ON p1.patient_id = p_master.credit_note_patientId where    p_master.credit_note_delete_flag = 0  and  p_master.credit_note_date between '"
				+ from + "' and '" + to + "'";

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		try {
			
					
				query.setResultTransformer(Transformers.aliasToBean(ReportProductWiseBatchSale.class));
	            List<ReportProductWiseBatchSale> lst = query.list();
	            return lst;
			
			/*@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

				if (row[0] != null)
					reportProductWiseBatchSale.setDate(row[0].toString());
				else
					reportProductWiseBatchSale.setDate("");

				if (row[1] != null)
					reportProductWiseBatchSale.setReceiptNo(row[1].toString());
				else
					reportProductWiseBatchSale.setReceiptNo("");

				if (row[2] != null)
					reportProductWiseBatchSale.setProductName(row[2].toString());
				else
					reportProductWiseBatchSale.setProductName("");

				if (row[3] != null)
					reportProductWiseBatchSale.setQty(row[3].toString());
				else
					reportProductWiseBatchSale.setQty("");

				if (row[4] != null)
					reportProductWiseBatchSale.setRate(row[4].toString());
				else
					reportProductWiseBatchSale.setRate("");

				if (row[5] != null)
					reportProductWiseBatchSale.setAmount(row[5].toString());
				else
					reportProductWiseBatchSale.setAmount("");

				if (row[6] != null)
					reportProductWiseBatchSale.setPatientName(row[6].toString());
				else
					reportProductWiseBatchSale.setPatientName("");

				if (row[7] != null)
					reportProductWiseBatchSale.setNetAmt(Double.parseDouble(row[7].toString()));
				else
					reportProductWiseBatchSale.setNetAmt(0.0);

				if (row[8] != null)
					reportProductWiseBatchSale.setTaxable55(row[8].toString());
				else
					reportProductWiseBatchSale.setTaxable55("");

				if (row[9] != null)
					reportProductWiseBatchSale.setTaxable0(row[9].toString());
				else
					reportProductWiseBatchSale.setTaxable0("");

				if (row[10] != null)
					reportProductWiseBatchSale.setPurRate(row[10].toString());
				else
					reportProductWiseBatchSale.setPurRate("");

				if (row[11] != null)
					reportProductWiseBatchSale.setTaxable12(row[11].toString());
				else
					reportProductWiseBatchSale.setTaxable12("");

				if (row[12] != null)
					reportProductWiseBatchSale.setType(row[12].toString());
				else
					reportProductWiseBatchSale.setType("");

				if (row[13] != null)
					reportProductWiseBatchSale.setDiscount(Double.parseDouble(row[13].toString()));
				else
					reportProductWiseBatchSale.setDiscount(0.0);

				if (row[14] != null)
					reportProductWiseBatchSale.setCdperc(Double.parseDouble(row[14].toString()));
				else
					reportProductWiseBatchSale.setCdperc(0.0);

				if (row[15] != null)
					reportProductWiseBatchSale.setCdamt(Double.parseDouble(row[15].toString()));
				else
					reportProductWiseBatchSale.setCdamt(0.0);

				if (row[16] != null)
					reportProductWiseBatchSale.setHsnNo(row[16].toString());
				else
					reportProductWiseBatchSale.setHsnNo("");

				productWiseBatchSales.add(reportProductWiseBatchSale);
*/
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}
    //By Badrinath Wagh
	//For Debit Note Data
	
	@Override
	public List<DebitNoteData> getDebitNoteData(int unitId,String from, String to) {
		/*
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String debitNote = "SELECT pharma_debit_note_master.debit_note_id as id,pharma_debit_note_master.debit_note_date as Createddate,pharma_vendor_master.vendor_name as vendorName,pharma_vendor_master.vendor_gstn as gstmasteramt,debit_note_narration,debit_note_net_amt "
				+ "FROM pharma_vendor_master inner join pharma_debit_note_master on pharma_vendor_master.vendor_id as vendorId=pharma_debit_note_master.debit_note_vendor_id "
				+ " where debit_note_date between '" + from + "' and '" + to + "' and debit_note_delete_flag=0;";

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		float total = 0;
		try {

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setVouNo(row[0].toString());
				else
					productByBatch.setVouNo("");

				if (row[1] != null)
					productByBatch.setDate(row[1].toString());
				else
					productByBatch.setDate("");

				if (row[2] != null)
					productByBatch.setVendorName(row[2].toString());
				else
					productByBatch.setVendorName("");

				if (row[3] != null)
					productByBatch.setVendorAddress(row[3].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[4] != null)
					productByBatch.setProductName(row[4].toString());
				else
					productByBatch.setProductName("");

				if (row[5] != null) {
					productByBatch.setAmount(row[5].toString());
					total = total + Float.parseFloat(row[5].toString());

				} else
					productByBatch.setAmount("");

				productByBatch.setTotalAmt(Float.parseFloat((Math.round(total * 100.0) / 100.0) + ""));
				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
		*/
		/*
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();	
		String queryString = "";
		Query query = sessionFactory
				.openSession()
				.createSQLQuery("SELECT pharma_debit_note_master.debit_note_id as id,pharma_debit_note_master.debit_note_date as Createddate,pharma_vendor_master.vendor_name as vendorName, address.vendor_gstn as vendor_gstn,debit_note_narration as debit_note_narration,debit_note_net_amt as debit_note_net_amt"						    
					+   "    FROM pharma_vendor_master join pharma_vendor_address address on pharma_vendor_master.vendor_id = address.vendorId  INNER JOIN"
					+	"    pharma_debit_note_master ON pharma_vendor_master.vendor_id = pharma_debit_note_master.debit_note_vendor_id" 
					+	"    WHERE debit_note_date between '" + from + "' and '" + to + "' and debit_note_delete_flag=0;");
					
		try {		
			query.setResultTransformer(Transformers.aliasToBean(ReportProductWiseBatchSale.class));
            List<ReportProductWiseBatchSale> Rptlst = query.list();
            return Rptlst;
		}catch(

	Exception e)
	{
			e.printStackTrace();
			return null;
		}
	*/
		Session s = sessionFactory.getCurrentSession();

		try {
			Query query = s.createSQLQuery("call sp_get_debit_note_data(:unitId,:from,:to)");
			query.setParameter("unitId", 1);
			query.setParameter("from", from);
			query.setParameter("to", to);

			//PharmaDebitNoteSP.setResultTransformer(new AliasToBeanResultTransformer(ReportProductWiseBatchSale.class));
			//List<ReportProductWiseBatchSale> ltPharmaDebitNoteSP = PharmaDebitNoteSP.list();
			
			query.setResultTransformer(new AliasToBeanResultTransformer(DebitNoteData.class));
            @SuppressWarnings("unchecked")
			List<DebitNoteData> lst = query.list();
			// s.flush();
			 //s.close();
			return lst;

		} catch (Exception e) {
			e.printStackTrace();
			return null;

		}
	}
	
     //By Badrinath Wagh
	 //For Cheque Receipt Report
	
	@Override
	public List<ChequeReceiptReport> getChequeReceiptReport(int unitId,String from, String to) {
		/*
		Float total = (float) 0.0;
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select master.cheque_receipt_cheque_no,vendor.vendor_name,bank.bank_name as vendorBank,bank1.bank_name as pharmacyBank,master.cheque_receipt_amt,master.cheque_receipt_made_by from pharma_cheque_receipt_master master"
							+ " inner join pharma_bank_master bank on bank.bank_id=master.cheque_receipt_bank_id inner join pharma_bank_master bank1 on bank1.bank_id=master.cheque_receipt_bank_id1  inner join pharma_vendor_master vendor ON vendor.vendor_id = master.cheque_receipt_vendor_id"
							+ " where  cheque_receipt_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();

			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setChequeNum(row[0].toString());
				else
					reportPurchase.setChequeNum("");

				if (row[1] != null)
					reportPurchase.setVendorName(row[1].toString());
				else
					reportPurchase.setVendorName("");

				if (row[2] != null)
					reportPurchase.setVendorBankName(row[2].toString());
				else
					reportPurchase.setVendorBankName("");

				if (row[3] != null)
					reportPurchase.setPharmacyBank(row[3].toString());
				else
					reportPurchase.setPharmacyBank("");

				if (row[4] != null) {
					reportPurchase.setAmount(row[4].toString());
					total = total + Float.parseFloat(row[4].toString());
				} else
					reportPurchase.setAmount("");

				if (row[5] != null)
					reportPurchase.setMadeBy(row[5].toString());
				else
					reportPurchase.setMadeBy("");

				reportPurchase.setTotalAmount(total);
				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
		*/
		Session s = sessionFactory.getCurrentSession();

		try {
			Query query = s.createSQLQuery("call sp_get_cheque_receipt_report(:unitId,:from,:to)");
			query.setParameter("unitId", 1);
			query.setParameter("from", from);
			query.setParameter("to", to);

			//PharmaDebitNoteSP.setResultTransformer(new AliasToBeanResultTransformer(ReportProductWiseBatchSale.class));
			//List<ReportProductWiseBatchSale> ltPharmaDebitNoteSP = PharmaDebitNoteSP.list();
			
			query.setResultTransformer(new AliasToBeanResultTransformer(ChequeReceiptReport.class));
            @SuppressWarnings("unchecked")
			List<ChequeReceiptReport> lst = query.list();
			// s.flush();
			 //s.close();
			return lst;

		} catch (Exception e) {
			e.printStackTrace();
			return null;

		}
	}

	// cheque report
	@Override
	public List<ReportPurchase> getDeletedChequeReceiptReport() {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;
		Float total = (float) 0.0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select master.cheque_receipt_cheque_no,vendor.vendor_name,bank.bank_name as vendorBank,bank1.bank_name as pharmacyBank,master.cheque_receipt_amt,master.cheque_receipt_made_by from pharma_cheque_receipt_master master"
							+ " inner join pharma_bank_master bank on bank.bank_id=master.cheque_receipt_bank_id inner join pharma_bank_master bank1 on bank1.bank_id=master.cheque_receipt_bank_id1  inner join pharma_vendor_master vendor ON vendor.vendor_id = master.cheque_receipt_vendor_id"
							+ " where  cheque_receipt_delete_flag='1'");

			List<Object[]> rows = query.list();

			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setChequeNum(row[0].toString());
				else
					reportPurchase.setChequeNum("");

				if (row[1] != null)
					reportPurchase.setVendorName(row[1].toString());
				else
					reportPurchase.setVendorName("");

				if (row[2] != null)
					reportPurchase.setVendorBankName(row[2].toString());
				else
					reportPurchase.setVendorBankName("");

				if (row[3] != null)
					reportPurchase.setPharmacyBank(row[3].toString());
				else
					reportPurchase.setPharmacyBank("");

				if (row[4] != null) {
					reportPurchase.setAmount(row[4].toString());
					total = total + Float.parseFloat(row[4].toString());
				} else
					reportPurchase.setAmount("");

				if (row[5] != null)
					reportPurchase.setMadeBy(row[5].toString());
				else
					reportPurchase.setMadeBy("");

				reportPurchase.setTotalAmount(total);

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	// Patient Sale vou wise
	// Modified By BILAL
	// Date 19-01-2018
	@Override
	public List<ReportProductWiseBatchSale> patientwiseVouList(Integer patientId, String from, String to) {
		List<ReportProductWiseBatchSale> reportProductWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT  DATE_FORMAT(p_master.patient_sales_bill_update_date, '%d/%m/%Y %h:%i %p')  ,p_master.patient_sales_bill_id,p_master.patient_sales_bill_doc_no,product.product_name,p_slave.patient_slave_qty,p_slave.patient_slave_rate,p_slave.patient_slave_amt "
							+ " FROM pharma_product_master product inner JOIN pharma_patient_sales_bill_slave p_slave ON product.product_id = p_slave.patient_slave_product_id "
							+ " inner join pharma_patient_sales_bill_master p_master ON p_slave.patient_slave_bill_master_id = p_master.patient_sales_bill_id "
							+ " inner join ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id where p1.patient_id = '"
							+ patientId + "' and p_master.patient_bill_date between '" + from + "' and '" + to + "'");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

				if (row[0] != null)
					reportProductWiseBatchSale.setDate(row[0].toString());
				else
					reportProductWiseBatchSale.setDate("");

				if (row[1] != null)
					reportProductWiseBatchSale.setReceiptNo("PS" + row[1].toString());
				else
					reportProductWiseBatchSale.setReceiptNo("PS" + row[1].toString());

				if (row[2] != null)
					reportProductWiseBatchSale.setVouNo(row[2].toString());
				else
					reportProductWiseBatchSale.setVouNo(row[2].toString());

				if (row[3] != null)
					reportProductWiseBatchSale.setProductName(row[3].toString());
				else
					reportProductWiseBatchSale.setProductName("");

				if (row[4] != null)
					reportProductWiseBatchSale.setQty(row[4].toString());
				else
					reportProductWiseBatchSale.setQty("");

				if (row[5] != null)
					reportProductWiseBatchSale.setRate(row[5].toString());
				else
					reportProductWiseBatchSale.setRate("");

				if (row[6] != null)
					reportProductWiseBatchSale.setAmount(row[6].toString());
				else
					reportProductWiseBatchSale.setAmount("");

				reportProductWiseBatchSales.add(reportProductWiseBatchSale);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportProductWiseBatchSales;
	}

	// Patient Sale Doctor wise
	@Override
	public List<ReportProductWiseBatchSale> patientSaleDoctorwise(Integer doctorId, String from, String to) {
		List<ReportProductWiseBatchSale> reportProductWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT p_master.patient_bill_date,p1.fName,p_master.patient_Sales_Bill_id,product.product_name,p_slave.patient_slave_qty,p_slave.patient_slave_rate, "
							+ " p_slave.patient_slave_amt FROM pharma_product_master product inner JOIN pharma_patient_sales_bill_slave p_slave ON product.product_id = p_slave.patient_slave_product_id "
							+ " inner join pharma_patient_sales_bill_master p_master ON p_slave.patient_slave_bill_master_id = p_master.patient_sales_bill_id inner join patient p1 ON p1.Patient_ID = p_master.patient_bill_patient_id "
							+ "  inner join doctor doctor ON doctor.Doctor_ID = p_master.patient_bill_doctor_id where doctor.Doctor_ID = '"
							+ doctorId + "' " + " and p_master.patient_bill_date between '" + from + "' and '" + to
							+ "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

				if (row[0] != null)
					reportProductWiseBatchSale.setDate(row[0].toString());
				else
					reportProductWiseBatchSale.setDate("");

				if (row[1] != null)
					reportProductWiseBatchSale.setPatientName(row[1].toString());
				else
					reportProductWiseBatchSale.setPatientName(row[1].toString());

				if (row[2] != null)
					reportProductWiseBatchSale.setVouNo("PS" + row[2].toString());
				else
					reportProductWiseBatchSale.setVouNo("");

				if (row[3] != null)
					reportProductWiseBatchSale.setProductName(row[3].toString());
				else
					reportProductWiseBatchSale.setProductName("");

				if (row[4] != null)
					reportProductWiseBatchSale.setQty(row[4].toString());
				else
					reportProductWiseBatchSale.setQty("");

				if (row[5] != null)
					reportProductWiseBatchSale.setRate(row[5].toString());
				else
					reportProductWiseBatchSale.setRate("");

				if (row[6] != null)
					reportProductWiseBatchSale.setAmount(row[6].toString());
				else
					reportProductWiseBatchSale.setAmount("");

				reportProductWiseBatchSales.add(reportProductWiseBatchSale);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportProductWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getTotalSaleDeletedData(String type) {
		Float total = (float) 0.0;
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave c_slave on  c_slave.counter_slave_master_id=c_master.counter_sale_id where  c_master.counter_sale_delete_flag='1' and "
					+ " counter_slave_No between '1' and '4'";
		} else {
			counterSale = "select c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt from pharma_counter_sale_master c_master where c_master.counter_sale_delete_flag='1'";

		}

		String indentSale = "select c_master.indent_sale_id,pat.fName,pat.addressLine1,c_master.indent_sale_net_amt from     pharma_indent_sale_master c_master inner join pharma_indent_master indent_m on indent_m.indent_id=c_master.indent_sale_indent_no inner join treatment t on t.Treatment_ID=indent_m.indent_treatement_id inner join patient pat on pat.Patient_ID=t.Patient_ID where c_master.indent_sale_delete_flag='1' ";
		String hospitalSale = "select c_master.hospital_bill_id,c_master.hospital_bill_patient_name,p.addressLine1,c_master.hospital_bill_net_amt from  pharma_hospital_bill_master c_master inner join patient p on p.Patient_ID=c_master.hospital_bill_patient_id where c_master.hospital_bill_delete_flag='1'";

		String patientSale = "select p_master.patient_Sales_bill_id,p.fName,p.addressLine1,p_master.patient_sales_bill_net_amt from pharma_patient_sales_bill_master p_master inner join patient p ON p.Patient_ID = p_master.patient_bill_patient_id where p_master.patient_sales_bill_delete_flag='1'";

		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				/*
				 * if (row[0] != null) productByBatch.setVouNo(row[0].toString()); else
				 * productByBatch.setVouNo("");
				 */

				if (row[1] != null)
					productByBatch.setPatientName(row[1].toString());
				else
					productByBatch.setPatientName("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[3] != null) {
					productByBatch.setAmount(row[3].toString());
					total = total + Float.parseFloat(row[3].toString());

				} else
					productByBatch.setAmount("");

				if (type.equals("counterSale") && row[3] != null) {
					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());
				} else if (type.equals("indentSale") && row[3] != null) {
					productByBatch.setType("indentSale");
					productByBatch.setVouNo("IS" + row[0].toString());
				} else if (type.equals("hospitalSale") && row[3] != null) {
					productByBatch.setType("hospitalSale");
					productByBatch.setVouNo("HS" + row[0].toString());
				} else if (type.equals("patientSale") && row[3] != null) {
					productByBatch.setType("patientSale");
					productByBatch.setVouNo("PS" + row[0].toString());
				}

				productByBatch.setTotalAmt(total);
				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getPatientwiseBillAmt(String from, String to) {
		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();
		float gross = 0;
		float less = 0;
		float vat5 = 0;
		float vat12 = 0;
		float vat0 = 0;
		float add = 0;
		float net = 0;
		Double Gross5 = 0.0;
		Double Gross12 = 0.0;
		Double Gross0 = 0.0;
		Double Grossi5 = 0.0;
		Double Grossi12 = 0.0;
		Double Grossi0 = 0.0;
		Double Grossc5 = 0.0;
		Double Grossc12 = 0.0;
		Double Grossc0 = 0.0;
		// patient sale
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (master.patient_sales_bill_gross_amt),(master.patient_sales_bill_less),(master.patient_tax_vat0),(master.patient_tax_vat55),(master.patient_tax_vat12), "
							+ " (master.patient_sales_bill_add),(master.patient_sales_bill_net_amt) from pharma_patient_sales_bill_master master inner join patient p ON master.patient_sales_bill_id = p.Patient_ID where "
							+ " master.patient_bill_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				float total = 0;
				if (row[0] != null) {

					if (row[1] != null) {
						less = less + Float.parseFloat(row[1].toString());
					}

					if (row[2] != null) {
						vat0 = vat0 + Float.parseFloat(row[2].toString());

					}

					if (row[3] != null) {
						vat5 = vat5 + Float.parseFloat(row[3].toString());

					}

					if (row[4] != null) {
						vat12 = vat12 + Float.parseFloat(row[4].toString());

					}

					if (row[5] != null) {
						add = add + Float.parseFloat(row[5].toString());
					}

					if (row[6] != null) {
						net = net + Float.parseFloat(row[6].toString());
					}

					gross = gross + Float.parseFloat(row[0].toString());
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (slave.patient_slave_amt),(slave.patient_slave_vatAmt) from pharma_patient_sales_bill_master master inner join pharma_patient_sales_bill_slave slave on slave.patient_slave_bill_master_id=master.patient_sales_bill_id "
							+ " where slave.patient_slave_vat='5.5' and master.patient_bill_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null)
					Gross5 = Gross5 + (Double.parseDouble(row[0].toString()) - Double.parseDouble(row[1].toString()));
				else
					Gross5 = 0.0;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (slave.patient_slave_amt),(slave.patient_slave_vatAmt) from pharma_patient_sales_bill_master master inner join pharma_patient_sales_bill_slave slave on slave.patient_slave_bill_master_id=master.patient_sales_bill_id "
							+ " where slave.patient_slave_vat='12.5' and master.patient_bill_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null)
					Gross12 = Gross12 + (Double.parseDouble(row[0].toString()) - Double.parseDouble(row[1].toString()));
				else
					Gross12 = 0.0;
			}

			System.out.println(Gross12);
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (slave.patient_slave_amt),(slave.patient_slave_vatAmt) from pharma_patient_sales_bill_master master inner join pharma_patient_sales_bill_slave slave on slave.patient_slave_bill_master_id=master.patient_sales_bill_id "
							+ " where slave.patient_slave_vat='0' and master.patient_bill_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null)
					Gross0 = Gross0 + (Double.parseDouble(row[0].toString()) - Double.parseDouble(row[1].toString()));
				else
					Gross0 = 0.0;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		// counter sale
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select sum(master.counter_tax_vat0),sum(master.counter_tax_vat55),sum(master.counter_tax_vat12) from "
							+ "  pharma_counter_sale_master master " + " where master.counter_sale_for_date between '"
							+ from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				if (row[0] != null) {
					vat0 = vat0 + Float.parseFloat(row[0].toString());

					if (row[1] != null) {
						vat5 = vat5 + Float.parseFloat(row[1].toString());
					}

					if (row[2] != null) {
						vat12 = vat12 + Float.parseFloat(row[2].toString());
					}

				}
			}
		}

		catch (Exception e) {
			e.printStackTrace();
		}

		/*
		 * // INDENT sale try { query = sessionFactory .getCurrentSession()
		 * .createSQLQuery(
		 * " select sum(master.indent_tax_vat0),sum(master.indent_tax_vat55),sum(master.indent_tax_vat12) from "
		 * + "  pharma_counter_sale_master master " +
		 * " where master.counter_sale_for_date between '" + from + "' and '" + to +
		 * "'");
		 * 
		 * List<Object[]> rows = query.list(); for (Object[] row : rows) {
		 * 
		 * if (row[0] != null) { vat0 = vat0 + Float.parseFloat(row[0].toString());
		 * 
		 * if (row[1] != null) { vat5 = vat5 + Float.parseFloat(row[1].toString()); }
		 * 
		 * if (row[2] != null) { vat12 = vat12 + Float.parseFloat(row[2].toString()); }
		 * 
		 * } } }
		 * 
		 * catch (Exception e) { e.printStackTrace(); }
		 */

		// COUNTER
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (slave.counter_slave_amt),(slave.counter_slave_vatAmt) from pharma_counter_sale_master master "
							+ " inner join pharma_counter_sale_slave slave ON master.counter_sale_id = slave.counter_slave_master_id where "
							+ " slave.counter_slave_vat='5.5'  and master.counter_sale_for_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null)
					Grossc5 = Grossc5 + (Double.parseDouble(row[0].toString()) - Double.parseDouble(row[1].toString()));
				else
					Grossc5 = 0.0;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (slave.counter_slave_amt),(slave.counter_slave_vatAmt) from pharma_counter_sale_master master "
							+ " inner join pharma_counter_sale_slave slave ON master.counter_sale_id = slave.counter_slave_master_id where "
							+ " slave.counter_slave_vat='12.5'  and master.counter_sale_for_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null)
					Grossc12 = Grossc12
							+ (Double.parseDouble(row[0].toString()) - Double.parseDouble(row[1].toString()));
				else
					Grossc12 = 0.0;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (slave.counter_slave_amt),(slave.counter_slave_vatAmt) from pharma_counter_sale_master master "
							+ " inner join pharma_counter_sale_slave slave ON master.counter_sale_id = slave.counter_slave_master_id where "
							+ " slave.counter_slave_vat='0'  and master.counter_sale_for_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null)
					Grossc0 = Grossc0 + (Double.parseDouble(row[0].toString()) - Double.parseDouble(row[1].toString()));
				else
					Grossc0 = 0.0;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		// indent sale
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (slave.indent_sale_slave_amt),(slave.indent_slave_vatAmt) from pharma_indent_sale_master master "
							+ " inner join pharma_indent_sale_slave slave on slave.indent_sale_slave_master_id=master.indent_sale_id "
							+ " where  slave.indent_slave_vat=5.5  and master.indent_sale_received_date between '"
							+ from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null)
					Grossi5 = Grossi5 + (Double.parseDouble(row[0].toString()) - Double.parseDouble(row[1].toString()));
				else
					Grossi5 = 0.0;

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (slave.indent_sale_slave_amt),(slave.indent_slave_vatAmt) from pharma_indent_sale_master master "
							+ " inner join pharma_indent_sale_slave slave on slave.indent_sale_slave_master_id=master.indent_sale_id "
							+ " where  slave.indent_slave_vat=12.5  and master.indent_sale_received_date between '"
							+ from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null)
					Grossi12 = Grossi12
							+ (Double.parseDouble(row[0].toString()) - Double.parseDouble(row[1].toString()));
				else
					Grossi12 = 0.0;

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (slave.indent_sale_slave_amt),(slave.indent_slave_vatAmt) from pharma_indent_sale_master master "
							+ " inner join pharma_indent_sale_slave slave on slave.indent_sale_slave_master_id=master.indent_sale_id "
							+ " where  slave.indent_slave_vat=0  and master.indent_sale_received_date between '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null)
					Grossi0 = Grossi0 + (Double.parseDouble(row[0].toString()) - Double.parseDouble(row[1].toString()));
				else
					Grossi0 = 0.0;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" select (master.indent_sale_gross_amt),(master.indent_sale_less),(master.indent_tax_vat0),(master.indent_tax_vat55),(master.indent_tax_vat12),(master.indent_sale_add), "
							+ " (master.indent_sale_net_amt) from pharma_indent_sale_master master inner join pharma_indent_master indent ON master.indent_sale_id = indent.indent_id inner join treatment t ON t.Treatment_ID = indent.indent_treatement_id "
							+ "  inner join patient p ON p.Patient_ID = t.Patient_ID where master.indent_sale_received_date between '"
							+ from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				if (row[0] != null) {
					gross = gross + Float.parseFloat(row[0].toString());

					if (row[1] != null) {
						less = less + Float.parseFloat(row[1].toString());
					}

					if (row[2] != null) {
						vat0 = vat0 + Float.parseFloat(row[2].toString());
					}

					if (row[3] != null) {
						vat5 = vat5 + Float.parseFloat(row[3].toString());
					}

					if (row[4] != null) {
						vat12 = vat12 + Float.parseFloat(row[4].toString());
					}

					if (row[5] != null) {
						add = add + Float.parseFloat(row[5].toString());
					}

					if (row[6] != null) {
						net = net + Float.parseFloat(row[6].toString());

					}
				}
			}

			DecimalFormat df = new DecimalFormat("###.###");

			reportPurchase.setTotalVat0(Double.parseDouble((df.format(vat0))));
			reportPurchase.setTotalVat5(Double.parseDouble((df.format(vat5))));
			reportPurchase.setTotalVat12(Double.parseDouble(df.format(vat12)));

			String totalGross5 = df.format(Gross5 + Grossi5 + Grossc5);
			String totalGross12 = df.format(Gross12 + Grossi12 + Grossc12);
			String totalGross0 = df.format(Gross0 + Grossi0 + Grossc0);

			reportPurchase.setGross5(Double.parseDouble(totalGross5));
			reportPurchase.setGross12(Double.parseDouble(totalGross12));
			reportPurchase.setGross0(Double.parseDouble(totalGross0));

			String totalNet0 = df.format(Gross0 + Grossi0 + Grossc0 + vat0);
			String totalNet5 = df.format(Gross5 + Grossi5 + Grossc5 + vat5);
			String totalNet12 = df.format(Gross12 + Grossi12 + Grossc12 + vat12);

			reportPurchase.setTotalNet0(Double.parseDouble(totalNet0));
			reportPurchase.setTotalNet5(Double.parseDouble(totalNet5));
			reportPurchase.setTotalNet12(Double.parseDouble(totalNet12));

			String total = df.format(Gross0 + Grossi0 + Gross5 + Grossi5 + Gross12 + Grossi12);

			reportPurchase.setGrossAmt(Double.parseDouble(df
					.format(Gross0 + Grossi0 + Grossc0 + Gross5 + Grossi5 + Grossc5 + Gross12 + Grossi12 + Grossc12)));
			reportPurchase.setTotalAdd(Double.parseDouble(df.format(vat12 + vat5 + vat0)));
			reportPurchase.setNetAmt(Double.parseDouble(df.format(
					Double.parseDouble(totalNet12) + Double.parseDouble(totalNet5) + Double.parseDouble(totalNet0))));

			reportPurchases.add(reportPurchase);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportProductWiseBatchSale> getTotalPatientData(String from, String to) {
		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		// patient sale
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT patient_sales_bill_id,fName,mName,lName,netAmt,amtRec,vat55,vat12,vat0,billMode,amtBal,amtTime,patientDate, "
							+ " sum(Taxable55),sum(Taxable12),sum(Taxable0) FROM (SELECT p.fName as fName,p.mName as mName,p.lName as lName, "
							+ " master.patient_sales_bill_id as patient_sales_bill_id,master.patient_sales_bill_net_amt as netAmt,master.patient_sales_bill_amount_received as amtRec, "
							+ " master.patient_tax_vat6 as vat55,master.patient_tax_vat135 as vat12,master.patient_tax_vat0 as vat0,master.patient_bill_mode as billMode, "
							+ " master.patient_sales_bill_amount_balance as amtBal,master.patient_sale_for_time as amtTime,master.patient_bill_date as patientDate, "
							+ " IF(slave.patient_slave_vat = '6', (slave.patient_slave_amt-patient_slave_vatAmt), 0) as Taxable55,IF(slave.patient_slave_vat = '13.5', (slave.patient_slave_amt-patient_slave_vatAmt), 0) as Taxable12, "
							+ " IF(slave.patient_slave_vat = '0', (slave.patient_slave_amt-patient_slave_vatAmt), 0) as Taxable0 from pharma_patient_sales_bill_master master inner join patient p ON master.patient_bill_patient_id = p.Patient_ID "
							+ " inner join pharma_patient_sales_bill_slave slave ON master.patient_sales_bill_id = slave.patient_slave_bill_master_id where master.patient_bill_date between '"
							+ from + "' and '" + to
							+ "') pharma_patient_sales_bill_master group by patient_sales_bill_id");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();
				DecimalFormat df = new DecimalFormat("###.##");

				if (row[0] != null) {
					reportPurchase.setPatientId("PS" + row[0].toString());

					if (row[1] != null) {
						reportPurchase
								.setPatientName(row[1].toString() + " " + row[2].toString() + " " + row[3].toString());
					}

					if (row[4] != null) {
						reportPurchase.setPatientNetAmt(df.format(Double.parseDouble(row[4].toString())));
					}

					if (row[5] != null) {
						reportPurchase.setPatientAmtReceive(df.format(Double.parseDouble(row[5].toString())));
					}

					if (row[6] != null) {
						reportPurchase.setPatientTax55(df.format(Double.parseDouble(row[6].toString())));
					}

					if (row[7] != null) {
						reportPurchase.setPatientTax12(df.format(Double.parseDouble(row[7].toString())));
					}

					if (row[8] != null) {
						reportPurchase.setPatientTax0(df.format(Double.parseDouble(row[8].toString())));
					}

					if (row[9] != null) {
						if ((row[9].toString()).equals("0"))
							reportPurchase.setPatientTransType("Cash");
						else if ((row[9].toString()).equals("1"))
							reportPurchase.setPatientTransType("Credit");
						else
							reportPurchase.setPatientTransType("Cheque");
					}
					if (row[10] != null) {
						reportPurchase.setPatientAmtBal(df.format(Double.parseDouble(row[10].toString())));
					}
					if (row[12] != null) {
						if (row[11] != null) {
							reportPurchase.setPatientSaleDate(row[12].toString() + " " + row[11].toString());
						}
					}
					if (row[13] != null) {

						reportPurchase.setTaxable55(df.format(Double.parseDouble(row[13].toString())));
					}
					if (row[14] != null) {

						reportPurchase.setTaxable12(df.format(Double.parseDouble(row[14].toString())));
					}
					if (row[15] != null) {
						reportPurchase.setTaxable0(df.format(Double.parseDouble(row[15].toString())));
					}

					reportPurchases.add(reportPurchase);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		// counter sale
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT counter_sale_id,pName,net,vat55,vat12,vat0,patientBillMode,patientTime,patientDate,sum(Taxable55),sum(Taxable12),sum(Taxable0) "
							+ " FROM (SELECT master.counter_sale_id as counter_sale_id,master.counter_sale_patient_name as pName,master.counter_sale_net_amt as net,master.counter_tax_vat6 as vat55, "
							+ " master.counter_tax_vat135 as vat12,master.counter_tax_vat0 as vat0,master.counter_sale_trans_type as patientBillMode,master.counter_sale_for_time as patientTime,master.counter_sale_for_date as patientDate, "
							+ " IF(slave.counter_slave_vat = '6',(slave.counter_slave_amt-counter_slave_vatAmt),0) as Taxable55,IF(slave.counter_slave_vat = '13.5',(slave.counter_slave_amt-counter_slave_vatAmt),0) as Taxable12,IF(slave.counter_slave_vat = '0',(slave.counter_slave_amt-counter_slave_vatAmt),0) as Taxable0 "
							+ " from pharma_counter_sale_master master inner join pharma_counter_sale_slave slave ON master.counter_sale_id = slave.counter_slave_master_id  where "
							+ " master.counter_sale_for_date between '" + from + "' and '" + to
							+ "') pharma_counter_sale_master group by counter_sale_id");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				DecimalFormat df = new DecimalFormat("###.##");
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

				if (row[0] != null) {
					reportPurchase.setPatientId("CS" + row[0].toString());

					if (row[1] != null) {
						reportPurchase.setPatientName(row[1].toString());
					}

					if (row[2] != null) {
						reportPurchase.setPatientNetAmt(df.format(Double.parseDouble(row[2].toString())));
					}

					if (row[2] != null) {
						reportPurchase.setPatientAmtReceive(df.format(Double.parseDouble(row[2].toString())));
					}

					if (row[3] != null) {
						reportPurchase.setPatientTax55(df.format(Double.parseDouble(row[3].toString())));
					}

					if (row[4] != null) {
						reportPurchase.setPatientTax12(df.format(Double.parseDouble(row[4].toString())));
					}

					if (row[5] != null) {
						reportPurchase.setPatientTax0(df.format(Double.parseDouble(row[5].toString())));
					}

					if (row[6] != null) {
						if ((row[6].toString()).equals("0"))
							reportPurchase.setPatientTransType("Cash");
						else if ((row[6].toString()).equals("1"))
							reportPurchase.setPatientTransType("Cash Credit");
						else if ((row[6].toString()).equals("2"))
							reportPurchase.setPatientTransType("Credit Card");
						else
							reportPurchase.setPatientTransType("Cheque");
					}

					if (row[7] != null) {
						reportPurchase.setPatientSaleTime(row[7].toString());
					}

					if (row[8] != null) {
						if (row[7] != null) {
							reportPurchase.setPatientSaleDate(row[8].toString() + " " + row[7].toString());
						}
					}
					if (row[9] != null) {
						reportPurchase.setTaxable55(df.format(Double.parseDouble(row[9].toString())));
					}
					if (row[10] != null) {
						reportPurchase.setTaxable12(df.format(Double.parseDouble(row[10].toString())));
					}
					if (row[11] != null) {
						reportPurchase.setTaxable0(df.format(Double.parseDouble(row[11].toString())));
					}

					reportPurchase.setPatientAmtBal("0");

					reportPurchases.add(reportPurchase);
				}
			}
		}

		catch (Exception e) {
			e.printStackTrace();
		}

		// indent sale
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT indent_sale_id,fName,mName,lName,netAmt,amtRec,vat55,vat12,vat0,billMode,amtBal,patientTime,patientDate,sum(Taxable55),sum(Taxable12), "
							+ " sum(Taxable0) FROM (SELECT master.indent_sale_id as indent_sale_id,p.fName as fName,p.mName as mName,p.lName as lName,master.indent_sale_net_amt as netAmt,master.indent_sale_amt_receive as amtRec, "
							+ " master.indent_tax_vat6 as vat55,master.indent_tax_vat135 as vat12,master.indent_tax_vat0 as vat0,master.indent_bill_mode as billMode,master.indent_sale_amt_balance as amtBal, "
							+ " master.indent_sale_time as patientTime,master.indent_sale_received_date as patientDate,IF(slave.indent_slave_vat = '6',(slave.indent_sale_slave_amt-indent_slave_vatAmt),0) as Taxable55, "
							+ " IF(slave.indent_slave_vat = '13.5',(slave.indent_sale_slave_amt-indent_slave_vatAmt),0) as Taxable12,IF(slave.indent_slave_vat = '0',(slave.indent_sale_slave_amt-indent_slave_vatAmt),0) as Taxable0 "
							+ " from pharma_indent_sale_master master inner join pharma_indent_master indent ON master.indent_sale_indent_no = indent.indent_id inner join "
							+ " treatment t ON t.Treatment_ID = indent.indent_treatement_id inner join patient p ON p.Patient_ID = t.Patient_ID inner join pharma_indent_sale_slave slave ON slave.indent_sale_slave_master_id = master.indent_sale_id "
							+ " where master.indent_sale_received_date between '" + from + "' and '" + to
							+ "') pharma_indent_sale_master group by indent_sale_id");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				DecimalFormat df = new DecimalFormat("###.##");
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

				if (row[0] != null) {
					reportPurchase.setPatientId("IS" + row[0].toString());

					if (row[1] != null) {
						reportPurchase
								.setPatientName(row[1].toString() + " " + row[2].toString() + " " + row[3].toString());
					}

					if (row[4] != null) {
						reportPurchase.setPatientNetAmt(df.format(Double.parseDouble(row[4].toString())));
					}

					if (row[5] != null) {
						reportPurchase.setPatientAmtReceive(df.format(Double.parseDouble(row[5].toString())));
					}

					if (row[6] != null) {
						reportPurchase.setPatientTax55(df.format(Double.parseDouble(row[6].toString())));
					}

					if (row[7] != null) {
						reportPurchase.setPatientTax12(df.format(Double.parseDouble(row[7].toString())));
					}

					if (row[8] != null) {
						reportPurchase.setPatientTax0(df.format(Double.parseDouble(row[8].toString())));
					}

					if (row[9] != null) {
						if ((row[9].toString()).equals("0"))
							reportPurchase.setPatientTransType("Cash");
						else if ((row[9].toString()).equals("1"))
							reportPurchase.setPatientTransType("Credit");
						else
							reportPurchase.setPatientTransType("Cheque");
					}

					if (row[10] != null) {
						reportPurchase.setPatientAmtBal(df.format(Double.parseDouble(row[10].toString())));
					}
					if (row[11] != null) {
						reportPurchase.setPatientSaleTime(row[11].toString());
					}
					if (row[12] != null) {
						if (row[11] != null) {
							reportPurchase.setPatientSaleDate(row[12].toString() + " " + row[11].toString());
						}
					}

					if (row[13] != null) {
						reportPurchase.setTaxable55(df.format(Double.parseDouble(row[13].toString())));
					}
					if (row[14] != null) {
						reportPurchase.setTaxable12(df.format(Double.parseDouble(row[14].toString())));
					}
					if (row[15] != null) {
						reportPurchase.setTaxable0(df.format(Double.parseDouble(row[15].toString())));
					}

					reportPurchases.add(reportPurchase);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDataOfPurchaseByProductId(Integer ProductId, String from, String to) {
		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		int count = 0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT product.product_name,slave.pur_slave_qty,master.pur_id,master.pur_bill_date,vendor.vendor_name,stock.stock_qty_in_hand,batch.batch_code,product.product_uom_unit "
							+ " FROM pharma_purchase_master master inner join pharma_purchase_slave slave ON master.pur_id = slave.pur_slave_master_id  inner join "
							+ " pharma_product_master product ON product.product_id = slave.pur_slave_product_id inner join pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id "
							+ " inner join pharma_purchase_rate rate ON rate.pur_slave_id = slave.pur_slave_id inner join pharma_batch_master batch ON batch.batch_id = rate.batch_id "
							+ " inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id where batch.batch_delete_flag=0 and "
							+ " slave.pur_slave_product_id='" + ProductId + "' and  pur_bill_date between  '" + from
							+ "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null) {
					count = 1;
					ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

					reportPurchase.setProductName(row[0].toString());

					if (row[1] != null) {
						reportPurchase.setQty(row[1].toString());
					}

					if (row[2] != null) {
						reportPurchase.setReceiptNo(row[2].toString());
					}

					if (row[3] != null) {
						reportPurchase.setDate(row[3].toString());
					}

					if (row[4] != null) {
						reportPurchase.setVendorName(row[4].toString());
					}

					if (row[5] != null) {
						reportPurchase.setStock(row[5].toString());
					}

					if (row[6] != null) {
						reportPurchase.setBatchCode(row[6].toString());
					}

					if (row[7] != null) {
						reportPurchase.setUnit(row[7].toString());
					}

					if (row[7] != null) {
						reportPurchase.setPurQty(
								(Float.parseFloat(row[1].toString())) * (Float.parseFloat(row[7].toString())));
					}

					reportPurchases.add(reportPurchase);
				}

			}

			if (count == 0) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

				reportPurchase.setProductName("-");

				reportPurchase.setQty("-");

				reportPurchase.setReceiptNo("-");

				reportPurchase.setDate("-");

				reportPurchase.setVendorName("-");

				reportPurchase.setStock("-");

				reportPurchase.setBatchCode("-");

				reportPurchase.setUnit("-");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDataOfMrnByProductId(Integer ProductId, String from, String to) {
		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		int count = 0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"  SELECT product.product_name,slave.mrn_issue_slave_qty,master.mrn_issue_id,master.mrn_issue_received_date,master.mrn_issue_store_name, "
							+ " batch.batch_code FROM pharma_mrn_issue_master master inner join pharma_mrn_issue_slave slave ON master.mrn_issue_id = slave.mrn_issue_slave_master_id inner join "
							+ " pharma_product_master product ON product.product_id = slave.mrn_issue_slave_product_id inner join pharma_batch_master batch ON batch.batch_id = slave.mrn_issue_slave_batchId "
							+ " inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id where batch.batch_delete_flag = 0 and slave.mrn_issue_slave_product_id = '"
							+ ProductId + "'" + " and mrn_issue_received_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null) {
					count = 1;
					ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

					reportPurchase.setProductNameForMrn(row[0].toString());

					if (row[1] != null) {
						reportPurchase.setQtyForMrn(row[1].toString());
					}

					if (row[2] != null) {
						reportPurchase.setReceiptNoForMrn(row[2].toString());
					}

					if (row[3] != null) {
						reportPurchase.setDateForMrn(row[3].toString());
					}

					if (row[4] != null) {
						reportPurchase.setStockMrn(row[4].toString());
					}

					if (row[5] != null) {
						reportPurchase.setBatchCodeMrn(row[5].toString());
					}

					reportPurchases.add(reportPurchase);
				}

			}

			if (count == 0) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

				reportPurchase.setProductNameForMrn("-");

				reportPurchase.setQtyForMrn("-");

				reportPurchase.setReceiptNoForMrn("-");

				reportPurchase.setDateForMrn("-");

				reportPurchase.setStockMrn("-");

				reportPurchase.setBatchCodeMrn("-");

				reportPurchases.add(reportPurchase);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDataOfOpeningStockByProductId(Integer ProductId, String from,
			String to) {
		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		int count = 0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT product.product_name,master.opening_qty,master.opening_stock_id,master.opening_stock_add_date,stock.stock_qty_in_hand,batch.batch_code,product.product_uom_unit "
							+ " FROM pharma_opening_stock master inner join pharma_product_master product ON product.product_id = master.product_id inner join "
							+ " pharma_batch_master batch ON batch.batch_id = master.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id "
							+ " where batch.batch_delete_flag = 0  and master.product_id = '" + ProductId
							+ "' and opening_stock_add_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null) {
					count = 1;
					ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

					reportPurchase.setOpeningStockproductName(row[0].toString());

					if (row[1] != null) {
						reportPurchase.setOpeningStockqty(row[1].toString());
					}

					if (row[2] != null) {
						reportPurchase.setOpeningStockreceiptNo(row[2].toString());
					}

					if (row[3] != null) {
						reportPurchase.setOpeningStockdate(row[3].toString());
					}

					if (row[4] != null) {
						reportPurchase.setOpeningStock(row[4].toString());
					}

					if (row[5] != null) {
						reportPurchase.setOpeningStockBatchCode(row[5].toString());
					}

					if (row[6] != null) {
						reportPurchase.setOpeningStockUnit(row[6].toString());
					}

					if (row[6] != null) {
						reportPurchase.setOpeningPurQty(
								(Float.parseFloat(row[1].toString())) * (Float.parseFloat(row[6].toString())));
					}

					reportPurchases.add(reportPurchase);
				}

			}

			if (count == 0) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

				reportPurchase.setOpeningStockproductName("-");

				reportPurchase.setOpeningStockqty("-");

				reportPurchase.setOpeningStockreceiptNo("-");

				reportPurchase.setOpeningStockdate("-");

				reportPurchase.setOpeningStock("-");

				reportPurchase.setOpeningStockBatchCode("-");

				reportPurchase.setOpeningStockUnit("-");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDataOfCounterByProductId(Integer ProductId, String from, String to) {
		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		int count = 0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT product.product_name,slave.counter_slave_qty,master.counter_sale_id,master.counter_sale_for_date,master.counter_sale_patient_name FROM pharma_counter_sale_master master "
							+ " inner join pharma_counter_sale_slave slave ON master.counter_sale_id = slave.counter_slave_master_id inner join pharma_product_master product on product.product_id=slave.counter_slave_product_id "
							+ " where slave.counter_slave_product_id ='" + ProductId
							+ "' and master.counter_sale_for_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				if (row[0] != null) {
					count = 1;
					ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();
					if (row[0] != null) {
						reportPurchase.setProductNameForCounter(row[0].toString());
					}

					if (row[1] != null) {
						reportPurchase.setQtyForCounter(row[1].toString());
					}

					if (row[2] != null) {
						reportPurchase.setReceiptNoForCounter("CS" + row[2].toString());
					}

					if (row[3] != null) {
						reportPurchase.setDateForCounter(row[3].toString());
					}

					if (row[4] != null) {
						reportPurchase.setPatientNameForCounter(row[4].toString());
					}

					reportPurchases.add(reportPurchase);
				}
			}
			if (count == 0) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

				reportPurchase.setProductNameForCounter("-");

				reportPurchase.setQtyForCounter("-");

				reportPurchase.setReceiptNoForCounter("-");

				reportPurchase.setDateForCounter("-");

				reportPurchase.setPatientNameForCounter("-");

				reportPurchases.add(reportPurchase);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDataOfPatientByProductId(Integer ProductId, String from, String to) {
		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		int count = 0;
		try {

			query = sessionFactory.getCurrentSession().createSQLQuery(
					"  SELECT product.product_name,slave.patient_slave_qty,master.patient_sales_bill_id,master.patient_bill_date,p.fName,p.mName,p.lName "
							+ " FROM pharma_patient_sales_bill_master master inner join pharma_patient_sales_bill_slave slave ON master.patient_sales_bill_id = slave.patient_slave_bill_master_id inner join "
							+ " pharma_product_master product ON product.product_id = slave.patient_slave_product_id inner join  patient p on p.Patient_ID=master.patient_bill_patient_id where "
							+ " slave.patient_slave_product_id = '" + ProductId
							+ "' and master.patient_bill_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();
				if (row[0] != null) {
					count = 1;

					if (row[0] != null) {
						reportPurchase.setProductNameForPatient(row[0].toString());
					}

					if (row[1] != null) {
						reportPurchase.setQtyForPatient(row[1].toString());
					}

					if (row[2] != null) {
						reportPurchase.setReceiptNoForPatient("PS" + row[2].toString());
					}

					if (row[3] != null) {
						reportPurchase.setDateForPatient(row[3].toString());
					}

					if (row[4] != null) {
						reportPurchase.setPatientNameForPatient(row[4].toString());
					}

					if (row[4] != null && row[5] != null) {
						reportPurchase.setPatientNameForPatient(row[4].toString() + " " + row[5].toString());
					}
					if (row[4] != null && row[5] != null && row[6] != null) {
						reportPurchase.setPatientNameForPatient(
								row[4].toString() + " " + row[5].toString() + " " + row[6].toString());
					}

					reportPurchases.add(reportPurchase);
				}

			}

			if (count == 0) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

				reportPurchase.setProductNameForPatient("-");

				reportPurchase.setQtyForPatient("-");

				reportPurchase.setReceiptNoForPatient("-");

				reportPurchase.setDateForPatient("-");

				reportPurchase.setPatientNameForPatient("-");

				reportPurchases.add(reportPurchase);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDataOfIndentByProductId(Integer ProductId, String from, String to) {
		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		int count = 0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT product.product_name,slave.indent_sale_slave_qty,master.indent_sale_id,master.indent_sale_received_date, "
							+ " p.fName,p.mName,p.lName FROM pharma_indent_sale_master master inner join pharma_indent_sale_slave slave ON master.indent_sale_id = slave.indent_sale_slave_master_id "
							+ " inner join pharma_indent_master indent ON indent.indent_id = master.indent_sale_indent_no inner join pharma_product_master product on product.product_id=slave.indent_sale_slave_product_id "
							+ " inner join treatment t on t.Treatment_ID=indent.indent_treatement_id inner join patient p on p.Patient_ID=t.Patient_ID where slave.indent_sale_slave_product_id ="
							+ ProductId + " and master.indent_sale_received_date between '" + from + "' and '" + to
							+ "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();
				if (row[0] != null) {
					count = 1;
					if (row[0] != null) {
						reportPurchase.setProductNameForIndent(row[0].toString());
					}

					if (row[1] != null) {
						reportPurchase.setQtyForIndent(row[1].toString());
					}

					if (row[2] != null) {
						reportPurchase.setReceiptNoForIndent("IS" + row[2].toString());
					}

					if (row[3] != null) {
						reportPurchase.setDateForIndent(row[3].toString());
					}

					if (row[4] != null) {
						reportPurchase.setPatientNameForIndent(row[4].toString());
					}
					if (row[4] != null && row[5] != null) {
						reportPurchase.setPatientNameForIndent(row[4].toString() + " " + row[5].toString());
					}
					if (row[4] != null && row[5] != null && row[6] != null) {
						reportPurchase.setPatientNameForIndent(
								row[4].toString() + " " + row[5].toString() + " " + row[6].toString());
					}

					reportPurchases.add(reportPurchase);
				}
			}
			if (count == 0) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

				reportPurchase.setProductNameForIndent("-");

				reportPurchase.setQtyForIndent("-");

				reportPurchase.setReceiptNoForIndent("-");

				reportPurchase.setDateForIndent("-");

				reportPurchase.setPatientNameForIndent("-");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDataOfCreditByProductId(Integer ProductId, String from, String to) {
		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		int count = 0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT product.product_name,slave.credit_note_slave_qty,master.credit_note_id,master.credit_note_date,master.credit_note_patient_name FROM "
							+ " pharma_credit_note_master master inner join pharma_credit_note_slave slave ON master.credit_note_id = slave.credit_note_slave_master_id "
							+ " inner join pharma_product_master product on product.product_id=slave.credit_note_slave_product_id where slave.credit_note_slave_product_id='"
							+ ProductId + "' and master.credit_note_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();
				if (row[0] != null) {
					count = 1;
					if (row[0] != null) {
						reportPurchase.setProductNameForCredit(row[0].toString());
					}

					if (row[1] != null) {
						reportPurchase.setQtyForCredit(row[1].toString());
					}

					if (row[2] != null) {
						reportPurchase.setReceiptNoForCredit(row[2].toString());
					}

					if (row[3] != null) {
						reportPurchase.setDateForCredit(row[3].toString());
					}

					if (row[4] != null) {
						reportPurchase.setPatientNameForCredit(row[4].toString());
					}

				}

				reportPurchases.add(reportPurchase);
			}

			if (count == 0) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

				reportPurchase.setProductNameForCredit("-");

				reportPurchase.setQtyForCredit("-");

				reportPurchase.setReceiptNoForCredit("-");

				reportPurchase.setDateForCredit("-");

				reportPurchase.setPatientNameForCredit("-");

				reportPurchases.add(reportPurchase);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDataOfDebitByProductId(Integer ProductId, String from, String to) {
		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		int count = 0;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT product.product_name,slave.debit_note_slave_qty,master.debit_note_id,master.debit_note_date,vendor.vendor_name "
							+ " FROM pharma_debit_note_master master inner join pharma_debit_note_slave slave ON master.debit_note_id = slave.debit_note_slave_master_id "
							+ " inner join pharma_product_master product on product.product_id=slave.debit_note_slave_product_id "
							+ " inner join pharma_vendor_master vendor on vendor.vendor_id=master.debit_note_vendor_id  where "
							+ "  slave.debit_note_slave_product_id ='" + ProductId
							+ "' and master.debit_note_date between '" + from + "' and '" + to + "'");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();
				if (row[0] != null) {
					count = 1;

					if (row[0] != null) {
						reportPurchase.setProductNameForDebit(row[0].toString());
					}

					if (row[1] != null) {
						reportPurchase.setQtyForDebit(row[1].toString());
					}

					if (row[2] != null) {
						reportPurchase.setReceiptNoForDebit(row[2].toString());
					}

					if (row[3] != null) {
						reportPurchase.setDateForDebit(row[3].toString());
					}

					if (row[4] != null) {
						reportPurchase.setPatientNameForDebit(row[4].toString());
					}

					reportPurchases.add(reportPurchase);
				}
			}
			if (count == 0) {
				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();

				reportPurchase.setProductNameForDebit("-");

				reportPurchase.setQtyForDebit("-");

				reportPurchase.setReceiptNoForDebit("-");

				reportPurchase.setDateForDebit("-");

				reportPurchase.setPatientNameForDebit("-");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ProductMaster> getProducts() {
		List<ProductMaster> productMasters = new ArrayList<ProductMaster>();
		SQLQuery query = null;

		String debitNote = "SELECT product_id,product_name,product_uom_unit FROM pharma_product_master where product_delete_flag=0;";

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		float total = 0;
		try {

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ProductMaster productMaster = new ProductMaster();

				if (row[0] != null)
					productMaster.setProductId(Integer.parseInt(row[0].toString()));
				else
					productMaster.setProductId(0);

				if (row[1] != null)
					productMaster.setProductName(row[1].toString());
				else
					productMaster.setProductName("");

				if (row[2] != null)
					productMaster.setProductUnit(Double.parseDouble(row[2].toString()));
				else
					productMaster.setProductUnit(0.0);

				productMasters.add(productMaster);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productMasters;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDataOfAllItemLadgerProductId(Integer ProductId, String from, String to,
			String type) {

		List<ReportProductWiseBatchSale> reportPurchases = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> reportPurchases1 = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		SQLQuery query1 = null;
		SQLQuery query2 = null;
		SQLQuery query3 = null;
		SQLQuery query4 = null;
		SQLQuery query5 = null;
		// Purchase Entry
		String purchaseEntry = " SELECT product.product_name,slave.pur_slave_qty,master.pur_id,master.pur_bill_date,vendor.vendor_name,stock.stock_qty_in_hand,batch.batch_code "
				+ " FROM pharma_purchase_master master inner join pharma_purchase_slave slave ON master.pur_id = slave.pur_slave_master_id inner join pharma_product_master product ON product.product_id = slave.pur_slave_product_id "
				+ " inner join pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id inner join pharma_batch_master batch on batch.batch_id=slave.pur_slave_batch_id "
				+ " inner join pharma_stock_master stock on batch.batch_id=stock.stock_batch_id where "
				+ " slave.pur_slave_product_id='" + ProductId + "'  and  pur_bill_date between  '" + from + "' and '"
				+ to + "'";

		String counterSale = " SELECT product.product_name,slave.counter_slave_qty,master.counter_sale_id,master.counter_sale_for_date,master.counter_sale_patient_name FROM pharma_counter_sale_master master "
				+ " inner join pharma_counter_sale_slave slave ON master.counter_sale_id = slave.counter_slave_master_id inner join pharma_product_master product on product.product_id=slave.counter_slave_product_id "
				+ " where slave.counter_slave_product_id ='" + ProductId
				+ "' and  master.counter_sale_for_date between '" + from + "' and '" + to + "'";

		String patientSale = "  SELECT product.product_name,slave.patient_slave_qty,master.patient_sales_bill_id,master.patient_bill_date,p.fName,p.mName,p.lName "
				+ " FROM pharma_patient_sales_bill_master master inner join pharma_patient_sales_bill_slave slave ON master.patient_sales_bill_id = slave.patient_slave_bill_master_id inner join "
				+ " pharma_product_master product ON product.product_id = slave.patient_slave_product_id inner join  patient p on p.Patient_ID=master.patient_bill_patient_id where "
				+ " slave.patient_slave_product_id = '" + ProductId + "' and master.patient_bill_date between '" + from
				+ "' and '" + to + "'";

		String indentSale = " SELECT product.product_name,slave.indent_sale_slave_qty,master.indent_sale_id,master.indent_sale_received_date, "
				+ " p.fName,p.mName,p.lName FROM pharma_indent_sale_master master inner join pharma_indent_sale_slave slave ON master.indent_sale_id = slave.indent_sale_slave_master_id "
				+ " inner join pharma_indent_master indent ON indent.indent_id = master.indent_sale_indent_no inner join pharma_product_master product on product.product_id=slave.indent_sale_slave_product_id "
				+ " inner join treatment t on t.Treatment_ID=indent.indent_treatement_id inner join patient p on p.Patient_ID=t.Patient_ID where slave.indent_sale_slave_product_id ="
				+ ProductId + " and master.indent_sale_received_date between '" + from + "' and '" + to + "'";

		String creditSale = " SELECT product.product_name,slave.credit_note_slave_qty,master.credit_note_id,master.credit_note_date,master.credit_note_patient_name FROM "
				+ " pharma_credit_note_master master inner join pharma_credit_note_slave slave ON master.credit_note_id = slave.credit_note_slave_master_id "
				+ " inner join pharma_product_master product on product.product_id=slave.credit_note_slave_product_id where slave.credit_note_slave_product_id='"
				+ ProductId + "' and master.credit_note_date between '" + from + "' and '" + to + "'";

		String debitSale = " SELECT product.product_name,slave.credit_note_slave_qty,master.credit_note_id,master.credit_note_date,master.credit_note_patient_name FROM "
				+ " pharma_credit_note_master master inner join pharma_credit_note_slave slave ON master.credit_note_id = slave.credit_note_slave_master_id "
				+ " inner join pharma_product_master product on product.product_id=slave.credit_note_slave_product_id where slave.credit_note_slave_product_id='"
				+ ProductId + "' and master.credit_note_date between '" + from + "' and '" + to + "'";

		if (type.equals("purchaseEntry")) {
			query = sessionFactory.getCurrentSession().createSQLQuery(purchaseEntry);

		}
		if (type.equals("counterSale")) {
			query1 = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
		} else if (type.equals("indentSale")) {
			query3 = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
		} else if (type.equals("patientSale")) {
			query2 = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
		} else if (type.equals("creditNoteSale")) {
			query4 = sessionFactory.getCurrentSession().createSQLQuery(creditSale);
		} else if (type.equals("debitNoteSale")) {
			query5 = sessionFactory.getCurrentSession().createSQLQuery(debitSale);
		}

		try {

			List<Object[]> rows = query.list();
			for (Object[] row1 : rows) {

				ReportProductWiseBatchSale reportPurchase = new ReportProductWiseBatchSale();
				if (row1[0] != null) {
					reportPurchase.setProductName(row1[0].toString());
				}

				if (row1[1] != null) {
					reportPurchase.setQty(row1[1].toString());
				}

				if (row1[2] != null) {
					reportPurchase.setReceiptNo(row1[2].toString());
				}

				if (row1[3] != null) {
					reportPurchase.setDate(row1[3].toString());
				}

				if (row1[4] != null) {
					reportPurchase.setVendorName(row1[4].toString());
				}

				if (row1[5] != null) {
					reportPurchase.setStock(row1[5].toString());
				}

				if (row1[6] != null) {
					reportPurchase.setBatchCode(row1[6].toString());
				}

				reportPurchases.add(reportPurchase);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// counter sale

		try {

			List<Object[]> rows = query1.list();
			for (Object[] row2 : rows) {

				ReportProductWiseBatchSale reportPurchase1 = new ReportProductWiseBatchSale();
				if (row2[0] != null) {
					reportPurchase1.setProductNameForCounter(row2[0].toString());
				}

				if (row2[1] != null) {
					reportPurchase1.setQtyForCounter(row2[1].toString());
				}

				if (row2[2] != null) {
					reportPurchase1.setReceiptNoForCounter("CS" + row2[2].toString());
				}

				if (row2[3] != null) {
					reportPurchase1.setDateForCounter(row2[3].toString());
				}

				if (row2[4] != null) {
					reportPurchase1.setPatientNameForCounter(row2[4].toString());
				}

				reportPurchases1.add(reportPurchase1);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// patient sale

		try {

			List<Object[]> rows = query2.list();
			for (Object[] row3 : rows) {

				ReportProductWiseBatchSale reportPurchase2 = new ReportProductWiseBatchSale();
				if (row3[0] != null) {
					reportPurchase2.setProductNameForPatient(row3[0].toString());
				}

				if (row3[1] != null) {
					reportPurchase2.setQtyForPatient(row3[1].toString());
				}

				if (row3[2] != null) {
					reportPurchase2.setReceiptNoForPatient("PS" + row3[2].toString());
				}

				if (row3[3] != null) {
					reportPurchase2.setDateForPatient(row3[3].toString());
				}

				if (row3[4] != null) {
					reportPurchase2.setPatientNameForPatient(row3[4].toString());
				}

				reportPurchases.add(reportPurchase2);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// indent sale

		try {

			List<Object[]> rows = query3.list();
			for (Object[] row4 : rows) {

				ReportProductWiseBatchSale reportPurchase3 = new ReportProductWiseBatchSale();
				if (row4[0] != null) {
					reportPurchase3.setProductNameForIndent(row4[0].toString());
				}

				if (row4[1] != null) {
					reportPurchase3.setQtyForIndent(row4[1].toString());
				}

				if (row4[2] != null) {
					reportPurchase3.setReceiptNoForIndent("IS" + row4[2].toString());
				}

				if (row4[3] != null) {
					reportPurchase3.setDateForIndent(row4[3].toString());
				}

				if (row4[4] != null) {
					reportPurchase3.setPatientNameForIndent(row4[4].toString());
				}

				reportPurchases.add(reportPurchase3);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// credit sale

		try {

			List<Object[]> rows = query4.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale reportPurchase4 = new ReportProductWiseBatchSale();
				if (row[0] != null) {
					reportPurchase4.setProductNameForCredit(row[0].toString());
				} else
					reportPurchase4.setProductNameForCredit("");

				if (row[1] != null) {
					reportPurchase4.setQtyForCredit(row[1].toString());
				} else
					reportPurchase4.setQtyForCredit("");

				if (row[2] != null) {
					reportPurchase4.setReceiptNoForCredit(row[2].toString());
				} else
					reportPurchase4.setReceiptNoForCredit("");

				if (row[3] != null) {
					reportPurchase4.setDateForCredit(row[3].toString());
				} else
					reportPurchase4.setDateForCredit("");

				if (row[4] != null) {
					reportPurchase4.setPatientNameForCredit(row[4].toString());
				} else
					reportPurchase4.setPatientNameForCredit("");

				reportPurchases.add(reportPurchase4);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// debit sale

		try {

			List<Object[]> rows = query5.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale reportPurchase5 = new ReportProductWiseBatchSale();
				if (row[0] != null) {
					reportPurchase5.setProductNameForDebit(row[0].toString());
				} else
					reportPurchase5.setProductNameForDebit("");

				if (row[1] != null) {
					reportPurchase5.setQtyForDebit(row[1].toString());
				} else
					reportPurchase5.setQtyForDebit("");

				if (row[2] != null) {
					reportPurchase5.setReceiptNoForDebit(row[2].toString());
				} else
					reportPurchase5.setReceiptNoForDebit("");

				if (row[3] != null) {
					reportPurchase5.setDateForDebit(row[3].toString());
				} else
					reportPurchase5.setDateForDebit("");

				if (row[4] != null) {
					reportPurchase5.setPatientNameForDebit(row[4].toString());
				} else
					reportPurchase5.setPatientNameForDebit("");

				reportPurchases.add(reportPurchase5);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDailyUserWiseSaleData(String from, String type, String userId) {
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String counterSale = "";
		if (hospitalName.equals("apple")) {
			counterSale = "select distinct c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt from pharma_counter_sale_master c_master inner join pharma_counter_sale_slave c_slave on  c_slave.counter_slave_master_id=c_master.counter_sale_id where c_master.counter_sale_for_date='"
					+ from + "' and counter_slave_No between '1' and '4'";
		} else {
			counterSale = "select c_master.counter_sale_id,c_master.counter_sale_patient_name,c_master.counter_sale_address,c_master.counter_sale_net_amt from pharma_counter_sale_master c_master where c_master.counter_sale_for_date='"
					+ from + "' and counter_sale_user_id='" + userId + "' and counter_sale_delete_flag=0 ";
		}

		String indentSale = "select c_master.indent_sale_doc_no,concat(pat.prefix,' ',pat.f_name,' ',pat.m_name,' ',pat.l_name) AS patient_name,pat.address,c_master.indent_sale_net_amt from     pharma_indent_sale_master c_master inner join pharma_indent_master indent_m on indent_m.indent_id=c_master.indent_sale_indent_no inner join  ehat_treatment t ON t.treatment_id = indent_m.indent_treatement_id inner join ehat_patient pat ON pat.patient_id = t.patient_id where c_master.indent_sale_received_date ='"
				+ from + "' and indent_sale_user_id='" + userId + "' and indent_sale_delete_flag=0 ";

		String hospitalSale = "select c_master.hospital_bill_doc_no,c_master.hospital_bill_patient_name,p.addressLine1,c_master.hospital_bill_net_amt from  pharma_hospital_bill_master c_master inner join patient p on p.Patient_ID=c_master.hospital_bill_patient_id where c_master.hospital_bill_date = '"
				+ from + "' and hospital_bill_user_id='" + userId + "'";

		String patientSale = "select p_master.patient_sales_bill_doc_no,concat(p1.prefix,' ',p1.f_name,' ',p1.m_name,' ',p1.l_name) AS patient_name, p1.address,p_master.patient_sales_bill_net_amt from pharma_patient_sales_bill_master p_master inner join ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id where  p_master.patient_bill_date = '"
				+ from + "' and patient_sale_user_id='" + userId + "' and p_master.patient_sales_bill_delete_flag=0 ";

		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setVouNo(row[0].toString());
				else
					productByBatch.setVouNo("");

				if (row[1] != null)
					productByBatch.setPatientName(row[1].toString());
				else
					productByBatch.setPatientName("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
				} else if (type.equals("indentSale")) {
					productByBatch.setType("indentSale");
				} else if (type.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
				} else if (type.equals("patientSale")) {
					productByBatch.setType("patientSale");
				}
				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportProductWiseBatchSale> getDailyStockWiseSaleData(String stockName) {

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String storeReport = "select product.product_name,batch.batch_code,batch.batch_exp_date,stock.stock_qty_in_hand,rate.pur_rate,rate.mrp "
				+ " from pharma_" + stockName
				+ "_stock_master stock inner join pharma_product_master product ON product.product_id = stock.stock_product_id "
				+ " inner join pharma_batch_master batch ON batch.batch_id = stock.stock_batch_id inner join pharma_purchase_rate rate "
				+ " on rate.batch_id=stock.stock_batch_id where stock_delete_flag=0 ";

		query = sessionFactory.getCurrentSession().createSQLQuery(storeReport);

		List<Object[]> rows = query.list();
		for (Object[] row : rows) {
			try {
				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setProductName(row[0].toString());
				else
					productByBatch.setProductName("");

				if (row[1] != null)
					productByBatch.setBatchCode(row[1].toString());
				else
					productByBatch.setBatchCode("");

				if (row[2] != null)
					productByBatch.setBatchExp(row[2].toString());
				else
					productByBatch.setBatchExp("");

				if (row[3] != null)
					productByBatch.setStock(row[3].toString());
				else
					productByBatch.setStock("");

				if (row[4] != null)
					productByBatch.setPurRate(row[4].toString());
				else
					productByBatch.setPurRate("");

				if (row[5] != null)
					productByBatch.setMrp(row[5].toString());
				else
					productByBatch.setMrp("");

				productWiseBatchSales.add(productByBatch);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return productWiseBatchSales;
	}

	@Override
	public List<ReportCreditNoteDetails> getCreditNoteDetailsByTreatId(Integer treatId, String from, String to) {
		List<ReportCreditNoteDetails> creditNoteDetails = new ArrayList<ReportCreditNoteDetails>();
		SQLQuery query = null;

		String debitNote = "SELECT credit_note_id,credit_note_net_amt,credit_note_date FROM pharma_credit_note_master master where credit_note_treatmentId="
				+ treatId + " and credit_note_delete_flag=0 and credit_note_date between '" + from + "' and '" + to
				+ "'";

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		try {

			List<Object[]> rows = query.list();

			for (Object[] row : rows) {

				ReportCreditNoteDetails productByBatch = new ReportCreditNoteDetails();

				if (row[0] != null)
					productByBatch.setCredtiNoteId(row[0].toString());
				else
					productByBatch.setCredtiNoteId("");

				if (row[1] != null)
					productByBatch.setAmount(row[1].toString());
				else
					productByBatch.setAmount("");

				if (row[2] != null)
					productByBatch.setDate(row[2].toString());
				else
					productByBatch.setDate("");

				// slave code

				List<CreditNoteSlave> purchaseSlaves = new ArrayList<CreditNoteSlave>();
				try {
					SQLQuery slaveQuery = sessionFactory.getCurrentSession().createSQLQuery(
							/*
							 * "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id="
							 */
							"SELECT slave.credit_note_slave_qty,slave.credit_note_slave_amt,slave.credit_note_slave_batch_code,slave.credit_slave_ratePerUnit,p_m.product_name FROM pharma_credit_note_master master inner join pharma_credit_note_slave slave on slave.credit_note_slave_master_id=master.credit_note_id inner join pharma_product_master p_m on p_m.product_id=slave.credit_note_slave_product_id where credit_note_id="
									+ productByBatch.getCredtiNoteId() + " and credit_note_delete_flag=0;");
					List<Object[]> slaveResults = slaveQuery.list();
					for (Object[] slaveResult : slaveResults) {
						CreditNoteSlave purchaseSlave = new CreditNoteSlave();

						if (slaveResult[0] != null) {
							String result1[] = slaveResult[0].toString().split("\\.");
							purchaseSlave.setCreditSlaveQty(Integer.parseInt(result1[0]));
						}

						if (slaveResult[1] != null)
							purchaseSlave.setCreditNoteSlaveAmt(Double.parseDouble(slaveResult[1].toString()));

						if (slaveResult[2] != null)
							purchaseSlave.setCreditNoteSlaveBatchCode(slaveResult[2].toString());

						if (slaveResult[3] != null)
							purchaseSlave.setCreditNoteSlaveRatePerUnit(Double.parseDouble(slaveResult[3].toString()));

						ProductMaster productMaster = new ProductMaster();
						if (slaveResult[4] != null) {
							productMaster.setProductName(slaveResult[4].toString());
							purchaseSlave.setProductMaster(productMaster);
						} else {
							productMaster.setProductName("");
						}

						purchaseSlaves.add(purchaseSlave);
					}

				} catch (Exception e) {
					e.printStackTrace();
				}
				productByBatch.setCreditNoteSlaves(purchaseSlaves);

				creditNoteDetails.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return creditNoteDetails;
	}

	@Override
	public List<ReportCreditNoteDetails> getPatientSaleDetailsByPatientId(Integer patientId, String from, String to) {
		Double total = 0.0;
		
		List<ReportCreditNoteDetails> creditNoteDetails = new ArrayList<ReportCreditNoteDetails>();
		SQLQuery query = null;

		String debitNote = "SELECT master.patient_sales_bill_id,master. patient_bill_date,master. patient_bill_mode,master. patient_sales_bill_net_amt,master.patient_sales_bill_amount_received,master.patient_type,CONCAT(p.f_name, ' ', p.m_name, ' ', p.l_name) AS patient_name ,p.address,p.mobile, IF(master.bill_Category_id = 0,'Self','Sponser') AS category_name FROM pharma_patient_sales_bill_master master INNER JOIN ehat_patient p ON patient_bill_patient_id = p.Patient_ID left join ehat_charges_master_slave slave on master.bill_Category_id =slave.id where    patient_sales_bill_delete_flag = 0  and patient_bill_patient_id=" + patientId +" and patient_bill_date between '" + from + "' and '" + to + "'"; 

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


			// slave code

				/*
				 * List<CreditNoteSlave> purchaseSlaves = new ArrayList<CreditNoteSlave>(); try
				 * { SQLQuery slaveQuery = sessionFactory .getCurrentSession() .createSQLQuery(
				 * "SELECT slave.patient_slave_qty,slave.patient_slave_amt,slave.patient_slave_batch_code,slave.patient_slave_ratePerUnit,p_m.product_name "
				 * +" FROM pharma_patient_sales_bill_master master inner join pharma_patient_sales_bill_slave slave ON slave.patient_slave_bill_master_id= master.patient_sales_bill_id "
				 * +" inner join pharma_product_master p_m ON p_m.product_id = slave.patient_slave_product_id where patient_sales_bill_id =  "
				 * + productByBatch.getCredtiNoteId() +
				 * " and patient_sales_bill_delete_flag = 0;");
				 * 
				 * List<Object[]> slaveResults = slaveQuery.list(); for (Object[] slaveResult :
				 * slaveResults) { CreditNoteSlave purchaseSlave = new CreditNoteSlave();
				 * 
				 * if (slaveResult[0] != null) { String result1[] =
				 * slaveResult[0].toString().split( "\\.");
				 * purchaseSlave.setCreditSlaveQty(Integer .parseInt(result1[0])); }
				 * 
				 * if (slaveResult[1] != null) purchaseSlave.setCreditNoteSlaveAmt(Double
				 * .parseDouble(slaveResult[1].toString()));
				 * 
				 * if (slaveResult[2] != null) purchaseSlave
				 * .setCreditNoteSlaveBatchCode(slaveResult[2] .toString());
				 * 
				 * if (slaveResult[3] != null)
				 * purchaseSlave.setCreditNoteSlaveRatePerUnit(Double
				 * .parseDouble(slaveResult[3].toString()));
				 * 
				 * ProductMaster productMaster = new ProductMaster(); if (slaveResult[4] !=
				 * null) { productMaster.setProductName(slaveResult[4] .toString());
				 * purchaseSlave.setProductMaster(productMaster); } else {
				 * productMaster.setProductName(""); }
				 * 
				 * purchaseSlaves.add(purchaseSlave); }
				 * 
				 * } catch (Exception e) { e.printStackTrace(); }
				 * productByBatch.setCreditNoteSlaves(purchaseSlaves);
				 */

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
		List<ReportCreditNoteDetails> creditNoteDetails = new ArrayList<ReportCreditNoteDetails>();
		SQLQuery query = null;
		ReportCreditNoteDetails productByBatch = new ReportCreditNoteDetails();
		String debitNote = "SELECT idpharma_patient_amount_history_id,amount_balance,amount_receive,discount,final_date FROM pharma_patient_amount_history amount "
				+ " inner join ehat_treatment t on t.Treatment_ID=amount.treatment_id inner join ehat_patient p on p.Patient_ID=t.Patient_ID where p.Patient_ID="
				+ patientId + "  and " + " final_date between  '" + from + "' and '" + to + "'";

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
					purchaseSlave.setBatchCode((slaveResult[1].toString()));

				if (slaveResult[2] != null) {
					purchaseSlave.setPurSlaveAmt(Double.parseDouble(slaveResult[2].toString()));
				}

				if (slaveResult[3] != null)
					purchaseSlave.setPurSlaveBillRate(Double.parseDouble(slaveResult[3].toString()));

				ProductMaster productMaster = new ProductMaster();
				if (slaveResult[4] != null) {
					productMaster.setProductName(slaveResult[4].toString());
					purchaseSlave.setProductMaster(productMaster);
				} else {
					productMaster.setProductName("");
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
	public List<ReportCreditNoteDetails> getIndentSettleBillByPatientId(Integer patientId, String from, String to) {

		List<ReportCreditNoteDetails> creditNoteDetails = new ArrayList<ReportCreditNoteDetails>();
		SQLQuery query = null;
		ReportCreditNoteDetails productByBatch = new ReportCreditNoteDetails();
		String debitNote = " SELECT    amount. idpharma_indent_amount_history_id,amount. amount_balance,amount. amount_receive,amount. discount,amount. final_date,sm.indent_sale_net_amt  FROM pharma_indent_amount_history amount "
				+ " inner join ehat_treatment t on t.Treatment_ID=amount.treatment_id  inner join ehat_patient p  on p.Patient_ID=t.Patient_ID  left join pharma_indent_sale_master sm on sm.indent_sale_id=amount.indent_sale_master_id"
				+ " where p.Patient_ID=" + patientId + " and  final_date between  '" + from + "' and '" + to + "'";

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		List<DebitNoteSlave> purchaseSlaves = new ArrayList<DebitNoteSlave>();
		try {

			List<Object[]> slaveResults = query.list();
			for (Object[] slaveResult : slaveResults) {
				DebitNoteSlave purchaseSlave = new DebitNoteSlave();

				if (slaveResult[0] != null) {
					String result1[] = slaveResult[0].toString().split("\\.");
					purchaseSlave.setDebitNoteSlaveId(Integer.parseInt(result1[0]));
				}

				if (slaveResult[1] != null)
					purchaseSlave.setAmountBal(Double.parseDouble(slaveResult[1].toString()));

				if (slaveResult[2] != null)
					purchaseSlave.setDebitNoteSlaveAmt(Double.parseDouble(slaveResult[2].toString()));

				if (slaveResult[3] != null)
					purchaseSlave.setDebitNoteSlaveRate(Double.parseDouble(slaveResult[3].toString()));

				ProductMaster productMaster = new ProductMaster();
				if (slaveResult[4] != null) {
					productMaster.setProductName(slaveResult[4].toString());
					purchaseSlave.setProductMaster(productMaster);
				} else {
					productMaster.setProductName("");
				}
				if (slaveResult[5] != null) {
					purchaseSlave.setIndentNetAmount(Double.parseDouble(slaveResult[5].toString()));				} 

				purchaseSlaves.add(purchaseSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		productByBatch.setDebitNoteSlave(purchaseSlaves);

		creditNoteDetails.add(productByBatch);

		return creditNoteDetails;
	}

	@Override
	public List<ReportIndentSaleDetails> getIndentSaleDetailsByPatientId(Integer patientId, String from, String to) {
		Double total = 0.0;
		List<ReportIndentSaleDetails> indentSaleDetails = new ArrayList<ReportIndentSaleDetails>();
		SQLQuery query = null;

		String debitNote = " SELECT master.indent_sale_id,master.indent_sale_received_date,master.indent_bill_mode,master.indent_sale_net_amt,master.indent_sale_amt_receive "
				+ " FROM pharma_indent_sale_master master inner join pharma_indent_master sale ON sale.indent_id = master.indent_sale_indent_no inner join "
				+ " ehat_treatment t ON t.Treatment_ID = sale.indent_treatement_id inner join ehat_patient p ON t.Patient_ID = p.Patient_ID where master.indent_sale_delete_flag = 0 "
				+ " and p.Patient_ID =" + patientId + " and master.indent_sale_received_date between '" + from
				+ "' and '" + to + "'";

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
					productByBatch.setAmountReceive(row[4].toString());
					total = total + Double.parseDouble(row[4].toString());
				}

				else
					productByBatch.setAmountReceive("");

				// slave code

				/*
				 * List<IndentSaleSlave> purchaseSlaves = new ArrayList<IndentSaleSlave>(); try
				 * { SQLQuery slaveQuery = sessionFactory .getCurrentSession() .createSQLQuery(
				 * " SELECT slave.indent_sale_slave_qty,slave.indent_sale_slave_amt,slave.indent_sale_slave_batch_code,slave.indent_slave_ratePerUnit, "
				 * +" p_m.product_name FROM pharma_indent_sale_master master inner join pharma_indent_sale_slave slave ON slave.indent_sale_slave_master_id = master.indent_sale_id "
				 * +"  inner join pharma_product_master p_m ON p_m.product_id = slave.indent_sale_slave_product_id where master.indent_sale_id = "
				 * + productByBatch.getIndentSaleId() +
				 * " and master.indent_sale_delete_flag = 0;");
				 * 
				 * 
				 * List<Object[]> slaveResults = slaveQuery.list(); for (Object[] slaveResult :
				 * slaveResults) { IndentSaleSlave purchaseSlave = new IndentSaleSlave();
				 * 
				 * if (slaveResult[0] != null) { String result1[] =
				 * slaveResult[0].toString().split( "\\.");
				 * purchaseSlave.setIndentSaleSlaveQty(Integer .parseInt(result1[0])); }
				 * 
				 * if (slaveResult[1] != null) purchaseSlave.setIndentSaleSlaveAmt(Double
				 * .parseDouble(slaveResult[1].toString()));
				 * 
				 * if (slaveResult[2] != null) purchaseSlave
				 * .setIndentSaleSlaveBatchCode(slaveResult[2] .toString());
				 * 
				 * if (slaveResult[3] != null) purchaseSlave.setIndentSlaveRatePerUnit(Double
				 * .parseDouble(slaveResult[3].toString()));
				 * 
				 * ProductMaster productMaster = new ProductMaster(); if (slaveResult[4] !=
				 * null) { productMaster.setProductName(slaveResult[4] .toString());
				 * purchaseSlave.setProductMaster(productMaster); } else {
				 * productMaster.setProductName(""); }
				 * 
				 * purchaseSlaves.add(purchaseSlave); }
				 * 
				 * } catch (Exception e) { e.printStackTrace(); }
				 * productByBatch.setIndentSaleSlaves(purchaseSlaves);
				 */

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
	public List<ReportIndentSaleDetails> getCreditNoteDetailsByPatientId(Integer patientId, String from, String to) {
		List<ReportIndentSaleDetails> indentSaleDetails = new ArrayList<ReportIndentSaleDetails>();
		SQLQuery query = null;

		String debitNote = " SELECT master.credit_note_id,date_format(master.credit_note_date, '%d/%m/%Y')credit_note_date,master.credit_note_transaction_type,round(master.credit_note_net_amt),"
				+ " master.credit_note_type,master.credit_note_payable , master.credit_note_IndentSaleId,master.credit_note_patientSaleId  FROM pharma_credit_note_master master where master.credit_note_delete_flag = 0 "
				+ " and master.credit_note_patientId=" + patientId + "  and master.credit_note_date between '" + from
				+ "' and '" + to + "'";

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		try {

			List<Object[]> rows = query.list();

			for (Object[] row : rows) {

				ReportIndentSaleDetails productByBatch = new ReportIndentSaleDetails();

				if (row[0] != null)
					productByBatch.setCreditNoteId(row[0].toString());
				else
					productByBatch.setCreditNoteId("");

				if (row[1] != null)
					productByBatch.setDate(row[1].toString());
				else
					productByBatch.setDate("");

				if (row[2] != null) {
					if (row[2].toString().equals("0"))
						productByBatch.setBillMode("Cash Return");
					else
						productByBatch.setBillMode("Credit Return");
				} else
					productByBatch.setBillMode("");

				if (row[3] != null)
					productByBatch.setAmount(row[3].toString());
				else
					productByBatch.setAmount("");

				if (row[4] != null)
					productByBatch.setPatientType(row[4].toString());
				else
					productByBatch.setPatientType("");

				if (row[5] != null)
					productByBatch.setCreditNotePayable(row[5].toString());
				else
					productByBatch.setCreditNotePayable("");
				
				if (row[6] != null)
					productByBatch.setIndentSaleId(row[6].toString());
				else
					productByBatch.setIndentSaleId("-");
				
				if (row[6] != null)
					productByBatch.setIndentSaleInvoiceNo("IS" + row[6].toString());
				else
					productByBatch.setIndentSaleInvoiceNo("");
				
				if (row[7] != null)
					productByBatch.setPatientSaleId(row[7].toString());
				else
					productByBatch.setPatientSaleId("");
				
				if (row[7] != null)
					productByBatch.setPatientSaleInvoiceNo("PS" + row[7].toString());
				else
					productByBatch.setPatientSaleInvoiceNo("");



				// slave code

				/*
				 * List<PatientSaleBillSlave> purchaseSlaves = new
				 * ArrayList<PatientSaleBillSlave>(); try { SQLQuery slaveQuery = sessionFactory
				 * .getCurrentSession() .createSQLQuery(
				 * " SELECT slave.credit_note_slave_qty,slave.credit_note_slave_amt,slave.credit_note_slave_batch_code,slave.credit_slave_ratePerUnit, "
				 * +" p_m.product_name FROM pharma_credit_note_master master inner join pharma_credit_note_slave slave ON slave.credit_note_slave_master_id = master.credit_note_id "
				 * +" inner join pharma_product_master p_m ON p_m.product_id = slave.credit_note_slave_product_id "
				 * +" where master.credit_note_id = " + productByBatch.getIndentSaleId()
				 * +" and master.credit_note_delete_flag = 0;");
				 * 
				 * 
				 * List<Object[]> slaveResults = slaveQuery.list(); for (Object[] slaveResult :
				 * slaveResults) { PatientSaleBillSlave purchaseSlave = new
				 * PatientSaleBillSlave();
				 * 
				 * if (slaveResult[0] != null) { String result1[] =
				 * slaveResult[0].toString().split( "\\.");
				 * purchaseSlave.setPatientSlaveMrp(Double.parseDouble(slaveResult[0].toString()
				 * )); }
				 * 
				 * if (slaveResult[1] != null) purchaseSlave.setPatientSlaveAmt(Double
				 * .parseDouble(slaveResult[1].toString()));
				 * 
				 * if (slaveResult[2] != null) purchaseSlave
				 * .setPatientSlaveBatchCode(slaveResult[2] .toString());
				 * 
				 * if (slaveResult[3] != null) purchaseSlave.setPatientSlaveRate(Double
				 * .parseDouble(slaveResult[3].toString()));
				 * 
				 * ProductMaster productMaster = new ProductMaster(); if (slaveResult[4] !=
				 * null) { productMaster.setProductName(slaveResult[4] .toString());
				 * purchaseSlave.setProductMaster(productMaster); } else {
				 * productMaster.setProductName(""); }
				 * 
				 * purchaseSlaves.add(purchaseSlave); }
				 * 
				 * } catch (Exception e) { e.printStackTrace(); }
				 * productByBatch.setPatientSlaves(purchaseSlaves);
				 */

				indentSaleDetails.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return indentSaleDetails;
	}

	@Override
	public JSONArray getTreatmentDetailsByPatientId(Integer patientId) {

		JSONArray jsonArray = new JSONArray();

		SQLQuery query = null;

		String debitNote = "select treatment_id,t_flag from ehat_treatment where patient_id=" + patientId;
		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);

		List<Object[]> slaveResults = query.list();

		for (Object[] object : slaveResults) {
			try {
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("treatmentId", object[0].toString());

				if (object[1] != null) {
					jsonObject.put("status", object[1].toString());
				}

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public List<PendingBill> getPartywiseLedgerList(Integer vendorId, String from, String to) {
		List<PendingBill> pendingBills = new ArrayList<PendingBill>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select purchase.pur_bill_no,purchase.pur_bill_date,purchase.pur_doc_id,purchase.pur_entry_date,purchase.pur_trans_type,purchase.pur_net_amt,purchase.pur_status from  pharma_purchase_master purchase where purchase.pur_entry_date between '"
							+ from + "' and '" + to + "' and purchase.pur_vendor_id=" + vendorId
							+ " and pur_delete_flag=0;");
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
					pendingBill.setVouDate(row[3].toString());

				if (row[4] != null)
					pendingBill.setType(row[4].toString());

				if (row[5] != null)
					pendingBill.setNetAmount(row[5].toString());

				if (row[6] != null)
					pendingBill.setPurStatus(row[6].toString());

				pendingBills.add(pendingBill);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pendingBills;
	}

	@Override
	public List<PendingBill> getCashPaidForPartywiseLedgerList(Integer vendorId, String from, String to) {
		List<PendingBill> pendingBills = new ArrayList<PendingBill>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					" select cash.cash_paid_id,cash.cash_paid_date,cash.cash_paid_doc_id,cash.cash_paid_amt from pharma_cash_paid_master cash "
							+ " where cash.cash_paid_date between '" + from + "' and '" + to
							+ "' and cash.cash_paid_vendor_id =" + vendorId + "  and cash.cash_paid_delete_flag = 0;");
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
					pendingBill.setNetAmount(row[3].toString());

				pendingBills.add(pendingBill);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pendingBills;
	}

	@Override
	public List<PendingBill> getChequePaidForPartywiseLedgerList(Integer vendorId, String from, String to) {
		List<PendingBill> pendingBills = new ArrayList<PendingBill>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					" select cash.cash_paid_id,cash.cash_paid_date,cash.cash_paid_doc_id,cash.cash_paid_amt from pharma_cash_paid_master cash "
							+ " where cash.cash_paid_date between '" + from + "' and '" + to
							+ "' and cash.cash_paid_vendor_id =" + vendorId + "  and cash.cash_paid_delete_flag = 0;");
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
					pendingBill.setNetAmount(row[3].toString());

				pendingBills.add(pendingBill);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pendingBills;
	}

	@Override
	public List<PendingBill> getDebitNoteEntryList(Integer vendorId, String from, String to) {
		List<PendingBill> pendingBills = new ArrayList<PendingBill>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					" select debit.debit_note_id,debit.debit_note_date,debit.debit_note_doc_no,debit.debit_note_net_amt "
							+ " from pharma_debit_note_master debit where debit.debit_note_date between '" + from
							+ "' and '" + to + "' and debit.debit_note_vendor_id =" + vendorId
							+ " and debit.debit_note_delete_flag = 0;");
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
					pendingBill.setNetAmount(row[3].toString());

				pendingBills.add(pendingBill);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pendingBills;
	}

	@Override
	public List<ReportCreditNoteDetails> getAllCreditNoteDetails(String from, String to) {
		List<ReportCreditNoteDetails> creditNoteDetails = new ArrayList<ReportCreditNoteDetails>();
		SQLQuery query = null;

		String debitNote = "select credit_note_id, credit_note_net_amt, credit_note_date,credit_note_payable,credit_note_type,credit_note_transaction_type FROM pharma_credit_note_master master where credit_note_delete_flag=0 and credit_note_date between '"
				+ from + "' and '" + to + "'";

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		try {

			List<Object[]> rows = query.list();

			for (Object[] row : rows) {

				ReportCreditNoteDetails productByBatch = new ReportCreditNoteDetails();

				if (row[0] != null)
					productByBatch.setCredtiNoteId(row[0].toString());
				else
					productByBatch.setCredtiNoteId("");

				if (row[1] != null)
					productByBatch.setAmount(row[1].toString());
				else
					productByBatch.setAmount("");

				if (row[2] != null)
					productByBatch.setDate(row[2].toString());
				else
					productByBatch.setDate("");

				if (row[3] != null)
					productByBatch.setAmountReceive(row[3].toString());
				else
					productByBatch.setAmountReceive("");

				if (row[4] != null)
					productByBatch.setPatientType(row[4].toString());
				else
					productByBatch.setPatientType("");

				if (row[5] != null)
					productByBatch.setBillMode(row[5].toString());
				else
					productByBatch.setBillMode("");

				// slave code

				List<CreditNoteSlave> purchaseSlaves = new ArrayList<CreditNoteSlave>();
				try {
					SQLQuery slaveQuery = sessionFactory.getCurrentSession().createSQLQuery(
							/*
							 * "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id="
							 */
							"SELECT slave.credit_note_slave_qty,slave.credit_note_slave_amt,slave.credit_note_slave_batch_code,slave.credit_slave_ratePerUnit,p_m.product_name FROM pharma_credit_note_master master inner join pharma_credit_note_slave slave on slave.credit_note_slave_master_id=master.credit_note_id inner join pharma_product_master p_m on p_m.product_id=slave.credit_note_slave_product_id where credit_note_id="
									+ productByBatch.getCredtiNoteId() + " and credit_note_delete_flag=0;");
					List<Object[]> slaveResults = slaveQuery.list();
					for (Object[] slaveResult : slaveResults) {
						CreditNoteSlave purchaseSlave = new CreditNoteSlave();

						if (slaveResult[0] != null) {
							String result1[] = slaveResult[0].toString().split("\\.");
							purchaseSlave.setCreditSlaveQty(Integer.parseInt(result1[0]));
						}

						if (slaveResult[1] != null)
							purchaseSlave.setCreditNoteSlaveAmt(Double.parseDouble(slaveResult[1].toString()));

						if (slaveResult[2] != null)
							purchaseSlave.setCreditNoteSlaveBatchCode(slaveResult[2].toString());

						if (slaveResult[3] != null)
							purchaseSlave.setCreditNoteSlaveRatePerUnit(Double.parseDouble(slaveResult[3].toString()));

						ProductMaster productMaster = new ProductMaster();
						if (slaveResult[4] != null) {
							productMaster.setProductName(slaveResult[4].toString());
							purchaseSlave.setProductMaster(productMaster);
						} else {
							productMaster.setProductName("");
						}

						purchaseSlaves.add(purchaseSlave);
					}

				} catch (Exception e) {
					e.printStackTrace();
				}
				productByBatch.setCreditNoteSlaves(purchaseSlaves);

				creditNoteDetails.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return creditNoteDetails;
	}

	@Override
	public List<ReportProductWiseBatchSale> getCancelIndentDetails(String from, String to) {
		List<ReportProductWiseBatchSale> creditNoteDetails = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;

		String debitNote = " SELECT indent_store_name,indent_time,indent_add_date,indent_comment,user_name,indent_sale_deleted_time,indent_delete_date FROM pharma_indent_master indent  inner join users user on user.User_ID=indent.indent_deleted_by "
				+ " where indent_delete_flag = 1 and indent_generate_date between '" + from + "' and '" + to + "';";

		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		try {
			List<Object[]> rows = query.list();

			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setIndentStoreName(row[0].toString());
				else
					productByBatch.setIndentStoreName("");

				if (row[1] != null)
					productByBatch.setIndentStatus(row[1].toString());
				else
					productByBatch.setIndentStatus("");

				if (row[2] != null)
					productByBatch.setIndentDate(row[2].toString());
				else
					productByBatch.setIndentDate("");

				if (row[3] != null)
					productByBatch.setIndentComment(row[3].toString());
				else
					productByBatch.setIndentComment("");

				if (row[6] != null)
					productByBatch.setIndentDeletedBy(row[4].toString());
				else
					productByBatch.setIndentDeletedBy("");

				if (row[5] != null)
					productByBatch.setIndentDeletedTime(row[5].toString());
				else
					productByBatch.setIndentDeletedTime("");

				if (row[6] != null)
					productByBatch.setIndentDeletedDate(row[6].toString());
				else
					productByBatch.setIndentDeletedDate("");

				creditNoteDetails.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return creditNoteDetails;
	}

	@Override
	public Double getTotalOpeningStockByPatientId(Integer treatmentId, String from, String to) {
		// patient sale
		Double totalAmtBalPatSale = 0.0;
		Double totalSettleBillAmtBal = 0.0;
		Double totalPatientSale = 0.0;
		Double FinalPatientSaleAmt = 0.0;
		Double totalSale = 0.0;
		Integer treatId = 0;
		String patientSaleDate = "";
		String setBillDate = "";
		String settlebilltime = "";
		String time = "";

		String creditbilltime = "";
		Double totalCreditAmtBal = 0.0;
		String creditBillDate = "";
		try {
			String sqlQueryForTreatment = " SELECT distinct patient_sale_treatmentId from pharma_patient_sales_bill_master pim inner join ehat_treatment t ON t.Treatment_ID = pim.patient_sale_treatmentId "
					+ " inner join ehat_patient p ON p.Patient_ID = t.Patient_ID where pim.patient_bill_patient_id = '"
					+ treatmentId + "' and pim.patient_sales_bill_delete_flag = 0 " + " and pim.patient_bill_date <='"
					+ from + "';";

			SQLQuery queryForTreatment = sessionFactory.getCurrentSession().createSQLQuery(sqlQueryForTreatment);
			List<Object> rows = queryForTreatment.list();
			for (Object row : rows) {
				treatId = Integer.parseInt(row.toString());
				System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<" + treatId);
				// Patient Sale
				String sqlQueryForPatient = " SELECT patient_sales_bill_net_amt,patient_sales_bill_amount_received,patient_sale_previous_balance,patient_sales_bill_amount_balance, "
						+ " patient_sales_bill_id,pim.patient_bill_date,pim.patient_sale_for_time from pharma_patient_sales_bill_master pim inner join ehat_treatment t ON t.Treatment_ID = pim.patient_sale_treatmentId "
						+ " inner join ehat_patient p ON p.Patient_ID = t.Patient_ID where pim.patient_sale_treatmentId = '"
						+ treatId + "' and pim.patient_sales_bill_delete_flag = 0 " + " and pim.patient_bill_date <= '"
						+ from + "' order by patient_bill_date desc limit 1;";

				SQLQuery queryForPatient = sessionFactory.getCurrentSession().createSQLQuery(sqlQueryForPatient);
				List<Object[]> listOfPatientSale = queryForPatient.list();
				for (Object[] patientData : listOfPatientSale) {
					if (patientData[0] != null) {
						/*
						 * float net = 0; float receive = 0; float total = 0; net =
						 * Float.parseFloat(patientData[0].toString()); receive =
						 * Float.parseFloat(patientData[1].toString()); total = net - receive;
						 */
						totalAmtBalPatSale = Double.parseDouble(patientData[3].toString());
						patientSaleDate = patientData[5].toString();
						time = patientData[6].toString();

					}
				}
				System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" + totalAmtBalPatSale);
				try {
					// Patient Sale settle bill
					String settleBillPatientsql = " SELECT  amount_balance,final_date,patient_time from pharma_patient_amount_history pim where pim.Treatment_ID = '"
							+ treatId + "' " + " and pim.final_date <= '" + to
							+ "' order by idpharma_patient_amount_history_id desc limit 1;";

					SQLQuery settleBillquery = sessionFactory.getCurrentSession().createSQLQuery(settleBillPatientsql);
					Object[] rows1 = (Object[]) settleBillquery.uniqueResult();
					if (rows1 != null) {
						totalSettleBillAmtBal = Double.parseDouble(rows1[0].toString());
						String settleBillDate = rows1[1].toString();
						settlebilltime = rows1[2].toString();
						String fromArray[] = settleBillDate.split("-");
						StringBuffer fromReult = new StringBuffer();
						StringBuffer fromReults = new StringBuffer();
						fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);
						setBillDate = fromReult.toString();
					}
					// Credit note settle bill

					String creditNotesqlForPatient = " SELECT credit_note_net_amt,credit_note_payable,credit_note_prev_bal,credit_note_current_bal,credit_note_id, "
							+ " credit_note_time,credit_note_date from pharma_credit_note_master credit where credit.credit_note_treatmentId = '"
							+ treatId + "'"
							+ " and credit.credit_note_delete_flag = 0 and credit_note_type='patientSale' and credit.credit_note_date <= '"
							+ from + "' " + " order by credit_note_date desc limit 1;";

					SQLQuery settleBillqueryForCredit = sessionFactory.getCurrentSession()
							.createSQLQuery(creditNotesqlForPatient);
					Object[] rowsForCredit = (Object[]) settleBillqueryForCredit.uniqueResult();
					if (rowsForCredit != null) {
						totalCreditAmtBal = Double.parseDouble(rowsForCredit[3].toString());
						creditBillDate = rowsForCredit[6].toString();
						creditbilltime = rowsForCredit[5].toString();

					}

					System.out.println("<<<<<<<<<<<<" + creditBillDate);
					System.out.println("<<<<<<<<<<<<<" + creditbilltime);
					// sale
					Date start = new Date();
					if (patientSaleDate != "" && patientSaleDate != null) {
						start = new SimpleDateFormat("yyyy-MM-dd").parse(patientSaleDate);
						totalPatientSale = totalAmtBalPatSale;
					}
					// compare sale n settle
					Date end = new Date();
					if (setBillDate != "" && setBillDate != null && patientSaleDate != "" && patientSaleDate != null) {
						start = new SimpleDateFormat("yyyy-MM-dd").parse(patientSaleDate);
						end = new SimpleDateFormat("yyyy-MM-dd").parse(setBillDate);

						if (start.compareTo(end) > 0) {
							totalPatientSale = totalAmtBalPatSale;
							System.out.println("start is after end");
						} else if (start.compareTo(end) < 0) {
							totalPatientSale = totalSettleBillAmtBal;
							System.out.println("start is after end");
						} else if (start.compareTo(end) == 0) {
							if (time.compareTo(settlebilltime) > 0) {
								totalPatientSale = totalAmtBalPatSale;
								System.out.println("start is after settlebilltime");
							} else if (time.compareTo(settlebilltime) < 0) {
								totalPatientSale = totalSettleBillAmtBal;
								System.out.println("time is after creditbilltime");
							} else {
								totalPatientSale = totalSettleBillAmtBal;
								System.out.println("time is before settlebilltime");
							}
						}

					}

					Date credit = new Date();
					// compare sale and credit
					if (creditBillDate != "" && creditBillDate != null && patientSaleDate != ""
							&& patientSaleDate != null) {
						start = new SimpleDateFormat("yyyy-MM-dd").parse(patientSaleDate);
						credit = new SimpleDateFormat("yyyy-MM-dd").parse(creditBillDate);

						if (start.compareTo(credit) > 0) {
							totalPatientSale = totalAmtBalPatSale;
							System.out.println("start is after end");

						} else if (start.compareTo(credit) < 0) {
							totalPatientSale = totalCreditAmtBal;
							System.out.println("start is after end");
						} else if (start.compareTo(credit) == 0) {
							if (time.compareTo(creditbilltime) > 0) {
								totalPatientSale = totalAmtBalPatSale;
								System.out.println("start is after settlebilltime");
							} else if (time.compareTo(creditbilltime) < 0) {
								totalPatientSale = totalCreditAmtBal;
								System.out.println("time is after creditbilltime");
							} else {
								totalPatientSale = totalAmtBalPatSale;
								System.out.println("time is before settlebilltime");
							}
						}

					}
					// compare credit and settle bill and sale
					if (creditBillDate != "" && creditBillDate != null && setBillDate != "" && setBillDate != null) {
						credit = new SimpleDateFormat("yyyy-MM-dd").parse(creditBillDate);
						System.out.println(start);
						System.out.println(end);
						System.out.println(credit);

						if (start.compareTo(end) > 0) {

							if (start.compareTo(credit) > 0) {
								totalPatientSale = totalAmtBalPatSale;
								System.out.println("start is after end");
							} else
								totalPatientSale = totalCreditAmtBal;

						} else if (start.compareTo(end) < 0) {

							if (end.compareTo(credit) > 0) {
								totalPatientSale = totalSettleBillAmtBal;
								System.out.println("start is after end");
							} else
								totalPatientSale = totalCreditAmtBal;

						} else if (start.compareTo(end) == 0) {
							if (time.compareTo(settlebilltime) > 0) {
								if (time.compareTo(creditbilltime) > 0) {
									totalPatientSale = totalAmtBalPatSale;
									System.out.println("start is after settlebilltime");
								} else
									totalPatientSale = totalCreditAmtBal;

							} else if (time.compareTo(settlebilltime) < 0) {
								if (settlebilltime.compareTo(creditbilltime) > 0) {
									totalPatientSale = totalSettleBillAmtBal;
									System.out.println("time is after creditbilltime");
								} else
									totalPatientSale = totalCreditAmtBal;
							} else {
								totalPatientSale = totalSettleBillAmtBal;
								System.out.println("time is before settlebilltime");
							}

						}
					}

					FinalPatientSaleAmt = FinalPatientSaleAmt + totalPatientSale;
					System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" + FinalPatientSaleAmt);
				} catch (Exception e) {
					e.printStackTrace();

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// Indent sale
		Integer indentTreatId = 0;
		Double totalAmtBalIndSale = 0.0;
		Double totalSettleBillIndAmtBal = 0.0;
		Double totalIndentSale = 0.0;
		Double FinalIndentSaleAmt = 0.0;
		String indentSaleDate = "";
		String indentTime = "";
		String indentsetBillDate = "";
		String indentSettlebilltime = "";

		String creditbillInenttime = "";
		Double totalCreditIndentAmtBal = 0.0;
		String creditBillIndentDate = "";

		try {
			String sqlQueryForIndentTreatment = " SELECT distinct t.Treatment_ID FROM pharma_indent_sale_master master inner join pharma_indent_master indent on master.indent_sale_indent_no=indent.indent_id "
					+ " inner join ehat_treatment t on t.Treatment_ID=indent.indent_treatement_id inner join ehat_patient p ON p.Patient_ID = t.Patient_ID "
					+ " where t.Patient_ID= '" + treatmentId + "' and indent_sale_received_date<='" + from + "';";

			SQLQuery queryForIndentTreatment = sessionFactory.getCurrentSession()
					.createSQLQuery(sqlQueryForIndentTreatment);
			List<Object> rows = queryForIndentTreatment.list();
			for (Object row : rows) {
				indentTreatId = Integer.parseInt(row.toString());
				System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<" + indentTreatId);

				String sqlQueryForIndent = " SELECT master.indent_sale_net_amt,master.indent_sale_amt_receive,master.indent_sale_previous_balance,master.indent_sale_amt_balance, "
						+ " master.indent_sale_id,master.indent_sale_received_date,master.indent_sale_time FROM pharma_indent_sale_master master "
						+ " inner join pharma_indent_master indent ON master.indent_sale_indent_no = indent.indent_id inner join ehat_treatment t ON t.Treatment_ID = indent.indent_treatement_id "
						+ " inner join ehat_patient p ON p.Patient_ID = t.Patient_ID where indent.indent_treatement_id ='"
						+ indentTreatId + "' and master.indent_sale_delete_flag = 0 and indent_sale_received_date <='"
						+ from + "' order by indent_sale_id desc limit 1;";

				SQLQuery queryForIndent = sessionFactory.getCurrentSession().createSQLQuery(sqlQueryForIndent);
				List<Object[]> listOfIndentSale = queryForIndent.list();
				for (Object[] indentData : listOfIndentSale) {
					if (indentData[0] != null) {
						totalAmtBalIndSale = Double.parseDouble(indentData[3].toString());
						indentSaleDate = indentData[5].toString();
						indentTime = indentData[6].toString();

					}
				}
				System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" + totalAmtBalIndSale);
				try {

					String settleBillIndentsql = " SELECT amount_balance,final_date,  ifnull(indent_time,'') indent_time from pharma_indent_amount_history indent where indent.Treatment_ID = '"
							+ indentTreatId + "' " + " and indent.final_date <= '" + to
							+ "' order by idpharma_indent_amount_history_id desc limit 1;";

					SQLQuery settleBillqueryIndentSale = sessionFactory.getCurrentSession()
							.createSQLQuery(settleBillIndentsql);
					Object[] rows1 = (Object[]) settleBillqueryIndentSale.uniqueResult();
					if (rows1 != null) {
						totalSettleBillIndAmtBal = Double.parseDouble(rows1[0].toString());

						String indentsettBillDate = rows1[1].toString();
						indentSettlebilltime = rows1[2].toString();

						String fromArray[] = indentsettBillDate.split("-");

						StringBuffer fromReult = new StringBuffer();
						fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);
						indentsetBillDate = fromReult.toString();
					}

					String creditNotesqlForIndent = " SELECT credit_note_net_amt,credit_note_payable,credit_note_prev_bal,credit_note_current_bal,credit_note_id, "
							+ " credit_note_time,credit_note_date from pharma_credit_note_master credit where credit.credit_note_treatmentId = '"
							+ indentTreatId + "'"
							+ " and credit.credit_note_delete_flag = 0 and credit_note_type='indentSale' and credit.credit_note_date <='"
							+ from + "' " + " order by credit_note_id desc limit 1;";

					SQLQuery settleBillqueryForCreditIndent = sessionFactory.getCurrentSession()
							.createSQLQuery(creditNotesqlForIndent);
					Object[] rowsForCreditIndent = (Object[]) settleBillqueryForCreditIndent.uniqueResult();
					if (rowsForCreditIndent != null) {
						totalCreditIndentAmtBal = Double.parseDouble(rowsForCreditIndent[3].toString());
						creditBillIndentDate = rowsForCreditIndent[6].toString();
						creditbillInenttime = rowsForCreditIndent[5].toString();
					}

					Date start = new Date();
					if (indentSaleDate != "" && indentSaleDate != null) {
						start = new SimpleDateFormat("yyyy-MM-dd").parse(indentSaleDate);
						totalIndentSale = totalAmtBalIndSale;
					}

					// compare sale and settle
					Date end = new Date();
					if (indentsetBillDate != "" && indentsetBillDate != null && indentSaleDate != ""
							&& indentSaleDate != null) {
						start = new SimpleDateFormat("yyyy-MM-dd").parse(indentSaleDate);
						end = new SimpleDateFormat("yyyy-MM-dd").parse(indentsetBillDate);

						if (start.compareTo(end) > 0) {
							totalIndentSale = totalAmtBalIndSale;
							System.out.println("start is after end");

						} else if (start.compareTo(end) < 0) {
							totalIndentSale = totalSettleBillIndAmtBal;
							System.out.println("start is after end");

						} else if (start.compareTo(end) == 0) {
							if (indentTime.compareTo(indentSettlebilltime) > 0) {
								totalIndentSale = totalAmtBalIndSale;
								System.out.println("start is after settlebilltime");

							} else if (indentTime.compareTo(indentSettlebilltime) < 0) {
								totalIndentSale = totalSettleBillIndAmtBal;
								System.out.println("time is after creditbilltime");
							} else {
								totalIndentSale = totalSettleBillIndAmtBal;
								System.out.println("time is before settlebilltime");
							}
						}
					}
					// compare sale and credit note
					Date credit = new Date();
					if (creditBillIndentDate != "" && creditBillIndentDate != null && indentSaleDate != ""
							&& indentSaleDate != null) {
						start = new SimpleDateFormat("yyyy-MM-dd").parse(indentSaleDate);
						credit = new SimpleDateFormat("yyyy-MM-dd").parse(creditBillIndentDate);

						if (start.compareTo(credit) > 0) {
							totalIndentSale = totalAmtBalIndSale;
							System.out.println("start is after end");

						} else if (start.compareTo(credit) < 0) {
							totalIndentSale = totalCreditIndentAmtBal;
							System.out.println("start is after end");
						} else if (start.compareTo(credit) == 0) {
							if (indentTime.compareTo(creditbillInenttime) > 0) {
								totalIndentSale = totalAmtBalIndSale;
								System.out.println("start is after settlebilltime");
							} else if (indentTime.compareTo(creditbillInenttime) < 0) {
								totalIndentSale = totalCreditIndentAmtBal;
								System.out.println("time is after creditbilltime");
							} else {
								totalIndentSale = totalAmtBalIndSale;
								System.out.println("time is before settlebilltime");
							}
						}
					}

					// compare sale and settle bill and credit

					if (creditBillIndentDate != "" && creditBillIndentDate != null && indentsetBillDate != ""
							&& indentsetBillDate != null) {
						credit = new SimpleDateFormat("yyyy-MM-dd").parse(creditBillIndentDate);

						if (start.compareTo(end) > 0) {
							if (start.compareTo(credit) > 0) {
								totalIndentSale = totalAmtBalIndSale;
								System.out.println("start is after end");
							} else
								totalIndentSale = totalCreditIndentAmtBal;

						} else if (start.compareTo(end) < 0) {
							if (end.compareTo(credit) > 0) {
								totalIndentSale = totalSettleBillIndAmtBal;
								System.out.println("start is after end");
							} else
								totalIndentSale = totalCreditIndentAmtBal;
						} else if (start.compareTo(end) == 0) {
							if (indentTime.compareTo(indentSettlebilltime) > 0) {
								if (indentTime.compareTo(creditbillInenttime) > 0) {
									totalIndentSale = totalAmtBalIndSale;
									System.out.println("start is after settlebilltime");
								} else
									totalIndentSale = totalCreditIndentAmtBal;
							} else if (indentTime.compareTo(indentSettlebilltime) < 0) {
								if (indentSettlebilltime.compareTo(creditbillInenttime) > 0) {
									totalIndentSale = totalSettleBillIndAmtBal;
									System.out.println("time is after creditbilltime");
								} else
									totalIndentSale = totalCreditIndentAmtBal;
							} else {
								totalIndentSale = totalSettleBillIndAmtBal;
								System.out.println("time is before settlebilltime");
							}
						}
					}

					FinalIndentSaleAmt = FinalIndentSaleAmt + totalIndentSale;
					System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" + FinalIndentSaleAmt);
				} catch (Exception e) {
					e.printStackTrace();

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		totalSale = FinalPatientSaleAmt + FinalIndentSaleAmt;

		DecimalFormat df = new DecimalFormat("###.##");
		totalSale = Double.parseDouble((df.format(totalSale)));
		System.out.println("<<<<<<<<<<<<<<" + totalSale);
		return totalSale;
	}

	@Override
	public JSONArray getStockDetails() {

		JSONArray jsonArray = new JSONArray();

		SQLQuery query = null;

		String debitNote = "SELECT store_id,store_name FROM pharma_sub_store_master where store_delete_flag=0;";
		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);

		List<Object[]> slaveResults = query.list();

		for (Object[] object : slaveResults) {
			try {
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("storeId", object[0].toString());

				if (object[1] != null) {
					jsonObject.put("storeName", object[1].toString());
				}

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public List<ReportProductWiseBatchSale> getCategoryWiseReportPage(String date, String to) {

		List<ReportProductWiseBatchSale> reportPurchases5 = new ArrayList<ReportProductWiseBatchSale>();

		try {

			String debitNote = " select     cat.category_name,    sum(p_master.patient_sales_bill_net_amt) as netAmt,  "
					+ "  sum(p_master.patient_sales_bill_special_disc) as discount,    p_master.patient_bill_mode,  "
					+ "  sum(p_master.patient_sales_bill_gross_amt) as gross from    pharma_patient_sales_bill_master"
					+ " p_master        inner join    ehat_bill_discount_category_master cat ON cat.id_category_master = p_master.bill_Category_id where "
					+ "   p_master.patient_bill_date between '" + date + "'  and  '" + to
					+ "'     and p_master.patient_sales_bill_delete_flag = 0 group by p_master.bill_Category_id, p_master.patient_bill_mode";

			Query query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale reportPurchase5 = new ReportProductWiseBatchSale();
				if (row[0] != null) {
					reportPurchase5.setProductName(row[0].toString());
				} else
					reportPurchase5.setProductName("");

				if (row[1] != null) {
					reportPurchase5.setAmount(row[1].toString());
				} else
					reportPurchase5.setAmount("");

				if (row[2] != null) {
					reportPurchase5.setAmtBalance(row[2].toString());
				} else
					reportPurchase5.setAmtBalance("");

				if (row[3] != null) {
					reportPurchase5.setBatchCode(row[3].toString());
				} else
					reportPurchase5.setBatchCode("");

				if (row[4] != null) {
					reportPurchase5.setAmtReceive(row[4].toString());
				} else
					reportPurchase5.setAmtReceive("");

				reportPurchases5.add(reportPurchase5);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return reportPurchases5;

	}

	@Override
	public List<ReportVat> getHsnWiseGSTPurchase(String from, String to) {
		List<ReportVat> reportVats = new ArrayList<ReportVat>();
		// SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		SQLQuery query = null;
		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT     sum(ifnull(pur_slave_bill_rate, 0) * ifnull(pur_slave_vat, 0) * 0.01) as GST,    sum(ifnull(pur_igst, 0) * ifnull(pur_slave_bill_rate, 0) * 0.01) as IGST,    sum(ifnull(pur_cess, 0) * ifnull(pur_slave_bill_rate, 0) * 0.01) as CESS,pur_hsn,sum(pur_slave_amt) FROM    pharma_purchase_master        inner join    pharma_purchase_slave ON pur_slave_master_id = pur_id where    pur_bill_date between '"
							+ from + "' and '" + to + "' group by pur_hsn");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportVat reportVat = new ReportVat();

				if (row[0] != null)
					reportVat.setVouNo(row[0].toString());
				else
					reportVat.setVouNo("");

				if (row[1] != null)
					reportVat.setVat5(row[1].toString());
				else
					reportVat.setVat5("");

				if (row[2] != null)
					reportVat.setVat12(row[2].toString());
				else
					reportVat.setVat12("");

				if (row[3] != null)
					reportVat.setBillDate(row[3].toString());
				else
					reportVat.setBillDate("");

				if (row[4] != null)
					reportVat.setNetAmount(row[4].toString());
				else
					reportVat.setNetAmount("");

				// reportVat.setType("monthwise");

				reportVats.add(reportVat);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportVats;
	}

	@Override
	public List<ReportCreditNoteDetails> getCreditNoteDetailsByCat(String from, String to) {

		List<ReportCreditNoteDetails> creditNoteDetails = new ArrayList<ReportCreditNoteDetails>();
		SQLQuery query = null;

		String debitNote = "select     cat.category_name,    ROUND(sum(ifnull(credit_note_net_amt,0))),    credit_note_transaction_type,    sum(ifnull(credit_note_gross_amt,0)),sum(ifnull(credit_note_dicscount,0)) FROM    pharma_credit_note_master master        inner join    pharma_patient_sales_bill_master p ON p.patient_sales_bill_id = master.credit_note_patientSaleId        inner join    ehat_bill_discount_category_master cat ON cat.id_category_master = p.bill_Category_id where    credit_note_delete_flag = 0        and credit_note_date between '"
				+ from + "' and '" + to + "' group by credit_note_transaction_type";
		query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
		try {

			List<Object[]> rows = query.list();

			for (Object[] row : rows) {

				ReportCreditNoteDetails productByBatch = new ReportCreditNoteDetails();

				if (row[0] != null)
					productByBatch.setType(row[0].toString());
				else
					productByBatch.setType("");

				if (row[1] != null)
					productByBatch.setAmount(row[1].toString());
				else
					productByBatch.setAmount("");

				if (row[2] != null)
					productByBatch.setPatientType(row[2].toString());
				else
					productByBatch.setPatientType("");

				if (row[3] != null)
					productByBatch.setAmountReceive(row[3].toString());
				else
					productByBatch.setAmountReceive("");

				if (row[4] != null)
					productByBatch.setDiscount(row[4].toString());
				else
					productByBatch.setDiscount("");

				creditNoteDetails.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return creditNoteDetails;

	}

	@Override
	public List<ReportPurchase> getProductWiseSale(String from, String to, String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		String sql = "select     patient_master.patient_sales_bill_id,    patient_master.patient_bill_date,    patient_slave.patient_slave_qty,    batch.batch_code,    patient_slave.patient_slave_ratePerUnit,    patient_slave.patient_slave_amt,    patient_slave.patient_sale_slave_disc_amt from    pharma_patient_sales_bill_master patient_master        inner join    pharma_patient_sales_bill_slave patient_slave ON patient_master.patient_sales_bill_id = patient_slave.patient_slave_bill_master_id        inner join    pharma_batch_master batch ON batch.batch_id = patient_slave.patient_slave_BatchId  where patient_master.patient_bill_date between '"
				+ from + "' and '" + to + "' and patient_slave.patient_slave_product_id='" + productId + "'";

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(sql);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					reportPurchase.setBillDate(row[1].toString());
				} else
					reportPurchase.setBillDate("");

				if (row[2] != null)
					reportPurchase.setQty(row[2].toString());
				else
					reportPurchase.setQty("");

				if (row[3] != null)
					reportPurchase.setBatchCode(row[3].toString());
				else
					reportPurchase.setBatchCode("");

				if (row[4] != null)
					reportPurchase.setRate(row[4].toString());
				else
					reportPurchase.setRate("");

				if (row[5] != null)
					reportPurchase.setAmount(row[5].toString());
				else
					reportPurchase.setAmount("");

				if (row[6] != null)
					reportPurchase.setDisc(row[6].toString());
				else
					reportPurchase.setDisc("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getProductWiseCredit(String from, String to, String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		String sql = "SELECT     master.credit_note_id,    master.credit_note_date,    slave.credit_note_slave_qty,    slave.credit_note_slave_batch_code,    slave.credit_slave_ratePerUnit,    slave.credit_note_slave_amt,    slave.credit_slave_discAmt FROM    pharma_credit_note_master master        inner join    pharma_credit_note_slave slave ON slave.credit_note_slave_master_id = master.credit_note_id  where    slave.credit_note_slave_product_id = '"
				+ productId + "'        and credit_note_delete_flag = 0        and master.credit_note_date between '"
				+ from + "' and '" + to + "'";

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(sql);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					reportPurchase.setBillDate(row[1].toString());
				} else
					reportPurchase.setBillDate("");

				if (row[2] != null)
					reportPurchase.setQty(row[2].toString());
				else
					reportPurchase.setQty("");

				if (row[3] != null)
					reportPurchase.setBatchCode(row[3].toString());
				else
					reportPurchase.setBatchCode("");

				if (row[4] != null)
					reportPurchase.setRate(row[4].toString());
				else
					reportPurchase.setRate("");

				if (row[5] != null)
					reportPurchase.setAmount(row[5].toString());
				else
					reportPurchase.setAmount("");

				if (row[6] != null)
					reportPurchase.setDisc(row[6].toString());
				else
					reportPurchase.setDisc("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getProductWisePurchaseReturn(String from, String to, String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		String sql = "SELECT     master.debit_note_id,    master.debit_note_date,    slave.debit_note_slave_qty,    slave.debit_note_slave_batch_code,    slave.debit_note_slave_rate,    slave.debit_note_slave_amt FROM    pharma_debit_note_master master        inner join    pharma_debit_note_slave slave ON master.debit_note_id = slave.debit_note_slave_master_id       where    slave.debit_note_slave_product_id = '"
				+ productId + "'        and master.debit_note_date between '" + from + "' and '" + to + "'";

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(sql);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					reportPurchase.setBillDate(row[1].toString());
				} else
					reportPurchase.setBillDate("");

				if (row[2] != null)
					reportPurchase.setQty(row[2].toString());
				else
					reportPurchase.setQty("");

				if (row[3] != null)
					reportPurchase.setBatchCode(row[3].toString());
				else
					reportPurchase.setBatchCode("");

				if (row[4] != null)
					reportPurchase.setRate(row[4].toString());
				else
					reportPurchase.setRate("");

				if (row[5] != null)
					reportPurchase.setAmount(row[5].toString());
				else
					reportPurchase.setAmount("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getOpeningStock(String from, String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		String sql = "select     ifnull(sum(stock.stock_qty_in_hand), 0) from    pharma_stock_master stock where    stock.stock_product_id = '"
				+ productId + "'  and stock_delete_flag = 0        and stock.stock_update_date < '" + from + "'";

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(sql);

			double d = (Double) query.uniqueResult();

			ReportPurchase reportPurchase = new ReportPurchase();

			reportPurchase.setQty(d + "");

			reportPurchases.add(reportPurchase);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportStock> getStockBatchWise() {

		List<ReportStock> reportStocks = new ArrayList<ReportStock>();
		SQLQuery query = null;
		String queryString = "select    product.product_name,    batch.batch_code,    batch.batch_exp_date,    sum(ifnull(s.pur_slave_qty, 0)) as pq,    sum(ifnull(debit.debit_note_slave_qty, 0)) as pr,    sum(ifnull(sale.patient_slave_qty, 0)) as sq,    sum(ifnull(credit.credit_note_slave_qty, 0)) as sr,    sum(ifnull(stock.stock_qty_in_hand, 0)) as net_bal from    pharma_purchase_slave s        inner join    pharma_batch_master batch ON s.pur_slave_batch_id = batch.batch_id        inner join    pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id        inner join    pharma_product_master product ON product.product_id = batch.batch_product_id        left join    pharma_debit_note_slave debit ON debit.debit_note_slave_product_id = product.product_id        left join    pharma_patient_sales_bill_slave sale ON product.product_id = sale.patient_slave_product_id        left join    pharma_credit_note_slave credit ON credit.credit_note_slave_product_id = product.product_id where    batch.batch_delete_flag = 0 group by batch.batch_id order by product.product_name";

		try {

			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setProductName(row[0].toString());
				else
					reportStock.setProductName("");

				if (row[1] != null)
					reportStock.setBatchCode(row[1].toString());
				else
					reportStock.setBatchCode("");

				if (row[2] != null)
					reportStock.setBatchExpDate(row[2].toString());
				else
					reportStock.setBatchExpDate("");

				if (row[3] != null)
					reportStock.setClosingStock(row[3].toString());
				else
					reportStock.setClosingStock("0");

				if (row[4] != null)
					reportStock.setPurRate(row[4].toString());
				else
					reportStock.setPurRate("0");

				if (row[5] != null)
					reportStock.setCurrentStock(row[5].toString());
				else
					reportStock.setCurrentStock("0");

				if (row[6] != null)
					reportStock.setAmount(row[6].toString());
				else
					reportStock.setAmount("0");

				if (row[7] != null)
					reportStock.setStockInHand(row[7].toString());
				else
					reportStock.setStockInHand("0");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;

	}

	/*****
	 * @author :BILAL
	 * @Date :13-12-2017
	 * @Code :For Getting Dispatch GRN report to send to finance
	 ******/
	@Override
	public List<ReportPurchase> getDayWiseDispatchGRN(String fromReult, String toReult, String dispatchFlag,
			int vendorId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			if (vendorId > 0 && dispatchFlag.equals("0")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						"select     master.pur_id,    vendor.vendor_name,    master.pur_bill_no,    master.pur_bill_date,    master.pur_gross_amt,    master.pur_item_disc,    master.pur_vat,    master.pur_add,    master.pur_less,    master.pur_trans_type,    master.pur_net_amt,   master.dispatch_flag,   master.pur_po_id  from    pharma_purchase_master master        inner join    pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id    where    master.pur_delete_flag = '0'  and master.pur_vendor_id = '"
								+ vendorId + "' and pur_bill_date between '" + fromReult + "' and '" + toReult + "'");
			} else if (vendorId > 0 && dispatchFlag.equals("Y")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						"select     master.pur_id,    vendor.vendor_name,    master.pur_bill_no,    master.pur_bill_date,    master.pur_gross_amt,    master.pur_item_disc,    master.pur_vat,    master.pur_add,    master.pur_less,    master.pur_trans_type,    master.pur_net_amt,   master.dispatch_flag,   master.pur_po_id   from    pharma_purchase_master master        inner join    pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id   where    master.pur_delete_flag = '0'  and master.pur_vendor_id = '"
								+ vendorId + "'  and master.dispatch_flag='Y'  and pur_bill_date between '" + fromReult
								+ "' and '" + toReult + "'");
			} else if (vendorId > 0 && dispatchFlag.equals("N")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						"select     master.pur_id,    vendor.vendor_name,    master.pur_bill_no,    master.pur_bill_date,    master.pur_gross_amt,    master.pur_item_disc,    master.pur_vat,    master.pur_add,    master.pur_less,    master.pur_trans_type,    master.pur_net_amt,   master.dispatch_flag,   master.pur_po_id  from    pharma_purchase_master master        inner join    pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id    where    master.pur_delete_flag = '0'  and master.pur_vendor_id = '"
								+ vendorId + "'  and master.dispatch_flag='N'  and pur_bill_date between '" + fromReult
								+ "' and '" + toReult + "'");
			} else if (dispatchFlag.equals("N")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						"select     master.pur_id,    vendor.vendor_name,    master.pur_bill_no,    master.pur_bill_date,    master.pur_gross_amt,    master.pur_item_disc,    master.pur_vat,    master.pur_add,    master.pur_less,    master.pur_trans_type,    master.pur_net_amt,   master.dispatch_flag,   master.pur_po_id   from    pharma_purchase_master master        inner join    pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id    where    master.pur_delete_flag = '0'    and master.dispatch_flag='N'  and pur_bill_date between '"
								+ fromReult + "' and '" + toReult + "'");
			} else if (dispatchFlag.equals("Y")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						"select     master.pur_id,    vendor.vendor_name,    master.pur_bill_no,    master.pur_bill_date,    master.pur_gross_amt,    master.pur_item_disc,    master.pur_vat,    master.pur_add,    master.pur_less,    master.pur_trans_type,    master.pur_net_amt,   master.dispatch_flag,   master.pur_po_id   from    pharma_purchase_master master        inner join    pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id    where    master.pur_delete_flag = '0'    and master.dispatch_flag='Y'  and pur_bill_date between '"
								+ fromReult + "' and '" + toReult + "'");
			} else {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						"select     master.pur_id,    vendor.vendor_name,    master.pur_bill_no,    master.pur_bill_date,    master.pur_gross_amt,    master.pur_item_disc,    master.pur_vat,    master.pur_add,    master.pur_less,    master.pur_trans_type,    master.pur_net_amt,   master.dispatch_flag,   master.pur_po_id   from    pharma_purchase_master master        inner join    pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id   where    master.pur_delete_flag = '0'      and pur_bill_date between '"
								+ fromReult + "' and '" + toReult + "'");
			}

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setProductId(row[0].toString());
				else
					reportPurchase.setProductId("");

				if (row[1] != null)
					reportPurchase.setVendorName(row[1].toString());
				else
					reportPurchase.setVendorName("");

				if (row[2] != null)
					reportPurchase.setProductPack(row[2].toString());
				else
					reportPurchase.setProductPack("");

				if (row[3] != null)
					reportPurchase.setProductCompany(row[3].toString());
				else
					reportPurchase.setProductCompany("");

				if (row[4] != null)
					reportPurchase.setProductName(row[4].toString());
				else
					reportPurchase.setProductName("");

				if (row[5] != null)
					reportPurchase.setQty(row[5].toString());
				else
					reportPurchase.setQty("");

				if (row[6] != null)
					reportPurchase.setMrp(row[6].toString());
				else
					reportPurchase.setMrp("");

				if (row[7] != null)
					reportPurchase.setAmount(row[7].toString());
				else
					reportPurchase.setAmount("");

				if (row[8] != null)
					reportPurchase.setBillDate(row[8].toString());
				else
					reportPurchase.setBillDate("");

				if (row[10] != null)
					reportPurchase.setVouNo(row[10].toString());
				else
					reportPurchase.setVouNo("");

				if (row[9] != null) {
					if (row[9].toString().equals("0"))
						reportPurchase.setType("Credit");
					else if (row[9].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[11] != null)
					reportPurchase.setDispatchFlag(row[11].toString());
				else
					reportPurchase.setDispatchFlag("");

				if (row[12] != null)
					reportPurchase.setPoId((Integer) row[12]);
				else
					reportPurchase.setPoId(0);

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	/*****
	 * @author :BILAL
	 * @Date :23-01-2018
	 * @Code :For purchase report unit wise and vendor wise and product wise
	 ******/
	@Override
	public List<ReportPurchase> getProductWisePurchaseandVendor(String from, String to, String productId,
			String vendorId, String unitId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			int productIdc = 0;
			int vendorIdc = 0;
			int unitIdc = 0;
			if (!productId.equals("")) {
				productIdc = Integer.parseInt(productId);
			}

			if (!vendorId.equals("")) {
				vendorIdc = Integer.parseInt(vendorId);
			}

			if (!unitId.equals("")) {
				unitIdc = Integer.parseInt(unitId);
			}

			String str = "select master.pur_id,master.pur_trans_type,master.pur_bill_no,master.pur_bill_date,batch.batch_code,vendor.vendor_name,slave.pur_slave_qty,slave.pur_slave_rate,slave.pur_slave_amt,(slave.pur_gstamt + slave.pur_igstamt), produ.product_name from pharma_purchase_master master inner join pharma_purchase_slave slave on slave.pur_slave_master_id=master.pur_id inner join pharma_vendor_master vendor on vendor.vendor_id=master.pur_vendor_id inner join pharma_batch_master batch on batch.batch_id=slave.pur_slave_batch_id  "
					+ " inner join pharma_product_master produ ON  produ.product_id = slave.pur_slave_product_id "
					+ " where  master.pur_delete_Flag='0' and pur_bill_date between '" + from + "' and '" + to + "'";
			if (productIdc > 0) {
				str = str + " and slave.pur_slave_product_id= " + productId;
			}
			if (vendorIdc > 0) {
				str = str + " and master.pur_vendor_id= " + vendorId;
			}

			if (unitIdc > 0) {
				str = str + " and master.unit_id= " + unitId;
			}

			query = sessionFactory.getCurrentSession().createSQLQuery(str);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("cash/Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setPurBillNo(row[2].toString());
				else
					reportPurchase.setPurBillNo("");

				if (row[3] != null)
					reportPurchase.setBillDate(row[3].toString());
				else
					reportPurchase.setBillDate("");

				if (row[4] != null)
					reportPurchase.setBatchCode(row[4].toString());
				else
					reportPurchase.setBatchCode("");

				if (row[5] != null)
					reportPurchase.setVendorName(row[5].toString());
				else
					reportPurchase.setVendorName("");

				if (row[6] != null)
					reportPurchase.setQty(row[6].toString());
				else
					reportPurchase.setQty("");

				if (row[7] != null)
					reportPurchase.setRate(row[7].toString());
				else
					reportPurchase.setRate("");

				if (row[8] != null)
					reportPurchase.setAmount(row[8].toString());
				else
					reportPurchase.setAmount("");

				if (row[9] != null)
					reportPurchase.setGstamt((Double) row[9]);
				else
					reportPurchase.setGstamt(0.0);

				if (row[10] != null)
					reportPurchase.setProductName(row[10].toString());
				else
					reportPurchase.setProductName("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	/*****
	 * @author :BILAL
	 * @Date :29-01-2018
	 * @Code :For supplier list From date To To-date
	 ******/
	@Override
	public List<VendorMaster> getSupplierListReport(String fromDate, String toDate) {

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

	/*****
	 * @author :BILAL
	 * @Date :06-02-2018
	 * @Code :For product master report list
	 ******/
	@Override
	public List<ProductMaster> getproductData(String fromDate, String toDate, int categoryId, int companyId,
			int productId) {
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

	/*****
	 * @author :BILAL
	 * @Date :14-02-2018
	 * @Code :For purchase detail report list
	 ******/
	@Override
	public List<ReportPurchase> getpurchaseData(HttpServletRequest request, String fromDate, String toDate,
			int categoryId, int companyId, int productId, int vendortId, int unitId, String purtranstype) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {

			String str = "select master.pur_id,master.pur_trans_type,master.pur_bill_no,master.pur_bill_date,batch.batch_code,vendor.vendor_name,slave.pur_slave_qty,slave.pur_slave_rate,slave.pur_slave_amt,master.pur_vat, produ.product_name, batch.batch_exp_date,master.pur_less,slave.pur_slave_bill_rate,slave.pur_slave_disc,slave.pur_slave_vat,master.pur_tax_vat12 AS igstAmtmaster,master.pur_tax_vat5 AS gstAmountmaster, master.pur_gross_amt AS billamt,master.pur_net_amt AS netbillamtwithgst,slave.pur_hsn,slave.pur_slave_purchase_rate,vendoradd.vendor_state,vendoradd.vendor_gstn  from pharma_purchase_slave slave  inner join pharma_purchase_master master on slave.pur_slave_master_id=master.pur_id inner join pharma_vendor_master vendor on vendor.vendor_id=master.pur_vendor_id inner join pharma_batch_master batch on batch.batch_id=slave.pur_slave_batch_id  "
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

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setPurBillNo(row[2].toString());
				else
					reportPurchase.setPurBillNo("");

				if (row[3] != null)
					reportPurchase.setBillDate(row[3].toString());
				else
					reportPurchase.setBillDate("");

				if (row[4] != null)
					reportPurchase.setBatchCode(row[4].toString());
				else
					reportPurchase.setBatchCode("");

				if (row[5] != null)
					reportPurchase.setVendorName(row[5].toString());
				else
					reportPurchase.setVendorName("");

				if (row[6] != null)
					reportPurchase.setQty(row[6].toString());
				else
					reportPurchase.setQty("");

				if (row[7] != null)
					reportPurchase.setRate(row[7].toString());
				else
					reportPurchase.setRate("");

				if (row[8] != null)
					reportPurchase.setAmount(row[8].toString());
				else
					reportPurchase.setAmount("");

				if (row[9] != null)
					reportPurchase.setGstamt((Double) row[9]);
				else
					reportPurchase.setGstamt(0.0);

				if (row[10] != null)
					reportPurchase.setProductName(row[10].toString());
				else
					reportPurchase.setProductName("");

				if (row[11] != null)
					reportPurchase.setExpiryDate(row[11].toString());
				else
					reportPurchase.setExpiryDate("");

				if (row[12] != null)
					reportPurchase.setTotalLess(Float.parseFloat(row[12].toString()));
				else
					reportPurchase.setTotalLess(0F);

				if (row[13] != null)
					reportPurchase.setPurRate(Double.parseDouble(row[13].toString()));
				else
					reportPurchase.setPurRate(0.0);

				if (row[14] != null)
					reportPurchase.setDisc(row[14].toString());
				else
					reportPurchase.setDisc("0");

				if (row[15] != null)
					reportPurchase.setDgstPers(Double.parseDouble(row[15].toString()));
				else
					reportPurchase.setDgstPers(0.0);

				//
				if (row[16] != null)
					reportPurchase.setIgstAmtmaster(Double.parseDouble(row[16].toString()));
				else
					reportPurchase.setIgstAmtmaster(0.0);
				if (row[17] != null)
					reportPurchase.setGstAmountmaster(Double.parseDouble(row[17].toString()));
				else
					reportPurchase.setGstAmountmaster(0.0);

				if (row[18] != null)
					reportPurchase.setBillamtmaster(Double.parseDouble(row[18].toString()));
				else
					reportPurchase.setBillamtmaster(0.0);

				if (row[19] != null)
					reportPurchase.setNetbillamtwithgst(Double.parseDouble(row[19].toString()));
				else
					reportPurchase.setNetbillamtwithgst(0.0);

				if (row[20] != null)
					reportPurchase.setHsncode(row[20].toString());
				else
					reportPurchase.setHsncode("0");

				if (row[21] != null)
					reportPurchase.setPurRateWithGST(Double.parseDouble(row[21].toString()));
				else
					reportPurchase.setPurRateWithGST(0.0);

				if (row[22] != null)
					reportPurchase.setVendorAddress(row[22].toString());
				else
					reportPurchase.setVendorAddress("");

				if (row[23] != null)
					reportPurchase.setVatTinNumber(row[23].toString());
				else
					reportPurchase.setVatTinNumber("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getpurchaseOrderData(HttpServletRequest request, String fromDate, String toDate,
			int vendortId, int unitId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {

			String str = "select master.po_id,master.po_vendor_id,master.po_total_amt,master.po_total_vat,master.po_Net_total,ifnull(master.po_remark,'-') AS remark,vendor.vendor_name,master.po_date from pharma_po_master master "
					+ " inner join pharma_vendor_master vendor ON vendor.vendor_id = master.po_vendor_id"
					+ " where master.po_delete_flag = '0' ";
			if (!fromDate.equals("0") && !toDate.equals("0")) {
				str = str + " and master.po_date between '" + fromDate + "' and '" + toDate + "' ";
			}
			if (vendortId > 0) {
				str = str + " and master.po_vendor_id= " + vendortId;
			}

			if (unitId > 0) {
				str = str + " and master.unit_id= " + unitId;
			}

			query = sessionFactory.getCurrentSession().createSQLQuery(str);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setPoId(Integer.parseInt(row[0].toString()));
				else
					reportPurchase.setPoId(0);

				if (row[1] != null) {
					reportPurchase.setType(row[1].toString());
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setTotalAmount(Float.parseFloat(row[2].toString()));
				else
					reportPurchase.setTotalAmount(0F);

				if (row[3] != null)
					reportPurchase.setTotalVat(Float.parseFloat(row[3].toString()));
				else
					reportPurchase.setTotalVat(0F);

				if (row[4] != null)
					reportPurchase.setTotalNet(Float.parseFloat(row[4].toString()));
				else
					reportPurchase.setTotalNet(0F);

				if (row[5] != null)
					reportPurchase.setChequeNum(row[5].toString());
				else
					reportPurchase.setChequeNum("");

				if (row[6] != null)
					reportPurchase.setVendorName(row[6].toString());
				else
					reportPurchase.setVendorName("");

				if (row[7] != null)
					reportPurchase.setExpiryDate(row[7].toString());
				else
					reportPurchase.setExpiryDate("-");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	/*****
	 * @author :BILAL
	 * @Date :28-02-2018
	 * @Code :For sale report of GST with multiple filterations
	 ****/
	@Override
	public List<ReportProductWiseBatchSale> getAllSaleReportWithGST(HttpServletRequest request, String from, String to,
			int productId, int unitId, String type1, int patientId) {
		List<ReportProductWiseBatchSale> reportProductWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String str = "", str0 = "", str1 = "", str2 = "", sale = "";
		String[] type = type1.split("_");

		if (type[0].equalsIgnoreCase("patient") || type[0].equalsIgnoreCase("all")) {
			str0 = " SELECT DATE_FORMAT(p_master.patient_bill_date, '%d-%m-%y')  as dates,p_master.patient_sales_bill_id,product.product_name,p_slave.patient_slave_qty,p_slave.patient_slave_rate, "
					+ " p_slave.patient_slave_amt ,concat(ifnull(p1.f_name,''), ' ', ifnull(p1.m_name,''), ' ', ifnull(p1.l_name,'')),    p_master.patient_sales_bill_net_amt,   hsn.hsn_no as hsnCode,    p_slave.patient_slave_vat,    p_slave.patient_slave_ratePerUnit,    p_slave.patient_slave_vatAmt,if(p_master.patient_bill_mode = 0,'Cash','Credit') as pmode,ifnull(p_slave.patient_slave_disc,0),ifnull(p_master.patient_sales_bill_cd,0),ifnull(p_master.patient_sales_bill_cd_amt,0), hsn.hsn_no ,p_slave.patient_sale_slave_rec_amt as patient_sale_slave_rec_amt,p_master.patient_sale_for_time,ifnull(fn_get_sponsor(p_master.bill_Category_id),'') as sponser,ifnull( p_slave.patient_sale_slave_issue_qty,0) as qty FROM    pharma_patient_sales_bill_master p_master        inner JOIN    pharma_patient_sales_bill_slave p_slave ON p_slave.patient_slave_bill_master_id = p_master.patient_sales_bill_id        inner join    pharma_product_master product ON product.product_id = p_slave.patient_slave_product_id        inner join    ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id   inner join pharma_hsn_master hsn ON hsn.idpharma_hsn_master = product.product_hsn where p_master.patient_sales_bill_delete_flag=0 ";

			if (!from.equals("0") && !to.equals("0")) {
				str0 = str0 + " and p_master.patient_bill_date between '" + from + "' and '" + to + "' ";
			}

			if (patientId > 0) {
				str0 = str0 + " and p1.patient_id = " + patientId;
			}

			if (productId > 0) {
				str0 = str0 + " and p_slave.patient_slave_product_id = " + productId;
			}

			if (unitId > 0) {
				str0 = str0 + " and p_master.unit_id = " + unitId;
			}

			if (Integer.parseInt(type[1]) < 3) {
				str0 = str0 + " and p_master.patient_bill_mode = " + type[1];
			}

			str0 = str0 + " order by p_master.patient_bill_date desc,p_master.patient_sale_for_time desc";

		}

		if (type[0].equalsIgnoreCase("counter") || type[0].equalsIgnoreCase("all")) {
			str1 = "SELECT   DATE_FORMAT(p_master.counter_sale_for_date, '%d-%m-%y')  as dates,     p_master.unit_count,    product.product_name,    p_slave.counter_slave_qty,    p_slave.counter_slave_rate,    p_slave.counter_slave_amt,    counter_sale_patient_name,    p_master.counter_sale_net_amt,    hsn.hsn_no as hsnCode,    p_slave.counter_slave_vat,    p_slave.counter_slave_rateForPrint,    p_slave.counter_slave_vatAmt,    if(p_master.counter_sale_trans_type = 0,        'Cash',        'Credit') as pmode, ifnull((p_slave.counter_slave_mrp*p_slave.counter_slave_disc / 100),0),ifnull(p_master.counter_sale_cd,0),ifnull(p_master.counter_sale_cd_amt,0),hsn.hsn_no, 0.0 AS patient_sale_slave_rec_amt, p_master.counter_sale_for_time ,ifnull(fn_get_sponsor(0),'') as sponser,ifnull( p_slave.counter_sale_slave_issue_qty,0) as qty   FROM    pharma_counter_sale_master p_master        inner JOIN    pharma_counter_sale_slave p_slave ON p_slave.counter_slave_master_id = p_master.counter_sale_id        inner join    pharma_product_master product ON product.product_id = p_slave.counter_slave_product_id inner join pharma_hsn_master hsn ON hsn.idpharma_hsn_master = product.product_hsn where p_master.counter_sale_delete_flag=0  ";

			if (!from.equals("0") && !to.equals("0")) {
				str1 = str1 + " and  p_master.counter_sale_for_date between '" + from + "' and '" + to + "' ";
			}

			if (productId > 0) {
				str1 = str1 + " and p_slave.counter_slave_product_id = " + productId;
			}

			if (unitId > 0) {
				str1 = str1 + " and p_master.unit_id = " + unitId;
			}

			if (Integer.parseInt(type[1]) < 3) {
				str1 = str1 + " and p_master.counter_sale_trans_type = " + type[1];
			}

			str1 = str1 + " order by p_master.counter_sale_for_date desc,p_master.counter_sale_for_time desc";

		}

		if (type[0].equalsIgnoreCase("indent") || type[0].equalsIgnoreCase("all")) {
			str2 = "SELECT  DATE_FORMAT(indent_sale_received_date, '%d-%m-%y')  as dates,    p_master.indent_sale_id,    product.product_name,    p_slave.indent_sale_slave_qty,    p_slave.indent_sale_slave_rate,    p_slave.indent_sale_slave_amt,    concat(ifnull(p1.f_name,''), ' ', ifnull(p1.m_name,''), ' ', ifnull(p1.l_name,'')),    p_master.indent_sale_net_amt,    hsn.hsn_no as hsnCode,   p_slave.indent_slave_vat,    p_slave.indent_slave_ratePerUnit,    p_slave.indent_slave_vatAmt,    if(p_master.indent_sale_type = 0,        'Cash',        'Credit') as pmode, ifnull(p_slave.indent_slave_Dis,0),ifnull(indent_sale_cd,0),ifnull(indent_sale_cd_amt,0), hsn.hsn_no, p_slave.indent_sale_slave_rec_amt AS indent_sale_slave_rec_amt, p_master.indent_sale_time , ifnull(fn_get_sponsor(p_master.bill_Category_id),'') as sponser,ifnull( p_slave.indent_sale_slave_issue_qty,0) as qty  FROM    pharma_indent_sale_master p_master        inner JOIN    pharma_indent_sale_slave p_slave ON p_slave.indent_sale_slave_master_id = p_master.indent_sale_id        inner join    pharma_product_master product ON product.product_id = p_slave.indent_sale_slave_product_id        inner join    pharma_indent_master i ON i.indent_id = p_master.indent_sale_indent_no        inner join    ehat_treatment t ON t.treatment_id = i.indent_treatement_id        inner join    ehat_patient p1 ON p1.patient_id = t.patient_id  inner join pharma_hsn_master hsn ON hsn.idpharma_hsn_master = product.product_hsn where p_master.indent_sale_delete_flag=0   ";

			if (!from.equals("0") && !to.equals("0")) {
				str2 = str2 + " and  p_master.indent_sale_received_date between '" + from + "' and '" + to + "' ";
			}

			if (patientId > 0) {
				str2 = str2 + " and p1.patient_id = " + patientId;
			}

			if (productId > 0) {
				str2 = str2 + " and p_slave.indent_sale_slave_product_id = " + productId;
			}

			if (unitId > 0) {
				str2 = str2 + " and p_master.unit_id = " + unitId;
			}

			if (Integer.parseInt(type[1]) < 3) {
				str2 = str2 + " and p_master.indent_sale_type = " + type[1];
			}

			str2 = str2 + " order by p_master.indent_sale_received_date desc,p_master.indent_sale_time desc";
		}

		int i = 0;
		if (type[0].equalsIgnoreCase("patient")) {
			str = str0;
			sale = "PS-";
		}
		if (type[0].equalsIgnoreCase("counter")) {
			str = str1;
			sale = "CS-";
		}
		if (type[0].equalsIgnoreCase("indent")) {
			str = str2;
			sale = "IS-";
		}
		if (type[0].equalsIgnoreCase("all"))
			for (i = 0; i < 3; i++)
				try {
					if (i == 0) {
						str = str0;
						sale = "PS-";
					} else if (i == 1) {
						str = str1;
						sale = "CS-";
					} else if (i == 2) {
						str = str2;
						sale = "IS-";
					}

					query = sessionFactory.getCurrentSession().createSQLQuery(str);

					// System.err.println("str========"+str);

					@SuppressWarnings("unchecked")
					List<Object[]> rows = query.list();

					for (Object[] row : rows) {

						ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

						if (row[0] != null)
							reportProductWiseBatchSale.setDate(row[0].toString());
						else
							reportProductWiseBatchSale.setDate("");

						if (row[1] != null)
							reportProductWiseBatchSale.setReceiptNo(sale + row[1].toString());
						else
							reportProductWiseBatchSale.setReceiptNo("");

						if (row[2] != null)
							reportProductWiseBatchSale.setProductName(row[2].toString());
						else
							reportProductWiseBatchSale.setProductName("");

						if (row[3] != null)
							reportProductWiseBatchSale.setQty(row[3].toString());
						else
							reportProductWiseBatchSale.setQty("");

						if (row[4] != null)
							reportProductWiseBatchSale.setRate(row[4].toString());
						else
							reportProductWiseBatchSale.setRate("");

						if (row[5] != null)
							reportProductWiseBatchSale.setAmount(row[5].toString());
						else
							reportProductWiseBatchSale.setAmount("");

						if (row[6] != null)
							reportProductWiseBatchSale.setPatientName(row[6].toString());
						else
							reportProductWiseBatchSale.setPatientName("");

						if (row[7] != null)
							reportProductWiseBatchSale.setNetAmt(Double.parseDouble(row[7].toString()));
						else
							reportProductWiseBatchSale.setNetAmt(0.0);

						if (row[8] != null)
							reportProductWiseBatchSale.setTaxable55(row[8].toString());
						else
							reportProductWiseBatchSale.setTaxable55("");

						if (row[9] != null)
							reportProductWiseBatchSale.setTaxable0(row[9].toString());
						else
							reportProductWiseBatchSale.setTaxable0("");

						if (row[10] != null)
							reportProductWiseBatchSale.setPurRate(row[10].toString());
						else
							reportProductWiseBatchSale.setPurRate("");

						if (row[11] != null)
							reportProductWiseBatchSale.setTaxable12(row[11].toString());
						else
							reportProductWiseBatchSale.setTaxable12("");

						if (row[12] != null)
							reportProductWiseBatchSale.setType(row[12].toString());
						else
							reportProductWiseBatchSale.setType("");

						
						  if (row[13] != null)
						  reportProductWiseBatchSale.setDiscount(Double.parseDouble(row[13].toString())
						  ); else reportProductWiseBatchSale.setDiscount(0.0);
						 

						if (row[14] != null)
							reportProductWiseBatchSale.setCdperc(Double.parseDouble(row[14].toString()));
						else
							reportProductWiseBatchSale.setCdperc(0.0);

						if (row[15] != null)
							reportProductWiseBatchSale.setCdamt(Double.parseDouble(row[15].toString()));
						else
							reportProductWiseBatchSale.setCdamt(0.0);

						if (row[16] != null)
							reportProductWiseBatchSale.setHsnNo(row[16].toString());
						else
							reportProductWiseBatchSale.setHsnNo("");

						if (row[18] != null)
							reportProductWiseBatchSale.setPatientSaleTime(row[18].toString());
						else
							reportProductWiseBatchSale.setPatientSaleTime("-");
						
						if (row[19] != null)
							reportProductWiseBatchSale.setSponserName(row[19].toString());
						else
							reportProductWiseBatchSale.setSponserName("-");
						
						if (row[20] != null)
							//reportProductWiseBatchSale.setQuantity(Integer.parseInt(row[20].toString()));
						reportProductWiseBatchSale.setQty1(Double.parseDouble(row[20].toString()));
						else
							reportProductWiseBatchSale.setQuantity(0);

						reportProductWiseBatchSales.add(reportProductWiseBatchSale);

					}

				} catch (Exception e) {
					e.printStackTrace();
				}

		else
			try {

				query = sessionFactory.getCurrentSession().createSQLQuery(str);

				@SuppressWarnings("unchecked")
				List<Object[]> rows = query.list();

				for (Object[] row : rows) {

					ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

					if (row[0] != null)
						reportProductWiseBatchSale.setDate(row[0].toString());
					else
						reportProductWiseBatchSale.setDate("");

					if (row[1] != null)
						reportProductWiseBatchSale.setReceiptNo(sale + row[1].toString());
					else
						reportProductWiseBatchSale.setReceiptNo("");

					if (row[2] != null)
						reportProductWiseBatchSale.setProductName(row[2].toString());
					else
						reportProductWiseBatchSale.setProductName("");

					if (row[3] != null)
						reportProductWiseBatchSale.setQty(row[3].toString());
					else
						reportProductWiseBatchSale.setQty("");

					if (row[4] != null)
						reportProductWiseBatchSale.setRate(row[4].toString());
					else
						reportProductWiseBatchSale.setRate("");

					if (row[5] != null)
						reportProductWiseBatchSale.setAmount(row[5].toString());
					else
						reportProductWiseBatchSale.setAmount("");

					if (row[6] != null)
						reportProductWiseBatchSale.setPatientName(row[6].toString());
					else
						reportProductWiseBatchSale.setPatientName("");

					if (row[7] != null)
						reportProductWiseBatchSale.setNetAmt(Double.parseDouble(row[7].toString()));
					else
						reportProductWiseBatchSale.setNetAmt(0.0);

					if (row[8] != null)
						reportProductWiseBatchSale.setTaxable55(row[8].toString());
					else
						reportProductWiseBatchSale.setTaxable55("");

					if (row[9] != null)
						reportProductWiseBatchSale.setTaxable0(row[9].toString());
					else
						reportProductWiseBatchSale.setTaxable0("");

					if (row[10] != null)
						reportProductWiseBatchSale.setPurRate(row[10].toString());
					else
						reportProductWiseBatchSale.setPurRate("");

					if (row[11] != null)
						reportProductWiseBatchSale.setTaxable12(row[11].toString());
					else
						reportProductWiseBatchSale.setTaxable12("");

					if (row[12] != null)
						reportProductWiseBatchSale.setType(row[12].toString());
					else
						reportProductWiseBatchSale.setType("");

					
					  if (row[13] != null)
					  reportProductWiseBatchSale.setDiscount(Double.parseDouble(row[13].toString())
					  ); else reportProductWiseBatchSale.setDiscount(0.0);
					 

					if (row[14] != null)
						reportProductWiseBatchSale.setCdperc(Double.parseDouble(row[14].toString()));
					else
						reportProductWiseBatchSale.setCdperc(0.0);

					if (row[15] != null)
						reportProductWiseBatchSale.setCdamt(Double.parseDouble(row[15].toString()));
					else
						reportProductWiseBatchSale.setCdamt(0.0);

					if (row[16] != null)
						reportProductWiseBatchSale.setHsnNo(row[16].toString());
					else
						reportProductWiseBatchSale.setHsnNo("");

					if (row[18] != null)
						reportProductWiseBatchSale.setPatientSaleTime(row[18].toString());
					else
						reportProductWiseBatchSale.setPatientSaleTime("");
					
					if (row[19] != null)
						reportProductWiseBatchSale.setSponserName(row[19].toString());
					else
						reportProductWiseBatchSale.setSponserName("-");
					
					//if (row[20] != null) reportProductWiseBatchSale.setQuantity(Integer.parseInt(row[20].toString()));
					
					if (row[20] != null)
						reportProductWiseBatchSale.setQty1(Double.parseDouble(row[20].toString()));
					else
						reportProductWiseBatchSale.setQuantity(0);

					reportProductWiseBatchSales.add(reportProductWiseBatchSale);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

		return reportProductWiseBatchSales;

	}

	/******
	 * @author :BILAL
	 * @Date :01-03-2018
	 * @code :For purchase details report with sale value and profit amount and
	 *       percentage *
	 ******/
	@Override
	public List<ReportPurchase> getpurchaselistwithsaleval(HttpServletRequest request, String fromDate, String toDate,
			int categoryId, int companyId, int productId, int vendortId, int unitId, String purtranstype) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {

			String str = "SELECT master.pur_id, master.pur_trans_type,master.pur_bill_no, master.pur_bill_date,vendor.vendor_name,master.pur_entry_date,master.pur_gross_amt AS billamt,master.pur_net_amt AS netbillamtwithgst, "
					+ " (SELECT SUM(slave.pur_slave_mrp * slave.pur_slave_qty) FROM pharma_purchase_slave slave WHERE slave.pur_slave_master_id = master.pur_id) AS saleamt,"
					+ " master.pur_vat,master.pur_less "
					+ " FROM pharma_purchase_master master INNER JOIN pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id WHERE master.pur_delete_Flag = 0 ";

			if (!fromDate.equals("0") && !toDate.equals("0")) {
				str = str + " and master.pur_bill_date between '" + fromDate + "' and '" + toDate + "' ";
			}

			if (vendortId > 0) {
				str = str + " and master.pur_vendor_id= " + vendortId;
			}

			if (unitId > 0) {
				str = str + " and master.unit_id= " + unitId;
			}

			if (!purtranstype.equals("3")) {
				str = str + " and  master.pur_trans_type= " + purtranstype;
			}

			str += " order by master.pur_id";

			query = sessionFactory.getCurrentSession().createSQLQuery(str);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setPurBillNo(row[2].toString());
				else
					reportPurchase.setPurBillNo("");

				if (row[3] != null)
					reportPurchase.setBillDate(row[3].toString());
				else
					reportPurchase.setBillDate("");

				if (row[4] != null)
					reportPurchase.setVendorName(row[4].toString());
				else
					reportPurchase.setVendorName("");

				if (row[5] != null)
					reportPurchase.setExpiryDate(row[5].toString());
				else
					reportPurchase.setExpiryDate("");

				if (row[6] != null)
					reportPurchase.setBillamtmaster((Double) row[6]);
				else
					reportPurchase.setBillamtmaster(0.0);

				if (row[7] != null)
					reportPurchase.setNetbillamtwithgst((Double) row[7]);
				else
					reportPurchase.setNetbillamtwithgst(0.0);

				if (row[8] != null)
					reportPurchase.setSalebillamtmaster((Double) row[8]);
				else
					reportPurchase.setSalebillamtmaster(0.0);

				if (row[9] != null)
					reportPurchase.setGstAmountmaster(Double.parseDouble(row[9].toString()));
				else
					reportPurchase.setGstAmountmaster(0.0);

				if (row[10] != null)
					reportPurchase.setTotalLess(Float.parseFloat(row[10].toString()));
				else
					reportPurchase.setTotalLess(0F);

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<WardWiseDetaisDto> getWardwiseCollection(String from, String to) {

		Map<String, WardWiseDetaisDto> map = new HashMap<String, WardWiseDetaisDto>();
		SQLQuery query = null;

		try {

			String str = "select     ward_name, sum(indent_sale_net_amt) from    pharma_indent_sale_master m where  ward_name != 'null'";

			if (!from.equals("0")) {
				str = str + " and indent_sale_received_date between '" + from + "' and '" + to + "'";
			}

			str = str + " group by ward_name ";

			query = sessionFactory.getCurrentSession().createSQLQuery(str);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				WardWiseDetaisDto wardWiseDetaisDto = new WardWiseDetaisDto();

				if (row[0] != null)
					wardWiseDetaisDto.setHallName(row[0].toString());
				else
					wardWiseDetaisDto.setHallName("");

				if (row[1] != null)
					wardWiseDetaisDto.setBedHall(row[1].toString());
				else
					wardWiseDetaisDto.setBedHall("");

				map.put(row[0].toString(), wardWiseDetaisDto);
			}

			// patient sale

			String str1 = "select     ward_name, sum(m.patient_sales_bill_net_amt) from    pharma_patient_sales_bill_master m where m.patient_type='ipd' and ward_name != 'null' ";

			if (!from.equals("0")) {
				str1 = str1 + " and m.patient_bill_date between '" + from + "' and '" + to + "'";
			}

			str1 = str1 + " group by ward_name ";

			Query query1 = sessionFactory.getCurrentSession().createSQLQuery(str1);

			List<Object[]> rows1 = query1.list();
			for (Object[] row : rows1) {

				WardWiseDetaisDto wardWiseDetaisDto = new WardWiseDetaisDto();

				if (row[0] != null)
					wardWiseDetaisDto.setHallName(row[0].toString());
				else
					wardWiseDetaisDto.setHallName("");

				if (row[1] != null)
					wardWiseDetaisDto.setBedHall(row[1].toString());
				else
					wardWiseDetaisDto.setBedHall("");

				if (map.containsKey(row[0].toString())) {
					wardWiseDetaisDto = map.get(row[0].toString());
					wardWiseDetaisDto.setBedHall((Double.parseDouble(map.get(row[0].toString()).getBedHall())
							+ Double.parseDouble(row[1].toString())) + "");
				}

				map.put(row[0].toString(), wardWiseDetaisDto);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ArrayList<WardWiseDetaisDto>(map.values());
	}

	@Override
	public List<PatientSaleBillMaster> getPharmacyPatientWiseSaleReport(String from, String to) {
		Map<Integer, PatientSaleBillMaster> list = new HashMap<Integer, PatientSaleBillMaster>();
		Map<Integer, PatientSaleBillMaster> list1 = new HashMap<Integer, PatientSaleBillMaster>();
		Map<Integer, PatientSaleBillMaster> list2 = new HashMap<Integer, PatientSaleBillMaster>();

		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT     master.patient_sales_bill_id,    master.patient_bill_date,   if(master.patient_sale_store_id = 0,'Main Store',(SELECT store_name FROM pharma_sub_store_master where store_id = master.patient_sale_store_id)) as store,    master.patient_sales_bill_net_amt,    concat(p.f_name, ' ', p.m_name, ' ', p.l_name) as pname,  concat(ifnull(p.address, ''), ' ', ifnull(c.city_name, ''), ' ',ifnull(p.area_code, ''), ' ', ifnull(t1.taluka_name, ''),  ' ', ifnull(d.dis_name, ''),' ',  ifnull(s.state_name, '')) as addr,      patient_slave_qty,    patient_slave_mrp,    patient_slave_batch_code,    t.opdipdno as ipno,    comp.comp_name , product.product_name  FROM    pharma_patient_sales_bill_master master        inner join    pharma_patient_sales_bill_slave p_slave ON p_slave.patient_slave_bill_master_id = master.patient_sales_bill_id        inner join    pharma_product_master product ON product.product_id = p_slave.patient_slave_product_id        inner join    pharma_company_master comp ON product.product_comp_id = comp.comp_id  inner join    ehat_treatment t ON t.treatment_id = master.patient_sale_treatmentId      inner join    ehat_patient p ON p.patient_id = master.patient_bill_patient_id        left join    city c ON p.town_id = c.idcity        left join    taluka t1 ON p.taluka_id = t1.idtaluka        left join    district d ON d.iddistrict = p.district_id        left join    state s ON s.idstate = p.state_id where    master.patient_bill_date between '"
						+ from + "' and '" + to + "'");

		@SuppressWarnings("unchecked")
		List<Object[]> result = query1.list();
		try {
			for (Object[] row : result) {

				List<PatientSaleBillSlave> ltPatientSaleBill = new ArrayList<PatientSaleBillSlave>();
				PatientSaleBillMaster patientSaleMaster = new PatientSaleBillMaster();
				if (row[0] != null)
					patientSaleMaster.setPatientSalesBillId(Integer.parseInt(row[0].toString()));

				if (row[1] != null) {
					String str[] = row[1].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);

					patientSaleMaster.setPatientSaleForTime(stringBuffer.toString());
				}

				if (row[2] != null)
					patientSaleMaster.setPatientType(row[2].toString());
				else
					patientSaleMaster.setPatientType("");

				if (row[3] != null)
					patientSaleMaster.setPatientSalesBillNetAmt(Double.parseDouble(row[3].toString()));
				else
					patientSaleMaster.setPatientSalesBillNetAmt(0.0);

				if (row[4] != null)
					patientSaleMaster.setPatientBillMode(row[4].toString());// pname
				else
					patientSaleMaster.setPatientBillMode((""));

				if (row[5] != null) {
					patientSaleMaster.setPatientSalesBillEntryBy(row[5].toString());
				} else
					patientSaleMaster.setPatientSalesBillEntryBy((""));

				if (list.containsKey(Integer.parseInt(row[0].toString()))) {
					ltPatientSaleBill = list.get(Integer.parseInt(row[0].toString())).getLtPatientSaleBill();
				}

				PatientSaleBillSlave patientSaleBillSlave = new PatientSaleBillSlave();

				if (row[6] != null) {
					String result1[] = row[6].toString().split("\\.");

					patientSaleBillSlave.setPatientSlaveQty(Integer.parseInt(result1[0]));
				}

				if (row[7] != null) {
					patientSaleBillSlave.setPatientSlaveMrp(Double.parseDouble(row[7].toString()));

				} else
					patientSaleBillSlave.setPatientSlaveMrp(0.0);

				if (row[8] != null)
					patientSaleBillSlave.setPatientSlaveBatchCode(row[8].toString());
				else
					patientSaleBillSlave.setPatientSlaveBatchCode("");

				if (row[9] != null)
					patientSaleMaster.setPatientSalesBillDocNo(row[9].toString());
				else
					patientSaleMaster.setPatientSalesBillDocNo("");

				ProductMaster productMaster = new ProductMaster();
				if (row[11] != null) {
					productMaster.setProductName(row[11].toString());
				} else {
					productMaster.setProductName("");
				}

				if (row[10] != null) {
					productMaster.setCess(row[10].toString());
				} else {
					productMaster.setCess("");
				}

				patientSaleBillSlave.setProductMaster(productMaster);

				ltPatientSaleBill.add(patientSaleBillSlave);
				patientSaleMaster.setLtPatientSaleBill(ltPatientSaleBill);

				list.put(patientSaleMaster.getPatientSalesBillId(), patientSaleMaster);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT     master.counter_sale_id,    master.counter_sale_for_date, if(master.counter_sale_store_id = 0,'Main Store',(SELECT store_name FROM pharma_sub_store_master where store_id = master.counter_sale_store_id)) as store,   master.counter_sale_net_amt,    master.counter_sale_patient_name as pname,    master.counter_sale_address,       p_slave.counter_slave_qty,    p_slave.counter_slave_mrp,    p_slave.counter_slave_batch_code,    p_slave.counter_slave_batch_expiry,    comp.comp_name, product.product_name FROM    pharma_counter_sale_master master        inner join    pharma_counter_sale_slave p_slave ON p_slave.counter_slave_master_id = master.counter_sale_id        inner join    pharma_product_master product ON product.product_id = p_slave.counter_slave_product_id        inner join    pharma_company_master comp ON product.product_comp_id = comp.comp_id where    master.counter_sale_for_date between '"
							+ from + "' and '" + to + "'");
			List<Object[]> rows = query2.list();

			for (Object[] row : rows) {
				List<PatientSaleBillSlave> ltPatientSaleBill = new ArrayList<PatientSaleBillSlave>();
				PatientSaleBillMaster patientSaleMaster = new PatientSaleBillMaster();
				if (row[0] != null)
					patientSaleMaster.setPatientSalesBillId(Integer.parseInt(row[0].toString()));

				if (row[1] != null) {
					String str[] = row[1].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);

					patientSaleMaster.setPatientSaleForTime(stringBuffer.toString());
				}

				patientSaleMaster.setPatientType(row[2].toString());

				if (row[3] != null)
					patientSaleMaster.setPatientSalesBillNetAmt(Double.parseDouble(row[3].toString()));
				else
					patientSaleMaster.setPatientSalesBillNetAmt(0.0);

				if (row[4] != null)
					patientSaleMaster.setPatientBillMode(row[4].toString());// pname
				else
					patientSaleMaster.setPatientBillMode((""));

				if (row[5] != null) {
					patientSaleMaster.setPatientSalesBillEntryBy(row[5].toString());// addr
				} else
					patientSaleMaster.setPatientSalesBillEntryBy((""));

				if (list1.containsKey(Integer.parseInt(row[0].toString()))) {
					ltPatientSaleBill = list1.get(Integer.parseInt(row[0].toString())).getLtPatientSaleBill();
				}

				PatientSaleBillSlave patientSaleBillSlave = new PatientSaleBillSlave();

				if (row[6] != null) {
					String result1[] = row[6].toString().split("\\.");

					patientSaleBillSlave.setPatientSlaveQty(Integer.parseInt(result1[0]));
				}

				if (row[7] != null) {
					patientSaleBillSlave.setPatientSlaveMrp(Double.parseDouble(row[7].toString()));

				} else
					patientSaleBillSlave.setPatientSlaveMrp(0.0);

				if (row[8] != null)
					patientSaleBillSlave.setPatientSlaveBatchCode(row[8].toString());
				else
					patientSaleBillSlave.setPatientSlaveBatchCode("");
				/*
				 * if (row[9] != null) patientSaleBillSlave.setPatientSaleBatchExpiry(row[9]
				 * .toString()); else
				 */
				patientSaleMaster.setPatientSalesBillDocNo("");

				ProductMaster productMaster = new ProductMaster();
				if (row[11] != null) {
					productMaster.setProductName(row[11].toString());
				} else {
					productMaster.setProductName("");
				}

				if (row[10] != null) {
					productMaster.setCess(row[10].toString());
				} else {
					productMaster.setCess("");
				}

				patientSaleBillSlave.setProductMaster(productMaster);
				ltPatientSaleBill.add(patientSaleBillSlave);
				patientSaleMaster.setLtPatientSaleBill(ltPatientSaleBill);

				list1.put(patientSaleMaster.getPatientSalesBillId(), patientSaleMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();

		}

		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT    master.indent_sale_id,    master.indent_sale_received_date,    if(master.indent_sale_store_id = 0,'Main Store',(SELECT store_name FROM pharma_sub_store_master where store_id = master.indent_sale_store_id)) as store,    master.indent_sale_net_amt,    concat(p.f_name, ' ', p.m_name, ' ', p.l_name) as pname,  concat(ifnull(p.address, ''), ' ', ifnull(c.city_name, ''), ' ',ifnull(p.area_code, ''), ' ', ifnull(t1.taluka_name, ''),  ' ', ifnull(d.dis_name, ''),' ',  ifnull(s.state_name, '')) as addr,    p_slave.indent_sale_slave_qty,    p_slave.indent_sale_slave_mrp,    p_slave.indent_sale_slave_batch_code,    t.opdipdno as ipno,    comp.comp_name,    product.product_name FROM    pharma_indent_sale_master master        inner join    pharma_indent_master indentmast1_ ON master.indent_sale_indent_no = indentmast1_.indent_id        inner join    pharma_indent_sale_slave p_slave ON p_slave.indent_sale_slave_master_id = master.indent_sale_id        inner join    pharma_product_master product ON product.product_id = p_slave.indent_sale_slave_product_id        inner join    pharma_company_master comp ON product.product_comp_id = comp.comp_id        inner join    ehat_treatment t ON t.treatment_id = indentmast1_.indent_treatement_id        inner join    ehat_patient p ON p.patient_id = t.patient_id        left join    city c ON p.town_id = c.idcity        left join    taluka t1 ON p.taluka_id = t1.idtaluka        left join    district d ON d.iddistrict = p.district_id        left join    state s ON s.idstate = p.state_id where    master.indent_sale_received_date between '"
							+ from + "' and '" + to + "'");
			@SuppressWarnings("unchecked")
			List<Object[]> result2 = query.list();

			for (Object[] row : result2) {
				List<PatientSaleBillSlave> ltPatientSaleBill = new ArrayList<PatientSaleBillSlave>();
				PatientSaleBillMaster patientSaleMaster = new PatientSaleBillMaster();
				if (row[0] != null)
					patientSaleMaster.setPatientSalesBillId(Integer.parseInt(row[0].toString()));

				if (row[1] != null) {
					String str[] = row[1].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);

					patientSaleMaster.setPatientSaleForTime(stringBuffer.toString());
				}

				if (row[2] != null)
					patientSaleMaster.setPatientType(row[2].toString());
				else
					patientSaleMaster.setPatientType("");

				if (row[3] != null)
					patientSaleMaster.setPatientSalesBillNetAmt(Double.parseDouble(row[3].toString()));
				else
					patientSaleMaster.setPatientSalesBillNetAmt(0.0);

				if (row[4] != null)
					patientSaleMaster.setPatientBillMode(row[4].toString());// pname
				else
					patientSaleMaster.setPatientBillMode((""));

				if (row[5] != null) {
					patientSaleMaster.setPatientSalesBillEntryBy(row[5].toString());
				} else
					patientSaleMaster.setPatientSalesBillEntryBy((""));

				if (list2.containsKey(Integer.parseInt(row[0].toString()))) {
					ltPatientSaleBill = list2.get(Integer.parseInt(row[0].toString())).getLtPatientSaleBill();
				}
				PatientSaleBillSlave patientSaleBillSlave = new PatientSaleBillSlave();

				if (row[6] != null) {
					String result1[] = row[6].toString().split("\\.");

					patientSaleBillSlave.setPatientSlaveQty(Integer.parseInt(result1[0]));
				}

				if (row[7] != null) {
					patientSaleBillSlave.setPatientSlaveMrp(Double.parseDouble(row[7].toString()));

				} else
					patientSaleBillSlave.setPatientSlaveMrp(0.0);

				if (row[8] != null)
					patientSaleBillSlave.setPatientSlaveBatchCode(row[8].toString());
				else
					patientSaleBillSlave.setPatientSlaveBatchCode("");

				if (row[9] != null)
					patientSaleMaster.setPatientSalesBillDocNo(row[9].toString());
				else
					patientSaleMaster.setPatientSalesBillDocNo("");

				ProductMaster productMaster = new ProductMaster();
				if (row[11] != null) {
					productMaster.setProductName(row[11].toString());
				} else {
					productMaster.setProductName("");
				}

				if (row[10] != null) {
					productMaster.setCess(row[10].toString());// comp
				} else {
					productMaster.setCess("");
				}

				patientSaleBillSlave.setProductMaster(productMaster);
				ltPatientSaleBill.add(patientSaleBillSlave);
				patientSaleMaster.setLtPatientSaleBill(ltPatientSaleBill);

				list2.put(patientSaleMaster.getPatientSalesBillId(), patientSaleMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		List<PatientSaleBillMaster> billMasters = new ArrayList<PatientSaleBillMaster>(list.values());
		billMasters.addAll(list1.values());
		billMasters.addAll(list2.values());

		return billMasters;
	}

	/******
	 * @author :BILAL
	 * @Date :08-03-2018
	 * @Code :For getting data stock wise or stock data
	 *******/
	@Override
	public List<ReportStock> getitemwisemnfsalestockreport(HttpServletRequest request, String fromDate, String toDate,
			int categoryId, int unitId, int productId) {
		List<ReportStock> reportStocks = new ArrayList<ReportStock>();
		SQLQuery query = null;
		String queryString = "SELECT SUM(stock_in) AS stock_in,SUM(stock_out) AS stock_out,st.product_id,product.product_name,company.comp_name, "
				+ " (SELECT ven.vendor_name FROM pharma_vendor_master ven WHERE st.vendor_id = ven.vendor_id) AS vendor_name,pur_rate "
				+ " FROM stock_master_slave st INNER JOIN pharma_product_master product ON product.product_id = st.product_id "
				+ "  INNER JOIN pharma_company_master company ON company.comp_id = product.product_comp_id where unit_id >= 0 ";

		if (!fromDate.equals("0") && !toDate.equals("0")) {
			queryString = queryString + " and st.operation_date between '" + fromDate + "' and '" + toDate + "' ";
		}

		if (productId > 0) {
			queryString = queryString + " and st.product_id= " + productId;
		}

		if (unitId > 0) {
			queryString = queryString + " and st.unit_id= " + unitId;
		}

		queryString = queryString + " GROUP BY product_id ";

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setStockin(Integer.parseInt(row[0].toString()));
				else
					reportStock.setStockin(0);

				if (row[1] != null)
					reportStock.setStockout(Integer.parseInt(row[1].toString()));
				else
					reportStock.setStockout(0);

				if (row[2] != null)
					reportStock.setProductId((row[2].toString()));
				else
					reportStock.setProductId("0");

				if (row[3] != null)
					reportStock.setProductName(row[3].toString());
				else
					reportStock.setProductName("");

				if (row[4] != null)
					reportStock.setCompanyId(row[4].toString());
				else
					reportStock.setCompanyId("");

				if (row[5] != null)
					reportStock.setVendorName(row[5].toString());
				else
					reportStock.setVendorName("");

				if (row[6] != null)
					reportStock.setPurRate(row[6].toString());
				else
					reportStock.setPurRate("0");

				reportStocks.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportStocks;
	}

	/******
	 * @author :BILAL
	 * @Date :03-03-2018
	 * @Code :For getting purchase tax data
	 ********/
	@Autowired
	TaxService taxService;
	


	@Override
	public List<ReportPurchase> getpurchasetaxData(HttpServletRequest request, String fromDate, String toDate,
			int categoryId, int companyId, int productId, int vendortId, int unitId, String purtranstype) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {

			List<TaxMaster> lsttaxmaster = new ArrayList<TaxMaster>();
			lsttaxmaster = taxService.getgstList();
 
			String str = "select master.pur_id,master.pur_trans_type,master.pur_bill_no,master.pur_bill_date,master.pur_vat,master.pur_less,"
					+ " master.pur_tax_vat12 AS igstAmtmaster,master.pur_tax_vat5 AS gstAmountmaster,master.pur_gross_amt AS billamt,master.pur_net_amt AS netbillamtwithgst,vendor.vendor_name,vendoradd.vendor_state,vendoradd.vendor_gstn, "
					+ " ifnull((SELECT GROUP_CONCAT(pur_slave_amt SEPARATOR ', ')FROM pharma_purchase_slave slave WHERE slave.pur_slave_master_id = master.pur_id),0) AS purchaseAmt,"
					+ " ifnull((SELECT GROUP_CONCAT(pur_slave_purchase_rate SEPARATOR ', ')FROM pharma_purchase_slave slave WHERE slave.pur_slave_master_id = master.pur_id),0) AS purchaserwithgst,"
					+ " ifnull((SELECT GROUP_CONCAT(pur_slave_vat SEPARATOR ', ') FROM pharma_purchase_slave slave WHERE slave.pur_slave_master_id = master.pur_id),0) AS gstper,"
					+ " ifnull((SELECT GROUP_CONCAT(pur_igst SEPARATOR ', ') FROM pharma_purchase_slave slave WHERE slave.pur_slave_master_id = master.pur_id),0) AS igstper"
					+ " FROM pharma_purchase_master AS master INNER JOIN pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id INNER JOIN pharma_vendor_address vendoradd ON vendoradd.vAddrId = master.pur_vendor_add_id"
					+ " where  master.pur_delete_Flag='0' ";

			if (!fromDate.equals("0") && !toDate.equals("0")) {
				str = str + " and master.pur_bill_date between '" + fromDate + "' and '" + toDate + "' ";
			}

			if (vendortId > 0) {
				str = str + " and master.pur_vendor_id= " + vendortId;
			}

			if (unitId > 0) {
				str = str + " and master.unit_id= " + unitId;
			}

			if (!purtranstype.equals("3")) {
				str = str + " and  master.pur_trans_type= " + purtranstype;
			}

			str += " order by master.pur_id";

			query = sessionFactory.getCurrentSession().createSQLQuery(str);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setPurBillNo(row[2].toString());
				else
					reportPurchase.setPurBillNo("");

				if (row[3] != null)
					reportPurchase.setBillDate(row[3].toString());
				else
					reportPurchase.setBillDate("");

				if (row[4] != null)
					reportPurchase.setPurvatamt(Double.parseDouble(row[4].toString()));
				else
					reportPurchase.setPurvatamt(0.0);

				if (row[5] != null)
					reportPurchase.setTotalLess(Float.parseFloat(row[5].toString()));
				else
					reportPurchase.setTotalLess(0F);

				if (row[6] != null)
					reportPurchase.setIgstAmtmaster(Double.parseDouble(row[6].toString()));
				else
					reportPurchase.setIgstAmtmaster(0.0);

				if (row[7] != null)
					reportPurchase.setGstAmountmaster(Double.parseDouble(row[7].toString()));
				else
					reportPurchase.setGstAmountmaster(0.0);

				if (row[8] != null)
					reportPurchase.setBillamtmaster(Double.parseDouble(row[8].toString()));
				else
					reportPurchase.setBillamtmaster(0.0);

				if (row[9] != null)
					reportPurchase.setNetbillamtwithgst(Double.parseDouble(row[9].toString()));
				else
					reportPurchase.setNetbillamtwithgst(0.0);

				if (row[10] != null)
					reportPurchase.setVendorName(row[10].toString());
				else
					reportPurchase.setVendorName("");

				if (row[11] != null)
					reportPurchase.setVendorAddress(row[11].toString());
				else
					reportPurchase.setVendorAddress("");

				if (row[12] != null)
					reportPurchase.setVatTinNumber(row[12].toString());
				else
					reportPurchase.setVatTinNumber("");

				if (row[13] != null)
					reportPurchase.setAmount(row[13].toString());
				else
					reportPurchase.setAmount("0");

				if (row[14] != null)
					reportPurchase.setPurratewithgst(row[14].toString());
				else
					reportPurchase.setPurratewithgst("");

				if (row[15] != null) {
					reportPurchase.setGstperslave(row[15].toString());

				} else {
					reportPurchase.setGstperslave("");
				}

				if (row[16] != null)
					reportPurchase.setIgstperslave(row[16].toString());
				else
					reportPurchase.setIgstperslave("");

				String gstper = row[15].toString();
				String igstper = row[16].toString();
				String amount = row[13].toString();
				double gstamtmaster = Double.parseDouble(row[6].toString());
				String igstamtmaster = row[7].toString();

				// setting or getting first list of GST master
				List<GstDto> ltgst = new ArrayList<GstDto>();
				ltgst = getDataofslave(Integer.parseInt(row[0].toString()));

				List<Integer> ae = new ArrayList<Integer>();
				for (int ii = 0; ii < ltgst.size(); ii++) {
					int id = ltgst.get(ii).getTaxId();
					ae.add(id);
				}
				// getting second list of tax master without GST amount
				List<TaxMaster> ltgst2 = new ArrayList<TaxMaster>();
				ltgst2 = getDataofslavefromtax(ae);
				for (int ii = 0; ii < ltgst2.size(); ii++) {
					GstDto dtto = new GstDto();
					dtto.setTaxId(ltgst2.get(ii).getTaxId());

					dtto.setTaxRate(ltgst2.get(ii).getTaxRate());
					dtto.setTaxName(ltgst2.get(ii).getTaxName());
					dtto.setCess(0);
					dtto.setGstamt(0);
					dtto.setGstper(ltgst2.get(ii).getTaxRate());
					dtto.setIgstamt(0);
					dtto.setIgstper(0);
					dtto.setDiscountamt(0.0);
					dtto.setTotalamt(0.0);
					dtto.setTaxableamt(0.0);
					ltgst.add(dtto);
				}

				// sorting list in ascending order
				Collections.sort(ltgst, new Comparator<GstDto>() {
					public int compare(GstDto o1, GstDto o2) {
						return o1.getTaxId() - o2.getTaxId();
					}
				});

				reportPurchase.setLtgst(ltgst);

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	/******
	 * @author :BILAL
	 * @Date :04-03-2018
	 * @Code :For getting list of tax master not in grn master
	 ********/
	private List<TaxMaster> getDataofslavefromtax(List<Integer> ae) {

		List<TaxMaster> listTax = new ArrayList<TaxMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TaxMaster.class);
			criteria.add(Restrictions.eq("taxDeleteFlag", 0));
			// criteria.add(Restrictions.in("taxId", ae));

			criteria.add(Restrictions.not(Restrictions.in("taxId", ae)));
			listTax = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listTax;
	}

	/******
	 * @author :BILAL
	 * @Date :04-03-2018
	 * @Code :For getting purchase tax data slave
	 ********/
	private List<GstDto> getDataofslave(int purid) {
		List<GstDto> ltgst = new ArrayList<GstDto>();

		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT pur_slave_vat,pur_cess,pur_igst,sum(pur_gstamt),sum(pur_igstamt),pur_gstid,sum(pur_slave_amt)- SUM(pur_descountamt),sum(pur_descountamt),( SUM(pur_slave_amt) - SUM(pur_descountamt)  ) AS taxableamount FROM pharma_purchase_slave where pur_slave_master_id= "
							+ purid + " group by pur_gstid");

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				GstDto gstDto = new GstDto();
				if (row[0] != null)
					gstDto.setGstper(Double.parseDouble(row[0].toString()));
				else
					gstDto.setGstper(0.0);

				if (row[1] != null)
					gstDto.setCess(Double.parseDouble(row[1].toString()));
				else
					gstDto.setCess(0.0);

				if (row[2] != null)
					gstDto.setIgstper(Double.parseDouble(row[2].toString()));
				else
					gstDto.setIgstper(0.0);

				double igstper = Double.parseDouble(row[2].toString());
				if (igstper > 0) {
					gstDto.setGstper(igstper);
				}
				if (row[3] != null)
					gstDto.setGstamt(Double.parseDouble(row[3].toString()));
				else
					gstDto.setGstamt(0.0);

				if (row[4] != null)
					gstDto.setIgstamt(Double.parseDouble(row[4].toString()));
				else
					gstDto.setIgstamt(0.0);

				if (row[5] != null)
					gstDto.setTaxId(Integer.parseInt(row[5].toString()));
				else
					gstDto.setTaxId(0);

				if (row[6] != null)
					gstDto.setTotalamt(Double.parseDouble(row[6].toString()));
				else
					gstDto.setTotalamt(0.0);

				if (row[7] != null)
					gstDto.setDiscountamt(Double.parseDouble(row[7].toString()));
				else
					gstDto.setDiscountamt(0.0);

				if (row[8] != null)
					gstDto.setTaxableamt(Double.parseDouble(row[8].toString()));
				else
					gstDto.setTaxableamt(0.0);

				ltgst.add(gstDto);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ltgst;
	}

	/******
	 * @author :BILAL
	 * @Date :05-03-2018
	 * @Code :For purchase register report
	 ******/
	@Override
	public List<ReportPurchase> getpurreg(HttpServletRequest request, String fromDate, String toDate, int categoryId,
			int companyId, int productId, int vendortId, int unitId, String purtranstype) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {

			String str = "SELECT master.pur_id,master.pur_doc_id as lbtno,master.pur_bill_date,master.pur_bill_no,master.pur_gross_amt as amtwithooutgst,master.pur_net_amt  as amtwithgst,master.pur_trans_type,vendor.vendor_name "
					+ " FROM pharma_purchase_master master INNER JOIN pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id where  master.pur_delete_Flag='0' ";

			if (!fromDate.equals("0") && !toDate.equals("0")) {
				str = str + " and master.pur_bill_date between '" + fromDate + "' and '" + toDate + "' ";
			}

			if (vendortId > 0) {
				str = str + " and master.pur_vendor_id= " + vendortId;
			}

			if (unitId > 0) {
				str = str + " and master.unit_id= " + unitId;
			}

			if (!purtranstype.equals("3")) {
				str = str + " and  master.pur_trans_type= " + purtranstype;
			}

			str += " order by master.pur_id";

			query = sessionFactory.getCurrentSession().createSQLQuery(str);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setGrnNo(Integer.parseInt(row[0].toString()));
				else
					reportPurchase.setGrnNo(0);

				if (row[1] != null)
					reportPurchase.setVouNo(row[1].toString());
				else
					reportPurchase.setVouNo("");

				if (row[2] != null)
					reportPurchase.setBillDate(row[2].toString());
				else
					reportPurchase.setBillDate("");

				if (row[3] != null)
					reportPurchase.setPurBillNo(row[3].toString());
				else
					reportPurchase.setPurBillNo("");

				if (row[4] != null)
					reportPurchase.setBillamtmaster(Double.parseDouble(row[4].toString()));
				else
					reportPurchase.setBillamtmaster(0.0);

				if (row[5] != null)
					reportPurchase.setNetbillamtwithgst(Double.parseDouble(row[5].toString()));
				else
					reportPurchase.setNetbillamtwithgst(0.0);

				if (row[6] != null) {
					if (row[6].toString().equals("0"))
						reportPurchase.setType("Credit");
					else if (row[6].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[7] != null)
					reportPurchase.setVendorName(row[7].toString());
				else
					reportPurchase.setVendorName("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	/*******
	 * @author :BILAL
	 * @Date :06-03-2018
	 * @Code :For DebitNote or purchase return report
	 ******/
	@Override
	public List<ReportDebitNote> getpurreturn(HttpServletRequest request, String fromDate, String toDate,
			int categoryId, int companyId, int productId, int vendortId, int unitId, String purtranstype) {
		List<ReportDebitNote> reportPurchaseret = new ArrayList<ReportDebitNote>();
		SQLQuery query = null;

		try {

			String str = "SELECT master.debit_note_id,master.debit_note_doc_no AS lbtno,master.debit_note_date,master.debit_note_gross_amt AS amtwithooutgst,master.debit_note_net_amt AS amtwithgst,master.debit_note_narration,vendor.vendor_name "
					+ " FROM pharma_debit_note_master master inner join pharma_vendor_master vendor ON vendor.vendor_id = master.debit_note_vendor_id where debit_note_delete_flag=0 ";

			if (!fromDate.equals("0") && !toDate.equals("0")) {
				str = str + " and master.debit_note_date between '" + fromDate + "' and '" + toDate + "' ";
			}

			if (vendortId > 0) {
				str = str + " and master.debit_note_vendor_id= " + vendortId;
			}

			/*
			 * if (unitId > 0) { str= str + " and master.unit_id= "+ unitId; }
			 * 
			 * 
			 * if (! purtranstype.equals("3")) { str= str + " and  master.pur_trans_type= "+
			 * purtranstype; }
			 */

			query = sessionFactory.getCurrentSession().createSQLQuery(str);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportDebitNote reportPurchase = new ReportDebitNote();

				if (row[0] != null)
					reportPurchase.setDebitnotid(Integer.parseInt(row[0].toString()));
				else
					reportPurchase.setDebitnotid(0);

				if (row[1] != null)
					reportPurchase.setVocharNo(row[1].toString());
				else
					reportPurchase.setVocharNo("");

				if (row[2] != null)
					reportPurchase.setCreatedDate(row[2].toString());
				else
					reportPurchase.setCreatedDate("");

				if (row[3] != null)
					reportPurchase.setGrossamt(Double.parseDouble(row[3].toString()));
				else
					reportPurchase.setGrossamt(0.0);

				if (row[4] != null)
					reportPurchase.setNetamt(Double.parseDouble(row[4].toString()));
				else
					reportPurchase.setNetamt(0.0);

				if (row[5] != null)
					reportPurchase.setNaration(row[5].toString());
				else
					reportPurchase.setNaration("");

				if (row[6] != null)
					reportPurchase.setVendorName(row[6].toString());
				else
					reportPurchase.setVendorName("");

				reportPurchaseret.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchaseret;
	}

	/*******
	 * @author :BILAL
	 * @date :07-03-2018
	 * @code :For getting sale tax data from 3 sales *
	 *******/
	@Override
	public List<ReportProductWiseBatchSale> getsaletaxData(HttpServletRequest request, String from, String to,
			int productId, int unitId, String type, int patientId) {
		List<ReportProductWiseBatchSale> reportProductWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String str = "", str0 = "", str1 = "", str2 = "", sale = "";

		if (type.equalsIgnoreCase("patient") || type.equalsIgnoreCase("all")) {
			str0 = "select p_master.patient_sales_bill_id,p_master.patient_bill_date AS dates, CONCAT(IFNULL(p1.f_name, ''),' ',IFNULL(p1.m_name, ''),' ',IFNULL(p1.l_name, '')) AS pname,p_master.patient_sales_bill_net_amt,p_master.patient_sales_bill_gross_amt,IF(p_master.patient_bill_mode = 0,'Cash','Credit') AS pmode, IFNULL(p_master.patient_sales_bill_cd, 0)As cdper,IFNULL(p_master.patient_sales_bill_cd_amt, 0)As cdamt,t.opdipdno, "
					+ " IFNULL((SELECT state_name FROM state WHERE idstate = p1.state_id),'-') AS state, IFNULL((select sum(slave.patient_slave_vatAmt) from pharma_patient_sales_bill_slave slave  where slave.patient_slave_bill_master_id=  p_master.patient_sales_bill_id ),0) As gstamt "
					+ " FROM pharma_patient_sales_bill_master p_master INNER JOIN ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id INNER JOIN "
					+ " ehat_treatment t ON p1.patient_id = t.patient_id WHERE p_master.patient_sales_bill_delete_flag = 0 ";
			if (!from.equals("0") && !to.equals("0")) {
				str0 = str0 + " and p_master.patient_bill_date between '" + from + "' and '" + to + "' ";
			}

			if (patientId > 0) {
				str0 = str0 + " and p1.patient_id = " + patientId;
			}

			if (unitId > 0) {
				str0 = str0 + " and p_master.unit_id = " + unitId;
			}

			str0 = str0 + " group by    p_master.patient_sales_bill_id";
		}

		if (type.equalsIgnoreCase("counter") || type.equalsIgnoreCase("all")) {
			str1 = "SELECT  p_master.counter_sale_id, p_master.counter_sale_for_date AS dates,ifnull(counter_sale_patient_name,'-') AS pname, p_master.counter_sale_net_amt,p_master.counter_sale_gross_amt,IF(p_master.counter_sale_trans_type = 0,'Cash','Credit') AS pmode,ifnull(p_master.counter_sale_cd,0)AS cdper,ifnull(p_master.counter_sale_cd_amt,0)AS cdamt,ifnull(p_master.ipdopdno,'-') AS ipdopdno, "
					+ " IFNULL((SELECT state_name FROM state WHERE idstate = 1),'-') AS state, IFNULL((select sum( p_slave.counter_slave_vat) from pharma_counter_sale_slave p_slave where p_slave.counter_slave_master_id=  p_master.counter_sale_id ),0) As gstamt "
					+ " FROM pharma_counter_sale_master p_master WHERE p_master.counter_sale_delete_flag = 0 ";

			if (!from.equals("0") && !to.equals("0")) {
				str1 = str1 + " and  p_master.counter_sale_for_date between '" + from + "' and '" + to + "' ";
			}

			if (unitId > 0) {
				str1 = str1 + " and p_master.unit_id = " + unitId;
			}

		}

		if (type.equalsIgnoreCase("indent") || type.equalsIgnoreCase("all")) {
			str2 = "SELECT  p_master.indent_sale_id,indent_sale_received_date AS dates,CONCAT(IFNULL(p1.f_name, ''),' ',IFNULL(p1.m_name, ''),' ',IFNULL(p1.l_name, '')) As pname,p_master.indent_sale_net_amt, p_master.indent_sale_gross_amt, IF(p_master.indent_sale_type = 0,'Cash','Credit') AS pmode,IFNULL(indent_sale_cd, 0),    IFNULL(indent_sale_cd_amt, 0),t.opdipdno, "
					+ " IFNULL((SELECT state_name FROM state WHERE idstate = p1.state_id),'-') AS state,IFNULL((select sum(p_slave.indent_slave_vat) from pharma_indent_sale_slave p_slave where p_slave.indent_sale_slave_master_id = p_master.indent_sale_id ),0) As gstamt "
					+ " FROM pharma_indent_sale_master p_master INNER JOIN pharma_indent_master i ON i.indent_id = p_master.indent_sale_indent_no  INNER JOIN "
					+ " ehat_treatment t ON t.treatment_id = i.indent_treatement_id INNER JOIN ehat_patient p1 ON p1.patient_id = t.patient_id WHERE p_master.indent_sale_delete_flag = 0 ";
			if (!from.equals("0") && !to.equals("0")) {
				str2 = str2 + " and  p_master.indent_sale_received_date between '" + from + "' and '" + to + "' ";
			}

			if (patientId > 0) {
				str2 = str2 + " and p1.patient_id = " + patientId;
			}

			if (unitId > 0) {
				str2 = str2 + " and p_master.unit_id = " + unitId;
			}

			str2 = str2 + " group by    p_master.indent_sale_id";
		}

		int i = 0;
		if (type.equalsIgnoreCase("patient")) {
			str = str0;
			sale = "PS-";
		}
		if (type.equalsIgnoreCase("counter")) {
			str = str1;
			sale = "CS-";
		}
		if (type.equalsIgnoreCase("indent")) {
			str = str2;
			sale = "IS-";
		}
		if (type.equalsIgnoreCase("all"))
			for (i = 0; i < 3; i++)
				try {
					if (i == 0) {
						str = str0;
						sale = "PS-";
					} else if (i == 1) {
						str = str1;
						sale = "CS-";
					} else if (i == 2) {
						str = str2;
						sale = "IS-";
					}
					query = sessionFactory.getCurrentSession().createSQLQuery(str);

					@SuppressWarnings("unchecked")
					List<Object[]> rows = query.list();
					for (Object[] row : rows) {

						ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

						if (row[0] != null)
							reportProductWiseBatchSale.setReceiptNo(sale + row[0].toString());
						else
							reportProductWiseBatchSale.setReceiptNo("");

						if (row[1] != null)
							reportProductWiseBatchSale.setDate(row[1].toString());
						else
							reportProductWiseBatchSale.setDate("");

						if (row[2] != null)
							reportProductWiseBatchSale.setPatientName(row[2].toString());
						else
							reportProductWiseBatchSale.setPatientName("");

						if (row[3] != null)
							reportProductWiseBatchSale.setNetAmt(Double.parseDouble(row[3].toString()));
						else
							reportProductWiseBatchSale.setNetAmt(0.0);

						if (row[4] != null)
							reportProductWiseBatchSale.setGrossAmt(Double.parseDouble(row[4].toString()));
						else
							reportProductWiseBatchSale.setGrossAmt(0.0);

						if (row[5] != null)
							reportProductWiseBatchSale.setType(row[5].toString());
						else
							reportProductWiseBatchSale.setType("");

						if (row[6] != null)
							reportProductWiseBatchSale.setCdperc(Double.parseDouble(row[6].toString()));
						else
							reportProductWiseBatchSale.setCdperc(0.0);

						if (row[7] != null)
							reportProductWiseBatchSale.setCdamt(Double.parseDouble(row[7].toString()));
						else
							reportProductWiseBatchSale.setCdamt(0.0);

						if (row[8] != null)
							reportProductWiseBatchSale.setIpdopdno(row[8].toString());
						else
							reportProductWiseBatchSale.setIpdopdno("");

						if (row[9] != null)
							reportProductWiseBatchSale.setPatientState(row[9].toString());
						else
							reportProductWiseBatchSale.setPatientState("");

						if (row[10] != null)
							reportProductWiseBatchSale.setGstmasteramt(Double.parseDouble(row[10].toString()));
						else
							reportProductWiseBatchSale.setGstmasteramt(0.0);

						if (row[0] != null)
							reportProductWiseBatchSale.setVouNo(row[0].toString());
						else
							reportProductWiseBatchSale.setVouNo("");

						// setting or getting first list of GST master
						List<GstDto> ltgst = new ArrayList<GstDto>();
						ltgst = getsaletaxofslave(Integer.parseInt(row[0].toString()), type, i);

						List<Integer> ae = new ArrayList<Integer>();
						for (int ii = 0; ii < ltgst.size(); ii++) {
							int id = ltgst.get(ii).getTaxId();
							ae.add(id);
						}
						// getting second list of tax master without GST amount
						List<TaxMaster> ltgst2 = new ArrayList<TaxMaster>();
						ltgst2 = getDataofslavefromtax(ae);
						for (int ii = 0; ii < ltgst2.size(); ii++) {
							GstDto dtto = new GstDto();
							dtto.setTaxId(ltgst2.get(ii).getTaxId());

							dtto.setTaxRate(ltgst2.get(ii).getTaxRate());
							dtto.setTaxName(ltgst2.get(ii).getTaxName());
							dtto.setCess(0);
							dtto.setGstamt(0);
							dtto.setGstper(ltgst2.get(ii).getTaxRate());
							dtto.setIgstamt(0);
							dtto.setIgstper(0);
							dtto.setDiscountamt(0.0);
							dtto.setTotalamt(0.0);
							dtto.setTaxableamt(0.0);
							ltgst.add(dtto);
						}

						// sorting list in ascending order
						Collections.sort(ltgst, new Comparator<GstDto>() {
							public int compare(GstDto o1, GstDto o2) {
								return o1.getTaxId() - o2.getTaxId();
							}
						});

						reportProductWiseBatchSale.setLtgst(ltgst);

						reportProductWiseBatchSales.add(reportProductWiseBatchSale);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
		else
			try {

				query = sessionFactory.getCurrentSession().createSQLQuery(str);

				@SuppressWarnings("unchecked")
				List<Object[]> rows = query.list();
				for (Object[] row : rows) {

					ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

					if (row[0] != null)
						reportProductWiseBatchSale.setReceiptNo(sale + row[0].toString());
					else
						reportProductWiseBatchSale.setReceiptNo("");

					if (row[1] != null)
						reportProductWiseBatchSale.setDate(row[1].toString());
					else
						reportProductWiseBatchSale.setDate("");

					if (row[2] != null)
						reportProductWiseBatchSale.setPatientName(row[2].toString());
					else
						reportProductWiseBatchSale.setPatientName("");

					if (row[3] != null)
						reportProductWiseBatchSale.setNetAmt(Double.parseDouble(row[3].toString()));
					else
						reportProductWiseBatchSale.setNetAmt(0.0);

					if (row[4] != null)
						reportProductWiseBatchSale.setGrossAmt(Double.parseDouble(row[4].toString()));
					else
						reportProductWiseBatchSale.setGrossAmt(0.0);

					if (row[5] != null)
						reportProductWiseBatchSale.setType(row[5].toString());
					else
						reportProductWiseBatchSale.setType("");

					if (row[6] != null)
						reportProductWiseBatchSale.setCdperc(Double.parseDouble(row[6].toString()));
					else
						reportProductWiseBatchSale.setCdperc(0.0);

					if (row[7] != null)
						reportProductWiseBatchSale.setCdamt(Double.parseDouble(row[7].toString()));
					else
						reportProductWiseBatchSale.setCdamt(0.0);

					if (row[8] != null)
						reportProductWiseBatchSale.setIpdopdno(row[8].toString());
					else
						reportProductWiseBatchSale.setIpdopdno("");

					if (row[9] != null)
						reportProductWiseBatchSale.setPatientState(row[9].toString());
					else
						reportProductWiseBatchSale.setPatientState("");

					if (row[10] != null)
						reportProductWiseBatchSale.setGstmasteramt(Double.parseDouble(row[10].toString()));
					else
						reportProductWiseBatchSale.setGstmasteramt(0.0);

					if (row[0] != null)
						reportProductWiseBatchSale.setVouNo(row[0].toString());
					else
						reportProductWiseBatchSale.setVouNo("");
					int looplength = -1;

					// setting or getting first list of GST master
					List<GstDto> ltgst = new ArrayList<GstDto>();
					ltgst = getsaletaxofslave(Integer.parseInt(row[0].toString()), type, looplength);

					List<Integer> ae = new ArrayList<Integer>();
					for (int ii = 0; ii < ltgst.size(); ii++) {
						int id = ltgst.get(ii).getTaxId();
						ae.add(id);
					}
					// getting second list of tax master without GST amount
					List<TaxMaster> ltgst2 = new ArrayList<TaxMaster>();
					ltgst2 = getDataofslavefromtax(ae);

					for (int ii = 0; ii < ltgst2.size(); ii++) {
						GstDto dtto = new GstDto();
						dtto.setTaxId(ltgst2.get(ii).getTaxId());

						dtto.setTaxRate(ltgst2.get(ii).getTaxRate());
						dtto.setTaxName(ltgst2.get(ii).getTaxName());
						dtto.setCess(0);
						dtto.setGstamt(0);
						dtto.setGstper(ltgst2.get(ii).getTaxRate());
						dtto.setIgstamt(0);
						dtto.setIgstper(0);
						dtto.setDiscountamt(0.0);
						dtto.setTotalamt(0.0);
						dtto.setTaxableamt(0.0);
						ltgst.add(dtto);
					}

					// sorting list in ascending order
					Collections.sort(ltgst, new Comparator<GstDto>() {

	public int compare(GstDto o1, GstDto o2) {
		return o1.getTaxId() - o2.getTaxId();
	}});

	reportProductWiseBatchSale.setLtgst(ltgst);

	reportProductWiseBatchSales.add(reportProductWiseBatchSale);}}catch(

	Exception e)
	{
		e.printStackTrace();
	}return reportProductWiseBatchSales;
	}

	/*******
	 * @author :BILAL
	 * @date :07-03-2018
	 * @code :For getting sale tax data from 3 sales of slave *
	 *******/
	private List<GstDto> getsaletaxofslave(int masterid, String type, int looplength) {
		List<GstDto> ltgst = new ArrayList<GstDto>();

		SQLQuery query = null;
		String str = "", str0 = "", str1 = "", str2 = "", sale = "";
		try {

			if (type.equalsIgnoreCase("patient") || type.equalsIgnoreCase("all")) {
				str0 = "SELECT patient_slave_vat,patient_slave_vat_id,SUM(patient_slave_vatAmt),SUM(patient_slave_amt) As minusdisc,patient_slave_disc,(SUM(patient_slave_amt) -SUM(patient_slave_vatAmt)) AS taxableamount "
						+ " ,(sum(patient_slave_rate	* patient_slave_qty)/patient_slave_unit) as billamt ,(sum(patient_slave_rate	* patient_slave_qty)/patient_slave_unit) - SUM(patient_slave_amt) as disamt"
						+ " FROM  pharma_patient_sales_bill_slave WHERE patient_slave_bill_master_id = " + masterid
						+ " GROUP BY patient_slave_vat_id ";

			}

			if (type.equalsIgnoreCase("counter") || type.equalsIgnoreCase("all")) {
				str1 = "SELECT counter_slave_vat,counter_slave_vat_id,SUM(counter_slave_vatAmt),SUM(counter_slave_amt) As minusdisc, "
						+ " counter_slave_disc,SUM(counter_slave_amt) -SUM(counter_slave_vatAmt) AS taxableamount, "
						+ " (sum(counter_slave_rate	* counter_slave_qty)/counter_slave_unit) as billamt ,"
						+ " (sum(counter_slave_rate	* counter_slave_qty)/counter_slave_unit) - SUM(counter_slave_amt) as disamt "
						+ " FROM pharma_counter_sale_slave WHERE counter_slave_master_id = " + masterid
						+ " GROUP BY counter_slave_vat_id ";

			}

			if (type.equalsIgnoreCase("indent") || type.equalsIgnoreCase("all")) {
				str2 = "SELECT indent_slave_vat,indent_slave_vat_id,SUM(indent_slave_vatAmt),SUM(indent_sale_slave_amt) AS minusdisc, "
						+ " indent_slave_Dis,SUM(indent_sale_slave_amt) - SUM(indent_slave_vatAmt) AS taxableamount, "
						+ " (sum(indent_sale_slave_rate	* indent_sale_slave_qty)/indent_slave_unit) as billamt ,"
						+ " (sum(indent_sale_slave_rate	* indent_sale_slave_qty)/indent_slave_unit) - SUM(indent_sale_slave_amt) as disamt "
						+ " FROM pharma_indent_sale_slave WHERE indent_sale_slave_master_id = " + masterid
						+ " GROUP BY indent_slave_vat_id ";

			}

			if (type.equalsIgnoreCase("patient")) {
				str = str0;

			}
			if (type.equalsIgnoreCase("counter")) {
				str = str1;

			}
			if (type.equalsIgnoreCase("indent")) {
				str = str2;

			}

			if (type.equalsIgnoreCase("all")) {
				if (looplength == 0) {
					str = str0;

				} else if (looplength == 1) {
					str = str1;

				} else if (looplength == 2) {
					str = str2;

				}

			}

			query = sessionFactory.getCurrentSession().createSQLQuery(str);
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				GstDto gstDto = new GstDto();
				if (row[0] != null)
					gstDto.setGstper(Double.parseDouble(row[0].toString()));
				else
					gstDto.setGstper(0.0);

				if (row[1] != null)
					gstDto.setTaxId(Integer.parseInt(row[1].toString()));
				else
					gstDto.setTaxId(0);

				if (row[2] != null)
					gstDto.setGstamt(Double.parseDouble(row[2].toString()));
				else
					gstDto.setGstamt(0.0);

				if (row[3] != null)
					gstDto.setTotalamt(Double.parseDouble(row[3].toString()));
				else
					gstDto.setTotalamt(0.0);

				if (row[4] != null)
					gstDto.setDiscountper(Double.parseDouble(row[4].toString()));
				else
					gstDto.setDiscountper(0.0);

				if (row[5] != null)
					gstDto.setTaxableamt(Double.parseDouble(row[5].toString()));
				else
					gstDto.setTaxableamt(0.0);

				if (row[6] != null)
					gstDto.setTotalamt(Double.parseDouble(row[6].toString()));
				else
					gstDto.setTotalamt(0.0);

				if (row[7] != null)
					gstDto.setDiscountamt(Double.parseDouble(row[7].toString()));
				else
					gstDto.setDiscountamt(0.0);

				//
				if (row[1] != null)
					gstDto.setTaxRate(Integer.parseInt(row[1].toString()));
				else
					gstDto.setTaxRate(0);

				if (row[1] != null)
					gstDto.setTaxName(row[1].toString());

				gstDto.setCess(0);
				gstDto.setIgstamt(0);
				gstDto.setIgstper(0);

				ltgst.add(gstDto);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ltgst;
	}

	/*****
	 * @author :Parikshit
	 * @Date :08-03-2018
	 * @Code :For sale Register report
	 ****/
	@Override
	public List<ReportProductWiseBatchSale> getAllSaleRegisterReport(HttpServletRequest request, String from, String to,
			int productId, int unitId, String type, int patientId) {
		List<ReportProductWiseBatchSale> reportProductWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String str = "", str0 = "", str1 = "", str2 = "", sale = "";

		if (type.equalsIgnoreCase("patient") || type.equalsIgnoreCase("all")) {
			str0 = " SELECT     p_master.patient_bill_date as dates,    p_master.patient_sales_bill_id,    concat(ifnull(p1.f_name, ''),            ' ',            ifnull(p1.m_name, ''),            ' ',            ifnull(p1.l_name, '')) as pname,    p_master.patient_sales_bill_net_amt,    if(p_master.patient_bill_mode = 0,        'Cash',        'Credit') as pmode,    u.User_Name,    if(p_master.patient_sale_user_id = 0,        'Self',        (select                category_name            from                ehat_charges_master_slave            where                id = p_master.patient_sale_user_id)) as sponser FROM    pharma_patient_sales_bill_master p_master        inner join    ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id        left join    users u ON u.User_ID = p_master.patient_sale_user_id where    p_master.patient_sales_bill_delete_flag = 0";

			if (!from.equals("0") && !to.equals("0")) {
				str0 = str0 + " and p_master.patient_bill_date between '" + from + "' and '" + to + "' ";
			}

			if (patientId > 0) {
				str0 = str0 + " and p1.patient_id = " + patientId;
			}

			if (productId > 0) {
				str0 = str0 + " and p_slave.patient_slave_product_id = " + productId;
			}

			if (unitId > 0) {
				str0 = str0 + " and p_master.unit_id = " + unitId;
			}
		}

		if (type.equalsIgnoreCase("counter") || type.equalsIgnoreCase("all")) {
			str1 = "SELECT     p_master.counter_sale_for_date as dates,    p_master.counter_sale_id,    p_master.counter_sale_patient_name,    p_master.counter_sale_net_amt,    if(p_master.counter_sale_trans_type = 0,        'Cash',        'Credit') as pmode,    u.User_Name,if(p_master.counter_sale_id=0,'','Self') FROM    pharma_counter_sale_master p_master        left join    users u ON u.User_ID = p_master.counter_sale_user_id where    p_master.counter_sale_delete_flag = 0";

			if (!from.equals("0") && !to.equals("0")) {
				str1 = str1 + " and  p_master.counter_sale_for_date between '" + from + "' and '" + to + "' ";
			}

			if (productId > 0) {
				str1 = str1 + " and p_slave.counter_slave_product_id = " + productId;
			}

			if (unitId > 0) {
				str1 = str1 + " and p_master.unit_id = " + unitId;
			}

		}

		if (type.equalsIgnoreCase("indent") || type.equalsIgnoreCase("all")) {
			str2 = "SELECT     indent_sale_received_date as dates,    p_master.indent_sale_id,    concat(ifnull(p1.f_name, ''),            ' ',            ifnull(p1.m_name, ''),            ' ',            ifnull(p1.l_name, '')) as pname,    p_master.indent_sale_net_amt,    if(p_master.indent_sale_type = 0,        'Cash',        'Credit') as pmode,    u.User_Name,    ifnull((select                    category_name                from                    ehat_charges_master_slave                where                    id = e.charges_master_slave_id),            'Self') as sponser FROM    pharma_indent_sale_master p_master        inner join    pharma_indent_master i ON i.indent_id = p_master.indent_sale_indent_no        left join    ehat_treatment t ON t.treatment_id = i.indent_treatement_id        left join    ehat_patient p1 ON p1.patient_id = t.patient_id        left join    ehat_bill_master e ON e.treatment_id = t.treatment_id        left join    users u ON u.User_ID = p_master.indent_sale_user_id where    p_master.indent_sale_delete_flag = 0 ";

			if (!from.equals("0") && !to.equals("0")) {
				str2 = str2 + " and  p_master.indent_sale_received_date between '" + from + "' and '" + to + "' ";
			}

			if (patientId > 0) {
				str2 = str2 + " and p1.patient_id = " + patientId;
			}

			if (productId > 0) {
				str2 = str2 + " and p_slave.indent_sale_slave_product_id = " + productId;
			}

			if (unitId > 0) {
				str2 = str2 + " and p_master.unit_id = " + unitId;
			}
		}

		int i = 0;
		if (type.equalsIgnoreCase("patient")) {
			str = str0;
			sale = "PS-";
		}
		if (type.equalsIgnoreCase("counter")) {
			str = str1;
			sale = "CS-";
		}
		if (type.equalsIgnoreCase("indent")) {
			str = str2;
			sale = "IS-";
		}
		if (type.equalsIgnoreCase("all"))
			for (i = 0; i < 3; i++)
				try {
					if (i == 0) {
						str = str0;
						sale = "PS-";
					} else if (i == 1) {
						str = str1;
						sale = "CS-";
					} else if (i == 2) {
						str = str2;
						sale = "IS-";
					}
					query = sessionFactory.getCurrentSession().createSQLQuery(str);

					@SuppressWarnings("unchecked")
					List<Object[]> rows = query.list();
					for (Object[] row : rows) {

						ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

						if (row[0] != null)
							reportProductWiseBatchSale.setDate(row[0].toString());
						else
							reportProductWiseBatchSale.setDate("");

						if (row[1] != null)
							reportProductWiseBatchSale.setReceiptNo(sale + row[1].toString());
						else
							reportProductWiseBatchSale.setReceiptNo("");

						if (row[2] != null)
							reportProductWiseBatchSale.setPatientName(row[2].toString());
						else
							reportProductWiseBatchSale.setPatientName("");

						if (row[3] != null)
							reportProductWiseBatchSale.setNetAmt(Double.parseDouble(row[3].toString()));
						else
							reportProductWiseBatchSale.setNetAmt(0.0);

						if (row[4] != null)
							reportProductWiseBatchSale.setType(row[4].toString());
						else
							reportProductWiseBatchSale.setType("");

						if (row[5] != null)
							reportProductWiseBatchSale.setUnit(row[5].toString());// for user
						else
							reportProductWiseBatchSale.setUnit("");

						if (row[6] != null)
							reportProductWiseBatchSale.setDrugName(row[6].toString());// for company
						else
							reportProductWiseBatchSale.setDrugName("");

						reportProductWiseBatchSales.add(reportProductWiseBatchSale);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
		else
			try {

				query = sessionFactory.getCurrentSession().createSQLQuery(str);

				@SuppressWarnings("unchecked")
				List<Object[]> rows = query.list();
				for (Object[] row : rows) {

					ReportProductWiseBatchSale reportProductWiseBatchSale = new ReportProductWiseBatchSale();

					if (row[0] != null)
						reportProductWiseBatchSale.setDate(row[0].toString());
					else
						reportProductWiseBatchSale.setDate("");

					if (row[1] != null)
						reportProductWiseBatchSale.setReceiptNo(sale + row[1].toString());
					else
						reportProductWiseBatchSale.setReceiptNo("");

					if (row[2] != null)
						reportProductWiseBatchSale.setPatientName(row[2].toString());
					else
						reportProductWiseBatchSale.setPatientName("");

					if (row[3] != null)
						reportProductWiseBatchSale.setNetAmt(Double.parseDouble(row[3].toString()));
					else
						reportProductWiseBatchSale.setNetAmt(0.0);

					if (row[4] != null)
						reportProductWiseBatchSale.setType(row[4].toString());
					else
						reportProductWiseBatchSale.setType("");

					if (row[5] != null)
						reportProductWiseBatchSale.setUnit(row[5].toString());// for user
					else
						reportProductWiseBatchSale.setUnit("");

					if (row[6] != null)
						reportProductWiseBatchSale.setDrugName(row[6].toString());// for company
					else
						reportProductWiseBatchSale.setDrugName("");

					reportProductWiseBatchSales.add(reportProductWiseBatchSale);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		return reportProductWiseBatchSales;
	}

	@Override
	public List<ReportExpiry> getDateWiseStock(String fromDate, int productId) {
		List<ReportExpiry> list = new ArrayList<ReportExpiry>();
		SQLQuery query = null;
		try {
			String str = "SELECT p.product_name, IF ((SUM(s.stock_in) - ((SUM(s.stock_out))) + ((SELECT SUM(psb.patient_sale_slave_issue_qty) FROM pharma_patient_sales_bill_slave psb LEFT JOIN pharma_patient_sales_bill_master pbm ON psb.patient_slave_bill_master_id = pbm.patient_sales_bill_id WHERE psb.patient_slave_product_id =  "+productId+"  AND pbm.patient_bill_date <= '"+ fromDate + "') ))< 0,0, (SUM(s.stock_in) - ((SUM(s.stock_out)) + (SELECT SUM(psb.patient_sale_slave_issue_qty) FROM pharma_patient_sales_bill_slave psb LEFT JOIN pharma_patient_sales_bill_master pbm ON psb.patient_slave_bill_master_id = pbm.patient_sales_bill_id WHERE psb.patient_slave_product_id = "+productId+" AND pbm.patient_bill_date <= '"+ fromDate + "')))) AS stock, IF((SUM(s.stock_in) -( (SUM(s.stock_out))  + (SELECT    SUM(psb.patient_sale_slave_issue_qty) FROM   pharma_patient_sales_bill_slave psb LEFT JOIN pharma_patient_sales_bill_master pbm ON psb.patient_slave_bill_master_id = pbm.patient_sales_bill_id  WHERE   psb.patient_slave_product_id =  "+productId+"   AND pbm.patient_bill_date <= '"+ fromDate + "'))) > 0,(SUM(s.stock_in * s.pur_rate) - SUM(s.stock_out * s.pur_rate)),0) AS amt,IFNULL((SELECT pur_rate FROM stock_master_slave WHERE (trans_type = 'GRN' || trans_type = 'OpeninStock') AND delete_flag = 0 AND product_id = s.product_id AND operation_date <= '"+ fromDate + "' ORDER BY stock_master_slave_id DESC LIMIT 1),0) AS pur_rate FROM stock_master_slave s JOIN pharma_product_master p ON p.product_id = s.product_id  WHERE s.delete_flag = 0 AND s.operation_date <= '"+ fromDate + "' AND s.product_id = "+productId+ " "; 
               
			if (productId > 0)
				str += " and s.product_id =" + productId;
			else
				str += " group by s.product_id";

			query = sessionFactory.getCurrentSession().createSQLQuery(str);   
        
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				ReportExpiry reportPurchase = new ReportExpiry();

				if (row[0] != null)
					reportPurchase.setProductName(row[0].toString());
				else
					reportPurchase.setProductName("");

				if (row[1] != null)
					reportPurchase.setStock(row[1].toString());
				else
					reportPurchase.setStock("");

				if (row[2] != null)
					reportPurchase.setProductCompany(row[2].toString());// as amt
				else
					reportPurchase.setProductCompany("");

				if (row[3] != null)
					reportPurchase.setCompanyId(row[3].toString());// as rate
				else
					reportPurchase.setCompanyId("");

				list.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<ReportPurchase> getDateWiseStock(HttpServletRequest request, String fromDate, String toDate) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {

			String str = "select     master.debit_note_id,    master.debit_note_date,    slave.debit_note_slave_batch_code,    vendor.vendor_name,    slave.debit_note_slave_qty,    slave.debit_note_slave_rate,    slave.debit_note_slave_amt,    slave.debit_note_slave_gst,    produ.product_name,    slave.debit_note_slave_batch_expiry,    master.debit_note_less,    produ.product_hsn,    vendoradd.vendor_state,    vendoradd.vendor_gstn from    pharma_debit_note_slave slave        inner join    pharma_debit_note_master master ON slave.debit_note_slave_master_id = master.debit_note_id        inner join    pharma_vendor_master vendor ON vendor.vendor_id = master.debit_note_vendor_id        inner join    pharma_product_master produ ON produ.product_id = slave.debit_note_slave_product_id        inner join    pharma_vendor_address vendoradd ON vendoradd.vAddrId = master.pur_vendor_add_id where    master.debit_note_delete_flag = '0' ";

			if (!fromDate.equals("0") && !toDate.equals("0")) {
				str = str + " and master.debit_note_date between '" + fromDate + "' and '" + toDate + "' ";
			}

			/*
			 * if (productId > 0) { str= str + " and slave.pur_slave_product_id= "+
			 * productId; } if (vendortId > 0) { str= str + " and master.pur_vendor_id= "+
			 * vendortId; }
			 * 
			 * if (unitId > 0) { str= str + " and master.unit_id= "+ unitId; }
			 * 
			 * if (categoryId > 0) { str= str + " and cat.cat_id= "+ categoryId; }
			 * 
			 * if (companyId > 0) { str= str + " and comp.comp_id= "+ companyId; }
			 * 
			 * if (! purtranstype.equals("3")) { str= str + " and  master.pur_trans_type= "+
			 * purtranstype; }
			 */

			str += " order by master.debit_note_id";

			query = sessionFactory.getCurrentSession().createSQLQuery(str);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					reportPurchase.setBillDate(row[1].toString());
				} else
					reportPurchase.setBillDate("");

				if (row[2] != null)
					reportPurchase.setBatchCode(row[2].toString());
				else
					reportPurchase.setBatchCode("");

				if (row[3] != null)
					reportPurchase.setVendorName(row[3].toString());
				else
					reportPurchase.setVendorName("");

				if (row[4] != null)
					reportPurchase.setQty(row[4].toString());
				else
					reportPurchase.setQty("");

				if (row[5] != null)
					reportPurchase.setRate(row[5].toString());
				else
					reportPurchase.setRate("");

				if (row[6] != null)
					reportPurchase.setAmount(row[6].toString());
				else
					reportPurchase.setAmount("");

				if (row[7] != null)
					reportPurchase.setGstamt((Double) row[7]);
				else
					reportPurchase.setGstamt(0.0);

				if (row[8] != null)
					reportPurchase.setProductName(row[8].toString());
				else
					reportPurchase.setProductName("");

				if (row[9] != null)
					reportPurchase.setExpiryDate(row[9].toString());
				else
					reportPurchase.setExpiryDate("");

				if (row[10] != null)
					reportPurchase.setTotalLess(Float.parseFloat(row[10].toString()));
				else
					reportPurchase.setTotalLess(0F);

				if (row[11] != null)
					reportPurchase.setHsncode(row[11].toString());
				else
					reportPurchase.setHsncode("0");

				if (row[12] != null)
					reportPurchase.setVendorAddress(row[12].toString());
				else
					reportPurchase.setVendorAddress("");

				if (row[13] != null)
					reportPurchase.setVatTinNumber(row[13].toString());
				else
					reportPurchase.setVatTinNumber("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	/****
	 * @author :Manisha
	 * @Date :17-01-2019
	 * @Code :GRN Report
	 *****/

	@Override
	public List<ReportPurchase> getGRNReportdata(String from, String to) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT     master.pur_id,    vendor.vendor_name,    master.pur_bill_no,    master.pur_bill_date,    master.pur_gross_amt,    master.pur_item_disc,    master.pur_vat,    master.pur_add,    master.pur_less,    master.pur_trans_type,    master.pur_net_amt , user.User_Name, master.purchase_date_time FROM    pharma_purchase_master master        INNER JOIN    pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id  INNER JOIN  users user ON master.created_by = user.User_ID WHERE    master.pur_delete_flag = '0'  AND pur_bill_date BETWEEN '"
							+ from + "' AND '" + to + "'"
							+ " ORDER BY master.pur_bill_date desc, master.purchase_date_time desc ");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setProductId(row[0].toString());
				else
					reportPurchase.setProductId("");

				if (row[1] != null)
					reportPurchase.setVendorName(row[1].toString());
				else
					reportPurchase.setVendorName("");

				if (row[2] != null)
					reportPurchase.setProductPack(row[2].toString());
				else
					reportPurchase.setProductPack("");

				if (row[3] != null)
					reportPurchase.setProductCompany(row[3].toString());
				else
					reportPurchase.setProductCompany("");

				if (row[4] != null)
					reportPurchase.setProductName(row[4].toString());
				else
					reportPurchase.setProductName("");

				if (row[5] != null)
					reportPurchase.setQty(row[5].toString());
				else
					reportPurchase.setQty("");

				if (row[6] != null)
					reportPurchase.setMrp(row[6].toString());
				else
					reportPurchase.setMrp("");

				if (row[7] != null)
					reportPurchase.setAmount(row[7].toString());
				else
					reportPurchase.setAmount("");

				if (row[8] != null)
					reportPurchase.setBillDate(row[8].toString());
				else
					reportPurchase.setBillDate("");

				if (row[10] != null)
					reportPurchase.setVouNo(row[10].toString());
				else
					reportPurchase.setVouNo("");

				if (row[11] != null)
					reportPurchase.setMadeBy(row[11].toString());
				else
					reportPurchase.setMadeBy("");

				if (row[12] != null) {
					String DateTime = row[12].toString();
					Date date = null;
					String output = null;
					DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					DateFormat outputformat = new SimpleDateFormat("HH:mm:ss");
					date = df.parse(DateTime);
					output = outputformat.format(date);

					reportPurchase.setPurchaseDateTime(output);
				} else
					reportPurchase.setPurchaseDateTime("");

				if (row[9] != null) {
					if (row[9].toString().equals("0"))
						reportPurchase.setType("Credit");
					else if (row[9].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	@Override
	public List<ReportPurchase> getPartyWisePurchaseByPartyIddetail(String from, String to, String vendorId,
			String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select  master.pur_id, master.pur_trans_type,master.pur_bill_date,vendor.vendor_name, master.pur_bill_no, master.purchase_date_time, master.pur_net_amt,us.User_Name"
							+ " from  pharma_purchase_master master inner join pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id"
							+ " inner join users us ON us.User_ID = master.created_by where    vendor.vendor_id ='"
							+ vendorId + "'" + " and master.pur_delete_flag='0' and pur_bill_date between '" + from
							+ "' and '" + to + "' order by master.purchase_date_time desc");
			System.out.println("sql======" + query);
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setVouNo(row[0].toString());
				else
					reportPurchase.setVouNo("");

				if (row[1] != null) {
					if (row[1].toString().equals("0"))
						reportPurchase.setType("cash/Credit");
					else if (row[1].toString().equals("1"))
						reportPurchase.setType("Cash");
					else
						reportPurchase.setType("Card");
				} else
					reportPurchase.setType("");

				if (row[2] != null)
					reportPurchase.setBillDate(row[2].toString());
				else
					reportPurchase.setBillDate("");

				if (row[3] != null)
					reportPurchase.setVendorName(row[3].toString());
				else
					reportPurchase.setVendorName("");

				if (row[4] != null)
					reportPurchase.setCompanyId(row[4].toString());
				else
					reportPurchase.setCompanyId("");
				if (row[5] != null)
					reportPurchase.setCd(row[5].toString());
				else
					reportPurchase.setCd("");
				if (row[6] != null)
					reportPurchase.setTotalamtpm(Double.parseDouble(row[6].toString()));
				else
					reportPurchase.setTotalamtpm(0.0);
				if (row[7] != null)
					reportPurchase.setMadeBy(row[7].toString());
				else
					reportPurchase.setMadeBy("");
				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

	/************
	 * @author : Ajay Khandare
	 * @date : 06-feb-2019
	 * @code :get bill wise Sale report list
	 ***********/
 
	@Override
	public List<PatientSaleBillSlave> billwiseSaleReportList(Integer patientId, Integer userId, Integer doctorId,
			String saletype, String from, String to) {
		List<PatientSaleBillSlave> reportPatientWiseSalesListReturn = new ArrayList<PatientSaleBillSlave>();
		SQLQuery query = null;

		try {
			if (saletype.equalsIgnoreCase("patient")) {

			query = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT  p_master.patient_sales_bill_id,concat(p1.f_name,' ',p1.m_name,' ',p1.l_name) AS patient_name,p_master.patient_bill_patient_id,product.product_name,p_master.patient_bill_date,p_master.patient_sale_for_time, p_slave.patient_slave_amt AS TotalAmt,p_slave.patient_sale_slave_disc_amt,p_slave.patient_sale_slave_rec_amt, IF(p_slave.patient_sale_slave_rem_amt > 0,p_slave.patient_sale_slave_rem_amt,'0') as patient_sale_slave_rem_amt,p_master.patient_sales_bill_narration, u.User_Name "
								+ "FROM pharma_product_master product inner JOIN pharma_patient_sales_bill_slave p_slave ON product.product_id = p_slave.patient_slave_product_id "
								+ " inner join pharma_patient_sales_bill_master p_master ON p_slave.patient_slave_bill_master_id = p_master.patient_sales_bill_id "
								+ "inner join ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id  inner join users u ON u.User_ID = p_master.patient_sale_user_id where p1.patient_id = '"
								+ patientId + "' and p_master.patient_bill_date between'" + from + "' and '" + to
								+ "' order by p_master.patient_bill_date desc, p_master.patient_sale_for_time desc");
								

				
			
			} else if (saletype.equalsIgnoreCase("user")) {

				query = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT  p_master.patient_sales_bill_id,concat(p1.f_name,' ',p1.m_name,' ',p1.l_name) AS patient_name,p_master.patient_bill_patient_id,product.product_name,p_master.patient_bill_date,p_master.patient_sale_for_time, p_slave.patient_slave_amt AS TotalAmt,p_slave.patient_sale_slave_disc_amt,p_slave.patient_sale_slave_rec_amt,IF(p_slave.patient_sale_slave_rem_amt > 0,p_slave.patient_sale_slave_rem_amt,'0') as patient_sale_slave_rem_amt,p_master.patient_sales_bill_narration,u.User_Name "
								+ "FROM pharma_product_master product inner JOIN pharma_patient_sales_bill_slave p_slave ON product.product_id = p_slave.patient_slave_product_id "
								+ " inner join pharma_patient_sales_bill_master p_master ON p_slave.patient_slave_bill_master_id = p_master.patient_sales_bill_id "
								+ "inner join ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id  inner join users u ON u.User_ID = p_master.patient_sale_user_id where   p_master.patient_sale_user_id = '"
								+ userId + "' and p_master.patient_bill_date between'" + from + "' and '" + to
								+ "' order by p_master.patient_bill_date desc, p_master.patient_sale_for_time desc");
								
				
			} else if (saletype.equalsIgnoreCase("doctor"))

			{
				
				query = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT  p_master.patient_sales_bill_id,concat(p1.f_name,' ',p1.m_name,' ',p1.l_name) AS patient_name,p_master.patient_bill_patient_id,product.product_name,p_master.patient_bill_date,p_master.patient_sale_for_time, p_slave.patient_slave_amt AS TotalAmt,p_slave.patient_sale_slave_disc_amt,p_slave.patient_sale_slave_rec_amt,IF(p_slave.patient_sale_slave_rem_amt > 0,p_slave.patient_sale_slave_rem_amt,'0') as patient_sale_slave_rem_amt,p_master.patient_sales_bill_narration,u.User_Name "
								+ "FROM pharma_product_master product inner JOIN pharma_patient_sales_bill_slave p_slave ON product.product_id = p_slave.patient_slave_product_id "
								+ " inner join pharma_patient_sales_bill_master p_master ON p_slave.patient_slave_bill_master_id = p_master.patient_sales_bill_id "
								+ "inner join ehat_patient p1 ON p1.patient_id = p_master.patient_bill_patient_id  inner join doctor d on d.Doctor_ID = p_master.patient_bill_doctor_id   inner join users u ON u.User_ID = p_master.patient_sale_user_id  where   p_master.patient_bill_doctor_id = '"
								+ doctorId + "' and p_master.patient_bill_date between'" + from + "' and '" + to
								+ "' order by p_master.patient_bill_date desc, p_master.patient_sale_for_time desc");

				
			}

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				PatientSaleBillSlave reportPatientWiseSaleReturn = new PatientSaleBillSlave();

				if (row[0] != null)
					reportPatientWiseSaleReturn.setPatientSaleBillId(Integer.parseInt(row[0].toString()));
				else
					reportPatientWiseSaleReturn.setPatientSaleBillId(0);

				if (row[1] != null)
					reportPatientWiseSaleReturn.setPatientName((row[1].toString()));
				else
					reportPatientWiseSaleReturn.setPatientName("-");

				if (row[2] != null)
					reportPatientWiseSaleReturn.setPatientId(Integer.parseInt(row[2].toString()));
				else
					reportPatientWiseSaleReturn.setPatientId(0);

				if (row[3] != null)
					reportPatientWiseSaleReturn.setProductName((row[3].toString()));

				else
					reportPatientWiseSaleReturn.setProductName("-");

				if (row[4] != null)
					reportPatientWiseSaleReturn.setPatientBillDate((row[4].toString()));
				else
					reportPatientWiseSaleReturn.setPatientBillDate("-");

				if (row[5] != null)
					reportPatientWiseSaleReturn.setPatientSaleForTime((row[5].toString()));
				else
					reportPatientWiseSaleReturn.setPatientSaleForTime("-");

				if (row[6] != null)
					reportPatientWiseSaleReturn.setPatientSlaveAmt(Double.parseDouble(row[6].toString()));
				else
					reportPatientWiseSaleReturn.setPatientSlaveAmt(0.0);

				if (row[7] != null)
					reportPatientWiseSaleReturn.setPatientSaleSlaveDiscAmt(Double.parseDouble(row[7].toString()));
				else
					reportPatientWiseSaleReturn.setPatientSaleSlaveDiscAmt(0.0);

				if (row[8] != null)
					reportPatientWiseSaleReturn.setPatientSaleSlaveRecAmt(Double.parseDouble(row[8].toString()));
				else
					reportPatientWiseSaleReturn.setPatientSaleSlaveRecAmt(0.0);

				if (row[9] != null)
					reportPatientWiseSaleReturn.setPatientSaleSlaveRemAmt(Double.parseDouble(row[9].toString()));
				else
					reportPatientWiseSaleReturn.setPatientSaleSlaveRemAmt(0.0);

				if (row[10] != null)
					reportPatientWiseSaleReturn.setSalesBillNarration((row[10].toString()));
				else
					reportPatientWiseSaleReturn.setSalesBillNarration("-");

				if (row[11] != null)
					reportPatientWiseSaleReturn.setSaleUserName(row[11].toString());
				else
					reportPatientWiseSaleReturn.setSaleUserName("-");

				/*
				 * if (row[12] != null) reportPatientWiseSaleReturn.setUserReturn
				 * (row[12].toString()); else reportPatientWiseSaleReturn.setUserReturn("-");
				 */

				reportPatientWiseSalesListReturn.add(reportPatientWiseSaleReturn);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		System.err.println("reportPatientWiseSalesListReturn====" + reportPatientWiseSalesListReturn.size());
		return reportPatientWiseSalesListReturn;
	}

	@Override
	public List<PatientSaleBillSlave> billwiseSaleReportReturnList(Integer patientId, Integer userId, String saletype,
			String from, String to) {
		List<PatientSaleBillSlave> reportBillWiseSalesListReturn = new ArrayList<PatientSaleBillSlave>();
		SQLQuery query = null;

		try {
			if (saletype.equalsIgnoreCase("patient")) {

				query = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT c_master.credit_note_patientSaleId,concat(p1.f_name,' ', p1.m_name,' ', p1.l_name) AS patient_name, c_master.credit_note_patientId, product.product_name, c_master.credit_note_date, c_master.credit_note_time, c_slave.credit_note_slave_amt AS ReturnAmt, c_master.credit_note_narration,   u.User_Name"
								+ " FROM pharma_product_master product inner JOIN pharma_credit_note_slave c_slave ON product.product_id = c_slave.credit_note_slave_product_id "
								+ " inner join pharma_credit_note_master c_master ON c_slave.credit_note_slave_master_id = c_master.credit_note_id "
								+ "  inner join ehat_patient p1 ON p1.patient_id = c_master.credit_note_patientId inner join users u ON u.User_ID = c_master.credit_note_user_id where p1.patient_id = '"
								+ patientId + "'and c_master.credit_note_date between'" + from + "' and '" + to + "'");
			} else if (saletype.equalsIgnoreCase("user")) {

				query = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT c_master.credit_note_patientSaleId,concat(p1.f_name,' ', p1.m_name,' ', p1.l_name) AS patient_name,c_master.credit_note_patientId, product.product_name,c_master.credit_note_date,c_master.credit_note_time,c_slave.credit_note_slave_amt AS ReturnAmt,c_master.credit_note_narration,u.User_Name"
								+ " FROM pharma_product_master product inner JOIN pharma_credit_note_slave c_slave ON product.product_id = c_slave.credit_note_slave_product_id "
								+ " inner join pharma_credit_note_master c_master ON c_slave.credit_note_slave_master_id = c_master.credit_note_id "
								+ "  inner join ehat_patient p1 ON p1.patient_id = c_master.credit_note_patientId inner join users u ON u.User_ID = c_master.credit_note_user_id where u.User_ID = '"
								+ userId + "'and c_master.credit_note_date between'" + from + "' and '" + to + "'");
			}
			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				PatientSaleBillSlave reportBillWiseSaleReturn = new PatientSaleBillSlave();

				if (row[0] != null)
					reportBillWiseSaleReturn.setPatientSaleBillId(Integer.parseInt(row[0].toString()));
				else
					reportBillWiseSaleReturn.setPatientSaleBillId(0);

				if (row[1] != null)
					reportBillWiseSaleReturn.setPatientName((row[1].toString()));
				else
					reportBillWiseSaleReturn.setPatientName("-");

				if (row[2] != null)
					reportBillWiseSaleReturn.setPatientId(Integer.parseInt(row[2].toString()));
				else
					reportBillWiseSaleReturn.setPatientId(0);

				if (row[3] != null)
					reportBillWiseSaleReturn.setProductName((row[3].toString()));

				else
					reportBillWiseSaleReturn.setProductName("-");

				if (row[4] != null)
					reportBillWiseSaleReturn.setPatientBillDate((row[4].toString()));
				else
					reportBillWiseSaleReturn.setPatientBillDate("-");

				if (row[5] != null)
					reportBillWiseSaleReturn.setPatientSaleForTime((row[5].toString()));
				else
					reportBillWiseSaleReturn.setPatientSaleForTime("-");

				if (row[6] != null)
					reportBillWiseSaleReturn.setPatientSlaveAmt(Double.parseDouble(row[6].toString()));
				else
					reportBillWiseSaleReturn.setPatientSlaveAmt(0.0);

				if (row[10] != null)
					reportBillWiseSaleReturn.setSalesBillNarration((row[10].toString()));
				else
					reportBillWiseSaleReturn.setSalesBillNarration("-");

				if (row[11] != null)
					reportBillWiseSaleReturn.setSaleUserName(row[11].toString());
				else
					reportBillWiseSaleReturn.setSaleUserName("-");

				if (row[12] != null)
					reportBillWiseSaleReturn.setCreditReturn(row[12].toString());
				else
					reportBillWiseSaleReturn.setCreditReturn("-");

				reportBillWiseSalesListReturn.add(reportBillWiseSaleReturn);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportBillWiseSalesListReturn;
	}

	@Override
	public List<Users> fetchuser(String patiename, String callfrom) {

		SQLQuery sql = null;
		List<Users> listuser = new ArrayList<Users>();
		List<Users> listuser1 = new ArrayList<Users>();

		try {

			if (callfrom.equals("onload")) {
				sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT User_ID,User_Name  FROM " + " users ");
			} else {
				sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT User_ID,User_Name  FROM "
						+ " users where  user_name like '" + patiename + "%' limit 10");
			} /* status= 'Y'and */

			System.err.println("User===========" + sql);
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listuser2 = sql.list();
			String docName = "";
			for (Map<String, Object> rs1 : listuser2) {
				Users dto = new Users();
				dto.setUser_ID((Integer) rs1.get("User_ID"));
				dto.setUser_Name((String) rs1.get("User_Name"));
				listuser1.add(dto);
			}

		} catch (Exception e) {
			e.printStackTrace();

		}
		return listuser1;
	}

	@Override
	public List<DoctorList> fetchDoctor(String doctorname, String callfrom) {
		SQLQuery sql = null;

		List<DoctorList> listDoctor1 = new ArrayList<DoctorList>();

		try {

			if (callfrom.equals("onload")) {
				sql = sessionFactory.getCurrentSession()
						.createSQLQuery("SELECT Doctor_ID,doc_name  FROM " + " doctor ");
			} else {

				sql = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT Doctor_ID,doc_name  FROM " + " doctor where  doc_name like '%" + doctorname + "%' ");
			} /* status= 'Y' and */
			System.err.println("Doctor===========" + sql);
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listDoctor2 = sql.list();
			String docName = "";
			for (Map<String, Object> rs1 : listDoctor2) {
				DoctorList dto = new DoctorList();
				dto.setDocId((Integer) rs1.get("Doctor_ID"));
				// dto.setDocId((Integer) rs1.get("User_ID"));
				dto.setStatus((String) rs1.get("doc_name"));
				listDoctor1.add(dto);

			}

		} catch (Exception e) {
			e.printStackTrace();

		}
		return listDoctor1;
	}

	// jitendra
	@Override
	public List<DistrictwisePatientCountDTO> fetchDistrictwisePatientCountReportList(String year, String month) {
		SQLQuery sql = null;

		List<DistrictwisePatientCountDTO> lDistrictwisePatientCountDTOs = new ArrayList<DistrictwisePatientCountDTO>();

		try {

			SQLQuery sqlDistrict = null;

			Integer totalMonthlyOPD = new Integer(0);
			Integer totalMonthlyIPD = new Integer(0);
			Integer totalPrograssiveOPD = new Integer(0);
			Integer totalPrograssiveIPD = new Integer(0);

			HashMap<String, Integer> districtIDList = new HashMap<String, Integer>();

			sqlDistrict = sessionFactory.getCurrentSession().createSQLQuery("SELECT * FROM district where status='Y'");
			System.err.println(sqlDistrict);

			sqlDistrict.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listDistrict = sqlDistrict.list();
			for (Map<String, Object> rs1 : listDistrict) {
				if (((String) rs1.get("dis_name")).equalsIgnoreCase("Amravati")) {
					districtIDList.put("Amravati", (Integer) rs1.get("iddistrict"));
				} else if (((String) rs1.get("dis_name")).equalsIgnoreCase("Akola")) {
					districtIDList.put("Akola", (Integer) rs1.get("iddistrict"));
				} else if (((String) rs1.get("dis_name")).equalsIgnoreCase("Buldhana")) {
					districtIDList.put("Buldhana", (Integer) rs1.get("iddistrict"));
				} else if (((String) rs1.get("dis_name")).equalsIgnoreCase("Washim")) {
					districtIDList.put("Washim", (Integer) rs1.get("iddistrict"));
				} else if (((String) rs1.get("dis_name")).equalsIgnoreCase("Yavatmal")) {
					districtIDList.put("Yavatmal", (Integer) rs1.get("iddistrict"));
				}
				// objDistrictwisePatientCountDTO.setMonthlyIPD((Integer)
				// rs1.get("ipdMonthly"));

			}
			districtIDList.put("Other", 0);
			districtIDList.put("Total", 0);

			for (int i = 0; i < districtIDList.size(); i++) {
				DistrictwisePatientCountDTO objDistrictwisePatientCountDTO = new DistrictwisePatientCountDTO();
				int sequenceWiseDistrictID = 0;

				if (i == 0) {
					Object value = districtIDList.get("Amravati");
					sequenceWiseDistrictID = Integer.parseInt(value.toString());
					objDistrictwisePatientCountDTO.setDistrictName("Amravati");
				} else if (i == 1) {
					Object value = districtIDList.get("Akola");
					sequenceWiseDistrictID = Integer.parseInt(value.toString());
					objDistrictwisePatientCountDTO.setDistrictName("Akola");
				} else if (i == 2) {
					Object value = districtIDList.get("Washim");
					sequenceWiseDistrictID = Integer.parseInt(value.toString());
					objDistrictwisePatientCountDTO.setDistrictName("Washim");
				} else if (i == 3) {
					Object value = districtIDList.get("Yavatmal");
					sequenceWiseDistrictID = Integer.parseInt(value.toString());
					objDistrictwisePatientCountDTO.setDistrictName("Yavatmal");
				} else if (i == 4) {
					Object value = districtIDList.get("Buldhana");
					sequenceWiseDistrictID = Integer.parseInt(value.toString());
					objDistrictwisePatientCountDTO.setDistrictName("Buldhana");
				} else if (i == 5) {
					Object value = districtIDList.get("Other");
					sequenceWiseDistrictID = Integer.parseInt(value.toString());
					objDistrictwisePatientCountDTO.setDistrictName("Other");
				} else if (i == 6) {
					Object value = districtIDList.get("Total");
					sequenceWiseDistrictID = Integer.parseInt(value.toString());
					objDistrictwisePatientCountDTO.setDistrictName("Total");
				}

				// monthly OPD and IPD
				if (i != 5 && i != 6) {
					sql = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT COUNT(if(department_id = 1,1,null)) as opdMonthly, COUNT(if(department_id = 2,1,null)) as ipdMonthly"
									+ " FROM patient_records_details where district_id=" + sequenceWiseDistrictID
									+ " and MONTH(created_date_time) = " + month + " AND YEAR(created_date_time) = "
									+ year);
					System.err.println(sql);

					sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listDistrictwisePatientCount = sql.list();
					for (Map<String, Object> rs1 : listDistrictwisePatientCount) {
						objDistrictwisePatientCountDTO.setMonthlyOPD(((BigInteger) rs1.get("opdMonthly")).intValue());
						objDistrictwisePatientCountDTO.setMonthlyIPD(((BigInteger) rs1.get("ipdMonthly")).intValue());
						totalMonthlyOPD = totalMonthlyOPD + ((BigInteger) rs1.get("opdMonthly")).intValue();
						totalMonthlyIPD = totalMonthlyIPD + ((BigInteger) rs1.get("ipdMonthly")).intValue();
					}
				} else if (i == 5) {

					sql = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT COUNT(if(department_id = 1, 1, null)) as opdMonthlyOther,COUNT(if(department_id = 2, 1, null)) as ipdMonthlyOther"
									+ " FROM patient_records_details where district_id NOT IN ("
									+ Integer.parseInt(districtIDList.get("Amravati").toString()) + ","
									+ Integer.parseInt(districtIDList.get("Akola").toString()) + ","
									+ Integer.parseInt(districtIDList.get("Washim").toString()) + ","
									+ Integer.parseInt(districtIDList.get("Yavatmal").toString()) + ","
									+ Integer.parseInt(districtIDList.get("Buldhana").toString()) + ") and "
									+ "MONTH(created_date_time) = " + month + " AND YEAR(created_date_time) =" + year);
					System.err.println(sql);

					sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listDistrictwisePatientCount = sql.list();
					for (Map<String, Object> rs1 : listDistrictwisePatientCount) {
						objDistrictwisePatientCountDTO
								.setMonthlyOPD(((BigInteger) rs1.get("opdMonthlyOther")).intValue());
						objDistrictwisePatientCountDTO
								.setMonthlyIPD(((BigInteger) rs1.get("ipdMonthlyOther")).intValue());
						totalMonthlyOPD = totalMonthlyOPD + ((BigInteger) rs1.get("opdMonthlyOther")).intValue();
						totalMonthlyIPD = totalMonthlyIPD + ((BigInteger) rs1.get("ipdMonthlyOther")).intValue();
					}

				} else if (i == 6) {
					objDistrictwisePatientCountDTO.setMonthlyOPD(totalMonthlyOPD);
					objDistrictwisePatientCountDTO.setMonthlyIPD(totalMonthlyIPD);
				}

				// Prograssive OPD and IPD
				if (i != 5 && i != 6) {
					Integer tempPrograssiveOPD = new Integer(0);
					Integer tempPrograssiveIPD = new Integer(0);
					if (Integer.parseInt(month) >= 4) {

						sql = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT COUNT(if(department_id = 1,1,null)) as opdYearwise,COUNT(if(department_id = 2,1,null)) as ipdYearwise FROM patient_records_details"
										+ " where  district_id=" + sequenceWiseDistrictID
										+ " and date(created_date_time) >= concat(" + year
										+ ",'-04-01') and date(created_date_time) <= concat(" + year + ",'-" + month
										+ "-31')");
						// System.err.println(sql+"SSSSSSSSSSSSSSSSSSSSSSSSSS");

						sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listDistrictwisePatientCountYearly = sql.list();
						for (Map<String, Object> rs1 : listDistrictwisePatientCountYearly) {

							objDistrictwisePatientCountDTO
									.setProgressiveOPD(((BigInteger) rs1.get("opdYearwise")).intValue());
							objDistrictwisePatientCountDTO
									.setProgressiveIPD(((BigInteger) rs1.get("ipdYearwise")).intValue());
							totalPrograssiveOPD = totalPrograssiveOPD
									+ ((BigInteger) rs1.get("opdYearwise")).intValue();
							totalPrograssiveIPD = totalPrograssiveIPD
									+ ((BigInteger) rs1.get("ipdYearwise")).intValue();
						}
					} else if (Integer.parseInt(month) <= 3) {
						int tempYear = Integer.parseInt(year) - 1;
						sql = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT COUNT(if(department_id = 1,1,null)) as opdYearwise,COUNT(if(department_id = 2,1,null)) as ipdYearwise FROM patient_records_details"
										+ " where  district_id=" + sequenceWiseDistrictID
										+ " and date(created_date_time) >= concat(" + tempYear
										+ ",'-04-01') and date(created_date_time) <= concat(" + tempYear
										+ ",'-12-31')");
						System.err.println(sql);

						sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listDistrictwisePatientCountYearly = sql.list();
						for (Map<String, Object> rs1 : listDistrictwisePatientCountYearly) {

							/*
							 * objDistrictwisePatientCountDTO.setProgressiveOPD(((BigInteger)
							 * rs1.get("opdYearwise")).intValue());
							 * objDistrictwisePatientCountDTO.setProgressiveIPD(((BigInteger)
							 * rs1.get("ipdYearwise")).intValue());
							 */
							tempPrograssiveOPD = tempPrograssiveOPD + ((BigInteger) rs1.get("opdYearwise")).intValue();
							tempPrograssiveIPD = tempPrograssiveIPD + ((BigInteger) rs1.get("ipdYearwise")).intValue();
						}

						SQLQuery sql1 = null;

						sql1 = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT COUNT(if(department_id = 1,1,null)) as opdYearwise,COUNT(if(department_id = 2,1,null)) as ipdYearwise FROM patient_records_details"
										+ " where  district_id=" + sequenceWiseDistrictID
										+ " and date(created_date_time) >= concat(" + year
										+ ",'-01-01') and date(created_date_time) <= concat(" + year + ",'-" + month
										+ "-31')");
						System.err.println(sql1);

						sql1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listDistrictwisePatientCountYearly1 = sql1.list();
						for (Map<String, Object> rs1 : listDistrictwisePatientCountYearly1) {

							tempPrograssiveOPD = tempPrograssiveOPD + ((BigInteger) rs1.get("opdYearwise")).intValue();
							tempPrograssiveIPD = tempPrograssiveIPD + ((BigInteger) rs1.get("ipdYearwise")).intValue();
							objDistrictwisePatientCountDTO.setProgressiveOPD(tempPrograssiveOPD);
							objDistrictwisePatientCountDTO.setProgressiveIPD(tempPrograssiveIPD);
							totalPrograssiveOPD = totalPrograssiveOPD + tempPrograssiveOPD;
							totalPrograssiveIPD = totalPrograssiveIPD + tempPrograssiveIPD;
						}

					}

				} else if (i == 5) {
					Integer tempPrograssiveOPD = new Integer(0);
					Integer tempPrograssiveIPD = new Integer(0);

					if (Integer.parseInt(month) >= 4) {

						sql = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT COUNT(if(department_id = 1,1,null)) as opdYearwise,COUNT(if(department_id = 2,1,null)) as ipdYearwise FROM patient_records_details"
										+ " where  district_id NOT IN ("
										+ Integer.parseInt(districtIDList.get("Amravati").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Akola").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Washim").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Yavatmal").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Buldhana").toString())
										+ ") and date(created_date_time) >= concat(" + year
										+ ",'-04-01') and date(created_date_time) <= concat(" + year + ",'-" + month
										+ "-31')");
						System.err.println(sql);

						sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listDistrictwisePatientCountYearly = sql.list();
						for (Map<String, Object> rs1 : listDistrictwisePatientCountYearly) {

							objDistrictwisePatientCountDTO
									.setProgressiveOPD(((BigInteger) rs1.get("opdYearwise")).intValue());
							objDistrictwisePatientCountDTO
									.setProgressiveIPD(((BigInteger) rs1.get("ipdYearwise")).intValue());
							totalPrograssiveOPD = totalPrograssiveOPD
									+ ((BigInteger) rs1.get("opdYearwise")).intValue();
							totalPrograssiveIPD = totalPrograssiveIPD
									+ ((BigInteger) rs1.get("ipdYearwise")).intValue();
						}
					} else if (Integer.parseInt(month) <= 3) {
						int tempYear = Integer.parseInt(year) - 1;
						sql = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT COUNT(if(department_id = 1,1,null)) as opdYearwise,COUNT(if(department_id = 2,1,null)) as ipdYearwise FROM patient_records_details"
										+ " where  district_id NOT IN ("
										+ Integer.parseInt(districtIDList.get("Amravati").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Akola").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Washim").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Yavatmal").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Buldhana").toString())
										+ ")  and date(created_date_time) >= concat(" + tempYear
										+ ",'-04-01') and date(created_date_time) <= concat(" + tempYear
										+ ",'-12-31')");
						System.err.println(sql);

						sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listDistrictwisePatientCountYearly = sql.list();
						for (Map<String, Object> rs1 : listDistrictwisePatientCountYearly) {

							/*
							 * objDistrictwisePatientCountDTO.setProgressiveOPD(((BigInteger)
							 * rs1.get("opdYearwise")).intValue());
							 * objDistrictwisePatientCountDTO.setProgressiveIPD(((BigInteger)
							 * rs1.get("ipdYearwise")).intValue());
							 */
							tempPrograssiveOPD = tempPrograssiveOPD + ((BigInteger) rs1.get("opdYearwise")).intValue();
							tempPrograssiveIPD = tempPrograssiveIPD + ((BigInteger) rs1.get("ipdYearwise")).intValue();
						}

						SQLQuery sql1 = null;

						sql1 = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT COUNT(if(department_id = 1,1,null)) as opdYearwise,COUNT(if(department_id = 2,1,null)) as ipdYearwise FROM patient_records_details"
										+ " where district_id NOT IN ("
										+ Integer.parseInt(districtIDList.get("Amravati").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Akola").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Washim").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Yavatmal").toString()) + ","
										+ Integer.parseInt(districtIDList.get("Buldhana").toString())
										+ ")  and date(created_date_time) >= concat(" + year
										+ ",'-01-01') and date(created_date_time) <= concat(" + year + ",'-" + month
										+ "-31')");
						System.err.println(sql1);

						sql1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listDistrictwisePatientCountYearly1 = sql1.list();
						for (Map<String, Object> rs1 : listDistrictwisePatientCountYearly1) {

							tempPrograssiveOPD = tempPrograssiveOPD + ((BigInteger) rs1.get("opdYearwise")).intValue();
							tempPrograssiveIPD = tempPrograssiveIPD + ((BigInteger) rs1.get("ipdYearwise")).intValue();
							objDistrictwisePatientCountDTO.setProgressiveOPD(tempPrograssiveOPD);
							objDistrictwisePatientCountDTO.setProgressiveIPD(tempPrograssiveIPD);
							totalPrograssiveOPD = totalPrograssiveOPD + tempPrograssiveOPD;
							totalPrograssiveIPD = totalPrograssiveIPD + tempPrograssiveIPD;
						}

					}

				} else if (i == 6) {
					objDistrictwisePatientCountDTO.setProgressiveOPD(totalPrograssiveOPD);
					objDistrictwisePatientCountDTO.setProgressiveIPD(totalPrograssiveIPD);

				}

				/*
				 * objDistrictwisePatientCountDTO.setMonthlyOPD(
				 * fetchMonthlyDistrictwisePatientCount(3,1,year,month));
				 * objDistrictwisePatientCountDTO.setMonthlyIPD(
				 * fetchMonthlyDistrictwisePatientCount(3,2,year,month));
				 */

				lDistrictwisePatientCountDTOs.add(objDistrictwisePatientCountDTO);
				// objDistrictwisePatientCountDTO.setlDistrictwisePatientCountDTOs(lDistrictwisePatientCountDTOs);
			}

		} catch (Exception e) {
			e.printStackTrace();

		}
		return lDistrictwisePatientCountDTOs;
	}

	// jitendra
	public Integer fetchMonthlyDistrictwisePatientCount(int districtId, int departmentId, String year, String month) {
		SQLQuery sql = null;
		sql = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT COUNT(treatment_id) FROM patient_records_details " + "where district_id="
						+ districtId + "and department_id =" + departmentId + " and MONTH(created_date_time) = " + month
						+ " AND YEAR(created_date_time) =" + year + "");
		System.err.println(sql);
		List l = sql.list();
		return (Integer) l.get(0);
	}

	// jitendra
	public Integer fetchProgressiveDistrictwisePatientCount(int districtId, int departmentId, String year,
			String month) {
		Integer totalPatientCount = new Integer(0);
		int tempMonth = Integer.parseInt(month);
		if (tempMonth >= 4) {

		} else {

		}

		SQLQuery sql = null;
		sql = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT COUNT(treatment_id) FROM patient_records_details " + "where district_id="
						+ districtId + "and department_id =" + departmentId + " and MONTH(created_date_time) = " + month
						+ " AND YEAR(created_date_time) =" + year + "");
		System.err.println(sql);
		List l = sql.list();
		return (Integer) l.get(0);
	}

	// Added by Akshata
	@Override
	public List<ReportExpiry> getNearExpiryReport(String from, String to, String callform, Integer compId,
			Integer shelfId) {
		List<ReportExpiry> reportExpiries = new ArrayList<ReportExpiry>();
		Query query = null;
		
	
		
		if (callform.equals("all")) {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"CALL sp_get_product_expiry_by_expdate_and_batch_id(:batch_exp_date_timestamp, :p_batch_id)");
			query.setParameter("batch_exp_date_timestamp", from);
			query.setParameter("p_batch_id", null);
		} else if (callform.equals("companyWise")) {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"CALL sp_get_product_expiry_by_expdate_and_company(:batch_exp_date_timestamp, :p_company_id)");
			query.setParameter("batch_exp_date_timestamp", from);
			query.setParameter("p_company_id", compId);
		} else if (callform.equals("shelfWise")) {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"CALL sp_get_product_expiry_by_expdate_and_shelf_id(:batch_exp_date_timestamp, :p_shelf_id)");
			query.setParameter("batch_exp_date_timestamp", from);
			query.setParameter("p_shelf_id", shelfId);

		} else {
			query = sessionFactory.getCurrentSession()
					.createSQLQuery("CALL sp_get_expired_product_till_date_by_expdate(:batch_exp_date_timestamp)");
			query.setParameter("batch_exp_date_timestamp", from);

		}
		List<Object[]> queryResult = query.list();

		for (Object[] aRow : queryResult) {
			ReportExpiry reportExpiry = new ReportExpiry();

			reportExpiry.setBat_id((Integer) aRow[0]);
			reportExpiry.setBatchCode((String) aRow[1]);
			reportExpiry.setBatchExpiry((String) aRow[2]);
			reportExpiry.setProductName((String) aRow[3]);
			reportExpiry.setCurrent_stock((Integer) aRow[4]);

			reportExpiries.add(reportExpiry);
		}
		

	    
		return reportExpiries;
	}

	@Override
	public List<ReportStock> geCurrentStockReport(String from, String to, String callform, int userData,
			String storeName,HttpServletResponse response) throws IOException {
		DecimalFormat df = new DecimalFormat("0.00");
		List<ReportStock> reports = new ArrayList<ReportStock>();
		String queryString = null;
		Query query;
		if (callform.equals("ProductWise")) {
			queryString = " select product.product_name,shelf.shelf_name,product.product_uom_unit,pack.pack_type, batch.batch_code,batch.batch_exp_date, pur_rate.mrp, pur_rate.rate,stock.stock_qty_in_hand,pur_rate.pur_rate,cat.cat_name from pharma_purchase_slave pur_slave"
					+ "  inner join pharma_purchase_master master on master.pur_id=pur_slave.pur_slave_master_id inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id"
					+ " inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id  inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id"
					+ " inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id INNER JOIN  pharma_company_master comp ON comp.comp_id = product.product_comp_id INNER JOIN pharma_category_master cat ON cat.cat_id = product.product_cat_id"
					+ " where batch.batch_delete_flag = 0 and product.product_id = '" + userData
					+ "'  and stock.stock_qty_in_hand!='0' and master.pur_delete_flag='0' order by batch_exp_date desc";

		} else if (callform.equals("CompanyWise")) {
			queryString = "select product.product_name,shelf.shelf_name,product.product_uom_unit,pack.pack_type, batch.batch_code,batch.batch_exp_date, pur_rate.mrp, pur_rate.rate,stock.stock_qty_in_hand,pur_rate.pur_rate,cat.cat_name from pharma_purchase_slave pur_slave  inner join pharma_purchase_master master on master.pur_id=pur_slave.pur_slave_master_id"
					+ " inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id  inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id"
					+ " inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id"
					+ " inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id INNER JOIN pharma_category_master cat ON cat.cat_id = product.product_cat_id"
					+ " where batch.batch_delete_flag = 0 and comp.comp_id='" + userData
					+ "' and master.pur_delete_flag='0'  and stock.stock_qty_in_hand!='0'  order by product.product_name asc ";
		} else if (callform.equals("ShelfWise")) {
			queryString = "select product.product_name,shelf.shelf_name,product.product_uom_unit,pack.pack_type,comp.comp_name, batch.batch_code,batch.batch_exp_date,  pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,pur_rate.pur_rate,cat.cat_name from pharma_purchase_slave pur_slave  inner join pharma_purchase_master master on master.pur_id=pur_slave.pur_slave_master_id "
					+ " inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id "
					+ " inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id "
					+ " inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id INNER JOIN  pharma_company_master comp ON comp.comp_id = product.product_comp_id INNER JOIN  pharma_category_master cat ON cat.cat_id = product.product_cat_id"
					+ " where batch.batch_delete_flag = 0 and shelf.shelf_id='" + userData
					+ "' and master.pur_delete_flag='0' and stock.stock_qty_in_hand!='0' order by batch_exp_date desc ";

		} else if (callform.equals("CategoryWise")) {
			queryString = " select product.product_name,shelf.shelf_name,product.product_uom_unit,pack.pack_type,comp.comp_name, batch.batch_code,batch.batch_exp_date,  pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,pur_rate.pur_rate,category.cat_name from pharma_purchase_slave pur_slave inner join pharma_purchase_master master on master.pur_id=pur_slave.pur_slave_master_id"
					+ " inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id"
					+ " inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join  pharma_category_master category ON category.cat_id = product.product_cat_id"
					+ " inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id INNER JOIN  pharma_company_master comp ON comp.comp_id = product.product_comp_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id where batch.batch_delete_flag = 0 and category.cat_id='"
					+ userData
					+ "' and master.pur_delete_flag='0' and stock.stock_qty_in_hand!='0' order by batch_exp_date desc";
		} else if (callform.equals("DrugWise")) {
			queryString = "select product.product_name,shelf.shelf_name,product.product_uom_unit,pack.pack_type,comp.comp_name, batch.batch_code,batch.batch_exp_date,  pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,pur_rate.pur_rate,cat.cat_name from pharma_purchase_slave pur_slave inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_drug_master drug on drug.drug_id=product.product_drug_id INNER JOIN pharma_company_master comp ON comp.comp_id = product.product_comp_id INNER JOIN pharma_category_master cat ON cat.cat_id = product.product_cat_id where batch.batch_delete_flag = 0 and drug.drug_id = '"
					+ userData + "' and stock.stock_qty_in_hand!='0' order by batch_exp_date desc";
		} else if (callform.equals("StoreWise")) {

			queryString = "select product.product_name,shelf.shelf_name, product.product_uom_unit, pack.pack_type,comp.comp_name,batch.batch_code,batch.batch_exp_date,rate.mrp, rate.rate,stock.stock_qty_in_hand,rate.pur_rate, category.cat_name "
					+ " from pharma_" + storeName
					+ "_stock_master stock inner join pharma_product_master product ON product.product_id = stock.stock_product_id "
					+ " inner join pharma_batch_master batch ON batch.batch_id = stock.stock_batch_id inner join pharma_purchase_rate rate "
					+ " on rate.batch_id=stock.stock_batch_id INNER JOIN  pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id  INNER JOIN pharma_packing_master pack ON pack.pack_id = product.product_pack_id INNER JOIN pharma_company_master comp ON comp.comp_id = product.product_comp_id INNER JOIN pharma_category_master category ON category.cat_id = product.product_cat_id where stock_delete_flag=0 ";
		} else if (callform.equals("BatchWise")) {
			queryString = "select product.product_name,shelf.shelf_name,product.product_uom_unit,pack.pack_type,comp.comp_name,batch.batch_code,batch.batch_exp_date,pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,pur_rate.pur_rate,cat.cat_name from pharma_purchase_slave pur_slave inner join pharma_purchase_master master on master.pur_id=pur_slave.pur_slave_master_id "
					+ " inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = pur_slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id "
					+ " inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id "
					+ " inner join pharma_shelf_master shelf on shelf.shelf_id=product.product_shelf_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id inner join pharma_company_master comp on comp.comp_id=product.product_comp_id "
					+ "INNER JOIN pharma_category_master cat on cat.cat_id= product.product_cat_id"
					+ " where batch.batch_delete_flag = 0 and master.pur_delete_flag='0' and stock.stock_qty_in_hand!='0' order by product.product_name asc ";
		}

		try {

			query = sessionFactory.getCurrentSession().createSQLQuery(queryString);
	
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportStock reportStock = new ReportStock();

				if (row[0] != null)
					reportStock.setProductName(row[0].toString());
				else
					reportStock.setProductName("");

				if (row[1] != null)
					reportStock.setProductShelf(row[1].toString());
				else
					reportStock.setProductShelf("");

				if (row[2] != null)
					reportStock.setProductUnit(row[2].toString());
				else
					reportStock.setProductUnit("");

				if (row[3] != null)
					reportStock.setProductPacking(row[3].toString());
				else
					reportStock.setProductPacking("");

				if (row[4] != null)
					reportStock.setProductCompany(row[4].toString());
				else
					reportStock.setProductCompany("");

				if (row[5] != null)
					reportStock.setBatchCode(row[5].toString());
				else
					reportStock.setBatchCode("");

				if (row[6] != null)
					reportStock.setBatchExpDate(row[6].toString());
				else
					reportStock.setBatchExpDate("");

				if (row[7] != null)
					reportStock.setMrp(df.format(row[7]).toString());
				else
					reportStock.setMrp("0.00");

				if (row[8] != null)
					reportStock.setRate(df.format(row[8]).toString());
				else
					reportStock.setRate("0.00");

				if (row[9] != null)
					reportStock.setStockInHand(df.format(row[9]).toString());
				else
					reportStock.setStockInHand("0");

				/*
				 * if (row[10] != null) reportStock.setPurRate(df.format(row[10]).toString());
				 * else reportStock.setPurRate("0");
				 */

				/*
				 * if (type.equals("purRate")) { Float purRate = 0f; if (row[10] != null) {
				 * purRate = Float.parseFloat(row[10].toString()); } Float unit =
				 * Float.parseFloat(row[2].toString()); Float amount = (purRate / unit) *
				 * Float.parseFloat(row[9].toString());
				 * reportStock.setAmount(df.format(amount).toString()); } else {
				 */
				if (row[7] != null) {
					Float purRate = Float.parseFloat(row[7].toString());
					Float unit = Float.parseFloat(row[2].toString());
					Float amount = (purRate / unit) * Float.parseFloat(row[9].toString());
					reportStock.setAmount(df.format(amount).toString());
				} else {
					reportStock.setAmount("");
				}
				// }

				/*
				 * if (row[10] != null) { Float purRate = Float.parseFloat(row[10].toString());
				 * Float unit = Float.parseFloat(row[2].toString()); Float amount = (purRate /
				 * unit);
				 * 
				 * String amount1 = df.format(amount);
				 * 
				 * reportStock.setPurchaseRatePerUnit(amount1.toString());
				 * 
				 * } else reportStock.setPurchaseRatePerUnit("0");
				 * 
				 * 
				 * if(row[11] !=null) reportStock.setCategoryName(df.format(row[8]).toString());
				 * else reportStock.setCategoryName("");
				 * 
				 * 
				 * if (row[11] != null) reportStock.setCategoryName(row[11].toString()); else
				 * reportStock.setCategoryName("");
				 */

				reports.add(reportStock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		  this.reportExpiriesData = reports;
	     //   workbook = new XSSFWorkbook();
		  
		  
		  workbook = new XSSFWorkbook();
	
		  sheet = (XSSFSheet) workbook.createSheet("Current Stock");
	         
	        Row row = sheet.createRow(0);
	         
	        CellStyle style = workbook.createCellStyle();
	        XSSFFont font = (XSSFFont) workbook.createFont();
	        font.setBold(true);
	        font.setFontHeight(16);
	        style.setFont(font);
	         
	        createCell(row, 0, "Product Name", style);      
	        createCell(row, 1, "Shelf Name", style); 
	        createCell(row, 2, "Product Unit", style);
	        createCell(row, 3, "Packing", style);   
	        createCell(row, 4, "Company Name", style); 
	        createCell(row, 5, "Batch Code", style);
	        createCell(row, 6, "Batch Expiry", style);
	        createCell(row, 7, "MRP", style);
	        createCell(row, 8, "Purchase rate Per Unit", style);
	        
	
	        int rowCount = 1;
	 
	        CellStyle style1 = workbook.createCellStyle();
	        XSSFFont font1 = (XSSFFont) workbook.createFont();
	        font1.setFontHeight(14);
	        style1.setFont(font1);
	                 
	        for (ReportStock stock : reportExpiriesData) {
	            Row row1 = sheet.createRow(rowCount++);
	            int columnCount = 0;
	             String unit = Double.toString(stock.getProduct_uom_unit());
	             String Mrp = stock.getMrp();
	             String PurRate= Double.toString(stock.getPur_rate());
	            createCell(row1, columnCount++, stock.getProductName(), style1);
	            createCell(row1, columnCount++, stock.getProductShelf(), style1);
	            createCell(row1, columnCount++, unit, style1);
	            createCell(row1, columnCount++, stock.getProductPacking(),style1);
	            createCell(row1, columnCount++, stock.getProductCompany(),style1);
	            createCell(row1, columnCount++, stock.getBatchCode(), style1);
	            createCell(row1, columnCount++, stock.getBatchExpDate(), style1);
	            createCell(row1, columnCount++, Mrp, style1); 
	            createCell(row1, columnCount++, PurRate, style1); 
	            
	        }     
	   
	       // writeHeaderLine();
	    //    writeDataLines();
	 
	     try {
	     ServletOutputStream outputStream = response.getOutputStream();
	    
			workbook.write(outputStream);
			//outputStream.close();
			//workbook.close();
		//	((Session) workbook).close();
		//	((AutoCloseable) workbook).close();
	         
	        
				outputStream.close();
	     }catch(Exception e) {
	    	 e.printStackTrace();
	     }

		return reports;
	}
	
	
	@Override
	public List<ReportStock> getProductWiseStockOnPurRate(String type, Integer startIndex) {
		System.out.println(startIndex);
		DecimalFormat df = new DecimalFormat("0.00");
		List<ReportStock> reportStocks = new ArrayList<ReportStock>();	
		String queryString = "";
		Query query = sessionFactory
				.getCurrentSession()
				.createSQLQuery("CALL sp_get_batch_wise_product_details()");
					
		try {		
			query.setFirstResult(startIndex);
		//	query.setMaxResults(10);
			query.setResultTransformer(Transformers.aliasToBean(ReportStock.class));
            List<ReportStock> lst = query.list();
			
            return lst;
		}catch(

	Exception e)
	{
			e.printStackTrace();
			return null;
		}
}
	
	 private void createCell(Row row, int columnCount, Object value, CellStyle style) {
	        sheet.autoSizeColumn(columnCount);
	        Cell cell = row.createCell(columnCount);
	        if (value instanceof Integer) {
	            cell.setCellValue((Integer) value);
	        } else if (value instanceof Boolean) {
	            cell.setCellValue((Boolean) value);
	        }else {
	            cell.setCellValue((String) value);
	        }
	        cell.setCellStyle(style);
	    }

	@Override
	public List<ReportList> getAllCompanyList(String from, String to) {

		List<ReportList> reportStocks = new ArrayList<ReportList>();	
		String queryString = "";
		Query query = sessionFactory
				.openSession()
				.createSQLQuery("select comp_id as id,comp_name as name, comp_short_name as shortName from pharma_company_master where comp_delete_flag=0 and Date(comp_add_date) between '"+from+"' and '"+to+"'");
					
		try {		
			query.setResultTransformer(Transformers.aliasToBean(ReportList.class));
            List<ReportList> lst = query.list();
            return lst;
		}catch(

	Exception e)
	{
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<ReportList> getProductListData(String from, String to, String callform, String userData) {
		List<ReportList> reportStocks = new ArrayList<ReportList>();	
		Query query=null;
		if(callform.equals("onload")) {
			query= sessionFactory
				.openSession()
				.createSQLQuery("select master.product_id as id,master.product_name as name, master.product_short_name as shortName, company.comp_name as companyName from pharma_product_master master join pharma_company_master company on master.product_comp_id= company.comp_id where master.product_delete_flag=0 and Date(master.product_add_date) between '"+from+"' and '"+to+"'");
				//.createSQLQuery("select master.product_id as id,master.product_name as name, master.product_short_name as shortName, company.comp_name as companyName from pharma_product_master master join pharma_company_master company on master.product_comp_id= company.comp_id where master.product_delete_flag=0 and Date(master.product_add_date) between '"+from+"' and '"+to+"'");
		}else {
			query= sessionFactory
					.openSession()
					//.createSQLQuery("select master.product_id as id,master.product_name as name, master.product_short_name as shortName, company.comp_name as companyName from pharma_product_master master join pharma_company_master company on master.product_comp_id= company.comp_id where master.product_delete_flag=0 and Date(master.product_add_date) between '"+from+"' and '"+to+"'");
					.createSQLQuery("select master.product_id as id,master.product_name as name, master.product_short_name as shortName, company.comp_name as companyName from pharma_product_master master join pharma_company_master company on master.product_comp_id= company.comp_id where master.product_delete_flag=0 and master.product_comp_id='"+userData+"' and Date(master.product_add_date) between '"+from+"' and '"+to+"'");
		}
		try {		
			query.setResultTransformer(Transformers.aliasToBean(ReportList.class));
            List<ReportList> lst = query.list();
            return lst;
		}catch(

	Exception e)
	{
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<ReportList> getDrugListData(String from, String to) {
		List<ReportList> reportStocks = new ArrayList<ReportList>();	
		String queryString = "";
		Query query = sessionFactory
				.openSession()
				.createSQLQuery("select drug_id as id,drug_name as name, drug_therauptic_use as shortName from pharma_drug_master where drug_delete_flag=0 and Date(drug_add_date) between '"+from+"' and '"+to+"'");
					
		try {		
			query.setResultTransformer(Transformers.aliasToBean(ReportList.class));
            List<ReportList> lst = query.list();
            return lst;
		}catch(

	Exception e)
	{
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public String getBatchWisePurchase2(List<ReportPurchase> reportPurchases, String productName,
			HttpServletRequest request, String from, String to, String batchCode, String totalAmount) {


		// initialize date
		initializeDate();

		try {
			HashMap jasperParameter = new HashMap();

			jasperParameter.put("ReportTitle", "BatchWise Purchase Report");
			jasperParameter.put("productName", productName);
			jasperParameter.put("batchCode", batchCode);
			jasperParameter.put("from", from);
			jasperParameter.put("totalAmount", totalAmount);
			jasperParameter.put("to", to);

			String pdfXmlPath = request
					.getRealPath("/Report-xml/pharmacy/purchase_batchwise_report.jrxml");
			String xlsXmlPath = request
					.getRealPath("/Report-xml/pharmacy/purchase_batchwise_report_xls.jrxml");

			pdfPath = request
					.getRealPath("/ehat_Reports/Pharmacy/purchase/batchwise/")
					+ "//" + todays_date + "_purchase_batchwise_report.pdf";

			String exlPath = request
					.getRealPath("/ehat_Reports/Pharmacy/purchase/batchwise/")
					+ "//" + todays_date + "_purchase_batchwise_report.xls";

			getPurchaseReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
					xlsXmlPath, pdfPath, exlPath, reportPurchases);
		} catch (Exception e) {
			e.printStackTrace();
		}

		String srPath = "/Pharmacy/purchase/batchwise/" + todays_date
				+ "_purchase_batchwise_report.pdf" + "$"
				+ "/Pharmacy/purchase/batchwise/" + todays_date
				+ "_purchase_batchwise_report.xls";

		return srPath;
	
	}
	
	// added by Vishant Pawar Pharmacy Code for Purchase Report
		public void getPurchaseReportFunctionForPharmacy(HashMap jasperParameter,
				String pdfXmlPath, String xlsXmlPath, String pdfPath,
				String exlPath, List<ReportPurchase> reportPurchases) {

			// initialize date
			initializeDate();

			try {
				// JasperReport is the object that holds our compiled jrxml file
				JasperReport jasperReport;
				// JasperPrint is the object contains report after result filling
				// process
				JasperPrint jasperPrint;
				// connection is the data source we used to fetch the data from

				/* Connection connection = establishConnection(); */

				JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(
						reportPurchases);

				jasperReport = JasperCompileManager.compileReport(pdfXmlPath);
				// filling report with data from data source
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, beanColDataSource);

				JasperExportManager.exportReportToPdfFile(jasperPrint, pdfPath);

				jasperReport = JasperCompileManager.compileReport(xlsXmlPath);
				// filling report with data from data source
				jasperParameter.put(JRParameter.IS_IGNORE_PAGINATION, Boolean.TRUE);
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, new JRBeanCollectionDataSource(
								reportPurchases));

				JRXlsExporter exporterXls = new JRXlsExporter();
				exporterXls.setParameter(JRExporterParameter.JASPER_PRINT,
						jasperPrint);
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.remove.empty.space.between.rows",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.white.page.background",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.create.custom.palette",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.one.page.per.sheet",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.graphics", "true");
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.collapse.row.span",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.border",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.background",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.wrap.text", "true");

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				exporterXls
						.setParameter(
								JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS,
								Boolean.TRUE);

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND,
						Boolean.FALSE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				// String exlPath = request.getRealPath("./ehat_Reports/Patient/")
				// + "//" + todays_date + "_opd_all_report.xls";
				exporterXls.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,
						exlPath);
				exporterXls.exportReport();

			} catch (Exception e) {

				e.printStackTrace();
			}
		}

		//added by vishant pawar
		@Override
		public String getPartyWisePurchaseTotalReport(List<ReportPurchase> reportPurchases, HttpServletRequest request,
				String from, String to) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Party Wise Purchase Report");
				jasperParameter.put("from", from);
				jasperParameter.put("to", to);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/partywise_total_purchase_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/partywise_total_purchase_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/partywiseTotalPo/")
						+ "//"
						+ todays_date
						+ "_partywise_total_purchase_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/partywiseTotalPo/")
						+ "//"
						+ todays_date
						+ "_partywise_total_purchase_report.xls";

				getPurchaseReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportPurchases);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/purchase/partywiseTotalPo/" + todays_date
					+ "_partywise_total_purchase_report.pdf" + "$"
					+ "/Pharmacy/purchase/partywiseTotalPo/" + todays_date
					+ "_partywise_total_purchase_report.xls";

			return srPath;
		}

		@Override
		@Transactional
		public List<ReportStock2> getProductWiseStockOnPurRate2(String type, Integer startIndex) {
			System.out.println(startIndex);
			DecimalFormat df = new DecimalFormat("0.00");
			List<ReportStock> reportStocks = new ArrayList<ReportStock>();	
			String queryString = "";
			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery("CALL sp_get_batch_wise_product_details()");
						
			try {		
				query.setFirstResult(startIndex);
			//	query.setMaxResults(10);
				query.setResultTransformer(Transformers.aliasToBean(ReportStock2.class));
	            List<ReportStock2> lst = query.list();
				/*
				 * for (ReportStock2 reportStock2 : lst) { ReportStock reportStock = new
				 * ReportStock(); reportStock.setBatchCode(reportStock2.getBatch_code());
				 * reportStock.setBatchExpDate(reportStock2.getBatch_exp_date());
				 * reportStock.setProductName(reportStock2.getProduct_name());
				 * reportStock.setProductShelf(reportStock2.getShelf_name());
				 * reportStock.setProductPacking(reportStock2.getPack_type());
				 * reportStock.setProductUnit(String.valueOf(reportStock2.getProduct_uom_unit())
				 * );
				 * reportStock.setPurchaseRatePerUnit(String.valueOf(reportStock2.getPur_rate())
				 * ); reportStock.setMrp(String.valueOf(reportStock2.getMrp()));
				 * reportStock.setRate(String.valueOf(reportStock2.getRate()));
				 * reportStock.setStockInHand(String.valueOf(reportStock2.getStock_qty_in_hand()
				 * )); reportStock.setCategoryName(reportStock2.getCat_name()); }
				 */
				
	            return lst;
			}catch(

		Exception e)
		{
				e.printStackTrace();
				return null;
			}
}
		
		
		@Override
		public MrnReportDetail getReceivedMRNReportData(
				HttpServletRequest request) {
			List<MrnReportDetail> mrnReportDetailList = new ArrayList<MrnReportDetail>();
			MrnReportDetail mrnReport = new MrnReportDetail();
			try {
				
				//SELECT master.mrn_store_name, master.mrn_date, master.mrn_id,product.product_name, product.product_uom_unit, mrn_issue_slave.mrn_issue_slave_qty,mrn_issue_slave.mrn_issue_slave_batch_code,mrn_issue_slave.mrn_issue_slave_batch_expiry, mrn_issue_slave.mrn_issue_slave_total_issue_qty as issueqty,mrn_issue_slave.mrn_issue_slave_cancel_qty, mrn_issue_slave.mrn_issue_slave_pending_qty, mrn_issue_slave.mrn_issue_slave_total_issue_qty as receivedqty,0 as mrn_discount,0 as mrn_gst, mrn_issue_slave.mrn_issue_slave_mrp, mrn_issue_slave.mrn_issue_slave_rate, mrn_issue_slave.mrn_issue_slave_amt,ifnull(mrn_issue_slave.mrn_issue_slave_remark,'NA') FROM pharma_store_mrn_master master INNER JOIN pharma_store_mrn_slave mrn_slave ON mrn_slave.mrn_slave_master_id = master.mrn_id INNER JOIN pharma_mrn_issue_slave mrn_issue_slave ON mrn_issue_slave.mrn_issue_slave_mrn_slave_id = mrn_slave.mrn_slave_id LEFT JOIN pharma_mrn_issue_master mrn_issue_master ON mrn_issue_master.mrn_issue_id = mrn_issue_slave.mrn_issue_slave_id INNER JOIN pharma_product_master product ON product.product_id = mrn_slave.mrn_slave_product_id WHERE master.mrn_status = 'complete' OR master.mrn_status = 'In Process' AND master.mrn_pending_status = 'N' OR master.mrn_pending_status = 'Y' AND mrn_slave.mrn_slave_status = 'received' AND master.mrn_issue_status='FullyIssue' OR master.mrn_issue_status = 'PartiallyIssue' order by master.mrn_id desc
				SQLQuery query = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"SELECT master.mrn_store_name, master.mrn_date, master.mrn_id,product.product_name, product.product_uom_unit, mrn_issue_slave.mrn_issue_slave_qty,mrn_issue_slave.mrn_issue_slave_batch_code,mrn_issue_slave.mrn_issue_slave_batch_expiry, mrn_issue_slave.mrn_issue_slave_total_issue_qty as issueqty, 0 as mrn_issue_slave_cancel_qty, mrn_issue_slave.mrn_issue_slave_pending_qty, mrn_issue_slave.mrn_issue_slave_total_issue_qty as receivedqty,0 as mrn_discount,0 as mrn_gst, mrn_issue_slave.mrn_issue_slave_mrp, mrn_issue_slave.mrn_issue_slave_rate, mrn_issue_slave.mrn_issue_slave_amt,'NA' as mrn_issue_slave_remark FROM pharma_store_mrn_master master INNER JOIN pharma_store_mrn_slave mrn_slave ON mrn_slave.mrn_slave_master_id = master.mrn_id INNER JOIN pharma_mrn_issue_slave mrn_issue_slave ON mrn_issue_slave.mrn_issue_slave_mrn_slave_id = mrn_slave.mrn_slave_id LEFT JOIN pharma_mrn_issue_master mrn_issue_master ON mrn_issue_master.mrn_issue_id = mrn_issue_slave.mrn_issue_slave_id INNER JOIN pharma_product_master product ON product.product_id = mrn_slave.mrn_slave_product_id WHERE master.mrn_status = 'complete' OR master.mrn_status = 'In Process'  AND mrn_slave.mrn_slave_status = 'received'  order by master.mrn_id desc");
				List<Object[]> rows = query.list();
				for (Object[] row : rows) {
					MrnReportDetail mrnReportDetail = new MrnReportDetail();

					if (row[0] != null){
						mrnReportDetail.setMrnStoreName(row[0].toString());
					}

					if (row[1] != null){
						mrnReportDetail.setMrnDate(row[1].toString());
					}
					if (row[2] != null) {
						mrnReportDetail.setMrnNo(Integer.parseInt(row[2].toString()));
					}
					if (row[3] != null){
						mrnReportDetail.setMrnProductName(row[3].toString());
					}
					
					if (row[4] != null){
						mrnReportDetail.setMrnProductUnit(row[4].toString());
					}
					
					if (row[5] != null){
						mrnReportDetail.setMrnRequiredQty(Integer.parseInt(row[5].toString()));
					}
					
					if (row[6] != null){
						mrnReportDetail.setMrnProductBatch(row[6].toString());
					}
					
					if (row[7] != null){
						mrnReportDetail.setMrnProductBatchExp(row[7].toString());
					}
					
					if (row[8] != null)
						mrnReportDetail.setMrnIssueQty(Integer.parseInt(row[8].toString()));
					
					if (row[9] != null){
						mrnReportDetail.setMrnCanceledQty(Integer.parseInt(row[9].toString()));
					}
					
					if (row[10] != null){
						mrnReportDetail.setMrnPendingQty(Integer.parseInt(row[10].toString()));
					}
					
					if (row[11] != null){
						mrnReportDetail.setMrnReceivedQty(Integer.parseInt(row[11].toString()));
					}
					
					
					if (row[12] != null){
						mrnReportDetail.setMrnDiscount(row[12].toString());
					}
					
					if (row[13] != null){
						mrnReportDetail.setMrnGST(row[13].toString());
					}
					
					if (row[14] != null){
						mrnReportDetail.setMrnMRP(row[14].toString());
					}
					
					if (row[15] != null){
						mrnReportDetail.setMrnRate(row[15].toString());
					}
					
					if (row[16] != null){
						mrnReportDetail.setMrnAmount(Double.parseDouble(row[16].toString()));
					}
					
					if (row[17] != null){
						mrnReportDetail.setMrnRemark(row[17].toString());
					}
					
					mrnReportDetailList.add(mrnReportDetail);
					
				}
				mrnReport.setLstMrnReportDetail(mrnReportDetailList);

			} catch (Exception e) {
				e.printStackTrace();
			}
			
			return mrnReport;
			
		}

		@Override
		public MrnReportDetail getPendingMRNReportData(
				HttpServletRequest request) {
			List<MrnReportDetail> mrnReportDetailList = new ArrayList<MrnReportDetail>();
			MrnReportDetail mrnReport = new MrnReportDetail();
			try {
				
				//SELECT master.mrn_store_name, master.mrn_date, master.mrn_id, product.product_name, mrn_issue_slave.mrn_issue_slave_qty, mrn_issue_slave.mrn_issue_slave_total_issue_qty, mrn_issue_slave.mrn_issue_slave_cancel_qty, mrn_issue_slave.mrn_issue_slave_pending_qty,ifnull(mrn_issue_slave.mrn_issue_slave_remark,'NA') FROM pharma_store_mrn_master master INNER JOIN pharma_store_mrn_slave mrn_slave ON mrn_slave.mrn_slave_master_id = master.mrn_id INNER JOIN pharma_mrn_issue_slave mrn_issue_slave ON mrn_issue_slave.mrn_issue_slave_mrn_slave_id = mrn_slave.mrn_slave_id INNER JOIN pharma_product_master product ON product.product_id = mrn_slave.mrn_slave_product_id where master.mrn_status ='In Process' and mrn_pending_status='Y'"
				SQLQuery query = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"SELECT master.mrn_store_name, master.mrn_date, master.mrn_id, product.product_name, mrn_issue_slave.mrn_issue_slave_qty, mrn_issue_slave.0 as mrn_issue_slave_cancel_qty, mrn_issue_slave.mrn_issue_slave_cancel_qty, mrn_issue_slave.mrn_issue_slave_pending_qty,'NA' as mrn_issue_slave_remark FROM pharma_store_mrn_master master INNER JOIN pharma_store_mrn_slave mrn_slave ON mrn_slave.mrn_slave_master_id = master.mrn_id INNER JOIN pharma_mrn_issue_slave mrn_issue_slave ON mrn_issue_slave.mrn_issue_slave_mrn_slave_id = mrn_slave.mrn_slave_id INNER JOIN pharma_product_master product ON product.product_id = mrn_slave.mrn_slave_product_id where master.mrn_status ='In Process'");
				List<Object[]> rows = query.list();
				for (Object[] row : rows) {
					MrnReportDetail mrnReportDetail = new MrnReportDetail();

					if (row[0] != null){
						mrnReportDetail.setMrnStoreName(row[0].toString());
					}

					if (row[1] != null){
						mrnReportDetail.setMrnDate(row[1].toString());
					}
					if (row[2] != null) {
						mrnReportDetail.setMrnNo(Integer.parseInt(row[2].toString()));
					}

					if (row[3] != null){
						mrnReportDetail.setMrnProductName(row[3].toString());
					}
					
					if (row[4] != null){
						mrnReportDetail.setMrnRequiredQty(Integer.parseInt(row[4].toString()));
					}
					
					if (row[5] != null)
						mrnReportDetail.setMrnIssueQty(Integer.parseInt(row[5].toString()));
					
					if (row[6] != null){
						mrnReportDetail.setMrnCanceledQty(Integer.parseInt(row[6].toString()));
					}
					
					if (row[7] != null){
						mrnReportDetail.setMrnPendingQty(Integer.parseInt(row[7].toString()));
					}
					
					if (row[8] != null){
						mrnReportDetail.setMrnRemark(row[8].toString());
					}
					
					mrnReportDetailList.add(mrnReportDetail);
					
				}
				mrnReport.setLstMrnReportDetail(mrnReportDetailList);

			} catch (Exception e) {
				e.printStackTrace();
			}
			
			return mrnReport;
			
		}

		
//		added by vishant
		@Override
		@Transactional
		public List<CreditNoteDetailsReportDTO> getCreditNoteDetailsAll(String from, String to) {
			List<CreditNoteDetailsReportDTO> productWiseBatchSales = new ArrayList<CreditNoteDetailsReportDTO>();
			SQLQuery query = null;

			String debitNote = "SELECT     p_master.credit_note_date as Createddate,    p_master.credit_note_id as id, p_master.credit_note_type as creditNoteType,    product.product_name as productName,    p_slave.credit_note_slave_qty as quantity,    p_slave.credit_note_slave_rate as billrate,    p_slave.credit_note_slave_amt as patientSaleSlaveRecAmt,  p_master.credit_note_patient_name   as patientName,    p_master.credit_note_net_amt as netAmt,    hsn.hsn_no as hsnCode,    p_slave.credit_slave_vat as totalVat0,    p_slave.credit_slave_ratePerUnit as ratePerUnit,    p_slave.credit_slave_vatAmt as totalVat5,    if(p_master.credit_note_transaction_type = 0,        'Cash',        'Credit') as pmode,    ifnull(p_slave.credit_slave_discAmt, 0) as discountAmt ,   ifnull(p_master.credit_note_dicscount, 0) as discount,  ifnull(p_master.credit_note_disc_percent, 0) as discountPer,    hsn.hsn_no as hsnNo,  p_master.credit_note_patientSaleId as patientSaleId ,p_master.credit_note_IndentSaleId as indentSaleId, p_master.credit_note_CounterSaleId as counterSaleId FROM    pharma_credit_note_master p_master        inner JOIN    pharma_credit_note_slave p_slave ON p_slave.credit_note_slave_master_id = p_master.credit_note_id        inner join    pharma_product_master product ON product.product_id = p_slave.credit_note_slave_product_id        inner join    pharma_hsn_master hsn ON hsn.idpharma_hsn_master = product.product_hsn        left join    ehat_patient p1 ON p1.patient_id = p_master.credit_note_patientId where    p_master.credit_note_delete_flag = 0  and  p_master.credit_note_date between '"
					+ from + "' and '" + to + "'";

			query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
			try {
				
						
					query.setResultTransformer(Transformers.aliasToBean(CreditNoteDetailsReportDTO.class));
		            List<CreditNoteDetailsReportDTO> lst = query.list();
		            return lst;
				
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return productWiseBatchSales;
		}
		// Added By Annapurna Code For patientLedgerreportPatientHeaderInfo
		@Override
		public List<ReportIndentSaleDetails> getAllIndentSalePatientHeader(Integer patientId, String from, String to) {
			Double total = 0.0;
			List<ReportIndentSaleDetails> indentSaleDetails = new ArrayList<ReportIndentSaleDetails>();
			SQLQuery query = null;

		//	String debitNote = "SELECT  master.indent_bill_mode, sum( master.indent_sale_net_amt), sum(  master.indent_sale_amt_receive),sum( IFNULL(histoy.amount_receive, '0')),sum( IFNULL(histoy.discount, '0')),sum( IFNULL(histoy.amount_balance, '0')),sum( IFNULL(credit.credit_note_payable, '0')),sum( IFNULL(credit.credit_note_net_amt, '0')) FROM pharma_indent_sale_master master    LEFT JOIN    pharma_credit_note_master credit ON credit.credit_note_IndentSaleId = master.indent_sale_id   LEFT JOIN pharma_indent_master sale ON sale.indent_id = master.indent_sale_indent_no LEFT JOIN ehat_treatment t ON t.treatment_id = sale.indent_treatement_id LEFT JOIN ehat_patient p ON t.patient_id = p.patient_id Left join pharma_indent_amount_history histoy on master.indent_sale_id = histoy.indent_sale_master_id WHERE master.indent_sale_delete_flag = 0	and p.patient_id =" + patientId + " and master.indent_sale_received_date between '" +from+ "' and '" + to + "'   group by master.indent_bill_mode";
			String debitNote = "select a.patient_bill_mode, " + 
					"	sum(a.patient_sales_bill_net_amt) patient_sales_bill_net_amt, " + 
					"	sum(a.patient_sales_bill_amount_received) patient_sales_bill_amount_received, " + 
					"	sum(a.amount_receive) amount_receive, " + 
					"	sum(a.discount) discount, " + 
					"	sum(a.amount_balance) amount_balance, " + 
					"    sum(a.patient_sales_bill_amount_balance) patient_sales_bill_amount_balance, " + 
					"	sum(a.credit_note_payable) credit_note_payable, " + 
					"	sum(a.credit_note_net_amt) credit_note_net_amt " + 
					" " + 
					" from " + 
					"( " + 
					" " + 
					"SELECT  " + 
					"    master.patient_bill_mode, " + 
					"    SUM(master.patient_sales_bill_net_amt) patient_sales_bill_net_amt, " + 
					"    SUM(master.patient_sales_bill_amount_received) patient_sales_bill_amount_received, " + 
					"    SUM(IFNULL(histoy.amount_receive, '0')) amount_receive, " + 
					"    SUM(IFNULL(histoy.discount, '0')) discount, " + 
					"    SUM(IFNULL(histoy.amount_balance, '0')) amount_balance, " + 
					"	SUM(IFNULL(master.patient_sales_bill_amount_balance, '0')) patient_sales_bill_amount_balance, " + 
					"    SUM(IFNULL(credit.credit_note_payable, '0')) credit_note_payable, " + 
					"    SUM(IFNULL(credit.credit_note_net_amt, '0')) credit_note_net_amt " + 
					"FROM " + 
					"    pharma_patient_sales_bill_master master " + 
					"        LEFT JOIN " + 
					"    pharma_credit_note_master credit ON credit.credit_note_patientSaleId = master.patient_sales_bill_id " + 
					"        LEFT JOIN " + 
					"    ehat_treatment t ON t.treatment_id = master.patient_sale_treatmentId " + 
					"        LEFT JOIN " + 
					"    ehat_patient p ON t.patient_id = p.patient_id " + 
					"        LEFT JOIN " + 
					"    pharma_patient_amount_history histoy ON master.patient_sales_bill_id = histoy.patient_sale_bill_master_id " + 
					"WHERE " + 
					"    master.patient_sales_bill_delete_flag = 0 " + 
					 "and p.patient_id =" + patientId + " and master.patient_bill_date between '" +from+ "' and '" + to + "' "+
					"GROUP BY master.patient_bill_mode " + 
					"     " + 
					"union all " + 
					" " + 
					"SELECT  " + 
					"    master.indent_bill_mode patient_bill_mode, " + 
					"    SUM(master.indent_sale_net_amt) patient_sales_bill_net_amt, " + 
					"    SUM(master.indent_sale_amt_receive) patient_sales_bill_amount_received, " + 
					"    SUM(IFNULL(histoy.amount_receive, '0')) amount_receive, " + 
					"    SUM(IFNULL(histoy.discount, '0')) discount, " + 
					"    SUM(IFNULL(histoy.amount_balance, '0')) amount_balance, " + 
					"    SUM(IFNULL(master.indent_sale_amt_balance, '0')) patient_sales_bill_amount_balance, " + 
					"    SUM(IFNULL(credit.credit_note_payable, '0')) credit_note_payable, " + 
					"    SUM(IFNULL(credit.credit_note_net_amt, '0')) credit_note_net_amt " + 
					"FROM " + 
					"    pharma_indent_sale_master master " + 
					"        LEFT JOIN " + 
					"    pharma_credit_note_master credit ON credit.credit_note_IndentSaleId = master.indent_sale_id " + 
					"        LEFT JOIN " + 
					"    pharma_indent_master sale ON sale.indent_id = master.indent_sale_indent_no " + 
					"        LEFT JOIN " + 
					"    ehat_treatment t ON t.treatment_id = sale.indent_treatement_id " + 
					"        LEFT JOIN " + 
					"    ehat_patient p ON t.patient_id = p.patient_id " + 
					"        LEFT JOIN " + 
					"    pharma_indent_amount_history histoy ON master.indent_sale_id = histoy.indent_sale_master_id " + 
					"WHERE " + 
					"    master.indent_sale_delete_flag = 0 " + 
					 "and p.patient_id =" + patientId + " and master.indent_sale_received_date between '" +from+ "' and '" + to + "' " +
					"GROUP BY master.indent_bill_mode " + 
					"    ) a " + 
					"    group by a.patient_bill_mode "   ;

			query = sessionFactory.getCurrentSession().createSQLQuery(debitNote);
			try {

				List<Object[]> rows = query.list();

				for (Object[] row : rows) {

					ReportIndentSaleDetails indentProductBatch = new ReportIndentSaleDetails();
					if ((row[0].toString()).equals("0"))
						indentProductBatch.setBillMode("Cash");
					else
						indentProductBatch.setBillMode("Credit");
			
					indentProductBatch.setNetAmount(row[1].toString());
						
					indentProductBatch.setSaleAmountReceive(row[2].toString());

					indentProductBatch.setAmountReceive(row[3].toString());
					// total = total + Double.parseDouble(row[2].toString());
						
					indentProductBatch.setDiscount(row[4].toString());
				
					indentProductBatch.setSaleAmountBal(row[5].toString());
						
					indentProductBatch.setAmountBalance(row[6].toString());				
						
					indentProductBatch.setCreditNotePayable(row[7].toString());

					indentProductBatch.setCreditNoteNetAmt(row[8].toString()); 

						indentSaleDetails.add(indentProductBatch);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return indentSaleDetails;
		}
		
	}
package com.hms.pharmacy.pojo;

import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

public class PartyWiseDbNoteReport {

	@Transient
	private Integer patient_sales_bill_id;
	
	@Transient
	private String patient_name;
	
	@Transient
	private Integer patient_bill_patient_id;
	
	@Transient
	private String product_name;
	
	@Transient
	private Date patient_bill_date;
	
	@Transient
	private String patient_sale_for_time;
	
	@Transient
	private Double TotalAmt;
	
	@Transient
	private Double patient_sale_slave_disc_amt;
	
	@Transient
	private Double patient_sale_slave_rec_amt;
	
	@Transient
	private String patient_sale_slave_rem_amt;
	
	@Transient
	private String patient_sales_bill_narration;
	
	@Transient
	private String User_Name;
	
	@Transient
	private List<PartyWiseDbNoteReport> lstPartyWiseDbNoteReport;

	public Integer getPatient_sales_bill_id() {
		return patient_sales_bill_id;
	}

	public void setPatient_sales_bill_id(Integer patient_sales_bill_id) {
		this.patient_sales_bill_id = patient_sales_bill_id;
	}

	public String getPatient_name() {
		return patient_name;
	}

	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}

	public Integer getPatient_bill_patient_id() {
		return patient_bill_patient_id;
	}

	public void setPatient_bill_patient_id(Integer patient_bill_patient_id) {
		this.patient_bill_patient_id = patient_bill_patient_id;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public Date getPatient_bill_date() {
		return patient_bill_date;
	}

	public void setPatient_bill_date(Date patient_bill_date) {
		this.patient_bill_date = patient_bill_date;
	}

	public String getPatient_sale_for_time() {
		return patient_sale_for_time;
	}

	public void setPatient_sale_for_time(String patient_sale_for_time) {
		this.patient_sale_for_time = patient_sale_for_time;
	}

	public Double getTotalAmt() {
		return TotalAmt;
	}

	public void setTotalAmt(Double totalAmt) {
		TotalAmt = totalAmt;
	}

	public Double getPatient_sale_slave_disc_amt() {
		return patient_sale_slave_disc_amt;
	}

	public void setPatient_sale_slave_disc_amt(Double patient_sale_slave_disc_amt) {
		this.patient_sale_slave_disc_amt = patient_sale_slave_disc_amt;
	}

	public Double getPatient_sale_slave_rec_amt() {
		return patient_sale_slave_rec_amt;
	}

	public void setPatient_sale_slave_rec_amt(Double patient_sale_slave_rec_amt) {
		this.patient_sale_slave_rec_amt = patient_sale_slave_rec_amt;
	}

	public String getPatient_sale_slave_rem_amt() {
		return patient_sale_slave_rem_amt;
	}

	public void setPatient_sale_slave_rem_amt(String patient_sale_slave_rem_amt) {
		this.patient_sale_slave_rem_amt = patient_sale_slave_rem_amt;
	}

	public String getPatient_sales_bill_narration() {
		return patient_sales_bill_narration;
	}

	public void setPatient_sales_bill_narration(String patient_sales_bill_narration) {
		this.patient_sales_bill_narration = patient_sales_bill_narration;
	}

	public String getUser_Name() {
		return User_Name;
	}

	public void setUser_Name(String user_Name) {
		User_Name = user_Name;
	}

	public List<PartyWiseDbNoteReport> getLstPartyWiseDbNoteReport() {
		return lstPartyWiseDbNoteReport;
	}

	public void setLstPartyWiseDbNoteReport(List<PartyWiseDbNoteReport> lstPartyWiseDbNoteReport) {
		this.lstPartyWiseDbNoteReport = lstPartyWiseDbNoteReport;
	}

	@Override
	public String toString() {
		return "PartyWiseDbNoteReport [patient_sales_bill_id=" + patient_sales_bill_id + ", patient_name="
				+ patient_name + ", patient_bill_patient_id=" + patient_bill_patient_id + ", product_name="
				+ product_name + ", patient_bill_date=" + patient_bill_date + ", patient_sale_for_time="
				+ patient_sale_for_time + ", TotalAmt=" + TotalAmt + ", patient_sale_slave_disc_amt="
				+ patient_sale_slave_disc_amt + ", patient_sale_slave_rec_amt=" + patient_sale_slave_rec_amt
				+ ", patient_sale_slave_rem_amt=" + patient_sale_slave_rem_amt + ", patient_sales_bill_narration="
				+ patient_sales_bill_narration + ", User_Name=" + User_Name + ", lstPartyWiseDbNoteReport="
				+ lstPartyWiseDbNoteReport + "]";
	}
	
	
}

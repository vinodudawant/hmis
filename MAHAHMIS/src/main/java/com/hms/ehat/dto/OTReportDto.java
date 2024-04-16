package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;
@Entity 
@Immutable
@Table(name = "ehat_view_cpoe_ot_report_details")
public class OTReportDto {
	@Id
	@Column(name = "bill_details_ipd_id")
	private int billipd_id;
	
	
	@Column(name = "treatment_id")
	private int treatmentid;
	
	@Column(name = "service_id")
	private int serviceid;
	
	@Column(name = "doctor_id")
	private int doctor_id;
	
	@Column(name = "service_name")
	private String servicename;
	
	@Column(name = "id")
	private int categoryid;
	
	
	@Column(name = "category_name")
	private String categoryName;
	
	
	@Column(name = "ot_flag")
	private String ot_flag;

	@Column(name = "ot_procedure")
	private String ot_procedure;
	@Column(name = "category_charges")
	private Double categorycharges;
	
	@Column(name = "count_ot")
	private int count_ot;
	
	@Column(name = "amount")
	private Double amount;
	@Column(name = "patient_id")
	private int patient_id;
	
	public int getPatient_id() {
		return patient_id;
	}

	public int getCount_ot() {
		return count_ot;
	}

	public void setCount_ot(int count_ot) {
		this.count_ot = count_ot;
	}

	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public int getBillipd_id() {
		return billipd_id;
	}

	public void setBillipd_id(int billipd_id) {
		this.billipd_id = billipd_id;
	}

	public String getOt_flag() {
		return ot_flag;
	}

	public void setOt_flag(String ot_flag) {
		this.ot_flag = ot_flag;
	}
	@Column(name = "docName")
	private String docName;
	
	@Column(name = "created_date_time")
	private String created_date_time;
	
	@Column(name = "f_name")
	private String f_name;
	@Column(name = "m_name")
	private String m_name;
	@Column(name = "l_name")
	private String l_name;
	
	
	
	
	
	
	public String getOt_procedure() {
		return ot_procedure;
	}

	public void setOt_procedure(String ot_procedure) {
		this.ot_procedure = ot_procedure;
	}

	public String getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(String created_date_time) {
		this.created_date_time = created_date_time;
	}

	public String getF_name() {
		return f_name;
	}

	public void setF_name(String f_name) {
		this.f_name = f_name;
	}

	public String getM_name() {
		return m_name;
	}

	public void setM_name(String m_name) {
		this.m_name = m_name;
	}

	public String getL_name() {
		return l_name;
	}

	public void setL_name(String l_name) {
		this.l_name = l_name;
	}



	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	

	public int getTreatmentid() {
		return treatmentid;
	}

	public void setTreatmentid(int treatmentid) {
		this.treatmentid = treatmentid;
	}

	public int getServiceid() {
		return serviceid;
	}

	public void setServiceid(int serviceid) {
		this.serviceid = serviceid;
	}

	public String getServicename() {
		return servicename;
	}

	public void setServicename(String servicename) {
		this.servicename = servicename;
	}



	public int getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(int categoryid) {
		this.categoryid = categoryid;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Double getCategorycharges() {
		return categorycharges;
	}

	public void setCategorycharges(Double categorycharges) {
		this.categorycharges = categorycharges;
	}

	 
	 


	
	@Transient
    private List<OTReportDto> OTRepordetails;
	@Transient
	String opname;
	

	public String getOpname() {
		return opname;
	}

	public void setOpname(String opname) {
		this.opname = opname;
	}

	public List<OTReportDto> getOTRepordetails() {
		return OTRepordetails;
	}

	public void setOTRepordetails(List<OTReportDto> oTRepordetails) {
		OTRepordetails = oTRepordetails;
	}

	public int getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}
	




}

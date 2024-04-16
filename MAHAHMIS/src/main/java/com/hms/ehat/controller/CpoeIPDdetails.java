package com.hms.ehat.controller;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.LabRequestDTO;
import com.hms.ehat.dto.LabRequestSlaveDTO;
@Entity 
@Immutable
@Table(name = "ehat_view_cpoe_ipd_service_details")
public class CpoeIPDdetails {
	

	@Id
	@Column(name = "bill_details_ipd_id")
	private int billipd_id;
	
	
	@Column(name = "treatment_id")
	private int treatmentid;
	
	@Column(name = "service_id")
	private int serviceid;
	
	
	@Column(name = "service_name")
	private String servicename;
	
	@Column(name = "id")
	private int categoryid;
	
	
	@Column(name = "category_name")
	private String categoryName;
	
	
/*	@Column(name = "ot_flag")
	private String ot_flag;*/
	
	@Column(name = "category_charges")
	private Double categorycharges;
	
	@Column(name = "quantity")
	private int quantity;
	
	public int getBillipd_id() {
		return billipd_id;
	}

	public void setBillipd_id(int billipd_id) {
		this.billipd_id = billipd_id;
	}

	/*public String getOt_flag() {
		return ot_flag;
	}

	public void setOt_flag(String ot_flag) {
		this.ot_flag = ot_flag;
	}*/
	@Column(name = "docName")
	private String docName;
	
	
	@Column(name = "created_date_time")
	private Date created_date_time;
	
	//For getting Date with Time
	@Column(name = "inserted_date_time")
	private java.util.Date inserted_date_time;
	@Transient
	private List<LabRequestDTO> listLabRequest;
	
	@Transient
	private List<LabRequestSlaveDTO> listLabRequestSlave;
	
	
	@Column(name = "paid_flag")
	private String paid_flag;
	
	@Column(name = "instructions")
	private String instructions;
	@Column(name = "clinical_notes")
	private String clinical_notes;
	@Column(name = "doctor_id")
	private int doctor_id;
	
	@Column(name = "emrPer")
	private Double emrPer;
	
	@Column(name = "rate")
	private Double rate;
	
	@Column(name = "deleted")
	private String deleted;
	
	@Column(name = "drdesk_flag")
	private String drdeskFlag;
	
	@Column(name = "cancel")
	private String cancel;
	
	
	@Transient
	private String insertDate;
	
	
	
	
	public String getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}

	public String getPaid_flag() {
		return paid_flag;
	}

	public void setPaid_flag(String paid_flag) {
		this.paid_flag = paid_flag;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public String getClinical_notes() {
		return clinical_notes;
	}

	public void setClinical_notes(String clinical_notes) {
		this.clinical_notes = clinical_notes;
	}

	public int getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}

	public Date getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(Date created_date_time) {
		this.created_date_time = created_date_time;
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

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	@Transient
    private List<CpoeIPDdetails> CpoeServdetails;
	@Transient
    private List<CpoeServdetails> Cpoedetails;

	public List<CpoeIPDdetails> getCpoeServdetails() {
		return CpoeServdetails;
	}

	public List<CpoeServdetails> getCpoedetails() {
		return Cpoedetails;
	}

	public void setCpoedetails(List<CpoeServdetails> cpoedetails) {
		Cpoedetails = cpoedetails;
	}

	public void setCpoeServdetails(List<CpoeIPDdetails> cpoeServdetails) {
		CpoeServdetails = cpoeServdetails;
	}

	public List<LabRequestDTO> getListLabRequest() {
		return listLabRequest;
	}

	public void setListLabRequest(List<LabRequestDTO> listLabRequest) {
		this.listLabRequest = listLabRequest;
	}

	public List<LabRequestSlaveDTO> getListLabRequestSlave() {
		return listLabRequestSlave;
	}

	public void setListLabRequestSlave(List<LabRequestSlaveDTO> listLabRequestSlave) {
		this.listLabRequestSlave = listLabRequestSlave;
	}

	public java.util.Date getInserted_date_time() {
		return inserted_date_time;
	}

	public void setInserted_date_time(java.util.Date inserted_date_time) {
		this.inserted_date_time = inserted_date_time;
	}

	public Double getEmrPer() {
		return emrPer;
	}

	public void setEmrPer(Double emrPer) {
		this.emrPer = emrPer;
	}

	public Double getRate() {
		return rate;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}
	
	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getDrdeskFlag() {
		return drdeskFlag;
	}

	public void setDrdeskFlag(String drdeskFlag) {
		this.drdeskFlag = drdeskFlag;
	}

	public String getCancel() {
		return cancel;
	}

	public void setCancel(String cancel) {
		this.cancel = cancel;
	}
	
	
}

package com.hms.ivf.dto;

import java.sql.Date;
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
@Table(name = "ivf_ehat_view_cpoe_service_details")
public class IVFCpoeServdetails {
	
	@Id
	@Column(name = "bill_details_id")
	private int billdetailsid;
	
	
	@Column(name = "treatment_id")
	private int treatmentid;
	
	@Column(name = "patient_id")
	private int patientid;
	
	
	@Column(name = "service_id")
	private int serviceid;
	
	
	@Column(name = "service_name")
	private String servicename;
	
	@Column(name = "id")
	private int categoryid;
	
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "category_charges")
	private Double categorycharges;
	
	@Column(name = "quantity")
	private int quantity;
	
	@Column(name = "docName")
	private String docName;
	
	
	@Column(name = "created_date_time")
	private Date created_date_time;
	
	
	@Column(name = "drdesk_flag")
	private String drdeskFlag;
	
	//For getting Date with Time
	@Column(name = "inserted_date_time")
	private java.util.Date inserted_date_time;
	
	@Column(name = "emrPer")
	private Double emrPer;
	
	@Column(name = "rate")
	private Double rate;
	
	/*@Column(name = "labCount")
	private long labCount;*/
		
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
	
	
	@Column(name = "deleted")
	private String deleted;
	
	@Column(name = "cancel")
	private String cancel;
	
	@Transient
	private String sndtolabflag;
	
	@Transient
	private String sndtorisflag;
	
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

	public String getPaid_flag() {
		return paid_flag;
	}

	public void setPaid_flag(String paid_flag) {
		this.paid_flag = paid_flag;
	}

	public String getDrdeskFlag() {
		return drdeskFlag;
	}

	public void setDrdeskFlag(String drdeskFlag) {
		this.drdeskFlag = drdeskFlag;
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

	public int getBilldetailsid() {
		return billdetailsid;
	}

	public void setBilldetailsid(int billdetailsid) {
		this.billdetailsid = billdetailsid;
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
    private List<IVFCpoeServdetails> CpoeServdetails;
	
	

	public List<IVFCpoeServdetails> getCpoeServdetails() {
		return CpoeServdetails;
	}

	public void setCpoeServdetails(List<IVFCpoeServdetails> cpoeServdetails) {
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

	public String getCancel() {
		return cancel;
	}

	public void setCancel(String cancel) {
		this.cancel = cancel;
	}

	public int getPatientid() {
		return patientid;
	}

	public void setPatientid(int patientid) {
		this.patientid = patientid;
	}

	public String getSndtolabflag() {
		return sndtolabflag;
	}

	public void setSndtolabflag(String sndtolabflag) {
		this.sndtolabflag = sndtolabflag;
	}

	public String getSndtorisflag() {
		return sndtorisflag;
	}

	public void setSndtorisflag(String sndtorisflag) {
		this.sndtorisflag = sndtorisflag;
	}

	/*public long getLabCount() {
		return labCount;
	}

	public void setLabCount(long labCount) {
		this.labCount = labCount;
	}
	*/
	
}

package com.hms.pharmacy.pojo;



import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;


@Entity 
@Immutable
@Table(name = "patient_records_details_pharma")
public class PatientPharmaDetails {

	
	@Column(name = "bill_id")
	private Integer billId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "department_id")
	private Integer departmentId;
		
	
	@Column(name = "patient_name")
	private String patientName;
	
	
	@Column(name = "mobile")
	private String mobile;

	
	@Column(name = "source_type_id")
	private int sourceTypeId;
	
	@Column(name = "charges_master_slave_id",columnDefinition="int default 0")
	private int chargesMasterSlaveId;
	
	
	@Column(name = "t_flag",columnDefinition="varchar(2) default 'N'")
	private String tFlag;
	
 	
	@Column(name = "trcount")
	private String trcount;

	@Column(name = "mrnno")
	private String mrnno;
	
	@Column(name = "indent_treatement_id")
	private int indenttreatementid;
	
	@Column(name = "indent_delete_flag")
	private int indentdeleteflag;
	
	@Id
	@Column(name = "indent_id")
	private int indentid;
	
	@Column(name = "indent_status")
	private String indentstatus;
	
	@Column(name = "indent_store_id")
	private int indentstoreid;
	
	@Column(name = "indent_store_name")
	private String indentstorename;
	
	@Column(name = "indent_received_from")
	private String indentreceivedfrom;
	
	@Column(name = "indent_created_by")
	private int indentcreatedby;	
	
	@Column(name = "indent_user_name")
	private String indentusername;
	
	@Column(name = "user_Type")
	private String userType;
	
	public String getIndentgenerateddate() {
		return indentgenerateddate;
	}

	public void setIndentgenerateddate(String indentgenerateddate) {
		this.indentgenerateddate = indentgenerateddate;
	}

	@Column(name = "indent_generate_date")
	private String indentgenerateddate;
	
	@Transient
	private List<PatientPharmaDetails> listPatientPharmaDetails;

	public Integer getBillId() {
		return billId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}


	public int getSourceTypeId() {
		return sourceTypeId;
	}

	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public int getChargesMasterSlaveId() {
		return chargesMasterSlaveId;
	}

	public void setChargesMasterSlaveId(int chargesMasterSlaveId) {
		this.chargesMasterSlaveId = chargesMasterSlaveId;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	public String getTrcount() {
		return trcount;
	}

	public void setTrcount(String trcount) {
		this.trcount = trcount;
	}

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public int getIndenttreatementid() {
		return indenttreatementid;
	}

	public void setIndenttreatementid(int indenttreatementid) {
		this.indenttreatementid = indenttreatementid;
	}

	public int getIndentdeleteflag() {
		return indentdeleteflag;
	}

	public void setIndentdeleteflag(int indentdeleteflag) {
		this.indentdeleteflag = indentdeleteflag;
	}

	public int getIndentid() {
		return indentid;
	}

	public void setIndentid(int indentid) {
		this.indentid = indentid;
	}

	public String getIndentstatus() {
		return indentstatus;
	}

	public void setIndentstatus(String indentstatus) {
		this.indentstatus = indentstatus;
	}

	public int getIndentstoreid() {
		return indentstoreid;
	}

	public void setIndentstoreid(int indentstoreid) {
		this.indentstoreid = indentstoreid;
	}

	public String getIndentstorename() {
		return indentstorename;
	}

	public void setIndentstorename(String indentstorename) {
		this.indentstorename = indentstorename;
	}

	public String getIndentreceivedfrom() {
		return indentreceivedfrom;
	}

	public void setIndentreceivedfrom(String indentreceivedfrom) {
		this.indentreceivedfrom = indentreceivedfrom;
	}

	public List<PatientPharmaDetails> getListPatientPharmaDetails() {
		return listPatientPharmaDetails;
	}

	public void setListPatientPharmaDetails(
			List<PatientPharmaDetails> listPatientPharmaDetails) {
		this.listPatientPharmaDetails = listPatientPharmaDetails;
	}

	public int getIndentcreatedby() {
		return indentcreatedby;
	}

	public void setIndentcreatedby(int indentcreatedby) {
		this.indentcreatedby = indentcreatedby;
	}

	public String getIndentusername() {
		return indentusername;
	}

	public void setIndentusername(String indentusername) {
		this.indentusername = indentusername;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	
	
}

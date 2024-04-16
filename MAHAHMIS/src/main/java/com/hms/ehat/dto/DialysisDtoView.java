package com.hms.ehat.dto;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ehat_dailysis_patient")
public class DialysisDtoView {


	@Id
	@GeneratedValue
	@Column(name = "patient_id")
	private Integer pId;
	
	@Column(name = "patient_id",insertable=false , updatable=false)
	private String pIdd;
	
	@Column(name = "treatment_id")
	private Integer treatId;
	
	@Column(name = "patient_name")
	private String patientName;	
	
	@Column(name = "department_id")
	private String deptId;
	
	@Column(name = "opdipdno")
	private String opdipdno;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted;
	
	@Column(name = "t_flag")
	private String treatFlag;
	
	@Column(name = "mrnno")
	private String mrnno;
	
	@Column(name = "mobile")
	private String mobile;
	
	@Transient
	private List<DialysisDtoView> lstDialysisQueue;
	
	public List<DialysisDtoView> getLstDialysisQueue() {
		return lstDialysisQueue;
	}

	public void setLstDialysisQueue(List<DialysisDtoView> lstDialysisQueue) {
		this.lstDialysisQueue = lstDialysisQueue;
	}

	public Integer getpId() {
		return pId;
	}

	public void setpId(Integer pId) {
		this.pId = pId;
	}

	public Integer getTreatId() {
		return treatId;
	}

	public void setTreatId(Integer treatId) {
		this.treatId = treatId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getTreatFlag() {
		return treatFlag;
	}

	public void setTreatFlag(String treatFlag) {
		this.treatFlag = treatFlag;
	}

	
	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getMrnno() {
		return mrnno;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}	
	 
}

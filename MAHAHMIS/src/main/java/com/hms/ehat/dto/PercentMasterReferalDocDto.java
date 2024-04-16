package com.hms.ehat.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;



@Entity
@Table(name = "percent_master_referal_doc")
public class PercentMasterReferalDocDto {

	@Id
	@GeneratedValue
	@Column(name = "per_master_id")
	private int perMasterId;

	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "dept_id")
	private int deptId;
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Column(name = "unit_name")
	private String unitName;
	
	@Column(name = "doctor_id")
	private int doctorId;
	
	@Column(name = "case_type")
	private int caseType;
	
	@Column(name = "hosp_percent")
	private double hospPercent;
	
	@Column(name = "doctor_name")
	private String doctorName;
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.DATE)
	@Column(name = "created_date",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "updated_date")
	private Date updatedDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "deleted_date")
	private Date deletedDate;
	
	@Column(name = "dr_dept_id")
	private Integer drDeptId=0;
	
	@Column(name = "dr_dept_flag")
	private String drDeptFlag="N";
	
	@Column(name = "charges_slave_id")
	private int chargesSlaveId;
	
	@Column(name = "charges_id")
	private int chargesId;
	
	@Transient
	private String drDeptName;
	
	@Transient
	private List<PercentMasterReferalDocDto> listPerMaster;
	
	@Transient
	private List<Integer> serIdList;
	@Transient
	private List<Double> serIdListPer;
	@Transient
	private List<Integer> subSerIdList;
	@Transient
	private List<Double> subSerIdListPer;
	
	@Transient
	private String sponserName;

	
	@Column(name = "payment_type")
	private int paymentType;
	
	
	public int getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(int paymentType) {
		this.paymentType = paymentType;
	}

	public String getSponserName() {
		return sponserName;
	}

	public void setSponserName(String sponserName) {
		this.sponserName = sponserName;
	}

	public int getPerMasterId() {
		return perMasterId;
	}

	public void setPerMasterId(int perMasterId) {
		this.perMasterId = perMasterId;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public double getHospPercent() {
		return hospPercent;
	}

	public void setHospPercent(double hospPercent) {
		this.hospPercent = hospPercent;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<PercentMasterReferalDocDto> getListPerMaster() {
		return listPerMaster;
	}

	public void setListPerMaster(List<PercentMasterReferalDocDto> listPerMaster) {
		this.listPerMaster = listPerMaster;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public int getCaseType() {
		return caseType;
	}

	public void setCaseType(int caseType) {
		this.caseType = caseType;
	}

	public Integer getDrDeptId() {
		return drDeptId;
	}

	public void setDrDeptId(Integer drDeptId) {
		this.drDeptId = drDeptId;
	}

	public String getDrDeptFlag() {
		return drDeptFlag;
	}

	public void setDrDeptFlag(String drDeptFlag) {
		this.drDeptFlag = drDeptFlag;
	}

	public String getDrDeptName() {
		return drDeptName;
	}

	public void setDrDeptName(String drDeptName) {
		this.drDeptName = drDeptName;
	}

	public int getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(int chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public int getChargesId() {
		return chargesId;
	}

	public void setChargesId(int chargesId) {
		this.chargesId = chargesId;
	}

	public List<Integer> getSerIdList() {
		return serIdList;
	}

	public void setSerIdList(List<Integer> serIdList) {
		this.serIdList = serIdList;
	}

	public List<Integer> getSubSerIdList() {
		return subSerIdList;
	}

	public void setSubSerIdList(List<Integer> subSerIdList) {
		this.subSerIdList = subSerIdList;
	}

	public List<Double> getSerIdListPer() {
		return serIdListPer;
	}

	public void setSerIdListPer(List<Double> serIdListPer) {
		this.serIdListPer = serIdListPer;
	}

	public List<Double> getSubSerIdListPer() {
		return subSerIdListPer;
	}

	public void setSubSerIdListPer(List<Double> subSerIdListPer) {
		this.subSerIdListPer = subSerIdListPer;
	}
	
	
}

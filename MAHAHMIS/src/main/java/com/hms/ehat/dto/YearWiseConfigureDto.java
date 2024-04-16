package com.hms.ehat.dto;

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
@Table(name = "ehat_configyearwise")
public class YearWiseConfigureDto {
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer configId;

	@Column(name = "service_id", columnDefinition="int default 0")
	private Integer serviceId;

	@Column(name = " master_id",columnDefinition="int default 0")
	private Integer masterId;

	@Column(name = " unit_id" ,columnDefinition="int default 0")
	private Integer unitId;
	
	@Column(name = "operator_year")
	private String operator;

	@Column(name = "charges")
	private double charges;

	@Column(name = "number_year")
	private double number;

	@Column(name = " increaseordecrease")
	private String increaseordecrease;

	@Column(name = "distribute")
	private double distribute;

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "deleted")
	private String deleted;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "fromDate")
	private Date fromDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "toDate")
	private Date toDate;

	@Column(name = " hall_charges",columnDefinition="int default 0")
	private double hallCharges;
	
	@Column(name = " medical_team_charges",columnDefinition="int default 0")
	private double medicalCharges;
	
	
	@Column(name = "totalcharges" ,columnDefinition="double default 0")
	private double totalcharges;
	
	
	@Column(name = " serviceLastId",columnDefinition="int default 0")
	private Integer serviceLastId;
	
	
	@Column(name = "iscombination")
	private String iscombination="N";
	
	@Column(name = " department_id",columnDefinition="int default 0")
	private Integer departMentID;
	
	@Column(name = " count_date",columnDefinition="int default 0")
	private int countDate;
	
	@Transient
	private List<YearWiseConfigureDto> lstyearwise;

	public Integer getConfigId() {
		return configId;
	}

	public void setConfigId(Integer configId) {
		this.configId = configId;
	}

	public Integer getServiceId() {
		return serviceId;
	}

	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	public Integer getMasterId() {
		return masterId;
	}

	public void setMasterId(Integer masterId) {
		this.masterId = masterId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public double getCharges() {
		return charges;
	}

	public void setCharges(double charges) {
		this.charges = charges;
	}

	public double getNumber() {
		return number;
	}

	public void setNumber(double number) {
		this.number = number;
	}

	public String getIncreaseordecrease() {
		return increaseordecrease;
	}

	public void setIncreaseordecrease(String increaseordecrease) {
		this.increaseordecrease = increaseordecrease;
	}

	public double getDistribute() {
		return distribute;
	}

	public void setDistribute(double distribute) {
		this.distribute = distribute;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public double getHallCharges() {
		return hallCharges;
	}

	public void setHallCharges(double hallCharges) {
		this.hallCharges = hallCharges;
	}

	public double getMedicalCharges() {
		return medicalCharges;
	}

	public void setMedicalCharges(double medicalCharges) {
		this.medicalCharges = medicalCharges;
	}

	public double getTotalcharges() {
		return totalcharges;
	}

	public void setTotalcharges(double totalcharges) {
		this.totalcharges = totalcharges;
	}

	public Integer getServiceLastId() {
		return serviceLastId;
	}

	public void setServiceLastId(Integer serviceLastId) {
		this.serviceLastId = serviceLastId;
	}

	public String getIscombination() {
		return iscombination;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public Integer getDepartMentID() {
		return departMentID;
	}

	public void setDepartMentID(Integer departMentID) {
		this.departMentID = departMentID;
	}

	public List<YearWiseConfigureDto> getLstyearwise() {
		return lstyearwise;
	}

	public void setLstyearwise(List<YearWiseConfigureDto> lstyearwise) {
		this.lstyearwise = lstyearwise;
	}

	@Transient
	private String serviceName;
	
	@Transient
	private double oldCharges;

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public double getOldCharges() {
		return oldCharges;
	}

	public void setOldCharges(double oldCharges) {
		this.oldCharges = oldCharges;
	}

	public int getCountDate() {
		return countDate;
	}

	public void setCountDate(int countDate) {
		this.countDate = countDate;
	}

	
	
}

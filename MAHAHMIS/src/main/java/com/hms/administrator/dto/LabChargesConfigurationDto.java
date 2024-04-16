package com.hms.administrator.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;


@Entity
@Component
@Table(name = "lab_charges_configuration")
public class LabChargesConfigurationDto {
   
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer configId;
	
	@Column(name = "customer_type")
	private Integer custType;
	
	@Column(name = "customer_name")
	private Integer custName;	

	@Column(name = "service_id", columnDefinition="int default 0")
	private Integer serviceId;

	@Column(name = " master_id",columnDefinition="int default 0")
	private Integer masterId;

	@Column(name = " unit_id" ,columnDefinition="int default 0")
	private Integer unitId;

	@Column(name = " charges_id" ,columnDefinition="int default 0")
	private Integer chargesId;

	@Column(name = " chargesSlave_id",columnDefinition="int default 0")
	private Integer chargesSlaveId;	
	
	@Column(name = " operator")
	private String operator;

	@Column(name = "charges")
	private double charges;

	@Column(name = "number")
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

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
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

	@Transient
	private List<LabChargesConfigurationDto> lstConfigurService;

	@Column(name = " department_id",columnDefinition="int default 0")
	private Integer departMentID;
	
	@Column(name = " hall_id" ,columnDefinition="int default 0")
	private Integer hallId;

	@Column(name = " hallSlave_id",columnDefinition="int default 0")
	private Integer hallSlaveId;
	
	@Column(name = " hall_charges",columnDefinition="int default 0")
	private double hallCharges;
	
	@Column(name = " medical_team_charges",columnDefinition="int default 0")
	private double medicalCharges;
	
	@Column(name = "copy",columnDefinition="double default 0")
	private double copay;
	
	@Column(name = "totalcharges" ,columnDefinition="double default 0")
	private double totalcharges;
	
	@Column(name = " is_com_servId" ,columnDefinition="int default 0")
	private Integer isComServId;

	@Column(name = " is_com_servlastId",columnDefinition="int default 0")
	private Integer isComServlastId;

	@Column(name = " serviceLastId",columnDefinition="int default 0")
	private Integer serviceLastId;
		
	@Column(name = "iscombination" ,columnDefinition="default 'N'")
	private String iscombination;
	
	@Column(name = "iscat_hall")
	private String iscatHall;
	
	@Column(name = "selfid")
	private Integer selfId;	
	
	@Column(name = "codenamech")
	private String codenamech="0";
	
	public Integer getConfigId() {
		return configId;
	}

	public void setConfigId(Integer configId) {
		this.configId = configId;
	}

	public Integer getCustType() {
		return custType;
	}

	public void setCustType(Integer custType) {
		this.custType = custType;
	}

	public Integer getCustName() {
		return custName;
	}

	public void setCustName(Integer custName) {
		this.custName = custName;
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

	public Integer getChargesId() {
		return chargesId;
	}

	public void setChargesId(Integer chargesId) {
		this.chargesId = chargesId;
	}

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
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

	public List<LabChargesConfigurationDto> getLstConfigurService() {
		return lstConfigurService;
	}

	public void setLstConfigurService(List<LabChargesConfigurationDto> lstConfigurService) {
		this.lstConfigurService = lstConfigurService;
	}

	public Integer getDepartMentID() {
		return departMentID;
	}

	public void setDepartMentID(Integer departMentID) {
		this.departMentID = departMentID;
	}

	public Integer getHallId() {
		return hallId;
	}

	public void setHallId(Integer hallId) {
		this.hallId = hallId;
	}

	public Integer getHallSlaveId() {
		return hallSlaveId;
	}

	public void setHallSlaveId(Integer hallSlaveId) {
		this.hallSlaveId = hallSlaveId;
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

	public double getCopay() {
		return copay;
	}

	public void setCopay(double copay) {
		this.copay = copay;
	}

	public double getTotalcharges() {
		return totalcharges;
	}

	public void setTotalcharges(double totalcharges) {
		this.totalcharges = totalcharges;
	}

	public Integer getIsComServId() {
		return isComServId;
	}

	public void setIsComServId(Integer isComServId) {
		this.isComServId = isComServId;
	}

	public Integer getIsComServlastId() {
		return isComServlastId;
	}

	public void setIsComServlastId(Integer isComServlastId) {
		this.isComServlastId = isComServlastId;
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

	public String getIscatHall() {
		return iscatHall;
	}

	public void setIscatHall(String iscatHall) {
		this.iscatHall = iscatHall;
	}

	public Integer getSelfId() {
		return selfId;
	}

	public void setSelfId(Integer selfId) {
		this.selfId = selfId;
	}

	public String getCodenamech() {
		return codenamech;
	}

	public void setCodenamech(String codenamech) {
		this.codenamech = codenamech;
	}
}

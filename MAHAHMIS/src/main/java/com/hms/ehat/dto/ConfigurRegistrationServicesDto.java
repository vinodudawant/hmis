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
@Table(name = "ehat_configuration_Registration_service")
public class ConfigurRegistrationServicesDto {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue()
	@Column(name = "id")
	private Integer configId;

	@Column(name = "service_id", columnDefinition="int default 0")
	private Integer serviceId;

	@Column(name = " master_id",columnDefinition="int default 0")
	private Integer masterId;

	@Column(name = " unit_id" ,columnDefinition="int default 0")
	private Integer unitId;

	/*
	 * @Column(name = " charges_id" ,columnDefinition="int default 0") private
	 * Integer chargesId;
	 */

	@Column(name = " chargesSlave_id",columnDefinition="int default 0")
	private Integer chargesSlaveId;	
	
	/*
	 * @Column(name = " operator") private String operator;
	 * 
	 * @Column(name = "charges",columnDefinition="double default 0") private double
	 * charges;
	 * 
	 * @Column(name = "number",columnDefinition="double default 0") private double
	 * number;
	 */

	/*
	 * @Column(name = " increaseordecrease") private String increaseordecrease;
	 * 
	 * @Column(name = "distribute", columnDefinition="double default 0") private
	 * double distribute;
	 */
	
	@Column(name = " department_id",columnDefinition="int default 0")
	private Integer departMentID;
	
	@Column(name = " hall_id" ,columnDefinition="int default 0")
	private Integer hallId;

	@Column(name = " hallSlave_id",columnDefinition="int default 0")
	private Integer hallSlaveId;
	
	@Column(name = " hall_charges",columnDefinition="double default 0")
	private double hallCharges;
	
	/*
	 * @Column(name = " medical_team_charges",columnDefinition="double default 0")
	 * private double medicalCharges;
	 */
	@Column(name = "iso_hall_charges",columnDefinition="double default 0")
	private double isoHallCharges;
	
	/*
	 * @Column(name =
	 * "iso_medical_team_charges",columnDefinition="double default 0") private
	 * double isoMedicalCharges;
	 */
	
	/*@Column(name = "copy",columnDefinition="double default 0")
	private double copay;
	
	@Column(name = "totalcharges" ,columnDefinition="double default 0")
	private double totalcharges;
	
	@Column(name = " is_com_servId" ,columnDefinition="int default 0")
	private Integer isComServId;

	@Column(name = " is_com_servlastId",columnDefinition="int default 0")
	private Integer isComServlastId;

	@Column(name = " serviceLastId",columnDefinition="int default 0")
	private Integer serviceLastId;	
	
	@Column(name = "iscombination" ,columnDefinition="varchar(2) default 'N'")
	private String iscombination;*/
	
	@Column(name = "iscat_hall")
	private String iscatHall;
	
	/*
	 * @Column(name = "selfid") private Integer selfId;
	 */
	
//	@Column(name = "codenamech")
//	private String codenamech="0";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	/*
	 * @Column(name = "updated_by") private Integer updatedBy;
	 */

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	/*
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "deleted_date_time") private Date deletedDate;
	 */
	
	@Column(name = "opdCharges",columnDefinition="double default 0")
	private double opdCharges;
	
	@Column(name = "ipdCharges",columnDefinition="double default 0")
	private double ipdCharges;
	
	@Column(name = "diagCharges",columnDefinition="double default 0")
	private double diagCharges;

	/*@Temporal(TemporalType.DATE)
	@Column(name = "fromDate")
	private Date fromDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "toDate")
	private Date toDate;*/

	@Transient
	private List<ConfigurRegistrationServicesDto> lstConfigurService;

	public Integer getConfigId() {
		return configId;
	}

	public double getOpdCharges() {
		return opdCharges;
	}

	public void setOpdCharges(double opdCharges) {
		this.opdCharges = opdCharges;
	}

	public double getIpdCharges() {
		return ipdCharges;
	}

	public void setIpdCharges(double ipdCharges) {
		this.ipdCharges = ipdCharges;
	}

	public double getDiagCharges() {
		return diagCharges;
	}

	public void setDiagCharges(double diagCharges) {
		this.diagCharges = diagCharges;
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

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
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

	public double getIsoHallCharges() {
		return isoHallCharges;
	}

	public void setIsoHallCharges(double isoHallCharges) {
		this.isoHallCharges = isoHallCharges;
	}

	
	public String getIscatHall() {
		return iscatHall;
	}

	public void setIscatHall(String iscatHall) {
		this.iscatHall = iscatHall;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
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

	
	public List<ConfigurRegistrationServicesDto> getLstConfigurService() {
		return lstConfigurService;
	}

	public void setLstConfigurService(List<ConfigurRegistrationServicesDto> lstConfigurService) {
		this.lstConfigurService = lstConfigurService;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "ConfigurRegistrationServicesDto [configId=" + configId + ", serviceId=" + serviceId + ", masterId="
				+ masterId + ", unitId=" + unitId + ", chargesSlaveId=" + chargesSlaveId + ", departMentID="
				+ departMentID + ", hallId=" + hallId + ", hallSlaveId=" + hallSlaveId + ", hallCharges=" + hallCharges
				+ ", isoHallCharges=" + isoHallCharges + ", iscatHall=" + iscatHall + ", createdBy=" + createdBy
				+ ", deletedBy=" + deletedBy + ", deleted=" + deleted + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", opdCharges=" + opdCharges + ", ipdCharges=" + ipdCharges
				+ ", diagCharges=" + diagCharges + ", lstConfigurService=" + lstConfigurService + "]";
	}
	
	
}

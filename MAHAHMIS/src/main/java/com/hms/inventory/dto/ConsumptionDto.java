package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;
@Entity
@Component
@Table(name="inv_consumption_master_new")
public class ConsumptionDto {

	@Transient
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@CreationTimestamp
	@Column(name="created_date_time" ,updatable = false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="created_by",updatable = false)
	private int createdBy;
	
	@Column(name="updated_by")
	private int updatedBy;
	
	@Column(name="deleted_by")
	private int deleted_by;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name="dispensed_date")
	private String dispensedDate;
	
	@Column(name="consumed_by")
	private String consumedBy;
	
	@Column(name="dispensed_to")
	private String dispensedTo;
	
	@Column(name="dispensed_to_id")
	private Integer dispensedToId;
	
	@Column(name="dispensed_to_other")
	private String dispensedToOther;
	
	@Column(name="remark")
	private String remark;
	
	@Column(name="subinv_id")
	private Integer subinvId;
	
	@Column(name="subinv_name")
	private String subinvName;
	
	@Column(name="patient_id")
	private Integer patientId;//added by dayanand (14-2-2020)
	
	@Column(name="patient_name")//added by dayanand (14-2-2020)
	private String patientName;
	

	@Column(name="department_name")//added by dayanand (14-2-2020)
	private String departMent;
	
	
	@Transient
	private List<ConsumptionDto> lstConsumptionDto;
	
	@Transient
	private Integer noOfPages;
	
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="consumption_id")
	private List<ConsumptionItemSlaveDto> consumptionItemSlaveDto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public int getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getDispensedDate() {
		return dispensedDate;
	}

	public void setDispensedDate(String dispensedDate) {
		this.dispensedDate = dispensedDate;
	}

	public String getConsumedBy() {
		return consumedBy;
	}

	public void setConsumedBy(String consumedBy) {
		this.consumedBy = consumedBy;
	}

	public String getDispensedTo() {
		return dispensedTo;
	}

	public void setDispensedTo(String dispensedTo) {
		this.dispensedTo = dispensedTo;
	}

	public Integer getDispensedToId() {
		return dispensedToId;
	}

	public void setDispensedToId(Integer dispensedToId) {
		this.dispensedToId = dispensedToId;
	}

	public String getDispensedToOther() {
		return dispensedToOther;
	}

	public void setDispensedToOther(String dispensedToOther) {
		this.dispensedToOther = dispensedToOther;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getSubinvId() {
		return subinvId;
	}

	public void setSubinvId(Integer subinvId) {
		this.subinvId = subinvId;
	}

	public String getSubinvName() {
		return subinvName;
	}

	public void setSubinvName(String subinvName) {
		this.subinvName = subinvName;
	}

	public List<ConsumptionDto> getLstConsumptionDto() {
		return lstConsumptionDto;
	}

	public void setLstConsumptionDto(List<ConsumptionDto> lstConsumptionDto) {
		this.lstConsumptionDto = lstConsumptionDto;
	}

	public List<ConsumptionItemSlaveDto> getConsumptionItemSlaveDto() {
		return consumptionItemSlaveDto;
	}

	public void setConsumptionItemSlaveDto(
			List<ConsumptionItemSlaveDto> consumptionItemSlaveDto) {
		this.consumptionItemSlaveDto = consumptionItemSlaveDto;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "ConsumptionDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by
				+ ", deleted=" + deleted + ", deletedDate=" + deletedDate
				+ ", unitId=" + unitId + ", dispensedDate=" + dispensedDate
				+ ", consumedBy=" + consumedBy + ", dispensedTo=" + dispensedTo
				+ ", dispensedToId=" + dispensedToId + ", dispensedToOther="
				+ dispensedToOther + ", remark=" + remark + ", subinvId="
				+ subinvId + ", subinvName=" + subinvName
				+ ", lstConsumptionDto=" + lstConsumptionDto
				+ ", consumptionItemSlaveDto=" + consumptionItemSlaveDto + "]";
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDepartMent() {
		return departMent;
	}

	public void setDepartMent(String departMent) {
		this.departMent = departMent;
	}

	public Integer getNoOfPages() {
		return noOfPages;
	}

	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}
	
	
}

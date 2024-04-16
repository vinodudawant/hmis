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

import org.springframework.stereotype.Component;

@Entity
@Table(name="pathology_collection_center_master")
@Component
public class CollectionCenterMasterDto {
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
/*	@Column(name = "lab_id")
	private Integer labId;*/
	
	@Column(name = "center_name")
	private String centerName;
	
	@Column(name = "center_code")
	private Integer centerCode;
	
	@Column(name = "incharge_person")
	private String inchargePerson;
	
	@Column(name = "phone_no")
	private String phoneNo;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "city_name")
	private String cityName;
	
	@Column(name = "email_id")
	private String emailId;
	
	@Transient
	private List<CollectionCenterMasterDto> lstCollectionCenterMaster;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
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

/*	public Integer getLabId() {
		return labId;
	}

	public void setLabId(Integer labId) {
		this.labId = labId;
	}*/

	public String getCenterName() {
		return centerName;
	}

	public void setCenterName(String centerName) {
		this.centerName = centerName;
	}

	public Integer getCenterCode() {
		return centerCode;
	}

	public void setCenterCode(Integer centerCode) {
		this.centerCode = centerCode;
	}

	public String getInchargePerson() {
		return inchargePerson;
	}

	public void setInchargePerson(String inchargePerson) {
		this.inchargePerson = inchargePerson;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public List<CollectionCenterMasterDto> getLstCollectionCenterMaster() {
		return lstCollectionCenterMaster;
	}

	public void setLstCollectionCenterMaster(
			List<CollectionCenterMasterDto> lstCollectionCenterMaster) {
		this.lstCollectionCenterMaster = lstCollectionCenterMaster;
	}


	
	
}

package com.hms.pathology.dto;

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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;



@Entity
@Table(name = "pathology_out_lab_contact_info")
@Component
public class OutLabContactInfoDto {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "outlab_contact_id")
	private Integer id;

	@Column(name = "outlab_contact_info_name")
	private String contactName;

	@Column(name = "outlab_contact_info_designation")
	private String contactDesignation;

	@Column(name = "outlab_contact_info_address")
	private String contactAddress;

	@Column(name = "outlab_contact_info_gender")
	private String contactGender;

	@Column(name = "outlab_contact_info_dob")
	private String contactDob;

	@Column(name = "outlab_contact_info_phone_number1")
	private String contactPhoneNumber1;

	@Column(name = "outlab_contact_info_phone_number2")
	private String contactPhoneNumber2;

	@Column(name = "outlab_contact_info_email")
	private String contactEmail;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<OutLabContactInfoDto> outlabContactInfoDtoList;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public String getContactDesignation() {
		return contactDesignation;
	}

	public void setContactDesignation(String contactDesignation) {
		this.contactDesignation = contactDesignation;
	}

	public String getContactAddress() {
		return contactAddress;
	}

	public void setContactAddress(String contactAddress) {
		this.contactAddress = contactAddress;
	}

	public String getContactGender() {
		return contactGender;
	}

	public void setContactGender(String contactGender) {
		this.contactGender = contactGender;
	}

	public String getContactDob() {
		return contactDob;
	}

	public void setContactDob(String contactDob) {
		this.contactDob = contactDob;
	}

	public String getContactPhoneNumber1() {
		return contactPhoneNumber1;
	}

	public void setContactPhoneNumber1(String contactPhoneNumber1) {
		this.contactPhoneNumber1 = contactPhoneNumber1;
	}

	public String getContactPhoneNumber2() {
		return contactPhoneNumber2;
	}

	public void setContactPhoneNumber2(String contactPhoneNumber2) {
		this.contactPhoneNumber2 = contactPhoneNumber2;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
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
	@JsonGetter("outlabContactInfoDtoList")
	public List<OutLabContactInfoDto> getOutlabContactInfoDtoList() {
		return outlabContactInfoDtoList;
	}
	@JsonSetter("outlabContactInfoDtoList")
	public void setOutlabContactInfoDtoList(
			List<OutLabContactInfoDto> outlabContactInfoDtoList) {
		this.outlabContactInfoDtoList = outlabContactInfoDtoList;
	}
	
	
}

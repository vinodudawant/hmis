package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


@Entity
@Table(name = "inv_good_receipt_note_contact_slave")
@JsonDeserialize(as = GoodReceiptNoteContactDto.class)
public class GoodReceiptNoteContactDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;

	@Column(name = "grn_contact_name")
	private String contactName;

	@Column(name = "grn_contact_designation")
	private String contactDesignation;

	@Column(name = "grn_contact_address")
	private String contactAddress;

	@Column(name = "grn_contact_gender")
	private String contactGender;

	@Column(name = "grn_contact_dob")
	private String contactDob;

	@Column(name = "grn_contact_phone_number1")
	private String contactPhoneNumber1;

	@Column(name = "grn_contact_phone_number2")
	private String contactPhoneNumber2;

	@Column(name = "grn_contact_email")
	private String contactEmail;
	
	@Column(name = "grn_created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "grn_updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "grn_created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	@Column(name = "grn_updated_date_time")
	private Date updatedDate;

	@Column(name = "grn_deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";

	@Column(name = "grn_deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "grn_delete_date_time")
	private Date deletedDate;

	@Column(name = "grn_unit_id")
	private Integer unitId;

	@Transient
	private List<GoodReceiptNoteContactDto> goodReceiptNoteContactDto;

	public Integer getId() {
		return id;
	}

	public String getContactName() {
		return contactName;
	}

	public String getContactDesignation() {
		return contactDesignation;
	}

	public String getContactAddress() {
		return contactAddress;
	}

	public String getContactGender() {
		return contactGender;
	}

	public String getContactDob() {
		return contactDob;
	}

	public String getContactPhoneNumber1() {
		return contactPhoneNumber1;
	}

	public String getContactPhoneNumber2() {
		return contactPhoneNumber2;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public List<GoodReceiptNoteContactDto> getGoodReceiptNoteContactDto() {
		return goodReceiptNoteContactDto;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public void setContactDesignation(String contactDesignation) {
		this.contactDesignation = contactDesignation;
	}

	public void setContactAddress(String contactAddress) {
		this.contactAddress = contactAddress;
	}

	public void setContactGender(String contactGender) {
		this.contactGender = contactGender;
	}

	public void setContactDob(String contactDob) {
		this.contactDob = contactDob;
	}

	public void setContactPhoneNumber1(String contactPhoneNumber1) {
		this.contactPhoneNumber1 = contactPhoneNumber1;
	}

	public void setContactPhoneNumber2(String contactPhoneNumber2) {
		this.contactPhoneNumber2 = contactPhoneNumber2;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public void setGoodReceiptNoteContactDto(
			List<GoodReceiptNoteContactDto> goodReceiptNoteContactDto) {
		this.goodReceiptNoteContactDto = goodReceiptNoteContactDto;
	}

	@Override
	public String toString() {
		return "GoodReceiptNoteContactDto [id=" + id + ", contactName="
				+ contactName + ", contactDesignation=" + contactDesignation
				+ ", contactAddress=" + contactAddress + ", contactGender="
				+ contactGender + ", contactDob=" + contactDob
				+ ", contactPhoneNumber1=" + contactPhoneNumber1
				+ ", contactPhoneNumber2=" + contactPhoneNumber2
				+ ", contactEmail=" + contactEmail + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deleted=" + deleted
				+ ", deletedBy=" + deletedBy + ", deletedDate=" + deletedDate
				+ ", unitId=" + unitId + ", goodReceiptNoteContactDto="
				+ goodReceiptNoteContactDto + "]";
	}

}

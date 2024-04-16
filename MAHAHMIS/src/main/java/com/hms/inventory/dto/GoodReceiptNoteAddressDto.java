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
@Table(name = "inv_good_receipt_note_address_slave")
@JsonDeserialize(as = GoodReceiptNoteAddressDto.class)
public class GoodReceiptNoteAddressDto {
	
	@Id
	@GeneratedValue
	@Column(name =  "id")
	private Integer id;
	
	@Column(name = "grn_address_type")
	private String addressType;
	
	@Column(name = "grn_company_name")
	private String companyName;

	@Column(name = "grn_address")
	private String address;
	
	@Column(name = "grn_street")
	private String street;
	
	@Column(name = "grn_area")
	private String area;
	
	@Column(name = "grn_city")
	private String city;
	
	@Column(name = "grn_pin")
	private String pin;
	
	@Column(name = "grn_state")
	private String state;
	
	@Column(name = "grn_country")
	private String country;
	
	@Column(name = "grn_created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "grn_updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "grn_created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	@Column(name = "grn_updated_date_time")
	private Date updatedDate;

	@Column(name = "grn_deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "grn_delete_date_time")
	private Date deletedDate;

	@Column(name = "grn_unit_id")
	private Integer unitId;
	
	@Transient
	private List<GoodReceiptNoteAddressDto> goodReceiptNoteAddressDto;

	public Integer getId() {
		return id;
	}

	public String getAddressType() {
		return addressType;
	}

	public String getCompanyName() {
		return companyName;
	}

	public String getAddress() {
		return address;
	}

	public String getStreet() {
		return street;
	}

	public String getArea() {
		return area;
	}

	public String getCity() {
		return city;
	}

	public String getPin() {
		return pin;
	}

	public String getState() {
		return state;
	}

	public String getCountry() {
		return country;
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

	public List<GoodReceiptNoteAddressDto> getGoodReceiptNoteAddressDto() {
		return goodReceiptNoteAddressDto;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setAddressType(String addressType) {
		this.addressType = addressType;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setCountry(String country) {
		this.country = country;
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

	public void setGoodReceiptNoteAddressDto(
			List<GoodReceiptNoteAddressDto> goodReceiptNoteAddressDto) {
		this.goodReceiptNoteAddressDto = goodReceiptNoteAddressDto;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "GoodReceiptNoteAddressDto [id=" + id + ", addressType="
				+ addressType + ", companyName=" + companyName + ", address="
				+ address + ", street=" + street + ", area=" + area + ", city="
				+ city + ", pin=" + pin + ", state=" + state + ", country="
				+ country + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", goodReceiptNoteAddressDto="
				+ goodReceiptNoteAddressDto + "]";
	}
	
}

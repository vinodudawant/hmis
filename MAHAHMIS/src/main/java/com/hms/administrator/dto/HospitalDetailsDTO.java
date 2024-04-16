package com.hms.administrator.dto;

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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;


@Entity
@Table(name="channel_hospital")
public class HospitalDetailsDTO {
	@Id
	@GeneratedValue
	@Column(name = "idchannel_hospital")
	private int hosId;
	
	@Column(name = "hospital_name")
	private String Hos_name;
	
	@Column(name = "contact_no")
	private String contact_no;
	
	@Column(name = "website_add")
	private String website_add;
	
	@Column(name = "email_id")
	private String email_id;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "status")
	private String status;
	
	
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
	
	@Transient
	private List<HospitalDetailsDTO> HospitalDetailsDTOList;
	
	@JsonGetter("hosId")
	public int getHosId() {
		return hosId;
	}
	@JsonSetter("hosId")
	public void setHosId(int hosId) {
		this.hosId = hosId;
	}
	@JsonGetter("hos_name")
	public String getHos_name() {
		return Hos_name;
	}
	@JsonSetter("hos_name")
	public void setHos_name(String hos_name) {
		Hos_name = hos_name;
	}
	@JsonGetter("contact_no")
	public String getContact_no() {
		return contact_no;
	}
	@JsonSetter("contact_no")
	public void setContact_no(String contact_no) {
		this.contact_no = contact_no;
	}
	@JsonGetter("website_add")
	public String getWebsite_add() {
		return website_add;
	}
	@JsonSetter("website_add")
	public void setWebsite_add(String website_add) {
		this.website_add = website_add;
	}
	@JsonGetter("email_id")
	public String getEmail_id() {
		return email_id;
	}
	@JsonSetter("email_id")
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}
	@JsonGetter("address")
	public String getAddress() {
		return address;
	}
	@JsonSetter("address")
	public void setAddress(String address) {
		this.address = address;
	}
	@JsonGetter("hospitalDetailsDTOList")
	public List<HospitalDetailsDTO> getHospitalDetailsDTOList() {
		return HospitalDetailsDTOList;
	}
	@JsonSetter("hospitalDetailsDTOList")
	public void setHospitalDetailsDTOList(
			List<HospitalDetailsDTO> hospitalDetailsDTOList) {
		HospitalDetailsDTOList = hospitalDetailsDTOList;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
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

}

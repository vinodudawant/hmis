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
import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "pathology_out_lab_general_info")
@Component
@JsonDeserialize(as = OutLabGeneralInfoDto.class)
public class OutLabGeneralInfoDto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "outlab_general_id")
	private Integer id;
	
	@Column(name = "mobile")
	private String mobile;
	
	@Column(name = "landline")
	private String landline;
	
	@Column(name = "website")
	private String website;
	
	@Column(name = "pancardNo")
	private String pancardNo;
	
	@Column(name = "gstTransactionNo")
	private String gstTransactionNo;
	
	@Column(name = "mail")
	private String mail;
	
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
	private List<OutLabGeneralInfoDto> outlabrGeneralInfoDtoList;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getLandline() {
		return landline;
	}

	public void setLandline(String landline) {
		this.landline = landline;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getPancardNo() {
		return pancardNo;
	}

	public void setPancardNo(String pancardNo) {
		this.pancardNo = pancardNo;
	}

	public String getGstTransactionNo() {
		return gstTransactionNo;
	}

	public void setGstTransactionNo(String gstTransactionNo) {
		this.gstTransactionNo = gstTransactionNo;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
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

	@JsonGetter("outlabrGeneralInfoDtoList")
	public List<OutLabGeneralInfoDto> getOutlabrGeneralInfoDtoList() {
		return outlabrGeneralInfoDtoList;
	}
	@JsonSetter("outlabrGeneralInfoDtoList")
	public void setOutlabrGeneralInfoDtoList(
			List<OutLabGeneralInfoDto> outlabrGeneralInfoDtoList) {
		this.outlabrGeneralInfoDtoList = outlabrGeneralInfoDtoList;
	}

}

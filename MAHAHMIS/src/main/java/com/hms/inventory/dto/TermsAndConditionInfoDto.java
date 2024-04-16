package com.hms.inventory.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "inv_party_master_terms_condition_info_slave")
public class TermsAndConditionInfoDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "terms_condition_name", columnDefinition="text")
	private String termconditionName;
	
	@Column(name = "terms_condition_slave_id")
	private Integer termsConditionSlaveId;
	
	@Column(name = "heading_name")
	private String headingName;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	@UpdateTimestamp
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
	private List<TermsAndConditionInfoDto> termsAndConditionInfoDto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTermconditionName() {
		return termconditionName;
	}

	public void setTermconditionName(String termconditionName) {
		this.termconditionName = termconditionName;
	}

	public String getHeadingName() {
		return headingName;
	}

	public void setHeadingName(String headingName) {
		this.headingName = headingName;
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

	public List<TermsAndConditionInfoDto> getTermsAndConditionInfoDto() {
		return termsAndConditionInfoDto;
	}

	public void setTermsAndConditionInfoDto(
			List<TermsAndConditionInfoDto> termsAndConditionInfoDto) {
		this.termsAndConditionInfoDto = termsAndConditionInfoDto;
	}

	public Integer getTermsConditionSlaveId() {
		return termsConditionSlaveId;
	}

	public void setTermsConditionSlaveId(Integer termsConditionSlaveId) {
		this.termsConditionSlaveId = termsConditionSlaveId;
	}

	@Override
	public String toString() {
		return "TermsAndConditionInfoDto [id=" + id + ", termconditionName="
				+ termconditionName + ", termsConditionSlaveId="
				+ termsConditionSlaveId + ", headingName=" + headingName
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", termsAndConditionInfoDto="
				+ termsAndConditionInfoDto + "]";
	}
	
}

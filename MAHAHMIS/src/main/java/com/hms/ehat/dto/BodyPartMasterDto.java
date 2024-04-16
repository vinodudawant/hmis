package com.hms.ehat.dto;

import java.io.Serializable;
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
@Table(name="ehat_onco_emr_body_part")
public class BodyPartMasterDto implements Serializable {

	/**
	 * @author Vikas Godse-Body Part Master
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "body_part_id")
	private Integer bodyPartId;

	@Column(name = "body_part_name")
	private String bodyPartName;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "status")
	private String status;
	
	@Transient
	private List<BodyPartMasterDto> lstBodyParts;
	
	public List<BodyPartMasterDto> getLstBodyParts() {
		return lstBodyParts;
	}

	public void setLstBodyParts(List<BodyPartMasterDto> lstBodyParts) {
		this.lstBodyParts = lstBodyParts;
	}

	public Integer getBodyPartId() {
		return bodyPartId;
	}

	public void setBodyPartId(Integer bodyPartId) {
		this.bodyPartId = bodyPartId;
	}

	public String getBodyPartName() {
		return bodyPartName;
	}

	public void setBodyPartName(String bodyPartName) {
		this.bodyPartName = bodyPartName;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}

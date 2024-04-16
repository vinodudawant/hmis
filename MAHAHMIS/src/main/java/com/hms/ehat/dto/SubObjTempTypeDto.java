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
@Table(name="ehat_subjective_objective_template_type")
public class SubObjTempTypeDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "sub_obj_temp_type_id")
	private Integer subObjTempTypeId;
	
	@Column(name = "sub_obj_temp_type")
	private String subObjTempType;
	
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
	private List<SubObjTempTypeDto> lstSubObjTempType;

	public Integer getSubObjTempTypeId() {
		return subObjTempTypeId;
	}

	public void setSubObjTempTypeId(Integer subObjTempTypeId) {
		this.subObjTempTypeId = subObjTempTypeId;
	}

	public String getSubObjTempType() {
		return subObjTempType;
	}

	public void setSubObjTempType(String subObjTempType) {
		this.subObjTempType = subObjTempType;
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

	public List<SubObjTempTypeDto> getLstSubObjTempType() {
		return lstSubObjTempType;
	}

	public void setLstSubObjTempType(List<SubObjTempTypeDto> lstSubObjTempType) {
		this.lstSubObjTempType = lstSubObjTempType;
	}
}
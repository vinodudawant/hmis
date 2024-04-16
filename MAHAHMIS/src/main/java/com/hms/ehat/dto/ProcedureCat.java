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

import com.hms.ehat.controller.OTPercentageDTO;

@Entity
@Table(name = "ehat_procedurecategoryot")
public class ProcedureCat {
	@Id
	@GeneratedValue
	@Column(name = "pr_id")	
	private int pr_id;	
	@Column(name = "pr_name",columnDefinition="varchar(255) default 'N'")	
	private String pr_name;
	
	@Column(name = "status",columnDefinition="varchar(255) default 'N'")	
	private String delete="N";
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time")
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	
	

	@Transient
	private List<ProcedureCat> listProcedureCat;



	public int getPr_id() {
		return pr_id;
	}



	public void setPr_id(int pr_id) {
		this.pr_id = pr_id;
	}



	public String getPr_name() {
		return pr_name;
	}



	public void setPr_name(String pr_name) {
		this.pr_name = pr_name;
	}



	public String getDelete() {
		return delete;
	}



	public void setDelete(String delete) {
		this.delete = delete;
	}



	public Integer getCreatedBy() {
		return createdBy;
	}



	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}



	public Date getCreatedDateTime() {
		return createdDateTime;
	}



	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}



	public Integer getUpdatedBy() {
		return updatedBy;
	}



	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}



	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}



	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}



	public List<ProcedureCat> getListProcedureCat() {
		return listProcedureCat;
	}



	public void setListProcedureCat(List<ProcedureCat> listProcedureCat) {
		this.listProcedureCat = listProcedureCat;
	}

	
	





}

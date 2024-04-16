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
@Entity
@Table(name = "ehat_operationmaster")
public class OperationMaster {
	@Id
	@GeneratedValue
	@Column(name = "pr_id")	
	private int pr_id;	
	@Column(name = "percentage",columnDefinition="double default 0.00")	
	private double percentage;
	
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
	
	@Column(name = "opgrade")
	private Integer opgrade=0;
	@Column(name = "step")
	private Integer step=0;
	@Column(name = "unit")
	private Integer unit=0;

	@Transient
	private List<OperationMaster> listOperationMaster;



	
	
	
	
	public Integer getOpgrade() {
		return opgrade;
	}



	public void setOpgrade(Integer opgrade) {
		this.opgrade = opgrade;
	}



	public Integer getStep() {
		return step;
	}



	public void setStep(Integer step) {
		this.step = step;
	}



	public Integer getUnit() {
		return unit;
	}



	public void setUnit(Integer unit) {
		this.unit = unit;
	}



	public int getPr_id() {
		return pr_id;
	}



	public void setPr_id(int pr_id) {
		this.pr_id = pr_id;
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





	public double getPercentage() {
		return percentage;
	}



	public void setPercentage(double percentage) {
		this.percentage = percentage;
	}



	public List<OperationMaster> getListOperationMaster() {
		return listOperationMaster;
	}



	public void setListOperationMaster(List<OperationMaster> listOperationMaster) {
		this.listOperationMaster = listOperationMaster;
	}

	
	





}

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
@Table(name="ehat_emr_option_master")
public class QuestionOptionMasterDto implements Serializable{

	/**
	 * @author Vikas Godse-Question Slave
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "emr_option_master_id")
	private int qsnOptionId;
	
	@Column(name = "emr_option_name")
	private String optionName;
	
	@Column(name = "onco_emr_que_id")
	private int questionMasterId;
	

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
	private List<QuestionOptionMasterDto> optionList;

	public int getQsnOptionId() {
		return qsnOptionId;
	}

	public List<QuestionOptionMasterDto> getOptionList() {
		return optionList;
	}

	public void setOptionList(List<QuestionOptionMasterDto> optionList) {
		this.optionList = optionList;
	}
	public int getQuestionMasterId() {
		return questionMasterId;
	}

	public void setQuestionMasterId(int questionMasterId) {
		this.questionMasterId = questionMasterId;
	}

	public void setQsnOptionId(int qsnOptionId) {
		this.qsnOptionId = qsnOptionId;
	}

	public String getOptionName() {
		return optionName;
	}

	public void setOptionName(String optionName) {
		this.optionName = optionName;
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

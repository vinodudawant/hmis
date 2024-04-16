package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="pharma_form_master")
public class FormMaster implements Serializable 
{
	
	@Id
	@GeneratedValue
	@Column(name="form_id")
	private Integer formId;
	
	
	@Column(name="form_name")
	private String formName;
	
	@Column(name="form_delete_flag")
	private Integer formDeleteFlag;
	
	@Column(name="form_update_date")
	private Date formUpdateDate;

	@Column(name = "form_add_date")
	private Date formAddDate;
	
	public Date getFormAddDate() {
		return formAddDate;
	}

	public void setFormAddDate(Date formAddDate) {
		this.formAddDate = formAddDate;
	}

	public Integer getFormId() {
		return formId;
	}

	public void setFormId(Integer formId) {
		this.formId = formId;
	}

	public String getFormName() {
		return formName;
	}

	public void setFormName(String formName) {
		this.formName = formName;
	}

	public Integer getFormDeleteFlag() {
		return formDeleteFlag;
	}

	public void setFormDeleteFlag(Integer formDeleteFlag) {
		this.formDeleteFlag = formDeleteFlag;
	}

	public Date getFormUpdateDate() {
		return formUpdateDate;
	}

	public void setFormUpdateDate(Date formUpdateDate) {
		this.formUpdateDate = formUpdateDate;
	}

		

}

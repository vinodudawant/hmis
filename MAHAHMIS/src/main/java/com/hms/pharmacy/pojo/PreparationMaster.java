package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
@Entity
@Table(name="pharma_preparation_master")
public class PreparationMaster implements Serializable 
{
	
	@Id
	@GeneratedValue
	@Column(name="preparation_id")
	private Integer preparationId;
	
	@Column(name="preparation_name")
	private String preparationName;
	
	@Column(name="preparation_code")
	private String preparationCode;
	
	@Column(name="preparation_delete_flag")
	private Integer preparationDeleteFlag;
	
	@Column(name="preparation_update_date")
	private Date preparationUpdateDate;

	@Column(name = "preparation_add_date")
	private Date preparationAddDate;
	
	@Column(name="preparation_qty",columnDefinition="varchar default '0'")
	private String preparationQty="0";
	
	
	
	public String getPreparationCode() {
		return preparationCode;
	}

	public void setPreparationCode(String preparationCode) {
		this.preparationCode = preparationCode;
	}

	public String getPreparationQty() {
		return preparationQty;
	}

	public void setPreparationQty(String preparationQty) {
		this.preparationQty = preparationQty;
	}

	@Transient
	private List<PreparationMaster> listpreparationmaster;
	
	public Integer getPreparationId() {
		return preparationId;
	}

	public void setPreparationId(Integer preparationId) {
		this.preparationId = preparationId;
	}

	public String getPreparationName() {
		return preparationName;
	}

	public void setPreparationName(String preparationName) {
		this.preparationName = preparationName;
	}

	public Integer getPreparationDeleteFlag() {
		return preparationDeleteFlag;
	}

	public void setPreparationDeleteFlag(Integer preparationDeleteFlag) {
		this.preparationDeleteFlag = preparationDeleteFlag;
	}

	public Date getPreparationUpdateDate() {
		return preparationUpdateDate;
	}

	public void setPreparationUpdateDate(Date preparationUpdateDate) {
		this.preparationUpdateDate = preparationUpdateDate;
	}

	public Date getPreparationAddDate() {
		return preparationAddDate;
	}

	public void setPreparationAddDate(Date preparationAddDate) {
		this.preparationAddDate = preparationAddDate;
	}

	public List<PreparationMaster> getListpreparationmaster() {
		return listpreparationmaster;
	}

	public void setListpreparationmaster(List<PreparationMaster> listpreparationmaster) {
		this.listpreparationmaster = listpreparationmaster;
	}

		
	
}

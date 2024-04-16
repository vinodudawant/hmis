package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="pharma_strength_master")
public class StrengthMaster implements Serializable
{
	
	@Id
	@GeneratedValue
	@Column(name="strength_id")
	private Integer strengthId;
	
	@Column(name="strength_name")
	private String strengthName;
	
	@Column(name="strength_delete_flag")
	private Integer strengthDeleteFlag;
	
	@Column(name="strength_update_date")
	private Date strengthUpdateDate;

	@Column(name = "strength_add_date")
	private Date strengthAddDate;
	
	public Integer getStrengthId() {
		return strengthId;
	}

	public void setStrengthId(Integer strengthId) {
		this.strengthId = strengthId;
	}

	public String getStrengthName() {
		return strengthName;
	}

	public void setStrengthName(String strengthName) {
		this.strengthName = strengthName;
	}

	public Integer getStrengthDeleteFlag() {
		return strengthDeleteFlag;
	}

	public void setStrengthDeleteFlag(Integer strengthDeleteFlag) {
		this.strengthDeleteFlag = strengthDeleteFlag;
	}

	public Date getStrengthUpdateDate() {
		return strengthUpdateDate;
	}

	public void setStrengthUpdateDate(Date strengthUpdateDate) {
		this.strengthUpdateDate = strengthUpdateDate;
	}

	public Date getStrengthAddDate() {
		return strengthAddDate;
	}

	public void setStrengthAddDate(Date strengthAddDate) {
		this.strengthAddDate = strengthAddDate;
	}
	
}

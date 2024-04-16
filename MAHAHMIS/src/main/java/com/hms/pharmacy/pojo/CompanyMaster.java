package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pharma_company_master")
public class CompanyMaster implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "comp_id")
	private Integer compId;

	@Column(name = "comp_name")
	private String compName;

	@Column(name = "comp_short_name")
	private String compShortName;

	@Column(name = "comp_delete_flag")
	private Integer compDeleteFlag;

	/*
	 * @Column(name = "comp_add_date") private Date compAddDate;
	 */
	
	/*
	 * @Column(name = "comp_update_date") private Date compUpdateDate;
	 */
	
	@CreationTimestamp
	@Column(name="comp_add_date")
	private Date compAddDate;
	@UpdateTimestamp
	@Column(name="comp_update_date")
	private Date compUpdateDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id", columnDefinition="int default '0'")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	public Integer getCompId() {
		return compId;
	}

	public void setCompId(Integer compId) {
		this.compId = compId;
	}

	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public String getCompShortName() {
		return compShortName;
	}

	public void setCompShortName(String compShortName) {
		this.compShortName = compShortName;
	}

	public Integer getCompDeleteFlag() {
		return compDeleteFlag;
	}

	public void setCompDeleteFlag(Integer compDeleteFlag) {
		this.compDeleteFlag = compDeleteFlag;
	}

	public Date getCompUpdateDate() {
		return compUpdateDate;
	}

	public void setCompUpdateDate(Date compUpdateDate) {
		this.compUpdateDate = compUpdateDate;
	}

	public Date getCompAddDate() {
		return compAddDate;
	}

	public void setCompAddDate(Date compAddDate) {
		this.compAddDate = compAddDate;
	}
}

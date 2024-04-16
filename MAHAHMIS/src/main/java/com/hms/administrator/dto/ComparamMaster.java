package com.hms.administrator.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "mit_comparam_mas")
public class ComparamMaster {

	@Id
	@GeneratedValue
	@Column(name = "mcm_prefix_master_id")
	private Integer Mcm_prefix_master_id;

	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "mcd_mcm_prefix_master_id")
	private List<ComparamDetails> comparamdetails;*/

	@Column(name = "mcm_prefix_name",columnDefinition="varchar(4) default NULL")
	private String Mcm_prefix_name;

	@Column(name = "mcm_prefix_desc",columnDefinition="varchar(50) default NULL")
	private String Mcm_prefix_desc;

	@Column(name = "mcm_prefix_status",columnDefinition="varchar(1) default 'Y' ")
	private String Mcm_prefix_status;

	@Column(name = "mcm_prefix_created_by",columnDefinition="int default NULL")
	private Integer Mcm_prefix_created_by;
	
	@CreationTimestamp
	@Column(name = "mcm_prefix_created_date",updatable=false)
	private Date Mcm_prefix_created_date;

	@Column(name = "mcm_prefix_updated_by",columnDefinition="int default NULL")
	private Integer Mcm_prefix_updated_by;
	
	@UpdateTimestamp
	@Column(name = "mcm_prefix_updated_date")
	private Date Mcm_prefix_updated_date;

	@Column(name = "mcm_prefix_deleted_by",columnDefinition="int default NULL")
	private Integer Mcm_prefix_deleted_by;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "mcm_prefix_deleted_date",updatable=false)
	private Date Mcm_prefix_deleted_date;


	@Transient
	List<ComparamMaster> comparammaster;
	
	// Getter Setters
	
	public Integer getMcm_prefix_master_id() {
		return Mcm_prefix_master_id;
	}

	public void setMcm_prefix_master_id(Integer mcm_prefix_master_id) {
		Mcm_prefix_master_id = mcm_prefix_master_id;
	}

	/*public List<ComparamDetails> getComparamdetails() {
		return comparamdetails;
	}

	public void setComparamdetails(List<ComparamDetails> comparamdetails) {
		this.comparamdetails = comparamdetails;
	}*/

	public String getMcm_prefix_name() {
		return Mcm_prefix_name;
	}

	public void setMcm_prefix_name(String mcm_prefix_name) {
		Mcm_prefix_name = mcm_prefix_name;
	}

	public String getMcm_prefix_desc() {
		return Mcm_prefix_desc;
	}

	public void setMcm_prefix_desc(String mcm_prefix_desc) {
		Mcm_prefix_desc = mcm_prefix_desc;
	}

	public String getMcm_prefix_status() {
		return Mcm_prefix_status;
	}

	public void setMcm_prefix_status(String mcm_prefix_status) {
		Mcm_prefix_status = mcm_prefix_status;
	}

	public Integer getMcm_prefix_created_by() {
		return Mcm_prefix_created_by;
	}

	public void setMcm_prefix_created_by(Integer mcm_prefix_created_by) {
		Mcm_prefix_created_by = mcm_prefix_created_by;
	}

	public Date getMcm_prefix_created_date() {
		return Mcm_prefix_created_date;
	}

	public void setMcm_prefix_created_date(Date mcm_prefix_created_date) {
		Mcm_prefix_created_date = mcm_prefix_created_date;
	}

	public Integer getMcm_prefix_updated_by() {
		return Mcm_prefix_updated_by;
	}

	public void setMcm_prefix_updated_by(Integer mcm_prefix_updated_by) {
		Mcm_prefix_updated_by = mcm_prefix_updated_by;
	}

	public Date getMcm_prefix_updated_date() {
		return Mcm_prefix_updated_date;
	}

	public void setMcm_prefix_updated_date(Date mcm_prefix_updated_date) {
		Mcm_prefix_updated_date = mcm_prefix_updated_date;
	}

	public Integer getMcm_prefix_deleted_by() {
		return Mcm_prefix_deleted_by;
	}

	public void setMcm_prefix_deleted_by(Integer mcm_prefix_deleted_by) {
		Mcm_prefix_deleted_by = mcm_prefix_deleted_by;
	}

	public Date getMcm_prefix_deleted_date() {
		return Mcm_prefix_deleted_date;
	}

	public void setMcm_prefix_deleted_date(Date mcm_prefix_deleted_date) {
		Mcm_prefix_deleted_date = mcm_prefix_deleted_date;
	}

	public List<ComparamMaster> getComparammaster() {
		return comparammaster;
	}

	public void setComparammaster(List<ComparamMaster> comparammaster) {
		this.comparammaster = comparammaster;
	}
	
	
	
}

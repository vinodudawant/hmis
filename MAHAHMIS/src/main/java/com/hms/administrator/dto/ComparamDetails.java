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
@Table(name = "mit_comparam_det")
public class ComparamDetails {

	@Id
	@GeneratedValue
	@Column(name = "mcd_prefix_detail_id")
	private Integer Mcd_prefix_detail_id;

	/*@Column(name = "mcd_mcm_prefix_master_id",columnDefinition="int default NULL")
	private Integer Mcd_mcm_prefix_master_id;*/

	@Column(name = "mcd_prefix_sub_option",columnDefinition="varchar(100) default NULL")
	private String Mcd_prefix_sub_option;

	@Column(name = "mcd_prefix_sub_value",columnDefinition="varchar(4) default NULL")
	private String Mcd_prefix_sub_value;

	@Column(name = "mcd_prefix_default_value",columnDefinition="varchar(1) default NULL")
	private String Mcd_prefix_default_value;

	@Column(name = "mcd_prefix_status",columnDefinition="varchar(1) default 'Y' ")
	private String Mcd_prefix_status;

	@Column(name = "mcd_prefix_created_by",columnDefinition="int default NULL")
	private Integer Mcd_prefix_created_by;
	
	@CreationTimestamp
	@Column(name = "mcd_prefix_created_date",updatable=false)
	private Date Mcd_prefix_created_date;

	@Column(name = "mcd_prefix_updated_by",columnDefinition="int default NULL")
	private Integer Mcd_prefix_updated_by;
	
	@UpdateTimestamp
	@Column(name = "mcd_prefix_updated_date")
	private Date Mcd_prefix_updated_date;

	@Column(name = "mcd_prefix_deleted_by",columnDefinition="int default NULL")
	private Integer Mcd_prefix_deleted_by;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "mcd_prefix_deleted_date",updatable=false)
	private Date Mcd_prefix_deleted_date;

	@Transient
	List<ComparamDetails> comparamdetails;

	@Column(name = "mcd_mcm_prefix_master_id",columnDefinition="int default NULL")
	private Integer Mcd_mcm_prefix_master_id;
	
	// Getter Setters 
	
	public Integer getMcd_prefix_detail_id() {
		return Mcd_prefix_detail_id;
	}

	public void setMcd_prefix_detail_id(Integer mcd_prefix_detail_id) {
		Mcd_prefix_detail_id = mcd_prefix_detail_id;
	}

	public String getMcd_prefix_sub_option() {
		return Mcd_prefix_sub_option;
	}

	public void setMcd_prefix_sub_option(String mcd_prefix_sub_option) {
		Mcd_prefix_sub_option = mcd_prefix_sub_option;
	}

	public String getMcd_prefix_sub_value() {
		return Mcd_prefix_sub_value;
	}

	public void setMcd_prefix_sub_value(String mcd_prefix_sub_value) {
		Mcd_prefix_sub_value = mcd_prefix_sub_value;
	}

	public String getMcd_prefix_default_value() {
		return Mcd_prefix_default_value;
	}

	public void setMcd_prefix_default_value(String mcd_prefix_default_value) {
		Mcd_prefix_default_value = mcd_prefix_default_value;
	}

	public String getMcd_prefix_status() {
		return Mcd_prefix_status;
	}

	public void setMcd_prefix_status(String mcd_prefix_status) {
		Mcd_prefix_status = mcd_prefix_status;
	}

	public Integer getMcd_prefix_created_by() {
		return Mcd_prefix_created_by;
	}

	public void setMcd_prefix_created_by(Integer mcd_prefix_created_by) {
		Mcd_prefix_created_by = mcd_prefix_created_by;
	}

	public Date getMcd_prefix_created_date() {
		return Mcd_prefix_created_date;
	}

	public void setMcd_prefix_created_date(Date mcd_prefix_created_date) {
		Mcd_prefix_created_date = mcd_prefix_created_date;
	}

	public Integer getMcd_prefix_updated_by() {
		return Mcd_prefix_updated_by;
	}

	public void setMcd_prefix_updated_by(Integer mcd_prefix_updated_by) {
		Mcd_prefix_updated_by = mcd_prefix_updated_by;
	}

	public Date getMcd_prefix_updated_date() {
		return Mcd_prefix_updated_date;
	}

	public void setMcd_prefix_updated_date(Date mcd_prefix_updated_date) {
		Mcd_prefix_updated_date = mcd_prefix_updated_date;
	}

	public Integer getMcd_prefix_deleted_by() {
		return Mcd_prefix_deleted_by;
	}

	public void setMcd_prefix_deleted_by(Integer mcd_prefix_deleted_by) {
		Mcd_prefix_deleted_by = mcd_prefix_deleted_by;
	}

	public Date getMcd_prefix_deleted_date() {
		return Mcd_prefix_deleted_date;
	}

	public void setMcd_prefix_deleted_date(Date mcd_prefix_deleted_date) {
		Mcd_prefix_deleted_date = mcd_prefix_deleted_date;
	}

	public List<ComparamDetails> getComparamdetails() {
		return comparamdetails;
	}

	public void setComparamdetails(List<ComparamDetails> comparamdetails) {
		this.comparamdetails = comparamdetails;
	}

	public Integer getMcd_mcm_prefix_master_id() {
		return Mcd_mcm_prefix_master_id;
	}

	public void setMcd_mcm_prefix_master_id(Integer mcd_mcm_prefix_master_id) {
		Mcd_mcm_prefix_master_id = mcd_mcm_prefix_master_id;
	}
	
	
	
	
}

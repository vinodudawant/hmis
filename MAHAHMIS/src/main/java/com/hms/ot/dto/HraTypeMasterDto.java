package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ehat_hra_type_master")
public class HraTypeMasterDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hra_type_id")
	private int idhra;
	
	@Column(name = "hra_type_name")
	private String hraType;
	
	@Column(name = "hra_type_master_delete_flag")
	private String hra_type_master_delete_flag;
	
	@Column(name = "added_by")
	private int added_by;
	
	@Column(name = "added_on")
	private String added_on;
	
	@Column(name = "modify_by")
	private int modify_by;
	
	@Column(name = "modify_on")
	private String modify_on;

	@Transient
	private  List<HraTypeMasterDto> lihra_access;
	
	public int getIdhra() {
		return idhra;
	}

	public void setIdhra(int idhra) {
		this.idhra = idhra;
	}

	public String getHraType() {
		return hraType;
	}

	public void setHraType(String hraType) {
		this.hraType = hraType;
	}

	public String getHra_type_master_delete_flag() {
		return hra_type_master_delete_flag;
	}

	public void setHra_type_master_delete_flag(String hra_type_master_delete_flag) {
		this.hra_type_master_delete_flag = hra_type_master_delete_flag;
	}

	public int getAdded_by() {
		return added_by;
	}

	public void setAdded_by(int added_by) {
		this.added_by = added_by;
	}

	public String getAdded_on() {
		return added_on;
	}

	public void setAdded_on(String added_on) {
		this.added_on = added_on;
	}

	public int getModify_by() {
		return modify_by;
	}

	public void setModify_by(int modify_by) {
		this.modify_by = modify_by;
	}

	public String getModify_on() {
		return modify_on;
	}

	public void setModify_on(String modify_on) {
		this.modify_on = modify_on;
	}

	public List<HraTypeMasterDto> getLihra_access() {
		return lihra_access;
	}

	public void setLihra_access(List<HraTypeMasterDto> lihra_access) {
		this.lihra_access = lihra_access;
	}
}

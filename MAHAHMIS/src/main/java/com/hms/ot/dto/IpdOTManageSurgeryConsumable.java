package com.hms.ot.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ipd_ot_manage_surgeryconsumable")
public class IpdOTManageSurgeryConsumable implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idipd_ot_manage_surgeryconsumable")
	private int idipd_ot_manage_surgeryconsumable;

	@Column(name = "treatment_operation_manage_id")
	private int treatment_operation_manage_id;
	
	@Column(name = "item_id")
	private int item_id;
	
	@Column(name = "item_qty")
	private int item_qty;
	
	@Column(name = "created_by")
	private String created_by;
	
	@Column(name = "updated_by")
	private String updated_by;
	
	@Column(name = "deleted_by")
	private String deleted_by;
	
	@Column(name = "created_date_time")
	private String created_date_time;
	
	@Column(name = "updated_date_time")
	private String updated_date_time;
	
	@Column(name = "deleted_date_time")
	private String deleted_date_time;

	public int getIdipd_ot_manage_surgeryconsumable() {
		return idipd_ot_manage_surgeryconsumable;
	}

	public void setIdipd_ot_manage_surgeryconsumable(int idipd_ot_manage_surgeryconsumable) {
		this.idipd_ot_manage_surgeryconsumable = idipd_ot_manage_surgeryconsumable;
	}

	public int getTreatment_operation_manage_id() {
		return treatment_operation_manage_id;
	}

	public void setTreatment_operation_manage_id(int treatment_operation_manage_id) {
		this.treatment_operation_manage_id = treatment_operation_manage_id;
	}

	public int getItem_id() {
		return item_id;
	}

	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}

	public int getItem_qty() {
		return item_qty;
	}

	public void setItem_qty(int item_qty) {
		this.item_qty = item_qty;
	}

	public String getCreated_by() {
		return created_by;
	}

	public void setCreated_by(String created_by) {
		this.created_by = created_by;
	}

	public String getUpdated_by() {
		return updated_by;
	}

	public void setUpdated_by(String updated_by) {
		this.updated_by = updated_by;
	}

	public String getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(String deleted_by) {
		this.deleted_by = deleted_by;
	}

	public String getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(String created_date_time) {
		this.created_date_time = created_date_time;
	}

	public String getUpdated_date_time() {
		return updated_date_time;
	}

	public void setUpdated_date_time(String updated_date_time) {
		this.updated_date_time = updated_date_time;
	}

	public String getDeleted_date_time() {
		return deleted_date_time;
	}

	public void setDeleted_date_time(String deleted_date_time) {
		this.deleted_date_time = deleted_date_time;
	}
	
	
}

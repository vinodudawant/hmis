package com.hms.dto;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="ehat_ot_vital_master")
public class OTVitalMasterDto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id_ot_vital_master;
	
	@Column(name = "treatment_id")
	private int treatment_id;
	
	@Column(name = "treatmentOperationsManageID")
	private int treatmentOperationsManageID;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "time")
	private String time;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "user_id")
	private String user_id;
	
	@Transient
	List<OTVitalMasterDto>  lstOTvitalmdto;
	
	
	public List<OTVitalMasterDto> getLstOTvitalmdto() {
		return lstOTvitalmdto;
	}
	public void setLstOTvitalmdto(List<OTVitalMasterDto> lstOTvitalmdto) {
		this.lstOTvitalmdto = lstOTvitalmdto;
	}
	public int getId_ot_vital_master() {
		return id_ot_vital_master;
	}
	public void setId_ot_vital_master(int id_ot_vital_master) {
		this.id_ot_vital_master = id_ot_vital_master;
	}
	public int getTreatment_id() {
		return treatment_id;
	}
	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}
	public int getTreatmentOperationsManageID() {
		return treatmentOperationsManageID;
	}
	public void setTreatmentOperationsManageID(int treatmentOperationsManageID) {
		this.treatmentOperationsManageID = treatmentOperationsManageID;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

}

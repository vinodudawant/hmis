package com.hms.ipdbill.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

public class IpdPreviousBillDTO {

	@Transient
	private Integer patient_id;

	@Transient
	private String patient_name;

	@Transient
	private String mobile;
	
	@Transient
	private String adharcardNo;
	
	@Transient
	private Date created_date_time;
	
	@Transient
	private String deleted;
	
	@Transient
	private String center_patient_id;
	
	@Transient
	private String t_flag;
	
	@Transient
	private int department_id;
	
	@Transient
	private Integer unit_id;
	
	@Transient
	private Integer charges_master_slave_id;
	
	@Transient
	private String opdipdno;
	
	@Transient
    private String mrnno;
	
	@Transient
	private Integer treatment_id;
	
	@Transient
	private String tdeleted;
	
	@Transient
	private Integer prevPatCount;
	
	@Transient
	private List<IpdPreviousBillDTO> lstRegviewDto;

	public Integer getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}

	public String getPatient_name() {
		return patient_name;
	}

	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getAdharcardNo() {
		return adharcardNo;
	}

	public void setAdharcardNo(String adharcardNo) {
		this.adharcardNo = adharcardNo;
	}

	public Date getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(Date created_date_time) {
		this.created_date_time = created_date_time;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getCenter_patient_id() {
		return center_patient_id;
	}

	public void setCenter_patient_id(String center_patient_id) {
		this.center_patient_id = center_patient_id;
	}

	public String getT_flag() {
		return t_flag;
	}

	public void setT_flag(String t_flag) {
		this.t_flag = t_flag;
	}

	public int getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}

	public Integer getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}

	public Integer getCharges_master_slave_id() {
		return charges_master_slave_id;
	}

	public void setCharges_master_slave_id(Integer charges_master_slave_id) {
		this.charges_master_slave_id = charges_master_slave_id;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public String getTdeleted() {
		return tdeleted;
	}

	public void setTdeleted(String tdeleted) {
		this.tdeleted = tdeleted;
	}

	public List<IpdPreviousBillDTO> getLstRegviewDto() {
		return lstRegviewDto;
	}

	public void setLstRegviewDto(List<IpdPreviousBillDTO> lstRegviewDto) {
		this.lstRegviewDto = lstRegviewDto;
	}

	public Integer getPrevPatCount() {
		return prevPatCount;
	}

	public void setPrevPatCount(Integer prevPatCount) {
		this.prevPatCount = prevPatCount;
	}

	
	
	
	
}

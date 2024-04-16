package com.hms.administrator.dto;

import java.io.Serializable;
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

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name="customizetemplate")
public class CustomizeTemplate implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idCustomizeTemplate")
	protected int idCustomizeTemplate;
	
	@Column(name = "temp_name_id")
	protected Integer tempNameId;//added by dayanand for getting template Id
	
	
	@Column(name = "temp_name")
	protected String temp_name;
	
	@Column(name = "temp_data",length=1000000)
	protected String temp_data;
	
	@Column(name = "type",columnDefinition="varchar(10) default 'N'")
	protected String type="NA";
	
	@Column(name = "specialization",columnDefinition="varchar(10) default 'N'")
	protected String specializaion="NA";
	// protected String historyType;
	
	@Column(name = "objectiveTempData",length=1000000)
	protected String objectiveTempData;
	
	@Column(name = "select_template_type")
	protected String selectTemplateType;		// aniket 7 JAN 22
	
	@Column(name = "doctor_specialization")
	protected String doctorSpecialization;		// aniket 7 JAN 22
	
	@Transient
	private List<CustomizeTemplate> customizeTemplateList = null;

	@Column(name = "ipd_opd_flag")
	private String ipd_opd_flag;
	
	@Column(name = "dietflag")
	private String dietflag="N";
	
	@Column(name = "department_id",columnDefinition="int default 1")
	private Integer departmentId;
	
	@Transient
	private String keyValueCKEditorArrayString;
	
	@Transient
	private String date;
	
	@Transient
	private String patientId;
	
	@Transient
	private String treatmentId;
	
	@Transient
	private String discharge_date;
	
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@JsonGetter("discharge_date")
	public String getDischarge_date() {
		return discharge_date;
	}
	public void setDischarge_date(String discharge_date) {
		this.discharge_date = discharge_date;
	}
	@JsonGetter("discharge_type")
	public String getDischarge_type() {
		return discharge_type;
	}
	public void setDischarge_type(String discharge_type) {
		this.discharge_type = discharge_type;
	}

	private String discharge_type;
	
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	
	@JsonGetter("pid")
	public String getPatientId() {
		return patientId;
	}
	@JsonSetter("pid")
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	
	@JsonGetter("tid")
	public String getTreatmentId() {
		return treatmentId;
	}
	@JsonSetter("tid")
	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}

	@JsonGetter("type")
	public String getType() {
		return type;
	}

	@JsonSetter("type")
	public void setType(String type) {
		this.type = type;
	}

	@JsonGetter("idpattemp")
	public int getIdCustomizeTemplate() {
		return idCustomizeTemplate;
	}

	@JsonSetter("idpattemp")
	public void setIdCustomizeTemplate(int idCustomizeTemplate) {
		this.idCustomizeTemplate = idCustomizeTemplate;
	}

	@JsonGetter("tempname")
	public String getTemp_name() {
		return temp_name;
	}

	@JsonSetter("tempname")
	public void setTemp_name(String temp_name) {
		this.temp_name = temp_name;
	}

	@JsonGetter("tempdata")
	public String getTemp_data() {
		return temp_data;
	}

	@JsonSetter("tempdata")
	public void setTemp_data(String temp_data) {
		this.temp_data = temp_data;
	}

	@JsonGetter("specialization")
	public String getSpecializaion() {
		return specializaion;
	}

	@JsonSetter("specialization")
	public void setSpecializaion(String specializaion) {
		this.specializaion = specializaion;
	}

	/*
	 * @JsonGetter("hitoryType") public String getHistoryType() { return
	 * historyType; }
	 * 
	 * @JsonSetter("hitoryType") public void setHistoryType(String historyType)
	 * { this.historyType = historyType; }
	 */

	@JsonGetter("objectiveTempData")
	public String getObjectiveTempData() {
		return objectiveTempData;
	}

	@JsonSetter("objectiveTempData")
	public void setObjectiveTempData(String objectiveTempData) {
		this.objectiveTempData = objectiveTempData;
	}

	@JsonGetter("pattemplist")
	public List<CustomizeTemplate> getCustomizeTemplateList() {
		return customizeTemplateList;
	}

	@JsonSetter("pattemplist")
	public void setCustomizeTemplateList(
			List<CustomizeTemplate> patientHistoryTemplateList) {
		this.customizeTemplateList = patientHistoryTemplateList;
	}

	@JsonGetter("ioflg")
	public String getIpd_opd_flag() {
		return ipd_opd_flag;
	}

	@JsonSetter("ioflg")
	public void setIpd_opd_flag(String ipd_opd_flag) {
		this.ipd_opd_flag = ipd_opd_flag;
	}

	@JsonGetter("keyValueCKEditorArrayString")
	public String getKeyValueCKEditorArrayString() {
		return keyValueCKEditorArrayString;
	}

	@JsonSetter("keyValueCKEditorArrayString")
	public void setKeyValueCKEditorArrayString(
			String keyValueCKEditorArrayString) {
		this.keyValueCKEditorArrayString = keyValueCKEditorArrayString;
	}

	
	@JsonGetter("dietflag")
	public String getDietflag() {
		return dietflag;
	}
	@JsonSetter("dietflag")
	public void setDietflag(String dietflag) {
		this.dietflag = dietflag;
	}
	public Integer getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}
	public Integer getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public Integer getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}
	public Date getDeletedDate() {
		return deletedDate;
	}
	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	public Integer getTempNameId() {
		return tempNameId;
	}
	public void setTempNameId(Integer tempNameId) {
		this.tempNameId = tempNameId;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public String getSelectTemplateType() {
		return selectTemplateType;
	}
	public void setSelectTemplateType(String selectTemplateType) {
		this.selectTemplateType = selectTemplateType;
	}
	public String getDoctorSpecialization() {
		return doctorSpecialization;
	}
	public void setDoctorSpecialization(String doctorSpecialization) {
		this.doctorSpecialization = doctorSpecialization;
	}
	@Override
	public String toString() {
		return "CustomizeTemplate [idCustomizeTemplate=" + idCustomizeTemplate + ", tempNameId=" + tempNameId
				+ ", temp_name=" + temp_name + ", temp_data=" + temp_data + ", type=" + type + ", specializaion="
				+ specializaion + ", objectiveTempData=" + objectiveTempData + ", selectTemplateType="
				+ selectTemplateType + ", doctorSpecialization=" + doctorSpecialization + ", customizeTemplateList="
				+ customizeTemplateList + ", ipd_opd_flag=" + ipd_opd_flag + ", dietflag=" + dietflag
				+ ", departmentId=" + departmentId + ", keyValueCKEditorArrayString=" + keyValueCKEditorArrayString
				+ ", date=" + date + ", patientId=" + patientId + ", treatmentId=" + treatmentId + ", discharge_date="
				+ discharge_date + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", deleted=" + deleted + ", deletedBy=" + deletedBy
				+ ", deletedDate=" + deletedDate + ", unitId=" + unitId + ", discharge_type=" + discharge_type + "]";
	}
	
	
	
	
	
}

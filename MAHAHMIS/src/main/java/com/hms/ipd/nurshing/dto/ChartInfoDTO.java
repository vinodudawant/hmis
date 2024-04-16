package com.hms.ipd.nurshing.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
@Entity
@Table(name = "chart_info")
public class ChartInfoDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	 int id;
	
	@Column(name = "chart_id")
	int chartId;
	
	@Column(name = "cName",columnDefinition="varchar(50) default ''")
	String cName;
	
	@Column(name = "treatment_id")
	int treatmentId;
	
	@Column(name = "ctype")
	int cType;
	
	@Column(name = "constant",columnDefinition="varchar(50) default ''")
	String constant;
	
	@Column(name = "value",columnDefinition="varchar(10) default ''")
	String value;
	
	@Column(name = "unit",columnDefinition="varchar(10) default ''")
	String unit;
	
	@Column(name = "time",columnDefinition="varchar(20) default ''")
	String time;
	
	@Column(name = "date",columnDefinition="varchar(20) default ''")
	String date;
	
	@Column(name = "status",columnDefinition="varchar(2) default 'Y'")
	private String status;
	
	@Column(name = "date_vital",columnDefinition="varchar(20) default ''")
	private String dateVital;

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Transient
	List<ChartInfoDTO>  lstChartInfo;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getChartId() {
		return chartId;
	}

	public void setChartId(int chartId) {
		this.chartId = chartId;
	}

	public String getcName() {
		return cName;
	}

	public void setcName(String cName) {
		this.cName = cName;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getConstant() {
		return constant;
	}

	public void setConstant(String constant) {
		this.constant = constant;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<ChartInfoDTO> getLstChartInfo() {
		return lstChartInfo;
	}

	public void setLstChartInfo(List<ChartInfoDTO> lstChartInfo) {
		this.lstChartInfo = lstChartInfo;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public int getcType() {
		return cType;
	}

	public void setcType(int cType) {
		this.cType = cType;
	}

	public String getDateVital() {
		return dateVital;
	}

	public void setDateVital(String dateVital) {
		this.dateVital = dateVital;
	}

	@Override
	public String toString() {
		return "ChartInfoDTO [id=" + id + ", chartId=" + chartId + ", cName=" + cName + ", treatmentId=" + treatmentId
				+ ", cType=" + cType + ", constant=" + constant + ", value=" + value + ", unit=" + unit + ", time="
				+ time + ", date=" + date + ", status=" + status + ", dateVital=" + dateVital + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy + ", deleted="
				+ deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedDateTime="
				+ deletedDateTime + ", unitId=" + unitId + ", userId=" + userId + ", lstChartInfo=" + lstChartInfo
				+ "]";
	}

	
	
	
	
	
	
	 
}

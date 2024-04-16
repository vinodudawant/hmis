package com.hms.ivf.dto;

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
@Table(name="ovam_pickup_slave_info")
public class OvamPickUpSlaveDTO {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ovam_pickup_slave_id")
	private Integer ovamPickUpSlaveId;
	
	@Column(name = "patient_id")
	private String patientId;
	
	@Column(name = "treatment_id")
	private String treatmentId;
	
	@Column(name = "cycle_no",columnDefinition="varchar(20) default ''")
	private String cycleNo="";
	
	
	@Column(name = "appearance",columnDefinition="varchar(20) default ''")
	private String appearance="";
	
	@Column(name = "ovampickupslavedate",columnDefinition="varchar(20) default ''")
	private String ovampickupslavedate="";
	
	@Column(name = "maturity",columnDefinition="varchar(20) default ''")
	private String maturity="";
	
	@Column(name = "pbappearance",columnDefinition="varchar(20) default ''")
	private String pbappearance="";
	
	@Column(name = "pnscore",columnDefinition="varchar(20) default ''")
	private String pnscore="";
	
	@Column(name = "day2",columnDefinition="varchar(20) default ''")
	private String day2="";
	
	@Column(name = "day3",columnDefinition="varchar(20) default ''")
	private String day3="";
	
	@Column(name = "day4",columnDefinition="varchar(20) default ''")
	private String day4="";
	
	@Column(name = "day5",columnDefinition="varchar(20) default ''")
	private String day5="";
	
	
	@Column(name = "transper",columnDefinition="varchar(20) default ''")
	private String transper="";
	
	@Column(name = "rate",columnDefinition="varchar(20) default ''")
	private String rate="";
	
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
	List<OvamPickUpSlaveDTO>  getListOfOvamPickUpSlaveDTO;

	public Integer getOvamPickUpSlaveId() {
		return ovamPickUpSlaveId;
	}

	public void setOvamPickUpSlaveId(Integer ovamPickUpSlaveId) {
		this.ovamPickUpSlaveId = ovamPickUpSlaveId;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getCycleNo() {
		return cycleNo;
	}

	public void setCycleNo(String cycleNo) {
		this.cycleNo = cycleNo;
	}

	public String getAppearance() {
		return appearance;
	}

	public void setAppearance(String appearance) {
		this.appearance = appearance;
	}

	public String getOvampickupslavedate() {
		return ovampickupslavedate;
	}

	public void setOvampickupslavedate(String ovampickupslavedate) {
		this.ovampickupslavedate = ovampickupslavedate;
	}

	public String getMaturity() {
		return maturity;
	}

	public void setMaturity(String maturity) {
		this.maturity = maturity;
	}

	public String getPbappearance() {
		return pbappearance;
	}

	public void setPbappearance(String pbappearance) {
		this.pbappearance = pbappearance;
	}

	public String getPnscore() {
		return pnscore;
	}

	public void setPnscore(String pnscore) {
		this.pnscore = pnscore;
	}

	public String getDay2() {
		return day2;
	}

	public void setDay2(String day2) {
		this.day2 = day2;
	}

	public String getDay3() {
		return day3;
	}

	public void setDay3(String day3) {
		this.day3 = day3;
	}

	public String getDay4() {
		return day4;
	}

	public void setDay4(String day4) {
		this.day4 = day4;
	}

	public String getDay5() {
		return day5;
	}

	public void setDay5(String day5) {
		this.day5 = day5;
	}

	public String getTransper() {
		return transper;
	}

	public void setTransper(String transper) {
		this.transper = transper;
	}

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
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

	public List<OvamPickUpSlaveDTO> getGetListOfOvamPickUpSlaveDTO() {
		return getListOfOvamPickUpSlaveDTO;
	}

	public void setGetListOfOvamPickUpSlaveDTO(
			List<OvamPickUpSlaveDTO> getListOfOvamPickUpSlaveDTO) {
		this.getListOfOvamPickUpSlaveDTO = getListOfOvamPickUpSlaveDTO;
	}

	
	
	
	
}

package com.hms.doctordesk.dto;

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
@Table(name="dd_medication_master")
public class MedicationMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="medication_id")
	private Integer id;
	
	@Column(name="medicine_name")
	private String medicineName;
	
	@Column(name="medicine_id")
	private Integer medicineId;				// aniket 8 FEB 22
	
	@Column(name="strength_name")
	private String strengthName;
	
	@Column(name="unit")
	private Integer unit;
	
	@Column(name="frequency")
	private String frequency;
	
	@Column(name="days")
	private String days;
	
	@Column(name="prep_id")
	private int prepId;
	
	@Column(name="comp_name")
	private String compName;
	
	@Column(name="comp_id")
	private int compId;
	
	@Column(name="inst_name")
	private String instructionName;
	
	@Column(name="others")
	private String others;
	
	@Column(name="capacity")
	private String capacity;
	
	@Column(name="dose_per_day")
	private String dosePerDay;
	
	@Column(name="fixed_dose")
	private String fixedDose;
	
	@Column(name="used_for")
	private String usedFor;
	
	@CreationTimestamp
	@Column(name="created_date_time",updatable = false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="created_by",updatable = false)
	private int createdBy;
	
	@Column(name="updated_by")
	private int updatedBy;
	
	@Column(name="deleted_by")
	private int deleted_by;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name = "morning_flag",columnDefinition="int default 1")
	private int morningFlag;
	
	@Column(name = "after_noon_flag",columnDefinition="int default 1")
	private int afterNoonFlag;
	
	@Column(name = "evening_flag",columnDefinition="int default 1")
	private int eveningFlag;
	
	@Column(name = "night_flag",columnDefinition="int default 1")
	private int nightFlag;
	
	
	

	@Transient
	private String productName;
	@Transient
	private Integer productId;
	@Transient
	private List<MedicationMaster> listMedication;
	@Transient
	private Integer UomId;
	@Transient
	private Integer instId;
	@Transient
	private String  instName;
	@Transient
	private String companyName;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getMedicineName() {
		return medicineName;
	}
	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}
	public String getStrengthName() {
		return strengthName;
	}
	public void setStrengthName(String strengthName) {
		this.strengthName = strengthName;
	}
	public Integer getUnit() {
		return unit;
	}
	public void setUnit(Integer unit) {
		this.unit = unit;
	}
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	public String getDays() {
		return days;
	}
	public void setDays(String days) {
		this.days = days;
	}
	public int getPrepId() {
		return prepId;
	}
	public void setPrepId(int prepId) {
		this.prepId = prepId;
	}
	public int getCompId() {
		return compId;
	}
	public void setCompId(int compId) {
		this.compId = compId;
	}
	public String getInstructionName() {
		return instructionName;
	}
	public void setInstructionName(String instructionName) {
		this.instructionName = instructionName;
	}
	public String getOthers() {
		return others;
	}
	public void setOthers(String others) {
		this.others = others;
	}
	public String getCapacity() {
		return capacity;
	}
	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}
	public String getDosePerDay() {
		return dosePerDay;
	}
	public void setDosePerDay(String dosePerDay) {
		this.dosePerDay = dosePerDay;
	}
	public String getFixedDose() {
		return fixedDose;
	}
	public void setFixedDose(String fixedDose) {
		this.fixedDose = fixedDose;
	}
	
	public String getUsedFor() {
		return usedFor;
	}
	public void setUsedFor(String usedFor) {
		this.usedFor = usedFor;
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
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
	public int getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}
	public int getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
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
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public List<MedicationMaster> getListMedication() {
		return listMedication;
	}
	public void setListMedication(List<MedicationMaster> listMedication) {
		this.listMedication = listMedication;
	}
	public Integer getUomId() {
		return UomId;
	}
	public void setUomId(Integer uomId) {
		UomId = uomId;
	}
	public Integer getInstId() {
		return instId;
	}
	public void setInstId(Integer instId) {
		this.instId = instId;
	}
	public String getInstName() {
		return instName;
	}
	public void setInstName(String instName) {
		this.instName = instName;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getCompName() {
		return compName;
	}
	public void setCompName(String compName) {
		this.compName = compName;
	}
	public Integer getMedicineId() {
		return medicineId;
	}
	public void setMedicineId(Integer medicineId) {
		this.medicineId = medicineId;
	}
	public int getAfterNoonFlag() {
		return afterNoonFlag;
	}
	public void setAfterNoonFlag(int afterNoonFlag) {
		this.afterNoonFlag = afterNoonFlag;
	}
	public int getEveningFlag() {
		return eveningFlag;
	}
	public void setEveningFlag(int eveningFlag) {
		this.eveningFlag = eveningFlag;
	}
	public int getNightFlag() {
		return nightFlag;
	}
	public void setNightFlag(int nightFlag) {
		this.nightFlag = nightFlag;
	}
	public int getMorningFlag() {
		return morningFlag;
	}
	public void setMorningFlag(int morningFlag) {
		this.morningFlag = morningFlag;
	}
	@Override
	public String toString() {
		return "MedicationMaster [id=" + id + ", medicineName=" + medicineName + ", medicineId=" + medicineId
				+ ", strengthName=" + strengthName + ", unit=" + unit + ", frequency=" + frequency + ", days=" + days
				+ ", prepId=" + prepId + ", compName=" + compName + ", compId=" + compId + ", instructionName="
				+ instructionName + ", others=" + others + ", capacity=" + capacity + ", dosePerDay=" + dosePerDay
				+ ", fixedDose=" + fixedDose + ", usedFor=" + usedFor + ", createdDateTime=" + createdDateTime
				+ ", updatedDateTime=" + updatedDateTime + ", userId=" + userId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by + ", deleted=" + deleted + ", deletedDate="
				+ deletedDate + ", unitId=" + unitId + ", afterNoonFlag=" + afterNoonFlag + ", eveningFlag="
				+ eveningFlag + ", nightFlag=" + nightFlag + ", morningFlag=" + morningFlag + ", productName="
				+ productName + ", productId=" + productId + ", listMedication=" + listMedication + ", UomId=" + UomId
				+ ", instId=" + instId + ", instName=" + instName + ", companyName=" + companyName + "]";
	}
	
	
	
	
		
	
	
}

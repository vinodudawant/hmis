package com.hms.doctordesk.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Component
@Table(name = "opd_prescription_template_medicine")
public class OPDPrescriptionTemplateMedicineDto implements Serializable{
	
	private static final long serialVersionUID = 7919569722294032676L;

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "template_medicine_id")
	private Integer templateMedicineId;
	
	@JsonIgnore
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "template_id", nullable = false)
	private OPDPrescriptionTemplatesDTO opdPrescriptionTemplatesDto;
	
	@Column(name = "prep")
	private Integer prep;
	
	@Column(name = "medicine_id")
	private Integer medicineID;
	
	@Column(name = "medicine_name")
	private String medicineName;
	
	@Column(name = "strength")
	private String strength;
	
	@Column(name = "unit")
	private Integer	 unit;
	
	@Column(name = "dose")
	private Integer dose;
	
	@Column(name = "frequency")
	private double frequency;
	
	@Column(name = "instruction")
	private Integer instruction;
	
	@Column(name = "route")
	private Integer route;
	
	@Column(name = "days")
	private double days;
	
	@Column(name = "qty")
	private double qty;
	
	@Column(name = "days_prescription")
	private String dayPrescription;
	
	// Meta-Data
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Transient
	private List<OPDPrescriptionTemplateMedicineDto> listOPDPrescriptionTemplateMedicineDto;

	public Integer getTemplateMedicineId() {
		return templateMedicineId;
	}

	public void setTemplateMedicineId(Integer templateMedicineId) {
		this.templateMedicineId = templateMedicineId;
	}

	public OPDPrescriptionTemplatesDTO getOpdPrescriptionTemplatesDto() {
		return opdPrescriptionTemplatesDto;
	}

	public void setOpdPrescriptionTemplatesDto(OPDPrescriptionTemplatesDTO opdPrescriptionTemplatesDto) {
		this.opdPrescriptionTemplatesDto = opdPrescriptionTemplatesDto;
	}

	public Integer getPrep() {
		return prep;
	}

	public void setPrep(Integer prep) {
		this.prep = prep;
	}

	public Integer getMedicineID() {
		return medicineID;
	}

	public void setMedicineID(Integer medicineID) {
		this.medicineID = medicineID;
	}

	public String getMedicineName() {
		return medicineName;
	}

	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}

	public String getStrength() {
		return strength;
	}

	public void setStrength(String strength) {
		this.strength = strength;
	}

	public Integer getUnit() {
		return unit;
	}

	public void setUnit(Integer unit) {
		this.unit = unit;
	}

	public Integer getDose() {
		return dose;
	}

	public void setDose(Integer dose) {
		this.dose = dose;
	}

	public double getFrequency() {
		return frequency;
	}

	public void setFrequency(double frequency) {
		this.frequency = frequency;
	}

	public Integer getInstruction() {
		return instruction;
	}

	public void setInstruction(Integer instruction) {
		this.instruction = instruction;
	}

	public Integer getRoute() {
		return route;
	}

	public void setRoute(Integer route) {
		this.route = route;
	}

	public double getDays() {
		return days;
	}

	public void setDays(double days) {
		this.days = days;
	}

	public double getQty() {
		return qty;
	}

	public void setQty(double qty) {
		this.qty = qty;
	}

	public String getDayPrescription() {
		return dayPrescription;
	}

	public void setDayPrescription(String dayPrescription) {
		this.dayPrescription = dayPrescription;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public List<OPDPrescriptionTemplateMedicineDto> getListOPDPrescriptionTemplateMedicineDto() {
		return listOPDPrescriptionTemplateMedicineDto;
	}

	public void setListOPDPrescriptionTemplateMedicineDto(
			List<OPDPrescriptionTemplateMedicineDto> listOPDPrescriptionTemplateMedicineDto) {
		this.listOPDPrescriptionTemplateMedicineDto = listOPDPrescriptionTemplateMedicineDto;
	}
}

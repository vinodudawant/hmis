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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.pharmacy.pojo.ProductMaster;

import javassist.SerialVersionUID;

@Entity
@Component
@Table(name = "opd_prescription")
public class OPDPrescriptionDto implements Serializable{
	
	private static final long serialVersionUID = 7919569722294032676L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "prescription_id")
	private Integer prescriptionId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "prep")
	private Integer prep;
	
	
	// manyToOne
	//	@Column(name = "medicine_id")
	//	private Integer medicineID;
	
//	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@ManyToOne(optional = true)
	@NotFound
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "medicine_id", columnDefinition="int default 0" )
//	@JoinColumn(name = "medicine_id")
	private ProductMaster productMaster;
	
	
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
	
	@Column(name = "paediatrics_medicine_flag", columnDefinition="varchar(2) default 'N'")
	private String paediatricsMedicineFlag = "N";
	
	@Column(name = "paediatrics_medicine_capacity")
	private Integer paediatricsMedicineCapacity;
	
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
	
	@Column(name = "administered_status",columnDefinition="varchar(2) default 'N'")
	private String administeredStatus="N";
	
	@Column(name = "nutracal_product_flag", columnDefinition="int default 1")
	private int nutracalProductFlag = 1;
	
	@Column(name = "drug_name", columnDefinition="varchar(255) default 'N'")
	private String  drugName = "";
	
	@Column(name = "drug_id",columnDefinition="int default 0")
	private int drugId;
	
	@Column(name = "prescription_order_date", columnDefinition="varchar(255) default '-'")
	private String  prescriptionOrderDate = "-";
	
	@Column(name = "prescription_sequence_id", columnDefinition="INT default 0")
	private Integer  prescriptionSequenceId = 0;
	
	@Column(name = "remark", columnDefinition="varchar(50) default 'pending'")
	private String remark = "pending";//added for ecogreen pharmacy
	
	@Column(name = "ecogreen_prescription_id", columnDefinition="int default 0")
	private int  ecogreenPrescrptionId = 0;////added for ecogreen pharmacy
	
	
	public Integer getPrescriptionSequenceId() {
		return prescriptionSequenceId;
	}


	public void setPrescriptionSequenceId(Integer prescriptionSequenceId) {
		this.prescriptionSequenceId = prescriptionSequenceId;
	}


	public String getPrescriptionOrderDate() {
		return prescriptionOrderDate;
	}


	public void setPrescriptionOrderDate(String prescriptionOrderDate) {
		this.prescriptionOrderDate = prescriptionOrderDate;
	}


	@Transient
	private List<OPDPrescriptionDto> listOPDPrescriptionDto;

	//added by Akshata 4-april-2022
	
	@Transient
	private String product_name ;
	
	@Transient
	private Integer stock_product_id;
	
	@Transient
	private Integer product_preparation_id ;
	
	@Transient
	private Integer product_strength_id;
	
	@Transient
	private Double product_uom_unit;
	
	@Transient
	private String uom_name;
	
	@Transient
	private String strength_name;
	
	
	

	public String getAdministeredStatus() {
		return administeredStatus;
	}


	public void setAdministeredStatus(String administeredStatus) {
		this.administeredStatus = administeredStatus;
	}


	public Integer getPrescriptionId() {
		return prescriptionId;
	}


	public void setPrescriptionId(Integer prescriptionId) {
		this.prescriptionId = prescriptionId;
	}


	public Integer getPatientId() {
		return patientId;
	}


	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}


	public Integer getTreatmentId() {
		return treatmentId;
	}


	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}


	public Integer getPrep() {
		return prep;
	}


	public void setPrep(Integer prep) {
		this.prep = prep;
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


	public String getPaediatricsMedicineFlag() {
		return paediatricsMedicineFlag;
	}


	public void setPaediatricsMedicineFlag(String paediatricsMedicineFlag) {
		this.paediatricsMedicineFlag = paediatricsMedicineFlag;
	}


	public Integer getPaediatricsMedicineCapacity() {
		return paediatricsMedicineCapacity;
	}


	public void setPaediatricsMedicineCapacity(Integer paediatricsMedicineCapacity) {
		this.paediatricsMedicineCapacity = paediatricsMedicineCapacity;
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


	public List<OPDPrescriptionDto> getListOPDPrescriptionDto() {
		return listOPDPrescriptionDto;
	}


	public void setListOPDPrescriptionDto(List<OPDPrescriptionDto> listOPDPrescriptionDto) {
		this.listOPDPrescriptionDto = listOPDPrescriptionDto;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}


	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	

	public String getProduct_name() {
		return product_name;
	}


	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public Integer getStock_product_id() {
		return stock_product_id;
	}


	public void setStock_product_id(Integer stock_product_id) {
		this.stock_product_id = stock_product_id;
	}

	
	public Integer getProduct_preparation_id() {
		return product_preparation_id;
	}


	public void setProduct_preparation_id(Integer product_preparation_id) {
		this.product_preparation_id = product_preparation_id;
	}

	

	public Integer getProduct_strength_id() {
		return product_strength_id;
	}


	public void setProduct_strength_id(Integer product_strength_id) {
		this.product_strength_id = product_strength_id;
	}

	

	public Double getProduct_uom_unit() {
		return product_uom_unit;
	}


	public void setProduct_uom_unit(Double product_uom_unit) {
		this.product_uom_unit = product_uom_unit;
	}


	public String getUom_name() {
		return uom_name;
	}


	public void setUom_name(String uom_name) {
		this.uom_name = uom_name;
	}


	public String getStrength_name() {
		return strength_name;
	}


	public void setStrength_name(String strength_name) {
		this.strength_name = strength_name;
	}


	


	public String getDrugName() {
		return drugName;
	}


	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}


	public int getDrugId() {
		return drugId;
	}


	public void setDrugId(int drugId) {
		this.drugId = drugId;
	}


	public int getNutracalProductFlag() {
		return nutracalProductFlag;
	}


	public void setNutracalProductFlag(int nutracalProductFlag) {
		this.nutracalProductFlag = nutracalProductFlag;
	}
	
	
	


	public String getRemark() {
		return remark;
	}


	public void setRemark(String remark) {
		this.remark = remark;
	}



	public int getEcogreenPrescrptionId() {
		return ecogreenPrescrptionId;
	}


	public void setEcogreenPrescrptionId(int ecogreenPrescrptionId) {
		this.ecogreenPrescrptionId = ecogreenPrescrptionId;
	}


	@Override
	public String toString() {
		return "OPDPrescriptionDto [prescriptionId=" + prescriptionId + ", patientId=" + patientId + ", treatmentId="
				+ treatmentId + ", prep=" + prep + ", productMaster=" + productMaster + ", medicineName=" + medicineName
				+ ", strength=" + strength + ", unit=" + unit + ", dose=" + dose + ", frequency=" + frequency
				+ ", instruction=" + instruction + ", route=" + route + ", days=" + days + ", qty=" + qty
				+ ", paediatricsMedicineFlag=" + paediatricsMedicineFlag + ", paediatricsMedicineCapacity="
				+ paediatricsMedicineCapacity + ", dayPrescription=" + dayPrescription + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", deletedBy=" + deletedBy + ", unitId=" + unitId + ", deleted="
				+ deleted + ", administeredStatus=" + administeredStatus + ", nutracalProductFlag="
				+ nutracalProductFlag + ", drugName=" + drugName + ", drugId=" + drugId + ", prescriptionOrderDate="
				+ prescriptionOrderDate + ", prescriptionSequenceId=" + prescriptionSequenceId + ", remark=" + remark
				+ ", ecogreenPrescrptionId=" + ecogreenPrescrptionId + ", listOPDPrescriptionDto="
				+ listOPDPrescriptionDto + ", product_name=" + product_name + ", stock_product_id=" + stock_product_id
				+ ", product_preparation_id=" + product_preparation_id + ", product_strength_id=" + product_strength_id
				+ ", product_uom_unit=" + product_uom_unit + ", uom_name=" + uom_name + ", strength_name="
				+ strength_name + "]";
	}


	
	
	
	

	

}

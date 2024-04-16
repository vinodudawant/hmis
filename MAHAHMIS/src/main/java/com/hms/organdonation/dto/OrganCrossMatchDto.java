package com.hms.organdonation.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@SuppressWarnings("deprecation")
@Component
@Entity
@Table(name = "organ_cross_match")
public class OrganCrossMatchDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer crossMatchId;
	
	@Column(name = "lvmpho_cross_test",columnDefinition = "varchar(150)")
	private String lvmphoTest;
	
	@Column(name = "lvmpho_cross_test_result",columnDefinition = "varchar(1)")
	private String lvmphoTestResult;
	
	@Column(name = "lvmpho_cross_test_date",columnDefinition = "varchar(15)")
	private String lvmphoTestDate;
	
	@Column(name = "blo_type_comp",columnDefinition = "varchar(150)")
	private String bloTypeComp;
	
	@Column(name = "blo_type_comp_result",columnDefinition = "varchar(1)")
	private String bloTypeCompResult;
	
	@Column(name = "blo_type_comp_date",columnDefinition = "varchar(15)")
	private String bloTypeCompDate;
	
	@Column(name = "hum_leu_anti_type",columnDefinition = "varchar(150)")
	private String humLeuAntiType;
	
	@Column(name = "hum_leu_anti_type_result",columnDefinition = "varchar(1)")
	private String humLeuAntiTypeResult;
	
	@Column(name = "hum_leu_anti_type_date",columnDefinition = "varchar(15)")
	private String humLeuAntiTypeDate;
	
	@Column(name = "hla_anti",columnDefinition = "varchar(150)")
	private String hlaAnti;
	
	@Column(name = "hla_anti_result",columnDefinition = "varchar(1)")
	private String hlaAntiResult;
	
	@Column(name = "hla_anti_date",columnDefinition = "varchar(15)")
	private String hlaAntiDate;
	
	@Column(name = "per_rea_anti",columnDefinition = "varchar(150)")
	private String perReaAnti;
	
	@Column(name = "per_rea_anti_result",columnDefinition = "varchar(1)")
	private String perReaAntiResult;
	
	@Column(name = "per_rea_anti_date",columnDefinition = "varchar(15)")
	private String perReaAntiDate;
	
	@Column(name = "serum_test",columnDefinition = "varchar(150)")
	private String serumTest;
	
	@Column(name = "serum_result",columnDefinition = "varchar(1)")
	private String serumResult;
	
	@Column(name = "serum_date",columnDefinition = "varchar(15)")
	private String serumDate;
	
	@Column(name = "uploaded_file",columnDefinition = "varchar(200)")
	private String uploadedFile;

	@Column(name = "blood_group_id")
	private Integer bloodGroupId;
	
	@Column(name = "organ_size")
	private String organSize;
	
	@Column(name = "bodysize")
	private String bodysize;
	
	public String getBodysize() {
		return bodysize;
	}

	public void setBodysize(String bodysize) {
		this.bodysize = bodysize;
	}

	@Column(name = "cold_ischemia_time_id")
	private Integer coldIschemiaTimeId;

	@Column(name = "required_quantity")
	private Integer requiredQuantity;
	
	@Column(name = "available_quantity")
	private Integer availableQuantity;
	
	@Column(name = "stock_inward_expiry_date")
	private String stockInwardExpiryDate;
	
	@Column(name = "cross_match_date_time")
	private String crossMatchDateAndTime;
	
	@Column(name = "compatibility_type")
	private String compatibilityType;

	@Column(name = "compatibility_remarks")
	private String CompatibilityRemarks;
	
	@Column(name = "is_organ_issued", columnDefinition = "varchar(1) default 'N'")
	private String isOrganIssued = "N";

	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@JoinColumn(name="patient_id",nullable = false)
	private RegistrationDto patientRegistered;
	
//	@NotFound(action = NotFoundAction.IGNORE)
//	@JsonBackReference
	@ManyToOne(optional = false,fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//	@JoinColumn(name="treatment_id",nullable = false)
	@JoinColumn(name="treatment_id")
	private TreatmentDto treatmentDto;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@JoinColumn(name="organ_id",nullable = false)
	private IntendOrganDonorMasterDto intendOrganDonorMasterDto;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@JoinColumn(name="stock_inward_id",nullable = false)
	private OrganDonorStockInwardDto OrganDonorStockInwardDto;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@JoinColumn(name="organ_requester_id",nullable = false)
	private OrganRequestDto organRequestDto;
	
	@Transient
	private String prefix;
	@Transient
	private String firstName;
	@Transient
	private String middleName;
	@Transient
	private String lastName;
	@Transient
	private String intendToDonateOrgan;
	@Transient
	private String bloodGroup;
	@Transient
	private String bodyType;
	@Transient
	private String priority;
	
	@Transient
	Integer requestId;
	
	@Transient
	private Integer organCollectionId;
	@Transient
	private Integer donarTreatmentId;
	
	@Transient
	private String containerName;
	
	@Transient
	private String dorganName;
	
	public String getDorganName() {
		return dorganName;
	}

	public void setDorganName(String dorganName) {
		this.dorganName = dorganName;
	}

	public String getContainerName() {
		return containerName;
	}

	public void setContainerName(String containerName) {
		this.containerName = containerName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Transient
	private List<OrganCrossMatchDto> listOrganCrossMatchDto;

	public Integer getCrossMatchId() {
		return crossMatchId;
	}

	public void setCrossMatchId(Integer crossMatchId) {
		this.crossMatchId = crossMatchId;
	}

	public String getLvmphoTest() {
		return lvmphoTest;
	}

	public void setLvmphoTest(String lvmphoTest) {
		this.lvmphoTest = lvmphoTest;
	}

	public String getLvmphoTestResult() {
		return lvmphoTestResult;
	}

	public void setLvmphoTestResult(String lvmphoTestResult) {
		this.lvmphoTestResult = lvmphoTestResult;
	}

	public String getLvmphoTestDate() {
		return lvmphoTestDate;
	}

	public void setLvmphoTestDate(String lvmphoTestDate) {
		this.lvmphoTestDate = lvmphoTestDate;
	}

	public String getBloTypeComp() {
		return bloTypeComp;
	}

	public void setBloTypeComp(String bloTypeComp) {
		this.bloTypeComp = bloTypeComp;
	}

	public String getBloTypeCompResult() {
		return bloTypeCompResult;
	}

	public void setBloTypeCompResult(String bloTypeCompResult) {
		this.bloTypeCompResult = bloTypeCompResult;
	}

	public String getBloTypeCompDate() {
		return bloTypeCompDate;
	}

	public void setBloTypeCompDate(String bloTypeCompDate) {
		this.bloTypeCompDate = bloTypeCompDate;
	}

	public String getHumLeuAntiType() {
		return humLeuAntiType;
	}

	public void setHumLeuAntiType(String humLeuAntiType) {
		this.humLeuAntiType = humLeuAntiType;
	}

	public String getHumLeuAntiTypeResult() {
		return humLeuAntiTypeResult;
	}

	public void setHumLeuAntiTypeResult(String humLeuAntiTypeResult) {
		this.humLeuAntiTypeResult = humLeuAntiTypeResult;
	}

	public String getHumLeuAntiTypeDate() {
		return humLeuAntiTypeDate;
	}

	public void setHumLeuAntiTypeDate(String humLeuAntiTypeDate) {
		this.humLeuAntiTypeDate = humLeuAntiTypeDate;
	}

	public String getHlaAnti() {
		return hlaAnti;
	}

	public void setHlaAnti(String hlaAnti) {
		this.hlaAnti = hlaAnti;
	}

	public String getHlaAntiResult() {
		return hlaAntiResult;
	}

	public void setHlaAntiResult(String hlaAntiResult) {
		this.hlaAntiResult = hlaAntiResult;
	}

	public String getHlaAntiDate() {
		return hlaAntiDate;
	}

	public void setHlaAntiDate(String hlaAntiDate) {
		this.hlaAntiDate = hlaAntiDate;
	}

	public String getPerReaAnti() {
		return perReaAnti;
	}

	public void setPerReaAnti(String perReaAnti) {
		this.perReaAnti = perReaAnti;
	}

	public String getPerReaAntiResult() {
		return perReaAntiResult;
	}

	public void setPerReaAntiResult(String perReaAntiResult) {
		this.perReaAntiResult = perReaAntiResult;
	}

	public String getPerReaAntiDate() {
		return perReaAntiDate;
	}

	public void setPerReaAntiDate(String perReaAntiDate) {
		this.perReaAntiDate = perReaAntiDate;
	}

	public String getSerumTest() {
		return serumTest;
	}

	public void setSerumTest(String serumTest) {
		this.serumTest = serumTest;
	}

	public String getSerumResult() {
		return serumResult;
	}

	public void setSerumResult(String serumResult) {
		this.serumResult = serumResult;
	}

	public String getSerumDate() {
		return serumDate;
	}

	public void setSerumDate(String serumDate) {
		this.serumDate = serumDate;
	}

	public String getUploadedFile() {
		return uploadedFile;
	}

	public void setUploadedFile(String uploadedFile) {
		this.uploadedFile = uploadedFile;
	}

	public Integer getBloodGroupId() {
		return bloodGroupId;
	}

	public void setBloodGroupId(Integer bloodGroupId) {
		this.bloodGroupId = bloodGroupId;
	}

	public String getOrganSize() {
		return organSize;
	}

	public void setOrganSize(String organSize) {
		this.organSize = organSize;
	}

	public Integer getColdIschemiaTimeId() {
		return coldIschemiaTimeId;
	}

	public void setColdIschemiaTimeId(Integer coldIschemiaTimeId) {
		this.coldIschemiaTimeId = coldIschemiaTimeId;
	}

	public Integer getRequiredQuantity() {
		return requiredQuantity;
	}

	public void setRequiredQuantity(Integer requiredQuantity) {
		this.requiredQuantity = requiredQuantity;
	}

	public Integer getAvailableQuantity() {
		return availableQuantity;
	}

	public void setAvailableQuantity(Integer availableQuantity) {
		this.availableQuantity = availableQuantity;
	}

	public String getStockInwardExpiryDate() {
		return stockInwardExpiryDate;
	}

	public void setStockInwardExpiryDate(String stockInwardExpiryDate) {
		this.stockInwardExpiryDate = stockInwardExpiryDate;
	}

	public String getCrossMatchDateAndTime() {
		return crossMatchDateAndTime;
	}

	public void setCrossMatchDateAndTime(String crossMatchDateAndTime) {
		this.crossMatchDateAndTime = crossMatchDateAndTime;
	}

	public String getCompatibilityType() {
		return compatibilityType;
	}

	public void setCompatibilityType(String compatibilityType) {
		this.compatibilityType = compatibilityType;
	}

	public String getCompatibilityRemarks() {
		return CompatibilityRemarks;
	}

	public void setCompatibilityRemarks(String compatibilityRemarks) {
		CompatibilityRemarks = compatibilityRemarks;
	}

	public String getIsOrganIssued() {
		return isOrganIssued;
	}

	public void setIsOrganIssued(String isOrganIssued) {
		this.isOrganIssued = isOrganIssued;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
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

	public RegistrationDto getPatientRegistered() {
		return patientRegistered;
	}

	public void setPatientRegistered(RegistrationDto patientRegistered) {
		this.patientRegistered = patientRegistered;
	}

	@JsonIgnoreProperties
	public TreatmentDto getTreatmentDto() {
		return treatmentDto;
	}

	public void setTreatmentDto(TreatmentDto treatmentDto) {
		this.treatmentDto = treatmentDto;
	}

	public IntendOrganDonorMasterDto getIntendOrganDonorMasterDto() {
		return intendOrganDonorMasterDto;
	}

	public void setIntendOrganDonorMasterDto(
			IntendOrganDonorMasterDto intendOrganDonorMasterDto) {
		this.intendOrganDonorMasterDto = intendOrganDonorMasterDto;
	}

	public OrganDonorStockInwardDto getOrganDonorStockInwardDto() {
		return OrganDonorStockInwardDto;
	}

	public void setOrganDonorStockInwardDto(
			OrganDonorStockInwardDto organDonorStockInwardDto) {
		OrganDonorStockInwardDto = organDonorStockInwardDto;
	}

	public OrganRequestDto getOrganRequestDto() {
		return organRequestDto;
	}

	public void setOrganRequestDto(OrganRequestDto organRequestDto) {
		this.organRequestDto = organRequestDto;
	}

	public List<OrganCrossMatchDto> getListOrganCrossMatchDto() {
		return listOrganCrossMatchDto;
	}

	public void setListOrganCrossMatchDto(
			List<OrganCrossMatchDto> listOrganCrossMatchDto) {
		this.listOrganCrossMatchDto = listOrganCrossMatchDto;
	}
	
	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Override
	public String toString() {
		return "OrganCrossMatchDto [crossMatchId=" + crossMatchId + ", lvmphoTest=" + lvmphoTest + ", lvmphoTestResult="
				+ lvmphoTestResult + ", lvmphoTestDate=" + lvmphoTestDate + ", bloTypeComp=" + bloTypeComp
				+ ", bloTypeCompResult=" + bloTypeCompResult + ", bloTypeCompDate=" + bloTypeCompDate
				+ ", humLeuAntiType=" + humLeuAntiType + ", humLeuAntiTypeResult=" + humLeuAntiTypeResult
				+ ", humLeuAntiTypeDate=" + humLeuAntiTypeDate + ", hlaAnti=" + hlaAnti + ", hlaAntiResult="
				+ hlaAntiResult + ", hlaAntiDate=" + hlaAntiDate + ", perReaAnti=" + perReaAnti + ", perReaAntiResult="
				+ perReaAntiResult + ", perReaAntiDate=" + perReaAntiDate + ", serumTest=" + serumTest
				+ ", serumResult=" + serumResult + ", serumDate=" + serumDate + ", uploadedFile=" + uploadedFile
				+ ", bloodGroupId=" + bloodGroupId + ", organSize=" + organSize + ", coldIschemiaTimeId="
				+ coldIschemiaTimeId + ", requiredQuantity=" + requiredQuantity + ", availableQuantity="
				+ availableQuantity + ", stockInwardExpiryDate=" + stockInwardExpiryDate + ", crossMatchDateAndTime="
				+ crossMatchDateAndTime + ", compatibilityType=" + compatibilityType + ", CompatibilityRemarks="
				+ CompatibilityRemarks + ", isOrganIssued=" + isOrganIssued + ", deleted=" + deleted + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deletedDateTime=" + deletedDateTime + ", deletedBy=" + deletedBy + ", unitId="
				+ unitId + ", patientRegistered=" + patientRegistered + ", treatmentDto=" + treatmentDto
				+ ", intendOrganDonorMasterDto=" + intendOrganDonorMasterDto + ", OrganDonorStockInwardDto="
				+ OrganDonorStockInwardDto + ", organRequestDto=" + organRequestDto + ", prefix=" + prefix
				+ ", firstName=" + firstName + ", middleName=" + middleName + ", lastName=" + lastName
				+ ", listOrganCrossMatchDto=" + listOrganCrossMatchDto + "]";
	}

	public String getIntendToDonateOrgan() {
		return intendToDonateOrgan;
	}

	public void setIntendToDonateOrgan(String intendToDonateOrgan) {
		this.intendToDonateOrgan = intendToDonateOrgan;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getBodyType() {
		return bodyType;
	}

	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public Integer getOrganCollectionId() {
		return organCollectionId;
	}

	public void setOrganCollectionId(Integer organCollectionId) {
		this.organCollectionId = organCollectionId;
	}

	public Integer getDonarTreatmentId() {
		return donarTreatmentId;
	}

	public void setDonarTreatmentId(Integer donarTreatmentId) {
		this.donarTreatmentId = donarTreatmentId;
	}

	public Integer getRequestId() {
		return requestId;
	}

	public void setRequestId(Integer requestId) {
		this.requestId = requestId;
	}

	
	
	
}

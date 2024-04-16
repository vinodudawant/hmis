package com.hms.organdonation.dto;
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
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hms.ehat.dto.RegistrationDto;

@Entity
@Component
@Table(name = "organ_donor_checkup_list")
public class OrganDonorCheckupListDto {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private int checkupListId;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "donor_fname")
	private String donorFName;
	
	@Column(name = "donor_mname")
	private String donorMName;
	
	@Column(name = "donor_lname")
	private String donorLName;
	
	@Column(name = "is_donor_feeling_good",columnDefinition="varchar(2)")
	private String isDonorFeelingGood;
	
	@Column(name = "is_any_allergy_record",columnDefinition="varchar(2)")
	private String isAnyAllergyRecord;
	
	@Column(name = "is_previous_health_issue",columnDefinition="varchar(2)")
	private String isPreviousHealthIssue;
	
	@Column(name = "any_habit")
	private String anyHabit;
	
	@Column(name = "weight_in_kg")
	private String weightInKg;
	
	@Column(name = "organ_donation_test1")
	private String organDonationTest1;
	
	@Column(name = "height_in_cm")
	private String heightInCm;
	
	@Column(name = "organ_donation_test2")
	private String organDonationTest2;
	
	@Column(name = "blood_pressure")
	private String bloodPressure;
	
	@Column(name = "organ_donation_test3")
	private String organDonationTest3;
	
	@Column(name = "temperature")
	private String tempperature;
	
	@Column(name = "pluse")
	private String pluse;
	
	@Column(name = "hemoglobin")
	private String hemoglobin;
	
	@Column(name = "checkup_done_by")
	private String checkupDoneBy;
	
	@Column(name = "checkup_done_by_id")
	private Integer checkupDoneById;
	
	@Column(name = "checkup_status")
	private String checkupStatus;
	
	@Column(name = "remark")
	private String remark;
	
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
	
	@Column(name = "intend_to_donate_organ_id")
	private String intendToDonateOrganId;
	
	@Column(name = "is_consent_given",columnDefinition="varchar(2) default 'N'")
	private String isConsentGiven="N";
	
	@Column(name = "is_organ_collected",columnDefinition="varchar(2) default 'N'")
	private String isOrganCollected="N";
	
	@Transient
	private Integer donorId;
	
	@Transient
	private String donorName;
	
	@Transient
	private Integer donorTreatmentId;
	
	@Transient
	private List<OrganDonorCheckupListDto> lstOrganDonorCheckupListDto;
	
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "organ_donor_id", nullable = false)
	private OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@OneToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	//@JoinColumn(name="organ_donor_treatment_id",unique=true)
	@JoinColumn(name="organ_donor_treatment_id")
	private OrganDonorTreatmentDto organDonorTreatment;
	
	@Transient
	private RegistrationDto registrationDto;

	public int getCheckupListId() {
		return checkupListId;
	}

	public void setCheckupListId(int checkupListId) {
		this.checkupListId = checkupListId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDonorFName() {
		return donorFName;
	}

	public void setDonorFName(String donorFName) {
		this.donorFName = donorFName;
	}

	public String getDonorMName() {
		return donorMName;
	}

	public void setDonorMName(String donorMName) {
		this.donorMName = donorMName;
	}

	public String getDonorLName() {
		return donorLName;
	}

	public void setDonorLName(String donorLName) {
		this.donorLName = donorLName;
	}

	public String getIsDonorFeelingGood() {
		return isDonorFeelingGood;
	}

	public void setIsDonorFeelingGood(String isDonorFeelingGood) {
		this.isDonorFeelingGood = isDonorFeelingGood;
	}

	public String getIsAnyAllergyRecord() {
		return isAnyAllergyRecord;
	}

	public void setIsAnyAllergyRecord(String isAnyAllergyRecord) {
		this.isAnyAllergyRecord = isAnyAllergyRecord;
	}

	public String getIsPreviousHealthIssue() {
		return isPreviousHealthIssue;
	}

	public void setIsPreviousHealthIssue(String isPreviousHealthIssue) {
		this.isPreviousHealthIssue = isPreviousHealthIssue;
	}

	public String getAnyHabit() {
		return anyHabit;
	}

	public void setAnyHabit(String anyHabit) {
		this.anyHabit = anyHabit;
	}

	public String getWeightInKg() {
		return weightInKg;
	}

	public void setWeightInKg(String weightInKg) {
		this.weightInKg = weightInKg;
	}

	public String getOrganDonationTest1() {
		return organDonationTest1;
	}

	public void setOrganDonationTest1(String organDonationTest1) {
		this.organDonationTest1 = organDonationTest1;
	}

	public String getHeightInCm() {
		return heightInCm;
	}

	public void setHeightInCm(String heightInCm) {
		this.heightInCm = heightInCm;
	}

	public String getOrganDonationTest2() {
		return organDonationTest2;
	}

	public void setOrganDonationTest2(String organDonationTest2) {
		this.organDonationTest2 = organDonationTest2;
	}

	public String getBloodPressure() {
		return bloodPressure;
	}

	public void setBloodPressure(String bloodPressure) {
		this.bloodPressure = bloodPressure;
	}

	public String getOrganDonationTest3() {
		return organDonationTest3;
	}

	public void setOrganDonationTest3(String organDonationTest3) {
		this.organDonationTest3 = organDonationTest3;
	}

	public String getTempperature() {
		return tempperature;
	}

	public void setTempperature(String tempperature) {
		this.tempperature = tempperature;
	}

	public String getPluse() {
		return pluse;
	}

	public void setPluse(String pluse) {
		this.pluse = pluse;
	}

	public String getHemoglobin() {
		return hemoglobin;
	}

	public void setHemoglobin(String hemoglobin) {
		this.hemoglobin = hemoglobin;
	}

	public String getCheckupDoneBy() {
		return checkupDoneBy;
	}

	public void setCheckupDoneBy(String checkupDoneBy) {
		this.checkupDoneBy = checkupDoneBy;
	}

	public Integer getCheckupDoneById() {
		return checkupDoneById;
	}

	public void setCheckupDoneById(Integer checkupDoneById) {
		this.checkupDoneById = checkupDoneById;
	}

	public String getCheckupStatus() {
		return checkupStatus;
	}

	public void setCheckupStatus(String checkupStatus) {
		this.checkupStatus = checkupStatus;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getIntendToDonateOrganId() {
		return intendToDonateOrganId;
	}

	public void setIntendToDonateOrganId(String intendToDonateOrganId) {
		this.intendToDonateOrganId = intendToDonateOrganId;
	}

	public String getIsConsentGiven() {
		return isConsentGiven;
	}

	public void setIsConsentGiven(String isConsentGiven) {
		this.isConsentGiven = isConsentGiven;
	}

	public Integer getDonorId() {
		return donorId;
	}

	public void setDonorId(Integer donorId) {
		this.donorId = donorId;
	}

	public String getIsOrganCollected() {
		return isOrganCollected;
	}

	public void setIsOrganCollected(String isOrganCollected) {
		this.isOrganCollected = isOrganCollected;
	}

	public List<OrganDonorCheckupListDto> getLstOrganDonorCheckupListDto() {
		return lstOrganDonorCheckupListDto;
	}

	public void setLstOrganDonorCheckupListDto(
			List<OrganDonorCheckupListDto> lstOrganDonorCheckupListDto) {
		this.lstOrganDonorCheckupListDto = lstOrganDonorCheckupListDto;
	}

	public OrganDonorTreatmentDto getOrganDonorTreatment() {
		return organDonorTreatment;
	}

	public void setOrganDonorTreatment(OrganDonorTreatmentDto organDonorTreatment) {
		this.organDonorTreatment = organDonorTreatment;
	}

	public RegistrationDto getRegistrationDto() {
		return registrationDto;
	}

	public void setRegistrationDto(RegistrationDto registrationDto) {
		this.registrationDto = registrationDto;
	}

	public OrganDonationRegistrationDto getOrganDonationRegistrationDto() {
		return organDonationRegistrationDto;
	}

	public void setOrganDonationRegistrationDto(
			OrganDonationRegistrationDto organDonationRegistrationDto) {
		this.organDonationRegistrationDto = organDonationRegistrationDto;
	}
	
	

	public String getDonorName() {
		return donorName;
	}

	public void setDonorName(String donorName) {
		this.donorName = donorName;
	}
	
	
	

	public Integer getDonorTreatmentId() {
		return donorTreatmentId;
	}

	public void setDonorTreatmentId(Integer donorTreatmentId) {
		this.donorTreatmentId = donorTreatmentId;
	}

	@Override
	public String toString() {
		return "OrganDonorCheckupListDto [checkupListId=" + checkupListId + ", title=" + title + ", donorFName="
				+ donorFName + ", donorMName=" + donorMName + ", donorLName=" + donorLName + ", isDonorFeelingGood="
				+ isDonorFeelingGood + ", isAnyAllergyRecord=" + isAnyAllergyRecord + ", isPreviousHealthIssue="
				+ isPreviousHealthIssue + ", anyHabit=" + anyHabit + ", weightInKg=" + weightInKg
				+ ", organDonationTest1=" + organDonationTest1 + ", heightInCm=" + heightInCm + ", organDonationTest2="
				+ organDonationTest2 + ", bloodPressure=" + bloodPressure + ", organDonationTest3=" + organDonationTest3
				+ ", tempperature=" + tempperature + ", pluse=" + pluse + ", hemoglobin=" + hemoglobin
				+ ", checkupDoneBy=" + checkupDoneBy + ", checkupDoneById=" + checkupDoneById + ", checkupStatus="
				+ checkupStatus + ", remark=" + remark + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate
				+ ", deletedBy=" + deletedBy + ", unitId=" + unitId + ", deleted=" + deleted
				+ ", intendToDonateOrganId=" + intendToDonateOrganId + ", isConsentGiven=" + isConsentGiven
				+ ", isOrganCollected=" + isOrganCollected + ", donorId=" + donorId + ", donorName=" + donorName
				+ ", donorTreatmentId=" + donorTreatmentId + ", lstOrganDonorCheckupListDto="
				+ lstOrganDonorCheckupListDto + ", organDonationRegistrationDto=" + organDonationRegistrationDto
				+ ", organDonorTreatment=" + organDonorTreatment + ", registrationDto=" + registrationDto + "]";
	}

	
	
	
	 
	
}

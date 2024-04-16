package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.pathology.dto.LabProfileReagentDetailsDTO;
import com.hms.pathology.dto.LabTestSampleDTO;
import com.hms.pathology.dto.LabUnitTypeDTO;
import com.hms.pathology.dto.ProfileOutLabDTO;
import com.hms.pathology.dto.SampleContainerDTO;

@Entity
@Table(name = "pathology_labprofile")
public class LabProfileDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer idprofile;

	@Column(name = "block")
	private Integer block = 0;
	
	@Column(name = "profileName")
	private String profileName;

	@Column(name = "is_test", length = 2)
	private String isTest;
	
	@Column(name = "profileCode")
	private String profileCode;
	
	@Column(name = "profileCharges")
	private float profileCharges;

	@Column(name = "profilenote")
	private String profilenote;
	
	@Column(name = "interpretation_chk")
	private String interpretationCheck;

	//@Lob
	@Column(name = "interpretation", columnDefinition="LONGTEXT")
	private String profileInterpretation;
	
	@Column(name = "comment_chk")
	private String commentCheck;
	
	//@Lob
	@Column(name = "comments", columnDefinition="LONGTEXT")
    private String profileComments;
	
	@Column(name = "disclaimer_chk")
	private String disclaimerCheck;
	
	//@Lob
	@Column(name = "disclaimer", columnDefinition="LONGTEXT")
    private String profileDisclaimer;
	
	@Column(name = "profileStatus")
	private String profileStatus = "Y";

	@Column(name = "motivatorCash")
	private Double motivatorCash;
	
	@Column(name = "motivatorSponsored")
	private Double motivatorSponsored;
	
	@Column(name = "clinicPercent")
	private Double clinicPercent;
    
	@Column(name = "unit_id")
	private Integer unitId;
	
	@CreationTimestamp
	@Column(name = "profilecreatedDate")
	private Date profilecreatedDate;
	
	@Column(name = "profilecreatedBy")
	private Integer profilecreatedBy;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "subservice_id")
	private SubServiceDto autosugeestionDto;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "idheadings")
	private SubServiceDto subServiceDto;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "idprofile") 
	private List<LabProfileTestCompDTO> labProfileTestCompDTO;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "profile_id")
	private List<ProfileOutLabDTO> profileOutLabList;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "service_id")
	private ServiceMasterDto serviceMasterDto;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idLabUnit",unique = false)
	private LabUnitTypeDTO labUnit;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idSampleContainer",unique = false)
	private SampleContainerDTO sampleContainer;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idTestSample",unique = false)
	private LabTestSampleDTO labTestSample;

	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="matser_id")
	private List<LabProfileReagentDetailsDTO> labProfileReagentDetailsDTO;
	
	@Column(name = "volume")
	private String volume;
	
	@Column(name = "fasting")
	private String fasting;
	
	@Column(name = "tat")
	private String turnAroundTime;
	
	@Column(name = "temp_sensitivity")
	private String tempratureSensitivity;
	
	@Column(name = "min_temp")
	private String minTemp;
	
	@Column(name = "max_temp")
	private String maxTemp;
	
	@Column(name = "time_sensitivity")
	private String timeSensitivity;
	
	@Column(name = "time_sensitive_value")
	private String timeSensitiveValue;

	@Column(name = "drug_sensitivity")
	private String drugSensitivity;
	
	@Column(name = "nabl")
	private String isNabl;
	
	@Column(name = "process_outlab")
	private String processAtOutlab;
	
	@Column(name = "apply_formula")
	private String applyFormula = "N";
	
	@Column(name = "histopath_lab", columnDefinition="varchar(2) default 'N'")
	private String histopathLab = "N";
	
	@Column(name = "template_wise",columnDefinition="varchar(50) default 'N'")
	private String templateWise = "N";
	
	@Column(name = "callfrom",columnDefinition="varchar(255) default 'N'")
	private String callFrom = "N";
	
	@Transient
	private List<LabProfileDTO> profileli;
	@Transient
	private Integer serviceID;
	@Transient
	private Integer subServiceID;
	@Transient
	private Integer idheadings;
	@Transient
	private Integer queryType;
	@Transient
	private Integer idLabUnit;
	@Transient
	private Integer idSampleContainer;
	@Transient
	private Integer idTestSample;
	
	@Transient
	private Integer labProfileCount;
	
	public Integer getIdprofile() {
		return idprofile;
	}
	public void setIdprofile(Integer idprofile) {
		this.idprofile = idprofile;
	}
	public String getProfileName() {
		return profileName;
	}
	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}
	public String getProfileCode() {
		return profileCode;
	}
	public void setProfileCode(String profileCode) {
		this.profileCode = profileCode;
	}
	public float getProfileCharges() {
		return profileCharges;
	}
	public void setProfileCharges(float profileCharges) {
		this.profileCharges = profileCharges;
	}
	public String getProfilenote() {
		return profilenote;
	}
	public void setProfilenote(String profilenote) {
		this.profilenote = profilenote;
	}
	public String getProfileInterpretation() {
		return profileInterpretation;
	}
	public void setProfileInterpretation(String profileInterpretation) {
		this.profileInterpretation = profileInterpretation;
	}
	public String getProfileComments() {
		return profileComments;
	}
	public void setProfileComments(String profileComments) {
		this.profileComments = profileComments;
	}

	
	public String getInterpretationCheck() {
		return interpretationCheck;
	}
	public void setInterpretationCheck(String interpretationCheck) {
		this.interpretationCheck = interpretationCheck;
	}
	public String getCommentCheck() {
		return commentCheck;
	}
	public void setCommentCheck(String commentCheck) {
		this.commentCheck = commentCheck;
	}
	public String getDisclaimerCheck() {
		return disclaimerCheck;
	}
	public void setDisclaimerCheck(String disclaimerCheck) {
		this.disclaimerCheck = disclaimerCheck;
	}
	public String getProfileDisclaimer() {
		return profileDisclaimer;
	}
	public void setProfileDisclaimer(String profileDisclaimer) {
		this.profileDisclaimer = profileDisclaimer;
	}
	
	
	public String getProfileStatus() {
		return profileStatus;
	}
	public void setProfileStatus(String profileStatus) {
		this.profileStatus = profileStatus;
	}
	public Double getMotivatorCash() {
		return motivatorCash;
	}
	public void setMotivatorCash(Double motivatorCash) {
		this.motivatorCash = motivatorCash;
	}
	public Double getMotivatorSponsored() {
		return motivatorSponsored;
	}
	public void setMotivatorSponsored(Double motivatorSponsored) {
		this.motivatorSponsored = motivatorSponsored;
	}
	public Double getClinicPercent() {
		return clinicPercent;
	}
	public void setClinicPercent(Double clinicPercent) {
		this.clinicPercent = clinicPercent;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	public Date getProfilecreatedDate() {
		return profilecreatedDate;
	}
	public void setProfilecreatedDate(Date profilecreatedDate) {
		this.profilecreatedDate = profilecreatedDate;
	}
	public Integer getProfilecreatedBy() {
		return profilecreatedBy;
	}
	public void setProfilecreatedBy(Integer profilecreatedBy) {
		this.profilecreatedBy = profilecreatedBy;
	}
	public Date getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}
	public Integer getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
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
	public SubServiceDto getAutosugeestionDto() {
		return autosugeestionDto;
	}
	public void setAutosugeestionDto(SubServiceDto autosugeestionDto) {
		this.autosugeestionDto = autosugeestionDto;
	}
	public SubServiceDto getSubServiceDto() {
		return subServiceDto;
	}
	public void setSubServiceDto(SubServiceDto subServiceDto) {
		this.subServiceDto = subServiceDto;
	}
	public List<LabProfileTestCompDTO> getLabProfileTestCompDTO() {
		return labProfileTestCompDTO;
	}
	public void setLabProfileTestCompDTO(List<LabProfileTestCompDTO> labProfileTestCompDTO) {
		this.labProfileTestCompDTO = labProfileTestCompDTO;
	}
	public ServiceMasterDto getServiceMasterDto() {
		return serviceMasterDto;
	}
	public void setServiceMasterDto(ServiceMasterDto serviceMasterDto) {
		this.serviceMasterDto = serviceMasterDto;
	}
	public List<LabProfileDTO> getProfileli() {
		return profileli;
	}
	public void setProfileli(List<LabProfileDTO> profileli) {
		this.profileli = profileli;
	}
	public Integer getServiceID() {
		return serviceID;
	}
	public void setServiceID(Integer serviceID) {
		this.serviceID = serviceID;
	}
	public Integer getSubServiceID() {
		return subServiceID;
	}
	public void setSubServiceID(Integer subServiceID) {
		this.subServiceID = subServiceID;
	}
	public Integer getIdheadings() {
		return idheadings;
	}
	public void setIdheadings(Integer idheadings) {
		this.idheadings = idheadings;
	}
	public Integer getQueryType() {
		return queryType;
	}
	public void setQueryType(Integer queryType) {
		this.queryType = queryType;
	}
	public Integer getBlock() {
		return block;
	}
	public void setBlock(Integer block) {
		this.block = block;
	}
	public String getIsTest() {
		return isTest;
	}
	public void setIsTest(String isTest) {
		this.isTest = isTest;
	}
	public LabUnitTypeDTO getLabUnit() {
		return labUnit;
	}
	public void setLabUnit(LabUnitTypeDTO labUnit) {
		this.labUnit = labUnit;
	}
	public SampleContainerDTO getSampleContainer() {
		return sampleContainer;
	}
	public void setSampleContainer(SampleContainerDTO sampleContainer) {
		this.sampleContainer = sampleContainer;
	}
	public LabTestSampleDTO getLabTestSample() {
		return labTestSample;
	}
	public void setLabTestSample(LabTestSampleDTO labTestSample) {
		this.labTestSample = labTestSample;
	}
	public String getVolume() {
		return volume;
	}
	public void setVolume(String volume) {
		this.volume = volume;
	}
	public String getFasting() {
		return fasting;
	}
	public void setFasting(String fasting) {
		this.fasting = fasting;
	}
	public String getTurnAroundTime() {
		return turnAroundTime;
	}
	public void setTurnAroundTime(String turnAroundTime) {
		this.turnAroundTime = turnAroundTime;
	}
	public String getTempratureSensitivity() {
		return tempratureSensitivity;
	}
	public void setTempratureSensitivity(String tempratureSensitivity) {
		this.tempratureSensitivity = tempratureSensitivity;
	}
	public String getMinTemp() {
		return minTemp;
	}
	public void setMinTemp(String minTemp) {
		this.minTemp = minTemp;
	}
	public String getMaxTemp() {
		return maxTemp;
	}
	public void setMaxTemp(String maxTemp) {
		this.maxTemp = maxTemp;
	}
	public String getTimeSensitivity() {
		return timeSensitivity;
	}
	public void setTimeSensitivity(String timeSensitivity) {
		this.timeSensitivity = timeSensitivity;
	}
	public String getTimeSensitiveValue() {
		return timeSensitiveValue;
	}
	public void setTimeSensitiveValue(String timeSensitiveValue) {
		this.timeSensitiveValue = timeSensitiveValue;
	}
	public String getDrugSensitivity() {
		return drugSensitivity;
	}
	public void setDrugSensitivity(String drugSensitivity) {
		this.drugSensitivity = drugSensitivity;
	}
	public String getIsNabl() {
		return isNabl;
	}
	public void setIsNabl(String isNabl) {
		this.isNabl = isNabl;
	}
	public String getProcessAtOutlab() {
		return processAtOutlab;
	}
	public void setProcessAtOutlab(String processAtOutlab) {
		this.processAtOutlab = processAtOutlab;
	}
	public Integer getIdLabUnit() {
		return idLabUnit;
	}
	public void setIdLabUnit(Integer idLabUnit) {
		this.idLabUnit = idLabUnit;
	}
	public Integer getIdSampleContainer() {
		return idSampleContainer;
	}
	public void setIdSampleContainer(Integer idSampleContainer) {
		this.idSampleContainer = idSampleContainer;
	}
	public Integer getIdTestSample() {
		return idTestSample;
	}
	public void setIdTestSample(Integer idTestSample) {
		this.idTestSample = idTestSample;
	}
	public List<ProfileOutLabDTO> getProfileOutLabList() {
		return profileOutLabList;
	}
	public void setProfileOutLabList(List<ProfileOutLabDTO> profileOutLabList) {
		this.profileOutLabList = profileOutLabList;
	}
	public List<LabProfileReagentDetailsDTO> getLabProfileReagentDetailsDTO() {
		return labProfileReagentDetailsDTO;
	}
	public void setLabProfileReagentDetailsDTO(
			List<LabProfileReagentDetailsDTO> labProfileReagentDetailsDTO) {
		this.labProfileReagentDetailsDTO = labProfileReagentDetailsDTO;
	}
	public String getApplyFormula() {
		return applyFormula;
	}
	public void setApplyFormula(String applyFormula) {
		this.applyFormula = applyFormula;
	}	
	public String getHistopathLab() {
		return histopathLab;
	}
	public void setHistopathLab(String histopathLab) {
		this.histopathLab = histopathLab;
	}
	
	
	
	
	public String getTemplateWise() {
		return templateWise;
	}
	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
	}

	public String getCallFrom() {
		return callFrom;
	}
	public void setCallFrom(String callFrom) {
		this.callFrom = callFrom;
	}
	public Integer getLabProfileCount() {
		return labProfileCount;
	}
	public void setLabProfileCount(Integer labProfileCount) {
		this.labProfileCount = labProfileCount;
	}
	@Override
	public String toString() {
		return "LabProfileDTO [idprofile=" + idprofile + ", block=" + block + ", profileName=" + profileName
				+ ", isTest=" + isTest + ", profileCode=" + profileCode + ", profileCharges=" + profileCharges
				+ ", profilenote=" + profilenote + ", interpretationCheck=" + interpretationCheck
				+ ", profileInterpretation=" + profileInterpretation + ", commentCheck=" + commentCheck
				+ ", profileComments=" + profileComments + ", disclaimerCheck=" + disclaimerCheck
				+ ", profileDisclaimer=" + profileDisclaimer + ", profileStatus=" + profileStatus + ", motivatorCash="
				+ motivatorCash + ", motivatorSponsored=" + motivatorSponsored + ", clinicPercent=" + clinicPercent
				+ ", unitId=" + unitId + ", profilecreatedDate=" + profilecreatedDate + ", profilecreatedBy="
				+ profilecreatedBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + ", deletedDate="
				+ deletedDate + ", deletedBy=" + deletedBy + ", autosugeestionDto=" + autosugeestionDto
				+ ", subServiceDto=" + subServiceDto + ", labProfileTestCompDTO=" + labProfileTestCompDTO
				+ ", profileOutLabList=" + profileOutLabList + ", serviceMasterDto=" + serviceMasterDto + ", labUnit="
				+ labUnit + ", sampleContainer=" + sampleContainer + ", labTestSample=" + labTestSample
				+ ", labProfileReagentDetailsDTO=" + labProfileReagentDetailsDTO + ", volume=" + volume + ", fasting="
				+ fasting + ", turnAroundTime=" + turnAroundTime + ", tempratureSensitivity=" + tempratureSensitivity
				+ ", minTemp=" + minTemp + ", maxTemp=" + maxTemp + ", timeSensitivity=" + timeSensitivity
				+ ", timeSensitiveValue=" + timeSensitiveValue + ", drugSensitivity=" + drugSensitivity + ", isNabl="
				+ isNabl + ", processAtOutlab=" + processAtOutlab + ", applyFormula=" + applyFormula + ", histopathLab="
				+ histopathLab + ", templateWise=" + templateWise + ", callFrom=" + callFrom + ", profileli="
				+ profileli + ", serviceID=" + serviceID + ", subServiceID=" + subServiceID + ", idheadings="
				+ idheadings + ", queryType=" + queryType + ", idLabUnit=" + idLabUnit + ", idSampleContainer="
				+ idSampleContainer + ", idTestSample=" + idTestSample + ", labProfileCount=" + labProfileCount + "]";
	}
	
	
}
package com.hms.pathology.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.ehat.dto.LabsTestsTemplatesDTO;
import com.hms.ehat.dto.SubServiceDto;

@Entity
@Table(name = "pathology_lab_test")
public class LabTestDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idTest")
	private Integer idTest;
	
	@Column(name = "testName")
	private String testName;
	
	@Column(name = "testCode")
	private String testCode;
	
	@Column(name = "aliesName")
	private String aliesName;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idheadings",unique = false)
	private SubServiceDto subService;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idtestMethod",unique = false)
	private LabTestMethodDTO labTestMethod;
	
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
	private List<LabTestNormalValuesDTO> labTestNormalValues;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="matser_id")
	private List<LabReagentDetailsDTO> labReagentDetailsDTO;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="matser_id")
	private List<LabOutlabDTO> labOutlabDTO;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="matser_id")
	private List<LabsTestsTemplatesDTO> labTestTemplateList;
	
	@Transient
	private Integer sampleId;
	
	@Transient
	private String histopathLab;
	
	@Transient
	private Integer containerId;
	
	@Transient
	private Integer labTestCount;
	
	/*@Transient
	private Integer machineNameId;*/
	
	@Transient
	private Integer labUnitId;
	@Transient
	private String isMatch;
	
	@Column(name = "volumeName")
	private Integer volumeName;
	
	@Column(name = "drug_sensitivity")
	private String drugSensitivity;
	
	@Column(name = "process_test_outlab")
	private String processTestoutlab;
	
	@Column(name = "volume")
	private String volume;
	
	@Column(name = "fasting")
	private String fasting;
	
	@Column(name = "tat")
	private String turnAroundTime;
	
	@Column(name = "nabl")
	private String isNabl;
	
	@Column(name = "temp_sensitive")
	private String tempratureSensitive;
	
	@Column(name = "provision")
	private String provision="0";
	
	@Column(name = "decimalRound")
	private String decimalRoundOff="0";
	
	@Column(name = "min_temp")
	private String minTemp;
	
	@Column(name = "max_temp")
	private String maxTemp;
	
	@Column(name = "time_sensitive")
	private String timeSensitive;
	
	@Column(name = "prerequisite", length = 2)
	private String prerequisite = "N";
	
	@Column(name = "trendanalysis_id", length = 2)
	private String trendanalysisId = "N";

	@Column(name = "time_sensitive_value")
	private String timeSensitiveValue;
	
	@Column(name = "process_outlab")
	private String processAtOutlab;
	
	@Column(name = "testStatus")
	private String status="Y";
	
	@Column(name = "idUnit")
	private String unitId;
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by", columnDefinition = "int default 0")
	private Integer deletedBy = 0;
	
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Column(name = "update_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "motivatorCash")
	private Double motivatorCash;
	
	@Column(name = "motivatorSponsored")
	private Double motivatorSponsored;
	
	@Column(name = "clinicPercent")
	private Double clinicPercent;
	
	@Column(name = "valueType")
	private String normalValueType;
	
	@Column(name = "test_general")
	private String testGeneral;
	
	@Column(name = "testNote")
	private String testNote;
	
	@Column(name = "testClinicaluse")
	private String clinicalUse;
	
	@Column(name = "testIncreasedlevel")
	private String increasedLevel;
	
	@Column(name = "biologicalreferencewith_general", columnDefinition="LONGTEXT")
	private String biologicalReferenceWithGeneral;
	
	//@Lob
	@Column(name = "testInterpretation", columnDefinition="LONGTEXT")
	private String testInterpretation;
	
	@Column(name = "report_value")
	private String reportValueType;

	//@Lob
	@Column(name = "testComments", columnDefinition="LONGTEXT")
	private String testComments;
	
	@Column(name = "height", length = 2)
	private String height;
	
	@Column(name = "weight", length = 2)
	private String weight;
	
	@Column(name = "urine_volume", length = 2)
	private String urineVolume;
	
	@Column(name = "lmp_status",columnDefinition = "varchar(2) default 'N'")
	private String lmpStatus;
	
	@Column(name = "reporting_decimal")
	private String reportingDecimal;
	
	@Column(name = "decimal_value")
	private Integer reportingDecimalValue = 0;
	
	@Column(name = "rerun_test")
	private String testRerun = "N";
	
	@Column(name = "microorganism")
	private String microorganism;
	
	@Column(name = "microorganism_count")
	private Integer microorganismCount = 0;
	
	@Column(name = "quantitative")
	private String quantitative;
	
	@Column(name = "biological_reference_chk",columnDefinition = "varchar(2) default 'N'")
	private String biologicalReferenceChk;
	
	@Column(name = "sample_type_chk",columnDefinition = "varchar(2) default 'N'")
	private String sampleTypeChk;
	
	@Column(name = "test_method_chk",columnDefinition = "varchar(2) default 'N'")
	private String testMethodChk;
	
	@Column(name = "text_flag", columnDefinition = "varchar(2) default 'N'")
	private String textFlag = "N";
	
	
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="test_id")
	private List<LabTestGeneralValueDto> generalValuesList;
	
	@Transient
	private String callFrom;
	
	@Transient
	private Integer userId;
	
	@Transient
	private Integer headingId;
	
	@Transient
	private Integer labTestMethodId;
	
	@Column(name = "unitid_genaral")
	private Integer unitIdGenaral=0;
	
	@Transient
	private List<LabTestDTO> labTestList;
	
	@Transient
	private String profile_outlab_Flag;

	
	
	/*
	public Integer getMachineNameId() {
		return machineNameId;
	}

	public void setMachineNameId(Integer machineNameId) {
		this.machineNameId = machineNameId;
	}
	*/

	public String getTrendanalysisId() {
		return trendanalysisId;
	}

	public Integer getUnitIdGenaral() {
		return unitIdGenaral;
	}

	public void setUnitIdGenaral(Integer unitIdGenaral) {
		this.unitIdGenaral = unitIdGenaral;
	}

	public void setTrendanalysisId(String trendanalysisId) {
		this.trendanalysisId = trendanalysisId;
	}
	public Integer getIdTest() {
		return idTest;
	}

	public void setIdTest(Integer idTest) {
		this.idTest = idTest;
	}

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getAliesName() {
		return aliesName;
	}

	public void setAliesName(String aliesName) {
		this.aliesName = aliesName;
	}

	public SubServiceDto getSubService() {
		return subService;
	}

	public void setSubService(SubServiceDto subService) {
		this.subService = subService;
	}

	public LabTestMethodDTO getLabTestMethod() {
		return labTestMethod;
	}

	public void setLabTestMethod(LabTestMethodDTO labTestMethod) {
		this.labTestMethod = labTestMethod;
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

	public String getIsNabl() {
		return isNabl;
	}

	public void setIsNabl(String isNabl) {
		this.isNabl = isNabl;
	}

	public String getTempratureSensitive() {
		return tempratureSensitive;
	}

	public void setTempratureSensitive(String tempratureSensitive) {
		this.tempratureSensitive = tempratureSensitive;
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

	public String getTimeSensitive() {
		return timeSensitive;
	}

	public void setTimeSensitive(String timeSensitive) {
		this.timeSensitive = timeSensitive;
	}

	public String getTimeSensitiveValue() {
		return timeSensitiveValue;
	}

	public void setTimeSensitiveValue(String timeSensitiveValue) {
		this.timeSensitiveValue = timeSensitiveValue;
	}

	public String getProcessAtOutlab() {
		return processAtOutlab;
	}

	public void setProcessAtOutlab(String processAtOutlab) {
		this.processAtOutlab = processAtOutlab;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public String getUnitId() {
		return unitId;
	}

	public void setUnitId(String unitId) {
		this.unitId = unitId;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
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

	public String getNormalValueType() {
		return normalValueType;
	}

	public void setNormalValueType(String normalValueType) {
		this.normalValueType = normalValueType;
	}

	public String getTestGeneral() {
		return testGeneral;
	}

	public void setTestGeneral(String testGeneral) {
		this.testGeneral = testGeneral;
	}

	public String getTestNote() {
		return testNote;
	}

	public void setTestNote(String testNote) {
		this.testNote = testNote;
	}

	public String getClinicalUse() {
		return clinicalUse;
	}

	public void setClinicalUse(String clinicalUse) {
		this.clinicalUse = clinicalUse;
	}

	public String getIncreasedLevel() {
		return increasedLevel;
	}

	public void setIncreasedLevel(String increasedLevel) {
		this.increasedLevel = increasedLevel;
	}

	public String getTestInterpretation() {
		return testInterpretation;
	}

	public void setTestInterpretation(String testInterpretation) {
		this.testInterpretation = testInterpretation;
	}

	public String getReportValueType() {
		return reportValueType;
	}

	public void setReportValueType(String reportValueType) {
		this.reportValueType = reportValueType;
	}

	public String getTestComments() {
		return testComments;
	}

	public void setTestComments(String testComments) {
		this.testComments = testComments;
	}

	public String getCallFrom() {
		return callFrom;
	}

	public void setCallFrom(String callFrom) {
		this.callFrom = callFrom;
	}

	public Integer getHeadingId() {
		return headingId;
	}

	public void setHeadingId(Integer headingId) {
		this.headingId = headingId;
	}

	public Integer getLabTestMethodId() {
		return labTestMethodId;
	}

	public void setLabTestMethodId(Integer labTestMethodId) {
		this.labTestMethodId = labTestMethodId;
	}

	public List<LabTestDTO> getLabTestList() {
		return labTestList;
	}

	public void setLabTestList(List<LabTestDTO> labTestList) {
		this.labTestList = labTestList;
	}

	public List<LabTestNormalValuesDTO> getLabTestNormalValues() {
		return labTestNormalValues;
	}

	public void setLabTestNormalValues(List<LabTestNormalValuesDTO> labTestNormalValues) {
		this.labTestNormalValues = labTestNormalValues;
	}

	public List<LabsTestsTemplatesDTO> getLabTestTemplateList() {
		return labTestTemplateList;
	}

	public void setLabTestTemplateList(List<LabsTestsTemplatesDTO> labTestTemplateList) {
		this.labTestTemplateList = labTestTemplateList;
	}

	public String getTestCode() {
		return testCode;
	}

	public void setTestCode(String testCode) {
		this.testCode = testCode;
	}

	public Integer getSampleId() {
		return sampleId;
	}

	public void setSampleId(Integer sampleId) {
		this.sampleId = sampleId;
	}

	public Integer getContainerId() {
		return containerId;
	}

	public void setContainerId(Integer containerId) {
		this.containerId = containerId;
	}

	public Integer getLabUnitId() {
		return labUnitId;
	}

	public void setLabUnitId(Integer labUnitId) {
		this.labUnitId = labUnitId;
	}

	public Integer getVolumeName() {
		return volumeName;
	}

	public void setVolumeName(Integer volumeName) {
		this.volumeName = volumeName;
	}

	public String getDrugSensitivity() {
		return drugSensitivity;
	}

	public void setDrugSensitivity(String drugSensitivity) {
		this.drugSensitivity = drugSensitivity;
	}

	public String getProcessTestoutlab() {
		return processTestoutlab;
	}

	public void setProcessTestoutlab(String processTestoutlab) {
		this.processTestoutlab = processTestoutlab;
	}

	public List<LabReagentDetailsDTO> getLabReagentDetailsDTO() {
		return labReagentDetailsDTO;
	}

	public void setLabReagentDetailsDTO(List<LabReagentDetailsDTO> labReagentDetailsDTO) {
		this.labReagentDetailsDTO = labReagentDetailsDTO;
	}

	public List<LabOutlabDTO> getLabOutlabDTO() {
		return labOutlabDTO;
	}

	public void setLabOutlabDTO(List<LabOutlabDTO> labOutlabDTO) {
		this.labOutlabDTO = labOutlabDTO;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getUrineVolume() {
		return urineVolume;
	}

	public void setUrineVolume(String urineVolume) {
		this.urineVolume = urineVolume;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getPrerequisite() {
		return prerequisite;
	}

	public void setPrerequisite(String prerequisite) {
		this.prerequisite = prerequisite;
	}

	public String getIsMatch() {
		return isMatch;
	}

	public void setIsMatch(String isMatch) {
		this.isMatch = isMatch;
	}

	public String getLmpStatus() {
		return lmpStatus;
	}

	public void setLmpStatus(String lmpStatus) {
		this.lmpStatus = lmpStatus;
	}

	public String getProvision() {
		return provision;
	}

	public void setProvision(String provision) {
		this.provision = provision;
	}

	public String getDecimalRoundOff() {
		return decimalRoundOff;
	}

	public void setDecimalRoundOff(String decimalRoundOff) {
		this.decimalRoundOff = decimalRoundOff;
	}

	public String getReportingDecimal() {
		return reportingDecimal;
	}

	public void setReportingDecimal(String reportingDecimal) {
		this.reportingDecimal = reportingDecimal;
	}

	public Integer getReportingDecimalValue() {
		return reportingDecimalValue;
	}

	public void setReportingDecimalValue(Integer reportingDecimalValue) {
		this.reportingDecimalValue = reportingDecimalValue;
	}

	public String getTestRerun() {
		return testRerun;
	}

	public void setTestRerun(String testRerun) {
		this.testRerun = testRerun;
	}

	public String getMicroorganism() {
		return microorganism;
	}

	public void setMicroorganism(String microorganism) {
		this.microorganism = microorganism;
	}

	public Integer getMicroorganismCount() {
		return microorganismCount;
	}

	public void setMicroorganismCount(Integer microorganismCount) {
		this.microorganismCount = microorganismCount;
	}

	public String getQuantitative() {
		return quantitative;
	}

	public void setQuantitative(String quantitative) {
		this.quantitative = quantitative;
	}

	public List<LabTestGeneralValueDto> getGeneralValuesList() {
		return generalValuesList;
	}

	public void setGeneralValuesList(List<LabTestGeneralValueDto> generalValuesList) {
		this.generalValuesList = generalValuesList;
	}
	
	public String getHistopathLab() {
		return histopathLab;
	}

	public void setHistopathLab(String histopathLab) {
		this.histopathLab = histopathLab;
	}

	public String getBiologicalReferenceChk() {
		return biologicalReferenceChk;
	}

	public void setBiologicalReferenceChk(String biologicalReferenceChk) {
		this.biologicalReferenceChk = biologicalReferenceChk;
	}

	public String getSampleTypeChk() {
		return sampleTypeChk;
	}

	public void setSampleTypeChk(String sampleTypeChk) {
		this.sampleTypeChk = sampleTypeChk;
	}

	public String getTestMethodChk() {
		return testMethodChk;
	}

	public void setTestMethodChk(String testMethodChk) {
		this.testMethodChk = testMethodChk;
	}

	public String getBiologicalReferenceWithGeneral() {
		return biologicalReferenceWithGeneral;
	}

	public void setBiologicalReferenceWithGeneral(
			String biologicalReferenceWithGeneral) {
		this.biologicalReferenceWithGeneral = biologicalReferenceWithGeneral;
	}

	public String getTextFlag() {
		return textFlag;
	}

	public void setTextFlag(String textFlag) {
		this.textFlag = textFlag;
	}
	
	

	public String getProfile_outlab_Flag() {
		return profile_outlab_Flag;
	}

	public void setProfile_outlab_Flag(String profile_outlab_Flag) {
		this.profile_outlab_Flag = profile_outlab_Flag;
	}
	
	public Integer getLabTestCount() {
		return labTestCount;
	}

	public void setLabTestCount(Integer labTestCount) {
		this.labTestCount = labTestCount;
	}

	@Override
	public String toString() {
		return "LabTestDTO [idTest=" + idTest + ", testName=" + testName + ", testCode=" + testCode + ", aliesName="
				+ aliesName + ", subService=" + subService + ", labTestMethod=" + labTestMethod + ", labUnit=" + labUnit
				+ ", sampleContainer=" + sampleContainer + ", labTestSample=" + labTestSample + ", labTestNormalValues="
				+ labTestNormalValues + ", labReagentDetailsDTO=" + labReagentDetailsDTO + ", labOutlabDTO="
				+ labOutlabDTO + ", labTestTemplateList=" + labTestTemplateList + ", sampleId=" + sampleId
				+ ", histopathLab=" + histopathLab + ", containerId=" + containerId + ", labTestCount=" + labTestCount
				+ ", labUnitId=" + labUnitId + ", isMatch=" + isMatch + ", volumeName=" + volumeName
				+ ", drugSensitivity=" + drugSensitivity + ", processTestoutlab=" + processTestoutlab + ", volume="
				+ volume + ", fasting=" + fasting + ", turnAroundTime=" + turnAroundTime + ", isNabl=" + isNabl
				+ ", tempratureSensitive=" + tempratureSensitive + ", provision=" + provision + ", decimalRoundOff="
				+ decimalRoundOff + ", minTemp=" + minTemp + ", maxTemp=" + maxTemp + ", timeSensitive=" + timeSensitive
				+ ", prerequisite=" + prerequisite + ", trendanalysisId=" + trendanalysisId + ", timeSensitiveValue="
				+ timeSensitiveValue + ", processAtOutlab=" + processAtOutlab + ", status=" + status + ", unitId="
				+ unitId + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy
				+ ", createDate=" + createDate + ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate
				+ ", motivatorCash=" + motivatorCash + ", motivatorSponsored=" + motivatorSponsored + ", clinicPercent="
				+ clinicPercent + ", normalValueType=" + normalValueType + ", testGeneral=" + testGeneral
				+ ", testNote=" + testNote + ", clinicalUse=" + clinicalUse + ", increasedLevel=" + increasedLevel
				+ ", biologicalReferenceWithGeneral=" + biologicalReferenceWithGeneral + ", testInterpretation="
				+ testInterpretation + ", reportValueType=" + reportValueType + ", testComments=" + testComments
				+ ", height=" + height + ", weight=" + weight + ", urineVolume=" + urineVolume + ", lmpStatus="
				+ lmpStatus + ", reportingDecimal=" + reportingDecimal + ", reportingDecimalValue="
				+ reportingDecimalValue + ", testRerun=" + testRerun + ", microorganism=" + microorganism
				+ ", microorganismCount=" + microorganismCount + ", quantitative=" + quantitative
				+ ", biologicalReferenceChk=" + biologicalReferenceChk + ", sampleTypeChk=" + sampleTypeChk
				+ ", testMethodChk=" + testMethodChk + ", textFlag=" + textFlag + ", generalValuesList="
				+ generalValuesList + ", callFrom=" + callFrom + ", userId=" + userId + ", headingId=" + headingId
				+ ", labTestMethodId=" + labTestMethodId + ", unitIdGenaral=" + unitIdGenaral + ", labTestList="
				+ labTestList + ", profile_outlab_Flag=" + profile_outlab_Flag + "]";
	}

	

	

	
}
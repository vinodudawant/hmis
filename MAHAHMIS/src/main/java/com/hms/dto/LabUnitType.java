package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabUnitType implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int idunitType;
	private String unitName;
	private String unitStatus;
	private List<LabUnitType> unitTypeList;

	@JsonGetter("unitid")
	public int getIdunitType() {
		return idunitType;
	}

	@JsonSetter("unitid")
	public void setIdunitType(int idunitType) {
		this.idunitType = idunitType;
	}

	@JsonGetter("unitnm")
	public String getUnitName() {
		return unitName;
	}

	@JsonSetter("unitnm")
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@JsonGetter("unitst")
	public String getUnitStatus() {
		return unitStatus;
	}

	@JsonSetter("unitst")
	public void setUnitStatus(String unitStatus) {
		this.unitStatus = unitStatus;
	}

	@JsonGetter("unitli")
	public List<LabUnitType> getUnitTypeList() {
		return unitTypeList;
	}

	@JsonSetter("unitli")
	public void setUnitTypeList(List<LabUnitType> unitTypeList) {
		this.unitTypeList = unitTypeList;
	}

	
	@Transient
	private String pkgName;
	@Transient
	private int pkgId;
    @Transient
	private String profilename;
	@Transient
	private int profileId;
	@Transient
	private String testname;
	@Transient
	private int testId;
	@Transient
	private int labrequestId;
	@Transient
	private int patientId;
	@Transient
	private int treatmentId;
	
	@Transient
	private String lowvalue;
	@Transient
	private String highvalue;
	@Transient
	private String abnormalvalue;
	@Transient
	private String upperhigh;
	public String getUpperhigh() {
		return upperhigh;
	}

	public void setUpperhigh(String upperhigh) {
		this.upperhigh = upperhigh;
	}

	public String getAbnormalvalue() {
		return abnormalvalue;
	}

	public void setAbnormalvalue(String abnormalvalue) {
		this.abnormalvalue = abnormalvalue;
	}


	@Transient
	private String unitname;

	@Transient
	private String methodname;
	


	@Transient
	private String testResult;
	
	public String getMethodname() {
		return methodname;
	}

	public void setMethodname(String methodname) {
		this.methodname = methodname;
	}
	public String getTestResult() {
		return testResult;
	}

	public void setTestResult(String testResult) {
		this.testResult = testResult;
	}

	public String getLowvalue() {
		return lowvalue;
	}

	public void setLowvalue(String lowvalue) {
		this.lowvalue = lowvalue;
	}

	public String getHighvalue() {
		return highvalue;
	}

	public void setHighvalue(String highvalue) {
		this.highvalue = highvalue;
	}

	public String getUnitname() {
		return unitname;
	}

	public void setUnitname(String unitname) {
		this.unitname = unitname;
	}


	@Transient
	private List<LabUnitType> proLi;	
	@Transient
	private List<LabUnitType> testli;
	@Transient
	private List<LabUnitType> pkgList;
	
	public int getLabrequestId() {
		return labrequestId;
	}

	public void setLabrequestId(int labrequestId) {
		this.labrequestId = labrequestId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	
	public List<LabUnitType> getPkgList() {
		return pkgList;
	}

	public void setPkgList(List<LabUnitType> pkgList) {
		this.pkgList = pkgList;
	}

	public List<LabUnitType> getProLi() {
		return proLi;
	}

	public void setProLi(List<LabUnitType> proLi) {
		this.proLi = proLi;
	}

	public List<LabUnitType> getTestli() {
		return testli;
	}

	public void setTestli(List<LabUnitType> testli) {
		this.testli = testli;
	}

	public String getProfilename() {
		return profilename;
	}

	public void setProfilename(String profilename) {
		this.profilename = profilename;
	}

	public int getProfileId() {
		return profileId;
	}

	public void setProfileId(int profileId) {
		this.profileId = profileId;
	}

	public String getTestname() {
		return testname;
	}

	public void setTestname(String testname) {
		this.testname = testname;
	}

	public int getTestId() {
		return testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}
	
	public String getPkgName() {
		return pkgName;
	}

	public void setPkgName(String pkgName) {
		this.pkgName = pkgName;
	}

	public int getPkgId() {
		return pkgId;
	}

	public void setPkgId(int pkgId) {
		this.pkgId = pkgId;
	}
}

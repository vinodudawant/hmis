package com.hms.doctordesk.dto;

import java.util.Date;
import java.util.List;

public class OPDIPDLabTestResultDTO {
      private String profileName;
      private String testName;
      private String  testResult;
      private String collectionDate;
      private String collectionTime;
      private String unitName;
      private String normalValue;
      private String sexType;
      private String ageIn;
      private Date updated_date_time;	
      
      private int profileId;
      
      private String templateWise;
      
      private String methodname;
      
      private String postdate;
      
      List<OPDIPDLabTestResultDTO> lstOPDIPDLabtestresult;
	/**
	 * @return the profileName
	 */
	public String getProfileName() {
		return profileName;
	}
	/**
	 * @param profileName the profileName to set
	 */
	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}
	/**
	 * @return the testName
	 */
	public String getTestName() {
		return testName;
	}
	/**
	 * @param testName the testName to set
	 */
	public void setTestName(String testName) {
		this.testName = testName;
	}
	/**
	 * @return the testResult
	 */
	public String getTestResult() {
		return testResult;
	}
	/**
	 * @param testResult the testResult to set
	 */
	public void setTestResult(String testResult) {
		this.testResult = testResult;
	}
	/**
	 * @return the collectionDate
	 */
	public String getCollectionDate() {
		return collectionDate;
	}
	/**
	 * @param collectionDate the collectionDate to set
	 */
	public void setCollectionDate(String collectionDate) {
		this.collectionDate = collectionDate;
	}
	/**
	 * @return the collectionTime
	 */
	public String getCollectionTime() {
		return collectionTime;
	}
	/**
	 * @param collectionTime the collectionTime to set
	 */
	public void setCollectionTime(String collectionTime) {
		this.collectionTime = collectionTime;
	}
	/**
	 * @return the unitName
	 */
	public String getUnitName() {
		return unitName;
	}
	/**
	 * @param unitName the unitName to set
	 */
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	/**
	 * @return the normalValue
	 */
	public String getNormalValue() {
		return normalValue;
	}
	/**
	 * @param normalValue the normalValue to set
	 */
	public void setNormalValue(String normalValue) {
		this.normalValue = normalValue;
	}
	/**
	 * @return the sexType
	 */
	public String getSexType() {
		return sexType;
	}
	/**
	 * @param sexType the sexType to set
	 */
	public void setSexType(String sexType) {
		this.sexType = sexType;
	}
	/**
	 * @return the ageIn
	 */
	public String getAgeIn() {
		return ageIn;
	}
	/**
	 * @param ageIn the ageIn to set
	 */
	public void setAgeIn(String ageIn) {
		this.ageIn = ageIn;
	}
	/**
	 * @return the lstOPDIPDLabtestresult
	 */
	public List<OPDIPDLabTestResultDTO> getLstOPDIPDLabtestresult() {
		return lstOPDIPDLabtestresult;
	}
	/**
	 * @param lstOPDIPDLabtestresult the lstOPDIPDLabtestresult to set
	 */
	public void setLstOPDIPDLabtestresult(List<OPDIPDLabTestResultDTO> lstOPDIPDLabtestresult) {
		this.lstOPDIPDLabtestresult = lstOPDIPDLabtestresult;
	}
	/**
	 * @return the updated_date_time
	 */
	public Date getUpdated_date_time() {
		return updated_date_time;
	}
	/**
	 * @param updated_date_time the updated_date_time to set
	 */
	public void setUpdated_date_time(Date updated_date_time) {
		this.updated_date_time = updated_date_time;
	}
	public int getProfileId() {
		return profileId;
	}
	public void setProfileId(int profileId) {
		this.profileId = profileId;
	}
	public String getTemplateWise() {
		return templateWise;
	}
	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
	}
	
	public String getMethodname() {
		return methodname;
	}
	public void setMethodname(String methodname) {
		this.methodname = methodname;
	}
	public String getPostdate() {
		return postdate;
	}
	public void setPostdate(String postdate) {
		this.postdate = postdate;
	}
	@Override
	public String toString() {
		return "OPDIPDLabTestResultDTO [profileName=" + profileName + ", testName=" + testName + ", testResult="
				+ testResult + ", collectionDate=" + collectionDate + ", collectionTime=" + collectionTime
				+ ", unitName=" + unitName + ", normalValue=" + normalValue + ", sexType=" + sexType + ", ageIn="
				+ ageIn + ", updated_date_time=" + updated_date_time + ", profileId=" + profileId + ", templateWise="
				+ templateWise + ", methodname=" + methodname + ", postdate=" + postdate + ", lstOPDIPDLabtestresult="
				+ lstOPDIPDLabtestresult + "]";
	}
	
	
	
	
	
	
	
	
	
	
      
}

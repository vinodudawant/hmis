package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class LabProfileTestComp {

	private int idlabProfileTestComp;
	private int idprofile;
	private int idTest;

	private String testName;
	private String testCode;
	private float testRate;
	
	private String headName;
	

	@JsonGetter("tstNm")
	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	@JsonGetter("tstCod")
	public String getTestCode() {
		return testCode;
	}

	public void setTestCode(String testCode) {
		this.testCode = testCode;
	}

	@JsonGetter("tstRt")
	public float getTestRate() {
		return testRate;
	}

	public void setTestRate(float testRate) {
		this.testRate = testRate;
	}

	private List<LabProfileTestComp> protestList;

	@JsonGetter("proTestId")
	public int getIdlabProfileTestComp() {
		return idlabProfileTestComp;
	}

	public void setIdlabProfileTestComp(int idlabProfileTestComp) {
		this.idlabProfileTestComp = idlabProfileTestComp;
	}

	@JsonGetter("proId")
	public int getIdprofile() {
		return idprofile;
	}

	public void setIdprofile(int idprofile) {
		this.idprofile = idprofile;
	}

	@JsonGetter("testId")
	public int getIdTest() {
		return idTest;
	}

	public void setIdTest(int idTest) {
		this.idTest = idTest;
	}

	@JsonGetter("proTestLi")
	public List<LabProfileTestComp> getProtestList() {
		return protestList;
	}

	public void setProtestList(List<LabProfileTestComp> protestList) {
		this.protestList = protestList;
	}
	
	@JsonGetter("hdnm")
	public String getHeadName() {
		return headName;
	}

	public void setHeadName(String headName) {
		this.headName = headName;
	}

}

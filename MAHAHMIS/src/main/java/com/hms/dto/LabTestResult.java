package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabTestResult implements Serializable {
	private int idresultTests;
	private int idTest;
	private int idprofile;
	private int idlabpkg;
	private String testResult;
	private int idlabTestResultMaster;
	private int idlabSample;
	private int sampleQty;
	private String profilecount;
	private List<LabTestResult> testResultLi;

	@JsonGetter("idlbpkg")
	public int getIdlabpkg() {
		return idlabpkg;
	}

	@JsonSetter("idlbpkg")
	public void setIdlabpkg(int idlabpkg) {
		this.idlabpkg = idlabpkg;
	}

	@JsonGetter("pc")
	public String getProfilecount() {
		return profilecount;
	}

	@JsonSetter("pc")
	public void setProfilecount(String profilecount) {
		this.profilecount = profilecount;
	}

	@JsonGetter("rtid")
	public int getIdresultTests() {
		return idresultTests;
	}

	@JsonSetter("rtid")
	public void setIdresultTests(int idresultTests) {
		this.idresultTests = idresultTests;
	}

	@JsonGetter("tid")
	public int getIdTest() {
		return idTest;
	}

	@JsonSetter("tid")
	public void setIdTest(int idTest) {
		this.idTest = idTest;
	}

	@JsonGetter("proid")
	public int getIdprofile() {
		return idprofile;
	}

	@JsonSetter("proid")
	public void setIdprofile(int idprofile) {
		this.idprofile = idprofile;
	}

	@JsonGetter("trst")
	public String getTestResult() {
		return testResult;
	}

	@JsonSetter("trst")
	public void setTestResult(String testResult) {
		this.testResult = testResult;
	}

	@JsonGetter("trmid")
	public int getIdlabTestResultMaster() {
		return idlabTestResultMaster;
	}

	@JsonSetter("trmid")
	public void setIdlabTestResultMaster(int idlabTestResultMaster) {
		this.idlabTestResultMaster = idlabTestResultMaster;
	}

	@JsonGetter("tsmpl")
	public int getIdlabSample() {
		return idlabSample;
	}

	@JsonSetter("tsmpl")
	public void setIdlabSample(int idlabSample) {
		this.idlabSample = idlabSample;
	}

	@JsonGetter("sqty")
	public int getSampleQty() {
		return sampleQty;
	}

	@JsonSetter("sqty")
	public void setSampleQty(int sampleQty) {
		this.sampleQty = sampleQty;
	}

	@JsonGetter("rtli")
	public List<LabTestResult> getTestResultLi() {
		return testResultLi;
	}

	@JsonSetter("rtli")
	public void setTestResultLi(List<LabTestResult> testResultLi) {
		this.testResultLi = testResultLi;
	}

}

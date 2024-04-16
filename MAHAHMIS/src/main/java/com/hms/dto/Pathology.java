package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Pathology {
	
	private String testId;
	private String testName;
	private List<Pathology> pList;
	
	@JsonGetter("testName")
	public String getTestName() {
		return testName;
	}
	
	@JsonSetter("testName")
	public void setTestName(String testName) {
		this.testName = testName;
	}
	
	@JsonGetter("testId")
	public String getTestId() {
		return testId;
	}
	
	
	@JsonSetter("testId")
	public void setTestId(String testId) {
		this.testId = testId;
	}
	
	@JsonGetter("pList")
	public List<Pathology> getpList() {
		return pList;
	}
	
	@JsonSetter("pList")
	public void setpList(List<Pathology> pList) {
		this.pList = pList;
	}

}

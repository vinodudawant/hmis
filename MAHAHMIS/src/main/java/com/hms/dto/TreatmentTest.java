package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class TreatmentTest {
	
	private int id;
	private int treatmentId;
	private int testId;
	private String testName;
	private List<TreatmentTest> ttList;
	
	@JsonGetter("id")
	public int getId() {
		return id;
	}
	
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}
	
	@JsonGetter("treatmentId")
	public int getTreatmentId() {
		return treatmentId;
	}
	
	@JsonSetter("treatmentId")
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	
	@JsonGetter("testId")
	public int getTestId() {
		return testId;
	}
	
	@JsonSetter("testId")
	public void setTestId(int testId) {
		this.testId = testId;
	}

	@JsonGetter("ttList")
	public List<TreatmentTest> getTtList() {
		return ttList;
	}

	@JsonSetter("ttList")
	public void setTtList(List<TreatmentTest> ttList) {
		this.ttList = ttList;
	}

	@JsonGetter("testName")
	public String getTestName() {
		return testName;
	}

	@JsonSetter("testName")
	public void setTestName(String testName) {
		this.testName = testName;
	}
}

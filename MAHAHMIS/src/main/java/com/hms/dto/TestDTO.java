package com.hms.dto;

import java.io.Serializable;
import java.util.List;


public class TestDTO implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int testID;
	private String testName;
	private int idradiology_test;
	private int idradiology_test_name;
	private String radiologyInstruction;
	private String radiologyClinicalNote;
	private String underSubSer;
	private List<TestDTO> testList;

	public int getTestID() {
		return testID;
	}
	public void setTestID(int testID) {
		this.testID = testID;
	}
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}
	public List<TestDTO> getTestList() {
		return testList;
	}
	public void setTestList(List<TestDTO> testList) {
		this.testList = testList;
	}
	public int getIdradiology_test() {
		return idradiology_test;
	}
	public void setIdradiology_test(int idradiology_test) {
		this.idradiology_test = idradiology_test;
	}
	public int getIdradiology_test_name() {
		return idradiology_test_name;
	}
	public void setIdradiology_test_name(int idradiology_test_name) {
		this.idradiology_test_name = idradiology_test_name;
	}
	public String getRadiologyInstruction() {
		return radiologyInstruction;
	}
	public void setRadiologyInstruction(String radiologyInstruction) {
		this.radiologyInstruction = radiologyInstruction;
	}
	public String getRadiologyClinicalNote() {
		return radiologyClinicalNote;
	}
	public void setRadiologyClinicalNote(String radiologyClinicalNote) {
		this.radiologyClinicalNote = radiologyClinicalNote;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getUnderSubSer() {
		return underSubSer;
	}
	public void setUnderSubSer(String underSubSer) {
		this.underSubSer = underSubSer;
	}
	
	}

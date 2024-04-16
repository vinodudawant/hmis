package com.hms.dto;

import java.util.List;

import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabName_GroupName_TestName {

	@Transient
	private int lab_ID;
	@Transient
	private String LabName;
	
	
	@Transient
	private int group_ID;
	@Transient
	private String groupName;
	
	public int getLab_ID() {
		return lab_ID;
	}
	public void setLab_ID(int lab_ID) {
		this.lab_ID = lab_ID;
	}
	
	public String getLabName() {
		return LabName;
	}
	public void setLabName(String labName) {
		LabName = labName;
	}
	@JsonGetter("gID")
	public int getGroup_ID() {
		return group_ID;
	}
	@JsonSetter("gID")
	public void setGroup_ID(int group_ID) {
		this.group_ID = group_ID;
	}
	@JsonGetter("gname")
	public String getGroupName() {
		return groupName;
	}
	@JsonSetter("gname")
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
	public int getTest_ID() {
		return test_ID;
	}
	public void setTest_ID(int test_ID) {
		this.test_ID = test_ID;
	}
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}
	
	
	
	@Transient
	private int test_ID;
	
	@Transient
	private String testName;
	
	@Transient
	private List<LabName_GroupName_TestName> labList;
	
	@Transient
	private List<LabName_GroupName_TestName> groupList;
	
	@Transient
	private List<LabName_GroupName_TestName> testList;

	public List<LabName_GroupName_TestName> getLabList() {
		return labList;
	}
	
	public void setLabList(List<LabName_GroupName_TestName> labList) {
		this.labList = labList;
	}
	@JsonGetter("listgroup")
	public List<LabName_GroupName_TestName> getGroupList() {
		return groupList;
	}
	@JsonSetter("listgroup")
	public void setGroupList(List<LabName_GroupName_TestName> groupList) {
		this.groupList = groupList;
	}
	@JsonGetter("listTest")
	public List<LabName_GroupName_TestName> getTestList() {
		return testList;
	}
	@JsonSetter("listTest")
	public void setTestList(List<LabName_GroupName_TestName> testList) {
		this.testList = testList;
	}
	

}

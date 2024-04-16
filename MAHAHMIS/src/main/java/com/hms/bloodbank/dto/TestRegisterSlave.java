package com.hms.bloodbank.dto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@Table(name="bb_test_register_slave")
public class TestRegisterSlave {
	
	@Id
	@GeneratedValue
	@Column(name = "test_slave_id")
	private int testSlaveId;
	
	@Column(name = "test_name")
	private String testName;
	
	@Column(name = "test_result")
	private String testResult;
	
	@Column(name = "date_time")
	private String dateTime;
	
	@Column(name = "remark")
	private String remark;
	
	@ManyToOne
	@JoinColumn(name = "test_master_id")
	private TestRegister testRegister;
	
	@Transient	
	private List<TestRegisterSlave> listTestSlave;

	public int getTestSlaveId() {
		return testSlaveId;
	}

	public void setTestSlaveId(int testSlaveId) {
		this.testSlaveId = testSlaveId;
	}

	

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getTestResult() {
		return testResult;
	}

	public void setTestResult(String testResult) {
		this.testResult = testResult;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}	 
	
	public List<TestRegisterSlave> getListTestSlave() {
		return listTestSlave;
	}

	public void setListTestSlave(List<TestRegisterSlave> listTestSlave) {
		this.listTestSlave = listTestSlave;
	}
	
	public TestRegister getTestRegister() {
		return testRegister;
	}

	public void setTestRegister(TestRegister testRegister) {
		this.testRegister = testRegister;
	}
	
	

}

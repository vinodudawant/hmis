package com.hms.bloodbank.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
@JsonIgnoreProperties
@Table(name="bloodrequest_sampletesting_Slave")
public class SampleTesting_Slave {
		@Id
		@GeneratedValue
		@Column(name = "sampletest_slave_id")
		private int sampletestslaveid;
			
		@Column(name = "blood_requestid")
		private String 	blood_requestid;
	
	

		@Column(name = "date")
		private String 	date;
		
		@Column(name = "result")
		private String 	result;
	
		@Column(name = "remark")
		private String 	remark;
		
		@Column(name = "test_name")
		private String 	testName;

		@Transient	
		private List<SampleTesting_Slave> listSampleTestingSlave;
		
		@ManyToOne
		@JoinColumn(name = "sampletest_master_id")
		private SampleTesting sampleTesting;
	
		public SampleTesting getSampleTesting() {
			return sampleTesting;
		}

		public void setSampleTesting(SampleTesting sampleTesting) {
			this.sampleTesting = sampleTesting;
		}

		public int getSampletestslaveid() {
			return sampletestslaveid;
		}

		public void setSampletestslaveid(int sampletestslaveid) {
			this.sampletestslaveid = sampletestslaveid;
		}

		public List<SampleTesting_Slave> getListSampleTestingSlave() {
			return listSampleTestingSlave;
		}

		public void setListSampleTestingSlave(List<SampleTesting_Slave> listSampleTestingSlave) {
			this.listSampleTestingSlave = listSampleTestingSlave;
		}

		public String getBlood_requestid() {
			return blood_requestid;
		}

		public String getTestName() {
			return testName;
		}

		public void setTestName(String testName) {
			this.testName = testName;
		}

		public String getResult() {
			return result;
		}

		public void setResult(String result) {
			this.result = result;
		}

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
		}

		public String getRemark() {
			return remark;
		}

		public void setRemark(String remark) {
			this.remark = remark;
		}

	
		public List<SampleTesting_Slave> getListSampleTesting_Slave() {
			return listSampleTestingSlave;
		}

		public void setListSampleTesting_Slave(List<SampleTesting_Slave> listSampleTesting_Slave) {
			this.listSampleTestingSlave = listSampleTesting_Slave;
		}
		public void setBlood_requestid(String blood_requestid) {
			this.blood_requestid = blood_requestid;
		}
	
}

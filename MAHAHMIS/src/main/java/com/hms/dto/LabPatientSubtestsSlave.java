
package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabPatientSubtestsSlave implements Serializable {

	private int id_patienttests_slave;

	private int id_patient_subtest_slave;

	private int subTestid;

	private String reading;

	private String reportStatus;

	private String status;

	private List<LabPatientSubtestsSlave> listSubTestslave;

	private LabSubtest objLabSubtest;

	@JsonGetter("objSubTst")
	public LabSubtest getObjLabSubtest() {
		return objLabSubtest;
	}

	@JsonSetter("objSubTst")
	public void setObjLabSubtest(LabSubtest objLabSubtest) {
		this.objLabSubtest = objLabSubtest;
	}

	@JsonGetter("idTestSlave")
	public int getId_patienttests_slave() {
		return id_patienttests_slave;
	}

	@JsonSetter("idTestSlave")
	public void setId_patienttests_slave(int id_patienttests_slave) {
		this.id_patienttests_slave = id_patienttests_slave;
	}

	@JsonGetter("idSubTestSlave")
	public int getId_patient_subtest_slave() {
		return id_patient_subtest_slave;
	}

	@JsonSetter("idSubTestSlave")
	public void setId_patient_subtest_slave(int id_patient_subtest_slave) {
		this.id_patient_subtest_slave = id_patient_subtest_slave;
	}

	@JsonGetter("subTestid")
	public int getSubTestid() {
		return subTestid;
	}

	@JsonSetter("subTestid")
	public void setSubTestid(int subTestid) {
		this.subTestid = subTestid;
	}

	@JsonGetter("reading")
	public String getReading() {
		return reading;
	}

	@JsonSetter("reading")
	public void setReading(String reading) {
		this.reading = reading;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("lisubTestSlave")
	public List<LabPatientSubtestsSlave> getListSubTestslave() {
		return listSubTestslave;
	}

	@JsonSetter("lisubTestSlave")
	public void setListSubTestslave(
			List<LabPatientSubtestsSlave> listSubTestslave) {
		this.listSubTestslave = listSubTestslave;
	}

	@JsonGetter("repoSt")
	public String getReportStatus() {
		return reportStatus;
	}

	@JsonSetter("repoSt")
	public void setReportStatus(String reportStatus) {
		this.reportStatus = reportStatus;
	}

}

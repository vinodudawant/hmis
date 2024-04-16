

package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabPatienttestsSlave implements Serializable {

	private int id_patienttests_slave;

	private int id_patienttests_master;

	private int testid;

	private String testedin;

	private float amount;

	private String testStatus;

	private List<LabPatienttestsSlave> listtestslave;

	private LabTests objLabTests;
	
	private List<LabPatientSubtestsSlave> listSubtstSlave;
	
	
	
	
	@JsonGetter("liSubTstSlave")
	public List<LabPatientSubtestsSlave> getListSubtstSlave() {
		return listSubtstSlave;
	}
	@JsonSetter("liSubTstSlave")
	public void setListSubtstSlave(List<LabPatientSubtestsSlave> listSubtstSlave) {
		this.listSubtstSlave = listSubtstSlave;
	}

	@JsonGetter("objTst")
	public LabTests getObjLabTests() {
		return objLabTests;
	}

	@JsonSetter("objTst")
	public void setObjLabTests(LabTests objLabTests) {
		this.objLabTests = objLabTests;
	}

	@JsonGetter("tstId")
	public int getTestid() {
		return testid;
	}

	@JsonSetter("tstId")
	public void setTestid(int testid) {
		this.testid = testid;
	}

	@JsonGetter("liTstSlave")
	public List<LabPatienttestsSlave> getListtestslave() {
		return listtestslave;
	}

	@JsonSetter("liTstSlave")
	public void setListtestslave(List<LabPatienttestsSlave> listtestslave) {
		this.listtestslave = listtestslave;
	}

	@JsonGetter("idTestSlave")
	public int getId_patienttests_slave() {
		return id_patienttests_slave;
	}

	@JsonSetter("idTestSlave")
	public void setId_patienttests_slave(int id_patienttests_slave) {
		this.id_patienttests_slave = id_patienttests_slave;
	}

	@JsonGetter("idTestMaster")
	public int getId_patienttests_master() {
		return id_patienttests_master;
	}

	@JsonSetter("idTestMaster")
	public void setId_patienttests_master(int id_patienttests_master) {
		this.id_patienttests_master = id_patienttests_master;
	}

	@JsonGetter("testIn")
	public String getTestedin() {
		return testedin;
	}

	@JsonSetter("testIn")
	public void setTestedin(String testedin) {
		this.testedin = testedin;
	}

	@JsonGetter("amt")
	public float getAmount() {
		return amount;
	}

	@JsonSetter("amt")
	public void setAmount(float amount) {
		this.amount = amount;
	}

	@JsonGetter("st")
	public String getTestStatus() {
		return testStatus;
	}

	@JsonSetter("st")
	public void setTestStatus(String testStatus) {
		this.testStatus = testStatus;
	}

}

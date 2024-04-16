

package com.hms.dto;

import java.io.Serializable;

public class LabPatienttests implements Serializable {

	protected int idpatienttests;

	protected int treatmentId;

	protected int subtestid;

	protected String testedin;

	protected float amount;

	protected String status;

	protected String amtcollectedby;

	public int getIdpatienttests() {
		return idpatienttests;
	}

	public void setIdpatienttests(int idpatienttests) {
		this.idpatienttests = idpatienttests;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getSubtestid() {
		return subtestid;
	}

	public void setSubtestid(int subtestid) {
		this.subtestid = subtestid;
	}

	public String getTestedin() {
		return testedin;
	}

	public void setTestedin(String testedin) {
		this.testedin = testedin;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAmtcollectedby() {
		return amtcollectedby;
	}

	public void setAmtcollectedby(String amtcollectedby) {
		this.amtcollectedby = amtcollectedby;
	}

}

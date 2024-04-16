

package com.hms.dto;

import java.io.Serializable;

public class LabSublabrates implements Serializable {

	protected int idlabrates;

	protected int labmasterid;

	protected int groupid;

	protected int testid;

	protected String amount;

	public int getIdlabrates() {
		return idlabrates;
	}

	public void setIdlabrates(int idlabrates) {
		this.idlabrates = idlabrates;
	}

	public int getLabmasterid() {
		return labmasterid;
	}

	public void setLabmasterid(int labmasterid) {
		this.labmasterid = labmasterid;
	}

	public int getGroupid() {
		return groupid;
	}

	public void setGroupid(int groupid) {
		this.groupid = groupid;
	}

	public int getTestid() {
		return testid;
	}

	public void setTestid(int testid) {
		this.testid = testid;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

}

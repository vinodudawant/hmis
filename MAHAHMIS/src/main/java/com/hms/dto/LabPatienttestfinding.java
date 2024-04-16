

package com.hms.dto;

import java.io.Serializable;

public class LabPatienttestfinding implements Serializable {

	protected int idtestfinding;

	protected int idpatienttest;

	protected int testid;

	protected int subtestid;

	protected String readings;

	protected String unit;

	protected String normalrange;

	protected String showinreport;

	protected String docremark;

	public int getIdtestfinding() {
		return idtestfinding;
	}

	public void setIdtestfinding(int idtestfinding) {
		this.idtestfinding = idtestfinding;
	}

	public int getIdpatienttest() {
		return idpatienttest;
	}

	public void setIdpatienttest(int idpatienttest) {
		this.idpatienttest = idpatienttest;
	}

	public int getTestid() {
		return testid;
	}

	public void setTestid(int testid) {
		this.testid = testid;
	}

	public int getSubtestid() {
		return subtestid;
	}

	public void setSubtestid(int subtestid) {
		this.subtestid = subtestid;
	}

	public String getReadings() {
		return readings;
	}

	public void setReadings(String readings) {
		this.readings = readings;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getNormalrange() {
		return normalrange;
	}

	public void setNormalrange(String normalrange) {
		this.normalrange = normalrange;
	}

	public String getShowinreport() {
		return showinreport;
	}

	public void setShowinreport(String showinreport) {
		this.showinreport = showinreport;
	}

	public String getDocremark() {
		return docremark;
	}

	public void setDocremark(String docremark) {
		this.docremark = docremark;
	}
	
	
	

}

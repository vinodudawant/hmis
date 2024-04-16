package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class OperationHallwiseCharges {
private int opsalveid;
private int opid;
private int hallid;
private Float hallwisecharges;
private String status;
private List<OperationHallwiseCharges> listchargesList;

@JsonGetter("opsalveid")
public int getOpsalveid() {
	return opsalveid;
}

@JsonSetter("opsalveid")
public void setOpsalveid(int opsalveid) {
	this.opsalveid = opsalveid;
}

@JsonGetter("opid")
public int getOpid() {
	return opid;
}
@JsonSetter("opid")
public void setOpid(int opid) {
	this.opid = opid;
}

@JsonGetter("hallid")
public int getHallid() {
	return hallid;
}

@JsonSetter("hallid")
public void setHallid(int hallid) {
	this.hallid = hallid;
}

@JsonGetter("hallwisecharges")
public Float getHallwisecahrges() {
	return hallwisecharges;
}

@JsonSetter("hallwisecharges")
public void setHallwisecahrges(Float hallwisecahrges) {
	this.hallwisecharges = hallwisecahrges;
}
@JsonGetter("status")
public String getStatus() {
	return status;
}

@JsonSetter("status")
public void setStatus(String status) {
	this.status = status;
}

@JsonGetter("listchargesList")
public List<OperationHallwiseCharges> getListcharges() {
	return listchargesList;
}

@JsonSetter("listcharges")
public void setListcharges(List<OperationHallwiseCharges> listcharges) {
	this.listchargesList = listcharges;
}
}

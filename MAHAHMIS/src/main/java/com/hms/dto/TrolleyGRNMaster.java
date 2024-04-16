package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class TrolleyGRNMaster {
private int id;
private String date;
private String description;
private List<TrolleyGRNMaster> listTrolleyGRNMaster;
private int grnId;
private int trolleyId;

@JsonGetter("id")
public int getId() {
	return id;
}
@JsonSetter("id")
public void setId(int id) {
	this.id = id;
}
@JsonGetter("date")
public String getDate() {
	return date;
}
@JsonSetter("date")
public void setDate(String date) {
	this.date = date;
}
@JsonGetter("description")
public String getDescription() {
	return description;
}
@JsonSetter("description")
public void setDescription(String description) {
	this.description = description;
}
@JsonGetter("listTrolleyGRNMaster")
public List<TrolleyGRNMaster> getListTrolleyGRNMaster() {
	return listTrolleyGRNMaster;
}
@JsonSetter("listTrolleyGRNMaster")
public void setListTrolleyGRNMaster(List<TrolleyGRNMaster> listTrolleyGRNMaster) {
	this.listTrolleyGRNMaster = listTrolleyGRNMaster;
}
@JsonGetter("grnId")
public int getGrnId() {
	return grnId;
}
@JsonSetter("grnId")
public void setGrnId(int grnId) {
	this.grnId = grnId;
}
@JsonGetter("trolleyId")
public int getTrolleyId() {
	return trolleyId;
}
@JsonSetter("trolleyId")
public void setTrolleyId(int trolleyId) {
	this.trolleyId = trolleyId;
}
}

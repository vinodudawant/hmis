package com.hms.ecogreenapi;

public class EcogreenItemInputDto {
   String br_code;
   String c2_code;
   DataDto data;
public String getBr_code() {
	return br_code;
}
public void setBr_code(String br_code) {
	this.br_code = br_code;
}
public String getC2_code() {
	return c2_code;
}
public void setC2_code(String c2_code) {
	this.c2_code = c2_code;
}
public DataDto getData() {
	return data;
}
public void setData(DataDto data) {
	this.data = data;
}
@Override
public String toString() {
	return "InputDto [br_code=" + br_code + ", c2_code=" + c2_code + ", data=" + data + "]";
}
   
   
}

class DataDto{
	String arugumentDate;
	String index;
	public String getArugumentDate() {
		return arugumentDate;
	}
	public void setArugumentDate(String arugumentDate) {
		this.arugumentDate = arugumentDate;
	}
	public String getIndex() {
		return index;
	}
	public void setIndex(String index) {
		this.index = index;
	}
	@Override
	public String toString() {
		return "DataDto [arugumentDate=" + arugumentDate + ", index=" + index + "]";
	}
	
	
}
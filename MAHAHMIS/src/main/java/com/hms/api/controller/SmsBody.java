package com.hms.api.controller;

public class SmsBody {
	
	String type;
	String text;
	String isHSM;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String isHSM() {
		return isHSM;
	}
	public void setHSM(String isHSM) {
		this.isHSM = isHSM;
	}
	

}

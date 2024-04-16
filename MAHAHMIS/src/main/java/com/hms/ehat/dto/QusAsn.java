package com.hms.ehat.dto;

import java.util.ArrayList;
import java.util.List;

public class QusAsn {
	int option_id=0;
	String txt="-";
	String qname = "-";
	String qType = "-";
	String optionName="-";
	
	public QusAsn(int option_id, String txt, String qname, String qType, String optionName) {
		super();
		this.option_id = option_id;
		this.txt = txt;
		this.qname = qname;
		this.qType = qType;
		this.optionName = optionName;
	}
	public String getQname() {
		return qname;
	}
	public void setQname(String qname) {
		this.qname = qname;
	}
	public String getOptionName() {
		return optionName;
	}
	public void setOptionName(String optionName) {
		this.optionName = optionName;
	}
	List<QusAsn> list= new ArrayList<QusAsn>();
	public int getOption_id() {
		return option_id;
	}
	public void setOption_id(int option_id) {
		this.option_id = option_id;
	}
	public String getqType() {
		return qType;
	}
	public void setqType(String qType) {
		this.qType = qType;
	}
	public String getTxt() {
		return txt;
	}
	public void setTxt(String txt) {
		this.txt = txt;
	}
	public List<QusAsn> getList() {
		return list;
	}
	public void setList(List<QusAsn> list) {
		this.list = list;
	}
	public QusAsn() {
		super();
	}
	public QusAsn(int option_id, String txt) {
		super();
		this.option_id = option_id;
		this.txt = txt;
	}

}

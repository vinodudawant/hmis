package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name = "ehat_output_order_slave")
public class OutputDTO implements Serializable{

	
private static final long serialVersionUID = 1L;

@Id
@GeneratedValue
@Column(name = "idoutput_slave")
private int idOutput; 

@Column(name = "idnursing_assessment_one_day")
private int idnursing_assessment_one_day; 

@Column(name = "time")
private String time;

public String getTime() {
	return time;
}


public void setTime(String time) {
	this.time = time;
}


@Column(name = "iv")
private String iv;

@Column(name = "amt")
private String amt;

@Column(name = "urine")
private String urine;

@Column(name = "status")
private String status;


@Transient
private List<OutputDTO> outputListslave;


public int getIdOutput() {
	return idOutput;
}


public void setIdOutput(int idOutput) {
	this.idOutput = idOutput;
}


public int getIdnursing_assessment_one_day() {
	return idnursing_assessment_one_day;
}


public void setIdnursing_assessment_one_day(int idnursing_assessment_one_day) {
	this.idnursing_assessment_one_day = idnursing_assessment_one_day;
}


public String getIv() {
	return iv;
}


public void setIv(String iv) {
	this.iv = iv;
}


public String getAmt() {
	return amt;
}


public void setAmt(String amt) {
	this.amt = amt;
}


public String getUrine() {
	return urine;
}


public void setUrine(String urine) {
	this.urine = urine;
}


public String getStatus() {
	return status;
}


public void setStatus(String status) {
	this.status = status;
}


public List<OutputDTO> getOutputListslave() {
	return outputListslave;
}


public void setOutputListslave(List<OutputDTO> outputListslave) {
	this.outputListslave = outputListslave;
} 


}
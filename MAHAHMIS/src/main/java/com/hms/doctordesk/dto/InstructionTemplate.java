package com.hms.doctordesk.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="dd_instruction_template")
public class InstructionTemplate {
	
	@Id
	@GeneratedValue
	@Column(name="template_id")
	private int template_id;
	
	@Column(name="topicName")
	private String topicName;
	
	@Column(name="status")
	private String status="N";

	public int getTemplate_id() {
		return template_id;
	}

	public void setTemplate_id(int template_id) {
		this.template_id = template_id;
	}

	public String getTopicName() {
		return topicName;
	}

	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	

}

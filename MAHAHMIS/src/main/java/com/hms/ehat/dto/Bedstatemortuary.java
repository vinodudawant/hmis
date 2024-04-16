package com.hms.ehat.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="bedstatemortuary")
public class Bedstatemortuary {


	@Id
	@GeneratedValue
	private int bedstatemortuary_id;
	@Column(name="bed_state")
	private String bed_state;
	@Column(name="bed_state_status")
	private String bed_state_status;
	public int getBedstatemortuary_id() {
		return bedstatemortuary_id;
	}
	public void setBedstatemortuary_id(int bedstatemortuary_id) {
		this.bedstatemortuary_id = bedstatemortuary_id;
	}
	public String getBed_state() {
		return bed_state;
	}
	public void setBed_state(String bed_state) {
		this.bed_state = bed_state;
	}
	public String getBed_state_status() {
		return bed_state_status;
	}
	public void setBed_state_status(String bed_state_status) {
		this.bed_state_status = bed_state_status;
	}
	
}

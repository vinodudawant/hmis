package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name = "ehat_visit")
public class VisitDto {

	@Id
	@GeneratedValue
	@Column(name = "reg_id")
	private Integer regId;
	
	@Column(name = "prefix")
	private int prefix;
}

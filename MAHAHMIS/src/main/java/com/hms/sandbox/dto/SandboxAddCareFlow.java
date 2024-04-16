package com.hms.sandbox.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "sandbox_add_care_flow")
public class SandboxAddCareFlow {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;

	@Column(name = "flow_id")
	private int flowId;
	
}

package com.hms.dto;

import java.util.List;
import java.util.Set;

import org.codehaus.jackson.annotate.JsonGetter;

/**
 * OperationTypeTbl generated by hbm2java
 */
public class OperationTypeTbl implements java.io.Serializable {

	private int idoperationTypeTbl;
	private String name;
	private String status;
	private List<OperationTypeTbl> listOperationType;

	public OperationTypeTbl() {
	}

	public OperationTypeTbl(int idoperationTypeTbl) {
		this.idoperationTypeTbl = idoperationTypeTbl;
	}

	public OperationTypeTbl(int idoperationTypeTbl, String name, String status,
			Set operationNamerTbls) {
		this.idoperationTypeTbl = idoperationTypeTbl;
		this.name = name;
		this.status = status;
		
	}

	@JsonGetter("idpt")
	public int getIdoperationTypeTbl() {
		return this.idoperationTypeTbl;
	}

	public void setIdoperationTypeTbl(int idoperationTypeTbl) {
		this.idoperationTypeTbl = idoperationTypeTbl;
	}

	@JsonGetter("ptnm")
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonGetter("st")
	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	@JsonGetter("lipt")
	public List<OperationTypeTbl> getListOperationType() {
		return listOperationType;
	}

	public void setListOperationType(List<OperationTypeTbl> listOperationType) {
		this.listOperationType = listOperationType;
	}



}

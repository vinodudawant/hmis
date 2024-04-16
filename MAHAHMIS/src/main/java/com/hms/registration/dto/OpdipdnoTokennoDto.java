package com.hms.registration.dto;

import java.util.List;

public class OpdipdnoTokennoDto {

	String tokenno;
	String opdipdno,treatcount;
	Number invoiceCount;
	List<OpdipdnoTokennoDto> lstTokennoDto;
	
	public String getTokenno() {
		return tokenno;
	}
	public void setTokenno(String tokenno) {
		this.tokenno = tokenno;
	}
	public String getOpdipdno() {
		return opdipdno;
	}
	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}
	public String getTreatcount() {
		return treatcount;
	}
	public void setTreatcount(String treatcount) {
		this.treatcount = treatcount;
	}
	public Number getInvoiceCount() {
		return invoiceCount;
	}
	public void setInvoiceCount(Number invoiceCount) {
		this.invoiceCount = invoiceCount;
	}
	public List<OpdipdnoTokennoDto> getLstTokennoDto() {
		return lstTokennoDto;
	}
	public void setLstTokennoDto(List<OpdipdnoTokennoDto> lstTokennoDto) {
		this.lstTokennoDto = lstTokennoDto;
	}
}

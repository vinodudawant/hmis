package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryDocAndDocNoAndFinYearDTO {
	
	private Integer document_numbering_id;
	private Integer doc_id;
	private String doc_name;
	private String document_series;
	private String document_number;
	private String document_prefix;
	private String document_suffix;
	private Integer doc_financial_year_id;
	private String doc_financial_year;
	
	private Integer doc_delete_flag;
	private Date doc_update_date; 
	private DocumentDTO documentdto;
	private InventoryFinancialYearDTO inventoryFinancialYearDTO;
	private List<InventoryDocAndDocNoAndFinYearDTO> lstDocumentNUmberDto;
	
	@JsonGetter("lstDocumentNUmberDto")
	public List<InventoryDocAndDocNoAndFinYearDTO> getLstDocumentNUmberDto() {
		return lstDocumentNUmberDto;
	}
	@JsonSetter("lstDocumentNUmberDto")
	public void setLstDocumentNUmberDto(
			List<InventoryDocAndDocNoAndFinYearDTO> lstDocumentNUmberDto) {
		this.lstDocumentNUmberDto = lstDocumentNUmberDto;
	}
	
	@JsonGetter("document_numbering_id")
	public Integer getDocument_numbering_id() {
		return document_numbering_id;
	}
	
	@JsonGetter("doc_id")
	public Integer getDoc_id() {
		return doc_id;
	}
	@JsonSetter("doc_id")
	public void setDoc_id(Integer doc_id) {
		this.doc_id = doc_id;
	}
	
	@JsonGetter("doc_financial_year_id")
	public Integer getDoc_financial_year_id() {
		return doc_financial_year_id;
	}
	@JsonSetter("doc_financial_year_id")
	public void setDoc_financial_year_id(Integer doc_financial_year_id) {
		this.doc_financial_year_id = doc_financial_year_id;
	}
	@JsonSetter("document_numbering_id")
	public void setDocument_numbering_id(Integer document_numbering_id) {
		this.document_numbering_id = document_numbering_id;
	}
	
	@JsonGetter("doc_name")
	public String getDoc_name() {
		return doc_name;
	}
	@JsonSetter("doc_name")
	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}
	
	@JsonGetter("document_series")
	public String getDocument_series() {
		return document_series;
	}
	@JsonSetter("document_series")
	public void setDocument_series(String document_series) {
		this.document_series = document_series;
	}
	@JsonGetter("document_number")
	public String getDocument_number() {
		return document_number;
	}
	@JsonSetter("document_number")
	public void setDocument_number(String document_number) {
		this.document_number = document_number;
	}
	
	@JsonGetter("document_prefix")
	public String getDocument_prefix() {
		return document_prefix;
	}
	@JsonSetter("document_prefix")
	public void setDocument_prefix(String document_prefix) {
		this.document_prefix = document_prefix;
	}
	
	@JsonGetter("document_suffix")
	public String getDocument_suffix() {
		return document_suffix;
	}
	
	@JsonSetter("document_suffix")
	public void setDocument_suffix(String document_suffix) {
		this.document_suffix = document_suffix;
	}
	
	@JsonGetter("doc_financial_year")
	public String getDoc_financial_year() {
		return doc_financial_year;
	}
	@JsonSetter("doc_financial_year")
	public void setDoc_financial_year(String doc_financial_year) {
		this.doc_financial_year = doc_financial_year;
	}
	
	@JsonGetter("doc_delete_flag")
	public Integer getDoc_delete_flag() {
		return doc_delete_flag;
	}
	@JsonSetter("doc_delete_flag")
	public void setDoc_delete_flag(Integer doc_delete_flag) {
		this.doc_delete_flag = doc_delete_flag;
	}
	
	@JsonGetter("doc_update_date")
	public Date getDoc_update_date() {
		return doc_update_date;
	}
	@JsonSetter("doc_update_date")
	public void setDoc_update_date(Date doc_update_date) {
		this.doc_update_date = doc_update_date;
	}
	@JsonGetter("documentdto")
	public DocumentDTO getDocumentdto() {
		return documentdto;
	}
	@JsonSetter("documentdto")
	public void setDocumentdto(DocumentDTO documentdto) {
		this.documentdto = documentdto;
	}
	
	@JsonGetter("inventoryFinancialYearDTO")
	public InventoryFinancialYearDTO getInventoryFinancialYearDTO() {
		return inventoryFinancialYearDTO;
	}
	@JsonSetter("inventoryFinancialYearDTO")
	public void setInventoryFinancialYearDTO(
			InventoryFinancialYearDTO inventoryFinancialYearDTO) {
		this.inventoryFinancialYearDTO = inventoryFinancialYearDTO;
	}

}

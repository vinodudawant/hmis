package com.hms.dto;

import java.util.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class DocumentDTO {
	private Integer doc_id;
	private String doc_name;
	private int doc_delete_flag;
	private Date doc_update_date;
	private List<DocumentDTO> DocumentDTO;

	@JsonGetter("doc_id")
	public Integer getDoc_id() {
		return doc_id;
	}

	@JsonSetter("doc_id")
	public void setDoc_id(Integer doc_id) {
		this.doc_id = doc_id;
	}

	@JsonGetter("doc_name")
	public String getDoc_name() {
		return doc_name;
	}

	@JsonSetter("doc_name")
	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}

	@JsonGetter("doc_delete_flag")
	public int getDoc_delete_flag() {
		return doc_delete_flag;
	}

	@JsonSetter("doc_delete_flag")
	public void setDoc_delete_flag(int doc_delete_flag) {
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

	@JsonGetter("DocumentDTO")
	public List<DocumentDTO> getDocumentDTO() {
		return DocumentDTO;
	}

	@JsonSetter("DocumentDTO")
	public void setDocumentDTO(List<DocumentDTO> documentDTO) {
		DocumentDTO = documentDTO;
	}

}

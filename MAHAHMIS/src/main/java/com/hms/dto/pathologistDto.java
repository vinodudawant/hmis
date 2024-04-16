package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class pathologistDto {

	// lab report created by ---Amrut
		private int docId;
		private String DocName;
		private List<pathologistDto> docList;
		
		@JsonGetter("docList")
		public List<pathologistDto> getDocList() {
			return docList;
		}
		@JsonSetter("docList")
		public void setDocList(List<pathologistDto> docList) {
			this.docList = docList;
		}
		@JsonGetter("docId")
		public int getDocId() {
			return docId;
		}
		@JsonSetter("docId")
		public void setDocId(int docId) {
			this.docId = docId;
		}
		
		@JsonGetter("docName")
		public String getDocName() {
			return DocName;
		}
		@JsonSetter("docName")
		public void setDocName(String docName) {
			DocName = docName;
		}
}
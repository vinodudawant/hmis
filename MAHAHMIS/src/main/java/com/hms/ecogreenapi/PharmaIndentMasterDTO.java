package com.hms.ecogreenapi;

import java.util.Date;
import java.util.List;

public class PharmaIndentMasterDTO {
	    private int indentMasterId;
	    private int storeId;
        private   int patientId;
        private   int treatmentId;
        private   String patientName;
        private   String indentDate;
        private  String indentStatus;
        
         List<PharmaIndentSlaveDTO> lstItemList;
        
         
		public int getPatientId() {
			return patientId;
		}
		public void setPatientId(int patientId) {
			this.patientId = patientId;
		}
		public int getTreatmentId() {
			return treatmentId;
		}
		public void setTreatmentId(int treatmentId) {
			this.treatmentId = treatmentId;
		}
		public String getPatientName() {
			return patientName;
		}
		public void setPatientName(String patientName) {
			this.patientName = patientName;
		}
		
		public String getIndentStatus() {
			return indentStatus;
		}
		public void setIndentStatus(String indentStatus) {
			this.indentStatus = indentStatus;
		}
		public List<PharmaIndentSlaveDTO> getLstItemList() {
			return lstItemList;
		}
		public void setLstItemList(List<PharmaIndentSlaveDTO> lstItemList) {
			this.lstItemList = lstItemList;
		}
	
		public String getIndentDate() {
			return indentDate;
		}
		public void setIndentDate(String indentDate) {
			this.indentDate = indentDate;
		}
		public int getIndentMasterId() {
			return indentMasterId;
		}
		public void setIndentMasterId(int indentMasterId) {
			this.indentMasterId = indentMasterId;
		}
		public int getStoreId() {
			return storeId;
		}
		public void setStoreId(int storeId) {
			this.storeId = storeId;
		}
		@Override
		public String toString() {
			return "PharmaIndentMasterDTO [indentMasterId=" + indentMasterId + ", storeId=" + storeId + ", patientId="
					+ patientId + ", treatmentId=" + treatmentId + ", patientName=" + patientName + ", indentDate="
					+ indentDate + ", indentStatus=" + indentStatus + ", lstItemList=" + lstItemList + "]";
		}
		
		
		
		
		
		
		
         
         
         
         
}

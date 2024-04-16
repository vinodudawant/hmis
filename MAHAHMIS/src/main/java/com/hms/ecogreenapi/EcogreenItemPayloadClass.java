package com.hms.ecogreenapi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EcogreenItemPayloadClass {
	 int appStatusCode;
	   
	   EcogreenItemPayloadJson PayloadJson;
	    String  apiCall;
	    String payloadClass;
	    String requestId;
	    String time;
	    String milliSeconds;
		public int getAppStatusCode() {
			return appStatusCode;
		}
		public void setAppStatusCode(int appStatusCode) {
			this.appStatusCode = appStatusCode;
		}
		public EcogreenItemPayloadJson getPayloadJson() {
			return PayloadJson;
		}
		public void setPayloadJson(EcogreenItemPayloadJson payloadJson) {
			PayloadJson = payloadJson;
		}
		public String getApiCall() {
			return apiCall;
		}
		public void setApiCall(String apiCall) {
			this.apiCall = apiCall;
		}
		public String getPayloadClass() {
			return payloadClass;
		}
		public void setPayloadClass(String payloadClass) {
			this.payloadClass = payloadClass;
		}
		public String getRequestId() {
			return requestId;
		}
		public void setRequestId(String requestId) {
			this.requestId = requestId;
		}
		public String getTime() {
			return time;
		}
		public void setTime(String time) {
			this.time = time;
		}
		public String getMilliSeconds() {
			return milliSeconds;
		}
		public void setMilliSeconds(String milliSeconds) {
			this.milliSeconds = milliSeconds;
		}
		@Override
		public String toString() {
			return "EcogreenItemPayloadClass [appStatusCode=" + appStatusCode + ", PayloadJson=" + PayloadJson
					+ ", apiCall=" + apiCall + ", payloadClass=" + payloadClass + ", requestId=" + requestId + ", time="
					+ time + ", milliSeconds=" + milliSeconds + "]";
		}
	    
	    
}

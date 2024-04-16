package com.hms.bmw.dto;

public class BmwRequisitionCountDto {
	
		Integer approveCount;
		
		Integer openCount;
		
		Integer assignCount;

		Integer completeCount;
		
		public Integer getCompleteCount() {
			return completeCount;
		}

		public void setCompleteCount(Integer completeCount) {
			this.completeCount = completeCount;
		}

		public Integer getApproveCount() {
			return approveCount;
		}

		public void setApproveCount(Integer approveCount) {
			this.approveCount = approveCount;
		}


		public Integer getOpenCount() {
			return openCount;
		}

		public void setOpenCount(Integer openCount) {
			this.openCount = openCount;
		}

		public Integer getAssignCount() {
			return assignCount;
		}

		public void setAssignCount(Integer assignCount) {
			this.assignCount = assignCount;
		}
		
	}


package com.hms.ipd.service;

import java.util.List;

import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.dto.DischargeSummery;
import com.hms.dto.PaediatricDeptNICU;
import com.hms.ehat.dto.TreatmentDto;

public interface IPD_AutoSummaryService
{

	public List<TreatmentDto> fetchPatientAdmissionNote(TreatmentDto treatment);
	
	List<DiagonosisMasterDto> getListOfDiagoList(int treatmentId);

	public int saveAutoDischargeSummery(DischargeSummery obj,String SummarNOte,PaediatricDeptNICU nicuObj);

	public List<DischargeSummery> fetchAutoDischargeSummery(int treatmentId);
	
	public int  updateAdmissionNote(int treatmentId,String adNote);
	

	
}

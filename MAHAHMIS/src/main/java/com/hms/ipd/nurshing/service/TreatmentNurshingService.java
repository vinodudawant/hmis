package com.hms.ipd.nurshing.service;

import java.util.List;

import com.hms.doctordesk.dto.OPDChemoTheropyDTO;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ipd.nurshing.dto.ChartInfoDTO;
import com.hms.ipd.nurshing.dto.ChartReportDTO;
import com.hms.ipd.nurshing.dto.NurshingCarePlanDTO;
import com.hms.ipd.nurshing.dto.NurshingDrugAdministartionDTO;
import com.hms.ipd.nurshing.dto.NurshingPainScaleDTO;
import com.hms.ipd.nurshing.dto.TreatmentNurshingDTO;

public interface TreatmentNurshingService {

	  int saveNurshingChartDetails(TreatmentNurshingDTO onj,String password);
	  List<TreatmentNurshingDTO> getNurchingChartDetails(int treatmentId,int unitId,String date);
	  int deleteNusrshingDetails(String ids,int UserId);
	  int saveInputOutputNurshingChart(ChartInfoDTO obj);
	  List<ChartInfoDTO> getListOfInputOutputDetails(int treatmentId,int unitId,int cType,String vitalDate);
	  ChartInfoDTO editChartInfo(int chartId);
	  int deleteInputOutputDetails(int id,int UserId);
	  int saveIpdVitals(String vitalList);
	  List<ChartReportDTO> getIpdVitalList(int treatmentId,int unitId,String todayDate);
	  int savePostIntensvisit(ChartReportDTO obj);
	  List<ChartReportDTO>   getPostIntensvisit(int treatmentId,int unitId,String todayDate,int chartType);
	  int saveNurshingCarePlan(NurshingCarePlanDTO obj);
	  NurshingCarePlanDTO  getNurshingCarePlan(int treatmentId,int unitId);
	  int saveNurshingPainScale(NurshingPainScaleDTO obj);
	  NurshingPainScaleDTO  getNurshingPainScale(int treatmentId,int unitId,String todayDate);
	  NurshingPainScaleDTO  getNurshingPainScaleForPrint(int treatmentId,int unitId,String fromDate,String toDate);
	  int updateChemoDetailsOnNurshing(int id,String startTime,String stopTime,String sign,String remark);
	  int saveNurshingDrugAdministration(NurshingDrugAdministartionDTO obj, String password);
	  List<NurshingDrugAdministartionDTO>  getNurshingDrugAdministartionlist(int treatmentId,int unitId,String dateDrug);
	  int deleteNusrshingDrugDetails(String ids,int UserId);
	  List<AutosugeestionDto> getServiceDetailsOnNurshing(int serviceId,String findName,int UserId);
	  int deleteIpdServiceDetailsOnNusrshing(String ids,int UserId);
	  List<OPDChemoTheropyDTO>  getListOfChemoDetails(int treatmentId,int unitId);
	  List<NurshingPainScaleDTO>  getAllNurshingPainScale(int treatmentId,int unitId);
	  List<NurshingDrugAdministartionDTO>  getNurshingDrugAdministartionlist(int treatmentId,int unitId);

	  
	  
	   
}

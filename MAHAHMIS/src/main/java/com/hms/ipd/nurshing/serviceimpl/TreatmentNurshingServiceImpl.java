package com.hms.ipd.nurshing.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dto.OPDChemoTheropyDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ipd.nurshing.dao.TreatmentNurshingDao;
import com.hms.ipd.nurshing.dto.ChartInfoDTO;
import com.hms.ipd.nurshing.dto.ChartReportDTO;
import com.hms.ipd.nurshing.dto.NurshingCarePlanDTO;
import com.hms.ipd.nurshing.dto.NurshingDrugAdministartionDTO;
import com.hms.ipd.nurshing.dto.NurshingPainScaleDTO;
import com.hms.ipd.nurshing.dto.TreatmentNurshingDTO;
import com.hms.ipd.nurshing.service.TreatmentNurshingService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
@Transactional
public class TreatmentNurshingServiceImpl  implements TreatmentNurshingService{

	  @Autowired
	  TreatmentNurshingDao dao;
	  
	@Override
	public int saveNurshingChartDetails(TreatmentNurshingDTO onj,String password) {
		
		return dao.saveNurshingChartDetails(onj,password);
	}

	@Override
	public List<TreatmentNurshingDTO> getNurchingChartDetails(int treatmentId, int unitId,String date) {
		
		return dao.getNurchingChartDetails(treatmentId, unitId, date);
	}

	@Override
	public int deleteNusrshingDetails(String ids, int UserId) {
		
		return dao.deleteNusrshingDetails(ids, UserId);
	}

	@Override
	public int saveInputOutputNurshingChart(ChartInfoDTO obj) {
	
		return dao.saveInputOutputNurshingChart(obj);
	}

	@Override
	public List<ChartInfoDTO> getListOfInputOutputDetails(int treatmentId, int unitId, int cType,String vitalDate) {
		
		return dao.getListOfInputOutputDetails(treatmentId, unitId, cType,vitalDate);
	}

	@Override
	public ChartInfoDTO editChartInfo(int chartId) {
		
		return dao.editChartInfo(chartId);
	}

	@Override
	public int deleteInputOutputDetails(int id,int UserId) {
		
		return dao.deleteInputOutputDetails(id,UserId);
	}

	@Override
	public int saveIpdVitals(String vitalList) {
		ChartReportDTO freshobj = (ChartReportDTO) ConfigUIJSONUtility
				.getObjectFromJSON(vitalList, ChartReportDTO.class);	
		List<ChartReportDTO> lsthistoryslave = freshobj.getLstChartReport();
		int res=0;
		  for(ChartReportDTO obj:lsthistoryslave ) {
			  dao.saveIpdVitals(obj);
			  res=1;
		  }
		
		return res;
	}

	@Override
	public List<ChartReportDTO> getIpdVitalList(int treatmentId, int unitId, String todayDate) {
		
		return dao.getIpdVitalList(treatmentId, unitId, todayDate);
	}

	@Override
	public int savePostIntensvisit(ChartReportDTO obj) {
	
		return dao.savePostIntensvisit(obj);
	}

	@Override
	public List<ChartReportDTO> getPostIntensvisit(int treatmentId, int unitId, String todayDate, int chartType) {
		
		return dao.getPostIntensvisit(treatmentId, unitId, todayDate, chartType);
	}

	@Override
	public int saveNurshingCarePlan(NurshingCarePlanDTO obj) {
		
		return dao.saveNurshingCarePlan(obj);
	}

	@Override
	public NurshingCarePlanDTO getNurshingCarePlan(int treatmentId, int unitId) {
		
		return dao.getNurshingCarePlan(treatmentId, unitId);
	}

	@Override
	public int saveNurshingPainScale(NurshingPainScaleDTO obj) {
		
		return dao.saveNurshingPainScale(obj);
	}

	@Override
	public NurshingPainScaleDTO getNurshingPainScale(int treatmentId, int unitId, String todayDate) {
		
		return dao.getNurshingPainScale(treatmentId, unitId, todayDate);
	}

	@Override
	public NurshingPainScaleDTO getNurshingPainScaleForPrint(int treatmentId, int unitId, String fromDate,
			String toDate) {
		
		return dao.getNurshingPainScaleForPrint(treatmentId, unitId, fromDate, toDate);
		
		
	}

	@Override
	public int updateChemoDetailsOnNurshing(int id, String startTime, String stopTime, String sign, String remark) {
		
		return dao.updateChemoDetailsOnNurshing(id, startTime, stopTime, sign, remark);
	}

	@Override
	public int saveNurshingDrugAdministration(NurshingDrugAdministartionDTO obj, String password) {
		
		return dao.saveNurshingDrugAdministration(obj,password);
	}

	@Override
	public List<NurshingDrugAdministartionDTO> getNurshingDrugAdministartionlist(int treatmentId, int unitId,String dateDrug) {
		
		return dao.getNurshingDrugAdministartionlist(treatmentId, unitId,dateDrug);
	}

	@Override
	public int deleteNusrshingDrugDetails(String ids, int UserId) {
	
		return dao.deleteNusrshingDrugDetails(ids, UserId);
	}

	@Override
	public List<AutosugeestionDto> getServiceDetailsOnNurshing(int serviceId,String findName, int UserId) {
		
		return dao.getServiceDetailsOnNurshing(serviceId,findName, UserId);
	}

	@Override
	public int deleteIpdServiceDetailsOnNusrshing(String ids, int UserId) {
		
		return dao.deleteIpdServiceDetailsOnNusrshing(ids, UserId);
	}

	@Override
	public List<OPDChemoTheropyDTO> getListOfChemoDetails(int treatmentId, int unitId) {
		
		return dao.getListOfChemoDetails(treatmentId, unitId);
	}
	
	@Override
	public List<NurshingPainScaleDTO> getAllNurshingPainScale(int treatmentId, int unitId) {
		
		return dao.getAllNurshingPainScale(treatmentId, unitId);
	}

	@Override
	public List<NurshingDrugAdministartionDTO> getNurshingDrugAdministartionlist(int treatmentId, int unitId) {
		return dao.getNurshingDrugAdministartionlist(treatmentId, unitId);

	}

}

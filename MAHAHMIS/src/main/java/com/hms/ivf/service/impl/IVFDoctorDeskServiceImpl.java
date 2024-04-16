package com.hms.ivf.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IVFDoctorDeskDao;
import com.hms.ivf.dto.IVFAutoSummaryDischargeDTO;
import com.hms.ivf.dto.IVFCpoeServdetails;
import com.hms.ivf.dto.IVFDietDTO;
import com.hms.ivf.dto.IVFDignosisDTO;
import com.hms.ivf.dto.IVFOTNotesDTO;
import com.hms.ivf.dto.IVFRegPatientDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.dto.IvfBillDetailsDto;
import com.hms.ivf.service.IVFDoctorDeskService;

@Service
public class IVFDoctorDeskServiceImpl implements IVFDoctorDeskService {

	@Autowired
	IVFDoctorDeskDao ivfdao;
	@Override
	@Transactional
	public List<IVFRegPatientDTO> getListIVFRegPatientDTO(String pageName) {
		
		return ivfdao.getListIVFRegPatientDTO(pageName);
	}
	@Override
	@Transactional
	public IVFRegPatientDTO getIvfPatientInfoByIVFTreatId(Integer ivfTreatId) {
		
		return ivfdao.getIvfPatientInfoByIVFTreatId(ivfTreatId);
	}
	
	
	@Override
	@Transactional
	public int setProvisinalOrConfirmDignosisType(Integer ivfdignoMasterId,	String dignosisType) {
		
		return ivfdao.setProvisinalOrConfirmDignosisType(ivfdignoMasterId, dignosisType);
	}
	@Override
	@Transactional
	public int saveIVFDiet(IVFDietDTO obj) {
		
		return ivfdao.saveIVFDiet(obj);
	}
	@Override
	@Transactional
	public List<IVFDietDTO> getListOfIVFDiet(Integer ivfTreatId, Integer unitId) {
		
		return ivfdao.getListOfIVFDiet(ivfTreatId, unitId);
	}
	@Override
	@Transactional
	public int deleteIVFDiet(String ivfdietMasterId, Integer userId) {
		
		return ivfdao.deleteIVFDiet(ivfdietMasterId, userId);
	}
	@Override
	@Transactional
	public IVFDietDTO editIVFDiet(Integer ivfdietMasterId) {
		
		return ivfdao.editIVFDiet(ivfdietMasterId);
	}
	@Override
	@Transactional
	public List<IVFDietDTO> getIVFDietListForPrint(String ivfdietMasterIds) {
		
		return ivfdao.getIVFDietListForPrint(ivfdietMasterIds);
	}
	@Override
	@Transactional
	public int savecpoeForIVF(IvfBillDetailsDto billDetailsDto, HttpServletRequest request, String queryType) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current login user id
		String usertype= (String)session.getAttribute("userType");
		String a=billDetailsDto.getCallfrom();
		
		Integer sponsorId= billDetailsDto.getSponsorId();
		Integer chargesSlaveId= billDetailsDto.getChargesSlaveId();
		String iscombination =billDetailsDto.getIscombination();
		int subId = billDetailsDto.getSubServiceId();
		
		/*SubServiceDto obje = (SubServiceDto) sessionFactory
				.getCurrentSession().get(
						SubServiceDto.class,
						subId);
		iscombination =obje.getIscombination();
		*/
		//System.err.println("usertype isss=="+ usertype);
		if (queryType.equalsIgnoreCase("insert")) { // To Insert Record

			billDetailsDto.setCreatedBy(userId);	
			billDetailsDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsDto.setDeleted("N");
			
			if(billDetailsDto.getSndToLabFlag().equals(null) || billDetailsDto.getSndToLabFlag()==null)
			{
				billDetailsDto.setSndToLabFlag("N");
			}
			
			/*if (billDetailsDto.getPaidFlag().equals("Y")) {
				billDetailsDto.setPaidFlag("Y");
			}else{
				billDetailsDto.setPaidFlag("N");
			}*/
			if (a.equals("reciept") || a.equals("addToOPDreciept")) {
				billDetailsDto.setPaidFlag("Y");
			}
			
			if(billDetailsDto.getDoctorId()==0){
				
				if(usertype.equalsIgnoreCase("doctor") ||usertype.equalsIgnoreCase("Doctor") ||usertype.equalsIgnoreCase("Dr")||usertype.equalsIgnoreCase("dr"))
				{
					 billDetailsDto.setDoctorId(userId);
					
				}
				
				
				
			}
			
			

		} else if (queryType.equalsIgnoreCase("update")) {// To Update Record

			billDetailsDto.setUpdatedBy(userId);
			billDetailsDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsDto.setDeleted("N");
			billDetailsDto.setAccountStatusOpdDiagno("N");
			
			if (a.equals("reciept") || a.equals("addToOPDreciept")) {
				billDetailsDto.setPaidFlag("Y");
			}
			
            if(billDetailsDto.getDoctorId()==0){
				
				if(usertype.equalsIgnoreCase("doctor") ||usertype.equalsIgnoreCase("Doctor") ||usertype.equalsIgnoreCase("Dr")||usertype.equalsIgnoreCase("dr"))
				{
					 billDetailsDto.setDoctorId(userId);
					
				}
				
				
				
			}

		}
		
		if(iscombination.equals("Y")){
			
			
			
			/*
			 * return ivfdao.saveToOtherBilling(billDetailsDto, queryType, sponsorId,
			 * chargesSlaveId, a,request);
			 */
			
			return 0;
			
		} else {
			return ivfdao.savecpoe(billDetailsDto, queryType);
		}
		
		
	
	}
	@Override
	@Transactional
	public List<IVFCpoeServdetails> getlistbiil(Integer pID, String callform, Integer servid,HttpServletRequest request) {
		
		return ivfdao.getlistbiil(pID, callform,servid);
	}
	@Override
	@Transactional
	public int deleteservdetails(String labservicelist, String callform, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		IvfBillDetailsDto billDetailsDto = new IvfBillDetailsDto();
		
		billDetailsDto.setDeletedBy(userId);
		return ivfdao.deleteservdetails( labservicelist,userId,callform);
	}
	@Override
	@Transactional
	public int saveAutoIvfDischargeSummery(IVFAutoSummaryDischargeDTO obj) {
		
		return ivfdao.saveAutoIvfDischargeSummery(obj) ;
	}
	@Override
	@Transactional
	public IVFAutoSummaryDischargeDTO getIvfAutoSummary(Integer ivfTreatId) {
		
		return ivfdao.getIvfAutoSummary(ivfTreatId);
	}
	
	@Override
	@Transactional
	public List<IVFTreatmentDTO> getPrevIvfPatdetails(Integer patientId) {
		
		return ivfdao.getPrevIvfPatdetails(patientId);
	}
	
	@Override
	@Transactional
	public RegistrationViewDto autoSuggestionOfPrevIvfPatient(String findingName,int patSearchType,String callFrom) {
		 
		return ivfdao.autoSuggestionOfPrevIvfPatient(findingName,patSearchType,callFrom);
	}
	
	@Override
	@Transactional
	public List<IVFRegPatientDTO>  getPreviousIvfPatientTreatment(String letter,String usertype, Integer unitId) {
		
		return ivfdao.getPreviousIvfPatientTreatment(letter,usertype,unitId);
		
	}

	@Override
	@Transactional
	public List<IVFRegPatientDTO>  getIvfPatientTreatmentForDD(String letter,String usertype, Integer unitId) {
		
		return ivfdao.getIvfPatientTreatmentForDD(letter,usertype,unitId);
		
	}
	
	@Override
	@Transactional
	public List<IVFRegPatientDTO> getIvfPreviousAutoSummaryList() {
		
		return ivfdao.getIvfPreviousAutoSummaryList();
	}
	@Override
	@Transactional
	public List<IVFRegPatientDTO> getIvfTreatmentListByPatientId(Integer patinetId) {
		
		return ivfdao.getIvfTreatmentListByPatientId(patinetId);
	}
	@Override
	@Transactional
	public List<IVFRegPatientDTO> autoSuggestionForPriviousAuttosummary(String searchText) {
		
		return ivfdao.autoSuggestionForPriviousAuttosummary(searchText);
	}
	@Override
	@Transactional
	public IVFRegPatientDTO getPatientInfoByPatientId(Integer patientId) {
		
		return ivfdao.getPatientInfoByPatientId(patientId);
	}
	@Override
	@Transactional
	public int saveIvfAutoSummaryOTNotes(IVFOTNotesDTO obj) {
		return ivfdao.saveIvfAutoSummaryOTNotes(obj);
	}
	@Override
	@Transactional
	public IVFOTNotesDTO getIvfOTNotes(Integer ivfTreatId) {
		return ivfdao.getIvfOTNotes(ivfTreatId);
	}
	
	@Override
	@Transactional
	public List<IVFRegPatientDTO> getPatientOnIvfDoctorDesk(String fromDate, String toDate, String page) {
		// TODO Auto-generated method stub
		return ivfdao.getPatientOnIvfDoctorDesk(fromDate, toDate, page);
	}

}

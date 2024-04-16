package com.hms.mortuary.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.mortuary.dao.MortuaryRegisterDao;
import com.hms.mortuary.dto.MortuaryDocUploadDto;
import com.hms.mortuary.dto.MortuaryFindingsDto;
import com.hms.mortuary.dto.MortuaryMasterDto;
import com.hms.mortuary.service.MortuaryRegisterservice;

@Service
public class MortuaryRegisterServiceimpl implements MortuaryRegisterservice{
    
	@Autowired
	MortuaryRegisterDao mortuaryregdao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public int saveMortuaryRegisterData(MortuaryMasterDto mortuaryegister) {
		int response= mortuaryregdao.saveMortuaryRegisterData(mortuaryegister);
		return response;
       
	}

	@Override
	@Transactional
	public MortuaryMasterDto getInternalPatientData(Integer patientid) {
		// TODO Auto-generated method stub
		
		MortuaryMasterDto obj=mortuaryregdao.getInternalPatientData(patientid);
		return obj;
	}

	@Override
	@Transactional

	public List<MortuaryMasterDto> getAllMortuaryRegisterPatient(String callform) {
		
		List<MortuaryMasterDto> obj=mortuaryregdao.getAllMortuaryRegisterPatient(callform);

		return obj;
	}

	@Override
	@Transactional
	public MortuaryMasterDto editmortuarydetails(Integer morId) {
	
		MortuaryMasterDto obj=mortuaryregdao.editmortuarydetails(morId);
		return obj;
	}

	@Override
	@Transactional
	public List<MortuaryMasterDto> autosuggesationMortuaryPatient(
			String findingName,String type) {
	
		
		List<MortuaryMasterDto> obj=mortuaryregdao.autosuggesationMortuaryPatient(findingName,type);

		return obj;
	}

	
	@Override
	@Transactional
	public boolean deletemortuarydetails(MortuaryMasterDto mortuary ) {
		
		return mortuaryregdao.deletemortuarydetails(mortuary);	
		
	}
	
	@Override
	@Transactional
	public List<MortuaryMasterDto> getDatewiseData(String from_date,
			String to_date,String type) {
		List<MortuaryMasterDto> obj=mortuaryregdao.getDatewiseData(from_date,to_date,type);

		
		return obj;
	}

	@Override
	@Transactional
	public int saveFindings(String listfindingsmortuary,int morId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		int response=0;		
		response= mortuaryregdao.saveFindings(listfindingsmortuary,morId,request);
	
		return response;
	}

	@Override
	@Transactional
	public List<MortuaryFindingsDto> fetchfindings(int mortuaryId) {
		List<MortuaryFindingsDto> obj=mortuaryregdao.fetchfindings(mortuaryId);
		return obj;
	}

	@Override
	@Transactional
	public int UploadMortuaryimages(List<MortuaryDocUploadDto> docList, int morId) {

		return mortuaryregdao.UploadMortuaryimages(docList, morId);
	}

	@Override
	@Transactional
	public List<MortuaryDocUploadDto> fetchDoc(int mortuaryId) {
		List<MortuaryDocUploadDto> obj=mortuaryregdao.fetchDoc(mortuaryId);
		return obj;
	}

	@Override
	@Transactional

	public String deletedocmortuary(int imgid, int userId) {
		
		return mortuaryregdao.deletedocmortuary(imgid, userId);
	}

	@Override
	@Transactional
	public boolean deleteFindings(String findingsId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		return mortuaryregdao.deleteFindings(findingsId, userId);

	}


}

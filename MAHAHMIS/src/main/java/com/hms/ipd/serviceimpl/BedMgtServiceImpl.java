package com.hms.ipd.serviceimpl;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ipd.dao.BedMgtDao;
import com.hms.ipd.dto.PatientBedInfoDTO;
import com.hms.ipd.service.BedMgtService;
import com.hms.opdbill.dto.PatientHeaderInfoDto;

@Service
@Transactional
public class BedMgtServiceImpl implements BedMgtService {

	private @Autowired
	BedMgtDao bedMgtDao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public PatientHeaderInfoDto getIpdPatientHeaderInfo(int treatmentId, int unitId) {
		
		return bedMgtDao.getIpdPatientHeaderInfo(treatmentId, unitId);
	}
	
	@Override
	public ChargesMasterSlave getWardTypeList(int hallTypeId) {
		
		return bedMgtDao.getWardTypeList(hallTypeId);
	}
	 
	@Override
	public PatientBedInfoDTO getPatientBedDetails(int chargesSlaveId, int hallId, String callFrom, int unitId) {
		
		return bedMgtDao.getPatientBedDetails(chargesSlaveId, hallId, callFrom, unitId);
	}
	
	@Override
	public double getAdminChargesIpd(int unitId, int deptId) {
		
		return bedMgtDao.getAdminChargesIpd(unitId, deptId);
	}
	
	@Override
	public int allocateBedToPatient(TreatMentBeds treatmentBeds) {

		return bedMgtDao.allocateBedToPatient(treatmentBeds);
	}
	
	@Override
	public PatientBedInfoDTO getBillableBedCharges(int chargesSlaveId, int hallId, String callFrom) {
		
		return bedMgtDao.getBillableBedCharges(chargesSlaveId, hallId, callFrom);
	}

	@Override
	public void sendSMSDoctorCK(int treatmentId) {
		bedMgtDao.sendSMSDoctorCK(treatmentId);
		
	}

	@Override
	public int checkBedIsFree(TreatMentBeds treatBeds) {
		
		int response=0;
		Session s = sessionFactory.getCurrentSession();
		try {
			
			Query duplicateCheckQuery = s.createSQLQuery("select count(*) from treatment_beds where status='Y' and Treatment_ID="+treatBeds.getTreatmentId());
			int treatCount = ((Number) duplicateCheckQuery.uniqueResult()).intValue();
			
			Query bedStateQuery = s.createSQLQuery("select count(*) from beds where deleted='N' and idbedstate='3' and Bed_ID="+treatBeds.getBedId());
			int bedStateCount = ((Number) bedStateQuery.uniqueResult()).intValue();
			
			Query onBedQuery = s.createSQLQuery("select count(*) from ehat_bill_details_ipd where deleted='N' and cancle='N' and on_bed_flag='Y' and treatment_id="+treatBeds.getTreatmentId());
			int onBedCount = ((Number) onBedQuery.uniqueResult()).intValue();
			
			response = treatCount + bedStateCount + onBedCount;
			
		} catch (Exception e) {
			e.printStackTrace();
			return response;
		}
		return response;
	}
}

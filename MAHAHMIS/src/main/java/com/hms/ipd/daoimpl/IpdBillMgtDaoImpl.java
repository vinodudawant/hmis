package com.hms.ipd.daoimpl;

import java.lang.invoke.MethodHandles;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ipd.dao.IpdBillMgtDao;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.registration.dto.PatientConsultationChargesDto;

@Repository
public class IpdBillMgtDaoImpl implements IpdBillMgtDao{

	private static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	static {
		System.out.println("IpdBillMgtDaoImpl is Loaded...!");
	}
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto) {

		log.info("In IpdBillMgtDaoImpl getPatientServiceDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_ipd_bill_patient_service_detail(:treatmentFlag,:treatmentId)");
			querySp.setParameter("treatmentFlag", objDto.gettFlag());//here 'AT' for active treatment
			querySp.setParameter("treatmentId", objDto.getTreatmentId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientServiceDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientServiceDetailsDto> lstServiceDetailsDto = querySp.list();		
			objDto.setListServiceIpdDto(lstServiceDetailsDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto) {log.info("In IpdBillMgtDaoImpl getPatientSubServiceDetails()");
	Session s = sessionFactory.getCurrentSession();
	
	try {
		//if(objDto.getDrdeskflag().equals("P")) {
			Query querySp1 = s.createSQLQuery("call sp_ipd_bill_patient_sub_service_details_for_ot_drugs(:treatmentFlag,:treatmentId,:serviceId)");
			querySp1.setParameter("treatmentFlag", "AT");//here 'AT' for active treatment
			querySp1.setParameter("treatmentId", objDto.getTreatmentId());
			querySp1.setParameter("serviceId", objDto.getServiceId());
			querySp1.setResultTransformer(new AliasToBeanResultTransformer(PatientSubServiceDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientSubServiceDetailsDto> lstOTSubServiceDetailsDto = querySp1.list();
			objDto.setListBillNobleServiceDto(lstOTSubServiceDetailsDto);
			// }

			Query querySp2 = s.createSQLQuery(
					"call sp_ipd_bill_patient_sub_service_details_for_ot_inventory(:treatmentFlag,:treatmentId,:serviceId)");
			querySp2.setParameter("treatmentFlag", "AT");// here 'AT' for active treatment
			querySp2.setParameter("treatmentId", objDto.getTreatmentId());
			querySp2.setParameter("serviceId", objDto.getServiceId());
			querySp2.setResultTransformer(new AliasToBeanResultTransformer(PatientSubServiceDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientSubServiceDetailsDto> lstOTInevntoySubServiceDetailsDto = querySp2.list();
			objDto.setListSubServiceInventoryDto(lstOTInevntoySubServiceDetailsDto);

			Query querySp = s.createSQLQuery(
					"call sp_ipd_bill_patient_sub_service_details(:treatmentFlag,:treatmentId,:serviceId)");
			querySp.setParameter("treatmentFlag", "AT");// here 'AT' for active treatment
			querySp.setParameter("treatmentId", objDto.getTreatmentId());
			querySp.setParameter("serviceId", objDto.getServiceId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientSubServiceDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientSubServiceDetailsDto> lstSubServiceDetailsDto = querySp.list();
				// objDto.setListSubServiceIpdDto(lstSubServiceDetailsDto);

				// Updated by Rohini on 07-09-2023 for ipd general billing services and billing
				// print
				
				if (objDto.getDrdeskflag().equals("sponsorpat") || objDto.getDrdeskflag().equals("print")) {
					objDto.setListSubServiceIpdDto(lstSubServiceDetailsDto);
				} else {
					objDto.setListSubServiceInventoryDto(lstSubServiceDetailsDto);
				}
			

			log.debug("Response--------> " + objDto);
			return objDto;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto) {

		log.info("In IpdBillMgtDaoImpl getPatientPackageDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_ipd_bill_patient_package_details(:billDetailsId,:treatmentId)");
			querySp.setParameter("billDetailsId", objDto.getBillDetailsId());
			querySp.setParameter("treatmentId", objDto.getTreatmentId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientPackageDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientPackageDetailsDto> lstSubServiceDetailsDto = querySp.list();		
			objDto.setListIpdPackageDto(lstSubServiceDetailsDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}

	@Override
	public BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto) {

		log.info("In IpdBillMgtDaoImpl getAllAmountDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_ipd_bill_amount_details(:unitId,:depId,:userId,:treatmentId,:serviceId,:chargesSlaveId,:sponsorCatId,:pharmacyInvoice,:pharmacyServId,:callformComAdv,:callformRcptTot,:callformPrevPending)");
			querySp.setParameter("unitId", objDto.getUnitId());
			querySp.setParameter("depId", objDto.getDepId());
			querySp.setParameter("userId", objDto.getUserId());
			querySp.setParameter("treatmentId", objDto.getTreatmentId());
			querySp.setParameter("serviceId", objDto.getServiceId());
			querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
			querySp.setParameter("sponsorCatId", objDto.getSponsorCatId());
			querySp.setParameter("pharmacyInvoice", objDto.getPharmacyInvoice());
			querySp.setParameter("pharmacyServId", objDto.getPharmacyServId());
			querySp.setParameter("callformComAdv", objDto.getCallformComAdv());//opdBill
			querySp.setParameter("callformRcptTot", objDto.getCallformRcptTot());//opd
			querySp.setParameter("callformPrevPending", objDto.getCallformPrevPending());//onload
			querySp.setResultTransformer(new AliasToBeanResultTransformer(BillAmountDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<BillAmountDetailsDto> lstAmountDetails = querySp.list();		
			objDto.setLstAmountDetails(lstAmountDetails);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}

	@Override
	public PatientConsultationChargesDto getDoctorConsultationChargesForIpd(PatientConsultationChargesDto objDto) {

		log.info("In IpdBillMgtDaoImpl getDoctorConsultaiononCharges()");
		
		try {
			
			// SP for get consultation charges
			Query spQuery1 = sessionFactory.getCurrentSession().createSQLQuery("call sp_ipdbill_get_doctor_charges(:patient_id,:treatment_id,:unit_id,:department_id,:user_id,:charges_slave_id,:bill_id,:service_id,:query_type,:doctor_id_list,:hallTypeId)");
			spQuery1.setParameter("patient_id", objDto.getPatientId());
			spQuery1.setParameter("treatment_id", objDto.getTreatmentId());
			spQuery1.setParameter("unit_id", objDto.getUnitId());
			spQuery1.setParameter("department_id", objDto.getDepId());
			spQuery1.setParameter("user_id", objDto.getUserId());
			spQuery1.setParameter("charges_slave_id", objDto.getChargesSlaveId());
			spQuery1.setParameter("bill_id", objDto.getBillId());
			spQuery1.setParameter("service_id", 2);
			spQuery1.setParameter("query_type", "insert");
			spQuery1.setParameter("doctor_id_list", objDto.getDoctorId());
			spQuery1.setParameter("hallTypeId", objDto.getHallTypeId());
			spQuery1.setResultTransformer(new AliasToBeanResultTransformer(PatientConsultationChargesDto.class));
			@SuppressWarnings("unchecked")
			List<PatientConsultationChargesDto> ltConsultChargesDto = spQuery1.list();		
			objDto.setLstConstCharges(ltConsultChargesDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}
}

package com.hms.ipd.utility;

import java.lang.invoke.MethodHandles;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.ConfigurationServiceService;
import com.hms.ipd.dto.HTypeHallBedTreatmentBedDTO;
import com.hms.ipd.dto.IPDPatientDetailsDTO;

@SuppressWarnings("unchecked")
@Repository
public class CommonBedsMagMethods {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	private @Autowired SessionFactory sessionFactory;
	private @Autowired ConfigurationServiceService configServiceService;

	/**
	 * @author Touheed
	 * @modified 25-Feb-2022
	 * @reason : Get Treatment Beds Count for bed allocation
	 */
	public Integer fetchTreatmentBedsCount(Integer bedId, Integer treatmentId, String status) {
		LOGGER.info("CommonBedsMagMethods: fetchTreatmentBedsCount method called with BedId:" + bedId + " TreatementId:"
				+ treatmentId + " Status" + status);
		Long count = 0l;
		try {
			count = (Long) sessionFactory.getCurrentSession().createCriteria(TreatMentBeds.class)
					.add(Restrictions.disjunction().add(Restrictions.eq("Bed_ID", bedId))
					.add(Restrictions.eq("Treatment_ID", treatmentId)))
					.add(Restrictions.eq("status", status))
					.setProjection(Projections.rowCount())
					.uniqueResult();
			
			LOGGER.info("Treametbeds count:" + count.intValue());
		} catch (HibernateException e) {
			LOGGER.error("Error Occured during fetchTreatmentBedsCount" + e.getMessage());
		}
		return count.intValue();
	}

	public TreatmentDto fetchTreatment(Integer treatmentId) {
		LOGGER.info("CommonBedsMagMethods: fetchTreatment method called with  TreatementId:" + treatmentId);
		try {
			return (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
		} catch (HibernateException e) {
			LOGGER.error("Error Occured during fetchTreatment" + e.getMessage());
			return null;
		}
	}

	public BillMasterDto fetchBillMaster(Integer treatmentId) {
		LOGGER.info("CommonBedsMagMethods: fetchBillMaster method called with  TreatementId:" + treatmentId);
		try {
			TreatmentDto treatmentDto = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class,
					treatmentId);
			return treatmentDto.getListBill().get(0);
		} catch (HibernateException e) {
			LOGGER.error("Error Occured during fetchBillMaster" + e.getMessage());
			return null;
		}
	}

	public List<BillDetailsIpdDto> fetchBillDetailsIpdServiceWise(Integer serviceId, Integer subServiceId) {
		LOGGER.info("CommonBedsMagMethods: BillDetailsIpdDto method called with  ServiceId:" + serviceId
				+ " SubServiceId:" + subServiceId);
		try {

			List<BillDetailsIpdDto> billDetailsIpd = sessionFactory.getCurrentSession()
					.createCriteria(BillDetailsIpdDto.class).add(Restrictions.eq("serviceId", serviceId))
					.add(Restrictions.eq("subServiceId", subServiceId)).list();
			return billDetailsIpd;
		} catch (HibernateException e) {
			LOGGER.error("Error Occured during fetchBillDetailsIpdServiceWise" + e.getMessage());
			return null;
		}
	}

	public List<BillDetailsIpdDto> fetchBillDetailsIpdServiceWise(Integer serviceId, Integer subServiceId,
			String property, char c) {
		LOGGER.info("CommonBedsMagMethods: BillDetailsIpdDto method called with  ServiceId:" + serviceId
				+ " SubServiceId:" + subServiceId);
		try {

			List<BillDetailsIpdDto> billDetailsIpd = sessionFactory.getCurrentSession()
					.createCriteria(BillDetailsIpdDto.class).add(Restrictions.eq("serviceId", serviceId))
					.add(Restrictions.eq("subServiceId", subServiceId)).add(Restrictions.eq(property, c)).list();
			return billDetailsIpd;
		} catch (HibernateException e) {
			LOGGER.error("Error Occured during fetchBillDetailsIpdServiceWise" + e.getMessage());
			return null;
		}
	}

	public TreatMentBeds saveTreatmentBeds(TreatMentBeds treatMentBeds) {
		LOGGER.info("CommonBedsMagMethods: saveTreatmentBeds method called with  TreatMentBeds:"
				+ treatMentBeds.toString());
		try {
			return (TreatMentBeds) sessionFactory.getCurrentSession().merge(treatMentBeds);
		} catch (HibernateException e) {
			LOGGER.error("Error Occured during saveTreatmentBeds" + e.getMessage());
			return null;
		}

	}

	public HTypeHallBedTreatmentBedDTO fetchHTypeHallBedTreatmentBed(Integer id,String isolation,String callFrom) {
		try {
			LOGGER.info("CommonBedsMagMethods: fetchHTypeHallBedTreatmentBed method called with bedId:" + id+" callfrom:"+callFrom);
			String storedProcedure= ("BED".equals(callFrom)) ? "call sp_get_halltype_hall_bed_details_by_bedId(:id,:isolation)":"call sp_get_halltype_hall_bed_details_by_hallId(:id,:isolation)";
			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery(storedProcedure)
					.setParameter("id", id)
					.setParameter("isolation", isolation);
			query.setResultTransformer(new AliasToBeanResultTransformer(HTypeHallBedTreatmentBedDTO.class));
			return (HTypeHallBedTreatmentBedDTO) query.uniqueResult();
		} catch (HibernateException e) {
			LOGGER.error("Error Occured during fetchHTypeHallBedTreatmentBed" + e.getMessage());
			return null;
		}
	}

	public Integer countOfTreatmentIdsByPatientId(String treatmentFlag, Integer patienttId) {
		LOGGER.info("CommonBedsMagMethods: countOfTreatmentIdsByPatientId method called with patientId:" + patienttId);
		Long count = 0l;
		try {
			//patinet id is not bidierational mapping with TreatmentDTO so can't use criteria.
			String sql = "SELECT count(treatment_id) as treatment_count FROM ehat_treatment where t_flag=:treatmentFlag and patient_id= :patienttId";
			count = (Long) sessionFactory.getCurrentSession().createSQLQuery(sql)
			.addEntity(TreatmentDto.class)
			.setParameter("treatmentFlag", treatmentFlag)
			.setParameter("patienttId", patienttId).uniqueResult();
			
			LOGGER.info("countOfTreatmentIdsByPatientId count:" + count.intValue());
		} catch (HibernateException e) {
			LOGGER.error("Error Occured during countOfTreatmentIdsByPatientId" + e.getMessage());
		}
		return count.intValue();
	}
	
	public void updateBedState(int bedID,String status) {
		LOGGER.info("BedManagementDaoImpl: updateBedState method called for bid:" + bedID);
		try {
			String hqlUpdate = "update Beds b set b.bedstate = :bedstate where b.bed_ID = :bedId";
			 sessionFactory.getCurrentSession().createQuery( hqlUpdate )
			                    .setParameter("bedstate", status)
								 .setParameter("bedId", bedID)
			                    .executeUpdate();
		} catch (HibernateException e) {
			LOGGER.error("Error occured in BedManagementDaoImpl: updateBedState" + e.getMessage());
		}		
	}

	public void updateTreamentBedForShift(String bedID,Integer userId) {
		LOGGER.info("BedManagementDaoImpl: updateTreamentBedForShift method called for bid:" + bedID);
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		try {
			String hqlUpdate = "update TreatMentBeds tb set tb.status= :status, tb.Out_Time= :outTime, tb.shifted_By= :shiftedBy, tb.shifted_date_time= :shiftedDateTime"
					+ " where tb.Bed_ID = :bedId";
			 sessionFactory.getCurrentSession().createQuery( hqlUpdate )
			                    .setParameter("status", "N")
			                    .setParameter("outTime", currentDate.getTime())
			                    .setParameter("shiftedBy", userId) 
			                    .setParameter("shiftedDateTime", currentDate.getTime())
								.setParameter("bedId", bedID)
			                    .executeUpdate();
		} catch (HibernateException e) {
		}		
	}
	
	//BillDetailsIpdDto
	public void updateOnBedFlagInBillDetailsIPD(String bedId, Integer treatmentId) {
		LOGGER.info("BedManagementDaoImpl: updateOnBedFlagInBillDetailsIPD method called for bid:" + bedId);
		try {
			String hqlUpdate = "update BillDetailsIpdDto b set b.onBedFlag ='N' where b.serviceId=3 and b.subServiceId = :bedId and b.treatmentId= :treatmentId";
			 sessionFactory.getCurrentSession().createQuery( hqlUpdate )
								.setParameter("bedId", bedId)
								.setParameter("treatmentId", treatmentId)
			                    .executeUpdate();
		} catch (HibernateException e) {
			LOGGER.error("Error occured in BedManagementDaoImpl: updateOnBedFlagInBillDetailsIPD" + e.getMessage());
		}		
	}
	
	public Integer countOfphysicalDisCountByTid(int treatmentId) {
		LOGGER.info("CommonBedsMagMethods: countOfphysicalDisCountByTid method called with treatmentId:" + treatmentId );
		Long count = 0l;
		try {
			count = (Long) sessionFactory.getCurrentSession().createCriteria(TreatmentDto.class)
					.add(Restrictions.eq("phyDisFlag", "Y"))
					.add(Restrictions.eq("treatmentId", treatmentId))
					.setProjection(Projections.rowCount())
					.uniqueResult();
			
			LOGGER.info("Physical discharge count:" + count.intValue());
		} catch (HibernateException e) {
			LOGGER.error("Error Occured during countOfphysicalDisCountByTid" + e.getMessage());
		}
		return count.intValue();
	}
	
	public IPDPatientDetailsDTO fetchPatinetTreatmentBillDetailsByTid(Integer treatmentId) {
		try {
			LOGGER.info("CommonBedsMagMethods: fetchPatinetTreatmentBillDetailsByTid method called with treatmentId:" + treatmentId );
			String storedProcedure="call sp_get_halltype_hall_bed_details_by_bedId(:treatmentId)"; 
			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery(storedProcedure)
					.setParameter("treatmentId", treatmentId);
			query.setResultTransformer(new AliasToBeanResultTransformer(IPDPatientDetailsDTO.class));
			return (IPDPatientDetailsDTO) query.uniqueResult();
		} catch (HibernateException e) {
			LOGGER.error("Error Occured during fetchPatinetTreatmentBillDetailsByTid" + e.getMessage());
			return null;
		}
	}
}

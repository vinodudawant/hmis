package com.hms.ivf.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.impl.PrescriptionDaoImpl;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OPDPrescriptionFolloUpDto;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IVFCalenderDao;
import com.hms.ivf.dao.IVFPrescriptionDao;
import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.dto.IVFPrescriptionDtoSP;
import com.hms.ivf.dto.IVFPrescriptionFolloUpDto;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.dto.IvfPrescriptionsDto;
import com.hms.pharmacy.pojo.ProductMaster;

@Repository
public class IVFPrescriptionDaoImpl implements IVFPrescriptionDao {

	@Autowired
	SessionFactory sessionFactory;
	
	
	
	
	private static final org.slf4j.Logger logger =  LoggerFactory.getLogger(IVFPrescriptionDaoImpl.class);

	@Override
	public int savefollowUpForIVFPatient(IVFPrescriptionFolloUpDto obj, Integer treatmentId, Integer ivfTreatId, HttpServletRequest request) {
		
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			Integer doctorId = (Integer) session.getAttribute("doctorId");
			System.err.println("doctorId...."+doctorId);
			
			if (obj.getIvfFollowUpId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				TreatmentDto treatDTO = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				obj.setTreatmentDto(treatDTO);
				
				IVFTreatmentDTO ivfTreatmentDto = (IVFTreatmentDTO) sessionFactory.getCurrentSession().get(IVFTreatmentDTO.class, ivfTreatId);
				obj.setIvfTreatmentDto(ivfTreatmentDto);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
				
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				TreatmentDto treatDTO = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				obj.setTreatmentDto(treatDTO);
				
				IVFTreatmentDTO ivfTreatmentDto = (IVFTreatmentDTO) sessionFactory.getCurrentSession().get(IVFTreatmentDTO.class, ivfTreatId);
				obj.setIvfTreatmentDto(ivfTreatmentDto);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
		
	}

	@Override
	public IVFPrescriptionFolloUpDto getfollowUpForIVFDoctorDesk(Integer unitId, Integer treatmentId, Integer ivfTreatId) {
		
		IVFPrescriptionFolloUpDto dto = new IVFPrescriptionFolloUpDto();
		
		try {
			
			
			TreatmentDto treatmentDto = (TreatmentDto) sessionFactory.openSession().get(TreatmentDto.class, treatmentId);
			
			IVFTreatmentDTO ivfTreatmentDto = (IVFTreatmentDTO) sessionFactory.openSession().get(IVFTreatmentDTO.class, ivfTreatId);
			
			Criteria criteria = sessionFactory.openSession().createCriteria(IVFPrescriptionFolloUpDto.class);
			
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("treatmentDto", treatmentDto));
			criteria.add(Restrictions.eq("ivfTreatmentDto", ivfTreatmentDto));
			dto = (IVFPrescriptionFolloUpDto) criteria.uniqueResult();
			
			return dto;
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		logger.info("-----IN IVFPrescriptionDaoImpl IVFPrescriptionFolloUpDto --> " + dto);
		
		return null;
		
	}

	@Override
	public int saveIVFPrescription(IvfPrescriptionsDto obj, HttpServletRequest request, Integer productId) {
		
		logger.info("-----IN IVFPrescriptionDaoImpl saveIVFPrescription --> ");
		
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			if (obj.getIvfPrescriptionId() == 0) {
				
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
//				ProductMaster productMaster;
//				
//				if(productId > 0) {
//					
//					 productMaster = (ProductMaster) sessionFactory.getCurrentSession().get(ProductMaster.class, productId);
//					 obj.setProductMaster(productMaster);
//					 
//				} else {
//					
//					ProductMaster pp = new ProductMaster();
//					 obj.setProductMaster(pp);
//					
//				}
				
				ProductMaster productMaster = (ProductMaster) sessionFactory.getCurrentSession().get(ProductMaster.class, productId);
				 obj.setProductMaster(productMaster);
				 
				 
//				IVFTreatmentDTO ivfTreatmentDto = (IVFTreatmentDTO) sessionFactory.getCurrentSession().get(IVFTreatmentDTO.class, ivfTreatId);
//				obj.setIvfTreatmentDto(ivfTreatmentDto);
				
				
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
				
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				ProductMaster productMaster = (ProductMaster) sessionFactory.getCurrentSession().get(ProductMaster.class, productId);
				obj.setProductMaster(productMaster);
				
//				IVFTreatmentDTO ivfTreatmentDto = (IVFTreatmentDTO) sessionFactory.getCurrentSession().get(IVFTreatmentDTO.class, ivfTreatId);
//				obj.setIvfTreatmentDto(ivfTreatmentDto);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	
		
	
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IVFPrescriptionDtoSP> getAllIVFPrescriptions(Integer treatmentId, Integer unitId, Integer ivfTreatId) { 
		
		logger.info("-----IN IVF PrescriptionDaoImpl getAllIVFPrescriptions  --> ");
		PrescriptionDaoImpl prescriptionDaoImpl =new PrescriptionDaoImpl();
		
		List<IVFPrescriptionDtoSP> lists = new ArrayList<>();
		
		try {
			
    //      Query prescriptionSP = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_opd_prescription_data(:unitId, :treatmentId)");
			Query prescriptionSP = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_ivf_prescription(:unitId, :ivfTreatId)");
            prescriptionSP.setParameter("unitId", unitId);
            prescriptionSP.setParameter("ivfTreatId", ivfTreatId);
            
            prescriptionSP.setResultTransformer(new AliasToBeanResultTransformer(IVFPrescriptionDtoSP.class));
            
            lists = prescriptionSP.list();
            
            System.out.println("IVF PrescriptionDaoImpl getAllIVFPrescriptions : result lists size: " + lists.size());
            
			
		} catch (Exception e) {
			logger.error("getAllIVFPrescriptions Exception--> ",e);
		}
		
		
			for(IVFPrescriptionDtoSP obj : lists) {
				
					
					Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+obj.getPrep()+"'");
					String preName = (String)query.uniqueResult();
					
			//		System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - preName: " + preName);
					obj.setPrepName(preName);
					
					Query query1 = sessionFactory.getCurrentSession().createQuery("select uomName from UomMaster where uomId='"+obj.getUnit()+"'");
					String unitName = (String)query1.uniqueResult();
					
			//		System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - unitName: " + unitName);
					obj.setUnitName(unitName);
					
					obj.setInstructionName(fetchInstructionNamesIVF(obj.getInstruction(), obj.getUnitId()));
					
			}
			
		//	System.err.println("------------> getAllIVFPrescriptions SP---> " + lists);
	
	return lists;
}
	
	
	private String fetchInstructionNamesIVF(Integer instruction, Integer unitId) {
			
			logger.error("fetchInstructionNames for ID : --> " + instruction);
			
			if(instruction == 0) {
				
				return "-/-/-";
				
			} else {
				
				PrescriptionInstructionDto instrDTO = new PrescriptionInstructionDto();
				
				try {
					Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescriptionInstructionDto.class);
					criteria.add(Restrictions.eq("id", instruction));
					criteria.add(Restrictions.eq("unitId", unitId));
					
					instrDTO = (PrescriptionInstructionDto) criteria.uniqueResult();
					
				}catch (Exception e) {
					logger.error("fetchInstructionNames Exception--> ",e);
				}
				
				return instrDTO.getEnglishInstruction() + "/" + instrDTO.getHindiInstruction() + "/" + instrDTO.getMarathiInstruction();
				
			}
	
	}

	@SuppressWarnings("unchecked")
	@Override
	public IVFPrescriptionDtoSP getIVFPrescriptionById(Integer unitId, Integer ivfPrescriptionId) {

		
		
		logger.info("-----IN IVF-PrescriptionDaoImpl ivfPrescriptionId  --> ");
		
		List<IVFPrescriptionDtoSP> lists = new ArrayList<>();
		
		try {
			
            Query prescriptionSP = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_ivf_prescription_by_ivf_presc_id(:unitId, :ivfPrescriptionId)");
            prescriptionSP.setParameter("unitId", unitId);
            prescriptionSP.setParameter("ivfPrescriptionId", ivfPrescriptionId);
            
            prescriptionSP.setResultTransformer(new AliasToBeanResultTransformer(IVFPrescriptionDtoSP.class));
            
            lists = prescriptionSP.list();
            
			
		} catch (Exception e) {
			logger.error("getIVFPrescriptionById Exception--> ",e);
		}
		
		
			for(IVFPrescriptionDtoSP obj : lists) {
				
				
		//		if(obj.getMedicineId() == 0 || obj.getMedicineId() == null) {
					
					Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+obj.getPrep()+"'");
					String preName = (String)query.uniqueResult();
					
					System.out.println("PrescriptionDaoImpl getPrescriptionById : general medicine - preName: " + preName);
					obj.setPrepName(preName);
					
					//	obj.setUnitName(fetchUnitName(obj.getMedicineId()));
					
					Query query1 = sessionFactory.getCurrentSession().createQuery("select uomName from UomMaster where uomId='"+obj.getUnit()+"'");
					String unitName = (String)query1.uniqueResult();
					
					System.out.println("PrescriptionDaoImpl getPrescriptionById : general medicine - unitName: " + unitName);
					obj.setUnitName(unitName);
					
					obj.setInstructionName(fetchInstructionNamesIVF(obj.getInstruction(), obj.getUnitId()));
					
//				} else {
//				
//					obj.setPrepName(fetchPrepName(obj.getMedicineId()));
//					obj.setUnitName(fetchUnitName(obj.getMedicineId()));
//					obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));
//				}
			}
			
			System.err.println("------NEW------> getPrescriptionById SP---> " + lists);
			
	
		return lists.get(0);
	
	
	}

	@Override
	public boolean deleteIVFPrescription(Integer unitId, String ivfPrescriptionId, HttpServletRequest request) {
		
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			//Changed by Akshata 4-April-2022
			String ivfPrescriptionId_ArrId [] = ivfPrescriptionId.split(",");
			
			System.out.println("prescriptionArrId-----"+ivfPrescriptionId_ArrId);
			for (int i = 0; i < ivfPrescriptionId_ArrId.length; i++) {	
			IvfPrescriptionsDto obj = (IvfPrescriptionsDto) sessionFactory.getCurrentSession().get(IvfPrescriptionsDto.class, Integer.parseInt(ivfPrescriptionId_ArrId[i]));
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			}
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	
	}
	

}

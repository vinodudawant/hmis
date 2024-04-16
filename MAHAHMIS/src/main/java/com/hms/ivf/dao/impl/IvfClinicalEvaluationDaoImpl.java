package com.hms.ivf.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.impl.OPDClinicalEvaluationDaoImpl;
import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IvfClinicalEvaluationDao;
import com.hms.ivf.dto.IVFClinicalEvalNewDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;

import groovy.util.logging.Slf4j;

@Repository
@Slf4j
public class IvfClinicalEvaluationDaoImpl implements IvfClinicalEvaluationDao {
	
	@Autowired
	SessionFactory sessionFactory;
	
	private static final Logger logger = LoggerFactory.getLogger(OPDClinicalEvaluationDaoImpl.class);

	@Override
	public int saveIVFClinicalEvaluation(IVFClinicalEvalNewDTO obj, Integer ivfTreatId, HttpServletRequest request) {
		
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			if (obj.getClinicalEvalId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				IVFTreatmentDTO treatDTO = (IVFTreatmentDTO) sessionFactory.getCurrentSession().get(IVFTreatmentDTO.class, ivfTreatId);
				obj.setIvfTreatmentDto(treatDTO);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
				
				
			} else {
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				IVFTreatmentDTO treatDTO = (IVFTreatmentDTO) sessionFactory.getCurrentSession().get(IVFTreatmentDTO.class, ivfTreatId);
				obj.setIvfTreatmentDto(treatDTO);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	
	}

	@Override
	public OPDClinicalEvaluationDto fetchClinicalEvalTempDataByTreatmentId(Integer treatmentId,
			HttpServletRequest request) {

		logger.info("-----IN OPDClinicalEvaluationDaoImpl fetchClinicalEvalTempDataByTreatmentId --> ");

		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");

		List<OPDClinicalEvaluationDto> list = new ArrayList<OPDClinicalEvaluationDto>();

		try {

			TreatmentDto treatmentDto = (TreatmentDto) sessionFactory.openSession().get(TreatmentDto.class,
					treatmentId);

			Criteria criteria = sessionFactory.openSession().createCriteria(OPDClinicalEvaluationDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("treatmentDto", treatmentDto));
			list = criteria.list();

		} catch (Exception e) {
			logger.error("fetchClinicalEvalTempDataByTreatmentId Exception--> ", e);
		}

//		return list.get(0);

		if (list != null && list.size() != 0) {
			return list.get(0);
		} else {
			return null;
		}
	}

}

package com.hms.ivf.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.ivf.dao.IvfSxDao;
import com.hms.ivf.dto.IVFCareAdviceDTO;
import com.hms.ivf.dto.IVFSxAdvicedDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;

@Repository
public class IvfSxDaoImpl implements IvfSxDao{
	@Autowired
	SessionFactory sf;

	@Override
	public int saveIVFSxAdvice(IVFSxAdvicedDTO obj) {
		
		try {
			if(obj.getSxAdviceMasterId()==0) {
				sf.getCurrentSession().merge(obj);
				return 1;
			}else {
				sf.getCurrentSession().merge(obj);
				return 2;
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<IVFSxAdvicedDTO> getIVFSxAdviceListByTreatmentId(Integer treatmentId, Integer unitId) {
		List<IVFSxAdvicedDTO> list=new ArrayList<IVFSxAdvicedDTO>();
		IVFTreatmentDTO tobj=(IVFTreatmentDTO) sf.openSession().get(IVFTreatmentDTO.class, treatmentId);
		try {
			Criteria c=  sf.openSession().createCriteria(IVFSxAdvicedDTO.class);
			c.add(Restrictions.eq("ivfTreatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			c.add(Restrictions.eq("unitId",unitId));
			list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public IVFSxAdvicedDTO editIVFSxAdvice(Integer id) {
		IVFSxAdvicedDTO obj=new IVFSxAdvicedDTO();
		try {
			
			obj=(IVFSxAdvicedDTO) sf.openSession().get(IVFSxAdvicedDTO.class, id);
			
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int deleteIVFSxAdvice(Integer id, Integer userId) {
		try {
			
			String sql="UPDATE  IVFSxAdvicedDTO SET deleted='Y',deletedBy="+userId+",deletedDateTime=now() where sxAdviceMasterId =:sxAdviceMasterId ";
			
			Query q=sf.getCurrentSession().createQuery(sql);
			q.setParameter("sxAdviceMasterId", id);
			q.executeUpdate();
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int saveIVFCareAdvice(IVFCareAdviceDTO obj) {
		try {
			if(obj.getCareAdviceMasterId()==0) {
				sf.getCurrentSession().merge(obj);
				return 1;
			}else {
				sf.getCurrentSession().merge(obj);
				return 2;
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public IVFCareAdviceDTO editOPDCareAdvice(Integer id) {
		IVFCareAdviceDTO obj=new IVFCareAdviceDTO();
		IVFTreatmentDTO tobj=(IVFTreatmentDTO) sf.openSession().get(IVFTreatmentDTO.class, id);
		try {
			Criteria c=  sf.openSession().createCriteria(IVFCareAdviceDTO.class);
			c.add(Restrictions.eq("ivfTreatObj", tobj));
			obj=(IVFCareAdviceDTO) c.uniqueResult();
			
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

}

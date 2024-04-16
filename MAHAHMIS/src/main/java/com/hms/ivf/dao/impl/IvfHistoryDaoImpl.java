package com.hms.ivf.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IvfHistoryDao;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.dto.IvfHistorySlaveDto;
import com.hms.ivf.dto.IvfHistoryTempMasterDto;

@Repository
public class IvfHistoryDaoImpl implements IvfHistoryDao {

	@Autowired
	SessionFactory sf;
	
	@Override
	public int saveIVFHistory(IvfHistoryTempMasterDto obj) {
		try {
			 if(obj.getHistoryId()==0) {
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
	public IvfHistoryTempMasterDto getIVFHistory(Integer ivftreatmentId) {
		IvfHistoryTempMasterDto obj=new IvfHistoryTempMasterDto();
		IVFTreatmentDTO tobj=(IVFTreatmentDTO) sf.openSession().get(IVFTreatmentDTO.class, ivftreatmentId);
		List<IvfHistorySlaveDto> list =new ArrayList<IvfHistorySlaveDto>();
		
		try {
			Criteria c=  sf.openSession().createCriteria(IvfHistoryTempMasterDto.class);
			c.add(Restrictions.eq("ivfTreatObj", tobj));
			obj=(IvfHistoryTempMasterDto) c.uniqueResult();
			
			if(obj !=null) {
				list=	obj.getGetListOfHistorySlaveDTO();
				 List<IvfHistorySlaveDto> newlist= list.stream().filter(x->x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
				obj.setGetListOfHistorySlaveDTO(newlist);
			}
		
		
		
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

}

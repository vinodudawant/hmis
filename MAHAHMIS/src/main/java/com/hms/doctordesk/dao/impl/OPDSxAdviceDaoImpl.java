package com.hms.doctordesk.dao.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.OPDSxAdviceDao;
import com.hms.doctordesk.dto.OPDCareAdviceDTO;
import com.hms.doctordesk.dto.OPDChemoTheropyDTO;
import com.hms.doctordesk.dto.OPDDietMasterDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.doctordesk.dto.OPDPlanOfTreatmentDTO;
import com.hms.doctordesk.dto.OPDRadioTheorapyMaster;
import com.hms.doctordesk.dto.OPDRadioTheropyCheckBox;
import com.hms.doctordesk.dto.OPDRadioTheropySlave;
import com.hms.doctordesk.dto.OPDSxAdvicedDTO;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ot.dto.Operation;

@Repository
public class OPDSxAdviceDaoImpl implements OPDSxAdviceDao {

	@Autowired
	SessionFactory sf;
	@Override
	public int saveOPDSxAdvice(OPDSxAdvicedDTO obj) {
		
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
	public List<OPDSxAdvicedDTO> getOPDSxAdviceListByTreatmentId(Integer treatmentId, Integer unitId) {
		List<OPDSxAdvicedDTO> list=new ArrayList<OPDSxAdvicedDTO>();
		TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
		try {
			Criteria c=  sf.openSession().createCriteria(OPDSxAdvicedDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			c.add(Restrictions.eq("unitId",unitId));
			list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public OPDSxAdvicedDTO editOPDSxAdvice(Integer id) {
		OPDSxAdvicedDTO obj=new OPDSxAdvicedDTO();
		try {
			
			obj=(OPDSxAdvicedDTO) sf.openSession().get(OPDSxAdvicedDTO.class, id);
			
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int deleteOPDSxAdvice(Integer id,Integer userId) {
		try {
			
			String sql="UPDATE  OPDSxAdvicedDTO SET deleted='Y',deletedBy="+userId+",deletedDateTime=now() where sxAdviceMasterId =:sxAdviceMasterId ";
			
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
	public int saveOPDRadioTheropy(OPDRadioTheorapyMaster obj) {
		try {
			if(obj.getRadioTheropyMasterId()==0) {
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
	public List<OPDRadioTheorapyMaster> getOPDRadioTheropyListByTreatmentId(Integer treatmentId, Integer unitId) {
		List<OPDRadioTheorapyMaster> list=new ArrayList<OPDRadioTheorapyMaster>();
		TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
		try {
			Criteria c=  sf.openSession().createCriteria(OPDRadioTheorapyMaster.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			c.add(Restrictions.eq("unitId",unitId));
			list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public OPDRadioTheorapyMaster editOPDRadioTheropy(Integer id) {
		
		OPDRadioTheorapyMaster obj=new OPDRadioTheorapyMaster();
		List<OPDRadioTheropySlave> list =new ArrayList<OPDRadioTheropySlave>();
		try {
			
			obj=(OPDRadioTheorapyMaster) sf.openSession().get(OPDRadioTheorapyMaster.class, id);
			if(obj !=null) {
				list=	obj.getGetListOfTheropySlaveDTO();
				 List<OPDRadioTheropySlave> newlist= list.stream().filter(x->x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
				obj.setGetListOfTheropySlaveDTO(newlist);
			}
			
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int deleteOPDRadioTheropy(Integer id, Integer userId) {
try {
			
			String sql="UPDATE  OPDRadioTheorapyMaster SET deleted='Y',deletedBy="+userId+",deletedDateTime=now() where radioTheropyMasterId =:radioTheropyMasterId ";
			
			Query q=sf.getCurrentSession().createQuery(sql);
			q.setParameter("radioTheropyMasterId", id);
			q.executeUpdate();
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int saveOPDCareAdvice(OPDCareAdviceDTO obj) {
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
	public OPDCareAdviceDTO editOPDCareAdvice(Integer id) {
		OPDCareAdviceDTO obj=new OPDCareAdviceDTO();
		TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, id);
		try {
			Criteria c=  sf.openSession().createCriteria(OPDCareAdviceDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			obj=(OPDCareAdviceDTO) c.uniqueResult();
			
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public List<OPDRadioTheropyCheckBox> getRadioTheropyCheckBoxList(String prefixCode) {
		
		List<OPDRadioTheropyCheckBox> list=new ArrayList<>();
		try {
			Query q=	sf.getCurrentSession().createSQLQuery("CALL sp_get_dropdown_list_by_prefix_name(:prefixCode)");
			q.setParameter("prefixCode", prefixCode);
			
			List<Object []> queryResult= q.list();
			System.err.println("queryResult....."+queryResult);
			for(Object [] row:queryResult) {
				OPDRadioTheropyCheckBox obj=new OPDRadioTheropyCheckBox();
				Integer id=(Integer) row[0];
				String name=(String) row[1];
				obj.setId(id);
				obj.setName(name);
				list.add(obj);
				
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list ;
	}

	@Override
	public int delteRadioTheropySlave(Integer id, Integer userId) {
		try {
		
		String sql="UPDATE  OPDRadioTheropySlave SET deleted='Y',deletedBy="+userId+",deletedDateTime=now() where radioTheropySlaveId =:radioTheropySlaveId ";
		
		Query q=sf.getCurrentSession().createQuery(sql);
		q.setParameter("radioTheropySlaveId", id);
		q.executeUpdate();
		return 1;
	}catch (Exception e) {
		e.printStackTrace();
	}
	return 0;
	}

	@Override
	public int saveOPDPlanOfTreatment(OPDPlanOfTreatmentDTO obj) {
		try {
			
			sf.openSession().merge(obj);
			//return 1;
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<OPDPlanOfTreatmentDTO> getOPDPlanOfTreatmentListByTreatmentId(Integer treatmentId, Integer unitId) {
		List<OPDPlanOfTreatmentDTO> list=new ArrayList<OPDPlanOfTreatmentDTO>();
		TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
		try {
			Criteria c=  sf.openSession().createCriteria(OPDPlanOfTreatmentDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			c.add(Restrictions.eq("unitId",unitId));
			list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public int deltePlanOfTreatment(Integer id, Integer userId) {
		try {
			
			String sql="UPDATE  OPDPlanOfTreatmentDTO SET deleted='Y',deletedBy="+userId+",deletedDateTime=now() where planOfTreatMasterId =:planOfTreatMasterId ";
			
			Query q=sf.getCurrentSession().createQuery(sql);
			q.setParameter("planOfTreatMasterId", id);
			q.executeUpdate();
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	
	}

	@Override
	public int saveOPDChemoTheropy(OPDChemoTheropyDTO obj) {
		System.err.println("obj....."+obj);
		try {
			if(obj.getChemoTheropyMasterId()==0) {
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
	public List<OPDChemoTheropyDTO> getOPDChemoListByTreatmentId(Integer treatmentId, Integer unitId) {
		List<OPDChemoTheropyDTO> list=new ArrayList<OPDChemoTheropyDTO>();
		TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
		try {
			Criteria c=  sf.openSession().createCriteria(OPDChemoTheropyDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			c.add(Restrictions.eq("unitId",unitId));
			list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	

	@Override
	public OPDChemoTheropyDTO editOPDChemoByTreatmentIdAndDate(Integer treatmentId, String userDate) {
		
		OPDChemoTheropyDTO obj1=new OPDChemoTheropyDTO();
		try {
			TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
		
			Criteria c=sf.openSession().createCriteria(OPDChemoTheropyDTO.class);
			c.add(Restrictions.eq("nextChemoDate", userDate));
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
		
			obj1=(OPDChemoTheropyDTO) c.uniqueResult();
			
			/*
			 * Session s = sf.openSession();
			 * 
			 * Query q =
			 * s.createSQLQuery("call sp_get_opd_chemotherapy_info(:treatmentId,:userDate)"
			 * );
			 * 
			 * q.setParameter("treatmentId", treatmentId); q.setParameter("userDate",
			 * userDate); q.setResultTransformer(new
			 * AliasToBeanResultTransformer(OPDChemoTheropyDTO.class)); obj1=
			 * (OPDChemoTheropyDTO) q.uniqueResult();
			 */
		
		
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj1;
	}

	@Override
	public Operation getOpreationName(Integer procedureType, Integer procedureGroup) {
		List<Operation> list=new ArrayList<>();
		Operation obj=new Operation();
		   try {
			   Criteria c=    sf.getCurrentSession().createCriteria(Operation.class);
			   c.add(Restrictions.eq("opType", procedureType));
			   c.add(Restrictions.eq("opstate", Integer.toString(procedureGroup)));
			   
			   list= c.list();
			   
		   }catch (Exception e) {
			
		}
		   obj.setOperationList(list);
		return obj;
	}

	
	@Override
	public OPDChemoTheropyDTO getOPDChemoByTreatmentIdForPrint(Integer treatmentId) {
		
		OPDChemoTheropyDTO obj1=new OPDChemoTheropyDTO();
		try {
			TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
		
			Criteria c=sf.openSession().createCriteria(OPDChemoTheropyDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
		
			obj1=(OPDChemoTheropyDTO) c.uniqueResult();
						
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj1;
	}

	@Override
	public List<OPDRadioTheropyCheckBox> getCheckListOPDPlanOfTreatmentListByTreatmentId(Integer treatmentId,
			Integer unitId) {
		// TODO Auto-generated method stub

		List<OPDRadioTheropyCheckBox> list=new ArrayList<>();
		try {			
			String sql =" SELECT d.mcd_prefix_detail_id , d.mcd_prefix_sub_option FROM opd_plan_of_treatment_info o , mit_comparam_det d " + 
					" WHERE  deleted='N' and treatment_id = '" +treatmentId  +"' and  o.unit_id = '"+ unitId 
					+ "' and o.radio_value = d.mcd_prefix_detail_id  ";
			Query q=	sf.getCurrentSession().createSQLQuery(sql);
			
			List<Object []> queryResult= q.list();
			
			for(Object [] row:queryResult) {
				OPDRadioTheropyCheckBox obj=new OPDRadioTheropyCheckBox();
				Integer id=(Integer) row[0];
				String name=(String) row[1];
				obj.setId(id);
				obj.setName(name);
				list.add(obj);
				
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list ;
	
	}
}

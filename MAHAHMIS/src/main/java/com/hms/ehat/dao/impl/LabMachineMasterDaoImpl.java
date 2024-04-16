package com.hms.ehat.dao.impl;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.ehat.dao.LabMachineMasterDao;
import com.hms.pathology.dto.LabMachineMasterDto;
import com.hms.pathology.dto.LabTestNormalValuesDTO;
import com.hms.pathology.dto.OutLabMasterDto;



@SuppressWarnings("unchecked")
@Repository
public class LabMachineMasterDaoImpl implements LabMachineMasterDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public String saveMachineName(LabMachineMasterDto dto,
			HttpServletRequest request) {
		
		try {			
			if(dto.getMachineId() == 0) {
				sessionFactory.getCurrentSession().merge(dto);
				return "Machine added.";
			} else {				
				if(dto.getMachineId() >0){					
					sessionFactory.getCurrentSession().merge(dto);
				}
				return "Machine Name updated.";
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public LabMachineMasterDto getallMachines(String searchText,String type,Integer headingId) {
		Session session = null;
		LabMachineMasterDto dto = new LabMachineMasterDto();
		try {
				session = sessionFactory.getCurrentSession();
	
				if(type.equalsIgnoreCase("onload")){
					Criteria criteria = session.createCriteria(LabMachineMasterDto.class);
							 criteria.add(Restrictions.eq("machineStatus", "N"));
							 if(headingId>0)
							 {
								 criteria.add(Restrictions.eq("departmentId", headingId));	
							 }	 							
							 criteria.addOrder(Order.desc("machineId"));
							 criteria.setMaxResults(20);
					         dto.setMachineNameList(criteria.list());
				}else{
					Criteria criteria = session.createCriteria(LabMachineMasterDto.class);
							 criteria.add(Restrictions.eq("machineStatus", "N"));
							 criteria.add(Restrictions.ilike("machineName", searchText, MatchMode.ANYWHERE));
			 		         dto.setMachineNameList(criteria.list());
				}
			}catch(Exception e){
				e.printStackTrace();
			}
		return dto;
	}

	@Override
	public LabMachineMasterDto editMachineName(int machineId) {
		Session session = null;
		LabMachineMasterDto dto = new LabMachineMasterDto();
		try {/*
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("Select machineName FROM LabMachineMasterDto WHERE machineId =:machineId");
				  query.setParameter("machineId", machineId);
			String name = (String) query.uniqueResult();
			
			LabMachineMasterDto dto = new LabMachineMasterDto();
						 dto.setMachineName(name);
						 dto.setMachineId(machineId);
			return dto;
		*/
			Integer mId=machineId;
			session = sessionFactory.getCurrentSession();
				Criteria criteria = session.createCriteria(LabMachineMasterDto.class);
				criteria.add(Restrictions.eq("machineId", mId));
				criteria.add(Restrictions.eq("machineStatus", "N"));
				criteria.addOrder(Order.desc("machineId"));
				dto.setMachineNameList(criteria.list());
				return dto;
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;	
	}

	@Override
	public boolean deleteMachine(int machineId, int userId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update LabMachineMasterDto set deletedBy = :deletedBy, machineStatus = :machineStatus, deletedDate = :deletedDate where machineId = :machineId");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("machineStatus", "Y");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("machineId", machineId);
				  query.executeUpdate();
				  
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;	
	}

	@Override
	public LabMachineMasterDto getallMachineList() {
		Session session = null;
		LabMachineMasterDto dto = new LabMachineMasterDto();
		try {
				session = sessionFactory.getCurrentSession();
					Criteria criteria = session.createCriteria(LabMachineMasterDto.class);
					criteria.add(Restrictions.eq("machineStatus", "N"));
					criteria.addOrder(Order.desc("machineId"));
					dto.setMachineNameList(criteria.list());
				
			}catch(Exception e){
				e.printStackTrace();
				return null;
			}
		return dto;
	}

	@Override
	public List<LabMachineMasterDto> getMachineNameWithTestId(int testId) {
		
		List<LabMachineMasterDto> machineList = new ArrayList<LabMachineMasterDto>();
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();			
			Query sql = session.createSQLQuery("SELECT m.id,m.machine_name,n.machine_flag,ifnull(n.clinicalwith_normal,'-') as clinicalwith_normal ,ifnull(n.commentswith_normal,'-') as commentswith_normal,ifnull(n.increasedidwith_normal,'-') as increasedidwith_normal,ifnull(n.interpretationwith_normal,'-') as interpretationwith_normal ,ifnull(n.biologicalReferenceWith_normal,'-') as biologicalReferenceWith_normal ,ifnull(n.kitSpec_id,'-') as kitSpec_id,ifnull(n.noteIdwith_normal,'-') as noteIdwith_normal,n.testMethodwith_normal FROM pathology_machine_master m INNER JOIN  pathology_labtestnormalvalue n ON n.machine_Id = m.id WHERE n.matser_id =:matserid and n.deleted='N'   GROUP BY n.machine_Id ");
			sql.setParameter("matserid", testId);
			//sql.setParameter("deleted", 'N');
			//System.out.println(sql+"sql");
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = sql.list();
			for (Map<String, Object> row : list) {
				LabMachineMasterDto obj = new LabMachineMasterDto();
				obj.setMachineId((Integer) row.get("id"));
				obj.setMachineName((String) row.get("machine_name"));
				obj.setMachineFlag((String) row.get("machine_flag"));
				
				obj.setClinicalIdWithNormal((String) row.get("clinicalwith_normal"));
				obj.setCommentsWithNormal((String) row.get("commentswith_normal"));
				obj.setIncreasedIdWithNormal((String) row.get("increasedidwith_normal"));
				obj.setInterpretationWithNormal((String) row.get("interpretationwith_normal"));			
				obj.setKitSpecId((String) row.get("kitSpec_id"));		
				obj.setNoteIdwithNormal((String) row.get("noteIdwith_normal"));
				obj.setTestMethodIdWithNormal((Integer) row.get("testMethodwith_normal"));	
				obj.setBiologicalReferenceWithNormal((String) row.get("biologicalReferenceWith_normal"));	
				machineList.add(obj);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return  machineList;
	}

	@Override
	public List<LabTestNormalValuesDTO> getNormalValueRangeWithMachineId(int mId,int idLabTest) {
		
		

		
		List<LabTestNormalValuesDTO> normalMachineList = new ArrayList<LabTestNormalValuesDTO>();
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();			
			Query sql = session.createSQLQuery("SELECT * FROM pathology_labtestnormalvalue n WHERE n.machine_Id =:machineId AND n.matser_id =:testId and deleted='N' ");
			sql.setParameter("machineId", mId);
			sql.setParameter("testId", idLabTest);		
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = sql.list();
			for (Map<String, Object> row : list) {
				
				LabTestNormalValuesDTO obj = new LabTestNormalValuesDTO();
				
				obj.setIdTestNormalValue((Integer) row.get("idtestNormalValue"));
				obj.setAgeIn((String) row.get("age_in"));
				obj.setCh((String) row.get("lab_ch"));
				
				obj.setCl((String) row.get("lab_cl"));
				obj.setCreateDate((Date) row.get("created_date"));
				obj.setDefaultValue((String) row.get("default_value"));
				
				obj.setDeletedBy((Integer) row.get("deleted_by"));
				obj.setFemale((String) row.get("lab_female"));
				obj.setFlag((String) row.get("flag"));
								
				obj.setFromAge((BigDecimal) row.get("lab_fage"));
				obj.setLowerValue((String) row.get("lowerVal"));
				obj.setMale((String) row.get("lab_male"));
								
				obj.setNonExistHigh((String) row.get("non_exist_high"));
				obj.setNonExistLow((String) row.get("non_exist_low"));
				obj.setOthers((String) row.get("lab_others"));
				
				obj.setSex((String) row.get("sexType"));
				obj.setStatus((String) row.get("nvStatus"));
				obj.setToAge((BigDecimal) row.get("lab_toage"));
				
				obj.setUpdatedDate((Date) row.get("updated_date"));
				obj.setUpperValue((String) row.get("upperVal"));
				obj.setIdspecialcase((Integer) row.get("id_specialcase"));
				
				obj.setUnitId((Integer) row.get("idUnitType"));
				obj.setTestId((Integer) row.get("matser_id"));
				obj.setExpression((String) row.get("expression"));
				
				obj.setMahinevalueId((Integer) row.get("machine_Id"));
				obj.setMachineFlag((String) row.get("machine_flag"));
				obj.setDeleted((String) row.get("deleted"));
				obj.setTestMethodIdWithNormal((Integer) row.get("testMethodwith_normal"));	
				normalMachineList.add(obj);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return  normalMachineList;

	}

	@Override
	public boolean deleteMachinewiseNormalValue(int machineId, int idLabTest,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		try {
				
			Query query = sessionFactory.getCurrentSession().createSQLQuery("update pathology_labtestnormalvalue set deleted ='Y',machine_flag='N',deleted_by='"+userId+"' where matser_id ="+idLabTest+" and machine_Id="+machineId);			    
			      query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


}

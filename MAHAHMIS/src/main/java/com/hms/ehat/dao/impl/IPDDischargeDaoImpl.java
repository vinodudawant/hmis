package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.ehat.dao.IPDDischargeDao;
import com.hms.ehat.dao.RegDao;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ipd.dto.DischargePlanDTO;
import com.hms.ipd.dto.DischargeProcessDTO;
import com.hms.ipd.dto.IpdPatientDischargeSummaryDTO;
import com.hms.ot.dto.PtientOperation;
import com.hms.ot.dto.TreatmentOperations;

@Repository
@SuppressWarnings("unchecked")
public class IPDDischargeDaoImpl implements IPDDischargeDao
{
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	RegDao regDao;  
	
	@Override
	public int saveIPDDischargePlan(DischargePlanDTO objDto,HttpServletRequest request) {
		int Result = 0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			int id =objDto.getIdplan();
                if(id==0){
                	objDto.setAddedBy(UserId);
                	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().save(objDto);
                    Result=1;
                }else{
                	objDto.setUpdatedBy(UserId);
                	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().merge(objDto);
                    Result=2;
                }
			
		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
		
	return Result;
	
}

	
	
	@Override
	public List<DischargePlanDTO> fetchDischargePlan(int treatmentId) {
		
		
		List<DischargePlanDTO> listInitial = new ArrayList<DischargePlanDTO>();
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(DischargePlanDTO.class);
					criteria.add(Restrictions.eq("tId", treatmentId));
					listInitial = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listInitial;
	}

	
	@Override
	public int saveIPDDischargeProcess(DischargeProcessDTO objDto, HttpServletRequest request) {
		int Result = 0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			int id =objDto.getIdProcess();
                if(id==0){
                	objDto.setAddedBy(UserId);
                	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().save(objDto);
                    Result=1;
                }else{
                	objDto.setUpdatedBy(UserId);
                	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().merge(objDto);
                    Result=2;
                }
			
		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
		
	return Result;
	
}
	
	@Override
	public List<DischargeProcessDTO> fetchDischargeProcess(int treatmentId) {
		
		
		List<DischargeProcessDTO> listInitial = new ArrayList<DischargeProcessDTO>();
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(DischargeProcessDTO.class);
					criteria.add(Restrictions.eq("tId", treatmentId));
					listInitial = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listInitial;
	}

	
	@Override
	public CustomizeTemplate getTemplateListByDepartmentId(Integer departmentid,String selectTemplateType) {
		CustomizeTemplate obj=new CustomizeTemplate();
		List<CustomizeTemplate> list=new ArrayList<>();
		try {
			Criteria c=   sessionFactory.getCurrentSession().createCriteria(CustomizeTemplate.class);
			// c.add(Restrictions.eq("departmentId", departmentid));
			c.add(Restrictions.or(
				    Restrictions.eq("departmentId", departmentid),
				    Restrictions.eq("departmentId", 4)
				));
           c.add(Restrictions.eq("selectTemplateType", selectTemplateType));
			list=c.list();
			obj.setCustomizeTemplateList(list);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	
	@Override
	public CustomizeTemplate getTemplateListByTemplateId(Integer id) {
		CustomizeTemplate c=	(CustomizeTemplate) sessionFactory.getCurrentSession().get(CustomizeTemplate.class,id);
		return c;
	}
	
	@Override
	public Integer saveUpdateIPDDischargeSummaryTemplate(IpdPatientDischargeSummaryDTO objTemplate, String queryType) {

		Integer    isInserted = 0;
		String[] dischargeDate = null;
		dischargeDate = objTemplate.getDischargeDate().split(" ");
		String sql = "select count(*) from discharge_summery where Treatment_ID = "
				+  objTemplate.getTreatmentId();
		int countdis = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();
		
		/*
		 * if(countdis!=0) { return 4; }
		 */
		
		if (objTemplate.getIdCustomizeTemplate() == 0) {
			/***************************** update treatment table ******************************/
			dischargeDate = objTemplate.getDischargeDate().split(" ");
			sql = "UPDATE ehat_treatment SET Treat_end_date='"+dischargeDate[0]+"',patient_outtime='"+dischargeDate[1]+"' WHERE Treatment_ID="+objTemplate.getTreatmentId();
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.executeUpdate();
			
			
			sql = "Select count(*) from ipd_patient_discharge_summary where patientId = "
					+ objTemplate.getPatientId()
					+ " and treatmentId = "
					+ objTemplate.getTreatmentId();
			
			int count = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();

			if (count == 0) {
				sql = "INSERT INTO ipd_patient_discharge_summary(treatmentId, patientId, "
						+ "idCustomizeTemplate, temp_name, temp_data, temp_type, date, status,discharge_date,discharge_time,discharge_type) "
						+ " VALUES ("+objTemplate.getTreatmentId()+","+objTemplate.getPatientId()+",'"+objTemplate.getIdCustomizeTemplate()
						+ "','"+objTemplate.getTempName()+"','"+objTemplate.getTempData()+"','"+objTemplate.getTempType()+"',"
					    + "'"+objTemplate.getDate()+"','Y','"+dischargeDate[0]+"','"+dischargeDate[1]+"','"+objTemplate.getDischargeType()+"')";
				try {
				query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
					
					if(countdis == 0){
						sql = "insert into discharge_summery(Treatment_ID,discharge_date,discharge_time,discharge_type)"
								+ " values("+objTemplate.getTreatmentId()+",'"+dischargeDate[0]+"','"+dischargeDate[1]+"','"+objTemplate.getDischargeType()+"')";
						
						query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
						query.executeUpdate();
					}else{

						 sql = "select iddischarge_summery from discharge_summery where Treatment_ID = "
								+ objTemplate.getTreatmentId();
						
						Integer idautodis = (Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();

						
						sql = "update discharge_summery set discharge_date='"+dischargeDate[0]+"',discharge_time='"+dischargeDate[1]+"',discharge_type='"+objTemplate.getDischargeType()+"'  "
								+ " WHERE Treatment_ID="+objTemplate.getTreatmentId()+" and iddischarge_summery="+idautodis;
						query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
						query.executeUpdate();
					
					}
					isInserted = 1;
				} catch (Exception e) {
					
					e.printStackTrace();
					System.out.println("database error...could not insert: "
							+ e.getMessage());
					isInserted = 0;
				}
			} else {
				isInserted = 3;
			}

		} else {

			sql = "Update ipd_patient_discharge_summary set idCustomizeTemplate='"+ objTemplate.getIdCustomizeTemplate()+"', temp_data='"+ objTemplate.getTempData()+"', date='"+objTemplate.getDate()+"',discharge_date='"+dischargeDate[0]+"',discharge_time='"+dischargeDate[1]+"',discharge_type='"+objTemplate.getDischargeType()+"' where idipd_patient_discharge_summary='"+objTemplate.getIdipdPatientDischargeSummary()+"' and treatmentId = '"+objTemplate.getTreatmentId()+"' and patientId='"+objTemplate.getPatientId()+"' ";
			try {
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
				if(countdis > 0){
					 sql = "select iddischarge_summery from discharge_summery where Treatment_ID = "
					+ objTemplate.getTreatmentId();
					 Integer idautodis = (Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
					
					sql = "update discharge_summery set discharge_date='"+dischargeDate[0]+"',discharge_time='"+dischargeDate[1]+"',discharge_type='"+objTemplate.getDischargeType()+"'  "
							+ " WHERE Treatment_ID='"+objTemplate.getTreatmentId()+"' and iddischarge_summery='"+idautodis+"' ";
				 
					
					query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
				}else{

					sql = "insert into discharge_summery(Treatment_ID,discharge_date,discharge_time,discharge_type)"
							+ " values("+objTemplate.getTreatmentId()+",'"+dischargeDate[0]+"','"+dischargeDate[1]+"','"+objTemplate.getDischargeType()+"')";
			
					query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
				}	
				isInserted = 2;
			} catch (Exception e) {
				e.printStackTrace();
				isInserted = 0;
			}
		}
		
		return isInserted;
	
	}
	
	
	@Override
	public IpdPatientDischargeSummaryDTO fetchIPDDischargeSummaryTemplate(int treatmentId , int pid) {
		/*
		 * 
		 * List<CustomizeTemplate> CustomizeTemplateList = new
		 * ArrayList<CustomizeTemplate>(); try {
		 * 
		 * String sql =
		 * "SELECT * FROM ipd_patient_discharge_summary WHERE patientId="+objTemplate.
		 * getPatientId()+" and treatmentId="+objTemplate.getTreatmentId()
		 * +" and status = 'Y'";
		 * 
		 * SQLQuery query = (SQLQuery)
		 * sessionFactory.getCurrentSession().createSQLQuery(sql);
		 * query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); List<Map<String,
		 * Object>> dsList = query.list();
		 * 
		 * for (Map mapDS : dsList) { System.out.println(dsList); CustomizeTemplate
		 * tempObj = new CustomizeTemplate(); tempObj.setIdCustomizeTemplate((Integer)
		 * mapDS .get("idipd_patient_discharge_summary"));
		 * tempObj.setTreatmentId(((Integer) mapDS.get("treatmentId")) .toString());
		 * tempObj.setPatientId(((Integer) mapDS.get("patientId")) .toString());
		 * tempObj.setSpecializaion(((Integer) mapDS
		 * .get("idCustomizeTemplate")).toString()); tempObj.setTemp_name((String)
		 * mapDS.get("temp_name")); tempObj.setTemp_data((String)
		 * mapDS.get("temp_data")); tempObj.setType((String) mapDS.get("temp_type"));
		 * tempObj.setDate((String) mapDS.get("date"));
		 * 
		 * String date = (String) mapDS.get("discharge_date"); String time = (String)
		 * mapDS.get("discharge_time"); String both = (date + "_" + time);
		 * tempObj.setDischarge_date(both); tempObj.setDischarge_type((String)
		 * mapDS.get("discharge_type"));
		 * 
		 * CustomizeTemplateList.add(tempObj); } } catch (Exception e) {
		 * e.printStackTrace(); e.getMessage(); } return CustomizeTemplateList;
		 * 
		 */
		IpdPatientDischargeSummaryDTO DisSum = new IpdPatientDischargeSummaryDTO();
		try
		{
			Criteria c = sessionFactory.getCurrentSession().createCriteria(IpdPatientDischargeSummaryDTO.class);
			c.add(Restrictions.eq("treatmentId", treatmentId));
			c.add(Restrictions.eq("patientId", pid));
			DisSum = (IpdPatientDischargeSummaryDTO) c.uniqueResult();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return DisSum;
		
	}


	@Override
	public List<TreatmentOperations> fetchOperationsData(int treatmentId, int patientId) {
		
	List<TreatmentOperations> idList = new ArrayList<TreatmentOperations>();
    List<Map<String, Object>> Details = null;
    List<Map<String, Object>> idDetails = null;
    String sql = "";
    String sql1 = "";
    int ID=0;
    String operationsId = "";
               try {
                       sql = "select ID from treatment_operations where opStatus = 'Y' and Patient_ID="+patientId+" AND Treatment_ID="+treatmentId;
                   //    Details = getJdbcTemplate().queryForList(sql);
                       SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
                       query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
                       List<Map<String, Object>> dsList1 = query.list();
                       for (Map rs : dsList1) // Iterate fetched list & set values in
                       {
                           ID = (Integer) rs.get("ID");
                           
                          sql = "select treatmentOperationsManageID from treatmentoperationsmanage where operation_status = 'Y' and treatmentOperationsID="+ID;
                      //     int treatmentOperationsManageID = getJdbcTemplate().queryForInt(sql);
                          query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
                          query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
                          List<Map<String, Object>> dsList = query.list();
                          for (Map rs0 : dsList) // Iterate fetched list & set values in
                          {
                        	  ID = (Integer) rs0.get("treatmentOperationsManageID");
                          }
                           System.err.println("treatmentOperationsManageID>>"+ID);
                           
//                           fetched list & set values in
                           Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(PtientOperation.class);
                           createCriteria.add(Restrictions.eq("treatmentOperationsManage",ID));
                           createCriteria.add(Restrictions.eq("status","Y"));
                           List<PtientOperation> list = createCriteria.list();
                           for (PtientOperation p : list) {
							
                        	   TreatmentOperations objOPId = new TreatmentOperations();
                               objOPId.setOperName(p.getOperationName());
                               objOPId.setTreatmentOperationsManageID(p.getTreatmentOperationsManage());
                               idList.add(objOPId);
                           	}
                           
							/*
							 * sql1="select operation_name,treatmentOperationsManageID from patient_operation where status = 'Y' and treatmentOperationsManageID = "
							 * +ID; query = (SQLQuery)
							 * sessionFactory.getCurrentSession().createSQLQuery(sql);
							 * query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); List<Map<String,
							 * Object>> idDetails1 = query.list(); for (Map rs1 : idDetails1) // Iterate
							 * fetched list & set values in { TreatmentOperations objOPId = new
							 * TreatmentOperations(); objOPId.setOperName((String)
							 * rs1.get("operation_name")); objOPId.setTreatmentOperationsManageID((Integer)
							 * rs1.get("treatmentOperationsManageID")); idList.add(objOPId);
							 * 
							 * }
							 */
                       }
                   
              } catch (Exception e) {
                   e.printStackTrace();
               } 
               return idList;
}

	//Added By Badrinath Wagh
    //For fetching details on ipd dashboard for physical discharge

	@Override
	public List<DischargePlanDTO> fetchPhyDisDetailsbyTreatmentId(Integer treatId,Integer patientId) {
		// TODO Auto-generated method stub
		
		List<DischargePlanDTO> list = new ArrayList<DischargePlanDTO>();
		
		try {			
			
			//featch patient name
			List<RegTreBillDto> fetchPatientsRecordByTreatmentId = regDao.fetchPatientsRecordByTreatmentId(treatId);
			
			
			Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(DischargePlanDTO.class);
			createCriteria.add(Restrictions.eq("tId", treatId));
			//createCriteria.add(Restrictions.eq("tId", treatId));
			List<DischargePlanDTO> list2 = createCriteria.list();
			DischargePlanDTO dischargePlanDTO = list2.get(0);
			dischargePlanDTO.setPatientName(fetchPatientsRecordByTreatmentId.get(0).getPatientName());
			list.add(dischargePlanDTO);
			/*
			 * String sql = "SELECT * FROM DischargePlanDTO WHERE treatment_id = "+treatId;
			 * SQLQuery sqlresult = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * 
			 * sqlresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * List<Map<String, Object>> list1 = sqlresult.list(); for (Map<String, Object>
			 * rs : list1) {
			 * 
			 * DischargePlanDTO obj = new DischargePlanDTO();
			 * 
			 * obj.setDateAdmission((String) rs.get("dateAdmission"));
			 * obj.setDateExpectedDischarge((String) rs.get("dateExpectedDischarge"));
			 * obj.setDateSet((String) rs.get("dateSet")); obj.setIsInformed((String)
			 * rs.get("isInformed")); obj.setTransportArranged((String)
			 * rs.get("transportArranged")); obj.setTransOwnArrvTime((String)
			 * rs.get("transOwnArrvTime"));
			 * 
			 * 
			 * 
			 * list.add(obj);
			 * 
			 * }
			 */
			
			System.out.println("*****Discharge patient.list.......... "+list.size());
			
		} catch(Exception e) {
			
			e.printStackTrace();
		}
		
		return list;
	}


}

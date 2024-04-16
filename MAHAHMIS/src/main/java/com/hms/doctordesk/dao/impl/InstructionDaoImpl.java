package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.apache.commons.collections.map.HashedMap;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.InstructionDao;
import com.hms.doctordesk.dto.GroupTemplateMaster;
import com.hms.doctordesk.dto.IndividualTreatmentInstructionDto;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDReportInstructionDTO;
import com.hms.doctordesk.dto.TreatmentInstruction;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DrugMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.pojo.TaxMaster;

@Repository
@Transactional
public class InstructionDaoImpl implements InstructionDao {

	@Autowired
	SessionFactory sessionFactory;

	private static final org.slf4j.Logger logger = LoggerFactory.getLogger(InstructionDaoImpl.class);

	@Override
	public boolean saveIndividualTreatmentInstruction(String treatmentId,
			String[] individualTreatmentInstructionCheckboxIDArray) {
		try {
			Query query = sessionFactory.getCurrentSession().createQuery(
					"select count(*) from IndividualTreatmentInstructionDto where treatmentId='" + treatmentId + "'");
			Long count = (Long) query.uniqueResult();
			//if (count == 0) {
				// IndividualTreatmentInstructionDto individualTreatmentInstructionDto =
				// (IndividualTreatmentInstructionDto)ConfigUIJSONUtility.getObjectFromJSON(individualTreatmentInstructionCheckboxIDArray,IndividualTreatmentInstructionDto.class);

				for (int i = 0; i < individualTreatmentInstructionCheckboxIDArray.length; i++)
				{
					Query queryCnt = sessionFactory.getCurrentSession().createQuery(
							"select count(*) from IndividualTreatmentInstructionDto where treatmentId='" + treatmentId + "' AND reportInstruction_ID_FK = "+individualTreatmentInstructionCheckboxIDArray[i]);
					Long cnt = (Long) queryCnt.uniqueResult();
					
					if(cnt == 0)
					{
						IndividualTreatmentInstructionDto individualTreatmentInstructionDto = new IndividualTreatmentInstructionDto();
						individualTreatmentInstructionDto.setStatus("Y");
						individualTreatmentInstructionDto.setMandatoryInstFlag("Y");
						individualTreatmentInstructionDto.setTreatmentId(Integer.parseInt(treatmentId));
						individualTreatmentInstructionDto.setReportInstruction_ID_FK(
								Integer.parseInt(individualTreatmentInstructionCheckboxIDArray[i]));
						sessionFactory.getCurrentSession().merge(individualTreatmentInstructionDto);
					}
					/*
					 * else { String
					 * sql="update dd_individualtreatmentinstruction set mandatoryInstFlag='N' where treatmentId="
					 * +treatmentId;
					 * sessionFactory.getCurrentSession().createSQLQuery(sql).executeUpdate(); }
					 */
						
					
				}

			//}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean savePCAdminInstruction(String treatmentId, Integer pCTreatmentInstructionNameID) {

		try {
			TreatmentInstruction treatmentInstruction = new TreatmentInstruction();
			treatmentInstruction.setpCTreatmentInstructionNameID(pCTreatmentInstructionNameID);
			treatmentInstruction.setTreatmentId(Integer.parseInt(treatmentId));
			treatmentInstruction.setStatus("Y");
			sessionFactory.getCurrentSession().merge(treatmentInstruction);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

	@Override
	public List<GroupTemplateMaster> getAutoSuggestionProduct(String letter) {

		List<GroupTemplateMaster> ltMaster = new ArrayList<GroupTemplateMaster>();
		try {
			@SuppressWarnings("deprecation")
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GroupTemplateMaster.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.like("tempLateName", letter, MatchMode.ANYWHERE));

			criteria.setMaxResults(50);

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("id"));
			proList.add(Projections.property("tempLateName"));
			criteria.setProjection(proList);
			@SuppressWarnings("unchecked")
			List<Object[]> result = criteria.list();
			for (Object[] master : result) {
				GroupTemplateMaster tmplateMaster = new GroupTemplateMaster();
				tmplateMaster.setId(Integer.parseInt(master[0].toString()));
				tmplateMaster.setTempLateName(master[1].toString());
				ltMaster.add(tmplateMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltMaster;
		}
		return ltMaster;

	}

	@Override
	public List<TreatmentInstruction> fetchPCTreatmentInstruction(Integer treatmentId, HttpServletRequest request) {
		List<TreatmentInstruction> treatmentInstructionlist = new ArrayList<TreatmentInstruction>();
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				"select t.template_name, d.idpctreatmentinstruction from dd_group_template t join dd_treatmentinstruction d on d.pCTreatmentInstructionNameID= t.template_id where d.treatmentId='"
						+ treatmentId + "' and d.status='Y' ");

	
		//List<String> obj = query.list();
		//String tempName = "";
		//String id = "0";
		/*
		 * if (obj.size() > 0) {
		 * 
		 * // for(int i=0; i <= obj.size(); i++) {
		 * 
		 * tempName = obj.get(0); id = obj.get(1); System.out.println("tempName-----" +
		 * id); TreatmentInstruction treatInstruction = new TreatmentInstruction();
		 * 
		 * treatInstruction.setTempName(tempName);
		 * treatInstruction.setIdpctreatmentinstruction(Integer.parseInt(id));
		 * System.out.println("tempName second -----" +
		 * treatInstruction.getIdpctreatmentinstruction());
		 * treatmentInstructionlist.add(treatInstruction); // } }
		 */
		
		  @SuppressWarnings("unchecked")
		List<Object[]> treatmentInstruction = query.list();
		  
		  for(Object[] rs : treatmentInstruction) { 
			  TreatmentInstruction treatInstruction = new TreatmentInstruction();
		  
		  treatInstruction.setTempName(rs[0].toString());
		  treatInstruction.setIdpctreatmentinstruction(Integer.parseInt(rs[1].toString()));
		  
		  treatmentInstructionlist.add(treatInstruction);
		  
		  }
		  
		  
		 
		return treatmentInstructionlist;
	}

	@Override
	public boolean deletePCTreatmentInstruction(String treatmentId, Integer pCTreatmentInstructionNameID) {
		try {

	
			
			TreatmentInstruction obj = (TreatmentInstruction) sessionFactory.getCurrentSession().get(TreatmentInstruction.class, pCTreatmentInstructionNameID);		
			obj.setStatus("N");;
			sessionFactory.getCurrentSession().merge(obj);
			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public List<OPDReportInstructionDTO> fetchIndividualTreatmentInstruction(
			Integer treatmentId) {

		List<OPDReportInstructionDTO> reportInstructionDTOList = new ArrayList<OPDReportInstructionDTO>();

		try {
			SQLQuery sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT \r\n" + 
					"    iti.reportInstruction_ID_FK,\r\n" + 
					"    IFNULL(ri.reportInstruction, '-') AS reportInstruction,\r\n" + 
					"    IFNULL(ri.reportInstructionHindi, '-') AS reportInstructionHindi,\r\n" + 
					"    IFNULL(ri.reportInstructionMarathi, '-') AS reportInstructionMarathi\r\n" + 
					"FROM\r\n" + 
					"    dd_individualtreatmentinstruction iti,\r\n" + 
					"    reportinstruction ri\r\n" + 
					"WHERE\r\n" + 
					"    ri.reportInstructionID = iti.reportInstruction_ID_FK\r\n" + 
					"        AND treatmentId = '"+treatmentId+"'\r\n" + 
					"        AND iti.status = 'Y'\r\n" // + "        AND mandatoryInstFlag = 'N'"
					);
			
			@SuppressWarnings("unchecked")
			List<Object[]> reportInstructionDTODetails = sql.list();

			for (Object[] rs : reportInstructionDTODetails) {
				OPDReportInstructionDTO reportInstructionDTO = new OPDReportInstructionDTO();
				
				reportInstructionDTO.setReportInstructionID(Integer.parseInt(rs[0].toString()));
						
				if(rs[1] == null)
				{
					reportInstructionDTO.setReportInstruction("-");
				}
				else
				{
				reportInstructionDTO.setReportInstruction(rs[1].toString());
				}
				if(rs[2] == null)
				{
					reportInstructionDTO.setReportInstructionHindi("-");
				}
				else
				{
				reportInstructionDTO.setReportInstructionHindi(rs[2].toString());
				}
				if(rs[3] == null)
				{
					reportInstructionDTO.setReportInstructionHindi("-");
				}
				else
				{
				reportInstructionDTO.setReportInstructionMarathi(rs[3].toString());
				}

				reportInstructionDTOList.add(reportInstructionDTO);
			}

			return reportInstructionDTOList;
		} catch (Exception e) {
			System.err.println("Unable To fetch Report Instructions..."
					+ e.getMessage());
			e.printStackTrace();
			return reportInstructionDTOList;
		}
	}

	
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> fetchPCTreatmentInstruction(Integer treatmentId) {
		String instructionsIDS=null;
		List<String> instructionNames  = new ArrayList<>();
		//SQLQuery sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT i.instruction_id from dd_group_template i join dd_treatmentinstruction d on d.pCTreatmentInstructionNameID = i.template_id where d.treatmentId='"+treatmentId+"' and d.status='Y'");
		
		SQLQuery sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT i.instruction_id,i.template_id  from dd_group_template i join dd_treatmentinstruction d on d.pCTreatmentInstructionNameID = i.template_id where d.treatmentId='"+treatmentId+"' and d.status='Y'");
		
		sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		 List<Map<String, Object>> data1 = sql.list();
		 
		 Map<Integer, String> map=new HashedMap();
			
			
			for (Map<String, Object> row1 : data1) {
				String  instructionId = (String) row1.get("instruction_id");
			//	instructionsIDS =instructionId;
				//tempIdlist.add(((Number) row1.get("template_id")).intValue());
				map.put(((Number) row1.get("template_id")).intValue(), instructionId);
				
			}
			
			 Set<Entry<Integer, String>> entryset = map.entrySet(); 
			  
			Iterator<Entry<Integer, String>> itr = entryset.iterator();
			   while(itr.hasNext()) {
				       Entry<Integer, String> entry = itr.next();
				      int tempId= entry.getKey();
				      String tempSql="SELECT t.template_name  from dd_group_template t where  t.template_id ="+tempId+" ";
				      SQLQuery tempSqlQ  =sessionFactory.getCurrentSession().createSQLQuery(tempSql);
				      String temName=(String) tempSqlQ.uniqueResult();
				      String instructionIds= entry.getValue();
				      String instructionArr[]=instructionIds.split(",");
				      List<Integer> instIds = new ArrayList<>();
				      for(int i= 0 ; i < instructionArr.length ; i++) {
				      instIds.add(Integer.parseInt(instructionArr[(i)]));
				      }
				      
				      for(Integer k : instIds) {
				 		 
						 		SQLQuery sqlInstruction = sessionFactory.getCurrentSession().
						 		 createSQLQuery("SELECT english_ins from dd_group_instruction  where instruction_id = '" +k+"'");
						 		String english_instructions = (String)	sqlInstruction.uniqueResult();
						 	 instructionNames.add(temName+","+english_instructions);
				 	 }
				 		 
				 		
				      
			   }
			
		
		/*
		 * @SuppressWarnings("unchecked") List<String> list = new ArrayList<>();
		 * 
		 * list = sql.list(); for(int j = 0; j < list.size(); j++) { instructionsIDS =
		 * list.get(j); System.out.println("instructionsIDS1--------"+instructionsIDS);
		 * 
		 * 
		 * 
		 * String instructionArr[]=instructionsIDS.split(",");
		 * 
		 * System.out.println("instructionArr-----"+instructionArr);
		 * 
		 * List<Integer> instIds = new ArrayList<>();
		 * 
		 * for(int i= 0 ; i < instructionArr.length ; i++) {
		 * 
		 * instIds.add(Integer.parseInt(instructionArr[(i)])); }
		 * 
		 * System.out.println("instructionid list :-----"+ instIds);
		 * 
		 * for(Integer k : instIds) {
		 * 
		 * SQLQuery sqlInstruction = sessionFactory.getCurrentSession().
		 * createSQLQuery("SELECT english_ins from dd_group_instruction  where instruction_id = '"
		 * +k+"'"); String english_instructions = (String)
		 * sqlInstruction.uniqueResult();
		 * 
		 * instructionNames.add(english_instructions); }
		 * 
		 * }
		 */
		System.out.println("final english instructions list :-----"+ instructionNames);
		
		return instructionNames;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> fetchPCTreatmentInstructionForPrint(Integer treatmentId) {
		String instructionsIDS=null;
		List<String> instructionNames  = new ArrayList<>();
		//SQLQuery sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT i.instruction_id from dd_group_template i join dd_treatmentinstruction d on d.pCTreatmentInstructionNameID = i.template_id where d.treatmentId='"+treatmentId+"' and d.status='Y'");
		
		SQLQuery sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT i.instruction_id,i.template_id  from dd_group_template i join dd_treatmentinstruction d on d.pCTreatmentInstructionNameID = i.template_id where d.treatmentId='"+treatmentId+"' and d.status='Y'");
		
		sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		 List<Map<String, Object>> data1 = sql.list();
		 
		 Map<Integer, String> map=new HashedMap();
			
			
			for (Map<String, Object> row1 : data1) {
				String  instructionId = (String) row1.get("instruction_id");
			//	instructionsIDS =instructionId;
				//tempIdlist.add(((Number) row1.get("template_id")).intValue());
				map.put(((Number) row1.get("template_id")).intValue(), instructionId);
				
			}
			
			 Set<Entry<Integer, String>> entryset = map.entrySet(); 
			  
			Iterator<Entry<Integer, String>> itr = entryset.iterator();
			   while(itr.hasNext()) {
				       Entry<Integer, String> entry = itr.next();
				      int tempId= entry.getKey();
				      String tempSql="SELECT t.template_name  from dd_group_template t where  t.template_id ="+tempId+" ";
				      SQLQuery tempSqlQ  =sessionFactory.getCurrentSession().createSQLQuery(tempSql);
				      String temName=(String) tempSqlQ.uniqueResult();
				      String instructionIds= entry.getValue();
				      String instructionArr[]=instructionIds.split(",");
				      List<Integer> instIds = new ArrayList<>();
				      for(int i= 0 ; i < instructionArr.length ; i++) {
				      instIds.add(Integer.parseInt(instructionArr[(i)]));
				      }
				      
				      for(Integer k : instIds) {
				 		 
						 		SQLQuery sqlInstruction = sessionFactory.getCurrentSession().
						 		 createSQLQuery("SELECT english_ins from dd_group_instruction  where instruction_id = '" +k+"'");
						 		String english_instructions = (String)	sqlInstruction.uniqueResult();
						 	// instructionNames.add(temName+","+english_instructions);
						 		 instructionNames.add(english_instructions);
				 	 }
				 		 
				 		
				      
			   }
			
		
		/*
		 * @SuppressWarnings("unchecked") List<String> list = new ArrayList<>();
		 * 
		 * list = sql.list(); for(int j = 0; j < list.size(); j++) { instructionsIDS =
		 * list.get(j); System.out.println("instructionsIDS1--------"+instructionsIDS);
		 * 
		 * 
		 * 
		 * String instructionArr[]=instructionsIDS.split(",");
		 * 
		 * System.out.println("instructionArr-----"+instructionArr);
		 * 
		 * List<Integer> instIds = new ArrayList<>();
		 * 
		 * for(int i= 0 ; i < instructionArr.length ; i++) {
		 * 
		 * instIds.add(Integer.parseInt(instructionArr[(i)])); }
		 * 
		 * System.out.println("instructionid list :-----"+ instIds);
		 * 
		 * for(Integer k : instIds) {
		 * 
		 * SQLQuery sqlInstruction = sessionFactory.getCurrentSession().
		 * createSQLQuery("SELECT english_ins from dd_group_instruction  where instruction_id = '"
		 * +k+"'"); String english_instructions = (String)
		 * sqlInstruction.uniqueResult();
		 * 
		 * instructionNames.add(english_instructions); }
		 * 
		 * }
		 */
		System.out.println("final english instructions list :-----"+ instructionNames);
		
		return instructionNames;
	}

}

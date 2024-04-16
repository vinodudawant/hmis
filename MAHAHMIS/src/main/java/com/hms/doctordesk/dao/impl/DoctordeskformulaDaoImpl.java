package com.hms.doctordesk.dao.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.mariuszgromada.math.mxparser.Expression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.DoctordeskformulaDao;
import com.hms.ehat.dto.FormulaDto;

@Repository
public class DoctordeskformulaDaoImpl implements DoctordeskformulaDao{

	@Autowired
	SessionFactory sessionFactory;
	DecimalFormat df = new DecimalFormat("0.00");
	
	@Override
	public List<FormulaDto> calculateFormula(List<Integer> formulaId, String callfrom, String letter, Integer pid, Integer pid2) {
		List<FormulaDto> listFormula = new ArrayList<FormulaDto>();
		List<FormulaDto> listFormularesult = new ArrayList<FormulaDto>();

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(FormulaDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		if(callfrom.equals("onload")){
			criteria.setMaxResults(10);
		}else if(callfrom.equals("Search")){
			criteria.addOrder(Order.desc("formulaId"));
			criteria.add(Restrictions.like("formulaName", "%" + letter + "%"));
		}else{
			criteria.add(Restrictions.in("formulaId", formulaId));
			

		}
		listFormula = criteria.list();
		String expression="";
		String weight="0.0";
		String height="0.0";
		Integer age  =0;
		String sql="select  et.weight as weight,et.height as height, ep.age as age"
				+ " FROM ehat_patient ep,ehat_treatment et where    ep.patient_id =et.patient_id and et.treatment_id="+ pid2 + " and et.patient_id="+ pid+" ";
	    Query tpiDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
	    tpiDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
	  @SuppressWarnings("unchecked")
	  List<Map<String, Object>> listDetails = tpiDetails.list();
		for(Map<String, Object> row : listDetails){
			 weight  = (String)row.get("weight");
			 height  = (String)row.get("height");
			 age    = (Integer)row.get("age");
		}
		for(int i=0;i<listFormula.size();i++){
			FormulaDto obj1 =new FormulaDto();
			String formula = listFormula.get(i).getFormula();
			String labid=listFormula.get(i).getFormulatestid();
			String validation="";
			expression =formula;
			  if(formula.contains("wt")){
				  if( !weight.equals("0.0")){
                  expression= expression.replace("wt", weight.toString());  
				  }else{
					  validation="weight";
				  }
			  }
			  if(formula.contains("ht")){
				  if(!height.equals("0.0") ){
				  expression=expression.replace("ht", height.toString());
				  }else{
					  validation =validation + ","+"height";
				  }
			  }
			  if(formula.contains("age")){
				  if(age > 0){
				  expression=expression.replace("age", age.toString());
				  }else{
					  validation =validation  + ","+ "age";
				  }
			  }
			  
			  if(labid.length() > 0){
				  
				  String labtestid[]=labid.split(",");
				  if(!labtestid.equals(null)){
					  for(int j=0;j < labtestid.length;j++){
						  String testreult=  labresult( pid,  pid2, labtestid[j]);
						  if(!testreult.equals(null)) {
								if( !testreult.equals("-")){

							  if(testreult.length() > 0){
								  String testcontent[]= testreult.split("_");
								  if(!testcontent[1].equals(null)){
									  if(formula.contains(testcontent[1])){
										  if(!testcontent[0].equals("-")){ 
											  if( testcontent[0].equals("null")|| testcontent[0].equals(null)){
												  validation =validation  + ","+ " "+ testcontent[1] +"Test not assign or result not genrated";

											  }else{
												  expression=expression.replace(testcontent[1], testcontent[0]);

											  }
										  } 
									  }else{
										 // validation =validation  + ","+ "Test not assign or result not genrated";
									  }  
								  }
								 
							  }}
						  }
					  }
				  }else{

					  validation =validation  + ","+ "Test not assign or result not genrated";
				  				  }
				
				  /*
				
				   
			  */}
			  
			  if(validation.length() > 0){
				  String result="-";
				  validation=validation.substring(0);
				  Character chart=validation.charAt(0);
				  if(chart.equals(',')){
					  validation=validation.substring(1);
				  }
				validation =validation + "    is Missing!";
				obj1.setFormulaId(listFormula.get(i).getFormulaId());
				obj1.setFormulaName(listFormula.get(i).getFormulaName());
				obj1.setFormula(listFormula.get(i).getFormula());
				obj1.setValdation(validation);
				obj1.setResult(result);
			   }else{
					//System.err.println("exe=="+expression );
					//ScriptEngine engine = new ScriptEngineManager()
					//		.getEngineByExtension("js");
			    	//Expression eh = new Expression("(((5^1)^2 +10+20)*2)/2 ");
					//double h = eh.calculate();
			    	
					try {
						// Evaluate the expression
						Expression exp = new Expression(expression);
						Object result = exp.calculate();
						//Object result = engine.eval(expression);
						System.out.println(expression + " = " + df.format(result));
						
						obj1.setFormulaId(listFormula.get(i).getFormulaId());
						obj1.setFormulaName(listFormula.get(i).getFormulaName());
						obj1.setFormula(listFormula.get(i).getFormula());
						obj1.setValdation("-");
						obj1.setResult((df.format(result)).toString());
					} catch (Exception e) {
						// Something went wrong
						e.printStackTrace();
					}
			   }
			  listFormularesult.add(obj1);
		}
	return listFormularesult;
	}
	
	public String labresult(int pid, int pid2, String idTest){
		String result="-";
		try {

		  Query sqllab= sessionFactory.getCurrentSession().createSQLQuery("SELECT max(el.test_result) as test_result , lt.testName as testName "
					   + " FROM ehat_lab_result el left join labtest lt on lt.idTest=el.test_id WHERE"+
	                 "  el.patient_id="+ pid + " and lt. idTest="+ idTest+" and lt.valueType='i'   ");
		  sqllab.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
		  @SuppressWarnings("unchecked")
		  List<Map<String, Object>> listsqllab = sqllab.list();
			for(Map<String, Object> row : listsqllab){
				String  test_result  = (String)row.get("test_result");
				String  testName  = (String)row.get("testName");
				result =  test_result + "_" + testName;
			}
		} catch (Exception e) {
			// Something went wrong
			e.printStackTrace();
			return result="-";
		}	
		  
		
		return result;
		
	}	
}

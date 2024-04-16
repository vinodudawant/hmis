package com.hms.sandbox.controller;

import java.io.FileNotFoundException;
import java.io.FileReader;

import javax.script.Bindings;
import javax.script.Invocable;
import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;


public class Demo3 {

	public static void main(String[] args) {

		ScriptEngine ee = new ScriptEngineManager().getEngineByName("Nashorn");
		try {
			ee.eval(new FileReader("E:\\abdm_sandbox.js"));
			Invocable invocable = (Invocable) ee;
			
			 //Binding script and Define scope of script  
	        Bindings bind = ee.getBindings(ScriptContext.ENGINE_SCOPE);  
	        bind.put("name2", "Nashorn");  

	        String Name="Vishant Pawar";
			// Here we are calling func1
			invocable.invokeFunction("functionDemo1",Name);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 

	}

}

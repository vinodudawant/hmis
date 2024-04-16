package com.hms.utility;

import java.text.DecimalFormat;

public class IndianCurrencyFormat {
    DecimalFormat formatter = new DecimalFormat("##,###.##");
    public String indianFormat(Double n) {
    	System.out.println("n is ->> "+n);
        boolean negFlag=n <0?true:false;
        n = Math.abs(n);
        String returnValue = "";
        if (n.intValue() > 9999) {
            formatter.applyPattern("#,##");
            returnValue = formatter.format((int) (n.intValue() / 1000)) + ",";
            System.out.println("returnValue 1 is ->> "+returnValue);
            
            formatter.applyPattern("#,###.##");
            Double temp = n - (int) (n.intValue() / 1000) * 1000;
            System.out.println("temp is ->> "+(temp));
            System.out.println("temp is int ->> "+(temp.intValue()));
            
            
            if(temp.intValue() > 0){
            	returnValue += formatter.format(temp);
                System.out.println("returnValue 2 is ->> "+returnValue);
            }else if(temp == 0){

                returnValue += "000.00" ;
                
                System.out.println("returnValue 3 is ->> "+returnValue);
            
            }else if(temp > 0 && temp < 1){
            	returnValue += "00" ;
                returnValue += formatter.format(temp);
                
                System.out.println("returnValue 4 is ->> "+returnValue);
            }
          
        } else if (n.intValue() >= 1000 && n.intValue() <= 9999) {
            formatter.applyPattern("#,###.##");
            returnValue = formatter.format(n);
        } else {
            returnValue += n;
        }
        if(negFlag == true)
        return "-"+returnValue;
        else
            return returnValue;
    }
    public static void main(String[] args) {
       // TODO code application logic here
       System.out.println("value is ->> "+(new IndianCurrencyFormat().indianFormat(527893784.45)));
   }
}

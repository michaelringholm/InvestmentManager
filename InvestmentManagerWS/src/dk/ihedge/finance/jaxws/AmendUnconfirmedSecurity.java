
package dk.ihedge.finance.jaxws;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * This class was generated by Apache CXF 2.7.4
 * Wed May 29 21:33:20 CEST 2013
 * Generated source version: 2.7.4
 */

@XmlRootElement(name = "amendUnconfirmedSecurity", namespace = "http://finance.ihedge.dk/")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "amendUnconfirmedSecurity", namespace = "http://finance.ihedge.dk/", propOrder = {"arg0", "arg1"})

public class AmendUnconfirmedSecurity {

    @XmlElement(name = "arg0")
    private java.lang.String arg0;
    @XmlElement(name = "arg1")
    private dk.ihedge.finance.dtl.Security arg1;

    public java.lang.String getArg0() {
        return this.arg0;
    }

    public void setArg0(java.lang.String newArg0)  {
        this.arg0 = newArg0;
    }

    public dk.ihedge.finance.dtl.Security getArg1() {
        return this.arg1;
    }

    public void setArg1(dk.ihedge.finance.dtl.Security newArg1)  {
        this.arg1 = newArg1;
    }

}


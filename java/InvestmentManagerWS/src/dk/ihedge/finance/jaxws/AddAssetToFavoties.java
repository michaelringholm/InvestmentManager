
package dk.ihedge.finance.jaxws;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * This class was generated by Apache CXF 2.7.4
 * Wed May 29 21:33:21 CEST 2013
 * Generated source version: 2.7.4
 */

@XmlRootElement(name = "addAssetToFavoties", namespace = "http://finance.ihedge.dk/")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "addAssetToFavoties", namespace = "http://finance.ihedge.dk/", propOrder = {"login", "assetID"})

public class AddAssetToFavoties {

    @XmlElement(name = "login")
    private java.lang.String login;
    @XmlElement(name = "assetID")
    private int assetID;

    public java.lang.String getLogin() {
        return this.login;
    }

    public void setLogin(java.lang.String newLogin)  {
        this.login = newLogin;
    }

    public int getAssetID() {
        return this.assetID;
    }

    public void setAssetID(int newAssetID)  {
        this.assetID = newAssetID;
    }

}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InMaApp
{
    public static class DisplayHelper
    {
        public static String ShortenText(String text, int maxLength)
        {
            String shortText = text;
            if (text != null && text.Length > maxLength)
                shortText = text.Substring(0, maxLength - 3) + "...";

            return shortText;
        }

        public static object FormatMoney(double money)
        {
            return String.Format("{0:C}", money);
        }

        public static string GetImgSrc(string categoryTitle)
        {
            return GetImgSrc(categoryTitle, 128);
        }

        public static string GetImgSrc(string categoryTitle, int width)
        {
            String title = categoryTitle.ToLower();
            String imgSrc = "";

            if (title.Contains("finan"))
                imgSrc = "bank-icon" + width + ".png";
            else if (title.Contains("ship"))
                imgSrc = "Truck-icon" + width + ".png";
            else if (title.Contains("ener"))
                imgSrc = "Status-battery-charging-icon" + width + ".png";
            else if (title.Contains("indi"))
                imgSrc = "Actions-office-chart-line-percentage-icon" + width + ".png";
            else if (title.Contains("secur"))
                imgSrc = "Security-Camera-icon" + width + ".png";
            else if (title.Contains("health"))
                imgSrc = "first-aid-kit-icon" + width + ".png";
            else if (title.Contains("telecom"))
                imgSrc = "Satellite-icon" + width + ".png";
            else if (title.Contains("prod"))
                imgSrc = "coal-power-plant-icon" + width + ".png";
            else if (title.Contains("electr"))
                imgSrc = "PCB-icon" + width + ".png";
            else if (title.Contains("commod"))
                imgSrc = "tea-plant-leaf-icon" + width + ".png";
            else if (title.Contains("construc"))
                imgSrc = "wheelbarrow-icon" + width + ".png";
            else if (title.Contains("groce"))
                imgSrc = "flour-icon" + width + ".png";            

            return imgSrc;
        }

        public static String FormatDouble(double d)
        {
            return Convert.ToString(d, System.Globalization.CultureInfo.InvariantCulture);
        }

        public static String FormatDouble(double d, int decimalPlaces)
        {
            return Convert.ToString(Math.Round(d, 2), System.Globalization.CultureInfo.InvariantCulture);
        }

        public static String FormatDate(DateTime date) //InMaJavaWS.date
        {
            return date.ToString("dd.MM.yyyy");
        }
    }
}
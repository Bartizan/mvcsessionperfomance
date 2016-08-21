using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;

namespace SessionStateAsync.Controllers
{
    [OutputCache(NoStore = true, Duration = 0)]
    [SessionState(SessionStateBehavior.ReadOnly)]
    public class ResolvedWithSessionAccessController : Controller
    {
        public List<string> boxes = new List<string>() { "red", "green", "blue", "black", "gray", "yellow", "orange" };

        public string GetBox()
        {
            try
            {
                System.Threading.Thread.Sleep(10);
                object name = System.Web.HttpContext.Current.Session["Name"]; //No exception occurs in read-only mode, kept the performance rate
                if(null == name)
                {
                    Random rnd = new Random();
                    int index = rnd.Next(0, boxes.Count);
                    return boxes[index];
                }
                else
                    return (String.Equals(name, "Chris") ? "green" : "orange");
            }
            catch(Exception)
            {
                return "red";
            }
        }
    }
}
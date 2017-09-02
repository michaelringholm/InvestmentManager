using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Services
{
    public class SimpleJsonSerializer : IJsonSerializer
    {
        public String ToJson(Object obj)
        {
            return JsonConvert.SerializeObject(obj, new JsonSerializerSettings{NullValueHandling = NullValueHandling.Ignore});
        }

        public T FromJson<T>(String json)
        {
            return JsonConvert.DeserializeObject<T>(json);
        }
    }
}

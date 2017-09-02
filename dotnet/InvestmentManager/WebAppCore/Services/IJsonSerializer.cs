using System;

namespace WebAppCore.Services
{
    public interface IJsonSerializer
    {
        String ToJson(Object obj);
        T FromJson<T>(string json);
    }
}
using System;

namespace DroidInvest.Services
{
    public interface IJsonSerializer
    {
        String ToJson(Object obj);
        T FromJson<T>(string json);
    }
}